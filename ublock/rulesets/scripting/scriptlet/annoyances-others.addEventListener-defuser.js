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

(function uBOL_addEventListenerDefuser() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"scroll\",\"#sticky-video\"]","[\"openFloatingPlayer\",\"FloatingPlayer\"]","[\"wheel\",\"preventDefault\"]","[\"scroll\",\"floatingPlayerEventHandler\"]","[\"resize\",\"floatingPlayerEventHandler\"]","[\"DOMContentLoaded\",\"GetCookie('prem_promo_closed')):matches-path(/\\\\/(movies|shows)\\\\/play\\\\//\"]","[\"scroll\",\"getBoundingClientRect\"]","[\"scroll\",\"window.history.pushState\"]","[\"blur\",\"counter\"]","[\"scroll\",\"return\\\"undefined\\\"!=typeof\"]","[\"scroll\",\"/function\\\\([a-z]?\\\\){return\\\"undefined\\\"/\"]","[\"contextmenu\",\"preventDefault\"]","[\"contextmenu\"]","[\"dragstart\"]","[\"copy\",\"event.dispatch.apply\"]","[\"mousedown\"]","[\"selectstart\"]","[\"contextmenu\",\"[native code]\"]","[\"copy\",\"pagelink\"]","[\"copy\",\"nocopas\"]","[\"/^(?:contextmenu|copy|cut)$/\",\"nrWrapper\"]","[\"/keydown|contextmenu/\"]","[\"copy\",\"event\"]","[\"copy\",\"bypassEventsInProxies\"]","[\"copy\",\"event.clipboardData.setData\"]","[\"/contextmenu|copy/\"]","[\"/^(?:contextmenu|copy|cut)$/\",\"preventDefault\"]","[\"/^(?:contextmenu|copy)$/\",\"event.dispatch.apply\"]","[\"/^(?:contextmenu|copy)$/\"]","[\"keydown\",\"metaKey\"]","[\"/contextmenu|selectstart/\",\"event.dispatch.apply\"]","[\"copy\",\"window.alert\"]","[\"/^key/\",\"wpccpDisable\"]","[\"contextmenu\",\"event.dispatch.apply\"]","[\"/copy|selectstart|contextmenu/\",\"preventDefault\"]","[\"/contextmenu|selectstart|dragstart|copy|cut|keydown|keyup/\",\"preventDefault\"]","[\"/keydown|cut|copy|paste/\",\"event.dispatch.apply\"]","[\"copy\",\"clipboardData\"]","[\"/contextmenu|copy|selectionchange|mousedown/\",\"native code\"]","[\"load\",\"addEvent(\"]","[\"copy\",\"addLink\"]","[\"/contextmenu|dragstart|keydown|keyup|keypress/\",\"/event\\\\.dispatch\\\\.apply|trackEvent/\"]","[\"/selectstart|dragstart|keydown/\",\"preventDefault\"]"];

const hostnamesMap = new Map([["reuters.com",0],["abczdrowie.pl",1],["dobreprogramy.pl",1],["wp.pl",1],["pudelek.pl",1],["pysznosci.pl",1],["www.wp.pl",2],["m.interia.pl",[3,4]],["monster",5],["m.lenta.ru",6],["lenta.ru",7],["vebma.com",8],["pinloker.com",8],["sekilastekno.com",8],["mein-schoener-garten.de",9],["me.fo",10],["dizipal580.com",11],["dizipal581.com",11],["dizipal582.com",11],["dizipal583.com",11],["dizipal584.com",11],["dizipal585.com",11],["dizipal586.com",11],["dizipal587.com",11],["dizipal588.com",11],["dizipal589.com",11],["dizipal590.com",11],["dizipal591.com",11],["dizipal592.com",11],["dizipal593.com",11],["dizipal594.com",11],["dizipal595.com",11],["dizipal596.com",11],["dizipal597.com",11],["dizipal598.com",11],["dizipal599.com",11],["dizipal600.com",11],["dizipal607.com",11],["dizipal608.com",11],["dizipal609.com",11],["dizipal610.com",11],["dizipal611.com",11],["dizipal612.com",11],["dizipal613.com",11],["dizipal614.com",11],["dizipal615.com",11],["dizipal616.com",11],["dizipal617.com",11],["dizipal618.com",11],["dizipal619.com",11],["dizipal620.com",11],["dizipal621.com",11],["dizipal622.com",11],["dizipal623.com",11],["dizipal624.com",11],["dizipal625.com",11],["dizipal626.com",11],["dizipal627.com",11],["dizipal628.com",11],["dizipal629.com",11],["dizipal630.com",11],["dizipal631.com",11],["dizipal632.com",11],["dizipal633.com",11],["dizipal634.com",11],["dizipal635.com",11],["dizipal636.com",11],["dizipal637.com",11],["dizipal638.com",11],["dizipal639.com",11],["dizipal640.com",11],["dizipal641.com",11],["dizipal642.com",11],["dizipal643.com",11],["dizipal644.com",11],["dizipal645.com",11],["dizipal646.com",11],["dizipal647.com",11],["dizipal648.com",11],["dizipal649.com",11],["dizipal650.com",11],["dizipal651.com",11],["dizipal652.com",11],["dizipal653.com",11],["dizipal654.com",11],["dizipal655.com",11],["dizipal656.com",11],["dizipal657.com",11],["dizipal658.com",11],["dizipal659.com",11],["dizipal660.com",11],["dizipal661.com",11],["dizipal662.com",11],["dizipal663.com",11],["dizipal664.com",11],["dizipal665.com",11],["dizipal666.com",11],["dizipal667.com",11],["dizipal668.com",11],["dizipal669.com",11],["dizipal670.com",11],["dizipal671.com",11],["dizipal672.com",11],["dizipal673.com",11],["dizipal674.com",11],["dizipal675.com",11],["dizipal676.com",11],["dizipal677.com",11],["dizipal678.com",11],["dizipal679.com",11],["dizipal680.com",11],["dizipal681.com",11],["dizipal682.com",11],["dizipal683.com",11],["dizipal684.com",11],["dizipal685.com",11],["dizipal686.com",11],["dizipal687.com",11],["dizipal688.com",11],["dizipal689.com",11],["dizipal690.com",11],["dizipal691.com",11],["dizipal692.com",11],["dizipal693.com",11],["dizipal694.com",11],["dizipal695.com",11],["dizipal696.com",11],["dizipal697.com",11],["dizipal698.com",11],["dizipal699.com",11],["dizipal700.com",11],["my.pcloud.com",11],["blisseyhusband.in",11],["kapiert.de",11],["verdragonball.online",11],["nhk.or.jp",12],["mangabtt.com",12],["careet.net",12],["contents.premium.naver.com",[12,15]],["r114.com",[12,13,16]],["app.kartra.com",12],["box-manga.com",12],["lover91.net",12],["leouve.com.br",12],["novelpia.com",12],["comico.jp",12],["tappytoon.com",12],["toonnbook.nate.com",12],["tapas.io",12],["kakaowebtoon.com",[12,13]],["lapandilladelarejilla.es",12],["lezhinus.com",12],["lezhin.com",12],["grafolio.naver.com",12],["webtoon.kakao.com",12],["page.kakao.com",[12,13]],["economia.uol.com.br",14],["123pan.com",17],["mi-faq.ru",18],["top10mais.org",19],["recantodasletras.com.br",20],["readcomiconline.li",21],["nusantararom.org",21],["estadao.com.br",22],["atribuna.com.br",22],["braziljournal.com",22],["revistapesquisa.fapesp.br",22],["migalhas.com.br",22],["tweaktown.com",23],["opovo.com.br",24],["brasilescola.uol.com.br",24],["forbes.com.br",24],["abril.com.br",24],["noticiasdlb.com",25],["melodelaa.link",26],["read.qidian.com",27],["invado.pl",27],["ogznet.com",28],["solidfile.net",29],["downloadtutorials.net",29],["moboreader.net",30],["leg.br",31],["gamefinity.id",32],["pashplus.jp",33],["digitalfernsehen.de",33],["mundodonghua.com",33],["ukrainianwall.com",34],["osomatsusan.hatenablog.com",35],["kutub3lpdf.com",35],["nullslide.com",35],["ifdreamscametrue.com",36],["cq.ru",37],["reinodekovel.com",37],["babelnovel.com",38],["cafe.daum.net",39],["ohmygirl.ml",39],["emailfake.com",40],["omgkpop.top",41],["software-on.com",42]]);

