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

// idn-0

const toImport = [[12551383,"#Box-Banner-ads"],[15608220,"#Iklan-Melayang"],[11271491,"#Kolom-Iklan-728"],[4199394,"#SidebarIklan-wrapper"],[5372100,"#ad_box_1"],[4016290,"#ad_divLeft"],[1370673,"#ads-pop"],[9179764,"#ads-vert-300"],[9579754,"#ads_banner_left,#ads_banner_left1"],[9579866,"#ads_banner_right"],[4611752,"#ads_hd_bt"],[9120280,"#ads_top_list"],[4605020,"#adsbawah1,#adskanan1"],[8919679,"#adsimgxatas,#adsimgxatass"],[15657263,"#adskiri1"],[15657264,"#adskiri2"],[15657265,"#adskiri3"],[7455169,"#adv-placeholder"],[4332495,"#banner_iklan_top"],[15728772,"#banner_top_detail"],[4631082,"#bireklam"],[4681561,"#bottom_exclusive_ads"],[16046689,"#cfs_top_div"],[7383673,"#desaiklan"],[14698248,"#df-wrapper-ads-top"],[11454167,"#div-ad-read_body_1"],[8459487,"#div-ad-right_1,#div-ad-right_2,#div-ad-right_3"],[10651710,"#div-ad-skin_left"],[11462334,"#div-ad-skin_right"],[14340817,"#float-banner.visible-lg"],[15957551,"#floating_ads_bottom_textcss_ad"],[9122171,"#floatingad"],[2351935,"#flowads"],[9694005,"#footer-adcont"],[11538561,"#idbannerplayer.idmuvi-bannerplayer"],[11456473,"#idblog-adb-enabled"],[2990946,"#idmuvi-adb-enabled"],[14503844,"#idmuvi-popup"],[11765492,"#iklan"],[11797192,"#iklan-atas,#iklan_atas,#iklanbawah"],[13393163,"#iklan-bawah,#iklan_bawah"],[11797675,"#iklan-pos"],[13022985,"#iklan-sidebar"],[13410175,"#iklan-tengah,#iklan_tengah"],[11797804,"#iklan-text"],[12408765,"#iklan1"],[12408766,"#iklan2"],[12408767,"#iklan3"],[12408768,"#iklan4"],[13007107,"#iklan700"],[13401539,"#iklan_kanan"],[11797519,"#iklan_kiri"],[11797719,"#iklanarea"],[11797799,"#iklanatas"],[13395921,"#iklanpersegi"],[15168814,"#myadsmodal"],[10921701,"#netkevin-overlay"],[6846502,"#netkevin-popup"],[16230447,"#popupwindow"],[14517983,"#srcadsurlblock"],[4153633,"#switch-ad"],[12850580,"#top_ad_full"],[11879851,"#tupiklan"],[5139449,"#vp-advert"],[4137985,".SectionAds"],[15460564,".ad-ekspose"],[4337380,".ad-left-image"],[7616686,".ad-right-image"],[179537,".ad_primex"],[7689995,".ads-head"],[12703686,".ads-pop"],[9464490,".ads-sticky-bottom"],[5290467,".ads728-slot"],[10197518,".ads_2c"],[10197527,".ads_2l"],[10197533,".ads_2r"],[756955,".ads__side"],[766317,".ads_image"],[7319357,".ads_top_728"],[14256231,".adsatas"],[5735594,".adsatas1"],[5735595,".adsatas2"],[5735596,".adsatas3"],[6113725,".adsbawah"],[758577,".adsbawah1,.adskanan1"],[758578,".adsbawah2,.adskanan2"],[758579,".adsbawah3,.adskanan3"],[781878,".adsbymgid"],[6821709,".adsbyown"],[13605159,".adsbyrunactive"],[14420899,".adsgen1"],[14488018,".adsimgs"],[14416771,".adskanan"],[14544087,".adskiri"],[14659130,".adskiri1"],[14659131,".adskiri2"],[14659132,".adskiri3"],[6742625,".adspace_300"],[772621,".adspost520,.adspost728"],[762662,".adstengah"],[4639743,".adtext01"],[16480574,".adunits"],[14044088,".banner-iklan"],[1324765,".bgads"],[3632949,".bireklam"],[240888,".box_item_ads_popup"],[10603915,".current.ujimodal.ujipopup"],[8785300,".disads300px"],[8231865,".fake_player"],[16209481,".floatingBanner728"],[12552739,".floatingads"],[14300978,".footer-ad-mobile"],[12480757,".forads"],[6755905,".fotads_showalign"],[10365524,".frame_iklan_baris"],[5835731,".gbcontent,.gpcontent"],[1375240,".happy-inside-player"],[14511842,".headads"],[349026,".header-ad-mobile"],[9668900,".idblog-center-ads"],[10301955,".idblog-topbanner-aftermenu"],[1209098,".idmuvi-afterplayer"],[13415047,".idmuvi-banner-aftercontent"],[13401212,".idmuvi-banner-beforecontent"],[13413705,".idmuvi-banner-insidecontent"],[1203373,".idmuvi-center-ads"],[1203848,".idmuvi-floatbanner"],[6305495,".idmuvi-floatbanner-footer"],[16048737,".idmuvi-floatbanner-left"],[16048738,".idmuvi-floatbanner-right"],[3780346,".idmuvi-footerbanner"],[12091923,".idmuvi-topbanner"],[9379420,".idmuvi-topbanner-aftermenu"],[558520,".idmuvi-topbanner-archive"],[12104974,".idmuvi-topplayer"],[334453,".iframeiklan"],[7919049,".iklan"],[7950749,".iklan-atas,.iklan_atas"],[11593942,".iklan-bawah,.iklan_bawah"],[1076558,".iklan-bawah-player"],[11602318,".iklan-kanan,.iklan_kanan"],[7951076,".iklan-kiri,.iklan_kiri"],[1376224,".iklan-latest-kanan"],[1376228,".iklan-latest-kiri"],[7951095,".iklan-left"],[7951232,".iklan-pos"],[7951219,".iklan-puff"],[11608834,".iklan-right"],[7587637,".iklan-samping"],[10609544,".iklan1"],[10609545,".iklan2"],[10609546,".iklan3"],[12005130,".iklan300"],[12009044,".iklan728"],[12021570,".iklanBox"],[7587929,".iklan_semprot"],[344879,".iklan_semprot_h"],[11610954,".iklan_tengah"],[7951356,".iklanatas"],[11592712,".iklanbanner"],[7951380,".iklanfull"],[7950876,".iklanhead"],[7950873,".iklanlebar"],[7950892,".iklanleft"],[7951005,".iklanmini"],[7951202,".iklanpost"],[7951369,".iklanpusat"],[7951004,".iklanright"],[10131010,".iklanx1"],[10627897,".ikltop"],[7761745,".infeed-ads"],[1020155,".inner-floatbanner-bottom"],[6661149,".inside-player-ad"],[16639872,".ivs-overlay-adcontainer"],[4199725,".ivs-overlay-ads"],[6398116,".kill-adblock-container"],[9048567,".kotak_iklan"],[10033546,".kotakiklan"],[1105936,".ktz-aftermenubanner"],[12483973,".ktz-bannersingletop"],[11818792,".marginads"],[2131984,".mobileAd_bottom_floating"],[11345019,".mobileads"],[16151380,".mobileadstop"],[1576447,".para_ads"],[14470527,".pengiklan"],[10931628,".popUpBannerBox"],[9755348,".popupflyin-clicks-area"],[13791114,".pusat728"],[16030739,".qode-banner-left"],[15674140,".qode-banner-right"],[9036908,".remodal"],[16220265,".rkads"],[16264548,".show-first-ads"],[100280,".simple_advert"],[1373904,".single_ad_728x90"],[257215,".skin-iklan"],[14746917,".subiklan"],[118920,".text-center.adv"],[1441960,".topadsense"],[324022,".under-player-ad"],[14762065,"#adsic364x90-bokep"],[2042291,"#judi"],[12979423,"#judi2"],[5261488,"#togel"],[712547,".ads-1xbet"],[3609288,".dominowalet"],[7157401,".happypoker"],[12201022,".judi"],[1415045,".togel"]];

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
