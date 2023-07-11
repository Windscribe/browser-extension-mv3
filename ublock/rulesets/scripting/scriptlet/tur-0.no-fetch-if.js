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

(function uBOL_noFetchIf() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"]","[\"/assets/js/prebid\"]","[\"www3.doubleclick.net\"]","[\"pagead2.googlesyndication.com\"]","[\"doubleclick.net\"]"];

const hostnamesMap = new Map([["raindropteamfan.com",0],["sozcu.com.tr",1],["bikifi.com",2],["ogznet.com",3],["discordsunucu.com",3],["boxofficeturkiye.com",3],["nedir.org",3],["puhutv.com",[3,4]],["dizipal1.cloud",3],["dizipal2.cloud",3],["dizipal3.cloud",3],["dizipal4.cloud",3],["dizipal5.cloud",3],["dizipal6.cloud",3],["dizipal7.cloud",3],["dizipal8.cloud",3],["dizipal9.cloud",3],["dizipal10.cloud",3],["dizipal11.cloud",3],["dizipal12.cloud",3],["dizipal13.cloud",3],["dizipal14.cloud",3],["dizipal15.cloud",3],["dizipal16.cloud",3],["dizipal17.cloud",3],["dizipal18.cloud",3],["dizipal19.cloud",3],["dizipal20.cloud",3],["dizipal21.cloud",3],["dizipal22.cloud",3],["dizipal23.cloud",3],["dizipal24.cloud",3],["dizipal25.cloud",3],["dizipal26.cloud",3],["dizipal27.cloud",3],["dizipal28.cloud",3],["dizipal29.cloud",3],["dizipal30.cloud",3],["dizipal31.cloud",3],["dizipal32.cloud",3],["dizipal33.cloud",3],["dizipal34.cloud",3],["dizipal35.cloud",3],["dizipal36.cloud",3],["dizipal37.cloud",3],["dizipal38.cloud",3],["dizipal39.cloud",3],["dizipal40.cloud",3],["dizipal41.cloud",3],["dizipal42.cloud",3],["dizipal43.cloud",3],["dizipal44.cloud",3],["dizipal45.cloud",3],["dizipal46.cloud",3],["dizipal47.cloud",3],["dizipal48.cloud",3],["dizipal49.cloud",3],["dizipal50.cloud",3],["dizipal51.cloud",3],["dizipal52.cloud",3],["dizipal53.cloud",3],["dizipal54.cloud",3],["dizipal55.cloud",3],["dizipal56.cloud",3],["dizipal57.cloud",3],["dizipal58.cloud",3],["dizipal59.cloud",3],["dizipal60.cloud",3],["dizipal61.cloud",3],["dizipal62.cloud",3],["dizipal63.cloud",3],["dizipal64.cloud",3],["dizipal65.cloud",3],["dizipal66.cloud",3],["dizipal67.cloud",3],["dizipal68.cloud",3],["dizipal69.cloud",3],["dizipal70.cloud",3],["dizipal71.cloud",3],["dizipal72.cloud",3],["dizipal73.cloud",3],["dizipal74.cloud",3],["dizipal75.cloud",3],["dizipal76.cloud",3],["dizipal77.cloud",3],["dizipal78.cloud",3],["dizipal79.cloud",3],["dizipal80.cloud",3],["dizipal81.cloud",3],["dizipal82.cloud",3],["dizipal83.cloud",3],["dizipal84.cloud",3],["dizipal85.cloud",3],["dizipal86.cloud",3],["dizipal87.cloud",3],["dizipal88.cloud",3],["dizipal89.cloud",3],["dizipal90.cloud",3],["dizipal91.cloud",3],["dizipal92.cloud",3],["dizipal93.cloud",3],["dizipal94.cloud",3],["dizipal95.cloud",3],["dizipal96.cloud",3],["dizipal97.cloud",3],["dizipal98.cloud",3],["dizipal99.cloud",3],["dizipal100.cloud",3],["dizipal101.cloud",3],["dizipal102.cloud",3],["dizipal103.cloud",3],["dizipal104.cloud",3],["dizipal105.cloud",3],["dizipal106.cloud",3],["dizipal107.cloud",3],["dizipal108.cloud",3],["dizipal109.cloud",3],["dizipal110.cloud",3],["dizipal111.cloud",3],["dizipal112.cloud",3],["dizipal113.cloud",3],["dizipal114.cloud",3],["dizipal115.cloud",3],["dizipal116.cloud",3],["dizipal117.cloud",3],["dizipal118.cloud",3],["dizipal119.cloud",3],["dizipal120.cloud",3],["dizipal121.cloud",3],["dizipal122.cloud",3],["dizipal123.cloud",3],["dizipal124.cloud",3],["dizipal125.cloud",3],["dizipal126.cloud",3],["dizipal127.cloud",3],["dizipal128.cloud",3],["dizipal129.cloud",3],["dizipal130.cloud",3],["dizipal131.cloud",3],["dizipal132.cloud",3],["dizipal133.cloud",3],["dizipal134.cloud",3],["dizipal135.cloud",3],["dizipal136.cloud",3],["dizipal137.cloud",3],["dizipal138.cloud",3],["dizipal139.cloud",3],["dizipal140.cloud",3],["dizipal141.cloud",3],["dizipal142.cloud",3],["dizipal143.cloud",3],["dizipal144.cloud",3],["dizipal145.cloud",3],["dizipal146.cloud",3],["dizipal147.cloud",3],["dizipal148.cloud",3],["dizipal149.cloud",3],["dizipal150.cloud",3],["dizipal151.cloud",3],["dizipal152.cloud",3],["dizipal153.cloud",3],["dizipal154.cloud",3],["dizipal155.cloud",3],["dizipal156.cloud",3],["dizipal157.cloud",3],["dizipal158.cloud",3],["dizipal159.cloud",3],["dizipal160.cloud",3],["dizipal161.cloud",3],["dizipal162.cloud",3],["dizipal163.cloud",3],["dizipal164.cloud",3],["dizipal165.cloud",3],["dizipal166.cloud",3],["dizipal167.cloud",3],["dizipal168.cloud",3],["dizipal169.cloud",3],["dizipal170.cloud",3],["dizipal171.cloud",3],["dizipal172.cloud",3],["dizipal173.cloud",3],["dizipal174.cloud",3],["dizipal175.cloud",3],["dizipal176.cloud",3],["dizipal177.cloud",3],["dizipal178.cloud",3],["dizipal179.cloud",3],["dizipal180.cloud",3],["dizipal181.cloud",3],["dizipal182.cloud",3],["dizipal183.cloud",3],["dizipal184.cloud",3],["dizipal185.cloud",3],["dizipal186.cloud",3],["dizipal187.cloud",3],["dizipal188.cloud",3],["dizipal189.cloud",3],["dizipal190.cloud",3],["dizipal191.cloud",3],["dizipal192.cloud",3],["dizipal193.cloud",3],["dizipal194.cloud",3],["dizipal195.cloud",3],["dizipal196.cloud",3],["dizipal197.cloud",3],["dizipal198.cloud",3],["dizipal199.cloud",3],["dizipal200.cloud",3],["dizipal580.com",3],["dizipal581.com",3],["dizipal582.com",3],["dizipal583.com",3],["dizipal584.com",3],["dizipal585.com",3],["dizipal586.com",3],["dizipal587.com",3],["dizipal588.com",3],["dizipal589.com",3],["dizipal590.com",3],["dizipal591.com",3],["dizipal592.com",3],["dizipal593.com",3],["dizipal594.com",3],["dizipal595.com",3],["dizipal596.com",3],["dizipal597.com",3],["dizipal598.com",3],["dizipal599.com",3],["dizipal600.com",3],["dizipal607.com",3],["dizipal608.com",3],["dizipal609.com",3],["dizipal610.com",3],["dizipal611.com",3],["dizipal612.com",3],["dizipal613.com",3],["dizipal614.com",3],["dizipal615.com",3],["dizipal616.com",3],["dizipal617.com",3],["dizipal618.com",3],["dizipal619.com",3],["dizipal620.com",3],["dizipal621.com",3],["dizipal622.com",3],["dizipal623.com",3],["dizipal624.com",3],["dizipal625.com",3],["dizipal626.com",3],["dizipal627.com",3],["dizipal628.com",3],["dizipal629.com",3],["dizipal630.com",3],["dizipal631.com",3],["dizipal632.com",3],["dizipal633.com",3],["dizipal634.com",3],["dizipal635.com",3],["dizipal636.com",3],["dizipal637.com",3],["dizipal638.com",3],["dizipal639.com",3],["dizipal640.com",3],["dizipal641.com",3],["dizipal642.com",3],["dizipal643.com",3],["dizipal644.com",3],["dizipal645.com",3],["dizipal646.com",3],["dizipal647.com",3],["dizipal648.com",3],["dizipal649.com",3],["dizipal650.com",3],["dizipal651.com",3],["dizipal652.com",3],["dizipal653.com",3],["dizipal654.com",3],["dizipal655.com",3],["dizipal656.com",3],["dizipal657.com",3],["dizipal658.com",3],["dizipal659.com",3],["dizipal660.com",3],["dizipal661.com",3],["dizipal662.com",3],["dizipal663.com",3],["dizipal664.com",3],["dizipal665.com",3],["dizipal666.com",3],["dizipal667.com",3],["dizipal668.com",3],["dizipal669.com",3],["dizipal670.com",3],["dizipal671.com",3],["dizipal672.com",3],["dizipal673.com",3],["dizipal674.com",3],["dizipal675.com",3],["dizipal676.com",3],["dizipal677.com",3],["dizipal678.com",3],["dizipal679.com",3],["dizipal680.com",3],["dizipal681.com",3],["dizipal682.com",3],["dizipal683.com",3],["dizipal684.com",3],["dizipal685.com",3],["dizipal686.com",3],["dizipal687.com",3],["dizipal688.com",3],["dizipal689.com",3],["dizipal690.com",3],["dizipal691.com",3],["dizipal692.com",3],["dizipal693.com",3],["dizipal694.com",3],["dizipal695.com",3],["dizipal696.com",3],["dizipal697.com",3],["dizipal698.com",3],["dizipal699.com",3],["dizipal700.com",3]]);

