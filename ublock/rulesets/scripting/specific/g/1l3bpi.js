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

// swe-1

const argsList = [{"a":".region-sidebar-second"},{"a":".sidebar"},{"a":"#cookie-banner-root"},{"a":".ss-modal,.modal-mobile-app"},{"a":".polopolyNotification"},{"a":".block-rr"},{"a":".sidebar-right,.ad_header + p"},{"a":".banner-container"},{"a":".mh-sidebar .textwidget"},{"a":"#text-4"},{"a":"[class^=\"BauProvider\"],\n[class^=\"CookieConsentPopup\"]"},{"a":".header_top,#media_image-2,#text-6,\na[href*=\"/annonsering\"]"},{"a":"#text-html-widget-3"},{"a":".pnlAdTop"},{"a":".banner-right,.banner-left,.wpb_single_image a[target=\"_blank\"],.tdm-popup-modal-wrap"},{"a":"[class*=\"jsx-\"][style*=\"position: sticky\"],.bc--grey-neutral-50[style^=\"min-height\"]"},{"a":".premium-page-ad,.footer-banner-wrapper,div[id^=\"stopp-\"]"},{"a":"div[class*=\"-promo\"],div[class*=\"prisjakt-\"]"},{"a":"#mega-ad-wrapper,.Container--ad,.theme-Native,.AdWrapper,.AdPositionData,.Teaser--fullAdLabel,div[data-engage-entity-id=\"sales-banner-bottom-sticker-wide\"]"},{"a":"#eprivacyModal,.modal-backdrop"},{"a":".widget_et_ads,.module-etads,#text-13,#block-4,a[target=\"_blank\"][rel=\"noopener noreferrer\"],a > img[width=\"300\"][height=\"250\"],a > img[width=\"800\"][height=\"175\"]"},{"a":"[data-ad-id]"},{"a":"#bannercolumn,img[title^=\"Annons\"]"},{"a":".cookie-layer"},{"a":"#cookieContainer"},{"a":"#cookie-box"},{"a":".cd-desktop-banner"},{"a":"#nyh_cookie-message,#svtmat_cookie,section.nyh_share"},{"a":"div[id$=\"_ad\"],div[id$=\"_ad_mobile\"],.externalTopMobile,a[href^=\"//www.prisjakt.nu/produkt\"],#nativendo-mainfeed + aside > .article,.article-footer > h3,.article-footer > .aeChart,.newExternal"},{"a":"[class*=\"-reklam\"],.sif-sponsorer,.teaserblock"},{"a":".abann_wrapper,#hspalt_s1"},{"a":".create-account-banner,.buy-premium-banner"},{"a":".adscolumn"},{"a":"section[id^=\"Panorama\"]"},{"a":"[class^=\"ad-container\"],[class^=\"adbox-single\"]"},{"a":".code-block,main > div:last-child:not(:only-child),#uid_08313ba73,#uid_ab3738b5a,.jeg_header_wrapper .jeg_midbar"},{"a":".page-gutter.left,.page-gutter.right,[id^=\"bbPrisjakt\"]"},{"a":".row-uppdragstest"},{"a":".ad-container-section,.article-sponsored"},{"a":"a.td_single_image_bg:not([href*=\"thepattayanews.se\"])"},{"a":".sidebar .widget_widget_code"},{"a":"div[style*=\"z-index: 999; background-color: rgba(0, 0, 0, 0.5)\"],.bg-grey.hideOnPrint,.bg-adYellow"},{"a":".elementor-image a[target=\"_blank\"],.revive-box"},{"a":".subscribe_now_popup,.type-native,#captive"},{"a":".adv"},{"a":"#af-preloader"},{"a":"div.tot-content-preview-container-small[style*=\"border-top:4px solid #ffb200;\"],.content-overlay--black,a[href*=\"casino\"],a[href*=\"/sponsrat/\"],a[href*=\"/sponsrat/\"] + p.tot-content-preview--meta,.newaddiv"},{"a":"[id^=\"bunyad\"]"},{"a":".bottom-bar--animate-in,#job_ads_scroller,.header_banner,.newsletter-popup"},{"a":"a[href*=\"/sponsrat/\"],\nmain > div > div > div > div > div:has(.adunitContainer)"},{"a":"[class$=\"banner_ad\"]"},{"a":".site-wrap > .row > .col-sm-3"},{"a":"#col_right"},{"a":".privacy-information--visible"},{"a":".backdrop,.fcb"},{"a":"div[id^=\"ungdo-\"]"},{"a":".type-partnerartikel"},{"a":"#banner-top-block"},{"a":".results li[style^=\"margin\"]:not(.result)"},{"a":".latest-article-native"},{"a":"app-native-puff,.header-top-banners"},{"a":".profile-annons"},{"a":"[id*=\"annons\"],#getFixed"},{"a":".campaign-teaser-show"},{"a":".newsletter-popup--background-fade,.newsletter-popup"},{"a":".wpb_single_image a[target],.gp-footer-2"},{"a":"a[href^=\"/mainbanner\"]"},{"a":"[class*=\"ai-viewport\"],.full_screen_ad"},{"a":".nyhet-ad"},{"a":".cookieNotification"},{"a":"a[href^=\"/partnermaterial/\"]"},{"a":".body-overlay"},{"a":".mtsnb,.villalivet-target,a[href*=\"/sponsrat-innehall/\"],div[data-td-block-uid=\"tdi_85\"]"},{"a":".annonsinlagg,.annonsen"},{"a":".push-to-newsletter,.fancybox-overlay,\n.top-add,.sidebar-adds,.spons-content"},{"a":".popup_missa-inget"},{"a":".topheaderinfo"},{"a":"a[href*=\"/go/\"][target],.category-kampanjer"},{"a":"a[href*=\"campaign\"][data-test-tag=\"external-link\"]"},{"a":"div[class^=\"CookieBar\"]"},{"a":".LFRBox"},{"a":".js-cookie-iframe"},{"a":".yweb-news-paper-banner"},{"a":".featured"},{"a":"div[style^=\"position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 999;\"]"}];

