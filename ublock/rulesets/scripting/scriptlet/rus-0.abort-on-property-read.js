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

// ruleset: rus-0

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_abortOnPropertyRead() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"AdbBanner\"]","[\"CTRManager.host3\"]","[\"CheckingUser\"]","[\"ClickUndercookie\"]","[\"Date.prototype.toUTCString\"]","[\"Groups.showDisclaimer\"]","[\"Light.Popup\"]","[\"Object.prototype.AdfoxXhrRequestPrepared\"]","[\"Object.prototype.Metrika\"]","[\"Object.prototype.YA_TURBO_PAGES\"]","[\"Object.prototype._getBanner\"]","[\"Object.prototype._isAutostartQueueSet\"]","[\"Object.prototype.bannerOptions\"]","[\"Object.prototype.brandingBlock\"]","[\"Object.prototype.direct\"]","[\"Object.prototype.fakeDetect\"]","[\"Object.prototype.getAdUsageStorage\"]","[\"Object.prototype.initDeps\"]","[\"Object.prototype.initOnPlay\"]","[\"Object.prototype.isApplySticky\"]","[\"Object.prototype.loadBanner\"]","[\"Object.prototype.render\"]","[\"Object.prototype.scriptsViaXhr\"]","[\"Object.prototype.yaContextCb\"]","[\"PUM.getPopup\"]","[\"PageBottomBanners\"]","[\"SIN.AdsLoader\"]","[\"TotemToolsObject\"]","[\"Unauthorized2\"]","[\"WebSocket\"]","[\"XMLHttpRequest\"]","[\"Ya\"]","[\"__vasActiveTestIds\"]","[\"a_urls\"]","[\"aab\"]","[\"abl\"]","[\"adblock_availability_check\"]","[\"adcashMacros\"]","[\"admiral\"]","[\"ads\"]","[\"advFirstClickOpenNewTab\"]","[\"advanced_ads_ready\"]","[\"anOptions\"]","[\"app_vars.force_disable_adblock\"]","[\"atob\"]","[\"bannersBillboard\"]","[\"blocked_action\"]","[\"brblob\"]","[\"cardinals\"]","[\"clickNS4\"]","[\"createAds\"]","[\"creepyVideo\"]","[\"disable_copy\"]","[\"disable_hot_keys\"]","[\"document.addEventListener\"]","[\"document.body.oncopy\"]","[\"document.getElementById\",\"mdl_adb\"]","[\"document.oncontextmenu\"]","[\"document.oncopy\"]","[\"document.ondragend\"]","[\"document.ondragstart\"]","[\"document.ondrop\"]","[\"document.onkeydown\"]","[\"document.onpaste\"]","[\"document.onselectstart\"]","[\"eaglePlayerPlugins.autoplay_position\"]","[\"echelon\"]","[\"flat_pm_arr\"]","[\"forTheFreeVideo.css\"]","[\"getSelection\"]","[\"get_ya_browser\"]","[\"goTolink\"]","[\"helpUsImproveSite\"]","[\"initsnow\"]","[\"kav_cn\"]","[\"lftrght\"]","[\"m205\"]","[\"mdpDeBlocker\"]","[\"move_string\"]","[\"myatu_bgm\"]","[\"nocontext\"]","[\"onload\"]","[\"open\"]","[\"preventSelection\"]","[\"setsnow\"]","[\"sparkle\"]","[\"stopPrntScr\"]","[\"t364_initPopup\"]","[\"target_script\"]","[\"td_ad_background_click_target\"]","[\"tingle\"]","[\"tnAdditionalParams\"]","[\"unSelect\"]","[\"updateDownloadLinks\"]","[\"utarget_script\"]","[\"video.preroll\"]","[\"vpb\"]","[\"web_script\"]","[\"weekCallbacks\"]","[\"window.alert\"]","[\"window.block\"]","[\"yaContextCb\"]","[\"zfgformats\"]","[\"bc_blocks\"]","[\"OK.hooks\"]","[\"globalAuthLoginPopupCounter\"]","[\"u_global_data\"]"];

