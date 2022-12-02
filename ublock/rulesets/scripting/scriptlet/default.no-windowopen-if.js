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

/// name no-windowopen-if
/// alias no-windowOpen-if
/// alias nowoif

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_noWindowOpenIf() {

/******************************************************************************/

// default

const argsList = [{"a":[]},{"a":["/^/","2"]},{"a":["/^/","1"]},{"a":["stream-4k"]},{"a":["/^/","15"]},{"a":["amazon-adsystem"]},{"a":["!za.gl","0"]},{"a":["!?safelink_redirect="]},{"a":["!/download\\//"]},{"a":["!/^https:\\/\\/sendvid\\.com\\/[0-9a-z]+$/"]},{"a":["clb670603"]},{"a":["!api?call=","10","obj"],"n":["vidstream.pro"]},{"a":["|"]},{"a":["!/ytmp3|dropbox/"]},{"a":["!refine?search"]},{"a":["!embedy"]},{"a":["wapka"]},{"a":["!t.me"]},{"a":["!/prcf.fiyar|themes|pixsense|.jpg/"]},{"a":["ppcnt"]},{"a":["adf.ly","15"]},{"a":["onclickmega"]},{"a":["!dosya","1"]},{"a":["!/^\\/d\\//"]},{"a":["!dropbox"]},{"a":["!yt2api"]},{"a":["!clickmp3"]},{"a":["bitcoins-update.blogspot.com"]},{"a":["!coinsearns.com"]},{"a":["youtube"]},{"a":["/^/","0"]},{"a":["/?sponsor"]},{"a":["!ytcutter.net"]},{"a":["!/d/"]},{"a":["!download"]},{"a":["/xlirdr|hotplay\\-games/"]},{"a":["!/^\\//"]}];

const hostnamesMap = new Map([["rarbgmirrored.org",0],["rarbgproxy.org",0],["afreesms.com",0],["hltv.org",0],["hollaforums.com",0],["mcloud.to",0],["vidstream.pro",0],["dailyuploads.net",0],["watchparksandrecreation.net",0],["putlocker-website.com",0],["filescdn.com",0],["deportealdia.live",0],["watchmyexgf.net",0],["upload-4ever.com",0],["tui.click",0],["vortez.net",0],["upornia.com",0],["porn.com",0],["katestube.com",0],["mangoporn.net",0],["nwanime.tv",0],["anyfreeporn.com",0],["chooyomi.com",0],["shooshtime.com",0],["zmovs.com",0],["picturelol.com",0],["imgspice.com",0],["pornhd.com",0],["bigtitsxxxsex.com",0],["xvideos.com",0],["xvideos2.com",0],["vivud.com",0],["empflix.com",0],["fantasti.cc",0],["anyporn.com",0],["magnetdl.com",0],["magnetdl.org",0],["short.pe",0],["donkparty.com",0],["dz4link.com",0],["zupload.me",0],["casptv.xyz",0],["tubemania.org",0],["webdesigndev.com",0],["imageweb.ws",0],["vidoza.net",0],["katfile.com",0],["hd-streams.org",0],["pelispop.net",0],["streampelis.club",0],["gamcore.com",0],["porcore.com",0],["69games.xxx",0],["vintage-erotica-forum.com",0],["momondo.com",0],["hentai2read.com",0],["lolhentai.net",0],["mangafreak.net",0],["itv.com",0],["hotscope.tv",0],["psystreams.com",0],["micloudfiles.com",0],["assia.tv",0],["assia4.com",0],["assia24.com",0],["seatguru.com",0],["asiananimaltube.org",0],["zoosex.pink",0],["datoporn.co",0],["player.cuevana.ac",0],["pornrabbit.com",0],["cartoonporno.xxx",0],["youpornru.com",0],["hubfiles.ws",0],["asus-zenfone.com",0],["uii.io",0],["likn.xyz",0],["powforums.com",0],["uploadbank.com",0],["titsbox.com",0],["spycock.com",0],["cut-fly.com",0],["pelismart.com",0],["hotpornfile.org",0],["cine24.online",0],["xrivonet.info",0],["gounlimited.to",0],["animeheaven.pro",0],["shortit.pw",0],["pornve.com",0],["sawlive.tv",0],["veekyforums.com",0],["cutpaid.com",0],["televisionlibre.net",0],["durtypass.com",0],["opjav.com",0],["nhentai.net",0],["forexlap.com",0],["cambay.tv",0],["camwhoreshd.com",0],["camwhorespy.com",0],["cwtvembeds.com",0],["mac-torrent-download.net",0],["videogreen.xyz",0],["zegtrends.com",0],["efilmindir.org",0],["hpav.tv",0],["hpjav.tv",0],["fileone.tv",0],["xpics.me",0],["vido.fun",0],["linksht.com",0],["milfzr.com",0],["pandamovies.pw",0],["azmath.info",0],["downfile.site",0],["downphanmem.com",0],["expertvn.com",0],["memangbau.com",0],["scratch247.info",0],["trangchu.news",0],["simsdom.com",0],["bfst.to",0],["cloudvideo.tv",0],["bananamovies.net",0],["kinoger.ru",0],["xxxbunker.com",0],["clasicotas.org",0],["7moviesrulz.com",0],["movieruls.net",0],["watchmoviesrulz.com",0],["sypl.xyz",0],["sexgalaxy.net",0],["compupaste.com",0],["assia.org",0],["dubsstreamz.com",0],["freefeds.com",0],["lowend.xyz",0],["wstream.to",0],["tvply.me",0],["dilo.nu",0],["noticiasesports.live",0],["noweconomy.live",0],["googlvideo.com",0],["serverf4.org",0],["porn-tube-club.com",0],["streamporn.pw",0],["zplayer.live",0],["faucethero.com",0],["720pxmovies.blogspot.com",0],["software-on.com",0],["cdna.tv",0],["cam4.com",0],["filerio.in",0],["ckk.ai",0],["shemalepower.xyz",0],["bclikeqt.com",0],["markipli.com",0],["dlkoo.com",0],["bitcoinminingforex.blogspot.com",0],["stratege.ru",0],["vladan.fr",0],["losporn.org",0],["avhost.xyz",0],["cdn-myhdjav.info",0],["dutrag.com",0],["embed.best",0],["embed.casa",0],["embedsito.com",0],["feurl.com",0],["films5k.com",0],["gaobook.review",0],["gcloud.live",0],["javcl.me",0],["javip.pro",0],["javlove.club",0],["luxubu.review",0],["mavlecteur.com",0],["mavplayer.xyz",0],["mrdhan.com",0],["openplayer.net",0],["playdoe.xyz",0],["playfinder.xyz",0],["playvid.host",0],["qdembed.com",0],["rubicstreaming.com",0],["smartshare.tv",0],["svpri.xyz",0],["ujav.me",0],["watchgayporn.online",0],["xstreamcdn.com",0],["youtnbe.xyz",0],["filmlecteur.info",0],["tpxanime.in",0],["welovestream.xyz",0],["tvonlinex.com",0],["dreamfancy.org",0],["lewat.club",0],["pornult.com",0],["nonktube.com",0],["aflamyz.com",0],["netu.in",0],["tusfiles.com",0],["adultdvdparadise.com",0],["freeomovie.info",0],["fullxxxmovies.me",0],["mangoparody.com",0],["mangoporn.co",0],["netflixporno.net",0],["pandamovies.me",0],["playpornfree.xyz",0],["pornkino.cc",0],["pornwatch.ws",0],["watchfreexxx.pw",0],["watchxxxfree.pw",0],["xopenload.pw",0],["xtapes.me",0],["xxxmoviestream.xyz",0],["xxxparodyhd.net",0],["xxxscenes.net",0],["xxxstream.me",0],["youwatchporn.com",0],["spankbang.com",0],["skeimg.com",0],["4share.vn",0],["0xxx.ws",0],["ucptt.com",0],["exe.io",0],["exe.app",0],["skincarie.com",0],["fullhdxxx.com",0],["viptube.com",0],["homemature.net",0],["kingsofteens.com",0],["hentaihere.com",0],["clk.ink",0],["yandexcdn.com",0],["gsurl.be",0],["iguarras.com",0],["peliculaspornomega.net",0],["birdurls.com",0],["adsafelink.com",0],["aii.sh",0],["uploader.trade",0],["czechvideo.org",0],["gfsvideos.com",0],["opensubtitles.org",0],["vupload.com",0],["series-d.com",0],["hentaihaven.xxx",0],["naughtymachinima.com",0],["porn00.org",0],["savevideo.tube",0],["tr.savefrom.net",0],["hexupload.net",0],["xanimeporn.com",0],["bacakomik.co",0],["porngo.com",0],["gosemut.net",0],["streamplusvip.xyz",0],["playembed.xyz",0],["playtemporal.xyz",0],["temporal2021.xyz",0],["temparchive.com",0],["bitearns.com",0],["dr-farfar.com",0],["torrentmegafilmes.tv",0],["yeswegays.com",0],["youramateurtube.com",0],["webtor.io",0],["encurta.eu",0],["luscious.net",0],["makemoneywithurl.com",0],["gomo.to",0],["cryptofuns.ru",0],["animetemaefiore.club",0],["wplink.online",0],["naniplay.com",0],["savesubs.com",0],["seriesynovelas.online",0],["interracial.com",0],["fatwhitebutt.com",0],["smplace.com",0],["slaughtergays.com",0],["sexiestpicture.com",0],["sassytube.com",0],["vipergirls.to",0],["xh.video",0],["lkc21.net",0],["freegogpcgames.com",0],["smiechawatv.pl",0],["tudogamesbr.com",0],["dogemate.com",0],["pstream.net",0],["shurt.pw",0],["fakyutube.com",0],["unlimitedfiles.xyz",0],["neonlink.net",0],["l2db.info",0],["aldiblogger.com",0],["aplayer.xyz",0],["netuplay.xyz",0],["fastpeoplesearch.com",0],["onbox.me",0],["financemonk.net",0],["notube.net",0],["notube.cc",0],["leolist.cc",0],["moalm-qudwa.blogspot.com",0],["smutty.com",0],["kropic.com",0],["westmanga.info",0],["beeg.party",0],["mm9841.com",0],["mm9842.com",0],["adblockplustape.com",0],["twistedporn.com",0],["sportif.id",0],["ymp4.download",0],["xxxonlinegames.com",0],["watchpornx.com",0],["digjav.com",0],["videosporngay.net",0],["sonline.pro",0],["th-jav.co",0],["2conv.com",0],["flvto.biz",0],["flv2mp3.by",0],["down-paradise.com",0],["linksly.co",0],["piratecams.com",0],["ddownr.com",0],["keepv.id",0],["savethevideo.com",0],["savefrom.net",0],["ytdownload.net",0],["iseekgirls.com",0],["milapercia.com",0],["windows-1.com",0],["opmovie.xyz",0],["siteunblocked.info",0],["theproxy.app",0],["espn-live.stream",0],["watch-jav-english.live",0],["planet-streaming1.com",0],["filmesonlinehd1.org",0],["genpas.icu",0],["deseneledublate.com",0],["wordcounter.icu",0],["imfb.xyz",0],["goossh.com",0],["manikusa.com",0],["shortenbuddy.com",0],["ohentai.org",0],["shpl.xyz",0],["bestsolaris.com",0],["redanimedatabase.cloud",0],["vidcorntv.org",0],["sinfoniarossini.com",0],["avimobilemovies.net",0],["hackiee.mobi",0],["liveonscore.tv",0],["vpn-anbieter-vergleich-test.de",0],["streamabc.xyz",0],["gayvidsclub.com",0],["getfile.mobi",0],["sukatu.ru",0],["tits-guru.com",0],["mediashore.org",0],["vidxhot.net",0],["miuiku.com",0],["savelink.site",0],["vvc.vc",0],["janusnotes.com",0],["hentaidude.com",0],["short-cash2.xyz",0],["mobilemovies.info",0],["mobilemovieshd.me",0],["tamilmobilemovies.in",0],["kaplog.com",0],["passgen.icu",0],["adultdeepfakes.com",0],["downloadtwittervideo.com",0],["kiwiexploits.com",0],["genpassword.top",0],["thejournal.ie",0],["cdnqq.net",0],["cdn1.fastvid.co",0],["gotoons.org",0],["kokostream.net",0],["movi.pk",0],["player.cineflixtv.com",0],["ply.mp4cage.com",0],["adultfun.net",0],["sanoybonito.club",0],["7misr4day.com",0],["pornlib.com",0],["wigistream.to",0],["aquiyahorajuegos.net",0],["hotflix.cc",0],["ontiva.com",0],["torrentkingnow.com",0],["gaysearch.com",0],["aniwatch.pro",0],["barurotero.blogspot.com",0],["cararegistrasi.com",0],["booru.eu",0],["borwap.xxx",0],["centralboyssp.com.br",0],["czxxx.org",0],["emturbovid.com",0],["filmdelisi.co",0],["filmovitica.com",0],["foxtube.com",0],["hd-xxx.me",0],["ipornxxx.net",0],["itsfuck.com",0],["javideo.pw",0],["kissanime.mx",0],["lametrofitness.net",0],["longporn.xyz",0],["matureworld.ws",0],["mp3-convert.org",0],["stilltube.com",0],["streamm4u.club",0],["teenage-nudists.net",0],["xasiatvideo.com",0],["xvideos.name",0],["xxx-videos.org",0],["xxxputas.net",0],["youpornfm.com",0],["maxtubeporn.net",0],["vcdn2.space",0],["vidsvidsvids.com",0],["hentaicomics.pro",0],["makaveli.xyz",0],["y2mate.guru",0],["javstream.top",0],["watchtodaypk.com",0],["assia1.tv",0],["emb.apl22.me",0],["msubplix.com",0],["myyouporn.com",0],["convert2mp3.club",0],["embedstream.me",0],["vrporngalaxy.com",0],["stem-cells-news.com",0],["javynow.com",0],["netu.view47.com",0],["yifytorrentme.com",0],["blog.aming.info",0],["toopl.xyz",0],["youtubemp3.us",0],["link.bitmos.co.in",0],["yt-api.com",0],["convertitoremp3.download",0],["afilmyhouse.blogspot.com",0],["pagalworld.us",0],["coinurl.net",0],["masstamilan.im",0],["spicyandventures.com",0],["hd44.com",0],["katmoviehd4.com",0],["exhost.online",0],["adnit.xyz",0],["mobileflasherbd.com",0],["kaotic.com",0],["highstream.tv",0],["crazyblog.in",0],["desitab69.sextgem.com",0],["javquick.com",0],["rechub.tv",0],["rumahfilm.stream",0],["frebieesforyou.net",0],["freebiesforyou.net",0],["upvideo.to",0],["shemalestube.com",0],["pussy.org",0],["analsexstars.com",0],["theicongenerator.com",0],["zentum.club",0],["cloudrls.com",0],["skiplink.org",0],["ybm.pw",0],["lordhd.com",0],["paid4.link",0],["cryptoforu.org",0],["goplayer.online",0],["serialeonline.biz",0],["pajalusta.club",0],["javhdfree.icu",0],["eitplay.xyz",0],["maxstream.video",0],["videoseyred.in",0],["www-daftarharga.blogspot.com",0],["xbox360torrent.com",0],["playwatchnet.com",0],["arenaboard.xyz",0],["go.gets4link.com",0],["lightnovelpdf.com",0],["keepvid.pw",0],["xemphimgi.net",0],["toolsolutions.top",0],["wowstream.top",0],["adbitcoin.co",0],["automotur.club",0],["link.rota.cc",0],["convert2mp3.cx",0],["mp3snow.com",0],["mp3download.to",0],["katflys.com",0],["video1tube.com",0],["za.uy",0],["45.87.43.43",0],["xdxdxd.xyz",0],["instaanime.com",0],["coinsparty.com",0],["fifaultimateteam.it",0],["bowfile.com",0],["1cloudfile.com",0],["gayvl.net",0],["covrhub.com",0],["fapcat.com",0],["imgbbd.buzz",0],["imgizx.buzz",0],["imgkoc.buzz",0],["imgkorle.buzz",0],["imglkju.buzz",0],["imgqte.buzz",0],["imgwer.buzz",0],["imgxvd.buzz",0],["imgyng.buzz",0],["imgyvdw.buzz",0],["cutpopads.com",0],["pobre.tv",0],["pixroute.com",0],["live7v.com",0],["kinas.tv",0],["thienhatruyen.com",0],["witanime.com",0],["clk.asia",0],["rancah.com",0],["linka.click",0],["av01.tv",0],["bigyshare.com",0],["glotorrents.fr-proxy.com",0],["glotorrents.theproxy.ws",0],["wapsing.com",0],["apiyt.com",0],["masstamilans.com",0],["okmusi.com",0],["sohexo.org",0],["ytmp3x.com",0],["yofaurls.com",0],["freestreams-live1.com",0],["webpornblog.com",0],["cam-video.xxx",0],["svetserialu.to",0],["blu-ray.com",0],["mrgay.com",0],["assia2.com",0],["webhostingpost.com",0],["upvizzz.xyz",0],["144.126.138.140",0],["xvideos.wptri.com",0],["tutorialspots.com",0],["phica.net",0],["streambee.to",0],["streamers.watch",0],["emb.x179759.apl123.me",0],["emb.x187106.apl152.me",0],["techgeek.digital",0],["supersextube.pro",0],["h-flash.com",0],["ponselharian.com",0],["hakie.net",0],["vtube.to",0],["vidplaystream.top",0],["tubeload.co",0],["online123movies.live",0],["whcp4.com",0],["flixtor.stream",0],["44anime.net",0],["yourtehzeeb.com",0],["onlymp3.to",0],["hindimovies.to",0],["movieswatch24.pk",0],["watchonlinemovies15.pk",0],["loadx.ws",0],["piraproxy.app",0],["driveplayer.net",0],["noob4cast.com",0],["hindimoviestv.com",0],["watchpk.live",0],["watchmoviesonlinepk.com",0],["younetu.com",0],["mp3y.download",0],["k1nk.co",0],["y2mate.com",0],["y2mate.is",0],["watchonlinehd123.sbs",0],["acrackstreams.com",0],["pomvideo.cc",0],["steampiay.cc",0],["xxx-videosex.porn",0],["api.webs.moe",0],["3hentai.net",0],["imsdb.pw",0],["audaciousdefaulthouse.com",0],["fittingcentermondaysunday.com",0],["fraudclatterflyingcar.com",0],["launchreliantcleaverriver.com",0],["realfinanceblogcenter.com",0],["reputationsheriffkennethsand.com",0],["un-block-voe.net",0],["v-o-e-unblock.com",0],["voe-un-block.com",0],["voeun-block.net",0],["voeunbl0ck.com",0],["voeunblck.com",0],["voeunblk.com",0],["voeunblock.com",0],["voeunblock1.com",0],["voeunblock2.com",0],["voeunblock3.com",0],["webloadedmovie.com",0],["embedo.co",0],["embed-player.space",0],["imdbembed.xyz",0],["apkmody.io",0],["gratflix.org",0],["bestcash2020.com",0],["lrepacks.net",0],["komikav.com",0],["bc.vc",0],["larsenik.com",0],["stadiumstream.de",0],["yout.pw",0],["veryfreeporn.com",0],["korall.xyz",0],["nosteam.ro",0],["185.82.172.143",0],["link.paid4link.net",0],["mlb66.ir",0],["ddl-francais.com",0],["cutebabe.co",0],["bokeponlineterbaru.xyz",0],["techacode.com",0],["ier.ai",0],["komiklokal.me",0],["apl161.me",0],["moddroid.co",0],["gamehub.pw",0],["enit.in",0],["streamservicehd.click",0],["alexsports.xyz",0],["oii.io",0],["bestlinkz.xyz",0],["divxfilmeonline.net",0],["vidscdns.com",0],["novelssites.com",0],["mdn.lol",0],["techydino.net",0],["redload.co",0],["manhwadesu.me",0],["watchanime.video",0],["repelishd.com.ar",0],["infinitehentai.com",0],["domainwheel.com",0],["fembed9hd.com",0],["ssyoutube.com",0],["videos.remilf.com",0],["hydrax.net",1],["playhydrax.com",1],["freeplayervideo.com",2],["nazarickol.com",2],["player-cdn.com",2],["fc.lc",2],["javjunkies.com",2],["adclickersbot.com",2],["putlockers.cr",3],["mwpaste.com",4],["twitch.tv",5],["za.gl",6],["foxseotools.com",7],["atomtt.com",8],["sendvid.com",9],["my.mail.ru",10],["egy.best",11],["vipstand.se",12],["olympicstreams.me",12],["ytmp3.cc",13],["rentbyowner.com",14],["embedy.me",15],["sekilastekno.com",16],["underhentai.net",17],["imgair.net",18],["imgblaze.net",18],["imgfrost.net",18],["pixsera.net",18],["vestimage.site",18],["imgwia.buzz",18],["imglina.xyz",18],["imgowk.buzz",18],["imgokr.buzz",18],["imgoiu.buzz",18],["imgiut.buzz",18],["imgizw.buzz",18],["imgux.buzz",18],["imgewe.buzz",18],["imguebr.buzz",18],["imgqew.buzz",18],["imgbew.buzz",18],["imguo.buzz",18],["imgxxxx.buzz",18],["imgeza.buzz",18],["imgzzzz.buzz",18],["imgkuz.buzz",18],["imgxhfr.buzz",18],["imgqwt.buzz",18],["imgtwq.buzz",18],["imgbjryy.buzz",18],["imgjetr.buzz",18],["imgxelz.buzz",18],["imgytreq.buzz",18],["hfneiott.buzz",18],["mrlzqoe.buzz",18],["utinwpqqui.buzz",18],["pyotinle.buzz",18],["velnibug.buzz",18],["optiye.buzz",18],["imgxza.buzz",18],["imgbeaw.buzz",18],["imgnfg.buzz",18],["imguqkt.buzz",18],["imgxhgh.buzz",18],["imgwelz.buzz",18],["pixnbvj.buzz",18],["imgxkhm.buzz",18],["imagepuitr.buzz",18],["imagent.buzz",18],["imagenx.buzz",18],["imgjtuq.buzz",18],["pichtyyy.buzz",18],["imgxabb.buzz",18],["imgxann.buzz",18],["imgkixx.buzz",18],["im1.buzz",18],["tr.link",19],["bolicheintercambios.net",20],["cshort.org",21],["dosya.tc",22],["cloudemb.com",23],["ythub.cc",24],["easymp3converter.com",25],["go-mp3.com",26],["lineageos18.com",27],["coinsearns.com",28],["luckydice.net",28],["ytsubme.com",29],["driveup.in",30],["shiba-faucoin.com",31],["mp3juices.yt",32],["chillx.top",33],["beastx.top",33],["playerx.stream",33],["1ytmp3.com",34],["bestmp3converter.com",34],["clickmp3.com",34],["hentaiworld.tv",35],["video-to-mp3-converter.com",36]]);

/******************************************************************************/

const scriptlet = (
    needle = '',
    delay = '',
    options = ''
) => {
    const newSyntax = /^[01]?$/.test(needle) === false;
    let pattern = '';
    let targetResult = true;
    let autoRemoveAfter = -1;
    if ( newSyntax ) {
        pattern = needle;
        if ( pattern.startsWith('!') ) {
            targetResult = false;
            pattern = pattern.slice(1);
        }
        autoRemoveAfter = parseInt(delay);
        if ( isNaN(autoRemoveAfter) ) {
            autoRemoveAfter = -1;
        } 
    } else {
        pattern = delay;
        if ( needle === '0' ) {
            targetResult = false;
        }
    }
    if ( pattern === '' ) {
        pattern = '.?';
    } else if ( /^\/.+\/$/.test(pattern) ) {
        pattern = pattern.slice(1,-1);
    } else {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const rePattern = new RegExp(pattern);
    const createDecoy = function(tag, urlProp, url) {
        const decoy = document.createElement(tag);
        decoy[urlProp] = url;
        decoy.style.setProperty('height','1px', 'important');
        decoy.style.setProperty('position','fixed', 'important');
        decoy.style.setProperty('top','-1px', 'important');
        decoy.style.setProperty('width','1px', 'important');
        document.body.appendChild(decoy);
        setTimeout(( ) => decoy.remove(), autoRemoveAfter * 1000);
        return decoy;
    };
    window.open = new Proxy(window.open, {
        apply: function(target, thisArg, args) {
            const url = args[0];
            if ( rePattern.test(url) !== targetResult ) {
                return target.apply(thisArg, args);
            }
            if ( autoRemoveAfter < 0 ) { return null; }
            const decoy = /\bobj\b/.test(options)
                ? createDecoy('object', 'data', url)
                : createDecoy('iframe', 'src', url);
            let popup = decoy.contentWindow;
            if ( typeof popup === 'object' && popup !== null ) {
                Object.defineProperty(popup, 'closed', { value: false });
            } else {
                const noopFunc = (function(){}).bind(self);
                popup = new Proxy(self, {
                    get: function(target, prop) {
                        if ( prop === 'closed' ) { return false; }
                        const r = Reflect.get(...arguments);
                        if ( typeof r === 'function' ) { return noopFunc; }
                        return target[prop];
                    },
                    set: function() {
                        return Reflect.set(...arguments);
                    },
                });
            }
            return popup;
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

