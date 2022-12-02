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

// fra-0

const argsList = [{"a":"a[href^=\"https://cutt.us/\"]"},{"a":"#full-container > div#header-wrapper + div[class],\n.ad-listing,\n.fake-topper"},{"a":"#min_rectangle"},{"a":".sc-1p6rkuz-0.bdJKQF,\ndiv[style=\"display: block; margin-bottom: 10px;\"] > ._LaI0D"},{"a":"#banner2"},{"a":".pub-medium"},{"a":".rbanner-wrap,\n.vbanner-wrap"},{"a":"form > center > a[href*=\".php\"]"},{"a":"a[href*=\".html\"],\na[href^=\"/regarder\"]"},{"a":"a[href=\"https://fcstream.com/player.html\"] > img,\na[href^=\"http://bit.ly/\"][rel=\"nofollow\"] > img,\na[href^=\"https://fcstream.com/banniere\"]"},{"a":"#box-link-left,\n#box-link-right,\n#extruderLeft1,\n.bgTGC,\ndiv[style=\"margin-top:5px;float:auto;width:100%;height:250px;text-align:center\"]"},{"a":"#region-user-second,\n.generic-atomic"},{"a":"annonces-post-detail:has(.bg-boosted)"},{"a":"div[style*=\"height:90px;\"][style*=\"728px\"]"},{"a":"a[href^=\"http://clic.reussissonsensemble.fr/click.asp?\"]"},{"a":"body > center + #layer2"},{"a":"[style*=\"position: absolute; z-index: 99999\"]"},{"a":".widget-5"},{"a":".privacylinks"},{"a":"#gauche > iframe[width=\"300\"][height=\"250\"]"},{"a":"#bannerTopWrapper"},{"a":".ads--insertor-casper"},{"a":".pub-content"},{"a":"a[href^=\"https://href.li/\"]"},{"a":"td[align=\"left\"][colspan=\"3\"] > div[style=\"width:70%;\"]"},{"a":".publi"},{"a":".alert-warning"},{"a":"iframe[width=\"300\"][height=\"250\"],\niframe[width=\"728\"][height=\"90\"]"},{"a":"#background-promo,\n.p-sky,\n.top-pub"},{"a":".tradeDoubler"},{"a":"a[href*=\"http://www.liutilities.com/aff\"]"},{"a":".samBannerUnit"},{"a":"a[href^=\"https://ahegao.fr\"],\na[href^=\"https://drmanga.net\"]"},{"a":".pub_large"},{"a":".pubbas"},{"a":".adsl"},{"a":".top-bar"},{"a":"#pub0,\n#pubz"},{"a":".articleText > .large_rectangle"},{"a":"#ExpoPermanente"},{"a":"a[href^=\"LienExterne.asp?\"]"},{"a":"div[id^=\"sas_\"]"},{"a":"#lastBar,\n.homePub,\ndiv[style=\"overflow: hidden; width: 336px; height: 280px; margin: 0 auto;\"]"},{"a":"#lpn_pub_main,\n.blockShopping"},{"a":"#jobat_content,\n.footer--partners"},{"a":"#header_content_banner"},{"a":"a[target=\"_blank\"] > img[width=\"300\"][height=\"100\"],\na[target=\"_blank\"] > img[width=\"300\"][height=\"200\"]"},{"a":".layout-grid__banner-top,\n.subscription-prompt,\na[href^=\"/blogsecretdefense/ads/\"]"},{"a":"a[href^=\"http://www.meetmuslima.net/go/\"]"},{"a":"#imCell_259,\n#imStickyBar_imObjectButton_03,\na[href^=\"https://www.clictune.com/\"],\na[style*=\"width: 98%; height: 100%; inset:\"]"},{"a":"#smart-bann"},{"a":".headertitrelien[target=\"_blank\"]"},{"a":"#common-top-widget,\na[href^=\"http://ads.oujdacity.net/\"]"},{"a":"#footer"},{"a":"div[style=\"width:300px;height:600px;\"]"},{"a":".dynInFeed,\n.pstAd"},{"a":"#campain_bg"},{"a":".promo_texte2"},{"a":"a[href*=\"/?ad=\"]"},{"a":"#presse_citron_skin,\n#presse_citron_skin_banner,\n.plan-list"},{"a":".bloc-header-play,\n.container-pave-haut-sidebar,\n.shopping"},{"a":".mega-banner"},{"a":"#adBlockBnr,\n.adcontent,\n[class^=\"vda-\"]"},{"a":"#tplInstallNow + .install-now,\na[id][href][target][style]"},{"a":"#shadow,\n.sonicprice,\n.webrox._300x250.centered"},{"a":"a[href*=\"/affiliate-\"] > img"},{"a":".pub_ra,\na[href=\"http://www.bleuhabitat.fr/\"] > img"},{"a":"#amazonLink,\n.module.moduleBoutiqueEncart"},{"a":"#bgclicable"},{"a":"a[href^=\"http://www.rpjf.com/asp/lien.asp?\"]"},{"a":".item[style],\nbody > div + .row.align-center.section"},{"a":"[class*=\"pico-\"]"},{"a":"a[href^=\"http://www.bitdefender.fr/media/\"]"},{"a":".block_news_main_pub,\n.header_logo + div > table tr > td > a[target=\"_blank\"],\ndiv[id][onclick][style]"},{"a":".in-block,\n.wait_buffer"},{"a":"a[href*=\"?title=\"]"},{"a":"#chaussuresCarousel"},{"a":"#leader-small,\na[href*=\"/?utm_source=\"]"},{"a":".post--0"},{"a":"#partner_content,\n.pubDroite"},{"a":".pub_logo,\na[href^=\"http://www.dzsat.org/forum/rbs_banner.php?\"]"},{"a":".affichier_lien > tbody > tr + tr[class],\n.ip-warning"},{"a":"#skinlink"},{"a":"#vpnvpn"},{"a":"div[style*=\"float:right;width:300px;\"]"},{"a":"a[href=\"http://www.jeddl.org/Regarder-le-film.html\"],\na[href=\"http://www.jeddl.org/Telecharger-le-film.html\"],\na[href^=\"//www.jeddl.org/telechargement-film.php?\"]"},{"a":".adtitle"},{"a":"a.homepage_background"},{"a":".m_amazon_product_bloc"},{"a":"img[width=\"300\"][height=\"300\"],\nimg[width=\"600\"][height=\"62\"],\nimg[width=\"692\"][height=\"100\"],\nimg[width=\"692\"][height=\"85\"],\nimg[width=\"695\"][height=\"86\"],\nimg[width=\"740\"][height=\"161\"],\nimg[width=\"740\"][height=\"185\"],\nimg[width=\"800\"][height=\"150\"]"},{"a":"#titre_librairie,\n.sample-lst,\ndiv[style=\"margin-bottom:15px;\"] > table > tbody"},{"a":".bloc_evt,\ndiv[id^=\"programme-televisionorg_\"][id$=\"_ar\"].cmi_pSticky:empty"},{"a":"#pubSky,\n#pubSky2"},{"a":"a[href*=\"&pos=\"]"},{"a":"table[width=\"728\"]"},{"a":"div[style*=\"text-align: center\"][style*=\"width:250px\"]"},{"a":".liketable"},{"a":".bloc_promomiddle"},{"a":"#ads_tall"},{"a":".bnr"},{"a":".iad"},{"a":".rightside > .blocks > .dbtm > center > a[href][target=\"blank\"] > img,\n.rightside > center > a[href][target=\"blank\"] > img"},{"a":"#contenedor > div[class] > a[target=\"_blank\"],\n#plyb"},{"a":"a[href^=\"ads/\"]"},{"a":"#headbanner"},{"a":"#micontenedor > div#total"},{"a":"#adress_utiles"},{"a":"#vjs-overlayclip-container-box"},{"a":".ad-alert-wrapper"},{"a":".col-player > div[style^=\"position:relative; width:100% !important;\"]:not([class]):not([id])"},{"a":".mvic-btn > a.btn-successful,\ndiv[id^=\"gothamadblock_\"]"},{"a":".movie-aye,\na[href=\"/streaming-video.html\"]"},{"a":".megabanhome"},{"a":"#download_div2"},{"a":".series-player > #bd_sp"},{"a":"a[onclick^=\"openAuc\"]"},{"a":".video-fake"},{"a":"a[href^=\"/go.php?\"][target=\"_blank\"] > img"},{"a":"ad-host"},{"a":".block-mozaic-pub,\n.video-preroll"},{"a":".pop_parent"},{"a":"[class^=\"pub\"]"},{"a":"#pubBaniereContainer,\n#pubIlotContainer"},{"a":"#point_part"},{"a":"#bigBox"},{"a":"div[class*=\"publicite-\"]"},{"a":"a[href^=\"http://watchfomny.tv/Pop/\"]"},{"a":"a[href*=\"://out.streamcomplet.vet/\"]"},{"a":"#mobile_clic,\n.bgClick,\na[style=\"position: fixed;top: 110px;left: 0;bottom: 0;width: 50%;\"]"},{"a":"#place_holder"},{"a":"#layer1,\n#sidebar > .fstory-content[style=\"text-align:center;\"],\ncenter > .block-violet > center[style=\"font-size:12pt;color:#C420C9;\"]"},{"a":"a[href=\"/telechargement-direct.php\"] > img,\na[href=\"/telechargera.php\"] > img,\na[href^=\"http://seriestreaming.xyz/\"],\na[href^=\"http://www.seriestreaming.xyz/\"]"},{"a":"a[href^=\"https://dl-protect.info/url-premium?\"]"},{"a":"center > a[rel=\"nofollow\"],\ncenter > span > a[rel=\"nofollow\"]"},{"a":".entry > div[style=\"text-align:center;\"] > a[target=\"_blank\"] > img"},{"a":".iframe-area > .iframe-contentserie"},{"a":".affiliate"},{"a":"#horizontal-banner"},{"a":"a#lang_download[href=\"/download\"]"},{"a":"center > a[href=\"/telecharger.php\"]"}];

