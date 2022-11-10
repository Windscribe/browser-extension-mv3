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

/// name set-constant
/// alias set

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_setConstant() {

/******************************************************************************/

// rus-0

const argsList = [{"a":["Object.prototype.changeVisible","noopFunc"]},{"a":["Object.prototype.disableSeek","noopFunc"]},{"a":["window.EUMP.plugins.antiblock","noopFunc"]},{"a":["Object.prototype.playVideo","noopFunc"]},{"a":["adblock","true"]},{"a":["JSON.parse","noopFunc"]},{"a":["Object.prototype.adblockSettings","undefined"]},{"a":["Object.prototype.createBannerItem","null"]},{"a":["clicks","2"]},{"a":["Object.prototype.autoPlay","false"]},{"a":["Object.prototype.AdvertisementManager","undefined"]},{"a":["Object.prototype.getAutoplay","noopFunc"]},{"a":["player.options.scroll","false"]},{"a":["Object.prototype.autostart","noopFunc"]},{"a":["Object.prototype.disableAutoplay","true"]},{"a":["Object.prototype.detectAdblock","noopFunc"]},{"a":["String.fromCharCode","trueFunc"]},{"a":["Object.prototype.videoAd","noopFunc"]},{"a":["g_GazetaNoExchange","true"]},{"a":["isAdFree","noopFunc"]},{"a":["app.book.external","null"]},{"a":["Object.prototype.sendCHParams","noopFunc"]},{"a":["adBlock","false"]},{"a":["Object.prototype.afg","true"]},{"a":["Object.prototype.advertObject","null"]},{"a":["Object.prototype.AdvObject","noopFunc"]},{"a":["Object.prototype.autoplay","false"]},{"a":["playerOptions.behaviour.autoPlay","false"]},{"a":["Object.prototype.disableSelection","noopFunc"]},{"a":["adBlockEnabled","false"]},{"a":["Object.prototype.adUsageStorageVars","undefined"]},{"a":["ADV_BLOCKED","false"]},{"a":["Object.prototype.IS_CHECK_REGISTRATION","false"]},{"a":["localStorage.localstorageGameData","''"]},{"a":["Object.prototype.livetv-state","true"]},{"a":["top100Counter","false"]},{"a":["window.ab","false"]},{"a":["timeEnd","1"]},{"a":["Object.prototype.manualAutoplay_","null"]},{"a":["Object.prototype.hideab","undefined"]},{"a":["accept18","true"]},{"a":["Object.prototype.minPlayingVisibleHeight","noopFunc"]},{"a":["Object.prototype.adPlaying","null"]},{"a":["Object.prototype.PLAYED","null"]},{"a":["Object.prototype.autoplay","null"],"n":["1yar.tv"]},{"a":["Object.prototype.ENABLE_SMOKESCREEN","undefined"]},{"a":["Object.prototype._Mimic","undefined"]},{"a":["Object.prototype.adblock","null"],"n":["3igames.mail.ru","auto.mail.ru","biz.mail.ru","bonus.mail.ru","calendar.mail.ru","calls.mail.ru","cloud.mail.ru","deti.mail.ru","dobro.mail.ru","e.mail.ru","esports.mail.ru","games.mail.ru","gibdd.mail.ru","go.mail.ru","health.mail.ru","help.mail.ru","hi-tech.mail.ru","horo.mail.ru","kino.mail.ru","lady.mail.ru","love.mail.ru","mailblog.mail.ru","mcs.mail.ru","minigames.mail.ru","my.mail.ru","news.mail.ru","octavius.mail.ru","okminigames.mail.ru","otvet.mail.ru","pets.mail.ru","player-smotri.mail.ru","pogoda.mail.ru","realty.mail.ru","top.mail.ru","touch.mail.ru","tv.mail.ru"]},{"a":["Object.prototype.adsRectangle","undefined"],"n":["3igames.mail.ru","auto.mail.ru","biz.mail.ru","bonus.mail.ru","calendar.mail.ru","calls.mail.ru","cloud.mail.ru","deti.mail.ru","dobro.mail.ru","e.mail.ru","esports.mail.ru","games.mail.ru","gibdd.mail.ru","go.mail.ru","health.mail.ru","help.mail.ru","hi-tech.mail.ru","horo.mail.ru","kino.mail.ru","lady.mail.ru","love.mail.ru","mailblog.mail.ru","mcs.mail.ru","minigames.mail.ru","my.mail.ru","news.mail.ru","octavius.mail.ru","okminigames.mail.ru","otvet.mail.ru","pets.mail.ru","player-smotri.mail.ru","pogoda.mail.ru","realty.mail.ru","top.mail.ru","touch.mail.ru","tv.mail.ru"]},{"a":["Object.prototype.autoPlayParams","false"]},{"a":["Object.prototype.autoplayScrollHandler","noopFunc"]},{"a":["Object.prototype.getAds","undefined"]},{"a":["Object.prototype.mimic","undefined"],"n":["calls.mail.ru","e.mail.ru","my.mail.ru","octavius.mail.ru","touch.mail.ru"]},{"a":["Object.prototype.onLinkClick","noopFunc"]},{"a":["Object.prototype.onLinkMouseDown","noopFunc"]},{"a":["Object.prototype.runMimic","noopFunc"]},{"a":["Object.prototype.useMimic","noopFunc"]},{"a":["document.title","null"],"n":["3igames.mail.ru","auto.mail.ru","biz.mail.ru","bonus.mail.ru","calendar.mail.ru","calls.mail.ru","cloud.mail.ru","deti.mail.ru","dobro.mail.ru","e.mail.ru","esports.mail.ru","games.mail.ru","gibdd.mail.ru","go.mail.ru","health.mail.ru","help.mail.ru","hi-tech.mail.ru","horo.mail.ru","kino.mail.ru","lady.mail.ru","love.mail.ru","mailblog.mail.ru","mcs.mail.ru","minigames.mail.ru","my.mail.ru","news.mail.ru","octavius.mail.ru","okminigames.mail.ru","otvet.mail.ru","pets.mail.ru","player-smotri.mail.ru","pogoda.mail.ru","realty.mail.ru","top.mail.ru","touch.mail.ru","tv.mail.ru"]},{"a":["String.prototype.charCodeAt","trueFunc"],"n":["passport.i.ua","pinformer.sinoptik.ua"]}];

const hostnamesMap = new Map([["116.ru",0],["14.ru",0],["161.ru",0],["164.ru",0],["178.ru",0],["26.ru",0],["29.ru",0],["35.ru",0],["43.ru",0],["45.ru",0],["48.ru",0],["51.ru",0],["53.ru",0],["56.ru",0],["59.ru",0],["60.ru",0],["62.ru",0],["63.ru",0],["68.ru",0],["71.ru",0],["72.ru",0],["74.ru",0],["76.ru",0],["86.ru",0],["89.ru",0],["93.ru",0],["chita.ru",0],["e1.ru",0],["ircity.ru",0],["mgorsk.ru",0],["msk1.ru",0],["ngs.ru",0],["ngs22.ru",0],["ngs24.ru",0],["ngs42.ru",0],["ngs55.ru",0],["ngs70.ru",0],["nn.ru",0],["proizhevsk.ru",0],["provoronezh.ru",0],["sochi1.ru",0],["sterlitamak1.ru",0],["tolyatty.ru",0],["ufa1.ru",0],["v1.ru",0],["7days.ru",0],["doctorpiter.ru",0],["dom.mail.ru",0],["kp.kg",0],["kp.kz",0],["kp.md",0],["kp.ru",0],["lady.mail.ru",0],["radiokp.ru",0],["teleprogramma.pro",0],["wday.ru",0],["woman.ru",0],["1tv.ru",[1,2]],["3dnews.ru",3],["vm.ru",3],["anidub.club",4],["anidub.com",4],["anidub.life",4],["anidub.link",4],["loveanime.live",4],["myanime.online",4],["rusanime.ru",4],["animelend.info",5],["api-video.khl.ru",6],["ati.su",7],["audioportal.su",8],["cdnvideo.ru",9],["eda.ru",9],["mania.gcdn.co",9],["vp.rambler.ru",[9,41]],["www.rambler.ru",9],["changeua.com",10],["ictv.ua",10],["inter.ua",10],["k1.ua",10],["novy.tv",10],["ntn.ua",10],["starlight.digital",10],["stb.ua",10],["teleportal.ua",10],["dzen.ru",11],["eagleplatform.com",[12,44]],["embed.dugout.com",13],["embed.twitch.tv",14],["player.twitch.tv",14],["examenpdd.com",15],["free-tor.info",16],["korsars.info",16],["frontend.vh.yandex.ru",17],["widgets.kinopoisk.ru",17],["yastatic.net",17],["gazeta.ru",[18,19]],["gdz-putina.fun",20],["gdz.ninja",20],["gdz.ru",20],["gdzotputina.club",20],["gdzputina.net",20],["megaresheba.com",20],["megaresheba.ru",20],["resheba.me",20],["spishi.fun",20],["zoobrilka.net",20],["gismeteo.by",21],["gismeteo.kz",21],["gismeteo.lt",21],["gismeteo.lv",21],["gismeteo.md",21],["gismeteo.ru",21],["gismeteo.ua",[21,58]],["hentai-share.one",22],["igroutka.ru",23],["ivi.ru",[24,25]],["iz.ru",26],["kinescope.io",27],["kinokong.pro",28],["libertycity.ru",29],["music.yandex.by",30],["music.yandex.kz",30],["music.yandex.ru",30],["music.yandex.uz",30],["peers.tv",31],["player.vgtrk.com",32],["playground.ru",33],["quote.ru",34],["rbc.ru",34],["sportrbc.ru",34],["rambler.ru",35],["remont-aud.net",36],["softportal.com",37],["tenews.org.ua",38],["tortuga.wtf",39],["vo-dela.su",40],["xsport.ua",[42,43]],["bonus-tv.ru",44],["e.mail.ru",[45,53,54]],["octavius.mail.ru",[45,53,54]],["otvet.mail.ru",46],["mail.ru",[47,48,52,57]],["player-smotri.mail.ru",49],["ok.ru",[50,51]],["sportmail.ru",[52,56]],["my.mail.ru",55],["news.mail.ru",56],["pogoda.mail.ru",56],["24boxing.com.ua",58],["4mama.ua",58],["autocentre.ua",58],["avtovod.com.ua",58],["beauty.ua",58],["bilshe.com",58],["buhgalter.com.ua",58],["buhgalter911.com",58],["businessua.com",58],["dengi.ua",58],["ditey.com",58],["edinstvennaya.ua",58],["epravda.com.ua",58],["eurointegration.com.ua",58],["f1analytic.com",58],["facenews.ua",58],["factor.ua",58],["football-ukraine.com",58],["football24.ua",58],["footballgazeta.com",58],["footballtransfer.com.ua",58],["glianec.com",58],["gorod.dp.ua",58],["hvylya.net",58],["inforesist.org",58],["internetua.com",58],["isport.ua",58],["ivona.ua",58],["kolobok.ua",58],["kp.ua",58],["kriminal.tv",58],["kurs.com.ua",58],["lifedon.com.ua",58],["mama.ua",58],["meteo.ua",58],["mport.ua",58],["nashamama.com",58],["nbnews.com.ua",58],["newsyou.info",58],["nnovosti.info",58],["okino.ua",58],["orakul.com",58],["panno4ka.net",58],["pogodaua.com",58],["pravda.com.ua",58],["real-vin.com",58],["sinoptik.ua",58],["smak.ua",58],["stravy.net",58],["superdom.ua",58],["telegraf.com.ua",58],["tochka.net",58],["tv.ua",58],["tvoymalysh.com.ua",58],["udoktora.net",58],["viva.ua",58],["vsetv.com",58],["www.bigmir.net",58],["zdorovia.com.ua",58]]);

/******************************************************************************/

const scriptlet = (
    chain = '',
    cValue = ''
) => {
    if ( chain === '' ) { return; }
    if ( cValue === 'undefined' ) {
        cValue = undefined;
    } else if ( cValue === 'false' ) {
        cValue = false;
    } else if ( cValue === 'true' ) {
        cValue = true;
    } else if ( cValue === 'null' ) {
        cValue = null;
    } else if ( cValue === "''" ) {
        cValue = '';
    } else if ( cValue === '[]' ) {
        cValue = [];
    } else if ( cValue === '{}' ) {
        cValue = {};
    } else if ( cValue === 'noopFunc' ) {
        cValue = function(){};
    } else if ( cValue === 'trueFunc' ) {
        cValue = function(){ return true; };
    } else if ( cValue === 'falseFunc' ) {
        cValue = function(){ return false; };
    } else if ( /^\d+$/.test(cValue) ) {
        cValue = parseFloat(cValue);
        if ( isNaN(cValue) ) { return; }
        if ( Math.abs(cValue) > 0x7FFF ) { return; }
    } else {
        return;
    }
    let aborted = false;
    const mustAbort = function(v) {
        if ( aborted ) { return true; }
        aborted =
            (v !== undefined && v !== null) &&
            (cValue !== undefined && cValue !== null) &&
            (typeof v !== typeof cValue);
        return aborted;
    };
    // https://github.com/uBlockOrigin/uBlock-issues/issues/156
    //   Support multiple trappers for the same property.
    const trapProp = function(owner, prop, configurable, handler) {
        if ( handler.init(owner[prop]) === false ) { return; }
        const odesc = Object.getOwnPropertyDescriptor(owner, prop);
        let prevGetter, prevSetter;
        if ( odesc instanceof Object ) {
            owner[prop] = cValue;
            if ( odesc.get instanceof Function ) {
                prevGetter = odesc.get;
            }
            if ( odesc.set instanceof Function ) {
                prevSetter = odesc.set;
            }
        }
        try {
            Object.defineProperty(owner, prop, {
                configurable,
                get() {
                    if ( prevGetter !== undefined ) {
                        prevGetter();
                    }
                    return handler.getter(); // cValue
                },
                set(a) {
                    if ( prevSetter !== undefined ) {
                        prevSetter(a);
                    }
                    handler.setter(a);
                }
            });
        } catch(ex) {
        }
    };
    const trapChain = function(owner, chain) {
        const pos = chain.indexOf('.');
        if ( pos === -1 ) {
            trapProp(owner, chain, false, {
                v: undefined,
                init: function(v) {
                    if ( mustAbort(v) ) { return false; }
                    this.v = v;
                    return true;
                },
                getter: function() {
                    return cValue;
                },
                setter: function(a) {
                    if ( mustAbort(a) === false ) { return; }
                    cValue = a;
                }
            });
            return;
        }
        const prop = chain.slice(0, pos);
        const v = owner[prop];
        chain = chain.slice(pos + 1);
        if ( v instanceof Object || typeof v === 'object' && v !== null ) {
            trapChain(v, chain);
            return;
        }
        trapProp(owner, prop, true, {
            v: undefined,
            init: function(v) {
                this.v = v;
                return true;
            },
            getter: function() {
                return this.v;
            },
            setter: function(a) {
                this.v = a;
                if ( a instanceof Object ) {
                    trapChain(a, chain);
                }
            }
        });
    };
    trapChain(window, chain);
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
