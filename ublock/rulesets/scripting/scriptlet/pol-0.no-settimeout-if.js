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

// pol-0

const argsList = [{"a":["PrebidDamOpen","800"]},{"a":["HubAPI","3000"]},{"a":["/getComputedStyle[\\s\\S]*?style\\.display=\"none\"[\\s\\S]*?styleBlocked[\\s\\S]*?detected/"]},{"a":["function check(){console.log(\"checked\");if($(\".adform\").children().length>3){console.log(\"its more\");$(\".adform\").children(\".adform-banner\").show();clearTimeout(check)}}","1000"]},{"a":["ubfix()"]},{"a":["no-ads-info"]},{"a":["bioEp.showPopup"]},{"a":["adBanner"]},{"a":["_actions(a)","2"]},{"a":["mdpDeBlocker"]},{"a":["block","0"]},{"a":["detected","300"]},{"a":["showAdblockImage","2000"]}];

const hostnamesMap = new Map([["www.dobreprogramy.pl",0],["kafeteria.pl",1],["polygamia.pl",1],["open.fm",1],["pudelek.pl",1],["wp.pl",2],["naekranie.pl",3],["purepc.pl",4],["calcoolator.pl",5],["pl.vpnmentor.com",6],["start.me",7],["techsetter.pl",8],["temi.pl",9],["film.wp.pl",[10,11]],["www.o2.pl",10],["uroda.abczdrowie.pl",10],["money.pl",11],["komorkomania.pl",11],["abczdrowie.pl",11],["fotoblogia.pl",11],["gadzetomania.pl",11],["autokult.pl",11],["parenting.pl",11],["wiadomosci.wp.pl",11],["tech.wp.pl",11],["dom.wp.pl",11],["facet.wp.pl",11],["finanse.wp.pl",11],["gry.wp.pl",11],["gwiazdy.wp.pl",11],["kobieta.wp.pl",11],["ksiazki.wp.pl",11],["kuchnia.wp.pl",11],["moto.wp.pl",11],["opinie.wp.pl",11],["pogoda.wp.pl",11],["teleshow.wp.pl",11],["turystyka.wp.pl",11],["wideo.wp.pl",11],["wawalove.wp.pl",11],["karmopedia.pl",12]]);

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

