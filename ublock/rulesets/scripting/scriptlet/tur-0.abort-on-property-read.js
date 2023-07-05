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

(function uBOL_abortOnPropertyRead() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"detectedAdBlock\"]","[\"adblockmesaj\"]","[\"detectAdBlock\"]","[\"adsBlocked\"]","[\"rTargets\"]","[\"initPu\"]","[\"initAd\"]","[\"initPop\"]","[\"oV1\"]","[\"pop_status\"]","[\"sagAltReklamListesi\"]","[\"openpop\"]","[\"initDizi\"]","[\"check_target\"]","[\"wpsite_clickable_data\"]","[\"jsPopunder\"]"];

const hostnamesMap = new Map([["sozcu.com.tr",0],["mangawt.com",1],["gsmturkey.net",1],["vidtekno.com",1],["telegramgruplari.com",2],["kanalmaras.com",3],["r10.net",4],["jetfilmizletv.com",5],["dizipall.org",5],["dizimax2.com",5],["dizimax3.com",5],["dizimax4.com",5],["dizimax5.com",5],["dizimax6.com",5],["dizimax7.com",5],["dizimax8.com",5],["dizimax9.com",5],["dizimax10.com",5],["dizimax11.com",5],["dizimax12.com",5],["dizimax13.com",5],["dizimax14.com",5],["dizimax15.com",5],["dizimax16.com",5],["dizimax17.com",5],["dizimax18.com",5],["yenierotikfilm.xyz",5],["breakingbadizle.com",5],["diziday1.com",5],["filmgezegeni.live",5],["zipfilmizle.com",5],["bamfilmizle.com",5],["sinemadafilm.com",5],["netflixcehennemi.com",5],["diziizles.com",5],["hdizlefilmleri.com",5],["filmmoduu.com",5],["abifilmizle.org",5],["hdfilmhit.com",5],["filmla.org",5],["trfilm.net",5],["dolufilm.org",5],["netflix-izle.com",5],["turkifsaalemi.com",5],["netfilmtvizle.com",5],["kuponuna143.com",5],["kuponuna144.com",5],["kuponuna145.com",5],["kuponuna146.com",5],["kuponuna147.com",5],["kuponuna148.com",5],["kuponuna149.com",5],["kuponuna150.com",5],["kuponuna151.com",5],["kuponuna152.com",5],["kuponuna153.com",5],["kuponuna154.com",5],["kuponuna155.com",5],["kuponuna156.com",5],["kuponuna157.com",5],["kuponuna158.com",5],["kuponuna159.com",5],["kuponuna160.com",5],["kuponuna161.com",5],["kuponuna162.com",5],["kuponuna163.com",5],["kuponuna164.com",5],["kuponuna165.com",5],["kuponuna166.com",5],["kuponuna167.com",5],["kuponuna168.com",5],["kuponuna169.com",5],["kuponuna170.com",5],["diziyo.cx",6],["fullhdabifilm.com",6],["bettercallsaulizle.com",6],["superfilmgeldi.net",6],["fullhdfilmizlett1.com",6],["fullhdfilmcibaba1.com",6],["dizirun1.com",6],["fullfilmcibaba1.com",6],["fullfilmcidayi1.com",6],["filmsezonu.com",6],["fullhdfilmizleabi.com",6],["hdfreeizle.com",6],["erotikfilmsitesi.net",6],["fullfilmcidayim.com",6],["hdrealfilmizle.com",6],["hdmixfilim.com",[6,9]],["fullhdfilmizlepala.com",6],["yabancidizici.net",7],["dizilla2.org",7],["dizimini.com",7],["filmizlehub.com",7],["roketdizi.pw",7],["1080hdfilmizle.com",7],["shirl.club",8],["altporno.xyz",8],["ovpvideo.com",8],["goodfilmizle.com",10],["dizikorea.com",11],["diziyou.co",12],["technopat.net",14]]);

const entitiesMap = new Map([["yabancidiziizlesene",7],["dizisup",7],["torrentarsivi",13],["tranimeizle",15]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function abortOnPropertyRead(
    chain = ''
) {
    if ( typeof chain !== 'string' ) { return; }
    if ( chain === '' ) { return; }
    const exceptionToken = getExceptionToken();
    const abort = function() {
        throw new ReferenceError(exceptionToken);
    };
    const makeProxy = function(owner, chain) {
        const pos = chain.indexOf('.');
        if ( pos === -1 ) {
            const desc = Object.getOwnPropertyDescriptor(owner, chain);
            if ( !desc || desc.get !== abort ) {
                Object.defineProperty(owner, chain, {
                    get: abort,
                    set: function(){}
                });
            }
            return;
        }
        const prop = chain.slice(0, pos);
        let v = owner[prop];
        chain = chain.slice(pos + 1);
        if ( v ) {
            makeProxy(v, chain);
            return;
        }
        const desc = Object.getOwnPropertyDescriptor(owner, prop);
        if ( desc && desc.set !== undefined ) { return; }
        Object.defineProperty(owner, prop, {
            get: function() { return v; },
            set: function(a) {
                v = a;
                if ( a instanceof Object ) {
                    makeProxy(a, chain);
                }
            }
        });
    };
    const owner = window;
    makeProxy(owner, chain);
}

function getExceptionToken() {
    const token =
        String.fromCharCode(Date.now() % 26 + 97) +
        Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const oe = self.onerror;
    self.onerror = function(msg, ...args) {
        if ( typeof msg === 'string' && msg.includes(token) ) { return true; }
        if ( oe instanceof Function ) {
            return oe.call(this, msg, ...args);
        }
    }.bind();
    return token;
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
    try { abortOnPropertyRead(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
