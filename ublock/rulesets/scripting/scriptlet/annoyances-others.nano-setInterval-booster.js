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

(function uBOL_nanoSetIntervalBooster() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"timer\",\"*\",\"0.001\"]","[\"wait\",\"*\",\"0.02\"]","[\"count\",\"*\",\"0.02\"]","[\"counter\",\"*\",\"0.02\"]","[\"download\",\"*\",\"0.02\"]","[\"timer\",\"\",\"0.02\"]","[\"timeLeft\",\"*\",\"0.02\"]","[\"timeLeft\",\"\",\"0.02\"]","[\"/_0x|wpsafe-/\",\"*\",\"0.02\"]","[\"Download\",\"*\",\"0.02\"]","[\"counter--\",\"*\",\"0.02\"]","[\"count--\",\"*\",\"0.02\"]","[\"time\",\"*\",\"0.02\"]","[\"p--\",\"\",\"0.02\"]","[\"current()\",\"*\",\"0.02\"]","[\"wpsafe-\",\"*\",\"0.02\"]","[\"disabled\",\"*\",\"0.02\"]","[\"timePassed\",\"*\",\"0.02\"]","[\"countdown\",\"*\",\"0.02\"]","[\"/Seconds|download/\",\"*\",\"0.02\"]","[\"download_progress\",\"*\",\"0.02\"]","[\"count\",\"1600\",\"0.02\"]","[\"downloadButton\",\"*\",\"0.02\"]","[\"waitTime\",\"*\",\"0.02\"]","[\"timer\",\"*\",\"0.02\"]","[\"timeSec--\",\"*\",\"0.02\"]","[\"_0x\",\"*\",\"0.02\"]","[\"/innerHTML|count/\",\"*\",\"0.02\"]","[\"wpsafe-generate\",\"*\",\"0.02\"]","[\"document.hidden\",\"*\",\"0.02\"]","[\"#mdtimer\",\"\",\"0.02\"]","[\"updatePercentage\",\"*\",\"0.02\"]","[\"timePassed\",\"\",\"0.02\"]","[\"DOWNLOAD\",\"*\",\"0.02\"]","[\"Number\",\"\",\"0.02\"]","[\"/counter|wait/\",\"*\",\"0.02\"]","[\"get-link\",\"*\",\"0.02\"]","[\"cont\",\"*\",\"0.02\"]","[\"\",\"dataType:_\",\"1000\",\"0.02\"]","[\"/wpsafe|count/\",\"*\",\"0.02\"]","[\"downloadToken\",\"*\",\"0.02\"]","[\"/timeLeft|wpsafe-/\",\"*\",\"0.02\"]","[\"cnDownloadBtn\",\"*\",\"0.02\"]","[\"download_link\",\"*\",\"0.02\"]","[\"secondsleft\",\"*\",\"0.02\"]","[\"countdown\",\"\",\"0.02\"]","[\"yuidea-\",\"*\",\"0.02\"]","[\"timer--\",\"*\",\"0.02\"]","[\"success\",\"\",\"0.02\"]","[\"/verify_text|isCompleted/\",\"*\",\"0.02\"]","[\"#timer\",\"\",\"0.02\"]","[\"countdownwrapper\",\"\",\"0.02\"]","[\"timeleft\",\"*\",\"0.02\"]","[\"contador\",\"*\",\"0.02\"]","[\"Your Link\",\"\",\"0.02\"]","[\"count\",\"\",\"0.02\"]","[\"/download|Please/\",\"\",\"0.02\"]","[\"downloadButton\",\"\",\"0.02\"]","[\"window.location.href= atob(\",\"1000\",\"0.02\"]","[\".show_download_links\",\"\",\"0.02\"]","[\"download-btn\",\"\",\"0.02\"]","[\"updatePercentage\",\"100\",\"0.02\"]","[\"decodeURIComponent(link)\",\"\",\"0.02\"]","[\"/count-|-wait/\",\"*\",\"0.02\"]","[\"waktu--\",\"\",\"0.02\"]","[\".download\",\"\",\"0.02\"]","[\"/base-timer-label|waktu--/\",\"\",\"0.02\"]","[\"curCount\",\"\",\"0.02\"]","[\"Please wait\",\"\",\"0.02\"]","[\"mdtimer\",\"\",\"0.02\"]","[\"gotolink\",\"*\",\"0.02\"]","[\"seconds--\",\"*\",\"0.02\"]","[\"claim_button\",\"*\",\"0.02\"]","[\"/Please Wait|Generating Links/\",\"*\",\"0.02\"]","[\"#second\",\"\",\"0.02\"]","[\"#countdown\",\"\",\"0.02\"]","[\"progressbar\",\"30\",\"0.02\"]","[\"#upbtn\",\"\",\"0.02\"]","[\"skip-btn\",\"*\",\"0.02\"]","[\"tp-\",\"*\",\"0.02\"]","[\"downloadTimer\",\"\",\"0.02\"]","[\"/Please Wait|Go to download/\",\"\",\"0.02\"]","[\"counter\",\"\",\"0.02\"]","[\"/counter--|downloadButton/\",\"\",\"0.02\"]","[\"location\",\"\",\"0.02\"]","[\"counter--\",\"\",\"0.02\"]","[\"pleasewait\",\"\",\"0.02\"]","[\"bb_download_delay\",\"\",\"0.02\"]","[\"0x\",\"\",\"0.02\"]","[\"timeCount\",\"*\",\"0.2\"]","[\"counter\",\"2000\",\"0.02\"]","[\"downloadLinkButton\",\"*\",\"0.02\"]","[\"startChecking\",\"*\",\"0.02\"]","[\"timer\",\"1000\",\"0.02\"]","[\"timeleft\",\"\",\"0.02\"]","[\"show_download_links\",\"\",\"0.02\"]","[\"REDIRECTING\",\"*\",\"0.02\"]","[\"ct\",\"1000\",\"0.02\"]","[\"sec--\",\"\",\"0.02\"]","[\"count--\",\"\",\"0.02\"]","[\"sec\",\"\",\"0.02\"]","[\"wpsafe-\",\"\",\"0.02\"]","[\"wpsafe-\",\"2000\",\"0.02\"]","[\"wpsafe-\",\"1500\",\"0.02\"]","[\"get-link\",\"\",\"0.02\"]","[\"download\",\"2000\",\"0.02\"]","[\"timer\",\"1500\",\"0.02\"]","[\"timer\",\"2000\",\"0.02\"]","[\"Link\",\"550\",\"0.02\"]","[\"#proceed\",\"\",\"0.02\"]","[\"counter\",\"1800\",\"0.02\"]","[\"downloadButton\",\"1500\",\"0.02\"]","[\"sp-count-down\",\"\",\"0.02\"]","[\"gotolink\",\"\",\"0.02\"]","[\"btngetlink\",\"30\",\"0.02\"]","[\"btn\",\"\",\"0.02\"]","[\"/show_download_links|downloadTimer/\",\"\",\"0.02\"]","[\"timeinterval\",\"\",\"0.02\"]","[\"countDown\",\"1150\",\"0.5\"]","[\"makingdifferenttimer\",\"50\",\"0.02\"]","[\"Link()\",\"\",\"0.02\"]","[\"time\",\"\",\"0.02\"]","[\"time\",\"2500\",\"0.02\"]","[\"freeRemind\",\"\",\"0.02\"]","[\"contador\",\"\",\"0.02\"]","[\"contador--\",\"\",\"0.02\"]","[\"counter--\",\"1300\",\"0.02\"]","[\"seconds\",\"\",\"0.02\"]","[\"downloadButton\",\"1000\",\"0.02\"]","[\"counter\",\"1000\",\"0.02\"]","[\"wpsafe-generate\",\"\",\"0.02\"]","[\"timerText\",\"\",\"0.02\"]","[\"#counter\",\"\",\"0.02\"]","[\"counter\",\"1500\",\"0.02\"]","[\"download-count-down\",\"\",\"0.02\"]","[\"runTimer\",\"\",\"0.02\"]","[\"[0x\",\"\",\"0.02\"]","[\"#download\",\"\",\"0.02\"]","[\"percentVal\",\"30\",\"0.02\"]","[\"wpsafe-generate\",\"1000\",\"0.02\"]","[\"wpsafe\",\"\",\"0.02\"]","[\"timer\",\"1000\",\"0.6\"]","[\"\",\"1000\",\"0.05\"]","[\"second--\",\"\",\"0.02\"]","[\"#bt\",\"\",\"0.02\"]","[\"counter--\",\"100\",\"0.02\"]","[\"#Download-Card\",\"\",\"0.02\"]","[\".stop()\",\"\",\"0.02\"]","[\"counter\",\"1000\",\"0.5\"]","[\"Link will appear\",\"510\",\"0.02\"]","[\"Link will appear\",\"1010\",\"0.02\"]","[\"countdown\",\"2000\",\"0.02\"]","[\"sayimiBaslat\",\"\",\"0.02\"]","[\"wpsafe-link\",\"2000\",\"0.02\"]","[\"#eg-timer\",\"\",\"0.3\"]","[\"#CountDown\",\"\",\"0.02\"]","[\"dllink\",\"\",\"0.02\"]","[\"time--\",\"\",\"0.02\"]","[\"stop()\",\"\",\"0.02\"]","[\"second\",\"1000\",\"0.02\"]","[\"wait_seconds\",\"\",\"0.02\"]","[\"download-countdown\",\"\",\"0.02\"]","[\"current_progress\",\"2000\",\"0.02\"]","[\"display()\",\"\",\"0.02\"]","[\"get_link\",\"\",\"0.02\"]","[\"goToLink\",\"2200\",\"0.02\"]","[\".countdown\",\"2000\",\"0.02\"]","[\"urll\",\"800\",\"0.02\"]","[\"Downloading\",\"\",\"0.02\"]","[\"linkDL\",\"\",\"0.02\"]","[\"downloadButton\",\"2400\",\"0.02\"]","[\"#pleasewait\",\"\",\"0.02\"]","[\".fcounter span\",\"\",\"0.02\"]","[\"real-link\",\"\",\"0.02\"]","[\".wpapks-download-link-wrapper\",\"\",\"0.02\"]","[\"(i-1)\",\"\",\"0.02\"]","[\"fcounter\",\"\",\"0.02\"]","[\"show_ag\",\"\",\"0.02\"]","[\"timer\",\"700\",\"0.02\"]","[\"clock()\",\"1000\",\"0.02\"]","[\".countdown\",\"\",\"0.02\"]","[\"secondsLeft\",\"\",\"0.02\"]","[\"timeLeft--\",\"\",\"0.02\"]","[\"/_0x[\\\\s\\\\S]*?decodeURIComponent/\",\"\",\"0.02\"]","[\"count-\",\"\",\"0.02\"]","[\"#download-popup\",\"\",\"0.02\"]","[\".timer\",\"\",\"0.02\"]","[\"#download_menu\",\"\",\"0.02\"]","[\"r--\",\"\",\"0.02\"]","[\"showDownloadButton\",\"\",\"0.02\"]","[\"download_link\",\"\",\"0.02\"]","[\"onLoop\",\"\",\"0.02\"]","[\"timer.remove\",\"\",\"0.02\"]","[\"download\",\"\",\"0.02\"]","[\"i--\",\"\",\"0.02\"]"];

