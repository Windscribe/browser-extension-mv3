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

// ruleset: annoyances-cookies

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_setCookie() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"kali-cc-agreed\",\"true\"]","[\"CookieConsent\",\"OK\"]","[\"cookietypes\",\"OK\"]","[\"consent_setting\",\"OK\",\"\",\"reload\",\"1\"]","[\"user_accepts_cookies\",\"true\"]","[\"ra-cookie-disclaimer-11-05-2022\",\"true\"]","[\"acceptMatomo\",\"true\"]","[\"BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_LOADED\",\"1\"]","[\"BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_VIEWED\",\"1\"]","[\"BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_Functional\",\"1\"]","[\"ARE_FUNCTIONAL_COOKIES_ACCEPTED\",\"true\"]","[\"ARE_MARKETING_COOKIES_ACCEPTED\",\"true\"]","[\"ARE_REQUIRED_COOKIES_ACCEPTED\",\"true\"]","[\"HAS_COOKIES_FORM_SHOWED\",\"true\"]","[\"acceptedCookies\",\"true\"]","[\"cookieMessageHide\",\"true\"]","[\"sq\",\"3\"]","[\"notice_preferences\",\"2\"]","[\"cookie_consent_all\",\"1\"]","[\"eb_cookie_agree\",\"1\"]","[\"sc-cookies-accepted\",\"true\"]","[\"ccpa-notice-viewed-02\",\"true\"]","[\"cookieConsent\",\"yes\"]","[\"dsgvo_consent\",\"1\"]","[\"plenty-shop-cookie\",\"0\"]","[\"acceptedPolicy\",\"true\"]","[\"cookie-consent\",\"false\"]","[\"consent-analytics\",\"false\"]","[\"cookieConsentClosed\",\"true\"]","[\"cookie_visited\",\"true\"]","[\"_tvsPrivacy\",\"true\"]","[\"epCookieConsent\",\"1\"]","[\"intro\",\"true\"]","[\"SeenCookieBar\",\"true\"]","[\"AllowCookies\",\"true\"]","[\"cookiesAccepted\",\"3\"]","[\"gdpr_dismissal\",\"true\"]","[\"uev2.gg\",\"true\"]","[\"cookie-preference\",\"1\"]","[\"closeNotificationAboutCookie\",\"true\"]","[\"cookie-policy\",\"true\"]","[\"bitso_cc\",\"1\"]","[\"AcceptKeksit\",\"0\",\"\",\"reload\",\"1\"]","[\"cookiepref\",\"true\"]","[\"cookieconsent_status\",\"1\"]","[\"PVH_COOKIES_GDPR\",\"Accept\"]","[\"PVH_COOKIES_GDPR_SOCIALMEDIA\",\"Reject\"]","[\"PVH_COOKIES_GDPR_ANALYTICS\",\"Reject\"]","[\"notice_preferences\",\"1\"]","[\"gdpr_opt_in\",\"1\"]"];

