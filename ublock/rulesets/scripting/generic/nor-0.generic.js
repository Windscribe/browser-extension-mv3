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

// nor-0

const toImport = [[10822522,".annonselenker:not(html,body)"],[5117988,".full-width.daily-offers:not(html,body)"],[1582578,".sponset-innlegg:not(html,body)"],[1436871,".gofollow:not([href*=\"nyhetsbrev\"],[href*=\"radio\"],html,body)"],[9392539,".ad-paied-cont-front:not(html,body)"],[1955575,".spklw-post-attr[data-recommendation-type=\"ad\"],.spklw-post-attr[data-type=\"ad\"],.spklw-post-attr[data-recommendation-type=\"sprinkleit\"]"],[6627732,".native-ad-kicker:not(html,body)"],[16353837,".content-adunit:not(html,body)"],[10003333,".multiple-vevlysingar:not(html,body)"],[3863947,".full-width-vevlysingar:not(html,body)"],[10826239,".annonceringBox:not(html,body)"],[12738289,".rotating-junglebogen:not(html,body)"],[6690430,"#junglebogen-left"],[3495513,"#junglebogen-right"],[10822305,".annonseheader:not(html,body)"],[16290023,".reklame-spot:not(html,body)"],[4368685,"#ctl00_phMain_lnkAd"],[4016498,"#ctl00_phMain_divParallax"],[10746674,".nf-o-annonse:not(html,body)"],[11922581,".nf-c-adblock-title:not(html,body)"],[1496646,".hringekja__wrapper:not(html,body)"],[4318411,".native-advertisement:not(html,body)"],[8196065,".commercial-teaser:not(html,body)"],[9377823,"#newswire-banner"],[2448486,"#reklamebolk1wrap"],[16577896,".lp_p2_api_ad:not(html,body)"],[9921777,"#art-pomimuko"],[12864481,".currencyaugl:not(html,body)"],[1483500,".row > div[class=\"top-fixed-wrapper\"]"],[13483570,".section-module.blog-frontpage-module.margin-top-10.row"],[9850677,".splitblock__column > .block > .adblock"],[14229255,".bannerizor-banner"],[12721300,"#ad_superboard"],[1791700,"#ad_topp"],[7935065,"#no-familieklubben-wde-front_topboard"],[622287,".annonsetag:not(html,body)"],[14060690,".jubii-adunit:not(html,body)"],[6510114,"#related-articles + div[class^=\" hyperion-css-\"]"],[5703157,"#BannerEniro"],[7534216,"#GoogleAdsenseWideSkyscraper"],[15456989,"#GoogleAdsenseWideSkyscraperLeft"],[12027063,"#viewItemAdsenseBanner"],[12327302,"#viewItemEniroBanner"],[7130238,".block-AnnonceBlocksAdform:not(html,body)"],[6752470,".clearfix.top_banner_container:not(html,body)"],[3000048,".adform__topbanner:not(html,body)"],[13139692,".googlepublisherpluginad:not(html,body)"],[16470287,".polarisMarketing:not(html,body)"],[1484626,".sub.menu-primary.default.polarisMenu.widget:not(html,body)"],[10577037,".bazaarSpinnerContainer:not(html,body)"],[860910,"#jobads-topbanner"],[15143630,".tv2-ad:not(html,body)"],[11690739,".auglysing_ticker:not(html,body)"],[4068259,".premium-spot:not(html,body)"],[9464590,".annonser:not(html,body)"],[9769426,".mh-loop-ad:not(html,body)"],[1053887,".ticker-ad:not(html,body)"],[4105231,".wallpaper > .horseshoe"],[2761617,"#GoogleAdsensePanorama"],[2761665,"#GoogleAdsenseFooter"],[16121730,".poster-placeholder:not(html,body)"],[6321881,".banners.post_sticky:not(html,body)"],[47313,".ad[data-config-name],.ad.text-center:not(html,body),.ad[id^=\"netboard_\"],.ad[id^=\"skyscraper\"],.ad.topBanner:not(html,body)"],[2740082,"#sponsorstripe"],[5068359,"#adBlinkContainer"],[14912128,"#innocode-ad"],[6283981,".ads__grid-item:not(html,body)"],[12336471,".undirsidaad:not(html,body)"],[15450595,".am-page-ad:not(html,body)"],[2518180,".adnuntius-ad:not(html,body)"],[4810126,".intersect-ads-load:not(html,body)"],[7081084,".tag-page-ad-container:not(html,body)"],[557184,".scrolling-side-ad-container:not(html,body)"],[4835945,".ticker-ad-wrapper:not(html,body)"],[5767043,".mobile-banner-widget:not(html,body)"],[5063275,".widgerFullWidth:not(html,body)"],[5483087,".desktop-banner-widget:not(html,body)"],[13828366,".featuresplash-container:not(html,body)"],[15464239,".ad-cookie:not(html,body)"],[12016836,".adform__text:not(html,body)"],[2360090,".augl-container:not(html,body)"],[8786674,".hestesko-section:not(html,body)"],[1857308,"#top-ads-container"],[1196539,".vertical-x1-ad > .column--big"],[12108916,".grid > div[class=\"flow-banner\"]"],[2213921,".wg-banner:not(html,body)"],[7384968,".navigation__advertisement:not(html,body)"],[10270189,".article__content > .article__adblock"],[4660902,".article__body > .article__adblock"],[1487135,".block > .adblock--panorama"],[3381144,".splitblock__column--2 > .block > .adblock"],[5286746,"#toppbanner"],[8125589,".ehm-megaboard:not(html,body)"],[2453092,".maelstrom-skyscraper:not(html,body)"],[15100656,".forum-ad-box:not(html,body)"],[2444332,".maelstrom-topbanner:not(html,body)"],[14367608,".skyscraper-ads-container:not(html,body)"],[7039452,".adguru-modal-popup:not(html,body)"],[11620970,"#wallpaperAds"],[2457132,".container.container-topbanner:not(html,body)"],[9351742,".ad-iframe-nt:not(html,body)"],[13376046,".arcad-block-container:not(html,body)"],[9911641,".adunit-content-marketing:not(html,body)"],[12385798,".nf-adholder:not(html,body)"],[5584633,".single-adrotate:not(html,body)"],[11609570,".skille:not(html,body)"],[14068646,".Article-header-body:before"],[5521760,".paywall-fade:not(html,body)"],[10806687,".polarisSpid.widget:before"],[3521539,".CTA-body-faded:not(html,body)"],[1265286,".faded-article-content:after"],[4841377,".paywall-gradient:not(html,body)"],[7776429,"#ntwidget"],[12280098,".ntbox-btn"],[12280644,".ntbox-tab.bg-primary"],[3304867,"#sportspill-box-top"],[13120106,".sportspill-container[href*=\"lotto\"]"],[5285798,"#topBanners"]];

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
