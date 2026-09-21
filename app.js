const SOURCES={
mie:"https://www.mpstpc.pref.mie.lg.jp/SUI/shigen/ukigyo/Hp/",
ehime:"https://www.pref.ehime.jp/page/142154.html",
kochi:"https://kmi-nabras.pref.kochi.lg.jp/red_tide.html",
kumamoto:"https://www.pref.kumamoto.jp/soshiki/95/264971.html",
nagasaki:"https://www.pref.nagasaki.jp/bunrui/shigoto-sangyo/suisangho/gyogyo-shinko/suisan-shiken-suishi-nu-su/suisan-shiken-suishi-nu-su-akashiosokuho/",
fra:"https://fra-roms.fra.go.jp/",
owase:"https://www.city.owase.lg.jp/0000005905.html",
oita:"https://www.pref.oita.jp/site/nourinsuisan/kamiurateichisuion.html",
nagasakiTemp:"https://www.pref.nagasaki.lg.jp/bunrui/shigoto-sangyo/suisangho/gyoko-gyojo/suisan-shiken-suishi-teichi-water-temperature/r8/",
jodc:"https://www.jodc.go.jp/data/coastal/kikan_list.htm",
minato:"https://www.minato-yamaguchi.co.jp/minato/e-minato/category/3"};
const sea=[
{area:"三重・尾鷲湾",temp:"—",at:"月次観測",note:"尾鷲市の魚類養殖場水質観測。水温・塩分・DO、平年値・前年比較あり。",url:SOURCES.owase,status:"公式観測"},
{area:"三重・引本浦",temp:"—",at:"観測源確認済み",note:"三重県水産研究所が主要養殖漁場として水温測定。自動取得方法を調整中。",url:SOURCES.mie,status:"接続準備"},
{area:"三重・三木浦",temp:"—",at:"観測源確認済み",note:"三重県水産研究所の養殖漁場水温測定対象。尾鷲市の水質観測情報も利用。",url:SOURCES.owase,status:"接続準備"},
{area:"愛媛・宇和島",temp:"—",at:"接続準備中",note:"宇和海の養殖漁場を優先。赤潮・水質情報と同時表示予定。",url:SOURCES.ehime,status:"接続準備"},
{area:"愛媛・愛南",temp:"—",at:"接続準備中",note:"愛南・久良など宇和海南部の養殖海域を対象。",url:SOURCES.ehime,status:"接続準備"},
{area:"高知・宿毛湾",temp:"—",at:"2026/9/17 更新確認",note:"宿毛湾の海水温・環境調査・高水温情報を利用。",url:SOURCES.kochi,status:"公式情報"},
{area:"鹿児島・長島（東町）",temp:"—",at:"接続準備中",note:"東町のブリ養殖海域。観測値は適切な近傍データ源を選定中。",url:SOURCES.jodc,status:"接続準備"},
{area:"鹿児島・垂水",temp:"—",at:"観測地点確認済み",note:"JODC掲載の垂水定地水温（水深5m取水）を候補に接続。",url:SOURCES.jodc,status:"観測源あり"},
{area:"鹿児島・錦江湾",temp:"—",at:"接続準備中",note:"垂水・鹿児島港等を使い分け、湾内の代表値を構成予定。",url:SOURCES.jodc,status:"接続準備"},
{area:"鹿児島・鹿屋周辺",temp:"—",at:"接続準備中",note:"カンパチ養殖海域として追加。近傍観測点を選定中。",url:SOURCES.jodc,status:"接続準備"},
{area:"大分・佐伯（上浦）",temp:"25.5℃",at:"2026年9月中旬 旬平均",note:"大分県水産研究部地先。2026年9月中旬の旬平均。90–25年平均は24.6℃。",url:SOURCES.oita,status:"公式観測"},
{area:"熊本・天草",temp:"—",at:"接続準備中",note:"魚類養殖海域を優先。熊本県の観測・赤潮情報と統合予定。",url:SOURCES.kumamoto,status:"接続準備"},
{area:"熊本・牛深",temp:"—",at:"接続準備中",note:"天草南部の養殖海域として追加。",url:SOURCES.kumamoto,status:"接続準備"},
{area:"長崎・橘湾",temp:"—",at:"接続準備中",note:"養殖海域として追加。県の定地水温・海況情報との対応を調整。",url:SOURCES.nagasakiTemp,status:"接続準備"},
{area:"長崎・五島",temp:"—",at:"接続準備中",note:"魚類・クロマグロ養殖海域として追加。近傍観測データを選定中。",url:SOURCES.nagasakiTemp,status:"接続準備"},
{area:"長崎・多以良",temp:"27.5℃",at:"2026/9/16 09:00・水深2m",note:"長崎県総合水産試験場前の試験用養殖筏。0m 24.8℃、2m/5m 27.5℃。",url:SOURCES.nagasakiTemp,status:"公式観測"},
{area:"宮崎・延岡周辺",temp:"—",at:"観測地点候補あり",note:"熊野江港の定地水温等を候補に、養殖海域との代表性を確認中。",url:SOURCES.jodc,status:"接続準備"}
]
const red=[{area:"愛媛・宇和海",state:"定期調査継続",detail:"9/15 宇和島湾の調査情報が公開",url:SOURCES.ehime,cls:"warn"},{area:"高知・宿毛湾",state:"警報情報あり",detail:"9/16 ギムノディニウム警報・高水温情報",url:SOURCES.kochi,cls:"danger"},{area:"熊本・八代海",state:"発生情報あり",detail:"9/10〜 ヘテロシグマ・アカシオ",url:SOURCES.kumamoto,cls:"danger"},{area:"長崎",state:"速報更新",detail:"2026年の海域別赤潮速報を公開",url:SOURCES.nagasaki,cls:"warn"}];
const news=[{area:"全国",src:"みなと新聞",title:"漁業・養殖 最新記事一覧",date:"随時更新",url:SOURCES.minato},{area:"愛媛",src:"愛媛県",title:"赤潮・貝毒情報",date:"9/17更新",url:SOURCES.ehime},{area:"高知",src:"高知県",title:"宿毛湾 赤潮・水質・高水温情報",date:"9/17掲載",url:SOURCES.kochi},{area:"熊本",src:"熊本県",title:"2026年度 赤潮発生状況",date:"随時更新",url:SOURCES.kumamoto},{area:"長崎",src:"長崎県",title:"2026年 赤潮速報",date:"随時更新",url:SOURCES.nagasaki},{area:"全国",src:"FRA-ROMS II",title:"日本周辺の海況予測（約2か月先）",date:"予報更新",url:SOURCES.fra}];
const tabs=["海況","水温","赤潮","地域トピック","給餌率","給餌サイズ","給餌計算"];let active="海況";
function link(url,label="元データを見る"){return url==="#"?"":`<a href="${url}" target="_blank" rel="noopener">${label}</a>`}
function seaCards(){return '<div class="filters">'+["すべて","三重","愛媛","高知","鹿児島","大分","熊本","長崎","宮崎"].map(x=>'<button onclick="filterSea(\''+x+'\',this)">'+x+'</button>').join("")+'</div><div id="seaCards" class="grid">'+sea.map(x=>`<article class="card"><span class="tag">${x.status}</span><h3>${x.area}</h3><div class="temp">${x.temp}</div><div class="muted">${x.at}</div><p>${x.note}</p><div class="links">${link(x.url)}<a href="#" onclick="setTab('水温');return false">水温ページ</a></div></article>`).join("")+'</div>'}
function filterSea(a,b){document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll("#seaCards .card").forEach(x=>x.style.display=(a==="すべて"||x.querySelector("h3").textContent.includes(a))?"block":"none")}
function redCards(){return `<div class="grid">${red.map(x=>`<article class="card"><span class="tag ${x.cls}">${x.state}</span><h3>${x.area}</h3><p>${x.detail}</p><div class="links">${link(x.url,"公式情報")}</div></article>`).join("")}</div>`}
function topics(){return `<div class="filters">${["すべて","愛媛","高知","熊本","長崎","全国"].map(x=>`<button onclick="filterNews('${x}',this)">${x}</button>`).join("")}</div><div id="news" class="grid">${news.map(n=>`<article class="card news" data-area="${n.area}"><div class="muted">${n.src} ・ ${n.date}</div><p><a href="${n.url}" target="_blank" rel="noopener">${n.title}</a></p></article>`).join("")}</div>`}
function placeholder(title,text){return `<div class="hero placeholder"><h2>${title}</h2><p>${text}</p></div>`}
function render(){document.getElementById("tabs").innerHTML=tabs.map(t=>`<button class="${t===active?"active":""}" onclick="setTab('${t}')">${t}</button>`).join("");let h="";
if(active==="海況")h=`<div class="hero"><h2>今日の海況</h2><p>まず水温・赤潮・重要情報を一覧で確認できます。取得元が未接続の地点は、推測値を表示せず「準備中」としています。</p></div><h2 class="section">水温</h2>${seaCards()}<h2 class="section">赤潮</h2>${redCards()}<h2 class="section">地域トピック</h2>${topics()}`;
if(active==="水温")h=`<div class="hero"><h2>地区別 海水温</h2><p>最新値 → 推移グラフ → 昨年月平均 → 約2か月先予測の順に拡張します。</p><div class="links">${link(SOURCES.fra,"FRA-ROMS II 予測")}</div></div>${seaCards()}${placeholder("グラフ・昨年比較","地区ごとの日別履歴を自動保存できるようにしてから、今年／昨年／予測を重ねたグラフを実装します。")}`;
if(active==="赤潮")h=`<div class="hero"><h2>赤潮情報</h2><p>県・研究機関の一次情報への導線を優先しています。</p></div>${redCards()}`;
if(active==="地域トピック")h=`<div class="hero"><h2>地域トピック</h2><p>公的機関と、みなと新聞の公開見出しへのリンクをまとめます。有料本文は転載しません。</p></div>${topics()}`;
if(active==="給餌率")h=placeholder("給餌率表","管理中のExcelを受領後、その表を正として実装します。仮の給餌率は使用しません。");
if(active==="給餌サイズ")h=placeholder("給餌サイズの目安","管理中のExcelを受領後、その表をそのままサイト向けに表示します。");
if(active==="給餌計算")h=`<div class="hero"><h2>給餌計算</h2><p>給餌率表の実データ追加後に実装します。残尾数・平均魚体重・斃死・出荷予定・補正給餌率などを扱える構成を予定しています。</p></div>`;
document.getElementById("app").innerHTML=h}function setTab(t){active=t;render();scrollTo({top:0,behavior:"smooth"})}function filterNews(a,b){document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll("#news [data-area]").forEach(x=>x.style.display=(a==="すべて"||x.dataset.area===a)?"block":"none")}async function loadSeaData(){try{const r=await fetch("data/sea-temperature.json?"+Date.now());if(!r.ok)return;const d=await r.json();for(const s of d.stations||[]){const x=sea.find(v=>v.area===s.area);if(!x)continue;if(s.temp!==null&&s.temp!==undefined)x.temp=Number(s.temp).toFixed(1)+"℃";if(s.observedAt)x.at=s.observedAt;if(s.status)x.status=s.status;if(s.source)x.url=s.source;}document.getElementById("updated").textContent="v0.3 ・ データ更新 "+new Date(d.updatedAt).toLocaleString("ja-JP");render()}catch(e){console.warn("data load failed",e)}}document.getElementById("updated").textContent="v0.3 ・ 2026/9/22";render();loadSeaData();