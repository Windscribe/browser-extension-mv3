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

// deu-0

const argsList = [{"a":".sponsorftr"},{"a":".stream-item,\n.stream-item-widget"},{"a":"#g-expanded,\n#g-header"},{"a":"#tvd-ad-top"},{"a":".cont-60"},{"a":".floatLeft[style=\"padding:10px;\"]"},{"a":".button.affiliate,\n.promo-box-any-banner"},{"a":".tfm-banner"},{"a":".tvg-manager-box"},{"a":"a[href^=\"https://www.tweakpc.de/rev3/www/delivery/\"]"},{"a":".chemical_sitelogo_r"},{"a":"table[style=\"background-color: none; border-top: 1px dashed; border-color: #a89058; border-left: 1px dashed; border-color: #a89058; border-right: 1px dashed; border-color: #a89058; border-bottom: 1px dashed; border-color: #a89058;\"]"},{"a":"#custom_html-107,\n#custom_html-110,\n#custom_html-77,\n#custom_html-88,\n#custom_html-95,\n#custom_html-97,\n.flexslider,\na[href^=\"https://www.amazon.\"][href*=\"tag=\"] > img"},{"a":"#shuffled-sponsored,\n#sidebar_container"},{"a":"#wrapper-banner-head"},{"a":".mh-footer"},{"a":".channel-logo-desc"},{"a":".vm-banner"},{"a":".header-right"},{"a":".vc_custom_1544363997968,\nimg[width=\"110\"]"},{"a":"#sponsor-footer"},{"a":".partners-footer"},{"a":".YouTubeDachstein,\n.YouTubeLEKI,\n.YouTubeoetz,\ndiv[class^=\"overlay-\"]"},{"a":"#skypos,\n.rcu,\n.rec"},{"a":".vip-medium-rectangle,\n.vip-teaser"},{"a":".quartermedia,\nkas[type=\"placement\"]"},{"a":"#partnerLinks"},{"a":"div[id^=\"findexp-\"]"},{"a":"#dcb1,\n#dcb2,\n#fullsizeBanner1,\n#mooTicker,\n#mooTickerContainerMobile,\n.partnerNews > a[target=\"_blank\"],\n.sb_popularleverageproducts,\n.sb_quotebox,\n.shareInFocus,\n.teaser.objectfit:has(div.anzeige),\na[href^=\"https://smartbroker.de/\"][href*=\"/?utm_\"],\na[href^=\"https://smartbroker.de/?utm_source=\"],\na[href^=\"https://www.etracker.de/ccr?\"],\na[onclick*=\"'tableAd'\"],\na[onclick*=\"'tableAd'\"] + img"},{"a":".iba-variant-test,\n.partner-links,\ndiv[data-adservice-slot],\ntr[data-component=\"MessageListAdRow\"]"},{"a":"#addmeright,\n#addmetop"},{"a":"#weekli-interstitial"},{"a":"aside[id^=\"banner\"],\ndiv[style*=\"display: block ! important\"],\ndiv[style=\"position:absolute; top:5px; left:0px; text-align:center; width:100%; max-width:1000px; height:90px; overflow:hidden;\"]"},{"a":".guj-ad-slot"},{"a":"table[width=\"738\"][height=\"90\"]"},{"a":"#woFooterBillboard"},{"a":".clicked_partner"},{"a":"#SP-commercials"},{"a":"#text-html-widget-15"},{"a":"#block-views-sponsoredcontent-block,\n#block-views-sponsoredpromo-block,\ndiv[id^=\"gWrapper-\"],\niframe[style=\"height:250px;overflow: hidden;\"]"},{"a":"#g_content_recommendation,\n#homepage_rectangle,\n#wfv4_bb2_lazyload[style=\"min-height:250px\"],\n.amazon_widget_w660,\n.mb25[style=\"min-height:261px\"],\n.news330.floatL.mr10:has(.anzeige),\n.ob_what,\n.primis_widget,\n.rutschdiv,\ndiv[align=\"center\"][style=\"min-height: 320px;\"],\ndiv[style=\"margin: 3px 0px; text-align: center; min-width: 300px; min-height: 250px;\"],\ndiv[style=\"min-width: 300px; min-height: 250px;\"],\ndiv[style=\"width:670px;height:280px;\"]"},{"a":".wf_gcsi"},{"a":"#topads"},{"a":"img[width=\"140\"][height=\"180\"]"},{"a":".block-wissen-ads,\n.node-promoted"},{"a":".code-block-13"},{"a":".client_wrapper"},{"a":".amazon-search"},{"a":".widget__image--banner"},{"a":".logo-slider"},{"a":"#outerBoxStart"},{"a":".vc_custom_1623308998554"},{"a":".sa2,\n.sa2_top"},{"a":".spielen_kopf"},{"a":"#offer"},{"a":"div[id^=\"aktue-\"]"},{"a":".zett-teaser-trio:has(.zett-teaser-trio__kicker--ad-anzeige)"},{"a":"#slot__header,\n.products-inarticle-slider--parent"},{"a":".logo_rechts_mitte"},{"a":".witz > .bewertung + .detaillink + p:last-child,\n.witz > .bewertung + p:last-child"},{"a":"#block-block-14,\n#footer-banner-frame"},{"a":".topRight300x250"},{"a":".component-code-snippet"},{"a":"#custom_html-22"},{"a":"#_mo_cti,\n._mo_recs,\n.no-baldomero,\n.publi_cabecera_270,\n.publi_mega"},{"a":"#dish-top-desktop"},{"a":"#media_image-23"},{"a":"img[height=\"600\"]"},{"a":"img[width=\"600\"]"},{"a":".support_banner_lead"},{"a":"#divi_pb_widget-3"},{"a":".buy"},{"a":"#sidebar-sponsor,\n.widget-list-sponsors"},{"a":"#sponsors-tablet,\n.sponsors-desktop"},{"a":".hirdetes"},{"a":"#nav_menu-2"},{"a":".r"},{"a":".sidebar"},{"a":"#chati_frame,\n#spezial_column,\n#wb_widget,\n.size-300x250,\n.spz_height_60"},{"a":"#BelowRectangle"},{"a":"div[class^=\"runds-werbung-\"]"},{"a":".owl-carousel"},{"a":"#custom_html-121,\n#custom_html-126,\n#custom_html-127,\n#custom_html-132,\n#custom_html-143,\n#custom_html-144,\n#custom_html-145,\n#desktop_understitial,\n#halfpage,\n#media_image-10,\n#rectangle,\n#top_0,\na[href*=\".rokkr.net/promo/\"],\na[href*=\"/hide.me/de/?friend=\"],\na[href*=\"/prf.hn/click/\"],\na[href*=\"?sca_ref=\"],\na[href^=\" https://www.bit.ly/\"],\na[href^=\"https://hide.me/de/promotion/\"],\ndiv[style=\"width:300px;height:250px\"]"},{"a":".dt"},{"a":".supporter"},{"a":".page-banner"},{"a":".bxslider,\n.partvert-right"},{"a":"a[id=\"bottombanner\"]"},{"a":".mainSponsor,\n.sportnews"},{"a":".werb"},{"a":".sponsorslider"},{"a":".qodef-e-logo > img[height=\"80\"]"},{"a":".w-header"},{"a":".add"},{"a":".slideshowck"},{"a":".divAdd_Banner"},{"a":".custom-ban-wrap"},{"a":"#header-wrapper + div[class=\"row \"],\n.ad-listing,\narticle[id^=\"post-\"]:has(.sponsored-indicator)"},{"a":".teaser--sponsored"},{"a":"aside:has(img[src*=\"/adverts/\"])"},{"a":".banPlace1,\n.banner_sidebar"},{"a":".mdhRegister-btn"},{"a":"#head_banner,\n#pis_posts_in_sidebar-6,\n#widget_sp_image-14"},{"a":"#superreplacement"},{"a":"a[href^=\"https://www.banggood.com/marketing-\"]"},{"a":"#topBanner"},{"a":"#forumbanner"},{"a":"#dnvsuperbanner"},{"a":"#adunit"},{"a":".commercialbar,\n.top_bannerbar"},{"a":"#billboard_btf_2,\n#footer-ad,\n#news-contentads,\n#sticky-superbanner,\n#ubs-banner-fallback,\n.adsbygoogle,\n.cpg_incontent1-container,\n.cpg_incontent2-container,\n.mleft-10 + .table-quotes,\n.mrec-height-prefix,\n.row.d-flex.align-items-center:has(a[href^=\"http://g.finanzen.net/allvest-fonds-home-intelligent-invest\"]),\na[href=\"#p500Werbehinweis\"],\na[href=\"http://g.finanzen.net/ubs-aktiendetail-hebel-fallback\"],\na[href^=\"http://g.finanzen.net/bs-anlegerclub\"],\na[href^=\"http://g.finanzen.net/hsbc-startseite-top-flop?id=\"],\na[href^=\"http://g.finanzen.net/premium-teaser-bnp\"],\na[href^=\"https://ad.doubleclick.net/\"],\narticle.page-content__item:has(img[alt=\"UBS\"]),\nimg[alt=\"Passende Produkte von Vontobel\"],\nimg[alt=\"Passende Produkte von der Société Générale\"]"},{"a":"#nab_container"},{"a":".field--name-dynamic-token-fieldnode-wett-tipps-4-wettanbieter-h2 + .field--name-dynamic-block-fieldnode-top-3-anbieter"},{"a":"#ai_widget-5,\n#text-6"},{"a":"._bb_1,\n._gartenjournal_billboard,\n._gartenjournal_inarticle_2,\n._gartenjournal_leaderboard_oben,\n._gartenjournal_leaderboard_unten,\n.adinj"},{"a":".atkp-container"},{"a":".pane-dpipub-rossel-imu-middle-moblile,\n.pane-dpipub-rossel-native-top,\ndiv[class^=\"pane-dpipub-\"]"},{"a":".rectangles-row"},{"a":"#page-header + br + .forabg"},{"a":"div[style^=\"width:300px;height:250px;\"]"},{"a":".content-main-box-300x250,\n.content-main-box-728x90,\n.content-right-box-300x250right"},{"a":".netpoint"},{"a":".noprint > div[style] + div[style] > script:first-child + div[style]:last-child"},{"a":".gstsk"},{"a":"td:nth-of-type(3):not(:last-of-type) table[width^=\"3\"]"},{"a":"#as2931,\n.pi-banner,\na[href^=\"https://www.fincabayano.net/\"]"},{"a":".funbox"},{"a":".code-block-12,\n.code-block-14,\n.code-block-h-250px,\n.code-block-h-300px,\ndiv[style=\"height: 300px;\"]"},{"a":"#catfad"},{"a":"#wa_join_btn,\na[href^=\"http://www.livestrip.com/FreeAccountLanding.aspx?\"]"},{"a":"#subheader"},{"a":"#Layer1,\n#Layer2"},{"a":".header-promo"},{"a":"#banners,\ndiv[style=\"float:right; width: 110px; margin-left: 15px; margin-top: 12px; margin-bottom: 15px; padding: 2px 6px; text-align: center; border: 1px solid black; background:white; line-height: 2em; color: black;\"]"},{"a":".widget_atkp_widget"},{"a":"a[href^=\"http://camgirly.net\"]"},{"a":"#centcon-side-inner"},{"a":".azk-native-responsive"},{"a":"#leaderwidget"},{"a":".googlediv"},{"a":".adb"},{"a":".amz"},{"a":".zitat > div[style=\"width:300px;\"]"},{"a":".e_adv"},{"a":"div[id^=\"modifiedwerbung_\"]"},{"a":"div[style=\"height: 280px; margin: 5px 0 5px 0;\"]"},{"a":"#ny_banner,\n#right160x600,\n.googl,\n.recommend,\n.right > .widgetbox2,\ndiv[style=\"height:90px;overflow:hidden;text-align:center;\"]"},{"a":"a[href=\"http://topne.ws/onlineoutlet\"]"},{"a":"#parcello-mo"},{"a":"#wn-insurance-quote-editor"},{"a":"#gad-sky,\n#gads-leaderboard,\n.pane-aktuelle-top-links"},{"a":".zenoLSInnerProductTableRightAmazon"},{"a":"#custom_post_widget-6"},{"a":"#premium-partners"},{"a":"div[id^=\"edit\"][style=\"padding:0px 0px 6px 0px\"] > table[id^=\"post\"][width=\"100%\"][cellspacing=\"0\"][cellpadding=\"6\"][border=\"0\"][align=\"center\"] + br + .tborder[width=\"100%\"][cellspacing=\"0\"][cellpadding=\"6\"][border=\"0\"][align=\"center\"]"},{"a":".d_695692"},{"a":"a[href^=\"http://filestore.to/premium\"]"},{"a":".Banner"},{"a":"#selfpromotionOverlay"},{"a":".d_702192"},{"a":".dl2019main,\n.top2019main"},{"a":"a[href*=\"/af.php\"]"},{"a":"a[href^=\"//fbmedia-ckl.com/\"]"},{"a":"#ni-overlay"},{"a":".d_702232"},{"a":"a[href^=\"https://lp.mydirtyhobby.com/\"]"},{"a":".d_702212"},{"a":".top_news_adv"},{"a":".fixed.bottom-0.pb-8"},{"a":".sdtv-gothaer"},{"a":"a[href^=\"https://hoerbuch.us/dll/\"],\na[href^=\"https://linksnappy.com/?ref=\"],\na[href^=\"https://www.purevpn.com/?aff=\"],\na[href^=\"https://www.purevpn.com?aff=\"]"},{"a":".tftable"},{"a":"#block-anzeige,\n.region-topad"},{"a":"a[href^=\"//plx.hammerporno.xxx/pool_link/\"]"},{"a":"#unten_anzeigen"}];

