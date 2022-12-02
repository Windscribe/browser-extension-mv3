/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2019-present Raymond Hill

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

    The scriptlets below are meant to be injected only into a
    web page context.
*/

/* jshint esversion:11 */

'use strict';

/******************************************************************************/

/// name abort-on-property-read
/// alias aopr

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_abortOnPropertyRead() {

/******************************************************************************/

// tur-0

const argsList = [{"a":["adblockmesaj"]},{"a":["detectAdBlock"]},{"a":["adsBlocked"]},{"a":["rTargets"]},{"a":["initPu"]},{"a":["initAd"]},{"a":["initPop"]},{"a":["oV1"]},{"a":["initDizi"]},{"a":["wpsite_clickable_data"]}];

const hostnamesMap = new Map([["mangawt.com",0],["hopena.net",0],["gsmturkey.net",0],["vidtekno.com",0],["telegramgruplari.com",1],["kanalmaras.com",2],["r10.net",3],["breakingbadizle.com",4],["diziday.com",4],["filmgezegeni.live",4],["zipfilmizle.com",4],["bamfilmizle.com",4],["sinemadafilm.com",4],["netflixcehennemi.com",4],["diziizles.com",4],["hdizlefilmleri.com",4],["filmmoduu.com",4],["abifilmizle.org",4],["hdfilmhit.com",4],["filmla.org",4],["trfilm.net",4],["dolufilm.org",4],["netflix-izle.com",4],["turkifsaalemi.com",4],["netfilmtvizle.com",4],["dizirun1.com",5],["fullfilmcibaba1.com",5],["fullfilmcidayi1.com",5],["filmsezonu.com",5],["fullhdfilmizleabi.com",5],["hdfreeizle.com",5],["erotikfilmsitesi.net",5],["fullfilmcidayim.com",5],["hdrealfilmizle.com",5],["hdmixfilim.com",5],["fullhdfilmizlepala.com",5],["diziroll.me",6],["dizilla4.com",6],["dizimini.com",6],["filmizlehub.com",6],["roketdizi.pw",6],["1080hdfilmizle.com",6],["shirl.club",7],["altporno.xyz",7],["ovpvideo.com",7],["diziyou.com",8],["technopat.net",9]]);

/******************************************************************************/

const ObjGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const ObjDefineProperty = Object.defineProperty;

const magic =
    String.fromCharCode(Date.now() % 26 + 97) +
    Math.floor(Math.random() * 982451653 + 982451653).toString(36);

const abort = function() {
    throw new ReferenceError(magic);
};

const makeProxy = function(owner, chain) {
    const pos = chain.indexOf('.');
    if ( pos === -1 ) {
        const desc = ObjGetOwnPropertyDescriptor(owner, chain);
        if ( !desc || desc.get !== abort ) {
            ObjDefineProperty(owner, chain, {
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

    const desc = ObjGetOwnPropertyDescriptor(owner, prop);
    if ( desc && desc.set !== undefined ) { return; }

    ObjDefineProperty(owner, prop, {
        get: function() { return v; },
        set: function(a) {
            v = a;
            if ( a instanceof Object ) {
                makeProxy(a, chain);
            }
        }
    });
};

const scriptlet = (
    chain = ''
) => {
    const owner = window;
    makeProxy(owner, chain);
    const oe = window.onerror;
    window.onerror = function(msg, src, line, col, error) {
        if ( typeof msg === 'string' && msg.includes(magic) ) {
            return true;
        }
        if ( oe instanceof Function ) {
            return oe(msg, src, line, col, error);
        }
    }.bind();
};

/******************************************************************************/

let hn;
try { hn = document.location.hostname; } catch(ex) { }
while ( hn ) {
    if ( hostnamesMap.has(hn) ) {
        let argsIndices = hostnamesMap.get(hn);
        if ( typeof argsIndices === 'number' ) { argsIndices = [ argsIndices ]; }
        for ( const argsIndex of argsIndices ) {
            const details = argsList[argsIndex];
            if ( details.n && details.n.includes(hn) ) { continue; }
            try { scriptlet(...details.a); } catch(ex) {}
        }
    }
    if ( hn === '*' ) { break; }
    const pos = hn.indexOf('.');
    if ( pos !== -1 ) {
        hn = hn.slice(pos + 1);
    } else {
        hn = '*';
    }
}

argsList.length = 0;
hostnamesMap.clear();

/******************************************************************************/

})();

/******************************************************************************/

