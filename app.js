const SOURCES={
mie:"https://www.mpstpc.pref.mie.lg.jp/SUI/shigen/ukigyo/Hp/",
ehime:"https://www.pref.ehime.jp/page/142154.html",
kochi:"https://kmi-nabras.pref.kochi.lg.jp/red_tide.html",
kumamoto:"https://www.pref.kumamoto.jp/soshiki/95/264971.html",
nagasaki:"https://www.pref.nagasaki.jp/bunrui/shigoto-sangyo/suisangho/gyogyo-shinko/suisan-shiken-suishi-nu-su/suisan-shiken-suishi-nu-su-akashiosokuho/",
fra:"https://fra-roms.fra.go.jp/",
minato:"https://www.minato-yamaguchi.co.jp/minato/e-minato/category/3"};
const sea=[{area:"三重・熊野灘沖 No.1",temp:"25.5℃",at:"2026/9/20 21:00",note:"浮魚礁 No.1 日データ",url:SOURCES.mie,status:"実測"},{area:"愛媛・宇和海",temp:"—",at:"接続準備中",note:"地区別観測データの取得方法を調整中",url:SOURCES.ehime,status:"準備中"},{area:"高知・宿毛湾",temp:"—",at:"2026/9/17 情報更新",note:"高水温情報あり。数値自動抽出は次段階",url:SOURCES.kochi,status:"情報あり"},{area:"熊本・天草",temp:"—",at:"接続準備中",note:"水温観測ソースを接続予定",url:SOURCES.kumamoto,status:"準備中"},{area:"長崎",temp:"—",at:"接続準備中",note:"地区別観測地点を選定予定",url:SOURCES.nagasaki,status:"準備中"},{area:"鹿児島",temp:"—",at:"接続準備中",note:"地区別観測地点を選定予定",url:"#",status:"準備中"}];
const red=[{area:"愛媛・宇和海",state:"定期調査継続",detail:"9/15 宇和島湾の調査情報が公開",url:SOURCES.ehime,cls:"warn"},{area:"高知・宿毛湾",state:"警報情報あり",detail:"9/16 ギムノディニウム警報・高水温情報",url:SOURCES.kochi,cls:"danger"},{area:"熊本・八代海",state:"発生情報あり",detail:"9/10〜 ヘテロシグマ・アカシオ",url:SOURCES.kumamoto,cls:"danger"},{area:"長崎",state:"速報更新",detail:"2026年の海域別赤潮速報を公開",url:SOURCES.nagasaki,cls:"warn"}];
const news=[{area:"全国",src:"みなと新聞",title:"漁業・養殖 最新記事一覧",date:"随時更新",url:SOURCES.minato},{area:"愛媛",src:"愛媛県",title:"赤潮・貝毒情報",date:"9/17更新",url:SOURCES.ehime},{area:"高知",src:"高知県",title:"宿毛湾 赤潮・水質・高水温情報",date:"9/17掲載",url:SOURCES.kochi},{area:"熊本",src:"熊本県",title:"2026年度 赤潮発生状況",date:"随時更新",url:SOURCES.kumamoto},{area:"長崎",src:"長崎県",title:"2026年 赤潮速報",date:"随時更新",url:SOURCES.nagasaki},{area:"全国",src:"FRA-ROMS II",title:"日本周辺の海況予測（約2か月先）",date:"予報更新",url:SOURCES.fra}];
const tabs=["海況","水温","赤潮","地域トピック","給餌率","給餌サイズ","給餌計算"];let active="海況";
function link(url,label="元データを見る"){return url==="#"?"":`<a href="${url}" target="_blank" rel="noopener">${label}</a>`}
function seaCards(){return `<div class="grid">${sea.map(x=>`<article class="card"><span class="tag">${x.status}</span><h3>${x.area}</h3><div class="temp">${x.temp}</div><div class="muted">${x.at}</div><p>${x.note}</p><div class="links">${link(x.url)}<a href="#" onclick="setTab('水温');return false">水温ページ</a></div></article>`).join("")}</div>`}
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
document.getElementById("app").innerHTML=h}function setTab(t){active=t;render();scrollTo({top:0,behavior:"smooth"})}function filterNews(a,b){document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll("#news [data-area]").forEach(x=>x.style.display=(a==="すべて"||x.dataset.area===a)?"block":"none")}document.getElementById("updated").textContent="v0.1 ・ 2026/9/22";render();