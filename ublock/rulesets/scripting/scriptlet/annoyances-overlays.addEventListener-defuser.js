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

// ruleset: annoyances-overlays

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_addEventListenerDefuser() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"DOMContentLoaded\",\"admiral\"]","[\"load\",\"Dislike intrusive ads\"]","[\"load\",\"adblock_whitelist\"]","[\"DOMContentLoaded\",\"replaceAdsWithFallbackImages\"]","[\"np.detect\"]","[\"load\",\".offsetHeight == 0\"]","[\"load\",\"adBlock\"]","[\"/load|error/\",\".head.removeChild(\"]","[\"scroll\",\"scrollTop())+n-i>o/2\"]","[\"click\",\"popundr\"]","[\"click\",\"interstitial\"]","[\"mouseleave\",\"scribd_ad\"]","[\"mouseleave\"]","[\"popstate\",\"addEventProcessor\"]","[\"scroll\",\"eventHandle.elem\"]","[\"wheel\"]","[\"scroll\",\"documentElement.scrollTop\"]","[\"scroll\",\"_onscroll\"]","[\"mouseout\",\"#modalSair\"]","[\"scroll\",\"showPopup\"]","[\"scroll\",\".open()\"]","[\"mouseout\",\"event.dispatch.apply\"]","[\"ww-open-overlay\",\"scrollTop\"]","[\"load\",\"setVideoTop\"]","[\"scroll\",\"t.attemptLoad\"]","[\"load\",\"event.dispatch.apply\"]","[\"contextmenu\",\"preventDefault\"]","[\"/^(contextmenu|copy)$/\"]","[\"blur\"]","[\"copy\"]","[\"contextmenu\"]","[\"/^(?:contextmenu|copy|selectstart)$/\"]","[\"/^(?:contextmenu|copy)$/\",\"preventDefault\"]","[\"/^(?:contextmenu|keydown)$/\"]","[\"mouseout\"]","[\"scroll\"]","[\"DOMContentLoaded\",\".js-popup-adblock\"]","[\"keydown\"]","[\"/^(contextmenu|keydown)$/\"]","[\"/^(?:contextmenu|copy|keydown)$/\"]","[\"mouseout\",\"pop\"]","[\"/^(?:keyup|keydown)$/\"]","[\"keydown\",\"disable_in_input\"]","[\"keydown\",\"preventDefault\"]","[\"/contextmenu|keydown|keyup|copy/\"]","[\"copy\",\"getSelection\"]","[\"\",\"t.preventDefault\"]","[\"copy\",\"replaceCopiedText\"]","[\"/^(contextmenu|copy|dragstart|selectstart)$/\"]","[\"\",\"ads\"]","[\"/contextmenu|selectstart|copy/\"]","[\"/selectstart|copy/\"]","[\"\",\"activeKeys\"]","[\"/contextmenu|copy|keydown/\"]","[\"/contextmenu|select|copy/\"]","[\"contextmenu\",\"a\"]","[\"/^(mouseout|mouseleave)$/\"]","[\"/contextmenu|selectstart/\"]","[\"dragstart|keydown/\"]","[\"/contextmenu|keydown|dragstart/\"]","[\"\",\"_0x\"]","[\"copy\",\"preventDefault\"]","[\"\",\"adtoniq\"]","[\"/^(?:contextmenu|copy|keydown|mousedown)$/\"]","[\"/contextmenu|keydown/\"]","[\"/keydown|keyup/\"]","[\"devtoolschange\"]","[\"/contextmenu|copy/\"]","[\"\",\"mdp\"]","[\"/blur|mousedown|mouseenter|mouseleave/\"]","[\"/contextmenu|cut|copy|paste/\"]","[\"/contextmenu|mousedown/\"]","[\"/contextmenu|copy|selectstart/\"]","[\"\",\"0x\"]","[\"/^(?:contextmenu|dragstart|selectstart)$/\"]","[\"/^(?:contextmenu|copy)$/\"]","[\"/dragstart|keyup|keydown/\"]","[\"/keyup|keydown/\",\"wpcc\"]","[\"/contextmenu|cut|copy|keydown/\"]","[\"\",\"undefined\"]","[\"/contextmenu|selectstart|copy|dragstart/\"]","[\"/copy|dragstart/\"]","[\"/copy|contextmenu/\"]","[\"error\"]","[\"dragstart\"]","[\"\",\"AdB\"]","[\"selectionchange\",\"quill.emitter\"]","[\"/contextmenu|selectstart|select|copy|dragstart/\"]","[\"load\",\"adLazy\"]","[\"copy\",\"jQuery!==\\\"undefined\\\"\"]","[\"copy\",\"[native code]\"]","[\"/selectionchange|mousedown/\",\"[native code]\"]","[\"selectstart\"]","[\"/^(?:copy|paste)$/\",\"undefined\"]","[\"/copy|keydown/\"]","[\"/copy|cut|selectstart/\"]","[\"/keydown|keyup/\",\"keyCode\"]","[\"keydown\",\"disabledEvent\"]","[\"\",\"Key\"]","[\"/copy|cut|paste|selectstart/\"]","[\"/contextmenu|dragstart|keydown/\",\"event.dispatch.apply\"]","[\"beforepaste\"]","[\"\",\"keyCode\"]","[\"DOMContentLoaded\",\"rprw\"]","[\"\",\"key\"]","[\"\",\"ctrlKey\"]","[\"contextmenu\",\"event.triggered\"]","[\"copy\",\"pagelink\"]","[\"/keydown|mousedown/\"]","[\"copy\",\"Source\"]","[\"\",\"login\"]","[\"/contextmenu|copy|drag|dragstart/\"]","[\"/contextmenu|keydown|keypress|copy/\"]","[\"\",\"blockFuckingEverything\"]","[\"mouseout\",\"openLayer\"]","[\"/contextmenu|keydown/\",\"preventDefault\"]","[\"mousedown\",\"dispatch\"]","[\"/contextmenu|mousedown/\",\"return\\\"undefined\\\"\"]","[\"DOMContentLoaded\",\"ready\"]","[\"keydown\",\"disabledKeys\"]","[\"DOMContentLoaded\",\"load\"]","[\"contextmenu\",\"_0x\"]","[\"keydown\",\"keyCode\"]"];

