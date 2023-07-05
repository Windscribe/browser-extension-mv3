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

(function uBOL_jsonPrune() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"[].playerResponse.adPlacements [].playerResponse.playerAds\"]","[\"playerResponse.adPlacements playerResponse.playerAds adPlacements playerAds\",\"playerConfig\"]","[\"playerResponse.adPlacements playerResponse.playerAds adPlacements playerAds\",\"playerResponse.playerConfig\"]","[\"enabled\",\"force_disabled\"]","[\"adBlockWallEnabled\"]","[\"data.reg\"]","[\"0\"]","[\"adtagparameter\",\"enabled\"]","[\"adEnabled\"]","[\"Playlist.ContentBreaks\"]","[\"adRenderers\"]","[\"urls\",\"urls.0\"]","[\"breaks pause_ads video_metadata.end_credits_time\",\"pause_ads\"]","[\"server\"]","[\"cuepointPlaylist\"]","[\"value.media.ad_breaks\"]","[\"data.device.adSponsorshipTemplate data.device.adsParams\"]","[\"data.[].vast_url\"]","[\"data.meta.require_addon data.meta.require_captcha data.meta.require_notifications data.meta.require_og_ads data.meta.require_video data.meta.require_web data.meta.require_related_topics data.meta.require_custom_ad_step data.meta.og_ads_offers data.meta.addon_url data.displayAds data.linkCustomAdOffers\"]","[\"enabled\",\"testhide\"]","[\"adParam\"]","[\"adProvider\"]","[\"playlist.movie.advertising.ad_server\"]","[\"ad_pods.0.ads.0.segments.0.media ad_pods.1.ads.1.segments.1.media ad_pods.2.ads.2.segments.2.media ad_pods.3.ads.3.segments.3.media ad_pods.4.ads.4.segments.4.media ad_pods.5.ads.5.segments.5.media ad_pods.6.ads.6.segments.6.media ad_pods.7.ads.7.segments.7.media ad_pods.8.ads.8.segments.8.media\"]","[\"ads.servers.[].apiAddress\"]","[\"clickAnywhere urls\"]","[\"meta.advertise\"]","[\"data.attributes.config.freewheel data.attributes.config.featureFlags.dPlayer\"]","[\"data.attributes.ssaiInfo.forecastTimeline data.attributes.ssaiInfo.vendorAttributes.nonLinearAds data.attributes.ssaiInfo.vendorAttributes.videoView data.attributes.ssaiInfo.vendorAttributes.breaks.[].ads.[].adMetadata data.attributes.ssaiInfo.vendorAttributes.breaks.[].ads.[].adParameters data.attributes.ssaiInfo.vendorAttributes.breaks.[].timeOffset\"]","[\"movie.advertising.ad_server playlist.movie.advertising.ad_server\"]","[\"cuepoints\",\"cuepoints.[].start cuepoints.[].end cuepoints.[].start_float cuepoints.[].end_float\"]","[\"testadtags ad\"]","[\"ads\"]","[\"ssaiInfo fallback.ssaiInfo\"]","[\"result.ads\"]","[\"stream.insertion.adSession\"]","[\"stream.insertion.points\"]","[\"stream.insertion\"]","[\"stream.sources.*.insertion\"]","[\"pods.0.ads\"]","[\"*.tanya_video_ads\"]","[\"web_share_ads_adsterra_config wap_short_link_middle_page_ad wap_short_link_middle_page_show_time data.ads_cpm_info\"]","[\"success.page.spaces.player.widget_wrappers.[].widget.data.intervention_data\"]","[\"data.*.elements.edges.[].node.outboundLink\"]","[\"dataLayer.trackingId user.trackingId\"]","[\"config.globalInteractions.[].bsData\"]"];

