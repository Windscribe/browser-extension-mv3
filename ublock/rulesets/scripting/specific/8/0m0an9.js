/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2019-present Raymond Hill

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

/// name css-specific

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssSpecific() {

/******************************************************************************/

// spa-1

const argsList = [{"a":".ad-slot,\n.rmp-ad-outstream,\n.stack__ads,\na[href^=\"http://bs.serving-sys.com/\"]"},{"a":"[align=\"right\"][width=\"348\"],\n[height=\"76\"][width=\"8\"]"},{"a":".GooglePub300_250,\n.PubGoogle300"},{"a":"#MREC2,\n#pub728x90ifrm,\n.BoxPub300x250,\n.PagInicialPub2,\n.bannerMrec,\n.comentariosPag,\n.cx-iniciativas-pub,\n[style=\"WIDTH:300px; margin-bottom:10px; TEXT-ALIGN:right\"],\n[style=\"padding: 20px 0px; text-align: center; height: 90px;\"],\n[style=\"padding:20px 0px; text-align:center; height:90px\"],\n[style=\"width: 300px; margin-bottom: 10px; text-align: right;\"],\n[style=\"width: 527px; height: 150px; float: right;\"],\n[style=\"width:527px; height:150px; float:right\"],\ntable[cellpadding=\"5\"][width=\"641\"]"},{"a":".pubTextInfo,\ndiv[id^=\"pubText_\"]"},{"a":".odigi-adlabel"},{"a":"div[id^=\"ws_widget__ad_\"]"},{"a":".t-a-pub-1,\n.t-pubbox-bb-1,\n.t-pubbox-mrec-1"},{"a":"#magazine_modules_receivenewsletter,\n.stk_666"},{"a":".pubframe"},{"a":"#adslot-side-mrec,\n#adslot-top-lead"},{"a":".theiaStickySidebar > #custom_html-2"},{"a":"#ba_avanza,\n#ba_interbanco"},{"a":".adsInfo,\n.adsLateral"},{"a":"body ~ iframe[style*=\"width:\"][style*=\"opacity:\"][style*=\"z-index:\"][style*=\"position:\"]:not([src])"},{"a":"div[class*=\"gg_ads\"]"},{"a":".enlace_descarga"},{"a":".entry-content center > a[rel=\"noopener\"] > img"},{"a":"#sticky-banner1"},{"a":".inside-header > a[target=\"blank\"] > img,\n.inside-right-sidebar > #custom_html-4"},{"a":".happy-player-beside,\n.player__happy-inside"},{"a":"a[class^=\"reserve-button\"][target=\"_blank\"] > img,\ncenter > a[class^=\"super-r-button\"] > img"},{"a":".happy-section,\ndiv[class^=\"adde_\"],\ndiv[id^=\"adde_modal-\"]"},{"a":"#content > .contentBox + center,\n#sidebarGeral > .sidebar:first-child,\nbody > center"},{"a":".DvrAbs"},{"a":"#firstClick"},{"a":".the-banner"},{"a":"center > a[target*=\"_blank\"] > img"},{"a":"#frutuante"},{"a":"td[width=\"961\"][height=\"60\"]"},{"a":"#iphone_banner"},{"a":"td[class=\"style6\"][style=\"height: 53px\"]"},{"a":".generalModal"},{"a":"a[href^=\"https://btt-pt.toldmeroc.com/\"]"},{"a":".TPlayerNv > .Button.STPb[data-tplayernv=\"Opt0\"],\na[href^=\"https://ocio.leadzutw.com/\"]"},{"a":"a[href^=\"http://www.portablemusic.mobi/\"],\np > a[href][rel=\"noopener\"][target=\"_blank\"] > img"},{"a":"#cointainerBanner300,\ndiv#banner300x250"},{"a":".ParceirosLink,\n.Publicidade728"},{"a":"iframe[width=\"220\"]"},{"a":"#superderbi"},{"a":"#capa2"},{"a":"a[href^=\"/play/\"]"},{"a":"body > .vizerNewBox.adsByVizer"},{"a":".comments-pub,\n.movies-pub"},{"a":"a[href^=\"http://www.neobux.com/\"]"},{"a":".ads-container,\n.ads-under-header,\n.editorial-ads,\ndiv[style=\"width:300px;padding:4px;margin:8px;float:left;border:0px solid #eeeeee;\"]"},{"a":".module1colAds,\ndiv[class*=\"category-secondary-ad\"]"},{"a":".ultim-adlabel + a[rel=\"nofollow\"],\ndiv[class^=\"ultim-\"]"},{"a":"a[href^=\"https://bit.ly/\"] > img"},{"a":"#adxx"},{"a":".adorshop,\ndiv[style=\"margin-top:.5em;min-height:312px\"]"},{"a":"td[height=\"630\"]"},{"a":"#adsacumulada,\n#adsalosexo,\n#adscamerasex,\n#adsempire,\n#adsmp,\n#adsoriginal,\n#adspb,\n#amigos"},{"a":".sidebar section.widget_block > a[target=\"_blank\"] > img"},{"a":".fg1 > a[target=\"_blank\"].snd"},{"a":"#videoss > section:not([class]),\n.dvcss"},{"a":"#text-19,\n.top-header-ads-mobile"},{"a":".mt_ad"},{"a":"div[class$=\"-iframe mb-20 text-center\"]"},{"a":".ad-bodyvideo"},{"a":".lst_ft_bn"},{"a":"#block-7,\n.rteam_antiadb"},{"a":"div[style^=\"width:300px;height:250px;display: inline-block;\"]"},{"a":"div[style][onclick*=\"anunciotag()\"]"},{"a":"#custom_html-2"}];

const hostnamesMap = new Map([["publico.pt",0],["record.pt",1],["rtp.pt",2],["sapo.pt",3],["kbb.sapo.pt",4],["odigital.sapo.pt",5],["pplware.sapo.pt",6],["tsf.pt",7],["xl.pt",8],["zerozero.pt",9],["forum.zwame.pt",10],["portal.zwame.pt",11],["lanacion.com.py",12],["superanimes.site",13],["pelisplus.so",14],["pdfslide.tips",15],["1v.to",16],["comando.to",17],["canaistv.top",18],["downloadcursos.top",19],["hentai-asia.top",20],["mrpiracy.top",21],["porno-japones.top",22],["animesorion.tv",23],["animespace.tv",24],["cablegratis.tv",25],["canalnet.tv",26],["comandotorrent.tv",27],["filmeshd.tv",28],["infonegocios.tv",29],["justin.tv",30],["calcular.onlinegratis.tv",31],["pobre.tv",[32,33]],["pobre.wtf",32],["seriesgato.tv",34],["televisionparatodos.tv",35],["tu.tv",36],["tudotv.tv",37],["tuporno.tv",38],["verfutebol.tv",39],["vertelevision.tv",40],["vidcorn.tv",41],["vizer.tv",42],["wareztuga.tv",43],["tvperuana.us",44],["elpais.com.uy",[45,46]],["ovaciondigital.com.uy",46],["ultimasnoticias.com.ve",47],["tabonitobrasil.video",48],["repelisplus.vip",49],["numero.wiki",50],["juegosypelis.ws",51],["revistasgratis.ws",52],["cuevana-3.wtf",53],["pelispedia-v2.wtf",54],["aztecapornohd.xxx",55],["hentaiporno.xxx",56],["morritastube.xxx",57],["pornburst.xxx",58],["pornolandia.xxx",59],["tupornogratis.xxx",60],["animesonehd.xyz",61],["clickhouse.xyz",62],["playnewserie.xyz",63],["suasaudeonline.xyz",64]]);

/******************************************************************************/

let hn;
try { hn = document.location.hostname; } catch(ex) { }
const styles = [];
while ( hn ) {
    if ( hostnamesMap.has(hn) ) {
        let argsIndices = hostnamesMap.get(hn);
        if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
        for ( const argsIndex of argsIndices ) {
            const details = argsList[argsIndex];
            if ( details.n && details.n.includes(hn) ) { continue; }
            styles.push(details.a);
        }
    }
    if ( hn === '*' ) { break; }
    const pos = hn.indexOf('.');
    if ( pos !== -1 ) {
        hn = hn.slice(pos + 1);
    } else {
        hn = '*';
    }
}

argsList.length = 0;
hostnamesMap.clear();

if ( styles.length === 0 ) { return; }

try {
    const sheet = new CSSStyleSheet();
    sheet.replace(`@layer{${styles.join(',')}{display:none!important;}}`);
    document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        sheet
    ];
} catch(ex) {
}

/******************************************************************************/

})();

/******************************************************************************/