const hostnamesMap = new Map([["gamerevolution.com",0],["onmsft.com",0],["timeanddate.com",[1,17]],["slideshare.net",[2,11]],["warcraftlogs.com",3],["nwdb.info",4],["explorecams.com",4],["tiermaker.com",4],["freeforumzone.com",5],["megogo.sport",6],["megogo.ru",6],["ynet.co.il",7],["infobae.com",7],["abcnyheter.no",7],["sme.sk",7],["yourdictionary.com",7],["foxnews.com",7],["blog.csdn.net",[8,61]],["fulltimehdfilmizle.com",9],["boyfriendtv.com",10],["milenio.com",[12,29]],["jakiwniosek.pl",12],["hikakaku.com",13],["wacul-ai.com",14],["qodeinteractive.com",15],["digitalvidya.com",15],["bbc.co.uk",16],["imovelguide.com.br",18],["facebook.com",19],["facebookwkhpilnemxj7asaniu7vnjjbiltxjqhye3mhbshg7kx5tfyd.onion",19],["cnyfertility.com",20],["da-direkt.de",21],["westwing.de",22],["tv.golfnetwork.co.jp",23],["bijutsutecho.com",24],["try-it.jp",25],["themeslide.com",[26,51,52,68]],["maxstream.video",26],["wpb.shueisha.co.jp",26],["vedantu.com",26],["zsti.zsti.civ.pl",26],["miraculous.to",[26,41]],["rationalityaloelike.com",[26,97]],["sizyreelingly.com",[26,97]],["simpulumlamerop.com",[26,97]],["urochsunloath.com",[26,97]],["monorhinouscassaba.com",[26,97]],["counterclockwisejacky.com",[26,97]],["35volitantplimsoles5.com",[26,97]],["scatch176duplicities.com",[26,97]],["antecoxalbobbing1010.com",[26,97]],["boonlessbestselling244.com",[26,97]],["cyamidpulverulence530.com",[26,97]],["guidon40hyporadius9.com",[26,97]],["449unceremoniousnasoseptal.com",[26,97]],["19turanosephantasia.com",[26,97]],["30sensualizeexpression.com",[26,97]],["321naturelikefurfuroid.com",[26,97]],["745mingiestblissfully.com",[26,97]],["availedsmallest.com",[26,97]],["greaseball6eventual20.com",[26,97]],["toxitabellaeatrebates306.com",[26,97]],["20demidistance9elongations.com",[26,97]],["audaciousdefaulthouse.com",[26,97]],["fittingcentermondaysunday.com",[26,97]],["fraudclatterflyingcar.com",[26,97]],["launchreliantcleaverriver.com",[26,97]],["matriculant401merited.com",[26,97]],["realfinanceblogcenter.com",[26,97]],["reputationsheriffkennethsand.com",[26,97]],["telyn610zoanthropy.com",[26,97]],["tubelessceliolymph.com",[26,97]],["tummulerviolableness.com",[26,97]],["un-block-voe.net",[26,97]],["v-o-e-unblock.com",[26,97]],["voe-un-block.com",[26,97]],["voeun-block.net",[26,97]],["voeunbl0ck.com",[26,97]],["voeunblck.com",[26,97]],["voeunblk.com",[26,97]],["voeunblock.com",[26,97]],["voeunblock1.com",[26,97]],["voeunblock2.com",[26,97]],["voeunblock3.com",[26,97]],["audiotools.pro",26],["magesy.blog",26],["magesypro.pro",26],["audioztools.com",26],["www.ntv.co.jp",26],["faptiti.com",26],["wormate.io",26],["selfstudys.com",26],["adslink.pw",26],["jpopsingles.eu",26],["vinstartheme.com",[26,119]],["leakedzone.com",[26,122]],["s0urce.io",27],["filefox.cc",28],["uol.com.br",29],["gazetadopovo.com.br",29],["gazetaonline.com.br",29],["indiatimes.com",29],["odiario.com",29],["otempo.com.br",29],["estadao.com.br",29],["bacaan.id",29],["ofuxico.com.br",29],["pentruea.com",29],["ciberduvidas.iscte-iul.pt",29],["globo.com",29],["citas.in",29],["blitzrechner.de",29],["emailfake.com",29],["lyrical-nonsense.com",29],["mediafax.ro",29],["economica.net",29],["polsatnews.pl",29],["novagente.pt",29],["arlinadzgn.com",29],["time.geekbang.org",[29,91]],["nowcoder.com",29],["libertatea.ro",29],["erinsakura.com",29],["yuque.com",29],["deepl.com",29],["digi24.ro",29],["onna.kr",29],["ziare.com",29],["agrointel.ro",29],["skyozora.com",29],["veneto.info",29],["peliculas24.me",30],["roztoczanskipn.pl",30],["economictimes.indiatimes.com",[30,34]],["dzwignice.info",30],["script-stack.com",[30,68]],["mio.to",30],["husseinezzat.com",[30,37]],["taxo-acc.pl",30],["portalwrc.pl",30],["lublin.eu",30],["onlystream.tv",30],["dddance.party",30],["kapiert.de",30],["hitcena.pl",30],["tv-asahi.co.jp",30],["digitalfernsehen.de",30],["suzylu.co.uk",30],["music.apple.com",30],["skidrowcodex.net",30],["vsco.co",30],["nationalgeographic.com",30],["festival-cannes.com",30],["strcloud.in",30],["ufret.jp",30],["thenekodark.com",30],["artesacro.org",30],["poli-vsp.ru",30],["polyvsp.ru",30],["ananweb.jp",30],["daimangajiten.com",30],["digital.lasegunda.com",30],["hibiki-radio.jp",30],["garyfeinbergphotography.com",30],["clubulbebelusilor.ro",30],["gplinks.co",30],["ifdreamscametrue.com",30],["marksandspencer.com",30],["stowarzyszenie-impuls.eu",30],["viveretenerife.com",30],["oferty.dsautomobiles.pl",30],["wzamrani.com",30],["citroen.pl",30],["peugeot.pl",30],["wirtualnyspac3r.pl",30],["sporizle1.pw",30],["antena3.com",30],["lasexta.com",30],["pashplus.jp",30],["upvideo.to",30],["kpopsea.com",30],["cnki.net",30],["wpchen.net",30],["hongxiu.com",30],["readnovel.com",30],["uihtm.com",30],["uslsoftware.com",30],["rule34hentai.net",30],["cloudemb.com",30],["news24.jp",30],["gaminplay.com",30],["njjzxl.net",30],["voe.sx",[30,96]],["voe-unblock.com",[30,96]],["scrolller.com",30],["cocomanga.com",30],["nusantararom.org",[30,102]],["virpe.cc",30],["pobre.tv",[30,102]],["ukrainashop.com",30],["celtadigital.com",30],["matzoo.pl",30],["asia2tv.cn",30],["labs.j-novel.club",30],["turbo1.co",30],["futbollatam.com",30],["read.amazon.com",30],["box-manga.com",30],["the-masters-voice.com",30],["hemas.pl",30],["accgroup.vn",30],["btvnovinite.bg",30],["allcryptoz.net",30],["crewbase.net",30],["crewus.net",30],["shinbhu.net",30],["shinchu.net",30],["thumb8.net",30],["thumb9.net",30],["topcryptoz.net",30],["uniqueten.net",30],["ultraten.net",30],["cloudcomputingtopics.net",30],["bianity.net",30],["coinsparty.com",30],["postype.com",30],["lofter.com",[30,110]],["hentaihaven.xxx",30],["espn.com",30],["4media.com",30],["przegladpiaseczynski.pl",30],["freewaysintl.com",30],["cool-etv.net",30],["j91.asia",30],["knshow.com",31],["jusbrasil.com.br",32],["promobit.com.br",34],["techjunkie.com",34],["zerohedge.com",34],["1mg.com",34],["khou.com",34],["10tv.com",34],["artsy.net",35],["boards.net",35],["freeforums.net",35],["proboards.com",35],["tastycookery.com",36],["ieltsliz.com",37],["jootc.com",37],["hikarinoakari.com",37],["operatorsekolahdbn.com",37],["wawlist.com",37],["animeshouse.net",38],["free-mp3-download.net",38],["tepat.id",38],["techsupportall.com",39],["lugarcerto.com.br",40],["satcesc.com",41],["animatedshows.to",41],["statelibrary.us",42],["bigulnews.tv",44],["news.chosun.com",45],["androidweblog.com",46],["cronista.com",47],["fcportables.com",48],["venea.net",49],["uta-net.com",50],["downloadtutorials.net",[50,68]],["blog.naver.com",50],["myschool-eng.com",53],["orangespotlight.com",54],["th-world.com",[54,73]],["itvn.pl",55],["itvnextra.pl",55],["kuchniaplus.pl",55],["miniminiplus.pl",55],["player.pl",55],["ttv.pl",55],["tvn.pl",55],["tvn24.pl",55],["tvn24bis.pl",55],["tvn7.pl",55],["tvnfabula.pl",55],["tvnstyle.pl",55],["tvnturbo.pl",55],["x-link.pl",55],["x-news.pl",55],["kickante.com.br",12],["thestar.com.my",12],["corriereadriatico.it",12],["scribd.com",56],["thehouseofportable.com",57],["ntvspor.net",57],["book.zhulang.com",57],["tadu.com",57],["selfstudyhistory.com",58],["lokercirebon.com",59],["avdelphi.com",60],["alphapolis.co.jp",61],["juejin.cn",61],["sweetslyrics.com",61],["thegatewaypundit.com",62],["thegearhunt.com",63],["jfdb.jp",64],["loginhit.com.ng",64],["charbelnemnom.com",64],["bphimmoi.net",64],["goodhub.xyz",64],["getwsodo.com",65],["edailybuzz.com",67],["zhihu.com",67],["qidian.com",67],["invado.pl",67],["webnovel.com",67],["bajecnavareska.sk",68],["lunas.pro",68],["onlinefreecourse.net",68],["pisr.org",68],["uplod.net",68],["thewpclub.net",68],["thememazing.com",68],["themebanks.com",68],["mesquitaonline.com",68],["skandynawiainfo.pl",68],["onlinecoursebay.com",68],["magnet-novels.com",69],["dreamsfriend.com",70],["trakteer.id",71],["699pic.com",71],["kutub3lpdf.com",72],["sklep-agroland.pl",74],["polagriparts.pl",75],["nordkorea-info.de",76],["geotips.net",77],["hardcoregames.ca",78],["lataifas.ro",79],["toppremiumpro.com",80],["wattpad.com",81],["starbene.it",82],["fauxid.com",83],["androidtvbox.eu",84],["nicematin.com",85],["bilibili.com",86],["yamibo.com",87],["fimfiction.net",88],["moegirl.org.cn",89],["bbs.mihoyo.com",90],["jianshu.com",90],["leetcode-cn.com",90],["peekme.cc",92],["ihbarweb.org.tr",93],["baixedetudo.net.br",94],["gardenia.net",95],["wpking.in",98],["hollywoodmask.com",99],["mbalib.com",99],["wenku.baidu.com",100],["mooc.chaoxing.com",101],["www-daftarharga.blogspot.com",102],["realpython.com",103],["linkmate.xyz",104],["cristelageorgescu.ro",105],["novelpia.com",106],["privivkainfo.ru",107],["frameboxxindore.com",107],["descargatepelis.com",108],["vercalendario.info",109],["poipiku.com",111],["postcourier.com.pg",112],["gmx.co.uk",114],["gmx.com",114],["likey.me",115],["wallpaperaccess.com",116],["shortform.com",117],["joysound.com",118],["colors.sonicthehedgehog.com",120],["senpa.io",121]]);

