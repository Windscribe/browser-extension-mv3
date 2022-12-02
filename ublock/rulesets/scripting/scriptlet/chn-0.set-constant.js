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

// chn-0

const argsList = [{"a":["ADS_BLOCKED","false"]},{"a":["isAdsDisplayed","true"]},{"a":["_AdBlockInit","noopFunc"]},{"a":["killads","true"]},{"a":["fuzqingAdPlus","emptyObj"]},{"a":["all520dddaaa2022aaa","undefined"]},{"a":["all520dddaaa2022ccc","true"]},{"a":["canRunAds","true"]},{"a":["ga","noopFunc"]},{"a":["google_empty_script_included","true"]},{"a":["adsbygoogle","noopFunc"]},{"a":["adblock","false"]},{"a":["Object.prototype.nopreroll_","true"]},{"a":["ads","''"]},{"a":["onload","null"]},{"a":["NativeAd","noopFunc"]},{"a":["__jsadsuccess","true"]},{"a":["adbk","false"]},{"a":["NEWS_FEED","noopFunc"]},{"a":["conone_lmg","noopFunc"]},{"a":["Object.prototype.ad_switch","0"]},{"a":["dy_card_dyrun","undefined"]},{"a":["poped","true"]},{"a":["Object.prototype.adData","emptyObj"]},{"a":["Object.prototype._adData","emptyObj"]},{"a":["Object.prototype.ShouldPlayAds","0"]},{"a":["adsbygoogle.loaded","true"]},{"a":["MM_openBrWindow","noopFunc"]},{"a":["lists","undefined"]},{"a":["is_show","false"]}];

const hostnamesMap = new Map([["dl.520cc.cc",0],["ekamus.info",1],["docsmall.com",2],["bigpixel.cn",3],["jkpan.cc",3],["koyi.pub",4],["520call.me",[5,6]],["520cc.cc",[5,6]],["bde4.icu",7],["mp4er.cc",[7,14]],["mp4er.com",[7,14]],["ebb.io",[8,9]],["wenxuecity.com",10],["lnk2.cc",11],["ddys.tv",12],["ddrk.me",12],["sssam.com",13],["hboav.com",[14,17]],["cocomanga.com",[15,16]],["ohmanhua.com",[15,16]],["onemanhua.com",[15,16]],["jianshu.com",18],["baiyangzuo.xkyn.com",19],["tangdoucdn.com",20],["dianyingim.com",21],["xvideo.cc",22],["v-wb.youku.com",23],["m.youku.com",24],["v.youku.com",24],["iyf.tv",25],["myptt.cc",26],["edc1014070.pixnet.net",27],["m.biqiugege8.com",28],["69xx.one",29],["theporn.cc",29]]);

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
