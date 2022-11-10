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

/// name no-setinterval-if
/// alias no-setInterval-if
/// alias nosiif

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_noSetIntervalIf() {

/******************************************************************************/

// default

const argsList = [{"a":["fireEvent","500"]},{"a":["abvsLowerThirdVisible"]},{"a":["visibility","1000"]},{"a":["_0x"]},{"a":["break"]},{"a":["document['write']"]},{"a":["document.readyState"]},{"a":["undefined"]},{"a":["readyState"]},{"a":["()","500"]},{"a":["adblockerModal","1000"]},{"a":["user=null","1000"]},{"a":["_checkBait"]},{"a":["()","5000"]},{"a":[".append","1000"]},{"a":["()","1000"]},{"a":["onAdVideoStart"]},{"a":["/_0x|debug/"]},{"a":["complete","50"]},{"a":["0x"]},{"a":["adblocker"]},{"a":["iframe"]},{"a":["href"]},{"a":["/^/"]},{"a":["adsbygoogle"]},{"a":["length"]},{"a":["innerHTML"]},{"a":["height"]},{"a":["adblock"]},{"a":["debugger"]},{"a":["DevToolsOpen"]},{"a":["clearInterval(i)","1000"]},{"a":["length","1000"]},{"a":["document.getElementById","10000"]},{"a":["daadb"]},{"a":["disabled=!0"]},{"a":["Adblocker"]},{"a":["afStorage"]},{"a":["checkads"]},{"a":["adb"]},{"a":["debug"]},{"a":["ads"]},{"a":["Click"]},{"a":["daadb_get_data"]},{"a":[".hide"]},{"a":["goog"]},{"a":["blogherads"]},{"a":["setInterval"]},{"a":["console"]}];

const hostnamesMap = new Map([["tvtoday.de",0],["vaughn.live",1],["myreadingmanga.info",2],["vqtube.com",2],["gnomio.com",2],["tibiabr.com",2],["o2tvseries.com",2],["yannik.biz",2],["macbed.com",2],["hackyouriphone.org",2],["barurotero.net",2],["htnovo.net",2],["cryptofun.space",2],["leonardolatella.it",2],["pluslive.live",2],["shareappscrack.com",2],["sopasti.com",2],["zone-telechargement2.net",2],["torproject.epizy.com",2],["education-load.com",2],["aztravels.net",2],["downfile.site",2],["downphanmem.com",2],["expertvn.com",2],["scratch247.info",2],["ovagames.com",2],["programasvirtualespc.net",2],["kimochi.info",2],["sombex.com",2],["shrinkurl.org",2],["drrtyr.mx",2],["cheatsquad.gg",2],["forex-trnd.com",2],["vidlii.com",2],["fontyukle.net",2],["wplink.online",2],["shorterall.com",2],["promo-visits.site",2],["zuketcreation.net",2],["apps2app.com",2],["watchtvseries.video",2],["linkshrnk.com",2],["mangahost4.com",2],["flutenotes.ph",2],["verteleseriesonline.com",2],["akbardwi.my.id",2],["bg-gledai.co",2],["hdmp4mania1.net",2],["arabnaar.com",2],["sukidesuost.info",2],["ricettafitness.com",2],["kantotero.net",2],["freenote.biz",2],["erai-ddl.info",2],["erai-ddl2.info",2],["erai-ddl3.info",2],["womenreality.com",2],["paidsoftwarereviewz.blogspot.com",2],["dubsstreamz.com",2],["lapagna.com",2],["portable4pc.com",2],["localizaagencia.com",2],["downloaderzone.com",2],["themes-dl.com",2],["freegetdownloader.com",2],["oncam.me",2],["anomize.xyz",2],["casos-aislados.com",2],["freeomovie.to",2],["myviptuto.com",2],["novelasligera.com",2],["hightqualityshop.com",2],["mondainai.moe",2],["rahim-soft.com",2],["faucethub.top",2],["dayoftheweek.org",2],["woodcraftsman.ru",2],["utorrentgamesps2.blogspot.com",2],["9ketsuki.info",2],["zagl.info",2],["vstplugs.com",2],["freedeepweb.blogspot.com",2],["text2voice.org",2],["profitlink.info",2],["lookimg.com",2],["graphicdesignresources.net",2],["emoji.gg",2],["itdplus.ru",2],["veryfiles.com",2],["aemenstore.com",2],["aloass.com",2],["alobyt.com",2],["alocd.com",2],["alogum.com",2],["alohdd.com",2],["anhdep24.com",2],["byboe.com",2],["cazzette.com",2],["dataf.pro",2],["hookeaudio.com",2],["jncojeans.com",2],["kiemlua.com",2],["kingsleynyc.com",2],["lucidcam.com",2],["marharo.com",2],["medcpu.com",2],["nousdecor.com",2],["pennbookcenter.com",2],["restorbio.com",2],["staaker.com",2],["thegoneapp.com",2],["uebnews.online",2],["necksdesign.com",2],["crypto-lovers.club",2],["bioskopkaca21.com",2],["larvelfaucet.com",2],["quicasting.it",2],["toppremiumpro.com",2],["ihaxk.com",2],["nullslide.com",2],["iptunnels.com",2],["appsfullversion.com",2],["davidgalaxia.com",2],["anonymous-links.com",2],["planet-streaming1.com",2],["starvid.xyz",2],["unionmanga.xyz",2],["vviruslove.com",2],["koreanaddict.net",2],["unity3diy.blogspot.com",2],["hakie.net",2],["checkfiletype.com",2],["santoinferninho.com",2],["gurl.pw",2],["webzews.com",2],["sociadrive.com",2],["blowxtube.com",2],["adltc.cc",2],["angeloyeo.github.io",2],["csgo-ranks.com",2],["royalkom.com",2],["super-ethanol.com",2],["surf-trx.com",2],["samapkstore.com",2],["satoshiquiz.com",2],["shortenbuddy.com",2],["adeth.cc",2],["submitclimb.com",2],["addoge.cc",2],["softairbay.com",2],["swift4claim.com",2],["best-shopme.com",2],["tw-hkt.blogspot.com",2],["hugo3c.tw",2],["ohmygirl.ml",2],["androidtunado.com.br",2],["midiextreme.com",2],["tellygossips.net",2],["ripperxd.blogspot.com",2],["newsiqra.com",2],["dota2freaks.com",2],["how2pc.com",2],["weviral.org",2],["alltechnerd.com",2],["shoppinglys.blogspot.com",2],["gpucheck.com",2],["fxlap.com",2],["komiktap.in",2],["janusnotes.com",2],["adobezii.com",2],["8tm.net",2],["afasiaarchzine.com",2],["ashort1a.xyz",2],["topchort.tk",2],["lolowall.com",2],["getpczone.com",2],["secretsdeepweb.blogspot.com",2],["kiwiexploits.com",2],["tecnomusic-evolution.com",2],["freemiumaccounts.net",2],["jaysndees.com",2],["paidtomoney.com",2],["doctor-groups.com",2],["mailocal2.xyz",2],["tqanime.com",2],["devcourseweb.com",2],["anime-saikou.com",2],["donghuanosekai.com",2],["skmedix.pl",2],["1shorten.com",2],["publicananker.com",2],["rodjulian.com",2],["jagoanssh.com",2],["clickscoin.com",2],["dogeclick.net",2],["pcso-lottoresults.com",2],["clickhouse.xyz",2],["coinurl.net",2],["ltc24.com",2],["aloegg.com",2],["todoseriales1.blogspot.com",2],["cryptslice.com",2],["taisv.com",2],["crypto-faucet.xyz",2],["omgexploits.com",2],["faucet.dog",2],["faucet.plus",2],["nusantaraproject.my.id",2],["crazyblog.in",2],["cblinks.xyz",2],["galaxycrypto.net",2],["short-zero.com",2],["cubehosting.me",2],["gifans.com",2],["shortlink.prz.pw",2],["monucet.com",2],["robloxhacks.net",2],["xanimehub.com",2],["netstream.fun",2],["short.mcmcryptos.xyz",2],["goldenmanga.top",2],["bshopme.site",2],["melodelaa.link",2],["watchdoge.xyz",2],["sakastau.com",2],["clk.asia",2],["imperialstudy.com",2],["skincarie.com",2],["zebrafaucet.top",2],["shiba-faucoin.com",2],["jpoplibs.us",2],["reit-tirement.com",2],["claimtrx.com",2],["riadlink.top",2],["autocoin.in",2],["ccsl.xyz",2],["techmart4u.in",2],["urlfiles.com",2],["fztvseries.mobi",2],["pinoyfaucet.com",2],["playhydrax.com",3],["imgkaka.xyz",3],["imglina.xyz",3],["imgowk.buzz",3],["imgokr.buzz",3],["imgoiu.buzz",3],["imgiut.buzz",3],["imgizw.buzz",3],["imgux.buzz",3],["imgewe.buzz",3],["imguebr.buzz",3],["imgqew.buzz",3],["imgbew.buzz",3],["imguo.buzz",3],["imgxxxx.buzz",3],["imgeza.buzz",3],["imgzzzz.buzz",3],["imgkuz.buzz",3],["imgxhfr.buzz",3],["imgqwt.buzz",3],["imgtwq.buzz",3],["imgbjryy.buzz",3],["imgjetr.buzz",3],["imgxelz.buzz",3],["imgytreq.buzz",3],["hfneiott.buzz",3],["mrlzqoe.buzz",3],["utinwpqqui.buzz",3],["pyotinle.buzz",3],["velnibug.buzz",3],["xsanime.com",3],["javfull.net",3],["f2movies.to",3],["jaanmusic.in",3],["rtxkeeda.com",3],["optiye.buzz",3],["imgxza.buzz",3],["imgbeaw.buzz",3],["imgnfg.buzz",3],["imguqkt.buzz",3],["imgxhgh.buzz",3],["imgwelz.buzz",3],["pixnbvj.buzz",3],["imgxkhm.buzz",3],["imagepuitr.buzz",3],["imagent.buzz",3],["imagenx.buzz",3],["imgjtuq.buzz",3],["pichtyyy.buzz",3],["imgxabb.buzz",3],["imgxann.buzz",3],["imgkixx.buzz",3],["im1.buzz",3],["mcloud.to",4],["vidstream.pro",4],["ninjastream.to",5],["voyeurhit.com",6],["vjav.com",6],["tubepornclassic.com",[6,18]],["shemalez.com",6],["upornia.com",7],["frprn.com",8],["fembed.com",9],["hulkshare.com",10],["faucetcrypto.com",11],["giveawayoftheday.com",12],["uploadbox.io",13],["megafile.io",13],["4shared.com",14],["semestr.ru",15],["crunchyroll.com",16],["extremereportbot.com",17],["mangalist.org",19],["javcl.com",19],["goalup.live",19],["gats.io",19],["upvideo.to",19],["oxl.one",19],["sbplay1.com",19],["sbvideo.net",19],["embedsb.com",19],["streamlare.com",19],["freereceivesms.com",19],["imgbbd.buzz",19],["imgizx.buzz",19],["imgkoc.buzz",19],["imgkorle.buzz",19],["imglkju.buzz",19],["imgqte.buzz",19],["imgwer.buzz",19],["imgxvd.buzz",19],["imgyng.buzz",19],["imgyvdw.buzz",19],["plhqtvhay.xyz",19],["himovies.to",19],["live.dragaoconnect.net",19],["techmuzz.com",20],["lecourrier-du-soir.com",21],["gplinks.co",22],["canale.live",22],["zhlednito.cz",23],["thgss.com",24],["moviemakeronline.com",24],["pstream.net",25],["premid.app",26],["vrcmods.com",27],["adblockplustape.com",28],["gamezop.com",29],["ngelmat.net",30],["laptrinhx.com",31],["freemc.host",32],["sunhope.it",33],["openculture.com",34],["downloads.descendant.me",35],["schoolcheats.net",36],["coinsearns.com",37],["luckydice.net",37],["coinsurl.com",37],["newscon.net",38],["radiowereld.nl",39],["artunnel57.com",39],["thedigitalfix.com",40],["erofound.com",41],["fastconverter.net",42],["gourmetscans.net",43],["oxy.st",44],["molotov.tv",45],["knowyourmeme.com",46],["businessinsider.com",47],["allcryptoz.net",48],["crewbase.net",48],["crewus.net",48],["shinbhu.net",48],["shinchu.net",48],["thumb8.net",48],["thumb9.net",48],["topcryptoz.net",48],["uniqueten.net",48],["ultraten.net",48]]);

/******************************************************************************/

const scriptlet = (
    needle = '',
    delay = ''
) => {
    const needleNot = needle.charAt(0) === '!';
    if ( needleNot ) { needle = needle.slice(1); }
    if ( delay === '' ) { delay = undefined; }
    let delayNot = false;
    if ( delay !== undefined ) {
        delayNot = delay.charAt(0) === '!';
        if ( delayNot ) { delay = delay.slice(1); }
        delay = parseInt(delay, 10);
    }
    if ( needle.startsWith('/') && needle.endsWith('/') ) {
        needle = needle.slice(1,-1);
    } else if ( needle !== '' ) {
        needle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const reNeedle = new RegExp(needle);
    const regexpTest = RegExp.prototype.test;
    self.setInterval = new Proxy(self.setInterval, {
        apply: function(target, thisArg, args) {
            const a = String(args[0]);
            const b = args[1];
            let defuse;
            if ( needle !== '' ) {
                defuse = regexpTest.call(reNeedle, a) !== needleNot;
            }
            if ( defuse !== false && delay !== undefined ) {
                defuse = (b === delay || isNaN(b) && isNaN(delay) ) !== delayNot;
            }
            if ( defuse ) {
                args[0] = function(){};
            }
            return target.apply(thisArg, args);
        }
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

