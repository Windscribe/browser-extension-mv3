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

(function uBOL_setConstant() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"ytInitialPlayerResponse.adPlacements\",\"undefined\"]","[\"playerResponse.adPlacements\",\"undefined\"]","[\"abp\",\"false\"]","[\"oeo\",\"noopFunc\"]","[\"nsShowMaxCount\",\"0\"]","[\"objVc.interstitial_web\",\"\"]","[\"console.clear\",\"trueFunc\"]","[\"_ml_ads_ns\",\"null\"]","[\"_sp_.config\",\"undefined\"]","[\"isAdBlockActive\",\"false\"]","[\"AdController\",\"noopFunc\"]","[\"check_adblock\",\"true\"]","[\"initials.yld-pdpopunder\",\"\"]","[\"xRds\",\"false\"]","[\"tRds\",\"true\"]","[\"console.clear\",\"noopFunc\"]","[\"String.fromCharCode\",\"noopFunc\"]","[\"console.log\",\"noopFunc\"]","[\"String.prototype.charCodeAt\",\"trueFunc\"]","[\"console.clear\",\"undefined\"]","[\"attachEvent\",\"trueFunc\"]","[\"hasAdBlocker\",\"false\"]","[\"Object.prototype._getSalesHouseConfigurations\",\"noopFunc\"]","[\"sadbl\",\"false\"]","[\"adblockcheck\",\"false\"]","[\"blurred\",\"false\"]","[\"flashvars.adv_pre_src\",\"\"]","[\"showPopunder\",\"false\"]","[\"page_params.holiday_promo\",\"true\"]","[\"adsEnabled\",\"true\"]","[\"String.prototype.charAt\",\"trueFunc\"]","[\"ad_blocker\",\"false\"]","[\"blockAdBlock\",\"true\"]","[\"is_adblocked\",\"false\"]","[\"showPopunder\",\"noopFunc\"]","[\"VikiPlayer.prototype.pingAbFactor\",\"noopFunc\"]","[\"player.options.disableAds\",\"true\"]","[\"flashvars.adv_pre_vast\",\"\"]","[\"flashvars.adv_pre_vast_alt\",\"\"]","[\"x_width\",\"1\"]","[\"_site_ads_ns\",\"true\"]","[\"luxuretv.config\",\"\"]","[\"$.adblock\",\"0\"]","[\"Object.prototype.AdOverlay\",\"noopFunc\"]","[\"tkn_popunder\",\"null\"]","[\"can_run_ads\",\"true\"]","[\"adsBlockerDetector\",\"noopFunc\"]","[\"globalThis\",\"null\"]","[\"adblock\",\"false\"]","[\"__ads\",\"true\"]","[\"FlixPop.isPopGloballyEnabled\",\"falseFunc\"]","[\"fuckAdBlock\",\"false\"]","[\"$.magnificPopup.open\",\"noopFunc\"]","[\"adsenseadBlock\",\"noopFunc\"]","[\"flashvars.adv_pause_html\",\"\"]","[\"adblockSuspected\",\"false\"]","[\"disasterpingu\",\"false\"]","[\"CnnXt.Event.fire\",\"noopFunc\"]","[\"App.views.adsView.adblock\",\"false\"]","[\"$.fx.off\",\"true\"]","[\"adsClasses\",\"undefined\"]","[\"gsecs\",\"0\"]","[\"isAdb\",\"false\"]","[\"adBlockEnabled\",\"false\"]","[\"puShown\",\"true\"]","[\"ads_b_test\",\"true\"]","[\"showAds\",\"true\"]","[\"clicked\",\"true\"]","[\"eClicked\",\"true\"]","[\"number\",\"0\"]","[\"sync\",\"true\"]","[\"detectAdBlock\",\"noopFunc\"]","[\"attr\",\"{}\"]","[\"scriptSrc\",\"\"]","[\"Object.prototype.adReinsertion\",\"noopFunc\"]","[\"Object.prototype.disableAds\",\"true\"]","[\"cxStartDetectionProcess\",\"noopFunc\"]","[\"isAdBlocked\",\"false\"]","[\"adblock\",\"noopFunc\"]","[\"path\",\"\"]","[\"adBlock\",\"false\"]","[\"_ctrl_vt.blocked.ad_script\",\"false\"]","[\"blockAdBlock\",\"noopFunc\"]","[\"publd.noads\",\"true\"]","[\"caca\",\"noopFunc\"]","[\"Ok\",\"true\"]","[\"isBlocked\",\"false\"]","[\"safelink.adblock\",\"false\"]","[\"ClickUnder\",\"noopFunc\"]","[\"flashvars.adv_pre_url\",\"\"]","[\"flashvars.protect_block\",\"\"]","[\"flashvars.video_click_url\",\"\"]","[\"ifmax\",\"true\"]","[\"spoof\",\"noopFunc\"]","[\"btoa\",\"null\"]","[\"sp_ad\",\"true\"]","[\"adsBlocked\",\"false\"]","[\"_sp_.msg.displayMessage\",\"noopFunc\"]","[\"isAdblock\",\"false\"]","[\"atob\",\"noopFunc\"]","[\"CaptchmeState.adb\",\"undefined\"]","[\"indexedDB.open\",\"trueFunc\"]","[\"UhasAB\",\"false\"]","[\"flashvars.popunder_url\",\"\"]","[\"_pop\",\"noopFunc\"]","[\"_ti_update_user\",\"noopFunc\"]","[\"valid\",\"1\"]","[\"vastAds\",\"[]\"]","[\"isAdsDisplayed\",\"true\"]","[\"adblock\",\"1\"]","[\"frg\",\"1\"]","[\"time\",\"0\"]","[\"vpPrerollVideo\",\"undefined\"]","[\"ads\",\"true\"]","[\"GNCA_Ad_Support\",\"true\"]","[\"ad_permission\",\"true\"]","[\"Date.now\",\"noopFunc\"]","[\"jQuery.adblock\",\"1\"]","[\"ads_js_was_loaded\",\"true\"]","[\"VMG.Components.Adblock\",\"false\"]","[\"wlm.adsNotBlocked\",\"true\"]","[\"_n_app.popunder\",\"null\"]","[\"adblockDetector\",\"trueFunc\"]","[\"hasPoped\",\"true\"]","[\"flashvars.video_click_url\",\"undefined\"]","[\"flashvars.adv_start_html\",\"\"]","[\"jQuery.adblock\",\"false\"]","[\"google_jobrunner\",\"true\"]","[\"buttonLink\",\"noopFunc\"]","[\"clientSide.adbDetect\",\"noopFunc\"]","[\"sec\",\"0\"]","[\"gadb\",\"false\"]","[\"checkadBlock\",\"noopFunc\"]","[\"di.VAST.XHRURLHandler\",\"noopFunc\"]","[\"cmnnrunads\",\"true\"]","[\"adBlocker\",\"false\"]","[\"adBlockDetected\",\"noopFunc\"]","[\"StileApp.somecontrols.adBlockDetected\",\"noopFunc\"]","[\"checkdom\",\"0\"]","[\"MDCore.adblock\",\"0\"]","[\"google_tag_data\",\"noopFunc\"]","[\"noAdBlock\",\"true\"]","[\"counter\",\"0\"]","[\"window_focus\",\"true\"]","[\"adsOk\",\"true\"]","[\"Object.prototype._parseVAST\",\"noopFunc\"]","[\"Object.prototype.createAdBlocker\",\"noopFunc\"]","[\"Object.prototype.isAdPeriod\",\"falseFunc\"]","[\"popup\",\"noopFunc\"]","[\"check\",\"true\"]","[\"daganKwarta\",\"true\"]","[\"dvsize\",\"51\"]","[\"isal\",\"true\"]","[\"count\",\"0\"]","[\"document.hidden\",\"true\"]","[\"lck\",\"true\"]","[\"awm\",\"true\"]","[\"adblockEnabled\",\"false\"]","[\"Global.adv\",\"undefined\"]","[\"ABLK\",\"false\"]","[\"pogo.intermission.staticAdIntermissionPeriod\",\"0\"]","[\"SubmitDownload1\",\"noopFunc\"]","[\"t\",\"0\"]","[\"ckaduMobilePop\",\"noopFunc\"]","[\"tieneAdblock\",\"0\"]","[\"adsAreBlocked\",\"false\"]","[\"cmgpbjs\",\"false\"]","[\"displayAdblockOverlay\",\"false\"]","[\"google\",\"false\"]","[\"Math.pow\",\"noopFunc\"]","[\"openInNewTab\",\"noopFunc\"]","[\"adblockDetector\",\"noopFunc\"]","[\"loadingAds\",\"true\"]","[\"ads_blocked\",\"0\"]","[\"runAdBlocker\",\"false\"]","[\"td_ad_background_click_link\",\"undefined\"]","[\"Adblock\",\"false\"]","[\"flashvars.logo_url\",\"\"]","[\"flashvars.logo_text\",\"\"]","[\"nlf.custom.userCapabilities\",\"false\"]","[\"nozNoAdBlock\",\"true\"]","[\"decodeURIComponent\",\"trueFunc\"]","[\"process\",\"noopFunc\"]","[\"LoadThisScript\",\"true\"]","[\"showPremLite\",\"true\"]","[\"closeBlockerModal\",\"false\"]","[\"adBlockDetector.isEnabled\",\"falseFunc\"]","[\"testerli\",\"false\"]","[\"areAdsDisplayed\",\"true\"]","[\"gkAdsWerbung\",\"true\"]","[\"document.bridCanRunAds\",\"true\"]","[\"pop_target\",\"null\"]","[\"is_banner\",\"true\"]","[\"$easyadvtblock\",\"false\"]","[\"fuckAdBlock._options.baitClass\",\"null\"]","[\"iExist\",\"true\"]","[\"show_dfp_preroll\",\"false\"]","[\"show_youtube_preroll\",\"false\"]","[\"show_ads_gr8_lite\",\"true\"]","[\"doads\",\"true\"]","[\"jsUnda\",\"noopFunc\"]","[\"abp\",\"noopFunc\"]","[\"AlobaidiDetectAdBlock\",\"true\"]","[\"Advertisement\",\"1\"]","[\"adBlockDetected\",\"false\"]","[\"HTMLElement.prototype.attachShadow\",\"null\"]","[\"abp1\",\"1\"]","[\"pr_okvalida\",\"true\"]","[\"$.ajax\",\"trueFunc\"]","[\"getHomadConfig\",\"noopFunc\"]","[\"adsbygoogle.loaded\",\"true\"]","[\"cnbc.canShowAds\",\"true\"]","[\"Adv_ab\",\"false\"]","[\"chrome\",\"undefined\"]","[\"firefaucet\",\"true\"]","[\"app.addonIsInstalled\",\"trueFunc\"]","[\"flashvars.popunder_url\",\"undefined\"]","[\"adv\",\"true\"]","[\"pqdxwidthqt\",\"false\"]","[\"canRunAds\",\"true\"]","[\"Fingerprint2\",\"true\"]","[\"dclm_ajax_var.disclaimer_redirect_url\",\"\"]","[\"load_pop_power\",\"noopFunc\"]","[\"adBlockDetected\",\"true\"]","[\"Time_Start\",\"0\"]","[\"blockAdBlock\",\"trueFunc\"]","[\"ezstandalone.enabled\",\"true\"]","[\"CustomEvent\",\"noopFunc\"]","[\"ab\",\"false\"]","[\"go_popup\",\"{}\"]","[\"noBlocker\",\"true\"]","[\"adsbygoogle\",\"null\"]","[\"killads\",\"true\"]","[\"cRAds\",\"null\"]","[\"fabActive\",\"false\"]","[\"gWkbAdVert\",\"true\"]","[\"noblock\",\"true\"]","[\"ai_dummy\",\"true\"]","[\"ulp_noadb\",\"true\"]","[\"wgAffiliateEnabled\",\"false\"]","[\"ads\",\"null\"]","[\"checkAdsBlocked\",\"noopFunc\"]","[\"adsLoadable\",\"true\"]","[\"ASSetCookieAds\",\"null\"]","[\"AdBlockerDetected\",\"noopFunc\"]","[\"letShowAds\",\"true\"]","[\"tidakAdaPenghalangAds\",\"true\"]","[\"timeSec\",\"0\"]","[\"ads_unblocked\",\"true\"]","[\"xxSetting.adBlockerDetection\",\"false\"]","[\"better_ads_adblock\",\"null\"]","[\"open\",\"undefined\"]","[\"importFAB\",\"undefined\"]","[\"Drupal.behaviors.adBlockerPopup\",\"null\"]","[\"fake_ad\",\"true\"]","[\"flashvars.mlogo\",\"\"]","[\"koddostu_com_adblock_yok\",\"null\"]","[\"adsbygoogle\",\"trueFunc\"]","[\"player.ads.cuePoints\",\"undefined\"]","[\"adBlockDetected\",\"null\"]","[\"fouty\",\"true\"]","[\"detectAdblock\",\"noopFunc\"]","[\"better_ads_adblock\",\"1\"]","[\"hold_click\",\"false\"]","[\"sgpbCanRunAds\",\"true\"]","[\"config.pauseInspect\",\"false\"]","[\"D4zz\",\"noopFunc\"]","[\"appContext.adManager.context.current.adFriendly\",\"false\"]","[\"blockAdBlock._options.baitClass\",\"null\"]","[\"document.blocked_var\",\"1\"]","[\"____ads_js_blocked\",\"false\"]","[\"wIsAdBlocked\",\"false\"]","[\"WebSite.plsDisableAdBlock\",\"null\"]","[\"ads_blocked\",\"false\"]","[\"samDetected\",\"false\"]","[\"sems\",\"noopFunc\"]","[\"countClicks\",\"0\"]","[\"settings.adBlockerDetection\",\"false\"]","[\"mixpanel.get_distinct_id\",\"true\"]","[\"bannersLoaded\",\"4\"]","[\"notEmptyBanners\",\"4\"]","[\"bscheck.adblocker\",\"noopFunc\"]","[\"qpcheck.ads\",\"noopFunc\"]","[\"CloudflareApps.installs.Ik7rmQ4t95Qk.options.measureDomain\",\"undefined\"]","[\"detectAB1\",\"noopFunc\"]","[\"paywallGateway.truncateContent\",\"noopFunc\"]","[\"adBlockDisabled\",\"true\"]","[\"blockedElement\",\"noopFunc\"]","[\"popit\",\"false\"]","[\"adBlockerDetected\",\"false\"]","[\"countdown\",\"0\"]","[\"decodeURI\",\"noopFunc\"]","[\"flashvars.adv_postpause_vast\",\"\"]","[\"univresalP\",\"noopFunc\"]","[\"runAdblock\",\"noopFunc\"]","[\"$tieE3\",\"true\"]","[\"xv_ad_block\",\"0\"]","[\"vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads\",\"\"]","[\"adsProvider.init\",\"noopFunc\"]","[\"SDKLoaded\",\"true\"]","[\"blockAdBlock._creatBait\",\"null\"]","[\"POPUNDER_ENABLED\",\"false\"]","[\"plugins.preroll\",\"noopFunc\"]","[\"errcode\",\"0\"]","[\"DHAntiAdBlocker\",\"true\"]","[\"adblock\",\"0\"]","[\"db.onerror\",\"noopFunc\"]","[\"p18\",\"undefined\"]","[\"asc\",\"1\"]","[\"ADBLOCKED\",\"false\"]","[\"adb\",\"0\"]","[\"String.fromCharCode\",\"trueFunc\"]","[\"adblock_use\",\"false\"]","[\"nitroAds.loaded\",\"true\"]","[\"createCanvas\",\"noopFunc\"]","[\"playerAdSettings.adLink\",\"\"]","[\"playerAdSettings.waitTime\",\"0\"]","[\"AdHandler.adblocked\",\"0\"]","[\"adsHeight\",\"11\"]","[\"checkCap\",\"0\"]","[\"waitTime\",\"0\"]","[\"isAdsLoaded\",\"true\"]","[\"adblockerAlert\",\"noopFunc\"]","[\"Object.prototype.parseXML\",\"noopFunc\"]","[\"Object.prototype.blackscreenDuration\",\"1\"]","[\"Object.prototype.adPlayerId\",\"\"]","[\"isadb\",\"false\"]","[\"adblockDetect\",\"noopFunc\"]","[\"style\",\"noopFunc\"]","[\"history.pushState\",\"noopFunc\"]","[\"google_unique_id\",\"6\"]","[\"new_config.timedown\",\"0\"]","[\"timedisplay\",\"0\"]","[\"Object.prototype.isAdDisabled\",\"true\"]","[\"hiddenProxyDetected\",\"false\"]","[\"SteadyWidgetSettings.adblockActive\",\"false\"]","[\"proclayer\",\"noopFunc\"]","[\"load_ads\",\"trueFunc\"]","[\"starPop\",\"1\"]","[\"Object.prototype.ads\",\"noopFunc\"]","[\"detectBlockAds\",\"noopFunc\"]","[\"ga\",\"trueFunc\"]","[\"enable_dl_after_countdown\",\"true\"]","[\"isGGSurvey\",\"true\"]","[\"ad_link\",\"\"]","[\"App.AdblockDetected\",\"false\"]","[\"SF.adblock\",\"true\"]","[\"startfrom\",\"0\"]","[\"Object.prototype.nopreroll_\",\"true\"]","[\"ublocked\",\"false\"]","[\"HP_Scout.adBlocked\",\"false\"]","[\"SD_IS_BLOCKING\",\"false\"]","[\"__BACKPLANE_API__.renderOptions.showAdBlock\",\"\"]","[\"Object.prototype.isNoAds\",\"{}\"]","[\"countDownDate\",\"0\"]","[\"setupSkin\",\"noopFunc\"]","[\"adSettings\",\"[]\"]","[\"count\",\"1\"]","[\"Object.prototype.enableInterstitial\",\"false\"]","[\"check\",\"noopFunc\"]","[\"ads\",\"undefined\"]","[\"ADBLOCK\",\"false\"]","[\"POSTPART_prototype.ADKEY\",\"noopFunc\"]","[\"adBlockDetected\",\"falseFunc\"]","[\"noAdBlock\",\"noopFunc\"]","[\"AdService.info.abd\",\"noopFunc\"]","[\"adBlockDetectionResult\",\"undefined\"]","[\"popped\",\"true\"]","[\"tiPopAction\",\"noopFunc\"]","[\"google.ima.OmidVerificationVendor\",\"{}\"]","[\"Object.prototype.omidAccessModeRules\",\"{}\"]","[\"puShown1\",\"true\"]","[\"passthetest\",\"true\"]","[\"timeset\",\"0\"]","[\"pandaAdviewValidate\",\"true\"]","[\"verifica_adblock\",\"noopFunc\"]","[\"canGetAds\",\"true\"]","[\"ad_blocker_active\",\"false\"]","[\"init_welcome_ad\",\"noopFunc\"]","[\"moneyAbovePrivacyByvCDN\",\"true\"]","[\"dable\",\"{}\"]","[\"aLoad\",\"noopFunc\"]","[\"mtCanRunAdsSoItCanStillBeOnTheWeb\",\"true\"]","[\"document.body.contains\",\"trueFunc\"]","[\"popunder\",\"undefined\"]","[\"distance\",\"0\"]","[\"document.onclick\",\"\"]","[\"adEnable\",\"true\"]","[\"currentAd\",\"3\"]","[\"document.hasFocus\",\"trueFunc\"]","[\"displayAds\",\"0\"]","[\"Overlayer\",\"{}\"]","[\"pop3getcookie\",\"undefined\"]","[\"pop3setcookie1\",\"undefined\"]","[\"pop3setCookie2\",\"undefined\"]","[\"_adshrink.skiptime\",\"0\"]","[\"AbleToRunAds\",\"true\"]","[\"TextEncoder\",\"undefined\"]","[\"abpblocked\",\"undefined\"]","[\"app.showModalAd\",\"noopFunc\"]","[\"adt\",\"0\"]","[\"test_adblock\",\"noopFunc\"]","[\"Object.prototype.adBlockerDetected\",\"falseFunc\"]","[\"vastEnabled\",\"false\"]","[\"detectadsbocker\",\"false\"]","[\"two_worker_data_js.js\",\"[]\"]","[\"FEATURE_DISABLE_ADOBE_POPUP_BY_COUNTRY\",\"true\"]","[\"questpassGuard\",\"noopFunc\"]","[\"admiral\",\"noopFunc\"]","[\"timeLeft\",\"0\"]","[\"Cookiebot\",\"noopFunc\"]","[\"navigator.brave\",\"undefined\"]","[\"feature_flags.interstitial_ads_flag\",\"false\"]","[\"feature_flags.interstitials_every_four_slides\",\"false\"]","[\"waldoSlotIds\",\"true\"]","[\"adblockstatus\",\"false\"]","[\"adblockEnabled\",\"noopFunc\"]","[\"banner_is_blocked\",\"false\"]","[\"Object.prototype.adBlocked\",\"false\"]","[\"makeMoney\",\"true\"]","[\"chp_adblock_browser\",\"noopFunc\"]","[\"Brid.A9.prototype.backfillAdUnits\",\"[]\"]","[\"slideShow.displayInterstitial\",\"true\"]","[\"S_Popup\",\"2\"]","[\"__INITIAL_STATE__.gameLists.gamesNoPrerollIds.indexOf\",\"trueFunc\"]","[\"navigator.standalone\",\"true\"]","[\"showAdss\",\"true\"]","[\"window.showAdss\",\"true\"]","[\"window.showAds\",\"true\"]","[\"setTimer\",\"0\"]","[\"adikAds\",\"true\"]","[\"penci_adlbock.ad_blocker_detector\",\"0\"]","[\"Object.prototype.adblockDetector\",\"noopFunc\"]","[\"$.tstracker\",\"noopFunc\"]","[\"bmak.js_post\",\"false\"]","[\"ccsrv\",\"\"]","[\"lcs_SerName\",\"\"]","[\"flashvars.event_reporting\",\"\"]","[\"firebase.analytics\",\"noopFunc\"]","[\"akamaiDisableServerIpLookup\",\"noopFunc\"]","[\"nads.createAd\",\"trueFunc\"]","[\"ga\",\"noopFunc\"]","[\"huecosPBS.nstdX\",\"null\"]","[\"DTM.trackAsyncPV\",\"noopFunc\"]","[\"newPageViewSpeedtest\",\"noopFunc\"]","[\"pubg.unload\",\"noopFunc\"]","[\"generateGalleryAd\",\"noopFunc\"]","[\"mediator\",\"noopFunc\"]","[\"Object.prototype.subscribe\",\"noopFunc\"]","[\"Object.prototype.vjsPlayer.ads\",\"noopFunc\"]","[\"network_user_id\",\"\"]","[\"googletag.cmd\",\"{}\"]","[\"Object.prototype.setDisableFlashAds\",\"noopFunc\"]","[\"DD_RUM.addTiming\",\"noopFunc\"]","[\"chameleonVideo.adDisabledRequested\",\"true\"]","[\"analytics\",\"{}\"]","[\"datalayer\",\"[]\"]","[\"Object.prototype.isInitialLoadDisabled\",\"noopFunc\"]","[\"listingGoogleEETracking\",\"noopFunc\"]","[\"dcsMultiTrack\",\"noopFunc\"]","[\"urlStrArray\",\"noopFunc\"]","[\"pa\",\"{}\"]","[\"Object.prototype.setConfigurations\",\"noopFunc\"]","[\"Object.prototype.bk_addPageCtx\",\"noopFunc\"]","[\"Object.prototype.bk_doJSTag\",\"noopFunc\"]","[\"passFingerPrint\",\"noopFunc\"]","[\"DD_LOGS\",\"noopFunc\"]","[\"optimizely\",\"{}\"]","[\"optimizely.initialized\",\"true\"]","[\"google_optimize\",\"{}\"]","[\"google_optimize.get\",\"noopFunc\"]","[\"_gsq\",\"{}\"]","[\"_gsq.push\",\"noopFunc\"]","[\"_hmt.id\",\"1\"]","[\"googletag._vars_\",\"{}\"]","[\"googletag._loadStarted_\",\"true\"]","[\"googletag._loaded_\",\"true\"]","[\"google_unique_id\",\"1\"]","[\"google.javascript\",\"{}\"]","[\"google.javascript.ads\",\"{}\"]","[\"google_global_correlator\",\"1\"]","[\"eish_starts\",\"false\"]"];

