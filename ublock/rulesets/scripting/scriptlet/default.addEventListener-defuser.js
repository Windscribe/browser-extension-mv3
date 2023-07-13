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

(function uBOL_addEventListenerDefuser() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"load\",\"Object\"]","[\"mousedown\",\"clientX\"]","[\"load\",\"hard_block\"]","[\"/contextmenu|keydown/\"]","[\"\",\"adb\"]","[\"load\",\"adBlock\"]","[\"click\",\"ClickHandler\"]","[\"load\",\"IsAdblockRequest\"]","[\"/^(?:click|mousedown)$/\",\"_0x\"]","[\"error\"]","[\"load\",\"onload\"]","[\"\",\"pop\"]","[\"\",\"BACK\"]","[\"load\",\"getComputedStyle\"]","[\"load\",\"adsense\"]","[\"\",\"0x\"]","[\"load\",\"(!o)\"]","[\"load\",\"(!i)\"]","[\"DOMContentLoaded\",\"prestitialData\"]","[\"\",\"_0x\"]","[\"\",\"Adblock\"]","[\"load\",\"nextFunction\"]","[\"/^(?:click|mousedown)$/\",\"bypassEventsInProxies\"]","[\"\",\"open\"]","[\"click\",\"exopop\"]","[\"/^(?:load|click)$/\",\"popMagic\"]","[\"mousedown\",\"popundrInit\"]","[\"\",\"popMagic\"]","[\"getexoloader\"]","[\"load\",\"exoJsPop101\"]","[\"/^get/\",\"loader\"]","[\"\",\"/exo\"]","[\"\",\"_blank\"]","[\"\",\";}\"]","[\"load\",\"BetterPop\"]","[\"click\",\"popMagic\"]","[\"mousedown\",\"preventDefault\"]","[\"load\",\"advertising\"]","[\"click\",\"preventDefault\"]","[\"load\",\"2000\"]","[\"/^(click|mousedown|mousemove|touchstart|touchend|touchmove)/\",\"system.popunder\"]","[\"load\",\"adb\"]","[\"/^(?:click|mousedown|mousemove|touchstart|touchend|touchmove)$/\",\"system.popunder\"]","[\"\",\"'0x\"]","[\"/DOMContentLoaded|load/\",\"y.readyState\"]","[\"/error|canplay/\",\"(t)\"]","[\"load\",\"hblocked\"]","[\"error\",\"Adblocker\"]","[\"DOMContentLoaded\",\"shortener\"]","[\"DOMContentLoaded\",\"adlinkfly\"]","[\"mousedown\",\"trigger\"]","[\"DOMContentLoaded\",\"ads\"]","[\"\",\"Pop\"]","[\"/^(?:click|mousedown)$/\",\"popunder\"]","[\"DOMContentLoaded\",\"preventExit\"]","[\"mouseup\",\"_blank\"]","[\"\",\"adsense\"]","[\"load\"]","[\"click\",\"pop_under\"]","[\"load\",\"url\"]","[\"load\",\"adverts-top-container\"]","[\"\",\"Date\"]","[\"DOMContentLoaded\",\"&nbsp\"]","[\"click\",\"read_cookie\"]","[\"\",\"midRoll\"]","[\"click\",\"_0x\"]","[\"load\",\"isBlanketFound\"]","[\"load\",\"showModal\"]","[\"\",\"click\"]","[\"canplay\"]","[\"click\",\"trigger\"]","[\"mouseleave\",\"clientWidth\"]","[\"click\"]","[\"click\",\"open\"]","[\"load\",\"download-wrapper\"]","[\"load\",\"autoRecov\"]","[\"popstate\",\"noPop\"]","[\"/^(?:click|mousedown)$/\",\"ppu\"]","[\"click\",\"native code\"]","[\"message\",\"data.slice\"]","[\"/^(?:mousedown|mouseup)$/\",\"0x\"]","[\"click\",\"popundr\"]","[\"DOMContentLoaded\",\"compupaste\"]","[\"keydown\",\"keyCode\"]","[\"mousedown\",\"!!{});\"]","[\"keydown\"]","[\"DOMContentLoaded\",\"isMobile\"]","[\"/^/\",\"0x\"]","[\"load\",\"PrivateMode\"]","[\"scroll\",\"_0x\"]","[\"DOMContentLoaded\",\"checkVPN\"]","[\"/^(?:click|mousedown|mouseup)$/\",\"di()\"]","[\"\",\"\\\\\"]","[\"popstate\"]","[\"click\",\"my_inter_listen\"]","[\"\",\"window.open\"]","[\"load\",\"appendChild\"]","[\"\",\"bi()\"]","[\"\",\"checkTarget\"]","[\"/mousedown|mouseup/\",\"event=>\"]","[\"click\",\"popunder\"]","[\"timeupdate\"]","[\"scroll\",\"getElementById\"]","[\"load\",\"undefined\"]","[\"DOMContentLoaded\",\"scriptwz_url\"]","[\"load\",\"0x\"]","[\"DOMContentLoaded\",\"btoa\"]","[\"adblockActivated\"]","[\"load\",\"ads\"]","[\"click\",\"saveLastEvent\"]","[\"DOMContentLoaded\",\"offsetHeight\"]","[\"\",\"show\"]","[\"/.?/\",\"popMagic\"]","[\"\",\"ads\"]","[\"click\",\"interstitial\"]","[\"load\",\"antiblock\"]","[\"DOMContentLoaded\",\"adsBlocked\"]","[\"load\",\".appendChild\"]","[\"\",\"btoa\"]","[\"\",\"exopop\"]","[\"blur\",\"focusOut\"]","[\"DOMContentLoaded\",\"AdBlock\"]","[\"load\",\"blocker\"]","[\"mouseleave\",\"NativeDisplayAdID\"]","[\"mouseover\",\"event.triggered\"]","[\"load\",\"removeChild\"]","[\"/^(?:click|mousedown)$/\",\"latest!==\"]","[\"DOMContentLoaded\",\".ready\"]","[\"load\",\"script\"]","[\"\",\"/pop|wm|forceClick/\"]","[\"DOMContentLoaded\",\"adblock\"]","[\"load\",\"head\"]","[\"/error|load/\",\"/onerror|showModal/\"]","[\"visibilitychange\"]","[\"load\",\"/showModal|isBlanketFound/\"]","[\"click\",\"shouldShow\"]","[\"\",\"/ads|Modal/\"]","[\"DOMContentLoaded\",\"init\"]","[\"load\",\"Adblock\"]","[\"DOMContentLoaded\",\"window.open\"]","[\"\",\"vads\"]","[\"devtoolschange\"]","[\"beforeunload\"]","[\"click\",\"0x\"]","[\"\",\"break;case $.\"]","[\"mouseup\",\"decodeURIComponent\"]","[\"/(?:click|touchend)/\",\"_0x\"]","[\"click\",\"openSite\"]","[\"\",\"removeChild\"]","[\"click\",\"pu_count\"]","[\"\",\"/pop|_blank/\"]","[\"click\",\"allclick_Public\"]","[\"/touchstart|mousedown|click/\",\"latest\"]","[\"blur\",\"native code\"]","[\"blur\",\"event.simulate\"]","[\"click\",\"_blank\"]","[\"contextmenu\"]","[\"DOMContentLoaded\",\"0x\"]","[\"click\",\"overlay\"]","[\"scroll\",\"undefined\"]","[\"readystatechange\",\"document.removeEventListener\"]","[\"scroll\",\"detect\"]","[\"DOMContentLoaded\",\"event\"]","[\"click\",\"t(a)\"]","[\"\",\"focus\"]","[\"DOMContentLoaded\",\"deblocker\"]","[\"load\",\"block\"]","[\"\",\"preventDefault\"]","[\"click\",\"tabunder\"]","[\"DOMContentLoaded\",\"iframe_id\"]","[\"mouseup\",\"catch\"]","[\"scroll\",\"innerHeight\"]","[\"DOMContentLoaded\",\"disableDeveloperTools\"]","[\"hashchange\"]","[\"load\",\"/nextFunction|2000/\"]","[\"load\",\"player\"]","[\"\",\"document.oncontextmenu\"]","[\"\",\"about:blank\"]","[\"load\",\"popMagic\"]","[\"load\",\"void 0\"]","[\"np.detect\"]","[\"click\",\"Popup\"]","[\"\",\"/open.*_blank/\"]","[\"scroll\"]","[\"load\",\"innerHTML\"]","[\"\",\"isBlocking\"]","[\"DOMContentLoaded\",\"Adblock\"]","[\"\",\"$\"]","[\"\",\"exoJsPop101\"]","[\"/click|mousedown/\",\"catch\"]","[\"\",\"init\"]","[\"adb\"]","[\"scroll\",\"modal\"]","[\"nextFunction\"]","[\"\",\"[native code]\"]","[\"DOMContentLoaded\",\"clientHeight\"]","[\"click\",\"window.focus\"]","[\"load\",\"htmls\"]","[\"click\",\"event.dispatch\"]","[\"load\",\"adblock\"]","[\"DOMContentLoaded\",\"iframe\"]","[\"\",\"Math\"]","[\"\",\"tabUnder\"]","[\"load\",\"XMLHttpRequest\"]","[\"load\",\"puURLstrpcht\"]","[\"load\",\"AdBlocker\"]","[\"\",\"showModal\"]","[\"\",\"goog\"]","[\"\",\"document.body\"]","[\"\",\"modal\"]","[\"load\",\"length\"]","[\"gtmloaderror\"]","[\"click\",\"adobeModalTestABenabled\"]","[\"blur\",\"console.log\"]","[\"blur\",\"counter\"]","[\"\",\"AdB\"]","[\"load\",\"adSession\"]","[\"load\",\"Ads\"]","[\"load\",\"/abb|htmls|nextFunction/\"]","[\"\",\"adsBlocked\"]","[\"load\",\"goog\"]","[\"DOMContentLoaded\",\"popup\"]","[\"DOMContentLoaded\",\"googlesyndication\"]","[\"DOMContentLoaded\",\"redURL\"]","[\"np.evtdetect\"]","[\"load\",\"AdBlock\"]","[\"load\",\"popunder\"]","[\"scroll\",\"function(e)\"]","[\"DOMContentLoaded\",\"adlinkfly_url\"]","[\"mousedown\"]","[\"load\",\"document.getElementById\"]","[\"mousedown\",\"tabUnder\"]","[\"DOMContentLoaded\",\"adsbygoogle\"]","[\"load\",\"abDetectorPro\"]","[\"\",\"ad-load-fail\"]","[\"\",\"Adb\"]"];

