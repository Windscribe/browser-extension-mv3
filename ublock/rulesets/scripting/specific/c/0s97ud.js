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

// rus-0

const argsList = [{"a":"a[href*=\"://opillia.com/\"]"},{"a":"img[src*=\"/partner/images/\"]"},{"a":".tab_text > form a[href][target=\"_blank\"]"},{"a":".penci-sidebar-widgets.widget-area-2,\ndiv[class^=\"c40-reveal-modal\"]"},{"a":".artbanner,\n.kom,\n.wrapbanner"},{"a":".divBanners"},{"a":".slider_big"},{"a":".header_rec"},{"a":".postabove,\np:has( > strong ~ a[href*=\"://blockads.\"])"},{"a":".favorites-block__list"},{"a":"#top-categories-autoscroll > #main-autoscroll"},{"a":"a[href*=\"/php/rotator/goto.php?id=\"]"},{"a":"[class^=\"headerBanner\"] > .top"},{"a":"div[id^=\"baner\"]"},{"a":".rau-header-slider-wrap"},{"a":".rdblock"},{"a":".adw-link"},{"a":"article > .box[style=\"width:fit-content\"]"},{"a":".aside-column > a > img[src*=\"/home/banners/\"]"},{"a":"[id^=\"rst-page-banner-300x250\"]"},{"a":".sidebar-widgets > .widget_text,\n.spu-bg,\n.spu-box"},{"a":"a.info[href][target=\"_blank\"]"},{"a":"#page-header > .panel,\n.headerbar > .inner > div[style=\"float:right\"]"},{"a":"[class*=\"billboard\"]"},{"a":"#head--area,\n.ablock,\ndiv[class^=\"sed\"] > .half.left > .sdbrick:nth-child(-1n+9),\ndiv[class^=\"sed\"] > .half.right > .sdbrick,\ndiv[class^=\"sed\"] > a[rel=\"nofollow\"]"},{"a":".article__adml"},{"a":".article__banner-container"},{"a":".b-widget__rates"},{"a":".box__sponsor,\n.section-spr"},{"a":".box:has( > .box__sponsor),\n.branding-under-menu,\n.lifescore__scroll"},{"a":".mfp-bg"},{"a":"#rightCol,\n.rightAdvBox,\ndiv[style^=\"margin\"][style$=\"width: 300px;\"]"},{"a":"[class^=\"branding-link-\"]"},{"a":"#videos-ads,\ndiv[id^=\"premium-banner\"],\ndiv[id^=\"topbanner\"]"},{"a":"#b_sport_240,\n#bann-240,\n#news_text > div[class]:has(table[cellpadding] a[target=\"_blank\"]),\n#news_text > p:has( > a[href*=\"://analyticsq1.com/\"]),\n.right-top__banner,\n.sportua-bet-block,\na[href*=\"clickstats.fun\"],\na[href*=\"favbet\"][target=\"_blank\"],\ndiv[id^=\"b_sport_\"],\ndiv[id^=\"zone_\"],\nimg[src=\"https://pic.sport.ua/images/media/orig/f2/16364.gif\"]"},{"a":".partners-block"},{"a":".video-banner"},{"a":".bottom > .bnr"},{"a":".bnr-wrapper"},{"a":"aside > .w-nt.primary-sidebar-widget"},{"a":".Notices.PanelScroller"},{"a":".article-partners"},{"a":".category-card__card-row > .col:has( > div > .tabletki-adunit),\n.com__panel-header"},{"a":".csa-head"},{"a":"#popup-root"},{"a":"#Flash"},{"a":"#header > .rounded"},{"a":".partners-news"},{"a":".banner-wide"},{"a":"a[href*=\"brendi\"][target=\"_blank\"],\na[href][target=\"_blank\"][style*=\"/media/uploads/\"]"},{"a":".c-aside__port,\n.c-section > .l-row > .l-col:has( > [data-ad-container]),\niframe[src*=\"/partner-news?\"],\nmain > aside.u-divider--t:has( > iframe[src*=\"/partner-news?\"])"},{"a":"#salut_splash"},{"a":".banner_white"},{"a":".partners-block-wrapper"},{"a":".aside-gab,\n.gab-ins,\ndiv[class^=\"ab_premium_\"]"},{"a":".empty_block,\n.home_ad_first_screen,\ndiv[class^=\"adubr\"]"},{"a":".main_brand_link"},{"a":".fancybox-lock .fancybox-overlay"},{"a":".val-external__top-banner,\n.val-sidebar"},{"a":".authorSingleBlock,\n.mainBlockAds,\n.vestiAds,\n.vestiTiserAds,\nheader > a[href] > img"},{"a":".right_banner_hold"},{"a":"section[id^=\"ctup_ads-\"]"},{"a":".holiday-banner-bl,\n.trn-info-block"},{"a":"#archive-video-player,\n.bookmaker"},{"a":".col__big .unit-rubric__head[style^=\"margin-top:\"],\n.footer-partners,\n.partner-news-content,\n.sponsors-holder"},{"a":"#left_news_list_article,\n#modal_window,\n#overlay_fb_modal,\n#right_300x600,\n.article-informer"},{"a":"#above-header,\n.ai-placement,\n.block-custom-banners,\n.new-banners,\n.znaj-banners_ajax,\na[href^=\"http://prive.kiev.ua\"],\ndiv[class*=\"advertising\"]"},{"a":".sidebar > .widget_rvuoi:nth-child(-1n+4)"},{"a":".posts-list-banner"},{"a":"#text-10,\na[href^=\"http://robotsforex.ru/sale/\"],\na[href^=\"https://my.alfa-forex.ru/ru/registration/\"]"},{"a":".bVerticalRectangle,\n.middleboard,\n.rightContainer > .floating_banner,\niframe[src*=\"/www/delivery/\"]"},{"a":"[class^=\"reklama-ads-\"]"},{"a":"#oframeplayer > [class][style^=\"display: block\"],\n.block-info-vertical"},{"a":"div[class*=\"adv-\"]"},{"a":"#offerPopup"},{"a":".post__banner,\nvideo[src*=\"/storage/uploads/\"][src$=\".mp4\"]"},{"a":".header-reklama"},{"a":".LeaderBoard,\n.contentBoxR.floating_banner"},{"a":"#middle_section > div[style^=\"float:\"],\n#right_section > div[style^=\"height: 400px\"],\n#top_two_article"},{"a":".sidebar > .adv ~ *"},{"a":"[onclick*=\"ClickOnAd\"],\n[onclick*=\"ClickOnBanner\"]"},{"a":"#ovva-player .o-pp,\n.google_970x90 > div:empty,\n.online-container > div[class$=\"-background\"]:empty,\n.online-container a[class*=\"space-link\"],\n.online-sport-top-banner-bg,\n.sidebar-banner > div:empty,\n.video-container > div[class$=\"-background\"]:empty,\n.video-container a[class*=\"space-link\"],\na[href*=\"://h.holder.com.ua/c?tz\"],\ndiv[class$=\"_ad\"] > div:empty"},{"a":".under-player"},{"a":".nav > ul > li > [title=\"Досуг\"],\n.nav > ul > li > [title=\"Знакомства\"]"},{"a":"#bnadplayer,\n.fullpanefn"},{"a":"body > div > .a-overlay"},{"a":".body-sub-form"},{"a":".detected-block-modal,\n.js-detected-block"},{"a":"a[href$=\".php\"] > img,\na[href*=\".htm\"] > img"},{"a":"#top-page-ads,\n.ablock_side,\n.header2,\n.main_top_ads"},{"a":".darkrek"},{"a":"a[href][target=\"_blank\"][style^=\"display:\"],\ntd[width=\"200\"][valign=\"top\"] > a[href]"},{"a":"body > div > .container > a[href][target=\"_blank\"]"},{"a":"#register_popup"},{"a":".makeBet,\n.zoneBanner"},{"a":"body > div:not([id]):not([class]) + div:not([id]):not([class]) + div:not([id]):not([class]) + div:not([id]):not([class]) ~ div[id]:not([class])"},{"a":"a[rel=\"nofollow\"][target=\"_blank\"][href^=\"http://lu4ok.ws/go/?\"]"},{"a":".plaintext > noindex,\nnoindex > .lastnews"},{"a":"iframe[src*=\"gnezdo.ru\"]"},{"a":"#page > noindex a[href][target=\"_blank\"]:not([href^=\"http://praetorians.ws/forum/\"])"},{"a":".soft-day:not(:first-child) > .box,\ncenter > .box-shadow + table:last-child"},{"a":".topad_banner"},{"a":"#dle-content > table[width=\"100%\"][height],\n#torrent_77_info,\n.separator,\ntd.topBorder > table[width=\"100%\"][height]"},{"a":"#begin #userlinks"},{"a":"div[style^=\"background:\"][style*=\"/ple.jpg)\"]"},{"a":"a[href^=\"http://iq-option.org/\"]"},{"a":"iframe[src*=\"/banner/\"]"},{"a":"div[id^=\"post\"] > .tech-info + :empty"},{"a":"img[src][width=\"241\"][height=\"383\"],\nimg[src][width=\"300\"][height=\"216\"]"},{"a":"#sidebar > .theiaStickySidebar > .widget_media_image"},{"a":".b-flex,\n.l-a-fly"},{"a":".adv-links"},{"a":"div[class^=\"adace\"]"},{"a":".main > a[href*=\"bit.ly\"] > img,\np.main:has([href*=\"bit.ly\"])"},{"a":"#gkadblock"},{"a":".banner__holder"}];

