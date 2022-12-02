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

// vie-1

const argsList = [{"a":"#ballon-right,\n.most-view:nth-child(2)"},{"a":"#preload-2"},{"a":"#pc-catfish,\n.ad_catpc"},{"a":".btn-betnow.btn-sm.btn,\ndiv.vebo-sp.container:nth-of-type(7)"},{"a":"#adsTopInPageBanner,\n#popup,\n.adsContainer"},{"a":".banner-macau"},{"a":"iframe:nth-of-type(2)"},{"a":"#wrapper>div[style=\"text-align: center;\"]"},{"a":".banner-sticky-footer-ad,\n.container>center"},{"a":"#menubentrai,\n#mobile-ads"},{"a":".widget_custom_html.widget.widget_text"},{"a":".container-banner,\n.modal-ads,\ndiv[class^=\"slide-bar\"]"},{"a":".btn-betting,\n.nhacaiuytin,\n.text-running"},{"a":".button-bottom-center-append-custom,\n.logo-top-right-append-custom"},{"a":"div.text-center:nth-of-type(7),\ndiv[style=\"min-height: 250px\"]"},{"a":"#top-banner-pc,\n.lixitt"},{"a":".button-ads-header,\n.tvc-link-ads-full"},{"a":"#headwrap>.computer,\n#headwrap>.mobile,\n.pc-catfix"},{"a":".align-items-center.justify-content-between.d-flex.col-12>.d-lg-none.d-block,\n.btn-odds,\n.btno-group.d-none.d-lg-flex,\n.company,\n.container>.mt-1,\n.container>.mt-3,\n.d-lg-block,\n.justify-content-between.d-lg-none.d-flex.btno-group,\n.menu-item>a[rel=\"nofollow\"],\n.topButton,\n.widget_offer,\nheader>.container"},{"a":"#bnc1"},{"a":"#bnc0"},{"a":".widget_media_image.widget_block.widget,\nimg.wp-image-1283,\nimg.wp-image-1285"},{"a":"body>center"},{"a":".container > ul > li.menu-item.nav-item:nth-of-type(2),\n.offer,\n.sk_balloon_right.sk_balloon_down.sk_balloon"},{"a":".bottom-0.w-100.position-fixed"},{"a":".banner-top-box"},{"a":"#position_full_top_banner_pc,\n.window_popup"},{"a":"#newmenu + div>div[style]"},{"a":".great-a-banner,\n.great-b-banner,\n.heart-banner"},{"a":".button-dangkyngay"},{"a":".afw-topbanner"},{"a":"#adm-slot-7234"},{"a":".ads_full"},{"a":".adv-section"},{"a":".left-right-banner"},{"a":"#banner3double"},{"a":".box-ads-bar"},{"a":".advertise,\n.main-ad-wrapper"},{"a":"div[id^=\"adsWeb\"]"},{"a":"#div_inpage_banner,\n#div_inpage_banner_open"},{"a":"#article-sidebar"},{"a":"#mbtfloat,\n#mfloat,\n#pop_banner,\n.BT-Ads,\n.qc-inner,\ndiv.qc_M_Chap_Middle,\ndiv.qc_TC_Chap_Middle,\ndiv[id^=\"qc_M_\"]"},{"a":"div[style*=\"position: fixed\"]"},{"a":".bgadmtoptotal"},{"a":".bannertop"},{"a":".top-right-col-ads"},{"a":".my_responsive_add,\n.titleBar + *,\n[class1=\"my_responsive_add\"]"},{"a":"#csnplayerads,\n.detail_lyric_1 div[style=\"text-align: right;\"]"},{"a":"#background_bg_link,\n#maiContent>div>div.colLt>aside,\n.bnr,\n.cate-24h-foot-box-adv-view-news > .row > .col-6:first-child,\nDIV[class=\"banner-LR\"],\ndiv.pos-rel:has(a[rel=\"nofollow sponsored\"])"},{"a":".admicro,\n.notad"},{"a":".top-header"},{"a":"#onefootball,\n.top_page"},{"a":"img.error"},{"a":"#subiz_wrapper,\n.ad-embed"},{"a":".features-r"},{"a":"#bannerMasthead,\n#desktop-home-top-page,\n#dta_inpage_wrapper,\n#dtads_inpage_wrapper,\n#mobile-home-middle-1,\n#mobile-home-middle-2,\n#mobile-home-top-page,\n#mobile-top-page"},{"a":".widget_media_image.widget"},{"a":".banner-cs"},{"a":".banner-top-main,\n.baohaiquan_bottom_970x250"},{"a":".top-advertisment"},{"a":"._ning_outer"},{"a":"#Adsv,\n.right-banner>a[title]"},{"a":".__ads_click"},{"a":"#BannerAdv"},{"a":"#gallery-2,\n.hd-cate-wrap,\n.home-qc-wrap,\n.home-sec-right .widget_media_image,\n.noname-left"},{"a":".columns-widget .col-right"},{"a":".Advs_adv-components__1nBNS.Advs_adv-300x250__2eyhC.Advs_no-content__RWwW2,\n.HotTagGlobal_fixed-height__1f50i"},{"a":".box_ads_d"},{"a":".exp_qc_share"},{"a":".c-banner"},{"a":".warp-banner-vip"},{"a":".sidebar>div[style]"},{"a":"#div-ub-docbao"},{"a":"#ouibounce-modal,\ndiv[id^=\"adsbg\"]"},{"a":"#widget-12"},{"a":"#widget-11,\n#widget-16,\n.mainContent>a[rel]"},{"a":".banr-Rt,\n.banrpstn"},{"a":"#myElementz,\n.bannerinfooter"},{"a":".LRBanner"},{"a":".bn1,\n.bn2,\n.box_baiviet_dexuat,\n.box_quangcao_mobile_320x50,\n.box_text_qc"},{"a":"#tubia"},{"a":"#admzone57"},{"a":".ads-right1,\n.adv-row"},{"a":".adx-zone,\n.underlay"},{"a":".khw-ads-wrapper.clearfix"},{"a":"#qcRight,\n.banner-advertisements"},{"a":".banner-bottom-menu,\n.popup-bg,\n.showpop,\n[href*=\"bit.ly\"]"},{"a":".qc-benphai,\n.qc-bentrai"},{"a":"[class^=\"size\"]"},{"a":"#adrightsecondx,\n#adrightspecial,\n#adrightspeciallinks,\n#adsrighttop,\n#adsuggestion"},{"a":".advertTop,\n.hsdn > li:has(.adsbygoogle),\n.module_plugins"},{"a":".notice-content"},{"a":".khw-adk14-wrapper"},{"a":"#qc-kpgame"},{"a":"[id^=\"adv\"]"},{"a":".quang_cao_pc_right_hoc_tap"},{"a":".advHolder"},{"a":".ads_shortcode"},{"a":".entry>a[target=\"_blank\"],\n[href*=\"hnmac.vn\"],\n[href*=\"laptopvang.com\"],\n[href*=\"macbookgiasi.vn\"],\n[href*=\"macone.vn\"],\n[href*=\"vender.vn\"]"},{"a":".admicro_top"},{"a":"#tdi_129"},{"a":".sponsor-zone"},{"a":"div[id^=\"ads_\"]"},{"a":"#box-affiliate"},{"a":"#top-adv"},{"a":".bannerchuyenmuc,\n.show-qc-home,\n.show_qc"},{"a":".baseHtml.noticeContent"},{"a":"#popup_center"},{"a":"div[style=\"text-align:center;margin-top:0px;margin-bottom:0px;\"]"},{"a":".banner-ads-home,\n.banner-in"},{"a":"div[class^=\"adv-\"]"},{"a":".ads-970x280"},{"a":"#mobi-top,\n#pc-top,\n.d-flex.justify-content-between>div>div.d-flex.justify-content-around.mt-4"},{"a":"#myCarousel,\n.banner-boder-zoom"},{"a":".modal-di__button-wrapper,\n.sam-slot"},{"a":"[id^=\"admzone\"]"},{"a":".ads-general-banner"},{"a":".block:has(.block-container > .block-body > a[href]),\n.block:has(.block-container > .block-body > ins)"},{"a":"div[class$=\"_ads\"],\ndiv[data-id=\"2\"]"},{"a":".ads_660x90,\n[class^=\"ads_\"]"},{"a":".bannerTOP1,\n.pc.bannerAuto"},{"a":"div[id^=\"adsMobile\"]"},{"a":".fyi"},{"a":".ads-common-box"},{"a":".p-body-pageContent>table[style=\"width:100%;display:inline-block;background: #fff;\"]"},{"a":".in-article-promo,\n.jsx-3569995709,\n.micro,\n.middle-comment-promotion,\n.pro-container,\n.promo-container,\ndiv[style=\"width:300px;height:250px\"],\ndiv[style=\"width:300px;height:600px\"],\ndiv[style=\"width:320px;height:100px\"]"},{"a":".container .desktopjszone,\n.mobilejszone"},{"a":".ads-responsive,\n[id^=\"ads-\"]"},{"a":"#admbackground,\n#adsMainFooter,\n.Mobile_Masthead_TTO_Wrapper,\n.adm-bot"},{"a":".clearfix.adregion,\n.visible-md.header-banners"},{"a":".bannerqc,\n[class^=\"sticky-top\"],\n[href*=\"/default/template/\"],\n[href*=\"hungthinhcorp.com.vn\"],\n[href*=\"vietcombank.com.vn\"]"},{"a":".Flagrow-Ads-under-header"},{"a":".vfs_banner"},{"a":"#headerProxy,\n.rightleftads"},{"a":".box-adv,\n.mb-20.col-right-ads,\n.vmcadszone"},{"a":".zone--ad"},{"a":"section.mar20:nth-of-type(2),\nsection.mar20:nth-of-type(4)"},{"a":"#banner-dai-bottom,\n#banner-dai-top"},{"a":".v-element>.v-responsive,\ndiv.message--post"},{"a":".ads-top-wrap"},{"a":".bf-3-primary-column-size.bs-vc-sidebar-column.vc_col-sm-3.vc_column_container.bs-vc-column.wpb_column>.wpb_wrapper.bs-vc-wrapper"},{"a":".wrapper-adv"},{"a":"#banner1ab,\n#banner2ab"},{"a":".ad_by_yellowpages,\n.banner_add"},{"a":"#site-header"},{"a":"#ballon_right"},{"a":".notMsg.Sticky,\na[href^=\"https://one88.vn/vi/\"]"},{"a":".logo-partner"},{"a":".btm_banner"},{"a":".pre-pc-b91.preload-b91.preload"},{"a":".block.ad"},{"a":".odds-button,\n.odds-button2"},{"a":"a[href^=\"//mage98rquewz.com/\"]"},{"a":"#bnads3_save"},{"a":".fads"}];

