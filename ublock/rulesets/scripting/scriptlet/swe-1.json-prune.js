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

// ruleset: swe-1

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_jsonPrune() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"autoplay\"]","[\"autoplay players.*.ga acl.ads players.*.autoplay\"]","[\"payload.ads campaigns.*\"]"];

const hostnamesMap = new Map([["alekuriren.se",0],["allas.se",0],["alltforforaldrar.se",0],["baaam.se",0],["babyhjalp.se",0],["barometern.se",0],["blt.se",0],["bt.se",0],["byrum.se",0],["cafe.se",0],["corren.se",0],["di.se",0],["ekuriren.se",0],["elle.se",0],["eposten.se",0],["expressen.se",0],["familjeliv.se",0],["femina.se",0],["folkbladet.nu",0],["folkbladet.se",0],["fragbite.se",0],["frida.se",0],["golfing.se",0],["gotlandjustnu.se",0],["hant.se",0],["helagotland.se",0],["ibnytt.se",0],["kalmarposten.se",0],["kindaposten.se",0],["kingmagazine.se",0],["kkuriren.se",0],["klt.nu",0],["kristianstadsbladet.se",0],["kuriren.nu",0],["lchfarkivet.se",0],["lokalti.se",0],["lokaltidningen.nu",0],["mabra.com",0],["mellanbygden.nu",0],["meraosterlen.se",0],["mestmotor.se",0],["mitti.se",0],["motherhood.se",0],["mvt.se",0],["nordsverige.se",0],["norrahalland.se",0],["norran.se",0],["nsd.se",0],["nsk.se",0],["nt.se",0],["nyheter24.se",0],["olandsbladet.se",0],["praktisktbatagande.se",0],["pt.se",0],["realtid.se",0],["recept.se",0],["residencemagazine.se",0],["skd.se",0],["smp.se",0],["sn.se",0],["strengnastidning.se",0],["svenskdam.se",0],["svenskgolf.se",0],["sverigespringer.se",0],["sydostran.se",0],["thelocal.se",0],["trelleborgsallehanda.se",0],["unt.se",0],["ut.se",0],["vasterastidning.se",0],["vasterbottningen.se",0],["vaxjobladet.se",0],["viivilla.se",0],["vimmerbytidning.se",0],["vk.se",0],["vt.se",0],["vxonews.se",0],["youplay.se",0],["ystadsallehanda.se",0],["alingsastidning.se",1],["bohuslaningen.se",1],["gp.se",1],["hallandsposten.se",1],["harrydaposten.se",1],["hn.se",1],["kungalvsposten.se",1],["kungsbackaposten.se",1],["lwcdn.com",1],["markposten.se",1],["molndalsposten.se",1],["partilletidning.se",1],["stromstadstidning.se",1],["sttidningen.se",1],["ttela.se",1],["matspar.se",2]]);

const entitiesMap = new Map([]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function jsonPrune(
    rawPrunePaths = '',
    rawNeedlePaths = ''
) {
    JSON.parse = new Proxy(JSON.parse, {
        apply: function(target, thisArg, args) {
            return objectPrune(
                Reflect.apply(target, thisArg, args),
                rawPrunePaths,
                rawNeedlePaths
            );
        },
    });
    Response.prototype.json = new Proxy(Response.prototype.json, {
        apply: function(target, thisArg, args) {
            return Reflect.apply(target, thisArg, args).then(o => 
                objectPrune(o, rawPrunePaths, rawNeedlePaths)
            );
        },
    });
}

function objectPrune(
    obj,
    rawPrunePaths,
    rawNeedlePaths
) {
    if ( typeof rawPrunePaths !== 'string' ) { return; }
    const prunePaths = rawPrunePaths !== ''
        ? rawPrunePaths.split(/ +/)
        : [];
    let needlePaths;
    let log, reLogNeedle;
    if ( prunePaths.length !== 0 ) {
        needlePaths = prunePaths.length !== 0 && rawNeedlePaths !== ''
            ? rawNeedlePaths.split(/ +/)
            : [];
    } else {
        log = console.log.bind(console);
        reLogNeedle = patternToRegex(rawNeedlePaths);
    }
    const findOwner = function(root, path, prune = false) {
        let owner = root;
        let chain = path;
        for (;;) {
            if ( typeof owner !== 'object' || owner === null  ) {
                return false;
            }
            const pos = chain.indexOf('.');
            if ( pos === -1 ) {
                if ( prune === false ) {
                    return owner.hasOwnProperty(chain);
                }
                if ( chain === '*' ) {
                    for ( const key in owner ) {
                        if ( owner.hasOwnProperty(key) === false ) { continue; }
                        delete owner[key];
                    }
                } else if ( owner.hasOwnProperty(chain) ) {
                    delete owner[chain];
                }
                return true;
            }
            const prop = chain.slice(0, pos);
            if (
                prop === '[]' && Array.isArray(owner) ||
                prop === '*' && owner instanceof Object
            ) {
                const next = chain.slice(pos + 1);
                let found = false;
                for ( const key of Object.keys(owner) ) {
                    found = findOwner(owner[key], next, prune) || found;
                }
                return found;
            }
            if ( owner.hasOwnProperty(prop) === false ) { return false; }
            owner = owner[prop];
            chain = chain.slice(pos + 1);
        }
    };
    const mustProcess = function(root) {
        for ( const needlePath of needlePaths ) {
            if ( findOwner(root, needlePath) === false ) {
                return false;
            }
        }
        return true;
    };
    if ( log !== undefined ) {
        const json = JSON.stringify(obj, null, 2);
        if ( reLogNeedle.test(json) ) {
            log('uBO:', location.hostname, json);
        }
        return obj;
    }
    if ( mustProcess(obj) === false ) { return obj; }
    for ( const path of prunePaths ) {
        findOwner(obj, path, true);
    }
    return obj;
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
    try { jsonPrune(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
