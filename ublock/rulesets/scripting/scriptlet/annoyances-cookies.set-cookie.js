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
/* global cloneInto */

'use strict';

// ruleset: annoyances-cookies

/******************************************************************************/

// Important!
// Isolate from global scope

// Start of local scope
(( ) => {

/******************************************************************************/

// Start of code to inject
const uBOL_setCookie = function() {

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = [["cookies_ok","true"],["kali-cc-agreed","true"],["AcceptedCookies","1"],["userCookieConsent","true"],["CookieConsent","true"],["privacy-policy-accepted","1"],["IsCookieAccepted","yes","","reload","1"],["gatsby-gdpr-google-tagmanager","true"],["legalOk","true"],["cp_cc_stats","1","","reload","1"],["cp_cc_ads","1"],["cookie-disclaimer","1"],["gdpr","1"],["accept-cookies","true"],["statistik","0"],["cookies-informer-close","true"],["cookie-consent","true"],["gdpr","0"],["required","1"],["ING_GPT","0"],["ING_GPP","0"],["cookiepref","1"],["shb-consent-cookies","true"],["cookies_consent","1"],["termos-aceitos","ok"],["ui-tnc-agreed","true"],["cookie-preference","1"],["accept_cookie","1"],["cookieconsent_status_new","3"],["_acceptCookies","1","","reload","1"],["_reiff-consent-cookie","yes"],["snc-cp","1"],["cookies-accepted","true"],["cookies-required","1","","reload","1"],["isReadCookiePolicyDNTAa","true"],["acceptCookies","true"],["mubi-cookie-consent","allow"],["isReadCookiePolicyDNT","Yes"],["ce-cookie","N"],["ivc_consent","3"],["cookie_accepted","1"],["cookie_accepted","true"],["UserCookieLevel","1"],["sat_track","false"],["Rodo","1"],["cookie_privacy_on","1"],["cookies-marketing","false"],["cookies-functional","true"],["cookies-preferences","false"],["__cf_gdpr_accepted","false"],["3t-cookies-essential","1"],["3t-cookies-functional","1"],["3t-cookies-performance","0"],["3t-cookies-social","0"],["allow_cookies_marketing","0"],["allow_cookies_tracking","0"],["cookie_prompt_dismissed","1"],["cookies_enabled","1"],["cookie","1","","reload","1"],["cookie-analytics","0"],["cc-set","1","","reload","1"],["allowCookies","1","","reload","1"],["rgp-gdpr-policy","1"],["jt-jobseeker-gdpr-banner","true","","reload","1"],["cookie-preferences-analytics","no"],["cookie-preferences-marketing","no"],["withings_cookieconsent_dismissed","1"],["cookieconsent_advertising","false"],["cookieconsent_statistics","false"],["CP_ESSENTIAL","1"],["CP_PREFERENCES","1"],["amcookie_allowed","1"],["pc_analitica_bizkaia","false"],["pc_preferencias_bizkaia","true"],["pc_tecnicas_bizkaia","true"],["gdrp_popup_showed","1"],["cookie_consent_accept","true"],["cookie-preferences-technical","yes"],["gdpr__google__analytics","false"],["gdpr__depop__functional","true"],["tracking_cookie","1"],["cookie-preference","2"],["cookie-preference_auto_accept","1"],["cookie-preference_renew7","1"],["pc234978122321234","1"],["ck_pref_all","1"],["ONCOSURCOOK","2"],["RY_COOKIE_CONSENT","true"],["cookieConsent","true","","reload","1"],["videoConsent","true"],["comfortConsent","true"],["cookieBannerAccepted","1","","reload","1"],["cookieMsg","true","","reload","1"],["abz_seo_choosen","1"],["ARE_DSGVO_PREFERENCES_SUBMITTED","true"],["dsgvo_consent","1"],["efile-cookiename-28","1"],["efile-cookiename-74","1"],["cookie_policy_closed","1","","reload","1"],["gvCookieConsentAccept","1","reload","","1"],["acceptEssential","1"],["baypol_banner","true"],["nagAccepted","true"],["baypol_functional","true"],["CookieConsent","OK"],["viewed_cookie_policy","yes","","reload","1"],["BM_Advertising","false","","reload","1"],["BM_User_Experience","true"],["BM_Analytics","false"],["DmCookiesAccepted","true","","reload","1"],["DmCookiesMarketing","false"],["DmCookiesAnalytics","false"],["cookietypes","OK"],["consent_setting","OK","","reload","1"],["user_accepts_cookies","true"],["gdpr_agreed","4"],["ra-cookie-disclaimer-11-05-2022","true"],["acceptMatomo","true"],["UBI_PRIVACY_POLICY_ACCEPTED","true"],["UBI_PRIVACY_POLICY_VIEWED","true"],["UBI_PRIVACY_VID_OPTOUT","false"],["UBI_PRIVACY_VIDEO_OPTOUT","false"],["BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_LOADED","1"],["BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_VIEWED","1"],["BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_Functional","1"],["ARE_FUNCTIONAL_COOKIES_ACCEPTED","true"],["ARE_MARKETING_COOKIES_ACCEPTED","true"],["ARE_REQUIRED_COOKIES_ACCEPTED","true"],["HAS_COOKIES_FORM_SHOWED","true"],["accepted_functional","yes"],["accepted_marketing","no"],["allow_the_cookie","yes"],["cookie_visited","true"],["drcookie","true"],["wed_cookie_info","1"],["acceptedCookies","true"],["cookieMessageHide","true"],["sq","3"],["notice_preferences","2"],["cookie_consent_all","1"],["eb_cookie_agree","1"],["sc-cookies-accepted","true"],["ccpa-notice-viewed-02","true"],["cookieConsent","yes"],["cookieConsent","true"],["plenty-shop-cookie","0"],["acceptedPolicy","true"],["cookie-consent","false"],["consent-analytics","false"],["cookieConsentClosed","true"],["_tvsPrivacy","true"],["epCookieConsent","1","","reload","1"],["intro","true"],["SeenCookieBar","true"],["AllowCookies","true"],["cookiesAccepted","3"],["cookiesAccepted","true"],["gdpr_dismissal","true"],["uev2.gg","true"],["closeNotificationAboutCookie","true"],["cookie-policy","true"],["allowCookie","1","","reload","1"],["bitso_cc","1"],["AcceptKeksit","0","","reload","1"],["cookiepref","true"],["cookieconsent_status","1"],["PVH_COOKIES_GDPR","Accept"],["PVH_COOKIES_GDPR_SOCIALMEDIA","Reject"],["PVH_COOKIES_GDPR_ANALYTICS","Reject"],["notice_preferences","1"],["gdpr_opt_in","1"],["cookie_policy_agreement","3"]];

const hostnamesMap = new Map([["project529.com",0],["clearblue.com",1],["more.com",2],["nwslsoccer.com",2],["climatecentral.org",3],["dentmania.de",4],["pacstall.dev",5],["de-appletradein.likewize.com",6],["swissborg.com",7],["qwice.com",8],["canalpluskuchnia.pl",[9,10]],["uizard.io",11],["e-chladiva.cz",12],["assos.com",13],["monese.com",13],["stmas.bayern.de",[14,18]],["novayagazeta.eu",15],["followalice.com",[16,147]],["kinopoisk.ru",17],["yandex.ru",17],["ing.it",[19,20]],["ing.nl",21],["handelsbanken.se",22],["secondsol.com",23],["youcom.com.br",24],["rule34.paheal.net",25],["0815.at",26],["0815.eu",26],["ojskate.com",26],["der-schweighofer.de",26],["tz-bedarf.de",26],["zeinpharma.de",26],["weicon.com",26],["dagvandewebshop.be",26],["thiele-tee.de",26],["carbox.de",26],["riapsport.de",26],["trendpet.de",26],["eheizung24.de",26],["seemueller.com",26],["vivande.de",26],["heidegrill.com",26],["gladiator-fightwear.com",26],["h-andreas.com",26],["pp-parts.com",26],["natuerlich-holzschuhe.de",26],["massivart.de",26],["malermeister-shop.de",26],["imping-confiserie.de",26],["lenox-trading.at",26],["cklenk.de",26],["catolet.de",26],["drinkitnow.de",26],["patisserie-m.de",26],["storm-proof.com",26],["balance-fahrradladen.de",26],["magicpos.shop",26],["zeinpharma.com",26],["sps-handel.net",26],["novagenics.com",26],["butterfly-circus.de",26],["holzhof24.de",26],["fleurop.de",26],["leki.com",26],["pccomponentes.com",27],["oead.at",28],["innovationsstiftung-bildung.at",28],["etwinning.at",28],["arqa-vet.at",28],["zentrumfuercitizenscience.at",28],["vorstudienlehrgang.at",28],["erasmusplus.at",28],["jeger.pl",29],["bo.de",30],["thegamingwatcher.com",31],["webtv.stofa.dk",32],["melkkobrew.fi",33],["asus.com.cn",[34,37]],["zentalk.asus.com",[34,37]],["trouwenbijfletcher.nl",35],["fletcher.nl",35],["fletcherzakelijk.nl",35],["intermatic.com",35],["mubi.com",36],["carsupermarket.com",38],["lawrievetgroup.co.uk",39],["59northwheels.se",40],["foto-gregor.de",41],["dhbbank.com",42],["dhbbank.de",42],["dhbbank.be",42],["dhbbank.nl",42],["login.ingbank.pl",43],["fabrykacukiernika.pl",[44,45]],["playlumi.com",[46,47,48]],["chatfuel.com",49],["studio3t.com",[50,51,52,53]],["realgap.co.uk",[54,55,56,57]],["hotelborgia.com",[58,59]],["sweet24.de",60],["zwembaddekouter.be",61],["flixclassic.pl",62],["jobtoday.com",63],["deltatre.com",[64,65,77]],["withings.com",[66,67,68]],["gift.be",[69,70]],["animaze.us",71],["bizkaia.eus",[72,73,74]],["sinparty.com",75],["jobs.ch",76],["jobup.ch",76],["depop.com",[78,79]],["mantel.com",80],["armedangels.com",[81,82,83]],["e-dojus.lv",84],["burnesspaull.com",85],["oncosur.org",86],["ryanair.com",87],["bayernportal.de",[88,89,90]],["pricehubble.com",91],["ilmotorsport.de",92],["aqua-store.fr",93],["app.arzt-direkt.de",94],["dasfutterhaus.at",95],["e-pity.pl",96],["fillup.pl",97],["dailymotion.com",98],["barcawelt.de",99],["lueneburger-heide.de",100],["polizei.bayern.de",[101,103]],["ourworldofpixels.com",102],["jku.at",104],["espacocasa.com",105],["altraeta.it",105],["centrooceano.it",105],["allstoresdigital.com",105],["cultarm3d.de",105],["soulbounce.com",105],["fluidtopics.com",105],["uvetgbt.com",105],["malcorentacar.com",105],["emondo.de",105],["maspero.it",105],["kelkay.com",105],["underground-england.com",105],["vert.eco",105],["turcolegal.com",105],["magnet4blogging.net",105],["moovly.com",105],["automationafrica.co.za",105],["jornaldoalgarve.pt",105],["keravanenergia.fi",105],["kuopas.fi",105],["frag-machiavelli.de",105],["healthera.co.uk",105],["mobeleader.com",105],["powerup-gaming.com",105],["developer-blog.net",105],["medical.edu.mt",105],["deh.mt",105],["bluebell-railway.com",105],["ribescasals.com",105],["javea.com",105],["chinaimportal.com",105],["inds.co.uk",105],["raoul-follereau.org",105],["serramenti-milano.it",105],["cosasdemujer.com",105],["luz-blanca.info",105],["cosasdeviajes.com",105],["safehaven.io",105],["havocpoint.it",105],["motofocus.pl",105],["nomanssky.com",105],["drei-franken-info.de",105],["clausnehring.com",105],["alttab.net",105],["kinderleicht.berlin",105],["kiakkoradio.fi",105],["cosasdelcaribe.es",105],["de-sjove-jokes.dk",105],["serverprofis.de",105],["biographyonline.net",105],["iziconfort.com",105],["sportinnederland.com",105],["natureatblog.com",105],["wtsenergy.com",105],["cosasdesalud.es",105],["internetpasoapaso.com",105],["zurzeit.at",105],["contaspoupanca.pt",105],["backmarket.de",[106,107,108]],["backmarket.co.uk",[106,107,108]],["backmarket.es",[106,107,108]],["backmarket.be",[106,107,108]],["backmarket.at",[106,107,108]],["backmarket.fr",[106,107,108]],["backmarket.gr",[106,107,108]],["backmarket.fi",[106,107,108]],["backmarket.ie",[106,107,108]],["backmarket.it",[106,107,108]],["backmarket.nl",[106,107,108]],["backmarket.pt",[106,107,108]],["backmarket.se",[106,107,108]],["backmarket.sk",[106,107,108]],["backmarket.com",[106,107,108]],["eleven-sportswear.cz",[109,110,111]],["silvini.com",[109,110,111]],["silvini.de",[109,110,111]],["purefiji.cz",[109,110,111]],["voda-zdarma.cz",[109,110,111]],["lesgarconsfaciles.com",[109,110,111]],["ulevapronohy.cz",[109,110,111]],["vitalvibe.eu",[109,110,111]],["plavte.cz",[109,110,111]],["mo-tools.cz",[109,110,111]],["flamantonlineshop.cz",[109,110,111]],["sandratex.cz",[109,110,111]],["norwayshop.cz",[109,110,111]],["3d-foto.cz",[109,110,111]],["neviditelnepradlo.cz",[109,110,111]],["nutrimedium.com",[109,110,111]],["silvini.cz",[109,110,111]],["karel.cz",[109,110,111]],["silvini.sk",[109,110,111]],["book-n-drive.de",112],["cotswoldoutdoor.com",113],["cotswoldoutdoor.ie",113],["cam.start.canon",114],["usnews.com",115],["researchaffiliates.com",116],["singkinderlieder.de",117],["store.ubisoft.com",[118,119,120,121]],["britishairways.com",[122,123,124]],["cineman.pl",[125,126,127]],["tv-trwam.pl",[125,126,127,128]],["qatarairways.com",[129,130,131,132,133]],["wedding.pl",134],["vivaldi.com",135],["emuia1.gugik.gov.pl",136],["nike.com",137],["adidas.at",138],["adidas.be",138],["adidas.ca",138],["adidas.ch",138],["adidas.cl",138],["adidas.co",138],["adidas.co.in",138],["adidas.co.kr",138],["adidas.co.nz",138],["adidas.co.th",138],["adidas.co.uk",138],["adidas.com",138],["adidas.com.ar",138],["adidas.com.au",138],["adidas.com.br",138],["adidas.com.my",138],["adidas.com.ph",138],["adidas.com.vn",138],["adidas.cz",138],["adidas.de",138],["adidas.dk",138],["adidas.es",138],["adidas.fi",138],["adidas.fr",138],["adidas.gr",138],["adidas.ie",138],["adidas.it",138],["adidas.mx",138],["adidas.nl",138],["adidas.no",138],["adidas.pe",138],["adidas.pl",138],["adidas.pt",138],["adidas.ru",138],["adidas.se",138],["adidas.sk",138],["colourbox.com",139],["ebilet.pl",140],["snap.com",141],["ratemyprofessors.com",142],["filen.io",143],["restaurantclub.pl",144],["stilord.com",145],["stilord.pl",145],["stilord.de",145],["stilord.fr",145],["quantamagazine.org",146],["scaleway.com",148],["hellotv.nl",149],["lasestrellas.tv",150],["shop-naturstrom.de",151],["biona-shop.de",151],["camokoenig.de",151],["bikepro.de",151],["kaffeediscount.com",151],["vamos-skateshop.com",151],["holland-shop.com",151],["officesuite.com",152],["fups.com",[153,154]],["scienceopen.com",155],["buidlbox.io",156],["calendly.com",157],["ubereats.com",158],["101internet.ru",159],["tunnelmb.net",160],["hitado.de",161],["bitso.com",162],["eco-toimistotarvikkeet.fi",163],["proficient.fi",163],["developer.ing.com",164],["ehealth.gov.gr",165],["larian.com",165],["calvinklein.se",[166,167,168]],["calvinklein.fi",[166,167,168]],["calvinklein.sk",[166,167,168]],["calvinklein.si",[166,167,168]],["calvinklein.ch",[166,167,168]],["calvinklein.ru",[166,167,168]],["calvinklein.com",[166,167,168]],["calvinklein.pt",[166,167,168]],["calvinklein.pl",[166,167,168]],["calvinklein.at",[166,167,168]],["calvinklein.nl",[166,167,168]],["calvinklein.hu",[166,167,168]],["calvinklein.lu",[166,167,168]],["calvinklein.lt",[166,167,168]],["calvinklein.lv",[166,167,168]],["calvinklein.it",[166,167,168]],["calvinklein.ie",[166,167,168]],["calvinklein.hr",[166,167,168]],["calvinklein.fr",[166,167,168]],["calvinklein.es",[166,167,168]],["calvinklein.ee",[166,167,168]],["calvinklein.de",[166,167,168]],["calvinklein.dk",[166,167,168]],["calvinklein.cz",[166,167,168]],["calvinklein.bg",[166,167,168]],["calvinklein.be",[166,167,168]],["calvinklein.co.uk",[166,167,168]],["formula1.com",169],["howstuffworks.com",170],["chollometro.com",171],["dealabs.com",171],["hotukdeals.com",171],["pepper.it",171],["pepper.pl",171],["preisjaeger.at",171],["mydealz.de",171]]);

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

    const validValues = [
        'true', 'false',
        'yes', 'y', 'no', 'n',
        'ok',
        'accept', 'reject',
        'allow', 'deny',
    ];
    if ( validValues.includes(value.toLowerCase()) === false ) {
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
        safeSelf().getExtraArgs(Array.from(arguments), 3)
    );
}

function safeSelf() {
    if ( scriptletGlobals.has('safeSelf') ) {
        return scriptletGlobals.get('safeSelf');
    }
    const safe = {
        'Error': self.Error,
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'fetch': self.fetch,
        'jsonParse': self.JSON.parse.bind(self.JSON),
        'jsonStringify': self.JSON.stringify.bind(self.JSON),
        'log': console.log.bind(console),
        uboLog(...args) {
            if ( args.length === 0 ) { return; }
            if ( `${args[0]}` === '' ) { return; }
            this.log('[uBO]', ...args);
        },
        initPattern(pattern, options = {}) {
            if ( pattern === '' ) {
                return { matchAll: true };
            }
            const expect = (options.canNegate === true && pattern.startsWith('!') === false);
            if ( expect === false ) {
                pattern = pattern.slice(1);
            }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match !== null ) {
                return {
                    pattern,
                    re: new this.RegExp(
                        match[1],
                        match[2] || options.flags
                    ),
                    expect,
                };
            }
            return {
                pattern,
                re: new this.RegExp(pattern.replace(
                    /[.*+?^${}()|[\]\\]/g, '\\$&'),
                    options.flags
                ),
                expect,
            };
        },
        testPattern(details, haystack) {
            if ( details.matchAll ) { return true; }
            return this.RegExp_test.call(details.re, haystack) === details.expect;
        },
        patternToRegex(pattern, flags = undefined) {
            if ( pattern === '' ) { return /^/; }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match === null ) {
                return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            try {
                return new RegExp(match[1], match[2] || flags);
            }
            catch(ex) {
            }
            return /^/;
        },
        getExtraArgs(args, offset = 0) {
            const entries = args.slice(offset).reduce((out, v, i, a) => {
                if ( (i & 1) === 0 ) {
                    const rawValue = a[i+1];
                    const value = /^\d+$/.test(rawValue)
                        ? parseInt(rawValue, 10)
                        : rawValue;
                    out.push([ a[i], value ]);
                }
                return out;
            }, []);
            return Object.fromEntries(entries);
        },
    };
    scriptletGlobals.set('safeSelf', safe);
    return safe;
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
    try { setCookie(...argsList[i]); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

};
// End of code to inject

/******************************************************************************/

// Inject code

// https://bugzilla.mozilla.org/show_bug.cgi?id=1736575
//   `MAIN` world not yet supported in Firefox, so we inject the code into
//   'MAIN' ourself when enviroment in Firefox.

// Not Firefox
if ( typeof wrappedJSObject !== 'object' ) {
    return uBOL_setCookie();
}

// Firefox
{
    const page = self.wrappedJSObject;
    let script, url;
    try {
        page.uBOL_setCookie = cloneInto([
            [ '(', uBOL_setCookie.toString(), ')();' ],
            { type: 'text/javascript; charset=utf-8' },
        ], self);
        const blob = new page.Blob(...page.uBOL_setCookie);
        url = page.URL.createObjectURL(blob);
        const doc = page.document;
        script = doc.createElement('script');
        script.async = false;
        script.src = url;
        (doc.head || doc.documentElement || doc).append(script);
    } catch (ex) {
        console.error(ex);
    }
    if ( url ) {
        if ( script ) { script.remove(); }
        page.URL.revokeObjectURL(url);
    }
    delete page.uBOL_setCookie;
}

/******************************************************************************/

// End of local scope
})();

/******************************************************************************/

void 0;
