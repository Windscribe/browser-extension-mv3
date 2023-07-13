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

// ruleset: annoyances-others

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_nanoSetTimeoutBooster() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"counter\",\"\",\"0.02\"]","[\"e(t-1)\",\"*\",\"0.001\"]","[\"window.location.href\",\"*\",\"0.02\"]","[\"counter\",\"*\",\"0.02\"]","[\"download_loading\",\"*\",\"0.02\"]","[\"autoload-wait\",\"*\",\"0.02\"]","[\"content\",\"*\",\"0.02\"]","[\"/HideTimerID|clsname/\",\"*\",\"0.02\"]","[\"countdowntimer\",\"*\",\"0.02\"]","[\"updateClock\",\"\",\"0.02\"]","[\"seconds\",\"*\",\"0.02\"]","[\"myTimer\",\"*\",\"0.02\"]","[\"goLink(\",\"3000\"]","[\"get-link\",\"*\",\"0.02\"]","[\"getlink\",\"*\",\"0.02\"]","[\"download\",\"*\",\"0.02\"]","[\"/Please wait|myTime--/\",\"*\",\"0.02\"]","[\"updateClock\",\"*\",\"0.02\"]","[\"/_0x|gotoo/\",\"*\",\"0.02\"]","[\"status.innerHTML\",\"*\",\"0.02\"]","[\"document[_0x\",\"*\",\"0.02\"]","[\"countDown\",\"\",\"0.02\"]","[\"#counter\",\"\",\"0.02\"]","[\"count\",\"\",\"0.02\"]","[\"#download-loading\",\"*\",\"0.02\"]","[\"Tick\",\"\",\"0.02\"]","[\"submit\",\"5000\",\"0.02\"]","[\"wpsafe\",\"*\",\"0.02\"]","[\"_0x\",\"*\",\"0.02\"]","[\"redirect\",\"4000\",\"0.02\"]","[\"tick\",\"1000\"]","[\"grecaptcha\",\"*\",\"0.02\"]","[\"run()\",\"\",\"0.02\"]","[\"#proceed\",\"*\",\"0.02\"]","[\"timer\",\"1000\",\"0.02\"]","[\"/waiting|\\\\.classList\\\\.remove|gotoo/\",\"*\",\"0.02\"]","[\"seconds\",\"\",\"0.02\"]","[\"countdown()\",\"\",\"0.02\"]","[\"TheLink\",\"\",\"0.02\"]","[\"st2\",\"\",\"0.02\"]","[\"startTimer\",\"*\",\"0.02\"]","[\"goVideoJS\",\"*\",\"0.02\"]","[\"Please wait\",\"*\",\"0.02\"]","[\"showText\",\"*\",\"0.02\"]","[\"checkclick\",\"*\",\"0.02\"]","[\"/gotoo|pop-button|stickyadin/\",\"*\",\"0.02\"]","[\"#download_ad_addon\",\"10000\",\"0.02\"]","[\"$('.skip-btn').\",\"*\",\"0.02\"]","[\"download_file\",\"\",\"0.02\"]","[\"waitting_download\",\"\",\"0.02\"]","[\"CountBack\",\"990\",\"0.02\"]","[\"timeUpdater\",\"\",\"0.02\"]","[\"btn\",\"3000\",\"0.02\"]","[\"clsname\",\"5000\",\"0.02\"]","[\"#download\",\"10000\",\"0.02\"]","[\"#download\",\"11000\",\"0.02\"]","[\"/get-link\",\"5000\",\"0.02\"]","[\"fade\",\"5000\",\"0.02\"]","[\"timer_end\",\"20000\",\"0.02\"]","[\"disabled\",\"\",\"0.02\"]","[\"Please Wait\",\"\",\"0.02\"]","[\"gotoo\",\"22000\",\"0.02\"]","[\"gotoo\",\"17000\",\"0.02\"]","[\"download link\",\"\",\"0.02\"]","[\"-=0x1\",\"\",\"0.02\"]","[\"link\",\"1100\",\"0.02\"]","[\"tick\",\"1000\",\"0.02\"]","[\"countdown\",\"1400\",\"0.02\"]","[\"updateinfo\",\"1000\",\"0.02\"]","[\"count--\",\"1000\",\"0.02\"]","[\"window.location.href\",\"10000\",\"0.02\"]","[\"params.redirect\",\"5000\",\"0.02\"]","[\"timers\",\"\",\"0.02\"]","[\"timers\",\"4000\",\"0.02\"]","[\"doRedirect\",\"3000\",\"0.02\"]","[\"timer--\",\"\",\"0.02\"]","[\"timers\",\"1500\",\"0.02\"]","[\"var _0x\",\"\",\"0.02\"]","[\".eg-manually-get\",\"7000\",\"0.02\"]","[\"downloadbtn\",\"\",\"0.02\"]","[\"link_button\",\"\",\"0.02\"]","[\"#get_btn\",\"\",\"0.02\"]","[\"counter\",\"2000\",\"0.02\"]","[\"adFreePopup\",\"15000\",\"0.02\"]","[\"go_url\",\"15000\",\"0.3\"]","[\"window.location.href=t\",\"clearTimeout\",\"10000\"]","[\"adpop-content-left\",\"\",\"0.02\"]","[\"#ad .timer\",\"\",\"0.02\"]","[\"setSeconds\",\"\",\"0.02\"]","[\"updateReloj\",\"\",\"0.02\"]","[\"countdown\",\"\",\"0.02\"]","[\"dlcntdwn\",\"\",\"0.02\"]","[\"tick()\",\"\",\"0.02\"]","[\"startCountdown\",\"\",\"0.02\"]","[\"contador\",\"\",\"0.02\"]","[\"/action-downloadFile?\"]","[\"#freebtn\",\"\",\"0.02\"]","[\"download()\"]"];

