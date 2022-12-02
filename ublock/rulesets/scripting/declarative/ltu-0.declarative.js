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

/// name css-declarative

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssDeclarativeImport() {

/******************************************************************************/

// ltu-0

const argsList = [{"a":["{\"selector\":\".main > #header\",\"action\":[\"style\",\"margin-top: unset !important\"],\"cssable\":true}","{\"selector\":\".main > .fixed_userbar\",\"action\":[\"style\",\"margin-bottom: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".background[data-url^=\\\"https://bit.ly/\\\"]\",\"action\":[\"style\",\"visibility: hidden !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#mdelfi_latest_news\",\"action\":[\"style\",\"min-height: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".brandpage-wrapper\",\"action\":[\"style\",\"margin-top: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".LStatic__inner\",\"action\":[\"style\",\"padding-top: 0 !important\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["torrent.ai",0],["torrent.lt",0],["autoplius.lt",1],["m.delfi.lt",2],["imones.lt",3],["lrytas.lt",4]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