const hostnamesMap = new Map([["youtube.com",[0,1,2]],["youtubekids.com",[0,1,2]],["youtube-nocookie.com",[0,1,2]],["chip.de",3],["focus.de",3],["bild.de",4],["play.history.com",5],["video.gjirafa.com",6],["winfuture.de",7],["popcornflix.com",8],["itv.com",9],["funimation.com",10],["hulu.com",12],["amazon.com",14],["crunchyroll.com",15],["crackle.com",16],["vvvvid.it",17],["linkvertise.com",18],["tv2.no",19],["doomovie-hd.com",20],["sonyliv.com",21],["tvn24.pl",22],["art19.com",23],["domoplus.pl",24],["kuchniaplus.pl",24],["miniminiplus.pl",24],["teletoonplus.pl",24],["vlive.tv",26],["tvn.pl",29],["10play.com.au",30],["player.stv.tv",31],["fox.com",32],["play.max.com",33],["sportstiger.com",34],["disneyplus.com",[35,36,37,38,39]],["colearn.id",40],["terabox.fun",41],["hotstar.com",42],["reddit.com",43],["nypost.com",44],["pagesix.com",44],["stories.los40.com",45]]);

const entitiesMap = new Map([["elixx",11],["tvnow",13],["shorttey",25],["discoveryplus",[27,28]]]);

const exceptionsMap = new Map([["old.reddit.com",[43]]]);

/******************************************************************************/

function jsonPrune(
    rawPrunePaths = '',
    rawNeedlePaths = ''
) {
    JSON.parse = new Proxy(JSON.parse, {
        apply: function(target, thisArg, args) {
            return objectPrune(
                Reflect.apply(target, thisArg, args),
                rawPrunePaths,
                rawNeedlePaths
            );
        },
    });
    Response.prototype.json = new Proxy(Response.prototype.json, {
        apply: function(target, thisArg, args) {
            return Reflect.apply(target, thisArg, args).then(o => 
                objectPrune(o, rawPrunePaths, rawNeedlePaths)
            );
        },
    });
}

function objectPrune(
    obj,
    rawPrunePaths,
    rawNeedlePaths
) {
    if ( typeof rawPrunePaths !== 'string' ) { return; }
    const prunePaths = rawPrunePaths !== ''
        ? rawPrunePaths.split(/ +/)
        : [];
    let needlePaths;
    let log, reLogNeedle;
    if ( prunePaths.length !== 0 ) {
        needlePaths = prunePaths.length !== 0 && rawNeedlePaths !== ''
            ? rawNeedlePaths.split(/ +/)
            : [];
    } else {
        log = console.log.bind(console);
        reLogNeedle = patternToRegex(rawNeedlePaths);
    }
    const findOwner = function(root, path, prune = false) {
        let owner = root;
        let chain = path;
        for (;;) {
            if ( typeof owner !== 'object' || owner === null  ) {
                return false;
            }
            const pos = chain.indexOf('.');
            if ( pos === -1 ) {
                if ( prune === false ) {
                    return owner.hasOwnProperty(chain);
                }
                if ( chain === '*' ) {
                    for ( const key in owner ) {
                        if ( owner.hasOwnProperty(key) === false ) { continue; }
                        delete owner[key];
                    }
                } else if ( owner.hasOwnProperty(chain) ) {
                    delete owner[chain];
                }
                return true;
            }
            const prop = chain.slice(0, pos);
            if (
                prop === '[]' && Array.isArray(owner) ||
                prop === '*' && owner instanceof Object
            ) {
                const next = chain.slice(pos + 1);
                let found = false;
                for ( const key of Object.keys(owner) ) {
                    found = findOwner(owner[key], next, prune) || found;
                }
                return found;
            }
            if ( owner.hasOwnProperty(prop) === false ) { return false; }
            owner = owner[prop];
            chain = chain.slice(pos + 1);
        }
    };
    const mustProcess = function(root) {
        for ( const needlePath of needlePaths ) {
            if ( findOwner(root, needlePath) === false ) {
                return false;
            }
        }
        return true;
    };
    if ( log !== undefined ) {
        const json = JSON.stringify(obj, null, 2);
        if ( reLogNeedle.test(json) ) {
            log('uBO:', location.hostname, json);
        }
        return obj;
    }
    if ( mustProcess(obj) === false ) { return obj; }
    for ( const path of prunePaths ) {
        findOwner(obj, path, true);
    }
    return obj;
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
    try { jsonPrune(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
