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

/// name abort-on-property-read
/// alias aopr

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_abortOnPropertyRead() {

/******************************************************************************/

// rus-0

const argsList = [{"a":["td_ad_background_click_target"]},{"a":["Object.prototype.render"]},{"a":["Ya"]},{"a":["weekCallbacks"]},{"a":["flat_pm_arr"]},{"a":["yaContextCb"]},{"a":["advtss"]},{"a":["anOptions"]},{"a":["Object.prototype.initDeps"]},{"a":["Date.prototype.toUTCString"]},{"a":["brblob"]},{"a":["ClickUndercookie"]},{"a":["zfgformats"]},{"a":["utarget_script"]},{"a":["document.oncontextmenu"]},{"a":["kav_cn"]},{"a":["mdpDeBlocker"]},{"a":["stopPrntScr"]},{"a":["WebSocket"]},{"a":["myatu_bgm"]},{"a":["XMLHttpRequest"]},{"a":["window.alert"]},{"a":["lftrght"]},{"a":["document.getElementById","mdl_adb"]},{"a":["getSelection"]},{"a":["helpUsImproveSite"]},{"a":["Object.prototype.AdfoxXhrRequestPrepared"]},{"a":["Object.prototype.yaContextCb"]},{"a":["ads"]},{"a":["initsnow"]},{"a":["PUM.getPopup"]},{"a":["D4zz"]},{"a":["Object.prototype.fakeDetect"]},{"a":["admiral"]},{"a":["echelon"]},{"a":["a_urls"]},{"a":["advFirstClickOpenNewTab"]},{"a":["open"]},{"a":["atob"]},{"a":["document.addEventListener"]},{"a":["tingle"]},{"a":["creepyVideo"]},{"a":["eaglePlayerPlugins.autoplay_position"]},{"a":["goTolink"]},{"a":["Object.prototype.initOnPlay"]},{"a":["target_script"]},{"a":["Object.prototype.scriptsViaXhr"]},{"a":["Object.prototype.initAdfox"]},{"a":["AdbBanner"]},{"a":["onload"]},{"a":["CTRManager.host3"]},{"a":["disable_copy"]},{"a":["disable_hot_keys"]},{"a":["nocontext"]},{"a":["Object.prototype.noAdsHref"]},{"a":["tnAdditionalParams"]},{"a":["Object.prototype.YA_TURBO_PAGES"]},{"a":["Object.prototype.Metrika"]},{"a":["blocked_action"]},{"a":["get_ya_browser"]},{"a":["document.ondragstart"]},{"a":["cardinals"]},{"a":["isABPEnabled"]},{"a":["EUMPAntiblockConfig"]},{"a":["TotemToolsObject"]},{"a":["document.body.oncopy"]},{"a":["Object.prototype._isAutostartQueueSet"]},{"a":["Object.prototype.isApplySticky"]},{"a":["Object.prototype.parseBlockId"]},{"a":["Light.Popup"]},{"a":["app_vars.force_disable_adblock"]},{"a":["aab"]},{"a":["preventSelection"]},{"a":["window.block"]},{"a":["m205"]},{"a":["web_script"]},{"a":["CheckingUser"]},{"a":["document.onkeydown"]},{"a":["adcashMacros"]},{"a":["createAds"]},{"a":["video.preroll"]},{"a":["adblock_availability_check"]},{"a":["Groups.showDisclaimer"]},{"a":["PageBottomBanners"]},{"a":["Unauthorized"]},{"a":["Unauthorized2"]},{"a":["Object.prototype.BannerAdx"]},{"a":["clickNS4"]},{"a":["OK.hooks"]},{"a":["globalAuthLoginPopupCounter"]},{"a":["u_global_data"]},{"a":["window.googletag"]}];

const hostnamesMap = new Map([["1informer.com",0],["fainaidea.com",0],["housechief.ru",0],["itech.co.ua",0],["mediasat.info",0],["root-nation.com",0],["24smi.org",1],["3dnews.ru",2],["avtovzglyad.ru",2],["baby.ru",2],["dni.ru",2],["e1.ru",2],["sm.news",[2,9,71,72]],["sports.ru",2],["www.goha.ru",2],["4studio.com.ua",3],["cikavosti.com",3],["dialogs.org.ua",3],["fakty.ua",3],["gorodkiev.com.ua",3],["informator.ua",3],["kriminal.tv",3],["mignews.com.ua",3],["pingvin.pro",3],["technoportal.com.ua",3],["u-news.com.ua",3],["uanews.org.ua",3],["versii.if.ua",3],["volynpost.com",3],["7ogorod.ru",4],["autonevod.ru",4],["shtrafsud.ru",4],["80-e.ru",5],["examenpdd.com",5],["all-episodes.club",6],["amazinghis.ru",7],["moj-pes.ru",7],["amedia.online",[8,9]],["web-shpargalka.ru",9],["anidub.club",10],["anidub.life",10],["anidub.link",10],["anime.anidub.com",10],["online.anidub.com",10],["tr.anidub.com",10],["anifap.com",11],["anipoisk.org",11],["anitokyo.tv",11],["hcdn.online",11],["kinofilm.co",11],["animedia.tv",12],["animedub.ru",12],["vsetut.su",12],["animekun.ru",13],["doramakun.ru",13],["nnm-club.lib",13],["nnm-club.me",13],["nnmclub.ro",13],["nnmclub.to",13],["animevost.am",14],["animevost.org",14],["animevost.site",14],["animevost.top",14],["doefiratv.info",14],["payeer-gift.ru",14],["sinema.top",14],["smotret-anime-365.ru",14],["turkish-tv-series.ru",[14,24,77]],["vost.pw",14],["artfile.me",15],["artfile.ru",15],["astrakhan.ru",15],["myjane.ru",15],["omskpress.ru",15],["tambovnet.org",15],["asteriatm.ru",16],["sudya-dredd.ru",[16,17]],["tehnobzor.ru",16],["bryansknovosti.ru",17],["novozybkov.su",17],["castle-tv.com",18],["city.ogo.ua",19],["coderlessons.com",20],["fixx.one",20],["its-kids.ru",20],["molitvy.guru",20],["nizhny.ru",20],["pro100hobbi.ru",20],["publy.ru",20],["samelectric.ru",20],["svadba.expert",20],["vibir.ru",20],["comp-service.kiev.ua",21],["daz3d.ru",22],["dclans.ru",23],["doramy.club",24],["quote.ru",24],["rbc.ru",[24,66,67]],["sportrbc.ru",24],["dota2.ru",25],["drive2.ru",[26,27]],["electric-house.ru",28],["stroi-help.ru",28],["elitesnooker.com",29],["f1comp.ru",30],["tagaev.com",30],["times.zt.ua",30],["fapreactor.com",31],["pornreactor.cc",[31,50]],["fishki.net",32],["footboom.com",[33,34]],["footboom.kz",[33,34]],["forum.overclockers.ua",35],["freehat.cc",[36,37]],["hlamer.ru",37],["lostpix.com",37],["oveg.ru",37],["potokcdn.com",37],["prostoporno.help",37],["saltday.ru",37],["uploadimagex.com",37],["wowskill.ru",37],["xittv.net",37],["friends.in.ua",[38,39]],["gidonline.eu",[38,45]],["gra-prestoliv.in.ua",39],["simpsonsua.tv",39],["fssp.gov.ru",40],["gazeta.ru",[41,42,43]],["gdespaces.com",44],["gdespaces.net",44],["spac.me",44],["spac1.com",44],["spac1.info",44],["spac1.me",44],["spac1.net",44],["spac1.org",44],["spac1.ru",44],["spaces-blogs.com",44],["spaces.im",44],["spcs.me",44],["spcs.social",44],["strip2.in",44],["strip2.xxx",44],["kinogo.eu",45],["gismeteo.by",46],["gismeteo.kz",46],["gismeteo.md",46],["gismeteo.ru",46],["gorodrabot.by",47],["gorodrabot.ru",47],["htmlweb.ru",48],["it-actual.ru",49],["joyreactor.cc",50],["reactor.cc",50],["kolizhanka.com.ua",[51,52,53]],["lena-miro.ru",54],["levik.blog",54],["livejournal.com",54],["olegmakarenko.ru",54],["periskop.su",54],["shakko.ru",54],["shiro-kino.ru",54],["vadimrazumov.ru",54],["liveforums.ru",55],["liveinternet.ru",[56,57]],["yap.ru",57],["yaplakal.com",57],["medicina.ua",58],["musify.club",59],["my-expert.ru",60],["overclockers.ru",61],["pikabu.ru",62],["player.mediavitrina.ru",63],["porngames.su",64],["rintor.info",64],["rintor.net",64],["pravvest.ru",65],["reshuege.ru",68],["reshuoge.ru",68],["reshuvpr.ru",68],["sdamgia.ru",68],["rutor.org",69],["shrlink.top",70],["softportal.com",73],["studizba.com",74],["tapochek.net",75],["tarkov-wiki.ru",76],["upload.ee",78],["vesti.ua",79],["vestivrn.ru",80],["vgtimes.ru",81],["vk.com",[82,83,84,85]],["vk.ru",[82,83,84,85]],["www.kinopoisk.ru",86],["zaruba.fun",87],["ok.ru",[88,89]],["3dn.ru",90],["a-point.info",90],["addfiles.ru",90],["all-for-kompa.ru",90],["asia-tv.su",90],["at.ua",90],["autosimgames.ru",90],["chernobyl-soul.com",90],["clan.su",90],["cliphq.ru",90],["coop-lands.ru",90],["db-energo.ru",90],["devdrivers.ru",90],["do.am",90],["dtva-it-rus.gq",90],["elegos.ru",90],["elektronika56.ru",90],["elektrosat.ru",90],["fon-ki.com",90],["for-gsm.ru",90],["free-dream.ru",90],["ftechedu.ru",90],["fukushima-news.ru",90],["gals.md",90],["gamesdendy.ru",90],["giginfo.ru",90],["gloria-cedric.ru",90],["goldformat.ru",90],["greenflash.su",90],["hero-empire.com",90],["igrul-ka.ru",90],["jetvis.ru",90],["kinovego.ru",90],["krasnickij.ru",90],["krolmen.ru",90],["megaclips.net",90],["mod-rus.ru",90],["mow-portal.ru",90],["moy.su",90],["mp3songs.ru",90],["mp4android.ru",90],["mrcmirgorod.com.ua",90],["my1.ru",90],["narod.ru",90],["newgames.com.ua",90],["novospasskoe-city.ru",90],["obschestvo-9999.gq",90],["omsimclub.ru",90],["online-supernatural.ru",90],["onlinestargate.ru",90],["only-paper.ru",90],["others.name",90],["pidru4nik.com",90],["pkrc.ru",90],["play-force.ru",90],["pokatushki-pmr.ru",90],["pro-zakupki.ru",90],["project-ss.ru",90],["psxworld.ru",90],["radiodom.org",90],["rocketdockfree.ru",90],["sdr-deluxe.com",90],["skidrowcrack.ru",90],["soft-game.net",90],["stalker-gsc.ru",90],["stalker-zone.info",90],["stalkermods.ru",90],["svadbatomsk.ru",90],["tes-game.ru",90],["torfiles.ru",90],["torm-egan.ru",90],["torrent-file.top",90],["ucoz.club",90],["ucoz.com",90],["ucoz.net",90],["ucoz.org",90],["ucoz.ru",90],["ucoz.ua",90],["usite.pro",90],["vodopads.ru",90],["vsthouse.ru",90],["warcraftda.ru",90],["xakevsoft.ru",90],["xn--80aeshkkbdj.xn--p1ai",90],["yaminecraft.ru",90],["zona-stalkera.ru",90],["www.ukr.net",91]]);

/******************************************************************************/

const ObjGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const ObjDefineProperty = Object.defineProperty;

const magic =
    String.fromCharCode(Date.now() % 26 + 97) +
    Math.floor(Math.random() * 982451653 + 982451653).toString(36);

const abort = function() {
    throw new ReferenceError(magic);
};

const makeProxy = function(owner, chain) {
    const pos = chain.indexOf('.');
    if ( pos === -1 ) {
        const desc = ObjGetOwnPropertyDescriptor(owner, chain);
        if ( !desc || desc.get !== abort ) {
            ObjDefineProperty(owner, chain, {
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

    const desc = ObjGetOwnPropertyDescriptor(owner, prop);
    if ( desc && desc.set !== undefined ) { return; }

    ObjDefineProperty(owner, prop, {
        get: function() { return v; },
        set: function(a) {
            v = a;
            if ( a instanceof Object ) {
                makeProxy(a, chain);
            }
        }
    });
};

const scriptlet = (
    chain = ''
) => {
    const owner = window;
    makeProxy(owner, chain);
    const oe = window.onerror;
    window.onerror = function(msg, src, line, col, error) {
        if ( typeof msg === 'string' && msg.includes(magic) ) {
            return true;
        }
        if ( oe instanceof Function ) {
            return oe(msg, src, line, col, error);
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

