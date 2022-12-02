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

/// name css-procedural

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

// cze-0

const argsList = [{"a":["{\"selector\":\".ct-related\",\"tasks\":[[\"has-text\",\"^\\\\s+Reklama\"]]}"]},{"a":["{\"selector\":\".block-imageblock\",\"tasks\":[[\"has-text\",\"Reklama\"]]}"]},{"a":["{\"selector\":\"div.box\",\"tasks\":[[\"has-text\",[\"^reklama\",\"i\"]]]}"]},{"a":["{\"selector\":\"a\",\"tasks\":[[\"matches-css\",{\"name\":\"background-image\",\"value\":\"url\"}],[\"matches-css\",{\"name\":\"position\",\"value\":\"^fixed$\"}],[\"upward\",1]]}"]},{"a":["{\"selector\":\"h3\",\"tasks\":[[\"has-text\",\"^Reklama$\"]]}"]}];

const hostnamesMap = new Map([["csfd.cz",0],["doktorka.cz",1],["dotekomanie.cz",2],["indian-tv.cz",3],["nerdfix.cz",3],["parabola.cz",4]]);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
