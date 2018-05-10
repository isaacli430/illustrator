/**
 * ADOBE CONFIDENTIAL
 *  _________________
 *  Copyright 2016 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
"use strict";

riot.tag2("debug-menu", '<button if="{showMenu}" class="menu-panel--toggle" onclick="{toggleMenu}" onkeydown="{buttonKeyDown}" onmouseleave="{menuOut}" onmouseenter="{menuOver}" aria-haspopup="true" aria-expanded="{open}" aria-controls="menu-panel-{_riot_id}" title="{toggleLabel}" aria-label="{toggleLabel}"> <i class="spc-icons">T</i> </button> <div hidden class="menu-panel" onmouseleave="{menuOut}" onmouseenter="{menuOver}" role="dialog" aria-hidden="true" id="menu-panel-{_riot_id}"> <div role="heading" aria-level="2">DEBUG MENU :: TESTING ONLY</div> <div class="menu-panel--item">{version} - {displayMode}</div> <div class="menu-panel--spacer"></div> <div class="menu-panel--row"> <span>Light</span> <label class="menu-panel--item spc-switch spc-js-switch" for="switch-1"> <input type="checkbox" id="switch-1" class="spc-switch__input" checked onclick="{swapTheme}"> </label> <span>Dark</span> </div> <div class="menu-panel--spacer"></div> <div class="menu-panel--row"> <span>Trial</span> <label class="menu-panel--item spc-switch spc-js-switch" for="switch-2"> <input type="checkbox" id="switch-2" class="spc-switch__input" onclick="{swapStatus}"> </label> <span>Paid</span> </div> <div class="menu-panel--spacer"></div> <select aria-label="Language" onchange="{selectLang}"> <option value="en_US">English US (en_US)</option> <option value="cs_CZ">Czech (cs_CZ)</option> <option value="da_DK">Danish (da_DK)</option> <option value="de_DE">German (de_DE)</option> <option value="en_AE">English Arabic (en_AE)</option> <option value="en_GB">English UK (en_GB)</option> <option value="en_IL">English Hebrew (en_IL)</option> <option value="es_ES">Spanish (es_ES)</option> <option value="es_MX">Spanish MX (es_MX)</option> <option value="fi_FI">Finnish (fi_FI)</option> <option value="fr_FR">French (fr_FR)</option> <option value="fr_CA">French CA (fr_CA)</option> <option value="fr_MA">French MA (fr_MA)</option> <option value="hu_HU">Hungarian (hu_HU)</option> <option value="it_IT">Italian (it_IT)</option> <option value="ja_JP">Japanese (ja_JP)</option> <option value="ko_KR">Korean (ko_KR)</option> <option value="nb_NO">Nordish (nb_NO)</option> <option value="nl_NL">Dutch (nl_NL)</option> <option value="pl_PL">Polish (pl_PL)</option> <option value="pt_BR">Brazilian (pt_BR)</option> <option value="ru_RU">Russian (ru_RU)</option> <option value="sv_SE">Swedish (sv_SE)</option> <option value="tr_TR">Turkish (tr_TR)</option> <option value="uk_UA">Ukranian (uk_UA)</option> <option value="zh_CN">Simplified Chinese (zh_CN)</option> <option value="zh_TW">Traditional Chinese (zh_TW)</option> </select> <div class="menu-panel--spacer"></div> <button class="spc-button" onclick="{clearStorage}">/ / / Clear localstorage / / /</button> </div>', "", 'class="grid grid--center"', function(opts) {
    var _this = this;
    this.mixin("spcmixin");
    var themeSwitch = null, acctSwitch = null, hoverTimer = -1, versionInfo = iaw.cepUtil.getExtensionVersion();
    this.version = "CCX Start v" + versionInfo.version + " (" + versionInfo.sha + ")", 
    this.displayMode = "unset", this.dark = !0, this.open = !1, this.showMenu = !1, 
    this.trapFocus = !1, this.toggleLabel = "Debug", this.buttonKeyDown = function(evt) {
        var keyCode = evt.keyCode;
        return (keyCode === iaw.a11y.Keys.ENTER || keyCode === iaw.a11y.Keys.SPACE || keyCode === iaw.a11y.Keys.DOWN && !_this.open) && (_this.trapFocus = !0, 
        keyCode === iaw.a11y.Keys.DOWN && _this.toggleMenu()), !0;
    }, this.escapeKey = function(evt) {
        _this.open && evt.keyCode === iaw.a11y.Keys.ESC && _this.closeMenu();
    }, this.mouseDown = function(evt) {
        var panel = _this.root.getElementsByClassName("menu-panel")[0], button = _this.root.getElementsByClassName("menu-panel--toggle")[0];
        _this.open && (button === evt.target || button.contains(evt.target) ? (iaw.a11y.TrapFocus.deactivate(panel), 
        _this.trapFocus = !1) : panel === evt.target || panel.contains(evt.target) || _this.closeMenu());
    }, this.swapStatus = function(evt) {
        var status = "paid" === iaw.store.get([ "host", "accountStatus" ]) ? "trial" : "paid";
        iaw.store.set([ "host", "accountStatus" ], status), acctSwitch.parentNode.classList.toggle("is-checked", acctSwitch.checked), 
        evt.target === acctSwitch && setTimeout(function() {
            acctSwitch.focus();
        }, 0), riotctrl.trigger("update-cards-retro"), riot.update(), iaw.localstorage.setGlobalItem("debug.accountStatus", status);
    }, this.swapTheme = function(evt) {
        _this.dark = !_this.dark, _this.dark ? iaw.util.setUIThemeMode("dark") : iaw.util.setUIThemeMode("light"), 
        themeSwitch.parentNode.classList.toggle("is-checked", themeSwitch.checked), riotctrl.trigger("update-theme"), 
        evt.target === themeSwitch && setTimeout(function() {
            themeSwitch.focus();
        }, 0);
    }, this.selectLang = function(evt) {
        var lang = evt.target.value;
        iaw.store.set([ "host", "language" ], lang), "undefined" != typeof moment && moment.locale(lang), 
        iaw.i18n.addFromLocalLocaleFile(lang, function() {
            riotctrl.trigger("update-i18n-retro");
        }), "en_GB" === lang && (lang = "en_US");
        var account = "paid" === iaw.store.get([ "host", "accountStatus" ]) ? "" : "_trial";
        "undefined" != typeof iaw.data && iaw.data.debugPSDK.getData("cards_" + lang + account + ".json", function() {
            riotctrl.trigger("update-cards-retro");
        });
    }, this.clearStorage = function() {
        window.localStorage.clear(), _this.closeMenu();
    }, this.menuOver = function(evt) {
        _this.open && clearTimeout(hoverTimer);
    }, this.menuOut = function(evt) {
        _this.open && !_this.trapFocus && (hoverTimer = setTimeout(_this.closeMenu.bind(_this), 500));
    }, this.closeMenu = function() {
        _this.toggleMenu(null, !0);
    }, this.toggleMenu = function(evt, forceClose) {
        var panel = _this.root.getElementsByClassName("menu-panel")[0], button = _this.root.getElementsByClassName("menu-panel--toggle")[0], options = {};
        forceClose && (_this.open = !0), _this.open ? (panel.setAttribute("aria-hidden", "true"), 
        panel.classList.remove("anim--open-menu"), panel.classList.add("anim--close-menu"), 
        button.setAttribute("aria-expanded", "false"), iaw.a11y.TrapFocus.deactivate(panel), 
        _this.trapFocus = !1, window.removeEventListener("keydown", _this.escapeKey), window.removeEventListener("mousedown", _this.mouseDown)) : (panel.removeAttribute("aria-hidden"), 
        panel.removeAttribute("hidden"), panel.classList.remove("anim--close-menu"), panel.classList.add("anim--open-menu"), 
        button.setAttribute("aria-expanded", "true"), _this.trapFocus || (options.initialFocus = panel), 
        setTimeout(function() {
            iaw.a11y.TrapFocus.activate(panel, options);
        }, 20), window.addEventListener("keydown", _this.escapeKey), window.addEventListener("mousedown", _this.mouseDown, !0)), 
        _this.open = !_this.open;
    }, this.on("mount", function() {
        themeSwitch = document.getElementById("switch-1"), acctSwitch = document.getElementById("switch-2"), 
        this.escapeKey = this.escapeKey.bind(this), this.mouseDown = this.mouseDown.bind(this), 
        this.showMenu && riotctrl.on("update-host-retro", this.closeMenu, this);
    }), this.closeMenu = function() {
        var paid = iaw.store.get([ "host", "accountStatus" ]), localPaid = iaw.localstorage.getGlobalItem("debug.accountStatus");
        localPaid !== paid && (paid = localPaid, iaw.store.set([ "host", "accountStatus" ], paid), 
        acctSwitch.checked = "paid" === paid, acctSwitch.parentNode.classList.toggle("is-checked", acctSwitch.checked)), 
        _this.displayMode = iaw.store.get([ "host", "displayMode" ]), _this.update();
    };
}), riot.tag2("dynamic-component", "", "", "", function(opts) {
    this.on("mount", function() {
        riot.mount(this.root, opts.data.tag, opts);
    });
}), riot.tag2("raw-text", "<span></span>", "", "", function(opts) {
    this.on("mount", function() {
        this.root.innerHTML = opts.content;
    });
}), riot.tag2("tooltip", "<span></span>", "", 'role="tooltip" id="tooltip-{_riot_id}"', function(opts) {
    var rect, viewportwidth, viewportheight, _this = this, span = null, timeout = null, txt = null, customClass = null, mouse = {
        x: 0,
        y: 0
    }, marginTop = 0, delay = 500;
    this.updateMouse = function(evt) {
        mouse.x = evt.clientX, mouse.y = evt.clientY;
    }, this.refresh = function(evt) {
        viewportwidth = window.innerWidth, viewportheight = window.innerHeight, "focus" === evt.type ? (rect = evt.target.firstElementChild.getBoundingClientRect(), 
        marginTop || (marginTop = parseInt(getComputedStyle(_this.root).getPropertyValue("margin-top"))), 
        _this.root.style.left = rect.left + .5 * rect.width + "px", _this.root.style.top = rect.top + .8 * rect.height - marginTop + "px", 
        evt.target.addEventListener("keydown", _this.onKeyDown, !1), rect = void 0) : (_this.root.style.left = mouse.x + "px", 
        _this.root.style.top = mouse.y + "px", _this.root.style.right = "auto", _this.root.style.bottom = "auto", 
        mouse.x + 150 > viewportwidth && (_this.root.style.right = viewportwidth - mouse.x + "px", 
        _this.root.style.top = mouse.y + "px", _this.root.style.left = "auto", _this.root.style.bottom = "auto"), 
        mouse.y + 75 > viewportheight && (_this.root.style.bottom = viewportheight - mouse.y + "px", 
        _this.root.style.top = "auto")), span.innerText = txt, _this.root.classList.add("show", customClass);
    }, this.onOver = function(evt) {
        return txt = evt.target.getAttribute("data-tip"), customClass = evt.target.getAttribute("data-tip-class"), 
        !(!span || !txt || "" === txt) && (evt.target.addEventListener("mousemove", _this.updateMouse, !1), 
        delay = "focus" === evt.type ? 1e3 : 500, void (timeout = setTimeout(_this.refresh, delay, evt)));
    }, this.onOut = function(evt) {
        evt.target.removeEventListener("mousemove", _this.updateMouse), evt.target.removeEventListener("keydown", _this.onKeyDown), 
        _this.root.classList.remove("show", customClass), span.innerText = "", clearTimeout(timeout);
    }, this.onKeyDown = function(evt) {
        evt.keyCode === iaw.a11y.Keys.ESC && (_this.onOut(evt), evt.preventDefault(), evt.stopImmediatePropagation());
    }, this.rescan = function() {
        span = _this.root.getElementsByTagName("span")[0];
        for (var els = document.querySelectorAll("[data-tip]"), e = null, i = 0; e = els[i]; i++) e.hasDataTipListener || (e.setAttribute("aria-describedby", _this.root.id), 
        e.addEventListener("focus", _this.onOver, !0), e.addEventListener("mouseenter", _this.onOver, !1), 
        e.addEventListener("mouseleave", _this.onOut, !1), e.addEventListener("mousedown", _this.onOut, !1), 
        e.addEventListener("blur", _this.onOut, !0), e.hasDataTipListener = !0);
    }, this.delayScan = function() {
        setTimeout(_this.rescan, 30);
    }, this.on("mount", function() {
        this.rescan(), riotctrl.on("update-host-retro", this.delayScan), riotctrl.on("update-cards-retro", this.delayScan), 
        riotctrl.on("update-mru-list", this.delayScan), riotctrl.on("tab-change", this.delayScan), 
        riotctrl.on("file-view-change", this.delayScan), riotctrl.on("mobileAssetsProjectsLoaded", this.delayScan), 
        riotctrl.on("mobileAssetsPagesLoaded", this.delayScan), riotctrl.on("scan-tooltips", this.delayScan);
    }), this.on("unmount", function() {
        this.off("*"), riotctrl.off("update-host-retro", this.delayScan), riotctrl.off("update-cards-retro", this.delayScan), 
        riotctrl.off("update-mru-list", this.delayScan), riotctrl.off("tab-change", this.delayScan), 
        riotctrl.off("file-view-change", this.delayScan), riotctrl.off("mobileAssetsProjectsLoaded", this.delayScan), 
        riotctrl.off("mobileAssetsPagesLoaded", this.delayScan), riotctrl.off("scan-tooltips", this.delayScan);
    });
}), riot.mixin("cooldown", {
    init: function() {
        this.on("mount", function() {
            this._cooldowns = [];
        }), this.isCoolingDown = function(id, time) {
            time = time || 1100;
            var cd = this._cooldowns[id];
            return !!(cd && window.performance.now() - cd < time) || (this._cooldowns[id] = window.performance.now(), 
            !1);
        }.bind(this);
    }
}), riot.mixin("i18n", {
    init: function() {
        this.on("mount unmount", function(evt) {
            "mount" === evt ? riotctrl.on("update-i18n-retro", this.onUpdateI18n, this) : "unmount" === evt && riotctrl.off("update-i18n-retro", this.onUpdateI18n, this);
        }), this.on("update", function() {
            this.onUpdateI18n();
        });
    },
    onUpdateI18n: function() {
        for (var labels = this.root.querySelectorAll("[data-i18n]"), i = 0; i < labels.length; i++) {
            var e = labels[i], k = e.dataset.i18n;
            e.innerText = iaw.i18n.getLocalizedString(k);
        }
    }
}), riot.mixin("scroll-end", {
    init: function() {
        this.scrollPane = null, this.scrollContainer = null, this.on("mount unmount", function(evt) {
            "mount" === evt ? (this.scrollPane = document.querySelector(".scroll-pane"), this.scrollContainer = document.querySelector(".scroll-container"), 
            this.scrollContainer && this.scrollPane && this.scrollContainer.addEventListener("scroll", this.onScroll)) : "unmount" === evt && this.scrollContainer && this.scrollPane && this.scrollContainer.removeEventListener("scroll", this.onScroll);
        });
    },
    onScroll: function(evt) {
        this.scrollPane.offsetHeight === this.scrollContainer.offsetHeight + this.scrollContainer.scrollTop && this.trigger("scroll-end");
    }
}), riot.mixin("spcmixin", {
    init: function() {
        this.on("mount update updated", function() {
            var comps = this.root.querySelectorAll('[class*="spc-js-"');
            comps.length > 0 && window.componentHandler.upgradeElements(comps);
        });
    }
}), riot.mixin("tooltip", {
    init: function() {
        this.on("mount", function(evt) {
            riotctrl.trigger("scan-tooltips");
        }), this.on("updated", function() {
            riotctrl.trigger("scan-tooltips");
        });
    }
}), riot.mixin("unitConversion", {
    convert: function(value, opts) {
        var Big = window.Big;
        opts = opts || {};
        var startingValue = new Big(value), normalizedValue = new Big(0), stringValue = "", stringArray = [], resolution = opts.resolution || 72, pointsPerInch = opts.pointsPerInch || 72, picasPerInch = opts.picasPerInch || 72, trim = opts.trim !== !1, precision = opts.precision || 5;
        resolution = new Big(resolution), pointsPerInch = new Big(pointsPerInch), picasPerInch = new Big(picasPerInch);
        var conversionTable = {
            m: {
                factor: new Big(1)
            },
            cm: {
                factor: new Big(.01)
            },
            "in": {
                factor: new Big(.0254)
            },
            mm: {
                factor: new Big(.001)
            },
            px: {
                factor: new Big(.0254).div(resolution)
            },
            pt: {
                factor: new Big(.0254).div(pointsPerInch)
            },
            pc: {
                factor: new Big(.0254).div(picasPerInch)
            },
            ha: {
                factor: new Big(.0254).div(101.6)
            },
            c: {
                factor: new Big(.004511278195484999)
            },
            ag: {
                factor: new Big(.0254).div(14)
            },
            cu: {
                factor: new Big(.48390048)
            }
        };
        return {
            from: function(value) {
                return normalizedValue = startingValue.mul(conversionTable[value].factor), this;
            },
            to: function(value) {
                return stringValue = normalizedValue.div(conversionTable[value].factor).toFixed(10), 
                trim && (stringArray = stringValue.split("."), stringArray[1] && (stringArray[1] = stringArray[1].substring(0, precision)), 
                stringValue = stringArray.join(".")), Number(stringValue);
            }
        };
    }
}), riot.tag2("adobestock", '<div class="background"> <img class="card-stock__bgImage" riot-src="{opts.backgroundImageLocalpath}" alt=""> </div> <div if="{opts.overlayTintColor && opts.overlayTintPercentage}" class="background-overlay" riot-style="background-color: {opts.overlayTintColor.replace(\'0x\', \'#\')}; opacity: {opts.overlayTintPercentage}"></div> <div class="info"> <span class="card-info-label">{opts.cardLabel}</span> </div> <form class="card-content" onsubmit="{this.search}"> <div class="search-input-container"> <i class="inapp-icons inapp-icon--search" aria-hidden="true"></i> <div class="spc-textfield spc-js-textfield spc-textfield--quiet"> <input class="spc-textfield__input stock-search-input" type="text" placeholder="{opts.searchLabel}" aria-label="{opts.searchLabel}"> </div> </div> <button type="submit" class="spc-button spc-button--cta" onclick="{search}">{opts.ctaLabel}</button> </form>', "", 'class="card grid-cell grid-cell--autoSize" role="listitem"', function(opts) {
    var _this = this;
    this.mixin("cooldown"), this.defaultURL = iaw.cepUtil.usingStageAuthentication() ? iaw.stockUtil.STOCK_URL_STAGE : opts.defaultURL || iaw.stockUtil.STOCK_URL, 
    this.actionURL = iaw.cepUtil.usingStageAuthentication() ? iaw.stockUtil.STOCK_URL_SEARCH_STAGE : opts.actionURL, 
    this.actionURL.indexOf("?k=") < 0 && (this.actionURL += "?k="), this.mixin("spcmixin"), 
    this.search = function(e) {
        if (!_this.isCoolingDown(0)) {
            var input = _this.root.getElementsByClassName("stock-search-input")[0], searchQuery = iaw.util.fixedEncodeURIComponent(input.value), baseURL = searchQuery ? _this.actionURL + searchQuery : _this.defaultURL + "?";
            void 0 !== opts.as_query && (baseURL += "&" + opts.as_query), iaw.analytics.ingest.logEngagementCardEvent("clicked", opts), 
            window.__adobe_cep__ ? iaw.util.openDefaultBrowserAuthenicated("adobeStock", baseURL) : window.open(baseURL);
        }
    }, this.on("mount", function() {
        this.root.classList.add("card--" + opts.width + "of4");
        var hostData = iaw.store.get("host");
        "openDoc" !== hostData.displayMode && (this.root.getElementsByClassName("background")[0].style.backgroundColor = opts.backgroundFillColor ? opts.backgroundFillColor.replace("0x", "#") : ""), 
        opts.promoID || (opts.promoID = "KTAVD"), opts.as_campaign || (opts.as_campaign = hostData.hostID + "%2F" + hostData.appVersion, 
        opts.as_campclass = "brand", opts.as_source = "CCXStart-" + hostData.displayMode + "%2F" + hostData.radarVersion, 
        opts.as_channel = "adobe_apps", opts.as_query = iaw.analytics.getAnalyticsQueryString() + "&promoid=" + opts.promoID + "&as_channel=" + opts.as_channel + "&as_source=" + opts.as_source + "&as_campaign=" + opts.as_campaign + "&as_campclass=" + opts.as_campclass), 
        iaw.analytics.ingest.logEngagementCardEvent("rendered", opts);
    });
}), riot.tag2("basic", '<div class="card-loading hidden" role="progressbar"> <p>{iaw.i18n.getLocalizedString(\'card_subscribing\')}</p> <span class="activity-indicator__dots"></span> </div> <div class="card-success hidden"> <span>{this.cardSuccess}</span> </div> <div class="card-error hidden"> <p>{this.cardError}</p> </div> <button class="card-click-container" onclick="{click}"> <div class="background"> <div> <div if="{opts.overlayTintColor && opts.overlayTintPercentage}" class="background-overlay" riot-style="background-color: {opts.overlayTintColor.replace(\'0x\', \'#\')}; opacity: {opts.overlayTintPercentage}"></div> <div class="info"> <span class="card-info-label">{opts.cardLabel}</span> </div> <div class="card-content"> <span class="body {bodyCopyAlignment}">{opts.bodyCopy}</span> <span class="footnote {bodyCopyAlignment}">{opts.footnote}</span> <div style="flex: 1;"></div> <span if="{!opts.hasButton && opts.ctaLabel}" class="cta {ctaAlignment}">{opts.ctaLabel}</span> <span if="{!opts.hasButton && opts.secondaryCTALabel}" class="cta-two">{opts.secondaryCTALabel}</span> <span if="{opts.hasButton}" class="spc-button spc-button--cta {ctaAlignment}">{opts.ctaLabel}</span> </div> </button>', "", 'class="card grid-cell" role="listitem"', function(opts) {
    function getPublicLibraryAsync(libraryLinkID, token, copyLib) {
        var reqURL = iaw.store.get([ "host", "subscribeEndpoint" ]) + libraryLinkID, mode = "GET";
        return copyLib && (reqURL += "?operation=copy", mode = "POST"), iaw.util.promise(mode, reqURL, token, {
            "x-feature-override": "livelink"
        });
    }
    var _this = this;
    this.mixin("cooldown"), this.ctaAlignment = opts.ctaAlignment || "left", this.bodyCopyAlignment = opts.bodyCopyAlignment || "left", 
    this.actionURL = opts.actionURL, this.copyLibrary = this.actionURL.indexOf("shared-assets") < 0, 
    this.linkId = this.actionURL.match(/([^\/]*)\/*$/)[1], this.click = function() {
        if (!_this.isCoolingDown(0)) if (iaw.analytics.ingest.logEngagementCardEvent("clicked", opts), 
        "library" === opts.cardType) {
            iaw.log.console("Subscribe CC Libraries: Clicked"), _this.selectedLibraryId = "";
            var self = _this;
            _this.root.getElementsByClassName("card-loading")[0].classList.remove("hidden"), 
            iaw.libraryManager.isLibraryCollelctionsLoaded() ? self.checkForCopiedLibrary(iaw.libraryManager.libraryCollections) : (self.showError(iaw.i18n.getLocalizedString("library_service_error")), 
            iaw.log.console("Subscribe CC Libraries: load cc library")), iaw.cepUtil.getIMSAccessToken(function(token) {
                getPublicLibraryAsync(self.linkId, token, self.copyLibrary).then(function(data) {
                    if (data) try {
                        data = JSON.parse(data);
                    } catch (err) {
                        iaw.log.exception("Bad response data parse: " + data);
                    }
                    if (self.copyLibrary) self.showSuccess(); else {
                        var bookmarksEndpoint = iaw.store.get([ "host", "bookmarksEndpoint" ]), reqURL = bookmarksEndpoint + data.bookmarkId;
                        iaw.log.console("Subscribe CC Libraries - step 2 - subscribe library to bookmarksEndpoint: " + reqURL), 
                        iaw.util.promise("POST", reqURL, token, {}, [ 409 ]).then(function(status) {
                            return 409 === status ? (iaw.log.console("Subscribe CC Libraries - library is already subscribed."), 
                            iaw.util.showLibraryInPanel(data.bookmarkId), void self.showSuccess(iaw.i18n.getLocalizedString("card_success_resubscribe"))) : (iaw.log.console("Subscribe CC Libraries - library is subscribed successfully."), 
                            self.selectedLibraryId = data.bookmarkId, void self.showSuccess());
                        })["catch"](function(error, status) {
                            self.showError(error), iaw.log.console("Subscribe CC Libraries - error when subscribing library: " + error + "," + status);
                        });
                    }
                })["catch"](function(error) {
                    self.showError(), iaw.log.console("Subscribe CC Libraries - error from live link endpoint: " + error);
                });
            });
        } else if ("install" === opts.cardType) iaw.util.ajax(iaw.store.get([ "host", "ffcEndpoint" ]) + new Date().getTime(), function(resp) {
            window.location.href = opts.actionURL + "&passPhrase=" + resp;
        }, _this); else {
            var baseURL = opts.actionURL;
            ("undefined" == typeof opts.urlAppendAnalyticsParams || opts.urlAppendAnalyticsParams) && (baseURL = iaw.analytics.composeURLWithAnalyticsQueryString(opts.actionURL)), 
            "undefined" == typeof opts.urlApplyAdobeAuthentication || opts.urlApplyAdobeAuthentication ? iaw.util.openDefaultBrowserAuthenicated("adobeLearn", baseURL) : iaw.util.openDefaultBrowser(baseURL);
        }
    }, this.checkForCopiedLibrary = function(libraryCollections) {
        function changedHandler(response) {
            clearTimeout(timeout);
            var loading = self.root.getElementsByClassName("card-loading")[0];
            iaw.util.showLibraryInPanel(self.selectedLibraryId), loading.classList.add("hidden"), 
            libraryCollections.forEach(function(libraryCollection) {
                libraryCollection.removeChangeListener(changedHandler);
            });
        }
        if (libraryCollections) {
            var timeout, self = _this;
            libraryCollections.forEach(function(libraryCollection) {
                libraryCollection.addChangeListener(changedHandler);
            }), timeout = setTimeout(changedHandler, 6e4);
        }
    }, this.showSuccess = function(successString) {
        _this.cardSuccess = successString || iaw.i18n.getLocalizedString("card_success_subscribe"), 
        _this.update();
        var success = _this.root.getElementsByClassName("card-success")[0], loading = _this.root.getElementsByClassName("card-loading")[0];
        loading.classList.add("hidden"), success.classList.remove("hidden"), setTimeout(_this.clearSuccess, 5e3);
    }, this.clearSuccess = function() {
        var success = _this.root.getElementsByClassName("card-success")[0];
        success.classList.add("hidden");
    }, this.showError = function(errorString) {
        _this.cardError = errorString || iaw.i18n.getLocalizedString("card_error"), _this.update();
        var error = _this.root.getElementsByClassName("card-error")[0];
        error.classList.remove("hidden");
        var loading = _this.root.getElementsByClassName("card-loading")[0];
        loading.classList.add("hidden"), setTimeout(_this.clearError, 5e3);
    }, this.clearError = function() {
        var error = _this.root.getElementsByClassName("card-error")[0];
        error.classList.add("hidden");
    }, this.on("mount", function() {
        this.root.classList.add("card--" + opts.width + "of4"), this.root.getElementsByClassName("background")[0].style.backgroundColor = opts.backgroundFillColor ? opts.backgroundFillColor.replace("0x", "#") : "", 
        iaw.analytics.ingest.logEngagementCardEvent("rendered", opts);
    });
}), riot.tag2("poster", '<div class="card-loading hidden" role="progressbar"> <p>{iaw.i18n.getLocalizedString(\'card_subscribing\')}</p> <span class="activity-indicator__dots"></span> </div> <div class="card-success hidden"> <span>{this.cardSuccess}</span> </div> <div class="card-error hidden"> <p>{this.cardError}</p> </div> <button class="card-click-container" onclick="{click}"> <div class="background"> <img class="posterImage" riot-src="{opts.backgroundImageLocalpath}" alt=""> </div> <div if="{opts.overlayTintColor && opts.overlayTintPercentage}" class="background-overlay" riot-style="background-color: {opts.overlayTintColor.replace(\'0x\', \'#\')}; opacity: {opts.overlayTintPercentage}"></div> <div class="info"> <span class="card-info-label">{opts.cardLabel}</span> </div> <div class="card-content"> <span class="body {bodyCopyAlignment}">{opts.displayText}</span> <span class="footnote {bodyCopyAlignment}">{opts.footnote}</span> <div style="flex: 1;"></div> <span if="{!opts.hasButton && opts.ctaLabel}" class="cta {ctaAlignment}">{opts.ctaLabel}</span> <span if="{!opts.hasButton && opts.secondaryCTALabel}" class="cta-two">{opts.secondaryCTALabel}</span> <span if="{opts.hasButton}" class="spc-button spc-button--cta {ctaAlignment}">{opts.ctaLabel}</span> </div> </button>', "", 'class="card grid-cell" role="listitem"', function(opts) {
    function getPublicLibraryAsync(libraryLinkID, token, copyLib) {
        var reqURL = iaw.store.get([ "host", "subscribeEndpoint" ]) + libraryLinkID, mode = "GET";
        return copyLib && (reqURL += "?operation=copy", mode = "POST"), iaw.log.console("Subscribe CC Libraries - step 1 - get bookmark id from live link endpoint: " + reqURL), 
        iaw.util.promise(mode, reqURL, token, {
            "x-feature-override": "livelink"
        });
    }
    var _this = this;
    this.mixin("cooldown"), this.ctaAlignment = opts.ctaAlignment || "left", this.bodyCopyAlignment = opts.bodyCopyAlignment || "left", 
    this.actionURL = opts.actionURL, this.copyLibrary = this.actionURL.indexOf("shared-assets") < 0, 
    this.linkId = this.actionURL.match(/([^\/]*)\/*$/)[1], this.click = function() {
        if (!_this.isCoolingDown(0)) if (iaw.analytics.ingest.logEngagementCardEvent("clicked", opts), 
        "library" === opts.cardType) {
            iaw.log.console("Subscribe CC Libraries: Clicked"), _this.selectedLibraryId = "";
            var self = _this;
            _this.root.getElementsByClassName("card-loading")[0].classList.remove("hidden"), 
            iaw.libraryManager.isLibraryCollelctionsLoaded() ? self.checkForCopiedLibrary(iaw.libraryManager.libraryCollections) : (self.showError(iaw.i18n.getLocalizedString("library_service_error")), 
            iaw.log.console("Subscribe CC Libraries: load cc library")), iaw.cepUtil.getIMSAccessToken(function(token) {
                getPublicLibraryAsync(self.linkId, token, self.copyLibrary).then(function(data) {
                    if (data) try {
                        data = JSON.parse(data);
                    } catch (err) {
                        iaw.log.exception("Bad response data parse: " + data);
                    }
                    if (self.copyLibrary) self.showSuccess(); else {
                        var bookmarksEndpoint = iaw.store.get([ "host", "bookmarksEndpoint" ]), reqURL = bookmarksEndpoint + data.bookmarkId;
                        iaw.log.console("Subscribe CC Libraries - step 2 - subscribe library to bookmarksEndpoint: " + reqURL), 
                        iaw.util.promise("POST", reqURL, token, {}, [ 409 ]).then(function(status) {
                            return 409 === status ? (iaw.log.console("Subscribe CC Libraries - library is already subscribed."), 
                            iaw.util.showLibraryInPanel(data.bookmarkId), void self.showSuccess(iaw.i18n.getLocalizedString("card_success_resubscribe"))) : (iaw.log.console("Subscribe CC Libraries - library is subscribed successfully."), 
                            self.selectedLibraryId = data.bookmarkId, void self.showSuccess());
                        })["catch"](function(error, status) {
                            self.showError(error), iaw.log.console("Subscribe CC Libraries - error when subscribing library: " + error + "," + status);
                        });
                    }
                })["catch"](function(error) {
                    self.showError(), iaw.log.console("Subscribe CC Libraries - error from live link endpoint: " + error);
                });
            });
        } else if ("install" === opts.cardType) iaw.util.ajax(iaw.store.get([ "host", "ffcEndpoint" ]) + new Date().getTime(), function(resp) {
            window.location.href = opts.actionURL + "&passPhrase=" + resp;
        }, _this); else {
            var baseURL = opts.actionURL;
            ("undefined" == typeof opts.urlAppendAnalyticsParams || opts.urlAppendAnalyticsParams) && (baseURL = iaw.analytics.composeURLWithAnalyticsQueryString(opts.actionURL)), 
            "undefined" == typeof opts.urlApplyAdobeAuthentication || opts.urlApplyAdobeAuthentication ? iaw.util.openDefaultBrowserAuthenicated("adobeLearn", baseURL) : iaw.util.openDefaultBrowser(baseURL);
        }
    }, this.checkForCopiedLibrary = function(libraryCollections) {
        function changedHandler(response) {
            clearTimeout(timeout);
            var loading = self.root.getElementsByClassName("card-loading")[0];
            iaw.util.showLibraryInPanel(self.selectedLibraryId), loading.classList.add("hidden"), 
            libraryCollections.forEach(function(libraryCollection) {
                libraryCollection.removeChangeListener(changedHandler);
            });
        }
        if (libraryCollections) {
            var timeout, self = _this;
            libraryCollections.forEach(function(libraryCollection) {
                libraryCollection.addChangeListener(changedHandler);
            }), timeout = setTimeout(changedHandler, 6e4);
        }
    }, this.showSuccess = function(successString) {
        _this.cardSuccess = successString || iaw.i18n.getLocalizedString("card_success_subscribe"), 
        _this.update();
        var success = _this.root.getElementsByClassName("card-success")[0], loading = _this.root.getElementsByClassName("card-loading")[0];
        loading.classList.add("hidden"), success.classList.remove("hidden"), setTimeout(_this.clearSuccess, 5e3);
    }, this.clearSuccess = function() {
        var success = _this.root.getElementsByClassName("card-success")[0];
        success.classList.add("hidden");
    }, this.showError = function(errorString) {
        _this.cardError = errorString || iaw.i18n.getLocalizedString("card_error"), _this.update();
        var error = _this.root.getElementsByClassName("card-error")[0];
        error.classList.remove("hidden");
        var loading = _this.root.getElementsByClassName("card-loading")[0];
        loading.classList.add("hidden"), setTimeout(_this.clearError, 5e3);
    }, this.clearError = function() {
        var error = _this.root.getElementsByClassName("card-error")[0];
        error.classList.add("hidden");
    }, this.on("mount", function() {
        this.root.classList.add("card--" + opts.width + "of4"), this.root.getElementsByClassName("background")[0].style.backgroundColor = opts.backgroundFillColor ? opts.backgroundFillColor.replace("0x", "#") : "", 
        iaw.analytics.ingest.logEngagementCardEvent("rendered", opts);
    });
}), riot.tag2("trialclock", '<button class="card-trial-content" onclick="{clicked}"> <h3 class="iaw-Heading iaw-Heading--3">{days}</h3> <h4 class="iaw-Heading iaw-Heading--4">{opts.cardLabel}</h4> </button>', "", 'class="card grid-cell grid-cell--autoSize" role="listitem"', function(opts) {
    var _this = this;
    this.mixin("cooldown");
    var updateInterval = -1;
    this.days = -1, this.clicked = function(evt) {
        if (!_this.isCoolingDown(0)) {
            iaw.analytics.ingest.logEngagementCardEvent("clicked", opts);
            var querySep = opts.actionURL.indexOf("?") < 0 ? "?" : "&", appendedAnalytics = "";
            ("undefined" == typeof opts.urlAppendAnalyticsParams || opts.urlAppendAnalyticsParams) && (appendedAnalytics = querySep + iaw.analytics.getAnalyticsQueryString()), 
            iaw.util.openDefaultBrowserAuthenicated("adobeAccount", opts.actionURL + appendedAnalytics);
        }
    }, this.updateTrialTime = function() {
        if (iaw.store) {
            var secondsRemaining = iaw.store.get([ "host", "secondsLeftInTrial" ]);
            _this.days = Math.max(0, Math.round(moment.duration(secondsRemaining, "seconds").asDays())), 
            _this.update();
        }
    }, this.on("mount", function(evt) {
        clearInterval(updateInterval), updateInterval = setInterval(this.update, 6e4), this.updateTrialTime(), 
        this.root.style.backgroundColor = opts.backgroundFillColor.replace("0x", "#"), opts.genericFlag = !1, 
        iaw.analytics.ingest.logEngagementCardEvent("rendered", opts);
    }), this.on("update", function(evt) {
        this.updateTrialTime();
    }), this.on("unmount", function(evt) {
        clearInterval(updateInterval), this.off("*");
    });
}), riot.tag2("trialsimple", '<div class="card-trial-content"> <h3 class="iaw-Heading iaw-Heading--3">{days}</h3> <h4 class="iaw-Heading iaw-Heading--4">{iaw.i18n.getLocalizedString(\'trial_counter\')}</h4> </div>', "", 'class="card grid-cell grid-cell--autoSize" role="alert"', function(opts) {
    var _this = this, updateInterval = -1;
    this.updateTrialTime = function() {
        if (iaw.store) {
            var secondsRemaining = iaw.store.get([ "host", "secondsLeftInTrial" ]), daysRemaining = Math.max(0, Math.round(moment.duration(secondsRemaining, "seconds").asDays()));
            _this.days = daysRemaining, _this.root.classList.remove("days-5", "days-10", "days-30"), 
            daysRemaining < 4 ? _this.root.classList.add("days-5") : daysRemaining < 6 ? _this.root.classList.add("days-10") : _this.root.classList.add("days-30");
        }
    }, this.on("mount", function(evt) {
        updateInterval = setInterval(this.update, 6e4), this.updateTrialTime(), opts.genericFlag = !0, 
        iaw.analytics.ingest.logEngagementCardEvent("rendered", opts);
    }), this.on("update", function(evt) {
        this.updateTrialTime();
    }), this.on("unmount", function(evt) {
        clearInterval(updateInterval);
    });
}), riot.tag2("card-raw", "", "", "", function(opts) {
    var _this = this;
    riot.mount(this.root, opts.content.tag, opts.content.data), this.invertRegular = function(invert) {
        invert && (_this.root.classList.remove("spc--light", "spc--dark"), document.body.classList.contains("spc--dark") ? _this.root.classList.add("spc--light") : _this.root.classList.add("spc--dark"));
    }, this.invertText = function(invert) {
        invert ? _this.root.classList.add("card--dark-text") : _this.root.classList.add("card--light-text");
    }, this.on("mount", function(evt) {
        this.updateCardTheme(), riotctrl.on("update-theme", this.updateCardTheme, this);
    }), this.on("unmount", function() {
        riotctrl.off("update-theme", this.updateCardTheme, this), this.off("*");
    }), this.updateCardTheme = function() {
        var o = opts.content.data;
        return _this.root.classList.remove("card--light-text", "card--dark-text", "spc--light", "spc--dark"), 
        "basic" === o.displayTemplate.toLowerCase() ? void (o.backgroundFillColor ? _this.invertText(o.invertPresentation) : _this.invertRegular(o.invertPresentation)) : void (o.backgroundImage || o.backgroundFillColor ? _this.invertText(o.invertPresentation) : _this.invertRegular(o.invertPresentation));
    };
}), riot.tag2("card-stream", '<div class="stream-container grid" role="list" onkeydown="{keyDown}"> <card-raw content="{card}" each="{card in cards}"> </div>', "", "", function(opts) {
    var _this = this;
    this.items = [], this.cards = [], this.skipped = [], this.cardOrder = null, this.numRows = parseInt(opts.rows) || -1, 
    this.container = null, this.currentTime = new Date().getTime();
    var waitingForMount = !1;
    this.setItems = function(arr) {
        if (arr) {
            var displayMode = iaw.store.get([ "host", "displayMode" ]) || "welcome", cardControl = iaw.psdk.data.cardControl;
            _this.cardOrder = [];
            for (var i = 0; i < cardControl.length; i++) if (cardControl[i].modeID === displayMode) {
                _this.cardOrder = cardControl[i].cardOrder;
                break;
            }
            for (var finalCardArray = [], j = 0; j < _this.cardOrder.length; j++) finalCardArray.push(arr[_this.cardOrder[j]]);
            _this.items = finalCardArray;
            var containerWidth = _this.container.offsetWidth;
            containerWidth > 0 && _this.recalc();
        }
    }, this.getCardType = function(display) {
        var tagObject;
        switch (display) {
          case "trialClock":
            tagObject = {
                type: "trialClock"
            };
            break;

          case "basic":
            tagObject = {
                type: "basic"
            };
            break;

          case "basicWButton":
            tagObject = {
                type: "basic",
                hasButton: !0
            };
            break;

          case "poster":
            tagObject = {
                type: "poster"
            };
            break;

          case "posterWButton":
            tagObject = {
                type: "poster",
                hasButton: !0
            };
            break;

          case "adobeStock":
            tagObject = {
                type: "adobeStock"
            };
            break;

          case "adobeStockAlt":
            tagObject = {
                type: "adobeStock",
                isAlt: !0
            };
        }
        return tagObject;
    }, this.keyDown = function(evt) {
        var targ = evt.target, which = evt.which || evt.keyCode, card = targ.closest("card-raw");
        if (card) {
            var adjacentCard, focusable, cards = Array.prototype.slice.call(card.parentNode.children), index = cards.indexOf(card), isNonEmptyTextInput = "INPUT" === targ.tagName && "" !== targ.value;
            switch (which) {
              case iaw.a11y.Keys.END:
                isNonEmptyTextInput || (adjacentCard = cards[card.length - 1]);
                break;

              case iaw.a11y.Keys.HOME:
                isNonEmptyTextInput || (adjacentCard = cards[0]);
                break;

              case iaw.a11y.Keys.LEFT:
                isNonEmptyTextInput || index > 0 && (adjacentCard = cards[index - 1]);
                break;

              case iaw.a11y.Keys.UP:
                adjacentCard = iaw.a11y.getAdjacentElementVertically(cards, card, !0);
                break;

              case iaw.a11y.Keys.RIGHT:
                isNonEmptyTextInput || index < cards.length - 1 && (adjacentCard = cards[index + 1]);
                break;

              case iaw.a11y.Keys.DOWN:
                adjacentCard = iaw.a11y.getAdjacentElementVertically(cards, card, !1);
                break;

              case iaw.a11y.Keys.TAB:
                adjacentCard = iaw.a11y.getAdjacentElementVertically(cards, card, !1);
            }
            return adjacentCard && (focusable = iaw.a11y.focusable(adjacentCard)[0], focusable && focusable.focus()), 
            !0;
        }
    }, this.on("mount", function(evt) {
        riotctrl.on("resize-breakpoint-retro", this.recalc, this), riotctrl.on("update-cards-retro", this.updateCards, this), 
        this.container = this.root.querySelector(".stream-container"), waitingForMount && (waitingForMount = !1, 
        this.setItems(iaw.psdk.data.cards));
    }), this.on("unmount", function() {
        riotctrl.off("resize-breakpoint-retro", this.recalc, this), riotctrl.off("update-cards-retro", this.updateCards, this), 
        this.off("*");
    }), this.updateCards = function() {
        return _this.container ? void _this.setItems(iaw.psdk.data.cards) : void (waitingForMount = !0);
    }, this.recalc = function() {
        if (_this.container) {
            var margin = 15, cardContainerWidth = 175 + margin, containerRect = _this.container.getBoundingClientRect(), containerWidth = containerRect.right - containerRect.left + margin;
            if (!(containerWidth < cardContainerWidth)) {
                var maxCardWidth = Math.floor(containerWidth / cardContainerWidth);
                maxCardWidth >= 6 ? maxCardWidth = 6 : maxCardWidth >= 4 ? maxCardWidth = 4 : maxCardWidth >= 2 && (maxCardWidth = 2);
                var i, card, cardWidth, tag, cardType, columns = 0, rows = 0, cardWidthTotal = 0;
                for (_this.cards.length = 0, _this.currentTime = new Date().getTime(), i = 0; i < _this.items.length; i++) if (card = _this.items[i], 
                card && (cardWidth = parseInt(card.width), !(cardWidth > maxCardWidth))) {
                    if (card.startDTS) {
                        var startTime = new Date(card.startDTS).getTime();
                        if (startTime >= _this.currentTime) continue;
                    }
                    if (card.endDTS) {
                        var endTime = new Date(card.endDTS).getTime();
                        if (endTime < _this.currentTime) continue;
                    }
                    var hostData = iaw.store.get("host");
                    if ("trialClock" !== card.cardType || "paid" !== hostData.accountStatus && ("openDoc" !== hostData.displayMode || "PPRO" === hostData.hostID || "AEFT" === hostData.hostID)) {
                        if (_this.numRows != -1 ? columns + cardWidth > maxCardWidth && (rows++, columns = 0) : columns + cardWidth > maxCardWidth - 1 && (rows++, 
                        columns = 0), cardWidthTotal += cardWidth, _this.numRows !== -1 && rows >= _this.numRows) {
                            ++i < _this.items.length && (cardWidthTotal += parseInt(_this.items[i].width));
                            break;
                        }
                        if (_this.numRows !== -1 && rows >= _this.numRows) break;
                        columns += cardWidth, cardType = _this.getCardType(card.displayTemplate), tag = card.displayTemplate ? cardType.type.toLowerCase() : card.cardType.toLowerCase(), 
                        cardType && cardType.hasButton && (card.hasButton = !0), _this.cards.push({
                            tag: tag,
                            data: card
                        });
                    }
                }
                _this.parent && _this.numRows !== -1 ? (_this.parent.haveMoreCards = cardWidthTotal > maxCardWidth, 
                _this.parent.update()) : _this.update();
            }
        }
    };
}), riot.tag2("container-main", '<page-primary show="{bitFlag & 3}"></page-primary> <page-more show="{bitFlag & 4}"></page-more> <tooltip></tooltip>', "", "", function(opts) {
    var _this = this;
    this.pages = {
        INIT: "initial",
        PRIM: "primary",
        MORE: "more",
        IFRM: "inline"
    }, this.currentPage = "", this.bitFlag = 0;
    var loading = !0, pageOrder = [ this.pages.PRIM, this.pages.MORE, this.pages.IFRM ], breakpoints = [ 365, 760, 1140 ], breakpointMargins = [ 0, 20, 140 ], prevWidth = 0, prevBP = 1, currentBP = -1, forceResize = !1, checkRunning = !1;
    this.getPageBit = function(pageStr) {
        switch (pageStr) {
          case _this.pages.INIT:
            return 1;

          case _this.pages.PRIM:
            return 2;

          case _this.pages.MORE:
            return 4;

          case _this.pages.IFRM:
            return 8;

          default:
            return 0;
        }
    }, this.currentBreakpoint = function() {
        var i, w;
        for (i = 0; i < breakpoints.length; i++) w = window.innerWidth - breakpointMargins[i], 
        w > breakpoints[i] && (currentBP = i);
        currentBP < 0 && (currentBP = 0);
    }, this.checkBreakpoints = function() {
        var w = window.innerWidth;
        (forceResize || w !== prevWidth) && (prevWidth = w, _this.currentBreakpoint(), (forceResize || currentBP !== prevBP) && (forceResize = !1, 
        iaw.util.currentBreakPoint = currentBP, _this.resizeElements(".page-container--center-column", breakpoints[currentBP]), 
        riotctrl.trigger("resize-breakpoint-retro", prevBP, currentBP), 0 === currentBP ? (document.body.classList.add("open-mode"), 
        riotctrl.trigger("change-active-tab", "recentfile")) : document.body.classList.remove("open-mode"), 
        prevBP = currentBP));
    }, this.resizeElements = function(selector, newWidth) {
        for (var els = document.querySelectorAll(selector), nw = newWidth + "px", i = 0; i < els.length; i++) els[i].style.width = nw;
    }, this.on("mount unmount", function(evt) {
        switch (evt) {
          case "mount":
            checkRunning || (checkRunning = !0, forceResize = !0, iaw.motor.add(this.checkBreakpoints, this)), 
            riotctrl.on("update-cards-retro", this.updateCards, this), riotctrl.on("update-host-retro", this.updateHost, this), 
            document.activeElement && document.activeElement.blur();
            break;

          case "unmount":
            iaw.motor.remove(this.checkBreakpoints), riotctrl.off("update-cards-retro", this.updateCards, this), 
            riotctrl.off("update-host-retro", this.updateHost, this), this.off("*");
        }
    }), this.updateCards = function() {
        _this.resizeElements(".page-container--center-column", breakpoints[currentBP]), 
        riotctrl.trigger("resize-breakpoint-retro", prevBP, currentBP);
    }, this.updateHost = function() {
        var page = iaw.store.get([ "host", "startView" ]) || "primary", hash = window.location.hash.substring(1);
        if (hash) _this.currentPage = hash; else {
            switch (page) {
              case "video":
              case "carousel":
              case _this.pages.INIT:
                _this.currentPage = _this.pages.INIT;
                break;

              default:
                0 === currentBP && (page = _this.pages.PRIM), _this.currentPage = page;
            }
            loading = !0;
        }
        _this.currentPage = 0 === currentBP && _this.currentPage === _this.pages.INIT ? _this.pages.PRIM : _this.currentPage, 
        routie(_this.currentPage);
    }, routie("*", function(page) {
        if (this.bitFlag = this.getPageBit(this.currentPage) | this.getPageBit(page), this.update(), 
        loading) return loading = !1, void (forceResize = !0);
        var self = this, tag = "page-" + page, curr = this.currentPage ? this.tags["page-" + this.currentPage] : null, next = this.tags[tag], forward = pageOrder.indexOf(page) > pageOrder.indexOf(this.currentPage), introFrom = forward ? "right" : "left", outroTo = forward ? "left" : "right", intro = "slide-center-from-" + introFrom, outro = "slide-" + outroTo + "-from-center";
        switch (page) {
          case this.pages.INIT:
            break;

          case this.pages.PRIM:
            if (this.currentPage === this.pages.INIT) {
                outro = "anim--fade-out", next = null;
                break;
            }

          case this.pages.MORE:
          case this.pages.IFRM:        }
        riotctrl.trigger("lock-screen"), curr && (curr.root.addEventListener("webkitAnimationEnd", function onEndAgain(evt) {
            evt.target.removeEventListener("webkitAnimationEnd", onEndAgain), curr.trigger("outro-end"), 
            riotctrl.trigger("unlock-screen");
        }), curr.trigger("outro-start"), curr.root.classList.add(outro)), next && (next.root.addEventListener("webkitAnimationEnd", function onEnd(evt) {
            evt.target.removeEventListener("webkitAnimationEnd", onEnd), next.trigger("intro-end"), 
            forceResize = !0, self.bitFlag = self.getPageBit(self.currentPage), self.update(), 
            riotctrl.trigger("unlock-screen");
        }), next.trigger("intro-start"), next.root.classList.add(intro)), curr || next || riotctrl.trigger("unlock-screen"), 
        this.currentPage = page, forceResize = !0;
    }.bind(this));
}), riot.tag2("create-button", '<button name="button" class="spc-button" onclick="{clicked}"> <span class="create-button--label">{label}</span> <span class="create-button--shortcut">{shortcut}</span> </button>', "", "", function(opts) {
    var _this = this;
    this.i18n = opts.i18n, this.label = opts.i18n, this.shortcut = "", this.tip = "", 
    this.clicked = function(evt) {
        if ("createButtonNewdocs" === opts.action) {
            var hostID = iaw.store.get([ "host", "hostID" ]);
            if ("PHXS" === hostID || "ILST" === hostID) {
                var fnftEnabled = iaw.store.get([ "host", "fnftEnabled" ]), mode = fnftEnabled ? "fnft" : "legacy";
                iaw.analytics.ingest.logItemOpenedEvent({
                    openType: "new",
                    fileType: "",
                    sectionView: "createNew",
                    ucAction: mode
                });
            } else iaw.analytics.ingest.logItemOpenedEvent({
                openType: "new",
                fileType: "",
                sectionView: "createNew",
                ucAction: "legacy"
            });
        }
        _this.button.blur(), riotctrl.trigger(opts.action);
    }, this.updateShortCutKey = function(buttonInfo) {
        var shortcutPrefix = iaw.util.isWindowsOS() ? "Ctrl+" : "⌘";
        _this.shortcut = buttonInfo && buttonInfo.shortcut ? buttonInfo.shortcut : shortcutPrefix + iaw.i18n.getLocalizedString(_this.i18n + "_shortcutkey"), 
        shortcutPrefix === _this.shortcut && (_this.shortcut = "");
    }, this.on("mount", function() {
        riotctrl.on("update-shortcut-key", this.updateShortcut, this);
    }), this.on("unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), riotctrl.off("update-shortcut-key", this.updateShortcut, this), 
        this.off("*");
    }), this.onLoc = function() {
        var buttonInfo = iaw.store.get([ "host", "buttonInfo", _this.i18n ]) || null;
        _this.label = buttonInfo && buttonInfo.label ? buttonInfo.label : iaw.i18n.getLocalizedString(_this.i18n), 
        _this.tip = buttonInfo && buttonInfo.tip ? buttonInfo.tip : "", _this.updateShortCutKey(buttonInfo), 
        _this.isMounted && _this.update();
    }, this.updateShortcut = function() {
        var buttonInfo = iaw.store.get([ "host", "buttonInfo", _this.i18n ]) || null;
        _this.updateShortCutKey(buttonInfo), _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("file-grid", '<div role="row" class="hidden-accessible"> <div role="columnheader" class="iaw-Grid-heading-name hidden-accessible">{nameLabel}</div> <div role="columnheader" class="iaw-Grid-heading-date hidden-accessible">{openedLabel}</div> </div> <grid-item each="{items}" data="{this}"></grid-item>', "", 'class="grid" role="grid" onkeydown="{keyDown}" onkeypress="{keyDown}"', function(opts) {
    var _this = this;
    this.activeTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || null, 
    this.items = [], this.leaf = null, this.nameLabel = "", this.openedLabel = "", this.setItems = function(arr) {
        _this.items = [];
        var i, c;
        for (i = 0; c = arr[i]; i++) c.index = i, _this.items.push(c);
        _this.update();
    }, this.updateList = function(tabName) {
        var tab = iaw.store.get([ "host", "tabs", tabName ]) || null;
        if (tab) {
            _this.activeTab = tabName;
            var arr = tab.list || [];
            _this.setItems(arr);
        }
    }, this.focus = function(evt) {
        var item, i, currentItem = evt.target, items = Array.prototype.slice.call(currentItem.parentNode.children), l = items.length;
        for (i = 0; i < l; i++) item = items[i], item.classList.contains("disabled") || item.classList.contains("hidden-accessible") ? item.removeAttribute("tabindex") : item.tabIndex = item === currentItem ? 0 : -1;
        return !0;
    }, this.keyDown = function(evt) {
        var adjacentItem, focusable, item = evt.target, which = evt.which || evt.keyCode, items = Array.prototype.slice.call(item.parentNode.children), index = -1;
        switch (items = items.filter(function(el) {
            return !el.classList.contains("disabled") && !el.classList.contains("hidden-accessible");
        }), index = items.indexOf(item), which) {
          case iaw.a11y.Keys.ENTER:
          case iaw.a11y.Keys.SPACE:
            item.click(), evt.preventDefault();
            break;

          case iaw.a11y.Keys.END:
            adjacentItem = items[items.length - 1];
            break;

          case iaw.a11y.Keys.HOME:
            adjacentItem = items[0];
            break;

          case iaw.a11y.Keys.LEFT:
            index > 0 && (adjacentItem = items[index - 1]);
            break;

          case iaw.a11y.Keys.UP:
            adjacentItem = iaw.a11y.getAdjacentElementVertically(items, item, !0);
            break;

          case iaw.a11y.Keys.RIGHT:
            index < items.length - 1 && (adjacentItem = items[index + 1]);
            break;

          case iaw.a11y.Keys.DOWN:
            adjacentItem = iaw.a11y.getAdjacentElementVertically(items, item, !1);
            break;

          default:
            "keypress" === evt.type && (adjacentItem = iaw.a11y.alphanumericSearch(evt, items, item));
        }
        return adjacentItem && (focusable = iaw.a11y.focusable(adjacentItem, !1, !0)[0], 
        focusable && focusable.focus()), !0;
    }, this.on("updated", function(evt) {
        iaw.motor.kick();
    }), this.on("mount", function() {
        0 !== iaw.util.currentBreakPoint && "openDoc" !== iaw.store.get([ "host", "displayMode" ]) || this.updateList(iaw.store.get([ "host", "defaultTab" ])), 
        riotctrl.on("tab-change", this.updateList, this), riotctrl.on("update-mru-list", this.updateRecents, this), 
        riotctrl.on("update-cards-retro", this.updateCards, this), this.focus = this.focus.bind(this), 
        this.root.addEventListener("focus", this.focus, !0);
    }), this.on("unmount", function() {
        riotctrl.off("tab-change", this.updateList, this), riotctrl.off("update-mru-list", this.updateRecents, this), 
        riotctrl.off("update-cards-retro", this.updateCards, this), riotctrl.off("update-i18n-retro", this.updateI18n), 
        this.off("*"), this.root.removeEventListener("focus", this.focus);
    }), this.updateRecents = function() {
        "recentfile" === _this.activeTab && _this.updateList(_this.activeTab);
    }, this.updateCards = function() {
        _this.activeTab || (_this.activeTab = iaw.store.get([ "host", "defaultTab" ])), 
        _this.updateList(_this.activeTab);
    }, this.updateI18n = function() {
        _this.nameLabel = iaw.i18n.getLocalizedString("listview_name_header"), _this.openedLabel = iaw.i18n.getLocalizedString("listview_last_header"), 
        _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.updateI18n, this);
}), riot.tag2("grid-item", '<div role="gridcell"> <div class="grid-item__overlay"></div> <div class="grid-item__thumbnail" riot-style="background-image: url({thumbnail()})"></div> <div class="grid-item__name">{opts.data.name}</div> </div> <div role="gridcell" class="grid-item__date">{opts.data.lastOpened ? format(opts.data.lastOpened) : opts.data.description}</div>', "", 'class="grid-cell grid-cell--autoSize" data-tip="{opts.data.tip}" role="row" tabindex="0" onclick="{clicked}"', function(opts) {
    var _this = this, estr = "";
    this.action = opts.data.action || "recentfile", this.index = -1, this.clicked = function(evt) {
        riotctrl.trigger(_this.action, _this.index, "grid");
    }, this.format = function(time) {
        if (!time || time === estr) return estr;
        var t = new Date(time), m = moment(t), timeFormat = "ja_JP" !== iaw.store.get([ "host", "language" ]) ? "MMM Do, h:mm a" : "MMMDD日、ah:mm", diff = moment().diff(m), format = diff < 1728e5 ? m.fromNow() : m.format(timeFormat);
        return m.isValid() ? format : estr;
    }, this.thumbnail = function() {
        return opts.data.thumb || "./images/thumbs/" + opts.data.icon + ".png";
    };
}), riot.tag2("file-table", '<div if="{this.columns}" class="tr file-table__header {tableClass}" aria-hidden="true"> <div class="td file-table__column-{this.width} {file-table__column--resizable: this.resizable}" each="{this.columns}">{this.localizedLabel}</div> </div> <table if="{this.columns}" class="{tableClass}" role="grid" onkeydown="{keyDown}" onkeypress="{keyDown}"> <tbody> <tr each="{item in items}" data-tip="{item.tip}" onclick="{parent.clicked.bind(item)}" class="{disabled: disabled}"> <td class="truncate-text file-table__column-{col.width} {file-table__column--resizable: col.resizable}" each="{col in this.parent.columns}" role="row" tabindex="{!disabled ? \'0\' : disabled}">{this.parent.parseText(item, col)}</td> </tr> </tbody> </table> <div if="{!this.columns}" class="tr file-table__header {tableClass}" role="row"> <div class="td item-name role=" columnheader>{nameLabel}</div> <div class="td item-opened role=" columnheader>{openedLabel}</div> <div class="td item-desc role=" columnheader>{descLabel}</div> <div class="td item-size role=" columnheader>{sizeLabel}</div> <div class="td item-kind role=" columnheader>{kindLabel}</div> </div> <table if="{!this.columns}" class="{tableClass}" role="grid" onkeydown="{keyDown}" onkeypress="{keyDown}"> <tbody> <tr each="{items}" data-tip="{tip}" onclick="{parent.clicked.bind(this)}" class="{disabled: disabled}" role="row" tabindex="{!disabled ? \'0\' : disabled}"> <td class="item-name truncate-text" role="gridcell"> <span>{name}</span> </td> <td class="item-opened truncate-text" role="gridcell">{parent.parseFunctions.date(lastOpened)}</td> <td if="{description && description !== \'\'}" class="item-desc truncate-text" role="gridcell">{description}</td> <td class="item-size truncate-text" role="gridcell">{size}</td> <td class="item-kind truncate-text" role="gridcell">{kind}</td> </tr> </tbody> </table>', "", "", function(opts) {
    var _this = this;
    this.items = [], this.tableClass = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || null, 
    this.breakpoint = 0, this.nameLabel = "", this.openedLabel = "", this.descLabel = "", 
    this.sizeLabel = "", this.kindLabel = "", this.columns = this.opts.columns, this.parseFunctions = {
        date: function() {
            var t, m, format, diff, estr = "", timeFormat = "ja_JP" !== iaw.store.get([ "host", "language" ]) ? "MMM Do, h:mm a" : "MMMDD日、ah:mm";
            return function(time) {
                return time && time !== estr ? (t = new Date(time), m = moment(t), diff = moment().diff(m), 
                format = diff < 1728e5 ? m.fromNow() : m.format(timeFormat), m.isValid() ? format : estr) : estr;
            };
        }(),
        string: function(d) {
            return d;
        }
    }, this.parseText = function(item, col) {
        return "function" == typeof col.type ? col.type(item[col.id]) : this.parseFunctions[col.type] ? this.parseFunctions[col.type](item[col.id]) : this.parseFunctions.string(item[col.id]);
    }, this.validateColumns = function() {
        if (this.columns) {
            var i, item, isResized = !1;
            for (i = 0; item = this.columns[i]; i++) isResized ? item.resizable = !1 : item.resizable && (isResized = !0);
            isResized || (this.columns[0].resizable = !0);
        }
    }, this.validateColumns(), this.clicked = function(evt) {
        var axn = this.action || "recentfile";
        "recentlib" === axn ? riotctrl.trigger(axn, this.id) : riotctrl.trigger(axn, this.index, "list");
    }, this.setItems = function(arr) {
        _this.items = [];
        var i, c;
        for (i = 0; c = arr[i]; i++) c.index = i, _this.items.push(c);
        _this.update();
    }, this.updateList = function(tabName) {
        var tab = iaw.store.get([ "host", "tabs", tabName ]) || null;
        if (tab) {
            _this.tableClass = tabName;
            var arr = tab.list || [];
            _this.setItems(arr);
        }
    }, this.recalc = function(prevPoint, newPoint) {
        _this.breakpoint = newPoint, _this.update();
    }, this.focus = function(evt) {
        var row, i, currentRow = evt.target.closest("tr"), rowRect = currentRow.getBoundingClientRect(), headerRow = _this.root.firstElementChild, headerRect = headerRow.getBoundingClientRect(), scrollContainer = _this.root.parentNode.parentNode.parentNode, rows = Array.prototype.slice.call(currentRow.parentNode.children), l = rows.length;
        for (i = 0; i < l; i++) row = rows[i], row.tabIndex = row === currentRow ? 0 : -1;
        return rowRect.top < headerRect.bottom && (scrollContainer.scrollTop += rowRect.top - headerRect.bottom, 
        scrollContainer.scrollTop < rowRect.height && (scrollContainer.scrollTop = 0)), 
        !0;
    }, this.keyDown = function(evt) {
        var adjacentRow, targ = evt.target, which = evt.which || evt.keyCode, row = targ.closest("tr"), rows = Array.prototype.slice.call(row.parentNode.children), index = -1;
        switch (rows = rows.filter(function(el) {
            return !el.classList.contains("disabled");
        }), index = rows.indexOf(row), which) {
          case iaw.a11y.Keys.ENTER:
          case iaw.a11y.Keys.SPACE:
            row.click(), evt.preventDefault();
            break;

          case iaw.a11y.Keys.END:
            adjacentRow = rows[rows.length - 1];
            break;

          case iaw.a11y.Keys.HOME:
            adjacentRow = rows[0];
            break;

          case iaw.a11y.Keys.LEFT:
          case iaw.a11y.Keys.UP:
            index > 0 && (adjacentRow = rows[index - 1]);
            break;

          case iaw.a11y.Keys.RIGHT:
          case iaw.a11y.Keys.DOWN:
            index < rows.length - 1 && (adjacentRow = rows[index + 1]);
            break;

          default:
            "keypress" === evt.type && (adjacentRow = iaw.a11y.alphanumericSearch(evt, rows, row));
        }
        return adjacentRow && (adjacentRow.focus(), evt.preventDefault()), !0;
    }, this.on("updated", function(evt) {
        iaw.motor.kick(), this.root.querySelector("td.item-desc");
    }), this.on("mount", function(evt) {
        setTimeout(function() {
            var displayMode = iaw.store.get([ "host", "displayMode" ]), defaultTab = iaw.store.get([ "host", "defaultTab" ]), tab = iaw.localstorage.getUserItem(displayMode + "_lastTab") || defaultTab;
            0 !== iaw.util.currentBreakPoint && "openDoc" !== displayMode || (tab = "recentfile"), 
            this.updateList(tab);
        }.bind(this), 20), riotctrl.on("resize-breakpoint-retro", this.recalc, this), riotctrl.on("tab-change", this.updateList, this), 
        riotctrl.on("file-view-change", this.updateList, this), riotctrl.on("update-mru-list", this.updateRecents, this), 
        riotctrl.on("update-cards-retro", this.updateCards, this), this.focus = this.focus.bind(this), 
        this.root.addEventListener("focus", this.focus, !0);
    }), this.on("before-unmount", function(evt) {
        riotctrl.off("resize-breakpoint-retro", this.recalc, this), riotctrl.off("update-i18n-retro", this.onLoc, this), 
        riotctrl.off("tab-change", this.updateList, this), riotctrl.off("file-view-change", this.updateList, this), 
        riotctrl.off("update-mru-list", this.updateRecents, this), riotctrl.off("update-cards-retro", this.updateCards, this), 
        this.off("*"), this.root.removeEventListener("focus", this.focus);
    }), this.onLoc = function() {
        var i, item;
        if (_this.columns) for (i = 0; item = _this.columns[i]; i++) item.localizedLabel = iaw.i18n.getLocalizedString(item.label);
        _this.nameLabel = iaw.i18n.getLocalizedString("listview_name_header"), _this.openedLabel = iaw.i18n.getLocalizedString("listview_last_header"), 
        _this.descLabel = iaw.i18n.getLocalizedString("listview_desc_header"), _this.sizeLabel = iaw.i18n.getLocalizedString("listview_size_header"), 
        _this.kindLabel = iaw.i18n.getLocalizedString("listview_kind_header"), _this.isMounted && _this.update();
    }, this.updateRecents = function() {
        "recentfile" === _this.tableClass && _this.updateList(_this.tableClass);
    }, this.updateCards = function() {
        _this.tableClass || (_this.tableClass = iaw.store.get([ "host", "defaultTab" ])), 
        _this.updateList(_this.tableClass);
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("file-view-toggle", '<button class="iaw-List-listIcon {selected: selectedView === \'list\'}" onclick="{toggle}" title="{listViewLabel}" aria-label="{listViewLabel}"> <svg width="100%" height="100%" viewbox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="list-view" class="iaw-List-iconThumbnail" sketch:type="MSArtboardGroup" fill="#7B7B7B"> <rect sketch:type="MSShapeGroup" x="0" y="0" width="100%" height="4"></rect> <rect sketch:type="MSShapeGroup" x="0" y="28%" width="100%" height="4"></rect> <rect sketch:type="MSShapeGroup" x="0" y="57%" width="100%" height="4"></rect> <rect sketch:type="MSShapeGroup" x="0" y="86%" width="100%" height="4"></rect> </g> </g> </svg> </button> <button class="iaw-List-gridIcon {selected: selectedView === \'grid\'}" onclick="{toggle}" title="{thumbnailViewLabel}" aria-label="{thumbnailViewLabel}"> <svg width="100%" height="100%" viewbox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="thumbnail-list" class="iaw-List-iconThumbnail" sketch:type="MSArtboardGroup" fill="#7B7B7B"> <rect sketch:type="MSShapeGroup" x="0" y="0" width="42%" height="42%"></rect> <rect sketch:type="MSShapeGroup" x="0" y="57%" width="42%" height="42%"></rect> <rect sketch:type="MSShapeGroup" x="57%" y="0" width="42%" height="42%"></rect> <rect sketch:type="MSShapeGroup" x="57%" y="57%" width="42%" height="42%"></rect> </g> </g> </svg> </button>', "", 'class="grid-cell hide"', function(opts) {
    var _this = this, defaultView = "grid";
    this.listViewLabel = "", this.thumbnailViewLabel = "", this.selectedView = iaw.localstorage.getUserItem(iaw.store.get([ "host", "currentTab" ]) + ".lastTabView") || defaultView, 
    this.toggle = function(evt) {
        var gridIconElement = _this.root.getElementsByClassName("iaw-List-gridIcon")[0], listIconElement = _this.root.getElementsByClassName("iaw-List-listIcon")[0];
        gridIconElement.classList.remove("selected"), gridIconElement.setAttribute("aria-pressed", "false"), 
        listIconElement.classList.remove("selected"), listIconElement.setAttribute("aria-pressed", "false");
        for (var parentButton, i = 0; i < evt.path.length; i++) if ("button" === evt.path[i].tagName.toLowerCase()) {
            parentButton = evt.path[i];
            break;
        }
        parentButton.classList.add("selected"), parentButton.setAttribute("aria-pressed", "true");
        var viewSelected = parentButton.classList.contains("iaw-List-listIcon") ? "list" : "grid";
        return _this.selectedView = viewSelected, iaw.localstorage.setUserItem(iaw.store.get([ "host", "currentTab" ]) + ".lastTabView", viewSelected), 
        riotctrl.trigger("file-view-change", viewSelected), !0;
    }, this.onCards = function() {
        var currentTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || iaw.store.get([ "host", "defaultTab" ]), initialTabData = iaw.store.get([ "host", "tabs", currentTab ]) || null;
        1 == initialTabData.listViewEnabled && 1 == initialTabData.thumbnailViewEnabled && _this.root.classList.remove("hide"), 
        _this.selectedView = iaw.localstorage.getUserItem(currentTab + ".lastTabView") || defaultView;
    }, this.onViewChange = function(view) {
        _this.selectedView = view, _this.hideIfEmpty(), iaw.motor.kick(), _this.update();
    }, this.updateI18nRetro = function() {
        _this.listViewLabel = iaw.i18n.getLocalizedString("file_view_toggle_listview"), 
        _this.thumbnailViewLabel = iaw.i18n.getLocalizedString("file_view_toggle_thumbnailview"), 
        _this.isMounted && _this.update();
    }, this.isCurrentListEmpty = function(currentTab) {
        var tab = iaw.store.get([ "host", "tabs", currentTab ]) || null;
        return !tab || !tab.list || 0 === tab.list.length;
    }, this.hideIfEmpty = function() {
        var currentTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || iaw.store.get([ "host", "defaultTab" ]), tabData = iaw.store.get([ "host", "tabs", currentTab ]) || null;
        !_this.isCurrentListEmpty(currentTab) && tabData.listViewEnabled && tabData.thumbnailViewEnabled ? _this.root.classList.remove("hide") : _this.root.classList.add("hide");
    }, this.updateList = function() {
        _this.hideIfEmpty();
    }, this.on("mount unmount", function(evt) {
        if ("mount" === evt) {
            var currentTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || iaw.store.get([ "host", "currentTab" ]), tabData = iaw.store.get([ "host", "tabs", currentTab ]) || null;
            if (!tabData.listViewEnabled || !tabData.thumbnailViewEnabled) return void this.root.classList.add("hide");
            this.hideIfEmpty(), this.selectedView = iaw.localstorage.getUserItem(currentTab + ".lastTabView") || defaultView, 
            riotctrl.on("update-cards-retro", this.onCards, this), riotctrl.on("file-view-change", this.onViewChange, this), 
            riotctrl.on("update-mru-list", this.updateList, this), riotctrl.on("update-ccfiles-list", this.updateList, this);
        } else "unmount" === evt && (this.off("*"), riotctrl.off("update-cards-retro", this.onCards, this), 
        riotctrl.off("file-view-change", this.onViewChange, this), riotctrl.off("update-i18n-retro", this.updateI18nRetro, this), 
        riotctrl.off("update-mru-list", this.updateList, this), riotctrl.off("update-ccfiles-list", this.updateList, this));
    }), riotctrl.on("update-i18n-retro", this.updateI18nRetro, this);
}), riot.tag2("hero-heading", '<h1 class="iaw-Heading">{label}</h1>', "", "", function(opts) {
    var _this = this;
    this.i18n = opts.i18n, this.label = opts.i18n, this.on("unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.off("*");
    }), this.onLoc = function() {
        _this.label = iaw.i18n.getLocalizedSubstitutionString(_this.i18n, [ iaw.store.get([ "host", "firstName" ]), iaw.store.get([ "host", "lastName" ]) ]), 
        _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("nav-buttons", '<debug-menu></debug-menu> <settings-menu></settings-menu> <button class="helpx-link spc-button spc-button--icon" onclick="{openHelp}" title="{helpLabel}" aria-label="{helpLabel}">?</button> <input type="image" if="{imgsrc}" riot-src="{imgsrc}" onclick="{openAccount}" title="{openAccountAlt}" alt="{openAccountAlt}"> <span if="{iaw.util.currentBreakPoint === 0 && iaw.store.get([\'host\', \'accountStatus\']) !== \'paid\'}" class="nav-buttons-trial">{days + \' \' + daysLeftLabel}</span>', "", 'class="grid grid--center grid-cell"', function(opts) {
    var _this = this;
    this.mixin("cooldown"), this.imgsrc = "./images/profile-default.jpg", this.days = 0, 
    this.daysLeftLabel = "", this.helpLabel = "", this.openAccountAlt = "", this.currentTime = new Date().getTime(), 
    this.openAccount = function(evt) {
        if (!_this.isCoolingDown(0)) {
            var url = "https://accounts.adobe.com/", applang = iaw.store.get([ "host", "language" ]), lang = iaw.i18n.getLangSuffixForAccountURL(applang);
            "en" !== lang && (url += lang + "/"), iaw.analytics.ingest.logMiscellaneousEvent({
                eventType: "uc-click",
                ucAction: "acct-profile"
            }), iaw.util.openDefaultBrowserAuthenicated("adobeAccount", url);
        }
    }, this.openHelp = function(evt) {
        if (!_this.isCoolingDown(1)) {
            var url = "https://helpx.adobe.com/", applang = iaw.store.get([ "host", "language" ]), lang = iaw.i18n.getLangSuffixForHelpURL(applang);
            switch (url += lang + "/", iaw.store.get([ "host", "hostID" ])) {
              case "AEFT":
                url += "after-effects";
                break;

              case "DRWV":
                url += "dreamweaver";
                break;

              case "ILST":
                url += "illustrator";
                break;

              case "IDSN":
                url += "indesign";
                break;

              case "MUSE":
                url += "muse";
                break;

              case "PHXS":
                url += "photoshop";
                break;

              case "PPRO":
                url += "premiere-pro";
            }
            url += ".html", iaw.util.openDefaultBrowserAuthenicated("adobeLearn", url);
        }
    }, this.checkTrial = function() {
        var trial = _this.root.querySelector(".nav-buttons-trial");
        if (iaw.store) {
            var secondsRemaining = iaw.store.get([ "host", "secondsLeftInTrial" ]);
            _this.days = Math.max(0, Math.round(moment.duration(secondsRemaining, "seconds").asDays()));
        }
        if (trial) {
            var cards = iaw.psdk.data.cards || [], found = !1;
            cards.forEach(function(card) {
                if ("trialClock" === card.cardType) {
                    if (card.startDTS) {
                        var startTime = new Date(card.startDTS).getTime();
                        if (startTime >= this.currentTime) return;
                    }
                    if (card.endDTS) {
                        var endTime = new Date(card.endDTS).getTime();
                        if (endTime < this.currentTime) return;
                    }
                    card.backgroundFillColor && (trial.style.backgroundColor = card.backgroundFillColor.replace("0x", "#"), 
                    found = !0);
                }
            }.bind(_this)), found || (trial.classList.remove("trialcard--days-5", "trialcard--days-10", "trialcard--days-30"), 
            _this.days < 4 ? trial.classList.add("trialcard--days-5") : _this.days < 6 ? trial.classList.add("trialcard--days-10") : trial.classList.add("trialcard--days-30"));
        }
    }, this.checkTrialAndUpdate = function() {
        _this.checkTrial(), _this.update();
    }, this.on("updated", this.checkTrial), this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("update-profile-image", this.updateProfile, this), 
        riotctrl.on("resize-breakpoint-retro", this.checkTrialAndUpdate, this)) : "unmount" === evt && (riotctrl.off("update-i18n-retro", this.onLoc, this), 
        riotctrl.off("update-profile-image", this.updateProfile, this), riotctrl.off("resize-breakpoint-retro", this.checkTrialAndUpdate, this), 
        this.off("*"));
    }), this.onLoc = function() {
        _this.daysLeftLabel = iaw.i18n.getLocalizedString("trial_counter"), _this.helpLabel = iaw.i18n.getLocalizedString("help_and_support"), 
        _this.openAccountAlt = iaw.i18n.getLocalizedString("manage_account"), _this.isMounted && _this.update();
    }, this.updateProfile = function(adobeGUID) {
        iaw.profile.getProfilePicture(adobeGUID, function(base64ImageData) {
            base64ImageData && (this.imgsrc = base64ImageData, this.update());
        }.bind(_this));
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("settings-menu", '<button if="{showMenu}" class="menu-panel--toggle" onclick="{toggleMenu}" onkeydown="{buttonKeyDown}" onmouseleave="{menuOut}" onmouseenter="{menuOver}" aria-haspopup="true" aria-expanded="{open}" aria-controls="menu-panel-{_riot_id}" title="{toggleLabel}" aria-label="{toggleLabel}"> <i class="inapp-icons inapp-icon--gear"></i> </button> <div hidden class="menu-panel" onmouseleave="{menuOut}" onmouseenter="{menuOver}" role="dialog" aria-hidden="true" id="menu-panel-{_riot_id}"> <div class="settings-menu--header" role="heading" aria-level="2">{titleLabel}</div> <div class="settings-menu--desc">{desc}</div> </div>', "", 'class="grid grid--center"', function(opts) {
    var _this = this, hoverTimer = -1;
    this.open = !1, this.showMenu = !1, this.trapFocus = !1, this.toggleLabel = "", 
    this.titleLabel = "", this.desc = "", this.buttonKeyDown = function(evt) {
        var keyCode = evt.keyCode;
        return (keyCode === iaw.a11y.Keys.ENTER || keyCode === iaw.a11y.Keys.SPACE || keyCode === iaw.a11y.Keys.DOWN && !_this.open) && (_this.trapFocus = !0, 
        keyCode === iaw.a11y.Keys.DOWN && _this.toggleMenu()), !0;
    }, this.escapeKey = function(evt) {
        _this.open && evt.keyCode === iaw.a11y.Keys.ESC && _this.closeMenu();
    }, this.mouseDown = function(evt) {
        var panel = _this.root.getElementsByClassName("menu-panel")[0], button = _this.root.getElementsByClassName("menu-panel--toggle")[0];
        _this.open && (button === evt.target || button.contains(evt.target) ? (iaw.a11y.TrapFocus.deactivate(panel), 
        _this.trapFocus = !1) : panel === evt.target || panel.contains(evt.target) || _this.closeMenu());
    }, this.menuOver = function(evt) {
        _this.open && clearTimeout(hoverTimer);
    }, this.menuOut = function(evt) {
        _this.open && !_this.trapFocus && (hoverTimer = setTimeout(_this.closeMenu.bind(_this), 500));
    }, this.closeMenu = function() {
        _this.toggleMenu(null, !0);
    }, this.toggleMenu = function(evt, forceClose) {
        var panel = _this.root.getElementsByClassName("menu-panel")[0], button = _this.root.getElementsByClassName("menu-panel--toggle")[0];
        forceClose && (_this.open = !0), _this.open ? (panel.setAttribute("aria-hidden", "true"), 
        panel.classList.remove("anim--open-menu"), panel.classList.add("anim--close-menu"), 
        button.setAttribute("aria-expanded", "false"), _this.trapFocus && (iaw.a11y.TrapFocus.deactivate(panel), 
        _this.trapFocus = !1), window.removeEventListener("keydown", _this.escapeKey), window.removeEventListener("mousedown", _this.mouseDown)) : (panel.removeAttribute("aria-hidden"), 
        panel.removeAttribute("hidden"), panel.classList.remove("anim--close-menu"), panel.classList.add("anim--open-menu"), 
        button.setAttribute("aria-expanded", "true"), _this.trapFocus && setTimeout(function() {
            iaw.a11y.TrapFocus.activate(panel, {
                initialFocus: panel
            });
        }, 20), window.addEventListener("keydown", _this.escapeKey), window.addEventListener("mousedown", _this.mouseDown, !0), 
        iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-click",
            ucAction: "welcome" === iaw.store.get([ "host", "displayMode" ]) ? "settings-hide-start" : "settings-hide-open"
        })), _this.open = !_this.open;
    }, this.on("mount", function() {
        riotctrl.on("update-host-retro", this.updateHost, this), riotctrl.on("resize-breakpoint-retro", this.updatei18n, this), 
        this.escapeKey = this.escapeKey.bind(this), this.mouseDown = this.mouseDown.bind(this);
    }), this.on("unmount", function() {
        riotctrl.off("update-host-retro", this.updateHost, this), riotctrl.off("update-i18n-retro", this.updatei18n, this), 
        riotctrl.off("resize-breakpoint-retro", this.updatei18n, this), this.off("*");
    }), this.updateHost = function() {
        switch (iaw.store.get([ "host", "hostID" ])) {
          case "PHXS":
          case "ILST":
          case "IDSN":
          case "DRWV":
          case "SIMU":
            _this.showMenu = "paid" === iaw.store.get([ "host", "accountStatus" ]);
            break;

          default:
            _this.showMenu = !1;
        }
        _this.update();
    }, this.updatei18n = function() {
        iaw.store && "DRWV" === iaw.store.get([ "host", "hostID" ]) ? (_this.titleLabel = iaw.i18n.getLocalizedString("hide_start_screen_title"), 
        _this.desc = iaw.i18n.getLocalizedString("hide_start_screen_desc")) : 0 === iaw.util.currentBreakPoint ? (_this.titleLabel = iaw.i18n.getLocalizedString("hide_recentfiles_workspace_title"), 
        _this.desc = iaw.i18n.getLocalizedString("hide_recentfiles_workspace_desc")) : (_this.titleLabel = iaw.i18n.getLocalizedString("hide_start_workspace_title"), 
        _this.desc = iaw.i18n.getLocalizedString("hide_start_workspace_desc")), _this.toggleLabel = iaw.i18n.getLocalizedString("settings"), 
        _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.updatei18n, this);
}), riot.tag2("page-more", '<div class="page-container--center-column"> <div class="more-Nav"> <a class="back-button" href="#primary" onclick="{goBack}"> <i class="inapp-icons inapp-icon--left"></i> <h2>{moreLabel}</h2> </a> </div> <div class="scroll-container"> <div class="scroll-pane"> <card-stream rows="{-1}" class="card-half"></card-stream> </div> </div> <scrollbar></scrollbar> </div>', "", 'class="page-container"', function(opts) {
    var _this = this;
    this.moreLabel = "", this.goBack = function() {
        return iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-click",
            ucAction: "eng-goback"
        }), !0;
    }, this.resetRootClasses = function() {
        _this.root.className = "page-container";
    }, this.on("intro-start intro-end outro-start outro-end", function(type) {
        switch (type) {
          case "intro-start":
            riot.mount("card-stream"), iaw.motor.kick(), this.update();
            break;

          case "intro-end":
            this.resetRootClasses(), iaw.motor.kick();
            break;

          case "outro-start":
            iaw.motor.kick();
            break;

          case "outro-end":
            this.resetRootClasses(), this.update();
        }
    }), this.on("mount", function() {}), this.on("unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.off("*");
    }), this.onLoc = function() {
        _this.moreLabel = iaw.i18n.getLocalizedString("back"), _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("page-primary", '<div class="page-container--center-column"> <div class="action-container" if="{breakpoint === 0}"> <create-button action="createButtonNewdocs" i18n="create_button_newdocs"></create-button> <create-button action="createButtonOpen" i18n="create_button_open"></create-button> </div> <div class="tab-nav--container grid grid--row"> <span class="grid-cell {grid-cell--gutter: breakpoint > 0} card--1of4"></span> <span class="grid-cell grid-cell--fit"> <span id="js-tab-nav"></span> <span if="{this.currentTab && iaw.store.get(this.currentTab.type + \'_note\')}" class="note-text"> <raw-text content="{iaw.store.get(this.currentTab.type + \'_note\')}"></raw-text> </span> </span> </div> <section id="cards--top" class="grid grid--row"> <div if="{breakpoint > 0}" class="create-column grid grid--col"> <tabs></tabs> <div class="button-container"> <create-button action="createButtonNewdocs" i18n="create_button_newdocs"></create-button> <create-button action="createButtonOpen" i18n="create_button_open"></create-button> </div> <div class="button-container {button-container--small: smallButtons, button-container--hidden: this.hostId !== \'AEFT\' && this.hostId !== \'PPRO\'}"> <create-button action="createButtonNewProduction" i18n="create_button_new_production"></create-button> <create-button action="createButtonOpenProduction" i18n="create_button_open_production"></create-button> </div> <trialsimple if="{iaw.store.get([\'host\', \'accountStatus\']) !== \'paid\'}"></trialsimple> </div> <div class="grid-cell scroll-container"> <div id="js-tab-content" class="scroll-pane"></div> </div> </section> <hr id="cards--separator"></hr> </div> <section if="{haveCards}" id="cards--bottom" class="page-container--center-column"> <div if="{breakpoint > 0 && haveMoreCards}" class="section-heading-container grid"> <h2 class="iaw-Heading iaw-Heading--2"> <a href="#more" onclick="{routeMore}">{seeAllLabel}</a> </h2> </div> <card-stream rows="1" class="card-half"></card-stream> </section>', "", 'class="page-container holy-grail"', function(opts) {
    var _this = this;
    this.contentSelector = "#js-tab-content", this.breakpoint = -1, this.fileView = "list", 
    this.currentTab = null, this.haveCards = !0, this.haveMoreCards = !0, this.seeAllLabel = "", 
    this.hostId, this.smallButtons = !1;
    var prevPaneHeight = 0, prevContainerHeight = 0;
    this.mountTab = function(tab) {
        var newTab = iaw.store.get([ "host", "tabs", tab ]) || null;
        if (_this.currentTab) {
            if (_this.currentTab.type === tab) return;
            var oldTag = _this.tags["tab-" + _this.currentTab.type];
            oldTag && oldTag.unmount();
        }
        _this.currentTab = newTab;
        var tag = riot.mount(_this.contentSelector, "tab-" + tab);
        tag = 0 === tag.length ? riot.mount(_this.contentSelector, "tab-generic", newTab)[0] : tag[0], 
        tag || console.error(tab + " was unsuccessfully mounted"), _this.fileView = tag.fileView, 
        _this.update();
    }, this.resetRootClasses = function() {
        _this.root.className = "page-container holy-grail";
    }, this.checkScrollPane = function() {
        var pane = _this.root.querySelector(".scroll-pane"), container = _this.root.querySelector(".scroll-container"), paneHeight = pane.offsetHeight, containerHeight = container.offsetHeight;
        prevPaneHeight === paneHeight && prevContainerHeight === containerHeight || (prevPaneHeight = paneHeight, 
        prevContainerHeight = containerHeight, paneHeight > containerHeight ? (pane.style.position = "absolute", 
        container = _this.root.querySelector(".page-container--center-column"), container.classList.contains("holy-grail--body") || container.classList.add("holy-grail--body")) : (pane.style.position = "relative", 
        container = _this.root.querySelector(".page-container--center-column"), container.classList.contains("holy-grail--body") && container.classList.remove("holy-grail--body")));
    }, this.resetContainerMargin = function() {
        var scrollContainer = document.querySelector(".scroll-container"), table = document.getElementsByTagName("file-table");
        table[0] && "list" === _this.fileView ? scrollContainer.style.marginTop = "31px" : scrollContainer.style.marginTop = "0";
    }, this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("update-cards-retro", this.updateCards, this), riotctrl.on("tab-change", this.tabChange, this), 
        riotctrl.on("file-view-change", this.fileViewChange, this), iaw.motor.add(this.checkScrollPane, this), 
        iaw.motor.add(this.resetContainerMargin, this), iaw.motor.kick()) : "unmount" === evt && (this.off("*"), 
        riotctrl.off("resize-breakpoint-retro", this.recalc, this), riotctrl.off("update-cards-retro", this.updateCards, this), 
        riotctrl.off("tab-change", this.tabChange, this), riotctrl.off("file-view-change", this.fileViewChange, this), 
        riotctrl.off("update-i18n-retro", this.onLoc, this), iaw.motor.remove(this.checkScrollPane, this), 
        iaw.motor.remove(this.resetContainerMargin, this));
    }), this.on("intro-start intro-end outro-start outro-end", function(type) {
        switch (type) {
          case "intro-start":
            iaw.motor.kick();
            break;

          case "intro-end":
            iaw.motor.kick(), this.resetRootClasses(), this.update();
            break;

          case "outro-start":
            iaw.motor.kick();
            break;

          case "outro-end":
            iaw.motor.kick(), this.resetRootClasses(), this.update();
        }
    }), this.updateCards = function() {
        _this.haveCards = iaw.psdk.data && iaw.psdk.data.cards && iaw.psdk.data.cards.length > 0, 
        ("paid" === iaw.store.get([ "host", "accountStatus" ]) || _this.haveCards) && _this.tags.trialsimple.root.classList.add("hidden");
        var lastTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab") || iaw.store.get([ "host", "defaultTab" ]);
        _this.mountTab(lastTab);
    }, this.onLoc = function() {
        _this.seeAllLabel = iaw.i18n.getLocalizedString("psdk_showall_label");
    }, this.onHost = function() {
        _this.hostId = iaw.store.get([ "host", "hostID" ]), _this.language = iaw.store.get([ "host", "language" ]), 
        _this.smallButtons = "ja_JP" === _this.language;
    }, this.routeMore = function() {
        return iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-click",
            ucAction: "eng-showall"
        }), !0;
    }, this.tabChange = function(tab) {
        iaw.store.set([ "host", "currentTab" ], tab), !_this.currentTab || _this.currentTab && tab !== _this.currentTab.type ? _this.mountTab(tab) : _this.update(), 
        _this.resetContainerMargin(), iaw.motor.kick();
    }, this.fileViewChange = function(viewType) {
        _this.fileView = viewType, _this.resetContainerMargin(), iaw.analytics.ingest.logViewChangeEvent({
            sectionView: viewType,
            sectionType: _this.currentTab.type
        }), iaw.motor.kick();
    }, this.recalc = function(prevPoint, newPoint) {
        _this.breakpoint = newPoint, _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this), riotctrl.on("update-host-retro", this.onHost, this), 
    riotctrl.on("resize-breakpoint-retro", this.recalc, this);
}), riot.tag2("product-rune", '<img if="{!showBack()}" class="product-icon" riot-src="{imgSrc}" alt=""> <span if="{!showBack()}">{label}</span> <i if="{showBack()}" class="inapp-icons inapp-icon--left" onclick="{closePanel}"></i> <div if="{showBack()}" onclick="{closePanel}">{closeLabel}</div>', "", 'class="grid grid--center"', function(opts) {
    var _this = this;
    this.imgSrc = "./images/products/product-rune-SIMU.jpg", this.label = "", this.closeLabel = "", 
    this.closePanel = function(evt) {
        iaw.analytics.ingest.logScreenStateEvent("close-manual"), iaw.cepUtil.sendEvent(iaw.cepUtil.events.REQUESTHOSTCLOSE, null);
    }, this.showBack = function() {
        var hostID = iaw.store.get([ "host", "hostID" ]), openMode = "com.adobe.ccx.open" === iaw.cepUtil.getExtensionID();
        return openMode && "PPRO" !== hostID && "AEFT" !== hostID;
    }, this.on("mount unmount", function(evt) {
        "mount" === evt ? riotctrl.on("resize-breakpoint-retro", this.update, this) : "unmount" === evt && (riotctrl.off("resize-breakpoint-retro", this.update, this), 
        riotctrl.off("update-i18n-retro", this.onLoc, this));
    }), this.onLoc = function() {
        var hostID = iaw.store.get([ "host", "hostID" ]);
        _this.imgSrc = "./images/products/product-rune-" + hostID + ".png", _this.label = iaw.i18n.getLocalizedString("product_title_" + hostID), 
        _this.closeLabel = iaw.i18n.getLocalizedString("close"), _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("raw-text", "<span></span>", "", "", function(opts) {
    this.on("update", function() {
        this.root.innerHTML = opts.content;
    });
}), riot.tag2("empty-ccfiles", '<div class="ccfiles-empty__container"> <h4>{titleText}</h4> <span class="ccfiles-empty__subtitle">{subtitleText}</span> <div class="grid grid--row"> <div class="ccfiles-empty__card"> <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 80 80" style="enable-background:new 0 0 77 58;" xml:space="preserve"> <g> <path class="st0" d="M48.4,1.7c15,0,27.2,12.3,27.2,27.3S63.4,56.3,48.4,56.3c-4.6,0-20,0-24.2,0C11.6,56.3,1.4,46,1.4,33.4 s10.2-22.9,22.8-22.9c1.3,0,2.6,0.1,3.9,0.3C33,5.2,40.3,1.7,48.4,1.7 M48.4,0.5c-4.1,0-8.1,0.9-11.8,2.6c-3.4,1.6-6.4,3.7-8.9,6.5 c-1.1-0.2-2.3-0.2-3.4-0.2c-3.2,0-6.4,0.6-9.3,1.9c-2.9,1.2-5.4,2.9-7.6,5.1C5,18.5,3.3,21.1,2.1,24c-1.3,3-1.9,6.1-1.9,9.3 c0,3.2,0.6,6.4,1.9,9.3c1.2,2.9,2.9,5.4,5.1,7.6c2.2,2.2,4.8,4,7.6,5.3c3,1.3,6.1,2,9.3,2h24.2c3.8,0,7.5-0.9,11-2.3 c3.4-1.4,6.4-3.5,9-6.1c2.6-2.6,4.7-5.7,6.1-9.1c1.5-3.5,2.2-7.2,2.2-11.1s-0.8-7.6-2.2-11.1c-1.4-3.4-3.5-6.4-6.1-9 c-2.6-2.6-5.6-4.7-9-6.1C55.9,1.2,52.2,0.5,48.4,0.5L48.4,0.5z"></path> <path class="st0" d="M21,34c-0.8-0.8-0.8-2.1,0-2.9c0.8-0.8,2.1-0.8,2.9,0l11,11.1c3.4,3.4,8.2,5.8,13.4,5.8 c10.4,0,18.8-8.7,18.8-19.1S58.8,10,48.4,10c-4.4,0-8.5,1.5-11.7,4.1c-1.2-0.8-2.6-1.5-4-2.1c4.1-3.8,9.6-6.2,15.7-6.2 c12.7,0,23,10.3,23,23s-10.3,23.3-23,23.3c-6.4,0-12.1-2.8-16.3-7L21,34z"></path> <path class="st0" d="M33.7,22.4c-2.5-2.2-5.9-3.5-9.5-3.5c-8,0-14.5,6.5-14.5,14.4c0,8,8.3,14.6,14.5,14.6h4.6 c1.5,1.6,3.2,3.1,5.1,4.3h-9.7c-10.3,0-18.6-8.4-18.6-18.7s8.3-18.7,18.6-18.7c4.8,0,9.2,1.8,12.5,4.8l8.4,8.6 c0.8,0.8,0.8,2.1,0,2.9s-2.1,0.8-2.9,0L33.7,22.4z"></path> </g> </svg> <span>{ctaText}</span> <div class="ccfiles-empty__buttons"> <div class="spc-button spc-button--primary" onclick="{handleLearnMore}">{learnMore}</div><div class="spc-button spc-button--cta" onclick="{handleViewOnWeb}">{viewOnWeb}</div> </div> </div> </div> </div>', "", "", function(opts) {
    var _this = this;
    this.titleText = "", this.subtitleText = "", this.ctaText = "", this.learnMore = "", 
    this.viewOnWeb = "", this.handleLearnMore = function() {
        var applang = iaw.store.get([ "host", "language" ]), lang = iaw.i18n.getLangSuffixForHelpURL(applang), append = "en" === lang ? "" : "_" + lang, url = "https://www.adobe.com/go/ccfiles_learn" + append;
        iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-click",
            ucAction: "learn-more",
            actionURL: url,
            sectionType: "ccfiles"
        }), iaw.util.openDefaultBrowserAuthenicated("adobeAccount", url);
    }, this.handleViewOnWeb = function() {
        var applang = iaw.store.get([ "host", "language" ]), lang = iaw.i18n.getLangSuffixForHelpURL(applang), append = "en" === lang ? "" : "_" + lang, url = "https://www.adobe.com/go/ccfiles_web" + append;
        iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-click",
            ucAction: "view-on-web",
            actionURL: url,
            sectionType: "ccfiles"
        }), iaw.util.openDefaultBrowserAuthenicated("adobeAccount", url);
    }, this.on("unmount", function(evt) {
        riotctrl.off("update-i18n-retro", this.updateI18n, this), this.off("*");
    }), this.updateI18n = function() {
        _this.titleText = "PHXS" === iaw.store.get([ "host", "hostID" ]) ? iaw.i18n.getLocalizedString("empty_ccfiles_ps_title") : iaw.i18n.getLocalizedString("empty_ccfiles_title"), 
        _this.subtitleText = iaw.i18n.getLocalizedString("empty_ccfiles_subtitle"), _this.ctaText = iaw.i18n.getLocalizedString("empty_ccfiles_cta"), 
        _this.learnMore = iaw.i18n.getLocalizedString("empty_ccfiles_learn"), _this.viewOnWeb = iaw.i18n.getLocalizedString("empty_ccfiles_view"), 
        _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.updateI18n, this);
}), riot.tag2("tab-ccfiles", '<div if="{isLoading}" class="activity-indicator__radial"></div> <div if="{!fileListEmpty && !isLoading && !loadingError && fileView === \'list\'}"> <file-table columns="{this.columns}"></file-table> </div> <div if="{!fileListEmpty && !isLoading && !loadingError && fileView === \'grid\'}" class="grid grid--gutter"> <file-grid></file-grid> </div> <raw-text if="{loadingError}" content="{loadingErrorText}" style="display:block;width:80%;line-height:150%;"></raw-text> <empty-ccfiles if="{fileListEmpty}"></empty-ccfiles>', "", "", function(opts) {
    function parseFiles(results) {
        for (var resources = results._embedded.result, resourcesArr = Array.isArray(resources) ? resources : [ resources ], resourcesData = [], i = 0; i < resourcesArr.length; i++) {
            var newObj = {
                type: resourcesArr[i].type,
                consistency_hint: resourcesArr[i].consistency_hint,
                id: resourcesArr[i].id.split("#")[0],
                owner: resourcesArr[i].ownerId
            };
            resourcesData.push(newObj);
        }
        return resourcesData;
    }
    function parseMetadata(results, token, region, environment) {
        for (var resources = results._embedded.resources, resourcesArr = Array.isArray(resources) ? resources : [ resources ], resourcesData = new Array(), noRenditions = [ "indl", "indb", "idml" ], noRenditions_dw = {
            json: "SP_QuickStartJSON.png",
            less: "SP_QuickStartLESS.png",
            php: "SP_QuickStartPHP.png",
            js: "SP_QuickStartJS.png",
            css: "SP_QuickStartCSS.png",
            html: "SP_QuickStartHTML.png"
        }, i = 0; i < resourcesArr.length; i++) if (!(resourcesArr[i].metadata && resourcesArr[i].metadata.custom && resourcesArr[i].metadata.custom.oldLocation)) {
            var extension = resourcesArr[i].metadata.asset.fileName.split(".").pop(), newObj = {};
            newObj.action = "ccfiles", newObj.id = resourcesArr[i].id, newObj.name = resourcesArr[i].metadata.asset.fileName || "Untitled", 
            newObj.tip = resourcesArr[i].metadata.asset.fileName || "Untitled", newObj.lastOpened = resourcesArr[i].metadata.asset.updated, 
            newObj.size = iaw.util.createFileSizeString(resourcesArr[i].metadata.asset.length), 
            "DRWV" === iaw.store.get([ "host", "hostID" ]) ? newObj.thumb = Object.keys(noRenditions_dw).indexOf(extension) > -1 ? "./images/thumbs/" + noRenditions_dw[extension] : generateRenditionUrl(resourcesArr[i].id, token, region, environment) + "&t=" + new Date().getTime() : newObj.thumb = noRenditions.indexOf(extension) > -1 ? "./images/thumbs/CCX_Start_DefaultThumb_Ps_Ai_Id.png" : generateRenditionUrl(resourcesArr[i].id, token, region, environment) + "&t=" + new Date().getTime(), 
            resourcesData.push(newObj);
        }
        return resourcesData;
    }
    function generateRenditionUrl(id, token, region, environment) {
        var sharedCloudEndpoint = "https://cc-" + region + "1-" + environment + ".adobesc.com/api/v1/assets/" + id + "/renditions/jpg/500", renditionUrl = "https://scproxy-" + environment + ".adobecc.com/api?X-Location=" + encodeURIComponent(sharedCloudEndpoint) + "&Authorization=Bearer%20" + token;
        return renditionUrl;
    }
    function getMimeTypes() {
        var mimeTypes = [];
        switch (iaw.store.get([ "host", "hostID" ])) {
          case "PHXS":
            mimeTypes = [ "image/vnd.adobe.photoshop", "application/photoshop", "application/psd", "image/psd", "application/x-photoshop" ];
            break;

          case "ILST":
            mimeTypes = [];
            break;

          case "IDSN":
            mimeTypes = [];
            break;

          case "AEFT":
            mimeTypes = [ "application/vnd.adobe.aftereffects.project", "application/octet-stream" ];
            break;

          case "PPRO":
            mimeTypes = [ "application/octet-stream", "application/x-gzip" ];
            break;

          case "DRWV":
            mimeTypes = [];
        }
        return mimeTypes;
    }
    function getExtensions() {
        var extension = [];
        switch (iaw.store.get([ "host", "hostID" ])) {
          case "PHXS":
            extension = [ "psd" ];
            break;

          case "ILST":
            extension = [ "ai", "eps", "pdf" ];
            break;

          case "IDSN":
            extension = [ "indd", "indt", "indb", "indl", "idml" ];
            break;

          case "AEFT":
            extension = [ "aep" ];
            break;

          case "PPRO":
            extension = [ "prproj" ];
            break;

          case "MUSE":
            extension = [ "muse" ];
            break;

          case "DRWV":
            extension = [ "html", "css", "js", "php", "scss", "sass", "less", "json", "svg", "xml", "dwt", "dwt.php" ];
        }
        return extension;
    }
    var _this = this;
    this.tabType = "ccfiles", this.fileListEmpty = !1, this.fileView = iaw.localstorage.getUserItem("ccfiles.lastTabView") || "list", 
    this.isLoading = !0, this.loadingError = !1, this.loadingErrorText = "", this.ccFilesRootFolder = "", 
    this.ccFilesDisplayRootFolder = "", this.columns = [ {
        label: "listview_name_header",
        id: "name",
        width: 1,
        type: "string",
        resizable: !0
    }, {
        label: "listview_modified_header",
        id: "lastOpened",
        width: 1,
        type: "date"
    }, {
        label: "listview_size_header",
        id: "size",
        width: 1
    } ], this.countryCode = iaw.store.get([ "host", "countryCode" ]), this.ENVIRONMENT = iaw.cepUtil.isStage ? "stage" : "prod", 
    this.REGION = iaw.util.getRegionFromCountryCode(this.countryCode && "" !== this.countryCode ? this.countryCode : "US"), 
    this.SABRE_CLOUD_ID = "00000000-0000-0000-0000-000000000000", this.SABRE_JOB_ID = "files", 
    this.CC_FILES_ROOT_FOLDER_REQUEST = "accc.files.getCloudsListRequest", this.CC_FILES_ROOT_FOLDER_RESPONSE = "adbproduct.files.getCloudsListResponse", 
    this.CC_FILES_PATH_REQUEST = "sync.in.request.job.getpath", this.CC_FILES_PATH_RESPONSE = "sync.out.response.job.getpath", 
    this.CC_FILES_OBSERVER_CREATE = "sync.in.request.observer.create", this.CC_FILES_SYNC_STATUS = "sync.out.notify.job.status", 
    this.XML_START = '<?xml version="1.0" encoding="utf-8"?><message>', this.XML_END = "</message>", 
    this.XML_REQUEST_START = '<?xml version="1.0" encoding="utf-8"?><request>', this.XML_REQUEST_END = "</request>", 
    this.SHARED_CLOUD_PROXY_ENDPOINT = "https://scproxy-" + this.ENVIRONMENT + ".adobecc.com/api", 
    this.SHARED_CLOUD_SEARCH_ENDPOINT = "https://cc-" + this.REGION + "1-" + this.ENVIRONMENT + ".adobesc.com/api/v1/search", 
    this.SHARED_CLOUD_METADATA_ENDPOINT = "https://cc-" + this.REGION + "1-" + this.ENVIRONMENT + ".adobesc.com/api/v1/resources/metadata/batch", 
    this.SHARED_CLOUD_COLLECTION_ENDPOINT = "https://cc-" + this.REGION + "1-" + this.ENVIRONMENT + ".adobesc.com/api/v1/collections/", 
    this.isCurrentListEmpty = function() {
        var tab = iaw.store.get([ "host", "tabs", _this.tabType ]) || null;
        return !tab || !tab.list || 0 === tab.list.length;
    }, this.getFiles = function() {
        _this.isLoading = !0, _this.update();
        var self = _this;
        iaw.cepUtil.getIMSAccessToken(function(token) {
            var _this2 = this;
            this.getCCFilesRootFolder().then(function(rootFolder) {
                return iaw.log.console("CC-Files :: --------- got root folder"), iaw.log.console("CC-Files :: " + rootFolder), 
                self.ccFilesRootFolder = rootFolder, _this2.searchAsync(token);
            }).then(function(data) {
                iaw.log.console("CC-Files :: --------- got search results"), iaw.log.logJSON("CC-Files :: ", data);
                var parsedFiles = parseFiles(data);
                return _this2.getMetadata(token, parsedFiles);
            }).then(function(data) {
                iaw.log.console("CC-Files :: --------- got metadata results"), iaw.log.logJSON("CC-Files :: ", data);
                var parsedMetadata = parseMetadata(data, token, _this2.REGION, _this2.ENVIRONMENT);
                return _this2.getPaths(token, parsedMetadata);
            }).then(function(data) {
                iaw.log.console("CC-Files :: --------- got paths for files"), iaw.log.logJSON("CC-Files :: ", data);
                var currentTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab"), finalData = data, filesTab = iaw.store.get([ "host", "tabs", "ccfiles" ]);
                iaw.localstorage.setUserItem("ccfiles.data", finalData);
                for (var numFiles = finalData.length, idx = 0; idx < numFiles; ++idx) {
                    var filedata = finalData[idx], kind = filedata.kind || filedata.identifier.split(".").pop();
                    iaw.analytics.ingest.logItemOpenedEvent({
                        openType: "cc-file",
                        eventAction: "render",
                        fileType: kind,
                        itemPosition: idx,
                        sectionView: self.fileView || "",
                        cardID: filedata.id
                    });
                }
                filesTab.list = finalData, self.isLoading = !1, self.fileListEmpty = 0 === numFiles, 
                self.fileListEmpty || "PHXS" !== iaw.store.get([ "host", "hostID" ]) || iaw.store.set(self.tabType + "_note", iaw.i18n.getLocalizedString("ccfiles_populated_msg")), 
                "ccfiles" === currentTab && riotctrl.trigger("tab-change", "ccfiles"), riotctrl.trigger("update-ccfiles-list"), 
                self.update();
            })["catch"](function(error) {
                "empty" === error || "{}" === error ? (_this2.fileListEmpty = !0, self.loadingError = !1) : (iaw.log.console("CC-Files :: ------- ERROR IN PROMISE ----------"), 
                iaw.log.logJSON("CC-Files :: ", error), self.fileListEmpty = !1, self.loadingError = !0);
                var filesTab = iaw.store.get([ "host", "tabs", "ccfiles" ]);
                filesTab.list = [], self.isLoading = !1, iaw.store.set(self.tabType + "_note", null);
                var currentTab = iaw.localstorage.getUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab");
                "ccfiles" === currentTab && riotctrl.trigger("tab-change", "ccfiles"), riotctrl.trigger("update-ccfiles-list"), 
                self.update();
            });
        }.bind(_this));
    }, this.getCCFilesRootFolder = function() {
        var self = _this;
        return new Promise(function(resolve, reject) {
            function handleCCFilesRootFolder(message) {
                var responseData = VulcanInterface.getPayload(message);
                VulcanInterface.removeMessageListener(VulcanMessage.TYPE_PREFIX + self.CC_FILES_ROOT_FOLDER_RESPONSE, handleCCFilesRootFolder);
                var xml = new DOMParser().parseFromString(responseData, "text/xml"), clouds = xml.getElementsByTagName("cloud");
                if (clouds.length) {
                    for (var rootFolder = "", i = 0; i < clouds.length; i++) {
                        var cloudId = clouds[i].getElementsByTagName("id")[0].childNodes[0].nodeValue, cloudSyncPref = clouds[i].getElementsByTagName("syncPref")[0].childNodes[0].nodeValue;
                        cloudId === self.SABRE_CLOUD_ID && "on" === cloudSyncPref && (rootFolder = unescape(clouds[i].getElementsByTagName("folderLocation")[0].childNodes[0].nodeValue), 
                        self.ccFilesDisplayRootFolder = rootFolder);
                    }
                    if (!("win" !== iaw.store.get([ "host", "platform" ]) && "windows" !== iaw.store.get([ "host", "platform" ]) || "PHXS" !== iaw.store.get([ "host", "hostID" ]) && "PPRO" !== iaw.store.get([ "host", "hostID" ]))) {
                        var winRootFolder = "";
                        "PHXS" === iaw.store.get([ "host", "hostID" ]) ? (winRootFolder = rootFolder.split("\\").join("/"), 
                        rootFolder = "file://" + winRootFolder) : "PPRO" === iaw.store.get([ "host", "hostID" ]) && (winRootFolder = rootFolder.split("\\").join("\\\\"), 
                        rootFolder = winRootFolder);
                    }
                    "" !== rootFolder ? resolve(rootFolder) : reject("Unable to fetch root folder");
                } else reject("Unable to fetch root folder");
            }
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + self.CC_FILES_ROOT_FOLDER_RESPONSE, handleCCFilesRootFolder);
            var uuid = iaw.util.generateGUID(), params = {
                "request-id": uuid
            }, xmlMessage = "";
            for (var param in params) xmlMessage += "<" + param + ">" + params[param] + "</" + param + ">";
            var ThorRequestMessage = new VulcanMessage(VulcanMessage.TYPE_PREFIX + self.CC_FILES_ROOT_FOLDER_REQUEST);
            ThorRequestMessage.setPayload(self.XML_REQUEST_START + xmlMessage + self.XML_REQUEST_END), 
            VulcanInterface.dispatchMessage(ThorRequestMessage);
        });
    }, this.searchAsync = function(token) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open("POST", _this.SHARED_CLOUD_PROXY_ENDPOINT, !0), request.onload = function() {
                if (200 === request.status) {
                    var response = JSON.parse(request.response);
                    response.found > 0 ? resolve(response) : reject("empty");
                } else reject(request.statusText);
            }, request.onerror = function() {
                reject(request.statusText || "Network Error");
            }, request.setRequestHeader("Authorization", "Bearer " + token), request.setRequestHeader("X-Location", _this.SHARED_CLOUD_SEARCH_ENDPOINT);
            for (var mimeTypes = getMimeTypes(), terms = [], i = 0; i < mimeTypes.length; i++) terms.push({
                term: {
                    "asset.mimeType": mimeTypes[i]
                }
            });
            for (var extensions = getExtensions(), extensionTerms = [], j = 0; j < extensions.length; j++) extensionTerms.push({
                term: {
                    "name.extension": extensions[j]
                }
            });
            var queryBool = {};
            queryBool = "IDSN" === iaw.store.get([ "host", "hostID" ]) || "ILST" === iaw.store.get([ "host", "hostID" ]) || "DRWV" === iaw.store.get([ "host", "hostID" ]) ? {
                bool: {
                    should: extensionTerms
                }
            } : {
                bool: {
                    should: terms,
                    must: extensionTerms
                }
            };
            var data = {
                types: [ "asset" ],
                client_id: [ "CCStorageExtended", "creative_cloud" ],
                access_scope: [ "private" ],
                max: "50",
                page_size: 50,
                query: queryBool,
                sort: [ {
                    updated: {
                        order: "desc"
                    }
                }, "_score" ]
            };
            request.send(JSON.stringify(data));
        });
    }, this.getMetadata = function(token, data) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open("POST", _this.SHARED_CLOUD_PROXY_ENDPOINT, !0), request.onload = function() {
                200 === request.status || 207 === request.status ? resolve(JSON.parse(request.response)) : reject(request.statusText);
            }, request.onerror = function() {
                reject(request.statusText || "Network Error");
            }, request.setRequestHeader("Authorization", "Bearer " + token), request.setRequestHeader("X-Location", _this.SHARED_CLOUD_METADATA_ENDPOINT);
            var metadata = {
                include_parent: "true",
                resources: data
            };
            request.send(JSON.stringify(metadata));
        });
    }, this.getPaths = function(token, files) {
        var self = _this;
        return new Promise(function(resolve, reject) {
            function handleCCFilesPath(message) {
                var responseData = VulcanInterface.getPayload(message), xml = new DOMParser().parseFromString(responseData, "text/xml");
                if (xml.getElementsByTagName("path").length && xml.getElementsByTagName("path")[0].childNodes[0].nodeValue.indexOf("/archive") === -1) {
                    var path = xml.getElementsByTagName("path")[0].childNodes[0].nodeValue, status = xml.getElementsByTagName("status")[0].childNodes[0].nodeValue;
                    "signedout" === status && reject("Authorization error"), "win" !== iaw.store.get([ "host", "platform" ]) && "windows" !== iaw.store.get([ "host", "platform" ]) || "PPRO" !== iaw.store.get([ "host", "hostID" ]) ? "win" !== iaw.store.get([ "host", "platform" ]) && "windows" !== iaw.store.get([ "host", "platform" ]) || "ILST" !== iaw.store.get([ "host", "hostID" ]) ? files[fileCount].identifier = self.ccFilesRootFolder + path : files[fileCount].identifier = self.ccFilesRootFolder + path.split("/").join("\\") : files[fileCount].identifier = self.ccFilesRootFolder + path.split("/").join("\\\\");
                    var newFileName = path.split("/").pop();
                    newFileName && (files[fileCount].name = path.split("/").pop(), files[fileCount].tip = self.ccFilesDisplayRootFolder + ("win" === iaw.store.get([ "host", "platform" ]) || "windows" === iaw.store.get([ "host", "platform" ]) ? path.split("/").join("\\") : path));
                } else filesToRemove.push(fileCount);
                if (fileCount++, fileCount > files.length - 1) {
                    VulcanInterface.removeMessageListener(VulcanMessage.TYPE_PREFIX + self.CC_FILES_PATH_RESPONSE, handleCCFilesPath);
                    for (var i = filesToRemove.length - 1; i >= 0; i--) files.splice(filesToRemove[i], 1);
                    resolve(files);
                } else getFilePath();
            }
            function getFilePath() {
                var params = {
                    requestid: uuid,
                    userid: userId,
                    cloudid: self.SABRE_CLOUD_ID,
                    job: self.SABRE_JOB_ID,
                    type: self.CC_FILES_PATH_REQUEST,
                    url: self.SHARED_CLOUD_COLLECTION_ENDPOINT + files[fileCount].id
                }, xmlMessage = "";
                for (var param in params) xmlMessage += "<" + param + ">" + params[param] + "</" + param + ">";
                var ThorRequestMessage = new VulcanMessage(VulcanMessage.TYPE_PREFIX + self.CC_FILES_PATH_REQUEST);
                ThorRequestMessage.setPayload(self.XML_START + xmlMessage + self.XML_END), VulcanInterface.dispatchMessage(ThorRequestMessage);
            }
            var fileCount = 0, filesToRemove = [];
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + self.CC_FILES_PATH_RESPONSE, handleCCFilesPath);
            var uuid = iaw.util.generateGUID(), imsInfo = new DOMParser().parseFromString(iaw.cepUtil.imsInfo.getIMSAccounts(), "text/xml"), userId = imsInfo.getElementsByTagName("UserID")[0].childNodes[0].nodeValue;
            getFilePath();
        });
    }, this.startCCFilesNotification = function() {
        if (VulcanInterface) {
            var uuid = iaw.util.generateGUID(), params = {
                requestid: uuid,
                type: _this.CC_FILES_OBSERVER_CREATE
            }, xmlMessage = "";
            for (var param in params) xmlMessage += "<" + param + ">" + params[param] + "</" + param + ">";
            var ThorRequestMessage = new VulcanMessage(VulcanMessage.TYPE_PREFIX + _this.CC_FILES_OBSERVER_CREATE);
            ThorRequestMessage.setPayload(_this.XML_START + xmlMessage + _this.XML_END), VulcanInterface.dispatchMessage(ThorRequestMessage), 
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + _this.CC_FILES_SYNC_STATUS, _this.handleCCFilesSync);
        }
    }, this.stopCCFilesNotification = function() {
        VulcanInterface && VulcanInterface.removeMessageListener(VulcanMessage.TYPE_PREFIX + _this.CC_FILES_SYNC_STATUS, _this.handleCCFilesSync);
    }, this.handleCCFilesSync = function(data) {
        var responseData = VulcanInterface.getPayload(data), xml = new DOMParser().parseFromString(responseData, "text/xml"), status = xml.getElementsByTagName("minorstate")[0].childNodes[0].nodeValue;
        _this.isLoading || "complete" !== status || _this.getFiles();
    }, this.on("mount unmount", function(evt) {
        if ("mount" === evt) {
            var cachedFiles = iaw.localstorage.getUserItem("ccfiles.data") || [], filesTab = iaw.store.get([ "host", "tabs", "ccfiles" ]);
            filesTab.list = cachedFiles, this.update(), this.getFiles();
            var newTab = iaw.store.get([ "host", "tabs", this.tabType ]);
            iaw.localstorage.setUserItem(newTab.type + ".lastTabView", this.fileView), riotctrl.on("file-view-change", this.onViewChange, this), 
            riot.mount("#js-tab-nav", "file-view-toggle"), riotctrl.trigger("file-view-change", this.fileView), 
            this.startCCFilesNotification();
        } else "unmount" === evt && (riotctrl.off("update-i18n-retro", this.updateI18n, this), 
        riotctrl.off("file-view-change", this.onViewChange, this), this.off("*"), this.stopCCFilesNotification());
    }), this.updateI18n = function() {
        _this.loadingErrorText = iaw.i18n.getLocalizedString("ccfiles_loading_error"), _this.isMounted && _this.update();
    }, this.onViewChange = function(viewType) {
        _this.fileView = viewType, _this.update();
    }, riotctrl.on("update-i18n-retro", this.updateI18n, this);
}), riot.tag2("tab-generic", '<div if="{!fileListEmpty && fileView === \'list\'}"> <file-table></file-table> </div> <div if="{!fileListEmpty && fileView === \'grid\'}" class="grid grid--gutter"> <file-grid></file-grid> </div> <div if="{fileListEmpty}" class="grid grid--gutter"> <span>{emptyListText}</span> </div>', "", "", function(opts) {
    var _this = this;
    this.tabType = opts.type, this.fileListEmpty = !1, this.fileView = "list", this.emptyListText = "", 
    this.isCurrentListEmpty = function() {
        var tab = iaw.store.get([ "host", "tabs", _this.tabType ]) || null;
        return !tab || !tab.list || 0 === tab.list.length;
    }, this.on("mount unmount", function(evt) {
        if ("mount" === evt) {
            var newTab = iaw.store.get([ "host", "tabs", this.tabType ]) || null;
            this.fileListEmpty = this.isCurrentListEmpty(), this.fileView = iaw.localstorage.getUserItem(this.tabType + ".lastTabView") || "list", 
            "list" !== this.fileView || newTab.listViewEnabled ? "grid" !== this.fileView || newTab.thumbnailViewEnabled || (this.fileView = "list") : this.fileView = "grid", 
            iaw.localstorage.setUserItem(newTab.type + ".lastTabView", this.fileView), riot.mount("#js-tab-nav", "file-view-toggle"), 
            riotctrl.on("update-mru-list", this.onRecents, this), riotctrl.on("file-view-change", this.onFileViewChange, this), 
            riotctrl.trigger("file-view-change", this.fileView), this.trigger("loading-complete");
        } else "unmount" === evt && (riotctrl.off("update-mru-list", this.onRecents, this), 
        riotctrl.off("file-view-change", this.onFileViewChange, this), riotctrl.off("update-i18n-retro", this.onLoc, this), 
        this.off("*"));
    }), this.onRecents = function() {
        _this.fileListEmpty = _this.isCurrentListEmpty(), _this.update();
    }, this.onFileViewChange = function(viewType) {
        _this.fileView = viewType, _this.update();
    }, this.onLoc = function() {
        _this.emptyListText = iaw.i18n.getLocalizedString("empty_recentfile_subtitle"), 
        _this.isMounted && _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("mobilecreations-grid-item", '<div if="{isPageView && !pageFailure}" class="iaw-Grid-overlay" onclick="{clicked}" onmouseover="{creativeSyncHover}" data-tip="{cloudSyncText}"> <div class="iaw-Grid-overlay-creativeSync" riot-style="background-image: url(\'{creativeSyncThumb()}\')"></div> </div> <div if="{!isPageView && !isDirty}" class="iaw-Grid-thumbnail-img-overlay" onclick="{clicked}"></div> <div if="{!isPageView && isDirty}" class="iaw-Grid-thumbnail-img-overlay" onclick="{clicked}" data-tip="{pageFailureText}"></div> <div if="{isClicked && !pageFailure}" class="iaw-Grid-overlay-loading"> <div class="activity-indicator__dotsplusText"> <div class="activity-indicator__dots"></div> <div class="activity-indicator__dotsText"> <raw-text content="{loaderText}"></raw-text> </div> </div> </div> <div if="{!isPageView}" class="iaw-Grid-thumbnail-margin-bottom iaw-Grid-thumbnail-img-container" onclick="{clicked}"> <div class="iaw-Grid-thumbnail-img iaw-Grid-thumbnail-img1"></div> <div class="iaw-Grid-thumbnail-img iaw-Grid-thumbnail-img2"></div> <div class="iaw-Grid-thumbnail-img iaw-Grid-thumbnail-img3"></div> <div if="{!isDirty}" class="iaw-Grid-thumbnail-img iaw-Grid-thumbnail-img4" riot-style="background-image: url(\'{thumbnail()}\')"></div> <div if="{isDirty}" class="iaw-Grid-thumbnail-img iaw-Grid-thumbnail-img4" style="background-image: url(\'./images/thumbs/Warning_LightUI.svg\'); background-size: 50px 50px;" onmouseover="{showError}"></div> </div> <div if="{isPageView && !pageFailure}" class="iaw-Grid-thumbnail" riot-style="background-image: url(\'{thumbnail()}\')" onclick="{clicked}" onmouseover="{creativeSyncHover}" onmouseout="{creativeSyncBlank}"></div> <div if="{isPageView && pageFailure}" class="iaw-Grid-thumbnail" style="background-image: url(\'./images/thumbs/Warning_LightUI.svg\'); background-size: 50px 50px;" onmouseover="{showError}"></div> <div if="{!isPageView}" class="iaw-Grid-name" onclick="{clicked}">{opts.data.name}</div> <div if="{!isPageView}" class="iaw-Grid-pageCountTag" onclick="{clicked}">{opts.data.pageCount}</div> <div if="{!isPageView}" class="iaw-Grid-productTag" onclick="{clicked}">{iaw.data.mobileAssets.assetProductTag[opts.data.type]}</div>', "", 'if="{!opts.data.error}" class="card grid-cell grid-cell--autoSize" data-tip="{opts.data.tip}"', function(opts) {
    var _this = this;
    this.isPageView = !opts.data.name || "" === opts.data.name, this.action = opts.data.action || iaw.mobileAssetEvents.UNKNOWN_ERROR, 
    this.id = opts.data.identifierData, this.name = opts.data.name, this.isClicked = !1, 
    this.isDirty = opts.data.isDirty, this.pageFailure = opts.data.pageFailure, this.ingestEventType = this.isPageView ? "pages" : "project", 
    this.onMouseOver = !1, this.pageFailureText = "", this.loaderText = "", this.cloudSyncText = "", 
    this.index = opts.data.index || -1, iaw.analytics.ingest.logMobileCreationsRenderedEvent(this.ingestEventType, null), 
    this.clicked = function(evt) {
        if (_this.isPageView) {
            var previousData = iaw.data.mobileAssets.loadingUIItemRef;
            previousData && (previousData.isClicked = !1, previousData.update()), _this.isClicked = !0, 
            _this.onMouseOver = !1, iaw.data.mobileAssets.loadingUIItemRef = _this, _this.update();
        }
        iaw.analytics.ingest.logMobileCreationsClickedEvent(_this.ingestEventType, {
            itemPosition: _this.index
        }), riotctrl.trigger(_this.action, _this.id, _this.name);
    }, this.creativeSyncThumb = function() {
        return _this.isClicked ? "" : _this.onMouseOver ? "./images/thumbs/cloudSync.svg" : void 0;
    }, this.creativeSyncHover = function() {
        _this.onMouseOver = !0, _this.update();
    }, this.creativeSyncBlank = function() {
        _this.onMouseOver = !1, _this.update();
    }, this.thumbnail = function() {
        return opts.data.thumb;
    }, this.showError = function() {
        _this.pageFailure = iaw.data.mobileAssets.errorStates.pageFailure, (_this.pageFailure || _this.isDirty) && (opts.data.tip = _this.pageFailureText, 
        _this.update());
    }, this.onClearStates = function() {
        if (_this.isPageView) {
            var previousData = iaw.data.mobileAssets.loadingUIItemRef;
            previousData && (previousData.isClicked = !1, previousData.onMouseDown = !1, previousData.onMouseOver = !1, 
            previousData.update());
        }
    }, riotctrl.on("update-i18n-retro", function() {
        this.pageFailureText = iaw.i18n.getLocalizedString("mobile_creation_file_not_found"), 
        this.loaderText = iaw.i18n.getLocalizedString("mobile_creation_page_loader"), this.cloudSyncText = iaw.i18n.getLocalizedString("mobile_creation_creative_sync"), 
        this.isMounted && this.update();
    }, this), this.on("mount unmount", function(evt) {
        "mount" === evt ? riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES, this.onClearStates, this) : "unmount" === evt && (this.off("*"), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES, this.onClearStates, this));
    });
}), riot.tag2("mobilecreations-grid", '<mobilecreations-grid-item each="{items}" data="{this}"></mobilecreations-grid-item> <div class="load-more-spinner--container" if="{iaw.data.mobileAssets.hasMoreProjects && !isPageView && iaw.data.mobileAssets.projectResponseReceived}"> <div if="{loadingMoreProjects}" class="activity-indicator__radial"></div> <div if="{loadingMoreFailure}" class="mobilecreations--errorStates--container"> <div class="mobilecreations--errorStates--icon" style="background-image: url(\'./images/thumbs/Warning_LightUI.svg\');"></div> <h4 class="mobilecreations--errorStates--text"> <raw-text content="{errorStateText}"></raw-text> </h4> <div class="mobilecreations--errorStates--tryAgain"> <raw-text content="{tryAgainText}" onclick="{loadMoreTryAgain}"></raw-text> </div> </div> </div>', "", 'class="grid"', function(opts) {
    var _this = this;
    this.mixin("scroll-end"), this.items = [], this.isPageView = !1, this.loadingMoreProjects = !1, 
    this.loadingMoreFailure = !1, this.errorStateText = "", this.tryAgainText = "", 
    this.updateAndScrollUpdate = function() {
        _this.update(), iaw.motor.kick();
    }, this.updateGridData = function() {
        var itemData;
        itemData = _this.isPageView ? iaw.data.mobileAssets.pagesData : iaw.data.mobileAssets.projectsData, 
        itemData && 0 !== itemData.length && (_this.items = itemData, _this.updateAndScrollUpdate());
    }, this.onSyncReq = function() {
        _this.isPageView || (_this.items = [], _this.updateAndScrollUpdate());
    }, this.onProjReq = function() {
        _this.items = [], iaw.data.mobileAssets.pageView ? _this.isPageView = !0 : _this.isPageView = !1, 
        _this.updateAndScrollUpdate();
    }, this.onPagesReq = function() {
        _this.items = [], _this.isPageView = !0, _this.updateAndScrollUpdate();
    }, this.onPageReq = function() {
        _this.isPageView = !0, _this.update();
    }, this.onProjectRes = function() {
        _this.isPageView = !1, _this.updateGridData();
    }, this.onPagesRes = function() {
        _this.isPageView = !0, _this.updateGridData();
    }, this.loadMoreProjects = function() {
        if (!_this.isPageView && iaw.data.mobileAssets.projectResponseReceived) {
            if (_this.loadingMoreProjects) return;
            iaw.data.mobileAssets.hasMoreProjects && (_this.loadingMoreProjects = !0, _this.loadingMoreFailure = !1, 
            _this.update(), riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_REQUEST));
        }
    }, this.loadMoreTryAgain = function() {
        iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getProjectsByIndex && (_this.loadingMoreFailure = !1, 
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTryAgainOnMCClick.subCategory, iaw.analytics.pipQuery.pipTryAgainOnMCClick.eventName), 
        _this.updateAndScrollUpdate(), riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_REQUEST));
    }, this.loadMoreProjectsResponse = function() {
        _this.loadingMoreProjects = !1, _this.updateGridData();
    }, this.loadMoreProjectsFailure = function() {
        _this.loadingMoreFailure = !0, iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTimeOutOnMCClick.subCategory, iaw.analytics.pipQuery.pipTimeOutOnMCClick.eventName), 
        _this.loadingMoreProjects = !1, _this.update();
    }, this.onClearStates = function() {
        _this.loadingMoreProjects = !1, _this.loadingMoreFailure = !1, _this.update();
    }, this.checkPaneSize = function() {
        var scrollPane = document.querySelector(".scroll-pane"), paneHeight = scrollPane.offsetHeight;
        0 !== paneHeight && _this.loadMoreProjects();
    }, this.on("updated", this.checkPaneSize), this.on("scroll-end", this.loadMoreProjects), 
    this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("update-cards-retro", this.updateGridData, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.onSyncReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.onProjReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGE_REQUEST, this.onPageReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.onProjectRes, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.onPagesReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.onPagesRes, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_RESPONSE, this.loadMoreProjectsResponse, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_LOADMORE_PROJECTS_FAILURE, this.loadMoreProjectsFailure, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES, this.onClearStates, this)) : "unmount" === evt && (this.off("*"), 
        riotctrl.off("update-cards-retro", this.updateGridData, this), riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.onSyncReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.onProjReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGE_REQUEST, this.onPageReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.onProjectRes, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.onPagesReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.onPagesRes, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_RESPONSE, this.loadMoreProjectsResponse, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_LOADMORE_PROJECTS_FAILURE, this.loadMoreProjectsFailure, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES, this.onClearStates, this));
    }), riotctrl.on("update-i18n-retro", function() {
        this.errorStateText = iaw.i18n.getLocalizedString("mobile_creation_network"), this.tryAgainText = iaw.i18n.getLocalizedString("mobile_creation_try_again"), 
        this.isMounted && this.update();
    }, this);
}), riot.tag2("mobilecreations-nav", '<div if="{displayNote}" class="note-text"> <raw-text content="{noteText}"></raw-text> </div> <div if="{displayBack}" class="iaw-back-button" style="background-image: url(\'./images/thumbs/BackButton.svg\')" onclick="{backClicked}"></div> <span if="{displayBack}" class="project-heading" onclick="{backClicked}"> <raw-text content="{projectName}"></raw-text> </span>', "", "", function(opts) {
    var _this = this;
    this.displayNote = !0, this.displayBack = !1, this.noteText = "", this.projectName = "", 
    this.showNote = function() {
        _this.displayNote = !iaw.data.mobileAssets.projectsData || 0 !== iaw.data.mobileAssets.projectsData.length, 
        _this.update();
    }, this.backClicked = function() {
        iaw.data.mobileAssets.pageView = !1, iaw.mobileAssetMgr.clearPagesAndPageStates(), 
        iaw.mobileAssetMgr.statesInSyncing();
    }, this.onSyncReq = function() {
        iaw.data.mobileAssets.pageView ? _this.displayBack = !0 : _this.displayBack = !1, 
        _this.displayNote = !1, _this.update();
    }, this.onProjectsReq = function() {
        _this.displayBack = !1, _this.displayNote = !1, _this.update();
    }, this.onPagesRes = function() {
        _this.displayBack = !0, _this.displayNote = !1, _this.update();
    }, this.onProjectsRes = function() {
        _this.displayBack = !1, _this.showNote(), _this.update();
    }, this.onPagesReq = function(id, name) {
        _this.projectName = name || "", _this.displayNote = !1, _this.update();
    }, this.onLoc = function() {
        _this.noteText = iaw.i18n.getLocalizedString("mobile_creation_apps"), _this.isMounted && _this.update();
    }, this.onErrors = function() {
        iaw.data.mobileAssets.pageView && (_this.displayBack = !0, _this.displayNote = !1, 
        _this.update());
    }, this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.onSyncReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES, this.onErrors, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.onProjectsReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.onPagesRes, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.onProjectsRes, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.onPagesReq, this)) : "unmount" === evt && (riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.onSyncReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES, this.onErrors, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.onProjectsReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.onPagesRes, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.onProjectsRes, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.onPagesReq, this), 
        riotctrl.off("update-i18n-retro", this.onLoc, this));
    }), riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("no-mobile-asset", '<div class="noMobAsset__container"> <h4>{title}</h4> <span class="noMobAsset__desc">{desc}</span> <div class="noMobAsset__cards"> <div class="noMobAsset__app-card"> <img src="./images/empty-state/draw.png"> <h5>{adobeDraw}</h5> <span>{draw}</span> </div> <div class="noMobAsset__app-card"> <img src="./images/empty-state/sketch.png"> <h5>{adobeSketch}</h5> <span>{sketch}</span> </div> <div class="noMobAsset__app-card"> <img src="./images/empty-state/comp.png"> <h5>{adobeComp}</h5> <span>{comp}</span> </div> </div> <div class="noMobAsset__buttons"> <div class="noMobAsset__app-button"> <button class="spc-button spc-button--primary" onclick="{clickDrawIOS}"> {getiOSDraw} </button> <button class="spc-button spc-button--primary" onclick="{clickDrawAnd}"> {getAndroidDraw} </button> </div> <div class="noMobAsset__app-button"> <button class="spc-button spc-button--primary" onclick="{clickSketchIOS}"> {getiOSSketch} </button> <button class="spc-button spc-button--primary" onclick="{clickSketchAnd}"> {getAndroidDraw} </button> </div> <div class="noMobAsset__app-button"> <button class="spc-button spc-button--primary" onclick="{clickCompIOS}"> {getiOSComp} </button> <button class="spc-button spc-button--primary" onclick="{clickCompAnd}"> {getAndroidDraw} </button> </div> </div> </div>', "", "", function(opts) {
    var _this = this;
    this.title = "", this.desc = "", this.draw = "", this.sketch = "", this.comp = "", 
    this.getiOSDraw = "", this.getiOSSketch = "", this.getiOSComp = "", this.getAndroidDraw = "", 
    this.adobeDraw = "", this.adobeSketch = "", this.adobeComp = "", this.goiOSDraw = "", 
    this.goiOSSketch = "", this.goiOSComp = "", this.goAndroidDraw = "", this.goAndroidSketch = "", 
    this.goAndroidComp = "", this.openBrowser = function(appKey) {
        var url = null;
        switch (appKey) {
          case "comp-ios":
            url = _this.goiOSComp;
            break;

          case "sketch-ios":
            url = _this.goiOSSketch;
            break;

          case "draw-ios":
            url = _this.goiOSDraw;
            break;

          case "draw-android":
            url = _this.goAndroidDraw;
            break;

          case "comp-android":
            url = _this.goAndroidComp;
            break;

          case "sketch-android":
            url = _this.goAndroidSketch;
        }
        url && iaw.util.openDefaultBrowser(url, !1);
    }, this.clickCompIOS = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Comp",
            cardPlatform: "iOS",
            actionURL: _this.goiOSComp
        }), _this.openBrowser("comp-ios");
    }, this.clickCompAnd = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Comp",
            cardPlatform: "Android",
            actionURL: _this.goAndroidComp
        }), _this.openBrowser("comp-android");
    }, this.clickDrawIOS = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Draw",
            cardPlatform: "iOS",
            actionURL: _this.goiOSDraw
        }), _this.openBrowser("draw-ios");
    }, this.clickDrawAnd = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Draw",
            cardPlatform: "Android",
            actionURL: _this.goAndroidDraw
        }), _this.openBrowser("draw-android");
    }, this.clickSketchIOS = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Sketch",
            cardPlatform: "iOS",
            actionURL: _this.goiOSSketch
        }), _this.openBrowser("sketch-ios");
    }, this.clickSketchAnd = function(evt) {
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipGetApp.subCategory, iaw.analytics.pipQuery.pipGetApp.eventName), 
        iaw.analytics.ingest.logMobileCreationsClickedEvent("app", {
            cardName: "Sketch",
            cardPlatform: "Android",
            actionURL: _this.goAndroidSketch
        }), _this.openBrowser("sketch-android");
    }, this.onLoc = function() {
        _this.title = iaw.i18n.getLocalizedString("no_mobile_creation_title"), _this.desc = iaw.i18n.getLocalizedString("no_mobile_creation_desc"), 
        _this.draw = iaw.i18n.getLocalizedString("no_mobile_creation_draw"), _this.sketch = iaw.i18n.getLocalizedString("no_mobile_creation_sketch"), 
        _this.comp = iaw.i18n.getLocalizedString("no_mobile_creation_comp"), _this.getiOSDraw = iaw.i18n.getLocalizedString("no_mobile_creation_get_ios_draw"), 
        _this.getiOSSketch = iaw.i18n.getLocalizedString("no_mobile_creation_get_ios_sketch"), 
        _this.getiOSComp = iaw.i18n.getLocalizedString("no_mobile_creation_get_ios_comp"), 
        _this.getAndroidDraw = iaw.i18n.getLocalizedString("no_mobile_creation_get_and_draw"), 
        _this.adobeDraw = iaw.i18n.getLocalizedString("no_mobile_creation_app_name_draw"), 
        _this.adobeSketch = iaw.i18n.getLocalizedString("no_mobile_creation_app_name_sketch"), 
        _this.adobeComp = iaw.i18n.getLocalizedString("no_mobile_creation_app_name_comp"), 
        iaw.analytics.ingest.logMobileCreationsRenderedEvent("app", {
            cardName: "Sketch"
        }), iaw.analytics.ingest.logMobileCreationsRenderedEvent("app", {
            cardName: "Draw"
        }), iaw.analytics.ingest.logMobileCreationsRenderedEvent("app", {
            cardName: "Comp"
        });
        var baseURL = "http://adobe.com/go/", urlSuffix = iaw.i18n.getLangSuffixForMobileCreationsGoURL(iaw.store.get([ "host", "language" ]));
        _this.goiOSDraw = baseURL + "ai_mobilecreation_draw_ios" + urlSuffix, _this.goiOSSketch = baseURL + "ai_mobilecreation_sketch_ios" + urlSuffix, 
        _this.goiOSComp = baseURL + "ai_mobilecreation_compCC_ios" + urlSuffix, _this.goAndroidDraw = baseURL + "ai_mobilecreation_draw_android" + urlSuffix, 
        _this.goAndroidSketch = baseURL + "ai_mobilecreation_sketch_android" + urlSuffix, 
        _this.goAndroidComp = baseURL + "ai_mobilecreation_comp_android" + urlSuffix, _this.isMounted && _this.update();
    }, this.on("mount unmount", function(evt) {
        "mount" === evt ? riotctrl.on("tab-change", this.update, this) : "unmount" === evt && (riotctrl.off("update-i18n-retro", this.onLoc), 
        riotctrl.off("tab-change", this.update));
    }), riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("tab-mobilecreations", '<div if="{isLoading}" class="activity-indicator__radialText"> <div class="activity-indicator__radial"></div> <div class="activity-indicator__text"> <raw-text content="{loaderText}"></raw-text> </div> </div> <div if="{errorState  && !filenotFound}" class="mobilecreations--errorStates--container"> <div class="mobilecreations--errorStates--icon" style="background-image: url(\'./images/thumbs/Warning_LightUI.svg\');"></div> <div class="mobilecreations--errorStates--text"> <raw-text content="{errorStateText}"></raw-text> </div> <div class="mobilecreations--errorStates--tryAgain"> <raw-text content="{tryAgainText}" onclick="{clicked}"></raw-text> </div> </div> <div if="{errorState  && filenotFound}" class="mobilecreations--errorStates--container"> <div class="mobilecreations--errorStates--icon" style="background-image: url(\'./images/thumbs/Warning_LightUI.svg\');"></div> <div class="mobilecreations--errorStates--text"> <raw-text content="{fileNotFoundText}"></raw-text> </div> </div> <no-mobile-asset if="{!errorState && fileListEmpty && !isLoading}"></no-mobile-asset> <mobilecreations-grid if="{!errorState && !fileListEmpty}"></mobilecreations-grid>', "", "", function(opts) {
    var _this = this;
    this.tabType = "mobilecreations", this.fileListEmpty = !1, this.fileView = "grid", 
    this.isLoading = !1, this.errorState = !1, this.filenotFound = !1, this.errorStateText = "", 
    this.tryAgainText = "", this.fileNotFoundText = "", this.loaderText = "", this.updateAndScrollUpdate = function() {
        _this.update(), iaw.motor.kick();
    }, this.takeReq = function() {
        _this.isLoading = !0, _this.fileListEmpty = !1, _this.errorState = !1, _this.updateAndScrollUpdate();
    }, this.syncReq = function() {
        iaw.data.mobileAssets.pageView ? _this.isLoading = !1 : _this.isLoading = !0, _this.fileListEmpty = !1, 
        _this.errorState = !1, _this.updateAndScrollUpdate();
    }, this.projectRes = function() {
        _this.isLoading = !1, _this.fileListEmpty = iaw.data.mobileAssets.projectsData && 0 === iaw.data.mobileAssets.projectsData.length, 
        _this.errorState = !1, _this.updateAndScrollUpdate();
    }, this.pagesRes = function() {
        _this.isLoading = !1, _this.fileListEmpty = !1, _this.errorState = !1, _this.updateAndScrollUpdate();
    }, this.errors = function() {
        iaw.data.mobileAssets.errorStates.projDeleted ? _this.filenotFound = !0 : (_this.filenotFound = !1, 
        iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.sync ? iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTimeOutOnMCClick.subCategory, iaw.analytics.pipQuery.pipTimeOutOnMCClick.eventName) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getProjects ? iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTimeOutOnMCClick.subCategory, iaw.analytics.pipQuery.pipTimeOutOnMCClick.eventName) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getPages ? iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTimeOutOnProjectClick.subCategory, iaw.analytics.pipQuery.pipTimeOutOnProjectClick.eventName) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getPage && iaw.data.mobileAssets.tryAgainData.id && (iaw.analytics.pipQuery.pipTimeOutOnFileClick.eventName = iaw.data.mobileAssets.syncGroupMap[iaw.data.mobileAssets.tryAgainData.id.syncGroup], 
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTimeOutOnFileClick.subCategory, iaw.analytics.pipQuery.pipTimeOutOnFileClick.eventName))), 
        _this.errorState = !0, _this.isLoading = !1, _this.fileListEmpty = !1, _this.updateAndScrollUpdate();
    }, this.clicked = function() {
        iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.sync ? (iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTryAgainOnMCClick.subCategory, iaw.analytics.pipQuery.pipTryAgainOnMCClick.eventName), 
        iaw.mobileAssetMgr.requestMgr.states.getProjects.start = !0, _this.takeReq(), iaw.mobileAssetMgr.initiateSync()) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getProjects ? (iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTryAgainOnMCClick.subCategory, iaw.analytics.pipQuery.pipTryAgainOnMCClick.eventName), 
        riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST)) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getPages ? (_this.takeReq(), 
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTryAgainOnProjectClick.subCategory, iaw.analytics.pipQuery.pipTryAgainOnProjectClick.eventName), 
        iaw.mobileAssetMgr.getPages(iaw.data.mobileAssets.tryAgainData.id)) : iaw.data.mobileAssets.tryAgainData.state === iaw.mobileAssetMgr.requestMgr.states.getPage && iaw.data.mobileAssets.tryAgainData.id && (_this.fileListEmpty = !1, 
        _this.errorState = !1, _this.updateAndScrollUpdate(), iaw.analytics.pipQuery.pipTryAgainOnFileClick.eventName = iaw.data.mobileAssets.syncGroupMap[iaw.data.mobileAssets.tryAgainData.id.syncGroup], 
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTryAgainOnFileClick.subCategory, iaw.analytics.pipQuery.pipTryAgainOnFileClick.eventName), 
        iaw.mobileAssetMgr.getPage(iaw.data.mobileAssets.tryAgainData.id));
    }, riotctrl.on("update-i18n-retro", function() {
        this.errorStateText = iaw.i18n.getLocalizedString("mobile_creation_network"), this.tryAgainText = iaw.i18n.getLocalizedString("mobile_creation_try_again"), 
        this.fileNotFoundText = iaw.i18n.getLocalizedString("mobile_creation_file_not_found"), 
        this.loaderText = iaw.i18n.getLocalizedString("mobile_creation_syncing"), this.isMounted && this.update();
    }, this), this.on("mount unmount", function(evt) {
        "mount" === evt ? (riot.mount("#js-tab-nav", "mobilecreations-nav"), iaw.localstorage.setUserItem(this.tabType + ".lastTabView", "grid"), 
        iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipTry.subCategory, iaw.analytics.pipQuery.pipTry.eventName), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES, this.errors, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.syncReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.takeReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.takeReq, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.pagesRes, this), 
        riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.projectRes, this), 
        iaw.log.console("from: statesInSyncing.."), iaw.mobileAssetMgr.statesInSyncing(), 
        riotctrl.trigger("file-view-change", this.fileView)) : "unmount" === evt && (this.off("*"), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES, this.errors, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_SYNC_REQUEST, this.takeReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, this.takeReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, this.takeReq, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE, this.pagesRes, this), 
        riotctrl.off(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE, this.projectRes, this), 
        iaw.mobileAssetMgr.clearPagesAndPageStates());
    });
}), riot.tag2("empty-recentfile", '<div class="recentfile-empty__container"> <video id="video-elem" if="{hostID === \'MUSE\' && videoURL}" width="800px" height="auto" controls onclick="this.paused ? this.play() : this.pause();" onplay="{onPlay}" onpause="{onPause}"> <source riot-src="{videoURL}" type="video/mp4"> </video> <img if="{hostID === \'MUSE\' && !videoURL}" riot-src="{videoHeroURL}" alt=""> <div class="recentfile-empty__info"> <h4>{titleText}</h4> <span>{subtitleText}</span> </div> <div class="grid grid--row"> <div class="recentfile-empty__card"> <svg if="{hostID !== \'MUSE\'}" version="1.1" x="0px" y="0px" viewbox="0 0 1152 1152" xml:space="preserve"><g> <path d="M432,0v264c0,0,0,24-24,24s-264,0-264,0L432,0z"></path> <path d="M384,864c0-211.733,172.266-384,384-384c69.973,0,135.441,19.118,192,51.96c0-217.838,0-462.379,0-483.96c0-48-48-48-48-48 H528v288c0,0,0,96-96,96c-76.806,0-288,0-288,0s0,576,0,624s48,48,48,48h243.959C403.117,999.442,384,933.974,384,864z"></path> <path d="M768,576c-159.024,0-288,128.904-288,288s128.976,288,288,288s288-128.904,288-288S927.024,576,768,576z M948,912H816v132 c0,6.627-5.373,12-12,12h-72c-6.627,0-12-5.373-12-12V912H588c-6.627,0-12-5.373-12-12v-72c0-6.627,5.373-12,12-12h132V684 c0-6.627,5.373-12,12-12h72c6.627,0,12,5.373,12,12v132h132c6.627,0,12,5.373,12,12v72C960,906.627,954.627,912,948,912z"></path> </g></svg> <span>{newFileText}</span> <button name="button" class="spc-button spc-button--primary" onclick="{createFile}">{btnNewLabel}</button> </div> </div> </div>', "", "", function(opts) {
    var _this = this;
    this.mixin("cooldown"), this.hostID = "", this.titleText = "", this.subtitleText = "", 
    this.newFileText = "", this.presetText = "", this.btnNewLabel = "", this.btnPresetLabel = "", 
    this.videoURL = null, this.videoHeroURL = null, this.createFile = function() {
        _this.isCoolingDown(0) || (_this.button.blur(), iaw.analytics.ingest.logItemOpenedEvent({
            openType: "new",
            fileType: "",
            sectionView: "createNew",
            ucAction: "emptyState"
        }), riotctrl.trigger("createButtonNewdocs"));
    }, this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("resize-breakpoint-retro", this.recalc, this), riotctrl.on("play-all-media", this.playMedia, this), 
        riotctrl.on("pause-all-media", this.pauseMedia, this), riotctrl.on("tab-change", this.pauseMedia, this)) : "unmount" === evt && (riotctrl.off("update-i18n-retro", this.updateI18n, this), 
        riotctrl.off("resize-breakpoint-retro", this.recalc, this), riotctrl.off("play-all-media", this.playMedia, this), 
        riotctrl.off("pause-all-media", this.pauseMedia, this), riotctrl.off("tab-change", this.pauseMedia, this), 
        this.off("*"));
    }), this.updateI18n = function() {
        _this.hostID = iaw.store.get([ "host", "hostID" ]), "MUSE" !== _this.hostID ? (_this.titleText = iaw.i18n.getLocalizedString("empty_recentfile_title"), 
        _this.subtitleText = iaw.i18n.getLocalizedString("empty_recentfile_subtitle"), _this.newFileText = iaw.i18n.getLocalizedString("empty_recentfile_new_sub"), 
        _this.presetText = iaw.i18n.getLocalizedString("empty_recentfile_ccfiles_sub"), 
        _this.btnNewLabel = iaw.i18n.getLocalizedString("empty_recentfile_cta_new"), _this.btnPresetLabel = iaw.i18n.getLocalizedString("empty_recentfile_cta_ccfiles")) : (_this.titleText = iaw.i18n.getLocalizedString("empty_recentfile_title_MUSE"), 
        _this.subtitleText = iaw.i18n.getLocalizedString("empty_recentfile_subtitle_MUSE"), 
        _this.btnNewLabel = iaw.i18n.getLocalizedString("empty_recentfile_button_startnow"), 
        "en_US" === iaw.store.get([ "host", "language" ]) && (_this.videoURL = iaw.store.get([ "host", "tabs", "recentfile", "videoURL" ]), 
        _this.videoURL || (_this.videoURL = null)), _this.videoHeroURL = iaw.store.get([ "host", "tabs", "recentfile", "videoHeroURL" ]), 
        _this.videoHeroURL || (_this.videoHeroURL = "./images/empty-state/video-hero-MUSE.jpg")), 
        _this.isMounted && _this.update();
    }, this.recalc = function(prevPoint, newPoint) {
        _this.update();
    }, this.pauseMedia = function() {
        var videoElement = document.getElementById("video-elem");
        videoElement && !videoElement.paused && videoElement.pause();
    }, this.playMedia = function() {
        var videoElement = document.getElementById("video-elem");
        videoElement && videoElement.paused && videoElement.play();
    }, this.onPlay = function() {
        iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-section",
            eventAction: "click",
            ucAction: "video-start"
        });
    }, this.onPause = function() {
        iaw.analytics.ingest.logMiscellaneousEvent({
            eventType: "uc-section",
            eventAction: "click",
            ucAction: "video-stop"
        });
    }, riotctrl.on("update-i18n-retro", this.updateI18n, this);
}), riot.tag2("tab-recentfile", '<div if="{!fileListEmpty && fileView === \'list\'}"> <file-table></file-table> </div> <div if="{!fileListEmpty && fileView === \'grid\'}" class="grid grid--gutter"> <file-grid></file-grid> </div> <empty-recentfile if="{fileListEmpty}"></empty-recentfile>', "", "", function(opts) {
    var _this = this;
    this.tabType = "recentfile", this.fileListEmpty = !1, this.fileView = "grid", this.isCurrentListEmpty = function() {
        var tab = iaw.store.get([ "host", "tabs", _this.tabType ]) || null;
        return !tab || !tab.list || 0 === tab.list.length;
    }, this.on("mount unmount", function(evt) {
        if ("mount" === evt) {
            var newTab = iaw.store.get([ "host", "tabs", this.tabType ]) || null;
            this.fileListEmpty = this.isCurrentListEmpty(), this.fileView = iaw.localstorage.getUserItem(this.tabType + ".lastTabView") || "grid", 
            "list" !== this.fileView || newTab.listViewEnabled ? "grid" !== this.fileView || newTab.thumbnailViewEnabled || (this.fileView = "list") : this.fileView = "grid", 
            iaw.localstorage.setUserItem(newTab.type + ".lastTabView", this.fileView), riot.mount("#js-tab-nav", "file-view-toggle"), 
            riotctrl.on("update-mru-list", this.onListUpdate, this), riotctrl.on("file-view-change", this.onViewChange, this), 
            riotctrl.trigger("file-view-change", this.fileView);
        } else "unmount" === evt && (riotctrl.off("update-mru-list", this.onListUpdate, this), 
        riotctrl.off("file-view-change", this.onViewChange, this), this.off("*"));
    }), this.onListUpdate = function() {
        _this.fileListEmpty = _this.isCurrentListEmpty(), _this.update();
    }, this.onViewChange = function(viewType) {
        _this.fileView = viewType, _this.update();
    };
}), riot.tag2("tabs", '<div class="iaw-tabs__tab-bar" role="tablist"> <a role="tab" aria-selected="{tab.active ? \'true\' : \'false\'}" tabindex="{tab.active ? \'0\' : \'-1\'}" onclick="{parent.click}" onkeydown="{parent.keydown}" class="iaw-tab {iaw-tab_active: tab.active}" each="{tab in tabs}" content="{tab}" aria-controls="{parent.ariaControlsId}"><span>{tab.name}</span></a> <div class="iaw-tabs__line" role="presentation"></div> </div>', "", 'class="iaw-tabs"', function(opts) {
    var _this = this;
    this.tabs = [], this.restoreFocus = !1, this.ariaControlsId, this.updateLine = function() {
        var lineEl = document.getElementsByClassName("iaw-tabs__line")[0], activeTab = document.getElementsByClassName("iaw-tab_active")[0];
        activeTab && (lineEl && activeTab && (lineEl.style.top = activeTab.offsetTop + "px"), 
        _this.restoreFocus && (_this.restoreFocus = !1, activeTab.focus()));
    }, this.switchTab = function(tab) {
        var i, t;
        for (i = 0; t = _this.tabs[i]; i++) t.id === tab ? t.active = !0 : t.active = !1;
        iaw.localstorage.setUserItem(iaw.store.get([ "host", "displayMode" ]) + "_lastTab", tab.toLowerCase()), 
        _this.update(), riotctrl.trigger("tab-change", tab);
    }, this.updateDocumentTitle = function(localizedTabName) {
        var hostID = iaw.store.get([ "host", "hostID" ]), productTitle = iaw.i18n.getLocalizedString("product_title_" + hostID);
        document.title = productTitle + ": " + localizedTabName;
    }, this.click = function(evt) {
        var newTab = evt.item.tab.id.toLowerCase();
        _this.restoreFocus = !0, _this.switchTab(newTab);
    }, this.keydown = function(evt) {
        var newTab, keyCode = evt.keyCode, targ = event.target, tabs = targ.parentNode.getElementsByClassName("iaw-tab");
        switch (keyCode) {
          case iaw.a11y.Keys.END:
            newTab = tabs[tabs.length - 1];
            break;

          case iaw.a11y.Keys.HOME:
            newTab = tabs[0];
            break;

          case iaw.a11y.Keys.LEFT:
          case iaw.a11y.Keys.UP:
            newTab = targ.previousSibling;
            break;

          case iaw.a11y.Keys.RIGHT:
          case iaw.a11y.Keys.DOWN:
            newTab = targ.nextSibling;
        }
        return newTab && "A" === newTab.tagName && newTab.click(), !0;
    }, this.on("updated", function(evt) {
        var ariaControls;
        this.updateLine(), document.contains(this.root) ? (ariaControls = this.root.parentNode.nextElementSibling, 
        ariaControls && ariaControls.matches(".grid-cell.scroll-container") && (this.ariaControlsId || (ariaControls.id || (ariaControls.id = "tabpanel-" + this._riot_id + "-0"), 
        this.ariaControlsId = ariaControls.id, ariaControls.setAttribute("role", "tabpanel")))) : (ariaControls = document.getElementById(this.ariaControlsId), 
        ariaControls && "tabpanel" === ariaControls.getAttribute("role") && (ariaControls.removeAttribute("role"), 
        this.ariaControlsId = null));
    }), this.on("mount unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("update-cards-retro", this.updateTabs, this), riotctrl.on("update-i18n-retro", this.updateTabs, this), 
        riotctrl.on("change-active-tab", this.switchTab, this)) : "unmount" === evt && (riotctrl.off("update-cards-retro", this.updateTabs), 
        riotctrl.off("update-i18n-retro", this.updateTabs), riotctrl.off("change-active-tab", this.switchTab));
    }), this.updateTabs = function() {
        var displayMode = iaw.store.get([ "host", "displayMode" ]), tabType = iaw.localstorage.getUserItem(displayMode + "_lastTab") || iaw.store.get([ "host", "defaultTab" ]);
        0 !== iaw.util.currentBreakPoint && "openDoc" !== displayMode || (tabType = "recentfile");
        var tabData = iaw.store.get([ "host", "tabs" ]);
        _this.tabs.length = 0;
        for (var tabTypeID in tabData) {
            var localizedTabName = iaw.i18n.getLocalizedString(tabData[tabTypeID].label), tabItem = {
                id: tabData[tabTypeID].type,
                name: "" !== localizedTabName ? localizedTabName : tabData[tabTypeID].label,
                active: !1
            };
            _this.tabs.push(tabItem);
        }
        _this.switchTab(tabType);
    };
});