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

// nld-0

const argsList = [{"a":"img[width=\"300\"][height=\"100\"]"},{"a":".regio-widget"},{"a":".td-a-rec"},{"a":"#advertisement"},{"a":".widget_itarget_banners"},{"a":".carousel"},{"a":"aside > .textwidget [src*=\"wp.com/romagazine.nl/\"][src*=\"/wp-content/uploads/\"][src$=\"?w=665\"]"},{"a":"img[title^=\"roba_sponosor_\"]"},{"a":".list-sponsors"},{"a":"div[style*=\"width:730px; height:90px;\"]"},{"a":".dfp-rectangle-wrapper"},{"a":"#dfp-billboard-wrapper,\n.rtldart"},{"a":".dfp-billboard-wrapper,\ndiv[class$=\"_with_ad__ad\"]"},{"a":"#recommendations-above-ad,\ndiv[class^=\"col\"]:has([class*=\"adcontainer\"])"},{"a":"#advertenties,\n#advertentiesOnder"},{"a":".footeradd"},{"a":".art-positioncontrol"},{"a":".avia-content-slider1"},{"a":".partnerlink"},{"a":".row > [class]:has(.sfr-pdp-section[id$=\"crossseller\"])"},{"a":"#block-leaderboard,\n#block-topbannersidebar"},{"a":"#media_image-3,\n#media_image-4"},{"a":".widget_minisites"},{"a":".et_pb_text:has(* > .g):not(:has(.heading-more)),\n[href^=\"https://dt51.net/\"],\ngofollow:has(img[src])"},{"a":"[id^=\"sgpb-popup-dialog\"]:has(iframe[src^=\"https://www.affilaxy.com/promos/\"]),\n[id^=\"sgpb-popup-dialog\"]:has(iframe[src^=\"https://www.affilaxy.com/promos/\"]) + [class]"},{"a":".videoOverAdBig"},{"a":"[id^=\"custom_html-\"]:has(iframe[data-src*=\"jygotubvpyguak.com\"])"},{"a":".entry-content > div"},{"a":"#recommendBlock,\n[href^=\"https://ads.v1d305.com/redirect/\"]"},{"a":".blogBanners,\n.topBanners"},{"a":".banner-wrapper,\ndiv[id^=\"banner-\"]"},{"a":".widget_custom_html:has([src*=\"affilaxy.com\"]),\n.widget_media_image:has(img[src*=\"sexmeid.nl/wp-content/uploads/\"][src$=\".gif\"])"},{"a":"#pre-footer-banners,\n#top-banner"},{"a":"#top:has(.banner)"},{"a":"[id^=\"text\"]:has([src^=\"https://www.shespot.nl/wp-content/uploads/\"])"},{"a":"section:has(div[class$=\"sponsors\"])"},{"a":".holder-ads"},{"a":"#r89-mobile-rectangle-mid,\n#r89-takeover"},{"a":".sam-slot"},{"a":".sols,\n[id]:has(.company-add)"},{"a":".adchannel"},{"a":".logo_main_sponsor_image,\n.logo_slider_logos"},{"a":".banner-btf-side-rectangle,\n.banner-sky,\n.leader-below-game"},{"a":".game-page-sidebar"},{"a":".widget_text.gridlove-box"},{"a":".spel_b1,\n.spel_b2"},{"a":".widget_media_image:not(:has(img[src*=\"vierkant-spreekbuis\"])),\n.widget_spreekbuis_partners"},{"a":"aside.widget:has(a[href*=\"trff9links.com/\"])"},{"a":".advertentieblock"},{"a":".top-banner"},{"a":".wp-block-buttons"},{"a":"[class$=\"-banners-wrapper\"]"},{"a":".creatividad"},{"a":"#lead"},{"a":".ArticleBodyBlocks__bannerWrapper,\n.ArticlePageWrapper__banner,\n.MainCuratedTeasersLayout__banner,\n.SectionPage__bannerWrapper,\n.SportScoreboardPage__banner,\n.TextArticlePage__bannerWrapper,\n.VideoArticlePage__banner,\n.VideoPage__banner,\n.WebpushOptin__main,\n.withBanners,\n.withBanners + .ComponentRotation"},{"a":"#lb_header"},{"a":"[href=\"https://www.domasmsuite.nl\"]"},{"a":"aside[id^=\"block\"]:has(img[src*=\"/wp-content/uploads/\"][src$=\".gif\"])"},{"a":".theme-advertorial"},{"a":"[href^=\"https://www.totaaltv.nl/plugins/banner/\"]"},{"a":".SponsorBlock"},{"a":".desktopad"},{"a":"[id$=\"halfpage\"],\n[id$=\"top-ad\"],\n[id*=\"r89\"][id$=\"home\"],\ndiv.ads-contain"},{"a":".werbung"},{"a":"[class^=\"ads-adsense-\"]"},{"a":".trucks_ros_alpha_rectangle-halfpage,\n.trucks_ros_leaderboard-billboard"},{"a":".img_position_left:has(.adsbygoogle)"},{"a":".easingslider"},{"a":"div[class^=\"r89-desktop\"]"},{"a":".banner-fluid"},{"a":".square-item:has( > .banner)"},{"a":".adBoxbig"},{"a":"[id^=\"text-\"]:has([href^=\"https://www.eo-acties.nl/TradeTracker/index.aspx\"])"},{"a":"[class^=\"bannerzone_\"]:has([href])"},{"a":"[src^=\"/derden/betcity-\"]"},{"a":".uitgelichtbox"},{"a":"#partner-links,\n.list-item:has(script[src*=\"realsrv\"]),\n[href^=\"https://xltube.nl/click/\"],\n[id$=\"fish-hooks\"],\ndiv[id^=\"video-fish-hook\"]"},{"a":"div[class^=\"Component-bannerTopWrapper-\"]"},{"a":"[href]:has([src*=\"media.prdn.nl\"])"},{"a":"div[id][class^=\"css\"]"},{"a":".betting-provider-row"},{"a":".modal"},{"a":"[href^=\"https://www.anp.nl/start\"]"},{"a":"[class^=\"row advertentie-\"]:not([class*=\"advertentie-1\"])"},{"a":".row [id^=\"form\"] + .box > .box-body:has(img)"},{"a":"[class*=\"right\"] .wpb_wrapper:has(img[height=\"520\"][src])"},{"a":"a[href^=\"https://partner.bol.com/\"],\ndiv[class^=\"col\"]:has([class^=\"add\"])"},{"a":".banner_wrapper"},{"a":"[id*=\"miw_widget\"] a[target$=\"blank\"][href]:not(a[href*=\"mailto\"])"},{"a":"#sidebar_aanbevelen"},{"a":"#submenubanner"},{"a":"div[class$=\"sidebar-widget\"] > .textwidget:has(p > a[href*=\"eredivisiewedden.nl\"][target=\"_blank\"])"},{"a":".card-banner,\n.card-banner-large"},{"a":".kolom_haad > div[style=\"height: 300px;\"],\ndiv[style$=\"0px;\"]:has(.adsbygoogle)"},{"a":".sticky-banner-container"},{"a":"#right-sidebar > .mb-3:has(img[src*=\"banner\"]),\n.float-right"},{"a":".rectangle"},{"a":".leaderBoardHolder"},{"a":"div[class^=\"r89-desktop-rectangle\"]"},{"a":"div[class^=\"styled__AdWrapper-\"],\ndiv[class^=\"styled__FooterAdWrapper-\"]"},{"a":".hf-widget"},{"a":".cookieconsent-optin-marketing"},{"a":".banner-right,\n.infeed-outer,\n.infeed-wrap"},{"a":".content-start > :has([advobject])"},{"a":".post:has(a[href*=\"/partnerposting/\"])"},{"a":"#ad-takeover"},{"a":".adr-wrapper"},{"a":"#reclame,\n.advertentieBanner"},{"a":"li.ipsBox.ipsWidget:has(.ipsType_richText.ipsPad)"},{"a":"[class*=\"avia-image-container\"]:has(a[href]),\n[id*=\"after_section\"] > .container:has([class*=\"av-content\"]),\nimg[width=\"699\"][height=\"90\"]"},{"a":"#block-views-block-view-business-partners,\n#block-views-block-view-main-sponsor,\n#block-views-block-view-shirt-sponsor,\n.top-bar-logos"},{"a":"[href=\"https://www.loketkansspel.nl/\"]"},{"a":".header-right"},{"a":".bs"},{"a":".container-linkpartners,\n.rightbar > :has([src^=\"https://ads.\"])"},{"a":"#reclame-eroads"},{"a":"[id^=\"block-block\"]:has([id^=\"div-gpt-ad\"]),\ndiv[class*=\"block-block\"]:has(.adsbygoogle),\ndiv[style*=\"padding:10px\"]:has(div[id^=\"div-gpt-ad\"])"},{"a":".article-bnr-first,\n.as__bottom-banner,\n.g_banner,\n.row--bnr-between,\naside:has([id^=\"div-gpt-ad\"])"},{"a":"div[class^=\"display-ad_container\"]"},{"a":"#banner_rectangle,\n#banner_right,\n#banner_top"},{"a":"#leaderboard"},{"a":"div[style]:has(.adsbygoogle)"},{"a":"aside[class^=\"td_block\"]:has(.gofollow)"},{"a":".ult-content-box > a[href]:not([href*=\"nieuwsfiets.nu\"]):not([href*=\"questionpro.com\"]),\n.wpb_raw_html[class*=\"us_custom_\"]:has(.wpb_wrapper)"},{"a":".clearfix:has(img[src*=\"/header/\"])"},{"a":"[class^=\"my-\"]:has(img[src*=\"/images/banner/\"])"},{"a":".adsbygoogle,\n.td-adspot-title"},{"a":".ads-mobiel"},{"a":".widget_block:has(img[src*=\"/ad\"]),\n.wpa"},{"a":".product__wrapper:has(.adsbygoogle)"},{"a":".widget:has(.capegroep-banner)"},{"a":"a[href^=\"https://www.onlinebingokaart.nl/\"]"},{"a":"div[style*=\"width:300px; height:200px;\"],\ndiv[style*=\"width:300px; height:250px;\"],\ndiv[style^=\"width:300px; height:180px;\"]"},{"a":"#image-vertical-reel-scroll-slideshow,\n.slider-container"},{"a":".col-left,\n.col-right"},{"a":".holder--divider-top"}];

