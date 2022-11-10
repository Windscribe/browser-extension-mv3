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

// alb-0

const argsList = [{"a":".wpb_wrapper.vc_figure"},{"a":"#offcanvas-article,\n.widget:has(.lazyloaded)"},{"a":".align-items-center.flex-column.d-flex.col-sm-3"},{"a":"#mibew-agent-button > img"},{"a":".background-banner,\n.banner-bottom-category,\n.new_banner,\n.right_side_banner,\n.sidebar-baner-middle,\n.sidebar-baner-middleroduct,\n.sidebar-baner-top,\n.sidebar-baner-topproduct"},{"a":".main-nosplit > a"},{"a":".vw-more-articles--visible.vw-more-articles,\n.widget.widget_sp_image"},{"a":".wp-super-snow-flake"},{"a":".flurry-container,\n.footer-last-news-wrapper,\n.popup-container"},{"a":".mvp-feat1-list-ad,\n.mvp-main-box > .execphpwidget > div > a > img"},{"a":".reklama-box"},{"a":"center,\niframe"},{"a":".fixed-ad,\n.rek-holder"},{"a":"#bottom_fixed_notification"},{"a":"#slidebox"},{"a":"#tidio-chat"},{"a":".sendpulse-bar,\n.stream-item-top-wrapper,\n.theiaStickySidebar > .stream-item-widget"},{"a":"#check-also-box"},{"a":"#target_banner_1,\n#target_banner_2,\n#target_banner_3,\n#target_banner_4,\n#target_banner_41,\n#target_banner_42,\n#target_banner_5,\n#target_banner_6"},{"a":"#menu-item-640384 > a"},{"a":".textwidget"},{"a":".wpb_wrapper > div > a > img,\ndiv.wpb_content_element.wpb_text_column:nth-of-type(2) > .wpb_wrapper > .desktop,\ndiv.wpb_content_element.wpb_text_column:nth-of-type(4) > .wpb_wrapper > .desktop"},{"a":".wpb_wrapper > p > a > img"},{"a":".td-all-devices"},{"a":"#snowflakeContainer"},{"a":".code-block-1.code-block,\n.pp_ads_single_before_comment.ppb_ads > [href]"},{"a":"#mastertopbanner,\ndiv[id^=\"ctl00_ContentPlaceHolder1_Latest\"]"},{"a":".mvp-side-widget.widget_text"},{"a":"#FBStickLayer,\n.stick_block_layer"},{"a":".adunit-1"},{"a":"#fixed_728_banner"},{"a":".reklama-background,\n.reklama-background-right,\n.reklama-container"},{"a":"#ads2018"},{"a":".textwidget > button"},{"a":"#baner1,\n#sanpietro2,\n#sticky1,\n.tekebaner1"},{"a":"#text-7,\n#text-8,\n#text-9"},{"a":"#v-cookielaw"},{"a":".site-banner"},{"a":"#custom_html-3,\n.ad"},{"a":"#news-right-2,\n#news-right-4,\n#news-right-5,\n#webover_pc_banner,\n.banner_intro,\n.banner_wrapper.pc_only,\n.left_fixed,\n.pc_only > a > img,\n.pc_only > iframe,\n.pc_only[style],\n.right_fixed,\n.top-bigBanner"},{"a":"#fpub-popup,\n.news_block > .desktop,\n.rek_section"},{"a":".wpb_wrapper > a > img,\ndiv.insertion-box:nth-of-type(1)"},{"a":".td_block_template_1 > div > img"},{"a":".heateor_sss_sharing_container"},{"a":"#text-html-widget-64 > .widget-container,\n.e3lan-post"},{"a":".biscotto-container"},{"a":".jnews_popup_post_container"},{"a":"#post-right-col > .content_block,\n.top-banner-promo,\n.widget_media_image.side-widget"},{"a":".a-listing > li:has(.adsbygoogle),\n.aside.right,\n.mgid"},{"a":".article-wrapper > .telesport-desktop-ads,\n.sidebar-articles-container > .telesport-desktop-ads"},{"a":".textwidget > a,\n.theiaStickySidebar > a"},{"a":".murebestbannerdesktop,\n.murebestshowonlydesktop"},{"a":".ad-widget-box > img,\n.ad-widget-sizes > a > .ad-widget-box,\n.col-12.col-lg-4 > .d-none,\n.shortcode-widget-box,\n.textwidget > p > img"},{"a":".execphpwidget > a > img"},{"a":".leadBanner"},{"a":"[href^=\"https://www.raiffeisen.al/alb/page/platforma-digjitale-raiffeisen-on-1/\"],\ndiv.sidebar-widget:nth-of-type(3)"},{"a":".sendpulse-prompt"},{"a":".fn-header-banner,\n.textwidget > center > a"},{"a":".web-ad"},{"a":".hideM.a-ads"},{"a":".td-pb-row.wpb_row.tdi_58_031.vc_row,\n.td-pb-span4.tdc-column.vc_column_container.wpb_column.tdi_71_428.vc_column > .wpb_wrapper,\n.td-pb-span8.tdc-column.vc_column_container.wpb_column.tdi_60_66f.vc_column,\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_25_8e1.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper,\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_25_f69.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper,\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_53_348.vc_single_image.td-no-img-custom-url.td_block_wrap.td_block_single_image.wpb_wrapper,\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_54_6f4.vc_single_image.td-no-img-custom-url.td_block_wrap.td_block_single_image.wpb_wrapper,\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_55_407.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper,\naside.widget_media_image.widget.td_block_template_1:nth-of-type(2),\naside.widget_media_image.widget.td_block_template_1:nth-of-type(3),\naside.widget_media_image.widget.td_block_template_1:nth-of-type(4)"},{"a":".bannertop"},{"a":".g-7"},{"a":".rek"},{"a":".a-d_wrapper,\n.crestaPostsBox,\n.outer-banner"},{"a":".stream-item-top,\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(1),\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(2),\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(3),\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(4),\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(5)"},{"a":"#ad-big_rectangle,\n#ad-wide_skyscraper,\n.ad-big_leaderboard,\n.ad-medium_rectangle"},{"a":".bannerSection.container"},{"a":".active-50.gjirafa50-bf,\ndiv[id^=\"an-holder-\"]"},{"a":".new_header-ad-box"},{"a":".boost-list-container > [style] > [class]:has( > a[href^=\"https://aa.boostapi.net\"]),\n.boost-list-container a[href^=\"https://aa.boostapi.net\"],\ndiv[class^=\"adunit-\"],\ndiv[data-adunit]"},{"a":".latestVideo,\n.xo360"},{"a":".td-desktop,\n.tdi_30_1c1.vc_raw_html.td_block_wrap.wpb_wrapper > .td-fix-index > .rekpolitiknje,\ndiv > iframe"},{"a":".awac-wrapper"},{"a":".ad-container,\n.reklama_top"},{"a":".td-visible-desktop"},{"a":"#custom_html-6,\n#text-15,\n.sidebar-single-w,\n.single-post-comments-sidebar"},{"a":".olark-attention-grabber"},{"a":"#sidebar_container,\n.left-banner"},{"a":".hidebanner"},{"a":"#dk-image-rotator-widget-3,\n#dk-image-rotator-widget-4,\n#dk-image-rotator-widget-7"},{"a":".sidebar"},{"a":".leaderboard-banner > iframe"},{"a":".ad-box"},{"a":".main-sidebar > .widget > .banner"},{"a":"#convertbox"},{"a":".reklama-center"},{"a":".g-1,\n.g-4,\n.headerslider"},{"a":".main_ban_rek > .container > .g,\n.main_ban_rek > .g,\n.sidebar_rek"},{"a":"#rt-sidebar-b > .rt-block"},{"a":".custom-html-widget > iframe,\n.td-fix-index > iframe"},{"a":"#execphp-24 > .execphpwidget,\n#execphp-25 > .execphpwidget,\n#reklama1,\n#reklamavodafonestopwords,\n#sidebar,\n.notes-right"},{"a":"#HTML1"},{"a":".adds--main.adds,\n.adds_left,\n.radio-live-adv"},{"a":"#foxpush_subscribe"},{"a":".vc_column-inner > .wpb_wrapper > .vc_hidden-sm > .wpb_wrapper"},{"a":".app_holder,\n.rekl-phone"},{"a":"#modalHome,\n.show.modal-backdrop"},{"a":"#g207"},{"a":"#fb-root"},{"a":".slider-adv,\n.small-adv,\nbody > .container > .advert-under"},{"a":".td_block_template_1 > a > img"},{"a":"#weather,\n.small-ad-wrapper"},{"a":"#horiz_banner_2-wrap,\n#upprev_box,\n.col-lg-3 > a > img,\n.col-md-4 > a,\n.col-md-4 > iframe,\n.container > iframe,\n.cssnow,\n.pazar"}];

