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

/// name abort-on-property-write
/// alias aopw

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_abortOnPropertyWrite() {

/******************************************************************************/

// pol-0

const argsList = [{"a":["ads"]},{"a":["ub_ct_load"]},{"a":["iaqExt"]},{"a":["detectAB"]},{"a":["_yhbog"]},{"a":["yafaIt"]},{"a":["AdservingModule"]},{"a":["_pop"]}];

const hostnamesMap = new Map([["playpuls.pl",0],["autocentrum.pl",1],["demotywatory.pl",1],["dziennik.pl",1],["facetemjestem.pl",1],["gala.pl",1],["garnek.pl",1],["gry-online.pl",1],["jegostrona.pl",1],["joemonster.org",1],["kobieta.pl",1],["komixxy.pl",1],["transfery.info",1],["v10.pl",1],["facet.wp.pl",2],["gwiazdy.wp.pl",2],["teleshow.wp.pl",2],["bankier.pl",3],["filiser.tv",4],["eurogamer.pl",5],["shinden.pl",6],["exdb.net",7]]);

/******************************************************************************/

const magic =
    String.fromCharCode(Date.now() % 26 + 97) +
    Math.floor(Math.random() * 982451653 + 982451653).toString(36);

const abort = function() {
    throw new ReferenceError(magic);
};

const scriptlet = (
    prop = ''
) => {
    let owner = window;
    for (;;) {
        const pos = prop.indexOf('.');
        if ( pos === -1 ) { break; }
        owner = owner[prop.slice(0, pos)];
        if ( owner instanceof Object === false ) { return; }
        prop = prop.slice(pos + 1);
    }
    delete owner[prop];
    Object.defineProperty(owner, prop, {
        set: function() {
            abort();
        }
    });
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

