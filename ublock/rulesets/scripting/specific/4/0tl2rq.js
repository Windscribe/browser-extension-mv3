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

// default

const argsList = [{"a":".middle-leaderboard"},{"a":"#stickyFooterRoot"},{"a":"div[class*=\"Ad__Wrapper-\"],\ndiv[class*=\"TopBanner_\"]"},{"a":".inews__advert,\n.inews__mpu,\n.thanks-3xsWr"},{"a":".cvads"},{"a":".Banner"},{"a":".DMPU"},{"a":".LeaderBack"},{"a":".banner_long"},{"a":"#vTXbybUFn,\n.videoContainer"},{"a":"#connatix_placeholder_desktop,\n#taboola-feed-container,\n#we-need-monies,\n.ad-slot-container,\n.metro-discounts,\n.metro__ad_area_left,\n.metro__ad_area_right"},{"a":"#comments-standalone-mpu,\n#roffers-top,\n.shopwindow-adslot,\n.shopwindow-advertorial"},{"a":".js-banner-strip"},{"a":".is-sticky"},{"a":"#rr-amazon"},{"a":".site-header-ad-notification"},{"a":"#inline-01,\n#inline-02,\n#inline-03"},{"a":"a[href^=\"https://www.easyfundraising.org.uk\"]"},{"a":"#photographsforeverDiv"},{"a":".byglhsmf,\n.sidebar-column-secondary > .sidebar,\n.supportHideBack,\n[href^=\"http://go.radiotoday.co.uk/\"]"},{"a":".boxzilla-popup-advert"},{"a":"#propertyplayer,\n._2X2laxgNfgPGfZQTFoPUsd,\n._3G_zutXOLAwgpG1cvkF6ii,\n.creative"},{"a":".homepage-banner-container"},{"a":"#footer-banner"},{"a":"#thirdparty_03_parent,\n.dXaqls"},{"a":".dc-leaderboard"},{"a":".css-17xu4dw,\n.css-1fz837r,\n.css-8me5ln,\n.css-rybqcx"},{"a":".Advertisement"},{"a":"div[id^=\"comp-\"][class^=\"_\"] > div[class^=\"_\"][style^=\"padding-left\"]"},{"a":".commercial-unit"},{"a":"#sidebar > div[style],\n.a-text,\n.adb_top"},{"a":".tftce-adlabel"},{"a":".bnr_out"},{"a":".gOoqzH"},{"a":".dpa-slot"},{"a":".responsiveweb-sc-1exejum-0,\n[class*=\"responsiveweb__NativeAd\"]"},{"a":"#fiveDealsWidget,\n.button-style > [href],\n.cnr5,\n.mol-fe-vouchercodes-puff"},{"a":".skys-right"},{"a":".werbung-skyscraper,\n[referrerpolicy]"},{"a":".vjs-ad-control-bar.vjs-control-bar"},{"a":".banner_oben"},{"a":".dart-tag"},{"a":".ipsAdvertisement_large,\n[href=\"https://thrivewp.com/\"],\na[href^=\"https://windowcleaningforums.co.uk/index.php?\"][target=\"_blank\"]"},{"a":".bannerContainer"},{"a":"[href^=\"https://inidekil.com\"]"},{"a":"[href=\"https://www.eplsite.uk/vm.html\"]"},{"a":"#ad3,\n.imt4"},{"a":".place-wink,\n.sticky-elem"},{"a":".content-lightbox,\n.overlay-lightbox"},{"a":".content > iframe"},{"a":"[id^=\"ad-desktop-bottom\"]"},{"a":"[href^=\"http://deloplen.com/\"]"},{"a":".google-adsense"},{"a":"#phgviewportconditional_57069"},{"a":".panel-danger"},{"a":".afc_popup"},{"a":".MuiPaper-root.jss12,\ndiv[style^=\"z-index: 1100; position: fixed;\"]"},{"a":".dkpw-abp"},{"a":"[id*=\"-banner-\"][class*=\"-banner\"]"},{"a":".video_box"},{"a":"#container > div[id] > div[id][style*=\"z-index:\"]"},{"a":".vertbars"},{"a":"[href^=\"https://1frozenthrone1.com\"],\n[href^=\"https://runreferences.com\"]"},{"a":".idmuvi-center-ads"},{"a":".pm-ads-banner"},{"a":"div[style^=\"width:320px\"]"},{"a":"[class^=\"ProductList__Wrapper\"] > div"},{"a":"[href^=\"//mellowads.com\"],\niframe[src*=\"mellowads.com\"]"},{"a":"div[style^=\"width:300px;height:250px\"]"},{"a":"#cookie-pop"},{"a":"[class^=\"sticky-ad\"]"},{"a":".wrapper > .section > .container > .row > div.d-md-block.d-none.col-md-3"},{"a":".banner_center,\ndiv[style=\"height:250px;overflow:hidden;\"]"},{"a":".releated_video[style^=\"overflow: hidden;\"]"},{"a":".past"},{"a":".bottom-block,\n.spots-bottom"},{"a":".rsidebar-spots-holder"},{"a":"[data-ad-slot]"},{"a":"#stream-banner,\ndiv[style^=\"z-index: 999999; background-image: url(\\\"data:image/gif;base64,\"][style$=\"position: absolute;\"]"},{"a":".f-inner"},{"a":"[src^=\"https://4kporn.xxx/player/html.php?aid=pause_html\"]"},{"a":".side_flash,\n[class^=\"leaderboard\"],\n[id*=\"tvadbody\"],\n[id^=\"center\"] .I:has( > [class=\"\"][href])"},{"a":".embedright"},{"a":"#float-video"},{"a":".pause-ad-pullup,\n.zpot-horizontal,\n.zpot-vertical"},{"a":".spot3-holder"},{"a":".vrav_a_pc"},{"a":".footer.spot,\n.spot.column"},{"a":"#sponsor-widget,\n.header-panel-1,\n.video-filter-1"},{"a":".bn-title,\n.top_spot"},{"a":".widget:not(#text-2)"},{"a":".bann3rss,\n.footer-iframe"},{"a":".spots-title"},{"a":"#halloween,\n#right-col > div > #lbot1.a_list,\n[src^=\"https://rule34.xxx/aa/\"],\na[href*=\".html\"]"},{"a":"div.vda-x2.vda-item"},{"a":".bottom_spots,\n.box_site,\n.spots_field,\n.top-cube"},{"a":".fel-item"},{"a":".aside-spots,\n.bottom-spots"},{"a":".sug-bnrs"},{"a":".gallery-link,\n.thumb_banner"},{"a":"#submitBtn + p,\ncenter + p"},{"a":"[class^=\"resp-container\"]"},{"a":"#showContainer,.textfk"},{"a":".blox"},{"a":".popupfancy > div"},{"a":"[href^=\"https://faucetpay.io/\"]"},{"a":"center > div.row"},{"a":"#random_728_top"},{"a":".code-block-1.code-block"},{"a":"center > div[class][style=\"width:320px;height:50px;display: inline-block;margin: 0 auto\"]"},{"a":"#sidebar-primary > .widget_custom_html,\n#sidebar-secondary > .widget_custom_html"},{"a":".BannerContainer,\n.BannerMain"},{"a":".BannerContainerScrapper"},{"a":"#overlay-ads"},{"a":"[href=\"https://zlink.tk/\"]"},{"a":"#header-wrap-reklama"},{"a":".happy-header,\n[href^=\"https://www.saltycams.com\"],\nsection.korea-widget"},{"a":"[href=\"http://toplivesexcams.net\"]"},{"a":"a[href^=\"https://bicugesi.xyz/\"],\ndiv.BannerContainerScrapper,\ndiv[id^=\"random_300_\"]"},{"a":".active.bnsLayers.is-block-touch.is-grid > .col_12.article-center"},{"a":"#sticky-ads"},{"a":"#banner1zx"},{"a":"[href^=\"https://a-ads.com\"]"},{"a":"div[id^=\"speedynews_\"]"},{"a":"[href=\"https://fcstream.com/banniere.html\"],\n[href^=\"/go.php\"]"},{"a":"#app"},{"a":"#after-ad,\n#before-ad"},{"a":".TopBanner"},{"a":"#partners_container,\n.partnersheading"},{"a":".article-da"},{"a":"#home-leaderboard,\n#sidebar-primary,\n.homepage-300x250-banner"},{"a":".section-article-sponsored"},{"a":".sidepromo"},{"a":"#endorsers"},{"a":".header__banner"},{"a":".bDEZXQ"},{"a":".itw-content-zone,\n.s-logos,\na[href*=\"/adclick.php?\"]"},{"a":".content-section-left"},{"a":".itunes-sml"},{"a":"#mycarousel"},{"a":".box-sponsored"},{"a":".banner-bg"},{"a":".branding-sponsor"},{"a":"#elementor-popup-modal-89385,\n.elementor-48612,\n.wppopups-whole,\na[data-wpel-link=\"external\"]"},{"a":".banner-bar,\n.banner-bar-bot"},{"a":".spnsorhome"},{"a":"#adz"},{"a":".header-pub"},{"a":".searcad"},{"a":"#soccer24-ad"}];

