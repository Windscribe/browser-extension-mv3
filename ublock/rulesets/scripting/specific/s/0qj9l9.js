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

// svn-0

const argsList = [{"a":"onl-article-connected,\nonl-banner"},{"a":".banner"},{"a":"onl-magick-box"},{"a":"onl-eurojackpot-teaser"},{"a":".grid--ads,\n.ng-star-inserted > .ng-star-inserted > .sidebar__box,\n.ng-star-inserted.background > .ng-star-inserted > .adplayer,\n.ng-star-inserted.banner--article,\n.sidebar__box--banner,\nonl-voyo.sidebar__box"},{"a":"#Banner300R"},{"a":".widget-ad-bottom-banner"},{"a":".td-a-rec"},{"a":".shop__card.noPaddingAlways.col-md-12,\n.topBanner,\n.topBannerLanding"},{"a":"#coloumnAd,\n#newsOfTheDay,\n#servicesToItems,\n.BannerAlignment,\n.BannerBillboard,\n.EntityList--ListItemFeaturedStore,\n.EntityList--ListItemVauVauAd,\n.HeaderSpotlight:has(a[href^=\"https://bit.ly\"]),\n.trakica_container"},{"a":"#block-block-35,\n#left_click_div,\n#right_click_div,\n.featurebar_right,\n.front_topgames_footer"},{"a":"#sp-pasice,\n#sp-pasice3,\n#sp-user2,\n.bannergroup,\n.editoriali,\n.matej-carousell-left,\n.matej-carousell-right"},{"a":"#html_javascript_adder-2"},{"a":".addthis_toolbox,\n.widget_subscribe_widget"},{"a":"#taw"},{"a":"aside.ad"},{"a":".ad"},{"a":"#contentLeft,\n#contentRight > .leaderboard,\n#playzone > .leaderboard,\n#userGenGames"},{"a":".banner-inner"},{"a":".grid1.rectangle"},{"a":".desktopAd"},{"a":"blockquote"},{"a":"#fixed > .site-banner"},{"a":".microsite-article"},{"a":".microsite-section"},{"a":".outbrain"},{"a":".banner-wr,\n.box-shadow"},{"a":".sideBoxBanner"},{"a":".td-post-sharing-top"},{"a":".td-header-rec-wrap"},{"a":"#nestandard-holder,\n.ban_item,\n.do-space,\n.header-blocks-aspace"},{"a":"[id^=\"pons-ad\"]"},{"a":"#banner"},{"a":"#PR,\n#TB_overlay,\n#TB_window,\n#content-holder > .holder-with-tower-bann > .file-content-holder > .intextAdIgnore.sq829,\n#content-holder > .holder-with-tower-bann > .intextAdIgnore.right-content-holder > .article-view-right-container,\n#content-holder > .holder-with-tower-bann > .intextAdIgnore.right-content-holder > .fl:nth-of-type(8) > .mb10.sq408 > .sq408 > .fs14.channelsSubscribe.fl,\n#content-holder > .intextAdIgnore.mt10.fl,\n#drg1 > .FP-column,\n#drg3 > .fl:nth-of-type(3) > .fl:nth-of-type(4),\n#drg3 > .mb10.sq408,\n#footer > .inner > .container-golden-partners > .text,\n#multimedia > .cm.top.blue-belt-408,\n#multimedia > .text-container,\n#sharebar > li:nth-of-type(4),\n#single-art-text > .fl,\n#subscribe_newsletter"},{"a":".osrednji_del > .poravnajgor:nth-of-type(1),\ntd > table > tbody > tr > td > .poravnajgor > tbody > tr:nth-of-type(1)"},{"a":".box_over_content_9547"},{"a":".re-cta-advertisement"},{"a":"#panels > aside > div:nth-of-type(3),\n#panels > aside > div:nth-of-type(4)"},{"a":"#content > .region-highlighted.region,\n.after-nav-ads"},{"a":".middle > .content > .sidebar > .banner"},{"a":"#content > .contentWrap > .bgContent > .oneCol > .content > .bannerBlocks1 > .colsWrap > .pool.second.col,\n[id^=\"brandedBackground\"]"},{"a":".iAdserver"},{"a":"#biscuitFormDiv"},{"a":"#bannerC1_728,\n#bannerC2,\n.bannerR2"},{"a":"#header-right-section"},{"a":"#heateor_ss_browser_popup_bg"},{"a":".custom-html-widget,\n.g-single,\n.widget-10.widget-last.widget-even"},{"a":".banners-box"},{"a":".BannerBox972,\n.GO-banner-Billboard,\n.Oblika3Container"},{"a":"#desnistolpec,\n#oglas"},{"a":".banner2,\n.banner_cont"},{"a":"#ad-detail,\n#ad-ribbon,\n#top_wrap,\n.ad-container"},{"a":".category > .col-md-3"},{"a":"#lnl-footer,\n.feedo,\n.livenetlife_links,\n.widget_oglas_widget"},{"a":".lwdgt"},{"a":".roglas_lista:nth-of-type(2),\n.roglas_listaBanner"},{"a":".bannerInText,\n.h-banner"},{"a":".bsaProItems"},{"a":"#itisAdPromo,\n#yodaarticle,\n.card--ts_storitva,\n.fold__homepage_banner,\n.grid-12.grid-md-3,\n.grid-12.grid-md-8.grid-lg-3,\n.marketing,\n.neo-image,\n.spored_widget--special > .no-gutter,\n.ts_storitve"},{"a":".wrapper > .col-4"},{"a":".sf-ads_container,\n.sf-panel:nth-of-type(2)"},{"a":"[id^=\"ad\"]"},{"a":"#banner_side_layer,\ndiv.banner_footer"},{"a":"#sidebar-footer > .mosaicflow__column:nth-of-type(4),\n#wppas_custom_widgets-3"},{"a":".background_link"},{"a":".banner-app-article"},{"a":".livenetlife_linkswidget_logo"},{"a":"#baner,\n#banners,\n.uvodna_bottomBaners"},{"a":".xl\\:h-250.h-470"},{"a":".banner-970,\n.td-zsd"},{"a":".td-is-sticky.tdc-column"},{"a":"onl-microsite"},{"a":".floatingProductContainer,\na[href^=\"https://www.ceneje.si/Redirect/Deeplink\"] > .productBoxGrid"},{"a":".sfsi_outr_div"},{"a":"div[class^=\"banner-square-\"]"},{"a":"#banner-seminarji"},{"a":".ekosistem,\n.read-also-block"},{"a":".article__social--top,\n.dfp_banner"},{"a":"#gkSidebar > .nomargin.box"},{"a":"#app-messages,\n.article-related:nth-of-type(2)"},{"a":".opened"},{"a":"#topBanner"},{"a":".lokalnoBox"},{"a":".lg\\:mb-0"},{"a":".module.banner"},{"a":".pattern > .span2,\n.span2:nth-of-type(3) > div"},{"a":"#top_banner"},{"a":".bs-irp-thumbnail-3-full"},{"a":"#bart_banner,\n.adbox,\n.kos_semitrans"},{"a":"#adtopart,\n#top > .nbs-flexisel-container"},{"a":"#article_social_top"},{"a":"#main-column-inner > .kos_semitrans"},{"a":"#article_social_top > .social-line,\n#main-column-inner > .kos_signup"},{"a":"#bannerFooter_wrap,\n.verde_wrap"},{"a":".advertisement"},{"a":".outFrameRight"},{"a":"div[onclick*=\"_blank\"],\ntable[background=\"images/promocije_background.png\"]"},{"a":".banner-top-wrap,\n.banner1"},{"a":"#promo"},{"a":"#fan-exit,\n#fanback"},{"a":".ads"},{"a":".hidden-sm,\n.signad,\n.sticky-position"},{"a":".other"},{"a":".ekode-content-dno"},{"a":".banner--wrapper,\n.content--cta,\n.exposed__banner,\n.region--cta"},{"a":"#doyoulikeus,\n.portus-video-slider-min"},{"a":".banner-scroller,\n.headbanner,\na[target=\"_blank\"][href^=\"http://www.mlacom.si/iskalnik\"]"},{"a":".fancybox-overlay,\n.info-box > .social"},{"a":".style-buttons.before_content"},{"a":"#banner05,\n#skytower,\n.navigatortop,\n.titlered:nth-of-type(4)"},{"a":".nativendo-container,\n.prNews"},{"a":".nat-content"},{"a":".widget-wrapper:nth-of-type(5),\n.widget-wrapper:nth-of-type(6),\n[href=\"https://samopostrezna.com/\"]"},{"a":".obcni-contentexchange,\n.obcni-widget"},{"a":".td-main-sidebar"},{"a":".banner-promotion,\n.banner-wrapper,\n.in-post-related-news,\n.third-party-menu-container"},{"a":".main-first.main > .index_right"},{"a":".sticky-wrapper"},{"a":".widget_custom_html"},{"a":".bannerbox,\n.box2,\n.dadbot,\n.dadmid,\n.dadtop,\n.rightb300600,\n.top728,\n[src=\"https://www.partis.si/img/pixel.gif\"]"},{"a":"#startPageRightLabel,\n#startPageRightResults"},{"a":".reklame-na-sredi,\n[id^=\"reklama\"]"},{"a":"#izpostavljeni,\n#show > .ban_item,\n#show > div > div > .ban_item,\n.image_carousel_post > [href^=\"/show//\"],\n.lightface,\n.widget-shop"},{"a":"#maincontent > .nospace > tbody > tr > td > .moduletable"},{"a":".external_wall_right_wrapper"},{"a":"#ctl00_Radio1Vsebina_LabelEPP288x240,\n#divBannerjiDesnoZunaj > .presledek:nth-of-type(1),\n#divBannerjiDesnoZunaj > .presledek:nth-of-type(13),\n#divBannerjiDesnoZunaj > .presledek:nth-of-type(3),\n#divBannerjiDesnoZunaj > .presledek:nth-of-type(6),\n#divBannerjiDesnoZunaj > .presledek:nth-of-type(8),\n#divBannerjiDesnoZunaj > .reklamaDesnoZunaj,\n#page > center > .telo > .teloCenter > .mainLevo > div:nth-of-type(12),\n#page > center > .telo > .teloCenter > .mainLevo > div:nth-of-type(13),\n#slideshowEPPGLii"},{"a":".banner-box,\n[src^=\"//tdn.media24.si\"]"},{"a":"[id^=\"plista_widget\"],\nbody > .container_12 > .wrapper > .grid_8 > .no-min-height > div > .newsDescription:nth-of-type(7),\nbody > .container_12 > .wrapper > .grid_8 > .p1 > .banner_700_125,\nbody > .container_12 > .wrapper > .grid_8 > .t1 > .banner_700_125,\nbody > .container_12 > .wrapper > .prefix_1 > .right2.t1"},{"a":"#rightframe > div"},{"a":"#sharebar"},{"a":"#rightframe > div:nth-of-type(2),\n#rightframe > div:nth-of-type(5)"},{"a":"#rightframe > div:nth-of-type(1)"},{"a":"#rightframe > div:nth-of-type(3),\n#rightframe > div:nth-of-type(4)"},{"a":"#content > .ng-scope > .ng-scope.home > .facebook,\n#content > .ng-scope > .ng-scope.home > header > .clearfix.container > .banners,\n#content > .ng-scope > .ng-scope.static > .facebook"},{"a":"#DivShowBanners,\n#DivShowBannersForFrontPage,\n#bglink"},{"a":"#newsletter-popup-unsigned,\n.billboard-advert-item,\n.dynamic-advert-article-inside,\n.inArticle,\n.inverted-colors.teal.emphasis,\n.iprom-background-placement"},{"a":"#headerLightHolder,\n#topa"},{"a":"[id^=\"firstSiteBanner\"]"},{"a":"#banner160,\n#bigHotArticle > .content > .social-networks:nth-of-type(1),\n#fanbackshade,\n#fbpopup,\n#main > div > aside"},{"a":".advertise"},{"a":"#content > .main > .bm_bottom.banner_main > .moduletable_pasica,\n#content > .sidebar > .moduletable_pasica"},{"a":"body > .bannerPool"},{"a":".embed_article,\n.group_a__box7,\n.group_a_category__box7"},{"a":"table > tbody > tr > td:nth-of-type(3),\ntable > tbody > tr > td:nth-of-type(4)"},{"a":"#content_inner > .content_table > tbody > tr > td:nth-of-type(3)"},{"a":"#center > .leadlist > .banners"},{"a":".news-banner,\ndiv > .side-banner"},{"a":"#ctl00_bannersCont"},{"a":"#avcn_wrapperInner"},{"a":".bg-najnakupi-blue-light,\n.najnakupi,\n.najnakupi-news,\n.right-sticky,\n.shadow-md.w-tk"},{"a":".main-left > .fpNews-title,\n.my-4 > .flex-wrap"},{"a":".add-title"},{"a":".clearfix.ai_widget"},{"a":"#banner01r,\n#footboxes,\n#topbanner"},{"a":".wallpaper--active"},{"a":"[id^=\"pukka-ad-widget-\"]"},{"a":"#banner_container,\n.baner"},{"a":"[id^=\"oglasi\"]"},{"a":"#content > .wrap > .sec_1 > .post_container > .content > .news_post > div:nth-of-type(7),\n#content > .wrap > .sec_2 > .sidebar_container:nth-of-type(1),\n#content > .wrap > .sec_2 > .sidebar_container:nth-of-type(2),\n#content > .wrap > .sec_2 > .sidebar_container:nth-of-type(7),\n#header > .wrap > .banner_container"},{"a":".border-grey-light.sidebar > .border-grey-light"},{"a":"#banner45,\n#facebook,\n#facebook-like,\n#header-banner,\n#wrapper > a[href^=\"http://www.volan.si/admin/upload/ads\"],\na[href^=\"https://www.volan.si/admin/upload/ads/generator.php\"]"},{"a":"#exposed > .container > .padder > .fixator > .c3 > .size2.box"},{"a":"[id^=\"post\"] > .article-content > .mashsb-main.mashsb-container"},{"a":".hupso-share-buttons"},{"a":".widget_ads_big.widget"},{"a":".related_article"},{"a":"#RightBanner"}];