const entitiesMap = new Map([["streamtape",33],["strcloud",33]]);

const exceptionsMap = new Map([["1login.wp.pl",[1]],["pilot.wp.pl",[1]]]);

/******************************************************************************/

function addEventListenerDefuser(
    type = '',
    pattern = ''
) {
    const extraArgs = getExtraArgs(Array.from(arguments), 2);
    const safe = safeSelf();
    const reType = patternToRegex(type);
    const rePattern = patternToRegex(pattern);
    const log = shouldLog(extraArgs);
    const debug = shouldDebug(extraArgs);
    const trapEddEventListeners = ( ) => {
        const eventListenerHandler = {
            apply: function(target, thisArg, args) {
                let type, handler;
                try {
                    type = String(args[0]);
                    handler = String(args[1]);
                } catch(ex) {
                }
                const matchesType = safe.RegExp_test.call(reType, type);
                const matchesHandler = safe.RegExp_test.call(rePattern, handler);
                const matchesEither = matchesType || matchesHandler;
                const matchesBoth = matchesType && matchesHandler;
                if ( log === 1 && matchesBoth || log === 2 && matchesEither || log === 3 ) {
                    safe.uboLog(`addEventListener('${type}', ${handler})`);
                }
                if ( debug === 1 && matchesBoth || debug === 2 && matchesEither ) {
                    debugger; // jshint ignore:line
                }
                if ( matchesBoth ) { return; }
                return Reflect.apply(target, thisArg, args);
            },
            get(target, prop, receiver) {
                if ( prop === 'toString' ) {
                    return target.toString.bind(target);
                }
                return Reflect.get(target, prop, receiver);
            },
        };
        self.EventTarget.prototype.addEventListener = new Proxy(
            self.EventTarget.prototype.addEventListener,
            eventListenerHandler
        );
    };
    runAt(( ) => {
        trapEddEventListeners();
    }, extraArgs.runAt);
}

function getExtraArgs(args, offset = 0) {
    return Object.fromEntries(getExtraArgsEntries(args, offset));
}

function patternToRegex(pattern, flags = undefined) {
    if ( pattern === '' ) { return /^/; }
    const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
    if ( match !== null ) {
        return new RegExp(match[1], match[2] || flags);
    }
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
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

function shouldDebug(details) {
    if ( details instanceof Object === false ) { return false; }
    return scriptletGlobals.has('canDebug') && details.debug;
}

function shouldLog(details) {
    if ( details instanceof Object === false ) { return false; }
    return scriptletGlobals.has('canDebug') && details.log;
}

function getExtraArgsEntries(args, offset) {
    return args.slice(offset).reduce((out, v, i, a) => {
        if ( (i & 1) === 0 ) {
            const rawValue = a[i+1];
            const value = /^\d+$/.test(rawValue)
                ? parseInt(rawValue, 10)
                : rawValue;
            out.push([ a[i], value ]);
        }
        return out;
    }, []);
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
    try { addEventListenerDefuser(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
