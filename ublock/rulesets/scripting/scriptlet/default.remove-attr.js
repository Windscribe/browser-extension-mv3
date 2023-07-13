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

// ruleset: default

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_removeAttr() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"style\",\"#over\"]","[\"data-ad-img|data-ad-target\",\"\",\"stay\"]","[\"checked\",\"input#chkIsAdd\"]","[\"checked\",\"#addon\"]","[\"onclick\"]","[\"href|target\",\"a[href=\\\"https://imgprime.com/view.php\\\"][target=\\\"_blank\\\"]\",\"complete\"]","[\"href\",\"a[href=\\\"https://vpn-choice.com\\\"]\"]","[\"src\",\"iframe#claimAd\"]","[\"href\",\"#opfk\"]","[\"disabled\",\"input\"]","[\"srcdoc\",\"iframe\"]","[\"onmousemove\",\"button\"]","[\"onclick\",\"button[id][onclick*=\\\".html\\\"]\"]","[\"onclick\",\"button[name=\\\"imgContinue\\\"][onclick]\"]","[\"target\",\"#continuetoimage > [href]\"]","[\"href|target\",\"#continuetoimage > [href][onclick], #overlayera > #ajax_load_indicator > #page_effect > [href][onclick]\"]","[\"target\"]","[\"href\",\"[href*=\\\"ccbill\\\"]\"]","[\"disabled\",\"button\"]","[\"onclick\",\"[onclick^=\\\"window.open\\\"]\"]","[\"onclick\",\"[onclick^=\\\"pop\\\"]\"]","[\"disabled\",\"button[id=\\\"invisibleCaptchaShortlink\\\"]\"]","[\"onmouseover|onclick|onmouseout\",\".save-btn.pull-right\"]","[\"href\",\"#clickfakeplayer\"]","[\"onclick\",\"\",\"stay\"]","[\"type\",\"input[value^=\\\"http\\\"]\"]","[\"oncontextmenu\"]","[\"class\",\"div.intAdX\"]","[\"class\",\"div[class^=\\\"img\\\"][class$=\\\"ad\\\"]\"]","[\"data-ff-code\"]","[\"data-ivad-preroll-adtag\",\"video\",\"stay\"]","[\"style\",\"ins\",\"complete\"]","[\"href\",\"a#clickfakeplayer\"]","[\"href\",\".fake_player > [href][target]\"]","[\"href\",\".link\"]","[\"href\",\".fake_player > a[href]\"]","[\"target\",\".clickbutton\"]","[\"onclick\",\".btn-success.get-link\",\"stay\"]","[\"disabled\",\".btn-primary\"]","[\"oncontextmenu\",\"body\"]","[\"data-ppcnt_ads\",\"main[onclick]\"]","[\"onClick\"]","[\"target\",\"#downloadvideo\"]","[\"href\",\"[rel^=\\\"noopener\\\"]\"]","[\"data-item\",\"a[href='']\"]","[\"href\",\"a[href][target=\\\"_blank\\\"]\"]","[\"data-ppcnt_ads|onclick\",\"#main\"]","[\"href\",\"a[href*=\\\"/ads.php\\\"][target=\\\"_blank\\\"]\"]","[\"onclick\",\"[onclick*=\\\"window.open\\\"]\"]","[\"target|href\",\"a[href^=\\\"//\\\"]\"]","[\"onclick\",\"a[href^=\\\"magnet:\\\"][onclick]\"]","[\"target\",\"#SafelinkGenerate\"]","[\"onclick\",\"a[href][onclick^=\\\"getFullStory\\\"]\"]","[\"onclick\",\".player > div[onclick]\"]","[\"onclick\",\"body\"]","[\"onclick\",\".previewhd > a\"]","[\"onclick\",\"a.thumb.mvi-cover\"]","[\"href|target\",\"a[href^=\\\"https://tipstertube.com/bookmaker/\\\"][target=\\\"_blank\\\"]\",\"stay\"]","[\"href|target|data-ipshover-target|data-ipshover|data-autolink|rel\",\"a[href^=\\\"https://thumpertalk.com/link/click/\\\"][target=\\\"_blank\\\"]\"]","[\"href\",\"#continue\"]","[\"href\",\".button[href^=\\\"javascript\\\"]\"]","[\"disabled\",\"input[id=\\\"button1\\\"][class=\\\"btn btn-primary\\\"][disabled]\"]","[\"style\",\"div[style=\\\"display: none;\\\"]\"]","[\"type\",\"[src*=\\\"SPOT\\\"]\",\"asap stay\"]","[\"class\",\"div#player\"]","[\"onclick\",\"#invisibleCaptchaShortlink\"]","[\"onclick\",\"a.btn-success.get-link\"]","[\"href|target|data-onclick\",\"a[id=\\\"dl\\\"][data-onclick^=\\\"window.open\\\"]\",\"stay\"]","[\"href\",\"a#clickfkplayer\"]","[\"onclick\",\"a[onclick^=\\\"setTimeout\\\"]\"]","[\"href\",\".mvi-cover\"]","[\"href\",\".t-out-span [href*=\\\"utm_source\\\"]\",\"stay\"]","[\"src\",\".t-out-span [src*=\\\".gif\\\"]\",\"stay\"]","[\"disabled\",\".panel-body > .text-center > button\"]","[\"href\",\"[onclick]\",\"stay\"]","[\"disabled\",\"#downloadbtn\"]","[\"onmousedown\",\".ob-dynamic-rec-link\",\"stay\"]","[\"disabled\",\"a#redirect-btn\"]","[\"onclick\",\"form > button\"]","[\"href\",\".unlock-step-link\"]","[\"href\",\"[href*=\\\"discord\\\"]\"]","[\"uk-sticky\",\"header\",\"stay\"]","[\"style\",\"body\",\"stay\"]","[\"href\",\".MediaStep\",\"stay\"]","[\"disabled\",\"button#myClickButton\"]","[\"style\",\"button#finalButton\"]","[\"onclick\",\".btn\"]","[\"href\",\"[href=\\\"/bestporn.html\\\"]\"]","[\"disabled\",\"button#getlink\"]","[\"disabled\",\"button#gotolink\"]","[\"id\",\"#div-gpt-ad-footer\"]","[\"id\",\"#div-gpt-ad-pagebottom\"]","[\"id\",\"#div-gpt-ad-relatedbottom-1\"]","[\"id\",\"#div-gpt-ad-sidebottom\"]","[\"disabled\",\".downloadbtn\"]","[\"onclick\",\"#direct_link > a[onclick]\"]","[\"disabled\",\".get-link\"]","[\"href\",\"[onclick^=\\\"pop\\\"]\"]","[\"disabled\",\"#gotolink\"]","[\"href\",\".atas > a[href*=\\\"/redirect\\\"][onclick]\"]","[\"type\",\"[type=\\\"hidden\\\"]\",\"stay\"]","[\"action\",\"[action*=\\\"multinews\\\"]\",\"stay\"]","[\"class\",\"[class=\\\"hidden\\\"]\",\"stay\"]","[\"onload\",\"[onload^=\\\"window.open\\\"]\"]","[\"onclick\",\"button[onclick^=\\\"window.open\\\"]\"]","[\"onclick\",\"a[href][onclick^=\\\"window.open\\\"]\"]","[\"onclick\",\"[type=\\\"submit\\\"]\"]","[\"class|style\",\"div[id^=\\\"los40_gpt\\\"]\"]","[\"onclick\",\"a[href][onclick^=\\\"trackOutboundLink\\\"]\"]","[\"data-woman-ex\",\"a[href][data-woman-ex]\"]","[\"data-trm-action|data-trm-category|data-trm-label\",\".trm_event\",\"stay\"]","[\"class|id\",\".breadcrumb + div\",\"asap\"]","[\"href\",\"[href*=\\\"jump\\\"]\",\"stay\"]"];

