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

/// name abort-current-script
/// alias acs
/// alias abort-current-inline-script
/// alias acis

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_abortCurrentScript() {

/******************************************************************************/

// swe-1

const argsList = [{"a":["jQuery","adblockdetect"]},{"a":["nwtThirdParties"]},{"a":["monsterinsights_frontend"]},{"a":["document.onkeydown","e"]},{"a":["document.onkeypress"]},{"a":["frames","oncontextmenu"]},{"a":["jQuery","contextmenu"]},{"a":["jQuery","wizard_accordion"]},{"a":["b2a"]},{"a":["Di","initAds"]},{"a":["showConsentDlg"]},{"a":["DN","initAds"]},{"a":["$","banner_loader"]},{"a":["$",".modal"]},{"a":["advads_passive_placements"]},{"a":["document.oncontextmenu"]},{"a":["show_msg"]},{"a":["$","shuffle"]},{"a":["exactmetrics_scroll_tracking_load"]},{"a":["$","e.preventDefault"]},{"a":["setTimeout","test"]},{"a":["checkCampaignCookie"]},{"a":["body_class_list"]},{"a":["animate"]},{"a":["Bau","preloadAds"]}];

const hostnamesMap = new Map([["affarsstaden.se",0],["arvikanyheter.se",1],["dalslanningen.se",1],["filipstadstidning.se",1],["fryksdalsbygden.se",1],["hjotidning.se",1],["kt-kuriren.se",1],["kt.se",1],["mariestadstidningen.se",1],["nkp.se",1],["nlt.se",1],["nwt.se",1],["provinstidningen.se",1],["saffletidningen.se",1],["sla.se",1],["vf.se",1],["boktugg.se",2],["carup.se",2],["dinbyggare.se",2],["ettgottskratt.se",2],["humorbibeln.se",2],["lakartidningen.se",2],["matsafari.nu",2],["newsner.com",2],["sportbibeln.se",2],["sportpanelen.se",2],["trafiksakerhet.se",2],["villalivet.se",2],["zeinaskitchen.se",2],["byggipedia.se",[3,4,5,6,7,8]],["byggvarlden.se",8],["cannabis.se",8],["egoinas.se",8],["enkelteknik.se",8],["hamnen.se",8],["influens.se",8],["tidningen.djurskyddet.se",8],["vegomagasinet.se",8],["di.se",9],["dinlivsstil.nu",10],["foretagsverige.se",10],["forskningsverige.se",10],["grillbibeln.se",10],["hallbarhetsverige.se",10],["kampenmotcancer.se",10],["motorbibeln.se",10],["tillvaxtsverige.se",10],["folkhalsasverige.se",10],["dn.se",11],["evertiq.se",12],["fuska.se",13],["hejaolika.se",14],["husbilsplats.se",15],["spelhubben.se",15],["medibok.se",16],["nasdaqomxnordic.com",17],["newsvoice.se",18],["norpan.se",19],["skrattsajten.com",19],["polestarclubsweden.se",20],["svensktgolfforum.se",20],["sakochliv.se",21],["svenskjakt.se",22],["themoviefreak.se",23],["www.expressen.se",24]]);

/******************************************************************************/

// Issues to mind before changing anything:
//  https://github.com/uBlockOrigin/uBlock-issues/issues/2154

const scriptlet = (
    target = '',
    needle = '',
    context = ''
) => {
    if ( target === '' ) { return; }
    const reRegexEscape = /[.*+?^${}()|[\]\\]/g;
    const reNeedle = (( ) => {
        if ( needle === '' ) { return /^/; }
        if ( /^\/.+\/$/.test(needle) ) {
            return new RegExp(needle.slice(1,-1));
        }
        return new RegExp(needle.replace(reRegexEscape, '\\$&'));
    })();
    const reContext = (( ) => {
        if ( context === '' ) { return; }
        if ( /^\/.+\/$/.test(context) ) {
            return new RegExp(context.slice(1,-1));
        }
        return new RegExp(context.replace(reRegexEscape, '\\$&'));
    })();
    const chain = target.split('.');
    let owner = window;
    let prop;
    for (;;) {
        prop = chain.shift();
        if ( chain.length === 0 ) { break; }
        owner = owner[prop];
        if ( owner instanceof Object === false ) { return; }
    }
    let value;
    let desc = Object.getOwnPropertyDescriptor(owner, prop);
    if (
        desc instanceof Object === false ||
        desc.get instanceof Function === false
    ) {
        value = owner[prop];
        desc = undefined;
    }
    const magic = String.fromCharCode(Date.now() % 26 + 97) +
                  Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const scriptTexts = new WeakMap();
    const getScriptText = elem => {
        let text = elem.textContent;
        if ( text.trim() !== '' ) { return text; }
        if ( scriptTexts.has(elem) ) { return scriptTexts.get(elem); }
        const [ , mime, content ] =
            /^data:([^,]*),(.+)$/.exec(elem.src.trim()) ||
            [ '', '', '' ];
        try {
            switch ( true ) {
            case mime.endsWith(';base64'):
                text = self.atob(content);
                break;
            default:
                text = self.decodeURIComponent(content);
                break;
            }
        } catch(ex) {
        }
        scriptTexts.set(elem, text);
        return text;
    };
    const validate = ( ) => {
        const e = document.currentScript;
        if ( e instanceof HTMLScriptElement === false ) { return; }
        if ( reContext !== undefined && reContext.test(e.src) === false ) {
            return;
        }
        if ( reNeedle.test(getScriptText(e)) === false ) { return; }
        throw new ReferenceError(magic);
    };
    Object.defineProperty(owner, prop, {
        get: function() {
            validate();
            return desc instanceof Object
                ? desc.get.call(owner)
                : value;
        },
        set: function(a) {
            validate();
            if ( desc instanceof Object ) {
                desc.set.call(owner, a);
            } else {
                value = a;
            }
        }
    });
    const oe = window.onerror;
    window.onerror = function(msg) {
        if ( typeof msg === 'string' && msg.includes(magic) ) {
            return true;
        }
        if ( oe instanceof Function ) {
            return oe.apply(this, arguments);
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
