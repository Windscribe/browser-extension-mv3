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

/// name no-settimeout-if
/// alias no-setTimeout-if
/// alias nostif

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_noSetTimeoutIf() {

/******************************************************************************/

// tur-0

const argsList = [{"a":["0===o.offsetLeft&&0===o.offsetTop"]},{"a":["test.offsetHeight"]},{"a":["wt()","100"]},{"a":["si()","100"]}];

const hostnamesMap = new Map([["zamaninvarken.com",0],["kredi.biz.tr",0],["kriptoradar.com",0],["morlevha.com",0],["bakimlikadin.net",0],["korsanedebiyat.com",0],["ozbeceriksizler.co",0],["genelpara.com",0],["azbuz.org",0],["mustafabukulmez.com",0],["apathe.net",1],["eksisozluk.com",[2,3]]]);

/******************************************************************************/

const scriptlet = (
    needle = '',
    delay = ''
) => {
    const needleNot = needle.charAt(0) === '!';
    if ( needleNot ) { needle = needle.slice(1); }
    if ( delay === '' ) { delay = undefined; }
    let delayNot = false;
    if ( delay !== undefined ) {
        delayNot = delay.charAt(0) === '!';
        if ( delayNot ) { delay = delay.slice(1); }
        delay = parseInt(delay, 10);
    }
    if ( needle.startsWith('/') && needle.endsWith('/') ) {
        needle = needle.slice(1,-1);
    } else if ( needle !== '' ) {
        needle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const reNeedle = new RegExp(needle);
    const regexpTest = RegExp.prototype.test;
    self.setTimeout = new Proxy(self.setTimeout, {
        apply: function(target, thisArg, args) {
            const a = String(args[0]);
            const b = args[1];
            let defuse;
            if ( needle !== '' ) {
                defuse = regexpTest.call(reNeedle, a) !== needleNot;
            }
            if ( defuse !== false && delay !== undefined ) {
                defuse = (b === delay || isNaN(b) && isNaN(delay) ) !== delayNot;
            }
            if ( defuse ) {
                args[0] = function(){};
            }
            return target.apply(thisArg, args);
        }
    });
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

