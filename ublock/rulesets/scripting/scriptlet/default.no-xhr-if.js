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

// ruleset: default

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_noXhrIf() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"request=adb\"]","[\"doubleclick\"]","[\"adsbygoogle\"]","[\"homad-global-configs\"]","[\"/enthusiastgaming|googleoptimize|googletagmanager/\"]","[\"/doubleclick|googlesyndication/\"]","[\"/^(?!.*(einthusan\\\\.io|yahoo|rtnotif|ajax|quantcast|bugsnag))/\"]","[\"ad_\"]","[\"/\\\\/ad\\\\/g\\\\/1/\"]","[\"ads\"]","[\"/googlesyndication|adpushup|adrecover/\"]","[\"svonm\"]","[\"/\\\\/VisitorAPI\\\\.js|\\\\/AppMeasurement\\\\.js/\"]","[\"googlesyndication\"]","[\"damoh\"]","[\"/youboranqs01|spotx|springserve/\"]","[\"/a-mo\\\\.net|adnxs\\\\.com|prebid|creativecdn\\\\.com|e-planning\\\\.net|quantumdex\\\\.io/\"]","[\"pop\"]","[\"/^/\"]","[\"/ad\"]","[\"prebid\"]","[\"wpadmngr\"]","[\"/ads\"]","[\"pub.network\"]","[\"url:googlesyndication\"]","[\"/analytics|livestats/\"]","[\"mahimeta\"]","[\"notifier\"]","[\"/ad-\"]","[\"/coinzillatag|czilladx/\"]","[\"czilladx\"]","[\"php\"]","[\"/googlesyndication|doubleclick/\"]","[\"popunder\"]","[\"adx\"]","[\"cls_report?\"]","[\"method:HEAD\"]","[\"adswizz.com\"]","[\"tag\"]","[\"googletagmanager\"]","[\"googlesyndication.com\"]","[\"method:POST url:/^https:\\\\/\\\\/www\\\\.reddit\\\\.com$/\"]","[\"method:POST url:/logImpressions\"]","[\"method:POST\"]","[\"utreon.com/pl/api/event method:POST\"]","[\"log-sdk.ksapisrv.com/rest/wd/common/log/collect method:POST\"]","[\"mobileanalytics\"]","[\"cloudflare.com/cdn-cgi/trace\"]","[\"amazonaws\"]","[\"/recommendations.\"]","[\"/api/analytics\"]","[\"api\"]","[\"lr-ingest.io\"]","[\"/gtm.js\"]","[\"ip-api\"]"];

const hostnamesMap = new Map([["handelsblatt.com",0],["moviepilot.de",1],["sbs.com.au",1],["minhaconexao.com.br",1],["videolyrics.in",1],["sportshub.to",1],["topsporter.net",1],["meteoetradar.com",1],["gala.fr",1],["geo.fr",1],["voici.fr",1],["pinsystem.co.uk",2],["texture-packs.com",2],["manyakan.com",2],["persianhive.com",2],["boainformacao.com.br",2],["privatenewz.com",2],["gcertificationcourse.com",2],["portaliz.site",2],["ghior.com",2],["tech-story.net",2],["visalist.io",2],["gyanitheme.com",2],["hipsonyc.com",2],["litecoin.host",2],["wetter.de",3],["thesimsresource.com",4],["gnomio.com",5],["techhelpbd.com",5],["tuxnews.it",5],["frkn64modding.com",7],["channel4.com",8],["duplichecker.com",9],["gearingcommander.com",9],["novelmultiverse.com",9],["taming.io",9],["snlookup.com",9],["globfone.com",9],["chimicamo.org",9],["webforefront.com",9],["apkmagic.com.ar",9],["reaperscans.id",9],["short1.site",9],["telewizja-streamer.xyz",9],["searchenginereports.net",10],["plagiarismdetector.net",10],["vox.de",11],["vip.de",11],["rtl.de",11],["fitforfun.de",11],["desired.de",11],["kino.de",11],["cinema.de",11],["nationalgeographic.fr",12],["freegogpcgames.com",13],["informaxonline.com",[13,19]],["cambb.xxx",13],["gaminplay.com",13],["blisseyhusband.in",13],["routech.ro",13],["rontechtips.com",13],["homeairquality.org",13],["techtrim.tech",13],["pigeonburger.xyz",13],["freedownloadvideo.net",13],["askpaccosi.com",13],["crypto4tun.com",13],["fusedgt.com",13],["apkowner.org",13],["appsmodz.com",13],["bingotingo.com",13],["superpsx.com",13],["financeflix.in",13],["technoflip.in",13],["paidappstore.xyz",13],["stringreveals.com",13],["fox.com",13],["obutecodanet.ig.com.br",13],["firmwarex.net",13],["softwaretotal.net",13],["nawahi1.com",13],["freecodezilla.net",13],["movieslegacy.com",13],["iconmonstr.com",13],["rbxscripts.net",13],["adslink.pw",13],["comentariodetexto.com",13],["wordpredia.com",13],["karanpc.com",13],["livsavr.co",13],["gsmhamza.com",13],["hlspanel.xyz",13],["webmatrices.com",13],["dropnudes.com",13],["privatenudes.com",13],["golem.de",14],["rakuten.tv",15],["djxmaza.in",16],["thecubexguide.com",16],["zdam.xyz",17],["pasend.link",18],["freewp.io",18],["hiraethtranslation.com",19],["jetpunk.com",20],["mcrypto.club",21],["coinsparty.com",21],["simplebits.io",22],["flightsim.to",23],["stardeos.com",24],["goduke.com",25],["1apple.xyz",26],["lavanguardia.com",27],["foodsdictionary.co.il",28],["freesolana.top",29],["faucetclub.net",30],["claim.fun",30],["faucetcrypto.net",30],["btc25.org",30],["doge25.in",30],["cashbux.work",30],["farescd.com",31],["getintoway.com",32],["freebinance.top",33],["freelitecoin.top",34],["freetron.top",34],["earncrypto.co.in",34],["citi.com",35],["filmi7.com",36],["hotfm.audio",37],["luffytra.xyz",38],["maxt.church",39],["reddit.com",41],["docs.google.com",42],["endbasic.dev",43],["jmmv.dev",43],["fingerprint.com",43],["utreon.com",44],["zhihu.com",45],["viu.com",46],["myair2.resmed.com",47],["travelerdoor.com",47],["bestiefy.com",48],["azby.fmworld.net",49],["unrealengine.com",50],["wco.tv",51],["dark-gaming.com",52],["securegames.iwin.com",53],["neilpatel.com",54]]);

