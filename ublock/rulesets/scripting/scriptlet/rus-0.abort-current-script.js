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

/// name abort-current-script
/// alias acs
/// alias abort-current-inline-script
/// alias acis

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_abortCurrentScript() {

/******************************************************************************/

// rus-0

const argsList = [{"a":["document.createElement","/ru-n4p|ua-n4p|загрузка.../"]},{"a":["setInterval","reload"]},{"a":["atob","void"]},{"a":["$","contextmenu"]},{"a":["document.oncontextmenu"]},{"a":["$","append"]},{"a":["$","mainContainer"]},{"a":["decodeURIComponent","/63cc63/"]},{"a":["String.fromCharCode","var _0x"]},{"a":["Math.floor","AdSense"]},{"a":["decodeURIComponent","getAdBlockStatus"]},{"a":["document.querySelector","/banner/"]},{"a":["Math.floor","adregain_wall"]},{"a":["document.createElement","Math.random"],"n":["new.fastpic.org"]},{"a":["addEventListener","DOMContentLoaded"],"n":["new.fastpic.org"]},{"a":["document.querySelector","contentDocument"],"n":["new.fastpic.org"]},{"a":["JSON.parse","atob"]},{"a":["decodeURIComponent","fromCharCode"]},{"a":["XMLHttpRequest","document.querySelectorAll"]},{"a":["JSON.parse"]},{"a":["__require","/clickunder/"]},{"a":["fuckAdBlock","undefined"]},{"a":["jQuery","backgroundImage"]},{"a":["document.createElement","isBlob"]},{"a":["document.createElement"]},{"a":["$","get"]},{"a":["setTimeout","adblockwarn"]},{"a":["document.createElement","delete window"]},{"a":["redram","/загрузка.../"]},{"a":["document.addEventListener","adsBlocked"]},{"a":["disableSelection","reEnable"]},{"a":["document.getElementsByTagName","unselectable"]},{"a":["$","divWrapper"]},{"a":["document.querySelectorAll","popMagic"]},{"a":["clickExplorer"]},{"a":["document.createElement","ExternalChromePop"]},{"a":["$","1xbet"]},{"a":["document.createElement","atob"]},{"a":["document.getElementById","composedPath"]},{"a":["document.onkeydown"]},{"a":["Math.random"]},{"a":["$","init_x_place"]},{"a":["document.createElement","String.fromCharCode"]}];

const hostnamesMap = new Map([["1news.com.ua",0],["365news.biz",0],["4mama.ua",0],["4studio.com.ua",0],["7days-ua.com",0],["agroter.com.ua",0],["alter-science.info",0],["apnews.com.ua",0],["argumentiru.com",0],["asiaplustj.info",0],["autotema.org.ua",0],["autotheme.info",0],["beauty.ua",0],["begemot-media.com",0],["begemot.media",0],["chas.cv.ua",0],["cheline.com.ua",0],["cikavosti.com",0],["ck.ua",0],["cn.ua",0],["comments.ua",0],["cvnews.cv.ua",0],["day.kyiv.ua",0],["depo.ua",0],["dnews.dn.ua",0],["dv-gazeta.info",0],["dyvys.info",0],["economistua.com",0],["edinstvennaya.ua",0],["ekovolga.com",0],["expert.in.ua",0],["fedpress.ru",0],["firtka.if.ua",0],["forpost.media",0],["fraza.com",0],["glavnoe.ua",0],["glavnoe24.ru",0],["glavpost.ua",0],["golosinfo.com.ua",0],["gorodkiev.com.ua",0],["gov.ua",0],["grad.ua",0],["greenpost.ua",0],["ifnews.org.ua",0],["inforpost.com",0],["inkorr.com",0],["itechua.com",0],["iz.com.ua",0],["kh.ua",0],["khersonline.net",0],["kolizhanka.com.ua",0],["kr.ua",0],["krymr.com",0],["kurskcity.ru",0],["liga.net",[0,10,11]],["lvnews.org.ua",0],["mega-music.pro",0],["mi100.info",0],["mignews.com.ua",0],["mind.ua",0],["moirebenok.ua",0],["mycompplus.ru",0],["nakanune.ru",0],["narodna-pravda.ua",0],["nashbryansk.ru",0],["news24today.info",0],["newsua.one",0],["ngp-ua.info",0],["nnews.com.ua",0],["novavlada.info",0],["novynarnia.com",0],["np.pl.ua",0],["odessa-life.od.ua",0],["ogo.ua",0],["oukr.info",0],["panoptikon.org",0],["pg11.ru",0],["pik.net.ua",0],["pingvin.pro",0],["pl.com.ua",0],["planetanovosti.com",0],["podpricelom.com.ua",0],["politnavigator.net",0],["poltava365.com",0],["portal.lviv.ua",0],["praktika-vlasti.com.ua",0],["prm.ua",0],["procherk.info",0],["profootball.ua",0],["promin.cv.ua",0],["radiosvoboda.org",0],["ratel.kz",0],["real-vin.com",0],["reporter.ua",0],["risu.ua",0],["rivne.media",0],["rivnenews.com.ua",0],["rusjev.net",0],["russianshowbiz.info",0],["rv.ua",0],["rvnews.rv.ua",0],["semobile.com.ua",0],["showdream.org",0],["sport-kr.com.ua",0],["strana.news",0],["strana.today",0],["sud.ua",0],["superdom.ua",0],["te.ua",0],["telekritika.ua",0],["tenews.org.ua",[0,40]],["theageoffootball.com",0],["treebuna.info",0],["tverigrad.ru",0],["tverisport.ru",0],["tvoymalysh.com.ua",0],["uainfo.org",0],["uanews.org.ua",0],["uatv.ua",0],["ukranews.com",0],["ukrrain.com",0],["unn.com.ua",0],["vchaspik.ua",0],["versii.if.ua",0],["viva.ua",0],["vlast.kz",0],["vnn24.ru",0],["volnorez.com.ua",0],["volyninfa.com.ua",0],["volyninfo.com",0],["volynpost.com",0],["volynua.com",0],["vsviti.com.ua",0],["westnews.info",0],["womo.ua",0],["wworld.com.ua",0],["zbirna.com",0],["zp.ua",0],["24boxing.com.ua",1],["bilshe.com",1],["businessua.com",1],["f1analytic.com",1],["football-ukraine.com",1],["footballgazeta.com",1],["footballtransfer.com.ua",1],["glianec.com",1],["nashamama.com",1],["sportanalytic.com",1],["stravy.net",1],["zdorovia.com.ua",1],["allboxing.ru",2],["asn.in.ua",3],["brigadtv.ru",4],["castle-serial.ru",4],["ehlita.ru",4],["gameout.ru",4],["itevonklass.ru",4],["izmailovtv.xyz",4],["karateltv.ru",4],["lyucifer.tv",4],["m-z.tv",4],["my-expert.ru",[4,30,31]],["pokazuha.ru",4],["samomdele.tv",4],["saske.tv",4],["sorvigolovatv.ru",4],["taynyeistiny.ru",4],["transformator220.ru",4],["budport.com.ua",5],["conversion.im",6],["daz3d.ru",7],["dc-marvel.org",8],["gidonline.eu",8],["dmod.cc",9],["draug.ru",9],["modsforwot.ru",9],["dynamo.kiev.ua",[10,11]],["epravda.com.ua",[10,11]],["football.ua",[10,11]],["isport.ua",[10,11]],["pravda.com.ua",[10,11]],["www.i.ua",[10,11]],["electric-house.ru",12],["euro-football.ru",12],["forums.rusmedserv.com",12],["liveresult.ru",12],["smolensk-auto.ru",12],["smolensk-auto.site",12],["stroi-help.ru",12],["fastpic.org",[13,14,15]],["karpatnews.in.ua",13],["kaztorka.org",13],["kg-portal.ru",13],["fenglish.site",16],["mp3spy.cc",16],["filmisub.com",[17,18]],["kinofen.net",[17,18]],["freescreens.ru",19],["imgbase.ru",19],["imgcach.ru",19],["imgclick.ru",19],["payforpic.ru",19],["picclick.ru",19],["picclock.ru",19],["picforall.ru",19],["gdespaces.com",20],["gdespaces.net",20],["spac.me",20],["spac1.com",20],["spac1.info",20],["spac1.me",20],["spac1.net",20],["spac1.org",20],["spac1.ru",20],["spaces-blogs.com",20],["spaces.im",20],["spcs.me",20],["spcs.social",20],["strip2.in",20],["strip2.xxx",20],["gwss.ru",21],["hardwareluxx.ru",22],["kinogo.cc",23],["livesx.online",23],["xn--80aikhbrhr.xn--j1amh",23],["krolik.biz",24],["l2top.ru",25],["livesport.ws",26],["lrepacks.net",27],["marieclaire.ua",28],["mod-wot.ru",29],["penzainform.ru",32],["pornopuk.com",33],["huyamba.tv",33],["piratam.net",33],["piratca.net",33],["porn720.biz",33],["sexitorrent.com",33],["sextor.org",33],["domahatv.com",33],["torrent-pirat.com",33],["xtorrent.net",33],["rapidzona.tv",33],["xxxrip.net",33],["xxxtor.com",33],["hentai-share.one",33],["pravvest.ru",34],["rutor.in",35],["shaiba.kz",36],["shanson320.ru",37],["vesti.ua",37],["skam.online",38],["stalker-mods.clan.su",39],["stalker-mods.su",39],["tut.by",41],["www.vesti.ru",42]]);

/******************************************************************************/

// Issues to mind before changing anything:
//  https://github.com/uBlockOrigin/uBlock-issues/issues/2154

const scriptlet = (
    target = '',
    needle = '',
    context = ''
) => {
    if ( target === '' ) { return; }
    const reRegexEscape = /[.*+?^${}()|[\]\\]/g;
    const reNeedle = (( ) => {
        if ( needle === '' ) { return /^/; }
        if ( /^\/.+\/$/.test(needle) ) {
            return new RegExp(needle.slice(1,-1));
        }
        return new RegExp(needle.replace(reRegexEscape, '\\$&'));
    })();
    const reContext = (( ) => {
        if ( context === '' ) { return; }
        if ( /^\/.+\/$/.test(context) ) {
            return new RegExp(context.slice(1,-1));
        }
        return new RegExp(context.replace(reRegexEscape, '\\$&'));
    })();
    const chain = target.split('.');
    let owner = window;
    let prop;
    for (;;) {
        prop = chain.shift();
        if ( chain.length === 0 ) { break; }
        owner = owner[prop];
        if ( owner instanceof Object === false ) { return; }
    }
    let value;
    let desc = Object.getOwnPropertyDescriptor(owner, prop);
    if (
        desc instanceof Object === false ||
        desc.get instanceof Function === false
    ) {
        value = owner[prop];
        desc = undefined;
    }
    const magic = String.fromCharCode(Date.now() % 26 + 97) +
                  Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const scriptTexts = new WeakMap();
    const getScriptText = elem => {
        let text = elem.textContent;
        if ( text.trim() !== '' ) { return text; }
        if ( scriptTexts.has(elem) ) { return scriptTexts.get(elem); }
        const [ , mime, content ] =
            /^data:([^,]*),(.+)$/.exec(elem.src.trim()) ||
            [ '', '', '' ];
        try {
            switch ( true ) {
            case mime.endsWith(';base64'):
                text = self.atob(content);
                break;
            default:
                text = self.decodeURIComponent(content);
                break;
            }
        } catch(ex) {
        }
        scriptTexts.set(elem, text);
        return text;
    };
    const validate = ( ) => {
        const e = document.currentScript;
        if ( e instanceof HTMLScriptElement === false ) { return; }
        if ( reContext !== undefined && reContext.test(e.src) === false ) {
            return;
        }
        if ( reNeedle.test(getScriptText(e)) === false ) { return; }
        throw new ReferenceError(magic);
    };
    Object.defineProperty(owner, prop, {
        get: function() {
            validate();
            return desc instanceof Object
                ? desc.get.call(owner)
                : value;
        },
        set: function(a) {
            validate();
            if ( desc instanceof Object ) {
                desc.set.call(owner, a);
            } else {
                value = a;
            }
        }
    });
    const oe = window.onerror;
    window.onerror = function(msg) {
        if ( typeof msg === 'string' && msg.includes(magic) ) {
            return true;
        }
        if ( oe instanceof Function ) {
            return oe.apply(this, arguments);
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