const hostnamesMap = new Map([["youtube.com",[0,1]],["youtubekids.com",[0,1]],["youtube-nocookie.com",[0,1]],["t-online.de",2],["whatfinger.com",3],["timesofindia.indiatimes.com",4],["economictimes.indiatimes.com",5],["userscloud.com",6],["motherless.com",7],["sueddeutsche.de",8],["watson.de",8],["watchanimesub.net",9],["wco.tv",9],["wcoanimesub.tv",9],["wcoforever.net",9],["filehorse.com",9],["guidetnt.com",9],["sp-today.com",9],["linkvertise.com",9],["textbin.net",9],["eropaste.com",9],["pastebr.xyz",9],["getpaste.link",9],["sharetext.me",9],["note.sieuthuthuat.com",9],["elcriticodelatele.com",[9,304]],["gadgets.es",[9,304]],["adikhealth.xyz",[9,430]],["bisnis.adigenius.com",[9,430]],["mangindo.xyz",[9,430]],["wiwo.de",10],["masteranime.es",11],["9anime.vip",11],["fullxh.com",12],["megaxh.com",12],["unlockxh4.com",12],["xhadult2.com",12],["xhadult3.com",12],["xhadult4.com",12],["xhadult5.com",12],["xhamster46.com",12],["xhday.com",12],["xhday1.com",12],["xhmoon5.com",12],["xhplanet1.com",12],["xhplanet2.com",12],["xhreal2.com",12],["xhreal3.com",12],["xhtab2.com",12],["xhvictory.com",12],["xhwebsite.com",12],["xhwebsite2.com",12],["xhwide1.com",12],["xhwide8.com",12],["alphaporno.com",[15,403]],["porngem.com",15],["uploadbank.com",15],["shortit.pw",[15,106]],["familyporn.tv",15],["cloudemb.com",[15,326]],["sbplay1.com",15],["swatchseries.ru",15],["id45.cyou",15],["85tube.com",[15,90]],["findjav.com",15],["pobre.tv",15],["k1nk.co",15],["watchasians.cc",15],["photopea.com",15],["imsdb.pw",[15,24]],["soltoshindo.com",15],["techtimes.com",16],["dronedj.com",18],["freeplayervideo.com",19],["nazarickol.com",19],["player-cdn.com",19],["voe.sx",19],["housecardsummerbutton.com",19],["bigclatterhomesguideservice.com",19],["uptodatefinishconference.com",19],["uptodatefinishconferenceroom.com",19],["tinycat-voe-fashion.com",19],["motphimtv.com",19],["rabbitstream.net",19],["streamlare.com",19],["projectfreetv.one",19],["nolive.me",20],["cbs.com",21],["paramountplus.com",21],["player.glomex.com",22],["merkur.de",22],["tz.de",22],["hotpornfile.org",24],["chillicams.net",24],["rpdrlatino.live",24],["adbull.org",25],["mitly.us",25],["linkrex.net",25],["linx.cc",25],["oke.io",25],["dz4link.com",25],["linclik.com",25],["shrt10.com",25],["loptelink.com",25],["cut-fly.com",25],["linkfinal.com",25],["payskip.org",25],["cutpaid.com",25],["forexmab.com",25],["linkjust.com",25],["linkszia.co",25],["leechpremium.link",25],["icutlink.com",[25,130]],["stfly.me",25],["oncehelp.com",25],["bit-url.com",25],["rgl.vn",25],["reqlinks.net",25],["wu8.in",25],["bitlk.com",25],["qlinks.eu",25],["link.3dmili.com",25],["short-fly.com",25],["foxseotools.com",25],["pngit.live",25],["link.turkdown.com",25],["slink.bid",[25,71]],["earnwithshortlink.com",25],["7r6.com",25],["enrt.eu",25],["oko.sh",25],["shortpaid.com",25],["ckk.ai",25],["fc.lc",25],["fcc.lc",[25,194]],["fstore.biz",25],["cuts-url.com",25],["eio.io",25],["exe.app",25],["exee.io",25],["exey.io",25],["srek.net",25],["skincarie.com",25],["exeo.app",25],["clk.ink",25],["birdurls.com",25],["coinlyhub.com",[25,220]],["adsafelink.com",25],["aii.sh",25],["shrinkurl.org",25],["adsh.cc",25],["cybertechng.com",[25,229]],["owllink.net",25],["fir3.net",25],["cutdl.xyz",25],["gplinks.co",25],["loan2host.com",25],["tei.ai",25],["tii.ai",25],["iir.ai",25],["shorteet.com",[25,251]],["sekilastekno.com",25],["promo-visits.site",25],["satoshi-win.xyz",[25,260]],["shorterall.com",25],["smoner.com",25],["bitlinks.pw",25],["linkad.in",25],["linkshrnk.com",25],["popimed.com",25],["linksly.co",25],["ur-ly.xyz",25],["shrinkme.in",25],["rodjulian.com",25],["pkr.pw",25],["shrinke.me",25],["imagenesderopaparaperros.com",25],["shortenbuddy.com",25],["gibit.xyz",25],["apksvip.com",25],["cashurl.in",25],["4cash.me",25],["namaidani.com",25],["bitfly.io",25],["teknomuda.com",25],["illink.net",25],["miuiku.com",25],["yourtechnology.online",25],["savelink.site",25],["fxlap.com",25],["earnfasts.com",25],["short-cash2.xyz",25],["absolutesmmpanel.com",25],["myhiddentech.com",25],["tawiia.com",25],["droplink.co",25],["recipestutorials.com",25],["ashort1a.xyz",25],["2shrt.com",25],["apkshrt.com",25],["genpassword.top",25],["srts.me",25],["cuturl.in",25],["lyricsbot.pw",25],["short88.com",25],["cashearn.cc",25],["kutmoney.com",25],["kutt.io",25],["sanoybonito.club",25],["samaa-pro.com",25],["miklpro.com",25],["modapk.link",25],["shrinkforearn.in",25],["1shorten.com",25],["shortlinkpay.com",25],["ccurl.net",25],["st23q.com",25],["beautyram.info",25],["gonety.com",25],["viraloc.com",25],["clickscoin.com",25],["forex-trnd.com",25],["kiiw.icu",25],["vshort.link",25],["link.ltc24.com",25],["galaxy-link.space",25],["linkpoi.me",25],["usdshort.com",25],["bitcoinly.in",25],["menjelajahi.com",25],["pewgame.com",25],["yxoshort.com",25],["1link.vip",25],["linkcc.pro",25],["haonguyen.top",25],["jameeltips.us",25],["shrlink.top",25],["claimfreebits.com",25],["mfk-shorter.com",25],["crazyblog.in",25],["gtlink.co",25],["link.tokenoto.com",25],["cutearn.net",25],["rshrt.com",25],["jp88.xyz",25],["short.palmeratv.com",25],["filezipa.com",25],["arab-chat.club",25],["dz-linkk.com",25],["download.freestudyweb.com",25],["theblissempire.com",25],["shortlink.prz.pw",25],["zipurls.com",25],["finanzas-vida.com",25],["skiplink.org",25],["bharaturl.com",25],["techmyhub.com",25],["adurly.cc",25],["pix4link.com",25],["paid4.link",25],["ez4short.com",25],["link.asiaon.top",25],["go.gets4link.com",25],["download.sharenulled.net",25],["go.mozlink.net",25],["enagato.com",25],["linkres.in",25],["webo.one",25],["automotur.club",25],["pandarticles.com",25],["beingtek.com",25],["katflys.com",25],["shorturl.unityassets4free.com",25],["disheye.com",25],["techymedies.com",25],["techysuccess.com",25],["toptap.website",[25,332]],["za.gl",[25,154]],["newsalret.com",25],["download.baominh.tech",25],["bblink.com",25],["abre.click",25],["linkbr.xyz",25],["myad.biz",25],["go.netfile.cc",25],["try2link.com",25],["swzz.xyz",25],["vrlinks.xyz",25],["sakastau.com",25],["vevioz.com",25],["gos.insuranceblog.xyz",25],["charexempire.com",25],["clk.asia",25],["rancah.com",25],["egfly.xyz",25],["linka.click",25],["sturls.com",25],["myshrinker.com",25],["upshrink.com",25],["go.adinsurance.xyz",25],["tecnologiapp.site",25],["adslink.programasfulltaf16.com",25],["aylink.info",25],["dash-free.com",[25,229]],["rainurl.com",[25,229]],["snowurl.com",[25,229]],["netfile.cc",25],["link.insurance-space.xyz",25],["link.insurglobal.xyz",25],["theconomy.me",25],["rajsayt.xyz",25],["rocklink.in",25],["linkshortify.site",25],["adinsurance.xyz",25],["insurglobal.xyz",25],["techgeek.digital",25],["download3s.net",25],["shortx.net",25],["musicc.xyz",25],["cutx.me",25],["btcwalk.com",25],["cryptoon.xyz",25],["easysky.in",25],["veganab.co",25],["shortawy.com",25],["tlin.me",25],["apprepack.com",25],["post.nites-tv.xyz",25],["sh2rt.com",25],["up-load.one",25],["zuba.link",25],["pandaznetwork.com",25],["du-link.in",25],["linksfy.co",25],["adrinolinks.in",25],["golink.xaydungplus.com",25],["bestcash2020.com",25],["cut-y.net",25],["allcryptoz.net",25],["ultraten.net",25],["hoxiin.com",25],["technemo.xyz",25],["baicho.xyz",25],["go.linkbnao.com",25],["link-yz.com",25],["paylinnk.com",25],["thizissam.in",25],["ier.ai",25],["bloggertheme.xyz",25],["adslink.pw",25],["enit.in",[25,247]],["oii.io",25],["novelssites.com",25],["links.medipost.org",25],["faucetcrypto.net",25],["short.freeltc.top",25],["trxking.xyz",25],["weadown.com",25],["cookdov.com",25],["xpshort.com",25],["bdnewsx.com",25],["m.bloggingguidance.com",25],["blog.onroid.com",25],["cutty.app",25],["link.codevn.net",25],["upfilesurls.com",25],["shareus.site",25],["link4rev.site",25],["bloginguru.xyz",25],["tii.la",25],["celinks.net",25],["c2g.at",25],["atglinks.com",25],["shortzu.icu",25],["bitcosite.com",25],["cryptosh.pro",25],["sigmalinks.in",25],["link68.net",25],["traffic123.net",25],["gainl.ink",25],["windowslite.net",[25,229]],["coinsl.click",25],["watchmygf.me",[26,52]],["fpo.xxx",[26,54]],["sexemix.com",26],["heavyfetish.com",[26,437]],["you-porn.com",28],["youporngay.com",28],["youpornru.com",28],["9908ww.com",28],["adelaidepawnbroker.com",28],["bztube.com",28],["hotovs.com",28],["insuredhome.org",28],["nudegista.com",28],["pornluck.com",28],["vidd.se",28],["pornhub.com",28],["pornerbros.com",29],["freep.com",29],["porn.com",30],["tune.pk",31],["noticias.gospelmais.com.br",32],["techperiod.com",32],["jacquieetmicheltv.net",[33,34]],["illicoporno.com",33],["lavoixdux.com",33],["tonpornodujour.com",33],["jacquieetmichel.net",33],["swame.com",33],["vosfemmes.com",33],["voyeurfrance.net",33],["viki.com",[35,36]],["sleazyneasy.com",[37,38,39]],["smutr.com",[37,216]],["yourporngod.com",[37,38]],["javbangers.com",[37,292]],["camfox.com",37],["camthots.tv",[37,123]],["shegotass.info",37],["amateur8.com",37],["bigtitslust.com",37],["ebony8.com",37],["freeporn8.com",37],["lesbian8.com",37],["maturetubehere.com",37],["sortporn.com",37],["webcamvau.com",37],["motherporno.com",[37,38,54,125]],["theporngod.com",[37,38]],["pornsocket.com",40],["luxuretv.com",41],["flashx.net",42],["porndig.com",[43,44]],["webcheats.com.br",45],["ceesty.com",[46,47]],["gestyy.com",[46,47]],["corneey.com",47],["destyy.com",47],["festyy.com",47],["sh.st",47],["angrybirdsnest.com",48],["zrozz.com",48],["clix4btc.com",48],["katfile.com",48],["4tests.com",48],["planet-explorers-isos.com",48],["business-standard.com",48],["goltelevision.com",48],["news-und-nachrichten.de",48],["laradiobbs.net",48],["urlaubspartner.net",48],["produktion.de",48],["cinemaxxl.de",48],["bladesalvador.com",48],["tempr.email",48],["cshort.org",48],["friendproject.net",48],["covrhub.com",48],["planetsuzy.org",49],["empflix.com",50],["filespace.com",51],["transparentcalifornia.com",52],["deepbrid.com",53],["submityourflicks.com",54],["3movs.com",54],["cambay.tv",[54,103,123,125]],["bravoerotica.net",[54,125]],["youx.xxx",54],["camclips.tv",[54,216]],["camflow.tv",[54,103,125,178,255]],["camhoes.tv",[54,103,123,125,178,255]],["xmegadrive.com",54],["xxxymovies.com",54],["xxxshake.com",54],["gayck.com",54],["xhand.com",[54,125]],["analdin.com",[54,125]],["webnovel.com",55],["schwaebische.de",56],["mercurynews.com",57],["chicoer.com",57],["dailybreeze.com",57],["dailybulletin.com",57],["dailynews.com",57],["delcotimes.com",57],["eastbaytimes.com",57],["macombdaily.com",57],["ocregister.com",57],["pasadenastarnews.com",57],["pe.com",57],["presstelegram.com",57],["redlandsdailyfacts.com",57],["reviewjournal.com",57],["santacruzsentinel.com",57],["saratogian.com",57],["sentinelandenterprise.com",57],["sgvtribune.com",57],["tampabay.com",57],["times-standard.com",57],["theoaklandpress.com",57],["trentonian.com",57],["twincities.com",57],["whittierdailynews.com",57],["bostonherald.com",57],["dailycamera.com",57],["sbsun.com",57],["dailydemocrat.com",57],["montereyherald.com",57],["orovillemr.com",57],["record-bee.com",57],["redbluffdailynews.com",57],["reporterherald.com",57],["thereporter.com",57],["timescall.com",57],["timesheraldonline.com",57],["ukiahdailyjournal.com",57],["dailylocal.com",57],["8tracks.com",58],["revealname.com",59],["fcportables.com",[60,61]],["golfchannel.com",63],["telemundodeportes.com",63],["stream.nbcsports.com",63],["gamcore.com",64],["porcore.com",64],["69games.xxx",64],["javmix.app",64],["tecknity.com",65],["haaretz.com",66],["hungama.com",66],["a-o.ninja",66],["anime-odcinki.pl",66],["kumpulmanga.org",66],["shortgoo.blogspot.com",66],["tonanmedia.my.id",[66,429]],["yurasu.xyz",66],["isekaipalace.com",66],["megadescarga.net",[67,68,69,70]],["megadescargas.net",[67,68,69,70]],["audioz.cc",71],["audioz.es",71],["luckydice.net",71],["adarima.org",71],["tieutietkiem.com",71],["weatherwx.com",71],["sattaguess.com",71],["winshell.de",71],["rosasidan.ws",71],["modmakers.xyz",71],["gamepure.in",71],["warrenrahul.in",71],["austiblox.net",71],["upiapi.in",71],["myownguess.in",71],["watchhentai.net",71],["thichcode.net",71],["vikistream.com",72],["eplayer.click",[72,73]],["mega4upload.com",[73,79]],["ennovelas.com",[73,79]],["n-tv.de",74],["brigitte.de",75],["stern.de",75],["foxsports.com.au",76],["canberratimes.com.au",76],["thesimsresource.com",77],["bdnewszh.com",79],["streamservicehd.click",79],["timeforbitco.in",80],["worldofbitco.in",[80,93]],["weatherx.co.in",[80,93]],["getyourbitco.in",80],["sunbtc.space",80],["ctrl.blog",81],["sportlife.es",82],["tubitv.com",82],["libertaddigital.com",83],["finofilipino.org",84],["acortarm.xyz",85],["acortame.xyz",85],["speedtest.net",86],["mysflink.blogspot.com",87],["assia.tv",88],["assia4.com",88],["assia24.com",88],["cwtvembeds.com",[90,124]],["camlovers.tv",90],["porntn.com",90],["pornissimo.org",90],["sexcams-24.com",[90,103]],["watchporn.to",90],["camwhorez.video",90],["ojogos.com.br",95],["powforums.com",96],["supforums.com",96],["studybullet.com",96],["usgamer.net",97],["recordonline.com",97],["123tvseries.co",99],["freebitcoin.win",100],["e-monsite.com",100],["coindice.win",100],["temp-mails.com",101],["freiepresse.de",102],["camhub.cc",103],["love4porn.com",103],["thotvids.com",103],["celebwhore.com",103],["cluset.com",103],["4kporn.xxx",103],["xhomealone.com",103],["lusttaboo.com",[103,367]],["mp3fiber.com",104],["suedkurier.de",105],["anysex.com",107],["gomiblog.com",108],["iptvtools.net",108],["vlist.se",109],["pornve.com",110],["coolrom.com.au",111],["bitcotasks.com",111],["pornohirsch.net",112],["marie-claire.es",113],["gamezhero.com",113],["flashgirlgames.com",113],["onlinesudoku.games",113],["mpg.football",113],["sssam.com",113],["globalnews.ca",114],["videotekaime.net",115],["drinksmixer.com",116],["leitesculinaria.com",116],["fupa.net",117],["ge-map-overlays.appspot.com",118],["browardpalmbeach.com",119],["dallasobserver.com",119],["houstonpress.com",119],["miaminewtimes.com",119],["phoenixnewtimes.com",119],["westword.com",119],["wilmaa.com",120],["nhentai.net",121],["fox.com.tr",122],["caminspector.net",123],["camwhoreshd.com",123],["camgoddess.tv",123],["gay4porn.com",125],["mypornhere.com",125],["mediapason.it",126],["linkspaid.com",126],["tuotromedico.com",126],["neoteo.com",126],["phoneswiki.com",126],["celebmix.com",126],["myneobuxportal.com",126],["oyungibi.com",126],["25yearslatersite.com",126],["jeshoots.com",127],["techhx.com",127],["karanapk.com",127],["mac-torrent-download.net",128],["videogreen.xyz",129],["sypl.xyz",129],["tvonlinex.com",129],["playembed.xyz",129],["javhdporn.net",129],["redanimedatabase.cloud",129],["javstream.top",129],["flashplayer.fullstacks.net",131],["cloudapps.herokuapp.com",131],["youfiles.herokuapp.com",131],["temp-mail.org",132],["di.fm",133],["comnuan.com",134],["veedi.com",135],["battleboats.io",135],["fruitlab.com",136],["haddoz.net",136],["garoetpos.com",136],["stiletv.it",137],["hpav.tv",138],["hpjav.tv",138],["hqtv.biz",140],["liveuamap.com",141],["filmiseriali.com",141],["muvibg.com",141],["linksht.com",[142,143]],["audycje.tokfm.pl",144],["hulu.com",[145,146,147]],["siriusfiles.com",148],["shush.se",149],["aniwatcher.com",150],["emurom.net",151],["allkpop.com",152],["azmath.info",153],["downfile.site",153],["downphanmem.com",153],["expertvn.com",153],["memangbau.com",153],["scratch247.info",153],["trangchu.news",153],["adfoc.us",153],["mynewsmedia.co",[153,244]],["sptfy.be",153],["streamcheck.link",153],["momomesh.tv",155],["kfrfansub.com",157],["thuglink.com",157],["voipreview.org",157],["audiotag.info",158],["hanime.tv",159],["pogo.com",160],["cloudvideo.tv",161],["legionjuegos.org",162],["legionpeliculas.org",162],["legionprogramas.org",162],["16honeys.com",163],["elespanol.com",164],["remodelista.com",165],["coolmathgames.com",[166,167,168,450]],["audiofanzine.com",169],["noweconomy.live",171],["howifx.com",171],["vavada5com.com",171],["hitokin.net",172],["elil.cc",173],["developerinsider.co",174],["ilprimatonazionale.it",175],["hotabis.com",175],["root-nation.com",175],["italpress.com",175],["airsoftmilsimnews.com",175],["artribune.com",175],["thehindu.com",176],["cambro.tv",[177,178]],["nibelungen-kurier.de",179],["noz.de",180],["earthgarage.com",182],["pianetamountainbike.it",183],["barchart.com",184],["modelisme.com",185],["parasportontario.ca",185],["prescottenews.com",185],["nrj-play.fr",186],["oeffentlicher-dienst.info",187],["hackingwithreact.com",188],["gutekueche.at",189],["eplfootballmatch.com",190],["peekvids.com",191],["playvids.com",191],["pornflip.com",191],["redensarten-index.de",192],["vw-page.com",193],["wwwfotografgotlin.blogspot.com",194],["freelistenonline.com",194],["securenetsystems.net",195],["viz.com",[196,197]],["queenfaucet.website",198],["0rechner.de",199],["configspc.com",200],["xopenload.me",200],["uptobox.com",200],["uptostream.com",200],["onepiece-tube.com",201],["japgay.com",202],["mega-debrid.eu",203],["dreamdth.com",204],["pijanitvor.com",204],["diaridegirona.cat",207],["diariodeibiza.es",207],["diariodemallorca.es",207],["diarioinformacion.com",207],["eldia.es",207],["emporda.info",207],["farodevigo.es",207],["laopinioncoruna.es",207],["laopiniondemalaga.es",207],["laopiniondemurcia.es",207],["laopiniondezamora.es",207],["laprovincia.es",207],["levante-emv.com",207],["mallorcazeitung.es",207],["regio7.cat",207],["superdeporte.es",207],["playpaste.com",208],["player.rtl2.de",209],["freetutorialsus.com",210],["vidlii.com",[210,225]],["iammagnus.com",210],["dailyvideoreports.net",210],["unityassets4free.com",210],["cnbc.com",211],["puzzles.msn.com",212],["metro.us",212],["newsobserver.com",212],["arkadiumhosted.com",212],["spankbang.com",213],["firefaucet.win",214],["direct-link.net",215],["direkt-wissen.com",215],["link-to.net",215],["fullhdxxx.com",217],["getintopc.com",218],["unique-tutorials.info",218],["etonline.com",219],["creatur.io",219],["drphil.com",219],["urbanmilwaukee.com",219],["ontiva.com",219],["hideandseek.world",219],["myabandonware.com",219],["mangaalarab.com",219],["kendam.com",219],["wttw.com",219],["synonyms.com",219],["definitions.net",219],["hostmath.com",219],["camvideoshub.com",219],["minhaconexao.com.br",219],["bravedown.com",219],["home-made-videos.com",221],["pxrnxx.xyz",221],["amateur-couples.com",221],["slutdump.com",221],["produsat.com",223],["12thman.com",225],["acusports.com",225],["atlantic10.com",225],["auburntigers.com",225],["baylorbears.com",225],["bceagles.com",225],["bgsufalcons.com",225],["big12sports.com",225],["bigten.org",225],["bradleybraves.com",225],["butlersports.com",225],["cmumavericks.com",225],["conferenceusa.com",225],["cyclones.com",225],["dartmouthsports.com",225],["daytonflyers.com",225],["dbupatriots.com",225],["dbusports.com",225],["denverpioneers.com",225],["fduknights.com",225],["fgcuathletics.com",225],["fightinghawks.com",225],["fightingillini.com",225],["floridagators.com",225],["friars.com",225],["friscofighters.com",225],["gamecocksonline.com",225],["goarmywestpoint.com",225],["gobison.com",225],["goblueraiders.com",225],["gobobcats.com",225],["gocards.com",225],["gocreighton.com",225],["godeacs.com",225],["goexplorers.com",225],["goetbutigers.com",225],["gofrogs.com",225],["gogriffs.com",225],["gogriz.com",225],["golobos.com",225],["gomarquette.com",225],["gopack.com",225],["gophersports.com",225],["goprincetontigers.com",225],["gopsusports.com",225],["goracers.com",225],["goshockers.com",225],["goterriers.com",225],["gotigersgo.com",225],["gousfbulls.com",225],["govandals.com",225],["gowyo.com",225],["goxavier.com",225],["gozags.com",225],["gozips.com",225],["griffinathletics.com",225],["guhoyas.com",225],["gwusports.com",225],["hailstate.com",225],["hamptonpirates.com",225],["hawaiiathletics.com",225],["hokiesports.com",225],["huskers.com",225],["icgaels.com",225],["iuhoosiers.com",225],["jsugamecocksports.com",225],["longbeachstate.com",225],["loyolaramblers.com",225],["lrtrojans.com",225],["lsusports.net",225],["morrisvillemustangs.com",225],["msuspartans.com",225],["muleriderathletics.com",225],["mutigers.com",225],["navysports.com",225],["nevadawolfpack.com",225],["niuhuskies.com",225],["nkunorse.com",225],["nuhuskies.com",225],["nusports.com",225],["okstate.com",225],["olemisssports.com",225],["omavs.com",225],["ovcsports.com",225],["owlsports.com",225],["purduesports.com",225],["redstormsports.com",225],["richmondspiders.com",225],["sfajacks.com",225],["shupirates.com",225],["siusalukis.com",225],["smcgaels.com",225],["smumustangs.com",225],["soconsports.com",225],["soonersports.com",225],["themw.com",225],["tulsahurricane.com",225],["txst.com",225],["txstatebobcats.com",225],["ubbulls.com",225],["ucfknights.com",225],["ucirvinesports.com",225],["uconnhuskies.com",225],["uhcougars.com",225],["uicflames.com",225],["umterps.com",225],["uncwsports.com",225],["unipanthers.com",225],["unlvrebels.com",225],["uoflsports.com",225],["usdtoreros.com",225],["utahstateaggies.com",225],["utepathletics.com",225],["utrockets.com",225],["uvmathletics.com",225],["uwbadgers.com",225],["villanova.com",225],["wkusports.com",225],["wmubroncos.com",225],["woffordterriers.com",225],["1pack1goal.com",225],["bcuathletics.com",225],["bubraves.com",225],["goblackbears.com",225],["golightsgo.com",225],["gomcpanthers.com",225],["goutsa.com",225],["mercerbears.com",225],["pirateblue.com",225],["pirateblue.net",225],["pirateblue.org",225],["quinnipiacbobcats.com",225],["towsontigers.com",225],["tribeathletics.com",225],["tribeclub.com",225],["utepminermaniacs.com",225],["utepminers.com",225],["wkutickets.com",225],["aopathletics.org",225],["atlantichockeyonline.com",225],["bigsouthnetwork.com",225],["bigsouthsports.com",225],["chawomenshockey.com",225],["dbupatriots.org",225],["drakerelays.org",225],["ecac.org",225],["ecacsports.com",225],["emueagles.com",225],["emugameday.com",225],["gculopes.com",225],["godrakebulldog.com",225],["godrakebulldogs.com",225],["godrakebulldogs.net",225],["goeags.com",225],["goislander.com",225],["goislanders.com",225],["gojacks.com",225],["gomacsports.com",225],["gseagles.com",225],["hubison.com",225],["iowaconference.com",225],["ksuowls.com",225],["lonestarconference.org",225],["mascac.org",225],["midwestconference.org",225],["mountaineast.org",225],["niu-pack.com",225],["nulakers.ca",225],["oswegolakers.com",225],["ovcdigitalnetwork.com",225],["pacersports.com",225],["rmacsports.org",225],["rollrivers.com",225],["samfordsports.com",225],["uncpbraves.com",225],["usfdons.com",225],["wiacsports.com",225],["alaskananooks.com",225],["broncathleticfund.com",225],["cameronaggies.com",225],["columbiacougars.com",225],["etownbluejays.com",225],["gobadgers.ca",225],["golancers.ca",225],["gometrostate.com",225],["gothunderbirds.ca",225],["kentstatesports.com",225],["lehighsports.com",225],["lopers.com",225],["lycoathletics.com",225],["lycomingathletics.com",225],["maraudersports.com",225],["mauiinvitational.com",225],["msumavericks.com",225],["nauathletics.com",225],["nueagles.com",225],["nwusports.com",225],["oceanbreezenyc.org",225],["patriotathleticfund.com",225],["pittband.com",225],["principiaathletics.com",225],["roadrunnersathletics.com",225],["sidearmsocial.com",225],["snhupenmen.com",225],["stablerarena.com",225],["stoutbluedevils.com",225],["uwlathletics.com",225],["yumacs.com",225],["collegefootballplayoff.com",225],["csurams.com",225],["cubuffs.com",225],["gobearcats.com",225],["gohuskies.com",225],["mgoblue.com",225],["osubeavers.com",225],["pittsburghpanthers.com",225],["rolltide.com",225],["texassports.com",225],["thesundevils.com",225],["uclabruins.com",225],["wvuathletics.com",225],["wvusports.com",225],["arizonawildcats.com",225],["calbears.com",225],["cuse.com",225],["georgiadogs.com",225],["goducks.com",225],["goheels.com",225],["gostanford.com",225],["insidekstatesports.com",225],["insidekstatesports.info",225],["insidekstatesports.net",225],["insidekstatesports.org",225],["k-stateathletics.com",225],["k-statefootball.net",225],["k-statefootball.org",225],["k-statesports.com",225],["k-statesports.net",225],["k-statesports.org",225],["k-statewomenshoops.com",225],["k-statewomenshoops.net",225],["k-statewomenshoops.org",225],["kstateathletics.com",225],["kstatefootball.net",225],["kstatefootball.org",225],["kstatesports.com",225],["kstatewomenshoops.com",225],["kstatewomenshoops.net",225],["kstatewomenshoops.org",225],["ksuathletics.com",225],["ksusports.com",225],["scarletknights.com",225],["showdownforrelief.com",225],["syracusecrunch.com",225],["texastech.com",225],["theacc.com",225],["ukathletics.com",225],["usctrojans.com",225],["utahutes.com",225],["utsports.com",225],["wsucougars.com",225],["mangadods.com",225],["tricksplit.io",225],["litecoinads.com",225],["template.city",225],["fangraphs.com",226],["4players.de",[227,289]],["buffed.de",227],["gamesaktuell.de",227],["gamezone.de",227],["pcgames.de",227],["player.pcgameshardware.de",227],["videogameszone.de",227],["spieletipps.de",227],["planetaminecraft.com",228],["flyad.vip",229],["lapresse.ca",230],["kolyoom.com",231],["ilovephd.com",231],["kseriesubthai.com",232],["upstream.to",233],["negumo.com",234],["games.wkb.jp",[235,236]],["channelmyanmar.org",[237,238]],["u-s-news.com",238],["fandom.com",[239,467,468]],["kenshi.fandom.com",240],["hausbau-forum.de",241],["fake-it.ws",242],["laksa19.github.io",243],["revadvert.com",244],["1shortlink.com",245],["nesia.my.id",246],["makemoneywithurl.com",247],["resetoff.pl",248],["sexodi.com",248],["cdn77.org",249],["howtofixwindows.com",250],["3sexporn.com",251],["momxxxsex.com",251],["myfreevintageporn.com",251],["penisbuyutucum.net",251],["lightnovelworld.com",252],["ujszo.com",253],["newsmax.com",254],["bobs-tube.com",255],["nadidetarifler.com",256],["siz.tv",256],["suzylu.co.uk",[257,258]],["onworks.net",259],["yabiladi.com",259],["homeairquality.org",261],["downloadsoft.net",262],["imgair.net",263],["imgblaze.net",263],["imgfrost.net",263],["pixsera.net",263],["vestimage.site",263],["imgwia.buzz",263],["testlanguages.com",264],["newsinlevels.com",264],["videosinlevels.com",264],["my-code4you.blogspot.com",265],["vlxxs.net",266],["rapelust.com",266],["vtube.to",266],["vtplay.net",266],["desitelugusex.com",266],["xvideos-downloader.net",266],["xxxvideotube.net",266],["sdefx.cloud",266],["nozomi.la",266],["moviesonlinefree.net",266],["flickr.com",267],["firefile.cc",268],["pestleanalysis.com",268],["kochamjp.pl",268],["tutorialforlinux.com",268],["724indir.com",268],["whatsaero.com",268],["animeblkom.net",[268,283]],["blkom.com",268],["globes.co.il",[269,270]],["jardiner-malin.fr",271],["tw-calc.net",272],["ohmybrush.com",273],["talkceltic.net",274],["zdam.xyz",275],["mentalfloss.com",276],["uprafa.com",277],["cube365.net",278],["nightfallnews.com",[279,280]],["badassdownloader.com",281],["quickporn.net",282],["aosmark.com",284],["theappstore.org",284],["newyorker.com",285],["brighteon.com",286],["more.tv",287],["video1tube.com",288],["alohatube.xyz",288],["link.cgtips.org",290],["hentaicloud.com",291],["netfapx.com",293],["androidtvbox.eu",295],["madeinvilnius.lt",295],["paperzonevn.com",296],["hentaienglish.com",297],["hentaiporno.xxx",297],["venge.io",[298,299]],["btcbux.io",300],["its.porn",[301,302]],["atv.at",303],["2ndrun.tv",304],["rackusreads.com",304],["exerror.com",304],["toppixxx.com",305],["temp-phone-number.com",306],["jetpunk.com",308],["imgur.com",309],["hentai-party.com",310],["hentaicomics.pro",310],["xxx-comics.pro",310],["genshinimpactcalculator.com",313],["mysexgames.com",314],["embed.indavideo.hu",317],["coinurl.net",[318,319]],["mdn.rest",320],["gdr-online.com",321],["mmm.dk",322],["iqiyi.com",[323,324]],["m.iqiyi.com",325],["japopav.tv",326],["lvturbo.com",326],["nbcolympics.com",327],["apkhex.com",328],["indiansexstories2.net",329],["issstories.xyz",329],["1340kbbr.com",330],["gorgeradio.com",330],["kduk.com",330],["kedoam.com",330],["kejoam.com",330],["kelaam.com",330],["khsn1230.com",330],["kjmx.rocks",330],["kloo.com",330],["klooam.com",330],["klykradio.com",330],["kmed.com",330],["kmnt.com",330],["kool991.com",330],["kpnw.com",330],["kppk983.com",330],["krktcountry.com",330],["ktee.com",330],["kwro.com",330],["kxbxfm.com",330],["thevalley.fm",330],["dsocker1234.blogspot.com",331],["blick.ch",333],["mgnet.xyz",334],["designtagebuch.de",335],["pixroute.com",336],["calculator-online.net",337],["porngames.club",338],["sexgames.xxx",338],["111.90.159.132",339],["battleplan.news",339],["mobile-tracker-free.com",340],["pfps.gg",341],["ac-illust.com",[342,343]],["photo-ac.com",[342,343]],["social-unlock.com",344],["ninja.io",345],["sourceforge.net",346],["samfirms.com",347],["banned.video",348],["freeworldnews.tv",348],["h-flash.com",349],["huffpost.com",350],["ingles.com",351],["surfline.com",352],["play.tv3.ee",353],["trendyoum.com",354],["bulbagarden.net",355],["doomovie-hd.com",356],["madoohd.com",356],["moviestars.to",357],["hollywoodlife.com",358],["searchresults.cc",359],["mat6tube.com",360],["textstudio.co",361],["newtumbl.com",362],["nevcoins.club",364],["mail.com",365],["erome.com",368],["oggi.it",[369,370]],["video.gazzetta.it",[369,370]],["mangakita.net",371],["avpgalaxy.net",372],["mhma12.tech",373],["panda-novel.com",374],["zebranovel.com",374],["lightsnovel.com",374],["eaglesnovel.com",374],["zadfaucet.com",375],["ewrc-results.com",376],["kizi.com",377],["cyberscoop.com",378],["fedscoop.com",378],["canale.live",379],["loawa.com",380],["ygosu.com",380],["sportalkorea.com",380],["algumon.com",380],["hancinema.net",380],["enetnews.co.kr",380],["edaily.co.kr",380],["economist.co.kr",380],["mafiatown.pl",[381,382]],["jeep-cj.com",383],["sponsorhunter.com",384],["cloudcomputingtopics.net",385],["likecs.com",386],["tiscali.it",387],["serialy.io",388],["mdn.lol",389],["btcbitco.in",389],["btcsatoshi.net",389],["cempakajaya.com",389],["crypto4yu.com",389],["readbitcoin.org",389],["wiour.com",389],["linkspy.cc",390],["tutelehd3.xyz",391],["dirty.pink",[392,393,394]],["adshnk.com",395],["chattanoogan.com",396],["socialmediagirls.com",397],["windowspro.de",398],["snapinsta.app",399],["mydaddy.cc",400],["roadtrippin.fr",401],["redketchup.io",402],["anyporn.com",[403,417]],["bravoporn.com",403],["bravoteens.com",403],["crocotube.com",403],["hellmoms.com",403],["hellporno.com",403],["sex3.com",403],["tubewolf.com",403],["xbabe.com",403],["xcum.com",403],["zedporn.com",403],["imagetotext.info",404],["infokik.com",405],["freepik.com",406],["ddwloclawek.pl",407],["videogamer.com",408],["wrestlinginc.com",408],["my-subs.co",409],["plaion.com",410],["rapid-cloud.co",411],["slideshare.net",[412,413]],["ustreasuryyieldcurve.com",414],["goo.st",415],["freevpshere.com",415],["softwaresolutionshere.com",415],["staige.tv",418],["bondagevalley.cc",419],["androidadult.com",420],["watchtv24.com",421],["medscape.com",422],["bestx.stream",423],["arkadium.com",424],["app.blubank.com",425],["lifesurance.info",426],["doroni.me",427],["egao.in",427],["kusonime.com",428],["dtbps3games.com",431],["vod.pl",432],["teamskeet.com",433],["tacobell.com",434],["webtoons.com",[435,436]],["zefoy.com",438],["br.de",439],["pasteboard.co",440],["avclub.com",441],["clickhole.com",441],["deadspin.com",441],["gizmodo.com",441],["jalopnik.com",441],["jezebel.com",441],["kotaku.com",441],["lifehacker.com",441],["splinternews.com",441],["theinventory.com",441],["theonion.com",441],["theroot.com",441],["thetakeout.com",441],["pewresearch.org",441],["los40.com",[442,443]],["verizon.com",444],["humanbenchmark.com",445],["politico.com",446],["officedepot.co.cr",[447,448]],["usnews.com",449],["factable.com",451],["zee5.com",452],["gala.fr",453],["geo.fr",453],["voici.fr",453],["gloucestershirelive.co.uk",454],["jacksonguitars.com",455],["scandichotels.com",456],["stylist.co.uk",457],["nettiauto.com",458],["thaiairways.com",[459,460]],["cerbahealthcare.it",[461,462]],["tiendaenlinea.claro.com.ni",[463,464]],["tieba.baidu.com",465],["linktr.ee",466],["grasshopper.com",[469,470]],["epson.com.cn",[471,472]],["rjno1.com",473],["atozmath.com",[474,475,476,477,478,479,480]],["smallseotools.com",481]]);