const hostnamesMap = new Map([["htmlweb.ru",0],["fapreactor.com",1],["joyreactor.cc",1],["pornreactor.cc",1],["reactor.cc",1],["tarkov-wiki.ru",2],["anifap.com",3],["anipoisk.org",3],["anitokyo.tv",3],["hcdn.online",3],["kinofilm.co",3],["24smi.org",[4,21]],["relax-fm.ru",[4,32]],["rg.ru",[4,101]],["sm.news",[4,31,34,83]],["ura.news",[4,101]],["vk.com",[5,25,28]],["vk.ru",[5,25,28]],["rutor.org",6],["drive2.ru",[7,23]],["liveinternet.ru",[8,9]],["yap.ru",8],["yaplakal.com",8],["lena-miro.ru",10],["levik.blog",10],["livejournal.com",10],["olegmakarenko.ru",10],["periskop.su",10],["shakko.ru",10],["shiro-kino.ru",10],["vadimrazumov.ru",10],["rbc.ru",[11,19,69]],["www.kinopoisk.ru",12],["www.e1.ru",13],["gorodrabot.by",14],["gorodrabot.ru",14],["fishki.net",15],["reshuct.by",16],["reshuent.kz",16],["reshuolymp.ru",16],["sdamgia.ru",16],["pikabu.ru",17],["gdespaces.com",18],["gdespaces.net",18],["google-cloud.services",18],["spac.me",18],["spac.run",18],["spac.wtf",18],["spac1.com",18],["spac1.info",18],["spac1.me",18],["spac1.net",18],["spac1.org",18],["spac1.ru",18],["spaces-blogs.com",18],["spaces.im",18],["spcs-files.xyz",18],["spcs.bio",18],["spcs.global",18],["spcs.life",18],["spcs.me",18],["spcs.network",18],["spcs.news",18],["spcs.pro",18],["spcs.pub",18],["spcs.reviews",18],["spcs.social",18],["strip2.in",18],["strip2.xxx",18],["usersporn.com",18],["nova.rambler.ru",20],["gismeteo.by",22],["gismeteo.kz",22],["gismeteo.md",22],["gismeteo.ru",22],["razlozhi.ru",23],["f1comp.ru",24],["tagaev.com",24],["times.zt.ua",24],["sinoptik.ua",[26,96]],["porngames.su",27],["rintor.info",27],["rintor.net",27],["castle-tv.com",29],["100popugaev.ru",30],["coderlessons.com",30],["fixx.one",30],["its-kids.ru",30],["molitvy.guru",30],["nizhny.ru",30],["pro100hobbi.ru",30],["publy.ru",30],["samelectric.ru",30],["svadba.expert",30],["tehnobzor.ru",[30,77]],["vibir.ru",30],["3dnews.kz",31],["3dnews.ru",31],["avtovzglyad.ru",31],["baby.ru",31],["dni.ru",31],["e1.ru",31],["mamba.ru",31],["sports.ru",31],["www.goha.ru",31],["forum.overclockers.ua",33],["bstudy.net",35],["ozlib.com",35],["studbooks.net",35],["studme.org",35],["studref.com",35],["studwood.net",35],["vuzlit.com",35],["xstud.org",35],["vgtimes.ru",36],["upload.ee",37],["footboom.com",[38,66]],["footboom.kz",[38,66]],["electric-house.ru",39],["stroi-help.ru",39],["freehat.cc",[40,82]],["agroreview.com",41],["amazinghis.ru",42],["moj-pes.ru",42],["shrlink.top",43],["friends.in.ua",[44,54]],["gidonline.eu",[44,88]],["vprognoze.ru",45],["medicina.ua",46],["anidub.vip",47],["anidubonline.com",47],["overclockers.ru",48],["zaruba.fun",49],["vesti.ua",50],["gazeta.ru",[51,65,71]],["kolizhanka.com.ua",[52,53,80]],["gra-prestoliv.in.ua",54],["simpsonsua.tv",54],["pravvest.ru",55],["dclans.ru",56],["animevost.org",57],["animevost.site",57],["animevost.top",57],["doefiratv.info",57],["payeer-gift.ru",57],["sinema.top",57],["smotret-anime-365.ru",57],["turkish-tv-series.ru",[57,62,69]],["vost.pw",57],["xn--b1aew.xn--p1ai",[57,58,59,60,61,63,64]],["my-expert.ru",60],["7ogorod.ru",67],["autonevod.ru",67],["shtrafsud.ru",67],["zazloo.ru",67],["kinozapas.co",68],["livesx.online",68],["xn--80aikhbrhr.xn--j1amh",68],["championat.com",69],["doramy.club",69],["sportrbc.ru",69],["musify.club",70],["dota2.ru",72],["elitesnooker.com",73],["artfile.me",74],["artfile.ru",74],["astrakhan.ru",74],["myjane.ru",74],["omskpress.ru",74],["tambovnet.org",74],["daz3d.ru",75],["studizba.com",76],["asteriatm.ru",77],["sudya-dredd.ru",[77,86]],["anime-chan.me",[78,85]],["city.ogo.ua",79],["it-actual.ru",81],["hlamer.ru",82],["lostpix.com",82],["oveg.ru",82],["potokcdn.com",82],["prostoporno.help",82],["saltday.ru",82],["uploadimagex.com",82],["wowskill.ru",82],["xittv.net",82],["tapochek.net",[84,97]],["bryansknovosti.ru",86],["novozybkov.su",86],["moremania.info",87],["kinogo.eu",88],["1informer.com",89],["fainaidea.com",89],["itech.co.ua",89],["mediasat.info",89],["root-nation.com",89],["fssp.gov.ru",90],["liveforums.ru",91],["onlineclass.space",92],["nsportal.ru",93],["animekun.ru",94],["doramakun.ru",94],["vestivrn.ru",95],["www.ukr.net",96],["4studio.com.ua",98],["cikavosti.com",98],["dialogs.org.ua",98],["fakty.ua",98],["gorodkiev.com.ua",98],["informator.ua",98],["kriminal.tv",98],["pingvin.pro",98],["technoportal.com.ua",98],["u-news.com.ua",98],["uanews.org.ua",98],["versii.if.ua",98],["volynpost.com",98],["bombardir.ru",99],["comp-service.kiev.ua",99],["softportal.com",100],["80-e.ru",101],["examenpdd.com",101],["animedia.tv",102],["animedub.ru",102],["vsetut.su",102],["ok.ru",[104,105]],["3dn.ru",106],["a-point.info",106],["addfiles.ru",106],["all-for-kompa.ru",106],["asia-tv.su",106],["at.ua",106],["autosimgames.ru",106],["chernobyl-soul.com",106],["clan.su",106],["cliphq.ru",106],["coop-lands.ru",106],["db-energo.ru",106],["devdrivers.ru",106],["do.am",106],["dtva-it-rus.gq",106],["elegos.ru",106],["elektronika56.ru",106],["elektrosat.ru",106],["fon-ki.com",106],["for-gsm.ru",106],["free-dream.ru",106],["ftechedu.ru",106],["fukushima-news.ru",106],["gals.md",106],["gamesdendy.ru",106],["giginfo.ru",106],["gloria-cedric.ru",106],["goldformat.ru",106],["greenflash.su",106],["hero-empire.com",106],["igrul-ka.ru",106],["jetvis.ru",106],["krasnickij.ru",106],["krolmen.ru",106],["megaclips.net",106],["mod-rus.ru",106],["mow-portal.ru",106],["moy.su",106],["mp3songs.ru",106],["mp4android.ru",106],["musiklip.ru",106],["my1.ru",106],["narod.ru",106],["newgames.com.ua",106],["novospasskoe-city.ru",106],["obschestvo-9999.gq",106],["omsimclub.ru",106],["online-supernatural.ru",106],["onlinestargate.ru",106],["only-paper.ru",106],["others.name",106],["pidru4nik.com",106],["pkrc.ru",106],["play-force.ru",106],["pohoronnoe-byuro.com",106],["pokatushki-pmr.ru",106],["pro-zakupki.ru",106],["project-ss.ru",106],["psxworld.ru",106],["radiodom.org",106],["rocketdockfree.ru",106],["sdr-deluxe.com",106],["skidrowcrack.ru",106],["soft-game.net",106],["stalker-gsc.ru",106],["stalker-zone.info",106],["stalkermods.ru",106],["svadbatomsk.ru",106],["techmusic.ru",106],["tes-game.ru",106],["torfiles.ru",106],["torm-egan.ru",106],["torrent-file.top",106],["ucoz.club",106],["ucoz.com",106],["ucoz.net",106],["ucoz.org",106],["ucoz.ru",106],["ucoz.ua",106],["usite.pro",106],["vodopads.ru",106],["vsthouse.ru",106],["warcraftda.ru",106],["xakevsoft.ru",106],["xn--80aeshkkbdj.xn--p1ai",106],["yaminecraft.ru",106],["zona-stalkera.ru",106]]);

