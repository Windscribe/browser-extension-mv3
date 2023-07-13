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

// ruleset: spa-0

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = [["{\"selector\":\".widget_media_image\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}]]}"],["{\"selector\":\".widget_metaslider_widget\",\"tasks\":[[\"has-text\",\"ESPACIO PUBLICITARIO\"]]}"],["{\"selector\":\"p\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}"],["{\"selector\":\".Block\",\"tasks\":[[\"has\",{\"selector\":\".Title_section\",\"tasks\":[[\"has-text\",\"Contenido patrocinado\"]]}]]}","{\"selector\":\".Card\",\"tasks\":[[\"has\",{\"selector\":\".Card-Section.Section\",\"tasks\":[[\"has-text\",\"Contenido patrocinado\"]]}]]}"],["{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"PUBLICIDAD\"]]}"],["{\"selector\":\".main-article-container-patr\",\"tasks\":[[\"has\",{\"selector\":\".mas-contenido\",\"tasks\":[[\"has-text\",\"Más Contenido\"]]}]]}"],["{\"selector\":\".tborder\",\"tasks\":[[\"has-text\",\"eBay.es\"]]}","{\"selector\":\".tborder\",\"tasks\":[[\"has-text\",\"elcorteingles.es\"]]}"],["{\"selector\":\".display-ads\",\"tasks\":[[\"has\",{\"selector\":\" > span\",\"tasks\":[[\"has-text\",\"Anuncio\"]]}]]}"],["{\"selector\":\"section > h3\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}"],["{\"selector\":\".mvp-widget-home-head\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}]]}"],["{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"Anuncio\"]]}"],["{\"selector\":\"div\",\"tasks\":[[\"has\",{\"selector\":\" > span\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}]]}"],["{\"selector\":\"label\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}"],["{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Publicidad\"]]}"],["{\"selector\":\".quicklink_w100\",\"tasks\":[[\"has\",{\"selector\":\".publi-tag\",\"tasks\":[[\"has-text\",\"AD\"]]}]]}"],["{\"selector\":\".col-md-2\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Promoción\"]]}]]}"],["{\"selector\":\"div\",\"tasks\":[[\"has\",{\"selector\":\" > h3\",\"tasks\":[[\"has-text\",\"CHAT PORNO X\"]]}]]}"],["{\"selector\":\"em\",\"tasks\":[[\"has-text\",\"Patrocinado:\"]]}","{\"selector\":\"strong\",\"tasks\":[[\"has-text\",\"Reclama tu crédito\"]]}"],["{\"selector\":\"#sidebar > .adpv\",\"tasks\":[[\"has-text\",\"Camiseta de la semana\"]]}"],["{\"selector\":\"#lateral\",\"tasks\":[[\"has\",{\"selector\":\"span\",\"tasks\":[[\"has-text\",\"Auspiciado por:\"]]}]]}"],["{\"selector\":\".dropdown\",\"tasks\":[[\"has\",{\"selector\":\"label\",\"tasks\":[[\"has-text\",\"VPN\"]]}]]}"]];

const hostnamesMap = new Map([["elsolnoticias.com.ar",0],["horadeopinion.com.ar",1],["impactonews.co",2],["mundo724.com",2],["elespectador.com",3],["elquindiano.com",4],["laboyanos.com",4],["eltiempo.com",5],["forochicas.com",6],["juegosdiarios.com",7],["recetasfacilescocina.com",8],["rtwnoticias.com",9],["superluchas.com",10],["univision.com",11],["valoraanalitik.com",12],["hoy.com.do",13],["yorokobu.es",14],["gamestorrents.fm",15],["videospornogratisx.net",16],["lecter.news",17],["finofilipino.org",18],["elcomercio.pe",19],["photocall.tv",20]]);

const entitiesMap = new Map(undefined);

const exceptionsMap = new Map(undefined);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap, entitiesMap, exceptionsMap });

/******************************************************************************/

})();

/******************************************************************************/
