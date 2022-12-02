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

// hun-0

const argsList = [{"a":["{\"selector\":\".widget\",\"tasks\":[[\"has\",{\"selector\":\"h3w\",\"tasks\":[[\"has-text\",\"Támogatóink\"]]}]]}","{\"selector\":\"[class*=\\\"item_container\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"[class*=\\\"_tag\\\"]\",\"tasks\":[[\"has-text\",\"hirdetés\"]]}]]}"]},{"a":["{\"selector\":\"div[class*=\\\"widget\\\"]\",\"tasks\":[[\"has\",{\"selector\":\" > .widgettitle\",\"tasks\":[[\"has-text\",\"Hirdetés\"]]}]]}","{\"selector\":\"div[class*=\\\"widget\\\"]\",\"tasks\":[[\"has\",{\"selector\":\" > .widgettitle\",\"tasks\":[[\"has-text\",\"Állásajánlat\"]]}]]}"]},{"a":["{\"selector\":\".sb-widget\",\"tasks\":[[\"has\",{\"selector\":\" > h4\",\"tasks\":[[\"has-text\",\"Hirdetés\"]]}]]}"]},{"a":["{\"selector\":\".wrapRectangle\",\"tasks\":[[\"has\",{\"selector\":\" > div > span\",\"tasks\":[[\"has-text\",\"Hirdetés\"]]}]]}"]},{"a":["{\"selector\":\"div[style*=\\\"margin-bottom:10px\\\"]\",\"tasks\":[[\"has\",{\"selector\":\" > div\",\"tasks\":[[\"has-text\",\"HIRDETÉS\"]]}]]}"]},{"a":["{\"selector\":\"aside\",\"tasks\":[[\"has\",{\"selector\":\".widgettitle > span\",\"tasks\":[[\"has-text\",\"Hirdetés\"]]}]]}"]},{"a":["{\"selector\":\"div.grid_item\",\"tasks\":[[\"has\",{\"selector\":\" > div\",\"tasks\":[[\"has-text\",\"Hirdetés\"]]}]]}","{\"selector\":\"div.grid_item\",\"tasks\":[[\"has-text\",\"Google Hirdetés\"]]}"]}];

const hostnamesMap = new Map([["bpiautosok.hu",0],["budapestkornyeke.hu",1],["cyberpress.hu",2],["egeszsegkalauz.hu",3],["kezilabda.hu",4],["kiszamolo.hu",5],["szineshir.net",6]]);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
