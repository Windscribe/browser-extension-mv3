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

/// name json-prune

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_jsonPrune() {

/******************************************************************************/

// default

const argsList = [{"a":["[].playerResponse.adPlacements [].playerResponse.playerAds playerResponse.adPlacements playerResponse.playerAds adPlacements playerAds"]},{"a":["enabled","force_disabled"]},{"a":["adBlockWallEnabled"]},{"a":["enabled","config"]},{"a":["data.reg"]},{"a":["0"]},{"a":["adtagparameter","enabled"]},{"a":["Playlist.ContentBreaks"]},{"a":["adRenderers"]},{"a":["value.media.ad_breaks"]},{"a":["data.[].vast_url"]},{"a":["data.meta.require_addon data.meta.require_captcha data.meta.require_notifications data.meta.require_og_ads data.meta.require_video data.meta.require_web data.meta.require_related_topics"]},{"a":["enabled","testhide"]},{"a":["adParam"]},{"a":["movie.advertising.ad_server"]},{"a":["adProvider"]},{"a":["ad"]},{"a":["playlist.movie.advertising.ad_server"]},{"a":["ad_pods.0.ads.0.segments.0.media ad_pods.1.ads.1.segments.1.media ad_pods.2.ads.2.segments.2.media ad_pods.3.ads.3.segments.3.media ad_pods.4.ads.4.segments.4.media ad_pods.5.ads.5.segments.5.media ad_pods.6.ads.6.segments.6.media ad_pods.7.ads.7.segments.7.media ad_pods.8.ads.8.segments.8.media"]},{"a":["ads.servers.[].apiAddress"]},{"a":["meta.advertise"]},{"a":["movie.advertising.ad_server playlist.movie.advertising.ad_server"]},{"a":["testadtags ad"]},{"a":["videos"]},{"a":["result.ads"]},{"a":["config.globalInteractions.[].bsData"]}];

const hostnamesMap = new Map([["youtube.com",0],["youtubekids.com",0],["youtube-nocookie.com",0],["chip.de",1],["focus.de",1],["bild.de",2],["spiegel.de",3],["play.history.com",4],["video.gjirafa.com",5],["winfuture.de",6],["itv.com",7],["funimation.com",8],["crunchyroll.com",9],["vvvvid.it",10],["linkvertise.com",11],["tv2.no",12],["doomovie-hd.com",13],["player.pl",14],["sonyliv.com",15],["qq.com",16],["tvn24.pl",17],["art19.com",18],["domoplus.pl",19],["kuchniaplus.pl",19],["miniminiplus.pl",19],["teletoonplus.pl",19],["vlive.tv",20],["tvn.pl",21],["player.stv.tv",22],["utreon.com",23],["sportstiger.com",24],["stories.los40.com",25]]);

/******************************************************************************/

//  https://github.com/uBlockOrigin/uBlock-issues/issues/1545
//  - Add support for "remove everything if needle matches" case

const scriptlet = (
    rawPrunePaths = '',
    rawNeedlePaths = ''
) => {
    const prunePaths = rawPrunePaths !== ''
        ? rawPrunePaths.split(/ +/)
        : [];
    let needlePaths;
    if ( prunePaths.length === 0 ) { return; }
    needlePaths = prunePaths.length !== 0 && rawNeedlePaths !== ''
        ? rawNeedlePaths.split(/ +/)
        : [];
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
    const pruner = function(o) {
        if ( mustProcess(o) === false ) { return o; }
        for ( const path of prunePaths ) {
            findOwner(o, path, true);
        }
        return o;
    };
    JSON.parse = new Proxy(JSON.parse, {
        apply: function() {
            return pruner(Reflect.apply(...arguments));
        },
    });
    Response.prototype.json = new Proxy(Response.prototype.json, {
        apply: function() {
            return Reflect.apply(...arguments).then(o => pruner(o));
        },
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
