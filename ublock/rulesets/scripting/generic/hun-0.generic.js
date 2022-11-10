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

// hun-0

const toImport = [[1522090,".ad__main"],[15656788,".adblokk"],[6223357,".cikk_reklam"],[4733807,".cikk-reklam"],[2383986,".cikkreklam"],[7343587,".google_hirdetes"],[16395314,".google_hirdetesek"],[11499185,".google-hirdetes"],[14905764,".google-hirdetesek"],[10796480,".googlehirdetes"],[15923877,".googlehirdetesek"],[5017160,".hirdetes_box"],[8863810,".hirdetes_container,.hirdetes-container"],[4537127,".hirdetes_doboz"],[5015610,".hirdetes-box"],[4489077,".hirdetes-doboz"],[4937876,".hirdetes-linkek"],[4542397,".hirdetesek_box"],[6575875,".hirdetesek_container,.hirdetesek-container"],[6596690,".hirdetesek_doboz"],[4540847,".hirdetesek-box"],[6548640,".hirdetesek-doboz"],[12826999,".optimonk-container"],[15840884,".optimonk-iframe-container"],[6660305,".optimonk-middle"],[16236083,".reklam-doboz"],[1933834,".reklamok"],[4323775,"#adblokk"],[6271890,"#cemp_doboz"],[6047907,"#cenmg"],[8022578,"#cikk_reklam"],[6533028,"#cikk-reklam"],[6230429,"#cikkreklam"],[1897651,"#etarget"],[8341720,"#google_hirdetes"],[1417319,"#google_hirdetesek"],[12497318,"#google-hirdetes"],[16704985,"#google-hirdetesek"],[16240683,"#googlehirdetes"],[144794,"#googlehirdetesek"],[6816381,"#hirdetes_box"],[10663031,"#hirdetes_container,#hirdetes-container"],[9981330,"#hirdetes_doboz"],[7425559,"#hirdetes_linkek"],[6814831,"#hirdetes-box"],[9933280,"#hirdetes-doboz"],[5936009,"#hirdetes-linkek"],[9986600,"#hirdetesek_box"],[12020078,"#hirdetesek_container,#hirdetesek-container"],[7594823,"#hirdetesek_doboz"],[9985050,"#hirdetesek-box"],[7546773,"#hirdetesek-doboz"],[8818918,"#optimonk-iframe-container-campaign-12"],[4962885,"#optimonk-overlay-campaign-12"],[1258088,"#reklam-doboz"],[2931967,"#reklamok"]];

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
