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

(function uBOL_replaceNodeText() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"script\",\"popunder\",\"\",\"condition\",\"popunder\",\"stay\",\"1\"]","[\"script\",\"/adb/i\",\"xxx\"]","[\"script\",\"\\\"isAdBlockerEnabled\\\":true\",\"\\\"isAdBlockerEnabled\\\":false\"]","[\"script\",\"/protect_block.*?,/\"]","[\"script\",\"(isAdblock)\",\"(false)\"]","[\"script\",\"/web_hide_epik_param_in_promoted_urls.*?enabled\\\"/\",\"web_hide_epik_param_in_promoted_urls\\\":\\\"disabled\\\"\"]","[\"script\",\"/.*adConfig.*frequency_period.*/\",\"(async () => {const a=location.href;if(!a.includes(\\\"/download?link=\\\"))return;const b=new URL(a),c=b.searchParams.get(\\\"link\\\");try{location.assign(`${location.protocol}//${c}`)}catch(a){}} )();\"]","[\"script\",\"/function gtag\\\\(\\\\)\\\\{.*\\\\}/\",\"window.innerWidth = document.documentElement.clientWidth + 320\"]","[\"script\",\"/^window\\\\.location\\\\.href.*\\\\'$/\"]","[\"script\",\"/devtoolsDetector\\\\.launch\\\\(\\\\)\\\\;/\"]","[\"script\",\"/timerSeconds: \\\\d+/\",\"timerSeconds: 0\"]","[\"script\",\"/try.*finally.*?}/\"]","[\"script\",\"outboundUrl\",\"outbound\"]","[\"script\",\"/\\\\\\\"homad\\\\\\\",/\"]","[\"script\",\"/\\\\\\\"homad\\\\\\\":\\\\{\\\\\\\"state\\\\\\\":\\\\\\\"enabled\\\\\\\"\\\\}/\",\"\\\"homad\\\":{\\\"state\\\":\\\"disabled\\\"}\"]","[\"script\",\"/}\\\\$.+:/\",\"}\"]","[\"script\",\".css('display')\",\".css('opacity')\"]","[\"script\",\":visible\",\":hidden\"]","[\"script\",\"max-height\",\"width\"]","[\"script\",\"/function gtag\\\\(\\\\)\\\\{.*\\\\}/\",\"(function(){const safe={'addEventListener':document.addEventListener.bind(window),'setInterval':window.setInterval.bind(window),'setTimeout':window.setTimeout.bind(window),'clearInterval':window.clearInterval.bind(window),'clearTimeout':window.clearTimeout.bind(window),'querySelector':document.querySelector.bind(document),'querySelectorAll':document.querySelectorAll.bind(document),'scrollTo':window.scrollTo.bind(window),'log':window.console.log.bind(window),'dispatchEvent':document.dispatchEvent.bind(document)};let doIntervals,doTimeouts=true;let loaded,intervalID=false;safe.addEventListener('DOMContentLoaded',function(){safe.querySelectorAll('script:not([src])').forEach(node=>{if(node.innerText.includes('DOMContentLoaded')){node.innerText=\\\"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-20535270-2');\\\"}});if(location.href.endsWith('.html')===true){safe.dispatchEvent(new Event('scroll'));safe.scrollTo(0,document.body.scrollHeight)}loaded=true});const controller=new AbortController();const{signal}=controller;document.addEventListener=new Proxy(safe.addEventListener,{apply(target,thisArg,args){if(args[0]!=='click'){args.push({signal})};return Reflect.apply(target,thisArg,args)},get(target,thisArg,receiver){if(thisArg==='toString'){return target.toString.bind(target)}return Reflect.get(target,thisArg,receiver)}});window.setInterval=new Proxy(safe.setInterval,{apply(target,thisArg,args){if(doIntervals===true){args[0]()}args[0]=function(){};return Reflect.apply(target,thisArg,args)}});window.setTimeout=new Proxy(safe.setTimeout,{apply(target,thisArg,args){if(doTimeouts===true){args[0]()}args[0]=function(){};return Reflect.apply(target,thisArg,args)}});function clearAll(){safe.clearInterval(intervalID);doIntervals,doTimeouts=false;controller.abort();safe.querySelectorAll('a > img').forEach(node=>{node.parentNode.style='display: none !important;'});safe.querySelector('main article aside a').closest('aside').style='display: none !important;';safe.querySelector('footer a[href*=\\\"smostafa\\\" i]').closest('div').style='display: none !important;'}intervalID=safe.setInterval(function(){if(location.href.endsWith('html')===true&&loaded===true&&safe.querySelectorAll('main article a[href*=\\\"ت\\\"]').length===0){safe.scrollTo(0,0);clearAll()}else if(!location.href.endsWith('.html')&&loaded===true){clearAll()}},1)})();\"]"];