const entitiesMap = new Map([["wstream",26],["voe-unblock",[26,97]],["pobre",[26,113]],["mangaku",30],["dood",30],["streamtape",30],["asiatv",30],["descarga-animex",33],["tabonitobrasil",43],["anisubindo",43],["bmovies",66]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function addEventListenerDefuser(
    type = '',
    pattern = ''
) {
    const extraArgs = getExtraArgs(Array.from(arguments), 2);
    const safe = safeSelf();
    const reType = patternToRegex(type);
    const rePattern = patternToRegex(pattern);
    const log = shouldLog(extraArgs);
    const debug = shouldDebug(extraArgs);
    const trapEddEventListeners = ( ) => {
        const eventListenerHandler = {
            apply: function(target, thisArg, args) {
                let type, handler;
                try {
                    type = String(args[0]);
                    handler = String(args[1]);
                } catch(ex) {
                }
                const matchesType = safe.RegExp_test.call(reType, type);
                const matchesHandler = safe.RegExp_test.call(rePattern, handler);
                const matchesEither = matchesType || matchesHandler;
                const matchesBoth = matchesType && matchesHandler;
                if ( log === 1 && matchesBoth || log === 2 && matchesEither || log === 3 ) {
                    safe.uboLog(`addEventListener('${type}', ${handler})`);
                }
                if ( debug === 1 && matchesBoth || debug === 2 && matchesEither ) {
                    debugger; // jshint ignore:line
                }
                if ( matchesBoth ) { return; }
                return Reflect.apply(target, thisArg, args);
            },
            get(target, prop, receiver) {
                if ( prop === 'toString' ) {
                    return target.toString.bind(target);
                }
                return Reflect.get(target, prop, receiver);
            },
        };
        self.EventTarget.prototype.addEventListener = new Proxy(
            self.EventTarget.prototype.addEventListener,
            eventListenerHandler
        );
    };
    runAt(( ) => {
        trapEddEventListeners();
    }, extraArgs.runAt);
}

function getExtraArgs(args, offset = 0) {
    return Object.fromEntries(getExtraArgsEntries(args, offset));
}

function patternToRegex(pattern, flags = undefined) {
    if ( pattern === '' ) { return /^/; }
    const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
    if ( match !== null ) {
        return new RegExp(match[1], match[2] || flags);
    }
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
}

function runAt(fn, when) {
    const intFromReadyState = state => {
        const targets = {
            'loading': 1,
            'interactive': 2, 'end': 2, '2': 2,
            'complete': 3, 'idle': 3, '3': 3,
        };
        const tokens = Array.isArray(state) ? state : [ state ];
        for ( const token of tokens ) {
            const prop = `${token}`;
            if ( targets.hasOwnProperty(prop) === false ) { continue; }
            return targets[prop];
        }
        return 0;
    };
    const runAt = intFromReadyState(when);
    if ( intFromReadyState(document.readyState) >= runAt ) {
        fn(); return;
    }
    const onStateChange = ( ) => {
        if ( intFromReadyState(document.readyState) < runAt ) { return; }
        fn();
        safe.removeEventListener.apply(document, args);
    };
    const safe = safeSelf();
    const args = [ 'readystatechange', onStateChange, { capture: true } ];
    safe.addEventListener.apply(document, args);
}

function safeSelf() {
    if ( scriptletGlobals.has('safeSelf') ) {
        return scriptletGlobals.get('safeSelf');
    }
    const safe = {
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'log': console.log.bind(console),
        'uboLog': function(...args) {
            if ( args.length === 0 ) { return; }
            if ( `${args[0]}` === '' ) { return; }
            this.log('[uBO]', ...args);
        },
    };
    scriptletGlobals.set('safeSelf', safe);
    return safe;
}

function shouldDebug(details) {
    if ( details instanceof Object === false ) { return false; }
    return scriptletGlobals.has('canDebug') && details.debug;
}

function shouldLog(details) {
    if ( details instanceof Object === false ) { return false; }
    return scriptletGlobals.has('canDebug') && details.log;
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
    try { addEventListenerDefuser(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
