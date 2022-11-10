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

// jpn-1

const toImport = [[13765724,"._popIn_infinite_ad"],[7307144,"._popIn_infinite_video"],[3806869,"._popIn_recommend_article_ad"],[15032219,"._popIn_recommend_article_ad_reserved"],[11356728,".google-afc-image"],[7374410,"#ADInterest"],[12932337,"#BottomAd"],[9270773,"#TopAd"],[2527998,"#ad-giftext"],[11134874,"#ad-recommend"],[14559509,"#ad-right"],[4154717,"#ad_04"],[14184770,"#ad_large"],[8003683,"#adsSPRBlock"],[3283950,"#ads_horizontal"],[9121816,"#float-bnr"],[3155341,"#fluct-pc-sticky-ad"],[126764,"#geniee_overlay_outer"],[11400250,"#id_ads_enc"],[3292236,"#im_panel"],[11726794,"#kauli_yad_1"],[11726795,"#kauli_yad_2"],[11726796,"#kauli_yad_3"],[11726797,"#kauli_yad_4"],[3000123,"#ninja-blog-inactive"],[6489009,"#overlay-ad-div-id"],[4032557,"#seesaa-bnr"],[11547841,"#self-ad"],[8496105,"#trackword_banner"],[11373277,".AdGraph"],[4376886,".AffAD"],[12882279,".NinjaEntryCommercial"],[46203,".ad-text-blockA01,.ad-text-blockB01"],[15454855,".ad-textG01"],[15588487,".ad1-title"],[5862340,".adArticleRecommend"],[5862998,".adArticleSidetile"],[10998251,".adArticleTopText"],[11822262,".adBrandpanel"],[13134623,".adCentertile"],[15050642,".adEmployment"],[9634001,".adHeaderAdbanner"],[288088,".adIMm"],[9172241,".adPost"],[8135399,".adRecommendRight"],[805921,".adSidetileplus"],[224633,".adarea-box"],[2744785,".ad_keywords_bot"],[10402,".ad_keywords_bot_r"],[5185388,".ad_regular1"],[5185389,".ad_regular2"],[5185390,".ad_regular3"],[13456643,".ad_special_badge"],[16475635,".ad_textlink_box"],[13776507,".ad_thumbnail_header"],[313178,".adbox:not(.adbar)"],[10516042,".adgoogle"],[602000,".admax-ads"],[10175029,".adrect"],[15967150,".ads-by-google-0"],[11905056,".ads_entrymore"],[13522063,".adsense-image-detail"],[13579684,".adsense-topics-detail"],[2970788,".adsense_box01"],[10707324,".adsense_mainbox01"],[781307,".adsize728"],[15418407,".adtitle"],[7315377,".aoa_overlay"],[8017336,".archive__item-infeedPc1,.archive__item-infeedPc2,.archive__item-infeedPc3"],[13482001,".archiveItem-infeed"],[13495455,".archiveList-infeed"],[14888080,".blogroll-ad-text"],[2312654,".c-infeedAd"],[8117280,".diver_widget_adarea"],[5943677,".ggbox"],[8688845,".google-user-ad-side1"],[3754660,".i2i-content-bottom"],[3754985,".i2i-content-middle"],[4403620,".i2i-content-top"],[7855614,".i2i-header"],[4863476,".insentence-adsense,.insentense-adsense"],[1801567,".interstitial-ad"],[961635,".ise-ad.csw-content-box"],[7847274,".itiran-ad"],[15238740,".js-kb-click"],[14137439,".master-post-advert"],[3450187,".my_ads"],[4406861,".p-entry__ad"],[11833466,".plugin-rakuten"],[15982016,".rectangle > div.rectangle__item + .rectangle__title"],[16498008,".rectangle__item"],[5444211,".related-ad-area"],[11085490,".seesaa-cmn__pr"],[1411486,".sherpa-component[data-ad_type]"],[8773358,".side_widget_surfing_adsense_widget"],[14592297,".sponsor-h2-center"],[15607589,".sponsor-top"],[8319910,".st-h-ad"],[6213328,".st-infeed-adunit"],[13220113,".st-magazine-infeed"],[11961026,".thk_ps_widget"],[3800973,".veu_insertAds"],[11484902,".widget_common_ad"],[4696868,".widget_fit_aditem_class"],[11480779,".widget_mobile_ad"],[2089075,".widget_pc_ad"],[7466580,".widget_swell_ad_widget"],[5733835,".widget_tsnc_ad_custom_html"],[5716606,".widget_tsnc_ads_custom_html"],[12497584,".yahoo_ad"],[12713596,".ys-ad-content"]];

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
