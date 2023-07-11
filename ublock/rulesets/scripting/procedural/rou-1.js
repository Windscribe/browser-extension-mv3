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

// ruleset: rou-1

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = [["{\"selector\":\".post_block:has([class^=\\\"guest\\\"])\",\"tasks\":[[\"has-text\",\"Anunturi\"]]}"],["{\"selector\":\".code-block\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\".sidebar-widget\",\"tasks\":[[\"has-text\",\"/Recomandate/\"],[\"not\",{\"selector\":\"*\",\"tasks\":[[\"has-text\",\"Post\"]]}]]}"],["{\"selector\":\"div.grey-section\",\"tasks\":[[\"has-text\",\"Advertorial\"]]}"],["{\"selector\":\".t-records\",\"tasks\":[[\"has-text\",\"arderea \"]]}"],["{\"selector\":\"#sidebar > div.widget\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\".td-pb-span3\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\".textwidget\",\"tasks\":[[\"has-text\",\"PUBLICITATE\"]]}"],["{\"selector\":\".widget_text.widget\",\"tasks\":[[\"has-text\",\"eMAG\"]]}"],["{\"selector\":\".td-pb-span12\",\"tasks\":[[\"has-text\",\"Advertisement\"]]}"],["{\"selector\":\"h2\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\"section\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\".widget\",\"tasks\":[[\"has-text\",\"Reclame\"]]}"],["{\"selector\":\".container\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\".single__content\",\"tasks\":[[\"has-text\",\"Philip Morris International\"]]}"],["{\"selector\":\".mh-widget\",\"tasks\":[[\"has-text\",\"/PROMO|PARTENER/i\"]]}"],["{\"selector\":\".custom_textwidget\",\"tasks\":[[\"has-text\",\"publicitar\"]]}"],["{\"selector\":\".ContentArticle\",\"tasks\":[[\"has-text\",\" tutunului\"]]}"],["{\"selector\":\".page\",\"tasks\":[[\"has-text\",\"Philip Morris\"]]}"],["{\"selector\":\".single__container\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\".article\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\"article\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\"#custom_html-10\",\"tasks\":[[\"has-text\",\"Advertising\"]]}"],["{\"selector\":\".single__content\",\"tasks\":[[\"has-text\",\"Philip Morris România\"]]}"],["{\"selector\":\".widget_text.widget\",\"tasks\":[[\"has-text\",\"Reclame\"]]}"],["{\"selector\":\"td > center\",\"tasks\":[[\"has-text\",\"Reclama\"]]}"],["{\"selector\":\".elementor-element\",\"tasks\":[[\"has-text\",\"ad\"]]}"],["{\"selector\":\".article-body\",\"tasks\":[[\"has-text\",\"susținut de Philip Morris\"]]}"],["{\"selector\":\".special-box-pm > p\",\"tasks\":[[\"has-text\",\"Philip Morris\"]]}"],["{\"selector\":\".article-view\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}","{\"selector\":\".textlink\",\"tasks\":[[\"has-text\",\"ad\"]]}"],["{\"selector\":\".code-block\",\"tasks\":[[\"has-text\",\"PUB\"]]}"],["{\"selector\":\".widget_media_image\",\"tasks\":[[\"has\",{\"selector\":\"[href]\",\"tasks\":[[\"not\",{\"selector\":\"*\",\"tasks\":[[\"has-text\",\"[href*=\\\"litoraltv.ro\\\"]\"],[\"spath\",\":not(*:has([href*=\\\"facebook.com\\\"]))\"]]}]]}]]}"],["{\"selector\":\".widget\",\"tasks\":[[\"has-text\",\"/Publicitate|Asemanatoare/\"]]}"],["{\"selector\":\"#article\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\".widget\",\"tasks\":[[\"has-text\",\"PUBLICITATE\"]]}"],["{\"selector\":\".elementor-column\",\"tasks\":[[\"has-text\",\"PUBLICITATE\"]]}"],["{\"selector\":\".article-body\",\"tasks\":[[\"has-text\",\"Philip Morris România\"]]}"],["{\"selector\":\".widget_header\",\"tasks\":[[\"has-text\",\"/recomand/i\"]]}"],["{\"selector\":\".tdm-descr\",\"tasks\":[[\"has-text\",\"sponsor\"]]}"],["{\"selector\":\"#sidebar > .widget_text\",\"tasks\":[[\"not\",{\"selector\":\".widgettitle\",\"tasks\":[[\"has-text\",\"Horoscop\"]]}]]}"],["{\"selector\":\".ipsWidget_title.ipsType_reset\",\"tasks\":[[\"has-text\",\"Sponsor\"]]}"],["{\"selector\":\"article > div.td-post-content > p\",\"tasks\":[[\"has-text\",\"/^\\\\u00A0$/\"]]}"],["{\"selector\":\".inside-right-sidebar\",\"tasks\":[[\"has-text\",\"ads\"]]}"],["{\"selector\":\".article-category\",\"tasks\":[[\"has-text\",\"/Philip Morris|țigar/\"]]}","{\"selector\":\".article-category-featured\",\"tasks\":[[\"has-text\",\"Philip Morris\"]]}"],["{\"selector\":\".article-wrap\",\"tasks\":[[\"has-text\",\"arderea tutunului\"]]}"],["{\"selector\":\".textwidget\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"],["{\"selector\":\".widget_custom_html\",\"tasks\":[[\"has-text\",\"ad\"]]}"],["{\"selector\":\".boxstire2head\",\"tasks\":[[\"has-text\",\"Publicitate\"]]}"]];

const hostnamesMap = new Map([["forum.softpedia.com",0],["cespun.eu",1],["7media.md",2],["agora.md",3],["locals.md",4],["buzau.net",5],["agro-tv.ro",6],["agrointel.ro",7],["arhiblog.ro",8],["autolatest.ro",9],["buletindecarei.ro",10],["campinatv.ro",11],["ciutacu.ro",12],["click.ro",13],["evz.ro",13],["csid.ro",14],["ctnews.ro",15],["curier.ro",16],["dcmedical.ro",17],["dcnews.ro",18],["descopera.ro",19],["digi24.ro",20],["dilemaveche.ro",21],["evmarket.ro",22],["gandul.ro",23],["gazetavalceana.ro",24],["girlshare.ro",25],["graiulsalajului.ro",26],["hotnews.ro",27],["jurnalul.ro",28],["kudika.ro",29],["lauralaurentiu.ro",30],["litoraltv.ro",31],["lovendal.ro",32],["mediafax.ro",33],["mesageruldesibiu.ro",34],["mesagerulneamt.ro",35],["news.ro",36],["nwradu.ro",37],["presadeazi.ro",38],["ramnicuvalceaweek.ro",39],["sa-mp.ro",40],["smlive.ro",41],["stireadeazi.ro",42],["stiripesurse.ro",43],["wall-street.ro",44],["weradio.ro",45],["ziarulargesul.ro",46],["zvj.ro",47]]);

const entitiesMap = new Map(undefined);

const exceptionsMap = new Map(undefined);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap, entitiesMap, exceptionsMap });

/******************************************************************************/

})();

/******************************************************************************/
