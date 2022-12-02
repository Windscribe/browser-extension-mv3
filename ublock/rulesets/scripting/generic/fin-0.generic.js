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

// fin-0

const toImport = [[4727654,"#atwAdFrame"],[9857064,"#keskimainos"],[15403441,"#mainokset"],[10386100,"#mainokset_oikea"],[10393088,"#mainokset_vasen"],[5206137,"#mainokset_yla"],[172864,"#mainos"],[4693312,"#mainosbanneri,#mainosbannerit"],[2942233,"#mainoskaruselli"],[4978855,"#mainoslaatikko"],[7741506,"#mainospaikka"],[15403464,"#mainostila"],[4470691,"#natiivit"],[12068655,"#parade-container"],[15351218,"#sponsori"],[4349910,"#sponsorit"],[12197437,"#yhteistyokaruselli"],[12197284,"#yhteistyokumppanit"],[8953805,"#yhteistyossa"],[7939890,"#ylamainokset"],[9456539,"#ylamainos"],[12001123,".adbox_content"],[11207360,".card--native"],[6358952,".dfpBoxBottom"],[11431699,".dfpListNativeBanner"],[4346073,".diks-display-ad"],[10719324,".diks-native-ad"],[8057843,".keskimainos"],[11556998,".mainokset"],[9387967,".mainokset_oikea"],[9394955,".mainokset_vasen"],[16539150,".mainokset_yla"],[15150859,".mainos"],[16026325,".mainosbanneri,.mainosbannerit"],[1944100,".mainoskaruselli"],[16311868,".mainoslaatikko"],[5940677,".mainosnosto"],[5942285,".mainospaikka"],[11557021,".mainostila"],[14353085,".sponsori"],[503467,".sponsorit"],[7489544,".tdt-desktop-ad"],[13666606,".tdt-manager-element"],[598072,".tdt-minilanding-button"],[15285024,".tdt-mobile-ad"],[10398216,".yhteistyokaruselli"],[10398063,".yhteistyokumppanit"],[7154584,".yhteistyossa"],[6140669,".ylamainokset"],[5610096,".ylamainos"]];

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