const entitiesMap = new Map([["porno365",103]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function abortOnPropertyRead(
    chain = ''
) {
    if ( typeof chain !== 'string' ) { return; }
    if ( chain === '' ) { return; }
    const exceptionToken = getExceptionToken();
    const abort = function() {
        throw new ReferenceError(exceptionToken);
    };
    const makeProxy = function(owner, chain) {
        const pos = chain.indexOf('.');
        if ( pos === -1 ) {
            const desc = Object.getOwnPropertyDescriptor(owner, chain);
            if ( !desc || desc.get !== abort ) {
                Object.defineProperty(owner, chain, {
                    get: abort,
                    set: function(){}
                });
            }
            return;
        }
        const prop = chain.slice(0, pos);
        let v = owner[prop];
        chain = chain.slice(pos + 1);
        if ( v ) {
            makeProxy(v, chain);
            return;
        }
        const desc = Object.getOwnPropertyDescriptor(owner, prop);
        if ( desc && desc.set !== undefined ) { return; }
        Object.defineProperty(owner, prop, {
            get: function() { return v; },
            set: function(a) {
                v = a;
                if ( a instanceof Object ) {
                    makeProxy(a, chain);
                }
            }
        });
    };
    const owner = window;
    makeProxy(owner, chain);
}

function getExceptionToken() {
    const token =
        String.fromCharCode(Date.now() % 26 + 97) +
        Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const oe = self.onerror;
    self.onerror = function(msg, ...args) {
        if ( typeof msg === 'string' && msg.includes(token) ) { return true; }
        if ( oe instanceof Function ) {
            return oe.call(this, msg, ...args);
        }
    }.bind();
    return token;
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
    try { abortOnPropertyRead(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
