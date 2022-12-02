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

// cze-0

const toImport = [[11677488,"#adRectangle"],[14634316,"#onlajny-stickers"],[1575011,"#promo-box"],[15223621,"#reklama-etarget"],[1318507,"#reklamni-box"],[12542198,"#reklamy"],[4223731,"#sklik"],[8035436,"#slevomat_ad"],[5285798,"#topbanner"],[11010606,"#zivefirmy"],[11968281,".adform-adbox"],[2181053,".bx-leaderboard"],[12391117,".cnc-ads"],[13230664,".etarget"],[5140928,".hp-advert"],[9097467,".jobscz"],[16220108,".reklama-3"],[1538998,".reklama-bottom"],[16285661,".reklama-box"],[16285953,".reklama-left"],[1548563,".reklama-lista"],[435804,".reklama-megaboard"],[1553976,".reklama-right"],[16286211,".reklama-top"],[1551489,".reklamaBottom"],[447617,".reklamaHorniLista"],[1537561,".reklama_ahead"],[1555369,".reklama_square"],[12429992,".rklm"],[377288,".sklik"],[12583162,".sklik-block"],[405914,".sklik-box"],[406206,".sklik_left"],[12598299,".sklik_right"],[1443132,".topreklama"],[843609,".vreklama"]];

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
