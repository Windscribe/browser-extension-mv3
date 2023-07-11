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

(function uBOL_removeAttr() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"style\",\"html\"]","[\"style\",\"body[style^=\\\"overflow:\\\"],html[style^=\\\"overflow:\\\"]\"]","[\"style\",\"body.modal-open\"]","[\"style\",\"body[style^=\\\"overflow:\\\"]\"]","[\"onselectstart\"]","[\"oncontextmenu|onselectstart\"]","[\"oncontextmenu\"]","[\"oncopy\"]","[\"oncontextmenu|ondragstart|onselectstart\"]","[\"oncontextmenu|ondragstart|onselectstart|onkeydown\"]","[\"oncontextmenu|onselectstart|ondragstart\"]","[\"oncontextmenu|ondragstart|onkeydown|onmousedown|onselectstart\"]","[\"oncontextmenu|onselectstart|onselect|oncopy\"]","[\"oncontextmenu|onkeydown|onmousedown\"]","[\"oncontextmenu|onselectstart|ondragstart|oncopy|oncut|onpaste|onbeforecopy\"]","[\"onselectstart|ondragstart\"]","[\"oncontextmenu\",\"body\",\"complete\"]","[\"oncontextmenu|onCopy\"]","[\"oncontextmenu|onmousedown|onselectstart\"]","[\"oncontextmenu|ondragstart|onselectstart|onkeydown|onmousedown\"]","[\"oncontextmenu|onkeydown\"]","[\"onkeydown\"]","[\"ondragstart|onselectstart\"]","[\"ondrop|ondragstart\"]","[\"onselectstart|ondragstart|oncontextmenu\"]","[\"oncontextmenu|ondragstart\"]","[\"onmousemove|ondragstart|onselectstart|oncontextmenu\",\"body\"]","[\"oncontextmenu\",\"body\"]","[\"onselectstart|ondragstart|onmousedown|onkeydown|oncontextmenu\",\"body\"]","[\"oncontextmenu|onselectstart|ondragstart|onclick\"]","[\"style\",\"div#novelBoby\",\"stay\"]","[\"oncontextmenu|onMouseDown|style\"]","[\"ondragstart|oncontextmenu\"]","[\"onContextMenu\",\"body\"]","[\"onkeydown|oncontextmenu\",\"body\"]","[\"oncontextmenu|oncopy\"]","[\"oncontextmenu|onselectstart|ondragstart|oncut|oncopy\",\"div.contentContainer, div.content\",\"stay\"]","[\"oncontextmenu|onselectstart|style\",\"#body_game\"]","[\"oncontextmenu|oncopy|ontouchstart\",\"body\"]","[\"oncontextmenu|onselectstart|onselect|ondragstart|ondrag\",\"body\"]","[\"oncontextmenu|ondragstart|onselectstart\",\"body\"]","[\"oncontextmenu|onselectstart|onmousedown\",\"body\"]","[\"oncopy|oncontextmenu|onselectstart|onselect|ondragstart|ondrag|onbeforeprint|onafterprint\",\"body\"]","[\"oncontextmenu|ondragstart|ondrop|onselectstart\"]","[\"oncontextmenu|onselectstart\",\"body\"]","[\"oncontextmenu|onDragStart|onSelectStart\"]","[\"oncontextmenu|ondragstart|onselectstart|onkeydown|oncopy|oncut\"]","[\"oncopy|oncontextmenu\",\"body\"]","[\"oncontextmenu|ondragstart|oncopy|oncut\",\".select-none\",\"stay\"]","[\"oncontextmenu|ondragstart|onselectstart|onselect|oncopy|onbeforecopy|onkeydown|onunload\"]","[\"oncontextmenu|onDragStart|onselectstart\"]","[\"onselectstart|oncontextmenu\",\"body\"]","[\"oncontextmenu|onkeydown|onselectstart\",\"body\"]","[\"oncopy|oncontextmenu|oncut|onpaste\",\"input\"]","[\"oncontextmenu|oncopy|onselectstart\"]","[\"onbeforecopy|oncontextmenu|oncopy|ondragstart|onmouseup|onselect|onselectstart\"]","[\"oncontextmenu|ondragstart|onkeydown|onmousedown|onselectstart|style\",\"body\"]","[\"style\",\"body[style=\\\"user-select: none;\\\"]\",\"stay\"]","[\"oncopy|oncut|onselectstart|style|unselectable\",\"body\",\"stay\"]","[\"oncontextmenu|onselectstart|oncut|oncopy\"]","[\"oncontextmenu|ondragstart|onselect\"]","[\"onpaste\",\"#tr_mesaj > td > .text-input.validate\\\\[required\\\\]\"]","[\"oncontextmenu|onkeydown|onselectstart\"]","[\"oncontextmenu\",\"#VdoPlayerDiv\"]","[\"oncontextmenu\",\"a#download_link\",\"stay\"]","[\"oncontextmenu\",\"html\"]","[\"oncontextmenu|ondragstart|onkeydown|onmousedown|onselectstart|onselect|oncopy|onbeforecopy|onmouseup\"]","[\"onContextmenu|onMouseDown|onSelectStart\"]","[\"oncontextmenu|onmousedown|onselectstart\",\".all-lyrics\"]","[\"oncontextmenu|ondragstart|onselectstart\",\"body\",\"complete\"]","[\"oncontextmenu\",\"img[oncontextmenu=\\\"return false;\\\"]\",\"stay\"]","[\"onselectstart\",\"body\"]","[\"onclick\",\"[onclick=\\\"myFunction()\\\"]\"]"];

