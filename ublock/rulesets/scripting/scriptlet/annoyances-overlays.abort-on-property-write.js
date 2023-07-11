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

// ruleset: annoyances-overlays

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_abortOnPropertyWrite() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"Object.prototype.encodeJsonpScriptSrc\"]","[\"ai_front\"]","[\"adregain_wall\"]","[\"rightnow\"]","[\"document.onselectstart\"]","[\"clickIE4\"]","[\"document.oncontextmenu\"]","[\"clickIE\"]","[\"hasAdblock\"]","[\"adBlockDetected\"]","[\"nocontext\"]","[\"disableSelection\"]","[\"CheckAdLoad\"]","[\"addLink\"]","[\"_sp_\"]","[\"document.ondragstart\"]","[\"disableEnterKey\"]","[\"adMessage\"]","[\"adBlockEnabled\"]","[\"$adframe\"]","[\"XF\"]","[\"hidekeep\"]","[\"ABDSettings\"]","[\"disable_copy\"]","[\"disable_hot_keys\"]","[\"loadOutbrain\"]","[\"killCopy\"]","[\"intializemarquee\"]","[\"document.oncopy\"]","[\"document.onkeydown\"]","[\"addLinkToCopy\"]","[\"stopPrntScr\"]","[\"disable_keystrokes\"]","[\"stopSelect\"]","[\"reEnable\"]","[\"adsBlocked\"]","[\"ABD\"]","[\"ondragstart\"]","[\"ai_adb_overlay\"]","[\"ai_adb\"]","[\"initimg\"]","[\"gdpr_popin_path\"]","[\"generatePopup\"]","[\"check\"]","[\"FuckAdBlock\"]","[\"disableselect\"]","[\"onload\"]","[\"disable_ext_code\"]","[\"journeyCompilerGateway\"]","[\"document.onkeypress\"]","[\"admrlWpJsonP\"]","[\"document.onmousedown\"]","[\"document.body.oncopy\"]"];

const hostnamesMap = new Map([["spletnik.ru",0],["ptisidiastima.com",1],["medebooks.xyz",1],["re-library.com",1],["mobilereset99.com",1],["unixhow.com",2],["vsthouse.ru",2],["primpogoda.ru",2],["gitjournal.tech",2],["e360.yale.edu",3],["nerdmaldito.com",4],["files-save.com",4],["cristoiublog.ro",[4,6]],["legionprogramas.org",4],["selfstudyhistory.com",[4,16]],["planetagibi.com.br",[4,6]],["planetagibiblog.com.br",[4,6]],["chessimprover.com",[4,6]],["youmath.it",[4,51]],["7fyd.com",4],["arti-definisi-pengertian.info",[4,15]],["onna.kr",[4,6,15]],["saikai.com.br",4],["skidrowreloaded.com",5],["resourcepack.net",[5,11]],["kurazone.net",[5,11]],["epitesti.ro",[5,6]],["m4ufree.com",6],["cittadinanza.biz",6],["glistranieri.it",6],["sabishiidesu.com",[6,9]],["xiaomi4mi.com",6],["cmg24.pl",6],["jobsbotswana.info",6],["djelfa.info",6],["gordiando.com.br",6],["wader.toys",6],["tecnotutoshd.net",6],["l2gamers.cl",[6,29]],["luoghidavedere.it",6],["phoneinfo.com.br",6],["voxc.org",6],["ac-mo.com",6],["eoreuni.com",6],["tistory.com",6],["gamegame.kr",6],["jootc.com",6],["programasvirtualespc.net",6],["jobsandhan.com",6],["getwsodo.com",6],["wikibious.com",6],["mbs.jp",6],["texte.work",6],["koreanaddict.net",6],["englishlands.net",6],["fruit01.xyz",6],["clipartmax.com",6],["alltechnerd.com",6],["generationamiga.com",6],["watchmdh.to",6],["world4.eu",[6,47]],["ggulpass.com",6],["baixedetudo.net.br",6],["csid.ro",6],["savoriurbane.com",6],["ilife97.com",[6,15]],["xhardhempus.com",7],["calorielijst.nl",7],["agar.io",8],["surviv.io",9],["esercizinglese.com",9],["pelisfull.tv",9],["halotracker.com",9],["102bank.com",9],["80beyond.spacestation-online.com",9],["b4usa.com",9],["badgerandblade.com",9],["mzk.starachowice.eu",9],["gay69.stream",10],["timponline.ro",[10,11,23]],["republicadecuritiba.net",10],["dialectsarchive.com",10],["peliculas24.me",11],["techtrickseo.com",[11,23]],["randomstory.org",11],["booksmedicos.org",11],["kirannewsagency.com",11],["starsunfolded.com",11],["satcesc.com",[11,29]],["amlesson.ru",[11,32]],["hebrew4christians.com",11],["manianomikata.com",11],["iosgods.com",12],["uol.com.br",13],["elheraldo.hn",13],["tekstowo.pl",13],["warringtonguardian.co.uk",14],["tinyppt.com",[15,16]],["droidtekno.com",[15,16]],["businessemailetiquette.com",[15,16]],["newsbook.pl",[15,16]],["relet365.com",15],["empregoestagios.com",15],["elektrikmen.com",15],["barbarossaleather.com",15],["hitproversion.com",15],["lazytranslations.com",[15,16]],["jobskaro.com",15],["appd.at",15],["apk1s.com",15],["audiobookcup.com",15],["atlas-geografic.net",[15,16]],["sdewery.me",[15,16]],["projektowanie-wnetrz-online.pl",15],["hindi-gk.com",[16,23,24]],["qualityfilehosting.com",16],["openfinanza.it",16],["naaree.com",16],["gourmetscans.net",16],["bingotingo.com",16],["7misr4day.com",16],["kollyinsider.com",17],["ewrc-results.com",18],["raven-mythic.com",19],["cafesaxophone.com",20],["alisbach.com",21],["linuxslaves.com",21],["nakblogz.top",21],["juancarlosmolinos.net",22],["truyenbanquyen.com",[23,24]],["tunovelaligera.com",24],["zdravenportal.eu",24],["clujust.ro",24],["polygon.com",25],["apornstories.com",26],["cmjornal.pt",28],["aicesu.cn",28],["racevpn.com",29],["media.framu.world",29],["bloombergquint.com",30],["kpopjjang.com",31],["bigulnews.tv",31],["jpopsingles.eu",31],["skidrowcodex.net",31],["darktranslation.com",31],["hulnews.top",31],["boke112.com",31],["janvissersweer.nl",31],["adpres.ro",31],["the-masters-voice.com",31],["postcourier.com.pg",[31,37]],["privivkainfo.ru",32],["targetstudy.com",33],["mtbtutoriales.com",34],["lazyadmin.nl",35],["nakedcapitalism.com",36],["hedgeaccordingly.com",36],["nfltraderumors.co",37],["fanprojseries.com",38],["sfweekly.com",38],["magyarhang.org",39],["ryuryuko.blog90.fc2.com",40],["airfrance.co.jp",41],["fxstreet.com",42],["jeu2048.fr",44],["androidpolice.com",1],["solotrend.net",1],["tutoganga.blogspot.com",45],["hentaialtadefinizione.it",46],["wired.com",48],["citroen.pl",49],["peugeot.pl",49],["theblaze.com",50],["nbcsports.com",50],["nbcsportsedge.com",50],["ciweimao.com",52],["360doc.com",52]]);