const hostnamesMap = new Map([["freeplayervideo.com",0],["nazarickol.com",0],["player-cdn.com",0],["mcloud.to",1],["dailyuploads.net",2],["userupload.net",3],["bs.to",4],["payskip.org",4],["dozarte.com",4],["goalup.live",4],["pornoborshch.com",4],["imgprime.com",5],["magnetdl.com",6],["magnetdl.org",6],["moondoge.co.in",7],["dogefaucet.com",9],["igg-games.com",10],["newscon.org",10],["22pixx.xyz",[13,14,15]],["wowescape.com",16],["games2rule.com",16],["games4king.com",16],["sexykittenporn.com",17],["errotica-archives.com",17],["mac-torrent-download.net",18],["fcc.lc",18],["apps2app.com",18],["appsmodz.com",18],["note1s.com",18],["paste1s.com",18],["shon.xyz",19],["go.fire-link.net",19],["megaurl.in",20],["megafly.in",20],["donpelis.com",20],["noweconomy.live",21],["elil.cc",22],["amyscans.com",23],["dvdgayonline.com",23],["supergoku.com",23],["streampourvous.com",23],["openloading.com",23],["thewatchseries.live",23],["dvdgayporn.com",23],["latinohentai.com",23],["hdmovie20.com",23],["vumoo.cc",23],["gum-gum-stream.com",23],["cinefunhd.com",23],["eegybest.xyz",23],["filerio.in",24],["fastconverter.net",24],["xxx-image.com",26],["1001tracklists.com",[27,28]],["opensubtitles.org",29],["desired.de",30],["forum.release-apk.com",31],["premiumstream.live",34],["verepeliculas.com",35],["newsonthegotoday.com",36],["satoshi-win.xyz",37],["promo-visits.site",38],["coinscap.info",38],["cryptowidgets.net",38],["greenenez.com",38],["insurancegold.in",38],["webfreetools.net",38],["wiki-topia.com",38],["findandfound.ga",39],["tr.link",40],["notube.net",41],["notube.cc",41],["popimed.com",43],["iseekgirls.com",44],["shrinkme.in",45],["aylink.co",46],["gitizle.vip",46],["shtms.co",46],["tio.ch",47],["ondebaixo.com",50],["ondebaixa.com",50],["ondeeubaixo.org",50],["torrentool.org",50],["egao.in",51],["hindustantimes.com",52],["xxxhardcoretube.com",53],["e-sushi.fr",54],["itsfuck.com",55],["stilltube.com",55],["hitmovies4u.com",56],["123moviefree4u.com",56],["tipstertube.com",57],["thumpertalk.com",58],["adz7short.space",59],["allwpworld.com",61],["maxstream.video",62],["veoplanet.com",63],["blogdatecnologia.net",64],["diariodecasamento.com",64],["eusaudavel.net",64],["modaestiloeafins.com",64],["portalmundocurioso.com",64],["receitasabores.com",64],["turismoeviagem.com",64],["go.mozlink.net",[65,66]],["bowfile.com",67],["av01.tv",69],["film01stream.ws",70],["firstpost.com",[71,72]],["so1.asia",73],["methodspoint.com",74],["xubster.com",75],["welt.de",76],["top1iq.com",77],["sh2rt.com",78],["sub1s.com",79],["utopiascans.com",80],["mboost.me",83],["referus.in",[84,85]],["oii.io",86],["watchanime.video",87],["adzz.in",[88,89,98]],["soranews24.com",[90,91,92,93]],["datanodes.to",94],["mega4upload.com",95],["freebrightsoft.com",96],["javchill.com",97],["proappapk.com",98],["link.idblog.eu.org",99],["multiup.eu",[100,101,102]],["multiup.org",[100,101,102]],["jockantv.com",103],["stagatvfiles.com",104],["domaha.tv",105],["xxxrip.net",105],["timestamp.fr",106],["los40.com",107],["pioneer.eu",108],["woman.excite.co.jp",109],["demae-can.com",110],["rjno1.com",111],["work.ink",112]]);

