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

(function uBOL_setConstant() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"Object.prototype.stickyEnabled\",\"false\"]","[\"document.hasStorageAccess\",\"undefined\"]","[\"dtkPlayer.infos.visible_plus\",\"0\"]","[\"$.cookie\",\"trueFunc\"]","[\"Object.prototype.enable_floating\",\"false\"]","[\"Nickles.Consent.show\",\"noopFunc\"]","[\"Object.prototype.adPlayerId\",\"\"]","[\"Object.prototype.parseXML\",\"noopFunc\"]","[\"Object.prototype.blackscreenDuration\",\"1\"]","[\"Object.prototype.startShow\",\"noopFunc\"]","[\"Makeup.subscribePopup\",\"undefined\"]","[\"floatingPlayer.isFloatingEnabled\",\"false\"]","[\"Object.prototype.isFloatingEnabled\",\"false\"]","[\"paywall\",\"noopFunc\"]","[\"AdGlare\",\"{}\"]","[\"aax_getad_mpb\",\"false\"]","[\"timer\",\"0\"]","[\"document.hasFocus\",\"trueFunc\"]","[\"Object.prototype.embedPlayer.autoplay\",\"false\"]","[\"Object.prototype.minPlayingVisibleHeight\",\"\"]","[\"counter\",\"-1\"]","[\"count\",\"0\"]","[\"segundos\",\"0\"]","[\"waitTime\",\"0\"]","[\"Notification\",\"undefined\"]","[\"timeSec\",\"0\"]","[\"valid\",\"1\"]","[\"isGGSurvey\",\"true\"]","[\"enable_dl_after_countdown\",\"true\"]","[\"Object.prototype.IS_CHECK_REGISTRATION\",\"false\"]","[\"wt\",\"-1\"]","[\"app.window.isVisible\",\"trueFunc\"]","[\"counter\",\"0\"]","[\"window_focus\",\"true\"]","[\"sec\",\"0\"]","[\"Object.prototype.autoPlay\",\"noopFunc\"]","[\"gsecs\",\"0\"]","[\"seconde\",\"-1\"]","[\"timeleft\",\"0\"]","[\"waitSeconds\",\"0\"]","[\"document.hidden\",\"false\"]","[\"countdown\",\"0\"]","[\"blurred\",\"false\"]","[\"scrollTo\",\"noopFunc\"]","[\"tempo2\",\"0\"]","[\"snow\",\"undefined\"]","[\"setblur\",\"noopFunc\"]","[\"youtube\",\"1\"]","[\"time\",\"0\"]","[\"fiveSecs\",\"0\"]","[\"ONTVminiatureBlocked\",\"trueFunc\"]","[\"gazeta_pl.Player.FloatingPlayer.floatPlayer\",\"noopFunc\"]","[\"width\",\"100\"]","[\"waiting_time\",\"0\"]","[\"Time_Start\",\"0\"]","[\"document.oncontextmenu\",\"null\"]","[\"document.onselectstart\",\"null\"]","[\"document.ondragstart\",\"null\"]","[\"disableEnterKey\",\"noopFunc\"]","[\"disable_copy\",\"noopFunc\"]","[\"disable_copy_ie\",\"noopFunc\"]","[\"addLink\",\"noopFunc\"]","[\"rightClickOpenYn\",\"false\"]","[\"autoSourcingYn\",\"false\"]","[\"vidcheck\",\"1\"]","[\"NewsSource.addSource\",\"noopFunc\"]","[\"linkback.l\",\"true\"]","[\"var7\",\"0\"]","[\"window.B.Article.preventSelection\",\"noopFunc\"]","[\"mug.viewer.protectPost\",\"noopFunc\"]","[\"disableclick\",\"noopFunc\"]","[\"document.onkeypress\",\"null\"]","[\"document.onkeydown\",\"null\"]","[\"document.onmousedown\",\"null\"]","[\"mouseClickRight\",\"noopFunc\"]","[\"document.oncopy\",\"undefined\"]","[\"Object.prototype.getFooterText\",\"undefined\"]","[\"wrbm_gb.copyAlert\",\"undefined\"]","[\"disableSelection\",\"noopFunc\"]","[\"nocontext\",\"noopFunc\"]","[\"onload\",\"null\"]","[\"document.oncontextmenu\",\"{}\"]","[\"MdpAppender\",\"undefined\"]","[\"window.disableselect\",\"noopFunc\"]","[\"document.onpaste\",\"undefined\"]","[\"document.oncontextmenu\",\"undefined\"]","[\"document.onselectstart\",\"undefined\"]","[\"oncontextmenu\",\"undefined\"]"];