const hostnamesMap = new Map([["zone-telechargement1.life",0],["lesfrontaliers.lu",1],["lessentiel.lu",2],["avito.ma",3],["hitradio.ma",4],["lematin.ma",5],["souk.ma",6],["protect-link.me",7],["streaming-series.me",8],["streamonsports.me",9],["moov.mg",10],["lexpress.mu",11],["annonces.nc",12],["expresso.1fr1.net",13],["algeriephilatelie.net",14],["all-stadium.net",15],["amvtv.net",16],["analyticsinsight.net",17],["buzzporn.net",18],["centerblog.net",19],["clubpoker.net",20],["commentcamarche.net",21],["constructeurdemaison.net",22],["dailyuploads.net",23],["depannetonpc.net",24],["desdelinux.net",25],["detecteur.net",26],["developpez.net",27],["euro-2016-france.net",28],["forum-actif.net",29],["forum-vista.net",30],["hack-life.net",31],["hentaifr.net",32],["influencia.net",33],["internetparsatellite.net",34],["ipadsl.net",35],["jeretiens.net",36],["jeu.net",37],["jeune-independant.net",38],["journaldelenvironnement.net",39],["kerix.net",40],["lacoccinelle.net",41],["lafermeduweb.net",42],["laposte.net",43],["lavenir.net",44],["lefaso.net",45],["maliweb.net",46],["marianne.net",47],["meetmuslima.net",48],["mega-p2p.net",49],["otaku-attitude.net",50],["ouiounon.net",51],["oujdacity.net",52],["forum.oujdacity.net",53],["paroles.net",54],["passeportsante.net",55],["piwee.net",56],["pornojeune.net",57],["presse-algerie.net",58],["presse-citron.net",59],["programme-tv.net",60],["radio-m.net",61],["reverso.net",62],["savefrom.net",63],["slappyto.net",64],["sosvirus.net",65],["space-blogs.net",66],["techno-science.net",67],["tennisactu.net",68],["topj.net",69],["trictrac.net",70],["uploaded.net",71],["usbfix.net",72],["vakarm.net",73],["vidoza.net",74],["voirseriestreaming.net",75],["wanarun.net",76],["webactus.net",77],["zebrascrossing.net",78],["cciaf.org",79],["dzsat.org",80],["ed-protect.org",81],["freeonline.org",82],["gktorrents.org",83],["impotsurlerevenu.org",84],["jeddl.org",85],["jeux.org",86],["jeuxvideo.org",87],["marmiton.org",88],["mediaguinee.org",89],["phpsources.org",90],["programme-television.org",91],["remede.org",92],["sante-nutrition.org",93],["forum.softmaroc.org",94],["superphysique.org",95],["trackitonline.org",96],["trackitonline.ru",96],["tv5.org",97],["ustart.org",98],["vf-film.org",99],["vf-serie.org",99],["vide-greniers.org",100],["zone-telechargement1.org",101],["zustream.org",102],["ladepeche.pf",103],["classement.pro",104],["playerhd2.pw",105],["clicanoo.re",106],["sibnet.ru",107],["yggtorrent.si",108],["dpstream.site",109],["vostfr.stream",110],["zoneseries.stream",111],["realites.com.tn",112],["flashx.to",113],["flashx.tv",113],["fullstream.to",114],["hqq.to",115],["hqq.tv",115],["ninjastream.to",116],["streamonsport.to",117],["coflix.tv",118],["d8.tv",119],["e-wok.tv",120],["fulltv.tv",121],["telequebec.tv",122],["terre.tv",123],["tetesaclaques.tv",124],["ici.tou.tv",125],["watchfomny.tv",126],["streamcomplet.vet",127],["jeu.video",128],["cinemay.vip",129],["filmstreaming1.vip",130],["zone-annuaire.website",131],["zone-telechargement.work",132],["filmz.ws",133],["9divx.theproxy.ws",134],["voirfilms.ws",135],["mvideoporno.xxx",136],["videopornoinceste.xxx",137],["dl-protect.xyz",138],["zone-annuaire.xyz",139]]);

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
