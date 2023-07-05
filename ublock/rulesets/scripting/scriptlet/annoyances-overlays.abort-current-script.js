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

(function uBOL_abortCurrentScript() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"$\",\"advBlock\"]","[\"$\",\"showAd\"]","[\"document.createElement\",\"admiral\"]","[\"document.createElement\",\"googletag\"]","[\"getComputedStyle\",\"adsbygoogle\"]","[\"setTimeout\",\"none\"]","[\"onload\",\"adsbygoogle\"]","[\"document.getElementById\",\"').style.display='block';\"]","[\"RegExp\",\"AdvBot\"]","[\"$\",\"AdBlock\"]","[\"$\",\"!document.getElementById(btoa\"]","[\"navigator.userAgent\",\"AdBlockOn\"]","[\"document.write\",\"ag_adBlockerDetected\"]","[\"document.createElement\",\"adblockInfo\"]","[\"document.getElementById\",\"blocking = true\"]","[\"document.addEventListener\",\"adjs\"]","[\"$\",\"can_show_ads\"]","[\"EventTarget.prototype.addEventListener\",\"adblockalert_status\"]","[\"_lcpdfr\",\"renderedAnnoyance\"]","[\"document.getElementById\",\"ad blocker\"]","[\"document.createElement\",\"pagead2.googlesyndication.com\"]","[\"document.addEventListener\",\"/abisuq/\"]","[\"onload\",\"ad.offsetWidth\"]","[\"atob\",\"-10000px\"]","[\"document.getElementById\",\".style.display\"]","[\"document.getElementById\",\"flex\"]","[\"document.getElementById\",\"adblock\"]","[\"document.getElementById\",\".style.display=\"]","[\"$\",\"ad\"]","[\"$\",\"Please disable \\\"ad blocker\\\"\"]","[\"$\",\"Adblock\"]","[\"document.getElementById\",\"adback\"]","[\"document.querySelector\",\"getBoundingClientRect\"]","[\"EventTarget.prototype.addEventListener\",\"window.getComputedStyle\"]","[\"document.getElementById\",\"/window\\\\.onclick/\"]","[\"document.getElementById\",\"/!document\\\\.getElementById[\\\\s\\\\S]*?innerHTML[\\\\s\\\\S]*?insertBefore/\"]","[\"jQuery\",\"donateBoxId\"]","[\"$popup\",\"magnificPopup\"]","[\"$\",\"#mod-popup\"]","[\"jQuery\",\"covid19_modal\"]","[\"$\",\"#saveBig\"]","[\"$\",\"modal_newsletter\"]","[\"$\",\"FBF.modalWindow.show\"]","[\"askPermission\",\"\"]","[\"DS_Popup_1\"]","[\"$\",\"#myModal\"]","[\"$\",\"contextmenu\"]","[\"$\",\"preventDefault\"]","[\"document.onselectstart\"]","[\"document.oncontextmenu\"]","[\"disableselect\",\"reEnable\"]","[\"image_save_msg\",\"key\"]","[\"$\",\"hidden\"]","[\"jQuery\",\"right_click_restriction\"]","[\"$\",\"adblock\"]","[\"document.getElementById\",\"advert-tester\"]","[\"$\",\"copyHolder\"]","[\"jQuery\",\"#sign-up-popup\"]","[\"jQuery\",\"overlay\"]","[\"document.onkeydown\"]","[\"document.getElementById\",\"ad-blocker\"]","[\"document.getElementById\",\".ab_detected\"]","[\"document.getElementById\",\"undefined\"]","[\"jQuery\",\"tweaker\"]","[\"jQuery\",\"undefined\"]","[\"jQuery\",\"ads\"]","[\"document.getElementById\",\"block\"]","[\"document.getElementById\",\"adsChecker\"]","[\"document.addEventListener\",\"alert\"]","[\"document.ondragstart\",\"document.oncontextmenu\"]","[\"jQuery\",\"document\"]","[\"document.getElementById\",\"tester\"]","[\"jQuery\",\"restriction\"]","[\"document.onkeydown\",\"keyCode\"]","[\"document.oncontextmenu\",\"document.onselectstart\"]","[\"message\",\"clickIE\"]","[\"preventSelection\"]","[\"jQuery\",\"contextmenu\"]","[\"jQuery\",\"Drupal\"]","[\"$\",\"blur\"]","[\"reEnable\",\"killcopy\"]","[\"$\",\"load\"]","[\"document.addEventListener\",\"copy\"]","[\"document.getElementsByTagName\",\"null\"]","[\"eval\",\"abd\"]","[\"jQuery\",\"ai_adb\"]","[\"document.getElementById\",\"none\"]","[\"$\",\"undefined\"]","[\"document.addEventListener\"]","[\"document.oncontextmenu\",\"key\"]","[\"document.onmousedown\"]","[\"addEventListener\",\"which\"]","[\"window.addEventListener\",\"ctrlKey\"]","[\"document.createElement\",\"adblock\"]","[\"document.getElementById\",\"banner\"]","[\"document.getElementById\",\"dataLayer\"]","[\"jQuery\",\"disable_hot_keys\"]","[\"onload\"]","[\"document.oncopy\"]","[\"$\",\"offsetHeight\"]","[\"disableSelection\"]","[\"jQuery\",\"ai_check\"]","[\"onload\",\"contextmenu\"]","[\"document.ondragstart\"]","[\"$\",\"copy\"]","[\"document.getElementById\",\"adblockerdetected\"]","[\"$\",\"juicyads\"]","[\"$\",\"showEmailNewsletterModal\"]","[\"$\",\"btoa\"]","[\"disableSelection\",\"reEnable\"]","[\"$\",\".height\"]","[\"eval\",\"isNaN\"]","[\"document.addEventListener\",\"contribute\"]","[\"document.getElementsByTagName\",\"admiral\"]","[\"addEventListener\",\"ctrlKey\"]","[\"setTimeout\",\"newsletterPopup\"]","[\"window.oncontextmenu\"]","[\"event\",\"stopPropagation\"]","[\"soclInit\"]","[\"onload\",\"setTimeout\"]","[\"document.addEventListener\",\"preventDefault\"]","[\"setTimeout\",\"offsetHeight\"]","[\"disable_copy\"]","[\"disable_hot_keys\"]","[\"jQuery\",\"copy\"]","[\"addEventListener\",\"adsbygoogle.length\"]","[\"check\",\"debugger\"]","[\"document.addEventListener\",\"document.onselectstart\"]","[\"matchMedia\"]","[\"$\",\"adBlock\"]","[\"jQuery\",\"keydown\"]","[\"jQuery\",\"oncontextmenu\"]","[\"String.prototype.charCodeAt\",\"ai_\"]","[\"jQuery\",\"preventDefault\"]","[\"$\",\"/getScript|error:/\"]","[\"addEventListener\",\"keydown\"]","[\"nocontextmenu\"]","[\"document.getElementById\",\"cookie\"]","[\"document.getElementById\",\"isMoz\"]","[\"console.clear\"]","[\"oncontextmenu\",\"keydown\"]","[\"document.oncontextmenu\",\"nocontextmenu\"]","[\"document.onselectstart\",\"disableselect\"]","[\"document.querySelector\",\"adblock\"]","[\"$\",\"fade\"]","[\"jQuery\",\"stopPropagation\"]","[\"update_visit_count\"]","[\"$\",\"test\"]","[\"$\",\"Promise\"]","[\"showAdblockerModal\"]","[\"stopPrntScr\"]","[\"$\",\"keydown\"]","[\"console.log\",\"devtools\"]","[\"setInterval\",\"playAlert\"]","[\"console.clear\",\"contextmenu\"]","[\"devtoolsDetector\"]","[\"shortcut\"]","[\"console.log\",\"document.referer\"]","[\"document.addEventListener\",\"onkeydown\"]","[\"disableEnterKey\"]","[\"document.getElementsByTagName\",\"unselectable\"]","[\"document.onkeypress\"]","[\"document.addEventListener\",\"contextmenu\"]","[\"wccp_pro_iscontenteditable\"]","[\"document.body.oncontextmenu\"]","[\"nocontext\"]","[\"runPageBugger\"]","[\"eval\",\"contextmenu\"]","[\"ab_tests\"]","[\"jQuery\",\"userAgent\"]","[\"reEnable\"]","[\"jQuery\",\"wccp_pro\"]","[\"clear_body_at_all_for_extentions\"]","[\"RegExp\",\"googlebot\"]","[\"globalThis\",\"DisableDevtool\"]","[\"document.querySelectorAll\",\"adblock\"]","[\"checkAdblockBait\"]","[\"RegExp\",\"debugger\"]","[\"oncontextmenu\"]","[\"navigator\",\"devtools\"]","[\"setInterval\",\"stateObject\"]","[\"setTimeout\",\"debugger\"]","[\"jQuery\",\"keyCode\"]","[\"$\",\"debugger\"]","[\"jQuery\",\"devtool\"]","[\"RegExp\",\"contextmenu\"]","[\"AudiosL10n\"]"];

