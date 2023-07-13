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

(function uBOL_trustedSetCookie() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"OptanonAlertBoxClosed\",\"$currentDate$\",\"1year\"]","[\"SOCS\",\"CAESEwgDEgk1MjE4NjcxMTIaAmVuIAEaBgiAl7ihBg\",\"1year\",\"\",\"reload\",\"1\"]","[\"SOCS\",\"CAESHAgBEhJnd3NfMjAyMzA2MTItMF9SQzIaAmZpIAEaBgiAzK6kBg\",\"1year\"]","[\"datr\",\"__GMZCgwVF5BbyvAtfJojQwg\",\"1year\",\"\",\"reload\",\"1\"]","[\"ig_did\",\"0C826C21-17C3-444A-ABB7-EBABD37214D7\",\"1year\",\"\",\"reload\",\"1\"]","[\"euconsent-v2\",\"CPtgasAPtgasAAGABCENDECgAAAAAAAAAApAAAAAAAAA.YAAAAAAAAAAA\",\"1year\"]","[\"consentUUID\",\"dde2fbcb-0722-417a-92be-67407ba369de_20\",\"1year\"]","[\"euconsent-v2\",\"CPt3fQAPt3fQACNAFAENDLCgAAAAAAAAACiQAAAOCgDAB-AIsAZ8A6QDBAHBAAAA.YAAAAAAAAAAA\",\"1year\"]","[\"tracking-opt-in-status\",\"rejected\",\"1year\"]","[\"addtl_consent\",\"1~\",\"1year\"]","[\"dm-euconsent-v2\",\"CPt6yMAPt6yMABpAGAENDECgAAAAAH_AAAqIAAAS3AJMNW4gC7MocGbQMIoEQIwrCQigUAEFAMLRAQAODgp2VgE-sIkAKAUARgRAhwBRkQCAAASAJCIAJAiwQAAAiAQAAgAQCIQAMDAIKACwEAgABAdAxRCgAECQgSIiIhTAgKgSCAlsqEEoLpDTCAKssAKARGwUACIJARWAAICwcAwRICViwQJMQbRAAMAKAUSoVqKT00BCxmQAAAAA\",\"1year\"]","[\"consentUUID\",\"9f883906-c5ae-4d90-80a1-6623a4211ad4_21\",\"1year\"]","[\"consentUUID\",\"629d4124-fa7b-43b4-8158-d596cef1004d_21\",\"1year\"]","[\"consentUUID\",\"f0aaedd0-2a07-443a-b90f-055c553b5160_21\",\"1year\"]","[\"consentUUID\",\"14ec7082-be8b-4b4c-a5b4-668972e0e04b_21\",\"1year\"]","[\"fig_save_consent\",\"iTTPgpSWqAGGcd3vV88zNDbHsABxE1hB\",\"1year\"]","[\"euconsent-v2\",\"CPubvkAPubvkAAHABBENDMCgAAAAAAAAAB5YAAAAAAAA.YAAAAAAAAAAA\",\"1year\"]","[\"_EVAcookieaccept\",\"Y\",\"1year\"]","[\"_EVAGDPRfunctional\",\"Y\",\"1year\"]","[\"OptanonConsent\",\"groups=C0004%3A0%2CC0003%3A1%2CC0002%3A0%2CC0001%3A1%2CSTACK42%3A0\",\"1year\"]","[\"eupubconsent-v2\",\"CPt6LrpPt6LrpAcABBENDKCgAAAAAAAAAAYgGBtX_T5eb2vj-3ZcN_tkaYwP55y3o2wzhhaIke8NwIeH7BoGJ2MwvBV4JiACGBAkkiKBAQVlHGBcCQAAgIgRiSKMYk2MjzNKJLJAilMbO0NYCD9mnkHT2ZCY70-uO__zvneAAAAYJABAXmKgAgLzGQAQF5joAIC8yUAEBeZSACAvMAAA.YAAAAAAAAAAA\",\"1year\",\"\",\"reload\",\"1\"]","[\"OptanonConsent\",\"groups=1%3A1%2C2%3A0%2C3%3A1%2C4%3A0%2C5%3A1%2CBG57%3A0%2CBG58%3A0%2CBG59%3A0\",\"1year\"]","[\"TcString\",\"CPtgasAPtgasABUAMAFIDICgAP_AAAAAAApAAAAMEgLgALAAqABkADwAIAAZAA0AB8AEQAJgATwA5gB-AEIANEAbIBFgC0gGKAM-AmQBeYDBACQkBAABYAFQAMgAeABAADIAGgARAAmABPADmAH4AQgA2QDFALzDQAgBsgFpEQAQBsioAYATAC0gLzGQAgAmALzHQFAAFgAVAAyACAAGQANAAfABEACYAE8AOYAfgBogDZAIsAWkAxQB1AEyALzIQBgAFgAZACYAWkAxQB1CUAkABYAGQAiABMAGyAWkAxQB1AF5lICAACwAKgAZABAADIAGgARAAmABPADmAH4AaIA2QCLAGKAXmAAA.YAAAAAAAAIAA\",\"1year\"]","[\"gravitoData\",\"{\\\"NonTCFVendors\\\":[{\\\"id\\\":1,\\\"name\\\":\\\"Facebook\\\",\\\"consent\\\":true},{\\\"id\\\":3,\\\"name\\\":\\\"Google\\\",\\\"consent\\\":true},{\\\"id\\\":9,\\\"name\\\":\\\"Twitter\\\",\\\"consent\\\":true}]}\",\"1year\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A0%2CC0005%3A0\",\"1year\"]","[\"ladies-cookies-overlay\",\"%7B%22cookie-category-essential%22%3Atrue%2C%22cookie-category-stats%22%3Afalse%2C%22cookie-category-map_services%22%3Atrue%7D\",\"\",\"\",\"reload\",\"1\"]","[\"opt_out\",\"analyse,werbe\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0003%3A1%2CSPD_BG%3A1%2CC0002%3A1%2CC0004%3A1%2CC0005%3A1\",\"\",\"\",\"reload\",\"1\"]","[\"STYXKEY_your_privacy_settings\",\"%7B%22strict%22%3A%221%22%2C%22thirdparty%22%3A%221%22%2C%22advanced%22%3A%220%22%7D\",\"1year\",\"\",\"reload\",\"1\"]","[\"consentUUID\",\"5937071e-5211-4df8-b4f9-89a0d5919eae_20\",\"1year\"]","[\"consentUUID\",\"8fde91ba-0aba-476f-af30-e7427e3c246d_21\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0009%3A0%2CC0002%3A0%2CC0003%3A1%2CC0004%3A1\",\"1year\"]","[\"allowCookies\",\"{\\\"uvc\\\":true,\\\"__cfduid\\\":true}\"]","[\"cookieConsent\",\"%5B%7B%22name%22%3A%22essenziell%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22komfort%22%2C%22value%22%3A%22on%22%7D%2C%7B%22name%22%3A%22marketing%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22statistik%22%2C%22value%22%3A%22off%22%7D%2C%7B%22name%22%3A%22speichern%22%2C%22value%22%3A%22on%22%7D%5D\",\"1year\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0002%3A0%2CC0003%3A1%2CC0004%3A0%2CC0005%3A1\",\"1year\"]","[\"consents\",\":4:6:7:8:9:10:11:12:13:19:\"]","[\"__cmpcpc\",\"__1_2__\"]","[\"__cmpcvc\",\"__c24599_s94_c24102_s40_s1052_s65_c24103_s23_c9953_c24290_c24098_s26_s2612_s135_s1104_s1409_s905_s24_c24202_c22143_c21373_s77_s30_U__\"]","[\"__cmpconsentx40263\",\"BPuKNGaPuKNGaAfEHBFIABAAAAA_mABAfyA\"]","[\"consent-levels\",\"1-1_2-1_3-0_4-0\",\"1year\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0002%3A0%2CC0003%3A1%2CC0004%3A1\",\"1year\"]","[\"OptanonConsent\",\"groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A1\"]"];

