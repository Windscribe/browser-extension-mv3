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

// ruleset: annoyances-cookies

/******************************************************************************/

// Important!
// Isolate from global scope

(function uBOL_setConstant() {

/******************************************************************************/

const scriptletGlobals = new Map(); // jshint ignore: line

const argsList = ["[\"window.consentManagementEnabled\",\"false\"]","[\"BrockmanAllowedCookies.targeting\",\"true\"]","[\"BrockmanAllowedCookies.functional\",\"true\"]","[\"settings.consent\",\"true\"]","[\"HB.CookieSettings.init\",\"noopFunc\"]","[\"WHT.ShowConsentForm\",\"trueFunc\"]","[\"useGDPR\",\"false\"]","[\"realCookieBanner\",\"undefined\"]","[\"amw.isCookieConsentAccepted\",\"true\"]","[\"amw.isMarketingCookiesAccepted\",\"false\"]","[\"amw.isAnalyticsCookiesAccepted\",\"false\"]","[\"window.cmpmngr.setConsentViaBtn\",\"noopFunc\"]","[\"jwAlmaCMPLoaded\",\"true\"]","[\"tcfAllowUseCookies\",\"true\"]","[\"cicc.cookie_cat_functional\",\"true\"]","[\"cicc.cookie_cat_statistic\",\"true\"]","[\"cicc.cookie_cat_marketing\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.youtube.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.omny.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.pcnltelecom.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.googlemaps.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.streamable.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.soundcloud.approved\",\"true\"]","[\"tweakersConfig.userConfiguredConsent.knightlab.approved\",\"true\"]","[\"yleConsentSdk._consentSdk._embedded_social_media\",\"true\"]","[\"yleConsentSdk.show\",\"noopFunc\"]","[\"window.scrollTo\",\"noopFunc\"]","[\"flagTcfLoaded\",\"true\"]"];

const hostnamesMap = new Map([["fruugo.at",0],["fruugo.be",0],["fruugo.cz",0],["fruugo.de",0],["fruugo.dk",0],["fruugo.es",0],["fruugo.fi",0],["fruugo.gr",0],["fruugo.hu",0],["fruugo.ie",0],["fruugo.it",0],["fruugo.lu",0],["fruugo.nl",0],["fruugo.pl",0],["fruugo.pt",0],["fruugo.ro",0],["fruugo.sk",0],["eurogamer.nl",[1,2]],["eurogamer.es",[1,2]],["eurogamer.cz",[1,2]],["eurogamer.net",[1,2]],["eurogamer.pl",[1,2]],["eurogamer.pt",[1,2]],["rockpapershotgun.com",[1,2]],["vg247.com",[1,2]],["vadhander.hogakusten.com",3],["vadhander.kramfors.se",3],["stewes.de",4],["gadgethacks.com",5],["qastack.fr",6],["philosophia-perennis.com",7],["tecsafe.de",7],["devm.io",7],["schnittmuster-datenbank.de",7],["rosgovas.com",7],["blu-ray-rezensionen.net",7],["bricksforge.io",7],["lenovocampus.de",7],["rotlichtaus.de",7],["louisreynier.com",7],["stricken-online.com",7],["haarausfall-stopp.com",7],["cargoe.at",7],["pandore-gendarmerie.org",7],["pureselfmade.com",7],["fild.de",7],["m-m-m.de",7],["yogainspires.co.uk",7],["youngimages.de",7],["katzenbaumdesign.de",7],["goerlach-gmbh.com",7],["lichtempfindlich.org",7],["gasthaus-schmidmayer.de",7],["narrwalla.de",7],["efg-passau.de",7],["gefahrgutjaeger.de",7],["locafrique-sf.com",7],["financeads.com",7],["tutonaut.de",7],["freegossip.gr",7],["ltmemory.de",7],["randombrick.de",7],["playcentral.de",7],["nachbelichtet.com",7],["philosophenlexikon.de",7],["schulebruetten.ch",7],["almacenessanagustin.com",7],["autoverwertung-berk.de",7],["gosch.de",7],["ousuca.com",7],["stw-langenfeld.de",7],["yurishop.it",7],["europace.de",7],["autobrinkmann.de",7],["move-ment.at",7],["techniknews.net",7],["epages.com",7],["thinkingwithyou.com",7],["mfu-pilotenclub.at",7],["artkon.de",7],["running-green.de",7],["danielederosa.de",7],["ivfp.de",7],["bs-achern.de",7],["swiss-commerce.ch",7],["asga.ch",7],["ellasblog.de",7],["gamenite.de",7],["mmo-sankar.de",7],["istaf-indoor.de",7],["iqskitchen.de",7],["ekiwi.de",7],["nordlicht-ev.de",7],["zimmerwetter.de",7],["pinel-netzwerk.de",7],["bierspot.de",7],["lightcon.com",7],["roschmann.de",7],["simtarife.de",7],["egon-w-kreutzer.de",7],["terra-natur.com",7],["devowl.io",7],["cleverpush.com",7],["subitec.com",7],["kwerfeldein.de",7],["tecalliance.net",7],["viel-unterwegs.de",7],["madame-lenormand.de",7],["4kfilme.de",7],["gymnasium-hochdahl.de",7],["popp.eu",7],["maniac.de",7],["supertipp-online.de",7],["winlocal.de",7],["schiffe-und-kreuzfahrten.de",7],["guiademayores.com",7],["jankarres.de",7],["nahrungsmittel-intoleranz.com",7],["branson-germany.de",7],["miriamkreativ.de",7],["zaunbau-koch.de",7],["bsk-consulting.de",7],["windata.de",7],["prodopa.de",7],["zahnarzt-kuboth.de",7],["audiovision.de",7],["brachmannofficial.com",7],["compari.net",7],["computer-und-technik-im-wohnmobil.de",7],["seifriz-preis.de",7],["suitapp.de",7],["rossoft.co.uk",7],["wind-craft.eu",7],["manyanet.org",7],["mack-design.com",7],["pocket-pirates-prt.de",7],["project-creative.de",7],["tanzschulebogner.de",7],["toplink.de",7],["vg-veitsbronn-seukendorf.de",7],["skiweltcup.tv",7],["desser.co.uk",7],["symposium.org",7],["manneskraft-gesteigert.com",7],["barracred.com.br",7],["tv-sport.de",7],["boheme-schwabing.de",7],["spherity.com",7],["tc-equipment.de",7],["webfactory-i4.de",7],["webtimiser.de",7],["wp-ninjas.de",7],["profiel.de",7],["goeltzschtal-reisen.de",7],["everbloom.eu",7],["myclim8.com",7],["smiley.blue",7],["tulipize.com",7],["burzaucebnic.sk",7],["komm-mit.com",7],["istdasvegan.eu",7],["openforests.com",7],["industriemedien.at",7],["torinostoria.com",7],["igvm.de",7],["pinel.de",7],["music-service-geiger.de",7],["insidetrading.de",7],["ls-service.at",7],["blogyourthing.com",7],["bildung-ab-50.de",7],["teilzeitreisender.de",7],["vivoil.com",7],["borderline-plattform.de",7],["accace.ro",7],["lang-ag.com",7],["reise-zikaden.de",7],["restaurant-lindenhof.at",7],["nmmn.com",7],["exitroom.berlin",7],["weiterbildungsfinder.de",7],["erfurt-touristinformation.de",7],["elisazunder.de",7],["visconti.partners",7],["plr-paket.de",7],["spytunes.com",7],["schneelaeuferzunft.de",7],["flaviamelissa.com.br",7],["flughafen.tips",7],["webtapete.de",7],["erbsenprinzessin.com",7],["cranimax.com",7],["ac-grimmen.de",7],["floristasgarcia.es",7],["monikabirknerfreedombusiness.de",7],["lattinepersonalizzate.it",7],["olmatic.de",7],["die-werbeschmiede.de",7],["supereight.net",7],["visitmedia.de",7],["egro-direktwerbung.de",7],["alleingeborener-zwilling.com",7],["actrento.com",7],["antik-shop.de",7],["accace.cz",7],["happiness-bundles.com",7],["classic-emaille.de",7],["fakturia.de",7],["beeze.de",7],["brunozimmer.de",7],["derhoerbuchblog.de",7],["udo-lermann.de",7],["ciss.de",7],["volksfest-nuernberg.de",7],["ubisys.de",7],["wildbits.de",7],["softedu.pl",7],["maxkoch.de",7],["mario-kaps.de",7],["salzstreuner.de",7],["goessential.com",7],["tiesse.com",7],["compagniefruitiere.fr",7],["motivationstipp.de",7],["holzkisten-fabrik.de",7],["dasmagazin.de",7],["akademie-management.de",7],["salzerkfz.de",7],["aglini.com",7],["m38a1.de",7],["thomasschlechter.de",7],["smorfianapoletanaweb.it",7],["vzm.de",7],["proofing.de",7],["kbmv-matting.de",7],["vitalplus.com",7],["karver-systems.com",7],["boeser-chinese.de",7],["reinhardstrempel.de",7],["bewusstes-zentrum.de",7],["wildpark-ortenburg.de",7],["24hessen.de",7],["janamaenz.photography",7],["prodottidellapiazza.it",7],["continentale-hannover.de",7],["accace.sk",7],["wzl-zwickau.de",7],["picipix.com",7],["tkm-systemtechnik.de",7],["drive4brands.de",7],["brancaia.com",7],["trirhena-consulting.de",7],["pferde-hunde-therapie.de",7],["ffzblossin.de",7],["coyagaming.de",7],["cocktailsworld.net",7],["forum-koepenick.de",7],["immobilien-skiba.de",7],["penzkofer-bau.de",7],["fitnesscenter-schardt.de",7],["abcteile24.de",7],["wohnmobilcenter-drechsler.de",7],["crossculture-academy.com",7],["blhv.de",7],["blindbild.com",7],["zouboulis.com",7],["esderaiz.com",7],["ichbindochnichthierumbeliebtzusein.com",7],["von-zinsen-leben.de",7],["c-parts.de",7],["accademiainformatica.com",7],["lobetalarbeit.de",7],["hannover-living.de",7],["tsg6209weinheim.de",7],["stefaniegoldmarie.com",7],["dictum-shop.de",7],["oakbeardcare.com",7],["patchbox.com",7],["lazyinvestors.de",7],["frohreich.de",7],["transport-versicherungen.info",7],["mummelito.de",7],["reisekontakte.at",7],["ojas.de",7],["stadt-schoeneck.de",7],["piazzadeimestieri.it",7],["fasteninfos.de",7],["brodbeck-dd.de",7],["hundewelpe.de",7],["jadent.de",7],["duft-werk.de",7],["wunderpen.com",7],["crazeuk.com",7],["drhorvath.de",7],["weingut-knipser.de",7],["donostiroller.com",7],["roemermann.com",7],["bestwig.de",7],["tango-flores.de",7],["china-central-consultants.com",7],["lacasadavantialsole.org",7],["naturseifen-moosmed.de",7],["akzent-magazin.com",7],["wp-loft.de",7],["welte-glasuren.com",7],["balsamico.shop",7],["sl-landschaftsgestaltung.de",7],["betec.de",7],["alquilerordenadores.com",7],["bayern-kreativ.de",7],["tim-ehling.com",7],["signisalc.org",7],["coworkingrepublic.com",7],["dacsa.com",7],["plzenoviny.cz",7],["odw-journal.de",7],["kasteninblau.de",7],["lichttraeumer.de",7],["missinfogeek.net",7],["automatiksysteme.com",7],["adzurro.de",7],["vectorsoft.de",7],["suedafrika-wein.de",7],["noaf.de",7],["hundgemacht.net",7],["testefiorite.it",7],["klsys.com",7],["feuerhexen.de",7],["lemarit.com",7],["lameerooftop.com",7],["ideentitaet.com",7],["kaiser-mania.de",7],["accace.com",7],["naku.at",7],["goldpreis24.de",7],["ejwleo.de",7],["josefbergs.com",7],["caucasus-naturefund.org",7],["energiemetropole-leipzig.de",7],["von-neindorff-stiftung.de",7],["locandazita.com",7],["samadhi-vegetarian.de",7],["host.pl",7],["pentadoc-radar.com",7],["kd-slovenija.de",7],["accace.hu",7],["stilweb.it",7],["wolfgangallgaeuer.com",7],["kohlkg.de",7],["rechtsanwalt-nierfeld.de",7],["karlhoeffkes.de",7],["verstehepferde.de",7],["socceressen.de",7],["dcore.de",7],["edr-software.com",7],["denk-doch-mal.de",7],["meinstream.net",7],["stefan-froescher.eu",7],["zabel-group.de",7],["photofloh.de",7],["annabeauty-stuttgart.de",7],["swg-chemnitz.de",7],["klicks-kaufen.de",7],["levne-sauny.cz",7],["versicherungsmakler-leistenschneider.de",7],["arsdigita.de",7],["flugschule-hochries.de",7],["osmc.de",7],["zumkutscher.de",7],["evkirche-eilsen.de",7],["thingybob.de",7],["inicionet.com",7],["feucht-obsttechnik.de",7],["weimar-touristinformation.de",7],["yplay.de",7],["vcfrankfurt.de",7],["derklassiker.de",7],["lepetitmarchedauvergne.fr",7],["gooloo.de",7],["pizzeria-algusto.de",7],["presto-personaldienste.de",7],["wallygusto.de",7],["frigge-dinstak.de",7],["klangmassage-moser.de",7],["grupo-loma.com",7],["samenbank-berlin.de",7],["flow-in-yoga.de",7],["lb-consultores.com",7],["b757.info",7],["luegeten.ch",7],["hof-droste.de",7],["aachen50plus.de",7],["arabesque-essen.de",7],["grid.de",7],["canvascga.com",7],["mallorca-unternehmen.com",7],["hauspanorama.de",7],["vienna-interiors.at",7],["music-on-net.de",7],["baumarkt-vogl.at",7],["knoblauch.de",7],["rissland-kunststoffe.de",7],["fahrstil.cc",7],["hallesches-fotoatelier.de",7],["dollenberg-isolierung.de",7],["timo-bernhard.de",7],["feuerwehr-oberau.de",7],["kuechenboerse.de",7],["erlebnispark-ziegenhagen.de",7],["frauzuckerbroetchen.com",7],["hopfner.info",7],["tiermasseur-mannsberger.at",7],["gcol.de",7],["blueoceangaming.com",7],["pinel-medizin.de",7],["knauer-galabau.de",7],["zahnarzt-dr-henkel.de",7],["tonispizza-rastatt.de",7],["wichmann.biz",7],["schuetzendepot.de",7],["horizonte.com",7],["dayspamainz.de",7],["gerdes-reisen.de",7],["dg-pw.de",7],["brill-art.de",7],["carbon.ag",7],["199-euro-computer.de",7],["pndracingteam.net",7],["sv-langenfeld.de",7],["steinway-park-seesen.de",7],["sonderversum.com",7],["forwardis.com",7],["verein-fairbund.de",7],["hs-soft.com",7],["backstagefrankfurt.de",7],["hans-engelke.de",7],["vapecoco.com",7],["imprints.de",7],["rolandgermany.com",7],["fschemie-goettingen.de",7],["hypnose.ac",7],["estudio-nous.com",7],["kunstmuseum-heidenheim.de",7],["htvb.org",7],["ridee.bike",7],["zur-glocke.com",7],["hotelkristall.it",7],["babiceurican.cz",7],["farbenherz.com",7],["it-koehler.com",7],["bklm-ahaus.de",7],["gesundheitsladen-online.de",7],["createchange.me",7],["amway-estonia.com",[8,9,10]],["amway-latvia.com",[8,9,10]],["amway-lithuania.com",[8,9,10]],["amway.es",[8,9,10]],["amway.no",[8,9,10]],["amway.nl",[8,9,10]],["amway.co.uk",[8,9,10]],["amway.com.tr",[8,9,10]],["amway.pt",[8,9,10]],["amway.be",[8,9,10]],["amway.sk",[8,9,10]],["amway.de",[8,9,10]],["amway.ch",[8,9,10]],["amway.gr",[8,9,10]],["amway.ie",[8,9,10]],["amway.se",[8,9,10]],["amway.pl",[8,9,10]],["amway.bg",[8,9,10]],["amway.hr",[8,9,10]],["amway.dk",[8,9,10]],["amway.cz",[8,9,10]],["amway.si",[8,9,10]],["amway.ro",[8,9,10]],["amway.fr",[8,9,10]],["amway.fi",[8,9,10]],["amway.it",[8,9,10]],["sourceforge.net",11],["iltalehti.fi",12],["anna.fi",13],["historianet.fi",[14,15,16]],["tieku.fi",[14,15,16]],["tweakers.net",[17,18,19,20,21,22,23]],["yle.fi",[24,25]],["podimo.com",26],["express.co.uk",27]]);

const entitiesMap = new Map([]);

const exceptionsMap = new Map([]);

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
