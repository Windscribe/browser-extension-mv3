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

// hun-0

const argsList = [{"a":["{\"selector\":\"*\",\"action\":[\"style\",\"cursor: auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"div.article-headline\",\"action\":[\"style\",\"margin-top: 44px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"header\",\"action\":[\"style\",\"height: auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#_cikk_tartalom_rb1\",\"action\":[\"style\",\"margin-top: 0 !important;\"],\"cssable\":true}","{\"selector\":\"div.layoutContent\",\"action\":[\"style\",\"margin-top: 0 !important;\"],\"cssable\":true}","{\"selector\":\"div.postContent\",\"action\":[\"style\",\"margin-top: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"padding-top: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"._ce_measure_row\",\"action\":[\"style\",\"margin-top: 1rem !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"overflow: auto !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body[style*=\\\"padding-top\\\"]\",\"action\":[\"style\",\"padding-top: 0px !important; background-color: #777 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#page-content\",\"action\":[\"style\",\"margin-top: 0px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"overflow: auto!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"div#search_container\",\"action\":[\"style\",\"margin-bottom: 0 !important;\"],\"cssable\":true}","{\"selector\":\"section[id=\\\"content_left\\\"][class=\\\"content_content\\\"]\",\"action\":[\"style\",\"width: auto !important; padding: 0 45px 0 46px !important;\"],\"cssable\":true}","{\"selector\":\"section[id=\\\"content_left\\\"][class=\\\"content_start\\\"]\",\"action\":[\"style\",\"padding-top: 80px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"header .container\",\"action\":[\"style\",\"padding: 10px 10px 0 10px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"html, body\",\"action\":[\"style\",\"overflow:auto !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".first-section\",\"action\":[\"style\",\"margin-top: 0 !important;\"],\"cssable\":true}","{\"selector\":\".oh-holder.open\",\"action\":[\"style\",\"z-index: 9999!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"div.container.banner-container.wide\",\"action\":[\"style\",\"min-height: 0!important; height: auto!important;\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["hosszupuskasub.com",0],["hu.ign.com",1],["atv.hu",2],["automotor.hu",3],["budapestkornyeke.hu",4],["kekvillogo.hu",4],["citromail.hu",5],["divany.hu",6],["index.hu",6],["totalbike.hu",6],["totalcar.hu",6],["velvet.hu",6],["hwsw.hu",7],["jofogas.hu",8],["kektura.hu",9],["keol.hu",10],["magyarhirlap.hu",11],["mkb.hu",12],["origo.hu",13],["startlap.hu",14]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