const hostnamesMap = new Map([["minigames.mail.ru",0],["mmminigames.mail.ru",1],["gamerant.com",2],["timesofisrael.com",2],["gfinityesports.com",2],["teknolojioku.com",2],["siliconera.com",2],["c-span.org",2],["news8000.com",2],["twinfinite.net",2],["pwinsider.com",2],["pastes.io",2],["cheatsheet.com",2],["sportscasting.com",2],["wnd.com",2],["deseret.com",2],["pocketnow.com",2],["10play.com.au",2],["knowyourmeme.com",2],["titantv.com",2],["hfboards.com",2],["howtogeek.com",2],["comingsoon.net",2],["playstationlifestyle.net",2],["worldpopulationreview.com",2],["nationalreview.com",2],["wrestlezone.com",2],["dualshockers.com",2],["thethaiger.com",2],["worldtravelguide.net",2],["sportskeeda.com",2],["gamerjournalist.com",2],["voetbalzone.nl",2],["theurbanlist.com",2],["golf.com",2],["xda-developers.com",2],["metv.com",2],["nbcnews.com",2],["wegotthiscovered.com",2],["savvytime.com",2],["nbcsportsedge.com",2],["haber3.com",2],["androidpolice.com",2],["news.com.au",2],["forums.radioreference.com",2],["boston.com",2],["reviewgeek.com",2],["technicpack.net",2],["theblaze.com",2],["morfix.co.il",2],["factinate.com",2],["phonearena.com",2],["stripes.com",2],["progameguides.com",2],["weatherbug.com",2],["patheos.com",2],["online-tech-tips.com",2],["digitaltrends.com",2],["helpdeskgeek.com",2],["britannica.com",2],["superherohype.com",2],["news24.com",2],["pgatour.com",2],["wral.com",2],["gamepur.com",2],["fin24.com",2],["geekzone.co.nz",2],["upi.com",2],["thewindowsclub.com",2],["androidcure.com",2],["secondnexus.com",2],["health24.com",2],["wokesloth.com",2],["sport24.co.za",2],["onmsft.com",2],["cultofmac.com",2],["washingtontimes.com",2],["sporcle.com",2],["fresnobee.com",2],["fajnegotowanie.pl",2],["esportstales.com",2],["tiger-algebra.com",2],["blackenterprise.com",2],["crooksandliars.com",2],["cmacapps.com",2],["cwtv.com",2],["feral-heart.com",2],["gamerevolution.com",2],["gktoday.in",2],["informazionefiscale.it",2],["inquirer.net",2],["interestingengineering.com",2],["legacy.com",[2,113]],["leitesculinaria.com",2],["nofilmschool.com",2],["obsev.com",2],["pleated-jeans.com",2],["post-gazette.com",2],["practicalclinicalskills.com",2],["ranker.com",2],["sanfoundry.com",2],["simpleflying.com",2],["thegatewaypundit.com",2],["timelessleaf.com",2],["viraliq.com",2],["winhelponline.com",2],["mangasee123.com",3],["steamcollector.com",[4,175]],["gohatori.com",5],["chaynikam.info",6],["winiso.pl",7],["8muses.com",8],["allmusic.com",9],["babiato.co",10],["rangerboard.com",10],["multics.eu",10],["smokingmeatforums.com",[10,108]],["blackhatworld.com",11],["derivative-calculator.net",12],["ebookdz.com",13],["flightsim.to",14],["givee.club",15],["gputracker.eu",16],["ispot.tv",17],["lcpdfr.com",[18,9]],["liveonsat.com",19],["tt1069.com",19],["lowcygier.pl",20],["mangacanblog.com",21],["oglaszamy24.pl",22],["oneman.gr",23],["picmix.com",24],["pixiz.com",25],["portfolio.hu",26],["rocket-league.com",27],["rutab.net",28],["savevideo.me",29],["sharree.com",[30,110]],["techobest.com",31],["textstudio.co",32],["topbestalternatives.com",33],["topbusiness24.ru",34],["mydomsam.ru",34],["hubuhu.ru",34],["moysadinfo.ru",34],["mybusinessplus.ru",34],["dukand.ru",34],["mydizayn.ru",34],["polzadom.ru",34],["umnodachnik.ru",34],["delnyesovety.ru",34],["soverhenie.ru",34],["mirinteresa.ru",34],["uskorit.ru",34],["dskyar.ru",34],["biscand.ru",34],["smartid24.ru",34],["stroysaminfo.ru",34],["topsovety.ru",34],["sotsvetiya.ru",34],["imdaily.ru",34],["turizmnaok.ru",34],["zdorovyobrazzhizni.ru",34],["kinomann.ru",34],["techinfolife.ru",34],["dommoysad.ru",34],["rteinfo.ru",34],["psisovety.ru",34],["kvilit.ru",34],["speshit.ru",34],["ollss.ru",34],["notebookcheck-hu.com",35],["notebookcheck-tr.com",35],["notebookcheck-ru.com",35],["palestinechronicle.com",36],["granadadigital.es",37],["shopxp.com.br",38],["staradvertiser.com",39],["iprovpn.com",40],["universalfreecourse.com",41],["downloadfreecourse.com",41],["firsatbufirsat.com",42],["liga.net",43],["loksado.com",44],["training.javatpoint.com",45],["freewebscript.com",46],["evz.ro",46],["visionias.net",46],["librospreuniversitariospdf.blogspot.com",[46,48,59,97]],["safetxt.net",46],["javbest.xyz",46],["javbix.com",46],["javgrab.com",46],["goalup.live",46],["hatsukimanga.com",46],["47news.jp",46],["japanxxxmovie.com",46],["sexpox.com",46],["ibomma.pw",46],["aepos.ap.gov.in",46],["ssphim.net",[46,59]],["10000recipe.com",46],["themeslide.com",47],["mimaletadepeliculas.blogspot.com",48],["clk.sh",[48,49]],["shrinkearn.com",[48,49]],["luoghidavedere.it",48],["practicetestgeeks.com",[48,49]],["gagetmatome.com",48],["verdadeiroolhar.pt",48],["mt-milcom.blogspot.com",[48,49]],["interviewgig.com",48],["artesacro.org",48],["dailynewsview.com",48],["dailynews.us.com",48],["e-sushi.fr",48],["evasion-online.com",48],["exclusifvoyages.com",48],["f1fastlap.blogspot.com",[48,49]],["naukridisha.in",48],["nydailyquote.com",48],["ouasafat.com",48],["reflectim.fr",[48,49]],["top.howfn.com",48],["kangmartho.com",48],["gnt24365.net",[48,49]],["tvstreampf.xyz",[48,103]],["pvstreams.com",[48,49,59,77]],["7misr4day.com",[48,49]],["mc-mod.net",[49,51]],["fmhikayeleri.com",49],["tinyppt.com",49],["hindi-gk.com",49],["androidmtk.com",49],["badayak.com",49],["runningnews.gr",[49,50]],["kirannewsagency.com",49],["starsunfolded.com",49],["satcesc.com",49],["them4ufree.info",49],["baattv.com",49],["psychologiazycia.com",[49,50]],["tunovelaligera.com",[49,82]],["yeane.org",49],["mtbtutoriales.com",49],["answersafrica.com",49],["felico.pl",49],["legionprogramas.org",49],["serwis-zamkow.com",49],["hebrew4christians.com",49],["jpopsingles.eu",[49,59]],["ghanatvon.com",49],["kusonime.com",[49,59,91]],["otakudesu.org",[49,92]],["idmod.xyz",49],["indcit.com",49],["androidmakale.com",49],["mongri.net",49],["download.ipeenk.com",49],["doranobi-fansub.id",[49,96]],["alexeiportableapp.blogspot.com",49],["oparana.com.br",49],["lolle21.com",49],["mangaid.click",49],["manianomikata.com",49],["tfp.is",49],["dassen-azara4.com",49],["pentruea.com",49],["neyrologos.gr",49],["freerapidleechlist.blogspot.com",49],["ggeguide.com",49],["tanya-tanya.com",[49,109]],["lalawin.com",49],["audioreview.m1001.coreserver.jp",[49,109]],["seikatsu-hyakka.com",49],["elizabeth-mitchell.org",[49,114]],["blasianluvforever.com",49],["movieston.com",[49,77]],["deseneledublate.com",49],["eduardo-monica.com",49],["fmzm.xyz",49],["j-island.net",49],["msubplix.com",49],["upstream.to",49],["ilclubdellericette.it",49],["daum.net",49],["newsforbolly.org",49],["cablegratis.online",49],["dztechphone.com",49],["funivie.org",49],["goodbakery.ru",[49,77]],["ifdreamscametrue.com",[49,124]],["juegosdetiempolibre.org",49],["musicindustryhowto.com",[49,88,103]],["sdelatotoplenie.ru",[49,98]],["sachonthi.com",49],["zdravenportal.eu",[49,127]],["thezealots.org",49],["deportealdia.live",49],["hulnews.top",49],["template.city",49],["truyenbanquyen.com",49],["globaledu.jp",49],["lataifas.ro",[49,131]],["blisseyhusband.in",[49,77]],["openfinanza.it",[49,103]],["followmikewynn.com",49],["starbene.it",49],["bimiacg.net",49],["diaforetiko.gr",49],["tchadcarriere.com",49],["info-beihilfe.de",49],["zgywyd.cn",49],["mercenaryenrollment.com",49],["wawlist.com",[49,59]],["cristelageorgescu.ro",49],["crunchyscan.fr",49],["www-daftarharga.blogspot.com",49],["koszalincity.pl",[49,59]],["theghostinmymachine.com",49],["ilovevaldinon.it",49],["aileen-novel.online",[49,123]],["bumigemilang.com",[49,123]],["bingotingo.com",49],["stream.bunkr.is",49],["blueraindrops.com",49],["sekaikomik.live",49],["privivkainfo.ru",49],["apps2app.com",49],["bestjavporn.com",49],["mm9841.cc",49],["myoplay.club",49],["bpcj.or.jp",49],["cdramalove.com",49],["outidesigoto.com",49],["xemphimaz.com",49],["gourmetscans.net",[49,163]],["awebstories.com",49],["zgbk.com",49],["clujust.ro",[49,103]],["stockpokeronline.com",49],["indianhealthyrecipes.com",[49,59]],["stiridinromania.ro",49],["kooora4lives.net",49],["kooora4livs.com",49],["ferroviando.com.br",[49,170,171,172]],["counciloflove.com",[49,170,171,172]],["infokik.com",[49,170,171,172]],["kulinarnastronamocy.pl",[49,170,171,172]],["jafekri.com",[49,170,171,172]],["paidiatreio.gr",[49,82]],["workhouses.org.uk",49],["dollarvr.com",[49,103]],["newsme.gr",[49,103]],["daily-tohoku.news",[49,100]],["descopera.ro",49],["velicu.eu",49],["arenavalceana.ro",[49,77]],["firmwarefile.com",49],["asianexpress.co.uk",49],["best4hack.blogspot.com",49],["certificationexamanswers.890m.com",49],["cookhero.gr",49],["creative-chemistry.org.uk",49],["deutschaj.com",49],["divineyogaschool.blogspot.com",49],["fabioambrosi.it",49],["flory4all.com",49],["fv2freegifts.org",49],["geniusjw.com",49],["ideas0419.com",49],["jeyran.net",49],["ktm2day.com",49],["letsdownloads.com",49],["limametti.com",49],["luyenthithukhoa.vn",49],["otakukan.com",49],["ribbelmonster.de",49],["untitle.org",49],["uptimeside.webnode.gr",49],["usmleexperiences.review",49],["zoommastory.com",49],["urbanbrush.net",49],["audiotools.in",49],["raindropteamfan.com",49],["manhwahentai.me",49],["ph.ontools.net",49],["scarysymptoms.com",[49,163]],["musicallyvideos.com",49],["mcocguideblog.com",50],["singingdalong.blogspot.com",50],["overlordfree.web.id",50],["tecnotutoshd.net",50],["multifilemirror.com",52],["linkerpt.com",53],["opensubtitles.org",54],["eca-anime.net",55],["braziljournal.com",56],["flyertalk.com",9],["searchenginewatch.com",57],["oggiscuola.com",58],["sabishiidesu.com",59],["banglainsider.com",[59,80]],["animesanka.com",59],["lendagames.com",59],["vinaurl.blogspot.com",[59,128]],["utorrentgamesps2.blogspot.com",59],["articlesmania.me",59],["aksensei.com",59],["dropgalaxy.com",59],["allcryptoz.net",59],["crewbase.net",59],["crewus.net",59],["shinbhu.net",59],["shinchu.net",59],["thumb8.net",59],["thumb9.net",59],["topcryptoz.net",59],["uniqueten.net",59],["ultraten.net",59],["krunkercentral.com",59],["desijugar.net",59],["adslink.pw",59],["genesistls.com",[59,103]],["senpaiediciones.com",[59,103]],["procrackerz.org",[59,103]],["kashmirobserver.net",60],["cathouseonthekings.com",61],["majorgeeks.com",62],["forumbiodiversity.com",62],["rdi-board.com",62],["sattvhelp.com",62],["siliconinvestor.com",62],["space-engineers.de",62],["coffeeforums.co.uk",62],["anime2you.de",62],["winaero.com",63],["centrumher.eu",64],["japancamerahunter.com",65],["airlinercafe.com",65],["thegraillords.net",66],["worldscientific.com",66],["videohelp.com",66],["discord.club",67],["upsrtconline.co.in",68],["qualityfilehosting.com",69],["booksmedicos.org",70],["forum.politz.com.br",71],["jobsbotswana.info",72],["ieltsliz.com",73],["npnews24.com",74],["fordogtrainers.pl",[75,76]],["polskacanada.com",77],["fantricks.com",77],["blog.kwick.de",77],["selfstudyhistory.com",[77,103]],["yeuphimmoik.com",77],["repack-games.com",77],["delicateseliterare.ro",77],["wpplugins.tips",77],["verselemzes.hu",[77,182]],["gezimanya.com",78],["athletic.net",79],["playonlinux.com",81],["bitblokes.de",83],["bold.dk",84],["pureinfotech.com",85],["almasdarnews.com",85],["casertace.net",85],["civildigital.com",85],["lesmoutonsenrages.fr",85],["venusarchives.com",85],["verpornocomic.com",85],["cepmendili.com",85],["balticlivecam.com",86],["molineuxmix.co.uk",87],["yaledailynews.com",87],["canondrivers.org",[88,89]],["skidrowreloaded.com",90],["zeeebatch.blogspot.com",90],["sokolow-mlp.pl",90],["japan-fans.com",90],["forum.nlmod.net",93],["includehelp.com",94],["u.gg",95],["routenote.com",97],["themosvagas.com.br",[97,135]],["nekopoi.web.id",98],["world4.eu",[98,122,123]],["mt07-forum.de",99],["auto-treff.com",99],["telefon-treff.de",99],["dodge-forum.eu",99],["altranotizia.it",100],["barbarossaleather.com",100],["hearthstone-decks.net",101],["full-anime.fr",26],["nonton78.com",102],["sbfast.com",102],["vupload.com",102],["opportunitydesk.org",103],["selfstudyanthro.com",103],["jobsandhan.com",103],["programasvirtualespc.net",103],["renditepassive.net",103],["androidtvbox.eu",103],["flinsetyadi.com",[103,109]],["rawneix.in",[103,159,160]],["the-masters-voice.com",[103,109]],["activationkeys.co",103],["pandurul.ro",104],["masrawy.com",105],["milfzr.com",106],["phrasemix.com",107],["pitesti24.ro",109],["samsungtechwin.com",109],["cours-de-droit.net",109],["iptv4best.com",109],["blogvisaodemercado.pt",109],["kapitalis.com",109],["tiempo.hn",109],["winmeen.com",109],["ibps.in",109],["visse.com.br",109],["javsubtitle.co",109],["licensekeys.org",109],["mediahiburan.my",109],["tipssehatcantik.com",109],["anime-drama.jp",109],["jbjbgame.com",109],["viatasisanatate.com",109],["ziarulargesul.ro",109],["globaldefensecorp.com",109],["gossipnextdoor.com",109],["coffeeapps.ir",109],["media.framu.world",109],["immobiliaremia.com",109],["colegiosconcertados.info",109],["bigdatauni.com",109],["rukim.id",109],["visefierbinti.ro",109],["cyberkrafttraining.com",109],["theaircurrent.com",109],["nocturnetls.net",109],["clockks.com",109],["ananda-yoga.ro",109],["poolpiscina.com",109],["infodifesa.it",109],["getective.com",109],["formatatmak.com",109],["drkrok.com",109],["alphagirlreviews.com",109],["kitchennovel.com",109],["voxvalachorum.ro",109],["cracksone.com",109],["day-hoc.org",109],["onlineonderdelenshop.nl",109],["primicia.com.ve",109],["tech-recipes.com",109],["postcourier.com.pg",109],["afrikmag.com",109],["maduras.vip",109],["aprendeinglessila.com",109],["kicknews.today",109],["koalasplayground.com",109],["hellokpop.com",109],["hayatbilgileri.com",109],["moneyexcel.com",109],["placementstore.com",109],["neuroteam-metz.de",109],["codedosa.com",109],["liveyourmaths.com",109],["techlicious.com",2],["order-order.com",2],["download.mokeedev.com",2],["freep.com",2],["thedraftnetwork.com",2],["ijr.com",2],["moneyguru.co",110],["abola.pt",30],["unixhow.com",111],["wikihow.com",112],["analizy.pl",115],["phimmedia.info",116],["ohmygirl.ml",117],["cissamagazine.com.br",118],["phoronix.com",119],["observatoriodocinema.uol.com.br",120],["salidzini.lv",121],["portalcriatividade.com.br",[122,165]],["kitguru.net",125],["lvturbo.com",126],["sbbrisk.com",126],["sbface.com",126],["sbspeed.com",126],["streamsb.net",126],["itscybertech.com",126],["whatfontis.com",129],["tritinia.com",130],["sportnews.to",[130,138]],["psihologiadeazi.ro",130],["dubznetwork.com",[130,161]],["lowkeytech.com",132],["ubuntudde.com",132],["techsini.com",133],["allmovie.com",134],["sidereel.com",134],["appofmirror.com",136],["developpez.com",137],["scatch176duplicities.com",139],["voe-unblock.com",139],["phimdinhcao.com",140],["picallow.com",141],["freestreams-live1.com",141],["links.extralinks.casa",142],["ssuathletics.com",143],["titulky.com",144],["dongphimmoiz.com",145],["investorvillage.com",146],["grandoldteam.com",147],["gamingsinners.com",147],["elitepvpers.com",148],["geeksforgeeks.org",149],["acupoffrench.com",150],["novelza.com",150],["novelpia.com",[151,152,153]],["viewsb.com",154],["dizipal210.com",[154,155]],["dizipal211.com",[154,155]],["dizipal212.com",[154,155]],["dizipal214.com",[154,155]],["dizipal215.com",[154,155]],["dizipal217.com",[154,155]],["dizipal219.com",[154,155]],["dizipal222.com",[154,155]],["dizipal223.com",[154,155]],["dizipal225.com",[154,155]],["dizipal229.com",[154,155]],["dizipal232.com",[154,155]],["dizipal233.com",[154,155]],["dizipal234.com",[154,155]],["dizipal235.com",[154,155]],["dizipal236.com",[154,155]],["dizipal237.com",[154,155]],["dizipal238.com",[154,155]],["dizipal239.com",[154,155]],["dizipal240.com",[154,155]],["dizipal241.com",[154,155]],["dizipal242.com",[154,155]],["dizipal243.com",[154,155]],["dizipal244.com",[154,155]],["dizipal246.com",[154,155]],["dizipal247.com",[154,155]],["dizipal248.com",[154,155]],["dizipal249.com",[154,155]],["nsfwzone.xyz",154],["dlmovies.link",154],["top1iq.com",156],["unlimitedfiles.xyz",157],["aztravels.net",158],["downfile.site",158],["memangbau.com",158],["trangchu.news",158],["revenue.land",159],["eplayer.click",161],["olacast.live",161],["ntuplay.xyz",161],["fucktube4k.com",162],["knightnoscanlation.com",162],["maxstream.video",164],["smokelearned.net",166],["nhentaihaven.org",167],["slideshare.net",168],["hidemywp.co",169],["bolugundem.com",170],["memoryhackers.org",173],["turkbettv154.com",174],["mgsm.pl",176],["camcaps.to",177],["vtplayer.net",177],["phimlongtieng.net",[178,179,180,181]],["weakstream.org",183],["jk-market.com",184],["vtbe.net",185],["film4e.com",186],["zamundatv.com",186]]);