const hostnamesMap = new Map([["ibtimes.co.uk",0],["independant.co.uk",1],["standard.co.uk",[1,24]],["independent.co.uk",2],["inews.co.uk",3],["jobhits.co.uk",4],["jobs24.co.uk",5],["johnogroat-journal.co.uk",6],["kentonline.co.uk",7],["livecharts.co.uk",8],["macworld.co.uk",9],["metro.co.uk",10],["mirror.co.uk",11],["newsnow.co.uk",12],["osmanonline.co.uk",13],["parentdish.co.uk",14],["parkers.co.uk",15],["planetradio.co.uk",16],["pooletown.co.uk",17],["radiocaroline.co.uk",18],["radiotoday.co.uk",19],["retailgazette.co.uk",20],["rightmove.co.uk",21],["smallbusiness.co.uk",22],["spectator.co.uk",23],["startups.co.uk",25],["stylist.co.uk",26],["suffolknews.co.uk",27],["taxi-point.co.uk",28],["telegraph.co.uk",29],["tellymix.co.uk",30],["tftcentral.co.uk",31],["thecompleteuniversityguide.co.uk",32],["thestar.co.uk",33],["thesun.co.uk",34],["thetimes.co.uk",35],["thisismoney.co.uk",36],["traditionalmusic.co.uk",37],["transfermarkt.co.uk",38],["uktvplay.uktv.co.uk",39],["weatheronline.co.uk",40],["webuser.co.uk",41],["windowcleaningforums.co.uk",42],["zoover.co.uk",43],["danc.uk",44],["eplsite.uk",45],["exchangerates.org.uk",46],["xxxxvideo.uno",47],["www.uol",48],["adfoc.us",49],["forum.gigabyte.us",50],["mitly.us",51],["onehack.us",52],["publicholidays.us",53],["tpblist.us",54],["tv247.us",55],["tvtv.us",56],["weather.us",57],["za.uy",58],["watchanime.video",59],["wstream.video",60],["xnxxporn.video",61],["1link.vip",62],["atishmkv.marathi.vip",63],["reallifecam.vip",64],["reallifecamsex.xyz",64],["nerdy.vn",65],["tiki.vn",66],["toplevelfaucet.website",67],["bigbtc.win",68],["curto.win",69],["firefaucet.win",70],["freebitcoin.win",71],["9anime.work",72],["jav.work",73],["freeporn.works",74],["elephanttube.world",[75,76]],["pornid.xxx",76],["poring.world",77],["strdef.world",78],["film01stream.ws",79],["4kporn.xxx",80],["69games.xxx",81],["borwap.xxx",82],["cam-video.xxx",83],["fapnado.xxx",84],["finevids.xxx",85],["hentaihaven.xxx",86],["homo.xxx",87],["megatube.xxx",88],["ok.xxx",89],["playsexgames.xxx",90],["pornburst.xxx",91],["rat.xxx",92],["rule34.xxx",93],["see.xxx",94],["sexvid.xxx",95],["sss.xxx",96],["teenpornvideo.xxx",97],["tporn.xxx",98],["youx.xxx",99],["123lnk.xyz",100],["22pixx.xyz",101],["adnit.xyz",102],["animexin.xyz",103],["aplayer.xyz",104],["btcleets.xyz",105],["ccsl.xyz",106],["crypto-faucet.xyz",107],["descarga.xyz",108],["driveddl.xyz",109],["filmyhitlink.xyz",110],["freebitz.xyz",[111,112]],["mcmfaucets.xyz",[111,118]],["fstream365.xyz",113],["gamingfactor.xyz",114],["gledajcrtace.xyz",115],["koreanstreamer.xyz",116],["longporn.xyz",117],["mgnet.xyz",119],["paidappstore.xyz",120],["phoenixfaucets.xyz",121],["ravenmanga.xyz",122],["speedynews.xyz",123],["streamonfoot.xyz",124],["techthematter.xyz",125],["thuthuatmoi.xyz",126],["algoafm.co.za",127],["arrivealive.co.za",128],["businesslive.co.za",129],["carmag.co.za",130],["dispatchlive.co.za",131],["sowetanlive.co.za",131],["ee.co.za",132],["energyforecastonline.co.za",133],["gautengnewspaper.co.za",134],["iol.co.za",135],["itweb.co.za",136],["jmail.co.za",137],["tsamail.co.za",137],["webmail.co.za",137],["kfm.co.za",138],["mediaupdate.co.za",139],["mybroadband.co.za",140],["pretoria.co.za",141],["primedia.co.za",142],["sashares.co.za",143],["schoolguide.co.za",144],["sundayworld.co.za",145],["thebugle.co.za",146],["times.co.zm",147],["userscript.zone",148],["soccer24.co.zw",149]]);

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
