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

// svn-0

const argsList = [{"a":["{\"selector\":\".js_article\",\"tasks\":[[\"if-not\",\":has(.strong)\"],[\"spath\",\" > .widgetWrap\"]]}"]},{"a":["{\"selector\":\"li.article\",\"tasks\":[[\"has-text\",\"Oglasno sporočilo\"]]}"]}];

const hostnamesMap = new Map([["siol.net",0],["monitor.si",1]]);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
