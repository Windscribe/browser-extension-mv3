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

// jpn-1

const argsList = [{"a":"#secondary > div.embed-responsive,\n#secondary > div.small,\n#secondary > video.w-100"},{"a":"#bigup2,\n#fuji-fns,\n#wrap_banner_billboard,\n.pr_contents,\n[class*=\"banner_type_\"],\nbody > div#curtain + div.container[id],\ndiv[style^=\"border:1px solid #CCC;width:300px;margin:\"]"},{"a":".wrap_pr_300_sky"},{"a":".fixed-bottom,\ndiv[class^=\"my-ad\"]"},{"a":"div[id^=\"im-\"][style=\"min-height: 90px; margin-bottom: 1rem;\"],\ndiv[style$=\"min-height:250px;\"]"},{"a":".ad_3rec"},{"a":".widget > a[href][target=\"_blank\"] > img"},{"a":".widget-single-content-bottom,\n.widget-single-content-middle"},{"a":".gad_pc"},{"a":".sidebar > section[id^=\"custom_html-\"],\nbody .my_adslotd"},{"a":"#ad-double-rectangle"},{"a":"#ad_rudel_1,\n#ad_rudel_2,\n#advertisement_amazon,\n#maniax,\n#okazu_resemble_games,\n#recent_recommendations,\n#this_week_release"},{"a":".b-r--before-site-content,\ndiv[style=\"min-height: 280px;\"]"},{"a":".author + div.archive,\n.single > p[style=\"margin-bottom:10px;\"]"},{"a":"div[style=\"text-align:center;background-color:#000000;color:#FFFFFF\"],\ndiv[style=\"width:160px;margin-right:-175px;float:left;\"] > div[style=\"margin-top:10px;text-align:center;\"]:last-of-type,\ndiv[style=\"width:466px;background:#000000;color:#FFFFFF;text-align:center\"]"},{"a":"#p-SponsoredLink,\ndiv[style=\"font-size: 11px;\"]"},{"a":"body > div[style=\"text-align: center;\"]"},{"a":".adspc,\n[class^=\"sponsor\"]"},{"a":".nearby > li:last-child:not([class])"},{"a":".ads_pc_rectangle"},{"a":".article__content > h3.module__heading,\n.module--category-recent-entry,\n.rss-unit,\n.side--right > section.module--free,\n[class*=\"spad_\"]"},{"a":"div[id^=\"1\"][style*=\"height\"][style*=\"width\"],\ndiv[style^=\"margin:0 auto;height:\"][style$=\"px;\"]"},{"a":"div[class^=\"adsense_article_\"]"},{"a":".side_category + aside"},{"a":".left_main > a,\n.sample_block"},{"a":"#text-26,\ndiv[id^=\"omc_ad_widget\"]"},{"a":"#myinvidad,\n#thbss > div > a[onclick][title=\"CLOSE\"]"},{"a":"div[style=\"text-align:center\"]"},{"a":"#popup-container"},{"a":".bottompr,\n.toppr,\n.videobottompr320x100"},{"a":".l-sidebar > aside.widget_block"},{"a":".normal-sidebar a[href^=\"https://www.amazon.co.jp/gp/\"]"},{"a":".sidebar2.sidebar.col-sm-3,\n.widget_sponsored_area"},{"a":"#ad_html,\n#new_ad_html"},{"a":"#preview_dispAffi"},{"a":"#overlay_area"},{"a":"p > a[target=\"_blank\"] > img"},{"a":"#ufw_1"},{"a":".ads_za"},{"a":".a-d-block,\n.set_height_250,\ndiv[id][style^=\"position: absolute;  z-index: 12345;width: 100%; height: 100%; left: 0;  top: 0;background: gold;\"]"},{"a":".aasc.center > iframe[class*=\"lazyload\"],\n.sidebar > [class]:first-child,\ndiv[style*=\"min-height\"]:not([class]),\ndiv[style=\"width:100%;max-width:730px;height:auto;min-height:190px;\"]"},{"a":"#container > div[style=\"margin:0 auto;margin-top:2px;min-height:95px;text-align:center;\"],\n#sub > div.column-inner > div.column-inner-2 > div[style=\"text-align:center;\"],\n#sub a[href^=\"https://www.amazon.co.jp/gp/\"],\n.article-outer-3 > #article-options,\ndiv[style=\"width:100%;height:300px;\"]"},{"a":"#prs"},{"a":".p-table__contents--full.u-pt30vw-down-md"},{"a":".u-dib"},{"a":"#bottomNbox,\n.wide_adbox"},{"a":".ad-banner:not([data-name=\"single-related-posts\"])"},{"a":".post > .section-in > div[align=\"center\"],\n.post > .section-in > table"},{"a":"div[id^=\"gpt-ad\"]"},{"a":"div[class^=\"fluct-unit\"]"},{"a":".pr_link"},{"a":"div[style=\"width: 970px; margin: 0 auto 30px;\"]"},{"a":".ad-common_pc-ranking"},{"a":"iframe.yahoo"},{"a":".my-adspace"},{"a":".row > div[class^=\"col-md-\"] > div[style^=\"text-align:center;margin-bottom:\"] > table[border=\"0\"]"},{"a":".bnr_wd_wrap"},{"a":"div[class^=\"gptad\"]"},{"a":".footer-ads-recipe"},{"a":"#dmm_comic_latest"},{"a":"#txtPr > span"},{"a":".home-featured-ad,\n.poplayer"},{"a":".adcopy2 > a"},{"a":".lala-common-ad"},{"a":"div[class^=\"style_ad\"],\ndiv[class^=\"style_under_toc_ads\"]"},{"a":"#top-ad1-wrapper,\ndiv[id^=\"broadcast-content-ad\"],\nsection[id^=\"common-content-top-ad\"],\nsection[id^=\"top-sidebar-ad\"]"},{"a":".adframe-container"},{"a":".video-plugin-skip-button"},{"a":"div[class=\"col-sm-12\"] > font[color]"},{"a":".brand_panel"},{"a":"div[style^=\"text-align:center;width:336px\"]"},{"a":"#the-content > hr:last-of-type,\n#the-content > p > a[href^=\"https://hb.afl.rakuten.co.jp/\"],\n#the-content > p > a[href^=\"https://px.a8.net/svt/ejp?\"]"},{"a":"div[style=\"width:100%;background-color:#000;\"]"},{"a":"#product"},{"a":".ggle-ad"},{"a":"#sidebar > p.mg_b_5[style],\ndiv[style=\"width: 300px !important; height: 250px !important;margin-bottom:20px;\"],\np[style=\"margin-top: 80px;\"]"},{"a":".c307ad"},{"a":".modal_mo"},{"a":".entry-content > p > a[href^=\"https://al.dmm.co.jp/\"],\n.entry-content > p > a[href^=\"https://happymail.co.jp\"],\n.entry-content > p > a[href^=\"https://wlink.golden-gateway.com\"]"},{"a":".sideBlock:first-child"},{"a":"#text-html-widget-2,\n.dspace-block,\n.wpap-tpl,\ndiv[style*=\"min-height\"][style*=\"height: auto\"]"}];

