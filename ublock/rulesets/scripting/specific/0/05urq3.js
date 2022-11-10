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

// irn-0

const argsList = [{"a":".text-ads"},{"a":"#bottombanner,\n.apnl,\n.b"},{"a":"#sezfvg-2,\n.sezfvg,\n.sticky-column:not(:has(a[href*=\"modirnameh.ir\"]))"},{"a":".txt-ads-sl"},{"a":".banneritem:has(a[href*=\"/banners/click/\"]),\n.eb-inst"},{"a":".adspanel"},{"a":".adsblockpop,\n.afc_popup,\n.banners,\n.textAds"},{"a":"#kaprila_p30download_ir_related,\n#kaprila_p30download_ir_related-top-post,\n.sidebar-tabliq.widget,\n.text-tabliq"},{"a":".body_wrapper > div:nth-of-type(4)"},{"a":"#custom_html-108,\n.stream-item-top,\n.widget_custom_html:has(img[src*=\".gif\"])"},{"a":"div > div > a.toolt > .onsc"},{"a":".banner-box"},{"a":".tabligh-logo"},{"a":".center.body_c > div > div,\n.center.body_c > div:nth-of-type(2),\n.txtad"},{"a":"#ad7_40,\n.footer-ads"},{"a":"[href*=\"/fa/ads/\"]"},{"a":".left_banner,\n.links"},{"a":"#arasideadvertising"},{"a":"#ads3,\n.main-ads,\n.morders,\n.textads2"},{"a":".heading-ads,\n.sidebar-right > div.box:nth-of-type(1)"},{"a":".adv_mobile"},{"a":".stream-item"},{"a":".textwidget,\naside:nth-of-type(5)"},{"a":".backoritybase,\n.news-box,\n.text-ads-1,\n.widgets.bg-custom.box"},{"a":"#cycle_adv_tabnak"},{"a":".Topadver"},{"a":".ads120000,\ndiv.Relement.Bstyle.RBC:nth-of-type(5)"},{"a":".havdqrmf-align-right"},{"a":".inner-wrapper-sticky > .mb-3,\n.sidebar-banners"},{"a":".type-resource-image"},{"a":".advertisment"},{"a":"#fpc-banner-top,\n#top-right-ad,\n.content-container:has(.ad-reportage),\n.square-ad:not(:has(#featured-posts))"},{"a":".full2.box.right,\ndiv.sideheader2:nth-of-type(3)"},{"a":".footer-back-link,\n.free_ad_con,\n.logo_full_view"},{"a":"[href*=\"b2n.ir\"]"},{"a":"#tabligh"},{"a":".ads120,\n.ads468,\n.fixpost,\n.gsh,\n.headads"},{"a":".bottom_ads,\n.fix_ads,\n.stream-item-widget:has(a[href*=\"faradars.org\"])"},{"a":".textad,\n[href^=\"/ad/\"]"},{"a":"#kaprila_linktable_left,\n.left-block-top"},{"a":"#slider-box,\n.mortabet-links,\ndiv.row:nth-of-type(2) > .col-xs-12 > .category-side-ads"},{"a":".advertisements"},{"a":".sideads"},{"a":"#mobileBannerAfterTags,\n.wide-adv-box"},{"a":".afterintro,\n.main-inside-ads,\n.main-top-ads"},{"a":".InsideArticleIntro,\n.item-list-row:has(a[href*=\"/pr/\"]),\n.price-sticky,\n.wide-adv-row,\n.wide-adv-row-home"},{"a":".col-sm-9.main-right > .col-sm-3 > aside.block:nth-of-type(2),\n.text-center.justify-content-around.row"},{"a":"#ads-text"},{"a":"#agahiBottom,\n.banner_wrapp"},{"a":".box-title,\n.moreads.widget_text,\n.pm"},{"a":".mom_custom_text.widget"},{"a":".ads-container,\n.ads-row,\n.ads-row-left,\n.mediaad-row,\n.mediaad-row-top,\n.mediaad-top-row,\n.top-ad-row"},{"a":"#ad14,\n.ad-cell,\n.widget_text"},{"a":".content_item:has(a[href*=\"/category/ads/\"]),\n.sidebar-area .image"},{"a":".adpar30,\n.adsidimg"},{"a":".fixedbanner,\n.mobilebanner,\n.sidebar-box-shop,\n.top-large-ads,\n[href^=\"https://playpod.ir/\"]"},{"a":".dailylink,\nbody > div > font,\ncenter > center > center > center,\ncenter:nth-of-type(2) > center,\ndiv > font > font > .menuheader,\ndiv > font > font > font > p"},{"a":".adv-cnt,\n.home-zxc,\n.padding-bottom-8,\n.sanjagh,\n.side_txt_zxc,\n.zxc-header-zxc,\n.zxc-padding-custom,\n.zxc_c9"},{"a":"#box_1398,\n#popbox-blackout"},{"a":".AdsContainer"},{"a":".special_links,\n.text_adds_container"},{"a":".webgardi"},{"a":".zxc_news"},{"a":".ads-full-banner-img"},{"a":"#box145,\n#box167"},{"a":".jmb_banner"},{"a":".inline-4d"},{"a":".aligncenter.wp-image-9273.size-full,\n.size-full.attachment-full"},{"a":".myside.right-sidebar"},{"a":"#popup-layer-container,\n.advertise,\n.bottom-left-ad,\n.bottom-right-ad"},{"a":".adsBanner,\n.two-ad-banners,\n.widget_media_image.widget.container-wrapper"},{"a":"#posts_single_ads,\n#top_ads"},{"a":"#titr-box,\n.maincontent > center,\ntbody"},{"a":"#sidebar_ad,\n.b-hd,\n.hidden-xs.hidden-sm.block,\n.hideOnMobile"},{"a":".tabliq"}];