const hostnamesMap = new Map([["24ur.com",[0,1,2,3,4]],["moskisvet.com",[0,2,23,24,25,26]],["okusno.je",[0,23,24]],["bibaleze.si",[0,23,24,68]],["cekin.si",[0,1,2,3,23,25,71]],["dominvrt.si",[0,23,68,83]],["vizita.si",[0,23,24,159]],["zadovoljna.si",[0,1,2,23,24]],["vreme.24ur.com",1],["napovednik.com",1],["studentarija.net",[1,62]],["mojaleta.si",[1,110]],["svet24.si",[1,54,149]],["tehnik.telekom.si",1],["avtomanija.com",5],["avtomanija.si",5],["avtomobilizem.com",6],["avtonasveti.com",7],["mojprihranek.si",[7,113]],["bicikel.com",8],["naprostem.si",8],["tekac.si",8],["bolha.com",9],["bringler.com",10],["dnevne-novice.com",11],["dne.enaa.com",12],["lifestyle.enaa.com",13],["google.com",14],["google.si",14],["hudo.com",[15,16]],["mladina.si",[16,107]],["vreme.zurnal24.si",16],["igrice.hudo.com",17],["mojepotovanje.hudo.com",[18,19]],["moski.hudo.com",[19,20]],["zenska.hudo.com",[20,21]],["med.over.net",[21,53,54]],["shop.kapodol.com",22],["nogomania.com",27],["planet-lepote.com",[28,29]],["pravljicna.si",28],["utrinek.si",28],["zdravje.si",28],["pomurec.com",30],["pons.com",31],["poraba.com",32],["slo-tech.com",[32,37]],["www.racunalniske-novice.com",33],["racunovodja.com",34],["scoreboard.com",35],["nepremicnine.si21.com",36],["sobotainfo.com",38],["www.strojnistvo.com",39],["www.studentski-servis.com",40],["vecer.com",41],["slovnica.slovenscina.eu",42],["avto.info",43],["celje.info",[44,45]],["svetopismo.si",45],["kozjansko.info",46],["adomnia.net",47],["avto.net",48],["hribi.net",49],["mediaspeed.net",50],["nepremicnine.net",51],["obala.net",52],["n1info.si",[54,115]],["porscheinterauto.net",55],["ringaraja.net",56],["sentjur.net",57],["siol.net",58],["tv-spored.siol.net",59],["slo-foto.net",60],["www.slonep.net",61],["www.tekaskiforum.net",63],["1nadan.si",64],["aktivni.si",[65,66]],["slovenskenovice.si",[66,142]],["avto-fokus.si",67],["bizi.si",69],["bodieko.si",70],["ceneje.si",72],["ciklon.si",73],["citymagazine.si",74],["data.si",75],["delo.si",76],["svetkapitala.delo.si",77],["demokracija.si",78],["dnevnik.si",79],["dobrakarma.si",[80,81]],["podarimo.si",[81,120]],["dolenjskilist.si",82],["druzina.si",84],["e-mesto.si",85],["enajdi.si",86],["explicit.si",87],["finance.si",88],["izvozniki.finance.si",[89,90]],["startaj.finance.si",[90,91]],["www.startaj.si",90],["topjob.finance.si",92],["gohome.si",93],["golfportal.si",94],["informiran.si",95],["instore.si",96],["kajkupiti.si",97],["kolosej.si",98],["kosmika.si",99],["lepdan.si",100],["letakonosa.si",101],["lokalno.si",102],["lupa-portal.si",103],["marketingmagazin.si",104],["megasvet.si",105],["mlacom.si",106],["mladipodjetnik.si",108],["mobile.si",109],["mojaobcina.si",111],["mojblink.si",112],["motiviran.si",114],["najdi.si",116],["namen.si",117],["novice.si",118],["partis.si",119],["podjetnik.si",121],["pokukaj.si",122],["preberi.si",123],["publishwall.si",124],["radio1.si",125],["radiokrka.si",126],["www.regionalobala.si",127],["revijaavenija.si",[128,129]],["www.revijamaja.si",[129,130]],["www.revijavklop.si",[129,131]],["www.revijazarja.si",[129,132]],["revijazvezde.si",133],["rfantasy.si",134],["rtvslo.si",135],["rumenestrani.si",136],["salomon.si",137],["www.sensa.si",138],["skandal24.si",139],["slo-android.si",140],["www.slo-zeleznice.si",141],["www.solazazivljenje.si",143],["www.ss-mb.si",144],["sta.si",145],["stajerskival.si",146],["stop-neplacniki.si",147],["www.super-obrok.si",148],["ekipa.svet24.si",150],["t3tech.si",151],["tehnozvezdje.si",152],["www.tocnoto.si",153],["tvambienti.si",154],["www.vandraj.si",155],["varcevanje-energije.si",156],["vemkajjem.si",157],["www.viva.si",158],["volan.si",160],["www.vsikuponi.si",161],["zastarse.si",162],["zdravi-recepti.si",163],["zenskisvet.si",164],["zurnal24.si",165],["spored.tv",166]]);

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
