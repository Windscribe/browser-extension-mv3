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

/// name set-constant
/// alias set

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_setConstant() {

/******************************************************************************/

// tur-0

const argsList = [{"a":["adblock.check","noopFunc"]},{"a":["adbEnableForPage","false"]},{"a":["detector_active","true"]},{"a":["adblock_active","false"]},{"a":["adBlockRunning","false"]},{"a":["adb","false"]},{"a":["adblockEnabled","false"]},{"a":["kan_vars.adblock","undefined"]},{"a":["hasAdblock","false"]},{"a":["AdblockDetector","undefined"]},{"a":["canRunAds","true"]},{"a":["window.google_jobrunner","true"]},{"a":["jQuery.adblock","false"]},{"a":["$tieE3","true"]},{"a":["koddostu_com_adblock_yok","null"]},{"a":["google_jobrunner","noopFunc"]},{"a":["adsbygoogle.loaded","true"]},{"a":["adblock","false"]},{"a":["ai_adb_detected","noopFunc"]},{"a":["puShown","true"]},{"a":["isShow","true"]},{"a":["rek_kontrol","noopFunc"]},{"a":["clicked","true"]},{"a":["adSearchTitle","undefined"]},{"a":["Object.prototype.ads","noopFunc"]},{"a":["HBiddings.vastUrl","''"]},{"a":["AdvPlayer","undefined"]},{"a":["_popByHours","undefined"]},{"a":["_pop","undefined"]},{"a":["initOpen","undefined"]},{"a":["initNewAd","noopFunc"]},{"a":["rg","noopFunc"]},{"a":["Object.prototype.ads_enable","false"]},{"a":["td_ad_background_click_link","''"]},{"a":["adsConfig.enabled","false"]},{"a":["start","1"]}];

const hostnamesMap = new Map([["iyibeslenme.net",0],["teknop.net",0],["kirtkirtla.com",0],["buneymis.net",0],["ozgunbilgi.com",0],["e-kitapstore.com",1],["wheel-size.com.tr",2],["karnaval.com",3],["mangaship.net",4],["mangaship.com",4],["miuitr.info",5],["puhutv.com",6],["coinotag.com",7],["cnnturk.com",[8,9]],["kanald.com.tr",8],["iddaaorantahmin.com",10],["forum.auraroleplay.com",11],["oyungibi.com",12],["veterinerhekimleri.com",12],["unisinav.com",13],["turkdenizcileri.com",14],["bilgalem.blogspot.com",14],["okulsoru.com",14],["tekniknot.com",15],["messletters.com",16],["klavyeanaliz.org",17],["turkeycrack.com",18],["yabancidizilertv.com",19],["1080hdfilmizle.com",19],["vipfilmlerizle.me",19],["hdfilmcehennemi.buzz",19],["erotikizle123.com",19],["dipfilmizle.com",19],["erotikizlefilm.com",19],["turkerotikizle.com",19],["yabancidizibax.com",19],["sinemangoo.org",19],["sexfilmleriizle.com",19],["fullhdfilmizle.cc",19],["fullhdfilm.pro",19],["pembetv18.com",19],["geziforumu.com",19],["ddizipal.com",19],["efendim.xyz",19],["dizipaltv.org",19],["dizispeed.net",19],["filmjr1.com",19],["fluffcore.com",19],["filmpaf.com",19],["hdfilmfullizle.com",19],["hdfilmcehennemizle.com",19],["netfullfilmizle3.com",19],["filmmodu.info",19],["izlekolik.com",19],["dizipaltv.com",19],["dizifilm.pro",19],["dizivid.net",19],["arrowizle.com",19],["hdfilmifullizle.com",19],["erotik123.com",19],["jokerfilmizle.com",19],["720pfilmiizle.net",19],["seehdfilm.com",19],["dizirun1.com",19],["filmfiz.net",19],["filmcus.com",19],["hazirfilm.com",19],["filmizlew.org",19],["zoof1.xyz",19],["sinemakolik.net",19],["sinefilmizlesen.com",19],["zarize.com",19],["pornobuna.com",19],["zarizeporno.com",19],["burdenfly.com",19],["diziking.vip",19],["filmdelisi.org",19],["1080pfilmizle.me",19],["zzerotik.com",19],["filmgo.org",19],["filmiifullizlee.net",19],["sinemafilmizle.net",19],["fullhdfilmiizle.org",19],["hdfilmw.org",19],["buzfilmizle1.com",19],["filmkuzusu1.com",19],["hdfilmcix.net",19],["sinemadelisi.com",19],["yetiskinfilmizle.net",19],["hdsexfilmizle.com",19],["erotik-film.org",19],["erotikfilmtube.com",19],["erotik-filmler.net",19],["erotikfilms.net",19],["erotizmfilmleri.net",19],["sezonlukdizi2.com",19],["filmbabasi.com",19],["pornoanne.com",19],["dizikorea.com",19],["koredizileri.tv",19],["diziboxx.com",19],["turkaliz.com",19],["jetdiziizle.net",19],["vkfilmizle.net",19],["dizimom.live",19],["yerlidizi.pw",19],["fullhdfilmizleyin.com",19],["filmizlet.net",19],["baglanfilme.com",19],["filmgooo.com",19],["pornorips.com",19],["bumfilmizle.com",19],["bestdizi.com",19],["shirl.club",19],["evrenselfilmlerim.org",19],["turkcealtyazilipornom.com",19],["sinema.cc",19],["hdfilmizletv.net",19],["filmmom.pro",[19,20]],["torrent-oyun.com",19],["shortz.club",19],["sinemaizle.co",19],["filmlane.com",19],["netfilmtvizle.com",19],["hdfilmcehennem.live",19],["xbox360torrent.com",19],["efullizle.com",19],["morfilmizle.com",19],["asyafanatiklerim.com",19],["guncelhdfilm.com",19],["dizilost.com",19],["fileru.net",19],["dizitube.net",19],["fullhdfilmdeposu.com",19],["volsex.com",19],["torba.info",19],["erotiksexizle.com",19],["altyazilifilm.live",19],["divx720pfilmizle.org",19],["dizipal300.com",19],["dizipal301.com",19],["dizipal302.com",19],["dizipal303.com",19],["dizipal304.com",19],["dizipal305.com",19],["dizipal306.com",19],["dizipal307.com",19],["dizipal308.com",19],["dizipal309.com",19],["dizipal310.com",19],["dizipal311.com",19],["dizipal312.com",19],["dizipal313.com",19],["dizipal314.com",19],["dizipal315.com",19],["dizipal316.com",19],["dizipal317.com",19],["dizipal318.com",19],["dizipal319.com",19],["dizipal320.com",19],["dizipal321.com",19],["dizipal322.com",19],["dizipal323.com",19],["dizipal324.com",19],["dizipal325.com",19],["dizipal326.com",19],["dizipal327.com",19],["dizipal328.com",19],["dizipal329.com",19],["dizipal330.com",19],["dizipal331.com",19],["dizipal332.com",19],["dizipal333.com",19],["dizipal334.com",19],["dizipal335.com",19],["dizipal336.com",19],["dizipal337.com",19],["dizipal338.com",19],["dizipal339.com",19],["dizipal340.com",19],["dizipal341.com",19],["dizipal342.com",19],["dizipal343.com",19],["dizipal344.com",19],["dizipal345.com",19],["dizipal346.com",19],["dizipal347.com",19],["dizipal348.com",19],["dizipal349.com",19],["dizipal350.com",19],["dizipal351.com",19],["dizipal352.com",19],["dizipal353.com",19],["dizipal354.com",19],["dizipal355.com",19],["dizipal356.com",19],["dizipal357.com",19],["dizipal358.com",19],["dizipal359.com",19],["dizipal360.com",19],["dizipal361.com",19],["dizipal362.com",19],["dizipal363.com",19],["dizipal364.com",19],["dizipal365.com",19],["dizipal366.com",19],["dizipal367.com",19],["dizipal368.com",19],["dizipal369.com",19],["dizipal370.com",19],["dizipal371.com",19],["dizipal372.com",19],["dizipal373.com",19],["dizipal374.com",19],["dizipal375.com",19],["dizipal376.com",19],["dizipal377.com",19],["dizipal378.com",19],["dizipal379.com",19],["dizipal380.com",19],["dizipal381.com",19],["dizipal382.com",19],["dizipal383.com",19],["dizipal384.com",19],["dizipal385.com",19],["dizipal386.com",19],["dizipal387.com",19],["dizipal388.com",19],["dizipal389.com",19],["dizipal390.com",19],["dizipal391.com",19],["dizipal392.com",19],["dizipal393.com",19],["dizipal394.com",19],["dizipal395.com",19],["dizipal396.com",19],["dizipal397.com",19],["dizipal398.com",19],["dizipal399.com",19],["dizipal400.com",19],["dizipal401.com",19],["dizipal402.com",19],["dizipal403.com",19],["dizipal404.com",19],["dizipal405.com",19],["dizipal406.com",19],["dizipal407.com",19],["dizipal408.com",19],["dizipal409.com",19],["dizipal410.com",19],["dizipal411.com",19],["dizipal412.com",19],["dizipal413.com",19],["dizipal414.com",19],["dizipal415.com",19],["dizipal416.com",19],["dizipal417.com",19],["dizipal418.com",19],["dizipal419.com",19],["dizipal420.com",19],["dizipal421.com",19],["dizipal422.com",19],["dizipal423.com",19],["dizipal424.com",19],["dizipal425.com",19],["dizipal426.com",19],["dizipal427.com",19],["dizipal428.com",19],["dizipal429.com",19],["dizipal430.com",19],["dizipal431.com",19],["dizipal432.com",19],["dizipal433.com",19],["tekfullfilmizle5.com",20],["yovmiyelazim.com",20],["tekfullfilmizle3.com",20],["izleorg2.org",20],["dizipal73.cloud",20],["dizipal70.cloud",20],["dizipal71.cloud",20],["dizipal72.cloud",20],["dizipal74.cloud",20],["dizipal75.cloud",20],["dizipal76.cloud",20],["dizipal77.cloud",20],["dizipal78.cloud",20],["dizipal79.cloud",20],["dizipal80.cloud",20],["dizipal81.cloud",20],["dizipal82.cloud",20],["dizipal83.cloud",20],["dizipal84.cloud",20],["dizipal85.cloud",20],["dizipal86.cloud",20],["dizipal87.cloud",20],["dizipal88.cloud",20],["dizipal89.cloud",20],["dizipal90.cloud",20],["dizipal91.cloud",20],["dizipal92.cloud",20],["dizipal93.cloud",20],["dizipal94.cloud",20],["dizipal95.cloud",20],["dizipal96.cloud",20],["dizipal97.cloud",20],["dizipal98.cloud",20],["dizipal99.cloud",20],["dizipal100.cloud",20],["dizipal101.cloud",20],["dizipal102.cloud",20],["dizipal103.cloud",20],["dizipal104.cloud",20],["dizipal105.cloud",20],["dizipal106.cloud",20],["dizipal107.cloud",20],["dizipal108.cloud",20],["dizipal109.cloud",20],["dizipal110.cloud",20],["dizipal111.cloud",20],["dizipal112.cloud",20],["dizipal113.cloud",20],["dizipal114.cloud",20],["dizipal115.cloud",20],["dizipal116.cloud",20],["dizipal117.cloud",20],["dizipal118.cloud",20],["dizipal119.cloud",20],["dizipal120.cloud",20],["dizipal121.cloud",20],["dizipal122.cloud",20],["dizipal123.cloud",20],["dizipal124.cloud",20],["dizipal125.cloud",20],["dizipal126.cloud",20],["dizipal127.cloud",20],["dizipal128.cloud",20],["dizipal129.cloud",20],["dizipal130.cloud",20],["dizipal131.cloud",20],["dizipal132.cloud",20],["dizipal133.cloud",20],["dizipal134.cloud",20],["dizipal135.cloud",20],["dizipal136.cloud",20],["dizipal137.cloud",20],["dizipal138.cloud",20],["dizipal139.cloud",20],["dizipal140.cloud",20],["dizipal141.cloud",20],["dizipal142.cloud",20],["dizipal143.cloud",20],["dizipal144.cloud",20],["dizipal145.cloud",20],["dizipal146.cloud",20],["dizipal147.cloud",20],["dizipal148.cloud",20],["dizipal149.cloud",20],["dizipal150.cloud",20],["dizipal151.cloud",20],["dizipal152.cloud",20],["dizipal153.cloud",20],["dizipal154.cloud",20],["dizipal155.cloud",20],["dizipal156.cloud",20],["dizipal157.cloud",20],["dizipal158.cloud",20],["dizipal159.cloud",20],["dizipal160.cloud",20],["dizipal161.cloud",20],["dizipal162.cloud",20],["dizipal163.cloud",20],["dizipal164.cloud",20],["dizipal165.cloud",20],["dizipal166.cloud",20],["dizipal167.cloud",20],["dizipal168.cloud",20],["dizipal169.cloud",20],["dizipal170.cloud",20],["dizipal171.cloud",20],["dizipal172.cloud",20],["dizipal173.cloud",20],["dizipal174.cloud",20],["dizipal175.cloud",20],["dizipal176.cloud",20],["dizipal177.cloud",20],["dizipal178.cloud",20],["dizipal179.cloud",20],["dizipal180.cloud",20],["dizipal181.cloud",20],["dizipal182.cloud",20],["dizipal183.cloud",20],["dizipal184.cloud",20],["dizipal185.cloud",20],["dizipal186.cloud",20],["dizipal187.cloud",20],["dizipal188.cloud",20],["dizipal189.cloud",20],["dizipal190.cloud",20],["dizipal191.cloud",20],["dizipal192.cloud",20],["dizipal193.cloud",20],["dizipal194.cloud",20],["dizipal195.cloud",20],["dizipal196.cloud",20],["dizipal197.cloud",20],["dizipal198.cloud",20],["dizipal199.cloud",20],["dizipal200.cloud",20],["filmmakinesi1.com",21],["turkanime.co",22],["forum.donanimhaber.com",23],["filmmodu2.com",24],["filmmodu3.com",24],["filmmodu4.com",24],["filmmodu5.com",24],["filmmodu6.com",24],["filmmodu7.com",24],["filmmodu8.com",24],["atv.com.tr",25],["turkturk.org",26],["turkturk.net",26],["narcovip.com",[27,28]],["contentx.me",29],["superfilmgeldi.com",30],["edebiyatdefteri.com",31],["belgeselizlesene.com",32],["technopat.net",33],["strmrdrfroge.site",34],["strmrdrfrogd.site",34],["strmrdrfrofg.site",34],["strmrdrfrofd.site",34],["strmrdrfrofc.site",34],["strmrdrfroei.site",34],["strmrdrfroeg.site",34],["strmrdrfroed.site",34],["strmrdrfrodg.xyz",34],["strmrdrfrocj.xyz",34],["strmrdrfrode.xyz",34],["strmrdrfrodd.xyz",34],["strmrdrfrobc.xyz",34],["aydindenge.com.tr",35]]);

/******************************************************************************/

const scriptlet = (
    chain = '',
    cValue = ''
) => {
    if ( chain === '' ) { return; }
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
        cValue = function(){};
    } else if ( cValue === 'trueFunc' ) {
        cValue = function(){ return true; };
    } else if ( cValue === 'falseFunc' ) {
        cValue = function(){ return false; };
    } else if ( /^\d+$/.test(cValue) ) {
        cValue = parseFloat(cValue);
        if ( isNaN(cValue) ) { return; }
        if ( Math.abs(cValue) > 0x7FFF ) { return; }
    } else {
        return;
    }
    let aborted = false;
    const mustAbort = function(v) {
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
        if ( handler.init(owner[prop]) === false ) { return; }
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
            Object.defineProperty(owner, prop, {
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
                    return cValue;
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