const hostnamesMap = new Map([["mihand.ir",0],["mobile.ir",1],["modirnameh.ir",2],["montiego.ir",3],["moviemag.ir",4],["omidnamehnews.ir",5],["p30day.ir",6],["p30download.ir",7],["parsipet.ir",8],["pedal.ir",9],["pgnews.ir",10],["rond.ir",11],["rouydad24.ir",12],["rozup.ir",13],["sena.ir",14],["shahraranews.ir",15],["shmi.ir",16],["sid.ir",17],["skinak.ir",18],["smusic.ir",19],["snn.ir",20],["softsaaz.ir",21],["sornamusic.ir",22],["subf2m.ir",23],["tabnak.ir",24],["taknaz.ir",[25,26]],["talab.org",25],["technet24.ir",27],["timecity.ir",28],["tinn.ir",29],["iranart.news",29],["topseda.ir",30],["toranji.ir",31],["up44.ir",32],["uplod.ir",33],["uptrack.ir",34],["uupload.ir",35],["varoone.ir",36],["vgdl.ir",37],["vista.ir",38],["webgoo.ir",39],["webii.ir",40],["yun.ir",41],["zohur12.ir",42],["zoomg.ir",[43,44]],["zoomit.ir",[43,45]],["hamtamovie.lol",46],["androidina.net",[47,48]],["salamdl.rip",[47,73]],["cooldl.net",49],["dlbook.net",50],["footballi.net",51],["gadgetnews.net",52],["jeyran.net",53],["par30dl.net",54],["par30games.net",55],["pichak.net",56],["rokna.net",57],["takblog.net",58],["yektablog.net",58],["article.tebyan.net",59],["uplooder.net",60],["borna.news",61],["gostaresh.news",62],["mobo.news",63],["saat24.news",64],["techna.news",65],["titr.online",66],["gold-team.org",67],["texahang.org",68],["tgju.org",69],["wikihoax.org",70],["zoomtech.org",71],["my-film.pw",72],["harmonydl.us",74]]);

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
