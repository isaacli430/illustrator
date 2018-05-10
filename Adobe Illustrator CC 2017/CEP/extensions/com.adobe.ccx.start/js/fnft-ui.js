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
}), riot.tag2("action-footer", '<div if="{this.isWindows}"> <button class="spc-button spc-button--cta" onclick="{onAction}" data-action="host-create-template-doc" data-i18n="create"></button> <button class="spc-button" onclick="{onAction}" data-action="host-close-fnft" data-i18n="close"></button> </div> <div if="{!this.isWindows}"> <button class="spc-button" onclick="{onAction}" data-action="host-close-fnft" data-i18n="close"></button> <button class="spc-button spc-button--cta" onclick="{onAction}" data-action="host-create-template-doc" data-i18n="create"></button> </div>', "", "", function(opts) {
    this.mixin("i18n"), this.leaf = null, this.isWindows = "win" === iaw.store.get([ "host", "platform" ]) || "windows" === iaw.store.get([ "host", "platform" ]) || !1, 
    this.onAction = function(evt) {
        var axn = evt.target.dataset.action, ingestData = {
            settings: {}
        };
        switch (iaw.util.assign(ingestData, iaw.fnft.getTemplateData(iaw.store.get([ "input", "selected-item" ]))), 
        iaw.util.assign(ingestData.settings, iaw.store.get([ "input", "settings" ])), axn) {
          case "host-close-fnft":
            iaw.analytics.ingest.logFNFTActionClickedEvent("close", ingestData), iaw.analytics.ingest.flushEvent();
            break;

          case "host-create-template-doc":
            iaw.analytics.ingest.logFNFTActionClickedEvent("preset-create", ingestData), iaw.analytics.ingest.flushEvent();
        }
        riotctrl.trigger(axn);
    }, this.on("mount before-unmount", function(evt) {
        "before-unmount" === evt && this.off("*");
    });
}), riot.tag2("container-templates", '<template-download></template-download> <div class="template-nav template-nav--{product}"> <debug-menu></debug-menu> <template-tab onkeydown="{keydown}" role="tablist" each="{tabs}" data="{this}"></template-tab> <div class="spc-tabs__line"></div> </div> <div class="gallery-container"> <div class="gallery-scroll scroll-container"> <div class="scroll-pane"> <template-grid></template-grid> </div> </div> <div id="stock-bar"> <div class="stock-bar__wrapper"> <form onsubmit="{openStockLink}"> <i class="inapp-icons inapp-icon--search" aria-hidden="true"></i> <div class="spc-textfield spc-js-textfield spc-textfield--quiet"> <input class="spc-textfield__input" tabindex="-1" type="text"> </div> <button class="spc-button spc-button--secondary" tabindex="-1" data-i18n="go"></button> </form> </div> </div> <div id="template-preview--small" class="hidden"></div> <div id="sidebar-container" class="sidebar-scroll"></div> </div> <div id="template-preview--large" class="hidden"></div> <preview-nav></preview-nav> <screen-download></screen-download> <tooltip></tooltip>', "", "", function(opts) {
    var _this = this;
    this.mixin("i18n"), this.mixin("spcmixin"), this.mixin("cooldown"), this.product = iaw.store.get([ "host", "hostID" ]).toLowerCase(), 
    this.tabs = null;
    var breakpoints = [ 0, 1050, 1334, 1589, 1845, 2101 ], breakpointMargins = [ 0, 0, 0, 0, 0, 0 ], prevWidth = 0, prevBP = 0, currentBP = -1, forceResize = !1;
    this.currentBreakpoint = function() {
        var i, w;
        for (i = 0; i < breakpoints.length; i++) w = window.innerWidth - breakpointMargins[i], 
        w > breakpoints[i] && (currentBP = i);
        currentBP < 0 && (currentBP = 0);
    }, this.checkBreakpoints = function() {
        var w = window.innerWidth;
        (forceResize || w !== prevWidth) && (prevWidth = w, _this.currentBreakpoint(), (forceResize || currentBP !== prevBP) && (iaw.util.currentBreakPoint = currentBP, 
        riotctrl.trigger("resize-breakpoint", prevBP, currentBP), prevBP = currentBP), forceResize = !1);
    }, this.checkResizeFinish = function(cyclesLeft) {
        if (cyclesLeft < 1) {
            var selected = iaw.fnft.getTemplateData(iaw.store.get([ "input", "selected-item" ])), ingestData = {
                activeFilter: iaw.store.get([ "input", "active-filter" ]),
                displayTemplate: selected.isPreset ? "preset" : "stock-template",
                cardName: selected.name || selected.title,
                attributes: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
            selected.displayPosition >= 0 && (ingestData.displayMode = selected.displayPosition), 
            iaw.analytics.ingest.logFNFTActionClickedEvent("resize-dialog", ingestData);
        }
    }, this.keydown = function(evt) {
        var newTab, keyCode = evt.keyCode, targ = _this.root.querySelector(".template-tab--active"), tabs = _this.root.querySelectorAll("template-tab");
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
        return newTab && (newTab = newTab.querySelector("a"), newTab.click(), newTab.focus()), 
        !0;
    }, this.openStockLink = function(evt) {
        if (!_this.isCoolingDown(0)) {
            var filter = iaw.store.get([ "input", "active-filter" ]), stockURL = iaw.stockUtil.openStockLink(iaw.store.get([ "host", "hostID" ]), filter, evt.target[0].value), ingestData = {
                actionURL: stockURL,
                activeFilter: filter
            };
            iaw.analytics.ingest.logFNFTActionClickedEvent("stock-search", ingestData), iaw.analytics.pip.logFNFTDataGroupEvent("Search Stock", {
                category: filter
            });
        }
    }, this.on("mount", function() {
        riotctrl.on("show-stock-bar", this.onShowStockBar, this), riotctrl.on("hide-stock-bar", this.onHideStockBar, this), 
        riotctrl.on("update-stock-search-text", this.updateStockSearchText, this), riotctrl.on("hashchange", this.onInternalLink, this), 
        this.checkBreakpoints(), iaw.motor.add(this.checkResizeFinish, this);
    }), this.on("before-unmount", function() {
        iaw.motor.remove(this.checkBreakpoints), riotctrl.off("update-host-retro", this.onHost, this), 
        riotctrl.off("show-stock-bar", this.onShowStockBar, this), riotctrl.off("hide-stock-bar", this.onHideStockBar, this), 
        riotctrl.off("update-stock-search-text", this.updateStockSearchText, this), riotctrl.off("update-i18n-retro", this.onI18n, this), 
        riotctrl.off("hashchange", this.onInternalLink, this), this.off("*"), iaw.motor.remove(this.checkResizeFinish);
    }), this.onI18n = function() {
        setTimeout(function() {
            var e = document.querySelector("#stock-bar .spc-textfield__input");
            e && e.setAttribute("placeholder", iaw.i18n.getLocalizedString("adobe_stock_find_more"));
        }, 0);
    }, this.updateStockSearchText = function(msg) {
        var e = document.querySelector("#stock-bar .spc-textfield__input");
        e && e.setAttribute("placeholder", msg || iaw.i18n.getLocalizedString("adobe_stock_find_more"));
    }, this.onShowStockBar = function() {
        var e = document.querySelector(".gallery-scroll");
        e && e.removeAttribute("style"), e = document.getElementById("stock-bar"), e && e.classList.remove("hidden");
    }, this.onHideStockBar = function() {
        var e = document.querySelector(".gallery-scroll");
        e && (e.style.marginBottom = "0px"), e = document.getElementById("stock-bar"), e && e.classList.add("hidden");
    }, this.onHost = function() {
        _this.tabs = iaw.store.get([ "host", "filters" ]), iaw.motor.add(_this.checkBreakpoints, _this), 
        forceResize = !0, _this.update();
    }, this.onInternalLink = function(params) {
        if (params.category) {
            for (var cats = _this.tabs.slice(), i = 0; i < cats.length; i++) if ("recent" === cats[i].type || "saved" === cats[i].type) {
                var idx = cats.indexOf(cats[i]);
                idx !== -1 && cats.splice(idx, 1), i = -1;
            }
            riotctrl.trigger(iaw.fnftEvents.FILTER, cats[params.category].type);
        }
    }, riotctrl.on("update-host-retro", this.onHost, this), riotctrl.on("update-i18n-retro", this.onI18n, this);
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
};

riot.tag2("preset-form-idsn", '<div class="sidebar-padding" if="{!presetMode}"> <h6 class="spc-typography--caption preset-form__caption" data-tip="{tipDocPreset}">{heading}</h6> </div> <form name="docsettings" class="docsettings__form" onchange="{validateNumericFields}" onkeypress="{formKeypressHandler}" onclick="{formClickHandler}"> <div class="preset-disclosure" if="{presetMode}"> <h6 class="spc-typography--caption preset-form__caption">{presetHeading}</h6> <div class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet" id="presetNameTextField"> <input id="formPresetName" class="spc-textfield__input" type="text" spellcheck="false" onkeyup="{testValidPresetName}" value="{defaultPresetName}"> <span class="spc-textfield__error">{presetCollisionLabel}</span> </div> <div class="preset-button-container" if="{!isWindows}"> <button id="presetSaveCancel" class="spc-button" onclick="{toggleSavePreset}">{cancel}</button> <button id="presetSaveCommit" class="spc-button spc-button--cta" onclick="{savePreset}">{savePresetLabel}</button> </div> <div class="preset-button-container" if="{isWindows}"> <button id="presetSaveCommit" class="spc-button spc-button--cta" onclick="{savePreset}">{savePresetLabel}</button> <button id="presetSaveCancel" class="spc-button" onclick="{toggleSavePreset}">{cancel}</button> </div> </div> <div name="docsettingsScrollContainer" class="form-preset__container scroll-container"> <div class="scroll-pane"> <div if="{!presetMode}" class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet document-name"> <input name="formName" class="spc-textfield__input ps-document-name__input" type="text" spellcheck="false" onchange="{validateName}" onclick="{selectInput}" value="{defaultDocumentName}" onfocus="{onFocusScrollUp}"> <i class="inapp-icons inapp-icon--preset docsettings__save-preset-button" data-tip="{tipSavePreset}" onclick="{toggleSavePreset}"></i> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-4-padding"> <span class="docsettings__field-label spc-textfield--left-label">{widthLabel}</span> </div> <div class="docsettings--grow-5"> <span class="docsettings__field-label spc-textfield--left-label">{unitsLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="spc-textfield spc-js-textfield spc-textfield__text"> <input name="formWidth" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" class="spc-textfield__input" type="text" min="{this.convertedMinDocWidth}" max="{this.convertedMaxDocWidth}" value="{this.getUserVisibleNumericValue(currentWidth)}" onfocus="{onFocusScrollUp}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> <div class="docsettings--grow-5 docsettings--stretch"> <div name="unitDropdown" onchange="{unitDropdownHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0" onfocus="{onFocusScrollUp}"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{widthLabel}</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div class="{is-checked: defaultUnits === unit.value, spc-dropdown__option:true}" data-value="{unit.value}" each="{unit in localizedUnits}" if="{unit.value !== \'columnsUnit\'}"> {unit.localizedValue} </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-4-padding"> <span class="docsettings__field-label spc-textfield--left-label">{heightLabel}</span> </div> <div class="docsettings--grow-5"> <span class="docsettings__field-label spc-textfield--left-label">{orientationLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="spc-textfield spc-js-textfield spc-textfield__text"> <input name="formHeight" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" class="spc-textfield__input" type="text" min="{this.convertedMinDocHeight}" max="{this.convertedMaxDocHeight}" value="{this.getUserVisibleNumericValue(currentHeight)}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onfocus="{onFocusScrollUp}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> <div class="docsettings--grow-5 docsettings--stretch"> <div class="docsettings__row docsettings__row--orientation"> <div class="docsettings--grow-1 docsettings__orientation-input" name="orientationInput"> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationPortrait"> <input id="orientationPortrait" type="checkbox" value="portrait" class="spc-icon-toggle__input" onchange="{orientationChangeHandler}" checked> <i class="spc-icon-toggle__label inapp-icons inapp-icon--portrait" data-tip="{tipPotrait}"></i> </label> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationLandscape"> <input id="orientationLandscape" type="checkbox" value="landscape" class="spc-icon-toggle__input" onchange="{orientationChangeHandler}"> <i class="spc-icon-toggle__label inapp-icons inapp-icon--landscape" data-tip="{tipLandscape}"></i> </label> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-4-padding"> <span class="docsettings__field-label spc-textfield--left-label">{pageLabel}</span> </div> <div class="docsettings--grow-5"> <span class="docsettings__field-label spc-textfield--left-label">{facingLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield"> <input name="pageInput" class="spc-textfield__input" type="text" onwheel="{incrementSupport(false, 1, 10)}" onkeydown="{incrementSupport(false, 1, 10)}" onkeyup="{incrementSupport()}" min="{this.pageMin}" max="{this.pageMax}" value="{pageCount}" onfocus="{onFocusScrollUp}" onclick="{selectInput}" spellcheck="false"> </div> </div> </div> </div> <div class="docsettings--grow-5 docsettings--stretch"> <div class="docsettings--grow-2"> <div class="docsettings__row"> <label class="spc-checkbox spc-js-checkbox" class="{is-checked: facingValue, spc-checkbox, spc-js-checkbox}" for="facingInput" onchange="{facingChangeHandler}"> <input type="checkbox" __checked="{facingValue}" id="facingInput" class="spc-checkbox__input" onfocus="{onFocusScrollUp}"> </label> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-4-padding"> <span class="docsettings__field-label spc-textfield--left-label">{startPageLabel}</span> </div> <div class="docsettings--grow-5"> <span class="docsettings__field-label spc-textfield--left-label">{textLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield"> <input name="startPageInput" class="spc-textfield__input" type="text" onwheel="{incrementSupport(false, 1, 10)}" onkeydown="{incrementSupport(false, 1, 10)}" onkeyup="{incrementSupport()}" min="{this.startPageMin}" max="{this.startPageMax}" value="{startPageCount}" onfocus="{onFocusScrollUp}" onclick="{selectInput}" spellcheck="false"> </div> </div> </div> </div> <div class="docsettings--grow-5 docsettings--stretch"> <div class="docsettings--grow-2"> <div class="docsettings__row"> <label class="spc-checkbox spc-js-checkbox" class="{is-checked: textFrameValue, spc-checkbox, spc-js-checkbox}" for="textFrameInput" onchange="{textFrameChangeHandler}"> <input type="checkbox" __checked="{textFrameValue}" id="textFrameInput" class="spc-checkbox__input" onfocus="{onFocusScrollUp}"> </label> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing" style="padding-top: 5px;"> <div class="docsettings__fields--separator"></div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-4-padding"> <span class="docsettings__field-label spc-textfield--left-label">{colNumLabel}</span> </div> <div class="docsettings--grow-5"> <span class="docsettings__field-label spc-textfield--left-label">{colGutterLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start" style="padding-right: 15px;"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding"> <div class="spc-textfield spc-js-textfield spc-textfield__text"> <input name="colNumber" onclick="{selectInput}" onwheel="{incrementSupport(false, 1, 4)}" onkeydown="{incrementSupport(false, 1, 4)}" onkeyup="{incrementSupport()}" class="spc-textfield__input" type="text" min="{this.minColNum}" max="{this.maxColNum}" value="{colNumValue}" onfocus="{onFocusScrollUp}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport(false, 1, 4)}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4-padding docsettings--flex-start" style="padding-right: 35px;"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding"> <div class="spc-textfield spc-js-textfield spc-textfield__text"> <input name="colGutter" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" class="spc-textfield__input" type="text" step="1" min="{this.convertedMinColGutter}" max="{this.convertedMaxColGutter}" value="{this.getUserVisibleNumericValue(colGutterValue)}" onfocus="{onFocusScrollUp}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing" style="padding-top: 5px;"> <div class="docsettings__fields--separator"></div> </div> <div class="docsettings__disclosure-container"> <div class="docsettings__disclosure-header" onclick="{toggleMarginsOptions}" onkeypress="{toggleMarginsOptions}" tabindex="0" style="cursor: pointer;"> <span class="docsettings__disclosure-indicator spc-icons {docsettings__disclosure-indicator--closed: marginsClosed}">D</span> <span>{marginLabel}</span> </div> <div class="docsettings__disclosure-contents {docsettings__disclosure-contents--closed: marginsClosed}" name="marginsContents"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{topLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{marginHandler}"> <input name="topmargin" data-margins class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" type="text" alt-step="any" step="any" min="{this.convertedMinMargin}" max="{this.convertedMaxMargin}" value="{this.getUserVisibleNumericValue(topMarginValue)}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{bottomLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{marginHandler}"> <input name="bottommargin" data-margins class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinMargin}" max="{this.convertedMaxMargin}" value="{this.getUserVisibleNumericValue(bottomMarginValue)}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{leftLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{insideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{marginHandler}"> <input name="leftmargin" data-margins class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" type="text" alt-step="any" step="any" min="{this.convertedMinMargin}" max="{this.convertedMaxMargin}" value="{this.getUserVisibleNumericValue(leftMarginValue)}" spellcheck="false" onfocus="{onFocusScrollDown}"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{rightLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{outsideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{marginHandler}"> <input name="rightmargin" data-margins class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinMargin}" max="{this.convertedMaxMargin}" value="{this.getUserVisibleNumericValue(rightMarginValue)}" spellcheck="false" onfocus="{onFocusScrollDown}"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> </div> <div data-tip="{tipChainValues}"> <button name="marginchain" class="docsettings__bleed-button spc-icons {spc-icon--link:marginLock, spc-icon--unlink:!marginLock, docsettings__bleed-button--depressed:marginLock}" type="button" name="button" onclick="{marginChainHandler}"></button> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing" style="padding-top: 5px;"> <div class="docsettings__fields--separator"></div> </div> <div class="docsettings__disclosure-container"> <div class="docsettings__disclosure-header" onclick="{toggleAdvancedOptions}" onkeypress="{toggleAdvancedOptions}" tabindex="0" style="cursor: pointer;"> <span class="docsettings__disclosure-indicator spc-icons {docsettings__disclosure-indicator--closed: advancedClosed}">D</span> <span>{customizeLabel}</span> </div> <div class="docsettings__disclosure-contents {docsettings__disclosure-contents--closed: advancedClosed}" name="advancedOptionsContents" riot-style="min-height:{getAdvancedDialogHeight()}px"> <div class="docsettings__row"> <div class="docsettings--grow-3" data-tip="{tipBleed}"> <span class="docsettings__field-label spc-textfield--left-label">{bleedLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{topLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" data-bleed onchange="{bleedHandler}"> <input name="topbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinBleed}" max="{this.convertedMaxBleed}" value="{this.getUserVisibleNumericValue(topBleedValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{bottomLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" data-bleed onchange="{bleedHandler}"> <input name="bottombleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinBleed}" max="{this.convertedMaxBleed}" value="{this.getUserVisibleNumericValue(bottomBleedValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{leftLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{insideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" data-bleed onchange="{bleedHandler}"> <input name="leftbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinBleed}" max="{this.convertedMaxBleed}" value="{this.getUserVisibleNumericValue(leftBleedValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{rightLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{outsideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__text" data-bleed onchange="{bleedHandler}"> <input name="rightbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinBleed}" max="{this.convertedMaxBleed}" value="{this.getUserVisibleNumericValue(rightBleedValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> </div> <div data-tip="{tipChainValues}"> <button name bleedchain class="docsettings__bleed-button spc-icons {spc-icon--link:bleedLock, spc-icon--unlink:!bleedLock, docsettings__bleed-button--depressed:bleedLock}" type="button" name="button" onclick="{bleedChainHandler}"></button> </div> </div> <div class="docsettings__row docsettings__row--spacing"></div> <div class="docsettings__row"> <div class="docsettings--grow-3" data-tip="{tipSlug}"> <span class="docsettings__field-label spc-textfield--left-label">{slugLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding"> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{topLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div data-slug class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{slugHandler}"> <input name="topslug" data-slug class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinSlug}" max="{this.convertedMaxSlug}" value="{this.getUserVisibleNumericValue(topSlugValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{bottomLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div data-slug class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{slugHandler}"> <input name="bottomslug" data-slug class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinSlug}" max="{this.convertedMaxSlug}" value="{this.getUserVisibleNumericValue(bottomSlugValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4-padding docsettings--flex-start"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{leftLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{insideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div data-slug class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{slugHandler}"> <input name="leftslug" data-slug class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinSlug}" max="{this.convertedMaxSlug}" value="{this.getUserVisibleNumericValue(leftSlugValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-4 docsettings--flex-start" style="padding-left: 25px;"> <div class="docsettings__row"> <div if="{!facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{rightLabel}</span> </div> <div if="{facingValue}" class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{outsideLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div data-slug class="spc-textfield spc-js-textfield spc-textfield__text" onchange="{slugHandler}"> <input name="rightslug" data-slug class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" inputmode="numeric" type="text" alt-step="any" step="any" min="{this.convertedMinSlug}" max="{this.convertedMaxSlug}" value="{this.getUserVisibleNumericValue(rightSlugValue)}" onfocus="{onFocusScrollDown}" spellcheck="false"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> </div> <div data-tip="{tipChainValues}"> <button name="slugchain" class="docsettings__bleed-button spc-icons {spc-icon--link:slugLock, spc-icon--unlink:!slugLock, docsettings__bleed-button--depressed:slugLock}" type="button" name="button" onclick="{slugChainHandler}"></button> </div> </div> </div> </div> </div> </div> </form> <action-footer if="{!presetMode}"></action-footer>', "", 'class="preset-form--idsn"', function(opts) {
    var _this = this;
    this.mixin("unitConversion"), this.mixin("cooldown"), this.mixin("tooltip"), this.constant = {
        POINTS_PER_PICA: 12
    }, this.conversionMappings = {
        pixelsUnit: "px",
        millimetersUnit: "mm",
        centimetersUnit: "cm",
        inchesUnit: "in",
        picasUnit: "pc",
        pointsUnit: "pt",
        inchesDecimalsUnit: "in",
        cicerosUnit: "c",
        agatesUnit: "ag",
        cubitsUnit: "cu"
    }, this.roundingRules = {
        pixelsUnit: 3,
        millimetersUnit: 3,
        centimetersUnit: 4,
        inchesUnit: 4,
        picasUnit: 3,
        pointsUnit: 3,
        inchesDecimalsUnit: 4,
        cicerosUnit: 3,
        agatesUnit: 4,
        cubitsUnit: 2
    }, this.regularIncrement = {
        pixelsUnit: 1,
        millimetersUnit: 1,
        centimetersUnit: .1,
        inchesUnit: .125,
        picasUnit: 1,
        pointsUnit: 1,
        qsUnit: 1,
        cicerosUnit: 3,
        agatesUnit: 1
    }, this.altIncrement = {
        pixelsUnit: .1,
        millimetersUnit: .5,
        centimetersUnit: .05,
        inchesUnit: .0625,
        picasUnit: 1,
        pointsUnit: .1,
        qsUnit: .5,
        cicerosUnit: 1,
        agatesUnit: .1
    }, this.shiftIncrement = {
        pixelsUnit: 10,
        millimetersUnit: 10,
        centimetersUnit: 1,
        inchesUnit: 1,
        picasUnit: 12,
        pointsUnit: 10,
        qsUnit: 4,
        cicerosUnit: 12,
        agatesUnit: 10
    }, this.cancel = "", this.savePresetLabel = "", this.customizeLabel = "", this.defaultDocumentName = "", 
    this.defaultPresetName = "", this.heading = "", this.presetHeading = "", this.presetCollisionLabel = "", 
    this.widthLabel = "", this.unitsLabel = "", this.heightLabel = "", this.startPageLabel = "", 
    this.facingLabel = "", this.textLabel = "", this.colNumLabel = "", this.colGutterLabel = "", 
    this.marginLabel = "", this.bleedLabel = "", this.slugLabel = "", this.topLabel = "", 
    this.bottomLabel = "", this.leftLabel = "", this.rightLabel = "", this.insideLabel = "", 
    this.outsideLabel = "", this.orientationLabel = "", this.pageLabel = "", this.localizedUnits = [], 
    this.description = "", this.colorMode = "", this.tipBleed = "", this.tipChainValues = "", 
    this.tipColGutter = "", this.tipColNum = "", this.tipColumns = "", this.tipDeletePreset = "", 
    this.tipDocPreset = "", this.tipLandscape = "", this.tipMargin = "", this.tipPotrait = "", 
    this.tipSavePreset = "", this.tipSlug = "", this.presetToolTip = "", this.advancedDialogHeight = iaw.store.get([ "sidepanel", "scrollHeight" ]) || 0, 
    this.getAdvancedDialogHeight = function() {
        return this.advancedDialogHeight = this.advancedDialogHeight || Math.round(.25 * this.docsettingsScrollContainer.clientHeight), 
        this.advancedDialogHeight;
    }, this.toggleAdvancedOptions = function(evt) {
        "keypress" === evt.type && evt.keyCode !== iaw.a11y.Keys.SPACE || (_this.advancedClosed ? (_this.bleedPanelManuallyOpened = !0, 
        _this.update({
            advancedClosed: !_this.advancedClosed
        }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, 4 * _this.advancedDialogHeight, 300)) : iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 300, function() {
            this.bleedPanelManuallyOpened = !1, this.update({
                advancedClosed: !this.advancedClosed
            }), iaw.localstorage.setUserItem("fnft.advancedClosed", this.advancedClosed);
        }.bind(_this)));
    }, this.toggleMarginsOptions = function(evt) {
        "keypress" === evt.type && evt.keyCode !== iaw.a11y.Keys.SPACE || (_this.marginsClosed ? (_this.marginPanelManuallyOpened = !0, 
        _this.update({
            marginsClosed: !_this.marginsClosed
        }), iaw.localstorage.setUserItem("fnft.marginsClosed", _this.marginsClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 300)) : iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 300, function() {
            this.marginPanelManuallyOpened = !1, this.update({
                marginsClosed: !this.marginsClosed
            }), iaw.localstorage.setUserItem("fnft.marginsClosed", this.marginsClosed);
        }.bind(_this)));
    }, this.toggleAdvancedOnResize = function() {
        var height = window.innerHeight, marginsHeight = 720, bandsHeight = 960;
        height > marginsHeight && _this.marginsClosed ? (_this.update({
            marginsClosed: !1
        }), iaw.localstorage.setUserItem("fnft.marginsClosed", _this.marginsClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 0)) : height < marginsHeight && !_this.marginsClosed && !_this.marginPanelManuallyOpened && iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 0, function() {
            _this.update({
                marginsClosed: !0
            }), iaw.localstorage.setUserItem("fnft.marginsClosed", _this.marginsClosed);
        }), height > bandsHeight && _this.advancedClosed ? (_this.update({
            advancedClosed: !1
        }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 0)) : height < bandsHeight && !_this.advancedClosed && !_this.bleedPanelManuallyOpened && iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 0, function() {
            _this.update({
                advancedClosed: !0
            }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed);
        });
    }, this.onFocusScrollDown = function() {
        iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 300);
    }, this.onFocusScrollUp = function() {
        iaw.util.smoothScroll(_this.docsettingsScrollContainer, 4 * -_this.advancedDialogHeight, 300);
    }, this.localizeArray = function(locPrefix, values) {
        var newArray = [];
        if (Array.isArray(values)) {
            var i, len;
            for (i = 0, len = values.length; i < len; i++) "string" == typeof values[i] ? newArray.push({
                value: values[i],
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i])
            }) : "object" === _typeof(values[i]) && newArray.push({
                values: values[i].values,
                mode: values[i].mode,
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i].mode)
            });
        }
        return newArray;
    }, this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        if ("host-more-options" === axn) {
            var currentAttributes = iaw.store.get([ "input", "settings" ]), ingestData = {
                presetAttributes: {
                    attributes: _this.initialSettings,
                    newAttributes: currentAttributes,
                    isModified: _this.hasChanged(_this.initialSettings, currentAttributes)
                }
            };
            iaw.util.assign(ingestData, _this.data), iaw.analytics.ingest.logFNFTActionClickedEvent("more-options", ingestData);
        }
        riotctrl.trigger(axn);
    }, this.validateInteger = function(raw, cur, min, max) {
        var result = this.parseInput(raw, !1);
        return result.success === !0 ? (raw = iaw.util.roundDecimal(result.value, 0), Math.max(Math.min(raw, max), min)) : (raw = cur, 
        Math.max(Math.min(raw, max), min));
    }, this.precedence = function(operator) {
        return "+" === operator || "-" === operator ? 1 : "*" === operator || "/" === operator ? 2 : void 0;
    }, this.isHigherPrecedent = function(operator1, operator2) {
        var precedence1, precedence2;
        if (precedence1 = this.precedence(operator1), precedence2 = this.precedence(operator2), 
        void 0 !== precedence1 && void 0 !== precedence2) return precedence1 > precedence2;
    }, this.getNumberExtent = function(expr, initialLocation) {
        for (var decimalEncountered = !1, j = initialLocation; expr[j] >= "0" && expr[j] <= "9" || "." === expr[j]; ) {
            if ("." === expr[j]) {
                if (decimalEncountered !== !1) return;
                decimalEncountered = !0;
            }
            j += 1;
        }
        return j;
    }, this.applyOperator = function(operandStack, operatorStack) {
        var firstOperand, secondOperand, operator, result, error = !1;
        if (secondOperand = operandStack.pop(), firstOperand = operandStack.pop(), void 0 === firstOperand || void 0 === secondOperand) return !1;
        switch (operator = operatorStack.pop()) {
          case "+":
            result = firstOperand.value + secondOperand.value;
            break;

          case "-":
            result = firstOperand.value - secondOperand.value;
            break;

          case "*":
            firstOperand.unit && secondOperand.unit && (error = !0), result = firstOperand.value * secondOperand.value;
            break;

          case "/":
            firstOperand.unit && secondOperand.unit && (error = !0), result = firstOperand.value / secondOperand.value;
        }
        return error !== !0 && (firstOperand.unit || secondOperand.unit ? operandStack.push({
            value: result,
            unit: this.currentUnit
        }) : operandStack.push({
            value: result
        }), !0);
    }, this.getPossibleUnits = function() {
        var unit, i, unitInfo = this.unitInfo, unitsList = [];
        for (unit in unitInfo) if (unitInfo.hasOwnProperty(unit)) for (i = 0; i < unitInfo[unit].unitStrings.length; ++i) unitsList.push(unitInfo[unit].unitStrings[i]);
        return unitsList;
    }, this.validateUnit = function(input) {
        var unit, i, unitInfo = this.unitInfo;
        if (unit = this.currentUnit, unitInfo.hasOwnProperty(unit)) for (i = 0; i < unitInfo[unit].unitStrings.length; ++i) if (input === unitInfo[unit].unitStrings[i]) return unit;
        for (unit in unitInfo) if (unitInfo.hasOwnProperty(unit) && unit !== this.currentUnit) for (i = 0; i < unitInfo[unit].unitStrings.length; ++i) if (input === unitInfo[unit].unitStrings[i]) return unit;
    }, this.parseInput = function(raw, unitsExpected) {
        var expr, type, exprLength, j, temp, expressionPos, operatorStackSize, unit, operandStack = [], operatorStack = [], i = 0;
        for (expr = raw.replace(/\s+/g, "").replace(/,/g, ".").toLowerCase(), ("+" === expr[0] || expr[0] <= "-") && (expr = "0" + expr), 
        exprLength = expr.length, i = 0; i < exprLength; i) {
            if (j = i, expr[i] >= "0" && expr[i] <= "9" || "." === expr[i]) {
                if (type = "Number", j = this.getNumberExtent(expr, i), void 0 === j) return {};
                temp = expr.substring(i, j), operandStack.push({
                    value: Number(temp)
                });
            } else if ("+" === expr[i] || "-" === expr[i] || "*" === expr[i] || "/" === expr[i]) {
                if ("Number" !== type && "Unit" !== type) return {};
                for (type = "Operator", operatorStackSize = operatorStack.length; 0 !== operatorStackSize && !this.isHigherPrecedent(expr[i], operatorStack[operatorStackSize - 1]); ) {
                    if (this.applyOperator(operandStack, operatorStack) === !1) return {};
                    operatorStackSize -= 1;
                }
                operatorStack.push(expr[i]), j = i + 1;
            } else {
                if (unitsExpected === !1) return {};
                var shouldBeSpecialUnit = !1;
                if ("Operator" === type || void 0 === type) operandStack.push({
                    value: Number(0)
                }), shouldBeSpecialUnit = !0; else if ("Number" !== type) return {};
                type = "Unit";
                var possibleUnits = this.getPossibleUnits();
                do {
                    var index, charIndex = j - i, shouldBreak = !1;
                    for (index = possibleUnits.length - 1; index >= 0; index--) {
                        if (void 0 === expr[charIndex]) {
                            shouldBreak = !0;
                            break;
                        }
                        possibleUnits[index][charIndex] !== expr[j] && possibleUnits.splice(index, 1);
                    }
                    if (0 === possibleUnits.length) {
                        shouldBreak = !0;
                        break;
                    }
                    j += 1;
                } while (!shouldBreak);
                if (temp = expr.substring(i, j), unit = this.validateUnit(temp), expressionPos = operandStack.length - 1, 
                void 0 === unit) return {};
                var output = this.unitInfo[unit].representation, pos = output.indexOf("^2");
                if (pos >= 0) {
                    if (i = j, j = this.getNumberExtent(expr, j), void 0 === j) return {};
                    if (j !== i) temp = expr.substring(i, j), operandStack[expressionPos].value = operandStack[expressionPos].value + Number(temp) / 12; else if (1 == shouldBeSpecialUnit) return {};
                } else if (shouldBeSpecialUnit === !0) return {};
                operandStack[expressionPos].unit = unit, unit !== this.currentUnit && (operandStack[expressionPos].value = this.conversionHelper(operandStack[expressionPos].value, this.conversionMappings[unit], this.conversionMappings[this.currentUnit]));
            }
            i = j;
        }
        for (operatorStackSize = operatorStack.length; 0 !== operatorStackSize; ) {
            if (this.applyOperator(operandStack, operatorStack) === !1) return {};
            operatorStackSize -= 1;
        }
        return 1 !== operandStack.length ? {} : {
            success: !0,
            value: operandStack[0].value
        };
    }, this.validate = function(raw, cur, min, max) {
        var result = this.parseInput(raw);
        return result.success === !0 ? (raw = result.value, Math.max(Math.min(raw, max), min)) : (raw = cur, 
        Math.max(Math.min(cur, max), min));
    }, this.getUserVisibleNumericValue = function(num, unit) {
        void 0 === unit && (unit = this.currentUnit);
        var output = this.unitInfo[unit].representation, pos = output.indexOf("^2");
        if (pos >= 0) {
            var fraction = num % 1;
            fraction = 12 * fraction, fraction = iaw.util.roundDecimal(fraction, this.roundingRules[unit]), 
            12 == fraction && (fraction = 0, num += 1);
            var fractionOutput = Number(fraction).toString();
            this.doesCommaRepresentDecimal && (fractionOutput = fractionOutput.replace(".", ",")), 
            output = output.replace("^2", fractionOutput), num = Math.floor(num);
        } else num = iaw.util.roundDecimal(num, this.roundingRules[unit]);
        if (pos = output.indexOf("^1"), pos >= 0) {
            var numOutput = Number(num).toString();
            this.doesCommaRepresentDecimal && (numOutput = numOutput.replace(".", ",")), output = output.replace("^1", numOutput);
        }
        return output;
    }, this.validateNumericFields = function(evt) {
        var roundTo = this.roundingRules[this.currentUnit], newWidth = this.validate(this.formWidth.value, this.currentWidth, this.convertedMinDocWidth, this.convertedMaxDocWidth), newHeight = this.validate(this.formHeight.value, this.currentHeight, this.convertedMinDocHeight, this.convertedMaxDocHeight), newWidthRounded = iaw.util.roundDecimal(newWidth, roundTo), newHeightRounded = iaw.util.roundDecimal(newHeight, roundTo), currentWidthRounded = iaw.util.roundDecimal(this.currentWidth, roundTo), currentHeightRounded = iaw.util.roundDecimal(this.currentHeight, roundTo), newpageCount = this.validateInteger(this.pageInput.value, this.pageCount, this.pageMin, this.pageMax), newStartPageNum = this.validateInteger(this.startPageInput.value, this.startPageCount, this.startPageMin, this.startPageMax), newColNumber = this.validateInteger(this.colNumber.value, this.colNumValue, this.minColNum, this.maxColNum), newColGutter = this.validate(this.colGutter.value, this.colGutterValue, this.convertedMinColGutter, this.convertedMaxColGutter), newColGutterRounded = iaw.util.roundDecimal(newColGutter, roundTo), currentColGutterRounded = iaw.util.roundDecimal(this.colGutterValue, roundTo);
        this.formHeight.parentElement.classList.remove("is-invalid"), this.formWidth.parentElement.classList.remove("is-invalid"), 
        this.pageInput.parentElement.classList.remove("is-invalid"), this.startPageInput.parentElement.classList.remove("is-invalid"), 
        this.colNumber.parentElement.classList.remove("is-invalid"), this.colGutter.parentElement.classList.remove("is-invalid"), 
        this.formHeight.value = this.getUserVisibleNumericValue(newHeight), this.formWidth.value = this.getUserVisibleNumericValue(newWidth), 
        currentHeightRounded === newHeightRounded && currentWidthRounded === newWidthRounded || (this.currentHeight = newHeight, 
        this.currentWidth = newWidth), this.colGutter.value = this.getUserVisibleNumericValue(newColGutter), 
        currentColGutterRounded !== newColGutterRounded && (this.colGutterValue = newColGutter), 
        this.pageInput.value = newpageCount, this.pageCount = newpageCount, this.startPageInput.value = newStartPageNum, 
        this.startPageCount = newStartPageNum, this.colNumber.value = newColNumber, this.colNumValue = newColNumber, 
        this.updateOrientationIcons(newWidth, newHeight), this.validateMargin(evt), this.validateBleed(evt), 
        this.validateSlug(evt), this.setStore();
    }, this.validateMargin = function(evt) {
        var roundTo = this.roundingRules[this.currentUnit], currentMarginValues = [ this.topMarginValue, this.bottomMarginValue, this.leftMarginValue, this.rightMarginValue ], newMarginValues = [], currentMarginValuesRounded = [], newMarginValuesRounded = [];
        newMarginValues.push(this.validate(this.topmargin.value, this.topMarginValue, this.convertedMinMargin, this.convertedMaxMargin)), 
        newMarginValues.push(this.validate(this.bottommargin.value, this.bottomMarginValue, this.convertedMinMargin, this.convertedMaxMargin)), 
        newMarginValues.push(this.validate(this.leftmargin.value, this.leftMarginValue, this.convertedMinMargin, this.convertedMaxMargin)), 
        newMarginValues.push(this.validate(this.rightmargin.value, this.rightMarginValue, this.convertedMinMargin, this.convertedMaxMargin));
        for (var i = 0, len = currentMarginValues.length; i < len; i++) currentMarginValuesRounded.push(iaw.util.roundDecimal(currentMarginValues[i], roundTo));
        if (evt && evt.target && void 0 !== evt.target.dataset.margins && (this.lastMargin = evt.target, 
        this.marginLock)) for (i = 0, len = newMarginValues.length; i < len; i++) newMarginValues.push(this.validate(evt.target.value, currentMarginValues[i], this.convertedMinMargin, this.convertedMaxMargin));
        for (i = 0, len = newMarginValues.length; i < len; i++) newMarginValuesRounded.push(iaw.util.roundDecimal(newMarginValues[i], roundTo));
        this.topmargin.value = this.getUserVisibleNumericValue(newMarginValues[0]), this.bottommargin.value = this.getUserVisibleNumericValue(newMarginValues[1]), 
        this.leftmargin.value = this.getUserVisibleNumericValue(newMarginValues[2]), this.rightmargin.value = this.getUserVisibleNumericValue(newMarginValues[3]), 
        currentMarginValuesRounded[0] === newMarginValuesRounded[0] && currentMarginValuesRounded[1] === newMarginValuesRounded[1] && currentMarginValuesRounded[2] === newMarginValuesRounded[2] && currentMarginValuesRounded[3] === newMarginValuesRounded[3] || (this.topMarginValue = newMarginValues[0], 
        this.bottomMarginValue = newMarginValues[1], this.leftMarginValue = newMarginValues[2], 
        this.rightMarginValue = newMarginValues[3]), setTimeout(function() {
            this.topmargin.parentElement.classList.remove("is-invalid"), this.bottommargin.parentElement.classList.remove("is-invalid"), 
            this.leftmargin.parentElement.classList.remove("is-invalid"), this.rightmargin.parentElement.classList.remove("is-invalid");
        }.bind(this), 0);
    }, this.validateBleed = function(evt) {
        var roundTo = this.roundingRules[this.currentUnit], currentBleedValues = [ this.topBleedValue, this.bottomBleedValue, this.leftBleedValue, this.rightBleedValue ], newBleedValues = [], currentBleedValuesRounded = [], newBleedValuesRounded = [];
        newBleedValues.push(this.validate(this.topbleed.value, this.topBleedValue, this.convertedMinBleed, this.convertedMaxBleed)), 
        newBleedValues.push(this.validate(this.bottombleed.value, this.bottomBleedValue, this.convertedMinBleed, this.convertedMaxBleed)), 
        newBleedValues.push(this.validate(this.leftbleed.value, this.leftBleedValue, this.convertedMinBleed, this.convertedMaxBleed)), 
        newBleedValues.push(this.validate(this.rightbleed.value, this.rightBleedValue, this.convertedMinBleed, this.convertedMaxBleed));
        for (var i = 0, len = currentBleedValues.length; i < len; i++) currentBleedValuesRounded.push(iaw.util.roundDecimal(currentBleedValues[i], roundTo));
        if (evt && evt.target && void 0 !== evt.target.dataset.bleed && (this.lastBleed = evt.target, 
        this.bleedLock)) for (i = 0, len = newBleedValues.length; i < len; i++) newBleedValues.push(this.validate(evt.target.value, currentBleedValues[i], this.convertedMinBleed, this.convertedMaxBleed));
        for (i = 0, len = newBleedValues.length; i < len; i++) newBleedValuesRounded.push(iaw.util.roundDecimal(newBleedValues[i], roundTo));
        this.topbleed.value = this.getUserVisibleNumericValue(newBleedValues[0]), this.bottombleed.value = this.getUserVisibleNumericValue(newBleedValues[1]), 
        this.leftbleed.value = this.getUserVisibleNumericValue(newBleedValues[2]), this.rightbleed.value = this.getUserVisibleNumericValue(newBleedValues[3]), 
        currentBleedValuesRounded[0] === newBleedValuesRounded[0] && currentBleedValuesRounded[1] === newBleedValuesRounded[1] && currentBleedValuesRounded[2] === newBleedValuesRounded[2] && currentBleedValuesRounded[3] === newBleedValuesRounded[3] || (this.topBleedValue = newBleedValues[0], 
        this.bottomBleedValue = newBleedValues[1], this.leftBleedValue = newBleedValues[2], 
        this.rightBleedValue = newBleedValues[3]), setTimeout(function() {
            this.topbleed.parentElement.classList.remove("is-invalid"), this.bottombleed.parentElement.classList.remove("is-invalid"), 
            this.leftbleed.parentElement.classList.remove("is-invalid"), this.rightbleed.parentElement.classList.remove("is-invalid");
        }.bind(this), 0);
    }, this.validateSlug = function(evt) {
        var roundTo = this.roundingRules[this.currentUnit], currentSlugValues = [ this.topSlugValue, this.bottomSlugValue, this.leftSlugValue, this.rightSlugValue ], newSlugValues = [], currentSlugValuesRounded = [], newSlugValuesRounded = [];
        newSlugValues.push(this.validate(this.topslug.value, this.topSlugValue, this.convertedMinSlug, this.convertedMaxSlug)), 
        newSlugValues.push(this.validate(this.bottomslug.value, this.bottomSlugValue, this.convertedMinSlug, this.convertedMaxSlug)), 
        newSlugValues.push(this.validate(this.leftslug.value, this.leftSlugValue, this.convertedMinSlug, this.convertedMaxSlug)), 
        newSlugValues.push(this.validate(this.rightslug.value, this.rightSlugValue, this.convertedMinSlug, this.convertedMaxSlug));
        for (var i = 0, len = currentSlugValues.length; i < len; i++) currentSlugValuesRounded.push(iaw.util.roundDecimal(currentSlugValues[i], roundTo));
        if (evt && evt.target && void 0 !== evt.target.dataset.slug && (this.lastSlug = evt.target, 
        this.slugLock)) for (i = 0, len = newSlugValues.length; i < len; i++) newSlugValues.push(this.validate(evt.target.value, currentSlugValues[i], this.convertedMinSlug, this.convertedMaxSlug));
        for (i = 0, len = newSlugValues.length; i < len; i++) newSlugValuesRounded.push(iaw.util.roundDecimal(newSlugValues[i], roundTo));
        this.topslug.value = this.getUserVisibleNumericValue(newSlugValues[0]), this.bottomslug.value = this.getUserVisibleNumericValue(newSlugValues[1]), 
        this.leftslug.value = this.getUserVisibleNumericValue(newSlugValues[2]), this.rightslug.value = this.getUserVisibleNumericValue(newSlugValues[3]), 
        currentSlugValuesRounded[0] === newSlugValuesRounded[0] && currentSlugValuesRounded[1] === newSlugValuesRounded[1] && currentSlugValuesRounded[2] === newSlugValuesRounded[2] && currentSlugValuesRounded[3] === newSlugValuesRounded[3] || (this.topSlugValue = newSlugValues[0], 
        this.bottomSlugValue = newSlugValues[1], this.leftSlugValue = newSlugValues[2], 
        this.rightSlugValue = newSlugValues[3]), setTimeout(function() {
            this.topslug.parentElement.classList.remove("is-invalid"), this.bottomslug.parentElement.classList.remove("is-invalid"), 
            this.leftslug.parentElement.classList.remove("is-invalid"), this.rightslug.parentElement.classList.remove("is-invalid");
        }.bind(this), 0);
    }, this.setStore = function() {
        var unit = _this.unitDropdown.querySelector(".is-checked"), widthInPoints = _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], "pt"), heightInPoints = _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], "pt"), topBleedInPoints = _this.conversionHelper(_this.topBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), bottomBleedInPoints = _this.conversionHelper(_this.bottomBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), leftBleedInPoints = _this.conversionHelper(_this.leftBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), rightBleedInPoints = _this.conversionHelper(_this.rightBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), topSlugInPoints = _this.conversionHelper(_this.topSlugValue, _this.conversionMappings[_this.currentUnit], "pt"), bottomSlugInPoints = _this.conversionHelper(_this.bottomSlugValue, _this.conversionMappings[_this.currentUnit], "pt"), leftSlugInPoints = _this.conversionHelper(_this.leftSlugValue, _this.conversionMappings[_this.currentUnit], "pt"), rightSlugInPoints = _this.conversionHelper(_this.rightSlugValue, _this.conversionMappings[_this.currentUnit], "pt"), topMarginInPoints = _this.conversionHelper(_this.topMarginValue, _this.conversionMappings[_this.currentUnit], "pt"), bottomMarginInPoints = _this.conversionHelper(_this.bottomMarginValue, _this.conversionMappings[_this.currentUnit], "pt"), leftMarginInPoints = _this.conversionHelper(_this.leftMarginValue, _this.conversionMappings[_this.currentUnit], "pt"), rightMarginInPoints = _this.conversionHelper(_this.rightMarginValue, _this.conversionMappings[_this.currentUnit], "pt"), columnGutterInPoints = _this.conversionHelper(_this.colGutterValue, _this.conversionMappings[_this.currentUnit], "pt"), slugData = _this.slugData;
        slugData.top = topSlugInPoints, slugData.bottom = bottomSlugInPoints, slugData.right = rightSlugInPoints, 
        slugData.left = leftSlugInPoints;
        var marginData = _this.marginData;
        marginData.top = topMarginInPoints, marginData.bottom = bottomMarginInPoints, marginData.right = rightMarginInPoints, 
        marginData.left = leftMarginInPoints;
        var bleedData = _this.bleedData;
        bleedData.top = topBleedInPoints, bleedData.bottom = bottomBleedInPoints, bleedData.right = rightBleedInPoints, 
        bleedData.left = leftBleedInPoints, iaw.store.set([ "input", "doc-name" ], _this.formName.value || _this.defaultDocumentName), 
        document.getElementById("formPresetName") && iaw.store.set([ "input", "preset-name" ], document.getElementById("formPresetName").value || _this.defaultPresetName);
        var settingsStore = iaw.store.set([ "input", "settings" ], {
            width: widthInPoints,
            height: heightInPoints,
            bTall: _this.bTall,
            units: unit.dataset.value,
            num_pages: parseInt(_this.pageCount),
            start_page_num: parseInt(_this.startPageCount),
            facing_pages: _this.facingValue,
            pages_per_spread: _this.pagesPerSpread,
            auto_text_frame: _this.textFrameValue,
            columns: parseInt(_this.colNumValue),
            gutter: columnGutterInPoints,
            uniform_bleed: _this.bleedLock,
            uniform_margins: _this.marginLock,
            uniform_slug: _this.slugLock,
            slug_offset: slugData,
            bleed_offset: bleedData,
            margins: marginData,
            description: _this.description,
            isModified: !1
        });
        _this.hasChanged(_this.initialSettings, settingsStore) ? (settingsStore.name = "", 
        settingsStore.isModified = !0) : (settingsStore.name = _this.data.title, settingsStore.isModified = !1);
    }, this.convertFromPixelsToCurrentUnit = function(presetObj) {
        var _this2 = this;
        if (presetObj) {
            if (this.currentWidth = this.conversionHelper(presetObj.width, "pt", this.conversionMappings[this.currentUnit]), 
            this.currentHeight = this.conversionHelper(presetObj.height, "pt", this.conversionMappings[this.currentUnit]), 
            this.colGutterValue = this.conversionHelper(presetObj.gutter, "pt", this.conversionMappings[this.currentUnit]), 
            this.topBleedValue = this.conversionHelper(presetObj.bleed_offset.top, "pt", this.conversionMappings[this.currentUnit]), 
            this.bottomBleedValue = this.conversionHelper(presetObj.bleed_offset.bottom, "pt", this.conversionMappings[this.currentUnit]), 
            this.rightBleedValue = this.conversionHelper(presetObj.bleed_offset.right, "pt", this.conversionMappings[this.currentUnit]), 
            this.leftBleedValue = this.conversionHelper(presetObj.bleed_offset.left, "pt", this.conversionMappings[this.currentUnit]), 
            this.topSlugValue = this.conversionHelper(presetObj.slug_offset.top, "pt", this.conversionMappings[this.currentUnit]), 
            this.bottomSlugValue = this.conversionHelper(presetObj.slug_offset.bottom, "pt", this.conversionMappings[this.currentUnit]), 
            this.rightSlugValue = this.conversionHelper(presetObj.slug_offset.right, "pt", this.conversionMappings[this.currentUnit]), 
            this.leftSlugValue = this.conversionHelper(presetObj.slug_offset.left, "pt", this.conversionMappings[this.currentUnit]), 
            this.topMarginValue = this.conversionHelper(presetObj.margins.top, "pt", this.conversionMappings[this.currentUnit]), 
            this.bottomMarginValue = this.conversionHelper(presetObj.margins.bottom, "pt", this.conversionMappings[this.currentUnit]), 
            this.rightMarginValue = this.conversionHelper(presetObj.margins.right, "pt", this.conversionMappings[this.currentUnit]), 
            this.leftMarginValue = this.conversionHelper(presetObj.margins.left, "pt", this.conversionMappings[this.currentUnit]), 
            presetObj.description) {
                var defaultUnit;
                defaultUnit = this.initialSettings && this.initialSettings.units ? this.initialSettings.units : this.currentUnit;
                for (var height = this.getUserVisibleNumericValue(this.conversionHelper(presetObj.height, "pt", this.conversionMappings[defaultUnit]), defaultUnit), width = this.getUserVisibleNumericValue(this.conversionHelper(presetObj.width, "pt", this.conversionMappings[defaultUnit]), defaultUnit), totalLength = height.length, currentPosition = totalLength - 1; height[currentPosition] >= "a" && height[currentPosition] <= "z"; ) currentPosition -= 1;
                var unitString;
                currentPosition !== height.length - 1 && (unitString = height.substr(currentPosition + 1, totalLength), 
                height = height.substr(0, currentPosition + 1).trim(), width = width.substr(0, width.length - (totalLength - (currentPosition + 1))).trim()), 
                presetObj.description = width + " x " + height, presetObj.units = defaultUnit;
            }
            void 0 !== unitString && (presetObj.description = presetObj.description + " " + unitString);
            var tip = this.presetToolTip;
            presetObj.tip = tip.replace("^1", presetObj.title).replace("^2", presetObj.description), 
            setTimeout(function() {
                _this2.update(), _this2.validateNumericFields();
            }, 0);
        }
    }, this.cleanUnitInfo = function(unitInfo) {
        var unit, i, representation;
        for (unit in unitInfo) if (unitInfo.hasOwnProperty(unit)) for (representation = unitInfo[unit].representation, 
        representation = representation.replace("^1", ""), representation = representation.replace("^2", ""), 
        unitInfo[unit].unitStrings.push(representation), i = 0; i < unitInfo[unit].unitStrings.length; ++i) unitInfo[unit].unitStrings[i] = unitInfo[unit].unitStrings[i].replace(/\s+/g, "").toLowerCase();
    }, this.toggleFacingValue = function() {
        this.facingValue ? (this.facingValue = !1, this.pagesPerSpread = 1) : (this.facingValue = !0, 
        this.pagesPerSpread = 2);
    }, this.toggleTextFrameValue = function() {
        this.textFrameValue ? this.textFrameValue = !1 : this.textFrameValue = !0;
    }, this.updateOrientationIcons = function() {
        _this.currentHeight >= _this.currentWidth ? (_this.orientationIsPortrait = !0, _this.bTall = !0, 
        _this.check(_this.orientationPortrait), _this.uncheck(_this.orientationLandscape)) : (_this.orientationIsPortrait = !1, 
        _this.bTall = !1, _this.uncheck(_this.orientationPortrait), _this.check(_this.orientationLandscape));
    }, this.toggleOrientation = function() {
        var temp = _this.formWidth.value;
        _this.formWidth.value = _this.formHeight.value, _this.formHeight.value = temp;
    }, this.check = function(el) {
        el.checked = !0, el.parentElement.classList.add("is-checked");
    }, this.uncheck = function(el) {
        el.checked = !1, el.parentElement.classList.remove("is-checked");
    }, this.isEqual = function(val1, val2, unit1, unit2) {
        return ("string" != typeof val1 || "string" != typeof val2 || val1 === val2) && (("number" != typeof val1 || "number" != typeof val2 || iaw.util.roundDecimal(val1, _this.roundingRules[unit1]) === iaw.util.roundDecimal(val2, _this.roundingRules[unit2])) && (("number" != typeof val1 || "string" != typeof val2 || iaw.util.roundDecimal(val1, _this.roundingRules[unit1]) === iaw.util.roundDecimal(Number(val2), _this.roundingRules[unit2])) && ("string" != typeof val1 || "number" != typeof val2 || iaw.util.roundDecimal(val2, _this.roundingRules[unit2]) === iaw.util.roundDecimal(Number(val1), _this.roundingRules[unit1]))));
    }, this.hasChanged = function(obj1, obj2) {
        var key;
        for (key in obj1) if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if ("bleed_offset" === key || "margins" === key || "slug_offset" === key) {
                if (_this.isEqual(obj1[key].top, obj2[key].top, obj1.units, obj2.units) && _this.isEqual(obj1[key].left, obj2[key].left, obj1.units, obj2.units) && _this.isEqual(obj1[key].bottom, obj2[key].bottom, obj1.units, obj2.units) && _this.isEqual(obj1[key].right, obj2[key].right, obj1.units, obj2.units)) continue;
                return !0;
            }
            if ("description" === key || void 0 === obj1[key]) continue;
            if (!_this.isEqual(obj1[key], obj2[key], obj1.units, obj2.units)) return !0;
        }
        return !1;
    }, this.closeDropDownsExcept = function(dropDownEl) {
        var i, len;
        for (i = 0, len = this.dropDownElements.length; i < len; i++) this.dropDownElements[i].contains(dropDownEl) || this.dropDownElements[i].classList.remove("is-open");
    }, this.convertBounds = function(fromUnit, toUnit) {
        var _this3 = this;
        this.convertedMaxDocWidth = this.conversionHelper(this.maxDocWidth, fromUnit, toUnit), 
        this.convertedMaxDocHeight = this.conversionHelper(this.maxDocWidth, fromUnit, toUnit), 
        this.convertedMinDocWidth = this.conversionHelper(this.minDocWidth, fromUnit, toUnit), 
        this.convertedMinDocHeight = this.conversionHelper(this.minDocWidth, fromUnit, toUnit), 
        this.convertedMinBleed = this.conversionHelper(this.bleedMin, fromUnit, toUnit), 
        this.convertedMaxBleed = this.conversionHelper(this.bleedMax, fromUnit, toUnit), 
        this.convertedMinSlug = this.conversionHelper(this.slugMin, fromUnit, toUnit), this.convertedMaxSlug = this.conversionHelper(this.slugMax, fromUnit, toUnit), 
        this.convertedMinMargin = this.conversionHelper(this.marginMin, fromUnit, toUnit), 
        this.convertedMaxMargin = this.conversionHelper(this.marginMax, fromUnit, toUnit), 
        this.convertedMinColGutter = this.conversionHelper(this.minColGutter, fromUnit, toUnit), 
        this.convertedMaxColGutter = this.conversionHelper(this.maxColGutter, fromUnit, toUnit), 
        setTimeout(function() {
            _this3.update(), _this3.validateNumericFields();
        }, 0);
    }, this.conversionHelper = function(value, fromUnit, toUnit) {
        var newValue = this.convert(value, {
            pointsPerInch: this.pointsPerInch,
            picasPerInch: this.picasPerInch,
            precision: 10
        }).from(fromUnit).to(toUnit);
        return newValue;
    }, this.updateAllSlug = function(input) {
        var result = this.parseInput(input);
        if (result.success === !0) {
            var value = result.value, output = this.getUserVisibleNumericValue(value);
            this.topslug.value = output, this.bottomslug.value = output, this.leftslug.value = output, 
            this.rightslug.value = output, this.topSlugValue = value, this.bottomSlugValue = value, 
            this.leftSlugValue = value, this.rightSlugValue = value, this.setStore();
        }
    }, this.updateAllMargin = function(input) {
        var result = this.parseInput(input);
        if (result.success === !0) {
            var value = result.value, output = this.getUserVisibleNumericValue(value);
            this.topmargin.value = output, this.bottommargin.value = output, this.leftmargin.value = output, 
            this.rightmargin.value = output, this.topMarginValue = result.value, this.bottomMarginValue = value, 
            this.leftMarginValue = value, this.rightMarginValue = value, this.setStore();
        }
    }, this.updateAllBleed = function(input) {
        var result = this.parseInput(input);
        if (result.success === !0) {
            var value = result.value, output = this.getUserVisibleNumericValue(value);
            this.topbleed.value = output, this.bottombleed.value = output, this.leftbleed.value = output, 
            this.rightbleed.value = output, this.topBleedValue = value, this.bottomBleedValue = value, 
            this.leftBleedValue = value, this.rightBleedValue = value, this.setStore();
        }
    }, this.selectInput = function(evt) {
        evt.target.select();
    }, this.updateTopSlug = function(evt) {
        var newSlug = Number(evt.target.value);
        return isNaN(newSlug) && (newSlug = this.topSlugValue), this.topSlugValue = newSlug, 
        !0;
    }, this.updateBottomSlug = function(evt) {
        var newSlug = Number(evt.target.value);
        return isNaN(newSlug) && (newSlug = this.bottomSlugValue), this.bottomSlugValue = newSlug, 
        !0;
    }, this.updateLeftSlug = function(evt) {
        var newSlug = Number(evt.target.value);
        return isNaN(newSlug) && (newSlug = this.leftSlugValue), this.leftSlugValue = newSlug, 
        !0;
    }, this.updateRightSlug = function(evt) {
        var newSlug = Number(evt.target.value);
        return isNaN(newSlug) && (newSlug = this.rightSlugValue), this.rightSlugValue = newSlug, 
        !0;
    }, this.validateName = function(evt) {
        var documentName = evt.target.value;
        "" === documentName && (evt.target.value = this.defaultDocumentName);
    }, this.facingChangeHandler = function(evt) {
        return _this.toggleFacingValue(), !0;
    }, this.textFrameChangeHandler = function(evt) {
        return _this.toggleTextFrameValue(), !0;
    }, this.orientationChangeHandler = function(evt) {
        return evt.target.checked ? (_this.toggleOrientation(), !0) : (_this.updateOrientationIcons(), 
        !1);
    }, this.unitDropdownHandler = function(evt) {
        _this.currentWidth = _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.currentHeight = _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.topBleedValue = _this.conversionHelper(_this.topBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.bottomBleedValue = _this.conversionHelper(_this.bottomBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.leftBleedValue = _this.conversionHelper(_this.leftBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.rightBleedValue = _this.conversionHelper(_this.rightBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.topMarginValue = _this.conversionHelper(_this.topMarginValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.bottomMarginValue = _this.conversionHelper(_this.bottomMarginValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.leftMarginValue = _this.conversionHelper(_this.leftMarginValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.rightMarginValue = _this.conversionHelper(_this.rightMarginValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.topSlugValue = _this.conversionHelper(_this.topSlugValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.bottomSlugValue = _this.conversionHelper(_this.bottomSlugValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.leftSlugValue = _this.conversionHelper(_this.leftSlugValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.rightSlugValue = _this.conversionHelper(_this.rightSlugValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.colGutterValue = _this.conversionHelper(_this.colGutterValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.currentUnit = evt.target.dataset.value, _this.convertBounds("px", _this.conversionMappings[evt.target.dataset.value]);
    };
    var mouseDownInterval = null, mouseDownTimeout = null, shiftKey = !1;
    this.incrementSupport = function(isDimension, increment, shiftIncrement) {
        return function(evt) {
            if (evt.target !== document.activeElement && "wheel" === evt.type) return !0;
            if ("keyup" === evt.type) return shiftKey = !1, !0;
            if ("mouseup" !== evt.type && "mouseout" !== evt.type || (clearInterval(mouseDownInterval), 
            clearTimeout(mouseDownTimeout), mouseDownTimeout = null, mouseDownInterval = null), 
            "wheel" !== evt.type && "mousedown" !== evt.type || (evt.preventDefault(), !this.isCoolingDown(0, 40))) {
                var element = evt.target;
                if (shiftKey = evt.shiftKey, "mousedown" === evt.type && (mouseDownInterval || (mouseDownTimeout = setTimeout(function() {
                    var _this4 = this;
                    mouseDownInterval = setInterval(function() {
                        var evt = new Event("mousedown", {
                            bubbles: !0
                        });
                        evt.shiftKey = shiftKey, _this4.dispatchEvent(evt);
                    }, 40);
                }.bind(element), 1e3)), element = evt.target.parentElement.parentElement.querySelector("input")), 
                element === document.activeElement || "mousedown" === evt.type) {
                    void 0 === isDimension && (isDimension = !0);
                    var direction;
                    void 0 === increment ? increment = isDimension === !0 ? evt.shiftKey ? this.shiftIncrement[this.currentUnit] : evt.altKey ? this.altIncrement[this.currentUnit] : this.regularIncrement[this.currentUnit] : evt.shiftKey ? 10 : 1 : evt.shiftKey && (increment = void 0 !== shiftIncrement ? shiftIncrement : 10 * increment);
                    var result, finalValue;
                    if (evt.keyCode && evt.keyCode === iaw.a11y.Keys.DOWN || evt.wheelDelta && evt.wheelDelta < 0 || "mousedown" === evt.type && evt.target.classList.contains("spc-textfield__stepdown") ? direction = -1 : (evt.keyCode && evt.keyCode === iaw.a11y.Keys.UP || evt.wheelDelta && evt.wheelDelta > 0 || "mousedown" === evt.type && evt.target.classList.contains("spc-textfield__stepup")) && (direction = 1), 
                    1 === direction || direction === -1) {
                        if (evt.preventDefault(), isDimension) {
                            var output = this.unitInfo[this.currentUnit].representation, pos = output.indexOf("^2");
                            pos >= 0 && (increment /= 12);
                        }
                        if (result = this.parseInput(element.value), result.success === !0) {
                            var modulus = iaw.util.roundDecimal(result.value % increment, this.roundingRules[this.currentUnit]);
                            finalValue = (evt.shiftKey || evt.shiftKey === !1 && evt.altKey === !1) && 0 != modulus && modulus != iaw.util.roundDecimal(increment, this.roundingRules[this.currentUnit]) ? direction === -1 ? Math.floor(result.value / increment) * increment : Math.ceil(result.value / increment) * increment : Number(result.value) + direction * increment, 
                            isDimension ? element.value = this.getUserVisibleNumericValue(finalValue) : element.value = iaw.util.roundDecimal(finalValue, 4), 
                            element.dispatchEvent(new Event("change", {
                                bubbles: !0
                            }));
                        }
                    }
                    return !0;
                }
            }
        };
    }, this.formKeypressHandler = function(evt) {
        if (evt.keyCode === iaw.a11y.Keys.ENTER) {
            if (evt.stopPropagation(), _this.validateNumericFields(), _this.presetMode) {
                var cancelButton = document.getElementById("presetSaveCancel");
                cancelButton && cancelButton === document.activeElement ? _this.toggleSavePreset() : _this.presetNameInvalid || _this.savePreset();
            } else riotctrl.trigger("host-create-template-doc");
            return !1;
        }
        return !0;
    }, this.formClickHandler = function(evt) {
        return _this.closeDropDownsExcept(evt.srcElement), !0;
    }, this.slugHandler = function(evt) {
        return _this.lastSlug = evt.target, setTimeout(function() {
            this.slugLock && this.updateAllSlug(evt.target.value);
        }.bind(_this), 0), !0;
    }, this.bleedHandler = function(evt) {
        return _this.lastBleed = evt.target, setTimeout(function() {
            this.bleedLock && this.updateAllBleed(evt.target.value);
        }.bind(_this), 0), !0;
    }, this.marginHandler = function(evt) {
        return _this.lastMargin = evt.target, setTimeout(function() {
            this.marginLock && this.updateAllMargin(evt.target.value);
        }.bind(_this), 0), !0;
    }, this.bleedChainHandler = function(evt) {
        return _this.bleedLock = !_this.bleedLock, evt.target.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.bleedLock && _this.updateAllBleed(_this.lastBleed.value), !0;
    }, this.marginChainHandler = function(evt) {
        return _this.marginLock = !_this.marginLock, evt.target.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.marginLock && _this.updateAllMargin(_this.lastMargin.value), !0;
    }, this.slugChainHandler = function(evt) {
        return _this.slugLock = !_this.slugLock, evt.target.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.slugLock && _this.updateAllSlug(_this.lastSlug.value), !0;
    }, this.testValidPresetName = function(evt) {
        var textfield = document.getElementById("formPresetName"), name = textfield.value.trim(), presetData = iaw.store.get("presets");
        presetData = presetData.filter(function(preset) {
            return "recent" !== preset.template_category;
        });
        var presetNameCollision = presetData.some(function(curPreset) {
            return curPreset.title === name;
        }, _this);
        _this.presetNameInvalid = !1, presetNameCollision ? (_this.presetCollisionLabel = iaw.i18n.getLocalizedString("new_preset_details_collision_title"), 
        _this.presetNameInvalid = !0, textfield.parentElement.classList.add("is-invalid")) : "" === name ? (_this.presetCollisionLabel = iaw.i18n.getLocalizedString("new_preset_details_empty_title"), 
        textfield.parentElement.classList.add("is-invalid"), _this.presetNameInvalid = !0) : textfield.parentElement.classList.remove("is-invalid");
        var button = document.getElementById("presetSaveCommit");
        return button && (button.disabled = _this.presetNameInvalid), _this.update(), !0;
    }, this.updateSavedPreset = function(value) {
        if (!value) return void console.error("Failed to updateSavedPreset because no data was provided");
        var presetObj = value, presetData = iaw.store.get("presets"), presetLUT = iaw.store.get("presetLUT"), savedPresets = presetData.filter(function(preset) {
            return "saved" === preset.template_category;
        }), previousElement = savedPresets[savedPresets.length - 1], index = presetData.length;
        previousElement && (index = presetLUT[previousElement.uuid] + 1);
        var uuid = iaw.util.generateGUID();
        presetObj.uuid = uuid, presetData.splice(index, 0, presetObj);
        for (var key in presetLUT) presetLUT.hasOwnProperty(key) && presetLUT[key] >= index && (presetLUT[key] = presetLUT[key] + 1);
        presetLUT[uuid] = index, _this.convertFromPixelsToCurrentUnit(presetObj), iaw.store.set("presets", presetData), 
        iaw.store.set("presetLUT", presetLUT), setTimeout(function() {
            riotctrl.trigger(iaw.fnftEvents.FILTER, "saved", presetObj.title);
        }, 0);
    }, this.savePreset = function(evt) {
        if (_this.testValidPresetName(), !_this.presetNameInvalid) {
            var curPresetName = document.getElementById("formPresetName").value.trim(), presetData = iaw.store.get("presets");
            presetData = presetData.filter(function(preset) {
                return "recent" !== preset.template_category;
            }), presetData.some(function(curPreset) {
                return curPreset.id === curPresetName;
            }, _this) || "" !== curPresetName.trim() && (iaw.fnft.createPreset(curPresetName, _this.updateSavedPreset), 
            _this.toggleSavePreset());
        }
    }, this.toggleSavePreset = function(evt) {
        if (!_this.presetMode) {
            var presetData = iaw.store.get("presets");
            presetData = presetData.filter(function(preset) {
                return "saved" === preset.template_category;
            });
            for (var increment = 0, found = !0, title = iaw.i18n.getLocalizedString("newdoc_filter_saved"); found; ) ++increment, 
            found = presetData.some(function(presetObj) {
                return presetObj.title === title + " " + increment.toString();
            });
            _this.defaultPresetName = title + " " + increment, iaw.store.set([ "input", "preset-name" ], _this.defaultPresetName);
        }
        iaw.localstorage.setUserItem("fnft.presetMode", !_this.presetMode), _this.update({
            presetMode: !_this.presetMode
        }), _this.presetMode && _this.formPresetName && setTimeout(function() {
            _this.formPresetName.select();
        }, 0);
    }, this.initData = function() {
        this.data = this.opts;
        var fnftSettings = iaw.store.get([ "host", "fnftSettings" ]) || {}, initialAdvancedClosed = iaw.localstorage.getUserItem("fnft.advancedClosed"), initialMarginsClosed = iaw.localstorage.getUserItem("fnft.marginsClosed");
        this.presetMode = !1, this.isWindows = "win" === iaw.store.get([ "host", "platform" ]) || "windows" === iaw.store.get([ "host", "platform" ]) || !1, 
        this.presetNameInvalid = !1, this.units = fnftSettings.units || [], this.unitInfo = JSON.parse(JSON.stringify(fnftSettings.unitInfo || {})), 
        this.pointsPerInch = fnftSettings.pointsPerInch || 72, this.picasPerInch = iaw.util.roundDecimal(this.pointsPerInch / this.constant.POINTS_PER_PICA, 4), 
        this.defaultUnits = this.data.units || "inchesUnit", this.currentUnit = this.defaultUnits, 
        this.maxDocWidth = fnftSettings.docSizeBoundMax || 1e4, this.maxDocHeight = fnftSettings.docSizeBoundMax || 1e4, 
        this.minDocWidth = fnftSettings.docSizeBoundMin || 1, this.minDocHeight = fnftSettings.docSizeBoundMin || 1, 
        this.currentHeight = this.data.height, this.currentWidth = this.data.width, this.bTall = this.data.bTall || !1, 
        this.pageMin = fnftSettings.numPagesBoundMin, this.pageMax = fnftSettings.numPagesBoundMax, 
        this.startPageMin = fnftSettings.startPageBoundMin, this.startPageMax = fnftSettings.startPageBoundMax, 
        this.startPageCount = this.data.start_page_num || this.startPageMin, this.pageCount = this.data.num_pages || this.pageMin, 
        this.facingValue = this.data.facing_pages || !1, this.pagesPerSpread = this.data.pages_per_spread || 1, 
        this.textFrameValue = this.data.auto_text_frame || !1, this.minColNum = fnftSettings.colNumBoundMin, 
        this.maxColNum = fnftSettings.colNumBoundMax, this.colNumValue = this.data.columns || this.minColNum, 
        this.minColGutter = fnftSettings.colGutterBoundMin, this.maxColGutter = fnftSettings.colGutterBoundMax, 
        this.colGutterValue = this.data.gutter || this.minColGutter, this.advancedClosed = initialAdvancedClosed !== !1, 
        this.marginsClosed = initialMarginsClosed !== !1, this.description = this.data.description || "", 
        this.colorMode = this.data.colorMode || "", this.doesCommaRepresentDecimal = Number(1.2).toLocaleString().indexOf(",") !== -1, 
        this.marginPanelManuallyOpened = !this.marginsClosed, this.bleedPanelManuallyOpened = !this.advancedClosed, 
        this.bleedLock = this.data.uniform_bleed, this.bleedMin = fnftSettings.bleedBoundMin, 
        this.bleedMax = fnftSettings.bleedBoundMax, this.lastBleed = this.topbleed, this.topBleedValue = this.data.bleed_offset.top, 
        this.leftBleedValue = this.data.bleed_offset.left, this.rightBleedValue = this.data.bleed_offset.right, 
        this.bottomBleedValue = this.data.bleed_offset.bottom, this.bleedData = JSON.parse(JSON.stringify(this.data.bleed_offset || {})), 
        this.marginLock = this.data.uniform_margins, this.marginMin = fnftSettings.marginBoundMin, 
        this.marginMax = fnftSettings.marginBoundMax, this.lastMargin = this.topmargin, 
        this.topMarginValue = this.data.margins.top, this.leftMarginValue = this.data.margins.left, 
        this.rightMarginValue = this.data.margins.right, this.bottomMarginValue = this.data.margins.bottom, 
        this.marginData = JSON.parse(JSON.stringify(this.data.margins || {})), this.slugLock = this.data.uniform_slug, 
        this.slugMin = fnftSettings.slugBoundMin, this.slugMax = fnftSettings.slugBoundMax, 
        this.lastSlug = this.topslug, this.topSlugValue = this.data.slug_offset.top, this.leftSlugValue = this.data.slug_offset.left, 
        this.rightSlugValue = this.data.slug_offset.right, this.bottomSlugValue = this.data.slug_offset.bottom, 
        this.slugData = JSON.parse(JSON.stringify(this.data.slug_offset || {})), this.convertedMaxDocWidth, 
        this.convertedMaxDocHeight, this.convertedMinDocWidth, this.convertedMinDocHeight, 
        this.convertedMinBleed, this.convertedMaxBleed, this.convertedMinMargin, this.convertedMaxMargin, 
        this.convertedMinSlug, this.convertedMaxSlug, this.convertedMinColGutter, this.convertedMaxColGutter;
        var toolTips = fnftSettings.dialogToolTips;
        this.presetToolTip = toolTips.tipDocumentPresetCard, this.tipDocPreset = toolTips.tipDocPreset, 
        this.tipSavePreset = toolTips.tipSavePreset, this.tipDeletePreset = toolTips.tipDeletePreset, 
        this.tipLandscape = toolTips.tipLandscape, this.tipPotrait = toolTips.tipPotrait, 
        this.tipColumns = toolTips.tipColumns, this.tipColNum = toolTips.tipColNum, this.tipColGutter = toolTips.tipColGutter, 
        this.tipMargin = toolTips.tipMargin, this.tipBleed = toolTips.tipBleed, this.tipSlug = toolTips.tipSlug, 
        this.tipChainValues = toolTips.tipChainValues, this.convertBounds("px", this.conversionMappings[this.currentUnit]), 
        this.convertFromPixelsToCurrentUnit(this.data), this.cleanUnitInfo(this.unitInfo), 
        this.initialSettings = {
            width: this.data.width,
            height: this.data.height,
            bTall: this.data.bTall,
            units: this.data.units,
            num_pages: this.data.num_pages,
            start_page_num: this.data.start_page_num,
            facing_pages: this.data.facing_pages,
            pages_per_spread: this.data.pages_per_spread,
            auto_text_frame: this.data.auto_text_frame,
            columns: this.data.columns,
            gutter: this.data.gutter,
            uniform_bleed: this.data.uniform_bleed,
            uniform_margins: this.data.uniform_margins,
            uniform_slug: this.data.uniform_slug,
            bleed_offset: this.data.bleed_offset,
            margins: this.data.margins,
            slug_offset: this.data.slug_offset,
            description: this.data.description,
            isModified: !1
        }, riotctrl.on("update-i18n-retro", this.onLoc, this);
    }, this.on("mount", function() {
        this.dropDownElements = document.querySelectorAll(".spc-dropdown"), this.validateNumericFields(), 
        this.setStore(), iaw.motor.add(this.toggleAdvancedOnResize);
    }), this.on("before-unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.off("*"), iaw.motor.remove(this.toggleAdvancedOnResize);
    }), this.onLoc = function() {
        _this.customizeLabel = iaw.i18n.getLocalizedString("newdoc_button_customize_id"), 
        _this.defaultDocumentName = iaw.store.get([ "input", "doc-name" ]) || iaw.store.get([ "host", "fnftSettings", "documentName" ]) || iaw.i18n.getLocalizedString("newdoc_default_docname"), 
        _this.defaultPresetName = iaw.store.get([ "input", "preset-name" ]), _this.heading = iaw.i18n.getLocalizedString("newdoc_details_label_title"), 
        _this.presetHeading = iaw.i18n.getLocalizedString("new_preset_details_label_title"), 
        _this.cancel = iaw.i18n.getLocalizedString("cancel"), _this.savePresetLabel = iaw.i18n.getLocalizedString("newdoc_details_label_save_preset"), 
        _this.widthLabel = iaw.i18n.getLocalizedString("newdoc_details_label_width"), _this.unitsLabel = iaw.i18n.getLocalizedString("newdoc_details_label_unit"), 
        _this.heightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_height"), 
        _this.startPageLabel = iaw.i18n.getLocalizedString("newdoc_details_label_StartPage"), 
        _this.facingLabel = iaw.i18n.getLocalizedString("newdoc_details_label_Facing"), 
        _this.textLabel = iaw.i18n.getLocalizedString("newdoc_details_label_TextFrame"), 
        _this.colNumLabel = iaw.i18n.getLocalizedString("newdoc_details_label_ColNumber"), 
        _this.colGutterLabel = iaw.i18n.getLocalizedString("newdoc_details_label_ColGutter"), 
        _this.marginLabel = iaw.i18n.getLocalizedString("newdoc_details_label_Margins"), 
        _this.bleedLabel = iaw.i18n.getLocalizedString("newdoc_details_label_bleed"), _this.slugLabel = iaw.i18n.getLocalizedString("newdoc_details_label_slug"), 
        _this.topLabel = iaw.i18n.getLocalizedString("newdoc_details_label_top"), _this.bottomLabel = iaw.i18n.getLocalizedString("newdoc_details_label_bottom"), 
        _this.leftLabel = iaw.i18n.getLocalizedString("newdoc_details_label_left"), _this.rightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_right"), 
        _this.insideLabel = iaw.i18n.getLocalizedString("newdoc_details_label_inside"), 
        _this.outsideLabel = iaw.i18n.getLocalizedString("newdoc_details_label_outside"), 
        _this.orientationLabel = iaw.i18n.getLocalizedString("newdoc_details_label_orientation"), 
        _this.pageLabel = iaw.i18n.getLocalizedString("newdoc_details_label_pages"), _this.localizedUnits = _this.localizeArray("newdoc_details_", _this.units), 
        _this.isMounted && (_this.update(), _this.validateNumericFields(), _this.setStore()), 
        _this.mixin("spcmixin");
    }, this.initData();
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
};

riot.tag2("preset-form-ilst", '<div class="sidebar-padding"> <h6 class="spc-typography--caption preset-form__caption">{heading}</h6> </div> <div name="docsettingsScrollContainer" class="form-preset__container scroll-container"> <div class="scroll-pane"> <form name="docsettings" class="docsettings__form" onchange="{validateNumericFields}" onkeypress="{formKeypressHandler}" onclick="{formClickHandler}"> <div class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet document-name"> <input name="formName" class="spc-textfield__input" type="text" onchange="{validateName}" onclick="{selectInput}" value="{defaultDocumentName}"> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{widthLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2 docsettings--flex-start"> <div class="spc-textfield spc-js-textfield"> <input name="formWidth" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" class="spc-textfield__input" pattern="[0-9]*" min="{this.convertedMinDocWidth}" step="{1 / Math.pow(10, roundingRules[currentUnit])}" max="{this.convertedMaxDocWidth}" value="{iaw.util.roundDecimal(currentWidth, roundingRules[currentUnit])}" type="{\'number\'}"> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{heightLabel}</span> </div> </div> <div class="docsettings__row"> <div class="spc-textfield spc-js-textfield docsettings--no-margin"> <input name="formHeight" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" class="spc-textfield__input" pattern="[0-9]*" step="{1 / Math.pow(10, roundingRules[currentUnit])}" min="{this.convertedMinDocHeight}" max="{this.convertedMaxDocHeight}" value="{iaw.util.roundDecimal(currentHeight, roundingRules[currentUnit])}" type="{\'number\'}"> </div> <div class="docsettings--grow-5"></div> </div> </div> <div class="docsettings--grow-5 docsettings--stretch"> <div name="unitDropdown" onchange="{unitDropdownHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{widthLabel}</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div class="{is-checked: defaultUnits === unit.value, spc-dropdown__option:true}" data-value="{unit.value}" each="{unit in localizedUnits}" if="{unit.value !== \'columnsUnit\'}"> {unit.localizedValue} </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-1"> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-1"> <span class="docsettings__field-label spc-textfield--left-label">{orientationLabel}</span> </div> </div> <div class="docsettings__row docsettings__row--orientation"> <div class="docsettings--grow-1 docsettings__orientation-input" name="orientationInput"> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationPortrait"> <input id="orientationPortrait" type="checkbox" value="portrait" class="spc-icon-toggle__input" onchange="{orientationChangeHandler}" checked> <i class="spc-icon-toggle__label inapp-icons inapp-icon--portrait"></i> </label> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationLandscape"> <input id="orientationLandscape" type="checkbox" value="landscape" class="spc-icon-toggle__input" onchange="{orientationChangeHandler}"> <i class="spc-icon-toggle__label inapp-icons inapp-icon--landscape"></i> </label> </div> </div> </div> <div class="docsettings--grow-1 docsettings--stretch"> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label--nowrap spc-textfield--left-label">{artboardLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield__number"> <input name="artboardInput" class="spc-textfield__input" onclick="{selectInput}" onwheel="{incrementSupport(1)}" onkeydown="{incrementSupport(1)}" onkeyup="{incrementSupport()}" pattern="[0-9]*" inputmode="numeric" alt-step="any" step="any" min="{artBoardMin}" max="{artBoardMax}" value="{artboardCount}" type="{\'number\'}"> <div class="spc-textfield__stepstack" onmousedown="{incrementSupport(1)}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{bleedLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4"> <div class="docsettings__row"> <div class="docsettings--grow-1"> <div class="docsettings__field-label spc-textfield--left-label docsettings__row--spacing">{topLabel}</div> <div class="spc-textfield spc-js-textfield spc-textfield__number" data-bleed> <input name="topbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" pattern="[0-9]*" inputmode="numeric" alt-step="any" step="any" min="{convertedMinBleed}" max="{convertedMaxBleed}" value="{iaw.util.roundDecimal(topBleedValue, bleedRoundingRules[currentUnit])}" type="{\'number\'}"> <div class="spc-textfield__stepstack" data-bleed onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> <div class="docsettings--grow-1"> <div class="docsettings__field-label spc-textfield--left-label docsettings__row--spacing">{bottomLabel}</div> <div class="spc-textfield spc-js-textfield spc-textfield__number" data-bleed> <input name="bottombleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" pattern="[0-9]*" inputmode="numeric" alt-step="any" step="any" min="{convertedMinBleed}" max="{convertedMaxBleed}" value="{iaw.util.roundDecimal(bottomBleedValue, bleedRoundingRules[currentUnit])}" type="{\'number\'}"> <div class="spc-textfield__stepstack" data-bleed onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-1"> <div class="docsettings__field-label spc-textfield--left-label docsettings__row--spacing">{leftLabel}</div> <div class="spc-textfield spc-js-textfield spc-textfield__number" data-bleed> <input name="leftbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" pattern="[0-9]*" inputmode="numeric" alt-step="any" step="any" min="{convertedMinBleed}" max="{convertedMaxBleed}" value="{iaw.util.roundDecimal(leftBleedValue, bleedRoundingRules[currentUnit])}" type="{\'number\'}"> <div class="spc-textfield__stepstack" data-bleed onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> <div class="docsettings--grow-1"> <div class="docsettings__field-label spc-textfield--left-label docsettings__row--spacing">{rightLabel}</div> <div class="spc-textfield spc-js-textfield spc-textfield__number" data-bleed> <input name="rightbleed" class="spc-textfield__input" onclick="{selectInput}" data-bleed onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" onkeyup="{incrementSupport()}" pattern="[0-9]*" inputmode="numeric" alt-step="any" step="any" min="{convertedMinBleed}" max="{convertedMaxBleed}" value="{iaw.util.roundDecimal(rightBleedValue, bleedRoundingRules[currentUnit])}" type="{\'number\'}"> <div class="spc-textfield__stepstack" data-bleed onmousedown="{incrementSupport()}" onmouseup="{incrementSupport()}" onmouseout="{incrementSupport()}"> <div class="spc-textfield__stepup"></div> <div class="spc-textfield__stepdown"></div> </div> </div> </div> </div> </div> <div class="docsettings--grow-1"> <button name bleedchain class="docsettings__bleed-button spc-icons {spc-icon--link:lockBleed, spc-icon--unlink:!lockBleed, docsettings__bleed-button--depressed:lockBleed}" type="button" name="button" onclick="{bleedChainHandler}"></button> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{colorModeLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-4"> <div name="colorModesInput" onchange="{colorModeChangeHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{colorModeLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultColorMode === mode.mode, spc-dropdown__option:true}" data-value="{mode.mode}" each="{mode in localizedColorModes}"> {mode.localizedValue} </div> </div> </div> </div> </div> <div class="docsettings--grow-1"> <i name="colorModeWarningIcon" class="docsettings__warning spc-icons spc-icon--warn" data-tip="{colorModeWarning}"></i> </div> </div> </form> <button class="docsettings__more-actions-button spc-button spc-button--quiet" onclick="{onAction}" data-action="host-more-options">{customizeLabel}</button> </div> </div> <action-footer></action-footer>', "", 'class="preset-form--ilst"', function(opts) {
    var _this = this;
    this.mixin("unitConversion"), this.mixin("cooldown"), this.mixin("tooltip"), this.constant = {
        POINTS_PER_PICA: 12
    }, this.conversionMappings = {
        pixelsUnit: "px",
        millimetersUnit: "mm",
        centimetersUnit: "cm",
        inchesUnit: "in",
        picasUnit: "pc",
        pointsUnit: "pt",
        qsUnit: "ha"
    }, this.roundingRules = {
        pixelsUnit: 2,
        millimetersUnit: 2,
        centimetersUnit: 2,
        inchesUnit: 2,
        picasUnit: 2,
        pointsUnit: 2,
        qsUnit: 2
    }, this.bleedRoundingRules = {
        pixelsUnit: 3,
        millimetersUnit: 3,
        centimetersUnit: 3,
        inchesUnit: 4,
        picasUnit: 2,
        pointsUnit: 3,
        qsUnit: 3
    }, this.bleedIncrement = {
        pixelsUnit: 1,
        millimetersUnit: 1,
        centimetersUnit: .1,
        inchesUnit: .125,
        picasUnit: 1,
        pointsUnit: 1,
        qsUnit: 1
    }, this.secondaryBleedIncrement = {
        pixelsUnit: .1,
        millimetersUnit: .5,
        centimetersUnit: .05,
        inchesUnit: .0625,
        picasUnit: .1,
        pointsUnit: .1,
        qsUnit: .5
    }, this.shiftBleedIncrement = {
        pixelsUnit: 10,
        millimetersUnit: 10,
        centimetersUnit: 1,
        inchesUnit: 1,
        picasUnit: 1,
        pointsUnit: 10,
        qsUnit: 4
    }, this.customizeLabel = "", this.defaultDocumentName = "", this.heading = "", this.widthLabel = "", 
    this.heightLabel = "", this.colorModeLabel = "", this.bleedLabel = "", this.topLabel = "", 
    this.bottomLabel = "", this.leftLabel = "", this.rightLabel = "", this.orientationLabel = "", 
    this.artboardLabel = "", this.localizedUnits = [], this.localizedColorModes = [], 
    this.colorModeWarning = "", this.localizeArray = function(locPrefix, values) {
        var newArray = [];
        if (Array.isArray(values)) {
            var i, len;
            for (i = 0, len = values.length; i < len; i++) "string" == typeof values[i] ? newArray.push({
                value: values[i],
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i])
            }) : "object" === _typeof(values[i]) && newArray.push({
                values: values[i].values,
                mode: values[i].mode,
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i].mode)
            });
        }
        return newArray;
    }, this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        if ("host-more-options" === axn) {
            var currentAttributes = iaw.store.get([ "input", "settings" ]), ingestData = {
                presetAttributes: {
                    attributes: _this.initialSettings,
                    newAttributes: currentAttributes,
                    attributesChanged: _this.hasChanged(_this.initialSettings, currentAttributes)
                }
            };
            iaw.util.assign(ingestData, _this.data), iaw.analytics.ingest.logFNFTActionClickedEvent("more-options", ingestData);
        }
        riotctrl.trigger(axn);
    }, this.sendValueCalculationToHost = function(calc, cur, fieldId) {
        var unit = this.unitDropdown.querySelector(".is-checked"), calcData = JSON.stringify({
            fieldId: fieldId,
            value: calc,
            original: cur,
            units: unit.dataset.value
        });
        window.__adobe_cep__ && iaw.cepUtil.sendEvent(iaw.cepUtil.events.REQUESTDATACALC, calcData);
    }, this.validate = function(raw, cur, min, max, fieldId) {
        return isNaN(Number(raw)) ? cur : Math.max(Math.min(Number(raw), max), min);
    }, this.validateNumericFields = function(evt) {
        this.artboardCount = this.validate(this.artboardInput.value, this.artboardCount, this.artBoardMin, this.artBoardMax);
        var roundTo = this.roundingRules[this.currentUnit], newWidth = this.validate(this.formWidth.value, this.currentWidth, this.convertedMinDocWidth, this.convertedMaxDocWidth, "width"), newHeight = this.validate(this.formHeight.value, this.currentHeight, this.convertedMinDocHeight, this.convertedMaxDocHeight, "height"), newWidthRounded = iaw.util.roundDecimal(newWidth, roundTo), newHeightRounded = iaw.util.roundDecimal(newHeight, roundTo), currentWidthRounded = iaw.util.roundDecimal(this.currentWidth, roundTo), currentHeightRounded = iaw.util.roundDecimal(this.currentHeight, roundTo);
        this.formHeight.parentElement.classList.remove("is-invalid"), this.formWidth.parentElement.classList.remove("is-invalid"), 
        this.formHeight.value = newHeightRounded, this.formWidth.value = newWidthRounded, 
        currentHeightRounded === newHeightRounded && currentWidthRounded === newWidthRounded || (this.currentHeight = newHeight, 
        this.currentWidth = newWidth), this.artboardInput.value = this.artboardCount, this.validateBleed(evt), 
        this.updateOrientationIcons(), this.setStore();
    }, this.validateBleed = function(evt) {
        var currentBleedValues = [ this.topBleedValue, this.bottomBleedValue, this.leftBleedValue, this.rightBleedValue ], newBleedValues = [ this.topbleed.value, this.bottombleed.value, this.leftbleed.value, this.rightbleed.value ], validatedBleedValues = [], bleedChangeEvent = !1;
        evt && evt.target && void 0 !== evt.target.dataset.bleed && (bleedChangeEvent = !0, 
        this.lastBleed = evt.target, this.lockBleed && (newBleedValues = [ evt.target.value, evt.target.value, evt.target.value, evt.target.value ]));
        for (var i = 0, len = newBleedValues.length; i < len; i++) validatedBleedValues.push(this.validate(newBleedValues[i], currentBleedValues[i], this.convertedMinBleed, this.convertedMaxBleed, "bleed-" + i));
        if (bleedChangeEvent) if (this.lockBleed) this.topBleedValue = validatedBleedValues[0], 
        this.bottomBleedValue = validatedBleedValues[1], this.leftBleedValue = validatedBleedValues[2], 
        this.rightBleedValue = validatedBleedValues[3]; else switch (this.lastBleed.name) {
          case "topbleed":
            this.topBleedValue = validatedBleedValues[0];
            break;

          case "bottombleed":
            this.bottomBleedValue = validatedBleedValues[1];
            break;

          case "leftbleed":
            this.leftBleedValue = validatedBleedValues[2];
            break;

          case "rightbleed":
            this.rightBleedValue = validatedBleedValues[3];
        }
        this.topbleed.value = iaw.util.roundDecimal(this.topBleedValue, this.bleedRoundingRules[this.currentUnit]), 
        this.bottombleed.value = iaw.util.roundDecimal(this.bottomBleedValue, this.bleedRoundingRules[this.currentUnit]), 
        this.leftbleed.value = iaw.util.roundDecimal(this.leftBleedValue, this.bleedRoundingRules[this.currentUnit]), 
        this.rightbleed.value = iaw.util.roundDecimal(this.rightBleedValue, this.bleedRoundingRules[this.currentUnit]), 
        setTimeout(function() {
            this.topbleed.parentElement.classList.remove("is-invalid"), this.bottombleed.parentElement.classList.remove("is-invalid"), 
            this.leftbleed.parentElement.classList.remove("is-invalid"), this.rightbleed.parentElement.classList.remove("is-invalid");
        }.bind(this), 0);
    }, this.setStore = function() {
        var unit = _this.unitDropdown.querySelector(".is-checked"), colorMode = _this.colorModesInput.querySelector(".is-checked"), widthInPoints = _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], "pt"), heightInPoints = _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], "pt"), topBleedInPoints = _this.conversionHelper(_this.topBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), bottomBleedInPoints = _this.conversionHelper(_this.bottomBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), leftBleedInPoints = _this.conversionHelper(_this.leftBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), rightBleedInPoints = _this.conversionHelper(_this.rightBleedValue, _this.conversionMappings[_this.currentUnit], "pt"), appSpecificKey = _this.appSpecificKey;
        appSpecificKey.bleedOffset = [ parseFloat(leftBleedInPoints), parseFloat(topBleedInPoints), parseFloat(rightBleedInPoints), parseFloat(bottomBleedInPoints) ], 
        appSpecificKey.lockBleed = _this.lockBleed, iaw.store.set([ "input", "doc-name" ], _this.formName.value || _this.defaultDocumentName);
        var settingsStore = iaw.store.set([ "input", "settings" ], {
            width: iaw.util.roundDecimal(widthInPoints, _this.roundingRules[_this.currentUnit]),
            height: iaw.util.roundDecimal(heightInPoints, _this.roundingRules[_this.currentUnit]),
            units: unit.dataset.value,
            mode: colorMode.dataset.value,
            numArtboards: parseInt(_this.artboardCount),
            maxArtboards: parseInt(_this.maxArtboards),
            appSpecificKey: appSpecificKey
        });
        _this.hasChanged(_this.initialSettings, settingsStore) ? settingsStore.name = "" : settingsStore.name = _this.data.title;
    }, this.updateOrientationIcons = function() {
        _this.currentHeight >= _this.currentWidth ? (_this.orientationIsPortrait = !0, _this.check(_this.orientationPortrait), 
        _this.uncheck(_this.orientationLandscape)) : (_this.orientationIsPortrait = !1, 
        _this.uncheck(_this.orientationPortrait), _this.check(_this.orientationLandscape));
    }, this.toggleOrientation = function() {
        var temp = _this.formWidth.value;
        _this.formWidth.value = _this.formHeight.value, _this.formHeight.value = temp;
    }, this.check = function(el) {
        el.checked = !0, el.parentElement.classList.add("is-checked");
    }, this.uncheck = function(el) {
        el.checked = !1, el.parentElement.classList.remove("is-checked");
    }, this.hasChanged = function(obj1, obj2) {
        var key;
        for (key in obj1) if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (void 0 === obj1[key]) continue;
            if (obj1[key] !== obj2[key]) return !0;
        }
        return !1;
    }, this.closeDropDownsExcept = function(dropDownEl) {
        var i, len;
        for (i = 0, len = this.dropDownElements.length; i < len; i++) this.dropDownElements[i].contains(dropDownEl) || this.dropDownElements[i].classList.remove("is-open");
    }, this.convertBounds = function(toUnit) {
        var _this2 = this;
        this.convertedMaxDocWidth = this.conversionHelper(this.maxDocWidth, "px", toUnit), 
        this.convertedMaxDocHeight = this.conversionHelper(this.maxDocWidth, "px", toUnit), 
        this.convertedMinDocWidth = this.conversionHelper(this.minDocWidth, "px", toUnit), 
        this.convertedMinDocHeight = this.conversionHelper(this.minDocWidth, "px", toUnit), 
        this.convertedMinBleed = this.conversionHelper(this.bleedMin, "px", toUnit), this.convertedMaxBleed = this.conversionHelper(this.bleedMax, "px", toUnit), 
        this.convertedMaxDocWidth = iaw.util.floorDecimal(this.convertedMaxDocWidth, this.roundingRules[this.currentUnit]), 
        this.convertedMaxDocHeight = iaw.util.floorDecimal(this.convertedMaxDocHeight, this.roundingRules[this.currentUnit]), 
        this.convertedMinDocWidth = iaw.util.ceilDecimal(this.convertedMinDocWidth, this.roundingRules[this.currentUnit]), 
        this.convertedMinDocHeight = iaw.util.ceilDecimal(this.convertedMinDocHeight, this.roundingRules[this.currentUnit]), 
        this.convertedMinBleed = iaw.util.ceilDecimal(this.convertedMinBleed, this.bleedRoundingRules[this.currentUnit]), 
        this.convertedMaxBleed = iaw.util.ceilDecimal(this.convertedMaxBleed, this.bleedRoundingRules[this.currentUnit]), 
        setTimeout(function() {
            _this2.update(), _this2.validateNumericFields();
        }, 0);
    }, this.conversionHelper = function(value, fromUnit, toUnit) {
        var newValue = this.convert(value, {
            pointsPerInch: this.pointsPerInch,
            picasPerInch: this.picasPerInch,
            precision: 10
        }).from(fromUnit).to(toUnit);
        return newValue;
    }, this.updateAllBleed = function(value) {
        this.topbleed.value = this.topBleedValue = value, this.bottombleed.value = this.bottomBleedValue = value, 
        this.leftbleed.value = this.leftBleedValue = value, this.rightbleed.value = this.rightBleedValue = value, 
        this.setStore();
    }, this.selectInput = function(evt) {
        this.lastFocusedInputElement !== evt.target && (evt.target.focus(), evt.target.select()), 
        this.lastFocusedInputElement = evt.target;
    }, this.validateName = function(evt) {
        var documentName = evt.target.value;
        "" === documentName && (evt.target.value = this.defaultDocumentName);
    }, this.orientationChangeHandler = function(evt) {
        return evt.target.checked ? (_this.toggleOrientation(), !0) : (_this.updateOrientationIcons(), 
        !1);
    }, this.unitDropdownHandler = function(evt) {
        _this.currentWidth = _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.currentHeight = _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.topBleedValue = _this.conversionHelper(_this.topBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.bottomBleedValue = _this.conversionHelper(_this.bottomBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.leftBleedValue = _this.conversionHelper(_this.leftBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.rightBleedValue = _this.conversionHelper(_this.rightBleedValue, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[evt.target.dataset.value]), 
        _this.currentUnit = evt.target.dataset.value, _this.convertBounds(_this.conversionMappings[evt.target.dataset.value]);
    };
    var mouseDownInterval = null, mouseDownTimeout = null, shiftKey = !1;
    this.incrementSupport = function(increment) {
        return function(evt) {
            if (evt.target !== document.activeElement && "wheel" === evt.type) return !0;
            if ("keyup" === evt.type) return shiftKey = !1, !0;
            if ("mouseup" !== evt.type && "mouseout" !== evt.type || (clearInterval(mouseDownInterval), 
            clearTimeout(mouseDownTimeout), mouseDownTimeout = null, mouseDownInterval = null), 
            "wheel" !== evt.type && "mousedown" !== evt.type || (evt.preventDefault(), !this.isCoolingDown(0, 40))) {
                var direction, element = evt.target, defaultIncrement = "pixelsUnit" === this.currentUnit ? 1 : .1;
                if (shiftKey = evt.shiftKey, evt.keyCode && evt.keyCode === iaw.a11y.Keys.DOWN || evt.wheelDelta && evt.wheelDelta < 0 || "mousedown" === evt.type && evt.target.classList.contains("spc-textfield__stepdown") ? direction = -1 : (evt.keyCode && evt.keyCode === iaw.a11y.Keys.UP || evt.wheelDelta && evt.wheelDelta > 0 || "mousedown" === evt.type && evt.target.classList.contains("spc-textfield__stepup")) && (direction = 1), 
                "mousedown" === evt.type && (mouseDownInterval || (mouseDownTimeout = setTimeout(function() {
                    var _this3 = this;
                    mouseDownInterval = setInterval(function() {
                        var evt = new Event("mousedown", {
                            bubbles: !0
                        });
                        evt.shiftKey = shiftKey, _this3.dispatchEvent(evt);
                    }, 40);
                }.bind(element), 1e3)), element = evt.target.parentElement.parentElement.querySelector("input")), 
                element === document.activeElement || "mousedown" === evt.type) return increment = increment || defaultIncrement, 
                evt.shiftKey && (increment *= 10), void 0 !== element.dataset.bleed && (increment = this.bleedIncrement[this.currentUnit], 
                evt.metaKey && !evt.shiftKey && (increment = this.secondaryBleedIncrement[this.currentUnit]), 
                evt.shiftKey && !evt.metaKey && (increment = this.shiftBleedIncrement[this.currentUnit])), 
                1 !== direction && direction !== -1 || (evt.preventDefault(), element.value = iaw.util.roundDecimal(Number(element.value) + direction * increment, 4), 
                element.dispatchEvent(new Event("change", {
                    bubbles: !0
                })), element.select()), !0;
            }
        };
    }, this.formKeypressHandler = function(evt) {
        return evt.keyCode === iaw.a11y.Keys.ENTER && (evt.stopPropagation(), _this.validateNumericFields(), 
        riotctrl.trigger("host-create-template-doc")), !0;
    }, this.formClickHandler = function(evt) {
        return _this.closeDropDownsExcept(evt.srcElement), !0;
    }, this.colorModeChangeHandler = function(evt) {
        _this.initialSettings.mode !== evt.target.dataset.value ? _this.colorModeWarningIcon.classList.add("docsettings__warning--show") : _this.colorModeWarningIcon.classList.remove("docsettings__warning--show");
    }, this.bleedChainHandler = function(evt) {
        return _this.lockBleed = !_this.lockBleed, evt.target.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.lockBleed && _this.updateAllBleed(_this.lastBleed.value), !0;
    }, this.toggleColorModeHandler = function(evt) {
        setTimeout(function() {
            iaw.util.smoothScroll(this.docsettingsScrollContainer, this.docsettingsScrollContainer.scrollHeight - this.docsettingsScrollContainer.offsetHeight, 300);
        }.bind(_this), 100);
    }, this.initData = function() {
        this.data = this.opts;
        var fnftSettings = iaw.store.get([ "host", "fnftSettings" ]) || {};
        this.docSizeBounds = fnftSettings.docSizeBounds || [ 3e5, 3e5 ], this.units = fnftSettings.units || [], 
        this.colorModes = fnftSettings.colorMode || [], this.pointsPerInch = fnftSettings.pointsPerInch || 72, 
        this.picasPerInch = iaw.util.roundDecimal(this.pointsPerInch / this.constant.POINTS_PER_PICA, 4), 
        this.defaultUnits = this.data.units || "inchesUnit", this.currentUnit = this.defaultUnits, 
        this.defaultColorMode = this.data.mode || "CMYK", this.maxDocWidth = this.docSizeBounds[0], 
        this.maxDocHeight = this.docSizeBounds[1], this.minDocWidth = 1, this.minDocHeight = 1, 
        this.artboardCount = this.data.numArtboards || 0, this.currentHeight = iaw.util.roundDecimal(this.data.height, this.roundingRules[this.currentUnit]), 
        this.currentWidth = iaw.util.roundDecimal(this.data.width, this.roundingRules[this.currentUnit]), 
        this.artBoardMin = 1, this.artBoardMax = fnftSettings.maxArtboards || 100, this.leftBleedValue = this.data.appSpecificKey ? this.data.appSpecificKey.bleedOffset[0] : 0, 
        this.topBleedValue = this.data.appSpecificKey ? this.data.appSpecificKey.bleedOffset[1] : 0, 
        this.rightBleedValue = this.data.appSpecificKey ? this.data.appSpecificKey.bleedOffset[2] : 0, 
        this.bottomBleedValue = this.data.appSpecificKey ? this.data.appSpecificKey.bleedOffset[3] : 0, 
        this.lockBleed = !this.data.appSpecificKey || "undefined" == typeof this.data.appSpecificKey.lockBleed || this.data.appSpecificKey.lockBleed, 
        this.bleedMin = 0, this.bleedMax = 72, this.lastBleed = this.topbleed, this.convertedMaxDocWidth, 
        this.convertedMaxDocHeight, this.convertedMinDocWidth, this.convertedMinDocHeight, 
        this.convertedMinBleed, this.convertedMaxBleed, this.appSpecificKey = JSON.parse(JSON.stringify(this.data.appSpecificKey || {})), 
        this.convertBounds(this.conversionMappings[this.currentUnit]), this.initialSettings = {
            width: this.data.width,
            height: this.data.height,
            units: this.data.units,
            mode: this.data.mode,
            maxArtboards: this.data.maxArtboards,
            numArtboards: this.data.numArtboards
        }, riotctrl.on("update-i18n-retro", this.onLoc, this);
    }, this.on("mount", function() {
        this.dropDownElements = document.querySelectorAll(".spc-dropdown"), this.validateNumericFields(), 
        this.setStore(), this.inputCursor = iaw.store.select("host-calc-update"), this.inputCursor.on("update", this.onCalcUpdate, {
            scope: this
        }), this.colorModesInput.addEventListener("toggle", this.toggleColorModeHandler);
    }), this.on("before-unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.colorModesInput.removeEventListener("toggle", this.toggleColorModeHandler), 
        this.off("*");
    }), this.onLoc = function() {
        _this.customizeLabel = iaw.i18n.getLocalizedString("newdoc_button_customize_ai"), 
        _this.defaultDocumentName = iaw.store.get([ "input", "doc-name" ]) || iaw.store.get([ "host", "fnftSettings", "documentName" ]) || iaw.i18n.getLocalizedString("newdoc_default_docname"), 
        _this.heading = iaw.i18n.getLocalizedString("newdoc_details_label_title"), _this.widthLabel = iaw.i18n.getLocalizedString("newdoc_details_label_width"), 
        _this.heightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_height"), 
        _this.colorModeLabel = iaw.i18n.getLocalizedString("newdoc_details_label_colormode"), 
        _this.bleedLabel = iaw.i18n.getLocalizedString("newdoc_details_label_bleed"), _this.topLabel = iaw.i18n.getLocalizedString("newdoc_details_label_top"), 
        _this.bottomLabel = iaw.i18n.getLocalizedString("newdoc_details_label_bottom"), 
        _this.leftLabel = iaw.i18n.getLocalizedString("newdoc_details_label_left"), _this.rightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_right"), 
        _this.orientationLabel = iaw.i18n.getLocalizedString("newdoc_details_label_orientation"), 
        _this.artboardLabel = iaw.i18n.getLocalizedString("newdoc_details_label_artboards"), 
        _this.colorModeWarning = iaw.i18n.getLocalizedString("newdoc_ai_colormode_warning"), 
        _this.localizedUnits = _this.localizeArray("newdoc_details_", _this.units), _this.localizedColorModes = _this.localizeArray("newdoc_details_colormode_", _this.colorModes), 
        _this.isMounted && (_this.update(), _this.validateNumericFields(), _this.setStore()), 
        _this.mixin("spcmixin");
    }, this.onCalcUpdate = function(evt) {
        var calcData = iaw.store.get("host-calc-update");
        if (calcData) switch (calcData.fieldId) {
          case "width":
            _this.currentWidth = calcData.value;
            break;

          case "height":
            _this.currentHeight = calcData.value;
        }
        _this.update();
    }, this.initData();
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
};

riot.tag2("preset-form-phxs", '<div class="sidebar-padding" if="{!presetMode}"> <h6 class="spc-typography--caption preset-form__caption">{heading}</h6> </div> <form name="docsettings" class="docsettings__form" onchange="{validateNumericFields}" onkeypress="{formKeypressHandler}" onclick="{formClickHandler}"> <div class="preset-disclosure" if="{presetMode}" onkeydown="{handlePresetEsc}"> <h6 class="spc-typography--caption preset-form__caption">{presetHeading}</h6> <div class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet" id="presetNameTextField"> <input id="formPresetName" class="spc-textfield__input" type="text" onkeyup="{testValidPresetName}" value="{defaultPresetName}"> <span class="spc-textfield__error">{presetCollisionLabel}</span> </div> <div class="preset-button-container"> <button id="presetSaveCancel" class="spc-button" onclick="{toggleSavePreset}">{cancel}</button> <button id="presetSaveCommit" class="spc-button spc-button--cta" onclick="{savePreset}">{savePresetLabel}</button> </div> </div> <div name="docsettingsScrollContainer" class="form-preset__container scroll-container"> <div name="scrollpane" class="scroll-pane"> <div class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet document-name" if="{!presetMode}"> <input name="formName" class="spc-textfield__input ps-document-name__input" type="text" value="{defaultDocumentName}" pattern="{fileNameValidationPattern}" onchange="{documentNameChangeHandler}" onclick="{selectInput}"> <i class="inapp-icons inapp-icon--preset docsettings__save-preset-button" onclick="{toggleSavePreset}"></i> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{widthLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2 docsettings--flex-start"> <div class="spc-textfield spc-js-textfield"> <input name="formWidth" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" class="spc-textfield__input" pattern="[0-9]*" min="{convertedMinDocWidth}" step="{1 / Math.pow(10, roundingRules[currentUnit])}" max="{convertedMaxDocWidth}" value="{iaw.util.roundDecimal(currentWidth, roundingRules[currentUnit])}" type="{\'number\'}"> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{heightLabel}</span> </div> </div> <div class="docsettings__row"> <div class="spc-textfield spc-js-textfield docsettings--no-margin"> <input name="formHeight" onclick="{selectInput}" onwheel="{incrementSupport()}" onkeydown="{incrementSupport()}" class="spc-textfield__input" pattern="[0-9]*" step="{1 / Math.pow(10, roundingRules[currentUnit])}" min="{convertedMinDocHeight}" max="{convertedMaxDocHeight}" value="{iaw.util.roundDecimal(currentHeight, roundingRules[currentUnit])}" type="{\'number\'}"> </div> <div class="docsettings--grow-5"></div> </div> </div> <div class="docsettings--grow-5"> <div name="unitDropdown" onchange="{unitDropdownHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{widthLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultUnits === unit.value} spc-dropdown__option" data-value="{unit.value}" each="{unit in localizedUnits}" if="{unit.value !== \'columnsUnit\'}"> {unit.localizedValue} </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-1"> <div class="docsettings__row"> <div class="docsettings--grow-1"> <span class="docsettings__field-label spc-textfield--left-label">{orientationLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-1 docsettings__orientation-input" name="orientationInput"> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationPortrait"> <input id="orientationPortrait" type="checkbox" value="portrait" class="spc-icon-toggle__input {is-checked: orientationIsPortrait}" __checked="{orientationIsPortrait}" onchange="{orientationChangeHandler}"> <i class="spc-icon-toggle__label inapp-icons inapp-icon--portrait"></i> </label> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientationLandscape"> <input id="orientationLandscape" type="checkbox" value="landscape" class="spc-icon-toggle__input {is-checked: !orientationIsPortrait}" __checked="{!orientationIsPortrait}" onchange="{orientationChangeHandler}"> <i class="spc-icon-toggle__label inapp-icons inapp-icon--landscape"></i> </label> </div> </div> </div> <div class="docsettings--grow-1 docsettings--stretch"> <div class="docsettings__row"> <div class="docsettings--grow-1"> <span class="docsettings__field-label--nowrap spc-textfield--left-label">{artboardLabel}</span> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-1"> <label class="spc-checkbox spc-js-checkbox" class="{is-checked: artboards.length > 0, spc-checkbox, spc-js-checkbox}" for="artboardInput"> <input type="checkbox" __checked="{artboards.length > 0}" id="artboardInput" class="spc-checkbox__input" onchange="{artboardInputChangeHandler}"> </label> </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{resolutionLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield"> <input name="formResolution" onclick="{selectInput}" onwheel="{incrementSupport(0.1)}" onkeydown="{incrementSupport(0.1)}" class="spc-textfield__input" pattern="[0-9]*" min="{iaw.util.ceilDecimal(minResolution, roundingRules[\'resolution\'])}" max="{iaw.util.floorDecimal(maxResolution, roundingRules[\'resolution\'])}" step="0.001" value="{iaw.util.roundDecimal(currentResolution, roundingRules[\'resolution\'])}" type="{\'number\'}"> </div> </div> <div class="docsettings--grow-5"> <div name="resolutionUnitDropdown" onchange="{resolutionUnitDropdownHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{resolutionLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultResolutionUnits === resolutionUnit.value} spc-dropdown__option" data-value="{resolutionUnit.value}" each="{resolutionUnit in localizedResolutionUnits}"> {resolutionUnit.localizedValue} </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{colorModeLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div name="colorModesInput" onchange="{colorModeChangeHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{colorModeLabel}</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div class="{is-checked: defaultColorMode === mode.mode} spc-dropdown__option" data-values="{JSON.stringify(mode.values)}" data-value="{mode.mode}" each="{mode in availableColorModes}"> {mode.localizedValue} </div> </div> </div> </div> </div> <div class="docsettings--grow-1-half"> <div name="depthInput" onchange="{depthChangeHandler}" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>Unit</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div each="{depth in colorDepthOptions}" class="{is-checked: depth === currentColorModeDepth} spc-dropdown__option" data-value="{depth}"> {depth} {localizeBitValue(depth)} </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{backgroundLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-3"> <div name="backgroundInput" class="spc-dropdown spc-js-dropdown" tabindex="0" onchange="{backgroundInputHandler}"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{backgroundLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultBackgroundColor === bg.value} spc-dropdown__option" data-value="{bg.value}" each="{bg in availableBackgroundValues}"> {bg.localizedValue} </div> </div> </div> </div> </div> <div class="docsettings--grow-1"> <div name="backgroundColorPicker" class="color-picker__container"> <div class="color-picker__color-swatch" onclick="{backgroundColorSwatchHandler}" riot-style="background-color:{customBackgroundRGB}"></div> </div> </div> </div> <div class="docsettings__disclosure-container"> <div class="docsettings__disclosure-header" onclick="{toggleAdvancedOptions}" onkeypress="{toggleAdvancedOptions}" tabindex="0"> <span class="docsettings__disclosure-indicator spc-icons {docsettings__disclosure-indicator--closed: advancedClosed}">D</span> <span>{customizeLabel}</span> </div> <div class="docsettings__disclosure-contents {docsettings__disclosure-contents--closed: advancedClosed}" name="advancedOptionsContents" riot-style="min-height:{getAdvancedDialogHeight()}px"> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{colorProfileLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div name="colorProfileInput" class="spc-dropdown spc-js-dropdown" onchange="{colorProfileInputHandler}" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{colorProfileLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="profileselection" class="spc-dropdown__options"> <div data-value="{sublist}" each="{sublist in (colorProfileList)}"> <div class="{is-checked: colorProfile === profile.value} spc-dropdown__option" data-value="{profile.value}" each="{profile in (sublist)}"> {profile.label} </div> <hr class="spc-dropdown__divider"> </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--spacing"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{pixelScaleLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div name="pixelScaleInput" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{pixelScaleLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="scaleselection" class="spc-dropdown__options"> <div class="{is-checked: pixelScale === scale.value} spc-dropdown__option" data-value="{scale.value}" each="{scale in pixelScaleList}"> {scale.label} </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> </form> <action-footer if="{!presetMode}"></action-footer>', "", "", function(opts) {
    var _this = this;
    this.mixin("unitConversion"), this.mixin("cooldown"), this.constants = {
        POINTS_PER_PICA: 12
    }, this.conversionMappings = {
        pixelsUnit: "px",
        millimetersUnit: "mm",
        centimetersUnit: "cm",
        inchesUnit: "in",
        picasUnit: "pc",
        pointsUnit: "pt"
    }, this.roundingRules = {
        pixelsUnit: 0,
        millimetersUnit: 2,
        centimetersUnit: 2,
        inchesUnit: 3,
        picasUnit: 2,
        pointsUnit: 1,
        resolution: 3
    }, this.defaultMinResolution = 1, this.defaultMaxResolution = 29999.99, this.cancel = "", 
    this.savePresetLabel = "", this.customizeLabel = "", this.defaultDocumentName = "", 
    this.defaultPresetName = "", this.heading = "", this.presetHeading = "", this.presetCollisionLabel = "", 
    this.widthLabel = "", this.presetText = "", this.heightLabel = "", this.resolutionLabel = "", 
    this.colorModeLabel = "", this.backgroundLabel = "", this.colorProfileLabel = "", 
    this.pixelScaleLabel = "", this.orientationLabel = "", this.artboardLabel = "", 
    this.localizedUnits = [], this.localizedResolutionUnits = [], this.localizedBackgroundValues = [], 
    this.availableBackgroundValues = [], this.localizedColorModes = [], this.availableColorModes = [], 
    this.advancedDialogHeight = iaw.store.get([ "sidepanel", "scrollHeight" ]) || 0;
    var isWin = iaw.util.isWindowsOS();
    this.fileNameReplaceRegex = isWin ? /[<>:"\/\\|?*]/g : /[:]/g, this.fileNameValidationPattern = isWin ? '[^<>:"/\\\\|?*]+' : "[^:]+", 
    this.orientationIsPortrait = !0, this.localizeArray = function(locPrefix, values) {
        var newArray = [];
        if (Array.isArray(values)) {
            var i, len;
            for (i = 0, len = values.length; i < len; i++) "string" == typeof values[i] ? newArray.push({
                value: values[i],
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i])
            }) : "object" === _typeof(values[i]) && newArray.push({
                values: values[i].values,
                mode: values[i].mode,
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i].mode)
            });
        }
        return newArray;
    }, this.localizeBitValue = function(depth) {
        return iaw.i18n.getLocalizedString("newdoc_details_colormode_bit_" + depth);
    }, this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        riotctrl.trigger(axn);
    }, this.updateSavedPreset = function(value) {
        if (!value) return void console.error("Failed to updateSavedPreset because no data was provided");
        var nextElement, presetObj = window.__adobe_cep__ ? iaw.apps.phxs.convertPsPresetToCCXPresetEntry(JSON.parse(value), "saved", iaw.store.get("phxsFNFTConfigInfo")) : value, presetData = iaw.store.get("presets"), presetLUT = iaw.store.get("presetLUT");
        presetData.filter(function(preset) {
            return "saved" === preset.template_category;
        }).some(function(preset) {
            if (preset.name.localeCompare(presetObj.name) > 0) return nextElement = preset, 
            !0;
        });
        var index = presetData.length;
        nextElement && (index = presetLUT[nextElement.uuid]);
        var uuid = iaw.util.generateGUID();
        presetObj.uuid = uuid, presetData.splice(index, 0, presetObj);
        for (var key in presetLUT) presetLUT.hasOwnProperty(key) && presetLUT[key] >= index && (presetLUT[key] = presetLUT[key] + 1);
        presetLUT[uuid] = index, iaw.store.set("presets", presetData), iaw.store.set("presetLUT", presetLUT), 
        setTimeout(function() {
            riotctrl.trigger(iaw.fnftEvents.FILTER, "saved", presetObj.title);
        }, 0);
    }, this.savePreset = function(evt) {
        var curPresetName = document.getElementById("formPresetName").value, presetData = iaw.store.get("presets");
        presetData = presetData.filter(function(preset) {
            return "recent" !== preset.template_category;
        }), presetData.some(function(curPreset) {
            return curPreset.name === curPresetName;
        }, _this) || "" !== curPresetName.trim() && (iaw.fnft.createPreset(curPresetName, _this.updateSavedPreset), 
        _this.toggleSavePreset());
    }, this.toggleSavePreset = function(evt) {
        if (!_this.presetMode) {
            var presetData = iaw.store.get("presets");
            presetData = presetData.filter(function(preset) {
                return "recent" !== preset.template_category;
            });
            for (var increment = 0, found = !0, title = iaw.i18n.getLocalizedString("newdoc_filter_saved"); found; ) ++increment, 
            found = presetData.some(function(presetObj) {
                return presetObj.name === title + " " + increment.toString();
            });
            _this.defaultPresetName = title + " " + increment, iaw.store.set([ "input", "preset-name" ], _this.defaultPresetName);
        }
        iaw.localstorage.setUserItem("fnft.presetMode", !_this.presetMode), _this.update({
            presetMode: !_this.presetMode
        }), _this.presetMode && _this.formPresetName && setTimeout(function() {
            _this.formPresetName.select();
        }, 0);
    }, this.setStore = function() {
        var unit = _this.unitDropdown.querySelector(".is-checked"), resolutionUnit = _this.resolutionUnitDropdown.querySelector(".is-checked"), colorMode = _this.colorModesInput.querySelector(".is-checked"), colorDepth = _this.depthInput.querySelector(".is-checked"), colorProfile = _this.colorProfileInput.querySelector(".is-checked"), pixelScale = _this.pixelScaleInput.querySelector(".is-checked"), fill = _this.defaultBackgroundColor;
        "custom" === fill && _this.customBackgroundColorObject instanceof Object && (fill = _this.customBackgroundColorObject), 
        _this.colorProfile = colorProfile && colorProfile.dataset.value, _this.pixelScale = pixelScale && parseFloat(pixelScale.dataset.value), 
        iaw.store.set([ "input", "doc-name" ], _this.validateName(_this.formName.value) || _this.defaultDocumentName), 
        document.getElementById("formPresetName") && iaw.store.set([ "input", "preset-name" ], document.getElementById("formPresetName").value || _this.defaultPresetName);
        var settingsStore = iaw.store.merge([ "input", "settings" ], {
            width: _this.currentWidth,
            units: unit.dataset.value,
            height: _this.currentHeight,
            resolution: parseFloat(_this.formResolution.value),
            resolutionUnits: resolutionUnit.dataset.value,
            mode: colorMode && colorMode.dataset && colorMode.dataset.value,
            depth: colorDepth && colorDepth.dataset && parseInt(colorDepth.dataset.value),
            profile: _this.colorProfile,
            scale: _this.pixelScale,
            fill: fill,
            artboards: _this.artboards,
            attributesChanged: !1
        });
        _this.settingsChanged(_this.initialSettings, settingsStore) ? (settingsStore.name = "", 
        settingsStore.attributesChanged = !0) : settingsStore.name = _this.data.name, settingsStore.height !== _this.initialSettings.height || settingsStore.width !== _this.initialSettings.width ? settingsStore.guides = [] : settingsStore.guides = _this.data.guides;
    }, this.check = function(el) {
        el.checked || (el.checked = !0, el.parentElement.classList.add("is-checked"));
    }, this.uncheck = function(el) {
        el.checked && (el.checked = !1, el.parentElement.classList.remove("is-checked"));
    }, this.closeDropDownsExcept = function(dropDownEl) {
        var i, len;
        for (i = 0, len = _this.dropDownElements.length; i < len; i++) _this.dropDownElements[i].contains(dropDownEl) || _this.dropDownElements[i].classList.remove("is-open");
    }, this.settingsChanged = function(obj1, obj2) {
        var key;
        for (key in obj1) if ("name" !== key && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (void 0 === obj1[key]) continue;
            if ("object" === _typeof(obj1[key])) {
                if ("object" !== _typeof(obj2[key])) return !0;
                if (Array.isArray(obj1[key]) && (!Array.isArray(obj2[key]) || obj2[key].length !== obj1[key].length)) return !0;
                if (!Array.isArray(obj1[key])) return _this.settingsChanged(obj1[key], obj2[key]);
            } else if (obj1[key] !== obj2[key]) return !0;
        }
        return !1;
    }, this.validateName = function(name) {
        return name = name.replace(_this.fileNameReplaceRegex, "_");
    }, this.validateNumericFields = function() {
        function validate(raw, cur, min, max) {
            return Math.max(Math.min(Number(raw) || cur, max), min);
        }
        var newResolution = validate(_this.formResolution.value, _this.currentResolution, _this.minResolution, _this.maxResolution), newResolutionRounded = iaw.util.roundDecimal(newResolution, _this.roundingRules.resolution), currentResolutionRounded = iaw.util.roundDecimal(_this.currentResolution, _this.roundingRules.resolution);
        _this.formResolution.value = newResolutionRounded, newResolutionRounded !== currentResolutionRounded && (_this.currentResolution = newResolution, 
        _this.calculateDimensionLimits(_this.conversionMappings[_this.currentUnit]));
        var roundTo = _this.roundingRules[_this.currentUnit], newWidth = validate(_this.formWidth.value, _this.currentWidth, _this.convertedMinDocWidth, _this.convertedMaxDocWidth), newHeight = validate(_this.formHeight.value, _this.currentHeight, _this.convertedMinDocHeight, _this.convertedMaxDocHeight), newWidthRounded = iaw.util.roundDecimal(newWidth, roundTo), newHeightRounded = iaw.util.roundDecimal(newHeight, roundTo), currentWidthRounded = iaw.util.roundDecimal(_this.currentWidth, roundTo), currentHeightRounded = iaw.util.roundDecimal(_this.currentHeight, roundTo);
        _this.formHeight.value = newHeightRounded, _this.formWidth.value = newWidthRounded, 
        currentHeightRounded === newHeightRounded && currentWidthRounded === newWidthRounded || (_this.currentHeight = newHeight, 
        _this.currentWidth = newWidth, _this.calculateResolutionLimits()), _this.formName.parentElement.classList.remove("is-invalid"), 
        _this.formHeight.parentElement.classList.remove("is-invalid"), _this.formWidth.parentElement.classList.remove("is-invalid"), 
        _this.formResolution.parentElement.classList.remove("is-invalid"), _this.updateArtboards(), 
        _this.updateOrientationIcons(), _this.setStore();
    }, this.getAdvancedDialogHeight = function() {
        return this.advancedDialogHeight = this.advancedDialogHeight || Math.round(.6 * this.docsettingsScrollContainer.clientHeight), 
        iaw.store.set([ "sidepanel", "scrollHeight" ], this.advancedDialogHeight), this.advancedDialogHeight;
    }, this.updateOrientationIcons = function() {
        _this.currentHeight >= _this.currentWidth ? (_this.orientationIsPortrait = !0, _this.check(_this.orientationPortrait), 
        _this.uncheck(_this.orientationLandscape)) : (_this.orientationIsPortrait = !1, 
        _this.uncheck(_this.orientationPortrait), _this.check(_this.orientationLandscape));
    }, this.toggleOrientation = function() {
        var temp = _this.formWidth.value;
        _this.formWidth.value = _this.formHeight.value, _this.formHeight.value = temp;
    }, this.updateArtboards = function() {
        _this.artboardInput.checked === !0 ? _this.artboards = [ {
            bottom: _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], "px"),
            left: 0,
            right: _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], "px"),
            top: 0
        } ] : _this.artboards = [];
    }, this.setColorMode = function(colorMode, colorDepthOptions) {
        var nextColorModeDepth, nextState;
        if (!colorDepthOptions) {
            var matchingMode = _this.localizedColorModes.filter(function(el) {
                return el.mode === colorMode;
            });
            colorDepthOptions = matchingMode[0] && matchingMode[0].values || [ 8 ];
        }
        nextColorModeDepth = colorDepthOptions.indexOf(_this.currentColorModeDepth) === -1 ? colorDepthOptions[0] : _this.currentColorModeDepth, 
        nextState = _this.getColorProfileState(colorMode, nextColorModeDepth), iaw.util.assign(nextState, _this.getBackgroundState(colorMode)), 
        nextState.currentColorModeDepth = nextColorModeDepth, nextState.colorDepthOptions = colorDepthOptions, 
        nextState.defaultColorMode = colorMode, _this.update(nextState), _this.colorModesInput.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.colorProfileInput.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.backgroundInput.dispatchEvent(new Event("change", {
            bubbles: !0
        })), _this.depthInput.dispatchEvent(new Event("change", {
            bubbles: !0
        }));
    }, this.deriveColorMode = function(profile) {
        var colorMode, colorProfileLists = _this.colorProfileLists;
        if (!colorProfileLists || !profile) return "RGB";
        for (var i in colorProfileLists) {
            for (var j in colorProfileLists[i]) {
                var k = colorProfileLists[i][j];
                if (Array.isArray(k) && k.indexOf(profile) > -1) {
                    colorMode = i;
                    break;
                }
            }
            if (colorMode) break;
        }
        return colorMode || "RGB";
    }, this.getColorDepthValuesByName = function(name) {
        var i, len;
        for (i = 0, len = _this.colorModes.length; i < len; i++) if (_this.colorModes[i].mode === name) return _this.colorModes[i].values;
        return [];
    }, this.getColorProfileList = function(colorMode, colorDepth) {
        function listToObj(list) {
            return list.reduce(function(prev, cur) {
                return prev.push({
                    value: cur,
                    label: cur
                }), prev;
            }, []);
        }
        var sublist, fnftSettings = iaw.store.get([ "host", "fnftSettings" ]), colorSettings = fnftSettings && fnftSettings.colorSettings || {}, policy = colorSettings[colorMode] && colorSettings[colorMode].policy, workingProfile = colorSettings[colorMode] && colorSettings[colorMode].workingProfile, workingDisplayText = colorSettings[colorMode] && colorSettings[colorMode].workingDisplayText, workingOptionCMOn = {
            value: "default",
            label: workingDisplayText || iaw.i18n.getLocalizedString("newdoc_details_label_workingProfile")
        }, workingOptionCMOff = {
            value: workingProfile || "default",
            label: workingDisplayText || iaw.i18n.getLocalizedString("newdoc_details_label_workingProfile")
        }, noneOption = {
            value: "none",
            label: iaw.i18n.getLocalizedString("newdoc_details_label_noColorManage")
        }, colorProfileList = [];
        return colorProfileList[0] = [], 32 !== colorDepth && colorProfileList[0].push(noneOption), 
        [ "Lab", "bitmap" ].indexOf(colorMode) === -1 && ("off" !== policy ? colorProfileList[0].unshift(workingOptionCMOn) : colorProfileList[0].push(workingOptionCMOff)), 
        _this.colorProfileLists && [ "RGB", "CMYK", "grayscale" ].indexOf(colorMode) >= 0 && _this.colorProfileLists.hasOwnProperty(colorMode) ? (sublist = _this.colorProfileLists[colorMode], 
        colorProfileList.push(listToObj(sublist.STANDARD)), colorProfileList.push(listToObj(sublist.OTHER)), 
        colorProfileList) : colorProfileList;
    }, this.getColorProfileState = function(colorMode, colorDepth) {
        var newColorProfileList = _this.getColorProfileList(colorMode, colorDepth), currentColorProfile = _this.colorProfile, nextState = {
            colorProfileList: newColorProfileList
        }, selectedExists = currentColorProfile && newColorProfileList.some(function(sublist) {
            return sublist.some(function(item) {
                return item && item.value === currentColorProfile;
            });
        });
        return selectedExists || (nextState.colorProfile = newColorProfileList[0] && newColorProfileList[0][0] && newColorProfileList[0][0].value), 
        nextState;
    }, this.getBackgroundState = function(colorMode) {
        if ("bitmap" !== colorMode) return {
            availableBackgroundValues: _this.localizedBackgroundValues
        };
        var availableBackgroundValues = _this.localizedBackgroundValues.filter(function(el) {
            return "transparent" !== el.value;
        }), nextState = {
            availableBackgroundValues: availableBackgroundValues
        }, selectedExists = availableBackgroundValues.some(function(item) {
            return item && item.value === _this.defaultBackgroundColor;
        });
        return selectedExists || (nextState.defaultBackgroundColor = availableBackgroundValues[0] && availableBackgroundValues[0].value), 
        nextState;
    }, this.getColorModeState = function(isArtboard) {
        if (!isArtboard) return {
            availableColorModes: _this.localizedColorModes
        };
        var availableColorModes = _this.localizedColorModes.filter(function(el) {
            return "RGB" === el.mode;
        }), nextState = {
            availableColorModes: availableColorModes
        }, selectedExists = availableColorModes.some(function(item) {
            return item && item.mode === _this.defaultColorMode;
        });
        return selectedExists || (nextState.defaultColorMode = availableColorModes[0] && availableColorModes[0].mode), 
        nextState;
    }, this.calculateDimensionLimits = function(toUnit) {
        _this.convertedMaxDocWidth = _this.conversionHelper(_this.maxDocWidth, "px", toUnit), 
        _this.convertedMaxDocHeight = _this.conversionHelper(_this.maxDocHeight, "px", toUnit), 
        _this.convertedMinDocWidth = _this.conversionHelper(_this.minDocWidth, "px", toUnit), 
        _this.convertedMinDocHeight = _this.conversionHelper(_this.minDocHeight, "px", toUnit), 
        _this.convertedMaxDocWidth = iaw.util.floorDecimal(_this.convertedMaxDocWidth, _this.roundingRules[_this.currentUnit]), 
        _this.convertedMaxDocHeight = iaw.util.floorDecimal(_this.convertedMaxDocHeight, _this.roundingRules[_this.currentUnit]), 
        _this.convertedMinDocWidth = iaw.util.ceilDecimal(_this.convertedMinDocWidth, _this.roundingRules[_this.currentUnit]), 
        _this.convertedMinDocHeight = iaw.util.ceilDecimal(_this.convertedMinDocHeight, _this.roundingRules[_this.currentUnit]);
    }, this.calculateResolutionLimits = function() {
        if ("pixelsUnit" === _this.currentUnit) _this.maxResolution = _this.defaultMaxResolution, 
        _this.minResolution = _this.defaultMinResolution; else {
            var minHeightResolution = _this.minDocHeight / _this.currentHeight, maxHeightResolution = _this.maxDocHeight / _this.currentHeight, minWidthResolution = _this.minDocWidth / _this.currentWidth, maxWidthResolution = _this.maxDocWidth / _this.currentWidth, minResolution = Math.max(minWidthResolution, minHeightResolution), maxResolution = Math.min(maxWidthResolution, maxHeightResolution), minResolutionInches = _this.conversionHelper(minResolution, "in", _this.conversionMappings[_this.currentUnit]), maxResolutionInches = _this.conversionHelper(maxResolution, "in", _this.conversionMappings[_this.currentUnit]), minResolutionInchesClamped = Math.max(minResolutionInches, _this.defaultMinResolution), maxResolutionInchesClamped = Math.min(maxResolutionInches, _this.defaultMaxResolution);
            _this.minResolution = _this.conversionHelper(minResolutionInchesClamped, _this.conversionMappings[_this.currentResolutionUnit], "in"), 
            _this.maxResolution = _this.conversionHelper(maxResolutionInchesClamped, _this.conversionMappings[_this.currentResolutionUnit], "in");
        }
    }, this.conversionHelper = function(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        var resolutionUnitCode = _this.conversionMappings[_this.currentResolutionUnit], resolutionPPI = "in" !== resolutionUnitCode ? _this.convert(_this.currentResolution).from("in").to(resolutionUnitCode) : _this.currentResolution, newValue = _this.convert(value, {
            pointsPerInch: _this.pointsPerInch,
            resolution: resolutionPPI,
            picasPerInch: _this.picasPerInch,
            trim: !1
        }).from(fromUnit).to(toUnit);
        return newValue;
    }, this.setCustomBackgroundRGB = function() {
        var convertToRGB = function(color) {
            return "RGBColor" !== color.type ? (iaw.apps.phxs.convertColorToRGB(color).then(function(rgb) {
                rgb && rgb instanceof Object && this.update({
                    customBackgroundRGB: iaw.apps.phxs.rgbFormat(rgb)
                });
            }.bind(this), function(e) {
                console.error("Failed to convert color to rgb", color, e);
            }.bind(this)), "rgba(0,0,0,0)") : iaw.apps.phxs.rgbFormat(color);
        }.bind(_this);
        switch (_this.defaultBackgroundColor) {
          case "background":
            _this.customBackgroundRGB = convertToRGB(_this.photoshopBackgroundColor);
            break;

          case "custom":
            _this.customBackgroundRGB = convertToRGB(_this.customBackgroundColorObject);
            break;

          case "white":
            _this.customBackgroundRGB = "rgb(255, 255, 255)";
            break;

          case "black":
            _this.customBackgroundRGB = "rgb(0, 0, 0)";
            break;

          default:
            _this.customBackgroundRGB = "rgba(0, 0, 0, 0)";
        }
    }, this.selectInput = function(evt) {
        evt.target.select();
    }, this.documentNameChangeHandler = function() {
        _this.formName.value = _this.validateName(_this.formName.value) || _this.defaultDocumentName;
    }, this.orientationChangeHandler = function(evt) {
        return evt.target.checked ? (_this.toggleOrientation(), !0) : (_this.updateOrientationIcons(), 
        !1);
    }, this.artboardInputChangeHandler = function() {
        var nextState = _this.getColorModeState(_this.artboardInput.checked);
        _this.update(nextState), nextState.hasOwnProperty("defaultColorMode") ? _this.setColorMode(_this.defaultColorMode) : _this.colorModesInput.dispatchEvent(new Event("change", {
            bubbles: !0
        }));
    }, this.unitDropdownHandler = function(evt) {
        var newUnit = evt.target.dataset.value;
        _this.currentWidth = _this.conversionHelper(_this.currentWidth, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[newUnit]), 
        _this.currentHeight = _this.conversionHelper(_this.currentHeight, _this.conversionMappings[_this.currentUnit], _this.conversionMappings[newUnit]), 
        _this.currentUnit = newUnit, _this.calculateDimensionLimits(_this.conversionMappings[newUnit]);
    }, this.resolutionUnitDropdownHandler = function(evt) {
        var newResolutionUnit = evt.target.dataset.value;
        _this.currentResolution = _this.conversionHelper(_this.currentResolution, _this.conversionMappings[newResolutionUnit], _this.conversionMappings[_this.currentResolutionUnit]), 
        _this.currentResolutionUnit = newResolutionUnit, _this.calculateDimensionLimits(_this.conversionMappings[_this.currentUnit]), 
        _this.calculateResolutionLimits();
    }, this.colorProfileInputHandler = function(evt) {
        if (!evt.target.dataset || !evt.target.dataset.value) return void evt.preventDefault();
    }, this.backgroundInputHandler = function(evt) {
        if (evt.preventDefault(), evt.target.dataset && evt.target.dataset.value) {
            var background = _this.backgroundInput.querySelector(".is-checked");
            _this.defaultBackgroundColor = background.dataset.value, "custom" === _this.defaultBackgroundColor && (_this.customBackgroundColorObject || (_this.customBackgroundColorObject = _this.photoshopBackgroundColor), 
            setTimeout(function() {
                _this.backgroundColorSwatchHandler();
            }, 0)), _this.setCustomBackgroundRGB(), _this.setStore();
        }
    }, this.backgroundColorSwatchHandler = function() {
        if (!_this.isCoolingDown(4)) {
            var initialColor;
            switch (_this.defaultBackgroundColor) {
              case "background":
                initialColor = _this.photoshopBackgroundColor;
                break;

              case "custom":
                initialColor = _this.customBackgroundColorObject;
                break;

              case "black":
                initialColor = {
                    red: 0,
                    grain: 0,
                    blue: 0,
                    type: "RGBColor"
                };
                break;

              default:
                initialColor = {
                    red: 255,
                    grain: 255,
                    blue: 255,
                    type: "RGBColor"
                };
            }
            iaw.apps.phxs.promptForCustomColor(initialColor).then(function(result) {
                result && (this.customBackgroundColorObject = result, this.defaultBackgroundColor = "custom", 
                this.setCustomBackgroundRGB(), this.setStore(), this.update(), this.backgroundInput.dispatchEvent(new Event("change", {
                    bubbles: !0
                }))), this.backgroundInput.focus();
            }.bind(_this));
        }
    }, this.handlePresetEsc = function(evt) {
        if (evt.keyCode === iaw.a11y.Keys.ESC) {
            if (_this.isCoolingDown(1, 40)) return;
            _this.presetMode && (evt.stopPropagation(), evt.preventDefault(), setTimeout(function() {
                _this.toggleSavePreset();
            }, 0));
        }
        return !0;
    }, this.testValidPresetName = function(evt) {
        var textfield = document.getElementById("formPresetName"), name = textfield.value, presetData = iaw.store.get("presets");
        presetData = presetData.filter(function(preset) {
            return "recent" !== preset.template_category;
        });
        var presetNameCollision = presetData.some(function(curPreset) {
            return curPreset.name === name;
        }, _this), presetNameInvalid = !1;
        presetNameCollision ? (_this.presetCollisionLabel = iaw.i18n.getLocalizedString("new_preset_details_collision_title"), 
        presetNameInvalid = !0, textfield.parentElement.classList.add("is-invalid")) : "" === name.trim() ? (_this.presetCollisionLabel = iaw.i18n.getLocalizedString("new_preset_details_empty_title"), 
        textfield.parentElement.classList.add("is-invalid"), presetNameInvalid = !0) : textfield.parentElement.classList.remove("is-invalid");
        var button = document.getElementById("presetSaveCommit");
        return button && (button.disabled = presetNameInvalid), _this.update(), !0;
    }, this.formKeypressHandler = function(evt) {
        if (evt.keyCode === iaw.a11y.Keys.ENTER) {
            if (evt.stopPropagation(), _this.validateNumericFields(), _this.presetMode) {
                var cancelButton = document.getElementById("presetSaveCancel");
                cancelButton && cancelButton === document.activeElement ? _this.toggleSavePreset() : _this.savePreset();
            } else riotctrl.trigger("host-create-template-doc");
            return !1;
        }
        return !0;
    }, this.formClickHandler = function(evt) {
        return _this.closeDropDownsExcept(evt.srcElement), !0;
    }, this.depthChangeHandler = function(evt) {
        if (evt.preventDefault(), evt.target.dataset && evt.target.dataset.value) {
            var colorModeDepth = parseInt(evt.target.dataset.value), nextState = _this.getColorProfileState(_this.defaultColorMode, colorModeDepth);
            nextState.currentColorModeDepth = colorModeDepth, _this.update(nextState), _this.setStore(), 
            _this.colorProfileInput.dispatchEvent(new Event("change", {
                bubbles: !0
            }));
        }
    }, this.colorModeChangeHandler = function(evt) {
        if (evt.preventDefault(), evt.target.dataset && evt.target.dataset.value) {
            var colorMode = evt.target.dataset.value, colorDepthOptions = evt.target.dataset.values && JSON.parse(evt.target.dataset.values);
            _this.setColorMode(colorMode, colorDepthOptions), _this.setStore();
        }
    }, this.incrementSupport = function(increment) {
        return function(evt) {
            if (evt.target !== document.activeElement && "wheel" === evt.type) return !0;
            if ("wheel" !== evt.type || (evt.preventDefault(), !this.isCoolingDown(0, 40))) {
                var direction, element = evt.target, defaultIncrement = "pixelsUnit" === this.currentUnit ? 1 : .1;
                if (element === document.activeElement) return evt.keyCode && evt.keyCode === iaw.a11y.Keys.DOWN || evt.wheelDelta && evt.wheelDelta < 0 ? direction = "down" : (evt.keyCode && evt.keyCode === iaw.a11y.Keys.UP || evt.wheelDelta && evt.wheelDelta > 0) && (direction = "up"), 
                increment = increment || defaultIncrement, event.shiftKey && (increment *= 10), 
                "up" === direction ? (evt.preventDefault(), element.value = iaw.util.roundDecimal(Number(element.value) + increment, 3), 
                element.dispatchEvent(new Event("change", {
                    bubbles: !0
                })), element.select()) : "down" === direction && (evt.preventDefault(), element.value = iaw.util.roundDecimal(Number(element.value) - increment, 3), 
                element.dispatchEvent(new Event("change", {
                    bubbles: !0
                })), element.select()), !0;
            }
        };
    }, this.toggleAdvancedOptions = function(evt) {
        "keypress" === evt.type && evt.keyCode !== iaw.a11y.Keys.SPACE || (_this.advancedClosed ? (_this.update({
            advancedClosed: !_this.advancedClosed
        }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 300)) : iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 300, function() {
            _this.update({
                advancedClosed: !_this.advancedClosed
            }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed);
        }));
    }, this.toggleAdvancedOnResize = function() {
        var height = window.innerHeight;
        height > 700 && _this.advancedClosed ? (_this.update({
            advancedClosed: !1
        }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed), iaw.util.smoothScroll(_this.docsettingsScrollContainer, _this.advancedDialogHeight, 0)) : height < 700 && !_this.advancedClosed && iaw.util.smoothScroll(_this.docsettingsScrollContainer, -_this.advancedDialogHeight, 0, function() {
            _this.update({
                advancedClosed: !0
            }), iaw.localstorage.setUserItem("fnft.advancedClosed", _this.advancedClosed);
        });
    }, this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        if ("host-more-options" === axn) {
            var currentAttributes = iaw.store.get([ "input", "settings" ]), ingestData = {
                presetAttributes: {
                    attributes: _this.initialSettings,
                    newAttributes: currentAttributes,
                    attributesChanged: currentAttributes.attributesChanged
                }
            };
            currentAttributes.attributesChanged = ingestData.presetAttributes.attributesChanged, 
            iaw.util.assign(ingestData, _this.data), iaw.analytics.ingest.logFNFTActionClickedEvent("more-options", ingestData);
        }
        riotctrl.trigger(axn);
    }, this.initData = function() {
        this.data = this.opts;
        var fnftSettings = iaw.store.get([ "host", "fnftSettings" ]), inputSettings = iaw.store.get([ "input", "settings" ]), initialAdvancedClosed = iaw.localstorage.getUserItem("fnft.advancedClosed");
        this.presetMode = iaw.localstorage.getUserItem("fnft.presetMode") !== !1, this.docSizeBounds = fnftSettings.docSizeBounds || [ 3e5, 3e5 ], 
        this.units = fnftSettings.units || [], this.resolutionUnits = fnftSettings.resolutionUnits || [], 
        this.colorModes = fnftSettings.colorModes.slice(0) || [], this.backgroundValues = fnftSettings.backgroundValues.slice(0) || [], 
        this.photoshopBackgroundColor = fnftSettings.backgroundColor, this.pointsPerInch = fnftSettings.pointsPerInch || 72, 
        this.colorProfileLists = fnftSettings.colorProfileLists, this.pixelScaleList = fnftSettings.pixelAspectRatios, 
        this.picasPerInch = iaw.util.roundDecimal(this.pointsPerInch / this.constants.POINTS_PER_PICA, 4), 
        this.advancedClosed = initialAdvancedClosed !== !1, this.presetNameInvalid = !1, 
        this.initialSettings = iaw.util.assign({}, fnftSettings.defaultPresetSettings, inputSettings, {
            name: this.data.name,
            width: this.data.width,
            height: this.data.height,
            fill: this.data.fill,
            units: this.data.units,
            resolutionUnits: this.data.resolutionUnits,
            resolution: this.data.resolution,
            mode: this.data.mode,
            depth: this.data.depth,
            profile: this.data.profile,
            artboards: this.data.artboards,
            scale: this.data.scale,
            attributesChanged: !1
        }), this.data.profile && !this.data.mode && (this.initialSettings.mode = this.deriveColorMode(this.data.profile)), 
        "default" === this.initialSettings.profile && fnftSettings.colorSettings[this.initialSettings.mode] && "off" === fnftSettings.colorSettings[this.initialSettings.mode].policy && (this.initialSettings.profile = "none"), 
        "RGB" !== this.initialSettings.mode && (this.initialSettings.artboards = []), iaw.store.set([ "input", "settings" ], {}), 
        iaw.store.deepMerge([ "input", "settings" ], this.initialSettings), this.defaultUnits = this.initialSettings.units || "inchesUnit", 
        this.currentUnit = this.defaultUnits, this.defaultResolutionUnits = this.initialSettings.resolutionUnits || "inchesUnit", 
        this.currentResolutionUnit = this.defaultResolutionUnits, this.defaultColorMode = this.initialSettings.mode, 
        this.colorProfile = this.initialSettings.profile || "", this.pixelScale = this.initialSettings.scale || 1, 
        this.currentResolution = this.initialSettings.resolution || 72, this.currentColorModeDepth = this.initialSettings.depth || 8, 
        this.maxDocWidth = this.docSizeBounds[0], this.maxDocHeight = this.docSizeBounds[1], 
        this.minDocWidth = 1, this.minDocHeight = 1, this.artboards = this.initialSettings.artboards || [], 
        this.currentHeight = this.initialSettings.height, this.currentWidth = this.initialSettings.width, 
        this.orientationIsPortrait = this.currentHeight >= this.currentWidth, this.convertedMaxDocWidth, 
        this.convertedMaxDocHeight, this.convertedMinDocWidth, this.convertedMinDocHeight, 
        this.initialSettings.fill instanceof Object ? (this.customBackgroundColorObject = this.initialSettings.fill, 
        this.defaultBackgroundColor = "custom") : (this.customBackgroundColorObject = null, 
        this.defaultBackgroundColor = this.initialSettings.fill || "white"), this.setCustomBackgroundRGB(), 
        this.colorDepthOptions = this.getColorDepthValuesByName(this.defaultColorMode), 
        this.calculateDimensionLimits(this.conversionMappings[this.currentUnit]), this.calculateResolutionLimits(), 
        riotctrl.on("update-i18n-retro", this.onLoc, this);
    }, this.on("mount", function() {
        var _this2 = this;
        this.dropDownElements = document.querySelectorAll(".spc-dropdown"), this.validateNumericFields(), 
        iaw.store.get([ "sidepanel", "scrollHeight" ]) || this.update(), this.docsettings.addEventListener("click", function(e) {
            _this2.closeDropDownsExcept(e.srcElement);
        }), iaw.motor.add(this.toggleAdvancedOnResize);
    }), this.on("before-unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.off("*"), iaw.motor.remove(this.toggleAdvancedOnResize);
    }), this.onLoc = function() {
        _this.customizeLabel = iaw.i18n.getLocalizedString("newdoc_button_customize"), _this.defaultDocumentName = iaw.store.get([ "input", "doc-name" ]) || iaw.store.get([ "host", "fnftSettings", "defaultDocumentName" ]) || iaw.i18n.getLocalizedString("newdoc_default_docname"), 
        _this.defaultPresetName = iaw.store.get([ "input", "preset-name" ]), _this.heading = iaw.i18n.getLocalizedString("newdoc_details_label_title"), 
        _this.presetHeading = iaw.i18n.getLocalizedString("new_preset_details_label_title"), 
        _this.widthLabel = iaw.i18n.getLocalizedString("newdoc_details_label_width"), _this.presetCollisionLabel = iaw.i18n.getLocalizedString("new_preset_details_collision_title"), 
        _this.presetText = iaw.i18n.getLocalizedString("newdoc_details_label_preset"), _this.heightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_height"), 
        _this.resolutionLabel = iaw.i18n.getLocalizedString("newdoc_details_label_resolution"), 
        _this.colorModeLabel = iaw.i18n.getLocalizedString("newdoc_details_label_colormode"), 
        _this.backgroundLabel = iaw.i18n.getLocalizedString("newdoc_details_label_background"), 
        _this.colorProfileLabel = iaw.i18n.getLocalizedString("newdoc_details_label_colorProfile"), 
        _this.pixelScaleLabel = iaw.i18n.getLocalizedString("newdoc_details_label_pixelScale"), 
        _this.orientationLabel = iaw.i18n.getLocalizedString("newdoc_details_label_orientation"), 
        _this.artboardLabel = iaw.i18n.getLocalizedString("newdoc_details_label_artboards"), 
        _this.localizedBackgroundValues = _this.localizeArray("newdoc_details_backgroundcolor_", _this.backgroundValues), 
        _this.availableBackgroundValues = _this.localizedBackgroundValues, _this.localizedUnits = _this.localizeArray("newdoc_details_", _this.units), 
        _this.localizedResolutionUnits = _this.localizeArray("newdoc_details_resolution_", _this.resolutionUnits), 
        _this.localizedColorModes = _this.localizeArray("newdoc_details_colormode_", _this.colorModes), 
        _this.availableColorModes = _this.localizedColorModes, _this.cancel = iaw.i18n.getLocalizedString("cancel"), 
        _this.savePresetLabel = iaw.i18n.getLocalizedString("newdoc_details_label_save_preset"), 
        iaw.util.assign(_this, _this.getColorModeState(_this.artboards && _this.artboards.length)), 
        iaw.util.assign(_this, _this.getColorProfileState(_this.defaultColorMode, _this.currentColorModeDepth)), 
        _this.isMounted && _this.validateNumericFields(), _this.mixin("spcmixin");
    }, this.initData();
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj;
};