const hostnamesMap = new Map([["skrattnet.se",0],["webben7.se",0],["skyltat.se",1],["skyscanner.se",2],["smartsenior.se",3],["smhi.se",4],["so-rummet.se",5],["spelagratis.se",6],["spelo.se",7],["spelochfilm.se",8],["sportbilen.se",9],["sportexpressenplay.se",10],["sporthalsa.se",11],["sportpanelen.se",12],["stallet.se",13],["startaochdriva.se",14],["stegforhalsa.se",15],["stoppapressarna.se",16],["surfa.se",17],["svd.se",18],["svenskahousegruppen.se",19],["svenskhistoria.se",20],["svensktgolfforum.se",21],["svensktidskrift.se",22],["sverigesingenjorer.se",23],["sverigeskommunikatorer.se",24],["sverigeskonsumenter.se",25],["sverigespringer.se",26],["svt.se",27],["swedroid.se",28],["swehockey.se",29],["sydnarkenytt.se",30],["synonymer.se",31],["sysidan.se",32],["tabyallehanda.se",33],["tandlakartidningen.se",34],["tekniksmart.se",35],["99.teknikveckan.se",36],["testfakta.se",37],["thelocal.se",38],["thepattayanews.se",39],["tidningen.se",40],["tidningenbalans.se",41],["tidningenglobal.se",42],["tidningenridsport.se",43],["tittapavideon.se",44],["topdogs.se",45],["totallyorebro.se",46],["totallystockholm.se",46],["traning40plus.se",47],["travelnews.se",48],["travronden.se",49],["tripadvisor.se",50],["turismnytt.se",51],["turistmal.se",52],["tvkanalengodare.se",53],["tvprogram.se",54],["ungdomsfotboll.se",55],["upphandling24.se",56],["uppsalanyheter.se",57],["uppsatser.se",58],["vagabond.se",59],["varden.se",60],["varldenidag.se",61],["varldenshaftigaste.se",62],["varldenshistoria.se",63],["vartgoteborg.se",64],["varvat.se",65],["vaxjolakers.se",66],["vegomagasinet.se",67],["veterinarmagazinet.se",68],["vi.se",69],["vibilagare.se",70],["viivilla.se",71],["villalivet.se",72],["vimedbarn.se",73],["vinbanken.se",74],["vinochmatguiden.se",75],["viseniorer.se",76],["vm-fotboll.se",77],["wellness.se",78],["xlbygg.se",79],["xn--lnforum-exa.se",80],["yelp.se",81],["ysektionen.se",82],["omtanke.today",83],["kolla.tv",84]]);

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
