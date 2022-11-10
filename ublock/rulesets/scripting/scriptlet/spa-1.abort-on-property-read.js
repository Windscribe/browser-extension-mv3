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

// spa-1

const argsList = [{"a":["Object.prototype.autoRecov"]},{"a":["ad_nodes"]},{"a":["hb_now"]},{"a":["gothamBatAdblock"]},{"a":["adblock"]},{"a":["adsBlocked"]},{"a":["adblockDetected"]},{"a":["Bl0ckAdBl0ckCo"]},{"a":["ppAdblocks"]},{"a":["mMCheckAgainBlock"]},{"a":["lolaop"]},{"a":["adk_pdisp"]},{"a":["__clientAHV"]},{"a":["redirectpage"]},{"a":["initPopunder"]},{"a":["_cpp"]},{"a":["popurl"]},{"a":["zoneSett"]},{"a":["checkCookieClick"]},{"a":["_0x4e52"]},{"a":["Redirecionar"]},{"a":["scriptwz_url"]},{"a":["smrtSB"]},{"a":["asgPopScript"]},{"a":["Object.prototype.Focm"]},{"a":["smrtSP"]},{"a":["adbClick"]},{"a":["pub"]},{"a":["Pub2"]}];

const hostnamesMap = new Map([["pcworld.es",0],["tunovelaligera.com",1],["20minutos.es",2],["daemon-hentai.com",3],["seriesretro.com",3],["comando.to",4],["porno-japones.top",5],["tvplusgratis.com",6],["hobbugs.com",6],["cozinha.minhasdelicias.com",7],["diariodegoias.com.br",8],["outerspace.com.br",8],["1f1.in",9],["1i1.in",9],["fiuxy2.com",10],["pelispop.me",11],["pelisplus.icu",12],["baixartorrents.org",[13,14]],["pctmix1.com",15],["aquariumgays.com",15],["allfeeds.live",16],["grantorrent.nl",17],["hentaistube.com",18],["libertinga.net",19],["mrpiracy.top",20],["seireshd.com",21],["cinetux.to",[22,23]],["holanime.com",24],["pirlotv.es",25],["repelisplus.vip",26],["descargaranimehentai.com",27],["tuhentaionline.com",28]]);

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