const hostnamesMap = new Map([["neilpatel.com",0],["press.princeton.edu",1],["hesapkurdu.com",2],["hoy.es",3],["nerdmaldito.com",4],["livetennis.it",4],["djelfa.info",4],["virpe.com",4],["seoul.cs.land.to",4],["utorrentgamesps2.blogspot.com",4],["book.zongheng.com",4],["shumilou.com",4],["virpe.cc",4],["portaleds.com",5],["j-lyric.net",5],["utaten.com",5],["as-selection.net",5],["tohkaishimpo.com",5],["iwanichi.co.jp",5],["files-save.com",6],["nulled.life",6],["liveonsat.com",6],["ligowiec.net",6],["radio5.com.pl",6],["romet.pl",6],["sat-charts.eu",6],["skionline.pl",6],["trentino.pl",6],["pcpobierz.pl",6],["animeunity.it",6],["megawypas.com",6],["meteo.org.pl",6],["banglainsider.com",6],["listatv.pl",6],["megatube.xxx",6],["elektro-plast.com.pl",6],["pluspremieres.nz",6],["sp.uta-net.com",6],["adnan-tech.com",6],["nzbstars.com",6],["nogizaka46.com",6],["suedkurier.de",6],["utamap.com",6],["hienzo.com",6],["debeste.de",6],["courseware.cemc.uwaterloo.ca",6],["sekai-kabuka.com",6],["daum.net",6],["fraudnavi.com",6],["zdravenportal.eu",6],["wasza-farma.pl",6],["wouterplanet.com",6],["goalup.live",6],["promotor-poz.kylos.pl",6],["img999.com",6],["wattpad.com",6],["articlesmania.me",6],["aksensei.com",6],["aepos.ap.gov.in",6],["mocah.org",6],["matzoo.pl",6],["dropgalaxy.com",6],["warning.or.kr",6],["ebc.com.br",7],["pandurul.ro",7],["singingdalong.blogspot.com",8],["neobux.com",8],["dba-oracle.com",8],["giromarilia.com.br",8],["northumberland-walks.co.uk",8],["foodviva.com",8],["shushan.zhangyue.net",8],["elahmad.com",8],["novelpia.com",8],["epitesti.ro",8],["uwayapply.com",8],["apornstories.com",9],["filmesonlinex.co",9],["runningnews.gr",10],["zerodot1.gitlab.io",10],["mainframegurukul.com",10],["clasicotas.org",10],["nostracasa.com.br",10],["enjoytaiwan.co.kr",10],["tercihiniyap.net",10],["gukjenews.com",10],["insurance-corporate.blogspot.com",11],["gezimanya.com",12],["quadrinhoseroticos.net",12],["cepuluh.com",13],["ke-1.com",13],["tekloggers.com",13],["theitaliantimes.it",14],["hebrew4christians.com",15],["musixmatch.com",16],["ryuryuko.blog90.fc2.com",17],["mdpr.jp",18],["japan-academy-prize.jp",18],["citpekalongan.com",19],["gembel9.xyz",19],["atribuna.com.br",20],["newsforbolly.org",21],["coinurl.net",21],["diariodoiguacu.com.br",22],["metropoliaztm.pl",23],["quotev.com",24],["nekopoi.web.id",25],["sopot.net",26],["tv-asahi.co.jp",27],["erovideoseek.com",27],["kyonyuquest.com",27],["katosatoshi.jp",27],["techoreels.com",27],["kuroko-analyze.com",27],["gats.io",27],["promotor.pl",27],["bikesell.co.kr",27],["news.dwango.jp",27],["sporizle1.pw",27],["urbharat.xyz",27],["animatedshows.to",27],["miraculous.to",27],["cdn.gamemonetize.com",27],["aztravels.net",27],["downfile.site",27],["memangbau.com",27],["trangchu.news",27],["umk.co.jp",27],["streamservicehd.click",27],["eplayer.click",27],["olacast.live",27],["kamerabudaya.com",28],["visaonoticias.com",29],["alphapolis.co.jp",30],["money-sense.club",31],["kanjukulive.com",32],["radichubu.jp",33],["texte.work",34],["railf.jp",35],["spectank.jp",35],["magnet-novels.com",36],["mhwg.org",37],["j-island.net",38],["anauk.net",39],["bonobono.com",40],["rdsong.com",40],["poplinks.idolmaster-official.jp",41],["bdb.com.pl",42],["cablegratis.online",43],["kijyomatome-ch.com",44],["globaledu.jp",44],["loveplay123.com",45],["th-world.com",46],["korona.co.jp",47],["novelism.jp",48],["myhtebooks.com",49],["pixnet.net",50],["apk1s.com",51],["foxaholic.com",52],["auth.alipay.com",53],["30edu.com.cn",54],["doc.mbalib.com",55],["perangkatguruku.com",56],["naaree.com",57],["gardenia.net",58],["c315.cn",59],["uemeds.cn",60],["pttws.ptt.gov.tr",61],["leeyiding.com",62],["veblr.com",63],["thememypc.net",64],["gakki.me",66],["tunegate.me",67],["oricon.co.jp",68],["lover93.net",69],["fantasytagtree.com",70],["selfstudys.com",71],["myfreemp3juices.cc",72]]);

const entitiesMap = new Map([["pelispedia",6],["vinaurl",21],["ask4movie",65]]);

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
