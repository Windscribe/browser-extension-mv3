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

// ruleset: tha-0

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssSpecificImports() {

/******************************************************************************/

const argsList = ["#adotai-survey-frame-container,\n#adspc_tags,\n#taboola",".icon-bar-mb,\n.view-side-banner","#banner-left,\n.bireklam,\n.filmborder > .filmcontent div[style^=\"text-align\"],\n.filmcontent > div:nth-of-type(10),\n.widget_text.sidebarborder,\ndiv.bireklam:nth-of-type(1),\ndiv.bireklam:nth-of-type(10),\ndiv.bireklam:nth-of-type(11),\ndiv.bireklam:nth-of-type(12),\ndiv.bireklam:nth-of-type(2),\ndiv.bireklam:nth-of-type(21),\ndiv.bireklam:nth-of-type(22),\ndiv.bireklam:nth-of-type(3),\ndiv.bireklam:nth-of-type(4),\ndiv.bireklam:nth-of-type(5),\ndiv.bireklam:nth-of-type(6),\ndiv.bireklam:nth-of-type(7),\ndiv.bireklam:nth-of-type(9),\ndiv.filmborder:nth-of-type(13),\ndiv.filmborder:nth-of-type(14),\ndiv.filmborder:nth-of-type(15),\ndiv.filmborder:nth-of-type(16),\ndiv.filmborder:nth-of-type(17),\ndiv.filmborder:nth-of-type(18),\ndiv.filmborder:nth-of-type(19),\ndiv.filmborder:nth-of-type(20),\ndiv.filmborder:nth-of-type(23) > .filmcontent > div:nth-of-type(5),\ndiv.filmborder:nth-of-type(23) > .filmcontent > div:nth-of-type(6),\ndiv.filmborder:nth-of-type(23) > .filmcontent > div:nth-of-type(7),\ndiv.filmborder:nth-of-type(8),\ndiv.sidebarborder.widget_text:nth-of-type(10),\ndiv.sidebarborder.widget_text:nth-of-type(11),\ndiv.sidebarborder.widget_text:nth-of-type(12),\ndiv.sidebarborder.widget_text:nth-of-type(16),\ndiv.sidebarborder.widget_text:nth-of-type(3),\ndiv.sidebarborder.widget_text:nth-of-type(4),\ndiv.sidebarborder.widget_text:nth-of-type(5),\ndiv.sidebarborder.widget_text:nth-of-type(6),\ndiv.sidebarborder.widget_text:nth-of-type(7),\ndiv.sidebarborder.widget_text:nth-of-type(8),\ndiv.sidebarborder.widget_text:nth-of-type(9)","#ads_fox_bottom",".ads.col-lg-9",".sidebarborder:nth-of-type(1),\n.sidebarborder:nth-of-type(2)","#header .ad,\n.rightwidget div:has(a[href^=\"http://4toom.com/?p=\"]),\n.single .content div:has(.adsbygoogle)",".td-logo-wrap-full,\n.wpb_widgetised_column.wpb_content_element .td-a-rec.td-a-rec-id-sidebar",".row > .col-sm-12 > section",".movie-container > .row > .col-lg-12 > .text-center > .text-center > a",".banner-top,\n.textwidget > div:nth-of-type(3),\n.textwidget > div:nth-of-type(4)","div.r300x250","center:nth-of-type(4)","center:nth-of-type(2),\ndiv.container > .row > .center_lnwphp,\ndiv[id=\"slider-b\"]","div.container:nth-of-type(1)","#slider-l,\n#slider-r",".container > .row > .col-md-8,\n.container > .row > a,\n.row > center:nth-of-type(1),\ncenter:nth-of-type(6)","center:nth-of-type(3),\ncenter:nth-of-type(5)",".panel-body > center > a,\n.row > .col-md-8,\n.row > center:nth-of-type(2),\ncenter > center","strong#xaab",".module_home_x",".imgbanner","#bt-ads","#link_h_movie_ad",".row > center",".theiaStickySidebar #ads300_250-widget-4","#ads,\n#clip-banner,\n#mainarea > .ads_forum,\n#mid-banner,\n#sidebar-right,\n#soccer-table > .banner-wp:nth-of-type(3),\n#soccer-table > .banner-wp:nth-of-type(4),\n#soccer-table > .banner-wp:nth-of-type(5),\n#top-banner,\n#webboard > .banner-wp:nth-of-type(2),\n#webboard > .banner-wp:nth-of-type(3),\n#webboard > .banner-wp:nth-of-type(4),\n.L0.banner-wp,\n.L1.banner-wp,\n.L2.banner-wp,\n.L3.banner-wp,\n.L4.banner-wp,\n.L5.banner-wp,\n.L7.banner-wp,\n.L8.banner-wp,\n.T2","div[class^=\"fancybox\"]","#rightbottom_sidebar .region div[id^=\"block-views-jobs\"]","#above_comments:has(.view-PremiumCompanies),\n#rightbottom_sidebar .region div[id^=\"block-block\"]:has(.content .fb-page)","div[id^=\"arevicofancy\"]","#survey-popup","#loginModal,\ndiv[data-dismiss=\"modal\"]",".banner-img-au,\n.content-widget:nth-of-type(2),\n.sidebar-widget:nth-of-type(2) > .textwidget","#bg-main > table:nth-of-type(1) > tbody > tr > td:nth-of-type(3) > table > tbody > tr:nth-of-type(1)",".backgroundPopup,\ndiv[aria-describedby=\"alert_popup_dialog\"]","#divnews,\nbutton[onclick][title=\"close\"]",".theiaStickySidebar div[id^=\"ads300_250\"]","div[id=\"content\"] div[align=\"center\"] > a:first-of-type","#intro,\ndiv[class^=\"banner-X2\"]",".bigza-ads-block,\n.columns.large-4:has(.yengo_ads)","#popDiv,\n#popup","#banner-box,\n#feature-box,\n#promote,\n#promote-box,\n.banner-box,\n.content-box center:has(div script),\n.content-box:has(.prnews),\n.feature-box,\n.pr-box,\n.promote-box,\ndiv[class^=\"grid_\"]:has(div[id^=\"div-gpt-ad\"])",".leftBanner,\n.rightBanner,\n.td-header-sp-recs:has(img[onload]),\n.td-post-content .td-a-rec .g:has(a[onclick^=\"ga\"]),\ndiv[id^=\"divFLRALeft\"],\ndiv[id^=\"divFLRARight\"],\ndiv[id^=\"wh-widget\"]",".td-more-articles-box","#my-welcome-message,\n.ads-bottom,\na:has(img[onload]),\na[onclick]:has(img[onload])",".elementor-widget-wp-widget-advads_ad_widget","#nav-wrapper > a[target=\"_blank\"]",".adss-des",".container-fluid > .row > .col-md-6,\ndiv[id=\"speed_sponser\"],\ndiv[id=\"sticky-ads\"]","misa-content .iw_header + .row .img-ads",".ai_widget.widget.primary-sidebar-widget.w-t.h-ni,\n.code-block-1.code-block,\n.code-block-2.code-block,\n.naqw-type-custom_code.naqw-container",".container:nth-of-type(3) > .row > .center_lnwphp,\nbody > div.hide",".e3lan.widget:has(.adsbygoogle)","._banner > a[href*=\"ads.jarm.com\"]","#contentMain > br,\n#contentMain > div[align=\"center\"]",".font-content.content:nth-of-type(3),\n.font-content.content:nth-of-type(5) > center:nth-of-type(1),\n.font-content.content:nth-of-type(5) > center:nth-of-type(2),\n.post-entry .hidden-xs.hidden-sm:has(ins.adsbygoogle),\n.row:nth-of-type(1) > .col-lg-12",".backdrop",".article .row div .fb-like,\n.article .row div[class]:has(aside section.banner),\nsection .row:has(.adsbygoogle)",".banner:has(.adsbygoogle)","#action-quick:has(div span[id=\"ad-close\"]),\n#sidebar > div:has(a[href*=\"kapook.com/app\"]),\n.bigbanner,\n.targetbanner-hilight,\n.temp-300:has(.card-banner div[id^=\"div-gpt-ad\"]),\n.top-billboard-1200,\n.wrapper > div:nth-of-type(7),\nbody > div:nth-of-type(2),\nbody > div[style*=\"width:100%\"]:has(div[style*=\"z-index:888\"]),\ndiv a[target=\"_blank\"]:has(img[src*=\"ads-lotto.gif\"]),\ndiv[style*=\"text-align:center\"] div[style*=\"z-index:\"],\ndiv[style*=\"text-align:center\"]:has(.banner_position),\ndiv[style*=\"text-align:center\"]:has(.banner_position[style=\"display:show\"])","#spu-1170,\n.stb-container",".td-g-rec:has(.adsbygoogle)",".dgd_stb_box.clean_white",".textwidget:has(.adsbygoogle)","#spc","#player_banner","div[id^=\"cbox\"]","#showLikePopup,\n#topAd,\n.detail_content .ui_adblock,\n.foot_fb_like,\n.like_yellow,\n.postmain div:has(.adsbygoogle),\ndiv[itemprop=\"articleBody\"] a[class^=\"ui_btn\"][href*=\"line.me\"]",".entry-content center:has(div ins.adsbygoogle),\n.fancybox-overlay,\n.fancybox-wrap,\n.sidebar aside:has(.textwidget figure.op-ad)","#ui_popup_window_tpl,\ndiv[id^=\"win_showLike\"]","#popup_countdown,\ndiv[id^=\"itro_\"]",".adsense-leadin,\n.ezAdsense","div#p9fe",".ads-above-single,\n.ads-above-single-player,\n[class*=\"ds-popup\"]","div[style*=\"position: fixed; bottom: 0px;\"]",".ad-float,\n.widgettitle-banner + a[href]","#VideoPlayer > div,\n#VideoPlayer > div > div > div,\n#video_overlay,\n.new-banner_side-banner_r,\n.signup_button,\n[href^=\"https://line.me/\"],\n[style^=\"position:absolute; right:10px; top:10px; width: 40px; height: 40px;\"]","#banner_t_player,\n#text-10,\n#text-5,\n#text-6,\n#text-8,\n#text-9","#close_ads","#MT_HP_C_Billboard,\n#MT_HP_Topbanner,\n#coverpage,\n#ga-between,\n.ads-rec-center,\n.billboard-banner,\ndiv[id^=\"MT_HP_\"]:has(.ads-rec-center),\ndiv[id^=\"MT_HP_\"]:has(.banner),\ndiv[id^=\"dfp-\"],\nheader#masthead .topbanner-wrap:has(script)","#masthead #dfp-topbanner,\n.sticky-container .banner-wrap",".col-md-8,\n.panel-default.panel:nth-of-type(2),\n.panel-default.panel:nth-of-type(3),\ncenter > div.img-thumbnail","#main > div[style^=\"text-align\"],\n#sidebar .widget.widget_text","#main article p[align=\"center\"],\n#sidebar aside[id^=\"text\"]:not(#text-2)",".popup.adt,\ndiv.adcen:nth-of-type(6)","#M192293ScriptRootC68553,\n#M192293ScriptRootC68556,\n#head-content > div:nth-of-type(2),\n#text-11,\n.clearfix.post-outer > div:nth-of-type(6)",".outer > div[style^=\"width:814px;\"]","#overlay_ads,\n.banner-side:has(iframe[src^=\"https://openx.notebookspec.com\"]),\n.cover_banner_bg,\n.text-center.container:has(iframe[src^=\"https://openx.notebookspec.com\"])","iframe[src^=\"https://openx.notebookspec.com\"]","#__ads,\n.viddeo > .img_player,\n.viddeo > .ns-video-player","#nungg-1447152404 > .section-images,\n.section-images","[href^=\"https://www.ad-pic.com/\"]","#upprev_box",".filmborder:nth-of-type(1)",".ads-tabloid,\n.bg-box-allow:has(.box-allow-location),\n.bxslider li:has(a[href*=\"ads.pantip.com\"]),\n.doodle-banner a:has(div[style*=\"promote-app\"]),\n.event-datatable-item:has(a[href*=\"ads.pantip.com\"]),\n.m-block a[href*=\"ads.pantip.com\"],\n.m-bxslider:has(a[href*=\"ads.pantip.com\"]),\n.m-thumb div[class^=\"subject\"]:has(a[href*=\"ads.pantip.com\"]),\n.m-thumb:has(.subject-ad),\n.m-thumb:has(a[href*=\"ads.pantip.com\"]),\n.post-item:has(a[href*=\"ads.pantip.com\"]),\n.post-pick-ad,\nbody:has(script[src*=\"serving-sys.com\"]),\ndiv[class^=\"ads-\"],\ndiv[id^=\"ads-\"],\niframe[src*=\"ads.pantip.com\"],\niframe[src=\"https://pantip.com/home/get_activity_main\"],\nimg[src*=\"tapad.com\"]",".smartbanner,\n.social-banner","#arvlbdata,\ntd:has(.adsbygoogle)","#myModal",".modal-backdrop.fade.in","#bg-left,\n#bg-right,\n#bgyoutube,\n.alert.cookiealert,\n.banner:has(a[rel]),\n.cover_preload,\n.preloader,\n.promote,\na:has(img[src*=\"/data/setting/banner/\"]),\ndiv[class^=\"promote_\"]",".card .box:has(.box-banner),\n.card-content.card:has(a[href=\"https://www.facebook.com/playinter.th\"][rel=\"external\"])","#content div .banner-mobile-size,\n#content div[style*=\"float:center\"]:has(a[href*=\"yengo.com\"]),\n#content div[style*=\"text-align:center\"]:has(script[src*=\"yengo.com\"]),\n.banner-990x90,\n.content_right > div:has(div[id^=\"DIV_YNG\"]),\n.content_right div:has(script[src*=\"synergy-e.com\"]),\n.main div:has(iframe[src*=\"popcornfor2.com/bannerads/\"]),\n.main div[style^=\"width:728px;\"]:has(ins.adsbyadop),\n.news_view div center:has(script[src*=\"googlesyndication.com\"])","#maincontent div:has(.sp-adsense-incontent),\n#rsticky,\n.mainbox > div > .adsbygoogle,\n.xadsense_middle","#AutoNumber2,\na[href*=\"pramool.com/ads\"],\niframe[src*=\"ads.pramool.com\"],\ntable[cellspacing=\"0\"][border=\"1\"],\ntbody table tr:has(a[target=\"ads\"]),\ntbody table tr:has(iframe),\ntbody table tr:has(noscript)","#AutoNumber1:has(iframe),\n[id=\"AutoNumber1\"]:not(:nth-of-type(2))","div[class^=\"CookieSession\"]",".container:nth-of-type(2),\n.panel-body > center",".col.highlight--channel__aside:has(.social),\n.col.highlight--channel__aside:has(div[class^=\"snic\"])","#overlay,\n#yengo-inline-ads,\n.post > div:has(script[src^=\"//code.yengo.com\"]),\n.post div:has(.adsbygoogle),\n.yengo-x",".Sweb_right > table:has(script[src^=\"//ads.bumq.com\"])",".Sweb_right table:has(iframe[src=\"/ads/right-yengo.php\"]),\n.head_bg table:has(iframe[src^=\"/ads/\"]),\ndiv[class^=\"SC_TBlock\"],\ndiv[id^=\"lightbox\"],\niframe[src=\"/ads/foot-yengo.php\"]","#adv_header,\n#banner300_600,\n#banner:has(iframe[src*=\"ads.siamphone.com\"]),\n.mid_ads,\n.news_cate li ul:has(iframe[src*=\"ads.siamphone.com\"]),\n.news_cate ul li:has(a img[src=\"/images/ads_menu.png\"]),\n.swiper-slide:has(a img[src=\"/images/sp_ads.png\"]),\n.swiper-slide:has(iframe[src^=\"//ads.siamphone.com/\"]),\ndiv[class^=\"banner\"]:has(iframe[src*=\"ads.siamphone.com\"])","#summary .social,\n#summary div:has(img[title=\"downloadapp\"]),\n.footer_content_box .box_mid:has(div[class*=\"box_app_side\"]),\n.popup,\na[onclick^=\"ga\"]:has(img[src^=\"/assets/share_icons/\"])",".adsBottoms,\n.content_main div[style=\"width:728px;height:90px;\"],\n.content_right,\n.headline_head,\n.post_desc div[style=\"width:700px;height:66px;\"],\n.sherer,\n.text-center.txt-color-white.font-md,\n[class^=\"adv\"],\n[rel^=\"nofollow\"]",".banana_box iframe[src^=\"https://notebookspec.com/specialprice\"],\n.container > .row .blog_left_box:has(.ad_center_box),\n.container > .row .blog_right_box:has(.ad_center_box),\n.cover_banner,\n.home_banner_align_box:has(#AdsTop),\n.home_banner_top:has(iframe[src^=\"https://openx.notebookspec.com\"]),\n.td-header-menu-wrap-full div[style]:has(#AdsTop),\n.td-header-sp-recs:has(div > iframe[src^=\"https://openx.notebookspec.com/\"]),\ndiv[id^=\"div-gpt-ad\"]","#getFixed,\n#getFixedx,\n.gosad","#cboxWrapper,\n.container center:has(table div iframe[src^=\"/tmb-advertise/\"]),\ndiv[id^=\"ads_div_\"]","#cboxOverlay","#check-also-box,\n.e3lan-below_header,\n.theiaStickySidebar > div[id^=\"text\"]:nth-of-type(1), .theiaStickySidebar > div[id^=\"text\"]:nth-of-type(2),\n.wrapper-outer .background-cover","#adsMiniUnder,\n#col_right .ads,\n#skin-left,\n#skin-right,\n.ads-feature,\n.shopping:has(script[async][src^=\"//techxcite.com/ads/revive/\"])","#main_content_section > table:nth-of-type(1),\n#main_content_section > table:nth-of-type(2),\nbody > center:nth-of-type(2)",".SC_TBlock",".post-single-content center:has(.adsbygoogle)",".wpb_wrapper:has(.adsbygoogle)",".content center:has(.adsbygoogle),\n.hidden-mobile","#divAdLeft,\n#divAdRight,\n.td-post-template-default a[target=\"_blank\"]:has(img[class*=\"wp-image-\"])","#divleft:has(a[href*=\"/ad_click\"]),\n#divright:has(a[href*=\"/ad_click\"]),\n#exp-normal:has(a[href*=\"/ad_click\"]),\n.container.bn-a2,\n.container.hidden-xs div[class^=\"col-\"][align=\"right\"],\n.visible-lg.visible-xl iframe,\na[href^=\"http://www.thaimobilecenter.com/ad_click\"],\niframe[src^=\"../banner/google_adsense\"],\niframe[src^=\"../includes/inc_banner\"]","#header-friends,\n#home-friends-1",".adv2col,\n.adv3col,\n.banner_728_90",".jinda-content-block,\n.jinda-facebook-like-box,\n.jinda-overlay-background,\n.jinda-wrapper,\n.rev-block:has(.adsbygoogle)",".container .item > a[href*=\"/index.php?/stats/clickAdd\"],\n.module .item:has(a[href*=\"/index.php?/stats/clickAdd\"]),\na[href*=\"index.php?/stats/clickAdd/\"],\ndiv[id^=\"adsbanner\"]",".mod_banner,\n.mod_banner_top",".bn_mb,\n.bn_pc,\n.container div[class^=\"col-\"] .row a[href]:has(img[alt=\"UFABET\"]),\n.newmovie .row a[href]:has(img[alt=\"UFABET\"]),\n.post-contentarea .rpv .block-preload #block_preload p a[href*=\"gclub-casino.net\"]","a[href*=\"http://45.gs\"],\ncenter center a",".bottomad,\n.jquery-modal.blocker,\n.td-front-end-display-block,\n.topad",".card-cookie","#notification + .row > center,\n#torrent_download .row .small-12:nth-of-type(1)","[data-wpel-link^=\"external\"]","#top-banner-section,\n.ad-box-widget,\n[alt=\"Advertisement\"]",".downapp_area","#bar_left,\n#bar_left > div:nth-of-type(2),\n#bar_right,\n#content-left > .banner:nth-of-type(10),\n#content-left > .banner:nth-of-type(3),\n#content-left > .banner:nth-of-type(6),\n#content-left > .banner:nth-of-type(7),\n#content-left > .banner:nth-of-type(8),\n#content-left > .banner:nth-of-type(9),\n#content-right > .banner:nth-of-type(10),\n#content-right > .banner:nth-of-type(3),\n#content-right > .banner:nth-of-type(5),\n#content-right > .banner:nth-of-type(6),\n#content-right > .banner:nth-of-type(7),\n#content-right > .banner:nth-of-type(8),\n#content-right > .banner:nth-of-type(9),\n#imghead,\n.banner:nth-of-type(1),\n.banner:nth-of-type(11),\n.banner:nth-of-type(12),\n.banner:nth-of-type(13),\n.banner:nth-of-type(14),\n.banner:nth-of-type(15),\n.banner:nth-of-type(16),\n.banner:nth-of-type(18),\n.banner:nth-of-type(19),\n.banner:nth-of-type(2),\n.banner:nth-of-type(20),\n.banner:nth-of-type(21),\n.banner:nth-of-type(23),\n.banner:nth-of-type(24),\n.banner:nth-of-type(26),\n.banner:nth-of-type(27),\n.banner:nth-of-type(29),\n.banner:nth-of-type(30),\n.banner:nth-of-type(4)",".adv","#slidel,\n#slider","#adsplayer,\n#page > center,\n.happy-player-beside.col-md-3.col-12,\n.happy-player-under.d-md-block.d-none,\n.happy-section",".insad_close","#contentx > .adcen,\n.adimg,\n.insad_l_close,\n.insad_r_close,\n[href=\"https://hotgraph88.com\"],\n[href=\"https://kingdom66.com\"],\n[href=\"https://ufazeed.com/\"],\nbody > .adcen",".column.colophon-message-body > center > a.adv > .adimg,\ncenter.adcen:nth-of-type(9)","#main-nav + center > br",".ad_foot.ad,\n.ad_single_content.ad",".ad_single_content.ad > p:nth-of-type(1),\n.ad_single_content.ad > p:nth-of-type(2)",".td-post-content .err-subscription","iframe",".essb-popup,\n.essb_bottombar",".articleContent div[class^=\"midAdModule\"],\n.theContainer.foryou","#basic-modal-content,\ndiv[id^=\"simplemodal\"]",".ads-banner,\n.ads-banners,\n.b-ads,\n.img-ads,\n[title^=\"banner\"]","div.miru-blockads,\ndiv.spu-bg,\ndiv.spu-box","#main .loading,\n#slider + center,\n[id*=\"ads\"],\n[id*=\"ads\"] + center","#ads-overlay,\n#ads-preload-popup,\n#close-preload,\n#video_ads_container,\n#welcome,\n.bjqs,\n.os-banner-ads,\n.os-page-wallpaper,\n.os_preload_popup,\ndiv[class^=\"introjs\"],\ndiv[class^=\"os-ads\"],\ndiv[data-widget=\"plista_widget_belowArticle\"],\ndiv[data-widget=\"plista_widget_sidebar\"],\ndiv[id*=\"div-gpt-ad\"],\nsection.bigbanner-ad,\nsection.box aside:has(.ad-box)",".ad-box","#leaderboard_bottom.bottom_banner,\n.os-install-app,\nfigure[class=\"os-floating-ad\"],\nfigure[class^=\"os-ad\"]",".td-post-content div:has(.adsbygoogle)","div#sitefocus,\ndiv.pcb > div:nth-of-type(3),\ndiv.pcb > div:nth-of-type(5)","#SC_TBlock_289622,\n.adscenter:nth-of-type(10),\n.adscenter:nth-of-type(11),\n.adscenter:nth-of-type(12),\n.adscenter:nth-of-type(13),\n.adscenter:nth-of-type(18),\n.adscenter:nth-of-type(19),\n.adscenter:nth-of-type(20),\n.adscenter:nth-of-type(9),\n.block750,\n.blockcolumn1,\n.blockcolumn3,\n.slidetop","div[id^=\"SC_TBlock\"]","div[class^=\"td-header-\"]:has(div[id^=\"ud-dfp-ad-pos-\"])",".ads-sidebar-middle,\n.exit-overlay,\n.post-entry .ads,\n.subscribe-form,\n.ui-front.ui-widget-overlay,\n.widget-box:has(.ads-sidebar-top)",".container .row .ads,\n.e18fudrz1.css-1wc8xzy,\ndiv[tabindex][style*=\"z-index\"]","#AdAsia,\n#uniads,\n.hidden-sm.hidden-xs:has(div script[src^=\"//code.yengo.com/\"]),\n.in.fade.modal-backdrop,\n.modal",".google-ads,\ndiv[id^=\"_bz_boxlike\"]",".widget-header:has(.adsbygoogle)",".wppaszone,\ndiv[data-title=\"Home popup\"]","#ads_top_content,\n#todaytable > div:nth-of-type(3),\n#todaytable > div:nth-of-type(5),\n#todaytable > div:nth-of-type(7),\n.ajax-banner,\n.banner-clear.banner-logo.ajax-banner.topbanner,\n.topbanner",".YouTubeModal,\n.hidden-xs div[class^=\"col-\"]:has(a[style^=\"z-index:\"])","div a[href*=\"compgamer.com/mario-ads/\"]","#banner","#download-vdo,\na[rel*=\"nofollow\"] > img","#floating_banner_top,\n.img-thumbnail:not([src^=\"https://animedd.xyz/\"]),\n[href*=\"casino\"],\n[src=\"https://i.imgur.com/5Q894WW.jpg\"]"];

const hostnamesMap = new Map([["seriesubthai.co",0],["techsauce.co",1],["www.037hdd.com",[2,3]],["hereseries.com",[3,51]],["donung.tv",[3,177]],["www.1000tep.com",4],["www.2youhd.com",5],["4toom.com",6],["akibatan.com",7],["www.alpha-hen.com",8],["anime-h.com",9],["anime-i.com",10],["anime-lunla.com",11],["anime-master.com",[12,13]],["anime-sugoi.com",[12,15,16,17]],["anime-ox.com",14],["xxx5porn.com",[15,149]],["www.anime-sugoi.com",[17,18]],["anime-thclub.com",19],["animekimi.com",20],["animeloli.com",[21,22,23]],["www.animelolo.com",[21,24]],["animedd.xyz",[23,178]],["animeranku.com",25],["baanpolballs.com",26],["becteroradio.com",27],["kodlikes.com",27],["oopsmobile.net",[27,64,162]],["blognone.com",[28,29]],["chujai.com",30],["ithaihotnews.com",30],["itnews24hrs.com",[30,53]],["juropy.com",30],["kaijeaw.com",[30,56,57]],["laughwoo.com",30],["mthai.com",[30,80]],["petmaya.com",[30,62,97]],["thaihitz.com",[30,57,122,123]],["extremepc.in.th",30],["tgpl.in.th",[30,36,175]],["cleothailand.com",31],["clip-th.com",32],["clip33.com",33],["www.club-172hd.com",34],["compgamer.com",[35,36]],["coregamerth.com",37],["dedbit.com",38],["dodeden.com",39],["doodiza.com",[40,41]],["startclip.com",41],["exteen.com",42],["game-tep.com",[43,44]],["specphone.com",[44,89,115]],["gamemonday.com",45],["gamingdose.com",46],["www.gg-anime.com",47],["grimexcrew.com",48],["h-ani.com",49],["hanimesubth.com",50],["hime-anime.com",52],["neko-miku.com",[52,82]],["jarm.com",54],["jokergameth.com",55],["thaijobsgov.com",[57,122,125]],["kanomjeeb.com",[58,59]],["lonely-rooyang.com",[59,64,69]],["kapook.com",60],["kidjarak.com",[61,62]],["thaiidol.com",[62,124]],["aroundnews.net",62],["kiitdoo.com",[63,64]],["meekhao.com",63],["picnic.ly",[64,153]],["www.king-anime.com",65],["www.leoplayer3.com",66],["liceza.com",67],["liekr.com",68],["manyum.com",70],["marketingoops.com",71],["meepanda.com",72],["misa-anime.com",73],["movie007hd.com",74],["movie2free.com",75],["movie2uhd.com",76],["movie87hd.com",77],["www.moviehd-master.com",78],["msa-video.com",79],["picpost.mthai.com",81],["www.new-mastermovie.com",83],["newmovie-hd.com",84],["newseries-hd.com",85],["www.nice-anime.com",86],["nongpink.com",87],["notebookspec.com",[88,89]],["www.nung2d.com",90],["nungg.com",91],["octopusbanner.com",92],["ohlor.com",93],["okmovie-hd.com",94],["pantip.com",95],["m.pantip.com",96],["playpark.com",[98,99]],["tnews.co.th",[98,169]],["playulti.com",[100,101]],["mustplay.in.th",[100,174]],["popcornfor2.com",102],["postjung.com",103],["pramool.com",104],["bbs.pramool.com",105],["www.punpro.com",106],["www.rock-anime.com",107],["news.sanook.com",108],["share-si.com",109],["siamchatroom.com",110],["siamok.com",111],["siamphone.com",112],["sistacafe.com",113],["soccersuck.com",114],["www.taradxxx.com",116],["techmoblog.com",[117,118]],["thailandbestbeauty.com",[118,126]],["techtalkthai.com",119],["techxcite.com",120],["www.thaiboyslove.com",121],["thaimobilecenter.com",127],["thaivisa.com",128],["thaiza.com",129],["thetechr.com",130],["thisisgamethailand.com",[131,132]],["tigthai.com",132],["thmovieshd.com",133],["toonzaa.com",134],["toritalk.com",135],["vroom.truevirtualworld.com",136],["tt-torrent.com",137],["utaseries.com",138],["vojkud.com",139],["vojkudee.net",139],["m.webtoons.com",140],["xn--12cf0e9alaj8at1avvw8lrh.com",141],["xn--12cl2bca0a9jsa8a7e1dc3gd.com",142],["xn--12cl7cj4a8c1bl5l7c.com",[143,144]],["nungxthai.net",[143,158]],["xn--72c9abh1f8ad1lzc.com",[145,146]],["xn--72ca2bsl7gxbd4m7c.com",[145,147]],["xn--82c0bxcybxc2b.com",148],["xxxporn7.com",150],["yaklai.com",151],["zaapmak.com",152],["today.line.me",154],["upic.me",155],["anime-subthai.net",156],["miruanime.net",157],["online-station.net",[159,160]],["thairath.co.th",[160,168]],["m.online-station.net",161],["snipertopanime.net",163],["xxxpostpic.org",164],["sudting.party",165],["matichon.co.th",166],["rabbit.co.th",167],["autocar.in.th",170],["everythingisee.in.th",171],["gamegeek.in.th",172],["goal.in.th",173],["goshujin.tk",176]]);

const entitiesMap = new Map(undefined);

const exceptionsMap = new Map(undefined);

self.specificImports = self.specificImports || [];
self.specificImports.push({ argsList, hostnamesMap, entitiesMap, exceptionsMap });

/******************************************************************************/

})();

/******************************************************************************/