const entitiesMap = new Map([]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function noFetchIf(
    arg1 = '',
) {
    if ( typeof arg1 !== 'string' ) { return; }
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
    self.fetch = new Proxy(self.fetch, {
        apply: function(target, thisArg, args) {
            let proceed = true;
            try {
                let details;
                if ( args[0] instanceof self.Request ) {
                    details = args[0];
                } else {
                    details = Object.assign({ url: args[0] }, args[1]);
                }
                const props = new Map();
                for ( const prop in details ) {
                    let v = details[prop];
                    if ( typeof v !== 'string' ) {
                        try { v = JSON.stringify(v); }
                        catch(ex) { }
                    }
                    if ( typeof v !== 'string' ) { continue; }
                    props.set(prop, v);
                }
                if ( log !== undefined ) {
                    const out = Array.from(props)
                                     .map(a => `${a[0]}:${a[1]}`)
                                     .join(' ');
                    log(`uBO: fetch(${out})`);
                }
                proceed = needles.length === 0;
                for ( const { key, re } of needles ) {
                    if (
                        props.has(key) === false ||
                        re.test(props.get(key)) === false
                    ) {
                        proceed = true;
                        break;
                    }
                }
            } catch(ex) {
            }
            return proceed
                ? Reflect.apply(target, thisArg, args)
                : Promise.resolve(new Response());
        }
    });
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
    try { noFetchIf(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
