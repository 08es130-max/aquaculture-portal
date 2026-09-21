"""Public-source health check and normalized-data validation.
Source-specific parsers will be added only after their output is verified.
"""
import json, pathlib, urllib.request, datetime
ROOT=pathlib.Path(__file__).resolve().parents[1]
p=ROOT/"data"/"sea-temperature.json"
data=json.loads(p.read_text(encoding="utf-8"))
for s in data["stations"]:
    try:
        req=urllib.request.Request(s["source"],headers={"User-Agent":"aquaculture-portal/0.3 (+GitHub Pages)"})
        with urllib.request.urlopen(req,timeout=20) as r:
            print(s["id"], r.status, r.geturl())
    except Exception as e:
        print(s["id"], "SOURCE_CHECK_FAILED", type(e).__name__, str(e)[:160])
# Deliberately do not overwrite measured values until each parser is verified.
print("Validated",len(data["stations"]),"stations at",datetime.datetime.now(datetime.timezone.utc).isoformat())