const hostnamesMap = new Map([["tenews.org.ua",0],["teremok.org.ua",1],["testkrok.org.ua",2],["umu.org.ua",3],["osvita.ua",4],["petcare.ua",5],["ng.pl.ua",6],["pogliad.ua",7],["setup.pp.ua",8],["pravdatut.ua",9],["price.ua",10],["profootball.ua",11],["protocol.ua",12],["radioroks.ua",13],["rau.ua",14],["rbc.ua",15],["recept.ua",16],["reono.ua",17],["reporter.ua",18],["rst.ua",19],["my.rv.ua",20],["rivnepost.rv.ua",21],["torg.rv.ua",22],["vse.rv.ua",23],["sd.ua",24],["segodnya.ua",[25,26]],["u24.ua",[25,54]],["game.segodnya.ua",[27,28]],["sport.segodnya.ua",[27,29]],["senior.ua",30],["sinoptik.ua",31],["slovoidilo.ua",32],["smartphone.ua",33],["sport.ua",[34,35]],["sportonline.ua",35],["dobre.stb.ua",36],["strahnadzor.ua",37],["stroyobzor.ua",38],["subbota.ua",39],["forums.sumy.ua",40],["superdom.ua",41],["viva.ua",41],["tabletki.ua",42],["te.ua",43],["doba.te.ua",44],["nday.te.ua",45],["poglyad.te.ua",46],["telekritika.ua",47],["teleportal.ua",48],["traktorist.ua",49],["tsn.ua",50],["market.tut.ua",51],["tvi.ua",52],["tyzhden.ua",53],["ubr.ua",55],["upl.ua",56],["uteka.ua",57],["val.ua",58],["vesti.ua",59],["vgorode.ua",60],["vikka.ua",61],["work.ua",62],["xsport.ua",63],["zi.ua",64],["zn.ua",65],["znaj.ua",66],["golos.zp.ua",67],["inform.zp.ua",68],["medved.us",69],["gazeta.uz",70],["kinohit.uz",71],["mover.uz",72],["nuz.uz",73],["podrobno.uz",74],["repost.uz",75],["sports.uz",76],["spot.uz",77],["stadion.uz",78],["vesti.uz",79],["yellowpages.uz",80],["1plus1.video",81],["kinoprofi.vip",82],["homeporn.website",83],["serial.wiki",84],["torrnado.win",85],["gdz-ru.work",86],["ppc.world",87],["2baksa.ws",88],["cont.ws",89],["darkwebs.ws",90],["filebase.ws",91],["igraprestolov.ws",92],["kote.ws",93],["lfootball.ws",94],["livesport.ws",95],["lu4ok.ws",96],["oane.ws",97],["onlyf.ws",98],["praetorians.ws",99],["samlab.ws",100],["forum.smolensk.ws",101],["xtreme.ws",102],["zarulem.ws",103],["xn--c1ajfnfb.xn--p1acf",104],["xn----dtbfdbwspgnceulm.xn--p1ai",105],["xn----etbbecbrbp5ahkja1ae7v.xn--p1ai",106],["xn---2--mddxunv8a2esa.xn--p1ai",107],["xn--24-7lcajlu.xn--p1ai",108],["xn--80acvefn6a4c.xn--p1ai",109],["xn--80ady2a0c.xn--p1ai",110],["xn--c1acj.xn--p1ai",111],["xn--k1afadd0cwc.xn--p1ai",112],["cameleo.xyz",113],["gk-stalker.xyz",114],["xporno.xyz",115]]);

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