const hostnamesMap = new Map([["regio-voetbal.nl",0],["regionoordkop.nl",1],["regioonline.nl",2],["rickfm.nl",3],["riskcompliance.nl",4],["rkcwaalwijk.nl",5],["romagazine.nl",6],["rotterdambasketbal.nl",7],["roulettefm.nl",8],["rtvstichtsevecht.nl",8],["routenet.nl",9],["rtlboulevard.nl",[10,11]],["rtlnieuws.nl",[10,12]],["rtvdrenthe.nl",13],["rtveen.nl",14],["rtvgo.nl",15],["rtvkrimpenerwaard.nl",16],["salvora.nl",17],["sc-heerenveen.nl",18],["schaefer-shop.nl",19],["scheepvaartkrant.nl",20],["schiedamsnieuws.nl",21],["schuttevaer.nl",22],["seksmet.nl",23],["seksverhalen.nl",24],["sex-kamer.nl",25],["sexcam-mokkels.nl",[26,27]],["tellows.nl",[27,55]],["sexfun.nl",28],["sexguide.nl",29],["sexjobs.nl",30],["sexmeid.nl",31],["sexpower.nl",32],["sexpunt.nl",33],["shespot.nl",34],["simone.nl",35],["slam.nl",36],["soccernews.nl",37],["softonic.nl",38],["solarmagazine.nl",39],["sozio.nl",40],["sparta-rotterdam.nl",41],["speeleiland.nl",42],["spel.nl",43],["spelletjes.nl",43],["spelersvrouw.nl",44],["spidersolitairespelen.nl",45],["spreekbuis.nl",46],["sproeiendekutjes.nl",47],["startlijstjes.nl",48],["startpagina.nl",49],["streamwijzer.nl",50],["streekstadcentraal.nl",51],["tameteo.nl",52],["techzine.nl",53],["telegraaf.nl",54],["thekinkyweb.nl",56],["tiener-sexverhalen.nl",57],["topgear.nl",58],["totaaltv.nl",59],["totoknvbbeker.nl",60],["touretappe.nl",61],["tpo.nl",62],["transfermarkt.nl",63],["treinreiziger.nl",64],["trucks.nl",65],["turkinfo.nl",66],["turksemedia.nl",67],["tvblik.nl",[68,69]],["voetbalrotterdam",68],["tvgids.nl",70],["tvgids24.nl",71],["tweedehandschristelijkeboeken.nl",72],["twentefm.nl",73],["ucl-voetbal.nl",74],["uecl-voetbal.nl",75],["uel-voetbal.nl",75],["vagina.nl",76],["vandaaginside.nl",77],["vastgoedjournaal.nl",78],["veronicasuperguide.nl",79],["vi.nl",80],["video18.nl",81],["villamedia.nl",82],["visserijnieuws.nl",83],["vitesse.nl",84],["vives.nl",85],["vlaamskijken.nl",86],["vlietnieuws.nl",87],["vlootschouw.nl",88],["voetbal-vandaag.nl",89],["voetbalnederland.nl",90],["voetbalsnafu.nl",91],["volleybal.nl",92],["waldnet.nl",93],["want.nl",94],["wanttoknow.nl",95],["wasmachines.nl",96],["webwereld.nl",97],["webwoordenboek.nl",98],["weeronline.nl",99],["weerplaza.nl",100],["weerstationleeuwarden.nl",101],["weertdegekste.nl",102],["weespernieuws.nl",103],["welingelichtekringen.nl",104],["welklidwoord.nl",105],["westerwoldeactueel.nl",106],["wettelijke-feestdagen.nl",107],["wietforum.nl",108],["wildfm.nl",109],["willem-ii.nl",110],["wkdarts.nl",111],["wos.nl",112],["xgn.nl",113],["xmissy.nl",114],["xxxdump.nl",115],["zakenreisnieuws.nl",116],["zeelandnet.nl",117],["zoom.nl",118],["afkortingen.nu",119],["eindexamens.nu",120],["landbouwgrond.nu",121],["newspower.nu",122],["nieuwsfiets.nu",123],["nieuwsonline.nu",124],["schie.nu",125],["dissident.one",126],["dorpsklanken.online",127],["eindtijdklok.org",128],["letsgodigital.org",129],["nljug.org",130],["omrekenen.org",131],["apintie.sr",132],["unitednews.sr",133],["tvgids.tv",134],["basketbal.vlaanderen",135]]);

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
