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

// deu-0

const toImport = [[8017239,"#Ad_Win2day"],[934467,"#LxWerbeteaser"],[10196347,"#ParentDivForWerbPostbit"],[7969177,"#SSpotIMPopSlider"],[13173797,"#SlimSpot_imPop_Container"],[9200343,"#Werb_Postbit_Bottom"],[7138962,"#WerbungLinks"],[7138748,"#WerbungOben"],[1708833,"#WerbungObenRechts10_GesamtDIV"],[4385662,"#WerbungObenRechts8_GesamtDIV,#WerbungObenRechts9_GesamtDIV"],[3200192,"#WerbungRechts1,#WerbungRechts2"],[7139111,"#WerbungUnten"],[14723139,"#WerbungUntenLinks4_GesamtDIV,#WerbungUntenLinks7_GesamtDIV,#WerbungUntenLinks8_GesamtDIV,#WerbungUntenLinks9_GesamtDIV"],[7138294,"#Werbung_Sky"],[7138397,"#Werbung_Wide"],[9327411,"#ad-bereich1-08"],[1617309,"#ad-bereich1-superbanner"],[9327442,"#ad-bereich2-08"],[1630763,"#ad-bereich2-skyscrapper"],[7233045,"#ad-qm-sidebar-oben"],[6121069,"#ad-qm-sidebar-unten"],[7233437,"#ad-rechts-block"],[9434279,"#ad-rechts-sky"],[2521097,"#ad-sb-oben"],[10071115,"#ad_gross"],[1539847,"#ad_lang"],[1629909,"#ad_oben"],[4013327,"#ad_rechts"],[614472,"#adbox_artikel"],[3350084,"#adcontentoben,#adcontentoben1"],[1539012,"#adkontainer"],[13473729,"#adliste"],[5157662,"#adunten"],[12523307,"#anzeigewerbungtext"],[11462434,"#ar_detail_werb103"],[6815299,"#bannerwerbung"],[16178128,"#block-views-Topsponsoren-block_1"],[6934279,"#callya_freikarte_layer"],[6358715,"#cnt_bgwerbung"],[6253308,"#cont-werb"],[5303594,"#content_werbung"],[11912166,"#footerwerbung"],[15266165,"#forumformwerbung"],[16055945,"#freikarte_layer"],[8284573,"#gonamicerror"],[4003232,"#google_adsense_werbung"],[13108620,"#gwerbung"],[16676747,"#hauptnaviwerbelinks"],[9426390,"#headerWerbung"],[9651643,"#header_werbung"],[10379702,"#headerwerbung"],[13156181,"#inlinewerbung"],[3882124,"#kalaydo_ads"],[10371847,"#kaufDA"],[11940980,"#kaufDA-widget-container"],[5302508,"#kopf-werbung"],[2544990,"#layerADLINKWerbung4"],[15750712,"#nativendo-articlemiddle"],[508090,"#nativendo-articletop"],[2722382,"#nativendo-artikel"],[5981299,"#nativendo-home"],[870938,"#nativendo-home-1,#nativendo-home-2"],[2722161,"#nativendo-homepage"],[2722175,"#nativendo-hometop"],[2721947,"#nativendo-infeed-1,#nativendo-infeed-2,#nativendo-infeed-3,#nativendo-infeed-4,#nativendo-infeed-5,#nativendo-infeed-6,#nativendo-infeed1,#nativendo-infeed2"],[2722329,"#nativendo-marginal"],[4682967,"#nativendo-nachrichten-unterhalb"],[507181,"#nativendo-oms-infeed"],[11595155,"#o2freikarte"],[5574968,"#oms_gpt_billboard"],[5586613,"#oms_gpt_outofpage"],[5571087,"#oms_gpt_rectangle"],[13898678,"#oms_gpt_rectangle_halfpage"],[5576919,"#oms_gpt_skyscraper"],[5424706,"#oms_gpt_superbanner"],[4277265,"#p-links-werbung"],[13474234,"#p-rechts-werbung"],[15857226,"#qm_content_ad_anzeige"],[12542178,"#reklame"],[16181327,"#reklame-leaderboard-unten"],[5888254,"#reklame-rechts-mitte"],[5888310,"#reklame-rechts-oben"],[5888487,"#reklame-rechts-unten"],[2354152,"#reklame-rectangle"],[7112133,"#reklame_layer"],[4633864,"#skywerbung"],[4823334,"#slotright-werbung"],[2473071,"#sp0ns0ren"],[10177629,"#sspot_impopad_wrapper"],[4494254,"#startwerbung"],[5510878,"#t_werbung"],[9032538,"#text-ads-mitte"],[4135188,"#textwerbung"],[2669348,"#tmobilefreikarte"],[5289266,"#topwerbung"],[2044354,"#unisterAd_1"],[2044355,"#unisterAd_2"],[9570362,"#videopage-werbung"],[5200384,"#werb10"],[5200385,"#werb11"],[5200386,"#werb12"],[5200387,"#werb13"],[7744566,"#werb7"],[7744567,"#werb8"],[7744568,"#werb9"],[8096103,"#werbLayer1,#werbLayer2,#werbLayer3"],[8114110,"#werb_ps103"],[8119813,"#werbeForm"],[2327204,"#werbeFormRectangle"],[56074,"#werbeFormTop"],[16335293,"#werbeadd"],[54857,"#werbeanzeige"],[42654,"#werbebanner"],[8119710,"#werbeblock"],[52820,"#werbeblock2"],[2261404,"#werbeblock_rechts"],[16336615,"#werbebox"],[52936,"#werbeflaeche"],[1641061,"#werbeflaeche-3"],[13468330,"#werbeflaeche-billboard-big"],[2702652,"#werbeflaeche-mpu-big"],[42836,"#werbekasten"],[46640,"#werbeleiste"],[2202272,"#werbeslot-artikel"],[2201772,"#werbeslot-sidebar"],[58978,"#werbetrenner"],[10284333,"#werbung"],[16265801,"#werbung-banner"],[7549728,"#werbung-banner-container"],[8134934,"#werbung-fb"],[525002,"#werbung-left"],[1253551,"#werbung-map-top"],[2106551,"#werbung-rectangle1,#werbung-rectangle2"],[4007208,"#werbung-seitenleiste-container"],[2112383,"#werbung-skyscraper"],[47268,"#werbung1"],[16256415,"#werbung125_links"],[2060555,"#werbung125_rechts"],[47269,"#werbung2"],[47270,"#werbung3"],[523414,"#werbung792_2"],[47301,"#werbungR"],[16268512,"#werbungRechts,#werbungrechts,#werbungrechts1"],[2117155,"#werbungSuperbanner"],[16281239,"#werbungWrapper"],[524721,"#werbung_cad"],[3699844,"#werbung_contentad_screen"],[16269676,"#werbung_footer"],[9895097,"#werbung_leaderboard_screen"],[16275425,"#werbung_links"],[16276558,"#werbung_mitte"],[525094,"#werbung_oben"],[16280851,"#werbung_rechts"],[16280975,"#werbung_right"],[16303890,"#werbung_skyscraper_bottom"],[16737200,"#werbung_skyscraper_top"],[15464602,"#werbung_superbanner"],[525260,"#werbung_top"],[13887146,"#werbung_wideskyscraper_screen"],[524914,"#werbunglink,#werbunglinks"],[2105190,"#werbungrechtsfloat"],[16266058,"#werbungsbox300"],[8134939,"#werbungsky"],[16275114,"#werbungslider"],[525063,"#werbungunten"],[595435,"#wkr_werbung"],[8485661,".AdRechtsLokal"],[7531229,".Artikel_Ads_News"],[7840893,".GridWerbung"],[1182373,".KalaydoBoxLogo"],[15021893,".KalaydoRessortBox"],[7041770,".KomischeWerbeBox"],[687265,".RessortWerbungHeader"],[8274688,".Werbelabel"],[4861480,".Werbeteaser"],[8549026,".Werbung"],[14289086,".WerbungAdpepper"],[5064884,".WerbungDetailRectangle"],[6929558,".WerbungLinksRechts"],[5339750,".WerbungMitte"],[11494303,"._werbung"],[14350811,".ad_mitte"],[479439,".adguru-content-html"],[6764533,".ads-anzeige"],[4911935,".ads-artikel-contentAd-medium"],[4911947,".ads-artikel-contentAd-top"],[580568,".ads_bueroklammer"],[775043,".ads_rechts"],[13676107,".adsense-ArtikelOben"],[8184839,".adzeiger"],[4858224,".anzeigenwerbung"],[7727902,".article-werb"],[11327644,".artikelinlinead"],[1818273,".b-werbung"],[13303104,".babbelMultilangAdBannerHorizontal"],[1162742,".babbelMultilangAdRectangle"],[16609893,".banner-werbung-rechts"],[12442213,".banner-werbung-top"],[16546912,".bannerAnzeige"],[3162772,".bannergroup_werbung"],[13561046,".banneritemwerbung_head_1,.banneritemwerbung_head_2,.banneritemwerbung_head_3,.banneritemwerbung_head_4"],[6093393,".bdeFotoGalAd"],[505013,".bdeFotoGalAdText"],[6445145,".big-werb"],[11486430,".block-wozwerbung"],[4320920,".block_rs4_werbung"],[1206105,".bottom-werbung-box"],[11836549,".box_werbung_detailseite"],[14374959,".boxstartwerbung"],[13980123,".boxwerb"],[1834989,".boxwerbung"],[6959780,".content_body_right_werbung"],[6572103,".content_header_werbung"],[5228908,".content_right_side_werbewrapper"],[3753579,".contentwerbung4"],[66570,".ecom_werbung"],[5365135,".firstload"],[9607400,".fullbanner_werbung"],[4427913,".funkedigital-ad"],[5730605,".fusszeile_ads"],[11290010,".gutZuWissenAd"],[9091014,".inlinewerbungtitel"],[14331449,".insidewerbung"],[6202142,".keyword_werbung"],[12614450,".lokalwerbung"],[14460230,".mob-werbung-oben"],[950490,".mob-werbung-unten"],[10337064,".news-item-werbung"],[14186916,".newswerbung"],[15897183,".nfy-sebo-ad"],[15903910,".nfy-slim-ad"],[16563455,".pane-klambt-ads-klambt-adserver-medrectangle"],[11446215,".popup_werbung_oben_tom"],[11449756,".popup_werbung_rechts_tom"],[9934096,".ps-trackingposition_Werbungskasten"],[16134566,".rahmen_ad"],[7097975,".reklame"],[1967535,".right-content-werbung"],[15898340,".schnaeppchenScrollAd"],[16546373,".seitenleiste_werbung"],[10100552,".shift-widget > .cm-article"],[1799868,".sidebar-werbung"],[2205058,".sidebarwerbung"],[6210945,".spielen_werbung_2"],[14067395,".sponsorinaktiv"],[16510270,".sponsorlinkgruen"],[16488266,".superwerbung"],[12700026,".tab_artikelwerbung"],[718714,".teaser_adliste"],[719452,".teaser_werbung"],[1607908,".text_werbung"],[3056833,".textad_hauptlink"],[13720801,".textlinkwerbung"],[15869022,".tipps-content-ad"],[1442823,".topwerbung"],[4875274,".tx-scandesk-werbung"],[12988566,".undertitlewerbung"],[12905693,".userfunc-ad"],[7318014,".videowerbung"],[7536823,".werb_container"],[7238919,".werb_textlink"],[12729943,".werbeadd_ueber"],[15020649,".werbebanner"],[6441471,".werbebanner-oben"],[4273267,".werbeblock"],[4273311,".werbebox2"],[13030054,".werbeboxBanner"],[15030931,".werbeflaeche"],[15028607,".werbehinweis"],[1173145,".werbekennzeichnerrectangle"],[15020636,".werbemainneu"],[4272978,".werbenbox"],[4272942,".werbepause"],[4280072,".werblinks"],[4285498,".werbrechts"],[4840130,".werbung"],[4288438,".werbung-1"],[4288439,".werbung-2"],[15211351,".werbung-250x250"],[4288440,".werbung-3"],[10821391,".werbung-bigbox"],[16695932,".werbung-bigsize"],[15502705,".werbung-box,.werbung_box"],[316933,".werbung-container"],[16732341,".werbung-content"],[317053,".werbung-contentad"],[322739,".werbung-fullbanner"],[303519,".werbung-halfbanner"],[10828272,".werbung-inline"],[10830843,".werbung-label"],[10831068,".werbung-leiste"],[10167596,".werbung-rec-below-list"],[10836648,".werbung-rechts"],[307330,".werbung-rectangle"],[313162,".werbung-skyscraper"],[9708072,".werbung-skyscraper2"],[10840052,".werbung-unten"],[15826351,".werbung1"],[15826352,".werbung2"],[254884,".werbung280x70_wrap"],[15826353,".werbung3"],[4288437,".werbung300,.werbung301"],[10773805,".werbung300x600"],[10780537,".werbung970x250"],[10832853,".werbungAnzeige"],[318492,".werbungContainer"],[11821306,".werbungSkygrapperRight"],[10122944,".werbungSkygrapperTop"],[10820365,".werbungTabelle"],[15241142,".werbung_300x250"],[15501308,".werbung_728"],[10821598,".werbung_banner"],[16706506,".werbung_bereich"],[322584,".werbung_fuer_300er"],[4288493,".werbung_h"],[10828034,".werbung_index"],[10831222,".werbung_links"],[422076,".werbung_sidebar"],[15503263,".werbung_text"],[10832550,".werbungamazon"],[274233,".werbunganzeigen"],[15503178,".werbungarea"],[247253,".werbungimthread"],[305974,".werbungrechtstitel"],[12942190,".widget-werbung"]];

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