const hostnamesMap = new Map([["zeberka.pl",0],["kozaczek.pl",0],["papilot.pl",0],["tezfiles.com",1],["fboom.me",1],["ultimedia.com",2],["hpplus.jp",3],["reuters.com",4],["nickles.de",5],["sports.iqiyi.com",6],["m.iqiyi.com",6],["iqiyi.com",[7,8]],["igeeksblog.com",9],["makeup.ru",10],["auto-swiat.pl",11],["przegladsportowy.onet.pl",11],["komputerswiat.pl",11],["businessinsider.com.pl",12],["fakt.pl",12],["plejada.pl",12],["medonet.pl",12],["onet.pl",12],["nextmgz.com",13],["nextmag.com.tw",13],["appledaily.com",13],["findamasters.com",14],["phoronix.com",15],["m4cut.com",16],["pickhopes.com",16],["manga2day.com",16],["sport4you.net",16],["shardnat.tech",16],["btcbitco.in",17],["btcsatoshi.net",17],["cempakajaya.com",17],["crypto4yu.com",17],["readbitcoin.org",17],["wiour.com",17],["mdn.lol",17],["dynamo.kiev.ua",18],["vp.rambler.ru",[19,35]],["tech24us.com",20],["udemycourses.me",20],["psychpoint.com",20],["goodssh.com",20],["adfoc.us",21],["ffworld.xyz",21],["x86.co.kr",21],["kolaykisalt.com",21],["surfsees.com",21],["kisalt.xyz",21],["criarjogosandroid.com",22],["mdn.rest",23],["makemoneywithurl.com",25],["shortit.pw",26],["ac-illust.com",[27,28]],["photo-ac.com",[27,28]],["player.vgtrk.com",29],["ebookmela.co.in",30],["destyy.com",31],["gestyy.com",31],["linksht.com",[32,33]],["icutlink.com",34],["fcportables.com",36],["mylink1.biz",37],["mylinks.xyz",37],["drosbraift.com",38],["anonymous-links.com",39],["sundryfiles.com",40],["cgtips.org",41],["infotamizhan.xyz",42],["novelsapps.com",42],["cybertechng.com",42],["animerigel.com",42],["gainl.ink",42],["megaurl.in",42],["megafly.in",42],["linx.cc",42],["bitlk.com",42],["reqlinks.net",42],["rgl.vn",42],["youlink.ga",42],["wu8.in",42],["qlinks.eu",42],["upfilesurls.com",42],["mgnetu.com",42],["shorturl.unityassets4free.com",42],["financerites.in",42],["paid4file.com",42],["atglinks.com",42],["tii.la",42],["techsguy.com",42],["exeo.app",42],["smallinfo.in",42],["cutty.app",42],["adrinolinks.in",42],["shareus.site",42],["cut-y.co",42],["disheye.com",42],["enit.in",42],["veganab.co",42],["mdisklink.link",42],["kinemaster.cc",42],["short.freeltc.top",42],["faucetcrypto.net",42],["download.windowslite.net",42],["dlsite.win",42],["oko.sh",42],["ckk.ai",42],["ovlinks.com",42],["ier.ai",42],["links.medipost.org",42],["forex-trnd.com",42],["paylinnk.com",42],["adpps.com",42],["go.linkbnao.com",42],["baicho.xyz",42],["technemo.xyz",42],["adshorti.co",42],["loptelink.com",42],["crt.im",42],["mshort.top",42],["link-yz.com",42],["cut-y.net",42],["short2fly.xyz",42],["adslink.pw",42],["shortx.net",42],["du-link.in",42],["mozlink.net",42],["haonguyen.top",42],["pandaznetwork.com",42],["bestcash2020.com",42],["dash-free.com",42],["cekip.xyz",42],["cryptoon.xyz",42],["btcwalk.com",42],["vhorizads.com",42],["theconomy.me",42],["wealthystyle.online",42],["zlink.tk",42],["easysky.in",42],["techgeek.digital",42],["csd.xmod.in",42],["link.tokenoto.com",42],["skincarie.com",42],["shortie.link",42],["defaultfreeshort.in",42],["adsafelink.com",42],["linkshortify.site",42],["kolotoken.site",42],["powerclicks.xyz",42],["akashort.com",42],["rocklink.in",42],["insurance-space.xyz",42],["rajsayt.xyz",42],["insurglobal.xyz",42],["linkszia.co",42],["usanewstoday.club",42],["earnforclick.online",42],["tlin.me",42],["adlinkfly.wartakilat.com",42],["shorthero.site",42],["cutp.in",42],["clk.asia",42],["cookdov.com",42],["aylink.info",42],["adinsurance.xyz",42],["usdshort.com",42],["tecnologiapp.site",42],["onroid.com",42],["filmyzilla-in.xyz",42],["adslink.programasfulltaf16.com",42],["sohexo.org",42],["zirof.com",42],["katflys.com",42],["samaa-pro.com",42],["earnme.club",42],["myshrinker.com",42],["seulink.online",42],["encurta.eu",42],["adurly.cc",42],["shorte.anxcinema.com",42],["nini08.com",42],["linkjust.com",42],["download.freestudyweb.com",42],["ultraten.net",42],["vrlinks.xyz",42],["crazyblog.in",42],["shortlink.prz.pw",42],["swzz.xyz",42],["mixfaucet.com",42],["getlink.tienichmaytinh.net",42],["adly.fun",42],["try2link.com",42],["go.netfile.cc",42],["fameen.xyz",42],["gameen.xyz",42],["yameen.xyz",42],["abre.click",42],["adcripto.com",42],["linkbr.xyz",42],["meulynk.com",42],["myad.biz",42],["baominh.tech",42],["bblink.com",42],["shortz.one",42],["newsalret.com",42],["clickscoin.com",42],["za.uy",42],["toptap.website",42],["gtlink.co",42],["upshrink.com",42],["gir.ist",42],["upfiles.io",42],["link.turkdown.com",42],["beingtek.com",42],["automotur.club",42],["insuranceblog.xyz",42],["coinadfly.com",42],["linkres.in",42],["link1s.com",42],["fire-link.net",42],["enagato.com",42],["dl.tech-story.net",42],["cpm10.org",42],["123link.biz",42],["rancah.com",42],["shrtvip.com",42],["linkerhub.tk",42],["kingurls.com",42],["download.sharenulled.net",42],["go.gets4link.com",42],["lucidcam.com",42],["clikern.com",42],["musicc.xyz",42],["pix4link.com",42],["zipurls.com",42],["theblissempire.com",42],["linkadshield.xyz",42],["xfiles.io",42],["upfiles.com",42],["zshort.cc",42],["filezipa.com",42],["arab-chat.club",42],["dz-linkk.com",42],["newshour.pw",42],["paidthe.site",42],["cslink.in",42],["jp88.xyz",42],["shortenmm.cf",42],["shrink.icu",42],["bevru.club",42],["bitlinks.pw",42],["hoastie.com",42],["arurio.club",42],["fclcc.com",42],["ptc.wtf",42],["tei.ai",42],["url4cut.xyz",42],["birdurls.com",42],["claimfreebits.com",42],["allcryptoz.net",42],["shrlink.top",42],["webshort.in",42],["coinsparty.mcrypto.club",42],["zshort.io",42],["eririo.club",42],["nerdy.vn",42],["jameeltips.us",42],["payskip.org",42],["freshi.site",42],["yxoshort.com",42],["pewgame.com",42],["sanos.xyz",42],["shrinkzzy.link",42],["srek.net",42],["shrinke.me",42],["foxseotools.com",42],["oncehelp.com",42],["earnwithshortlink.com",42],["enrt.eu",42],["tui.click",42],["adfloz.co",42],["shrx.in",42],["short.food-royal.com",42],["adpop.me",42],["galaxy-link.space",42],["link.ltc24.com",42],["kiiw.icu",42],["vshort.link",42],["adnit.xyz",42],["fwarycash.moviestar.fun",42],["linkebr.com",42],["bloggingguidance.com",42],["smoner.com",42],["charexempire.com",42],["cut-fly.com",42],["gplinks.co",42],["mynewshub.in",42],["adomainscan.com",42],["bitmos.co.in",42],["cuts-url.com",42],["gainbtc.click",42],["profitlink.info",42],["artipedia.id",42],["gonety.com",42],["viraloc.com",42],["beautyram.info",42],["cashearn.cc",42],["go2.surf",42],["cryptoads.space",42],["adcorto.me",42],["modapk.link",42],["holaurl.com",42],["adbl.live",42],["miklpro.com",42],["kutt.io",42],["sanoybonito.club",42],["afly.pro",42],["cutlink.link",42],["short88.com",42],["pngit.live",42],["exe.app",42],["adsrt.click",42],["adcorto.xyz",42],["shortbled.com",42],["cuturl.in",42],["womenhaircolors.review",42],["srts.me",42],["paidtomoney.com",42],["lite-link.xyz",42],["apkshrt.com",42],["linkshorts.me",42],["androidnougatapk.com",42],["pureshort.link",42],["recipestutorials.com",42],["droplink.co",42],["tawiia.com",42],["exy.ai",42],["lite-link.com",42],["bdnewsx.com",42],["eio.io",42],["short-cash2.xyz",42],["mealip.com",42],["earnfasts.com",42],["linksfire.co",42],["giscr.ac.th",42],["internewstv.com",42],["ivn3.com",42],["pslfive.com",42],["linksly.co",42],["illink.net",42],["coin.mg",42],["trinddz.com",42],["ilinks.in",42],["techupme.com",42],["bitfly.io",42],["earnguap.com",42],["news.techrfour.com",42],["shortzzy.in",42],["asiashort.link",42],["imagenesderopaparaperros.com",42],["c-ut.com",42],["toroox.com",42],["saungfirmware.id",42],["shrinkme.in",42],["fir3.net",42],["softairbay.com",42],["link1s.net",42],["cashurl.in",42],["doctor-groups.com",42],["bitcoinly.in",42],["clk.ink",42],["abdeo8.com",42],["apksvip.com",42],["gibit.xyz",42],["claimcrypto.cc",42],["btcdot.xyz",42],["pkr.pw",42],["shrinkbtc.cc",42],["todaynewspk.win",42],["manikusa.com",42],["try2link.net",42],["stfly.me",42],["dz4win.com",42],["real-sky.com",42],["bolssc.com",42],["short2.cash",42],["fx4vip.com",42],["cutdl.xyz",42],["shrinkurl.org",42],["mediumarticles.com",42],["asupload.com",42],["exee.io",42],["srt.leechpremium.link",42],["adsrt.live",42],["cheappath.com",42],["fcc.lc",42],["shorthitz.com",42],["savelink.site",42],["linkshorten.xyz",42],["tmearn.com",42],["samapro.me",42],["adsy.pw",42],["owllink.net",42],["mondainai.moe",42],["2ota.com",42],["popimed.com",42],["aii.sh",42],["sekilastekno.com",42],["miuiku.com",42],["articlix.com",42],["intothelink.com",42],["pingit.link",42],["slink.bid",42],["7r6.com",42],["loptelink.vip",42],["iir.ai",42],["biroads.com",42],["win10.vn",[42,49]],["mitly.us",42],["adsrt.net",42],["afly.us",42],["tii.ai",42],["linkviet.xyz",42],["coredp.com",42],["linkrex.net",42],["bit-url.com",42],["adsrt.org",42],["bestearnonline.com",42],["gamesrs.com",42],["shorten.sh",42],["ouofly.com",42],["clicksbee.com",42],["shorterall.com",42],["dutchycorp.space",42],["linkshrnk.com",42],["linkad.in",42],["fc.lc",42],["adslinkfly.online",42],["shrinkme.io",42],["imgxuh.cfd",43],["imgngc.sbs",43],["imgezx.sbs",43],["imgxza.store",43],["imgwqr.online",43],["tr3fit.xyz",44],["daz3d.ru",45],["translit.net",46],["translit.ru",46],["cheatsquad.gg",47],["file4go.com",48],["file4go.net",48],["bankier.pl",50],["claudia.pl",50],["dyskusje24.pl",50],["edziecko.pl",50],["haps.pl",50],["infozdrowie24.pl",50],["kobieta.pl",50],["moto.pl",50],["gazeta.pl",50],["tokfm.pl",[50,51]],["sport.pl",50],["plotek.pl",50],["cocoleech.com",52],["prem.link",53],["dl.pcgamestorrents.org",54],["get-url.com",54],["ktv.jp",55],["releasewitch.com",[55,58]],["news.ntv.co.jp",55],["novatoscans.top",55],["7days2die.info",[55,57]],["flying-lines.com",[55,56]],["fssp.gov.ru",[55,56]],["ilife97.com",[55,57]],["rdsong.com",[55,56]],["lubedk.com",[55,56,71,72]],["itempage3.auction.co.kr",55],["cdramalove.com",55],["10000recipe.com",55],["nike.com",[55,56]],["a2zapk.com",[55,57,58]],["fully-fundedscholarships.com",[55,57,58]],["shoneekapoor.com",55],["cda-hd.cc",[55,56,72]],["studysolve.online",[55,57,78]],["animeindia.in",[55,57,78]],["bufftoon.plaync.com",55],["studyguideindia.com",[55,73]],["codedosa.com",[55,57,58,59,60,78]],["newslibrary.naver.com",55],["insight.co.kr",[55,56,57]],["gamefinity.id",[55,57,80]],["cafe.naver.com",[55,56,57]],["half-musiq.blogspot.com",[56,73]],["novelpia.com",[56,57,70]],["tistory.com",[56,74,83]],["gradium.co.kr",[57,58,59,60,79]],["javsubtitle.co",58],["programasvirtualespc.net",58],["legionscans.com",58],["flinsetyadi.com",58],["theaircurrent.com",58],["now.rememberapp.co.kr",58],["semesters.in",[58,59,60,78,79]],["dora-guide.com",[59,60,79]],["lyricsondemand.com",61],["blog.naver.com",[62,63]],["dizilab9.com",64],["sedaily.com",65],["khan.co.kr",66],["hani.co.kr",66],["fmkorea.com",67],["brunch.co.kr",68],["post.naver.com",69],["fishki.net",75],["city-data.com",75],["patrika.com",[75,84]],["ogznet.com",75],["deepl.com",76],["foodnavigator.com",77],["electricalvoice.com",79],["nordkorea-info.de",81],["tunovelaligera.com",82],["runningnews.gr",83],["gaypornmasters.com",[85,86]],["gaypornwave.com",85],["sporx.com",85],["muharebetarihi.com",87]]);

