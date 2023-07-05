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

// ruleset: annoyances-others

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_removeAttr() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"style\",\".cnx-content-wrapper.cnx-float-transition\"]","[\"class\",\"#videoFloat[class^=\\\"VideoFloat_videofloat-floating__\\\"]\"]","[\"style\",\".Body--Mobile .ContentItem .RichContent--unescapable > .RichContent-inner[style^=\\\"max-height:\\\"]\"]","[\"oncontextmenu\"]","[\"disabled\",\".body-page .card-body button.btn-primary.btn-block\"]","[\"disabled\",\"#wait1button\"]","[\"disabled\",\"#gotolink\"]","[\"href\",\"a[href].unlock-step-link.check\"]","[\"style\",\".js-dailymotion\"]","[\"disabled\",\"#wcGetLink\"]","[\"style|oncontextmenu\",\"body\"]","[\"autoplay\",\"video\"]","[\"disabled\",\"button#downloadf[disabled]\"]","[\"disabled\",\"#downloadbtn\"]","[\"style|oncontextmenu\",\".body[itemprop]\"]","[\"disabled\",\"button\"]","[\"disabled\",\"#getlink\"]","[\"disabled\",\"button[onclick=\\\"fun2()\\\"]\"]","[\"disabled\",\".unlock-button\"]","[\"onclick\",\".rebrand_article_content_block > div[align=\\\"center\\\"] > a.big_img,a.resize-image\"]","[\"oncontextmenu|onselectstart|ondragstart\",\"body\"]","[\"data-contextmenu\"]","[\"oncontextmenu|onselectstart|ondragstart|onmousedown|unselectable\",\".noselect\"]","[\"oncontextmenu|onselectstart|ondragstart|onmousedown|unselectable\",\".page-content\"]","[\"onselectstart\",\"body\"]","[\"oncontextmenu|onselectstart|ondragstart|onkeydown|ondrop\",\".no-drag\"]","[\"oncontextmenu|onselectstart|ondragstart\",\".inner\"]","[\"oncontextmenu|onselectstart|ondragstart\",\"#novel_inner_wrap\"]","[\"oncontextmenu|onselectstart|ondragstart\",\"article\"]","[\"oncontextmenu|onselectstart|ondragstart\",\"#novel_area\"]","[\"oncontextmenu|onselectstart|ondragstart\",\".content\"]","[\"oncontextmenu|onselectstart|ondragstart\",\".document_img\"]","[\"oncontextmenu\",\"body\"]","[\"onselectstart|ondragstart|oncontextmenu\",\"img[class=\\\"_images\\\"]\"]","[\"onselectstart|ondragstart|oncontextmenu|onpaste|oncopy\",\"body\"]","[\"oncontextmenu|onselectstart\",\"body\"]","[\"oncopy|oncontextmenu\",\"body\"]","[\"oncontextmenu|onselectstart|onselect|oncopy|ondragstart|ondrag|onbeforeprint\",\"body\"]","[\"oncontextmenu|onkeydown|onmousedown\",\"body\"]","[\"oncontextmenu|onkeydown\",\"body\"]","[\"oncontextmenu\",\".img-container > img[oncontextmenu]\"]","[\"onselectstart|ondragstart|unselectable\",\"#rescontent\"]","[\"data-protect\",\"body[data-protect]\"]","[\"oncontextmenu|ondragstart|onkeydown|onmousedown|onselectstart\",\"body\"]","[\"onmousedown|onselectstart|ondragstart\",\"body\"]","[\"onmousedown|onselectstart|ondragstart\",\".post-body[ondragstart][onmousedown][onselectstart]\"]","[\"oncontextmenu\",\"[oncontextmenu]\"]","[\"ondragstart\",\"[ondragstart]\"]","[\"onselectstart\",\"[onselectstart]\"]","[\"onmousedown\",\"img[onmousedown]\"]","[\"oncopy|onselectstart\",\"body\"]","[\"oncopy\",\"body\"]"];

const hostnamesMap = new Map([["accuweather.com",0],["tuttosport.com",1],["zhihu.com",2],["news.tv-asahi.co.jp",3],["bstlar.com",4],["examtadka.com",5],["djxmaza.in",5],["adzz.in",6],["proappapk.com",6],["sub2unlock.com",7],["linkgenie.me",7],["xatakamovil.com",8],["teknopaid.xyz",9],["musixmatch.com",10],["bonus-tv.ru",11],["thizissam.in",12],["apkadmin.com",13],["lostfilm.pro",14],["lostfilmtv.site",14],["lostfilm.uno",14],["lostfilm.run",14],["lostfilm.today",14],["lostfilm.tv",14],["karyawan.co.id",15],["upbbom.com",15],["uppoom.com",15],["uploadmoon.com",15],["bestopbook.info",16],["sub4unlock.com",17],["rekonise.com",18],["www.ixbt.com",19],["comic.naver.com",20],["thewordcracker.com",20],["hankooki.com",20],["dbr.donga.com",20],["uwayapply.com",20],["gukjenews.com",20],["edujin.co.kr",20],["venturesquare.net",20],["spooncast.net",20],["rdsong.com",20],["slist.kr",20],["3dpchip.com",20],["lover91.net",20],["novelpia.com",[20,25]],["dragonball-tube.com",20],["onepiece-tube.com",20],["fairytail-tube.org",20],["baho.com.tr",20],["wholehk.com",20],["siyasetcafe.com",20],["webtv.dothome.co.kr",20],["outdoornews.co.kr",20],["novel.naver.com",20],["eskisehirekspres.net",20],["front.wemakeprice.com",21],["author.today",[22,23]],["yodu.org",24],["linovelib.com",24],["utorrentgamesps2.blogspot.com",24],["bomtoon.com",[26,27,28,29,30,31]],["seriesgratis.biz",32],["texture-packs.com",32],["liveworksheets.com",32],["tokyo-sports.co.jp",32],["news.dwango.jp",32],["hunterfansub.com",32],["webtoons.com",33],["tistory.com",34],["globaledu.jp",35],["mhwg.org",35],["biyografi.info",35],["seiya-saiga.com",35],["korona.co.jp",36],["bdb.com.pl",37],["ainamulyana.blogspot.com",38],["texte.work",39],["lectortmo.com",40],["quotev.com",41],["orangespotlight.com",42],["as-selection.net",43],["gembel9.xyz",43],["gembelcit.net",43],["poisonous-raspberry-fields.blogspot.com",[44,45]],["runningnews.gr",[46,47,48,49]],["7lafa.com",50],["bobfilm.online",51]]);

const entitiesMap = new Map([]);

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
