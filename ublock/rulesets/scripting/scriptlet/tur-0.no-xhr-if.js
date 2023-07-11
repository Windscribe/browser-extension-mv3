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

// ruleset: tur-0

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_noXhrIf() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"/advert.js\"]","[\"static.doubleclick.net/instream/ad_status.js\"]","[\"pagead2.googlesyndication.com\"]","[\"spotxchange.com\"]"];

const hostnamesMap = new Map([["kuponuna143.com",0],["kuponuna144.com",0],["kuponuna145.com",0],["kuponuna146.com",0],["kuponuna147.com",0],["kuponuna148.com",0],["kuponuna149.com",0],["kuponuna150.com",0],["kuponuna151.com",0],["kuponuna152.com",0],["kuponuna153.com",0],["kuponuna154.com",0],["kuponuna155.com",0],["kuponuna156.com",0],["kuponuna157.com",0],["kuponuna158.com",0],["kuponuna159.com",0],["kuponuna160.com",0],["kuponuna161.com",0],["kuponuna162.com",0],["kuponuna163.com",0],["kuponuna164.com",0],["kuponuna165.com",0],["kuponuna166.com",0],["kuponuna167.com",0],["kuponuna168.com",0],["kuponuna169.com",0],["kuponuna170.com",0],["canlitribun40.com",0],["canlitribun41.com",0],["canlitribun42.com",0],["canlitribun43.com",0],["canlitribun44.com",0],["canlitribun45.com",0],["canlitribun46.com",0],["canlitribun47.com",0],["canlitribun48.com",0],["canlitribun49.com",0],["canlitribun50.com",0],["canlitribun51.com",0],["canlitribun52.com",0],["canlitribun53.com",0],["canlitribun54.com",0],["canlitribun55.com",0],["canlitribun56.com",0],["canlitribun57.com",0],["canlitribun58.com",0],["canlitribun59.com",0],["canlitribun60.com",0],["canlitribun61.com",0],["canlitribun62.com",0],["canlitribun63.com",0],["canlitribun64.com",0],["canlitribun65.com",0],["canlitribun66.com",0],["canlitribun67.com",0],["canlitribun68.com",0],["canlitribun69.com",0],["canlitribun70.com",0],["mangawt.com",1],["uzaymanga.com",2],["ruyamanga.com",2],["tv8.com.tr",3]]);

const entitiesMap = new Map([]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function noXhrIf(
    arg1 = ''
) {
    if ( typeof arg1 !== 'string' ) { return; }
    const xhrInstances = new WeakMap();
    const needles = [];
    for ( const condition of arg1.split(/\s+/) ) {
        if ( condition === '' ) { continue; }
        const pos = condition.indexOf(':');
        let key, value;
        if ( pos !== -1 ) {
            key = condition.slice(0, pos);
            value = condition.slice(pos + 1);
        } else {
            key = 'url';
            value = condition;
        }
        needles.push({ key, re: patternToRegex(value) });
    }
    const log = needles.length === 0 ? console.log.bind(console) : undefined;
    self.XMLHttpRequest = class extends self.XMLHttpRequest {
        open(...args) {
            if ( log !== undefined ) {
                log(`uBO: xhr.open(${args.join(', ')})`);
            } else {
                const argNames = [ 'method', 'url' ];
                const haystack = new Map();
                for ( let i = 0; i < args.length && i < argNames.length; i++  ) {
                    haystack.set(argNames[i], args[i]);
                }
                if ( haystack.size !== 0 ) {
                    let matches = true;
                    for ( const { key, re } of needles ) {
                        matches = re.test(haystack.get(key) || '');
                        if ( matches === false ) { break; }
                    }
                    if ( matches ) {
                        xhrInstances.set(this, haystack);
                    }
                }
            }
            return super.open(...args);
        }
        send(...args) {
            const haystack = xhrInstances.get(this);
            if ( haystack === undefined ) {
                return super.send(...args);
            }
            Object.defineProperties(this, {
                readyState: { value: 4, writable: false },
                response: { value: '', writable: false },
                responseText: { value: '', writable: false },
                responseURL: { value: haystack.get('url'), writable: false },
                responseXML: { value: '', writable: false },
                status: { value: 200, writable: false },
                statusText: { value: 'OK', writable: false },
            });
            this.dispatchEvent(new Event('readystatechange'));
            this.dispatchEvent(new Event('load'));
            this.dispatchEvent(new Event('loadend'));
        }
    };
}

function patternToRegex(pattern, flags = undefined) {
    if ( pattern === '' ) { return /^/; }
    const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
    if ( match !== null ) {
        return new RegExp(match[1], match[2] || flags);
    }
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
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
    try { noXhrIf(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