riot.tag2("preset-form-simu", '<div class="sidebar-padding"> <h6 class="spc-typography--caption preset-form__caption">{heading}</h6> </div> <div class="form-preset__container scroll-container"> <div class="scroll-pane"> <form id="docsettings-form" name="docsettings" class="docsettings__form"> <div class="docsettings__doc-name spc-textfield spc-js-textfield spc-textfield--quiet"> <input name="formName" class="spc-textfield__input" type="text" value="{defaultDocumentName}"> </div> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{widthLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield--quiet"> <input id="form-width" class="spc-textfield__input" min="{this.convertedMinDocWidth}" step="{1 / Math.pow(10, roundingRules[currentUnit])}" max="{this.convertedMaxDocWidth}" value="{currentWidth}" type="{\'number\'}"> </div> </div> <div class="docsettings--grow-5"> <div id="form-unit-width" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{widthLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultUnits === unit.value, spc-dropdown__option:true}" data-value="{unit.value}" each="{unit in localizedUnits}" if="{unit.value !== \'columnsUnit\'}"> {unit.localizedValue} </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{heightLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div class="spc-textfield spc-js-textfield spc-textfield--quiet"> <input id="form-height" class="spc-textfield__input" step="{1 / Math.pow(10, roundingRules[currentUnit])}" min="{this.convertedMinDocHeight}" max="{this.convertedMaxDocHeight}" value="{currentHeight}" type="{\'number\'}"> </div> </div> <div class="docsettings--grow-5"></div> </div> <div class="docsettings__row docsettings__row--extra-padding"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{colorModeLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div id="form-color-modes" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{colorModeLabel}</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div class="{is-checked: defaultColorMode === mode.mode, spc-dropdown__option:true}" data-values="{JSON.stringify(mode.values)}" data-value="{mode.mode}" each="{mode in localizedColorModes}"> {mode.localizedValue} </div> </div> </div> </div> </div> <div class="docsettings--grow-2"> <div id="form-color-mode-depth" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>Unit</em></div> <hr class="spc-dropdown__divider"> <div class="spc-dropdown__options"> <div each="{bits in colorModeOptions}" class="{is-checked: bits === currentColorModeDepth, spc-dropdown__option:true}" data-value="{bits}"> {bits} {localizeBitValue(bits)} </div> </div> </div> </div> </div> </div> <div class="docsettings__row docsettings__row--extra-padding"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{backgroundLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-2"> <div id="form-background" class="spc-dropdown spc-js-dropdown" tabindex="0"> <div class="spc-dropdown__inner"> <div class="spc-dropdown__selected"><em>{backgroundLabel}</em></div> <hr class="spc-dropdown__divider"> <div name="unitselection" class="spc-dropdown__options"> <div class="{is-checked: defaultBackgroundColor === bg.value, spc-dropdown__option:true}" data-value="{bg.value}" each="{bg in localizedBackgroundValues}"> {bg.localizedValue} </div> </div> </div> </div> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-3"> <span class="docsettings__field-label spc-textfield--left-label">{orientationLabel}</span> </div> </div> <div class="docsettings__row"> <div class="docsettings--grow-3" id="form-orientation"> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientation-portrait"> <input type="checkbox" id="orientation-portrait" value="portrait" class="spc-icon-toggle__input" checked> <i class="spc-icon-toggle__label inapp-icons inapp-icon--portrait"></i> </label> <label class="spc-icon-toggle spc-js-icon-toggle" for="orientation-landscape"> <input type="checkbox" id="orientation-landscape" value="landscape" class="spc-icon-toggle__input"> <i class="spc-icon-toggle__label inapp-icons inapp-icon--landscape"></i> </label> </div> </div> <div class="docsettings__row docsettings__row--artboard"> <div class="docsettings--grow-1"> <label class="spc-checkbox spc-js-checkbox" class="{is-checked: artboards.length > 0, spc-checkbox, spc-js-checkbox}" for="form-artboards"> <input type="checkbox" __checked="{artboards.length > 0}" id="form-artboards" class="spc-checkbox__input"> <span class="docsettings__field-label spc-textfield--left-label">{artboardLabel}</span> </label> </div> </div> </form> <br> <button class="spc-button" onclick="{onAction}" data-action="host-more-options">{customizeLabel}</button> </div> </div> <action-footer></action-footer>', "", "", function(opts) {
    var _this = this;
    this.defaultUnits = "inchesUnit", this.customizeLabel = "", this.defaultDocumentName = "", 
    this.heading = "", this.widthLabel = "", this.heightLabel = "", this.resolutionLabel = "", 
    this.colorModeLabel = "", this.backgroundLabel = "", this.orientationLabel = "", 
    this.artboardLabel = "", this.bitsLabel = "", this.localizedUnits = [], this.localizedResolutionUnits = [], 
    this.localizedBackgroundValues = [], this.localizedColorModes = [], this.localizeIt = function(locPrefix, values) {
        var newArray = [];
        if (Array.isArray(values)) {
            var i, len;
            for (i = 0, len = values.length; i < len; i++) "string" == typeof values[i] ? newArray.push({
                value: values[i],
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i])
            }) : "object" === _typeof(values[i]) && newArray.push({
                values: values[i].values,
                mode: values[i].mode,
                localizedValue: iaw.i18n.getLocalizedString(locPrefix + values[i].mode)
            });
        }
        return newArray;
    }, this.recordText = function(evt) {
        iaw.store.set([ "input", "doc-name" ], evt.target.value);
    }, this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        riotctrl.trigger(axn);
    }, this.validateName = function(name) {
        return name = name.replace(new RegExp(":", "g"), "-"), name = name.replace(new RegExp("\\\\", "g"), "\\\\");
    }, this.setStore = function() {
        var formWidth = document.getElementById("form-width"), formHeight = document.getElementById("form-height"), formColorMode = document.querySelector("#form-color-modes .is-checked"), formBackgroundColor = document.querySelector("#form-background .is-checked"), formArtboard = document.getElementById("form-artboards"), fill = formBackgroundColor.dataset.value;
        "custom" === fill && _this.customBackgroundColorObject instanceof Object && (fill = _this.customBackgroundColorObject);
        var artboard;
        formArtboard.checked === !0 && (artboard = [ {
            bottom: _this.conversionHelper(parseFloat(formHeight.value), _this.conversionMapping[_this.currentUnit], "px"),
            left: 0,
            right: _this.conversionHelper(parseFloat(formWidth.value), _this.conversionMapping[_this.currentUnit], "px"),
            top: 0
        } ]), iaw.store.set([ "input", "doc-name" ], _this.validateName(_this.formName.value) || _this.defaultDocumentName);
        var settingsStore = iaw.store.set([ "input", "settings" ], {
            width: parseFloat(formWidth.value),
            height: parseFloat(formHeight.value),
            mode: formColorMode.dataset.value,
            fill: fill,
            artboards: artboard
        });
        settingsStore.height !== _this.initialSettings.height || settingsStore.width !== _this.initialSettings.width ? settingsStore.guides = [] : settingsStore.guides = _this.data.guides;
    }, this.toggleWidthAndHeight = function() {
        var temp;
        this.formWidthEl.value < this.formHeightEl.value && this.orientationLandscape.checked ? (temp = this.formWidthEl.value, 
        this.formWidthEl.value = this.formHeightEl.value, this.formHeightEl.value = temp) : this.formWidthEl.value > this.formHeightEl.value && this.orientationPortrait.checked && (temp = this.formWidthEl.value, 
        this.formWidthEl.value = this.formHeightEl.value, this.formHeightEl.value = temp);
    }, this.toggleOrientation = function(elem) {
        this.toggleWidthAndHeight(), elem === this.orientationPortrait ? (this.check(this.orientationPortrait), 
        this.uncheck(this.orientationLandscape)) : (this.uncheck(this.orientationPortrait), 
        this.check(this.orientationLandscape));
    }, this.check = function(el) {
        el.checked = !0, el.parentElement.classList.add("is-checked");
    }, this.uncheck = function(el) {
        el.checked = !1, el.parentElement.classList.remove("is-checked");
    }, this.closeDropDownsExcept = function(dropDownEl) {
        var i, len;
        for (i = 0, len = this.dropDownElements.length; i < len; i++) this.dropDownElements[i].contains(dropDownEl) || this.dropDownElements[i].classList.remove("is-open");
    }, this.updateDropDownWithValue = function(value, element) {
        if (value) {
            var el = element.querySelector('input[value="' + value + '"]');
            el.checked = !0, el.dispatchEvent(new Event("change", {
                bubbles: !0
            }));
        }
    }, this.validateNumericFields = function() {
        if (this.formHeightEl) {
            var height = Number(this.formHeightEl.value), width = Number(this.formWidthEl.value);
            (isNaN(height) || 0 === height) && (height = this.currentHeight), (isNaN(width) || 0 === width) && (width = this.currentWidth), 
            width > this.maxDocWidth && (width = this.maxDocWidth), height > this.maxDocHeight && (height = this.maxDocHeight), 
            height > width ? (this.check(this.orientationPortrait), this.uncheck(this.orientationLandscape)) : height < width && (this.uncheck(this.orientationPortrait), 
            this.check(this.orientationLandscape)), this.currentWidth = width, this.currentHeight = height, 
            this.formWidthEl.value = width, this.formHeightEl.value = height;
        }
    }, this.getColorModeValuesByName = function(name) {
        var i, len;
        for (i = 0, len = this.colorModes.length; i < len; i++) if (this.colorModes[i].mode === name) return this.colorModes[i].values;
        return [];
    }, this.conversionMapping = {
        pixelsUnit: "px",
        millimetersUnit: "mm",
        centimetersUnit: "cm",
        inchesUnit: "in",
        picasUnit: "pc",
        pointsUnit: "pt"
    }, this.on("mount", function() {
        var _this2 = this;
        this.data = this.opts;
        var fnftSettings = iaw.store.get([ "host", "fnftSettings" ]);
        this.docSizeBounds = fnftSettings.docSizeBounds || [ 3e5, 3e5 ], this.units = fnftSettings.units || [], 
        this.colorModes = fnftSettings.colorModes || [], this.backgroundValues = fnftSettings.backgroundValues || [], 
        this.pointsPerInch = fnftSettings.pointsPerInch || 72, this.defaultUnits = this.data.units || "inchesUnit", 
        this.currentUnit = this.defaultUnits, this.defaultBackgroundColor = this.data.fill || "white", 
        this.defaultColorMode = this.data.mode || "RGB", this.defaultColorModeValue = 8, 
        this.maxDocWidth = this.docSizeBounds[0], this.maxDocHeight = this.docSizeBounds[1], 
        this.currentHeight = this.data.height || 1, this.currentWidth = this.data.width || 1, 
        this.initialSettings = {
            width: this.data.width,
            height: this.data.height,
            fill: this.data.fill,
            units: this.data.units,
            resolutionUnits: this.data.resolutionUnits,
            resolution: this.data.resolution,
            mode: this.data.mode,
            depth: this.data.depth,
            artboards: this.data.artboards
        }, this.colorModeOptions = this.getColorModeValuesByName(this.defaultColorMode), 
        riotctrl.on("update-i18n-retro", this.onLoc, this), this.dropDownElements = document.querySelectorAll(".spc-dropdown");
        var unitWidthDropdown = document.querySelector("#form-unit-width"), docSettingsForm = document.getElementById("docsettings-form"), colorModesInput = document.getElementById("form-color-modes");
        this.orientationPortrait = document.getElementById("orientation-portrait"), this.orientationLandscape = document.getElementById("orientation-landscape"), 
        this.orientationInput = document.getElementById("form-orientation"), this.formWidthEl = document.getElementById("form-width"), 
        this.formHeightEl = document.getElementById("form-height"), colorModesInput.addEventListener("change", function(e) {
            _this2.colorModeOptions = JSON.parse(e.target.dataset.values), _this2.colorModeOptions.indexOf(_this2.defaultColorModeValue) === -1 && (_this2.defaultColorModeValue = _this2.colorModeOptions[0]), 
            _this2.update();
            var el = document.querySelector('input[value="' + _this2.defaultColorModeValue + '"]');
            el.checked = !0, el.dispatchEvent(new Event("change", {
                bubbles: !0
            }));
        }), this.orientationInput.addEventListener("change", function(e) {
            _this2.toggleOrientation(e.target);
        }), docSettingsForm.addEventListener("click", function(e) {
            _this2.closeDropDownsExcept(e.srcElement);
        }), docSettingsForm.addEventListener("change", function(e) {
            _this2.validateNumericFields(), _this2.setStore();
        }), unitWidthDropdown.addEventListener("change", function(e) {
            _this2.formWidthEl.value = iaw.util.unitConversion(_this2.formWidthEl.value, {
                pointsPerInch: _this2.pointsPerInch
            }).from(_this2.conversionMapping[_this2.currentUnit]).to(_this2.conversionMapping[e.target.value]), 
            _this2.formHeightEl.value = iaw.util.unitConversion(_this2.formHeightEl.value, {
                pointsPerInch: _this2.pointsPerInch
            }).from(_this2.conversionMapping[_this2.currentUnit]).to(_this2.conversionMapping[e.target.value]), 
            _this2.currentUnit = e.target.value;
        });
    }), this.on("before-unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), this.off("*");
    }), this.onLoc = function() {
        _this.customizeLabel = iaw.i18n.getLocalizedString("newdoc_button_customize"), _this.defaultDocumentName = iaw.i18n.getLocalizedString("newdoc_default_docname"), 
        _this.heading = iaw.i18n.getLocalizedString("newdoc_details_label_title"), _this.widthLabel = iaw.i18n.getLocalizedString("newdoc_details_label_width"), 
        _this.heightLabel = iaw.i18n.getLocalizedString("newdoc_details_label_height"), 
        _this.colorModeLabel = iaw.i18n.getLocalizedString("newdoc_details_label_colormode"), 
        _this.backgroundLabel = iaw.i18n.getLocalizedString("newdoc_details_label_background"), 
        _this.orientationLabel = iaw.i18n.getLocalizedString("newdoc_details_label_orientation"), 
        _this.artboardLabel = iaw.i18n.getLocalizedString("newdoc_details_label_artboards"), 
        _this.bitsLabel = iaw.i18n.getLocalizedString("newdoc_details_colormode_bit_1"), 
        _this.localizedBackgroundValues = _this.localizeIt("newdoc_details_backgroundcolor_", _this.backgroundValues), 
        _this.localizedUnits = _this.localizeIt("newdoc_details_", _this.units), _this.localizedResolutionUnits = _this.localizeIt("newdoc_details_", _this.resolutionUnits), 
        _this.localizedColorModes = _this.localizeIt("newdoc_details_colormode_", _this.colorModes), 
        _this.update(), _this.validateNumericFields(), _this.setStore(), _this.mixin("spcmixin");
    };
}), riot.tag2("preview-nav", '<button class="back-button" onclick="{handleBackAction}"> <i class="inapp-icons inapp-icon--left"></i> <span class="back-button__label" data-i18n="back"></span> </button> <div class="spc-layout-spacer"></div> <span if="{iaw.util.currentBreakPoint === iaw.fnft.RWD_SMALL}" class="preview-nav__actions"> <button class="spc-button" onclick="{handleBackAction}" data-i18n="close_preview"></button> <button class="spc-button spc-button--cta" onclick="{onAction}" data-action="host-screen-template" data-i18n="download"></button> </span> <div class="preview-nav__progress hidden"> <span class="">{downloadStatus}</span> <div class="spc-progress spc-js-progress"></div> </div>', "", 'class="hidden"', function(opts) {
    var _this = this;
    this.mixin("i18n"), this.mixin("spcmixin"), this.mixin("cooldown");
    var active = !1;
    this.downloadStatus = "", this.downloadStarted = !1, this.template = null, this.leaf = null, 
    this.onAction = function(evt) {
        var axn = evt.target.dataset.action;
        switch (axn) {
          case "host-close-fnft":
            if (_this.isCoolingDown(0)) return;
            break;

          case "host-screen-template":
            if (_this.isCoolingDown(1)) return;
            break;

          case "host-create-template-doc":
            var ingestData = {
                settings: {}
            };
            iaw.util.assign(ingestData, iaw.fnft.getTemplateData(iaw.store.get([ "input", "selected-item" ]))), 
            iaw.util.assign(ingestData.settings, iaw.store.get([ "input", "settings" ])), iaw.analytics.ingest.logFNFTActionClickedEvent("preset-create", ingestData), 
            iaw.analytics.ingest.flushEvent();
        }
        riotctrl.trigger(axn);
    }, this.updateProgress = function(v) {
        var p = _this.root.querySelector(".spc-js-progress");
        p.SpectreProgress.setProgress(v);
    }, this.resetVisibility = function() {
        var stat = _this.root.querySelector(".preview-nav__progress"), axn = _this.root.querySelector(".preview-nav__actions");
        stat && stat.classList.add("hidden"), axn && axn.classList.remove("hidden"), _this.update();
    }, this.onDownloadStart = function() {
        _this.downloadStarted = !0;
        var stat = _this.root.querySelector(".preview-nav__progress"), axn = _this.root.querySelector(".preview-nav__actions");
        stat && stat.classList.remove("hidden"), axn && axn.classList.add("hidden");
        var dlBtn = _this.root.querySelector('[data-i18n="open"');
        dlBtn && (dlBtn.innerText = iaw.i18n.getLocalizedString("download")), _this.downloadStatus = "", 
        _this.update();
    }, this.onDownloadEnd = function() {
        var dlBtn = _this.root.querySelector('[data-i18n="download"');
        dlBtn && (dlBtn.innerText = iaw.i18n.getLocalizedString("open"), dlBtn.setAttribute("data-i18n", "open"), 
        dlBtn.setAttribute("data-action", "host-create-template-doc"));
    }, this.handleBackAction = function() {
        iaw.analytics.ingest.logFNFTActionClickedEvent("preview-back", iaw.store.get([ "input", "preview-item" ])), 
        _this.toggle();
    }, this.toggle = function() {
        if (!_this.isCoolingDown(2, 300)) {
            if (active) return iaw.util.hideElement(_this.root), riotctrl.trigger("close-preview"), 
            void (active = !1);
            active = !0;
            var dlTemp = iaw.store.get([ "input", "download-status" ]);
            if (_this.template = iaw.store.get([ "input", "preview-item" ]), dlTemp && dlTemp.templateId === _this.template.id) dlTemp.downloadStatus === iaw.libraryManager.DOWNLOADED ? (_this.resetVisibility(), 
            _this.onDownloadEnd()) : (_this.onDownloadStart(), _this.updateProgress(dlTemp.progress)); else {
                _this.resetVisibility();
                var dlBtn = _this.root.querySelector('[data-i18n="open"');
                dlBtn && (dlBtn.innerText = iaw.i18n.getLocalizedString("download"));
            }
            iaw.util.showElement(_this.root), _this.update(), iaw.analytics.ingest.logFNFTActionClickedEvent("preview", iaw.store.get([ "input", "preview-item" ]));
        }
    }, this.on("mount before-unmount", function(evt) {
        "mount" === evt ? riotctrl.on("toggle-nav-overlay", this.toggle, this) : "before-unmount" === evt && (this.off("*"), 
        riotctrl.off("toggle-nav-overlay", this.toggle, this), riotctrl.off("update-host-retro", this.onHost, this));
    }), this.onHost = function() {
        _this.leaf = iaw.store.select([ "input", "download-status" ]), _this.leaf.on("update", _this.onDownloadStatus);
    }, this.onDownloadStatus = function(evt) {
        if (_this.template) {
            var status = evt.data.currentData;
            if (status.templateId === _this.template.id) {
                if (status.downloadStatus === iaw.libraryManager.DOWNLOADED || iaw.libraryManager.isTemplateLicensed(_this.template.id)) return _this.resetVisibility(), 
                _this.onDownloadEnd(), void _this.update();
                if (0 === status.progress || !_this.downloadStarted) return void _this.onDownloadStart();
                var progressSize = status.progress / 100 * _this.template.size, totoalSize = iaw.util.createFileSizeString(_this.template.size), downloadedSize = iaw.util.createFileSizeString(progressSize);
                _this.downloadStatus = downloadedSize + " " + iaw.i18n.getLocalizedString("of") + " " + totoalSize, 
                _this.updateProgress(status.progress), _this.update();
            }
        }
    }, riotctrl.on("update-host-retro", this.onHost, this);
}), riot.tag2("preview-overlay", '<div class="nav-placeholder"></div> <div class="scroll-container"> <div class="scroll-pane"> <img if="{preview}" riot-src="{preview}"> </div> </div>', "", "", function(opts) {
    var _this = this;
    this.mixin("i18n"), this.mixin("spcmixin"), this.preview = null, this.hide = function() {
        iaw.util.unmountTag(_this);
    }, this.show = function() {
        var template = iaw.store.get([ "input", "preview-item" ]);
        template && template.previews && template.previews.length > 0 && (_this.preview = template.previews[0].url || null), 
        iaw.analytics.ingest.logFNFTActionClickedEvent("render-preview", template), riotctrl.trigger("toggle-nav-overlay"), 
        _this.update();
    }, this.on("mount before-unmount", function(evt) {
        "mount" === evt ? (riotctrl.on("close-preview", this.hide, this), this.show()) : "before-unmount" === evt && (riotctrl.off("close-preview", this.hide, this), 
        this.off("*"));
    });
}), riot.tag2("screen-download", '<span class="spc-typography--headline" data-i18n="newdoc_bigtemplate_header">This is a big file</span> <span class="screen-download__lovenote" data-i18n="newdoc_bigtemplate_body"></span> <span class="screen-download__actions"> <button class="spc-button" onclick="{hide}" data-i18n="cancel">Cancel</button> <button class="spc-button spc-button--cta" onclick="{continueDL}" data-i18n="continue">Continue</button> </span> <label class="spc-checkbox spc-js-checkbox" for="dont-show-dl-screen"> <input type="checkbox" id="dont-show-dl-screen" class="spc-checkbox__input"> <span class="spc-checkbox__label" data-i18n="never_show_again">Don\'t show again</span> </label>', "", 'class="fullscreen-overlay hidden"', function(opts) {
    var _this = this;
    this.mixin("i18n"), this.mixin("spcmixin"), this.mixin("cooldown"), this.show = function() {
        iaw.util.showElement(_this.root), _this.update();
        var btn = _this.root.querySelector(".spc-button--cta");
        btn.focus();
    }, this.hide = function() {
        if (!_this.isCoolingDown(0)) {
            iaw.util.hideElement(_this.root);
            var prevFocus = document.querySelector(".template-grid-item--active");
            prevFocus = prevFocus.querySelector("button"), prevFocus.focus();
        }
    }, this.continueDL = function(evt) {
        if (!_this.isCoolingDown(1)) {
            var v = document.getElementById("dont-show-dl-screen").checked;
            iaw.localstorage.setUserItem("fnft.showFilesizeWarning", !v), riotctrl.trigger("host-license-template"), 
            _this.hide();
        }
    }, this.on("mount", function() {
        riotctrl.on("host-download-template--large", this.show, this);
    }), this.on("before-unmount", function() {
        riotctrl.off("host-download-template--large");
    });
}), riot.tag2("template-download", "", "", "hidden", function(opts) {
    var licenseDialogShowing = !1;
    this.onStartLicense = function(evt) {
        var elementType = iaw.libraryManager.TEMPLATE_ELEMENT_TYPE, template = iaw.store.get([ "input", "preview-item" ]);
        if (template && template.id && template.price_prompt) {
            if (!window.__adobe_cep__) {
                var debugProgress = 0, timer = setInterval(function() {
                    if (debugProgress += 20, debugProgress >= 100) {
                        var status = {
                            title: template.title,
                            templateId: template.id,
                            downloadStatus: iaw.libraryManager.DOWNLOADED,
                            path: "some/fake/path"
                        };
                        return iaw.store.set([ "input", "download-status" ], status), iaw.libraryManager.statusLookupMap[template.id] = {
                            templateId: template.id,
                            downloadStatus: iaw.libraryManager.DOWNLOADED,
                            path: template.url
                        }, void clearInterval(timer);
                    }
                    template.template_category instanceof Array ? template.template_category.push("saved", "recent") : template.template_category = [ template.template_category, "saved", "recent" ], 
                    iaw.store.set([ "input", "download-status" ], {
                        title: template.title,
                        templateId: template.id,
                        size: template.size,
                        downloadStatus: iaw.libraryManager.DOWNLOADING,
                        progress: debugProgress,
                        downloadPending: !0
                    });
                }, 200);
                return void iaw.store.set([ "input", "download-status" ], {
                    templateId: template.id,
                    size: template.size || 0,
                    downloadStatus: iaw.libraryManager.DOWNLOADING,
                    progress: 0,
                    downloadPending: !0
                });
            }
            licenseDialogShowing || iaw.cepUtil.isUserSignedIn(function(signedIn, adobeGUID) {
                signedIn && !iaw.libraryManager.isTemplateDownloading(template.id) && iaw.libraryManager.getTemplateLibrary().then(function(library) {
                    var isFree = "undefined" != typeof template.is_free ? template.is_free : "free" === template.price_prompt, renditionDetails = {
                        path: template.thumbnail_url,
                        width: template.thumbnail_width,
                        height: template.thumbnail_height
                    };
                    licenseDialogShowing = !0, iaw.util.showLicenseDialog({
                        type: elementType,
                        title: template.title
                    }, template.id, isFree, library.id, renditionDetails).then(function() {
                        iaw.store.set([ "input", "download-status" ], {
                            templateId: template.id,
                            size: template.size || 0,
                            downloadStatus: iaw.libraryManager.DOWNLOADING,
                            progress: 0,
                            downloadPending: !0
                        }), licenseDialogShowing = !1;
                    })["catch"](function(err) {
                        licenseDialogShowing = !1;
                    }), iaw.analytics.pip.logFNFTDataGroupEvent("Download Template", {
                        id: String(template.id),
                        name: template.title
                    });
                })["catch"](function(err) {
                    iaw.log.logJSON("load library error: ", err), iaw.store.set([ "input", "download-status" ], {
                        title: template.title,
                        templateId: template.id,
                        size: template.size,
                        downloadStatus: iaw.libraryManager.DOWNLOAD_ERR,
                        err: err
                    }), licenseDialogShowing = !1;
                });
            });
        }
    }, this.onDownloading = function(status) {
        status && status.downloadPending && (status.progress = status.progress || 0, iaw.store.set([ "input", "download-status" ], {
            templateId: status.templateId,
            downloadStatus: "downloading",
            size: status.size || 0,
            progress: status.progress || 0
        }));
    }, this.on("mount before-unmount", function(evt) {
        "mount" === evt ? riotctrl.on("host-license-template", this.onStartLicense, this) : "before-unmount" === evt && (riotctrl.off("host-license-template", this.onStartLicense, this), 
        this.off("*"));
    });
}), riot.tag2("template-form-stock", '<div class="sidebar-padding"> <h6 class="spc-typography--caption preset-form__caption" data-i18n="newdoc_details_label_template_title"></h6> <h6 class="spc-typography--title preset-form__title {preset-form__title--small-margin: showAttribution}">{data.title}</h6> <div class="form-stock__attribution" if="{showAttribution}">{byLabel} <a class="form-stock__attribution__link" onclick="{openAttributionLink}" href="{this.data.contributor_url}">{data.contributor_name}</a></div> <a class="form-stock__more-link" onclick="{openStockLink}"> <img src="images/products/product-rune-STCK.png"> <span data-i18n="adobe_stock"></span> </a> </div> <div class="form-stock__desc scroll-container"> <div class="scroll-pane"> <span class="form-stock__desc-content"></span> <div class="form-stock__price">{data.price_prompt}</div> <div if="{sizeVisible}" class="form-stock__info"> <span data-i18n="listview_size_header"></span>: <span>{iaw.util.createFileSizeString(data.size)}</span> </div> <button if="{previewButtonVisible}" class="spc-button spc-button--secondary form-stock__preview-btn" onclick="{togglePreviewer}" data-i18n="newdoc_button_preview"></button> </div> </div> <div if="{this.isWindows}" class="action-footer"> <button class="spc-button spc-button--cta" onclick="{onAction}" data-action="host-screen-template" data-i18n="download"></button> <button class="spc-button" onclick="{onAction}" __disabled="{previewVisible}" data-action="host-close-fnft" data-i18n="close"></button> </div> <div if="{!this.isWindows}" class="action-footer"> <button class="spc-button" onclick="{onAction}" __disabled="{previewVisible}" data-action="host-close-fnft" data-i18n="close"></button> <button class="spc-button spc-button--cta" onclick="{onAction}" data-action="host-screen-template" data-i18n="download"></button> </div>', "", "", function(opts) {
    var _this = this;
    this.mixin("i18n"), this.mixin("cooldown"), this.defaultDocumentName = "", this.isWindows = "win" === iaw.store.get([ "host", "platform" ]) || "windows" === iaw.store.get([ "host", "platform" ]) || !1, 
    this.dlStatus = null, this.previewVisible = !1, this.sizeVisible = !0, this.previewButtonVisible = !0, 
    this.showAttribution = !1, this.onAction = function(evt) {
        var axn = evt.target.dataset.action, ingestAction = null;
        switch (axn) {
          case "host-close-fnft":
            if (_this.isCoolingDown(0)) return;
            ingestAction = "close-template";
            break;

          case "host-screen-template":
            if (_this.isCoolingDown(1) || iaw.libraryManager.isTemplateDownloading(_this.data.id)) return;
        }
        ingestAction && iaw.analytics.ingest.logFNFTActionClickedEvent(ingestAction, iaw.store.get([ "input", "selected-item" ])), 
        riotctrl.trigger(axn);
    }, this.openStockLink = function() {
        if (!_this.isCoolingDown(3)) {
            var urlSuffix = iaw.i18n.getLangSuffixForAccountURL(iaw.store.get([ "host", "language" ])), baseURL = iaw.stockUtil.STOCK_URL_LICENSE + urlSuffix;
            window.__adobe_cep__ ? iaw.util.openDefaultBrowserAuthenicated("adobeStock", baseURL) : window.open(baseURL);
            var stockURL = iaw.stockUtil.composeStockLink(iaw.store.get([ "host", "hostID" ]), _this.data.template_category[0]), template = iaw.store.get([ "input", "preview-item" ]);
            template.actionURL = stockURL, iaw.analytics.ingest.logFNFTActionClickedEvent("stock-sidebar", template), 
            iaw.analytics.pip.logFNFTDataGroupEvent("Jump to Stock", {
                category: template.activeFilter,
                id: String(template.id),
                name: template.title
            });
        }
    }, this.openAttributionLink = function(evt) {
        if (evt.preventDefault(), !_this.isCoolingDown(4)) {
            var url = evt.target.getAttribute("href");
            window.__adobe_cep__ ? iaw.util.openDefaultBrowserAuthenicated("adobeStock", url) : window.open(url);
        }
    }, this.updateContent = function(txt) {
        var e = document.querySelector(".form-stock__desc-content");
        e.innerHTML = marked(txt);
    }, this.toggleBackgroundItemVisibility = function(show) {
        var el;
        show ? (el = document.querySelector(".template-nav"), el.classList.remove("invisible"), 
        el = document.querySelector(".scroll-pane"), el.classList.remove("invisible")) : (el = document.querySelector(".template-nav"), 
        el.classList.add("invisible"), el = document.querySelector(".scroll-pane"), el.classList.add("invisible"));
    }, this.togglePreviewer = function(evt) {
        var l = evt.target.dataset.i18n;
        if (!_this.isCoolingDown(2, 400)) {
            if ("close_preview" === l) return riotctrl.trigger("close-preview"), riotctrl.trigger("toggle-nav-overlay"), 
            evt.target.dataset.i18n = "newdoc_button_preview", iaw.analytics.ingest.logFNFTActionClickedEvent("preview-close", iaw.store.get([ "input", "preview-item" ])), 
            void _this.toggleBackgroundItemVisibility(!0);
            _this.previewVisible = !0, _this.toggleBackgroundItemVisibility(!1), iaw.util.currentBreakPoint === iaw.fnft.RWD_SMALL ? iaw.util.mountTag("#template-preview--large", "preview-overlay") : iaw.util.mountTag("#template-preview--small", "preview-overlay"), 
            evt.target.dataset.i18n = "close_preview", evt.target.blur();
        }
    }, this.on("mount", function() {
        if (riotctrl.on("close-preview", this.updateButton, this), this.dlStatus = iaw.store.select([ "input", "download-status" ]), 
        this.dlStatus.on("update", this.downloadComplete), this.data = this.opts.__proto__, 
        this.showAttribution = this.data.contributor_name && "" !== this.data.contributor_name && this.data.contributor_url && "" !== this.data.contributor_url, 
        this.sizeVisible = "undefined" != typeof this.data.size, this.previewButtonVisible = this.data.previews && this.data.previews.length > 0, 
        "undefined" != typeof marked ? this.updateContent(this.data.description) : riotctrl.once("markdown-ready-retro", function() {
            this.updateContent(this.data.description), this.update();
        }, this), iaw.libraryManager.isTemplateLicensed(this.data.id)) {
            var el = this.root.querySelector(".action-footer .spc-button--cta");
            el.dataset.i18n = "open", el.dataset.action = "host-create-template-doc";
        }
        this.update();
    }), this.on("before-unmount", function() {
        riotctrl.off("update-i18n-retro", this.onLoc, this), riotctrl.off("close-preview", this.updateButton, this), 
        this.off("*");
    }), this.downloadComplete = function(evt) {
        var template = iaw.store.get([ "input", "preview-item" ]), status = evt && evt.data && evt.data.currentData;
        if (status.templateId === template.id && status.downloadStatus === iaw.libraryManager.DOWNLOADED) {
            var el = _this.root.querySelector(".action-footer .spc-button--cta");
            el && (el.dataset.i18n = "open", el.dataset.action = "host-create-template-doc"), 
            _this.update();
        }
    }, this.onLoc = function() {
        _this.cancelLabel = iaw.i18n.getLocalizedString("close"), _this.byLabel = iaw.i18n.getLocalizedString("by"), 
        iaw.store.set([ "input", "doc-name" ], _this.defaultDocumentName), _this.isMounted && _this.update();
    }, this.updateButton = function() {
        var btn = _this.root.querySelector(".form-stock__preview-btn");
        btn.dataset.i18n = "newdoc_button_preview", _this.previewVisible = !1, _this.toggleBackgroundItemVisibility(!0), 
        _this.update();
    }, riotctrl.on("update-i18n-retro", this.onLoc, this);
}), riot.tag2("preset-grid-item", '<div class="preset-grid-item__thumbnail"> <i class="inapp-icons-preset inapp-icons-preset--{preseticon}"></i> </div> <div class="preset-grid-item__info"> <span class="preset-grid-item__name truncate-text">{this.title}</span> <span class="preset-grid-item__desc truncate-text">{desc}</span> </div> <button class="preset-grid-item__overlay" onfocus="{onFocus}" tabindex="{active ? \'0\' : \'-1\'}"></button> <button class="preset-grid-item__delete anim--fade-in-fast spc-icons spc-icon--trash" onkeydown="{onDelete}" onclick="{onDelete}"></button>', "", 'onkeydown="{keyDown}" ondblclick="{doubleClicked}" data-tip="{opts.data.tip}" class="grid-cell grid-cell--autoSize {preset-grid-item--active: active}"', function(opts) {
    var _this = this;
    this.mixin("tooltip"), this.mixin("spcmixin");
    var uuid = opts.data.uuid;
    this.inputCursor = null, this.thumb = "images/thumbs/" + opts.data.thumbnail_url, 
    this.active = !1, this.preseticon = "", this.title = "", this.desc = "", this.category = "", 
    this.autoClick = function() {
        _this.root.querySelector("button").focus(), _this.active || _this.handleSelected(!0);
    }, this.onFocus = function(evt) {
        return !_this.active && void _this.handleSelected(!1);
    }, this.onDelete = function(evt) {
        if ("keydown" === evt.type) {
            if (evt.keyCode !== iaw.a11y.Keys.ENTER && evt.keyCode !== iaw.a11y.Keys.SPACE) return !0;
            evt.stopPropagation();
        }
        iaw.fnft.deletePreset(_this.title);
        var presets = iaw.store.get("presets"), presetLUT = iaw.store.get("presetLUT");
        delete presets[presetLUT[uuid]], delete presetLUT[uuid], iaw.store.get([ "input", "selected-item" ]) === uuid && iaw.store.set([ "input", "selected-item" ], null);
        var nextTitle = null;
        _this.root.previousSibling && "PRESET-GRID-ITEM" === _this.root.previousSibling.nodeName ? nextTitle = _this.root.previousSibling._tag ? _this.root.previousSibling._tag.title : null : _this.root.nextSibling && "PRESET-GRID-ITEM" === _this.root.nextSibling.nodeName && (nextTitle = _this.root.nextSibling._tag ? _this.root.nextSibling._tag.title : null), 
        riotctrl.trigger(iaw.fnftEvents.FILTER, iaw.store.get([ "input", "active-filter" ]), nextTitle, !0);
    }, this.handleSelected = function(autoClicked) {
        if (!_this.active) {
            var data = _this.opts.data, product = iaw.store.get([ "host", "hostID" ]).toLowerCase();
            autoClicked || iaw.analytics.ingest.logFNFTActionClickedEvent("preset-selected", data), 
            iaw.store.set([ "input", "selected-item" ], uuid), setTimeout(function() {
                riot.mount("#sidebar-container", "preset-form-" + product, data);
            }, 1);
        }
    }, this.resetIcon = function(thumbUrl) {
        switch (thumbUrl) {
          case "SP_PresetArt.png":
            _this.preseticon = "art";
            break;

          case "SP_PresetClipboard.png":
            _this.preseticon = "clipboard";
            break;

          case "SP_PresetCustom.png":
            _this.preseticon = "saved" === _this.category ? "saved" : "custom";
            break;

          case "SP_PresetFilmVideo.png":
            _this.preseticon = "video";
            break;

          case "SP_PresetIconographyDoc.png":
          case "SP_PresetSurfacePro.png":
          case "SP_PresetMobileAppDoc.png":
          case "SP_PresetMobilePhoneDoc.png":
          case "SP_PresetTabletApp.png":
            _this.preseticon = "mobile";
            break;

          case "SP_PresetPhotoDoc.png":
            _this.preseticon = "photo";
            break;

          case "SP_PresetWebDoc.png":
            _this.preseticon = "web";
            break;

          case "SP_PrintDoc.png":
            _this.preseticon = "print";
            break;

          default:
            _this.preseticon = "custom";
        }
        _this.update();
    }, this.doubleClicked = function(evt) {
        iaw.analytics.ingest.logFNFTActionClickedEvent("preset-create", _this.opts.data), 
        riotctrl.trigger("host-create-template-doc");
    }, this.keyDown = function(evt) {
        return evt.keyCode === iaw.a11y.Keys.ENTER && (evt.stopPropagation(), iaw.analytics.ingest.logFNFTActionClickedEvent("preset-create", _this.opts.data), 
        riotctrl.trigger("host-create-template-doc")), !0;
    }, this.on("mount before-unmount", function(evt) {
        if ("mount" === evt) {
            var d = opts.data;
            this.title = d.title, this.desc = d.description, this.category = d.template_category, 
            this.inputCursor = iaw.store.select("input"), this.inputCursor.on("update", this.onInput, {
                scope: this
            });
            var dataIndex = iaw.store.get([ "presetLUT", opts.data.uuid ]);
            "undefined" != typeof dataIndex && (this.updateCursor = iaw.store.select([ "presets", dataIndex, "description" ]), 
            this.updateCursor.on("update", this.onPresetUpdate, {
                scope: this
            })), this.resetIcon(opts.data.thumbnail_url), iaw.store.get([ "input", "selected-item" ]) === uuid && (this.active = !0, 
            this.update());
        } else "before-unmount" === evt && this.off("*");
    }), this.onInput = function(evt) {
        _this.active = evt.data.currentData["selected-item"] === uuid, _this.update();
    }, this.onPresetUpdate = function(evt) {
        _this.desc = evt.data.currentData, _this.update();
    };
}), riot.tag2("template-grid-item", '<div class="template-grid-item__thumbnail" riot-style="background-image: url(\'{opts.data.thumbnail_url}\')"></div> <div class="template-grid-item__info"> <span class="template-grid-item__name">{opts.data.title}</span> <span if="{activeFilter !== \'recent\' && activeFilter !== \'saved\'}" class="spc-layout-spacer"></span> <span if="{activeFilter !== \'recent\' && activeFilter !== \'saved\'}" class="template-grid-item__price">{opts.data.price_prompt}</span> </div> <div class="template-grid-item--licensed hidden"> <i class="inapp-icons inapp-icon--check"></i> </div> <div class="spc-layout__container hidden"> <div class="spc-progress spc-js-progress"></div> <div class="template-grid-item__error hidden"></div> <span>{downloadStatus}</span> </div> <button class="template-grid-item__overlay" onfocus="{onFocus}" tabindex="{active ? \'0\' : \'-1\'}"></button>', "", 'onkeydown="{keyDown}" ondblclick="{onAction}" class="grid-cell grid-cell--autoSize {template-grid-item--active: active}"', function(opts) {
    var _this = this;
    this.mixin("spcmixin");
    var uuid = opts.data.uuid;
    this.inputCursor = null, this.dlStatus = null, this.active = !1, this.activeFilter = "recent", 
    this.downloadStatus = "", this.downloadStarted = !1, this.downloadEnded = !1, this.keyDown = function(evt) {
        return evt.keyCode === iaw.a11y.Keys.ENTER && _this.onAction(), !0;
    }, this.onAction = function() {
        if (!_this.isDownloading()) {
            var id = _this.opts.data._item ? _this.opts.data._item.id : _this.opts.data.id;
            iaw.libraryManager.isTemplateLicensed(id) ? riotctrl.trigger("host-create-template-doc") : riotctrl.trigger("host-screen-template");
        }
    }, this.autoClick = function() {
        _this.root.querySelector("button").focus(), _this.active || _this.onFocus();
    }, this.onFocus = function(evt) {
        if (_this.active) return !1;
        var d = _this.opts.data;
        iaw.analytics.ingest.logFNFTActionClickedEvent("template-selected", d), iaw.store.set([ "input", "selected-item" ], uuid), 
        iaw.store.set([ "input", "preview-item" ], d._item ? d._item : d), setTimeout(function() {
            riot.mount("#sidebar-container", "template-form-stock", d);
        }, 0);
    }, this.isDownloading = function() {
        return _this.downloadStarted === !0 && _this.downloadEnded === !1;
    }, this.onDownloadStart = function(status) {
        _this.downloadStarted = !0, _this.clearError();
        var downloading = _this.root.querySelector(".spc-layout__container");
        downloading && downloading.classList.remove("hidden"), _this.updateProgress(status), 
        _this.update();
    }, this.onDownloadEnd = function() {
        _this.downloadEnded = !0;
        var el = _this.root.querySelector(".spc-layout__container");
        el.classList.add("hidden"), el = _this.root.querySelector(".template-grid-item--licensed"), 
        el.classList.remove("hidden");
    }, this.updateProgress = function(status) {
        var d = _this.opts.data, p = _this.root.querySelector(".spc-js-progress");
        p.SpectreProgress.setProgress(status.progress), status.size = status.size || d.size;
        var progressSize = status.progress / 100 * status.size, totoalSize = iaw.util.createFileSizeString(status.size), downloadedSize = 0 === progressSize ? "0" : iaw.util.createFileSizeString(progressSize);
        _this.downloadStatus = downloadedSize + " " + iaw.i18n.getLocalizedString("of") + " " + totoalSize;
    }, this.showError = function(errorString) {
        _this.downloadStatus = errorString || "default error message.", _this.update();
        var error = _this.root.querySelector(".template-grid-item__error");
        error && error.classList.remove("hidden");
        var downloading = _this.root.querySelector(".spc-layout__container");
        downloading && downloading.classList.add("hidden");
    }, this.clearError = function() {
        var error = _this.root.querySelector(".template-grid-item__error");
        error && error.classList.add("hidden");
    }, this.on("mount before-unmount", function(evt) {
        if ("mount" === evt) {
            this.inputCursor = iaw.store.select("input"), this.inputCursor.on("update", this.onInput), 
            this.dlStatus = iaw.store.select([ "input", "download-status" ]), this.dlStatus.on("update", this.onDownloadStatus), 
            iaw.store.get([ "input", "selected-item" ]) === uuid && (this.active = !0, this.update());
            var isDynamic = !!opts.data, data = isDynamic ? opts.data : this;
            if (iaw.libraryManager.isTemplateLicensed(data.id)) {
                var el = this.root.querySelector(".template-grid-item--licensed");
                el.classList.remove("hidden");
            } else iaw.libraryManager.isTemplateDownloading(data.id) && this.onDownloadStatus(iaw.libraryManager.getTemplateStatus(data.id));
        } else "before-unmount" === evt && this.off("*");
    }), this.onInput = function(evt) {
        _this.active = evt.data.currentData["selected-item"] === uuid, _this.activeFilter = iaw.store.get([ "input", "active-filter" ]), 
        _this.update();
    }, this.onDownloadStatus = function(evt) {
        if (!_this.downloadEnded) {
            var status = evt.data && evt.data.currentData || evt, d = opts.data;
            if (d && status.templateId === d.id) {
                switch (status.downloadStatus) {
                  case iaw.libraryManager.DOWNLOADED:
                    return _this.onDownloadEnd(), void _this.update();

                  case iaw.libraryManager.DOWNLOAD_ERR:
                    return void _this.showError(status.err);
                }
                if (0 === status.progress || !_this.downloadStarted) return void _this.onDownloadStart({
                    progress: status.progress || 0,
                    size: d.size
                });
                _this.updateProgress(status), _this.update();
            }
        }
    };
}), riot.tag2("template-grid", '<span if="{activeFilter === \'recent\'}" class="template-grid__wrapper grid"> <welcome-card close="{onWelcomeClose(Constants.localStorage.recent)}" show="{showWelcome(Constants.localStorage.recent)}"></welcome-card> <div class="template-grid__section-header"> <span class="template-grid__section-title" data-i18n="newdoc_your_recent_items"></span> <span class="template-grid__section-count">({mixedItems.length})</span> </div> <div class="template-grid__container template-grid__container-recents"></div> </span> <span if="{activeFilter === \'saved\'}" class="template-grid__wrapper grid"> <welcome-card close="{onWelcomeClose(Constants.localStorage.saved)}" show="{showWelcome(Constants.localStorage.saved)}"></welcome-card> <div if="{presets.length > 0}" class="template-grid__section-header"> <span class="template-grid__section-title" data-i18n="newdoc_saved_blank_documents"></span> <span class="template-grid__section-count">({presets.length})</span> </div> <div class="template-grid__container template-grid__container-presets template-grid__container-presets--saved"> <preset-grid-item each="{presets}" data="{this}"></preset-grid-item> </div> <span if="{showExpander}" onclick="{expandPresets}" class="template-grid__expander"> <span data-i18n="newdoc_view_all"></span> <i class="spc-icons">plus</i> </span> <div if="{templates.length > 0}" class="template-grid__section-header"> <span class="template-grid__section-title" data-i18n="listview_template_tab_label"></span> <span class="template-grid__section-count">({templates.length})</span> </div> <div class="template-grid__container template-grid__container-saved"> <template-grid-item each="{templates}" data="{this}"></template-grid-item> </div> </span> <span if="{activeFilter !== \'recent\' && activeFilter !== \'saved\'}" class="template-grid__wrapper grid"> <div if="{presets.length > 0}" class="template-grid__section-header"> <span class="template-grid__section-title" data-i18n="newdoc_blank_documents"></span> <span class="template-grid__section-count">({presets.length})</span> </div> <div class="template-grid__container template-grid__container-presets"> <preset-grid-item each="{presets}" data="{this}"></preset-grid-item> </div> <span if="{showExpander}" onclick="{expandPresets}" class="template-grid__expander"> <span data-i18n="newdoc_view_all"></span> <i class="spc-icons">plus</i> </span> <div if="{templates.length > 0}" class="template-grid__section-header"> <span class="template-grid__section-title" data-i18n="listview_template_tab_label"></span> <span class="template-grid__section-count">({templates.length})</span> </div> <div class="template-grid__container"> <template-grid-item each="{templates}" data="{this}"></template-grid-item> </div> </span>', "", 'onkeydown="{keyDown}"', function(opts) {
    function closeWelcome(localStorageId) {
        iaw.localstorage.setUserItem(localStorageId, !1);
    }
    function expandPresetsAnimated(e, p) {
        p.classList.add("template-grid__container-presets--open"), e.classList.add("anim--fade-out-fast");
    }
    var _this = this;
    this.mixin("i18n"), this.mixin("cooldown"), this.templateCursor = null, this.allItemsNum = 0, 
    this.mixedItems = [], this.presets = [], this.templates = [], this.activeFilter = "recent", 
    this.showExpander = !1, this.expanderClicked = !1, this.resizeBreakpoints = [ 1334, 1589, 1845, 2101 ], 
    this.numPresets = [ 4, 5, 6, 7 ];
    var scrollContainer, allItems = null;
    this.Constants = {
        localStorage: {
            recent: "fnft.showWelcomeRecent",
            saved: "fnft.showWelcomeSaved",
            count: "fnft.displayCount"
        }
    }, this.onWelcomeClose = function(localStorageId) {
        return function() {
            closeWelcome(localStorageId), iaw.analytics.ingest.logFNFTActionClickedEvent("welcome-closed", {
                activeFilter: iaw.store.get([ "input", "active-filter" ])
            });
        };
    }, this.rebuildItems = function(expandToPreset) {
        var p = _this.root.querySelector(".template-grid__expander");
        p && !expandToPreset && p.classList.remove("anim--fade-out-fast");
        var i, t, e, container, templateCount = 0, templateLimit = 20, presetContainer = _this.root.querySelector(".template-grid__container-presets");
        if ("recent" === _this.activeFilter) {
            for (container = document.querySelector(".template-grid__container"), _this.mixedItems = []; container.firstChild; ) container.removeChild(container.firstChild);
            for (allItems.sort(function(a, b) {
                return b.lastUsedTime - a.lastUsedTime;
            }), i = 0; i < allItems.length; i++) t = allItems[i], t.displayPosition = i, t.activeFilter = _this.activeFilter, 
            t.loggedIngestRendered || (iaw.analytics.ingest.logFNFTItemRenderedEvent(t), t.loggedIngestRendered = !0), 
            (t.isPreset || iaw.libraryManager.isTemplateLicensed(t.id)) && (t.isPreset ? (_this.mixedItems.push(t), 
            e = document.createElement("preset-grid-item"), riot.mount(e, {
                data: t
            }), container.appendChild(e)) : (templateCount < templateLimit && (_this.mixedItems.push(t), 
            e = document.createElement("template-grid-item"), riot.mount(e, {
                data: t
            }), container.appendChild(e)), templateCount++));
            _this.showExpander = !1;
            var templates = iaw.store.get("templates");
            templates && 0 === templates.length && riotctrl.trigger("update-stock-search-text", iaw.i18n.getLocalizedString("adobe_stock_find")), 
            riotctrl.trigger("show-stock-bar"), iaw.store.set([ "activeTemplates" ], _this.mixedItems);
        } else {
            if (_this.presets = [], _this.templates = [], riotctrl.trigger("update-stock-search-text"), 
            _this.update(), allItems && allItems.length > 0) {
                for (i = 0; i < allItems.length; i++) t = allItems[i], t.displayPosition = i, t.activeFilter = _this.activeFilter, 
                t.loggedIngestRendered || (iaw.analytics.ingest.logFNFTItemRenderedEvent(t), t.loggedIngestRendered = !0), 
                t.isPreset ? _this.presets.push(t) : _this.templates.push(t);
                "saved" === _this.activeFilter && (_this.templates.length > 0 && (_this.templates.sort(function(a, b) {
                    return a.licensedTime > b.licensedTime ? -1 : a.licensedTime < b.licensedTime ? 1 : 0;
                }), closeWelcome(_this.Constants.localStorage.saved)), _this.presets.length > 0 ? (closeWelcome(_this.Constants.localStorage.saved), 
                p = _this.root.querySelector(".template-grid__expander"), _this.expandIfSelectedIsHidden(window.innerWidth) && (presetContainer.classList.add("template-grid__container-presets--open"), 
                _this.showExpander = !1, _this.expanderClicked = !0)) : _this.showExpander = !1);
            }
            if (_this.templates.length > 0) {
                if (0 === iaw.util.currentBreakPoint) _this.showExpander = _this.presets.length > 3; else {
                    var width = window.innerWidth;
                    _this.showExpander = !_this.hideExpanderResize(width), _this.expandIfSelectedIsHidden(width) && (presetContainer.classList.add("template-grid__container-presets--open"), 
                    _this.showExpander = !1, _this.expanderClicked = !0);
                }
                riotctrl.trigger("show-stock-bar");
            } else _this.showExpander = !1, _this.expandPresetsInstant(), riotctrl.trigger("hide-stock-bar");
            iaw.store.set([ "activeTemplates" ], _this.templates);
        }
        _this.update();
    }, this.expandPresetsInstant = function() {
        if (!_this.showExpander) {
            var p = _this.root.querySelector(".template-grid__container-presets");
            p.classList.add("template-grid__container-presets--open");
        }
    }, this.expandPresets = function(evt) {
        var e = _this.root.querySelector(".template-grid__expander");
        if (!e || e.classList.contains("anim--fade-out-fast")) return !1;
        var activeItem = document.querySelector(".template-grid-item--active");
        if (activeItem && "template-grid-item" === activeItem.tagName.toLowerCase() && !(evt instanceof MouseEvent)) return !1;
        var p = _this.root.querySelector(".template-grid__container-presets");
        return expandPresetsAnimated(e, p), iaw.analytics.ingest.logFNFTActionClickedEvent("preset-viewmore", {
            activeFilter: _this.activeFilter
        }), _this.expanderClicked = !0, !0;
    }, this.showWelcome = function(localStorageId) {
        var show = iaw.localstorage.getUserItem(localStorageId);
        show = "boolean" != typeof show || show;
        var displayCount = iaw.localstorage.getUserItem(_this.Constants.localStorage.count);
        return show = !!show && displayCount <= 3;
    }, this.keyDown = function(evt) {
        var adjacentItem, focusable, container, item = evt.target.parentNode, which = evt.which || evt.keyCode, items = Array.prototype.slice.call(item.parentNode.children), index = -1;
        switch (index = items.indexOf(item), which) {
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
            adjacentItem = iaw.a11y.getAdjacentElementVertically(items, item, !0), container = document.querySelectorAll(".template-grid__container")[0], 
            !adjacentItem && container && container !== item.parentNode && (adjacentItem = container.lastElementChild);
            break;

          case iaw.a11y.Keys.RIGHT:
            index < items.length - 1 && (adjacentItem = items[index + 1]);
            break;

          case iaw.a11y.Keys.DOWN:
            adjacentItem = iaw.a11y.getAdjacentElementVertically(items, item, !1), container = document.querySelectorAll(".template-grid__container")[1], 
            _this.expandPresets() || adjacentItem || !container || container === item.parentNode || (adjacentItem = container.firstElementChild);
            break;

          default:
            "keypress" === evt.type && (adjacentItem = iaw.a11y.alphanumericSearch(evt, items, item));
        }
        return adjacentItem && (focusable = iaw.a11y.focusable(adjacentItem, !1, !0)[0], 
        focusable && focusable.querySelector("button").focus()), !0;
    }, this.selectFirstItem = function() {
        var container = document.querySelector(".template-grid__container"), t = container.firstElementChild;
        return t || "recent" === _this.activeFilter || (container = document.querySelectorAll(".template-grid__container")[1], 
        t = container.firstElementChild), t ? (t = t._tag, void t.autoClick()) : (document.getElementById("sidebar-container").innerHTML = "", 
        void iaw.store.set([ "input", "selected-item" ], null));
    }, this.selectPresetItem = function(presetTitle, expanding) {
        for (var container = document.querySelector(".template-grid__container"), t = container.firstElementChild; t && (t._tag || (t = t.nextSibling), 
        t._tag.title !== presetTitle); ) t = t.nextSibling;
        t && (t = t._tag, expanding || t.autoClick(), setTimeout(function() {
            expanding && t.autoClick();
            var container = document.querySelector(".scroll-container");
            container.scrollTop = t.root.offsetTop - 100;
        }, 300));
    }, this.addTemplatesToSaved = function(evt) {
        var status = evt.data && evt.data.currentData || evt;
        if (status && status.licensedTime && status.downloadStatus && status.downloadStatus !== iaw.libraryManager.DOWNLOAD_ERR && "saved" === _this.activeFilter) {
            _this.templates = _this.templates || [];
            for (var index = 0; index < _this.templates.length; index++) if (_this.templates[index].id === status.templateId) return;
            var template = iaw.util.getTemplateData(status.templateId);
            template && (template.licensedTime = status.licensedTime, template.template_category.indexOf("saved") === -1 && template.template_category.push("saved"), 
            _this.templates.push(template), _this.templates.sort(function(a, b) {
                return b.licensedTime - a.licensedTime;
            }), iaw.store.set([ "activeTemplates" ], _this.templates), _this.update());
        }
    }, this.hideExpanderResize = function(width) {
        if (_this.presets.length > 4) {
            if (_this.expanderClicked) return !0;
            var i, bp, np;
            for (i = 0; i < _this.resizeBreakpoints.length; i++) if (bp = _this.resizeBreakpoints[i], 
            np = _this.numPresets[i], width > bp && _this.presets.length <= np) return !0;
            return !1;
        }
        return !0;
    }, this.expandIfSelectedIsHidden = function(width) {
        var i, bp, np, selectedNum, selected = iaw.store.get([ "input", "selected-item" ]);
        for (i = 0; i < _this.presets.length; i++) if (selected == _this.presets[i].uuid) {
            selectedNum = i + 1;
            break;
        }
        if (!selectedNum) return !1;
        if (width < _this.resizeBreakpoints[0]) return selectedNum > 4;
        for (i = 0; i < _this.resizeBreakpoints.length && (bp = _this.resizeBreakpoints[i], 
        np = _this.numPresets[i], !(width > bp)); i++) ;
        return selectedNum > np;
    }, this.on("mount before-unmount", function(evt) {
        if ("mount" === evt) {
            riotctrl.on("resize-breakpoint", this.rebuildItems, this), riotctrl.on(iaw.fnftEvents.FILTER, this.onFilter, this), 
            scrollContainer = this.parent.root.querySelector(".scroll-container");
            var self = this;
            setTimeout(function() {
                self.isMounted && riotctrl.on("update-host-retro", self.onHost, self);
            }, 0), this.showWelcome(this.Constants.localStorage.recent) && iaw.analytics.ingest.logFNFTActionClickedEvent("welcome-rendered", {
                displayCount: iaw.localstorage.getUserItem(this.Constants.localStorage.count),
                activeFilter: iaw.store.get([ "input", "active-filter" ])
            });
            var status = iaw.store.select([ "input", "download-status" ]);
            status.on("update", this.addTemplatesToSaved);
        } else "before-unmount" === evt && (this.templateCursor.release(), riotctrl.off("update-host-retro", this.onHost, this), 
        riotctrl.off("resize-breakpoint", this.rebuildItems, this), riotctrl.off(iaw.fnftEvents.FILTER, this.onFilter, this), 
        scrollContainer = null, this.off("*"));
    }), this.onHost = function() {
        _this.isMounted && _this.onFilter("recent"), _this.templateCursor || (_this.templateCursor = iaw.store.select("templates"), 
        _this.templateCursor.on("update", function(evt) {
            var type = iaw.store.get([ "input", "active-filter" ]);
            this.onFilter(type);
        }, {
            scope: _this
        }));
    }, this.onFilter = function(type, expandToPreset, isDelete) {
        var presets = iaw.store.get("presets"), templates = iaw.store.get("templates"), data = null;
        if (_this.expanderClicked = !1, "recent" !== _this.activeFilter) {
            var p = _this.root.querySelector(".template-grid__container-presets");
            expandToPreset || (p.classList.remove("template-grid__container-presets--open"), 
            p = _this.root.querySelector(".template-grid__expander"), p && p.classList.remove("anim--fade-out-fast"), 
            _this.showExpander = !0);
        }
        data = templates ? presets.concat(templates) : presets && presets.slice(0) || [], 
        _this.activeFilter = type, _this.update(), allItems = data.filter(function(template) {
            if (template.template_category instanceof Array) {
                var category = template.template_category.join(",").toLowerCase().split(",");
                return category.indexOf(type) !== -1;
            }
            return template.template_category === type;
        }), allItems = allItems.filter(function(item, index) {
            return index == allItems.indexOf(item);
        });
        var scrollPos;
        if (scrollContainer) {
            var prevType = iaw.store.get([ "input", "active-filter" ]);
            prevType && (scrollPos = scrollContainer.scrollTop, iaw.store.set([ "input", "scroll-pos", prevType ], scrollPos));
        }
        if (iaw.store.set([ "input", "active-filter" ], type), _this.rebuildItems(expandToPreset), 
        !isDelete && expandToPreset) {
            var expanding = _this.expandPresets();
            _this.selectPresetItem(expandToPreset, expanding);
        } else isDelete && expandToPreset ? _this.selectPresetItem(expandToPreset, !1) : _this.selectFirstItem();
        scrollContainer && (scrollPos = iaw.store.get([ "input", "scroll-pos", type ]) || 0, 
        scrollContainer.scrollTop = scrollPos);
    };
}), riot.tag2("template-tab", '<i if="{type === \'recent\'}" class="inapp-icons inapp-icon--clock template-tab__item--recent" onclick="{onClick}"></i> <a href="#" class="template-tab__item" role="tab" aria-selected="{active}" tabindex="{active ? \'0\' : \'-1\'}" onclick="{onClick}" data-i18n="{name}"></a> <div if="{type === \'saved\'}" class="template-tab__separator"></div>', "", 'class="template-tab {template-tab--active: active}"', function(opts) {
    var _this = this;
    this.mixin("i18n"), this.inputCursor = null, this.active = !1, this.setLine = function() {
        var line = _this.parent.root.querySelector(".spc-tabs__line"), link = _this.root.querySelector(".template-tab__item");
        link.offsetHeight, line.offsetHeight;
        var w = link.offsetWidth, x = link.offsetLeft;
        link.offsetHeight, line.offsetHeight, line.style.transform = "translateX(" + x + "px) scaleX(" + w + ")", 
        link.offsetHeight, line.offsetHeight;
    }, this.onClick = function(evt) {
        _this.active || (riotctrl.trigger(iaw.fnftEvents.FILTER, _this.type), iaw.analytics.ingest.logFNFTActionClickedEvent("tab-selected", {
            activeFilter: _this.type
        }), iaw.analytics.pip.logFNFTDataGroupEvent("Pick Category", {
            category: _this.type
        }), window.location.hash = "", _this.setLine());
    }, this.resize = function() {
        _this.active && _this.setLine();
    }, this.on("mount before-unmount", function(evt) {
        if ("mount" === evt) {
            var active = iaw.store.get([ "input", "active-filter" ]);
            this.active = active === this.type, this.active && this.setLine(), this.update(), 
            iaw.motor.add(this.resize, this), this.inputCursor = iaw.store.select("input"), 
            this.inputCursor.on("update", this.onInput);
        } else "before-unmount" === evt && (iaw.motor.remove(this.resize), this.inputCursor.release(), 
        this.off("*"));
    }), this.onInput = function(evt) {
        _this.active = evt.data.currentData["active-filter"] === _this.type, _this.active && _this.setLine(), 
        _this.update();
    };
}), riot.tag2("welcome-card", '<div class="grid-spanning-card__content"> <div class="welcome-card__titlebar"> <span class="spc-layout-spacer"></span> <button class="welcome-card__close-btn" tabindex="-1" onclick="{close}"> <i class="spc-icons">X</i> </button> </div> <h4 class="welcome-card__title">{title}</h4> <span class="welcome-card__content"></span> </div>', "", 'class="welcome-card grid-spanning-card invisible"', function(opts) {
    var _this = this;
    this.title = "", this.close = function() {
        _this.root.classList.add("hidden"), _this.opts.close && "function" == typeof _this.opts.close && _this.opts.close();
    }, this.on("mount", function() {
        riotctrl.on("markdown-ready-retro", this.onMD, this), this.filterCursor = iaw.store.select([ "input", "active-filter" ]), 
        this.filterCursor.on("update", this.onMD, {
            scope: this
        });
    }), this.on("before-unmount", function() {
        riotctrl.off("markdown-ready-retro", this.onMD, this), this.filterCursor.release(), 
        this.off("*");
    }), this.onMD = function(type) {
        if ("undefined" != typeof marked) {
            var txt, filter = type && type.data ? type.data.currentData : type;
            filter || (filter = "recent");
            var templates = iaw.store.get("templates");
            if ("recent" === filter) _this.title = iaw.i18n.getLocalizedString("newdoc_welcome_banner_recent_title"), 
            txt = templates && templates.length ? iaw.i18n.getLocalizedString("newdoc_welcome_banner_content_recent_templates") : iaw.i18n.getLocalizedString("newdoc_welcome_banner_content_recent_no_templates"); else {
                _this.title = iaw.i18n.getLocalizedString("newdoc_welcome_banner_saved_title");
                var hostID = iaw.store.get([ "host", "hostID" ]);
                txt = "ILST" === hostID ? iaw.i18n.getLocalizedString("newdoc_welcome_banner_content_saved_templates_ai") : templates && templates.length ? iaw.i18n.getLocalizedString("newdoc_welcome_banner_content_saved_templates") : iaw.i18n.getLocalizedString("newdoc_welcome_banner_content_saved_no_templates");
            }
            var contentEl = _this.root.querySelector(".welcome-card__content");
            contentEl.innerHTML = marked(txt), _this.root.classList.remove("invisible"), _this.root.classList.add("anim--fade-in"), 
            _this.update();
        }
    };
});