const hostnamesMap = new Map([["tsv1860.de",0],["tutonaut.de",1],["tv-huettenberg.de",2],["tvdigital.de",3],["tvg-grosssachsen.de",4],["tvinfo.de",5],["tvspielfilm.de",6],["m.tvspielfilm.de",7],["tvsportguide.de",8],["tweakpc.de",9],["typo3blogger.de",10],["ubuntu-forum.de",11],["uepo.de",12],["uhrforum.de",13],["unicum.de",14],["unterwasserwelt.de",15],["utopia.de",16],["velomotion.de",17],["verlagshaus-jaumann.de",18],["vfl.de",19],["vfl-gummersbach.de",20],["vfl-wolfsburg.de",21],["via-ferrata.de",22],["videoaktiv.de",23],["vip.de",24],["vital.de",25],["volleyball-bundesliga.de",26],["vrnerds.de",27],["wallstreet-online.de",28],["web.de",29],["gmx.net",29],["webwiki.de",30],["weekli.de",31],["weristdeinfreund.de",32],["wetter.de",33],["wetterbote.de",34],["wetteronline.de",35],["wg-gesucht.de",36],["wiesbaden.de",37],["windowspower.de",38],["windowspro.de",39],["winfuture.de",40],["winfuture-forum.de",41],["wintotal.de",42],["wirsiegen.de",43],["wissen.de",44],["wohnungswirtschaft-heute.de",45],["fussballnationalmannschaft.net",[45,113]],["wolfsrevier.de",46],["forum.worldofplayers.de",47],["wp-koenigin.de",48],["wohnidee.wunderweib.de",49],["xgadget.de",50],["xn--schne-aussicht-xpb.de",51],["xn--solitr-fua.de",52],["xn--spidersolitr-qcb.de",53],["yasni.de",54],["yoga-aktuell.de",55],["zeit.de",56],["zentrum-der-gesundheit.de",57],["zfans.de",58],["zitate-online.de",59],["zum.de",60],["zumfahren.de",61],["nordschleswiger.dk",62],["andalusien-aktuell.es",63],["mallorcazeitung.es",64],["kalender-365.eu",65],["mdz-moskau.eu",66],["quadjournal.eu",67],["silentworld.eu",68],["vanion.eu",69],["connectiv.events",70],["lounge.fm",71],["primeleague.gg",72],["uniliga.gg",73],["budapester.hu",74],["balaton-zeitung.info",75],["codecheck.info",76],["german-porno-deutsch.info",77],["hd-pornos.info",78],["pornoente.tv",78],["mazda-forum.info",79],["rundschau.info",80],["ssv-brixen.info",81],["tarnkappe.info",82],["bolzano-bozen.it",83],["broncos.it",84],["kultur.bz.it",85],["dererker.it",86],["dervinschger.it",87],["hceppan.it",88],["sbb.it",89],["nydus.org",[89,146]],["sportclub-meran.it",90],["ssvbozenhandball.it",91],["stol.it",92],["suedtiroltv.it",93],["wallis24.it",94],["volksblatt.li",95],["filmstreaming-de.life",96],["diegrenzgaenger.lu",97],["wort.lu",98],["az.com.na",99],["archzine.net",100],["aus-liebe.net",101],["belgieninfo.net",102],["chilloutzone.net",103],["chinahandys.net",104],["otr.datenkeller.net",105],["dforum.net",106],["dnv-online.net",107],["g.doubleclick.net",108],["edelsteine.net",109],["sternzeichen.net",109],["finanzen.net",110],["fupa.net",111],["fussballinfo.net",112],["gartenjournal.net",114],["gartenratgeber.net",115],["grenzecho.net",116],["hifistatement.net",117],["hstt.net",118],["italienisch-lernen-online.net",119],["kostenlosspielen.net",120],["lavendel.net",121],["mikrocontroller.net",122],["my-homo.net",123],["pesterlloyd.net",124],["pi-news.net",125],["raidrush.net",126],["raptastisch.net",127],["sexei.net",128],["sexfilmegratis.net",129],["sexvideoskostenlos.net",129],["sims-3.net",130],["staedte-info.net",131],["taucher.net",132],["breakpoint.untergrund.net",133],["usa-info.net",134],["zensiert.net",135],["polizei.news",136],["abmahnung.org",137],["anime-loads.org",138],["dejure.org",139],["fairytail-tube.org",[140,141]],["naruto-tube.org",140],["german-bash.org",142],["metropolico.org",143],["modified-shop.org",144],["n-mag.org",145],["outleter.org",147],["parcello.org",148],["travelguide-en.org",149],["tschechien-online.org",150],["zeno.org",151],["wochenblatt.pl",152],["wein.plus",153],["boerse.sx",154],["goldesel.sx",[155,156]],["blockbuster.to",[156,159]],["laden.to",[156,164]],["saugen.to",[156,166]],["blackdevils.team",157],["darkpantersclan.de.tl",158],["gload.to",160],["hd-source.to",161],["kinoger.to",162],["kinomax.to",163],["pornkinox.to",165],["xrel.to",167],["fight24.tv",168],["sportdeutschland.tv",169],["hoerbuch.us",170],["kinox-filme.work",171],["jungle.world",172],["hammerporno.xxx",173],["wildesporno.xxx",174]]);

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
