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

// idn-0

const argsList = [{"a":"#previewBox3"},{"a":"#flobwh,\na[href^=\"https://rebrand.ly/\"]"},{"a":"#floatbot,\n.appup"},{"a":".nyaa300,\n.nyaa728"},{"a":".adsbygoogle"},{"a":".sidebar > .klan300"},{"a":".bausastra-ads"},{"a":".affcoups"},{"a":".inf_infusionsoft_popup"},{"a":"div.ui_adblock"},{"a":"#TopBannerBg"},{"a":".bnr"},{"a":".banner-sc,\n.banner-sc2,\n.col-banner,\n.masonry-brick.drm-banner-x.drm-artikel:nth-of-type(3)"},{"a":".header__kasad,\n.kasad-h"},{"a":"#adsoutsream,\n.heightads250"},{"a":"#fixslowshow"},{"a":"#dablewidget_RoOGdzom,\n#div-Skycrapper-Stocksetup,\n.heightads600.pad-t.pad-r.pad-l.pad-10,\n.heightads90.ads-middle-list-news,\n.text-center.center.width-px-1100"},{"a":"#Kolom-random-300,\n#iklan-dalam-postingan-300,\n#overlay[style=\"display: block;\"],\nimg[style=\"border:0;display:block;\"]"},{"a":"#top-banner-parallax,\n.banner-parallax"},{"a":".adsense"},{"a":".ads-160,\n.ads-160-600,\n.ads-300-video,\n.set-ads-468,\na[style=\"width: 100%; height: 100%; display: block; position: fixed; z-index: 1\"]"},{"a":"#otp_ads,\n.portlet.sideskycrapper"},{"a":"#bottomframe-ad,\n#skinframe-ad-left"},{"a":".ad-inventory-wrapper"},{"a":"a[href^=\"http://www.apktiga.com/p/start-download-reayus.html\"]"},{"a":"#detailSkinAdLeft,\n#detailSkinAdRight"},{"a":".ads-mr,\n.ads__skyscraper,\n.ads_sky"},{"a":".mt20.top1,\ndiv.banner-r"},{"a":".ads_sticky_footer"},{"a":".ads-sticky-left,\n.ads-sticky-right,\n.bg-grey.text-center.p-0.mb-3.mt-3,\n.mb-4.bg-grey.text-center"},{"a":".ad-box-wrappr,\n.row > .show-desktop > div,\n.underlay-ad-text-box"},{"a":".nkt__stick"},{"a":"#main-banner-middle,\n.legend_banner-container,\n.stickybanner"},{"a":".ftadss"},{"a":".parallax_ads,\n.widebanner.banner,\ndiv.showcase.banner,\ndiv.skycrapper.banner"},{"a":".cls.code-block-center"},{"a":".banner-skin--left,\n.banner-skin--right,\n.banner__giant.banner,\n.banner__left.banner,\n.banner__right.banner,\n.banner__top.banner"},{"a":".ads-popup__inner"},{"a":".ads.single_post_content,\n.animated.ads"},{"a":".adbox"},{"a":".skinner-left,\n.skinner-right"},{"a":".box-ads-300x250"},{"a":".text-align-center.box-ads-content"},{"a":".in_up_ad-area"},{"a":".cads"},{"a":"#ilang2"},{"a":".modal"},{"a":".box-banner"},{"a":"#floating_ads_bottom_textcss2"},{"a":".wait"},{"a":"[href=\"javascript:showHideGB()\"],\n[href^=\"http://dwatngkas.\"],\na[href^=\"http://cocobet.\"]"},{"a":"#ilang1"},{"a":".adv"},{"a":".bannersinglefot"},{"a":"#googlebox"},{"a":"#floatbtmleft,\na[href^=\"//angel4d.com/\"],\na[href^=\"//telolet4d.com/\"]"},{"a":".iklanSUKI"},{"a":".slot-iklan"},{"a":".float_tengah,\n.separator"},{"a":".lenyap"},{"a":".ad-float-image"},{"a":".rsABlock"},{"a":".col-xs-12.col-md-6.col-lg-6"},{"a":"#previewBox"},{"a":".wpb-outer-wrap"},{"a":".bot.ads"},{"a":"#float-pop"},{"a":"#overlay-pop"},{"a":"#fancybox-overlay"},{"a":"[href=\"http://bit.ly/adsvbola\"],\n[id^=\"yui-gen\"].postcontainer"},{"a":".bm.overlay"},{"a":"a.bnner"},{"a":".top-bnner.lazy"},{"a":"[href=\"https://144.126.241.203/invite/c6c83up\"],\n[href=\"https://bit.ly/anoboySG88\"],\n[href=\"https://kliksaya.info/mcdanoboy\"]"},{"a":".adbtm,\n.bh-ad,\n.block-bh-googledfp,\n.center-block.img-responsive"},{"a":".cari-ads"},{"a":"#Taboola_widget,\n#rec_ad4,\n.tonal__standfirst"},{"a":".adplaceholder-mrec"},{"a":".code-block-6,\ndiv[data-ub-carousel]"},{"a":"#sadl,\n#sadr"},{"a":".ktz_banner"},{"a":"#sct_banner_top,\n#videoad1"},{"a":".ads-header-5"},{"a":"#bmpop_adpB"},{"a":"img.aligncenter"},{"a":".cfmonitor"},{"a":"#banner-popup-desktop"},{"a":".idmupi-topbanner"},{"a":"#banner-right"},{"a":".clearfix.act2-970x90:nth-of-type(1),\n.clearfix.act2-970x90:nth-of-type(3)"},{"a":"img[width=\"1020\"][height=\"350\"]"},{"a":"#semprot_ads_side_left,\n#semprot_ads_side_right"},{"a":"#jsemrp_372_719,\n#jsemrp_373_873,\n#jsemrp_374_469,\n#jsemrp_380_290"},{"a":".semprotpokemon_1,\n.semprotpokemon_2"},{"a":".coliklan"},{"a":".cm-popup-modal"},{"a":".banner3"},{"a":".blox"},{"a":"#floatads2,\n#floatads3"},{"a":".anuads"},{"a":"a[title^=\"manga4d\"]"},{"a":"#openpopunder"},{"a":".mvic-btn"},{"a":".sidebarborder:nth-of-type(4),\n.sidebarborder:nth-of-type(5)"},{"a":"a[href^=\"//bit.ly/\"]"},{"a":"#videoOverAd"},{"a":"#tutup,\n#tutup2"},{"a":"#float-atas"},{"a":".header-banner"},{"a":".swal-overlay--show-modal.swal-overlay"},{"a":".s-sponsor"},{"a":"#popuppress-9119,\n#top-banner-content"},{"a":"#main-popup"},{"a":".banner-middle"},{"a":"[class*=\"banner\"]"},{"a":".teaser3"},{"a":"a[target=\"_blank\"][rel^=\"noopener noreferrer\"] > img[src$=\".gif\"]"},{"a":".kzl-header.kzl"},{"a":".iklan-tengah"},{"a":"[href$=\"/referral/nontoncinema\"],\na[href^=\"http://referral.\"]"},{"a":".box_banner"},{"a":"[href=\"//dumbpop.com/help.xml\"]"},{"a":"#largebanner"},{"a":"table"},{"a":"#text-30 > .textwidget,\n#text-6 > .textwidget"},{"a":"#ffbp-bg,\n#ffbp-body,\n#ffbp-close"},{"a":"[href^=\"http://linkalternatif.\"],\n[href^=\"https://tinyurl.com/\"]"},{"a":"a[rel^=\"nofollow noopener\"] > img[src$=\".gif\"]"},{"a":"#ffbp,\n#popup"},{"a":".add,\n.mobi.content-left,\n.mobi.content-right"},{"a":"#wpb_overlay,\n.wpb-image-popup.wpb-main-wrapper"},{"a":"#epmblock,\ndiv:nth-of-type(2) > div > .btn-block.btn-lg.btn-success.btn"},{"a":".hidden-xs"},{"a":".page > div:nth-of-type(4) > div:nth-of-type(1),\ndiv:nth-of-type(4) > div:nth-of-type(2)"},{"a":".av-content-full,\n.glx-link,\n.glx-teaser"},{"a":"[href=\"http://sbovn88.net/\"]"},{"a":".adsincenter"},{"a":"#ftadsth"},{"a":"#player-side-left,\n[href=\"https://indoxplay.com/promosi/slots\"]"},{"a":"#home-bnner-content"},{"a":"#home-bnner2-content,\n.reklam-goster-sag,\n.reklam-goster-sol"},{"a":"#directorio > .random > center"},{"a":"#sidebar_right > .side:nth-of-type(5) > .textwidget,\n#sidebar_right > .side:nth-of-type(6) > .textwidget,\n#sidebar_right > .side:nth-of-type(7) > .textwidget,\n#sidebar_right > .side:nth-of-type(8) > .textwidget,\n#sidebar_right > .side:nth-of-type(9) > .textwidget"},{"a":".bannerwrap"},{"a":"#previewBox1"},{"a":"#top-bnner-content"},{"a":".ads-big,\n.ads-foot,\n.ads-right2,\n.container_skinad,\n.mgidclsbanner"},{"a":".fancybox-skin"},{"a":".navbar-brand.bot,\ndiv[id^=\"previewBox\"]"},{"a":".banner-premium"},{"a":"[class=\"sc__wrp\"]"},{"a":"[href^=\"http://enakbet.link/\"]"},{"a":".tutup.banner"},{"a":"#content > div:nth-of-type(1)"},{"a":"#sgpb-popup-dialog-main-div-wrapper,\n.sg-popup-builder-content"}];

