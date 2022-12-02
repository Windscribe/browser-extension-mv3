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

// ltu-0

const argsList = [{"a":".ad120_box,\n.ad468_frame_bot,\n.widget3"},{"a":".otRounded.module-other-website-banner *"},{"a":"#page-ads,\n#sidebar-madmen"},{"a":".moduletabledesinen"},{"a":".content_banners"},{"a":"a[rel=\"nofollow\"] + * + * + * > img"},{"a":".fluid-width-video-wrapper"},{"a":".bannerbox,\n.cvWr.row.hidden-xxs,\n.cvWrSidebar,\n[onclick=\"window.open('http://www.cv.lt','_blank')\"]"},{"a":"#bottom-banners,\n.remejulogo"},{"a":"#rightcol"},{"a":"a[href*=\"http://www\"] > img"},{"a":"CENTER > A > *,\na[alt=\"Prezi.lt\"] + CENTER"},{"a":"img[alt=\"Informacija ir pagalba telefonu 1588\"]"},{"a":"div[style=\"width: 80%; font-size: 12px; padding: 5px; border: 1px dashed #CCF5CC; background: #F0FCF0; margin: 0 auto;\"]"},{"a":"#k980x200_krepsinis_net > *,\na[href^=\"https://goo.gl/\"],\ndiv[style=\"width:100%; top:44px; left:0; height:100vh; background-repeat:no-repeat;  position:fixed; background-position:50% 0px; background-image:url(https://www.tv3.lt/Uploads/wp_danai.jpg);\"]"},{"a":".home.blog .homeslider.rotator,\n.rightbar *"},{"a":"img[alt=\"www.linda-seeds.com\"]"},{"a":"a[href=\"http://sportouzdarbis.com/\"] > *"},{"a":"#wdBannerImg"},{"a":".side-body > TABLE[bgcolor=\"#87B6D9\"]"},{"a":"#block-block-7 P,\n#sidebar-right"},{"a":".adsb"},{"a":"a[target=\"titul\"] > img"},{"a":"a[href^=\"/redirect/ad/\"] > *"},{"a":".hometakeover.gofollow"},{"a":"a[href=\"http://www.filmux.us\"]"}];

const hostnamesMap = new Map([["veidas.lt",0],["vela.lt",1],["versliukai.lt",2],["verslosavaite.lt",3],["visalietuva.lt",4],["voruta.lt",5],["naujienos.vu.lt",6],["vz.lt",7],["zalgiris.lt",8],["zappy.lt",9],["zindyk.lt",10],["zooplius.lt",11],["zurnalai.lt",12],["danielius.net",13],["krepsinis.net",14],["kulturizmas.net",15],["legalus.net",16],["linksmiau.net",17],["lietuvis.no",18],["drauge.org",19],["pradzia.org",20],["vardai.org",21],["internetine-tv.narod.ru",22],["anglija.today",23],["ekspresas.co.uk",24],["lttv.us",25]]);

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