const entitiesMap = new Map([["vizcloud",1],["douploads",2],["adbull",4],["burningseries",4],["nextorrent",4],["sportlive",4],["wstream",4],["pelisplus",8],["pelispedia",[8,32,33]],["cine-calidad",8],["vinaurl",11],["filecrypt",12],["mega4up",19],["zeefiles",19],["cinetux",23],["dpstream",23],["allcalidad",23],["pelis28",23],["jetanimes",23],["anxcinema",23],["hdmovie5",23],["pelishouse",23],["hdmovie2",23],["mlwbd",25],["pelispedia24",32],["strcloud",42],["streamtape",42],["streamta",42],["strtape",42],["strtapeadblock",42],["fzm",48],["fzmovies",48],["lite-link",49],["waploaded",60],["onionplay",68],["90phut2",[81,82]]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function removeAttr(
    token = '',
    selector = '',
    behavior = ''
) {
    if ( typeof token !== 'string' ) { return; }
    if ( token === '' ) { return; }
    const tokens = token.split(/\s*\|\s*/);
    if ( selector === '' ) {
        selector = `[${tokens.join('],[')}]`;
    }
    let timer;
    const rmattr = ( ) => {
        timer = undefined;
        try {
            const nodes = document.querySelectorAll(selector);
            for ( const node of nodes ) {
                for ( const attr of tokens ) {
                    node.removeAttribute(attr);
                }
            }
        } catch(ex) {
        }
    };
    const mutationHandler = mutations => {
        if ( timer !== undefined ) { return; }
        let skip = true;
        for ( let i = 0; i < mutations.length && skip; i++ ) {
            const { type, addedNodes, removedNodes } = mutations[i];
            if ( type === 'attributes' ) { skip = false; }
            for ( let j = 0; j < addedNodes.length && skip; j++ ) {
                if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
            }
            for ( let j = 0; j < removedNodes.length && skip; j++ ) {
                if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
            }
        }
        if ( skip ) { return; }
        timer = self.requestIdleCallback(rmattr, { timeout: 17 });
    };
    const start = ( ) => {
        rmattr();
        if ( /\bstay\b/.test(behavior) === false ) { return; }
        const observer = new MutationObserver(mutationHandler);
        observer.observe(document, {
            attributes: true,
            attributeFilter: tokens,
            childList: true,
            subtree: true,
        });
    };
    runAt(( ) => {
        start();
    }, /\bcomplete\b/.test(behavior) ? 'idle' : 'interactive');
}

function runAt(fn, when) {
    const intFromReadyState = state => {
        const targets = {
            'loading': 1,
            'interactive': 2, 'end': 2, '2': 2,
            'complete': 3, 'idle': 3, '3': 3,
        };
        const tokens = Array.isArray(state) ? state : [ state ];
        for ( const token of tokens ) {
            const prop = `${token}`;
            if ( targets.hasOwnProperty(prop) === false ) { continue; }
            return targets[prop];
        }
        return 0;
    };
    const runAt = intFromReadyState(when);
    if ( intFromReadyState(document.readyState) >= runAt ) {
        fn(); return;
    }
    const onStateChange = ( ) => {
        if ( intFromReadyState(document.readyState) < runAt ) { return; }
        fn();
        safe.removeEventListener.apply(document, args);
    };
    const safe = safeSelf();
    const args = [ 'readystatechange', onStateChange, { capture: true } ];
    safe.addEventListener.apply(document, args);
}

function safeSelf() {
    if ( scriptletGlobals.has('safeSelf') ) {
        return scriptletGlobals.get('safeSelf');
    }
    const safe = {
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'log': console.log.bind(console),
        'uboLog': function(...args) {
            if ( args.length === 0 ) { return; }
            if ( `${args[0]}` === '' ) { return; }
            this.log('[uBO]', ...args);
        },
    };
    scriptletGlobals.set('safeSelf', safe);
    return safe;
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
    try { removeAttr(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
