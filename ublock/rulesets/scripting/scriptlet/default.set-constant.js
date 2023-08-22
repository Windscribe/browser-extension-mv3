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
/* global cloneInto */

'use strict';

// ruleset: default

/******************************************************************************/

// Important!
// Isolate from global scope

// Start of local scope
(( ) => {

/******************************************************************************/

// Start of code to inject
const uBOL_setConstant = function() {

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = [["ytInitialPlayerResponse.playerAds","undefined"],["ytInitialPlayerResponse.adPlacements","undefined"],["playerResponse.adPlacements","undefined"],["abp","false"],["oeo","noopFunc"],["nsShowMaxCount","0"],["objVc.interstitial_web",""],["console.clear","trueFunc"],["_ml_ads_ns","null"],["_sp_.config","undefined"],["isAdBlockActive","false"],["AdController","noopFunc"],["check_adblock","true"],["initials.yld-pdpopunder",""],["xRds","false"],["tRds","true"],["console.clear","noopFunc"],["String.fromCharCode","noopFunc"],["console.log","noopFunc"],["String.prototype.charCodeAt","trueFunc"],["console.clear","undefined"],["attachEvent","trueFunc"],["hasAdBlocker","false"],["Object.prototype._getSalesHouseConfigurations","noopFunc"],["sadbl","false"],["adblockcheck","false"],["blurred","false"],["flashvars.adv_pre_src",""],["showPopunder","false"],["page_params.holiday_promo","true"],["adsEnabled","true"],["String.prototype.charAt","trueFunc"],["ad_blocker","false"],["blockAdBlock","true"],["is_adblocked","false"],["showPopunder","noopFunc"],["VikiPlayer.prototype.pingAbFactor","noopFunc"],["player.options.disableAds","true"],["flashvars.adv_pre_vast",""],["flashvars.adv_pre_vast_alt",""],["x_width","1"],["_site_ads_ns","true"],["luxuretv.config",""],["Object.prototype.AdOverlay","noopFunc"],["tkn_popunder","null"],["can_run_ads","true"],["adsBlockerDetector","noopFunc"],["globalThis","null"],["adblock","false"],["__ads","true"],["FlixPop.isPopGloballyEnabled","falseFunc"],["fuckAdBlock","false"],["$.magnificPopup.open","noopFunc"],["adsenseadBlock","noopFunc"],["flashvars.adv_pause_html",""],["adblockSuspected","false"],["disasterpingu","false"],["CnnXt.Event.fire","noopFunc"],["App.views.adsView.adblock","false"],["$.fx.off","true"],["adsClasses","undefined"],["gsecs","0"],["isAdb","false"],["adBlockEnabled","false"],["puShown","true"],["ads_b_test","true"],["showAds","true"],["clicked","true"],["eClicked","true"],["number","0"],["sync","true"],["detectAdBlock","noopFunc"],["attr","{}"],["scriptSrc",""],["Object.prototype.adReinsertion","noopFunc"],["Object.prototype.disableAds","true"],["cxStartDetectionProcess","noopFunc"],["isAdBlocked","false"],["adblock","noopFunc"],["path",""],["adBlock","false"],["_ctrl_vt.blocked.ad_script","false"],["blockAdBlock","noopFunc"],["caca","noopFunc"],["Ok","true"],["isBlocked","false"],["safelink.adblock","false"],["ClickUnder","noopFunc"],["flashvars.adv_pre_url",""],["flashvars.protect_block",""],["flashvars.video_click_url",""],["ifmax","true"],["spoof","noopFunc"],["btoa","null"],["sp_ad","true"],["adsBlocked","false"],["_sp_.msg.displayMessage","noopFunc"],["isAdblock","false"],["atob","noopFunc"],["CaptchmeState.adb","undefined"],["indexedDB.open","trueFunc"],["UhasAB","false"],["adNotificationDetected","false"],["flashvars.popunder_url",""],["_pop","noopFunc"],["_ti_update_user","noopFunc"],["valid","1"],["vastAds","[]"],["isAdsDisplayed","true"],["adblock","1"],["frg","1"],["time","0"],["vpPrerollVideo","undefined"],["ads","true"],["GNCA_Ad_Support","true"],["ad_permission","true"],["Date.now","noopFunc"],["jQuery.adblock","1"],["ads_js_was_loaded","true"],["VMG.Components.Adblock","false"],["_n_app.popunder","null"],["adblockDetector","trueFunc"],["hasPoped","true"],["flashvars.video_click_url","undefined"],["flashvars.adv_start_html",""],["jQuery.adblock","false"],["google_jobrunner","true"],["clientSide.adbDetect","noopFunc"],["sec","0"],["gadb","false"],["checkadBlock","noopFunc"],["di.VAST.XHRURLHandler","noopFunc"],["cmnnrunads","true"],["adBlocker","false"],["adBlockDetected","noopFunc"],["StileApp.somecontrols.adBlockDetected","noopFunc"],["checkdom","0"],["MDCore.adblock","0"],["google_tag_data","noopFunc"],["noAdBlock","true"],["counter","0"],["window_focus","true"],["adsOk","true"],["Object.prototype._parseVAST","noopFunc"],["Object.prototype.createAdBlocker","noopFunc"],["Object.prototype.isAdPeriod","falseFunc"],["check","true"],["daganKwarta","true"],["dvsize","51"],["isal","true"],["count","0"],["document.hidden","true"],["awm","true"],["adblockEnabled","false"],["Global.adv","undefined"],["ABLK","false"],["pogo.intermission.staticAdIntermissionPeriod","0"],["SubmitDownload1","noopFunc"],["t","0"],["ckaduMobilePop","noopFunc"],["tieneAdblock","0"],["adsAreBlocked","false"],["cmgpbjs","false"],["displayAdblockOverlay","false"],["google","false"],["Math.pow","noopFunc"],["openInNewTab","noopFunc"],["adblockDetector","noopFunc"],["loadingAds","true"],["ads_blocked","0"],["runAdBlocker","false"],["td_ad_background_click_link","undefined"],["Adblock","false"],["flashvars.logo_url",""],["flashvars.logo_text",""],["nlf.custom.userCapabilities","false"],["nozNoAdBlock","true"],["decodeURIComponent","trueFunc"],["process","noopFunc"],["LoadThisScript","true"],["showPremLite","true"],["closeBlockerModal","false"],["adBlockDetector.isEnabled","falseFunc"],["testerli","false"],["areAdsDisplayed","true"],["gkAdsWerbung","true"],["document.bridCanRunAds","true"],["pop_target","null"],["is_banner","true"],["$easyadvtblock","false"],["show_dfp_preroll","false"],["show_youtube_preroll","false"],["show_ads_gr8_lite","true"],["doads","true"],["jsUnda","noopFunc"],["abp","noopFunc"],["AlobaidiDetectAdBlock","true"],["Advertisement","1"],["adBlockDetected","false"],["HTMLElement.prototype.attachShadow","null"],["abp1","1"],["pr_okvalida","true"],["$.ajax","trueFunc"],["getHomadConfig","noopFunc"],["adsbygoogle.loaded","true"],["cnbc.canShowAds","true"],["Adv_ab","false"],["chrome","undefined"],["firefaucet","true"],["app.addonIsInstalled","trueFunc"],["flashvars.popunder_url","undefined"],["adv","true"],["pqdxwidthqt","false"],["canRunAds","true"],["Fingerprint2","true"],["dclm_ajax_var.disclaimer_redirect_url",""],["load_pop_power","noopFunc"],["adBlockDetected","true"],["Time_Start","0"],["blockAdBlock","trueFunc"],["ezstandalone.enabled","true"],["CustomEvent","noopFunc"],["ab","false"],["go_popup","{}"],["noBlocker","true"],["adsbygoogle","null"],["cRAds","null"],["fabActive","false"],["gWkbAdVert","true"],["noblock","true"],["ai_dummy","true"],["ulp_noadb","true"],["wgAffiliateEnabled","false"],["ads","null"],["checkAdsBlocked","noopFunc"],["adsLoadable","true"],["ASSetCookieAds","null"],["AdBlockerDetected","noopFunc"],["letShowAds","true"],["tidakAdaPenghalangAds","true"],["timeSec","0"],["ads_unblocked","true"],["xxSetting.adBlockerDetection","false"],["better_ads_adblock","null"],["open","undefined"],["importFAB","undefined"],["Drupal.behaviors.adBlockerPopup","null"],["fake_ad","true"],["flashvars.mlogo",""],["koddostu_com_adblock_yok","null"],["adsbygoogle","trueFunc"],["player.ads.cuePoints","undefined"],["adBlockDetected","null"],["fouty","true"],["detectAdblock","noopFunc"],["better_ads_adblock","1"],["hold_click","false"],["sgpbCanRunAds","true"],["Object.prototype.m_nLastTimeAdBlock","undefined"],["config.pauseInspect","false"],["D4zz","noopFunc"],["appContext.adManager.context.current.adFriendly","false"],["blockAdBlock._options.baitClass","null"],["document.blocked_var","1"],["____ads_js_blocked","false"],["wIsAdBlocked","false"],["WebSite.plsDisableAdBlock","null"],["ads_blocked","false"],["samDetected","false"],["sems","noopFunc"],["countClicks","0"],["settings.adBlockerDetection","false"],["mixpanel.get_distinct_id","true"],["bannersLoaded","4"],["notEmptyBanners","4"],["fuckAdBlock._options.baitClass","null"],["bscheck.adblocker","noopFunc"],["qpcheck.ads","noopFunc"],["CloudflareApps.installs.Ik7rmQ4t95Qk.options.measureDomain","undefined"],["detectAB1","noopFunc"],["googletag._vars_","{}"],["googletag._loadStarted_","true"],["googletag._loaded_","true"],["google_unique_id","1"],["google.javascript","{}"],["google.javascript.ads","{}"],["google_global_correlator","1"],["paywallGateway.truncateContent","noopFunc"],["adBlockDisabled","true"],["blockedElement","noopFunc"],["popit","false"],["adBlockerDetected","false"],["countdown","0"],["decodeURI","noopFunc"],["flashvars.adv_postpause_vast",""],["univresalP","noopFunc"],["runAdblock","noopFunc"],["$tieE3","true"],["xv_ad_block","0"],["vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads",""],["adsProvider.init","noopFunc"],["SDKLoaded","true"],["blockAdBlock._creatBait","null"],["POPUNDER_ENABLED","false"],["plugins.preroll","noopFunc"],["errcode","0"],["DHAntiAdBlocker","true"],["adblock","0"],["db.onerror","noopFunc"],["p18","undefined"],["asc","1"],["ADBLOCKED","false"],["adb","0"],["String.fromCharCode","trueFunc"],["adblock_use","false"],["nitroAds.loaded","true"],["createCanvas","noopFunc"],["playerAdSettings.adLink",""],["playerAdSettings.waitTime","0"],["AdHandler.adblocked","0"],["adsHeight","11"],["checkCap","0"],["waitTime","0"],["isAdsLoaded","true"],["adblockerAlert","noopFunc"],["Object.prototype.parseXML","noopFunc"],["Object.prototype.blackscreenDuration","1"],["Object.prototype.adPlayerId",""],["isadb","false"],["adblockDetect","noopFunc"],["style","noopFunc"],["history.pushState","noopFunc"],["google_unique_id","6"],["new_config.timedown","0"],["timedisplay","0"],["Object.prototype.isAdDisabled","true"],["hiddenProxyDetected","false"],["SteadyWidgetSettings.adblockActive","false"],["proclayer","noopFunc"],["load_ads","trueFunc"],["starPop","1"],["Object.prototype.ads","noopFunc"],["detectBlockAds","noopFunc"],["ga","trueFunc"],["enable_dl_after_countdown","true"],["isGGSurvey","true"],["ad_link",""],["App.AdblockDetected","false"],["SF.adblock","true"],["startfrom","0"],["Object.prototype.nopreroll_","true"],["HP_Scout.adBlocked","false"],["SD_IS_BLOCKING","false"],["__BACKPLANE_API__.renderOptions.showAdBlock",""],["Object.prototype.isNoAds","{}"],["countDownDate","0"],["setupSkin","noopFunc"],["adSettings","[]"],["count","1"],["Object.prototype.enableInterstitial","false"],["check","noopFunc"],["ads","undefined"],["ADBLOCK","false"],["POSTPART_prototype.ADKEY","noopFunc"],["adBlockDetected","falseFunc"],["noAdBlock","noopFunc"],["AdService.info.abd","noopFunc"],["adBlockDetectionResult","undefined"],["popped","true"],["tiPopAction","noopFunc"],["google.ima.OmidVerificationVendor","{}"],["Object.prototype.omidAccessModeRules","{}"],["puShown1","true"],["document.hasFocus","trueFunc"],["passthetest","true"],["timeset","0"],["pandaAdviewValidate","true"],["verifica_adblock","noopFunc"],["canGetAds","true"],["ad_blocker_active","false"],["init_welcome_ad","noopFunc"],["moneyAbovePrivacyByvCDN","true"],["dable","{}"],["aLoad","noopFunc"],["mtCanRunAdsSoItCanStillBeOnTheWeb","true"],["document.body.contains","trueFunc"],["popunder","undefined"],["navigator.brave","undefined"],["distance","0"],["document.onclick",""],["adEnable","true"],["displayAds","0"],["Overlayer","{}"],["pop3getcookie","undefined"],["pop3setcookie1","undefined"],["pop3setCookie2","undefined"],["_adshrink.skiptime","0"],["AbleToRunAds","true"],["TextEncoder","undefined"],["abpblocked","undefined"],["app.showModalAd","noopFunc"],["ubactive","0"],["adt","0"],["test_adblock","noopFunc"],["Object.prototype.adBlockerDetected","falseFunc"],["Object.prototype.adBlocker","false"],["Object.prototype.tomatoDetected","falseFunc"],["vastEnabled","false"],["detectadsbocker","false"],["two_worker_data_js.js","[]"],["FEATURE_DISABLE_ADOBE_POPUP_BY_COUNTRY","true"],["questpassGuard","noopFunc"],["isAdBlockerEnabled","false"],["admiral","noopFunc"],["smartLoaded","true"],["timeLeft","0"],["Cookiebot","noopFunc"],["feature_flags.interstitial_ads_flag","false"],["feature_flags.interstitials_every_four_slides","false"],["waldoSlotIds","true"],["adblockstatus","false"],["adblockEnabled","noopFunc"],["banner_is_blocked","false"],["Object.prototype.adBlocked","false"],["makeMoney","true"],["chp_adblock_browser","noopFunc"],["hadeh_ads","false"],["Brid.A9.prototype.backfillAdUnits","[]"],["dct","0"],["slideShow.displayInterstitial","true"],["__INITIAL_STATE__.gameLists.gamesNoPrerollIds.indexOf","trueFunc"],["Object.prototype.isAllAdClose","true"],["navigator.standalone","true"],["showAdss","true"],["google.ima.settings.setDisableFlashAds","noopFunc"],["window.showAds","true"],["setTimer","0"],["penci_adlbock.ad_blocker_detector","0"],["Object.prototype.adblockDetector","noopFunc"],["blext","true"],["vidorev_jav_plugin_video_ads_object","{}"],["vidorev_jav_plugin_video_ads_object_post","{}"],["S_Popup","10"],["rabLimit","-1"],["nudgeAdBlock","noopFunc"],["playerConfigs.rek","{}"],["feedBack.showAffilaePromo","noopFunc"],["checkAdBlocker","noopFunc"],["loadpagecheck","noopFunc"],["hucksterInit","trueFunc"],["$.tstracker","noopFunc"],["rwt","noopFunc"],["bmak.js_post","false"],["ccsrv",""],["lcs_SerName",""],["flashvars.event_reporting",""],["firebase.analytics","noopFunc"],["akamaiDisableServerIpLookup","noopFunc"],["nads.createAd","trueFunc"],["ga","noopFunc"],["huecosPBS.nstdX","null"],["DTM.trackAsyncPV","noopFunc"],["newPageViewSpeedtest","noopFunc"],["pubg.unload","noopFunc"],["generateGalleryAd","noopFunc"],["mediator","noopFunc"],["Object.prototype.subscribe","noopFunc"],["Object.prototype.vjsPlayer.ads","noopFunc"],["network_user_id",""],["googletag.cmd","{}"],["Object.prototype.setDisableFlashAds","noopFunc"],["DD_RUM.addTiming","noopFunc"],["chameleonVideo.adDisabledRequested","true"],["AdmostClient","{}"],["analytics","{}"],["datalayer","[]"],["Object.prototype.isInitialLoadDisabled","noopFunc"],["listingGoogleEETracking","noopFunc"],["dcsMultiTrack","noopFunc"],["urlStrArray","noopFunc"],["pa","{}"],["Object.prototype.setConfigurations","noopFunc"],["Object.prototype.bk_addPageCtx","noopFunc"],["Object.prototype.bk_doJSTag","noopFunc"],["passFingerPrint","noopFunc"],["DD_LOGS","noopFunc"],["optimizely","{}"],["optimizely.initialized","true"],["google_optimize","{}"],["google_optimize.get","noopFunc"],["_gsq","{}"],["_gsq.push","noopFunc"],["iom","{}"],["iom.c","noopFunc"],["_conv_q","{}"],["_conv_q.push","noopFunc"],["pa.privacy","{}"],["Object.prototype.getTargetingMap","noopFunc"],["populateClientData4RBA","noopFunc"],["eyshy_start","false"]];

const hostnamesMap = new Map([["youtube.com",[0,1,2]],["youtubekids.com",[0,1,2]],["youtube-nocookie.com",[0,1,2]],["t-online.de",3],["whatfinger.com",4],["timesofindia.indiatimes.com",5],["economictimes.indiatimes.com",6],["userscloud.com",7],["motherless.com",8],["sueddeutsche.de",9],["watson.de",9],["watchanimesub.net",10],["wco.tv",10],["wcoanimesub.tv",10],["wcoforever.net",10],["filehorse.com",10],["guidetnt.com",10],["sp-today.com",10],["linkvertise.com",10],["textbin.net",10],["eropaste.com",10],["pastebr.xyz",10],["getpaste.link",10],["sharetext.me",10],["note.sieuthuthuat.com",10],["elcriticodelatele.com",[10,306]],["gadgets.es",[10,306]],["wiwo.de",11],["masteranime.es",12],["9anime.vip",12],["fullxh.com",13],["megaxh.com",13],["unlockxh4.com",13],["xhadult2.com",13],["xhadult3.com",13],["xhadult4.com",13],["xhadult5.com",13],["xhamster46.com",13],["xhday.com",13],["xhday1.com",13],["xhmoon5.com",13],["xhplanet1.com",13],["xhplanet2.com",13],["xhreal2.com",13],["xhreal3.com",13],["xhtab2.com",13],["xhvictory.com",13],["xhwebsite.com",13],["xhwebsite2.com",13],["xhwide1.com",13],["xhwide8.com",13],["alphaporno.com",[16,407]],["porngem.com",16],["uploadbank.com",16],["shortit.pw",[16,106]],["familyporn.tv",16],["cloudemb.com",[16,328]],["sbplay1.com",16],["swatchseries.ru",16],["id45.cyou",16],["85tube.com",[16,89]],["pobre.tv",16],["k1nk.co",16],["watchasians.cc",16],["photopea.com",16],["imsdb.pw",[16,25]],["soltoshindo.com",16],["techtimes.com",17],["dronedj.com",19],["freeplayervideo.com",20],["nazarickol.com",20],["player-cdn.com",20],["voe.sx",20],["housecardsummerbutton.com",20],["bigclatterhomesguideservice.com",20],["uptodatefinishconference.com",20],["uptodatefinishconferenceroom.com",20],["tinycat-voe-fashion.com",20],["motphimtv.com",20],["rabbitstream.net",20],["streamlare.com",20],["projectfreetv.one",20],["nolive.me",21],["cbs.com",22],["paramountplus.com",22],["player.glomex.com",23],["merkur.de",23],["tz.de",23],["hotpornfile.org",25],["chillicams.net",25],["rpdrlatino.live",25],["adbull.org",26],["mitly.us",26],["linkrex.net",26],["linx.cc",26],["oke.io",26],["dz4link.com",26],["linclik.com",26],["shrt10.com",26],["loptelink.com",26],["cut-fly.com",26],["linkfinal.com",26],["payskip.org",26],["cutpaid.com",26],["forexmab.com",26],["linkjust.com",26],["linkszia.co",26],["leechpremium.link",26],["icutlink.com",[26,128]],["stfly.me",26],["oncehelp.com",26],["bit-url.com",26],["rgl.vn",26],["reqlinks.net",26],["wu8.in",26],["bitlk.com",26],["qlinks.eu",26],["link.3dmili.com",26],["short-fly.com",26],["foxseotools.com",26],["pngit.live",26],["link.turkdown.com",26],["slink.bid",[26,71]],["earnwithshortlink.com",26],["7r6.com",26],["enrt.eu",26],["oko.sh",26],["shortpaid.com",26],["ckk.ai",26],["fc.lc",26],["fstore.biz",26],["cuts-url.com",26],["eio.io",26],["exe.app",26],["exee.io",26],["exey.io",26],["srek.net",26],["skincarie.com",26],["exeo.app",26],["clk.ink",26],["birdurls.com",26],["coinlyhub.com",[26,214]],["adsafelink.com",26],["aii.sh",26],["shrinkurl.org",26],["adsh.cc",26],["cybertechng.com",[26,223]],["owllink.net",26],["fir3.net",26],["cutdl.xyz",26],["gplinks.co",26],["loan2host.com",26],["tei.ai",26],["tii.ai",26],["iir.ai",26],["shorteet.com",[26,244]],["sekilastekno.com",26],["promo-visits.site",26],["satoshi-win.xyz",[26,253]],["shorterall.com",26],["smoner.com",26],["bitlinks.pw",26],["linkad.in",26],["linkshrnk.com",26],["popimed.com",26],["linksly.co",26],["ur-ly.xyz",26],["shrinkme.in",26],["rodjulian.com",26],["pkr.pw",26],["shrinke.me",26],["imagenesderopaparaperros.com",26],["shortenbuddy.com",26],["gibit.xyz",26],["apksvip.com",26],["cashurl.in",26],["4cash.me",26],["namaidani.com",26],["bitfly.io",26],["teknomuda.com",26],["illink.net",26],["miuiku.com",26],["yourtechnology.online",26],["savelink.site",26],["fxlap.com",26],["earnfasts.com",26],["absolutesmmpanel.com",26],["myhiddentech.com",26],["tawiia.com",26],["droplink.co",26],["recipestutorials.com",26],["ashort1a.xyz",26],["2shrt.com",26],["apkshrt.com",26],["genpassword.top",26],["srts.me",26],["cuturl.in",26],["lyricsbot.pw",26],["short88.com",26],["cashearn.cc",26],["kutmoney.com",26],["kutt.io",26],["sanoybonito.club",26],["samaa-pro.com",26],["miklpro.com",26],["modapk.link",26],["shrinkforearn.in",26],["1shorten.com",26],["ccurl.net",26],["st23q.com",26],["beautyram.info",26],["gonety.com",26],["viraloc.com",26],["clickscoin.com",26],["forex-trnd.com",26],["kiiw.icu",26],["vshort.link",26],["link.ltc24.com",26],["galaxy-link.space",26],["linkpoi.me",26],["usdshort.com",26],["bitcoinly.in",26],["menjelajahi.com",26],["pewgame.com",26],["yxoshort.com",26],["1link.vip",26],["linkcc.pro",26],["haonguyen.top",26],["jameeltips.us",26],["claimfreebits.com",26],["mfk-shorter.com",26],["crazyblog.in",26],["gtlink.co",26],["link.tokenoto.com",26],["cutearn.net",26],["rshrt.com",26],["jp88.xyz",26],["short.palmeratv.com",26],["filezipa.com",26],["arab-chat.club",26],["dz-linkk.com",26],["theblissempire.com",26],["shortlink.prz.pw",26],["zipurls.com",26],["finanzas-vida.com",26],["skiplink.org",26],["techmyhub.com",26],["adurly.cc",26],["pix4link.com",26],["paid4.link",26],["ez4short.com",26],["link.asiaon.top",26],["go.gets4link.com",26],["download.sharenulled.net",26],["enagato.com",26],["linkres.in",26],["webo.one",26],["automotur.club",26],["pandarticles.com",26],["beingtek.com",26],["katflys.com",26],["shorturl.unityassets4free.com",26],["disheye.com",26],["techymedies.com",26],["techysuccess.com",26],["toptap.website",[26,334]],["za.gl",[26,151]],["newsalret.com",26],["download.baominh.tech",26],["bblink.com",26],["abre.click",26],["linkbr.xyz",26],["myad.biz",26],["go.netfile.cc",26],["try2link.com",26],["swzz.xyz",26],["vevioz.com",26],["charexempire.com",26],["clk.asia",26],["rancah.com",26],["egfly.xyz",26],["linka.click",26],["sturls.com",26],["myshrinker.com",26],["upshrink.com",26],["go.adinsurance.xyz",26],["aylink.info",26],["dash-free.com",[26,223]],["rainurl.com",[26,223]],["snowurl.com",[26,223]],["netfile.cc",26],["link.insurance-space.xyz",26],["link.insurglobal.xyz",26],["theconomy.me",26],["rajsayt.xyz",26],["rocklink.in",26],["linkshortify.site",26],["adinsurance.xyz",26],["insurglobal.xyz",26],["techgeek.digital",26],["download3s.net",26],["shortx.net",26],["musicc.xyz",26],["cutx.me",26],["btcwalk.com",26],["cryptoon.xyz",26],["easysky.in",26],["veganab.co",26],["shortawy.com",26],["tlin.me",26],["apprepack.com",26],["post.nites-tv.xyz",26],["sh2rt.com",26],["up-load.one",26],["zuba.link",26],["pandaznetwork.com",26],["du-link.in",26],["linksfy.co",26],["adrinolinks.in",26],["golink.xaydungplus.com",26],["bestcash2020.com",26],["cut-y.net",26],["hoxiin.com",26],["technemo.xyz",26],["baicho.xyz",26],["go.linkbnao.com",26],["link-yz.com",26],["paylinnk.com",26],["thizissam.in",26],["ier.ai",26],["bloggertheme.xyz",26],["adslink.pw",26],["enit.in",[26,240]],["oii.io",26],["novelssites.com",26],["links.medipost.org",26],["faucetcrypto.net",26],["short.freeltc.top",26],["trxking.xyz",26],["weadown.com",26],["cookdov.com",26],["xpshort.com",26],["bdnewsx.com",26],["m.bloggingguidance.com",26],["blog.onroid.com",26],["cutty.app",26],["link.codevn.net",26],["upfilesurls.com",26],["shareus.site",26],["link4rev.site",26],["bloginguru.xyz",26],["tii.la",26],["celinks.net",26],["c2g.at",26],["atglinks.com",26],["shortzu.icu",26],["bitcosite.com",26],["cryptosh.pro",26],["sigmalinks.in",26],["link68.net",26],["traffic123.net",26],["gainl.ink",26],["windowslite.net",[26,223]],["coinsl.click",26],["exalink.fun",26],["watchmygf.me",[27,52]],["fpo.xxx",[27,54]],["sexemix.com",27],["heavyfetish.com",[27,455]],["you-porn.com",29],["youporngay.com",29],["youpornru.com",29],["9908ww.com",29],["adelaidepawnbroker.com",29],["bztube.com",29],["hotovs.com",29],["insuredhome.org",29],["nudegista.com",29],["pornluck.com",29],["vidd.se",29],["pornhub.com",29],["pornerbros.com",30],["freep.com",30],["porn.com",31],["tune.pk",32],["noticias.gospelmais.com.br",33],["techperiod.com",33],["jacquieetmicheltv.net",[34,35]],["illicoporno.com",34],["lavoixdux.com",34],["tonpornodujour.com",34],["jacquieetmichel.net",34],["swame.com",34],["vosfemmes.com",34],["voyeurfrance.net",34],["viki.com",[36,37]],["sleazyneasy.com",[38,39,40]],["smutr.com",[38,210]],["yourporngod.com",[38,39]],["javbangers.com",[38,294]],["camfox.com",38],["camthots.tv",[38,122]],["shegotass.info",38],["amateur8.com",38],["bigtitslust.com",38],["ebony8.com",38],["freeporn8.com",38],["lesbian8.com",38],["maturetubehere.com",38],["sortporn.com",38],["webcamvau.com",38],["motherporno.com",[38,39,54,124]],["theporngod.com",[38,39]],["pornsocket.com",41],["luxuretv.com",42],["porndig.com",[43,44]],["webcheats.com.br",45],["ceesty.com",[46,47]],["gestyy.com",[46,47]],["corneey.com",47],["destyy.com",47],["festyy.com",47],["sh.st",47],["angrybirdsnest.com",48],["zrozz.com",48],["clix4btc.com",48],["katfile.com",48],["4tests.com",48],["planet-explorers-isos.com",48],["business-standard.com",48],["goltelevision.com",48],["news-und-nachrichten.de",48],["laradiobbs.net",48],["urlaubspartner.net",48],["produktion.de",48],["cinemaxxl.de",48],["bladesalvador.com",48],["tempr.email",48],["cshort.org",48],["friendproject.net",48],["covrhub.com",48],["planetsuzy.org",49],["empflix.com",50],["filespace.com",51],["transparentcalifornia.com",52],["deepbrid.com",53],["submityourflicks.com",54],["3movs.com",54],["cambay.tv",[54,103,122,124]],["bravoerotica.net",[54,124]],["youx.xxx",54],["camclips.tv",[54,210]],["camflow.tv",[54,103,124,174,248]],["camhoes.tv",[54,103,122,124,174,248]],["xmegadrive.com",54],["xxxymovies.com",54],["xxxshake.com",54],["gayck.com",54],["xhand.com",[54,124]],["analdin.com",[54,124]],["webnovel.com",55],["schwaebische.de",56],["mercurynews.com",57],["chicoer.com",57],["dailybreeze.com",57],["dailybulletin.com",57],["dailynews.com",57],["delcotimes.com",57],["eastbaytimes.com",57],["macombdaily.com",57],["ocregister.com",57],["pasadenastarnews.com",57],["pe.com",57],["presstelegram.com",57],["redlandsdailyfacts.com",57],["reviewjournal.com",57],["santacruzsentinel.com",57],["saratogian.com",57],["sentinelandenterprise.com",57],["sgvtribune.com",57],["tampabay.com",57],["times-standard.com",57],["theoaklandpress.com",57],["trentonian.com",57],["twincities.com",57],["whittierdailynews.com",57],["bostonherald.com",57],["dailycamera.com",57],["sbsun.com",57],["dailydemocrat.com",57],["montereyherald.com",57],["orovillemr.com",57],["record-bee.com",57],["redbluffdailynews.com",57],["reporterherald.com",57],["thereporter.com",57],["timescall.com",57],["timesheraldonline.com",57],["ukiahdailyjournal.com",57],["dailylocal.com",57],["8tracks.com",58],["revealname.com",59],["fcportables.com",[60,61]],["golfchannel.com",63],["telemundodeportes.com",63],["stream.nbcsports.com",63],["gamcore.com",64],["porcore.com",64],["69games.xxx",64],["javmix.app",64],["tecknity.com",65],["haaretz.com",66],["hungama.com",66],["a-o.ninja",66],["anime-odcinki.pl",66],["kumpulmanga.org",66],["shortgoo.blogspot.com",66],["tonanmedia.my.id",[66,436]],["yurasu.xyz",66],["isekaipalace.com",66],["megadescarga.net",[67,68,69,70]],["megadescargas.net",[67,68,69,70]],["audioz.cc",71],["audioz.es",71],["luckydice.net",71],["adarima.org",71],["tieutietkiem.com",71],["weatherwx.com",71],["sattaguess.com",71],["winshell.de",71],["rosasidan.ws",71],["modmakers.xyz",71],["gamepure.in",71],["warrenrahul.in",71],["austiblox.net",71],["upiapi.in",71],["myownguess.in",71],["watchhentai.net",71],["thichcode.net",71],["texturecan.com",71],["vikistream.com",72],["eplayer.click",[72,73]],["mega4upload.com",[73,79]],["ennovelas.com",[73,79]],["n-tv.de",74],["brigitte.de",75],["stern.de",75],["foxsports.com.au",76],["canberratimes.com.au",76],["thesimsresource.com",77],["bdnewszh.com",79],["streamservicehd.click",79],["timeforbitco.in",80],["worldofbitco.in",[80,92]],["weatherx.co.in",[80,92]],["getyourbitco.in",80],["sunbtc.space",80],["ctrl.blog",81],["sportlife.es",82],["tubitv.com",82],["finofilipino.org",83],["acortarm.xyz",84],["acortame.xyz",84],["speedtest.net",85],["mysflink.blogspot.com",86],["assia.tv",87],["assia4.com",87],["assia24.com",87],["cwtvembeds.com",[89,123]],["camlovers.tv",89],["porntn.com",89],["pornissimo.org",89],["sexcams-24.com",[89,103]],["watchporn.to",[89,103]],["camwhorez.video",89],["ojogos.com.br",94],["powforums.com",95],["supforums.com",95],["studybullet.com",95],["usgamer.net",96],["recordonline.com",96],["123tvseries.co",98],["freebitcoin.win",99],["e-monsite.com",99],["coindice.win",99],["temp-mails.com",100],["freiepresse.de",101],["investing.com",102],["camhub.cc",103],["love4porn.com",103],["thotvids.com",103],["celebwhore.com",103],["cluset.com",103],["4kporn.xxx",103],["xhomealone.com",103],["lusttaboo.com",[103,368]],["mp3fiber.com",104],["suedkurier.de",105],["anysex.com",107],["gomiblog.com",108],["iptvtools.net",108],["vlist.se",109],["pornve.com",110],["coolrom.com.au",111],["bitcotasks.com",111],["pornohirsch.net",112],["marie-claire.es",113],["gamezhero.com",113],["flashgirlgames.com",113],["onlinesudoku.games",113],["mpg.football",113],["sssam.com",113],["globalnews.ca",114],["videotekaime.net",115],["drinksmixer.com",116],["leitesculinaria.com",116],["fupa.net",117],["ge-map-overlays.appspot.com",118],["browardpalmbeach.com",119],["dallasobserver.com",119],["houstonpress.com",119],["miaminewtimes.com",119],["phoenixnewtimes.com",119],["westword.com",119],["nhentai.net",120],["fox.com.tr",121],["caminspector.net",122],["camwhoreshd.com",122],["camgoddess.tv",122],["gay4porn.com",124],["mypornhere.com",124],["mediapason.it",125],["linkspaid.com",125],["tuotromedico.com",125],["neoteo.com",125],["phoneswiki.com",125],["celebmix.com",125],["myneobuxportal.com",125],["oyungibi.com",125],["25yearslatersite.com",125],["jeshoots.com",126],["techhx.com",126],["karanapk.com",126],["videogreen.xyz",127],["sypl.xyz",127],["playembed.xyz",127],["javhdporn.net",127],["redanimedatabase.cloud",127],["javstream.top",127],["flashplayer.fullstacks.net",129],["cloudapps.herokuapp.com",129],["youfiles.herokuapp.com",129],["temp-mail.org",130],["di.fm",131],["comnuan.com",132],["veedi.com",133],["battleboats.io",133],["fruitlab.com",134],["haddoz.net",134],["garoetpos.com",134],["stiletv.it",135],["hpav.tv",136],["hpjav.tv",136],["hqtv.biz",138],["liveuamap.com",139],["filmiseriali.com",139],["muvibg.com",139],["linksht.com",[140,141]],["audycje.tokfm.pl",142],["hulu.com",[143,144,145]],["shush.se",146],["aniwatcher.com",147],["emurom.net",148],["allkpop.com",149],["azmath.info",150],["downfile.site",150],["downphanmem.com",150],["expertvn.com",150],["memangbau.com",150],["scratch247.info",150],["trangchu.news",150],["adfoc.us",150],["mynewsmedia.co",[150,237]],["sptfy.be",150],["streamcheck.link",150],["pickcrackpasswords.blogspot.com",152],["kfrfansub.com",153],["thuglink.com",153],["voipreview.org",153],["audiotag.info",154],["hanime.tv",155],["pogo.com",156],["cloudvideo.tv",157],["legionjuegos.org",158],["legionpeliculas.org",158],["legionprogramas.org",158],["16honeys.com",159],["elespanol.com",160],["remodelista.com",161],["coolmathgames.com",[162,163,164,468]],["audiofanzine.com",165],["noweconomy.live",167],["howifx.com",167],["vavada5com.com",167],["hitokin.net",168],["elil.cc",169],["developerinsider.co",170],["ilprimatonazionale.it",171],["hotabis.com",171],["root-nation.com",171],["italpress.com",171],["airsoftmilsimnews.com",171],["artribune.com",171],["thehindu.com",172],["cambro.tv",[173,174]],["nibelungen-kurier.de",175],["noz.de",176],["earthgarage.com",178],["pianetamountainbike.it",179],["barchart.com",180],["modelisme.com",181],["parasportontario.ca",181],["prescottenews.com",181],["nrj-play.fr",182],["oeffentlicher-dienst.info",183],["hackingwithreact.com",184],["gutekueche.at",185],["eplfootballmatch.com",186],["peekvids.com",187],["playvids.com",187],["pornflip.com",187],["redensarten-index.de",188],["vw-page.com",189],["viz.com",[190,191]],["queenfaucet.website",192],["0rechner.de",193],["configspc.com",194],["xopenload.me",194],["uptobox.com",194],["uptostream.com",194],["onepiece-tube.com",195],["japgay.com",196],["mega-debrid.eu",197],["dreamdth.com",198],["pijanitvor.com",198],["diaridegirona.cat",201],["diariodeibiza.es",201],["diariodemallorca.es",201],["diarioinformacion.com",201],["eldia.es",201],["emporda.info",201],["farodevigo.es",201],["laopinioncoruna.es",201],["laopiniondemalaga.es",201],["laopiniondemurcia.es",201],["laopiniondezamora.es",201],["laprovincia.es",201],["levante-emv.com",201],["mallorcazeitung.es",201],["regio7.cat",201],["superdeporte.es",201],["playpaste.com",202],["player.rtl2.de",203],["freetutorialsus.com",204],["vidlii.com",[204,219]],["iammagnus.com",204],["dailyvideoreports.net",204],["unityassets4free.com",204],["cnbc.com",205],["puzzles.msn.com",206],["metro.us",206],["newsobserver.com",206],["arkadiumhosted.com",206],["spankbang.com",207],["firefaucet.win",208],["direct-link.net",209],["direkt-wissen.com",209],["link-to.net",209],["fullhdxxx.com",211],["getintopc.com",212],["unique-tutorials.info",212],["etonline.com",213],["creatur.io",213],["drphil.com",213],["urbanmilwaukee.com",213],["ontiva.com",213],["hideandseek.world",213],["myabandonware.com",213],["mangaalarab.com",213],["kendam.com",213],["wttw.com",213],["synonyms.com",213],["definitions.net",213],["hostmath.com",213],["camvideoshub.com",213],["minhaconexao.com.br",213],["bravedown.com",213],["home-made-videos.com",215],["pxrnxx.xyz",215],["amateur-couples.com",215],["slutdump.com",215],["produsat.com",217],["12thman.com",219],["acusports.com",219],["atlantic10.com",219],["auburntigers.com",219],["baylorbears.com",219],["bceagles.com",219],["bgsufalcons.com",219],["big12sports.com",219],["bigten.org",219],["bradleybraves.com",219],["butlersports.com",219],["cmumavericks.com",219],["conferenceusa.com",219],["cyclones.com",219],["dartmouthsports.com",219],["daytonflyers.com",219],["dbupatriots.com",219],["dbusports.com",219],["denverpioneers.com",219],["fduknights.com",219],["fgcuathletics.com",219],["fightinghawks.com",219],["fightingillini.com",219],["floridagators.com",219],["friars.com",219],["friscofighters.com",219],["gamecocksonline.com",219],["goarmywestpoint.com",219],["gobison.com",219],["goblueraiders.com",219],["gobobcats.com",219],["gocards.com",219],["gocreighton.com",219],["godeacs.com",219],["goexplorers.com",219],["goetbutigers.com",219],["gofrogs.com",219],["gogriffs.com",219],["gogriz.com",219],["golobos.com",219],["gomarquette.com",219],["gopack.com",219],["gophersports.com",219],["goprincetontigers.com",219],["gopsusports.com",219],["goracers.com",219],["goshockers.com",219],["goterriers.com",219],["gotigersgo.com",219],["gousfbulls.com",219],["govandals.com",219],["gowyo.com",219],["goxavier.com",219],["gozags.com",219],["gozips.com",219],["griffinathletics.com",219],["guhoyas.com",219],["gwusports.com",219],["hailstate.com",219],["hamptonpirates.com",219],["hawaiiathletics.com",219],["hokiesports.com",219],["huskers.com",219],["icgaels.com",219],["iuhoosiers.com",219],["jsugamecocksports.com",219],["longbeachstate.com",219],["loyolaramblers.com",219],["lrtrojans.com",219],["lsusports.net",219],["morrisvillemustangs.com",219],["msuspartans.com",219],["muleriderathletics.com",219],["mutigers.com",219],["navysports.com",219],["nevadawolfpack.com",219],["niuhuskies.com",219],["nkunorse.com",219],["nuhuskies.com",219],["nusports.com",219],["okstate.com",219],["olemisssports.com",219],["omavs.com",219],["ovcsports.com",219],["owlsports.com",219],["purduesports.com",219],["redstormsports.com",219],["richmondspiders.com",219],["sfajacks.com",219],["shupirates.com",219],["siusalukis.com",219],["smcgaels.com",219],["smumustangs.com",219],["soconsports.com",219],["soonersports.com",219],["themw.com",219],["tulsahurricane.com",219],["txst.com",219],["txstatebobcats.com",219],["ubbulls.com",219],["ucfknights.com",219],["ucirvinesports.com",219],["uconnhuskies.com",219],["uhcougars.com",219],["uicflames.com",219],["umterps.com",219],["uncwsports.com",219],["unipanthers.com",219],["unlvrebels.com",219],["uoflsports.com",219],["usdtoreros.com",219],["utahstateaggies.com",219],["utepathletics.com",219],["utrockets.com",219],["uvmathletics.com",219],["uwbadgers.com",219],["villanova.com",219],["wkusports.com",219],["wmubroncos.com",219],["woffordterriers.com",219],["1pack1goal.com",219],["bcuathletics.com",219],["bubraves.com",219],["goblackbears.com",219],["golightsgo.com",219],["gomcpanthers.com",219],["goutsa.com",219],["mercerbears.com",219],["pirateblue.com",219],["pirateblue.net",219],["pirateblue.org",219],["quinnipiacbobcats.com",219],["towsontigers.com",219],["tribeathletics.com",219],["tribeclub.com",219],["utepminermaniacs.com",219],["utepminers.com",219],["wkutickets.com",219],["aopathletics.org",219],["atlantichockeyonline.com",219],["bigsouthnetwork.com",219],["bigsouthsports.com",219],["chawomenshockey.com",219],["dbupatriots.org",219],["drakerelays.org",219],["ecac.org",219],["ecacsports.com",219],["emueagles.com",219],["emugameday.com",219],["gculopes.com",219],["godrakebulldog.com",219],["godrakebulldogs.com",219],["godrakebulldogs.net",219],["goeags.com",219],["goislander.com",219],["goislanders.com",219],["gojacks.com",219],["gomacsports.com",219],["gseagles.com",219],["hubison.com",219],["iowaconference.com",219],["ksuowls.com",219],["lonestarconference.org",219],["mascac.org",219],["midwestconference.org",219],["mountaineast.org",219],["niu-pack.com",219],["nulakers.ca",219],["oswegolakers.com",219],["ovcdigitalnetwork.com",219],["pacersports.com",219],["rmacsports.org",219],["rollrivers.com",219],["samfordsports.com",219],["uncpbraves.com",219],["usfdons.com",219],["wiacsports.com",219],["alaskananooks.com",219],["broncathleticfund.com",219],["cameronaggies.com",219],["columbiacougars.com",219],["etownbluejays.com",219],["gobadgers.ca",219],["golancers.ca",219],["gometrostate.com",219],["gothunderbirds.ca",219],["kentstatesports.com",219],["lehighsports.com",219],["lopers.com",219],["lycoathletics.com",219],["lycomingathletics.com",219],["maraudersports.com",219],["mauiinvitational.com",219],["msumavericks.com",219],["nauathletics.com",219],["nueagles.com",219],["nwusports.com",219],["oceanbreezenyc.org",219],["patriotathleticfund.com",219],["pittband.com",219],["principiaathletics.com",219],["roadrunnersathletics.com",219],["sidearmsocial.com",219],["snhupenmen.com",219],["stablerarena.com",219],["stoutbluedevils.com",219],["uwlathletics.com",219],["yumacs.com",219],["collegefootballplayoff.com",219],["csurams.com",219],["cubuffs.com",219],["gobearcats.com",219],["gohuskies.com",219],["mgoblue.com",219],["osubeavers.com",219],["pittsburghpanthers.com",219],["rolltide.com",219],["texassports.com",219],["thesundevils.com",219],["uclabruins.com",219],["wvuathletics.com",219],["wvusports.com",219],["arizonawildcats.com",219],["calbears.com",219],["cuse.com",219],["georgiadogs.com",219],["goducks.com",219],["goheels.com",219],["gostanford.com",219],["insidekstatesports.com",219],["insidekstatesports.info",219],["insidekstatesports.net",219],["insidekstatesports.org",219],["k-stateathletics.com",219],["k-statefootball.net",219],["k-statefootball.org",219],["k-statesports.com",219],["k-statesports.net",219],["k-statesports.org",219],["k-statewomenshoops.com",219],["k-statewomenshoops.net",219],["k-statewomenshoops.org",219],["kstateathletics.com",219],["kstatefootball.net",219],["kstatefootball.org",219],["kstatesports.com",219],["kstatewomenshoops.com",219],["kstatewomenshoops.net",219],["kstatewomenshoops.org",219],["ksuathletics.com",219],["ksusports.com",219],["scarletknights.com",219],["showdownforrelief.com",219],["syracusecrunch.com",219],["texastech.com",219],["theacc.com",219],["ukathletics.com",219],["usctrojans.com",219],["utahutes.com",219],["utsports.com",219],["wsucougars.com",219],["mangadods.com",219],["tricksplit.io",219],["litecoinads.com",219],["template.city",219],["fangraphs.com",220],["4players.de",[221,291]],["buffed.de",221],["gamesaktuell.de",221],["gamezone.de",221],["pcgames.de",221],["player.pcgameshardware.de",221],["videogameszone.de",221],["spieletipps.de",221],["planetaminecraft.com",222],["flyad.vip",223],["lapresse.ca",224],["kolyoom.com",225],["ilovephd.com",225],["upstream.to",226],["negumo.com",227],["games.wkb.jp",[228,229]],["channelmyanmar.org",[230,231]],["u-s-news.com",231],["fandom.com",[232,486,487]],["kenshi.fandom.com",233],["hausbau-forum.de",234],["fake-it.ws",235],["laksa19.github.io",236],["revadvert.com",237],["1shortlink.com",238],["nesia.my.id",239],["makemoneywithurl.com",240],["resetoff.pl",241],["sexodi.com",241],["cdn77.org",242],["howtofixwindows.com",243],["3sexporn.com",244],["momxxxsex.com",244],["myfreevintageporn.com",244],["penisbuyutucum.net",244],["lightnovelworld.com",245],["ujszo.com",246],["newsmax.com",247],["bobs-tube.com",248],["nadidetarifler.com",249],["siz.tv",249],["suzylu.co.uk",[250,251]],["onworks.net",252],["yabiladi.com",252],["homeairquality.org",254],["faucettronn.click",254],["downloadsoft.net",255],["imgair.net",256],["imgblaze.net",256],["imgfrost.net",256],["pixsera.net",256],["vestimage.site",256],["imgwia.buzz",256],["testlanguages.com",257],["newsinlevels.com",257],["videosinlevels.com",257],["arcai.com",258],["my-code4you.blogspot.com",259],["vlxxs.net",260],["rapelust.com",260],["vtube.to",260],["vtplay.net",260],["desitelugusex.com",260],["xvideos-downloader.net",260],["xxxvideotube.net",260],["sdefx.cloud",260],["nozomi.la",260],["moviesonlinefree.net",260],["flickr.com",261],["firefile.cc",262],["pestleanalysis.com",262],["kochamjp.pl",262],["tutorialforlinux.com",262],["724indir.com",262],["whatsaero.com",262],["animeblkom.net",[262,278]],["blkom.com",262],["globes.co.il",[263,264]],["jardiner-malin.fr",265],["tw-calc.net",266],["ohmybrush.com",267],["talkceltic.net",268],["zdam.xyz",269],["mentalfloss.com",270],["uprafa.com",271],["cube365.net",272],["nightfallnews.com",[273,274]],["wwwfotografgotlin.blogspot.com",275],["freelistenonline.com",275],["badassdownloader.com",276],["quickporn.net",277],["aosmark.com",279],["theappstore.org",279],["atozmath.com",[280,281,282,283,284,285,286]],["newyorker.com",287],["brighteon.com",288],["more.tv",289],["video1tube.com",290],["alohatube.xyz",290],["link.cgtips.org",292],["hentaicloud.com",293],["netfapx.com",295],["androidtvbox.eu",297],["madeinvilnius.lt",297],["paperzonevn.com",298],["hentaienglish.com",299],["hentaiporno.xxx",299],["venge.io",[300,301]],["btcbux.io",302],["its.porn",[303,304]],["atv.at",305],["2ndrun.tv",306],["rackusreads.com",306],["exerror.com",306],["toppixxx.com",307],["temp-phone-number.com",308],["jetpunk.com",310],["imgur.com",311],["hentai-party.com",312],["hentaicomics.pro",312],["xxx-comics.pro",312],["genshinimpactcalculator.com",315],["mysexgames.com",316],["embed.indavideo.hu",319],["coinurl.net",[320,321]],["mdn.rest",322],["gdr-online.com",323],["mmm.dk",324],["iqiyi.com",[325,326]],["m.iqiyi.com",327],["japopav.tv",328],["lvturbo.com",328],["nbcolympics.com",329],["apkhex.com",330],["indiansexstories2.net",331],["issstories.xyz",331],["1340kbbr.com",332],["gorgeradio.com",332],["kduk.com",332],["kedoam.com",332],["kejoam.com",332],["kelaam.com",332],["khsn1230.com",332],["kjmx.rocks",332],["kloo.com",332],["klooam.com",332],["klykradio.com",332],["kmed.com",332],["kmnt.com",332],["kool991.com",332],["kpnw.com",332],["kppk983.com",332],["krktcountry.com",332],["ktee.com",332],["kwro.com",332],["kxbxfm.com",332],["thevalley.fm",332],["dsocker1234.blogspot.com",333],["blick.ch",335],["mgnet.xyz",336],["designtagebuch.de",337],["pixroute.com",338],["calculator-online.net",339],["porngames.club",340],["sexgames.xxx",340],["111.90.159.132",341],["battleplan.news",341],["mobile-tracker-free.com",342],["pfps.gg",343],["ac-illust.com",[344,345]],["photo-ac.com",[344,345]],["social-unlock.com",346],["ninja.io",347],["sourceforge.net",348],["samfirms.com",349],["banned.video",350],["conspiracyfact.info",350],["freeworldnews.tv",350],["madmaxworld.tv",350],["huffpost.com",351],["ingles.com",352],["surfline.com",353],["play.tv3.ee",354],["trendyoum.com",355],["bulbagarden.net",356],["doomovie-hd.com",357],["madoohd.com",357],["moviestars.to",358],["hollywoodlife.com",359],["searchresults.cc",360],["mat6tube.com",361],["textstudio.co",362],["newtumbl.com",363],["nevcoins.club",365],["mail.com",366],["erome.com",369],["oggi.it",[370,371]],["video.gazzetta.it",[370,371]],["mangakita.net",372],["allcryptoz.net",373],["crewbase.net",373],["phineypet.com",373],["shinbhu.net",373],["talkforfitness.com",373],["mdn.lol",373],["carsmania.net",373],["carstopia.net",373],["coinsvalue.net",373],["cookinguide.net",373],["freeoseocheck.com",373],["makeupguide.net",373],["btcbitco.in",373],["btcsatoshi.net",373],["cempakajaya.com",373],["crypto4yu.com",373],["readbitcoin.org",373],["wiour.com",373],["exactpay.online",373],["avpgalaxy.net",374],["mhma12.tech",375],["panda-novel.com",376],["zebranovel.com",376],["lightsnovel.com",376],["eaglesnovel.com",376],["pandasnovel.com",376],["zadfaucet.com",377],["ewrc-results.com",378],["kizi.com",379],["cyberscoop.com",380],["fedscoop.com",380],["canale.live",381],["loawa.com",382],["ygosu.com",382],["sportalkorea.com",382],["algumon.com",382],["hancinema.net",382],["enetnews.co.kr",382],["edaily.co.kr",382],["economist.co.kr",382],["etoday.co.kr",382],["hankyung.com",382],["isplus.com",382],["hometownstation.com",382],["mafiatown.pl",[383,384]],["jeep-cj.com",385],["sponsorhunter.com",386],["coinscap.info",387],["cryptowidgets.net",387],["greenenez.com",387],["insurancegold.in",387],["webfreetools.net",387],["wiki-topia.com",387],["rapid-cloud.co",387],["cloudcomputingtopics.net",388],["likecs.com",389],["tiscali.it",390],["linkspy.cc",391],["tutelehd3.xyz",392],["dirty.pink",[393,394,395]],["adshnk.com",396],["chattanoogan.com",397],["socialmediagirls.com",398],["windowspro.de",399],["snapinsta.app",400],["chip.de",401],["mydaddy.cc",402],["roadtrippin.fr",403],["redketchup.io",[404,405,406]],["anyporn.com",[407,422]],["bravoporn.com",407],["bravoteens.com",407],["crocotube.com",407],["hellmoms.com",407],["hellporno.com",407],["sex3.com",407],["tubewolf.com",407],["xbabe.com",407],["xcum.com",407],["zedporn.com",407],["imagetotext.info",408],["infokik.com",409],["freepik.com",410],["ddwloclawek.pl",[411,412]],["videogamer.com",413],["wrestlinginc.com",413],["qtoptens.com",413],["deezer.com",414],["my-subs.co",415],["plaion.com",416],["slideshare.net",[417,418]],["ustreasuryyieldcurve.com",419],["goo.st",420],["freevpshere.com",420],["softwaresolutionshere.com",420],["staige.tv",423],["bondagevalley.cc",424],["androidadult.com",425],["sharer.pm",426],["watchtv24.com",427],["cellmapper.net",428],["medscape.com",429],["arkadium.com",430],["app.blubank.com",432],["lifesurance.info",433],["sportdeutschland.tv",434],["kcra.com",434],["wcvb.com",434],["kusonime.com",435],["coursedrive.org",437],["dtbps3games.com",437],["vod.pl",438],["megadrive-emulator.com",439],["animesaga.in",442],["bestx.stream",442],["moviesapi.club",442],["digimanie.cz",443],["svethardware.cz",443],["srvy.ninja",444],["drawer-opportunity-i-243.site",445],["tchatche.com",446],["ozulmanga.com",447],["edmdls.com",448],["freshremix.net",448],["scenedl.org",448],["trakt.tv",449],["teamskeet.com",450],["tacobell.com",452],["webtoons.com",[453,454]],["zefoy.com",456],["br.de",457],["pasteboard.co",458],["avclub.com",459],["clickhole.com",459],["deadspin.com",459],["gizmodo.com",459],["jalopnik.com",459],["jezebel.com",459],["kotaku.com",459],["lifehacker.com",459],["splinternews.com",459],["theinventory.com",459],["theonion.com",459],["theroot.com",459],["thetakeout.com",459],["pewresearch.org",459],["los40.com",[460,461]],["verizon.com",462],["humanbenchmark.com",463],["politico.com",464],["officedepot.co.cr",[465,466]],["usnews.com",467],["factable.com",469],["zee5.com",470],["gala.fr",471],["geo.fr",471],["voici.fr",471],["gloucestershirelive.co.uk",472],["arsiv.mackolik.com",473],["jacksonguitars.com",474],["scandichotels.com",475],["stylist.co.uk",476],["nettiauto.com",477],["thaiairways.com",[478,479]],["cerbahealthcare.it",[480,481]],["futura-sciences.com",[480,496]],["tiendaenlinea.claro.com.ni",[482,483]],["tieba.baidu.com",484],["linktr.ee",485],["grasshopper.com",[488,489]],["epson.com.cn",[490,491]],["oe24.at",[492,493]],["szbz.de",492],["platform.autods.com",[494,495]],["wikihow.com",497],["citibank.com.sg",498],["smallseotools.com",499]]);

const entitiesMap = new Map([["vidsrc",7],["watch-series",7],["watchseries",7],["vev",7],["vidop",7],["vidup",7],["starmusiq",10],["wcofun",10],["kissasian",12],["gogoanime",[12,20]],["1movies",[12,19]],["xmovies8",12],["animeheaven",12],["0123movies",12],["gostream",12],["gomovies",12],["hamsterix",13],["xhamster",13],["xhamster1",13],["xhamster10",13],["xhamster11",13],["xhamster12",13],["xhamster13",13],["xhamster14",13],["xhamster15",13],["xhamster16",13],["xhamster17",13],["xhamster18",13],["xhamster19",13],["xhamster20",13],["xhamster2",13],["xhamster3",13],["xhamster4",13],["xhamster5",13],["xhamster7",13],["xhamster8",13],["vidlox",[14,15]],["primewire",16],["streanplay",[16,18]],["sbplay",16],["milfnut",16],["fmovies",20],["9anime",20],["hqq",[24,25]],["waaw",25],["123link",26],["adshort",26],["linkshorts",26],["adsrt",26],["vinaurl",26],["adfloz",26],["dutchycorp",26],["shortearn",26],["pingit",26],["urlty",26],["seulink",26],["shrink",26],["tmearn",26],["megalink",26],["linkviet",26],["miniurl",26],["pcprogramasymas",26],["link1s",26],["shortzzy",26],["shorttey",[26,213]],["lite-link",26],["pureshort",26],["adcorto",26],["dulinks",26],["zshort",26],["upfiles",26],["linkfly",26],["wplink",26],["financerites",26],["camwhores",[27,38,88,89,90]],["tube8",[28,29]],["youporn",29],["redtube",29],["pornhub",[29,199,200]],["xtits",[54,124]],["pouvideo",62],["povvideo",62],["povw1deo",62],["povwideo",62],["powv1deo",62],["powvibeo",62],["powvideo",62],["powvldeo",62],["acortalo",[67,68,69,70]],["acortar",[67,68,69,70]],["plyjam",[72,73]],["fxporn69",78],["vipbox",79],["viprow",79],["desbloqueador",84],["xberuang",86],["teknorizen",86],["linkberuang",86],["kickassanime",91],["subtorrents",93],["subtorrents1",93],["newpelis",93],["pelix",93],["allcalidad",93],["infomaniakos",93],["filecrypt",97],["tornadomovies",98],["sexwebvideo",103],["mangovideo",103],["icdrama",109],["mangasail",109],["file4go",111],["asianclub",127],["anitube",134],["mixdrop",137],["azsoft",150],["uploadev",166],["ver-pelis-online",177],["ancient-origins",186],["lookcam",213],["lootlinks",213],["dpstream",216],["bluemediafiles",218],["docer",241],["pixlev",256],["skymovieshd",260],["dvdplay",260],["crackstreams",296],["123movieshd",309],["uproxy",313],["animesa",314],["cinecalidad",[317,318]],["apkmaven",364],["gmx",367],["gamereactor",421],["terabox",431],["tvhay",[440,441]],["www.google",451]]);

const exceptionsMap = new Map([["pingit.com",[26]],["pingit.me",[26]]]);

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
        } else if ( cValue === "''" || cValue === '' ) {
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
                try { cValue = safe.jsonParse(cValue).value; } catch(ex) { return; }
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
        'Error': self.Error,
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'fetch': self.fetch,
        'jsonParse': self.JSON.parse.bind(self.JSON),
        'jsonStringify': self.JSON.stringify.bind(self.JSON),
        'log': console.log.bind(console),
        uboLog(...args) {
            if ( args.length === 0 ) { return; }
            if ( `${args[0]}` === '' ) { return; }
            this.log('[uBO]', ...args);
        },
        initPattern(pattern, options = {}) {
            if ( pattern === '' ) {
                return { matchAll: true };
            }
            const expect = (options.canNegate === true && pattern.startsWith('!') === false);
            if ( expect === false ) {
                pattern = pattern.slice(1);
            }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match !== null ) {
                return {
                    pattern,
                    re: new this.RegExp(
                        match[1],
                        match[2] || options.flags
                    ),
                    expect,
                };
            }
            return {
                pattern,
                re: new this.RegExp(pattern.replace(
                    /[.*+?^${}()|[\]\\]/g, '\\$&'),
                    options.flags
                ),
                expect,
            };
        },
        testPattern(details, haystack) {
            if ( details.matchAll ) { return true; }
            return this.RegExp_test.call(details.re, haystack) === details.expect;
        },
        patternToRegex(pattern, flags = undefined) {
            if ( pattern === '' ) { return /^/; }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match === null ) {
                return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
            }
            try {
                return new RegExp(match[1], match[2] || flags);
            }
            catch(ex) {
            }
            return /^/;
        },
        getExtraArgs(args, offset = 0) {
            const entries = args.slice(offset).reduce((out, v, i, a) => {
                if ( (i & 1) === 0 ) {
                    const rawValue = a[i+1];
                    const value = /^\d+$/.test(rawValue)
                        ? parseInt(rawValue, 10)
                        : rawValue;
                    out.push([ a[i], value ]);
                }
                return out;
            }, []);
            return Object.fromEntries(entries);
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
    try { setConstant(...argsList[i]); }
    catch(ex) {}
}
argsList.length = 0;

/******************************************************************************/

};
// End of code to inject

/******************************************************************************/

// Inject code

// https://bugzilla.mozilla.org/show_bug.cgi?id=1736575
//   `MAIN` world not yet supported in Firefox, so we inject the code into
//   'MAIN' ourself when enviroment in Firefox.

// Not Firefox
if ( typeof wrappedJSObject !== 'object' ) {
    return uBOL_setConstant();
}

// Firefox
{
    const page = self.wrappedJSObject;
    let script, url;
    try {
        page.uBOL_setConstant = cloneInto([
            [ '(', uBOL_setConstant.toString(), ')();' ],
            { type: 'text/javascript; charset=utf-8' },
        ], self);
        const blob = new page.Blob(...page.uBOL_setConstant);
        url = page.URL.createObjectURL(blob);
        const doc = page.document;
        script = doc.createElement('script');
        script.async = false;
        script.src = url;
        (doc.head || doc.documentElement || doc).append(script);
    } catch (ex) {
        console.error(ex);
    }
    if ( url ) {
        if ( script ) { script.remove(); }
        page.URL.revokeObjectURL(url);
    }
    delete page.uBOL_setConstant;
}

/******************************************************************************/

// End of local scope
})();

/******************************************************************************/

void 0;
