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
/* global cloneInto */

'use strict';

// ruleset: default

/******************************************************************************/

// Important!
// Isolate from global scope

// Start of local scope
(( ) => {

/******************************************************************************/

// Start of code to inject
const uBOL_replaceNodeText = function() {

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = [["script","popunder","","condition","popunder","stay","1"],["script","popunder","p"],["script","\"isAdBlockerEnabled\":true","\"isAdBlockerEnabled\":false"],["script","/\\\"homad\\\",/"],["script","/\\\"homad\\\":\\{\\\"state\\\":\\\"enabled\\\"\\}/","\"homad\":{\"state\":\"disabled\"}"],["script","/protect_block.*?,/"],["script","(isAdblock)","(false)"],["script","/web_hide_epik_param_in_promoted_urls.*?enabled\"/","web_hide_epik_param_in_promoted_urls\":\"disabled\""],["script","/.*adConfig.*frequency_period.*/","(async () => {const a=location.href;if(!a.includes(\"/download?link=\"))return;const b=new URL(a),c=b.searchParams.get(\"link\");try{location.assign(`${location.protocol}//${c}`)}catch(a){}} )();"],["script","/^.*?(function gtag).*$/","document.documentElement.setAttribute('onreset',(function addCustomEvent(){document.addEventListener('resizecanvas',()=>{window.innerWidth=document.documentElement.clientWidth+(window.screen.width<1600?180:320)})})());document.documentElement.dispatchEvent(new CustomEvent('reset'));document.documentElement.removeAttribute('onreset');function resize(event={}){if(!event.skip){document.dispatchEvent(new CustomEvent('resizecanvas'));const resizeEvent=new Event('resize');resizeEvent.skip=true;window.dispatchEvent(resizeEvent)}}let debounce;window.addEventListener('resize',event=>{clearTimeout(debounce);debounce=setTimeout(()=>resize(event),100)});resize();"],["script","/^window\\.location\\.href.*\\'$/"],["script","/devtoolsDetector\\.launch\\(\\)\\;/"],["script","/data: \\[.*\\],/","data: [],","condition","ads_num"],["script","/try.*finally.*?}/"],["script","rek","r","condition","preroll"],["script","/;\\$\\(_\\S+?\\):/",";"],["script","adv_","","condition","flashvars"],["script","self.location.href;","self.location.href; document.addEventListener('DOMContentLoaded',()=>{const button=document.querySelector('form > input#method_free');if(button){button.click()}});","sedCount","1"],["script","//$('#btn_download').click();","$('#btn_download').click();","sedCount","1"],["script","outboundUrl","outbound"],["script","}else/* -r+p-n-t */{","}if(true){"],["script",".push({}/* -r+p-n-t */);",".push({}); document.getElementById(\"mokuai-search-id\").innerHTML = \"<form role=\\\"search\\\" method=\\\"get\\\" class=\\\"search-form\\\" action=\\\"https://www.rjno1.com/\\\" itemprop=\\\"potentialAction\\\" itemscope itemtype=\\\"http://schema.org/SearchAction\\\">  <meta itemprop=\\\"target\\\" content=\\\"https://www.rjno1.com/?s=search%20\\\"/>  <span class=\\\"screen-reader-text\\\">搜索：</span> <i class=\\\"fa fa-search\\\"></i>  <input type=\\\"search\\\" class=\\\"search-field\\\" placeholder=\\\"搜索 &hellip;\\\" value=\\\"\\\" name=\\\"s\\\" title=\\\"Search\\\" required itemprop=\\\"query-input\\\">  <button type=\\\"submit\\\" class=\\\"search-submit\\\"> <span >搜索</span> </button></form>\";window.setTimeout(function() { document.getElementById(\"dl-buttom-id-for-js\").innerHTML = \"<a href=\\\"https://www.rjno1.com/\" + document.location.href.replace(\"https://www.rjno1.com/\", \"\") + \"download-\" + document.location.href.replace(\"https://www.rjno1.com/\", \"\") + \"\\\" class=\\\"post-download-address-button\\\"><i class=\\\"fa fa-download-button\\\"></i><span class=\\\"screen-reader-text\\\">下载地址</span>Download</a><div class=\\\"clear\\\"></div>\";}, 2000)"],["script",".css('display') == 'none'",".css('display') == 'block'"],["script",".is(':visible')"],["style","display:block!important","display:none!important"],["script","/^(.*)$/","if(typeof alreadyRun!=='undefined'&&alreadyRun===true){}else{alreadyRun=true;(function(){'use strict';const safe={'log':window.console.log.bind(console),'getPropertyValue':CSSStyleDeclaration.prototype.getPropertyValue,'setAttribute':Element.prototype.setAttribute,'getAttribute':Element.prototype.getAttribute,'appendChild':Element.prototype.appendChild,'remove':Element.prototype.remove,'Array_splice':Array.prototype.splice,'Array_join':Array.prototype.join,'createElement':document.createElement,'getComputedStyle':window.getComputedStyle,'Reflect':Reflect,'Proxy':Proxy,'crypto':window.crypto,'Uint8Array':Uint8Array,'Object_defineProperty':Object.defineProperty.bind(Object),'String_replace':String.prototype.replace,'addEventListener':self.EventTarget.prototype.addEventListener,};const getRandomValues=safe.crypto.getRandomValues.bind(safe.crypto);const genericGet=function(target,thisArg,args){if(thisArg==='toString'){return target.toString.bind(target)};return safe.Reflect.get(target,thisArg,args)};const generateID=function(len){const dec2hex=function(dec){return dec.toString(16).padStart(2,'0')};const arr=new safe.Uint8Array((len||40)/2);getRandomValues(arr);const result=safe.String_replace.call(safe.Array_join.call(Array.from(arr,dec2hex),''),/^\\d+/g,'');if(result.length<3){return generateID(len)};return result};const randomName=generateID(15);window.MutationObserver=new safe.Proxy(window.MutationObserver,{construct:function(target,args){const callback=args[0];const proxiedCallback=function(mutations,observer){for(let len=mutations.length,i=len-1;i>=0;--i){const mutation=mutations[i];if(mutation.type==='childList'&&mutation.addedNodes.length>0){const nodes=mutation.addedNodes;for(let j=0,len2=nodes.length;j<len2;++j){const node=nodes[j];if(node.localName===randomName){safe.Array_splice.call(mutations,i,1);break}}}};if(mutations.length!==0){callback(mutations,observer)}};args[0]=proxiedCallback;const observer=safe.Reflect.construct(target,args);return observer},get:genericGet});window.getComputedStyle=new safe.Proxy(window.getComputedStyle,{apply(target,thisArg,args){let style=safe.Reflect.apply(target,thisArg,args);if(safe.getPropertyValue.call(style,'clip-path')==='none'){return style};const node=args[0];const clonedNode=safe.createElement.call(document,randomName);safe.setAttribute.call(clonedNode,'class',safe.getAttribute.call(node,'class'));safe.setAttribute.call(clonedNode,'id',safe.getAttribute.call(node,'id'));safe.setAttribute.call(clonedNode,'style',safe.getAttribute.call(node,'style'));safe.appendChild.call(document.body,clonedNode);const value=safe.getPropertyValue.call(safe.getComputedStyle.call(window,clonedNode),'clip-path');safe.remove.call(clonedNode);safe.Object_defineProperty(style,'clipPath',{get:function(){return value}});style.getPropertyValue=new safe.Proxy(style.getPropertyValue,{apply(target,thisArg,args){if(args[0]!=='clip-path'){return safe.Reflect.apply(target,thisArg,args)};return value},get:genericGet});return style},get:genericGet});const replaceScripts=function(){const scripts=safe.querySelectorAll.call(document,'script');for(let i=0,len=scripts.length;i<len;++i){const script=scripts[i];script.textContent=safe.String_replace.call(script.textContent,/if\\(typeof alreadyRun(.*)}}\\)\\(\\)};/g,'')}};const main=function(){delete window.alreadyRun;replaceScripts()};if(document.readyState!=='loading'){main()}else{safe.addEventListener.call(document,'DOMContentLoaded',main)}})()};$1"],["script","({});","({}); function showHideElements(t,e){$(t).hide(),$(e).show()}function disableBtnclc(){let t=document.querySelector(\".submit-captcha\");t.disabled=!0,t.innerHTML=\"Loading...\"}function refreshButton(){$(\".refresh-capthca-btn\").addClass(\"disabled\")}function copyInput(){let t=document.querySelectorAll(\".copy-input\");t.forEach(t=>{navigator.clipboard.writeText(t.value)}),Materialize.toast(\"Copied!\",2e3)}function imgOnError(){$(\".ua-check\").html(window.atob(\"PGRpdiBjbGFzcz0idGV4dC1kYW5nZXIgZm9udC13ZWlnaHQtYm9sZCBoNSBtdC0xIj5DYXB0Y2hhIGltYWdlIGZhaWxlZCB0byBsb2FkLjxicj48YSBvbmNsaWNrPSJsb2NhdGlvbi5yZWxvYWQoKSIgc3R5bGU9ImNvbG9yOiM2MjcwZGE7Y3Vyc29yOnBvaW50ZXIiIGNsYXNzPSJ0ZXh0LWRlY29yYXRpb25lLW5vbmUiPlBsZWFzZSByZWZyZXNoIHRoZSBwYWdlLiA8aSBjbGFzcz0iZmEgZmEtcmVmcmVzaCI+PC9pPjwvYT48L2Rpdj4=\"))}$(window).on(\"load\",function(){$(\"body\").addClass(\"loaded\")}),window.history.replaceState&&window.history.replaceState(null,null,window.location.href),$(\".remove-spaces\").on(\"input\",function(){this.value=this.value.replace(/\\s/g,\"\")}),$(document).on(\"click\",\"#toast-container .toast\",function(){$(this).fadeOut(function(){$(this).remove()})}),$(\".tktemizle\").on(\"input propertychange\",function(){let t=$(this).val().match(\"access_token=(.*?)&\");t&&$(\".tktemizle\").val(t[1])}),$(document).ready(function(){let t=[{button:$(\".t-followers-button\"),menu:$(\".t-followers-menu\")},{button:$(\".t-hearts-button\"),menu:$(\".t-hearts-menu\")},{button:$(\".t-chearts-button\"),menu:$(\".t-chearts-menu\")},{button:$(\".t-views-button\"),menu:$(\".t-views-menu\")},{button:$(\".t-shares-button\"),menu:$(\".t-shares-menu\")},{button:$(\".t-favorites-button\"),menu:$(\".t-favorites-menu\")},{button:$(\".t-livestream-button\"),menu:$(\".t-livestream-menu\")},{button:$(\".ig-followers-button\"),menu:$(\".ig-followers-menu\")},{button:$(\".ig-likes-button\"),menu:$(\".ig-likes-menu\")}];$.each(t,function(t,e){e.button.click(function(){$(\".colsmenu\").addClass(\"nonec\"),e.menu.removeClass(\"nonec\")})})});"]];

const hostnamesMap = new Map([["fullxh.com",0],["megaxh.com",0],["unlockxh4.com",0],["xhadult2.com",0],["xhadult3.com",0],["xhadult4.com",0],["xhadult5.com",0],["xhamster46.com",0],["xhday.com",0],["xhday1.com",0],["xhmoon5.com",0],["xhplanet1.com",0],["xhplanet2.com",0],["xhreal2.com",0],["xhreal3.com",0],["xhtab2.com",0],["xhvictory.com",0],["xhwebsite.com",0],["xhwebsite2.com",0],["xhwide1.com",0],["xhwide8.com",0],["nhentai.net",1],["games.dailymail.co.uk",2],["games.metro.us",2],["giga.de",3],["kino.de",3],["t-online.de",4],["bussyhunter.com",5],["codingnepalweb.com",6],["jpvhub.com",8],["photopea.com",9],["gyanitheme.com",10],["hipsonyc.com",10],["idoitmyself.xyz",11],["foodxor.com",13],["drawer-opportunity-i-243.site",14],["megaup.net",15],["adultdeepfakes.com",16],["uploadboy.com",[17,18]],["reddit.com",19],["rjno1.com",[20,21]],["smallseotools.com",[22,23]],["plagiarismchecker.co",24],["dragontea.ink",25],["zefoy.com",26]]);

const entitiesMap = new Map([["hamsterix",0],["xhamster",0],["xhamster1",0],["xhamster10",0],["xhamster11",0],["xhamster12",0],["xhamster13",0],["xhamster14",0],["xhamster15",0],["xhamster16",0],["xhamster17",0],["xhamster18",0],["xhamster19",0],["xhamster20",0],["xhamster2",0],["xhamster3",0],["xhamster4",0],["xhamster5",0],["xhamster7",0],["xhamster8",0],["pinterest",7],["empire-stream",12],["empire-streaming",12]]);

const exceptionsMap = new Map([["old.reddit.com",[19]]]);

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
    const safe = safeSelf();
    const reNodeName = safe.patternToRegex(nodeName, 'i');
    const rePattern = safe.patternToRegex(pattern, 'gms');
    const extraArgs = safe.getExtraArgs(Array.from(arguments), 3);
    const shouldLog = scriptletGlobals.has('canDebug') && extraArgs.log || 0;
    const reCondition = safe.patternToRegex(extraArgs.condition || '', 'gms');
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
        'Error': self.Error,
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'fetch': self.fetch,
        'jsonParse': self.JSON.parse.bind(self.JSON),
        'jsonStringify': self.JSON.stringify.bind(self.JSON),
        'log': console.log.bind(console),
        uboLog(...args) {
            if ( args.length === 0 ) { return; }
            if ( `${args[0]}` === '' ) { return; }
            this.log('[uBO]', ...args);
        },
        initPattern(pattern, options = {}) {
            if ( pattern === '' ) {
                return { matchAll: true };
            }
            const expect = (options.canNegate === true && pattern.startsWith('!') === false);
            if ( expect === false ) {
                pattern = pattern.slice(1);
            }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match !== null ) {
                return {
                    pattern,
                    re: new this.RegExp(
                        match[1],
                        match[2] || options.flags
                    ),
                    expect,
                };
            }
            return {
                pattern,
                re: new this.RegExp(pattern.replace(
                    /[.*+?^${}()|[\]\\]/g, '\\$&'),
                    options.flags
                ),
                expect,
            };
        },
        testPattern(details, haystack) {
            if ( details.matchAll ) { return true; }
            return this.RegExp_test.call(details.re, haystack) === details.expect;
        },
        patternToRegex(pattern, flags = undefined) {
            if ( pattern === '' ) { return /^/; }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match === null ) {
                return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            try {
                return new RegExp(match[1], match[2] || flags);
            }
            catch(ex) {
            }
            return /^/;
        },
        getExtraArgs(args, offset = 0) {
            const entries = args.slice(offset).reduce((out, v, i, a) => {
                if ( (i & 1) === 0 ) {
                    const rawValue = a[i+1];
                    const value = /^\d+$/.test(rawValue)
                        ? parseInt(rawValue, 10)
                        : rawValue;
                    out.push([ a[i], value ]);
                }
                return out;
            }, []);
            return Object.fromEntries(entries);
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
    try { replaceNodeText(...argsList[i]); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

};
// End of code to inject

/******************************************************************************/

// Inject code

// https://bugzilla.mozilla.org/show_bug.cgi?id=1736575
//   `MAIN` world not yet supported in Firefox, so we inject the code into
//   'MAIN' ourself when enviroment in Firefox.

// Not Firefox
if ( typeof wrappedJSObject !== 'object' ) {
    return uBOL_replaceNodeText();
}

// Firefox
{
    const page = self.wrappedJSObject;
    let script, url;
    try {
        page.uBOL_replaceNodeText = cloneInto([
            [ '(', uBOL_replaceNodeText.toString(), ')();' ],
            { type: 'text/javascript; charset=utf-8' },
        ], self);
        const blob = new page.Blob(...page.uBOL_replaceNodeText);
        url = page.URL.createObjectURL(blob);
        const doc = page.document;
        script = doc.createElement('script');
        script.async = false;
        script.src = url;
        (doc.head || doc.documentElement || doc).append(script);
    } catch (ex) {
        console.error(ex);
    }
    if ( url ) {
        if ( script ) { script.remove(); }
        page.URL.revokeObjectURL(url);
    }
    delete page.uBOL_replaceNodeText;
}

/******************************************************************************/

// End of local scope
})();

/******************************************************************************/

void 0;
