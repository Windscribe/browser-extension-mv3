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

// pol-0

const argsList = [{"a":["message","t.origin===k"]},{"a":["","show"]},{"a":["DOMContentLoaded","mdpDeBlocker"]},{"a":["DOMContentLoaded","showFallbackImage"]}];

const hostnamesMap = new Map([["kafeteria.pl",0],["polygamia.pl",0],["open.fm",0],["pudelek.pl",0],["dziennikbaltycki.pl",1],["dzienniklodzki.pl",1],["dziennikpolski24.pl",1],["dziennikzachodni.pl",1],["echodnia.eu",1],["expressbydgoski.pl",1],["expressilustrowany.pl",1],["gazetakrakowska.pl",1],["gazetalubuska.pl",1],["gazetawroclawska.pl",1],["gk24.pl",1],["gloswielkopolski.pl",1],["gol24.pl",1],["gp24.pl",1],["gra.pl",1],["gs24.pl",1],["kurierlubelski.pl",1],["motofakty.pl",1],["naszemiasto.pl",1],["nowiny24.pl",1],["nowosci.com.pl",1],["nto.pl",1],["polskatimes.pl",1],["pomorska.pl",1],["poranny.pl",1],["sportowy24.pl",1],["strefaagro.pl",1],["strefabiznesu.pl",1],["stronakobiet.pl",1],["telemagazyn.pl",1],["to.com.pl",1],["wspolczesna.pl",1],["exdb.net",2],["eska.pl",3]]);

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