const hostnamesMap = new Map([["clearblue.com",0],["jku.at",1],["book-n-drive.de",2],["cotswoldoutdoor.com",3],["cam.start.canon",4],["researchaffiliates.com",5],["singkinderlieder.de",6],["britishairways.com",[7,8,9]],["cineman.pl",[10,11,12]],["tv-trwam.pl",[10,11,12,13]],["vivaldi.com",14],["emuia1.gugik.gov.pl",15],["nike.com",16],["adidas.com",17],["colourbox.com",18],["ebilet.pl",19],["snap.com",20],["ratemyprofessors.com",21],["filen.io",22],["dasfutterhaus.at",23],["stilord.com",24],["stilord.pl",24],["stilord.de",24],["stilord.fr",24],["quantamagazine.org",25],["followalice.com",26],["scaleway.com",27],["hellotv.nl",28],["qatarairways.com",29],["lasestrellas.tv",30],["bikepro.de",31],["kaffeediscount.com",31],["vamos-skateshop.com",31],["holland-shop.com",31],["officesuite.com",32],["fups.com",[33,34]],["scienceopen.com",35],["calendly.com",36],["ubereats.com",37],["leki.com",38],["101internet.ru",39],["tunnelmb.net",40],["bitso.com",41],["eco-toimistotarvikkeet.fi",42],["proficient.fi",42],["developer.ing.com",43],["ehealth.gov.gr",44],["calvinklein.se",[45,46,47]],["calvinklein.fi",[45,46,47]],["calvinklein.sk",[45,46,47]],["calvinklein.si",[45,46,47]],["calvinklein.ch",[45,46,47]],["calvinklein.ru",[45,46,47]],["calvinklein.com",[45,46,47]],["calvinklein.pt",[45,46,47]],["calvinklein.pl",[45,46,47]],["calvinklein.at",[45,46,47]],["calvinklein.nl",[45,46,47]],["calvinklein.hu",[45,46,47]],["calvinklein.lu",[45,46,47]],["calvinklein.lt",[45,46,47]],["calvinklein.lv",[45,46,47]],["calvinklein.it",[45,46,47]],["calvinklein.ie",[45,46,47]],["calvinklein.hr",[45,46,47]],["calvinklein.fr",[45,46,47]],["calvinklein.es",[45,46,47]],["calvinklein.ee",[45,46,47]],["calvinklein.de",[45,46,47]],["calvinklein.dk",[45,46,47]],["calvinklein.cz",[45,46,47]],["calvinklein.bg",[45,46,47]],["calvinklein.be",[45,46,47]],["calvinklein.co.uk",[45,46,47]],["formula1.com",48],["howstuffworks.com",49]]);

const entitiesMap = new Map([]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function setCookie(
    name = '',
    value = '',
    path = ''
) {
    if ( name === '' ) { return; }
    name = encodeURIComponent(name);

    const validValues = new Set([
        'true', 'True',
        'false', 'False',
        'yes', 'Yes', 'y', 'Y',
        'no', 'No', 'n', 'N',
        'ok', 'OK',
        'Accept', 'Reject',
    ]);
    if ( validValues.has(value) === false ) {
        if ( /^\d+$/.test(value) === false ) { return; }
        const n = parseInt(value, 10);
        if ( n > 15 ) { return; }
    }
    value = encodeURIComponent(value);

    setCookieHelper(
        name,
        value,
        '',
        path,
        getExtraArgs(Array.from(arguments), 3)
    );
}

function getExtraArgs(args, offset = 0) {
    return Object.fromEntries(getExtraArgsEntries(args, offset));
}

function setCookieHelper(
    name = '',
    value = '',
    expires = '',
    path = '',
    options = {},
) {
    const cookieExists = (name, value) => {
        return document.cookie.split(/\s*;\s*/).some(s => {
            const pos = s.indexOf('=');
            if ( pos === -1 ) { return false; }
            if ( s.slice(0, pos) !== name ) { return false; }
            if ( s.slice(pos+1) !== value ) { return false; }
            return true;
        });
    };

    if ( options.reload && cookieExists(name, value) ) { return; }

    const cookieParts = [ name, '=', value ];
    if ( expires !== '' ) {
        cookieParts.push('; expires=', expires);
    }

    if ( path === '' ) { path = '/'; }
    else if ( path === 'none' ) { path = ''; }
    if ( path !== '' && path !== '/' ) { return; }
    if ( path === '/' ) {
        cookieParts.push('; path=/');
    }
    document.cookie = cookieParts.join('');

    if ( options.reload && cookieExists(name, value) ) {
        window.location.reload();
    }
}

function getExtraArgsEntries(args, offset) {
    return args.slice(offset).reduce((out, v, i, a) => {
        if ( (i & 1) === 0 ) {
            const rawValue = a[i+1];
            const value = /^\d+$/.test(rawValue)
                ? parseInt(rawValue, 10)
                : rawValue;
            out.push([ a[i], value ]);
        }
        return out;
    }, []);
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
    try { setCookie(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
