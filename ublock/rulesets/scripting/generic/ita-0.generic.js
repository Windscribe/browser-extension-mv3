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

// ita-0

const toImport = [[5308280,"#ADV_filter_1,#ADV_filter_2"],[15123254,"#ADV_leaderboard_atf"],[12885799,"#ADVrettangolo"],[14802237,"#ADVrettangolopiede"],[5722411,"#ADVstriscia"],[4883113,"#CVLR_banner_ADX"],[1213291,"#HALFPAGE2_advadagio,#HALFPAGE3_advadagio"],[7331628,"#HALFPAGE_BOTTOM_advadagio"],[5452417,"#HALFPAGE_advadagio"],[4610594,"#MID_RECTANGLE1_advadagio,#MID_RECTANGLE2_advadagio"],[3699738,"#MediamondAd_bp"],[14028677,"#MediamondAd_bp_1"],[14029173,"#MediamondAd_rn_2,#MediamondAd_rn_u"],[14029204,"#MediamondAd_sn_u"],[13415619,"#Sponsor728x90Top"],[5415419,"#UNITIS_ads_300250"],[10676083,"#WIDELEADERBOARD2_advadagio"],[11310174,"#WIDELEADERBOARD_BOTTOM_advadagio"],[15166607,"#ad_testa_foto"],[4876750,"#adasta_box_ros_2"],[8823185,"#adbanner-laterale"],[2780278,"#adbanner-stampa"],[7423248,"#adk_article-middle"],[16725726,"#adk_article-top"],[11339175,"#adk_interstitial"],[1526316,"#adk_masthead"],[6846721,"#adk_spalla-bottom"],[6846532,"#adk_spalla-middle"],[1991379,"#adk_spalla-top"],[4259348,"#ads-interno-1"],[4259349,"#ads-interno-2"],[8885975,"#ads-laterale"],[8416823,"#adsense-destra"],[9562489,"#adsense-notizia"],[8930964,"#adsense_lato"],[4678232,"#adv-Piede"],[990077,"#adv-Piede-sticky"],[4696067,"#adv-box-1"],[2192829,"#adv-broker-overlayer"],[13956875,"#adv-broker-overlayer-background"],[11512889,"#adv-iframe-sx-home"],[9914966,"#adv-masthead-0"],[12682367,"#adv-pushdown-1"],[11242555,"#adv-skin-colonnadx,#adv-skin-colonnasx"],[4176816,"#adv00"],[4176818,"#adv02"],[416740,"#advAutopromo1"],[416741,"#advAutopromo2"],[4664996,"#advBB-left"],[10403061,"#advBB-right"],[4665254,"#advBB-top"],[12986780,"#advSwiper_article"],[7390616,"#adv_ManchetteDx,#adv_ManchetteSx"],[2374272,"#adv_Skin_left"],[2374384,"#adv_Skin_right"],[10900606,"#adv_Skin_top"],[4694449,"#adv_adagio"],[6194617,"#adv_annuncio_promo_1"],[4696621,"#adv_click"],[5621781,"#adv_gda"],[11546899,"#adv_in_post"],[5627889,"#adv_mob"],[8288076,"#adv_nativ_sopracartina"],[6034510,"#adv_outbrain_AR_1_sottocartina"],[11638267,"#adv_sotto_navigatore"],[12982091,"#adv_sponsor_canale_tematico"],[13750976,"#adv_sponsor_categorico"],[11740974,"#advcolonnadx"],[11740989,"#advcolonnasx"],[4702112,"#advdivbp1"],[5927766,"#advertisingStriscia"],[4699663,"#advsfondo"],[5521744,"#altervista_banner-3"],[2404382,"#altervista_googleadsense-2"],[16395362,"#annunciGoogle"],[16387929,"#annunci_google"],[10645222,"#annuncio-virgilio"],[3363284,"#blocco_servizi_sponsor1"],[3718227,"#body-adv-link"],[16530365,"#box_adv_sponsor_categorico"],[4570382,"#box_single_adv_sotto"],[7464163,"#box_single_adv_sotto_1"],[7464164,"#box_single_adv_sotto_2"],[4935598,"#bt_adv_div"],[13438464,"#cardAdv"],[8459386,"#contPubb"],[10440344,"#corpo_video_sponsor"],[6841888,"#deaAdvTop"],[11731647,"#divPubblicita"],[15638833,"#eadv-billboard"],[2525399,"#evolutionadv"],[8984038,"#fullAdv-dx"],[8984053,"#fullAdv-sx"],[13426575,"#fwnetblocco"],[4866457,"#fwnetblocco160x600"],[4866268,"#fwnetblocco300x300"],[13570759,"#fwnetblocco_v"],[569593,"#hp_sez_advmkt_01"],[13914227,"#kauppa_box"],[7714553,"#leo-adv"],[3114514,"#lg-spalla-ads01-down"],[4971269,"#lg-spalla-ads01-up"],[1099744,"#lg-spalla-ads03"],[8481904,"#libero_header_adv"],[7208795,"#main_360_adv"],[3079926,"#mmAdDivSkDx,#mmAdDivSkSx"],[3079904,"#mmAdDivSkLb"],[1531658,"#ppn_ad_div"],[3124569,"#pubbli-alto"],[1184743,"#pubbli_top"],[1184872,"#pubblicita"],[6210328,"#pubblicita-libero-top"],[16082997,"#pubblicita-menu"],[6570679,"#pubblicita-sotto-immagine"],[6545646,"#pubblicita_blog_post_testa"],[14964128,"#quattrownet_468x60"],[7943724,"#rcsad_BottomLeft_1"],[8759210,"#rcsad_Frame1,#rcsad_Frame2"],[3531659,"#rcsad_TopLeft"],[12793332,"#ripBoxAdvCentroSX2"],[4153994,"#skinadvdx,#skinadvsx"],[9895789,"#sp-adv-header"],[7110532,"#syTagContainer"],[946803,"#tccAdPlayer"],[11321998,"#top3-pubbli"],[3001284,".ADV300_250_600_Content"],[10511184,".ADVBig_Content"],[5213459,".ADVFLEX_250_Content"],[364465,".AlterVista_GoogleAdsense"],[210385,".Banner_VideoAd_Interno"],[1340189,".Pubblicita"],[11451021,".ab-box-adv-cn"],[15636067,".actio-adlabel"],[2490992,".ad-fisso"],[16528261,".ad-orizzontale"],[9340146,".ad-verticale"],[11870783,".adSenseLaterale"],[166901,".ad_pedice"],[14729682,".adagiowritebanner_dmtag"],[14528437,".adivi-infeed"],[13872689,".adk-slot"],[5070538,".ads--primo-piano"],[10151039,".ads-dx"],[10151504,".ads-sx"],[10199089,".ads_dx"],[4888758,".ads_pagineprof"],[7289435,".ads_singolo"],[777372,".ads_topdx,.ads_topsx"],[7476743,".adsbyawcloud"],[15409760,".adv--lg"],[15409987,".adv--sq"],[8032225,".adv-100x100"],[9529151,".adv-articolo,.adv_articolo"],[3467669,".adv-banner-wrap"],[15461729,".adv-cnt"],[9636076,".adv-footer-kauppa"],[853188,".adv-h-100"],[750156,".adv-iframe-sx"],[7132549,".adv-inside-text"],[9275690,".adv-loc-container"],[860065,".adv-margin,.adv_margin"],[9885826,".adv-masthead"],[9971586,".adv-promobox"],[864535,".adv-region"],[865733,".adv-sfondo"],[10025093,".adv-skin"],[9657460,".adv-skin-weben"],[10572660,".adv-son-300x650-page"],[13414437,".adv-sponsor__content"],[14233058,".adv-strip-container"],[10094146,".adv-testata"],[13259214,".adv-width-box"],[15481017,".adv-wpz"],[10242572,".adv100"],[801041,".adv300eni"],[8071665,".adv300x100vd"],[10260062,".advArt"],[10260930,".advBot"],[9899081,".advBoxDxBis"],[9938933,".advCollapse"],[862058,".advFooter"],[3998328,".advHm-cont-Ape"],[9946417,".advPostLibri"],[9648246,".advTestuale"],[9085188,".adv_120x600_categoria,.adv_160x600_categoria"],[16471487,".adv_468x60_categoria"],[4617587,".adv_block__text"],[10730339,".adv_bug_float"],[9648783,".adv_esterno"],[5433010,".adv_inner_notizia"],[3587039,".adv_lateral_dx"],[3587054,".adv_lateral_sx"],[5715213,".adv_news"],[5757070,".adv_oriz"],[5953387,".adv_vert"],[868286,".adv_video"],[861562,".advborder"],[10293719,".advdsk"],[443685,".advhead"],[2702277,".advnext_correlati"],[12610161,".advricaricamediamond"],[669920,".alp-advert"],[13491300,".archive-post__adv"],[15990953,".aside-adv-scroll"],[14627469,".av-banner-728X90"],[242928,".avadvslot"],[6001344,".bannerPubblicita"],[14890943,".bannerPubblicitaOrizz"],[10433308,".banner_300x250_read"],[13916232,".banner_pubblicita"],[1652620,".barraSipra"],[16040743,".bck-adv-sponsor"],[9655005,".bk-adv"],[2365151,".blocco_servizi_sponsor"],[13052405,".box-pubb"],[11976743,".box-pubblicita"],[14675653,".box-pubblicita-multimedia"],[16323004,".box-pubbliredazionale"],[15551638,".boxADV"],[15552662,".boxAdv"],[10326625,".box_adv_annunci"],[6846539,".box_adv_speciali_hp"],[16591632,".boxpubblicita"],[11024232,".boxpubblicitasx"],[15941053,".bt_adv1"],[715714,".bt_sub_adv1"],[5475874,".c-iol-ad"],[6863511,".cellulare-adv"],[2458947,".center-adv"],[5211512,".center-adv-news"],[2636440,".cmt_bgadv"],[14845115,".contenitore_ad_top"],[189231,".content-adv-manager"],[552273,".contenuto-sponsorizzato"],[2011132,".cp_adv-box"],[3437813,".cp_adv300x250"],[10581298,".dads-lk"],[6279618,".dm20-adv-slot"],[3513426,".edSponsor"],[1048931,".ed_Related_Record_Div_Sponsor"],[6897953,".ed_Related_Sponsor"],[11528627,".ed_Related_Sponsor_Top_Container"],[3871721,".ed_Sponsor"],[7507589,".edinet_adv_container"],[1058461,".edinews_widget_link_sponsorizzati"],[4057322,".epeex_Sas"],[4352117,".evolve-adv"],[4480891,".extra--adv"],[5364719,".first_adv"],[6194063,".flexi-pubblicita"],[912700,".foc-adv-slot"],[7657514,".foglia-middle-adv"],[11297217,".google-adx-corpo"],[14911413,".google-adx-spalla"],[9631070,".googleAnnunci"],[7189669,".google_adx_corpo"],[12010874,".gptslot--adv"],[13534318,".gtv-adv-slot"],[2715290,".header-adv-wr"],[1298440,".header-mobile-mega-adv"],[10269278,".home-rubriche-adv"],[12600538,".inews_adv_top"],[8116943,".inread_adv"],[8190059,".intro-adv"],[14242893,".jadv_leoadv_pd"],[10776030,".lancio_adv"],[7562648,".leaderboard-adv"],[6089068,".lg-titolo-ads"],[4211832,".lg-titolo-ads-dx"],[4211847,".lg-titolo-ads-sx"],[12714183,".linksponsorizzati"],[8876650,".listatonativeadv"],[13343639,".live-adv-square"],[4116529,".live-adv-top"],[4060011,".live-article-adv-container"],[12634735,".modPubblicita"],[12814391,".nativeadv"],[5778322,".netd_300x600adv"],[12887427,".newtekadv"],[883281,".nk-adv"],[7991640,".nk-adv-in-article-1"],[7991641,".nk-adv-in-article-2"],[8215345,".nw_adv_full"],[1239634,".partial-static-adv"],[1239696,".partial-sticky-adv"],[4145218,".pat-adv-300x250"],[913661,".pat-adv-box"],[5939206,".pat-adv-masthead"],[16217734,".post_pubblicita"],[15977915,".promo_sp"],[11834205,".pub_text"],[14115645,".pubblicit,.pubblicita"],[1106850,".pubblicita-banner"],[9145823,".pubblicita-box"],[15110151,".pubblicitaGoogle"],[15121490,".pubblicitaSlider"],[1105349,".pubblicita_728x90"],[15133156,".pubblicita_col1"],[1107288,".pubblicita_sottile"],[1107249,".pubblicitacentrata"],[1106990,".pubblicitapremium"],[1554156,".pubbliredazionale"],[108241,".pubblitalocaleaddADV"],[3356729,".pubblitalocaleaddpiccola"],[6728566,".publi_ad"],[1345825,".qtr-bacheca-adv"],[2602566,".rcsad_BottomLeft_x_content"],[1000845,".related-adv"],[13031653,".sal-adv-adsense"],[12304600,".sal-adv-slot"],[16129029,".sb-box-pubbliredazionale"],[4925584,".sdbadv"],[4941828,".sidebar-adv"],[1368066,".sidebar-item-adv"],[4941748,".sidebar__adv"],[464794,".single-adv"],[248282,".sito-adv-sopra-main"],[7772818,".slot-adv"],[15001343,".sponsor160x600Dx"],[14822767,".sponsor300x250Sx"],[14078617,".sponsorizzati"],[314878,".sticky-adv"],[913488,".tabella2Pubblicita,.tabella3Pubblicita"],[895147,".tabellaPubblicita"],[1053020,".tcc-banner"],[1052072,".tccbanner"],[449090,".textual-adv-text"],[9146140,".tn_adv"],[11140244,".topadv_left"],[11140356,".topadv_right"],[992088,".trama_ads"],[2759117,".tw-adv-native"],[16325368,".tw-adv-slot"],[5568292,".view-pubblicita"],[11143983,".widget_adv_multi"],[2089141,".widget_eepex"],[2087528,".widget_n1ad"],[12805926,".wl_WidgetRel_Sponsor,.wl_WidgetRel_Sponsor1"],[5643331,".yobee-adv"],[4534993,".yobee-lazyadv"]];

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