const entitiesMap = new Map([["an1me",5],["einthusan",6],["khatrimaza",9],["moviegan",9],["writedroid",9],["nsw2u",13],["cinemakottaga",13],["asiaon",13],["apkmaven",13],["bg-gledai",13],["gledaitv",13],["tvnow",14],["dropgalaxy",16],["zone-telechargement",18],["empire-streaming",40]]);

const exceptionsMap = new Map([["dev.fingerprint.com",[43]]]);

/******************************************************************************/

function noXhrIf(
    arg1 = ''
) {
    if ( typeof arg1 !== 'string' ) { return; }
    const xhrInstances = new WeakMap();
    const needles = [];
    for ( const condition of arg1.split(/\s+/) ) {
        if ( condition === '' ) { continue; }
        const pos = condition.indexOf(':');
        let key, value;
        if ( pos !== -1 ) {
            key = condition.slice(0, pos);
            value = condition.slice(pos + 1);
        } else {
            key = 'url';
            value = condition;
        }
        needles.push({ key, re: patternToRegex(value) });
    }
    const log = needles.length === 0 ? console.log.bind(console) : undefined;
    self.XMLHttpRequest = class extends self.XMLHttpRequest {
        open(...args) {
            if ( log !== undefined ) {
                log(`uBO: xhr.open(${args.join(', ')})`);
            } else {
                const argNames = [ 'method', 'url' ];
                const haystack = new Map();
                for ( let i = 0; i < args.length && i < argNames.length; i++  ) {
                    haystack.set(argNames[i], args[i]);
                }
                if ( haystack.size !== 0 ) {
                    let matches = true;
                    for ( const { key, re } of needles ) {
                        matches = re.test(haystack.get(key) || '');
                        if ( matches === false ) { break; }
                    }
                    if ( matches ) {
                        xhrInstances.set(this, haystack);
                    }
                }
            }
            return super.open(...args);
        }
        send(...args) {
            const haystack = xhrInstances.get(this);
            if ( haystack === undefined ) {
                return super.send(...args);
            }
            Object.defineProperties(this, {
                readyState: { value: 4, writable: false },
                response: { value: '', writable: false },
                responseText: { value: '', writable: false },
                responseURL: { value: haystack.get('url'), writable: false },
                responseXML: { value: '', writable: false },
                status: { value: 200, writable: false },
                statusText: { value: 'OK', writable: false },
            });
            this.dispatchEvent(new Event('readystatechange'));
            this.dispatchEvent(new Event('load'));
            this.dispatchEvent(new Event('loadend'));
        }
    };
}

function patternToRegex(pattern, flags = undefined) {
    if ( pattern === '' ) { return /^/; }
    const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
    if ( match !== null ) {
        return new RegExp(match[1], match[2] || flags);
    }
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
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
    try { noXhrIf(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
