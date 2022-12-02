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

// nld-0

const argsList = [{"a":["{\"selector\":\".l-page\",\"action\":[\"style\",\"max-width: 1300px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"margin-top:-20px!important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".top-banner\",\"action\":[\"style\",\"min-height: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"[class*=\\\"footer-section\\\"] > *\",\"action\":[\"style\",\"display: none !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"visibility: collapse !important;\"],\"cssable\":true}","{\"selector\":\".klokken\",\"action\":[\"style\",\"transform: translateX(-180px ) !important;\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["2dehands.be",0],["marktplaats.nl",0],["dekrantvantoen.nl",1],["ensie.nl",2],["meerdangewenst.nl",3],["wereldklokken.nl",4]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
