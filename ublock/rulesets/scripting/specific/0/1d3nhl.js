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

// ita-0

const argsList = [{"a":"div[id^=\"article-desk-after-header-ad_\"],\ndiv[id^=\"article-desk-before-footer-ad_\"]"},{"a":"div[style=\"width: 300px; height: 260px; margin-top: 10px;\"]"},{"a":"#nwg"},{"a":".carte-post-1"},{"a":".banner_tab380"},{"a":".bannerh,\n.mh-footer"},{"a":".wp-block-product-on-sale"},{"a":"#wn-insurance-quote-editor"},{"a":".ziobox"},{"a":"#skin_link_dx,\n#skin_link_sx,\n.skin_link_top"},{"a":"#text-31"},{"a":".hijau"},{"a":".primobanner-320,\n.widget_realty_widget,\nAMP-IMG[width=\"320\"][height=\"50\"],\nimg[height=\"300\"][width=\"250\"]"},{"a":".post-div-banner-sp-medium"},{"a":".slide-image"},{"a":"a[href*=\"//altadefinizione-4k-ita.php\"]"},{"a":"a[href*=\"//streaming-ita.php\"],\na[href*=\"/scaricare-film.php\"]"},{"a":"a[href*=\"/streaming-gratis.php\"]"},{"a":".bbtn"},{"a":"div[id^=\"tribu-\"]"},{"a":".socia-adlabel"},{"a":".guardasingle"},{"a":"#fpub-popup"},{"a":"div[style=\"width:970px; height:250px; margin:20px auto; float:left;\"]"},{"a":"a[href*=\"/scar.php\"]"},{"a":"iframe[style*=\"z-index: 2147483647\"]"},{"a":"#banner2"},{"a":".big_box"},{"a":".elementor-element-e5738ed"},{"a":".tdi_118,\n.tdi_144"},{"a":".pull-left,\n.pull-right"},{"a":".box-tva,\n.news-sponsorizzate"},{"a":"#sezpartnercommerciali,\n.partner2"},{"a":"a[href^=\"https://www.aliperme.it/\"]"},{"a":".navbar-purina-red"},{"a":".pre_footer"},{"a":".publis-bottom"},{"a":"#leader-left2"},{"a":".widget-banner-container"},{"a":"#panel-2-4-3-1,\n#panel-2-4-3-3"},{"a":".container-ads,\n.container-skin"},{"a":".banner_single_top"},{"a":"a[href^=\"https://iptv01.tw/\"]"},{"a":".hp__banner"},{"a":"a[href*=\"/HD/\"]"},{"a":".other_link2"},{"a":".guarda"},{"a":".client_logos,\n.home_sponsor,\n.inner_left_top"}];

const hostnamesMap = new Map([["aleteia.org",0],["incircolo.altervista.org",1],["anteritalia.org",2],["carteprepagate.org",3],["fidaf.org",4],["filmforlife.org",5],["fitnesspalestra.org",6],["guidaviaggi.org",7],["ilmigliore.org",8],["iovivoaroma.org",9],["lamiavitainvaligia.org",10],["mathadvantage.org",11],["nursetimes.org",12],["sslazio.org",13],["unimondo.org",14],["altadefinizione01.page",15],["filmstreaming.page",16],["piratestreaming.page",17],["altadefinizione4k.tv",[17,24]],["guardaserie.skin",18],["tribunapoliticaweb.sm",19],["gas.social",20],["ilgeniodellostreaming.to",21],["1web.tv",22],["adessoin.tv",23],["animelove.tv",25],["cataniapubblica.tv",26],["ilcaffe.tv",27],["ilsalottodelcalcio.tv",28],["jamma.tv",29],["lostrillone.tv",30],["montagna.tv",31],["msmotor.tv",32],["padovasport.tv",33],["petpassion.tv",34],["pisachannel.tv",35],["prendiporno.tv",36],["pupia.tv",37],["supertennis.tv",38],["tgtourism.tv",39],["tiburno.tv",40],["tutto.tv",41],["calcio.tw",42],["vaticannews.va",43],["ilgeniodellostreaming.vin",44],["eurostreaming.vote",45],["eurostreaming.voto",46],["umbria.webcam",47]]);

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
