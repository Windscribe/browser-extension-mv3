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

// spa-1

const argsList = [{"a":["Object.prototype.adblockerEnabled","false"]},{"a":["adsbygoogle.loaded","true"]},{"a":["adBlockCheck","true"]},{"a":["pp_show_popupmessage","noopFunc"]},{"a":["easySettings.adblock","0"]},{"a":["canRunAds","true"]},{"a":["onload","null"]},{"a":["adblockDetector.init","noopFunc"]},{"a":["adsbygoogle.length","undefined"]},{"a":["WSL2.config.enableAdblockEcommerce","0"]},{"a":["ads_unblocked","true"]},{"a":["adblock","true"]},{"a":["kkwoiNI","noopFunc"]},{"a":["yUIlOsT","noopFunc"]},{"a":["better_ads_adblock","true"]},{"a":["adBlockDetected","false"]},{"a":["isAdsDisplayed","true"]},{"a":["Lata","1"]},{"a":["loadingAds","true"]},{"a":["goog_pvsid","1"]},{"a":["Goog_Osd_UnloadAdBlock","1"]},{"a":["google_osd_loaded","1"]},{"a":["stopMan","false"]},{"a":["google_unique_id","1"]},{"a":["player.preroll","noopFunc"]},{"a":["anunciotag","noopFunc"]},{"a":["_mvnxp","noopFunc"]},{"a":["loadingAds","undefined"]},{"a":["click","1"]},{"a":["clickd","1"]},{"a":["xxxStore","undefined"]},{"a":["vidorev_jav_plugin_video_ads_object.vid_ads_m_video_ads","''"]},{"a":["clicked","true"]},{"a":["eClicked","true"]},{"a":["number","0"]},{"a":["sync","true"]},{"a":["a_consola","noopFunc"]}];

const hostnamesMap = new Map([["cadenaser.com",0],["texto.kom.gt",1],["infojobs.com.br",2],["maringapost.com.br",3],["bandab.com.br",3],["ouniversodatv.com",4],["skynovels.net",5],["wuolah.com",5],["botinnifit.com",5],["minhasdelicias.com",5],["luchaonline.com",5],["tribunaavila.com",6],["deportealdia.live",7],["elquintobeatle.com",8],["empregoestagios.com",8],["satcesc.com",8],["applesfera.com",9],["bebesymas.com",9],["compradiccion.com",9],["diariodelviajero.com",9],["directoalpaladar.com",9],["elblogsalmon.com",9],["espinof.com",9],["genbeta.com",9],["motorpasion.com",9],["motorpasionmoto.com",9],["pymesyautonomos.com",9],["trendencias.com",9],["trendenciashombre.com",9],["vidaextra.com",9],["vitonica.com",9],["xataka.com",9],["xatakaciencia.com",9],["xatakafoto.com",9],["xatakahome.com",9],["xatakamovil.com",9],["xatakandroid.com",9],["xatakawindows.com",9],["doceru.com",10],["docero.com.br",10],["comandotorrents.org",11],["mangahost.site",[12,13]],["adslayuda.com",14],["outerspace.com.br",15],["doramasmp4.com",16],["file4go.net",17],["seriesdonghua.com",18],["mundodonghua.com",18],["mangahost4.com",[19,20,21,22,23]],["mangahosted.com",[19,20,21,22,23]],["mangahost2.com",[19,20,21,22,23]],["player.hentaistube.com",24],["playnewserie.xyz",25],["vizer.vip",26],["tiohentai.xyz",27],["otakustv.com",[28,29]],["pornolandia.xxx",30],["hentaiporno.xxx",31],["megadescarga.net",[32,33,34,35]],["fakings.com",36]]);

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