const hostnamesMap = new Map([["kumin.news",0],["gigafile.nu",1],["choosar.gigafile.nu",2],["shortener.gigafile.nu",3],["wiki.yjsnpi.nu",4],["dougle.one",5],["rallys.online",6],["womanlife.online",7],["live-events.a-jp.org",8],["androplus.org",9],["chomanga.org",10],["erogamescape.dyndns.org",11],["ieeebd.org",12],["johndoeblog.org",13],["kabegami.jpn.org",14],["kaworu.jpn.org",15],["nekonikoban.org",16],["news-us.org",17],["postmap.org",18],["refind2ch.org",19],["bnewg.sokuho.org",20],["syosetu.org",21],["hinode.pics",22],["bokunokanojo.pink",23],["sexywars.pink",24],["eigo.plus",25],["cndata.jpg4.pw",26],["dateplus.red",27],["shop-flashka.ru",28],["stanok-chel.ru",29],["hedgehog.ryukyu",30],["geek.sc",31],["share-videos.se",32],["embed.share-videos.se",33],["bokumato.site",34],["okazuch.site",35],["phuot.site",36],["vimv.site",37],["zabuu.site",38],["7mmtv.sx",39],["coron.tech",40],["connect.coron.tech",41],["jump.x0.to",42],["mag.digle.tokyo",43],["movie.digle.tokyo",44],["game-news.tokyo",45],["hanako.tokyo",46],["l-media.tokyo",47],["web.playerapp.tokyo",48],["urbanlife.tokyo",49],["rakko.tools",50],["corriente.top",51],["reminder.top",52],["times.abema.tv",53],["best-hit.tv",54],["i.best-hit.tv",55],["cazual.tv",56],["cchan.tv",57],["delishkitchen.tv",58],["erovideon.tv",59],["hamazo.tv",60],["hpav.tv",61],["ikora.tv",62],["lala.tv",63],["mamadays.tv",64],["ohen.tv",65],["wav.tv",66],["jpshowbiz.us",67],["2ch.vet",68],["abstractpainting.work",69],["efootball.work",70],["glossary.work",71],["rorriiianime.work",72],["tkgstrator.work",73],["4thsight.xyz",74],["k3su.xyz",75],["theav.xyz",76],["wazaari.xyz",77],["xn--8uqt3cty5bwwbwwh.xyz",78],["hamakore.yokohama",79],["socom.yokohama",80]]);

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