const entitiesMap = new Map([["vidsrc",6],["watch-series",6],["watchseries",6],["vev",6],["vidop",6],["vidup",6],["starmusiq",9],["wcofun",9],["kissasian",11],["gogoanime",[11,19]],["1movies",[11,18]],["xmovies8",11],["animeheaven",11],["0123movies",11],["gostream",11],["gomovies",11],["hamsterix",12],["xhamster",12],["xhamster1",12],["xhamster10",12],["xhamster11",12],["xhamster12",12],["xhamster13",12],["xhamster14",12],["xhamster15",12],["xhamster16",12],["xhamster17",12],["xhamster18",12],["xhamster19",12],["xhamster20",12],["xhamster2",12],["xhamster3",12],["xhamster4",12],["xhamster5",12],["xhamster7",12],["xhamster8",12],["vidlox",[13,14]],["primewire",15],["streanplay",[15,17]],["sbplay",15],["milfnut",15],["fmovies",19],["9anime",19],["hqq",[23,24]],["123link",25],["adshort",25],["linkshorts",25],["adsrt",25],["vinaurl",25],["adfloz",25],["dutchycorp",25],["shortearn",25],["pingit",25],["urlty",25],["seulink",25],["shrink",25],["tmearn",25],["megalink",25],["linkviet",25],["miniurl",25],["pcprogramasymas",25],["link1s",25],["shortzzy",25],["shorttey",[25,219]],["lite-link",25],["pureshort",25],["adcorto",25],["dulinks",25],["zshort",25],["upfiles",25],["linkfly",25],["wplink",25],["financerites",25],["camwhores",[26,37,89,90,91]],["tube8",[27,28]],["youporn",28],["redtube",28],["pornhub",[28,205,206]],["xtits",[54,125]],["pouvideo",62],["povvideo",62],["povw1deo",62],["povwideo",62],["powv1deo",62],["powvibeo",62],["powvideo",62],["powvldeo",62],["acortalo",[67,68,69,70]],["acortar",[67,68,69,70]],["plyjam",[72,73]],["fxporn69",78],["vipbox",79],["viprow",79],["desbloqueador",85],["xberuang",87],["teknorizen",87],["linkberuang",87],["kickassanime",92],["subtorrents",94],["subtorrents1",94],["newpelis",94],["pelix",94],["allcalidad",94],["infomaniakos",94],["filecrypt",98],["tornadomovies",99],["sexwebvideo",103],["mangovideo",103],["icdrama",109],["mangasail",109],["file4go",111],["asianclub",129],["anitube",136],["mixdrop",139],["azsoft",153],["pickcrackpasswords",156],["uploadev",170],["ver-pelis-online",181],["ancient-origins",190],["lookcam",219],["lootlinks",219],["dpstream",222],["bluemediafiles",224],["docer",248],["pixlev",263],["skymovieshd",266],["dvdplay",266],["crackstreams",294],["123movieshd",307],["uproxy",311],["animesa",312],["cinecalidad",[315,316]],["apkmaven",363],["gmx",366],["gamereactor",416]]);

const exceptionsMap = new Map([["pingit.com",[25]],["pingit.me",[25]]]);

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
