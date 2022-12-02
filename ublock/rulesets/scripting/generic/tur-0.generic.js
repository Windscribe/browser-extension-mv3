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

// tur-0

const toImport = [[2112604,"#main > .wrap.cf > .reklam ~ p[style^=\"background-color:\"],#main > .wrap.cf > .reklam ~ #content > .post > p[style^=\"background-color:\"]"],[5229122,".rek-ivr,.rek-ivr ~ p[style^=\"background-color:\"]"],[2526653,".fuck-ivr,.fuck-ivr ~ p[style^=\"background-color:\"]"],[6444908,".bey-video-reklam"],[5692393,".saniye-reklam"],[16340864,".reklamcontainer"],[7629176,".yatay-reklam"],[4273438,"#reklamCodeiframe"],[586140,".sol_reklam_160x600,.sag_reklam_160x600"],[16293796,".rkm-outer"],[642179,"#otoreklam"],[14862520,".saniyereklam"],[5275696,".frontendAd"],[2345730,"#prestitial_banner"],[14690701,".rk-300"],[5062027,"#backkapat"],[6991712,"#reklamarkaplan"],[14866657,".rek_300x350"],[1475063,".ivr > a > img"],[9127766,"#video_player + #after-video"],[16220265,".rkads"],[16235989,".reklam-alani"],[10419272,".flash_aciklama"],[15033370,".telefon-reklam"],[7442791,".hizalanmis > div[class^=\"box\"] > .fra"],[8133649,".ivr-reklam"],[1933328,".reklam_a"],[199716,".watch_video > center > a[rel=\"nofollow\"] > img"],[16692412,".reklam-alt-sabit"],[16722937,".reklam-645x90"],[16719098,".reklam-300x250"],[5126606,"#PopWin"],[10334020,"#UstReklam"],[7563166,"#alt_kayan_reklam"],[4651506,"#alt_reklam"],[16005706,"#arkaplanreklam"],[11131054,"#backgroundPopup"],[15894686,"#bannerbuyuk"],[5562577,"#betreklam"],[15563371,"#kayan_reklam"],[7903131,"#kayan_reklam_sol"],[7903743,"#kayan_reklamsag"],[7903748,"#kayan_reklamsol"],[7405283,"#leftreklam1div"],[7405314,"#leftreklam2div"],[12852195,"#reklam"],[5562656,"#reklam300x250"],[5562780,"#reklam300x600"],[3289333,"#reklam_sol"],[12542182,"#reklami"],[1315300,"#reklamikapat"],[7929348,"#ReklamiKapat"],[3289739,"#reklamlar"],[12542186,"#reklamm"],[4097935,"#sagreklam"],[1488196,"#sol_kayan_reklam"],[4246890,"#solreklam"],[8372912,"#sreklam"],[13938168,"#toolbar[style*=\"opacity: 1\"][style*=\"99999\"]"],[5286746,"#top-banner"],[6332260,"#ustReklam,#ustreklam"],[7936102,"#ust_ara_reklam"],[11750781,"#ustreklamlar"],[9638235,".ad-container"],[324396,".adnet"],[12028889,".adsVideo"],[771374,".adsindirim"],[1552796,".adsortalaindirim"],[10561503,".arkaplanreklam"],[16056966,".banner300x250"],[3467632,".banner_logo_top"],[1537035,".banneralan"],[14103432,".bannerkucuk"],[10384331,".detayreklam"],[2072642,".dikeyreklam"],[9673776,".intbetads-FIX"],[3003241,".kanalustureklam"],[13703605,".ortaReklam"],[11722055,".pmt-ad"],[7097923,".reklam1"],[16218679,".reklam300"],[16243934,".reklam728x90"],[16219726,".reklamSag"],[16219801,".reklamUst"],[1430657,".reklam_300_250"],[1431432,".reklam_300x250"],[1432574,".reklam_728_90"],[16220512,".reklamlar"],[16299476,".reklamoynama"],[16309284,".reklamyatay"],[15197114,".sRightAdSpace"],[9609737,".sagReklam300x250"],[263942,".sag_reklam"],[9998052,".splash-banner"],[10001829,".splash-reklam"],[1440303,".tepebanner"],[3174682,".trgoolreklam"],[10183317,".ustOrtaSolReklam"],[2485817,".ustReklam"],[5722890,".yediyuzads"],[6013605,".yenireklam"],[12941328,".widget-advert.text-center.my-3"]];

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