const entitiesMap = new Map([["bildirim",24],["wplink",42],["adshort",42],["linkfly",42],["exey",42],["linkshorts",42],["bluemediafile",54],["bluemediafiles",54]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function setConstant(
    ...args
) {
    setConstantCore(false, ...args);
}

function setConstantCore(
    trusted = false,
    arg1 = '',
    arg2 = '',
    arg3 = ''
) {
    const details = typeof arg1 !== 'object'
        ? { prop: arg1, value: arg2 }
        : arg1;
    if ( arg3 !== '' ) {
        if ( /^\d$/.test(arg3) ) {
            details.options = [ arg3 ];
        } else {
            details.options = Array.from(arguments).slice(3);
        }
    }
    const { prop: chain = '', value: cValue = '' } = details;
    if ( typeof chain !== 'string' ) { return; }
    if ( chain === '' ) { return; }
    const options = details.options || [];
    const safe = safeSelf();
    function setConstant(chain, cValue) {
        const trappedProp = (( ) => {
            const pos = chain.lastIndexOf('.');
            if ( pos === -1 ) { return chain; }
            return chain.slice(pos+1);
        })();
        if ( trappedProp === '' ) { return; }
        const thisScript = document.currentScript;
        const cloakFunc = fn => {
            safe.Object_defineProperty(fn, 'name', { value: trappedProp });
            const proxy = new Proxy(fn, {
                defineProperty(target, prop) {
                    if ( prop !== 'toString' ) {
                        return Reflect.defineProperty(...arguments);
                    }
                    return true;
                },
                deleteProperty(target, prop) {
                    if ( prop !== 'toString' ) {
                        return Reflect.deleteProperty(...arguments);
                    }
                    return true;
                },
                get(target, prop) {
                    if ( prop === 'toString' ) {
                        return function() {
                            return `function ${trappedProp}() { [native code] }`;
                        }.bind(null);
                    }
                    return Reflect.get(...arguments);
                },
            });
            return proxy;
        };
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
            cValue = cloakFunc(function(){});
        } else if ( cValue === 'trueFunc' ) {
            cValue = cloakFunc(function(){ return true; });
        } else if ( cValue === 'falseFunc' ) {
            cValue = cloakFunc(function(){ return false; });
        } else if ( /^-?\d+$/.test(cValue) ) {
            cValue = parseInt(cValue);
            if ( isNaN(cValue) ) { return; }
            if ( Math.abs(cValue) > 0x7FFF ) { return; }
        } else if ( trusted ) {
            if ( cValue.startsWith('{') && cValue.endsWith('}') ) {
                try { cValue = JSON.parse(cValue).value; } catch(ex) { return; }
            }
        } else {
            return;
        }
        if ( options.includes('asFunction') ) {
            cValue = ( ) => cValue;
        } else if ( options.includes('asCallback') ) {
            cValue = ( ) => (( ) => cValue);
        } else if ( options.includes('asResolved') ) {
            cValue = Promise.resolve(cValue);
        } else if ( options.includes('asRejected') ) {
            cValue = Promise.reject(cValue);
        }
        let aborted = false;
        const mustAbort = function(v) {
            if ( trusted ) { return false; }
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
            if ( handler.init(configurable ? owner[prop] : cValue) === false ) { return; }
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
                safe.Object_defineProperty(owner, prop, {
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
                        return document.currentScript === thisScript
                            ? this.v
                            : cValue;
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
    }
    runAt(( ) => {
        setConstant(chain, cValue);
    }, options);
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
    try { setConstant(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