const hostnamesMap = new Map([["film365.org",0],["itvhay.org",1],["ssphim.org",2],["xoilac8.org",3],["ophim.pro",4],["bongda365.top",5],["dongphimzz.top",6],["tvhay.top",7],["7chill.tv",8],["animetvn.tv",9],["bimbimz.tv",10],["cakhia17.tv",[11,12]],["cakhia30.tv",[12,13]],["hhhkungfu.tv",14],["hhtq.tv",15],["khomuc2.tv",16],["phimgif.tv",17],["vebo2.tv",18],["vieclam.tv",[19,20]],["xskt.com.vn",20],["vietphim.tv",21],["vuianime.tv",22],["xoilac6.tv",23],["hentaiz.vip",24],["24hmoney.vn",25],["2banh.vn",26],["2game.vn",27],["5giay.vn",28],["blog.abit.vn",29],["afamily.vn",30],["sport5.vn",30],["m.afamily.vn",31],["antt.vn",32],["aoe.vn",[33,34]],["gametv.vn",[34,82]],["autodaily.vn",35],["xehay.vn",[35,142]],["baodansinh.vn",36],["baodauthau.vn",[37,38]],["tienphong.vn",[38,121,122]],["baogiaothong.vn",39],["baophapluat.vn",40],["blogtruyen.vn",41],["m.blogtruyen.vn",42],["cafebiz.vn",43],["cafef.vn",44],["ttvn.toquoc.vn",44],["careerlink.vn",45],["chap.vn",46],["chiasenhac.vn",47],["24h.com.vn",48],["autopro.com.vn",49],["baohaugiang.com.vn",50],["bongda.com.vn",51],["centralland.com.vn",52],["congan.com.vn",53],["daklak24h.com.vn",54],["dantri.com.vn",55],["ecci.com.vn",56],["fptshop.com.vn",57],["haiquanonline.com.vn",58],["nld.com.vn",59],["tapchikientruc.com.vn",60],["thanhtra.com.vn",61],["thoidai.com.vn",62],["petrotimes.vn",62],["thuongtruong.com.vn",63],["thuysanvietnam.com.vn",64],["trithuc24h.com.vn",65],["voh.com.vn",66],["congluan.vn",[67,68]],["giadinhonline.vn",68],["nongnghiep.vn",68],["congly.vn",69],["dangtinbatdongsan.vn",70],["realty.vn",[70,109]],["danviet.vn",71],["docbao.vn",72],["download.vn",73],["gamevui.vn",[73,83]],["kienthucykhoa.edu.vn",74],["plus.edu.vn",75],["eva.vn",76],["fshare.vn",77],["game24h.vn",78],["game8.vn",79],["gameio.vn",80],["gamek.vn",81],["genk.vn",84],["giaoducthoidai.vn",85],["vnews.gov.vn",86],["plus.gtv.vn",87],["helpex.vn",88],["hoatieu.vn",89],["hosocongty.vn",90],["hrspring.vn",91],["kenh14.vn",92],["khiphach.vn",93],["kinhtedothi.vn",94],["minhngoc.net.vn",94],["vn-z.vn",94],["zingnews.vn",[94,144]],["lazi.vn",95],["luatvietnam.vn",96],["lucloi.vn",97],["maclife.vn",98],["muare.vn",99],["muaxegiatot.vn",100],["kienthuc.net.vn",101],["phunumoi.net.vn",102],["nhipcaudautu.vn",102],["nghesiviet.vn",103],["nhacdj.vn",104],["nhatrangclub.vn",[105,106]],["raovatbienhoa.vn",106],["olug.vn",107],["phapluatplus.vn",108],["reatimes.vn",110],["rung.vn",111],["saostar.vn",112],["sharecode.vn",113],["softonic.vn",114],["soha.vn",115],["startalk.vn",116],["techrum.vn",117],["thethao247.vn",118],["thethaovanhoa.vn",119],["thitruongtaichinhtiente.vn",120],["tinnhanhchungkhoan.vn",122],["tiin.vn",123],["timdaily.vn",124],["tinhte.vn",125],["tintucvietnam.vn",126],["truyenfull.vn",127],["tuoitre.vn",128],["tuyengiao.vn",129],["tvphapluat.vn",130],["v4u.vn",131],["vietfones.vn",132],["vietnamgsm.vn",133],["vietnamnet.vn",134],["vietnamplus.vn",135],["vietq.vn",136],["viettelstore.vn",137],["voz.vn",138],["vtvgiaitri.vn",139],["vungoctuan.vn",140],["webthethao.vn",141],["yellowpages.vn",143],["truyenqk.work",145],["cbox.ws",146],["lemon.animeion.xyz",147],["feb.onedaysales.xyz",147],["animeweb.xyz",148],["javhiv.xyz",149],["phimno1.xyz",150],["plvb.xyz",151],["sexdiaryz.xyz",152],["sexnhe.xyz",153],["vlxx.xyz",154]]);

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
