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

// spa-0

const toImport = [[9650390,"#Publi300600x"],[5320165,"#audimaAdDesktop"],[6790444,"#bloque-publicidad-1"],[6790445,"#bloque-publicidad-2"],[6790452,"#bloque-publicidad-9"],[3282364,"#bloque-publicidad-campania"],[7267738,"#noticias-publicidad-1,#noticias-publicidad-2,#noticias-publicidad-3,#noticias-publicidad-4,#noticias-publicidad-5,#noticias-publicidad-6"],[3098900,"#publicolumna"],[7903619,".PubliDereFlo"],[10771085,".PubliIzquiFlo"],[15613456,".PublicidadArriba"],[9206618,".ad-cabecera"],[12426477,".banner-publicidad"],[2649912,".cnt-publi"],[3521671,".contenedorAdcentrado"],[537096,".content_gpt_caja1_ads,.content_gpt_caja2_ads"],[13322012,".edi-advertising"],[3618750,".publi300x250-sidebar"],[3737914,".publi300x600-sidebard"],[14112049,".publi_MPU"],[1302894,".publi_space"],[6535741,".publicidad-pie"],[7467290,".publicidad_cabecera,.publicidad-cabecera"],[6537288,".publicidad_dfp"],[1299679,".publicolumna"],[11563772,".ue-c-ad"],[5889637,".voc-advertising"],[8995092,".voc-article--sponsored"],[911246,".voc-sponsored"],[5183765,"#PubMiddle1,#PubMiddle2"],[14812770,"#PubRight"],[15697014,"#PubTop1"],[15697015,"#PubTop2"],[15693642,"#PubliFixedLeft"],[7006884,"#RobaPagina"],[9941659,"#adGgV160"],[3967628,"#ad_250x300"],[384093,"#adsforsearchGrid"],[10336536,"#adsforsearch_content"],[8964500,"#afsposicion1,#afsposicion2"],[10042057,"#contenedor_pub_superior"],[4649131,"#content-ads-top"],[14910255,"#derpub"],[10010025,"#eplAdDivlateralder"],[10010030,"#eplAdDivlateralizq"],[10022953,"#eplAdDivtopbanner"],[6208943,"#fix_publicidad_inferior"],[386744,"#gAddTop"],[10035992,"#google-ad2"],[9176401,"#googleads_dr"],[7371415,"#oasTOP"],[2069486,"#posicion-publicidad-superior"],[530418,"#pub_superior_left"],[3654055,"#pubinf"],[1182166,"#publiLink"],[11979950,"#publicidad-top"],[2310775,"#publicidadMovil"],[2316875,"#publicidadTablet"],[12323034,"#publicidad_header"],[12924468,"#publicidad_inferior"],[3432928,"#publicidad_lateral_inferior"],[14394768,"#publicidad_lateral_medio"],[3433145,"#publicidad_lateral_superior"],[2328039,"#publicidad_subir"],[12931195,"#publicidad_superior"],[3088767,"#publiheader"],[7747326,"#publitop"],[16011951,"#slider-oferplan"],[2377705,"#sp-top-ads"],[4680510,"#sponsored-container"],[1155495,"#texto_publicidad"],[15921367,"#titulo-publicidad"],[7845721,".Adboost300x250"],[7845716,".Adboost300x600"],[360552,".PublicidadCabecera"],[3160441,".RobaPagina"],[13810033,".WIDGET-Publicidad"],[177841,".a_pub"],[11718106,".ad-300x250-solo"],[498276,".ad-tl2b"],[12283726,".ad_728_90_page"],[9221985,".ad_dfp_estandar"],[10679536,".adcontainer-portlet"],[10172512,".adsCon"],[10174460,".adsEpi"],[772300,".adsEpiItem"],[172080,".adsIndex"],[13828665,".adsSide"],[5261817,".ads_160x600"],[718626,".ads_960x90"],[762600,".adsderecha"],[16163176,".adsforsearchGrid"],[12064213,".adsforsearch_roba"],[16688814,".adsmovie"],[4106151,".advertisingLeft"],[7854813,".app-container > .questions-container-banner"],[16377221,".bg-ad-left"],[4383284,".bg-ad-right"],[728114,".bl_publi_top"],[8963663,".block-dfp-midcentral_home"],[7027398,".block-dfp-roba_pagina_top_home"],[5027956,".bloco-anuncios"],[5250800,".bloco-anuncios__banner"],[10981523,".bloco-anuncios__publicidade"],[1513641,".blog-publi"],[15508381,".bloquepubli"],[1025072,".borde_publi"],[2088607,".c_anun_pub"],[15271226,".caja_cuponisimo_slider200"],[11328683,".cnt-pub"],[13209168,".cnt-publicidad"],[3470397,".cont_mer_publicidades"],[883590,".cont_publicidad"],[12496734,".container-ads"],[9062325,".containerOas"],[2845036,".contenedor_superior_publi"],[9206798,".contpubliSuper"],[2697354,".des-adv"],[3455319,".dfp-queue"],[3440235,".dfpbanners"],[12306380,".digo_ads"],[1669839,".div_publicidad"],[1433462,".div_publicidades"],[14334031,".envoltorio_publi"],[16288905,".ep-pub"],[1819156,".espacioPublicitario"],[6405644,".find_bar_publicidades"],[2693861,".flex__publi"],[6040862,".header-adds"],[304881,".mclics"],[11392414,".mod-ad-top"],[5504341,".mod-roba"],[12926727,".modPublicidad"],[7221135,".myml-menu-navigation > .container-banner,.myml-menu-navigation > .purchases-banner"],[13316976,".offer-add"],[2782155,".pane-publicidad"],[4421432,".pane-publicidades"],[14654941,".patrocinio"],[6707606,".producto-doble-publi"],[555080,".promocion_libre"],[14625248,".pu300"],[16405499,".pub-300x250"],[16405623,".pub-300x600"],[16584214,".pub-950x100"],[14670378,".pub-h"],[14064334,".pub160x600,.pub468x80"],[14058573,".pub300x250"],[14060490,".pub728x90"],[1806885,".pub950"],[14672332,".publi"],[1304578,".publi-texto"],[6941213,".publi-vertical"],[1239167,".publi300x300"],[6718441,".publiTop"],[4999175,".publi_710x176"],[5192052,".publi_flotante_push"],[938554,".publi_horizontal"],[6645515,".publi_lateral"],[6673450,".publi_mar_top"],[6724040,".publi_opinion"],[1300084,".publi_pie_2"],[10803358,".publi_skin_wrap"],[14113263,".publi_sky"],[6957424,".publi_widget_1,.publi_widget_2"],[5692203,".publicLateral"],[8686244,".publicLateralTop"],[14112357,".publicVert"],[10522220,".publicidad-1110x90"],[10522309,".publicidad-160-600"],[10522119,".publicidad-300-250,.publicidad-300x250"],[7418682,".publicidad-300-250a"],[10522188,".publicidad-728x90"],[11941151,".publicidad-728x90-Nota"],[13727359,".publicidad-bloque-centro"],[10524123,".publicidad-content"],[7481476,".publicidad-horizontal"],[6535758,".publicidad-izq"],[1281232,".publicidad-label"],[6535747,".publicidad-top"],[7471331,".publicidad-vertical"],[1293232,".publicidad1"],[1293233,".publicidad2"],[1293234,".publicidad3"],[1293235,".publicidad4"],[1293236,".publicidad5"],[1293237,".publicidad6"],[6536824,".publicidadPaga"],[6537235,".publicidad_01"],[7484599,".publicidad_especial"],[10524130,".publicidad_modulo1,.publicidad_modulo2"],[1329720,".publicidad_movil"],[1293278,".publicidad_p"],[6537285,".publicidad_pc"],[10523944,".publicidad_titulo"],[13885161,".publicidad_tras_bajada"],[10471246,".publicity-content"],[13318318,".publicity-content-google"],[6749193,".publitop"],[14115674,".pubslider"],[1891782,".rmsads"],[15054672,".roba-container"],[15966649,".robapagina"],[8426970,".robapaginas"],[12464856,".spub"],[2220028,".story-patrocinio"],[4585750,".td-g-rec-id-custom_ad_3"],[7539771,".top-add"],[1440475,".topads728"],[13646552,".txtPubli"],[7930605,".views-row-ads"],[13148698,".vip-section-advertising"],[11509554,".voc-sponsored-and-adv"],[2041594,".widget-publi"],[5021121,".widget_categorias_publi"],[8755342,".widget_text_publicidad"],[4489169,".wrap-bnr"],[13886273,"#deadblocker_dialog"],[8244716,".adblockInfo"],[5936485,".deadblocker-header-bar"],[3682222,".regular.closable"]];

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
