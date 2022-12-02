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

// nor-0

const argsList = [{"a":["{\"selector\":\"#ad-top-banner-placeholder\",\"action\":[\"style\",\"min-height: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".modal-container.open\",\"action\":[\"style\",\"padding-top: unset !important\"],\"cssable\":true}","{\"selector\":\".site-wrapper[data-state=\\\"panorama\\\"]\",\"action\":[\"style\",\"padding-top: 70px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#content\",\"action\":[\"style\",\"margin-left: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"overflow: auto !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".custom-background\",\"action\":[\"style\",\"background-image: none !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".paywall-wrapper\",\"action\":[\"style\",\"top: unset !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".paywall\",\"action\":[\"style\",\"top: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".article-container > .row > .col-12.col-xl-8\",\"action\":[\"style\",\"width: 98.1% !important; max-width: none !important; flex: none !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".product-list-row .description\",\"action\":[\"style\",\"position: static !important; word-break: break-word !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".wrapper\",\"action\":[\"style\",\"margin-top: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#paywall\",\"action\":[\"style\",\"margin-top: 0px !important\"],\"cssable\":true}","{\"selector\":\".paywall-box\",\"action\":[\"style\",\"margin-top: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".article\",\"action\":[\"style\",\"padding-bottom: 10px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".background-ad\",\"action\":[\"style\",\"min-height: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".promotion\",\"action\":[\"style\",\"top: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".auto_expandable\",\"action\":[\"style\",\"margin-top: 21px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#topbanner\",\"action\":[\"style\",\"height: 1px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".container\",\"action\":[\"style\",\"margin-top: 0 !important\"],\"cssable\":true}","{\"selector\":\".main-header\",\"action\":[\"style\",\"margin-top: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".padded.limit--tight.limit\",\"action\":[\"style\",\"padding-top: 15px !important\"],\"cssable\":true}","{\"selector\":\"div.padded--no-bottom.padded--less.padded.limit\",\"action\":[\"style\",\"padding-top: 5px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#aid-overlay\",\"action\":[\"style\",\"background: none !important; height: 0px !important; min-height: unset !important\"],\"cssable\":true}","{\"selector\":\".aid-background-blur\",\"action\":[\"style\",\"filter: none !important\"],\"cssable\":true}","{\"selector\":\"amedia-incentive\",\"action\":[\"style\",\"top: 1600px !important\"],\"cssable\":true}","{\"selector\":\"amedia-include[src*=\\\"/incentive/\\\"]\",\"action\":[\"style\",\"border: 10px !important; border-color: #CD5C5C !important; border-style: solid !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".container-newsfeed + section .c-teaser__image\",\"action\":[\"style\",\"max-height: none !important\"],\"cssable\":true}","{\"selector\":\".container-newsfeed + section .o-grid__col:not(.u-size-onethird-medium):not([data-ga-action=\\\"1\\\"])\",\"action\":[\"style\",\"height: 200px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".article-content\",\"action\":[\"style\",\"padding: 0\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#googlead-toppbanner\",\"action\":[\"style\",\"min-height: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".rightColumn\",\"action\":[\"style\",\"margin-top: 10px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".faded-content\",\"action\":[\"style\",\"max-height: none !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#content\",\"action\":[\"style\",\"margin-top: 0px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".content-marketing-ribbon\",\"action\":[\"style\",\"margin-top: 20px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"main\",\"action\":[\"style\",\"min-height: unset !important\"],\"cssable\":true}","{\"selector\":\"section[class^=\\\"GreatCanvas__smallArticles-\\\"]\",\"action\":[\"style\",\"width: 100% !important\"],\"cssable\":true}","{\"selector\":\"section[hidden] + section\",\"action\":[\"style\",\"column-count: 3 !important; width: 100% !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body:not(.broom,.lab)\",\"action\":[\"style\",\"padding-top: 70px !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".page-container\",\"action\":[\"style\",\"margin-top: 0 !important\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["no.afterdawn.com",0],["afterdawn.dk",0],["mytastednk.com",1],["mytastenor.com",1],["nakenprat.com",2],["playpilot.com",3],["tvkampen.com",4],["tvsporten.dk",4],["berlingske.dk",5],["borsen.dk",6],["bt.dk",7],["edbpriser.dk",8],["esportsmagasinet.dk",9],["information.dk",10],["journalisten.dk",11],["lydogbillede.dk",12],["lydogbilde.no",12],["mm.dk",13],["skagensavis.dk",14],["spanienidag.es",15],["mbl.is",16],["visir.is",17],["aasavis.no",18],["amta.no",18],["an.no",18],["ao.no",18],["auraavis.no",18],["austagderblad.no",18],["avisenagder.no",18],["ba.no",18],["bygdebladet.no",18],["bygdeposten.no",18],["dalane-tidende.no",18],["dt.no",18],["eikerbladet.no",18],["enebakkavis.no",18],["f-b.no",18],["finnmarkdagblad.no",18],["finnmarken.no",18],["firda.no",18],["firdaposten.no",18],["fremover.no",18],["gbnett.no",18],["gjengangeren.no",18],["glomdalen.no",18],["h-avis.no",18],["ha-halden.no",18],["hadeland.no",18],["hardanger-folkeblad.no",18],["helg.no",18],["iharstad.no",18],["indre.no",18],["jarlsbergavis.no",18],["jbl.no",18],["kv.no",18],["kvinnheringen.no",18],["laagendalsposten.no",18],["lierposten.no",18],["lofotposten.no",18],["lyngdalsavis.no",18],["merakerposten.no",18],["moss-avis.no",18],["nettavisen.no",18],["nidaros.no",18],["noblad.no",18],["nordhordland.no",18],["nordlys.no",18],["nt24.no",18],["oa.no",18],["oblad.no",18],["op.no",18],["ostlendingen.no",18],["oyene.no",18],["r-a.no",18],["rablad.no",18],["ranablad.no",18],["rb.no",18],["retten.no",18],["rha.no",18],["ringblad.no",18],["ringsaker-blad.no",18],["sa.no",18],["sandeavis.no",18],["sandnesposten.no",18],["sb.no",18],["smaalenene.no",18],["sognavis.no",18],["solabladet.no",18],["solungavisa.no",18],["strandbuen.no",18],["svelviksposten.no",18],["ta.no",18],["tb.no",18],["telen.no",18],["tk.no",18],["tvedestrandsposten.no",18],["varingen.no",18],["vestbyavis.no",18],["abcnyheter.no",19],["aftenbladet.no",20],["dn.no",21],["e24.no",22],["h-a.no",23],["lokal-avisa.no",23],["ringsakern.no",23],["stangeavisa.no",23],["kondis.no",24],["seher.no",25],["tek.no",26],["www.tv2.no",27],["vgtv.no",28]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
