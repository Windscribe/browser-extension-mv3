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

// chn-0

const argsList = [{"a":"A[href*=\"/ADRedirect.\"]"},{"a":"#AdRelatedTitle,\n#ad-467,\n#search_u_970x90,\n.side-advertise"},{"a":".site_evt"},{"a":"#sub-ad,\n.ask18,\n.side-AD"},{"a":".adbig300_mid,\n.tablet_above_ad,\ndiv[style*=\"min-height\"][style*=\"250px\"],\ndiv[style=\"height:156px;width:570px;margin:0px auto;display:block;\"]"},{"a":"div[class=\"row my-2 ad-slot-970\"]"},{"a":"#news_detail_div > div[align=\"center\"],\n#news_detail_div > strong > a[rel=\"noreferrer\"]"},{"a":".ad_desktop_top"},{"a":".contad"},{"a":"div[class]:has( > div[class] > div[class*=\"-ad-manager-\"])"},{"a":"#banner > h2,\n#box34614 > [class^=\"box-\"],\n#links-row-1 > div[id^=\"box\"]:not(#box32499):not(#box1026387):not(#box34614)"},{"a":"#caas-vm-container,\n#fix-corner,\n.close-corner,\n.popin_ad"},{"a":".ypa-custom2"},{"a":"#leaderboard_banner"},{"a":"#contentBox > div[style^=\"width:336px;height: 280px;\"],\ndiv[id^=\"gad\"]"},{"a":"#tbadword,\n.bottom-right"},{"a":"#top_d"},{"a":".amp-parallax-ad,\n.recipe-ad-placeholder"},{"a":"span[class^=\"style_adUnit\"]"},{"a":"#fbFixedAd,\ndiv[style=\"width:630px;height:700px;\"]"},{"a":"#avivid_waterfall_wp_product_area"},{"a":".aspect-ratio > img.object-cover + .aspect-ratio-content + div[class^=\"absolute inset-\"][class*=\"bg-brand\"]"},{"a":"#lotteryfnc"},{"a":"a[href^=\"http://www.ebcbuzz.com/url/\"]"},{"a":".nex_floor_banner,\n.nex_index_ads,\n.nex_mid_ads"},{"a":".Ads-Sidebar,\n.reds"},{"a":".Zi_ad_a_H,\n.post-entry > div[style=\"min-width: 300px; min-height:300px;\"]"},{"a":"div[id^=\"ad_article_\"],\ndiv[id^=\"ad_index_\"]"},{"a":"a[href=\" http://www.shumeimotel.com/\"] > img"},{"a":"#id_ad_image"},{"a":".rs-side-ads,\n.rsads"},{"a":"#callboard,\n#toubuads,\n.slick"},{"a":".article_title_ad_img"},{"a":".author + .poster"},{"a":"div[data-group^=\"skyscraper_\"]"},{"a":"a[href^=\"http\"]:not([href*=\"18moe.vip\"]) > img[src*=\"tc.18moe.net\"]"},{"a":".textwidget > p > a > img"},{"a":".content-gg,\n.sidebar a[href^=\"http\"]:not([href*=\"landian.\"])"},{"a":"#frameYl5IOf"},{"a":".tp_advertising,\na[href*=\"/ad.\"]"},{"a":"#footer > div[style],\n#otherad,\ndiv[style^=\"margin-top:2\"]"},{"a":".ad280x165,\na[href=\"ilupian8.html\"]"},{"a":".ysxs8_w960_1"},{"a":".tecent-adsense"},{"a":".adn-ar,\n.haliluya,\n.net,\nspan[style=\"height: 17px;margin-left: 10px;background: #000;border: 1px solid #000;\"]"},{"a":".alert-success + center,\na[href$=\"/smsf.php\"]"},{"a":"a:has(img[src*=\".alicdn.\"]),\na:has(img[src*=\"/ddimg/\"]),\na[href*=\".yangkeduo.com\"],\na[href=\"https://pic.13709394.net/upload/\"],\na[href^=\"/\"]:not([href*=\".\"]) > img[src*=\".gif\"],\na[href^=\"/\"][href$=\".html\"] > img[src*=\".gif\"]:not([data-original]),\nimg[src*=\".xyz\"][src*=\".gif\"]"},{"a":"a[href*=\"/uuribao.com/\"],\na[href*=\"/uuribao.com/\"] + .caption"},{"a":".pc_rb_float"},{"a":"#rightd,\n#undertd,\n#undertd + div[style]"},{"a":"iframe[src^=\"//ads.exoclick.com/\"]"},{"a":".avd1,\n.avd2"},{"a":".tpc_content > a[target=\"_blank\"][onmouseout],\n.tpc_content > span > span > a[target=\"_blank\"][onmouseout]"},{"a":".tpc_content > a[target=\"_blank\"][onmouseover]"},{"a":"#__top_header + script + div"}];

const hostnamesMap = new Map([["programmer-club.com.tw",0],["ruten.com.tw",1],["find.ruten.com.tw",2],["showtv.com.tw",3],["sina.com.tw",4],["sogi.com.tw",5],["tvbs.com.tw",6],["health.tvbs.com.tw",7],["u-car.com.tw",8],["wealth.com.tw",9],["cwyuni.tw",10],["edh.tw",11],["ez3c.tw",12],["gas.goodlife.tw",13],["healthylives.tw",14],["histock.tw",15],["ibf.tw",16],["icook.tw",17],["blog.icook.tw",18],["life.tw",19],["likr.tw",20],["linetv.tw",21],["ebc.net.tw",22],["news.ebc.net.tw",23],["olgame.tw",24],["sigure.tw",25],["sunnylife.tw",26],["ttshow.tw",27],["tvshowbox.tw",28],["pp.ua",29],["honglingjin.co.uk",30],["fuli.us",31],["huaren.us",32],["lightnovel.us",33],["18comic.vip",34],["18moe.vip",35],["jiyingw.vip",36],["landian.vip",37],["laowang.vip",38],["qyun.vip",39],["ttzmz.vip",40],["xxxsm.vip",41],["ysxs8.vip",42],["baiduyun.wiki",43],["typecho.wiki",44],["5217kdy1.xyz",45],["939394.xyz",46],["bt1207ma.xyz",47],["gmtv1.xyz",48],["hurigirls99.xyz",49],["jav777.xyz",50],["volcore.xyz",51],["cb.wpio.xyz",52],["cl.wpio.xyz",53],["xyg39.xyz",54]]);

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