const hostnamesMap = new Map([["newser.com",0],["sport1.de",2],["userscloud.com",3],["timesofindia.indiatimes.com",4],["drrtyr.mx",4],["pinoyalbums.com",4],["multiplayer.it",4],["bild.de",5],["mediafire.com",[6,7]],["pinsystem.co.uk",8],["fembed.com",8],["ancensored.com",8],["o2tvseries.com",8],["mp3fiber.com",[8,21]],["xrivonet.info",8],["afreesms.com",9],["tio.ch",9],["lavanguardia.com",9],["eplayer.click",9],["kingofdown.com",10],["radiotormentamx.com",10],["quelleestladifference.fr",10],["otakuworldsite.blogspot.com",10],["ad-itech.blogspot.com",10],["sna3talaflam.com",10],["agar.pro",10],["unlockapk.com",10],["mobdi3ips.com",10],["socks24.org",10],["drivebox.club",10],["interviewgig.com",10],["jobhunterplg.xyz",10],["javaguides.net",10],["almohtarif-tech.net",10],["hl-live.de",10],["forum.release-apk.com",10],["devoloperxda.blogspot.com",10],["zwergenstadt.com",10],["primedeportes.es",10],["doujindesu.cc",10],["upxin.net",10],["ciudadblogger.com",10],["ke-1.com",10],["greatanimation.it",10],["secretsdeepweb.blogspot.com",10],["bit-shares.com",10],["itdmusics.com",10],["aspdotnet-suresh.com",10],["tudo-para-android.com",10],["urdulibrarypk.blogspot.com",10],["zerotopay.com",10],["akw.to",10],["mawsueaa.com",10],["pornhd.com",11],["cnnamador.com",[11,40]],["cle0desktop.blogspot.com",11],["turkanime.co",11],["camclips.tv",[11,52]],["blackpornhq.com",11],["xsexpics.com",11],["ulsex.net",11],["wannafreeporn.com",11],["ytube2dl.com",11],["protege-torrent.com",11],["ninjastream.to",15],["cine.to",[15,182]],["pictoa.com",[15,28]],["hdstreamss.club",15],["kissasia.cc",15],["bibme.org",16],["citationmachine.net",16],["easybib.com",17],["sankakucomplex.com",18],["userupload.net",19],["vermangasporno.com",19],["imgtorrnt.in",19],["picbaron.com",[19,27]],["worldcupfootball.me",19],["letmejerk.com",19],["letmejerk3.com",19],["letmejerk4.com",19],["letmejerk5.com",19],["letmejerk6.com",19],["letmejerk7.com",19],["dlapk4all.com",19],["kropic.com",19],["kvador.com",19],["pdfindir.net",19],["brstej.com",19],["topwwnews.com",19],["xsanime.com",19],["vidlo.us",19],["put-locker.com",19],["moviesyug.net",19],["w4files.ws",19],["youx.xxx",19],["animeindo.asia",19],["masahub.net",19],["adclickersbot.com",19],["badtaste.it",20],["mage.si",21],["totaldebrid.org",21],["hesgoal.com",21],["neko-miku.com",21],["elsfile.org",21],["venstrike.jimdofree.com",21],["schrauben-normen.de",21],["avengerinator.blogspot.com",21],["link-to.net",21],["hanimesubth.com",21],["gsmturkey.net",21],["linkvertise.com",21],["adshrink.it",21],["presentation-ppt.com",21],["mangacanblog.com",21],["onehack.us",21],["pekalongan-cits.blogspot.com",21],["4tymode.win",21],["reifenrechner.at",21],["tire-size-calculator.info",21],["kord-jadul.com",21],["linuxsecurity.com",21],["encodinghub.com",21],["readyssh.net",21],["itsguider.com",21],["cotravinh.blogspot.com",21],["itudong.com",21],["shortx.net",21],["comandotorrenthd.org",21],["turkdebrid.net",21],["lecturel.com",21],["comboforum.com",21],["bakai.org",21],["nar.k-ba.net",21],["gotporn.com",23],["freepornrocks.com",23],["tvhai.org",23],["realgfporn.com",[24,25]],["titsbox.com",24],["thisvid.com",25],["xvideos-downloader.net",25],["imgspice.com",26],["luscious.net",[27,93]],["6indianporn.com",27],["amateurebonypics.com",27],["amateuryoungpics.com",27],["cinemabg.net",27],["desimmshd.com",27],["givemeaporn.com",27],["jav-asia.top",27],["javf.net",27],["javideo.net",27],["kr18plus.com",27],["mangameta.com",27],["pilibook.com",27],["pornborne.com",27],["porngrey.com",27],["submilf.com",27],["subtaboo.com",27],["xfrenchies.com",27],["frauporno.com",27],["qqxnxx.com",27],["sexvideos.host",27],["vikiporn.com",28],["tnaflix.com",28],["hentai2w.com",[28,35]],["yourlust.com",28],["hotpornfile.org",28],["jav789.com",28],["javbuz.com",28],["letfap.com",28],["watchfreexxx.net",28],["vintageporntubes.com",28],["angelgals.com",28],["babesexy.com",28],["porndaa.com",28],["ganstamovies.com",28],["youngleak.com",28],["porndollz.com",28],["xnxxvideo.pro",28],["xvideosxporn.com",28],["onlyhgames.com",28],["filmpornofrancais.fr",28],["javout.co",28],["adultasianporn.com",28],["nsfwmonster.com",28],["girlsofdesire.org",28],["gaytail.com",28],["fetish-bb.com",28],["rumporn.com",28],["soyoungteens.com",28],["zubby.com",28],["lesbian8.com",28],["gayforfans.com",28],["reifporn.de",28],["javtsunami.com",28],["18tube.sex",28],["xxxextreme.org",28],["amateurs-fuck.com",28],["sex-amateur-clips.com",28],["hentaiworld.tv",28],["dads-banging-teens.com",28],["home-xxx-videos.com",28],["mature-chicks.com",28],["teens-fucking-matures.com",28],["hqbang.com",28],["pussyspace.com",[29,30]],["pussyspace.net",[29,30]],["empflix.com",31],["cpmlink.net",32],["bdsmstreak.com",32],["cutpaid.com",32],["pornforrelax.com",32],["fatwhitebutt.com",32],["mavplay.xyz",32],["sunporno.com",[33,34,35]],["hentai2read.com",35],["pornblade.com",35],["pornfelix.com",35],["xanimeporn.com",35],["javtiful.com",35],["camarchive.tv",35],["ver-comics-porno.com",35],["ver-mangas-porno.com",35],["illink.net",35],["genpassword.top",35],["tubxporn.xxx",35],["m-hentai.net",35],["icyporno.com",35],["redwap.me",35],["redwap2.com",35],["redwap3.com",35],["freejav.guru",35],["pornxxxxtube.net",35],["zetporn.com",35],["crownimg.com",35],["xxxvideohd.net",35],["short.pe",36],["bs.to",38],["efukt.com",38],["kpopsea.com",38],["generacionretro.net",39],["nuevos-mu.ucoz.com",39],["micloudfiles.com",39],["mimaletamusical.blogspot.com",39],["visionias.net",39],["sslproxies24.top",39],["b3infoarena.in",39],["lurdchinexgist.blogspot.com",39],["thefreedommatrix.blogspot.com",39],["hentai-vl.blogspot.com",39],["projetomotog.blogspot.com",39],["ktmx.pro",39],["lirik3satu.blogspot.com",39],["marketmovers.it",39],["pharmaguideline.com",39],["safemaru.blogspot.com",39],["mixloads.com",39],["mangaromance.eu",39],["interssh.com",39],["freesoftpdfdownload.blogspot.com",39],["cirokun.blogspot.com",39],["myadslink.com",39],["blackavelic.com",39],["server.satunivers.tv",39],["eg-akw.com",39],["xn--mgba7fjn.cc",39],["ero-teca.blogspot.com",39],["flashingjungle.com",40],["ma-x.org",41],["lavozdegalicia.es",41],["btcbunch.com",41],["autosport.com",[41,210,211]],["motorsport.com",[41,210,211]],["xmovies08.org",43],["globaldjmix.com",44],["zazzybabes.com",45],["haaretz.com",46],["slate.com",47],["peliculas1mega.com",48],["mega-mkv.com",[48,49]],["zona-leros.net",48],["megalinks.info",49],["megapastes.com",49],["mkv-pastes.com",49],["zpaste.net",49],["zlpaste.net",49],["9xlinks.site",49],["acortarm.xyz",50],["acortame.xyz",50],["nzbstars.com",51],["digjav.com",52],["videoszoofiliahd.com",53],["xxxtubezoo.com",54],["zooredtube.com",54],["uii.io",55],["megacams.me",57],["rlslog.net",57],["porndoe.com",58],["acienciasgalilei.com",60],["playrust.io",61],["payskip.org",62],["short-url.link",63],["tubedupe.com",64],["fatgirlskinny.net",66],["polska-ie.com",66],["windowsmatters.com",66],["canaltdt.es",67],["masbrooo.com",67],["2ndrun.tv",67],["camclips.cc",[68,69]],["stfly.me",70],["oncehelp.com",70],["queenfaucet.website",70],["lewat.club",70],["popimed.com",70],["curto.win",70],["smallseotools.com",71],["porndex.com",72],["asianclub.tv",73],["justin.mp3quack.lol",73],["macwelt.de",75],["pcwelt.de",75],["geo.de",75],["allmomsex.com",76],["allnewindianporn.com",76],["analxxxvideo.com",76],["animalextremesex.com",76],["anime3d.xyz",76],["animefuckmovies.com",76],["animepornfilm.com",76],["animesexbar.com",76],["animesexclip.com",76],["animexxxsex.com",76],["animexxxfilms.com",76],["anysex.club",76],["apetube.asia",76],["asianfuckmovies.com",76],["asianfucktube.com",76],["asianporn.sexy",76],["asiansexcilps.com",76],["beeg.fund",76],["beegvideoz.com",76],["bestasiansex.pro",76],["bigsexhub.com",76],["bravotube.asia",76],["brutalanimalsfuck.com",76],["candyteenporn.com",76],["daddyfuckmovies.com",76],["desifuckonline.com",76],["exclusiveasianporn.com",76],["exteenporn.com",76],["fantasticporn.net",76],["fantasticyoungporn.com",76],["fineasiansex.com",76],["firstasianpussy.com",76],["freeindiansextube.com",76],["freepornasians.com",76],["freerealvideo.com",76],["fuck-beeg.com",76],["fuck-xnxx.com",76],["fuckasian.pro",76],["fuckfuq.com",76],["fuckundies.com",76],["fullasiantube.com",76],["gojapaneseporn.com",76],["golderotica.com",76],["goodyoungsex.com",76],["goyoungporn.com",76],["hardxxxmoms.com",76],["hdvintagetube.com",76],["hentaiporn.me",76],["hentaisexfilms.com",76],["hentaisexuality.com",76],["hot-teens-movies.mobi",76],["hotanimepornvideos.com",76],["hotanimevideos.com",76],["hotasianpussysex.com",76],["hotjapaneseshows.com",76],["hotmaturetube.com",76],["hotmilfs.pro",76],["hotorientalporn.com",76],["hotpornsexvideos.com",76],["hotpornyoung.com",76],["hotxxxjapanese.com",76],["hotxxxpussy.com",76],["indiafree.net",76],["indianpornvideo.online",76],["japanpornclip.com",76],["japanesetube.video",76],["japansex.me",76],["japanesexxxporn.com",76],["japansporno.com",76],["japanxxx.asia",76],["japanxxxworld.com",76],["keezmovies.surf",76],["lingeriefuckvideo.com",76],["liveanimalporn.zooo.club",76],["madhentaitube.com",76],["megahentaitube.com",76],["megajapanesesex.com",76],["megajapantube.com",76],["milfxxxpussy.com",76],["momsextube.pro",76],["momxxxass.com",76],["monkeyanimalporn.com",76],["moviexxx.mobi",76],["newanimeporn.com",76],["newjapanesexxx.com",76],["nicematureporn.com",76],["nudeplayboygirls.com",76],["openxxxporn.com",76],["originalindianporn.com",76],["originalteentube.com",76],["pig-fuck.com",76],["plainasianporn.com",76],["popularasianxxx.com",76],["pornanimetube.com",76],["pornasians.pro",76],["pornhat.asia",76],["pornheed.online",76],["pornjapanesesex.com",76],["pornomovies.asia",76],["pornvintage.tv",76],["primeanimesex.com",76],["realjapansex.com",76],["realmomsex.com",76],["redsexhub.com",76],["retroporn.world",76],["retrosexfilms.com",76],["sex-free-movies.com",76],["sexanimesex.com",76],["sexanimetube.com",76],["sexjapantube.com",76],["sexmomvideos.com",76],["sexteenxxxtube.com",76],["sexxxanimal.com",76],["sexyoungtube.com",76],["sexyvintageporn.com",76],["sopornmovies.com",76],["spicyvintageporn.com",76],["sunporno.club",76],["tabooanime.club",76],["teenextrem.com",76],["teenfucksex.com",76],["teenhost.net",76],["teensexass.com",76],["tnaflix.asia",76],["totalfuckmovies.com",76],["totalmaturefuck.com",76],["txxx.asia",76],["voyeurpornsex.com",76],["warmteensex.com",76],["wetasiancreampie.com",76],["wildhentaitube.com",76],["wowyoungsex.com",76],["xhamster-art.com",76],["xmovie.pro",76],["xnudevideos.com",76],["xnxxjapon.com",76],["xpics.me",76],["xvide.me",76],["xxxanimefuck.com",76],["xxxanimevideos.com",76],["xxxanimemovies.com",76],["xxxhentai.xyz",76],["xxxhentaimovies.com",76],["xxxhothub.com",76],["xxxjapaneseporntube.com",76],["xxxlargeporn.com",76],["xxxmomz.com",76],["xxxpornmilf.com",76],["xxxpussyclips.com",76],["xxxpussysextube.com",76],["xxxretrofuck.com",76],["xxxsex.pro",76],["xxxsexyjapanese.com",76],["xxxteenyporn.com",76],["xxxvideo.asia",76],["xxxvideos.ink",76],["xxxyoungtv.com",76],["youjizzz.club",76],["youngpussyfuck.com",76],["bayimg.com",77],["celeb.gate.cc",78],["eodev.com",79],["masterplayer.xyz",81],["pussy-hub.com",81],["compucalitv.com",82],["duden.de",86],["pennlive.com",88],["beautypageants.indiatimes.com",89],["01fmovies.com",90],["lnk2.cc",92],["fullhdxxx.com",93],["classicpornbest.com",93],["1youngteenporn.com",93],["www-daftarharga.blogspot.com",[93,164]],["miraculous.to",[93,173]],["vtube.to",93],["beritabaru.news",93],["solusi.cyou",93],["gosexpod.com",94],["tubepornclassic.com",95],["shemalez.com",95],["otakukan.com",96],["xcafe.com",97],["pornfd.com",97],["venusarchives.com",97],["imagehaha.com",98],["imagenpic.com",98],["imageshimage.com",98],["imagetwist.com",98],["adsh.cc",99],["deusasporno.com.br",100],["sambaporno2.com",100],["sexoamador.blog.br",100],["videospornozinhos.com",100],["videosexoquente.com",100],["xvideosf.com",100],["k1nk.co",100],["watchasians.cc",100],["alexsports.xyz",100],["web.de",101],["news18.com",102],["thelanb.com",103],["dropmms.com",103],["softdescargas.com",104],["softwaredescargas.com",104],["cracking-dz.com",105],["gazzetta.it",107],["alliptvlinks.com",108],["port.hu",110],["dziennikbaltycki.pl",111],["dzienniklodzki.pl",111],["dziennikpolski24.pl",111],["dziennikzachodni.pl",111],["echodnia.eu",111],["expressbydgoski.pl",111],["expressilustrowany.pl",111],["gazetakrakowska.pl",111],["gazetalubuska.pl",111],["gazetawroclawska.pl",111],["gk24.pl",111],["gloswielkopolski.pl",111],["gol24.pl",111],["gp24.pl",111],["gra.pl",111],["gs24.pl",111],["kurierlubelski.pl",111],["motofakty.pl",111],["naszemiasto.pl",111],["nowiny24.pl",111],["nowosci.com.pl",111],["nto.pl",111],["polskatimes.pl",111],["pomorska.pl",111],["poranny.pl",111],["sportowy24.pl",111],["strefaagro.pl",111],["strefabiznesu.pl",111],["stronakobiet.pl",111],["telemagazyn.pl",111],["to.com.pl",111],["wspolczesna.pl",111],["course9x.com",111],["courseclub.me",111],["azrom.net",111],["alttyab.net",111],["esopress.com",111],["nesiaku.my.id",111],["onemanhua.com",112],["freeindianporn.mobi",112],["dr-farfar.com",113],["boyfriendtv.com",114],["brandstofprijzen.info",115],["netfuck.net",116],["kisahdunia.com",116],["javsex.to",116],["bablyfeed.com",116],["nulljungle.com",116],["oyuncusoruyor.com",116],["pbarecap.ph",116],["sourds.net",116],["teknobalta.com",116],["tinyppt.com",116],["tvinternetowa.info",116],["sqlserveregitimleri.com",116],["tutcourse.com",116],["readytechflip.com",116],["novinhastop.com",116],["warddogs.com",116],["dotadostube.com",116],["dvdgayonline.com",116],["dvdgayporn.com",116],["hotxfans.com",116],["taradinhos.com",116],["iimanga.com",116],["tinhocdongthap.com",116],["thuocdangian.net",116],["tremamnon.com",116],["freedownloadvideo.net",116],["423down.com",116],["brizzynovel.com",116],["jugomobile.com",116],["freecodezilla.net",116],["movieslegacy.com",116],["animekhor.xyz",116],["iconmonstr.com",116],["gay-tubes.cc",116],["rbxscripts.net",116],["comentariodetexto.com",116],["wordpredia.com",116],["mdn.lol",116],["livsavr.co",116],["allfaucet.xyz",[116,197]],["replica-watch.info",116],["alludemycourses.com",116],["kayifamilytv.com",116],["blog24.me",[116,197]],["iir.ai",117],["gameofporn.com",119],["homeairquality.org",120],["qpython.club",121],["antifake-funko.fr",121],["e9china.net",122],["ac.ontools.net",122],["marketbeat.com",123],["hentaipornpics.net",124],["apps2app.com",125],["vulture.com",126],["megaplayer.bokracdn.run",127],["hentaistream.com",128],["siteunblocked.info",129],["parispi.net",130],["simkl.com",131],["sayrodigital.com",132],["paperzonevn.com",133],["dailyvideoreports.net",134],["lewd.ninja",135],["systemnews24.com",136],["incestvidz.com",137],["niusdiario.es",138],["playporngames.com",139],["movi.pk",[140,144]],["cutesexyteengirls.com",142],["asianembed.io",143],["gogoplay1.com",143],["0dramacool.net",144],["185.53.88.104",144],["185.53.88.204",144],["185.53.88.15",144],["123movies4k.net",144],["123moviesg.com",144],["1movieshd.com",144],["1rowsports.com",144],["4share-mp3.net",144],["6movies.net",144],["9animetv.to",144],["720pstream.me",144],["abysscdn.com",144],["adblockplustape.com",144],["ajkalerbarta.com",144],["akstream.xyz",144],["androidapks.biz",144],["androidsite.net",144],["animefenix.com",144],["animeonlinefree.org",144],["animesite.net",144],["animespank.com",144],["aniworld.to",144],["apkmody.io",144],["appsfree4u.com",144],["audioz.download",144],["bdnewszh.com",144],["beastlyprints.com",144],["bengalisite.com",144],["bestfullmoviesinhd.org",144],["betteranime.net",144],["blacktiesports.live",144],["buffsports.stream",144],["ch-play.com",144],["clickforhire.com",144],["cloudy.pk",144],["computercrack.com",144],["coolcast2.com",144],["crackedsoftware.biz",144],["crackfree.org",144],["cracksite.info",144],["cryptoblog24.info",144],["cuatrolatastv.blogspot.com",144],["cydiasources.net",144],["dirproxy.com",144],["dopebox.to",144],["downloadapk.info",144],["downloadapps.info",144],["downloadgames.info",144],["downloadmusic.info",144],["downloadsite.org",144],["downloadwella.com",144],["ebooksite.org",144],["educationtips213.blogspot.com",144],["egyup.live",144],["embed.meomeo.pw",144],["embed.scdn.to",144],["emulatorsite.com",144],["essaysharkwriting.club",144],["extrafreetv.com",144],["fcfooty.com",144],["fclecteur.com",144],["files.im",144],["flexyhit.com",144],["fmoviefree.net",144],["fmovies24.com",144],["footyhunter3.xyz",144],["freeflix.info",144],["freemoviesu4.com",144],["freeplayervideo.com",144],["freesoccer.net",144],["fseries.org",144],["gamefast.org",144],["gamesite.info",144],["gmanga.me",144],["gocast123.me",144],["gogohd.net",144],["gogoplay5.com",144],["gooplay.net",144],["gostreamon.net",144],["happy2hub.org",144],["harimanga.com",144],["healthnewsreel.com",144],["hexupload.net",144],["hinatasoul.com",144],["hindisite.net",144],["hinlinkz.info",144],["hxfile.co",144],["isosite.org",144],["iv-soft.com",144],["jewelry.com.my",144],["johnwardflighttraining.com",144],["kaast1.com",144],["kabarportal.com",144],["kstorymedia.com",144],["la123movies.org",144],["lespassionsdechinouk.com",144],["lilymanga.net",144],["linksdegrupos.com.br",144],["livestreamtv.pk",144],["macsite.info",144],["mangapt.com",144],["mangasite.org",144],["manhuascan.com",144],["megafilmeshdseries.com",144],["megamovies.org",144],["membed.net",144],["mgnetu.com",144],["moddroid.com",144],["moviefree2.com",144],["movies-watch.com.pk",144],["moviesite.app",144],["moviesonline.fm",144],["moviesx.org",144],["moviewatchonline.com.pk",144],["msmoviesbd.com",144],["musicsite.biz",144],["myfernweh.com",144],["myviid.com",144],["nazarickol.com",144],["newsrade.com",144],["ninjashare.to",144],["noob4cast.com",144],["nsw2u.com",[144,235]],["olympicstreams.me",144],["orangeink.pk",144],["owllink.net",144],["pahaplayers.click",144],["patchsite.net",144],["pdfsite.net",144],["pkcasts.com",144],["play1002.com",144],["player-cdn.com",144],["productkeysite.com",144],["projectfreetv.one",144],["romsite.org",144],["rufiguta.com",144],["rytmp3.io",144],["send.cm",144],["seriesite.net",144],["seriezloaded.com.ng",144],["serijehaha.com",144],["shrugemojis.com",144],["siteapk.net",144],["siteflix.org",144],["sitegames.net",144],["sitekeys.net",144],["sitepdf.com",144],["sitetorrent.com",144],["softwaresite.net",144],["sportbar.live",144],["sportkart1.xyz",144],["ssyoutube.com",144],["stardima.com",144],["stream4free.live",144],["subdl.com",144],["superapk.org",144],["supermovies.org",144],["tainio-mania.online",144],["talaba.su",144],["tamilguns.org",144],["tatabrada.tv",144],["theflixer.tv",144],["thememypc.net",144],["thetechzone.online",144],["thripy.com",144],["tonnestreamz.xyz",144],["torrentdosfilmes.eu",144],["travelplanspro.com",144],["turcasmania.com",144],["tusfiles.com",144],["tvonlinesports.com",144],["ultramovies.org",144],["uploadbank.com",144],["uploadmaza.com",144],["urdubolo.pk",144],["vidspeeds.com",144],["vumoo.to",144],["warezsite.net",144],["watchmovies2.com",144],["watchmoviesforfree.org",144],["watchofree.com",144],["watchsite.net",144],["watchsouthpark.tv",144],["watchtvch.club",144],["web.livecricket.is",144],["webseries.club",144],["worldcupstream.pm",144],["y2mate.com",144],["youapk.net",144],["youtube4kdownloader.com",144],["yts-subs.com",144],["zoro.to",144],["haho.moe",145],["nicy-spicy.pw",146],["fap-guru.cam",147],["novelmultiverse.com",148],["mylegalporno.com",149],["thecut.com",152],["novelism.jp",153],["alphapolis.co.jp",154],["okrzone.com",155],["momo-net.com",156],["maxgaming.fi",156],["game3rb.com",157],["javhub.net",157],["thotvids.com",158],["berklee.edu",159],["rawkuma.com",160],["imeteo.sk",161],["zive.cz",162],["youtubemp3donusturucu.net",163],["surfsees.com",165],["feyorra.top",166],["claimtrx.com",166],["vivo.st",[167,168]],["katflys.com",169],["alueviesti.fi",171],["kiuruvesilehti.fi",171],["lempaala.ideapark.fi",171],["olutposti.fi",171],["urjalansanomat.fi",171],["joyhints.com",172],["tainhanhvn.com",174],["titantv.com",175],["3cinfo.net",176],["transportationlies.org",177],["cocomanga.com",178],["sanctuary.moe",179],["mcleaks.net",180],["explorecams.com",180],["chillx.top",181],["playerx.stream",181],["m.liputan6.com",183],["stardewids.com",[183,208]],["nikita.tk",184],["ingles.com",185],["spanishdict.com",185],["dragontea.ink",186],["rureka.com",187],["bunkr.is",188],["amateur8.com",189],["freeporn8.com",189],["maturetubehere.com",189],["embedo.co",190],["corriere.it",191],["oggi.it",191],["2the.space",192],["ftuapps.dev",193],["apkcombo.com",195],["sponsorhunter.com",196],["coinscap.info",197],["cryptowidgets.net",197],["greenenez.com",197],["insurancegold.in",197],["webfreetools.net",197],["wiki-topia.com",197],["bitcotasks.com",197],["videolyrics.in",197],["manofadan.com",197],["cempakajaya.com",197],["coinsvalue.net",197],["cookinguide.net",197],["freeoseocheck.com",197],["tagecoin.com",197],["doge25.in",197],["king-ptcs.com",197],["claimcoins.site",197],["cryptosh.pro",197],["cryptoearnfaucet.com",197],["coinsrev.com",197],["ohionowcast.info",197],["wiour.com",197],["maqal360.com",197],["go.freetrx.fun",197],["novelssites.com",198],["haxina.com",199],["cryptofenz.xyz",199],["upshrink.com",200],["torrentmac.net",201],["moviezaddiction.icu",202],["dlpanda.com",203],["socialmediagirls.com",204],["einrichtungsbeispiele.de",205],["weadown.com",206],["molotov.tv",207],["commands.gg",208],["smgplaza.com",209],["freepik.com",212],["filepress.lol",213],["pinloker.com",214],["sekilastekno.com",214],["diyphotography.net",215],["bitchesgirls.com",216],["shopforex.online",217],["ltc25.in",[218,219]],["yesmangas1.com",220],["programmingeeksclub.com",222],["hlspanel.xyz",223],["easymc.io",224],["shoot-yalla.tv",225],["diendancauduong.com",226],["parentcircle.com",227],["h-game18.xyz",228],["nopay.info",229],["wheelofgold.com",230],["shortlinks.tech",231],["recipahi.com",232],["dropnudes.com",233],["privatenudes.com",233],["ylilauta.org",234]]);