const hostnamesMap = new Map([["gamespot.com",[0,24]],["mtvuutiset.fi",[0,21]],["thejournal.ie",[0,41]],["vkmag.com",[0,19,20]],["zdnet.com",[0,34]],["youtube.com",1],["facebook.com",3],["instagram.com",4],["bloomberg.com",[5,6]],["fandom.com",[7,8,9]],["dailymotion.com",10],["standard.co.uk",11],["independent.co.uk",12],["theguardian.com",13],["bbc.com",14],["lefigaro.fr",15],["filmweb.pl",16],["evaair.com",[17,18]],["arvopaperi.fi",[22,23]],["iltalehti.fi",[22,23]],["kauppalehti.fi",[22,23]],["mediuutiset.fi",[22,23]],["mikrobitti.fi",[22,23]],["talouselama.fi",[22,23]],["tekniikkatalous.fi",[22,23]],["tivi.fi",[22,23]],["uusisuomi.fi",[22,23]],["asialadies.de",25],["avladies.de",25],["badeladies.de",25],["behaarteladies.de",25],["bizarrladies.de",25],["busenladies.de",25],["deutscheladies.de",25],["devoteladies.de",25],["dominanteladies.de",25],["erfahreneladies.de",25],["escorts24.de",25],["exklusivladies.de",25],["fkk24.de",25],["grosseladies.de",25],["hobbyladies.de",25],["jungeladies.de",25],["kollegin.de",25],["kussladies.de",25],["ladies.de",25],["latinaladies.de",25],["massierendeladies.de",25],["mollyladies.de",25],["nsladies.de",25],["nymphomaneladies.de",25],["orientladies.de",25],["osteuropaladies.de",25],["piercingladies.de",25],["rasierteladies.de",25],["schokoladies.de",25],["tattooladies.de",25],["tsladies.de",25],["zaertlicheladies.de",25],["zierlicheladies.de",25],["1a-finanzmarkt.de",26],["1a-immobilienmarkt.de",26],["1a-reisemarkt.de",26],["1a-singleboerse.de",26],["1a-stellenmarkt.de",26],["gameinformer.com",27],["christianconcern.com",28],["aamulehti.fi",29],["etlehti.fi",29],["gloria.fi",29],["hs.fi",29],["hyvaterveys.fi",29],["is.fi",29],["jamsanseutu.fi",29],["janakkalansanomat.fi",29],["kankaanpaanseutu.fi",29],["kmvlehti.fi",29],["kodinkuvalehti.fi",29],["merikarvialehti.fi",29],["nokianuutiset.fi",29],["rannikkoseutu.fi",29],["satakunnankansa.fi",29],["soppa365.fi",29],["suurkeuruu.fi",29],["sydansatakunta.fi",29],["tyrvaansanomat.fi",29],["valkeakoskensanomat.fi",29],["vauva.fi",29],["eurogamer.de",30],["vogue.co.uk",31],["wired.com",31],["jekabpils.lv",32],["aachener-bank.de",33],["bernhauser-bank.de",33],["bodenseebank.de",33],["bremischevb.de",33],["cvw-privatbank-ag.de",33],["dervolksbanker.de",33],["gladbacher-bank.de",33],["meine-rvb.de",33],["meinebank.de",33],["muenchner-bank.de",33],["nordthueringer-volksbank.de",33],["owl-immobilien.de",33],["raiba-gr.de",33],["raiba-ndwa.de",33],["raiba-westhausen.de",33],["rb-berghuelen.de",33],["rb-denzlingen-sexau.de",33],["rb-eching.de",33],["rb-hardt-bruhrain.de",33],["rb-oberaudorf.de",33],["rb-sondelfingen.de",33],["rv-banken.de",33],["saechsischer-gewinnsparverein.de",33],["skbwitten.de",33],["sparda-bank-hamburg.de",33],["sparda-sw.de",33],["vb-lauterecken.de",33],["vb-mittelhessen.de",33],["vb-rb.de",33],["vbleos.de",33],["vbsuedemsland.de",33],["voba-deisslingen.de",33],["voba-moeckmuehl.de",33],["volksbank-aktiv.de",33],["volksbank-backnang.de",33],["volksbank-daaden.de",33],["volksbank-dh.de",33],["volksbank-freiburg.de",33],["volksbank-international.de",33],["volksbank-kirnau.de",33],["volksbank-mittleres-erzgebirge.de",33],["volksbank-remseck.de",33],["volksbank-thueringen-mitte.de",33],["volksbank-trossingen.de",33],["volksbankeg.de",33],["vr-nopf.cz",33],["vrb-spangenberg.de",33],["vrbankeg.de",33],["vrbankimmobilien.de",33],["vvr-bank.de",33],["vvrbank-krp.de",33],["news.sky.com",35],["lippu.fi",[36,37,38]],["starcart.com",39],["sydan.fi",40]]);

const entitiesMap = new Map([["www.google",2]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function trustedSetCookie(
    name = '',
    value = '',
    offsetExpiresSec = '',
    path = ''
) {
    if ( name === '' ) { return; }

    const time = new Date();

    if ( value === '$now$' ) {
        value = Date.now();
    } else if ( value === '$currentDate$' ) {
        value = time.toUTCString();
    }

    let expires = '';
    if ( offsetExpiresSec !== '' ) {
        if ( offsetExpiresSec === '1day' ) {
            time.setDate(time.getDate() + 1);
        } else if ( offsetExpiresSec === '1year' ) {
            time.setFullYear(time.getFullYear() + 1);
        } else {
            if ( /^\d+$/.test(offsetExpiresSec) === false ) { return; }
            time.setSeconds(time.getSeconds() + parseInt(offsetExpiresSec, 10));
        }
        expires = time.toUTCString();
    }

    setCookieHelper(
        name,
        value,
        expires,
        path,
        getExtraArgs(Array.from(arguments), 4)
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
    try { trustedSetCookie(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
