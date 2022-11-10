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

/******************************************************************************/

/// name css-declarative

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssDeclarativeImport() {

/******************************************************************************/

// fra-0

const argsList = [{"a":["{\"selector\":\".preview-tabs-controls li\",\"action\":[\"style\",\"height: auto!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbox.ad-banner:not([style=\\\"height: 5px; width: 5px; position: absolute; top: 0;\\\"]):not(.blocker-tester + .ad-banner)\",\"action\":[\"style\",\"display: block !important;\"],\"cssable\":true}","{\"selector\":\".pub_300x250.pub_300x250m.pub_728x90.text-ad.textAd.text_ad.text_ads.text-ads.text-ad-links\",\"action\":[\"style\",\"display: block !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"a[href^=\\\"magnet:?\\\"]\",\"action\":[\"style\",\"width: 100%!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#mywraptest\",\"action\":[\"style\",\"height: 1px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".pub_300x250.pub_300x250m.pub_728x90.text-ad.textAd.text_ad.text_ads.text-ads.text-ad-links\",\"action\":[\"style\",\"display:block!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".three-col tr > td > div[style*=\\\"visibility: visible !important; display: block !important; opacity:\\\"]:not([class]):not([id])\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#page-body div[style*=\\\"visibility: visible !important; display: block !important; opacity:\\\"]:not([class]):not([id])\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#jSidebarSticky\",\"action\":[\"style\",\"min-height: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body\",\"action\":[\"style\",\"overflow: visible !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body.no-scroll\",\"action\":[\"style\",\"overflow: auto!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".AdBox.Ligatus.pub_300x250.pub_300x250m.pub_728x90.text-ad.textAd.text_ad.text_ads.text-ads.text-ad-links\",\"action\":[\"style\",\"display: block !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"height: 1px!important; visibility:hidden!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body > #main[style^=\\\"margin-top:\\\"]\",\"action\":[\"style\",\"margin-top: 10px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"display: block!important; position: absolute!important; left: -3000px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".inner > div[style*=\\\"visibility: visible !important; display: block !important; opacity:\\\"]:not([class]):not([id])\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"html > body:not(#style_important)\",\"action\":[\"style\",\"margin-top: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body.td-ad-background-link\",\"action\":[\"style\",\"cursor: auto!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#wrapfabtest\",\"action\":[\"style\",\"height: 1px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#wrapper-publicite\",\"action\":[\"style\",\"padding-top: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".header-space\",\"action\":[\"style\",\"height: 10px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#TJSdetection.adsbygoogle\",\"action\":[\"style\",\"display: block!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#main-content > div[style*=\\\"visibility: visible !important; display: block !important; opacity:\\\"]:not([class]):not([id])\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"body .container-ads + *:not(#style_important)\",\"action\":[\"style\",\"padding-top: 0 !important;\"],\"cssable\":true}","{\"selector\":\"body .container-ads + .header-ariane:not(#style_important)\",\"action\":[\"style\",\"padding-top: 0 !important;\"],\"cssable\":true}","{\"selector\":\"body .container-ads + .tranche:not(#style_important)\",\"action\":[\"style\",\"padding-top: 50px !important;\"],\"cssable\":true}","{\"selector\":\"body .container-ads ~ .tranche.section-article:not(#style_important)\",\"action\":[\"style\",\"padding-top: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#motherboard\",\"action\":[\"style\",\"top: 30px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".main\",\"action\":[\"style\",\"margin-top: 10px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".ads.ad.adsbox.ad-placement.carbon-ads\",\"action\":[\"style\",\"display: block!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"height: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"html\",\"action\":[\"style\",\"overflow: auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"#layer2\",\"action\":[\"style\",\"top:50px!important; left:950px!important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".publicite.text-ad.adsbox\",\"action\":[\"style\",\"display: block !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"height: 1px!important; display: block!important;\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["cityplug.be",0],["qub.ca",1],["torrents9.cc",2],["abcbourse.com",3],["cookomix.com",4],["forum-airguns.com",5],["forumactif.com",6],["forumgaming.fr",6],["journaldunet.com",7],["lesacdechips.com",8],["lesinrocks.com",9],["linternaute.com",10],["sante.journaldesfemmes.fr",10],["malekal.com",11],["monpetitforfait.com",12],["mtlurb.com",13],["neogeo-system.com",14],["parlons-basket.com",15],["actu17.fr",16],["adala-news.fr",17],["cnews.fr",18],["europe1.fr",19],["fiches-auto.fr",20],["ddaynormandy.forumgaming.fr",21],["funradio.fr",22],["rtl.fr",22],["rtl2.fr",22],["igen.fr",23],["ouest-france.fr",24],["tf1.fr",25],["tf1info.fr",25],["trackmusik.fr",26],["vpnmag.fr",27],["all-stadium.net",28],["9docu.org",29],["impotsurlerevenu.org",30]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
