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

// grc-0

const argsList = [{"a":["{\"selector\":\"#primary\",\"action\":[\"style\",\"margin: 0 auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#mvp-site-main\",\"action\":[\"style\",\"margin-top: 0px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"background-image: none !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#LRGR\",\"action\":[\"style\",\"background: none !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#sp-component\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["start2click.com",0],["kalamatatimes.gr",1],["kozanilife.gr",2],["lamiareport.gr",3],["serraikanea.gr",4]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
