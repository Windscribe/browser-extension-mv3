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

/// name no-addeventlistener-if
/// alias noaelif
/// alias aeld

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_noAddEventListenerIf() {

/******************************************************************************/

// cze-0

const argsList = [{"a":["click","location"]},{"a":["ended"]},{"a":["message","fishing"]},{"a":["message","_0x"]},{"a":["beforeunload","()"]}];

const hostnamesMap = new Map([["indian-tv.cz",0],["nerdfix.cz",0],["navratdoreality.cz",1],["seznamzpravy.cz",2],["novinky.cz",[2,4]],["seznam.cz",2],["super.cz",[2,3,4]],["stream.cz",2],["idnes.cz",4],["aktualne.cz",4],["reflex.cz",4],["zive.cz",4],["e15.cz",4],["blesk.cz",4],["ahaonline.cz",4],["auto.cz",4],["maminka.cz",4],["autorevue.cz",4],["osobnosti.cz",4],["lidovky.cz",4],["iprima.cz",4],["kupi.cz",4],["kinobox.cz",4],["cnews.cz",4],["zeny.cz",4],["expres.cz",4],["tiscali.cz",4],["extra.cz",4],["onetv.cz",4],["dama.cz",4],["g.cz",4],["mojecelebrity.cz",4],["spisovatele.cz",4],["modnipeklo.cz",4],["karaoketexty.cz",4],["hnonline.sk",4],["emimino.cz",4],["vitalion.cz",4],["mojezdravi.cz",4],["abicko.cz",4],["arome.cz",4],["labuznik.cz",4],["fights.cz",4],["nasepenize.cz",4]]);

/******************************************************************************/

const regexpFromArg = arg => {
    if ( arg === '' ) { return /^/; }
    if ( /^\/.+\/$/.test(arg) ) { return new RegExp(arg.slice(1,-1)); }
    return new RegExp(arg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
};

/******************************************************************************/

const scriptlet = (
    needle1 = '',
    needle2 = ''
) => {
    const reNeedle1 = regexpFromArg(needle1);
    const reNeedle2 = regexpFromArg(needle2);
    self.EventTarget.prototype.addEventListener = new Proxy(
        self.EventTarget.prototype.addEventListener,
        {
            apply: function(target, thisArg, args) {
                let type, handler;
                try {
                    type = String(args[0]);
                    handler = String(args[1]);
                } catch(ex) {
                }
                if (
                    reNeedle1.test(type) === false ||
                    reNeedle2.test(handler) === false
                ) {
                    return target.apply(thisArg, args);
                }
            }
        }
    );
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