const entitiesMap = new Map([["notebookcheck",35],["mangaku",46],["dramaqu",46],["marapcana",49],["europixhd",[49,59]],["topeuropix",[49,59]],["dramacute",[49,100]],["depedlps",49],["mangatoon",49],["123movies",[49,109]],["gomovies",49],["fmovies",[49,109]],["otakudesu",49],["yoyofilmeys",49],["tvzingvn",102],["zingtvhd",102],["zingvntv",102],["sbflix",102]]);

const exceptionsMap = new Map([]);

/******************************************************************************/

function abortCurrentScript(
    arg1,
    arg2,
    arg3
) {
    runAtHtmlElement(( ) => {
        abortCurrentScriptCore(arg1, arg2, arg3);
    });
}

function abortCurrentScriptCore(
    arg1 = '',
    arg2 = '',
    arg3 = ''
) {
    const details = typeof arg1 !== 'object'
        ? { target: arg1, needle: arg2, context: arg3 }
        : arg1;
    const { target = '', needle = '', context = '' } = details;
    if ( typeof target !== 'string' ) { return; }
    if ( target === '' ) { return; }
    const safe = safeSelf();
    const reNeedle = patternToRegex(needle);
    const reContext = patternToRegex(context);
    const thisScript = document.currentScript;
    const chain = target.split('.');
    let owner = window;
    let prop;
    for (;;) {
        prop = chain.shift();
        if ( chain.length === 0 ) { break; }
        if ( prop in owner === false ) { break; }
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
    const log = shouldLog(details);
    const debug = shouldDebug(details);
    const exceptionToken = getExceptionToken();
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
        if ( debug ) { debugger; }  // jshint ignore: line
        const e = document.currentScript;
        if ( e instanceof HTMLScriptElement === false ) { return; }
        if ( e === thisScript ) { return; }
        if ( context !== '' && reContext.test(e.src) === false ) { return; }
        if ( log && e.src !== '' ) { safe.uboLog(`matched src: ${e.src}`); }
        const scriptText = getScriptText(e);
        if ( reNeedle.test(scriptText) === false ) { return; }
        if ( log ) { safe.uboLog(`matched script text: ${scriptText}`); }
        throw new ReferenceError(exceptionToken);
    };
    if ( debug ) { debugger; }  // jshint ignore: line
    try {
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
    } catch(ex) {
        if ( log ) { safe.uboLog(ex); }
    }
}

function runAtHtmlElement(fn) {
    if ( document.documentElement ) {
        fn();
        return;
    }
    const observer = new MutationObserver(( ) => {
        observer.disconnect();
        fn();
    });
    observer.observe(document, { childList: true });
}

function patternToRegex(pattern, flags = undefined) {
    if ( pattern === '' ) { return /^/; }
    const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
    if ( match !== null ) {
        return new RegExp(match[1], match[2] || flags);
    }
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
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
    try { abortCurrentScript(...JSON.parse(argsList[i])); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

})();

/******************************************************************************/

void 0;
