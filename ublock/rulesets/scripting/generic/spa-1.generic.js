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

// spa-1

const toImport = [[10471246,".publicity-content"],[14112929,".publicidad"],[16613403,"#PublicidadCentro"],[2160211,"#PublicidadSuperior"],[9706553,"#Publicidade"],[9652017,"#ad-230x100-1"],[9562652,"#ad-300x40-5"],[9652021,"#ad-635x40-1"],[1139054,"#ad4"],[12930891,"#ad_publicidad"],[11686245,"#adhome"],[2864067,"#ads_top"],[10265930,"#adsense2"],[8931087,"#adsense2pos"],[9633928,"#adsensePreCuerpo"],[4617699,"#adsensepo"],[11358522,"#adv_bottom_1"],[4705165,"#adv_left_1"],[4706077,"#adv_middle"],[11670754,"#adv_middle_2"],[12697545,"#adv_position_1,#adv_position_4"],[4713117,"#adv_top_1"],[16300107,"#adv_top_right"],[12638440,"#advertising_header"],[5454657,"#anunciosGoogle"],[1936715,"#avazu_ads_slide"],[4073438,"#barraPublicidade"],[1728118,"#liBannerDireita"],[8897822,"#liPublicidadeAdsense"],[16174970,"#pmocntr2"],[12283561,"#publiEspecial"],[11979889,"#publicidad-02"],[12925029,"#publicidad-contextual"],[11979950,"#publicidad-top"],[11981160,"#publicidadTop"],[14987985,"#publicidad_button_home"],[2333781,"#publicidade-topo"],[12323477,"#publicidadeIsland"],[2333599,"#publicidade_not"],[2333129,"#publicidades_top"],[11981765,"#publicidadhead"],[12911977,"#publicidadheadernota"],[11982130,"#publicidadsky"],[12926284,"#publicidadtop_content"],[2200917,"#queTooltip"],[13796565,"#topopublicidade"],[21843,".AdsPot"],[7907332,".Publicidade"],[1936017,".PublicidadeSidebarSuperior"],[1883311,".ad-superbanner"],[12734153,".arriba-publicidad"],[1536097,".bannerBox"],[16392272,".bb-lt-adv"],[15256818,".bb-pub-120_600"],[15254901,".bb-pub-300_250"],[8918435,".ctn-advertising"],[12755542,".esp_publicidad"],[9023618,".google-ads-obj"],[14906581,".google-ads-rodape"],[7345044,".googleAdFoot"],[15496081,".hpPublicidadTop"],[16255998,".lomadee-wp-related-offers"],[6146488,".lv24hpublicidad"],[12148938,".main-ads"],[6535739,".publicidad-bg"],[6535752,".publicidad-ct"],[1312084,".publicidadMiddle"],[10524158,".publicidadSuperior"],[6537291,".publicidad_big"],[7484599,".publicidad_especial"],[6537297,".publicidad_top"],[1293284,".publicidade,.publicidades"],[13384201,".publicidade-abre_padrao"],[10523797,".publicidade-dotted"],[13920443,".publicidade_superbanner"],[1347742,".publicidadright"],[6537953,".publicidadtxt"],[2229217,".standard-ad"],[7818783,".video_ads_overdiv"]];

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