const hostnamesMap = new Map([["dunia21s.fun",0],["lk21.li",[0,63]],["fb21.tv",[0,144]],["nonton21.tv",[0,63]],["lk21c.fun",1],["lk21.host",2],["animeindo.id",3],["apkmod.id",4],["radarlombok.co.id",4],["novelgo.id",4],["paraedu.id",4],["hightech.web.id",[4,49]],["nama.web.id",4],["batch.id",5],["budiarto.id",6],["ceklist.id",7],["alona.co.id",8],["cerpen.co.id",9],["chip.co.id",10],["cosmogirl.co.id",11],["anime17.net",[11,80]],["dream.co.id",12],["kaskus.co.id",13],["kontan.co.id",14],["pusatdata.kontan.co.id",15],["stocksetup.kontan.co.id",16],["lihat.co.id",17],["orami.co.id",18],["pontianakpost.co.id",19],["republika.co.id",20],["viva.co.id",21],["log.viva.co.id",22],["wartaekonomi.co.id",23],["filmterbaru.id",24],["ggwp.id",25],["grid.id",26],["nextren.grid.id",27],["inews.id",28],["www.inibaru.id",29],["investor.id",30],["jurnalisindonesia.id",31],["kabargames.id",32],["manganime.id",33],["medcom.id",34],["onlinemetro.id",35],["www.sonora.id",36],["tek.id",37],["terasjakarta.id",38],["terkini.id",39],["tirto.id",40],["uzone.id",41],["internetpositif.uzone.id",42],["animeindo.web.id",43],["animeindo.video",43],["animekompi.web.id",44],["cinemaindo.web.id",[45,46]],["sinemaindo.web.id",[45,55]],["filmbagus21.info",46],["eka.web.id",47],["ganool.web.id",48],["kazefuri.web.id",50],["lk21.web.id",51],["mangaku.web.id",52],["mangaku.in",52],["mangaku.site",[52,137]],["nontonmovie.web.id",53],["videocrot.org",[53,124]],["resep.web.id",54],["suki48.web.id",56],["zigi.id",57],["manganime.in",58],["b201.info",59],["senimovie.info",[60,61]],["senimovies.net",60],["ganool.is",62],["ganool.ph",62],["ganool.se",[62,131]],["ganool.st",62],["nontonlk21.live",64],["bioskop99.me",65],["dunia21.me",[66,67]],["dunia21.net",67],["dunia21.org",67],["dunia21.wtf",67],["idfl.me",[68,69]],["r-l.me",68],["idtube.me",[70,71]],["idxx1.top",[71,138]],["xx1.me",72],["anoboy.media",73],["bharian.com.my",74],["mforum.cari.com.my",75],["utusan.com.my",76],["mediahiburan.my",77],["rasa.my",78],["youtube-mp3.my",79],["animeindo.net",81],["awnime.net",82],["bintangmawar.net",83],["cinema-indo.net",84],["dramaqu.net",85],["duniaku.net",86],["filmace21.net",87],["filmbagus88.net",88],["filmku.net",89],["funtasticko.net",90],["gadismalam.net",91],["harakahdaily.net",92],["ibugil.net",93],["indoxxi.net",94],["inidramaku.net",95],["juragan-anime.net",96],["kazefuri.net",97],["komiku.net",98],["kurazone.net",99],["mangakita.net",100],["mangashiro.net",101],["nobarfilm21.net",102],["nontonganool.net",103],["seri168.net",104],["torjack.net",105],["tvkabel.net",106],["unyil.net",107],["zonapanaz.net",108],["indobokep.pro",108],["dutafilm.observer",109],["bokepml.online",110],["layarxxi.online",111],["dewabioskop21.org",[112,113]],["dwa21.org",[112,114]],["film21terbaru.org",115],["gatsunime.org",116],["kumpulmanga.org",117],["nanimex.org",118],["nontoncinema.org",119],["otakuindo.org",120],["pakbos21.org",121],["pkspiyungan.org",122],["satujiwa.org",123],["indoxxi.pictures",125],["bioskop168.pro",126],["otakudesu.pro",127],["indoxx1.pw",128],["file.rocks",129],["lonteku.sbs",130],["cmovieshd.se",[131,132]],["hdfree.se",133],["myasiantv.se",134],["filmbokep21.shop",135],["ganol.si",136],["mangaku.vip",137],["indoxxi.top",[139,140]],["indoxxi.tv",[139,145]],["bioskopmovie.tv",141],["cinemaindo.tv",142],["elde.tv",143],["xx1.tv",145],["kompas.tv",146],["layarkaca21.tv",147],["lk21.tv",147],["ns21.tv",148],["ns21.us",148],["dewanonton.vip",149],["kurina.vip",150],["otakudesu.watch",151],["goblintv.xyz",152],["indostreamings.xyz",153],["kazemanga.xyz",154]]);

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
