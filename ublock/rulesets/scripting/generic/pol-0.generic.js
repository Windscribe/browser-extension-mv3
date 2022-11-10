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

/// name css-generic

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssGenericImport() {

/******************************************************************************/

// pol-0

const toImport = [[2520987,"#a-d-s"],[3962514,"#a_201"],[4310965,"#a_d_billboard"],[7077782,"#ad_gora_srodek"],[12506523,"#adsense_main_lewa"],[11216729,"#adtify-widget"],[1677263,"#arlington-optin"],[13045784,"#ceneo-placeholder-ceneo-12"],[11283150,"#ceneo_slider"],[8878002,"#goback"],[13058873,"#like-us-adblock-modal"],[12033636,"#main_advertisement"],[2738877,"#middleboxrectangle"],[2325343,"#nsix_baloon"],[3109974,"#oponeoWidget"],[6701083,"#poza-gridem"],[4045175,"#seeAlsoBox"],[5550769,".BanerHPBig"],[10806867,".Reklama"],[15451763,".a-d-v"],[15455418,".ad-offers"],[162902,".ad_Handle"],[358717,".addv-container"],[10781745,".adexonModuleportel.pl"],[15042949,".adoceanGora1Wrapper"],[1834127,".boxAdvert"],[9946404,".advContainer"],[14389032,".adverstiment-box"],[10836440,".advertisemen-block"],[10828751,".advertisment-panel"],[16437047,".adviewDFPBanner"],[14687923,".appAdvContainer"],[10342959,".article_advertisement"],[12602527,".banery_750_100"],[1468125,".box.ofero24"],[15552662,".boxAdv"],[14114681,"#ceneokobieta2"],[8706132,".ceneo-products.clearfix"],[1134512,".cg2-ad"],[13788289,".cookemessagecloseico"],[3391798,".dynamicAD"],[5246464,".hide-for-small.baner-promo-euro"],[5638014,".home_ads"],[9925510,".homeadv"],[514656,".houdini"],[8912276,".jqmOverlay"],[1478676,".mod.mod_cpCommerce.small"],[13160127,".opacitybox"],[1310753,".oponeoWidget"],[3438429,".popup-premium__apla"],[16596138,".rek_kontener"],[16285810,".reklama-gora"],[1484131,".sec.ecommerce"],[152398,".tvn-advertisement"],[6873824,".zalando-ad"],[209657,".zalando-placeholder"],[6398116,".kill-adblock-container"],[8244318,".adblock-alt"],[1333873,".adblock-placeholder"],[2304751,".ban-69.row.ban"],[5465690,".scrolled.infoBlock"]];

const genericSelectorMap = self.genericSelectorMap || new Map();

if ( genericSelectorMap.size === 0 ) {
    self.genericSelectorMap = new Map(toImport);
    return;
}

for ( const toImportEntry of toImport ) {
    const existing = genericSelectorMap.get(toImportEntry[0]);
    genericSelectorMap.set(
        toImportEntry[0],
        existing === undefined
            ? toImportEntry[1]
            : `${existing},${toImportEntry[1]}`
    );
}

self.genericSelectorMap = genericSelectorMap;

/******************************************************************************/

})();

/******************************************************************************/