const hostnamesMap = new Map([["27.al",0],["360grade.al",1],["abcnews.al",2],["abcom.al",3],["acp.al",4],["blitz.al",5],["bota.al",6],["botimepegi.al",7],["businessmag.al",8],["cna.al",9],["panorama.com.al",[10,11]],["shkabaj.net",11],["shekulli.com.al",12],["droni.al",13],["durreslajm.al",14],["evolve.al",15],["faxweb.al",[16,17]],["radiokosovaelire.com",[17,80]],["gazetacelesi.al",18],["gazetadita.al",[19,20]],["preshevajone.com",[20,79]],["gazetamapo.al",[21,22]],["revistakosovarja.net",[22,95]],["ata.gov.al",23],["shkoder.net",23],["rrokum.tv",[23,101]],["gsh.al",24],["iconstyle.al",25],["ikub.al",26],["intervista.al",27],["intv.al",28],["jetaoshqef.al",29],["joq.al",30],["konica.al",31],["lajmifundit.al",32],["lapsi.al",33],["living.al",34],["nacionalalbania.al",35],["neptun.al",36],["newsbomb.al",37],["newsport.al",38],["noa.al",39],["opinion.al",40],["politiko.al",41],["rd.al",42],["kohajone.com",[42,72]],["reporter.al",43],["rtsh.al",44],["dyqani.shpresa.al",45],["standard.al",46],["www.supersport.al",47],["tej.al",48],["telesport.al",49],["tiranapost.al",50],["tpz.al",51],["tvklan.al",52],["vipsport.al",53],["www.albinfo.ch",54],["www.albaniandailynews.com",55],["albeu.com",56],["almakos.com",57],["anabelmagazine.com",58],["www.anabelmagazine.com",59],["bulevardionline.com",60],["classlifestyle.com",61],["ekonomiaonline.com",62],["epokaere.com",[63,64]],["gazetatribuna.com",63],["fieriweb.com",65],["gazetaexpress.com",66],["gazetalajm.com",67],["gjirafa.com",68],["insajderi.com",69],["joq-albania.com",70],["joqalbania.com",70],["kallxo.com",71],["kosovalive360.com",73],["kosovapress.com",74],["lajmpress.com",75],["myalbanianfood.com",76],["nimitv.com",77],["njoftime.com",78],["shqiptarja.com",81],["telegrafi.com",82],["the-living-media.com",83],["tiranatimes.com",84],["upviral.com",85],["arbresh.info",86],["botapress.info",87],["fishmedia.info",88],["albacenter.it",89],["dritare.net",90],["gazetatema.net",91],["iphonealbania.net",92],["lajmi.net",93],["pamfleti.net",94],["syri.net",96],["bankofalbania.org",97],["short24.pw",98],["alsat-m.tv",99],["oranews.tv",100],["www.tvkoha.tv",101],["rtv21.tv",102],["vizionplus.tv",103]]);

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
