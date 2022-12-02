/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2014-present Raymond Hill

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

/// name css-generic

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssGenericImport() {

/******************************************************************************/

// swe-1

const toImport = [[13967996,"#_ning_gdpr_approve"],[10851848,"#accept-cookies-div"],[7536742,"#ad-fullscreen:not(body):not(html)"],[3011809,"#ad-mega-container:not(body):not(html)"],[11012446,"#ad-wallpaper:not(body):not(html)"],[6659654,"#ad_topScroller:not(body):not(html)"],[13368856,"#advisa-iframe"],[2550947,"#aloq-cookie-warning"],[4307360,"#annons_head"],[1228503,"#bottomAnnonsBar"],[7906200,"#catapult-cookie-bar"],[13480099,"#cliSettingsPopup.cli-modal"],[14687403,"#colorbox.cookie-info-modal"],[11960761,"#cookie-alert"],[1674258,"#cookie-banner"],[6339022,"#cookie-bar"],[1467086,"#cookie-consent-banner"],[11960820,"#cookie-info"],[1736126,"#cookie-law-container"],[11960655,"#cookie-line"],[1678246,"#cookie-message"],[1687544,"#cookie-notice"],[1687564,"#cookie-policy"],[1418693,"#cookie-policy-overlay"],[1674254,"#cookie-warning"],[14155974,"#cookie_approve_banner"],[3177413,"#cookie_consent"],[3180116,"#cookie_prompt"],[3323684,"#cookieAcceptBar"],[11979766,"#cookieAlert"],[6340682,"#cookiebar"],[5515930,"#cookieChoiceInfo"],[1819352,"#CookieDialog"],[6340887,"#cookieinfo"],[2511847,"#cookieInfoBar"],[6319045,"#CookieInformationDialog"],[10570001,"#cookieInformerBooklet"],[6340930,"#cookiejar"],[10063420,"#cookielawwarning"],[2633259,"#cookieMsgBlock"],[1829539,"#CookieNotice"],[11992707,"#cookieNotice"],[8616601,"#cookies-acceptance .alert.bottom"],[12028090,"#cookiesInfo"],[9694880,"#dialog-eu-cookie-law"],[4688338,"#div-leeadsFullpageAd"],[5575412,"#itc-cookie-notify.active"],[15274,"#js-cookie-section.show"],[13632282,"#klaro .cookie-modal"],[1261497,"#leeads-panorama-container"],[8919398,"#moove_gdpr_cookie_info_bar"],[3648715,"#redim-cookiehint"],[1316459,"#redim-cookiehint-modal"],[10901852,"#RightOuterBannerDiv"],[3150337,"#strossle-below-article-thumbnails"],[12864894,"#topBannerAds"],[7548414,"._ning_outer._ning_jss_zone:not(body):not(html)"],[15463939,".ad-rotator:not(body):not(html)"],[7640758,".ad-single-news:not(body):not(html)"],[3695502,".ad_container_bottom:not(body):not(html)"],[13130599,".adContainer:not(body):not(html)"],[13833009,".adrotate-group:not(body):not(html)"],[6289012,".adtoma_container:not(body):not(html)"],[2853796,".adtrue-holder:not(body):not(html)"],[10647895,".annons_mitten:not(body):not(html)"],[11074202,".annons_panorama:not(body):not(html)"],[10834947,".annonseArticle:not(body):not(html)"],[9510494,".b-ad__wrapper:not(body):not(html)"],[1219210,".b-cookies:not(body):not(html)"],[14095930,".bannerclick:not(body):not(html)"],[12288422,".c-ad-wrapper:not(body):not(html)"],[7328854,".c-ad__floating:not(body):not(html)"],[2142731,".c-cookies.is-active:not(body):not(html)"],[2173235,".c-dfp_ads:not(body):not(html)"],[8424345,".c-post--native-ad:not(body):not(html)"],[12360987,".carrie-ad-block:not(body):not(html)"],[2616551,".casino-ad:not(body):not(html)"],[13821135,".category-annons:not(body):not(html)"],[4799687,".category-annonssamarbete:not(body):not(html)"],[1053764,".category-om-samarbeten:not(body):not(html)"],[5547993,".category-samarbeten:not(body):not(html)"],[15714953,".category-sponsrad-artikel:not(body):not(html)"],[1261764,".category-sponsrad:not(body):not(html),.category-sponsrat:not(body):not(html)"],[15714762,".category-sponsrade-inlagg:not(body):not(html)"],[609992,".category-sponsrade-reklaminlagg:not(body):not(html)"],[15730151,".category-sponsrat-content:not(body):not(html)"],[4599004,".category-sponsrat-inlagg:not(body):not(html)"],[15730143,".category-sponsrat-innehall:not(body):not(html)"],[520717,".cc-banner.cc-bottom:not(body):not(html)"],[537333,".cc-grower:not(body):not(html)"],[528100,".cc-window.cc-floating:not(body):not(html)"],[10966096,".component-matchAds:not(body):not(html)"],[8506476,".component-matchAds__content:not(body):not(html)"],[16716167,".Cookie-banner.is-open:not(body):not(html)"],[13020876,".cookie-consent:not(body):not(html)"],[13020557,".cookie-notice:not(body):not(html)"],[12974598,".cookie-notification:not(body):not(html)"],[13836796,".cookie__wrapper:not(body):not(html)"],[6232057,".cookie_consent_bar:not(body):not(html)"],[13617158,".cookie_popup_box:not(body):not(html)"],[13674889,".cookieConsent:not(body):not(html)"],[14197037,".dfp-ad-widget-class:not(body):not(html)"],[1447284,".dj-ad-size:not(body):not(html)"],[13504839,".esmg-hb-slot:not(body):not(html)"],[15153304,".favethemes-content-ad-bottom:not(body):not(html)"],[15153296,".favethemes-content-ad-inline:not(body):not(html)"],[15153300,".favethemes-content-ad-top:not(body):not(html)"],[4250031,".footer-ad-wrap:not(body):not(html)"],[6423727,".gdpr-banner:not(html):not(body)"],[11821550,".js-cookie-disclaimer:not(body):not(html)"],[14993733,".js-cookie-warning:not(body):not(html)"],[5946606,".layerAdContainer:not(body):not(html)"],[10405888,".lazyb.panorama"],[8891747,".leeads-advert:not(body):not(html)"],[15788849,".mittenannons:not(body):not(html)"],[8737248,".node-sponsored-article:not(body):not(html)"],[8293620,".nyhet_wrapper_annons:not(body):not(html)"],[7319216,".o-cookie-bar:not(body):not(html)"],[3915412,".o-grid__ad-column:not(body):not(html)"],[2112775,".p-cookie-prompt.-display:not(body):not(html)"],[14741989,".penci-adsense-below-slider:not(body):not(html)"],[1067950,".penci-infeed-fullwidth-ads:not(body):not(html)"],[1065988,".plista_widget_outstream:not(body):not(html)"],[9824607,".react-ad:not(body):not(html)"],[6837380,".rmss_main-ad:not(body):not(html)"],[14055004,".sponsorBanner:not(body):not(html)"],[15806617,".sponsrad-artikel:not(body):not(html)"],[8072667,".stampenCookieContainer:not(html):not(body)"],[4730284,".sw-popular__article--ad:not(body):not(html)"],[2374854,".sw-sponsored_post:not(body):not(html)"],[8591977,".sw-tag-sponsored_post:not(body):not(html)"],[6530756,".swp-ad-strossle:not(body):not(html)"],[14923550,".tag-sponsrat-inlagg:not(body):not(html)"],[12274732,".teaser--native-ad:not(body):not(html)"],[7502388,".Teaser--nativeAd:not(body):not(html)"],[8877369,".thb_ad_header:not(body):not(html)"],[11065550,".toppannonser:not(body):not(html)"],[11157901,".widget_adonnews:not(body):not(html)"],[7976369,".widget_eu_cookie_law_widget:not(body):not(html)"],[10886289,".widget_ev_ad_widget:not(body):not(html),.widget_ic_ad_widget:not(body):not(html)"]];

const genericSelectorMap = self.genericSelectorMap || new Map();

if ( genericSelectorMap.size === 0 ) {
    self.genericSelectorMap = new Map(toImport);
    return;
}

for ( const toImportEntry of toImport ) {
    const existing = genericSelectorMap.get(toImportEntry[0]);
    genericSelectorMap.set(
        toImportEntry[0],
        existing === undefined
            ? toImportEntry[1]
            : `${existing},${toImportEntry[1]}`
    );
}

self.genericSelectorMap = genericSelectorMap;

/******************************************************************************/

})();

/******************************************************************************/
