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

// fin-0

const argsList = [{"a":["{\"selector\":\"#ad-top-banner-placeholder\",\"action\":[\"style\",\"min-height: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#nm-300x300-fb\",\"action\":[\"style\",\"min-height: 30px !important\"],\"cssable\":true}","{\"selector\":\"#nm-980x400-fb\",\"action\":[\"style\",\"min-height: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".section-wrapper > .has-ad-right\",\"action\":[\"style\",\"width: 100% !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body.oxy-modal-active\",\"action\":[\"style\",\"overflow: auto !important; position: initial !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".index-wrap\",\"action\":[\"style\",\"left: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"tbody > tr > td[style=\\\"width:468px\\\"][valign=\\\"top\\\"]\",\"action\":[\"style\",\"width: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".SearchResultList__Row--advertisement, .Profile__TopCard--advertisement, .SearchResultList--advertisement\",\"action\":[\"style\",\"width: 100% !important; min-height: unset !important; margin-right: unset !important; float: unset !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#layout-left.with-right-side\",\"action\":[\"style\",\"width: 100% !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".top-ad-space\",\"action\":[\"style\",\"min-height: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".site__wrapper\",\"action\":[\"style\",\"margin-top: 0.5em !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body.home #section-0 article:nth-child(1), body.category #om_commercialpostlisting-1 article:nth-child(1)\",\"action\":[\"style\",\"margin-bottom: unset !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#headermob\",\"action\":[\"style\",\"position: static !important\"],\"cssable\":true}","{\"selector\":\"#show_merkki\",\"action\":[\"style\",\"margin-top: 2em !important\"],\"cssable\":true}","{\"selector\":\".mainbody.extended\",\"action\":[\"style\",\"margin-top: 2em !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"100%\\\"] * div[class^=\\\"ThreadCardFooter__CardFooter\\\"] > div[class^=\\\"ThreadCardFooter__ColumnContainer\\\"]\",\"action\":[\"style\",\"padding-right: 15px !important\"],\"cssable\":true}","{\"selector\":\"div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"50%\\\"] > div[class^=\\\"ThreadGridItemWrapper__CardWrapper\\\"]\",\"action\":[\"style\",\"padding-left: 0px !important\"],\"cssable\":true}","{\"selector\":\"div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"50%\\\"]\",\"action\":[\"style\",\"width:100% !important\"],\"cssable\":true}","{\"selector\":\"div[width=\\\"100%\\\"] + [width=\\\"50%\\\"] + div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"50%\\\"] * div[class^=\\\"ThreadCardFooter__CardFooter\\\"] > div[class^=\\\"ThreadCardFooter__ColumnContainer\\\"]\",\"action\":[\"style\",\"padding-right: 15px !important\"],\"cssable\":true}","{\"selector\":\"div[width=\\\"100%\\\"] + div[width=\\\"50%\\\"] + div[width=\\\"50%\\\"] + div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"50%\\\"] > div\",\"action\":[\"style\",\"border-right: none !important; border-left: 1px solid lightgray !important\"],\"cssable\":true}","{\"selector\":\"div[width=\\\"100%\\\"] + div[width=\\\"50%\\\"] + div[width=\\\"50%\\\"] + div[width=\\\"50%\\\"] > div[class^=\\\"ThreadGridItemWrapper__CardWrapper\\\"] > div\",\"action\":[\"style\",\"padding-left: 15px !important\"],\"cssable\":true}","{\"selector\":\"div[width=\\\"50%\\\"] + div[width=\\\"50%\\\"] + [width=\\\"50%\\\"] + div[class^=\\\"ThreadGridItemWrapper__CardCol\\\"][width=\\\"50%\\\"] * div[class^=\\\"ThreadCardFooter__CardFooter\\\"] > div[class^=\\\"ThreadCardFooter__ColumnContainer\\\"]\",\"action\":[\"style\",\"padding-right: 15px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#head\",\"action\":[\"style\",\"margin-bottom: 2px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#tik_fixed.with-ebanner\",\"action\":[\"style\",\"top: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".featured-row-small\",\"action\":[\"style\",\"background-color: white !important\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["afterdawn.com",0],["download.fi",0],["edukas.fi",0],["fin.afterdawn.com",1],["golfpiste.com",2],["kodinkoneopas.com",3],["puhelinvertailu.com",4],["etn.fi",5],["finder.fi",6],["finnkino.fi",7],["hardware.fi",8],["ilkkapohjalainen.fi",9],["kaksplus.fi",10],["mobiili.fi",11],["www.suomi24.fi",12],["telsu.fi",13],["tiketti.fi",14],["mvlehti.net",15]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
