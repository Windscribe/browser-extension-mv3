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

// rus-0

const toImport = [[530804,"#pgeldiz"],[1996612,"#AF_kph0"],[1996613,"#AF_kph1"],[8696683,"#BlWrapper > .b-temp_rbc"],[5858913,"#JobInformer"],[5330990,"#MT_overroll ~ div[class][style=\"left:0px;top:0px;height:480px;width:650px;\"]"],[5126606,"#PopWin[onmousemove]"],[7870070,"#SR_PopOver"],[9861845,"#SR_PopOverModalBackground"],[1665220,"#ad_ph_2"],[1665221,"#ad_ph_3"],[1665222,"#ad_ph_4"],[1665226,"#ad_ph_8"],[6337980,"#addsDiv"],[1139120,"#adv"],[7619193,"#adv_kod_frame,#adv_kod_frame ~ #gotimer"],[11913995,"#adv_unisound ~ #ad_module_cont > [id^=\"ad_module\"],#adv_unisound ~ #main > #slidercontentContainer"],[9433309,"#advblock"],[11412888,"#advideo_adv"],[8240200,"#advideo_adv_main_div"],[11267136,"#advm_preload"],[8857965,"#cyberinfrm_18"],[2439404,"#eropromo_icq"],[7931820,"#export_test_inboobs"],[14637473,"#fp_adv"],[8627273,"#fp_banner"],[855929,"#fresh_flyroll_div"],[11406893,"#fullBannerContent"],[9980547,"#gaminator"],[1193055,"#girlsBar"],[4480984,"#h_24x4"],[2580143,"#limonads_body"],[4753825,"#logethy_iframe"],[1973290,"#magnaInformer"],[15661562,"#marketgid"],[15508994,"#mmmBanner"],[2677768,"#movie_video:empty"],[15410715,"#nor_wrap"],[13866009,"#novem_billboard"],[13373495,"#onesignal-bell-container"],[15017899,"#potok_flyroll_div"],[8792948,"#radeant"],[7202577,"#vPreloader"],[3784202,"#vid_vpaut_div"],[8030174,"#winvideoPlayer"],[16504992,"#zhlobam_net_informer_console"],[4403010,".AdWheelClick"],[12532288,".MIXADVERT_NET"],[3981380,".SC_TBlock"],[15407890,".ad-240x400"],[9447837,".ad-richmedia"],[2273678,".ad-richmedia-overlay"],[9055320,".admachina-banner"],[5230754,".ads300-thumb"],[712200,".ads600x200"],[5410648,".ads_600x200"],[7469301,".adsbyyottos"],[871696,".adv-youdo"],[5347424,".advads-background"],[8150047,".ah-teaser-wrapper"],[4172600,".ainsyndication"],[6267832,".airbnb-embed-frame"],[1536339,".appwidget-journalpromo"],[6634509,".b-journalpromo-container"],[2345690,".b-offers_type_extra"],[596568,".banner_240x400"],[3941480,".base-page_center > .banerBottom,.base-page_center > .banerTop,.base-page_center > .banerTopOver"],[7730920,".base-page_container > .banerRight"],[7723529,".base-page_left-side > #left_ban"],[2266837,".bc-adv"],[174439,".bc_adv_container"],[9434229,".bigClickTeasersBlock"],[1573129,".block_rekl"],[15199152,".blockadwide"],[10805019,".blog-post__video-ad"],[16454709,".bottom_serial_reklama"],[12970047,".btn_rec"],[4116630,".cls_placeholder_gnezdo"],[2461162,".content_rb[id^=\"content_rb_\"]"],[1451711,".da-widget"],[3112864,".da_adp_teaser"],[12591797,".directadvert-block"],[10811967,".e-ta-rg"],[2187336,".flat_ads_block"],[6134104,".gaminator"],[11813248,".goha_ads"],[5032228,".goha_ads_acceptable"],[691915,".grv-bell-host"],[16492817,".h_banner"],[2714422,".header-banner > #moneyback[target=\"_blank\"]"],[14591856,".health-inline-ads"],[4126704,".itemLinkPET.plista_widget_belowArticle_item"],[15489323,".j-li_sidebar-banner"],[10558764,".js-ognyvo__item"],[2393451,".lj-recommended"],[12271188,".madv"],[13070391,".mc_cars_row"],[10180384,".mediaget"],[13157180,".medicinetizer"],[11809423,".merc_title"],[13770672,".merc_title_2"],[1237934,".modul-search"],[15047628,".module-one-search"],[4081764,".mts_ad_widget"],[4097423,".mywidget__col > .mywidget__link_advert"],[13617763,".ncwAdCommon"],[12866870,".novinator"],[12322266,".nts-video-wrapper"],[1202507,".onona-block"],[1170957,".pb_left_banner"],[5414818,".pb_right_banner"],[14029024,".pb_top_img"],[2471704,".pip-video-wrapper > .pip-video-label"],[13999663,".plista-powered"],[14243343,".pr-AVA"],[5336067,".pr-AVA2"],[887629,".redtram"],[5489568,".roxot-dynamic"],[7433342,".serp-adv__banner"],[12024483,".serp-block_type_market-offers"],[2683083,".shareaholic-ad"],[11779337,".sp_search2_table,.sp_search3_table"],[11799542,".sp_search_table"],[6255138,".surbis_banner"],[8033717,".td-a-rec"],[1115422,".tiezerlady"],[14253813,".topbaner"],[7077344,".travelpayouts_container-offers-carousel.carousel"],[12545634,".tv-grid__item-adv-content"],[12545319,".tv-grid__item-adv_wide_no"],[548127,".tv-grid__item.tv-sortable-item.tv-sortable-item_sortable_no.tv-sortable-item_draggable_no"],[5343127,".vit_adf"],[9340375,".webnavoz_notificationbox"],[4068374,".ya-direct"],[4061136,".ya-partner"],[5999209,".yandex-rtb"],[11577179,".yandex-rtb-block"],[270889,".a-buttons.blue-but.a-check,.a-buttons.green-but.a-clock"],[14439697,".min-width-normal > #popup_container,.min-width-normal > #popup_container ~ #fade"],[2275205,"#root > .app #very-right-column,#root > .app .adfox,#root > .app .adfox-top,#root > .app .brand-widget__right-cl,#root > .app .partner-block-wrapper,#root > .app .sportrecs,#root > .app > .sticky-button"],[1467187,".app.blog-post-page #blog-post-item-video-ad,.app.blog-post-page .secondary-header-ad-block"],[4028701,".flex-promo-series > .left-col > :not(#players):not(.serial-series-info)"],[3903581,".jtn-widget-adv"],[12957976,".widget-autoru"],[15647998,".rbcobmen"],[546080,"#_u_ablock_bottomlink"],[2182291,"#_u_ablock_toplink"],[10188908,"#u_preroll_overlay"],[10397101,"#u_preroll_videoadbetnet"],[13865652,"#u_preroll_videoinvi"],[10188889,"#u_preroll_videomvd"],[5301418,"#adblock_message"],[9377158,"#adblock_screen"],[8244716,".adblockInfo"],[8237385,".adblock_floating_message,.adblock_floating_message"],[8244677,".adblock_msg"],[9570292,".ads-block-warning,.ads-block-warning"],[5936485,".deadblocker-header-bar,.deadblocker-header-bar"],[8126379,".detected-block-modal"],[14958985,".no-ad-reminder"],[7893542,".ad-blocker-warning,.ad-blocker-warning,.ad-blocker-warning"],[1297089,".main_adbalert"],[9585276,".pane-emediate"],[2913092,"#AdBlockDialog"],[15653482,"#aabl-container"],[4525650,"#abp-killer"],[14045638,"#adBlockAlert"],[8979248,"#adBlockAlertWrap"],[15977364,"#adBlockDetect"],[15990148,"#adBlockerModal"],[4019885,"#ad_blocker"],[9635749,"#adb-actived"],[9736344,"#adb-enabled,#adb-enabled3"],[10288829,"#adb-warning"],[9977842,"#adbWarnContainer"],[11117282,"#adbcontainer-popup"],[9359472,"#adblock-alert"],[10043574,"#adblock-box"],[5148412,"#adblock-honeypot"],[9370965,"#adblock-modal"],[10043898,"#adblock-msg,#adblock_msg"],[9372413,"#adblock-notice"],[5347907,"#adblock-overlay"],[5598617,"#adblock-warning"],[9363316,"#adblockDetect"],[10044062,"#adblockWrap"],[5034322,"#adblock_detected"],[5506711,"#adblock_tooltip"],[9376100,"#adblockerModal"],[2371234,"#adblocker_announce"],[2371382,"#adblocker_message"],[13522617,"#adblocker_modal_overlay"],[10043937,"#adblockinfo"],[10043974,"#adblockpopup"],[3518608,"#adbpopup"],[8583035,"#ads-blocked"],[15266739,"#adsblocker_detected"],[5897434,"#advertisementjsalert"],[9406642,"#anti_adblock"],[6108847,"#box-adblocker-wrap"],[6922088,"#content_adblock_message"],[3969197,"#detectAdblock"],[4922509,"#detectadblock"],[9336233,"#detection-block"],[14978,"#detection-block-overlay"],[7765819,"#fnAdblockingOverlay"],[11897992,"#fondAdblock"],[2394391,"#gothamadblock_msg"],[2537494,"#gothamadblock_overlayh_n"],[60749,"#js-popup-blocker"],[12956563,"#mdp-deblocker-js-disabled"],[15390250,"#message_adblock"],[16446179,"#modal-adblocker"],[6035307,"#notify-adblock"],[1704538,"#tie-popup-adblock"],[11828863,"#wrapperBlocker"],[7624442,".AdblockBanner"],[7628430,".AdblockMessage"],[7205063,".AdblockMessage_msg"],[6108454,".BrokenAd"],[9326250,".ab-detected"],[11687978,".ad-alert-message-text"],[12478010,".ad-alert-wrapper"],[7880208,".ad-block-detected,.ad_block_detected"],[15398133,".ad-block-enabled"],[15390013,".ad-block-message"],[7875399,".ad-block__overlay"],[15461108,".ad-blocked"],[9415011,".ad-blocked-container"],[7880622,".ad-blocked-wrapper"],[15950139,".ad-blocking-advisor-wrapper"],[10530542,".adBlock-banner"],[592370,".adBlockDetectModal"],[1585837,".adBlockDetectedSign"],[1576289,".adBlockNotification"],[6944094,".adBlockNotificationOverlay"],[10529590,".adBlockWarning"],[5376618,".ad_block_off"],[173442,".ad_blocker"],[214297,".adace-popup-detector"],[7937123,".adb-enabled"],[1309593,".adbd-background"],[6272891,".adbd-message"],[6285289,".adbd-wrapper"],[4303285,".adblock-message"],[3926762,".adblock-modal"],[1430053,".adblock-modal-content"],[5939523,".adblock-notification-wrapper"],[3929545,".adblock-player"],[8244871,".adblock-stop,.adblock-stop"],[16698708,".adblock-warning-partial-component"],[14472324,".adblock-warning-teaser"],[3935834,".adblockOverlay"],[4036199,".adblock_detector"],[4047999,".adblock_enabled"],[8244657,".adblockalert"],[524111,".adblocker-message"],[3932004,".adblocker-root"],[3932145,".adblocker-wrap"],[769262,".adsblocked"],[1572963,".blockingAd"],[71574,".counterAdblocks"],[11846441,".deadblocker-header-bar-inner"],[15344374,".detectBlockBox"],[6214232,".dispositifAdblock"],[15968814,".dispositifAdblockContent"],[12907144,".dispositifAdblockMessageBox"],[4084116,".fuckYouAdBlock"],[9167134,".fuckYouAdBlock2"],[7206568,".header-blocked-ad"],[6866135,".js-ad-whitelist-notice"],[14807728,".js-checkad-warning"],[6398116,".kill-adblock-container"],[7145113,".modal__body-adblock"],[3664901,".msg-adblock"],[12229565,".noadblock"],[1654378,".remove-adblock-msg"],[3414213,".svg-adblock-full"],[4214451,".svg-adblock-full--box"],[7301808,".test-adblock-overlay"],[12398007,".top-bar-adblock"],[16315861,".wp_adblock_detect"],[10043663,"#adblocktest"],[16052602,".diysdk_webServices_banners1und1MainContent"]];

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
