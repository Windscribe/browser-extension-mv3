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

// ruleset: rus-0

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_noXhrIf() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"/ad\\\\.mail|adfox|adhigh|adriver|mc\\\\.yandex|mediametrics|otm-r|static-mon/\"]","[\"/br/\"]","[\"/hits/event/\",\"method:POST\"]","[\"/m2?_\"]","[\"/wl-analytics\\\\.tsp\\\\.li/\"]","[\"method:GET\"]"];

const hostnamesMap = new Map([["liveinternet.ru",0],["motorpage.ru",1],["116.ru",2],["14.ru",2],["161.ru",2],["164.ru",2],["178.ru",2],["26.ru",2],["29.ru",2],["35.ru",2],["43.ru",2],["45.ru",2],["48.ru",2],["51.ru",2],["53.ru",2],["56.ru",2],["59.ru",2],["60.ru",2],["62.ru",2],["63.ru",2],["68.ru",2],["71.ru",2],["72.ru",2],["74.ru",2],["76.ru",2],["86.ru",2],["89.ru",2],["93.ru",2],["chita.ru",2],["e1.ru",2],["ircity.ru",2],["mgorsk.ru",2],["msk1.ru",2],["ngs.ru",2],["ngs22.ru",2],["ngs24.ru",2],["ngs42.ru",2],["ngs55.ru",2],["ngs70.ru",2],["nn.ru",2],["proizhevsk.ru",2],["provoronezh.ru",2],["sochi1.ru",2],["sterlitamak1.ru",2],["tolyatty.ru",2],["ufa1.ru",2],["v1.ru",2],["www.fontanka.ru",2],["4pda.to",3],["adme.media",4],["sm.news",5]]);

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
