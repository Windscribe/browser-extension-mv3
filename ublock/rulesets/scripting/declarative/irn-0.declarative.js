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

// irn-0

const argsList = [{"a":["{\"selector\":\".carousel-inner > .item > .row > .col-md-8:has(article > a[href*=\\\"aftabir.com/news/view/\\\"])\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"*\",\"action\":[\"style\",\"-webkit-touch-callout: default !important; -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".todaysNewsList__posts\",\"action\":[\"style\",\"max-width: 100% !important; flex-grow: 1 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".user-select-none\",\"action\":[\"style\",\"-webkit-touch-callout: default !important; -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;\"],\"cssable\":true}","{\"selector\":\"[class*=\\\"fakeBadge\\\"]\",\"action\":[\"style\",\"font-size: 1.4rem !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".right-news-wrap\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".n-first-col-left\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".rowTwo .right_side, .rowTwo .column_1\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".news-col-1\",\"action\":[\"style\",\"width: 70% !important;\"],\"cssable\":true}","{\"selector\":\".news-col-2\",\"action\":[\"style\",\"width: 30% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-xs-36.col-md-24:not(:has(.gutter_xs))\",\"action\":[\"style\",\"width: 83% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".vc_col-sm-4\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".row_one_content\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".column_1\",\"action\":[\"style\",\"width: 70% !important;\"],\"cssable\":true}","{\"selector\":\".column_2\",\"action\":[\"style\",\"width: 30% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".filter\",\"action\":[\"style\",\"filter:none !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\"*:selection\",\"action\":[\"style\",\"background-color:#338FFF!important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-md-9\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-12.col-md-8\",\"action\":[\"style\",\"max-width: 100% !important; flex: 0 0 100% !important; margin-right: 0 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-2\",\"action\":[\"style\",\"width: 60% !important;\"],\"cssable\":true}","{\"selector\":\".no-padd-1st-child\",\"action\":[\"style\",\"width: 40% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".sidebar-taliq\",\"action\":[\"style\",\"visibility: hidden; !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"[class*=\\\"hsCode_LimitedItem\\\"]\",\"action\":[\"style\",\"-webkit-filter: none !important; filter: none !important; pointer-events: auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".step:nth-of-type(4):after\",\"action\":[\"style\",\"content: 'هشدار از طرف لیست PersianBlocker: با ثبت کردن این اطلاعات، این سایت می‌تواند آدرس خانه و همه اطلاعات شما که در حساب‌کاربری اسنپ‌فود ثبت شده است را مشاهده کند و یا حتی اقدام به تغییر اطلاعات و ثبت سفارش کند. از این سایت با ریسک خودتان استفاده کنید و بعد از اتمام بررسی، دکمه \\\"خروج\\\" در سایت اسنپ‌فود را زده تا Token شما لغو شده و دسترسی این سایت به حساب‌کاربری شما قطع شود.' !important; color: #E6000D !important; margin-top: 20px !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".container\",\"action\":[\"style\",\"width: 95% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".ml120\",\"action\":[\"style\",\"margin-left: 5% !important; margin-bottom: 5% !important;\"],\"cssable\":true}","{\"selector\":\".xcon12\",\"action\":[\"style\",\"margin: auto !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".main-content\",\"action\":[\"style\",\"max-width: 100% !important; flex-grow: 1 !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".main-content .container:has(aside.sidebar .box.ads) [class^=\\\"col\\\"]:has(#item)\",\"action\":[\"style\",\"min-width: 75% !important; max-width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\"[class*=\\\"forceToLogin\\\"] [class*=\\\"forceToLogin\\\"]\",\"action\":[\"style\",\"filter: none !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-md-21\",\"action\":[\"style\",\"width: 70% !important;\"],\"cssable\":true}","{\"selector\":\".col-md-9\",\"action\":[\"style\",\"width: 30% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".col-md-3\",\"action\":[\"style\",\"max-width: 40% !important; flex: 0 0 40% !important;\"],\"cssable\":true}","{\"selector\":\".container\",\"action\":[\"style\",\"max-width: 95% !important; flex-grow: 1 !important;\"],\"cssable\":true}","{\"selector\":\".main-content\",\"action\":[\"style\",\"max-width: 60% !important; flex: 0 0 60% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".container, .main\",\"action\":[\"style\",\"width: 95% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".left_news_box > .left\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}","{\"selector\":\".main_right_archsing > .single\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".showCaseWrapper\",\"action\":[\"style\",\"width: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".mobile-header\",\"action\":[\"style\",\"top: 0 !important\"],\"cssable\":true}"]},{"a":["{\"selector\":\".ads-top\",\"action\":[\"style\",\"visibility: hidden !important;\"],\"cssable\":true}","{\"selector\":\".logo\",\"action\":[\"style\",\"position: static !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".si.au._m0.sd.vb\",\"action\":[\"style\",\"max-height: 100% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".main-content > .row > .content, .main-conten\",\"action\":[\"style\",\"max-width: 99% !important; flex: 0 0 99% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".cols_cnt\",\"action\":[\"style\",\"max-width: 95% !important;\"],\"cssable\":true}","{\"selector\":\".first_col, .n_first_col\",\"action\":[\"style\",\"width: 70% !important;\"],\"cssable\":true}","{\"selector\":\".second_col, .n_second_col\",\"action\":[\"style\",\"width: 30% !important;\"],\"cssable\":true}"]},{"a":["{\"selector\":\".main_wrapper\",\"action\":[\"style\",\"max-width: 95% !important;\"],\"cssable\":true}","{\"selector\":\".page_first_clm\",\"action\":[\"style\",\"width: 70% !important;\"],\"cssable\":true}","{\"selector\":\".page_second_clm\",\"action\":[\"style\",\"width: 30% !important;\"],\"cssable\":true}","{\"selector\":\".right_col\",\"action\":[\"style\",\"width: 95% !important;\"],\"cssable\":true}"]}];

const hostnamesMap = new Map([["aftabir.com",0],["adanayi.blogfa.com",1],["takmili.com",[1,13]],["adanayi.ir",1],["coffeeapps.ir",1],["searchline.ir",1],["vakil.net",1],["digiato.com",2],["digikala.com",3],["eghtesadonline.com",4],["fardanews.com",5],["khabarfoori.com",6],["mosalasonline.com",7],["niniban.com",8],["p30konkor.com",9],["shomanews.com",10],["shomavaeghtesad.com",11],["takhfifan.com",12],["tasnimnews.com",14],["technews-iran.com",15],["yektapress.com",16],["konkur.in",17],["rasm.io",18],["biainobokhor.ir",19],["econews.ir",20],["eghtesadepooya.ir",20],["eghtesadgardan.ir",20],["ilna.ir",21],["imna.ir",22],["isna.ir",23],["jobinja.ir",24],["khaandaniha.ir",25],["khabaronline.ir",26],["rouydad24.ir",27],["shmi.ir",28],["zoomit.ir",29],["footballi.net",30],["gadgetnews.net",31],["ifilo.net",32],["jeyran.net",33],["borna.news",34],["gostaresh.news",35]]);

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, hostnamesMap });

/******************************************************************************/

})();

/******************************************************************************/