const entitiesMap = new Map([["pelispedia",6],["mimaletamusical",6],["tabonitobrasil",6],["hdeuropix",7],["anisubindo",11],["hukmatpro",21],["theartofnakedwoman",27],["dood",43],["oploverz",43]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function abortOnPropertyWrite(
    prop = ''
) {
    if ( typeof prop !== 'string' ) { return; }
    if ( prop === '' ) { return; }
    const exceptionToken = getExceptionToken();
    let owner = window;
    for (;;) {
        const pos = prop.indexOf('.');
        if ( pos === -1 ) { break; }
        owner = owner[prop.slice(0, pos)];
        if ( owner instanceof Object === false ) { return; }
        prop = prop.slice(pos + 1);
    }
    delete owner[prop];
    Object.defineProperty(owner, prop, {
        set: function() {
            throw new ReferenceError(exceptionToken);
        }
    });
}

function getExceptionToken() {
    const token =
        String.fromCharCode(Date.now() % 26 + 97) +
        Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const oe = self.onerror;
    self.onerror = function(msg, ...args) {
        if ( typeof msg === 'string' && msg.includes(token) ) { return true; }
        if ( oe instanceof Function ) {
            return oe.call(this, msg, ...args);
        }
    }.bind();
    return token;
}

/******************************************************************************/

const hnParts = [];
try { hnParts.push(...document.location.hostname.split('.')); }
catch(ex) { }
const hnpartslen = hnParts.length;
if ( hnpartslen === 0 ) { return; }

const todoIndices = new Set();
const tonotdoIndices = [];

// Exceptions
if ( exceptionsMap.size !== 0 ) {
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = hnParts.slice(i).join('.');
        const excepted = exceptionsMap.get(hn);
        if ( excepted ) { tonotdoIndices.push(...excepted); }
    }
    exceptionsMap.clear();
}

// Hostname-based
if ( hostnamesMap.size !== 0 ) {
    const collectArgIndices = hn => {
        let argsIndices = hostnamesMap.get(hn);
        if ( argsIndices === undefined ) { return; }
        if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
        for ( const argsIndex of argsIndices ) {
            if ( tonotdoIndices.includes(argsIndex) ) { continue; }
            todoIndices.add(argsIndex);
        }
    };
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = hnParts.slice(i).join('.');
        collectArgIndices(hn);
    }
    collectArgIndices('*');
    hostnamesMap.clear();
}

// Entity-based
if ( entitiesMap.size !== 0 ) {
    const n = hnpartslen - 1;
    for ( let i = 0; i < n; i++ ) {
        for ( let j = n; j > i; j-- ) {
            const en = hnParts.slice(i,j).join('.');
            let argsIndices = entitiesMap.get(en);
            if ( argsIndices === undefined ) { continue; }
            if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
            for ( const argsIndex of argsIndices ) {
                if ( tonotdoIndices.includes(argsIndex) ) { continue; }
                todoIndices.add(argsIndex);
            }
        }
    }
    entitiesMap.clear();
}

// Apply scriplets
for ( const i of todoIndices ) {
    try { abortOnPropertyWrite(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