const hostnamesMap = new Map([["tapewithadblock.org",0],["adblockstrtape.link",0],["adblockstrtech.link",0],["stape.fun",0],["strcloud.link",0],["moviessoul.com",0],["easymc.io",1],["iggtech.com",2],["ipamod.com",2],["apkmody.fun",4],["apkmody.io",4],["vsthemes.org",5],["comohoy.com",6],["indilinks.xyz",7],["blogtechh.com",8],["coins-town.com",9],["upapk.io",10],["bakenor.com",11],["prod.danawa.com",12],["blogmado.com",13],["vavada5com.com",14],["financerites.in",14],["financerites.com",14],["vocalley.com",14],["howifx.com",14],["enit.in",14],["skincarie.com",14],["imperialstudy.com",14],["apkmaza.co",15],["bakeput.com",16],["bakemain.com",16],["bakeleft.com",16],["link-descarga.site",17],["kinemaster.cc",18],["zertalious.xyz",19],["hashhackers.com",20],["katdrive.net",20],["newsongs.co.in",20],["course-downloader.com",21],["123lnk.xyz",21],["universalfreecourse.com",21],["freenulledworld.com",21],["downloadfreecourse.com",21],["aapks.com",21],["pvpcorme.com",21],["dosya.co",21],["ishort.xyz",21],["fmoviesdl.com",22],["solotakus-tv.ml",22],["uncensored-hentai.com",22],["curimovie.com",22],["malzero.xyz",23],["modyolo.com",24],["uploadmaza.com",25],["uptomega.me",25],["dlfiles.online",25],["hubfiles.ws",25],["romsget.io",26],["romsgames.net",26],["mcrypto.club",27],["spantechie.com",28],["imgadult.com",29],["imgdrive.net",29],["imgtaxi.com",29],["imgwallet.com",29],["uploadrar.com",30],["steampiay.cc",31],["pouvideo.cc",31],["pomvideo.cc",31],["top1iq.com",32],["downfile.site",33],["memangbau.com",33],["trangchu.news",33],["techacode.com",33],["azmath.info",33],["freetp.org",34],["online-fix.me",34],["technoashwath.com",35],["uploadflix.org",36],["uploadbaz.me",36],["downloadr.in",37],["freetraderdownload.com.br",37],["appofmirror.com",37],["egyshare.cc",38],["samfirms.com",40],["4shared.com",41],["themehits.com",43],["atlai.club",44],["techymedies.com",45],["noltrt.com",46],["getthot.com",47],["videezy.com",48],["fdocuments.in",49],["tgsup.group",50],["kutub3lpdf.com",50],["movie4k.dev",51],["itscybertech.com",52],["newzflix.xyz",53],["moviesfi.net",[54,55]],["shareappscrack.com",56],["policiesforyou.com",57],["gamemodding.com",58],["mixdrop.sx",59],["streamon.to",60],["moddedguru.com",[61,62]],["upvideo.to",63],["ninjastream.to",64],["techoow.com",65],["sama-share.com",66],["zeefiles.download",66],["apkdone.com",67],["jptorrent.org",68],["pinsystem.co.uk",69],["gamefront.com",70],["render-state.to",71],["respuestadetarea.com",72],["asistente-de-estudio.com",72],["edurespuestas.com",73],["c.newsnow.co.uk",74],["pentafaucet.com",75],["getitall.top",75],["ihomeworkhelper.com",76],["hdfull.lv",77],["emulatorgames.net",78],["desiupload.co",79],["bdupload.asia",79],["indishare.org",79],["onlinefreecourse.net",79],["uploadking.net",79],["w4files.ws",80],["easylinks.in",81],["novafusion.pl",82],["surfline.com",83],["catcut.net",84],["apkshki.com",85],["pngitem.com",86],["world-sms.org",87],["pulsemens.com",88],["verteleseriesonline.com",89],["hentaisd.tv",89],["memoriadatv.com",90],["filehorse.com",91],["filerio.in",92],["worldofmods.com",92],["subdowns.com",93],["tudogamesbr.com",94],["videouroki.net",95],["katfile.com",96],["coolrom.com.au",97],["freeroms.com",97]]);

const entitiesMap = new Map([["shavetape",0],["adblockstreamtape",0],["streamtape",0],["flixhub",3],["premiumebooks",39],["mixdrop",42]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function nanoSetTimeoutBooster(
    needleArg = '',
    delayArg = '',
    boostArg = ''
) {
    if ( typeof needleArg !== 'string' ) { return; }
    const reNeedle = patternToRegex(needleArg);
    let delay = delayArg !== '*' ? parseInt(delayArg, 10) : -1;
    if ( isNaN(delay) || isFinite(delay) === false ) { delay = 1000; }
    let boost = parseFloat(boostArg);
    boost = isNaN(boost) === false && isFinite(boost)
        ? Math.min(Math.max(boost, 0.02), 50)
        : 0.05;
    self.setTimeout = new Proxy(self.setTimeout, {
        apply: function(target, thisArg, args) {
            const [ a, b ] = args;
            if (
                (delay === -1 || b === delay) &&
                reNeedle.test(a.toString())
            ) {
                args[1] = b * boost;
            }
            return target.apply(thisArg, args);
        }
    });
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
    try { nanoSetTimeoutBooster(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
