/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2019-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

/* jshint esversion:11 */

'use strict';

/******************************************************************************/

/// name css-specific

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssSpecific() {

/******************************************************************************/

// cze-0

const argsList = [{"a":"[class*=\"sda\"]:not(.post-content)"},{"a":"div.banner_position"},{"a":"#banner-left-pane,\n#banner-top-four,\n#sportObchodBanner,\ndiv.bannerHolderZapasRight"},{"a":"#branding_anchor_left,\n#branding_anchor_right,\n.adtea_inpage,\n.adtea_leaderboard"},{"a":".amalker"},{"a":"#pagefoot"},{"a":"#tblHorniLista"},{"a":".native-ads"},{"a":".wpa.top"},{"a":".banner-header"},{"a":"#biglink"},{"a":"#content-right > div[style]:first-of-type"},{"a":"#header-banner"},{"a":"#leva-reklama"},{"a":"#content-lead,\ndiv.sky-wrapper"},{"a":"#header-reklama,\n.side-bann-l,\n.side-bann-r"},{"a":".rklh"},{"a":".banner2,\n.wrap + div:not(#footer)"},{"a":".ads"},{"a":".square_banner"},{"a":"#skyscraper"},{"a":"#sideScrapperLayout,\ndiv[id*=\"Banner\"]"},{"a":"#js-branding,\ndiv[id^=\"czech-\"]"},{"a":"#pr-prace-blok-view,\ndiv.block-jobs-link,\ndiv[class*=\"openx-async\"]"},{"a":"[id^=\"hyperbox\"]"},{"a":".box-offer"},{"a":".cornerbox,\n.heurekaIframeHeader"},{"a":"div#td-outer-wrap > div.td-container"},{"a":".ad-obal"},{"a":".box-banner"},{"a":".widget-group-2 li:has(div.ad-pmg)"},{"a":".r-main"},{"a":"div[class^=\"reklama\"]"},{"a":"div#highlitesAds"},{"a":".layoutTop"},{"a":"#g-top-bannery"},{"a":"#topSite,\n.gallery-advertisement"},{"a":".intent-exit-box.l-row,\n.js-popup-quest.intent-exit-popup--quest.intent-exit-popup,\ndiv[class*=\"adcontainer\"]"},{"a":".adsense,\n.leaderboard,\n.seriesadvert,\n.skyscraper"},{"a":".banner"},{"a":"#r-leaderboardhp"},{"a":"#fancybox-overlay,\n#h_part_right"},{"a":"#t-content"},{"a":".topbanner"},{"a":"div[id^=\"ad-leaderboard\"]"},{"a":".advert"},{"a":"#invelt"},{"a":"div.klik--leaderboard"},{"a":"#blackfooter"},{"a":".topbanners"},{"a":"#box.mb,\n.arr-red"},{"a":"#ahead"},{"a":"#stOverlay,\n.promobox"},{"a":"div._banner"},{"a":"div.ogm-branding > div > div"},{"a":"div.bottom-partners"},{"a":"div.container.partners"},{"a":".filtr.category-partner,\ndiv[class$=\"advert\"],\ndiv[class*=\"__banner\"]"},{"a":"[class*=\"sda-\"]"},{"a":".TopFullBanner"},{"a":"div[id^=\"hyper\"]"},{"a":"[class*=\"r-main\"]"},{"a":"div.advert-leader-board-container"},{"a":".mone_box"},{"a":".reklama-background"},{"a":"#social"},{"a":".bannLead"},{"a":"[class*=\"ad_\"]"},{"a":".rleft,\n.rright,\n.tree"},{"a":"div[id^=\"banner\"]"},{"a":".ad"},{"a":".v-card.mb-6"},{"a":"[class*=\"pаrtner\"],\na[rel=\"sponsored\"]"},{"a":".top_background"},{"a":"#z990x200,\n#zr300x600,\n[id^=\"adv_\"],\na[href*=\"utm_campaign=kurzy_\"],\niframe[src^=\"https://img.kurzy.cz/og\"]"},{"a":".square"},{"a":"#box-over-content-a"},{"a":".design-advert-placeholder,\n.design-box--jobs,\ndiv.article--content:has(div.design-advert)"},{"a":"#box-3,\n#rbackground-link,\ndiv[id*=\"reklama\"]"},{"a":".banns-group"},{"a":"#block-nodesinblock-0"},{"a":".header_banner"},{"a":"div[id^=\"mp_banner_\"]"},{"a":".scroll_banner"},{"a":".banner,.left-side-banner,.right-side-banner,\na[trgurl],a[href*=\"relocate.php\"],\ndiv:has( > a[href*=\"?act=detail&f=8\"])"},{"a":".komerce"},{"a":".npab"},{"a":"[class*=\"advertisement\"]"},{"a":"pp"},{"a":".right"},{"a":"div[style^=\"float:left;width:468px;\"] + img[src^=\"data:image/gif;base64,\"]"},{"a":".advtick"},{"a":"a[class^=\"levakolejroku\"],\na[class^=\"pravakolejroku\"]"},{"a":"#leaderBox,\n.sticky-wrapper"},{"a":"#fixedMenu,\n#rek3,\n#rodkaz"},{"a":".body_message--ad"},{"a":".roumingLista"},{"a":"#pvMid"},{"a":"a[href^=\"https://prehrajto.cz/?cc=prlbmso2\"]"},{"a":".mid-lead-hp"},{"a":"div[data-e-b-n*=\"advert\"],\ndiv[data-e-b-n*=\"sklik\"]"},{"a":"div[class^=\"branding-ad\"]"},{"a":"div.ad-exclusive,\ndiv.dragging-enabled:has(div.gadget--reklama),\ndiv.ogm-sticky-repeater"},{"a":"a[href*=\"track.smartmania.cz\"]"},{"a":"#P_reklama_horni,\n.reklamni_sdeleni,\n.rs_reklama,\n[style=\"vertical-align:middle; text-align: left; width: 139px;\"]"},{"a":".mabo.faa,\n[style=\"width:960px;margin:0 auto;text-align:left\"]"},{"a":"a[data-dot=\"c_pozadi\"],\na[data-dot=\"hp_pozadi\"],\ndiv.ad"},{"a":"#ad"},{"a":".bbtitle"},{"a":"#vyjizdeciBoxikDiv"},{"a":".sidebar-banner,\n.skyscrapper-right"},{"a":".branding-link"},{"a":".banner-brand"},{"a":".center,\nobject[id*=\"bfad\"]"},{"a":"#adLocation-21,\n#popwrapper,\n#t-overlay,\n.row0,\na[href=\"http://acu.cz\"],\nh3"},{"a":"[class^=\"ws-banner-\"]"},{"a":".SkyLeft.Banner"},{"a":"div.main-top,\ndiv.site-reklama"},{"a":".bannero2"},{"a":"#branding_conts,\n#floatad,\n#headertopbanner,\n.headerbanner"},{"a":"#aa1"},{"a":"div[style*=\"position:absolute;\"]"},{"a":"div[id][style=\"position: absolute; top: 0; left: 0; width: 100%; height: 380px; text-align: center;\"]"},{"a":".c_banner300x300"},{"a":"div[class^=\"banner_box\"]"},{"a":"a[href=\"http://www.Onlinefilmy.eu\"],\na[href=\"http://www.movieportal.eu\"],\ndiv[style=\"font-size:20px; font-family:Arial Black, Arial; color:#FF0000; font-weight:bold\"]"},{"a":"div[id^=\"ad\"]"},{"a":"div[class*=\"pohodoWidget\"]"},{"a":"a.predpredaj-black"},{"a":".h2.grad2.kupons_games"},{"a":".header_info_text"},{"a":".s-branding,\n[id^=\"banner-\"],\ndiv[style*=\"Roboto\"][style*=\"fixed\"],\nstripemark"},{"a":"[id^=\"back\"][onclick]"},{"a":"#footer,\n#headerSlideContent1,\n#ocko"},{"a":"[id^=\"mk-branding-\"]"},{"a":"#brnd"},{"a":"a[href*=\"trackBannerAd\"]"},{"a":"iframe[data-src^=\"/default-ad\"]"},{"a":"#top-offers-slider,\n.addbox.avizo,\n.box_advertisment.addbox.recycle,\n.nastip,\n.takeoverKlik"},{"a":".gate-advert-wrap"},{"a":".dragobj > div:nth-of-type(2),\n.stn.stns > a[target=\"_blank\"],\n.stn.stnu > a[target=\"_blank\"]"},{"a":".content-item:has(.header a[href^=\"/reklama/\"])"},{"a":"a[href^=\"https://boxu.sk\"]"},{"a":".post.bg5"},{"a":".overlay,\na[class^=\"tv-\"]"},{"a":".banner-under,\n.product-ad-wrapper,\n.sqaure-mobile-ad"}];

const hostnamesMap = new Map([["grunex.com",0],["kamsdetmi.com",1],["onlajny.com",2],["programujte.com",3],["tipcars.com",4],["titulky.com",5],["war4all.com",6],["zmeskanyhovor.com",7],["365tipu.cz",8],["appliste.cz",9],["serialzone.cz",[9,99]],["autobazar.cz",10],["autoforum.cz",[11,12]],["wmmania.cz",12],["autohit.cz",13],["autorevue.cz",14],["e15.cz",[14,36]],["maminka.cz",14],["mobilmania.cz",14],["zive.cz",14],["autosport.cz",15],["autoweb.cz",16],["autozine.cz",17],["isport.blesk.cz",18],["evropa2.cz",18],["filmporno.cz",[18,49]],["businessworld.cz",[19,20]],["computerworld.cz",[19,20,28]],["pcworld.cz",20],["busportal.cz",21],["cc.cz",22],["cdr.cz",23],["diit.cz",23],["ceskenoviny.cz",[24,25]],["nasepenize.cz",25],["cesky-jazyk.cz",26],["cnews.cz",27],["csfd.cz",[29,30]],["csfd.sk",29],["databazeknih.cz",31],["denik.cz",32],["dotekomanie.cz",33],["drbna.cz",34],["e-mostecko.cz",35],["info.cz",36],["echo24.cz",37],["edna.cz",[38,39]],["in-pocasi.cz",39],["webtrh.cz",39],["centrum.sk",[39,129]],["emimino.cz",40],["esemes.cz",[41,42]],["warforum.cz",[42,114]],["estav.cz",43],["euro.cz",44],["eurogamer.cz",45],["pravopisne.cz",45],["pravopisne.sk",45],["ewrc.cz",46],["extra.cz",47],["fdb.cz",48],["finance.cz",[50,51]],["motoforum.cz",51],["firstclass.cz",52],["fotoaparat.cz",53],["garaz.cz",54],["prozeny.cz",54],["seznamzpravy.cz",54],["hcdukla.cz",55],["hcmotor.cz",56],["heureka.cz",57],["heureka.sk",57],["hrej.cz",58],["pctuning.cz",58],["tryhard.cz",58],["zing.cz",58],["hybrid.cz",59],["idnes.cz",[60,61]],["lidovky.cz",[60,61]],["modnipeklo.cz",61],["idos.idnes.cz",62],["cnn.iprima.cz",63],["itnetwork.cz",64],["jaknaletenky.cz",65],["kaloricketabulky.cz",66],["karaoketexty.cz",67],["kladenskelisty.cz",68],["kniha.cz",69],["konzolista.cz",[70,71]],["topky.sk",[70,138]],["tvtv.sk",[70,141]],["krimi-plzen.cz",72],["kupi.cz",73],["kurzy.cz",74],["lamer.cz",75],["moda.cz",75],["livesport.cz",76],["lupa.cz",77],["root.cz",77],["matematika.cz",78],["mediar.cz",79],["medop.cz",80],["menicka.cz",81],["meteoprog.cz",82],["mladypodnikatel.cz",83],["motorkari.cz",84],["mrk.cz",85],["nasepraha.cz",86],["netconcert.cz",87],["onlymen.cz",88],["osel.cz",89],["parabola.cz",90],["pravidla.cz",91],["primat.cz",92],["reflex.cz",93],["ronnie.cz",94],["forum.root.cz",95],["rouming.cz",96],["sauto.cz",97],["serialycz.cz",98],["clanky.seznam.cz",100],["search.seznam.cz",100],["tv.seznam.cz",101],["www.seznam.cz",102],["smartmania.cz",103],["sms.cz",104],["stesti.cz",105],["super.cz",106],["login.szn.cz",107],["tiscali.cz",108],["topzine.cz",109],["tvfreak.cz",110],["uschovna.cz",111],["vortex.cz",112],["warezforum.cz",113],["webshare.cz",115],["zakonyprolidi.cz",116],["zena-in.cz",117],["autobazar.eu",118],["letemsvetemapplem.eu",119],["libise.eu",120],["sktorrent.eu",121],["serialy.io",122],["pokec.azet.sk",123],["behame.sk",124],["best4you.sk",125],["bmwklub.sk",126],["cas.sk",[127,128]],["feminity.zoznam.sk",127],["dsl.sk",130],["hnonline.sk",131],["kinema.sk",132],["sector.sk",[132,137]],["michalovskespravy.sk",133],["modrykonik.sk",134],["mojevideo.sk",135],["mtbiker.sk",136],["touchit.sk",139],["tv-program.sk",140],["zoznam.sk",142],["pretaktovanie.zoznam.sk",143],["najserialy.to",144],["mall.tv",145]]);

/******************************************************************************/

let hn;
try { hn = document.location.hostname; } catch(ex) { }
const styles = [];
while ( hn ) {
    if ( hostnamesMap.has(hn) ) {
        let argsIndices = hostnamesMap.get(hn);
        if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
        for ( const argsIndex of argsIndices ) {
            const details = argsList[argsIndex];
            if ( details.n && details.n.includes(hn) ) { continue; }
            styles.push(details.a);
        }
    }
    if ( hn === '*' ) { break; }
    const pos = hn.indexOf('.');
    if ( pos !== -1 ) {
        hn = hn.slice(pos + 1);
    } else {
        hn = '*';
    }
}

argsList.length = 0;
hostnamesMap.clear();

if ( styles.length === 0 ) { return; }

try {
    const sheet = new CSSStyleSheet();
    sheet.replace(`@layer{${styles.join(',')}{display:none!important;}}`);
    document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        sheet
    ];
} catch(ex) {
}

/******************************************************************************/

})();

/******************************************************************************/