const entitiesMap = new Map([["kisscartoon",1],["kissasian",8],["ganool",8],["pirate",8],["piratebay",8],["pirateproxy",8],["proxytpb",8],["thepiratebay",8],["limetorrents",[10,19]],["king-pes",10],["depedlps",10],["komikcast",10],["idedroidsafelink",10],["links-url",10],["eikaiwamastery",10],["ak4eg",10],["xhamster",11],["xhamster1",11],["xhamster5",11],["xhamster7",11],["rexporn",11],["movies07",11],["pornocomics",11],["streanplay",12],["steanplay",12],["liferayiseasy",[13,14]],["newpelis",[15,59]],["pelix",[15,59]],["allcalidad",[15,35]],["khatrimaza",15],["pahe",19],["yts",19],["tube8",19],["topeuropix",19],["moviescounter",19],["torrent9",19],["desiremovies",19],["movs4u",19],["uwatchfree",19],["hydrax",19],["4movierulz",19],["projectfreetv",19],["arabseed",19],["btdb",[19,61]],["skymovieshd",19],["pagalmovies",19],["7starhd",[19,83]],["1jalshamoviez",19],["9xupload",19],["bdupload",19],["desiupload",19],["rdxhd1",19],["world4ufree",19],["streamsport",19],["rojadirectatvhd",19],["userload",19],["freecoursesonline",21],["lordpremium",21],["todovieneok",21],["novablogitalia",21],["anisubindo",21],["btvsports",21],["adyou",22],["fxporn69",24],["watchseries",27],["pornktube",27],["sexwebvideo",32],["pornomoll",32],["mejortorrent",35],["mejortorrento",35],["mejortorrents",35],["mejortorrents1",35],["mejortorrentt",35],["grantorrent",35],["gntai",35],["dulinks",35],["gsurl",36],["mimaletadepeliculas",37],["burningseries",38],["dz4soft",39],["yoututosjeff",39],["ebookmed",39],["lanjutkeun",39],["novelasesp",39],["singingdalong",39],["doujindesu",39],["xmovies8",42],["mega-dvdrip",48],["peliculas-dvdrip",48],["desbloqueador",50],["camwhores",52],["camwhorestv",52],["uproxy",52],["nekopoi",56],["mirrorace",65],["dbupload",72],["nuvid",73],["mixdrp",74],["asiansex",76],["japanfuck",76],["japanporn",76],["teensex",76],["vintagetube",76],["xxxmovies",76],["zooqle",80],["hdfull",84],["mangamanga",85],["streameast",87],["thestreameast",87],["vev",91],["vidop",91],["zone-telechargement",93],["megalink",100],["gmx",101],["mega1080p",106],["9hentai",109],["gaypornhdfree",116],["cinemakottaga",116],["privatemoviez",116],["apkmaven",116],["popcornstream",118],["moviessources",141],["goload",[143,144]],["0gomovie",144],["0gomovies",144],["123moviefree",144],["1kmovies",144],["1madrasdub",144],["1primewire",144],["2embed",144],["2madrasdub",144],["2umovies",144],["4anime",144],["9xmovies",144],["altadefinizione01",144],["anitube",144],["atomixhq",144],["beinmatch",144],["brmovies",144],["cima4u",144],["clicknupload",144],["cmovies",144],["couchtuner",144],["cricfree",144],["crichd",144],["databasegdriveplayer",144],["dood",144],["f1stream",144],["faselhd",144],["fbstream",144],["file4go",144],["filemoon",144],["filepress",144],["filmlinks4u",144],["filmpertutti",144],["filmyzilla",144],["fmovies",144],["french-stream",144],["fsapi",144],["fzlink",144],["gdriveplayer",144],["gofilms4u",144],["gogoanime",144],["gomoviefree",144],["gomoviz",144],["gowatchseries",144],["hdmoviefair",144],["hdmovies4u",144],["hdmovies50",144],["hdmoviesfair",144],["hh3dhay",144],["hindilinks4u",144],["hotmasti",144],["hurawatch",144],["klmanga",144],["klubsports",144],["libertestreamvf",144],["livetvon",144],["manga1000",144],["manga1001",144],["mangaraw",144],["mangarawjp",144],["mlbstream",144],["motogpstream",144],["movierulz",144],["movies123",144],["movies2watch",144],["moviesden",144],["moviezaddiction",144],["myflixer",144],["nbastream",144],["netcine",144],["nflstream",144],["nhlstream",144],["onlinewatchmoviespk",144],["pctfenix",144],["pctnew",144],["pksmovies",144],["plyjam",144],["plylive",144],["pogolinks",144],["poscitech",144],["prmovies",144],["rugbystreams",144],["shahed4u",144],["sflix",144],["sitesunblocked",144],["socceronline",144],["solarmovies",144],["sportcast",144],["sportskart",144],["sports-stream",144],["streaming-french",144],["streamers",144],["streamingcommunity",144],["strikeout",144],["t20cup",144],["tennisstreams",144],["toonanime",144],["tvply",144],["ufcstream",144],["uptomega",144],["uqload",144],["vudeo",144],["vidoo",144],["vipbox",144],["vipboxtv",144],["vipleague",144],["viprow",144],["yesmovies",144],["yomovies",144],["yomovies1",144],["yt2mp3s",144],["guardaserie",150],["cine-calidad",151],["milfnut",156],["videovard",170],["softonic",194],["shineads",221],["bg-gledai",233],["gledaitv",233]]);

const exceptionsMap = new Map([["mentor.duden.de",[86]]]);

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