const hostnamesMap = new Map([["fullxh.com",0],["megaxh.com",0],["unlockxh4.com",0],["xhadult2.com",0],["xhadult3.com",0],["xhadult4.com",0],["xhadult5.com",0],["xhamster46.com",0],["xhday.com",0],["xhday1.com",0],["xhmoon5.com",0],["xhplanet1.com",0],["xhplanet2.com",0],["xhreal2.com",0],["xhreal3.com",0],["xhtab2.com",0],["xhvictory.com",0],["xhwebsite.com",0],["xhwebsite2.com",0],["xhwide1.com",0],["xhwide8.com",0],["investing.com",1],["games.dailymail.co.uk",2],["games.metro.us",2],["bussyhunter.com",3],["codingnepalweb.com",4],["jpvhub.com",6],["photopea.com",7],["gyanitheme.com",8],["hipsonyc.com",8],["idoitmyself.xyz",9],["blog.yurasu.xyz",10],["foodxor.com",11],["reddit.com",12],["giga.de",13],["kino.de",13],["t-online.de",14],["megaup.net",15],["smallseotools.com",[16,17]],["searchenginereports.net",18],["soft98.ir",19]]);

const entitiesMap = new Map([["hamsterix",0],["xhamster",0],["xhamster1",0],["xhamster10",0],["xhamster11",0],["xhamster12",0],["xhamster13",0],["xhamster14",0],["xhamster15",0],["xhamster16",0],["xhamster17",0],["xhamster18",0],["xhamster19",0],["xhamster20",0],["xhamster2",0],["xhamster3",0],["xhamster4",0],["xhamster5",0],["xhamster7",0],["xhamster8",0],["pinterest",5]]);

const exceptionsMap = new Map([["old.reddit.com",[12]],["forum.soft98.ir",[19]]]);

/******************************************************************************/

function replaceNodeText(
    nodeName,
    pattern,
    replacement,
    ...extraArgs
) {
    replaceNodeTextCore(nodeName, pattern, replacement, ...extraArgs);
}

function replaceNodeTextCore(
    nodeName = '',
    pattern = '',
    replacement = ''
) {
    const reNodeName = patternToRegex(nodeName, 'i');
    const rePattern = patternToRegex(pattern, 'gms');
    const extraArgs = getExtraArgs(Array.from(arguments), 3);
    const shouldLog = scriptletGlobals.has('canDebug') && extraArgs.log || 0;
    const reCondition = patternToRegex(extraArgs.condition || '', 'gms');
    const safe = safeSelf();
    const stop = (takeRecord = true) => {
        if ( takeRecord ) {
            handleMutations(observer.takeRecords());
        }
        observer.disconnect();
        if ( shouldLog !== 0 ) {
            safe.uboLog(`replace-node-text-core.fn: quitting "${pattern}" => "${replacement}"`);
        }
    };
    let sedCount = extraArgs.sedCount || 0;
    const handleNode = node => {
        const before = node.textContent;
        if ( safe.RegExp_test.call(rePattern, before) === false ) { return true; }
        if ( safe.RegExp_test.call(reCondition, before) === false ) { return true; }
        const after = pattern !== ''
            ? before.replace(rePattern, replacement)
            : replacement;
        node.textContent = after;
        if ( shouldLog !== 0 ) {
            safe.uboLog('replace-node-text-core.fn before:\n', before);
            safe.uboLog('replace-node-text-core.fn after:\n', after);
        }
        return sedCount === 0 || (sedCount -= 1) !== 0;
    };
    const handleMutations = mutations => {
        for ( const mutation of mutations ) {
            for ( const node of mutation.addedNodes ) {
                if ( reNodeName.test(node.nodeName) === false ) { continue; }
                if ( handleNode(node) ) { continue; }
                stop(false); return;
            }
        }
    };
    const observer = new MutationObserver(handleMutations);
    observer.observe(document, { childList: true, subtree: true });
    if ( document.documentElement ) {
        const treeWalker = document.createTreeWalker(
            document.documentElement,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
        );
        let count = 0;
        for (;;) {
            const node = treeWalker.nextNode();
            count += 1;
            if ( node === null ) { break; }
            if ( reNodeName.test(node.nodeName) === false ) { continue; }
            if ( handleNode(node) ) { continue; }
            stop(); break;
        }
        if ( shouldLog !== 0 ) {
            safe.uboLog(`replace-node-text-core.fn ${count} nodes present before installing mutation observer`);
        }
    }
    if ( extraArgs.stay ) { return; }
    runAt(( ) => {
        const quitAfter = extraArgs.quitAfter || 0;
        if ( quitAfter !== 0 ) {
            setTimeout(( ) => { stop(); }, quitAfter);
        } else {
            stop();
        }
    }, 'interactive');
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
    try { replaceNodeText(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
