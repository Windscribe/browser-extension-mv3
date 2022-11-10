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

// rou-1

const argsList = [{"a":"[href*=\"/adclick.php\"],\n[href^=\"https://www.bursa.ro\"]"},{"a":".td-a-rec:has([href*=\"350x350\"])"},{"a":"#mvp-leader-wrap"},{"a":"#optional_banner,\n[class^=\"custom_module add\"]"},{"a":"#pub-top-container"},{"a":"[href^=\"//www.techinstyle.ro/\"]"},{"a":".widget_text.text-124.widget,\n.wpb_wrapper:has([href^=\"https://repigmentare.ro/\"]),\n[href=\"http://stefanovidiu.ro/\"],\n[href=\"https://www.ecrgroup.eu/\"],\n[href=\"https://www.expresorul.ro/\"]"}];

const hostnamesMap = new Map([["ziarulevenimentul.ro",0],["ziarulincomod.ro",1],["ziarulunirea.ro",2],["ziuaconstanta.ro",3],["ziuanews.ro",4],["zonait.ro",5],["nasul.tv",6]]);

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
