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

// swe-1

const argsList = [{"a":["blur","i.focusPlayerElement"]},{"a":["scroll","t.view.updateBounds"]},{"a":["scroll","helpers.scroll(id)"]},{"a":["/adblockDetector|adsInserted|partnerExternalLinkClick/"]},{"a":["click"]},{"a":["contextmenu"]},{"a":["/^(?:adBlocker|contextmenu)$/"]},{"a":["omniPulseLoaded"]},{"a":["/contextmenu|cut|copy|paste/"]},{"a":["click","e.preventDefault"]},{"a":["loadstart"]},{"a":["wheel"]},{"a":["/mousewheel|DOMMouseScroll/"]}];

const hostnamesMap = new Map([["allas.se",[0,1]],["baaam.se",[0,1]],["elle.se",[0,1]],["femina.se",[0,1]],["frida.se",[0,1]],["hant.se",[0,1]],["mabra.com",[0,1]],["motherhood.se",[0,1]],["residencemagazine.se",[0,1]],["svenskdam.se",[0,1]],["arvikamagasinet.se",2],["barometern.se",2],["blt.se",2],["borasdly.se",2],["bt.se",2],["cafe.se",2],["goteborgdirekt.se",2],["idrottensaffarer.se",2],["kalmarposten.se",2],["klt.nu",2],["kristianstadsbladet.se",2],["lokalti.se",2],["meraosterlen.se",2],["mitti.se",2],["nsk.se",2],["olandsbladet.se",2],["praktisktbatagande.se",2],["smp.se",2],["sydostran.se",2],["trelleborgsallehanda.se",2],["ut.se",2],["vasterastidning.se",2],["vaxjobladet.se",2],["viivilla.se",2],["vxonews.se",2],["ystadsallehanda.se",2],["byggahus.se",3],["devote.se",4],["fotosidan.se",5],["illvet.se",5],["nyan.ax",5],["spelhubben.se",5],["streamio.com",5],["varldenshistoria.se",5],["lwcdn.com",6],["omni.se",7],["omniekonomi.se",7],["sexpacket.se",8],["www.expressen.se",9],["youplay.se",10],["affarsstaden.se",11],["boktugg.se",11],["kurera.se",11],["lundagard.se",11],["macken.xyz",11],["morotsliv.com",11],["outsidesweden.se",11],["home2tiny.se",12]]);

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