const hostnamesMap = new Map([["insuranceinfos.in",0],["covemarkets.com",1],["finclub.in",2],["financeyogi.net",2],["trangchu.news",2],["downfile.site",2],["player.pelisgratishd.io",2],["doibihar.org",2],["educationgyani.com",2],["ffworld.xyz",2],["gawbne.com",2],["forex-trnd.com",[2,30]],["forex-golds.com",2],["novelsapps.com",3],["codesnse.com",3],["speedtorrent.ru",3],["listas.pro",3],["forexit.io",3],["healthy4pepole.com",[3,80,82]],["sitecuatui.xyz",3],["haonguyen.top",3],["androjungle.com",4],["getmodsapk.com",4],["go.freetrx.fun",5],["wpking.in",5],["yifysubtitles.me",5],["michaelemad.com",5],["shtms.co",5],["gitizle.vip",5],["ay.live",5],["techrfour.com",5],["theicongenerator.com",5],["multilinkfz.xyz",5],["yindex.xyz",5],["unityassetcollection.com",5],["earningradar.com",5],["findi.pro",5],["uzunversiyon.xyz",5],["direkizle.xyz",5],["tamindir.mobi",5],["gitlink.pro",5],["aylink.co",5],["moretvtime.com",5],["urlpay.net",5],["claim4.fun",5],["mixrootmods.com",6],["consoleroms.com",6],["romspedia.com",6],["edummm.xyz",6],["shortlinks.tech",7],["dramaworldhd.co",7],["bitefaucet.com",7],["filmypoints.in",[8,15]],["vinstartheme.com",9],["instamod.net",9],["jenismac.com",10],["unityassets4free.com",10],["spacebin.site",10],["freemodapks.com",10],["player.repelis24.rs",11],["makimbo.xyz",12],["dyp.li",13],["linku.to",14],["oneslidephotography.com",15],["apasih.my.id",15],["financekami.com",15],["bico8.com",15],["techyinfo.in",15],["smallinfo.in",15],["techymedies.com",15],["disheye.com",15],["ufacw.com",15],["googledrivelinks.com",15],["technicalatg.com",[15,24]],["worldmak.com",15],["ftuapps.dev",15],["dl.tech-story.net",15],["themorningtribune.com",15],["veganho.co",15],["veganal.co",15],["mosqam.com",15],["bimo-cash.readi.online",15],["blog.textpage.xyz",15],["claimlite.club",15],["bitcomarket.net",15],["1apple.xyz",15],["mcrypto.club",[15,130]],["gamepure.in",15],["mad.goiety.com",15],["veganab.co",15],["apkmaven.io",15],["gaminplay.com",[15,46,103]],["choiceappstore.xyz",15],["pn.cgchotbox.com",15],["worldappsstore.xyz",15],["gifans.com",15],["iptvjournal.com",15],["kienthucrangmieng.com",15],["coin-free.com",15],["moddingzone.in",15],["insurance-space.xyz",15],["blognews.in",15],["noithatmyphu.vn",15],["dulichkhanhhoa.net",15],["therootdroid.com",15],["7apple.net",15],["arhplyrics.in",15],["netfile.cc",15],["jardima.com",15],["courseforfree.com",15],["tutorial.siberuang.com",15],["segurosdevida.site",15],["surl.li",16],["bankvacency.com",17],["indilinks.xyz",18],["discordbotlist.com",18],["maxsilo.in",19],["starfiles.co",20],["nguyenvanbao.com",21],["androidecuatoriano.xyz",22],["sinonimos.de",23],["atlai.club",23],["blogtechh.com",25],["vavada5com.com",25],["financerites.in",25],["financerites.com",25],["vocalley.com",25],["howifx.com",25],["enit.in",25],["skincarie.com",25],["imperialstudy.com",25],["diudemy.com",26],["techboyz.xyz",26],["adslink.pw",26],["mdn.lol",27],["amritadrino.com",28],["3dzip.org",29],["3rabsnews.com",30],["mobileprice.site",30],["bestmobilenew.com",30],["linkjust1.com",30],["vidtome.stream",30],["ta2deem7arbya.com",[31,69]],["eda-ah.com",[31,69]],["modzilla.in",32],["garutpos.com",32],["vrcmods.com",32],["garutexpress.id",32],["getfreecourses.co",33],["dosya.hizliresim.com",34],["vebma.com",35],["pinloker.com",35],["sekilastekno.com",35],["blogmado.com",36],["suaurl.com",37],["webhostingpost.com",38],["wikitraveltips.com",39],["naukrilelo.in",39],["fikper.com",40],["freecoursesonline.me",41],["codingnepalweb.com",[42,126]],["misirtune.blogspot.com",43],["userload.co",44],["dizimini.com",45],["mohammedkhc.com",45],["trendyoum.com",45],["dl.indexmovies.xyz",45],["cheatsquad.gg",45],["mcpedl.com",45],["filese.me",45],["linkslo.com",45],["c1ne.co",45],["pearos.xyz",45],["moddedguru.com",45],["py.md",45],["abhaydigitalmarketer.com",45],["bestshort.xyz",45],["moaplos.com",45],["nullslide.com",45],["mage.si",45],["embed.m3u-cdn.live",45],["embed.tvcdn.live",45],["mastercoria.com",45],["gamelopte.com",46],["insurglobal.xyz",46],["sevenjournals.com",46],["digworm.io",47],["br0wsers.com",[48,177]],["hashhackers.com",49],["katdrive.net",49],["newsongs.co.in",49],["altblogger.net",50],["cashearn.cc",50],["subscene.vip",50],["safelink.omglyrics.com",50],["4download.net",50],["acortar.info",50],["kotp1000000.xyz",50],["blog.donia-tech.net",50],["anomize.xyz",50],["boardgamesonline.net",50],["freeudemycourse.com",51],["modshost.net",52],["coincity.in",52],["djxmaza.in",52],["examtadka.com",52],["proviralhost.com",52],["urbharat.xyz",52],["codenova-center.web.app",53],["minecraftalpha.net",54],["aeromods.app",55],["whatsaero.com",55],["pahe.win",55],["financeflix.in",55],["technoflip.in",55],["studyranks.in",55],["flightsim.to",55],["hikarinoakari.com",55],["hikarinoakariost.info",55],["recipesdelite.com",56],["edumaz.com",57],["blisseyhusband.in",57],["bingotingo.com",57],["compressware.in",57],["geektopia.info",57],["freecoursewebsite.com",57],["dosyayukle.biz",57],["freetutorialsus.com",57],["apkmos.com",57],["sfile.mobi",57],["notipostingt.com",58],["cmacked.com",59],["movieflixpro.com",59],["gocmod.com",60],["speedynews.xyz",61],["xmod.in",61],["tecmundo.net",61],["crazyblog.in",[61,101,102]],["studyuo.com",[61,101,102]],["sbkaise.in",61],["janusnotes.com",61],["anime-sanka.com",62],["kiemlua.com",[63,90,133]],["world-trips.net",[63,94]],["newforex.online",[63,90]],["pes-patches.com",64],["data.morsodifame.com",64],["ifile.cc",64],["filemoon.sx",65],["truongblogger.top",66],["koyi.pub",67],["thizissam.in",[68,85]],["alphaantileak.net",68],["o-pro.online",69],["mazen-ve.com",69],["animeuploader.com",69],["konstantinova.net",69],["ontools.net",70],["teknopaid.xyz",70],["asdfiles.com",71],["11bit.co.in",72],["spantechie.com",73],["paste1s.com",74],["note1s.com",74],["easylinkref.com",74],["redirect.dafontvn.com",[75,76]],["samapkstore.com",[75,76]],["andronews18.blogspot.com",[75,76]],["ph.tpaste.net",[75,76]],["sdetectives.id",75],["apps2app.com",75],["pro-bangla.com",75],["cheatermad.com",77],["streamcheck.link",78],["tinyurl.so",78],["tinyurl.is",78],["usanewstoday.club",79],["earnme.club",79],["top1iq.com",80],["sama-pro.com",80],["7misr4day.com",[80,98]],["coursefreedl.com",80],["apkmaza.net",80],["jpopsingles.eu",80],["gplinks.co",80],["mobiget.net",80],["newzflair.com",81],["newzmagic.com",81],["adlice.com",82],["yalla-shoot-now.us",82],["forexeen.us",82],["health-and.me",82],["wondervelocity.com",82],["bluetechno.net",82],["world2our.com",82],["mobi2c.com",[82,90]],["mywatchseries.fun",82],["telepisodes.org",82],["kingtalks.net",82],["maxurlz.com",82],["allcryptoz.net",82],["topcryptoz.net",82],["thaitrieuvi.live",82],["freewebcart.com",82],["safe.kangkimin.com",82],["maxservicesi.com",82],["techhelpbd.com",83],["egyfalcons.com",84],["filessrc.com",85],["srcimdb.com",85],["udemycourses.me",85],["eu.tapchipi.com",85],["short.ctvb1.info",85],["citychilli.com",85],["psdly.com",85],["desitvshows.xyz",85],["katmoviehd4.com",85],["download.modsofapk.com",85],["infopedia24.com",85],["linkdecode.com",85],["short-ly.co",86],["upshrink.com",86],["jojo-themes.net",87],["diglink.blogspot.com",88],["th-world.com",88],["za.gl",89],["za.uy",89],["rezence.com",90],["techmody.io",[90,110]],["yoshare.net",90],["mikl4forex.com",[90,133]],["publicananker.com",[90,133]],["aemenstore.com",90],["cazzette.com",90],["truebrandy.com",90],["hookeaudio.com",90],["restorbio.com",90],["medcpu.com",90],["alocd.com",90],["forex-gold.net",[90,94]],["kingsleynyc.com",90],["lucidcam.com",90],["staaker.com",90],["byboe.com",90],["thegoneapp.com",90],["nousdecor.com",90],["alobuu.com",[90,133]],["rodjulian.com",[90,133]],["aloass.com",[90,133]],["taisv.com",[90,133]],["aloguy.com",[90,133]],["alohdd.com",[90,133]],["alogum.com",[90,133]],["alobyt.com",[90,133]],["aloboi.com",[90,133]],["uebnews.online",[90,133]],["aloegg.com",[90,133]],["alofps.com",[90,133]],["pennbookcenter.com",[90,133]],["samfirms.com",91],["appsmodz.com",92],["cararegistrasi.com",93],["healdad.com",94],["gamalk-sehetk.com",94],["hamsterss.website",95],["romadd.com",95],["apkmb.com",95],["boobychristmas.com",96],["ethereumfaucet.info",97],["tutcourse.com",98],["luckydice.net",98],["coinsearns.com",98],["forexrw7.com",98],["fx-22.com",98],["forexmab.com",98],["forexwaw.club",98],["forex-articles.com",98],["linkjust.com",98],["forexlap.com",98],["gdfreak.xyz",98],["doctor-groups.com",98],["crypto-faucet.xyz",98],["mik4mob.com",98],["iklandb.com",98],["urapk.com",98],["dogemate.com",[98,144]],["shorteet.com",98],["earnbits.xyz",98],["bitearns.com",98],["girls-like.me",99],["sonixgvn.net",99],["apkcell.net",99],["runmods.com",99],["watchdoge.xyz",100],["informatikamu.id",[101,102]],["technicalatg.xyz",[101,102]],["taregna.com",[101,102]],["toolss.net",[101,102]],["tutsgalaxy.net",[101,102]],["otomi-games.com",[102,139]],["yifysub.net",104],["cdmstudy.site",105],["insurance.recipesdelite.com",105],["allbuzzin.com",[106,107]],["file.bospedia.com",108],["toptap.website",109],["adnit-tri.tk",109],["boomx5.com",109],["howtofree.org",111],["rethmic.com",112],["majidzhacker.com",[113,114]],["itscybertech.com",115],["shareappscrack.com",116],["oiipdf.com",117],["upstore.net",118],["subs4series.com",119],["gamingforecast.com",120],["icutlink.com",121],["android-apk.org",121],["semawur.com",121],["zegtrends.com",122],["littlebyte.net",123],["megadescargas.net",124],["blyts.net",124],["lawebdelprogramador.com",125],["win10.vn",127],["wildfaucets.ml",127],["faucet.cryptourl.net",127],["dogeatm.com",127],["claimbits.io",127],["i-bits.io",127],["diamondfaucet.space",127],["gobits.io",127],["russiacoin.xyz",127],["starsfaucet.com",127],["lionltcfaucet.xyz",127],["faucet.shorterall.com",127],["yellowfaucet.ovh",127],["bollypluse.in",128],["freecourseslab.com",129],["freetutorialseu.com",129],["informaxonline.com",[130,153]],["tipslearn.com",130],["androidnougatapk.com",130],["siberuang.com",130],["waaboom.com",130],["healthymaster.xyz",130],["bkksnews.xyz",130],["faucetcrypto.com",131],["techoow.com",132],["mynewsmedia.in",133],["mynewshub.co",133],["techbigs.com",134],["kiktu.com",135],["technicalegy.com",136],["wallpaperaccess.com",137],["uniqueten.net",140],["ultraten.net",140],["elil.cc",141],["game-kentang.blogspot.com",142],["upfile.us",142],["mad4wheels.com",143],["moviesdaweb.blogspot.com",145],["dlsharefile.com",146],["eco-area.com",147],["bittools.net",148],["safelink.rezkozpatch.xyz",[149,150]],["onlinecoursebay.com",151],["kazanclilink.com",152],["emulatorgames.net",154],["iptv4best.com",155],["leechall.com",156],["kpopstan.com",157],["ouo.io",158],["cpmlink.net",158],["short-url.link",159],["findicons.com",160],["nulleb.com",161],["bfas237blog.info",162],["dr-farfar.net",163],["saungfirmware.id",164],["goossh.com",165],["onlinefreecourse.net",166],["site.dz4win.com",167],["thingiverse.com",168],["linkerload.com",169],["ockles.com",169],["ljutkeunvpn.blogspot.com",169],["mobilelegends.shop",169],["linksaya.com",170],["phpscripttr.com",171],["essek.gen.tr",171],["indir.turkceyama.net",171],["clicads.fr",171],["mazakony.net",171],["5mod-file.ru",172],["genlink.cc",173],["apkprofree.com",174],["zedge.net",175],["hakdisk.ru",176],["diskapk.ru",176],["softwaresde.com",177],["tr.link",178],["dooood.com",180],["dood.yt",180],["dood.re",180],["dood.wf",180],["dood.la",180],["dood.pm",180],["dood.so",180],["dood.to",180],["dood.watch",180],["dood.ws",180],["nightfallnews.com",181],["retrostic.com",182],["shiroyasha.me",183],["bolicheintercambios.net",184],["lg-firmwares.com",185],["sfirmware.com",185],["imgxuh.cfd",186],["imgngc.sbs",186],["imgezx.sbs",186],["imgxza.store",186],["imgwqr.online",186],["imagehaha.com",186],["imgpukrr.site",186],["imagent.buzz",186],["imagepuitr.buzz",186],["imgblaze.net",186],["imgkorle.buzz",186],["imgkaka.xyz",186],["pixsera.net",186],["imgfrost.net",186],["imgair.net",186],["wallpaperplay.com",187],["lnk.parts",188],["lnk.news",188],["sammobile.com",189],["bomurl.com",190],["go.geghost.com",191],["romhustler.org",192],["a2zupload.com",193],["dl.pcgamestorrents.org",194],["get-url.com",194]]);

const entitiesMap = new Map([["lootlinks",55],["ibomma",69],["animesanka",138],["akwam",179],["bluemediafile",194],["bluemediafiles",194]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function nanoSetIntervalBooster(
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
    self.setInterval = new Proxy(self.setInterval, {
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
    try { nanoSetIntervalBooster(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
