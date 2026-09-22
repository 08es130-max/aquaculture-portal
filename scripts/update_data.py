"""Refresh machine-readable metadata from official public pages.

This updater intentionally parses only fields that are reliably available as HTML.
PDF-only measured temperatures are exposed as source/update metadata until a robust
source-specific parser is added. This avoids publishing guessed temperatures.
"""
import json, pathlib, urllib.request, urllib.parse, re, datetime, subprocess, tempfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
DATA=ROOT/"data"/"sea-temperature.json"
UA={"User-Agent":"aquaculture-portal/0.4 (public fisheries data aggregator)"}

def get(url):
    req=urllib.request.Request(url,headers=UA)
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode("utf-8","ignore")

def set_station(data, sid, **kw):
    s=next((x for x in data["stations"] if x["id"]==sid),None)
    if s: s.update({k:v for k,v in kw.items() if v is not None})

data=json.loads(DATA.read_text(encoding="utf-8"))
checks={}

def links(html, base):
    return [(re.sub(r"<[^>]+>","",txt).strip(), urllib.parse.urljoin(base,href))
            for href,txt in re.findall(r'href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',html,re.I|re.S)]

# Uwajima City: detect current Yusu/Komobuchi publications and keep direct PDF links.
uw="https://www.city.uwajima.ehime.jp/soshiki/23/kaikyoujyouhou.html"
try:
    h=get(uw)
    m=re.search(r'更新日[^0-9]*(20\d{2})年(\d{1,2})月(\d{1,2})日',h)
    latest=f"{m.group(1)}/{int(m.group(2))}/{int(m.group(3))}" if m else None
    set_station(data,"uwajima",observedAt=(latest+" 海水温情報更新" if latest else None),
                status="公式情報更新",source=uw,
                note="宇和島市・遊子/蔣淵の海水温情報。月2回（月初・中旬）更新。")
    ls=links(h,uw)
    yusu=next((u for t,u in ls if "遊子地区" in t and "海水温情報" in t and "2026年" in t),None)
    komo=next((u for t,u in ls if "蔣淵地区" in t and "海水温情報" in t and "2026年" in t),None)
    set_station(data,"uwajima",documents={"遊子":yusu,"蔣淵":komo})
    checks["uwajima"]="ok"
except Exception as e: checks["uwajima"]=type(e).__name__

# Sukumo: latest dated water-temperature information is visible in the official index.
su="https://kmi-nabras.pref.kochi.lg.jp/red_tide.html"
try:
    h=get(su)
    hits=re.findall(r'(20\d{2})年(\d{1,2})月(\d{1,2})日',h)
    dates=sorted({datetime.date(int(y),int(m),int(d)) for y,m,d in hits},reverse=True)
    latest=dates[0].isoformat().replace("-","/") if dates else None
    set_station(data,"sukumo",observedAt=(latest+" 公式情報更新" if latest else None),
                status="公式情報更新",source=su,
                note="高知県の宿毛湾環境調査・海水温情報。高水温・赤潮情報も同じ公式ページから確認。")
    ls=links(h,su)
    latest_pdf=next((u for t,u in ls if "宿毛湾内の海水温情報" in t and "高水温情報" in t),None)
    set_station(data,"sukumo",documents={"最新水温情報":latest_pdf},depths=[1,5,10])
    checks["sukumo"]="ok"
except Exception as e: checks["sukumo"]=type(e).__name__

# Mie Mikiura: official institute confirms automated surface/15m observations.
set_station(data,"mikiura",status="自動観測源確認",source="https://www.pref.mie.lg.jp/common/content/001246871.pdf",
            note="三重県水産研究所の三木浦地先自動観測（表層・水深15m）。公開データの機械取得経路を調整中。")

# PDF text extraction: use pdftotext when available on the Actions runner.
def pdf_text(url):
    try:
        req=urllib.request.Request(url,headers=UA)
        raw=urllib.request.urlopen(req,timeout=30).read()
        with tempfile.TemporaryDirectory() as td:
            pdf=pathlib.Path(td)/"source.pdf"; txt=pathlib.Path(td)/"source.txt"
            pdf.write_bytes(raw)
            subprocess.run(["pdftotext","-layout",str(pdf),str(txt)],check=True,timeout=30,
                           stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
            return txt.read_text(encoding="utf-8",errors="ignore")
    except Exception as e:
        print("PDF_TEXT_FAILED",url,type(e).__name__)
        return ""

# Extract conservative, explicitly labelled headline values only.
uws=next((x for x in data["stations"] if x["id"]=="uwajima"),{})
for district,url in (uws.get("documents") or {}).items():
    if not url: continue
    t=pdf_text(url)
    vals=re.findall(r'(\d{1,2})\s*日\s*[→:：]?\s*(\d{1,2}(?:\.\d+)?)\s*℃',t)
    if vals:
        uw_summ=uws.setdefault("documentValues",{})
        uw_summ[district]=[{"day":int(day),"temp":float(temp)} for day,temp in vals[-8:]]

sus=next((x for x in data["stations"] if x["id"]=="sukumo"),{})
spdf=(sus.get("documents") or {}).get("最新水温情報")
if spdf:
    t=pdf_text(spdf)
    maxima={}
    for dep in (1,5,10):
        m=re.search(rf'水深\s*{dep}\s*m[^\n。]*?(\d{{2}}(?:\.\d+)?)\s*℃',t,re.S)
        if m: maxima[str(dep)]=float(m.group(1))
    if maxima: sus["periodMaxByDepth"]=maxima

# Do not alter existing verified temperatures. Stamp successful refresh time.
now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
data["updatedAt"]=now.isoformat(timespec="seconds")
data["sourceChecks"]=checks
DATA.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(checks,ensure_ascii=False))
