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
function HostEvents() {
    riotctrl.on("recentfile", function(idx, viewMode) {
        if (!this.isInCooldown()) {
            this.setCooldown();
            var tab = iaw.store.get([ "host", "tabs", "recentfile" ]), hostID = iaw.store.get([ "host", "hostID" ]);
            if (window.__adobe_cep__) {
                var entry = tab.list[idx], path = entry.identifier;
                switch (iaw.analytics.ingest.logItemOpenedEvent({
                    openType: "recent",
                    fileType: entry.kind,
                    itemPosition: idx,
                    sectionView: viewMode || ""
                }), hostID) {
                  case "PHXS":
                    var pipMethod = iaw.util.getPipMethodString("recent", viewMode);
                    window.__adobe_cep__.evalScript("CCXWelcomeXSHost_" + hostID + '.openDocumentWithMRUIdentifier("' + path + '","' + pipMethod + '")', iaw.util.closeExtOnStatus);
                    break;

                  default:
                    iaw.cepUtil.sendEvent(iaw.cepUtil.events.kOpenRecentFile, path);
                }
            }
        }
    }, this), riotctrl.on("recentlib", function(idx) {
        if (window.__adobe_cep__) {
            if (this.isInCooldown()) return;
            this.setCooldown(), iaw.analytics.ingest.logItemOpenedEvent({
                openType: "library",
                itemPosition: idx,
                sectionView: "list"
            }), iaw.util.showLibraryInPanel(idx);
        }
    }, this), riotctrl.on("ccfiles", function(idx, viewMode) {
        if (!this.isInCooldown()) {
            this.setCooldown();
            var tab = iaw.store.get([ "host", "tabs", "ccfiles" ]), hostID = iaw.store.get([ "host", "hostID" ]);
            if (window.__adobe_cep__) {
                var entry = tab.list[idx], path = entry.identifier, files = JSON.stringify({
                    path: [ path ]
                });
                "win" !== iaw.store.get([ "host", "platform" ]) && "windows" !== iaw.store.get([ "host", "platform" ]) || "PPRO" !== iaw.store.get([ "host", "hostID" ]) || (files = '{"path":["' + path + '"]}');
                var kind = entry.kind || entry.identifier.split(".").pop();
                if (iaw.analytics.ingest.logItemOpenedEvent({
                    openType: "cc-file",
                    eventAction: "click",
                    fileType: kind,
                    itemPosition: idx,
                    sectionView: viewMode || "",
                    cardID: entry.id
                }), iaw.log.console("CC-Files :: --------- opening " + path), "PHXS" !== iaw.store.get([ "host", "hostID" ])) iaw.cepUtil.sendEvent(iaw.cepUtil.events.kOpenDropFiles, files); else {
                    var pipMethod = iaw.util.getPipMethodString("ccfiles", viewMode);
                    window.__adobe_cep__.evalScript("CCXWelcomeXSHost_" + hostID + '.openDocumentWithPath("' + path + '","' + pipMethod + '")', iaw.util.closeExtOnStatus);
                }
            }
        }
    }.bind(this)), riotctrl.on("presetfile", function(idx, viewMode) {
        if (!this.isInCooldown()) {
            this.setCooldown();
            var tab = iaw.store.get([ "host", "tabs", "presetfile" ]), docType = idx >= 0 ? tab.list[idx].identifier : null;
            iaw.analytics.ingest.logItemOpenedEvent({
                openType: "new",
                fileType: "preset",
                itemPosition: idx,
                sectionView: viewMode || ""
            }), this.createDocumentFromTemplate(docType);
        }
    }, this), riotctrl.on("templatefile", function(idx, viewMode) {
        if (!this.isInCooldown()) {
            this.setCooldown();
            var tab = iaw.store.get([ "host", "tabs", "templatefile" ]), docType = idx >= 0 ? tab.list[idx].identifier : null;
            iaw.analytics.ingest.logItemOpenedEvent({
                openType: "new",
                fileType: "template",
                itemPosition: idx,
                sectionView: viewMode || ""
            }), this.createDocumentFromTemplate(docType);
        }
    }, this), riotctrl.on("samplefile", function(idx, viewMode) {
        if (!this.isInCooldown() && (this.setCooldown(), iaw.analytics.ingest.logItemOpenedEvent({
            openType: "new",
            fileType: "sample",
            itemPosition: idx,
            sectionView: viewMode || ""
        }), window.__adobe_cep__)) {
            var tab = iaw.store.get([ "host", "tabs", "samplefile" ]), sampleID = idx >= 0 ? tab.list[idx].identifier : null;
            alert("unimplemented method: samplefile[" + idx + "](" + sampleID + ")");
        }
    }, this), riotctrl.on("custom", function(idx, viewMode) {
        if (!this.isInCooldown() && (this.setCooldown(), window.__adobe_cep__)) {
            var tab = iaw.store.get([ "host", "tabs", "custom" ]);
            tab && idx >= 0 && (iaw.analytics.ingest.logItemOpenedEvent({
                openType: "custom",
                fileType: tab.list[idx].identifier,
                itemPosition: idx,
                sectionView: viewMode || ""
            }), iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, tab.list[idx].identifier));
        }
    }, this), riotctrl.on("startertemplate", function(idx, viewMode) {
        if (!this.isInCooldown()) {
            this.setCooldown();
            var tab = iaw.store.get([ "host", "tabs", "startertemplate" ]), docType = idx >= 0 ? tab.list[idx].identifier : null;
            iaw.analytics.ingest.logItemOpenedEvent({
                openType: "new",
                fileType: "startertemplate",
                itemPosition: idx,
                sectionView: viewMode || ""
            }), this.createDocumentFromTemplate(docType);
        }
    }, this), riotctrl.on("createButtonNewdocs", function() {
        if (!this.isInCooldown()) {
            this.setCooldown(), riotctrl.trigger("pause-all-media");
            var fnftLoadingStartTime, hostID = iaw.store.get([ "host", "hostID" ]);
            if (window.__adobe_cep__) switch (hostID) {
              case "PHXS":
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.LOADEXTENSION, "com.adobe.ccx.fnft"), window.__adobe_cep__.evalScript("CCXWelcomeXSHost_PHXS.createDocumentFromTemplate()", iaw.util.closeExtOnStatus);
                break;

              case "ILST":
                iaw.store.get([ "host", "fnftEnabled" ]) ? (fnftLoadingStartTime = iaw.util.getCurrentTime(), 
                iaw.analytics.pip.logEvent("fnftCategory", "performance", "fnftStart"), iaw.log.console("Cmd-N loading starts at: " + fnftLoadingStartTime), 
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.FNFTSTARTTIME, fnftLoadingStartTime.toString()), 
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.LOADEXTENSION, "com.adobe.ccx.fnft")) : iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "new_default");
                break;

              case "IDSN":
                iaw.store.get([ "host", "fnftEnabled" ]) ? (fnftLoadingStartTime = iaw.util.getCurrentTime(), 
                iaw.log.console("Cmd-N loading starts at: " + fnftLoadingStartTime), iaw.cepUtil.sendEvent(iaw.cepUtil.events.FNFTSTARTTIME, fnftLoadingStartTime.toString()), 
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.LOADEXTENSION, "com.adobe.ccx.fnft")) : iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "new_default");
                break;

              case "AEFT":
                window.__adobe_cep__.evalScript("CCXWelcomeXSHost_AEFT.createDefaultDocument()", iaw.util.closeExtOnStatus);
                break;

              default:
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "new_default");
            }
        }
    }, this), riotctrl.on("createButtonOpen", function() {
        if (!this.isInCooldown()) {
            this.setCooldown(), riotctrl.trigger("pause-all-media");
            var hostID = iaw.store.get([ "host", "hostID" ]);
            if (iaw.analytics.ingest.logItemOpenedEvent({
                openType: "open",
                fileType: "dialog"
            }), window.__adobe_cep__) switch (hostID) {
              case "PHXS":
                var pipMethod = iaw.util.getPipMethodString("open.dialog");
                window.__adobe_cep__.evalScript("CCXWelcomeXSHost_" + hostID + '.openDocumentWithUI("' + pipMethod + '")', iaw.util.closeExtOnStatus);
                break;

              case "AEFT":
                window.__adobe_cep__.evalScript("CCXWelcomeXSHost_" + hostID + ".openDocumentWithUI()", iaw.util.closeExtOnStatus);
                break;

              default:
                iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "open");
            }
        }
    }, this), riotctrl.on("createButtonNewProduction", function() {
        this.isInCooldown() || (this.setCooldown(), riotctrl.trigger("pause-all-media"), 
        iaw.analytics.ingest.logItemOpenedEvent({
            openType: "new",
            fileType: "TeamProject",
            eventAction: "click"
        }), window.__adobe_cep__ && iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "new_production"));
    }, this), riotctrl.on("createButtonOpenProduction", function() {
        this.isInCooldown() || (this.setCooldown(), riotctrl.trigger("pause-all-media"), 
        iaw.analytics.ingest.logItemOpenedEvent({
            openType: "open",
            fileType: "TeamProject",
            eventAction: "click"
        }), window.__adobe_cep__ && iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, "open_production"));
    }, this), riotctrl.on("lock-screen", function(opaque) {
        opaque = opaque || !1;
        var lockscreen = document.getElementById("screen-cover");
        opaque && lockscreen.classList.add("opaque"), lockscreen.style.display = "block";
    }, this), riotctrl.on("unlock-screen", function() {
        var lockscreen = document.getElementById("screen-cover");
        lockscreen.classList.contains("opaque") ? (lockscreen.addEventListener("webkitAnimationEnd", function onEnd(evt) {
            lockscreen.removeEventListener("webkitAnimationEnd", onEnd), lockscreen.style.display = "none", 
            lockscreen.style.opacity = 0, lockscreen.className = "";
        }), lockscreen.classList.add("anim--fade-out")) : (lockscreen.style.display = "none", 
        lockscreen.style.opacity = 0, lockscreen.className = "");
    }, this);
}

window.riotctrl = {
    events: {},
    burnt: {},
    RETROACTIVE: "-retro",
    on: function(name, callback, ctx) {
        return (this.events[name] || (this.events[name] = [])).push({
            fn: callback,
            ctx: ctx
        }), this.burnt[name] && name.indexOf(this.RETROACTIVE) !== -1 && callback.apply(ctx, this.burnt[name]), 
        this;
    },
    once: function(name, callback, ctx) {
        var self = this, fn = function() {
            self.off(name, fn), callback.apply(ctx, arguments);
        };
        return this.on(name, fn, ctx);
    },
    trigger: function(name) {
        var data = [].slice.call(arguments, 1), evtArr = (this.events[name] || []).slice(), i = 0, evt = null;
        for (i; evt = evtArr[i]; i++) evt.fn.apply(evt.ctx, data);
        return name.indexOf(this.RETROACTIVE) !== -1 && (this.burnt[name] = data), this;
    },
    off: function(name, callback) {
        var evts = this.events[name], liveEvents = [];
        if (evts && callback) for (var i = 0, len = evts.length; i < len; i++) evts[i].fn !== callback && liveEvents.push(evts[i]);
        return liveEvents.length ? this.events[name] = liveEvents : delete this.events[name], 
        this;
    }
};

var iaw = iaw || {};

iaw.startup = {
    PHASES: {
        Doc: "whenDocReady",
        Host: "whenHostReady",
        Done: "whenReady"
    },
    _objs: [],
    add: function(startupObj) {
        var haveCB = !1;
        for (var p in this.PHASES) if (startupObj[this.PHASES[p]]) {
            haveCB = !0;
            break;
        }
        if (!haveCB) throw new Error("[iaw.init] Add at least one init callback before adding to startup sequence.");
        this._objs.push(startupObj);
    },
    remove: function(startupObj) {
        var i = this._objs.indexOf(startupObj);
        i !== -1 && (this._objs.splice(i, 1), console.log(this._objs));
    },
    run: function(phase) {
        var i, o;
        for (i = 0; i < this._objs.length; i++) o = this._objs[i], o[phase] && o[phase].call(o);
    }
};

var iaw = iaw || {};

iaw.a11y = function() {
    function isHidden(node) {
        if (node === document.documentElement) return !1;
        if (node.focusableCacheIndex) return nodeCache[node.focusableCacheIndex];
        var result = !1, style = window.getComputedStyle(node);
        return "hidden" === style.visibility || "none" === style.display ? result = !0 : node.parentNode && (result = isHidden(node.parentNode)), 
        node.focusableCacheIndex = cacheIndex, nodeCache[node.focusableCacheIndex] = result, 
        cacheIndex++, result;
    }
    function onLoadEvent() {
        function disableFocusRingByDefault() {
            var css = "body:not([modality=keyboard]) :focus { outline: none; }", head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
            style.type = "text/css", style.id = "disable-focus-ring", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), 
            head.appendChild(style);
        }
        function focusTriggersKeyboardModality(el) {
            return el.matches(keyboardModalityWhitelist);
        }
        console.log();
        var hadKeyboardEvent = !1, keyboardModalityWhitelist = [ "input:not([type])", "input[type=text]", "input[type=checkbox]", "input[type=radio]", "input[type=number]", "input[type=date]", "input[type=time]", "input[type=datetime]", "textarea", "[role=textbox]", "select", "[supports-modality=keyboard]" ].join(",");
        disableFocusRingByDefault(), document.body.addEventListener("keydown", function(evt) {
            hadKeyboardEvent = !0, setTimeout(function() {
                hadKeyboardEvent = !1;
            }, 0);
        }, !0), document.body.addEventListener("focus", function(evt) {
            (hadKeyboardEvent || focusTriggersKeyboardModality(evt.target)) && document.body.setAttribute("modality", "keyboard");
        }, !0), document.body.addEventListener("blur", function(evt) {
            document.body.removeAttribute("modality");
        }, !0);
    }
    var searchTimeout, KEYS_OF_INTEREST_MAC = [ {
        keyCode: 36
    }, {
        keyCode: 48
    }, {
        keyCode: 48,
        shiftKey: !0
    }, {
        keyCode: 49
    }, {
        keyCode: 53
    }, {
        keyCode: 115
    }, {
        keyCode: 116
    }, {
        keyCode: 119
    }, {
        keyCode: 121
    }, {
        keyCode: 123
    }, {
        keyCode: 124
    }, {
        keyCode: 125
    }, {
        keyCode: 126
    }, {
        keyCode: 0
    }, {
        keyCode: 11
    }, {
        keyCode: 8
    }, {
        keyCode: 2
    }, {
        keyCode: 14
    }, {
        keyCode: 3
    }, {
        keyCode: 5
    }, {
        keyCode: 4
    }, {
        keyCode: 34
    }, {
        keyCode: 38
    }, {
        keyCode: 40
    }, {
        keyCode: 37
    }, {
        keyCode: 46
    }, {
        keyCode: 45
    }, {
        keyCode: 31
    }, {
        keyCode: 35
    }, {
        keyCode: 12
    }, {
        keyCode: 15
    }, {
        keyCode: 1
    }, {
        keyCode: 17
    }, {
        keyCode: 32
    }, {
        keyCode: 9
    }, {
        keyCode: 13
    }, {
        keyCode: 7
    }, {
        keyCode: 16
    }, {
        keyCode: 6
    }, {
        keyCode: 50
    }, {
        keyCode: 18
    }, {
        keyCode: 19
    }, {
        keyCode: 20
    }, {
        keyCode: 21
    }, {
        keyCode: 23
    }, {
        keyCode: 22
    }, {
        keyCode: 26
    }, {
        keyCode: 28
    }, {
        keyCode: 25
    }, {
        keyCode: 29
    }, {
        keyCode: 27
    }, {
        keyCode: 24
    }, {
        keyCode: 33
    }, {
        keyCode: 30
    }, {
        keyCode: 42
    }, {
        keyCode: 41
    }, {
        keyCode: 39
    }, {
        keyCode: 43
    }, {
        keyCode: 47
    }, {
        keyCode: 44
    }, {
        keyCode: 0,
        shiftKey: !0
    }, {
        keyCode: 11,
        shiftKey: !0
    }, {
        keyCode: 8,
        shiftKey: !0
    }, {
        keyCode: 2,
        shiftKey: !0
    }, {
        keyCode: 14,
        shiftKey: !0
    }, {
        keyCode: 3,
        shiftKey: !0
    }, {
        keyCode: 5,
        shiftKey: !0
    }, {
        keyCode: 4,
        shiftKey: !0
    }, {
        keyCode: 34,
        shiftKey: !0
    }, {
        keyCode: 38,
        shiftKey: !0
    }, {
        keyCode: 40,
        shiftKey: !0
    }, {
        keyCode: 37,
        shiftKey: !0
    }, {
        keyCode: 46,
        shiftKey: !0
    }, {
        keyCode: 45,
        shiftKey: !0
    }, {
        keyCode: 31,
        shiftKey: !0
    }, {
        keyCode: 35,
        shiftKey: !0
    }, {
        keyCode: 12,
        shiftKey: !0
    }, {
        keyCode: 15,
        shiftKey: !0
    }, {
        keyCode: 1,
        shiftKey: !0
    }, {
        keyCode: 17,
        shiftKey: !0
    }, {
        keyCode: 32,
        shiftKey: !0
    }, {
        keyCode: 9,
        shiftKey: !0
    }, {
        keyCode: 13,
        shiftKey: !0
    }, {
        keyCode: 7,
        shiftKey: !0
    }, {
        keyCode: 16,
        shiftKey: !0
    }, {
        keyCode: 6,
        shiftKey: !0
    }, {
        keyCode: 50,
        shiftKey: !0
    }, {
        keyCode: 18,
        shiftKey: !0
    }, {
        keyCode: 19,
        shiftKey: !0
    }, {
        keyCode: 20,
        shiftKey: !0
    }, {
        keyCode: 21,
        shiftKey: !0
    }, {
        keyCode: 23,
        shiftKey: !0
    }, {
        keyCode: 22,
        shiftKey: !0
    }, {
        keyCode: 26,
        shiftKey: !0
    }, {
        keyCode: 28,
        shiftKey: !0
    }, {
        keyCode: 25,
        shiftKey: !0
    }, {
        keyCode: 29,
        shiftKey: !0
    }, {
        keyCode: 27,
        shiftKey: !0
    }, {
        keyCode: 24,
        shiftKey: !0
    }, {
        keyCode: 33,
        shiftKey: !0
    }, {
        keyCode: 30,
        shiftKey: !0
    }, {
        keyCode: 42,
        shiftKey: !0
    }, {
        keyCode: 41,
        shiftKey: !0
    }, {
        keyCode: 39,
        shiftKey: !0
    }, {
        keyCode: 43,
        shiftKey: !0
    }, {
        keyCode: 47,
        shiftKey: !0
    }, {
        keyCode: 44,
        shiftKey: !0
    }, {
        keyCode: 75
    }, {
        keyCode: 67
    }, {
        keyCode: 78
    }, {
        keyCode: 69
    }, {
        keyCode: 51
    } ], KEYS_OF_INTEREST_WIN = [ {
        keyCode: 13
    }, {
        keyCode: 9
    }, {
        keyCode: 9,
        shiftKey: !0
    }, {
        keyCode: 32
    }, {
        keyCode: 27
    }, {
        keyCode: 36
    }, {
        keyCode: 33
    }, {
        keyCode: 35
    }, {
        keyCode: 34
    }, {
        keyCode: 37
    }, {
        keyCode: 39
    }, {
        keyCode: 40
    }, {
        keyCode: 38
    }, {
        keyCode: 65
    }, {
        keyCode: 66
    }, {
        keyCode: 67
    }, {
        keyCode: 68
    }, {
        keyCode: 69
    }, {
        keyCode: 70
    }, {
        keyCode: 71
    }, {
        keyCode: 72
    }, {
        keyCode: 73
    }, {
        keyCode: 74
    }, {
        keyCode: 75
    }, {
        keyCode: 76
    }, {
        keyCode: 77
    }, {
        keyCode: 78
    }, {
        keyCode: 79
    }, {
        keyCode: 80
    }, {
        keyCode: 81
    }, {
        keyCode: 82
    }, {
        keyCode: 83
    }, {
        keyCode: 84
    }, {
        keyCode: 85
    }, {
        keyCode: 86
    }, {
        keyCode: 87
    }, {
        keyCode: 88
    }, {
        keyCode: 89
    }, {
        keyCode: 90
    }, {
        keyCode: 192
    }, {
        keyCode: 49
    }, {
        keyCode: 50
    }, {
        keyCode: 51
    }, {
        keyCode: 52
    }, {
        keyCode: 53
    }, {
        keyCode: 54
    }, {
        keyCode: 55
    }, {
        keyCode: 56
    }, {
        keyCode: 57
    }, {
        keyCode: 48
    }, {
        keyCode: 189
    }, {
        keyCode: 187
    }, {
        keyCode: 219
    }, {
        keyCode: 221
    }, {
        keyCode: 220
    }, {
        keyCode: 186
    }, {
        keyCode: 222
    }, {
        keyCode: 188
    }, {
        keyCode: 190
    }, {
        keyCode: 191
    }, {
        keyCode: 65,
        shiftKey: !0
    }, {
        keyCode: 66,
        shiftKey: !0
    }, {
        keyCode: 67,
        shiftKey: !0
    }, {
        keyCode: 68,
        shiftKey: !0
    }, {
        keyCode: 69,
        shiftKey: !0
    }, {
        keyCode: 70,
        shiftKey: !0
    }, {
        keyCode: 71,
        shiftKey: !0
    }, {
        keyCode: 72,
        shiftKey: !0
    }, {
        keyCode: 73,
        shiftKey: !0
    }, {
        keyCode: 74,
        shiftKey: !0
    }, {
        keyCode: 75,
        shiftKey: !0
    }, {
        keyCode: 76,
        shiftKey: !0
    }, {
        keyCode: 77,
        shiftKey: !0
    }, {
        keyCode: 78,
        shiftKey: !0
    }, {
        keyCode: 79,
        shiftKey: !0
    }, {
        keyCode: 80,
        shiftKey: !0
    }, {
        keyCode: 81,
        shiftKey: !0
    }, {
        keyCode: 82,
        shiftKey: !0
    }, {
        keyCode: 83,
        shiftKey: !0
    }, {
        keyCode: 84,
        shiftKey: !0
    }, {
        keyCode: 85,
        shiftKey: !0
    }, {
        keyCode: 86,
        shiftKey: !0
    }, {
        keyCode: 87,
        shiftKey: !0
    }, {
        keyCode: 88,
        shiftKey: !0
    }, {
        keyCode: 89,
        shiftKey: !0
    }, {
        keyCode: 90,
        shiftKey: !0
    }, {
        keyCode: 192,
        shiftKey: !0
    }, {
        keyCode: 49,
        shiftKey: !0
    }, {
        keyCode: 50,
        shiftKey: !0
    }, {
        keyCode: 51,
        shiftKey: !0
    }, {
        keyCode: 52,
        shiftKey: !0
    }, {
        keyCode: 53,
        shiftKey: !0
    }, {
        keyCode: 54,
        shiftKey: !0
    }, {
        keyCode: 55,
        shiftKey: !0
    }, {
        keyCode: 56,
        shiftKey: !0
    }, {
        keyCode: 57,
        shiftKey: !0
    }, {
        keyCode: 48,
        shiftKey: !0
    }, {
        keyCode: 189,
        shiftKey: !0
    }, {
        keyCode: 187,
        shiftKey: !0
    }, {
        keyCode: 219,
        shiftKey: !0
    }, {
        keyCode: 221,
        shiftKey: !0
    }, {
        keyCode: 220,
        shiftKey: !0
    }, {
        keyCode: 186,
        shiftKey: !0
    }, {
        keyCode: 222,
        shiftKey: !0
    }, {
        keyCode: 188,
        shiftKey: !0
    }, {
        keyCode: 190,
        shiftKey: !0
    }, {
        keyCode: 191,
        shiftKey: !0
    }, {
        keyCode: 111
    }, {
        keyCode: 106
    }, {
        keyCode: 109
    }, {
        keyCode: 107
    }, {
        keyCode: 8
    } ], FOCUSABLE_SELECTOR = [ 'input:not([type="hidden"]):not(:disabled)', " select:not(:disabled)", "a[href]", "textarea:not(:disabled)", "button:not(:disabled)", "[tabindex]" ].join(","), searchString = "", searchStringDelay = 800, whitespaceRegex = /\s+/g, regexRegex = /[\-\[\]{}()*+?.,\\\^$|#\s]/g, nodeCache = {}, cacheIndex = 1;
    return iaw.startup.add({
        whenDocReady: onLoadEvent.bind(this)
    }), {
        Keys: {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },
        registerKeyEventsInterest: function() {
            var keyEventsInterest = iaw.util.isWindowsOS() ? KEYS_OF_INTEREST_WIN : KEYS_OF_INTEREST_MAC;
            iaw.cepUtil.csInterface && iaw.cepUtil.csInterface.registerKeyEventsInterest(JSON.stringify(keyEventsInterest));
        },
        isFocusable: function(el) {
            return el.matches(FOCUSABLE_SELECTOR) && !isHidden(el);
        },
        focusable: function(el, tabbable, includeEl) {
            "string" == typeof el && (el = document.querySelector(el));
            var candidate, candidateTabIndex, basicFocusables = [], orderedFocusables = [], candidateNodelist = el.querySelectorAll(FOCUSABLE_SELECTOR), candidates = Array.prototype.slice.call(candidateNodelist);
            includeEl && candidates.unshift(el);
            for (var i = 0, l = candidates.length; i < l; i++) candidate = candidates[i], candidateTabIndex = candidate.tabIndex, 
            candidateTabIndex < 0 && tabbable || isHidden(candidate) || (candidateTabIndex <= 0 ? basicFocusables.push(candidate) : orderedFocusables.push({
                tabIndex: candidateTabIndex,
                node: candidate
            }));
            return orderedFocusables = orderedFocusables.sort(function(a, b) {
                return a.tabIndex - b.tabIndex;
            }).map(function(a) {
                return a.node;
            }), Array.prototype.push.apply(orderedFocusables, basicFocusables), orderedFocusables;
        },
        tabbable: function(el, includeEl) {
            return "string" == typeof el && (el = document.querySelector(el)), iaw.a11y.focusable(el, !0, includeEl);
        },
        descendantHasFocus: function(el) {
            return "string" == typeof el && (el = document.querySelector(el)), el === document.activeElement || el.contains(document.activeElement);
        },
        alphanumericSearch: function(evt, items, currentItem) {
            var stringFromCharCode, charCode = evt.charCode, index = -1;
            if (!(charCode <= 32 || evt.ctrlKey || evt.metaKey || evt.altKey)) return stringFromCharCode = String.fromCharCode(charCode), 
            stringFromCharCode !== searchString && (searchString += String.fromCharCode(charCode)), 
            clearTimeout(searchTimeout), searchTimeout = setTimeout(function() {
                searchString = "";
            }, searchStringDelay), items = items.filter(function(el) {
                var textContent = el.textContent.replace(whitespaceRegex, " ").trim();
                return new RegExp("^" + searchString.replace(regexRegex, "\\$&"), "i").test(textContent);
            }), items.length ? (index = items.indexOf(currentItem), index === -1 ? items[0] : searchString.length > 1 ? items : index === items.length - 1 ? items[0] : items[index + 1]) : void 0;
        },
        getAdjacentElementVertically: function(items, currentItem, up) {
            var filtered, increment = up ? -1 : 1, i = items.indexOf(currentItem), rect = currentItem.getBoundingClientRect(), rowTop = rect.top, colLeft = rect.left, colRight = rect.right, prevOrNext = items[i + increment], nextRowTop = null, candidates = [];
            for (i += increment; prevOrNext; ) {
                if (rect = prevOrNext.getBoundingClientRect(), null === nextRowTop && rowTop !== rect.top && (nextRowTop = rect.top), 
                nextRowTop) {
                    if (nextRowTop !== rect.top) break;
                    candidates.push({
                        item: prevOrNext,
                        rect: rect
                    });
                }
                i += increment, prevOrNext = items[i];
            }
            return candidates = candidates.sort(function(a, b) {
                return a.rect.left > b.rect.left;
            }), filtered = candidates.filter(function(candidate) {
                return rect = candidate.rect, colLeft === rect.left || colRight === rect.right || colLeft > rect.left && colRight < rect.right;
            }), filtered.length ? filtered[0].item : candidates.length ? candidates[candidates.length - 1].item : void 0;
        },
        TrapFocus: function() {
            function activate(el, options) {
                isActive && deactivate(), isActive = !0, trap = "string" == typeof el ? document.querySelector(el) : el, 
                config = options || {}, lastFocused = document.activeElement, updateTabbables(), 
                focus(initialFocus()), document.addEventListener("focus", onFocus, !0), document.addEventListener("click", onClick, !0), 
                document.addEventListener("keydown", onKeyDown, !0), setModal(trap, !0);
            }
            function initialFocus() {
                var node;
                if (!config.initialFocus) {
                    if (node = tabbables[0], !node) throw new Error("You can't have a focus-trap without at least one focusable element");
                    return node;
                }
                if (node = "string" == typeof config.initialFocus ? document.querySelector(config.initialFocus) : config.initialFocus, 
                !node) throw new Error("The `initialFocus` selector you passed refers to no known node");
                return node;
            }
            function deactivate() {
                isActive && (isActive = !1, document.removeEventListener("focus", onFocus, !0), 
                document.removeEventListener("click", onClick, !0), document.removeEventListener("keydown", onKeyDown, !0), 
                setModal(trap, !1), config.onDeactivate && config.onDeactivate(), setTimeout(function() {
                    !iaw.a11y.descendantHasFocus(trap) && document.activeElement && document.body !== document.activeElement || focus(lastFocused);
                }, 0));
            }
            function onClick(evt) {
                trap.contains(evt.target) || (evt.preventDefault(), evt.stopImmediatePropagation());
            }
            function onFocus(evt) {
                updateTabbables(), trap.contains(evt.target) || focus(tabbables[0]);
            }
            function onKeyDown(evt) {
                evt.keyCode === iaw.a11y.Keys.TAB && handleTabKey(evt), evt.keyCode === iaw.a11y.Keys.ESC && deactivate();
            }
            function handleTabKey(evt) {
                evt.preventDefault(), updateTabbables();
                var targ = evt.target, index = tabbables.indexOf(targ), last = tabbables[tabbables.length - 1], first = tabbables[0];
                return evt.shiftKey ? evt.target === first ? void focus(last) : void focus(tabbables[index - 1]) : targ === last ? void focus(first) : void focus(tabbables[index + 1]);
            }
            function updateTabbables() {
                tabbables = iaw.a11y.tabbable(trap, !0);
            }
            function focus(node) {
                node && node.focus && (node !== initialFocus() || iaw.a11y.isFocusable(node) || (node.tabIndex = -1, 
                node.addEventListener("blur", function blurred() {
                    node.removeAttribute("tabIndex"), node.removeEventListener("blur", blurred);
                }, !0)), node.focus(), "input" === node.tagName.toLowerCase() && node.select());
            }
            function setModal(node, bool) {
                if (node) for (var siblings, sibling, cachedAriaHidden, parentNode = node.parentNode; parentNode !== document.documentElement; ) {
                    siblings = Array.prototype.slice.call(parentNode.children), Array.prototype.splice.call(siblings, siblings.indexOf(node), 1);
                    for (var i = 0, l = siblings.length; i < l; i++) sibling = siblings[i], "AREA" !== sibling.tagName && "BASE" !== sibling.tagName && "BASEFONT" !== sibling.tagName && "BR" !== sibling.tagName && "COL" !== sibling.tagName && "LINK" !== sibling.tagName && "META" !== sibling.tagName && "PARAM" !== sibling.tagName && "SCRIPT" !== sibling.tagName && "STYLE" !== sibling.tagName && (bool ? (cachedAriaHidden = sibling.getAttribute("aria-hidden"), 
                    cachedAriaHidden && sibling.setAttribute("data-aria-hidden", cachedAriaHidden), 
                    sibling.setAttribute("aria-hidden", "true")) : (cachedAriaHidden = sibling.getAttribute("data-aria-hidden"), 
                    cachedAriaHidden ? (sibling.setAttribute("aria-hidden", cachedAriaHidden), sibling.removeAttribute("data-aria-hidden")) : sibling.removeAttribute("aria-hidden")));
                    node = parentNode, parentNode = parentNode.parentNode;
                }
            }
            var trap, tabbables, lastFocused, isActive, config;
            return {
                activate: activate,
                deactivate: deactivate
            };
        }()
    };
}();

var iaw = iaw || {};

iaw.analytics = {
    enabled: !1,
    pipQuery: {
        category: "Mobile Creations",
        pipAware: {
            subCategory: "See Start Screen",
            eventName: "See Start Screen"
        },
        pipTry: {
            subCategory: "Click Mobile Creations",
            eventName: "Click Mobile Creations"
        },
        pipSucceedProject: {
            subCategory: "Open Mobile Creations",
            eventName: "Open Mobile Creations"
        },
        pipSucceedProjectFile: {
            subCategory: "Open Mobile Creations",
            eventName: "Open App Page"
        },
        pipNoAssetUI: {
            subCategory: "No Mobile Creations",
            eventName: "See No Asset UI"
        },
        pipGetApp: {
            subCategory: "No Mobile Creations",
            eventName: "Click on Get App"
        },
        pipTimeOutOnMCClick: {
            subCategory: "TimeOutOnMCClick",
            eventName: "TimeOutOnMCClick"
        },
        pipTimeOutOnProjectClick: {
            subCategory: "TimeOutOnProjectClick",
            eventName: "TimeOutOnProjectClick"
        },
        pipTimeOutOnFileClick: {
            subCategory: "TimeOutOnFileClick",
            eventName: "TimeOutOnFileClick"
        },
        pipTryAgainOnMCClick: {
            subCategory: "TryAgainOnMCClick",
            eventName: "TryAgainOnMCClick"
        },
        pipTryAgainOnProjectClick: {
            subCategory: "TryAgainOnProjectClick",
            eventName: "TryAgainOnProjectClick"
        },
        pipTryAgainOnFileClick: {
            subCategory: "TryAgainOnFileClick",
            eventName: "TryAgainOnFileClick"
        }
    },
    config: function(client, hostData, psdkData, mode) {
        this.enabled = hostData.userTrackingEnabled, this.ingest.configure(client, hostData, psdkData, mode);
    },
    composeURLWithAnalyticsQueryString: function(url) {
        var composedURL = url;
        if (composedURL) {
            var analyticsQuery = this.getAnalyticsQueryString(), deepLinkIndex = composedURL.indexOf("#"), deepLink = "";
            deepLinkIndex >= 0 && (deepLink = composedURL.substr(deepLinkIndex), composedURL = composedURL.substr(0, deepLinkIndex));
            var querySep = composedURL.indexOf("?") < 0 ? "?" : "&";
            composedURL += querySep + analyticsQuery + deepLink;
        }
        return composedURL;
    },
    getAnalyticsQueryString: function() {
        var hostData = iaw.store.get("host");
        return "locale=" + hostData.language + "&x-product=" + hostData.hostID + "%2F" + hostData.appVersion + "&x-product-location=CCXStart-" + hostData.displayMode + "%2F" + hostData.radarVersion + "&x-radarSession=" + hostData.radarSessionGUID + "&x-appSession=" + hostData.sessionGUID + "&ute=" + hostData.userTrackingEnabled;
    },
    pip: {
        kCategory: "CCXStart",
        fnftCategory: "CCXFNFT",
        logEvent: function(pipCategory, pipSubCategory, pipEvent) {
            if (iaw.analytics.enabled) {
                pipEvent && (pipEvent = pipEvent.length < 128 ? pipEvent : pipEvent.substr(0, 127));
                var pipJSO = {
                    dataType: "event",
                    category: pipCategory,
                    subcategory: pipSubCategory,
                    eventname: pipEvent
                }, pipJSON = JSON.stringify(pipJSO);
                iaw.cepUtil && iaw.cepUtil.sendEvent(iaw.cepUtil.events.LOGPIP, pipJSON);
            }
        },
        logDataGroupEvent: function(pipGroupName, data, category, subcategory) {
            if (iaw.analytics.enabled) {
                var group_Data_Array = [];
                data && Object.keys(data).forEach(function(key) {
                    group_Data_Array.push({
                        columnname: key,
                        value: data[key].toString()
                    });
                });
                var pipJSON = {
                    dataType: "group",
                    category: category,
                    subcategory: subcategory,
                    groupname: pipGroupName,
                    Group_Data_Array: group_Data_Array
                };
                pipJSON = JSON.stringify(pipJSON), iaw.cepUtil && iaw.cepUtil.sendEvent(iaw.cepUtil.events.LOGPIP, pipJSON);
            }
        },
        logFNFTDataGroupEvent: function(pipGroupName, data) {
            "PHXS" === iaw.store.get([ "host", "hostID" ]) && this.logDataGroupEvent(pipGroupName, data, this.fnftCategory, "Interaction");
        },
        logInteractionEvent: function(interactionEvent) {
            this.logEvent(this.kCategory, "Interaction", interactionEvent);
        },
        logFNFTInteractionEvent: function(interactionEvent) {
            "PHXS" === iaw.store.get([ "host", "hostID" ]) && this.logEvent(this.fnftCategory, "Interaction", interactionEvent);
        },
        logFailureEvent: function(failEvent) {
            this.logEvent(this.kCategory, "Failure", failEvent);
        }
    },
    ingest: {
        imsToken: null,
        ingestLibReady: !1,
        instance: null,
        psdkData: null,
        basePayloadData: {
            eventType: null,
            eventGUID: null,
            dts: null,
            userGUID: null,
            subscriptionStatus: null,
            productName: null,
            productVersion: null,
            productLanguage: null,
            displayCount: 0,
            radarVersion: null,
            userAgent: navigator.userAgent,
            radarSessionGUID: null,
            appSessionGUID: null
        },
        renderedCards: {},
        prequeuedEvents: [],
        configure: function(client, hostData, psdkData, mode) {
            var self = this;
            mode = mode || "prod", this.psdkData = psdkData;
            var options = {
                ENVIRONMENT: mode,
                ANALYTICS_API_KEY: client,
                ANALYTICS_X_PRODUCT: hostData.hostID + "%2F" + hostData.appVersion,
                ANALYTICS_PROJECT: "ccxservice",
                ANALYTICS_USER_REGION: hostData.countryCode,
                ANALYTICS_INGEST_TYPE: "dunamis",
                ANALYTICS_MAX_QUEUED_EVENTS: 50,
                ANALYTICS_DEBOUNCE: 0,
                TIMESTAMP_PROPERTY_NAME: "event.dts_end"
            }, dependencies = {
                log: function(msg) {
                    iaw.log.console(msg);
                },
                getAccessToken: function(callback) {
                    self.imsToken ? callback(null, self.imsToken) : iaw.cepUtil.getIMSAccessToken(function(token) {
                        self.imsToken = token, callback(null, token);
                    });
                },
                clearAccessToken: function() {
                    self.imsToken = null, iaw.cepUtil.clearAccessToken();
                }
            };
            if (this.instance = Ingest.createInstance(dependencies, options), this.instance.enable(iaw.analytics.enabled), 
            this.basePayloadData.userGUID = hostData.adobeGUID, this.basePayloadData.subscriptionStatus = hostData.accountStatus, 
            this.basePayloadData.productName = hostData.hostID, this.basePayloadData.productVersion = hostData.appVersion, 
            this.basePayloadData.productLanguage = hostData.language, this.basePayloadData.displayCount = hostData.displayCount, 
            this.basePayloadData.radarVersion = hostData.radarVersion, this.basePayloadData.modeID = hostData.displayMode, 
            this.basePayloadData.radarSessionGUID = hostData.radarSessionGUID, this.basePayloadData.appSessionGUID = hostData.sessionGUID, 
            "fnft" !== hostData.displayMode && (this.basePayloadData.appLaunchCount = hostData.launchCount), 
            this.basePayloadData.AUMSegments = null, this.basePayloadData.hvaFlow = null, this.basePayloadData.displayMode = null, 
            psdkData) {
                this.basePayloadData.AUMSegments = psdkData.segmentID || "none", this.basePayloadData.hvaFlow = psdkData.hvaFlow || "none";
                for (var index = 0; index < psdkData.cardControl.length && !this.basePayloadData.displayMode; index++) psdkData.cardControl[index].modeID === hostData.displayMode && (this.basePayloadData.displayMode = psdkData.cardControl[index].cardOrder.toString());
            }
            if ("paid" !== hostData.accountStatus && void 0 !== hostData.secondsLeftInTrial) {
                var trialEndDts = window.moment().add(window.moment.duration(hostData.secondsLeftInTrial, "seconds"));
                this.basePayloadData.trialEndDts = trialEndDts.format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
            }
            iaw.log.console("Ingest configured (" + mode + ")"), this.ingestLibReady = !0, this.processPrequeuedEvents();
        },
        createPayload: function(needsAEMData) {
            var payload = JSON.parse(JSON.stringify(this.basePayloadData));
            return payload.eventGUID = iaw.util.generateGUID(), needsAEMData || (delete payload.AUMSegments, 
            delete payload.hvaFlow, delete payload.displayMode), payload;
        },
        processPrequeuedEvents: function() {
            var self = this;
            this.prequeuedEvents.forEach(function(payload) {
                for (var prop in self.basePayloadData) !payload[prop] && self.basePayloadData[prop] && (payload[prop] = self.basePayloadData[prop]);
                self.postEvent(payload);
            });
        },
        postEvent: function(payload) {
            this.ingestLibReady ? payload.debugIt ? window.alert(JSON.stringify(payload)) : this.instance.postEvent(payload) : this.prequeuedEvents.push(payload);
        },
        flushEvent: function() {
            this.ingestLibReady && this.instance.flush(!0);
        },
        logScreenStateEvent: function(mode) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = "screen-state", ingestPayloadData.welcomeScreenState = mode, 
            this.postEvent(ingestPayloadData);
        },
        logEngagementCardEvent: function(type, cardData) {
            if ("rendered" === type && !this.renderedCards[cardData.cardID] || "rendered" !== type) {
                var ingestPayloadData = this.createPayload(!0);
                switch (type) {
                  case "rendered":
                    ingestPayloadData.eventType = "eng-card-rendered", this.renderedCards[cardData.cardID] = !0;
                    break;

                  case "clicked":
                    ingestPayloadData.eventType = "eng-card-click";
                    break;

                  default:
                    iaw.log.conosle("Invalid Ingest card event");
                }
                ingestPayloadData.cardTypeID = cardData.cardTypeID, ingestPayloadData.cardTypeName = cardData.cardType, 
                ingestPayloadData.cardID = cardData.cardID, ingestPayloadData.cardName = cardData.cardName, 
                ingestPayloadData.width = cardData.width, ingestPayloadData.displayTemplate = cardData.displayTemplate || "", 
                ingestPayloadData.startDTS = cardData.startDTS || "", ingestPayloadData.endDTS = cardData.endDTS || "", 
                ingestPayloadData.actionURL = cardData.actionURL || "", ingestPayloadData.urlLinkType = cardData.urlLinkType || "", 
                ingestPayloadData.invertPresentation = "undefined" != typeof cardData.invertPresentation ? cardData.invertPresentation : "n/a", 
                cardData.campaignCode && (ingestPayloadData.campaignCode = cardData.campaignCode), 
                cardData.recipe && (ingestPayloadData.recipe = cardData.recipe), cardData.aumSegments && (ingestPayloadData.aumSegments = cardData.aumSegments), 
                cardData.priceCopy && (ingestPayloadData.priceCopy = cardData.priceCopy), cardData.promoID && (ingestPayloadData.promoID = cardData.promoID), 
                cardData.as_query && (ingestPayloadData.actionURL = ingestPayloadData.actionURL + "&" + cardData.as_query), 
                this.psdkData && (ingestPayloadData.eventParams = {
                    persona: this.psdkData.persona || "none",
                    skill: this.psdkData.skill || "none",
                    appLaunchBucket: this.psdkData.appLaunchBucket || "none",
                    entitlement: this.psdkData.entitlement || "none",
                    entitlementType: this.psdkData.entitlementType || "none",
                    marketSegment: this.psdkData.marketSegment || "none",
                    derivedPersona: this.psdkData.derivedPersona || "none",
                    derivedSkill: this.psdkData.derivedSkill || "none",
                    derivedAppLaunchBucket: this.psdkData.derivedAppLaunchBucket || "none",
                    bonusLaunch: this.psdkData.bonusLaunch || "none",
                    ccxVersion: this.psdkData.ccxVersion || "none",
                    radarSessionGUID: this.psdkData.radarSessionGUID || "none"
                }), this.postEvent(ingestPayloadData);
            }
        },
        logViewChangeEvent: function(viewData) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = "uc-section", ingestPayloadData.sectionView = viewData.sectionView, 
            ingestPayloadData.sectionType = viewData.sectionType, this.postEvent(ingestPayloadData);
        },
        logItemOpenedEvent: function(itemData) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = "uc-file-open", ingestPayloadData.fileType = itemData.fileType, 
            ingestPayloadData.fileOpenType = itemData.openType, ingestPayloadData.sectionView = itemData.sectionView, 
            "undefined" != typeof itemData.itemPosition && (ingestPayloadData.itemPosition = itemData.itemPosition), 
            itemData.ucAction && (ingestPayloadData.ucAction = itemData.ucAction), itemData.cardID && (ingestPayloadData.cardID = itemData.cardID), 
            itemData.eventAction && (ingestPayloadData.eventAction = itemData.eventAction), 
            this.postEvent(ingestPayloadData);
        },
        logMiscellaneousEvent: function(itemData) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = itemData.eventType || "uc-misc";
            for (var key in itemData) ingestPayloadData[key] = itemData[key];
            this.postEvent(ingestPayloadData);
        },
        logMobileCreationsEvent: function(mcEventData) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = "mobile-creations";
            for (var prop in mcEventData) mcEventData[prop] && (ingestPayloadData[prop] = mcEventData[prop]);
            this.postEvent(ingestPayloadData);
        },
        constructMobileCreationsEventData: function(mode, action, cardData) {
            var mcEventData = {
                eventAction: action,
                cardTypeName: ""
            };
            if ("item" !== mode) for (var prop in cardData) cardData && (mcEventData[prop] = cardData[prop]);
            switch (mode) {
              case "project":
                mcEventData.cardTypeName = "project";
                break;

              case "pages":
                mcEventData.cardTypeName = "pages";
                break;

              case "app":
                mcEventData.cardTypeName = "appcards";
                break;

              case "item":
                mcEventData.cardTypeName = "item", mcEventData.cardName = cardData.syncGroup || null, 
                mcEventData.cardID = cardData.compositeId || null;
                break;

              default:
                iaw.log.console("Invalid Ingest Mobile Creations " + action + " event"), mcEventData = null;
            }
            return mcEventData;
        },
        logMobileCreationsRenderedEvent: function(mode, cardData) {
            var mcEventData = this.constructMobileCreationsEventData(mode, "render", cardData);
            mcEventData && this.logMobileCreationsEvent(mcEventData);
        },
        logMobileCreationsClickedEvent: function(mode, cardData) {
            var action = "item" !== mode ? "click" : "open", mcEventData = this.constructMobileCreationsEventData(mode, action, cardData);
            mcEventData && this.logMobileCreationsEvent(mcEventData);
        },
        logMobileCreationsErrorEvent: function(mcErrorCode) {
            var mcEventData = {
                eventAction: "error",
                errorCode: mcErrorCode
            };
            this.logMobileCreationsEvent(mcEventData);
        },
        logFNFTItemEvent: function(itemData) {
            var ingestPayloadData = this.createPayload();
            ingestPayloadData.eventType = "uc-file-open", ingestPayloadData.fileOpenType = "new", 
            iaw.util.assign(ingestPayloadData, itemData), this.postEvent(ingestPayloadData);
        },
        logFNFTItemRenderedEvent: function(itemData) {
            var itemPayloadData = {
                eventAction: "render",
                cardTypeName: itemData.activeFilter,
                displayMode: itemData.displayPosition >= 0 ? itemData.displayPosition : -1,
                sectionView: itemData.group && "clipboard" === itemData.group ? "clipboard" : "blank",
                displayTemplate: itemData.isPreset ? "preset" : "stock-template",
                cardName: itemData.name || itemData.title,
                cardID: itemData.id || "preset"
            };
            itemData.isPreset || (itemPayloadData.attributes = {
                price: itemData.price_prompt
            }), this.logFNFTItemEvent(itemPayloadData);
        },
        fnftUtil: {
            setCommonPayloadParameters: function(payload, data) {
                payload.displayMode = data.displayPosition, payload.cardTypeName = data.activeFilter, 
                payload.cardName = data.title, payload.cardID = data.id || "preset";
            },
            setCommonStockPayloadParameters: function(payload, data) {
                this.setCommonPayloadParameters(payload, data), payload.displayTemplate = "stock-template", 
                payload.attributes = {
                    price: data.price_prompt
                };
            },
            setCommonPresetPayloadParameters: function(payload, data) {
                this.setCommonPayloadParameters(payload, data), payload.displayTemplate = "preset", 
                payload.attributes = {}, this.setAttributesFromPreset(payload.attributes, data);
            },
            setAttributesFromPreset: function(attributes, preset) {
                for (var key in preset) switch (key) {
                  case "width":
                  case "height":
                  case "mode":
                  case "units":
                  case "profile":
                  case "fill":
                  case "resolution":
                  case "resolutionUnits":
                    attributes[key] = preset[key];
                }
            }
        },
        logFNFTActionClickedEvent: function(action, actionData) {
            var actionPayloadData = {
                eventAction: "click",
                ucAction: action
            };
            switch (actionData = actionData || {}, action) {
              case "preset-selected":
                this.fnftUtil.setCommonPresetPayloadParameters(actionPayloadData, actionData), delete actionPayloadData.ucAction;
                break;

              case "template-selected":
                this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData), delete actionPayloadData.ucAction;
                break;

              case "stock-search":
                actionPayloadData.displayTemplate = "stock-template", actionPayloadData.cardTypeName = actionData.activeFilter, 
                actionPayloadData.actionURL = actionData.actionURL + "&as_content=ccxstart-search";
                break;

              case "stock-sidebar":
                this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData), actionPayloadData.actionURL = actionData.actionURL + "&as_content=ccxstart-sidebar";
                break;

              case "render-preview":
                actionPayloadData.eventAction = "render", actionPayloadData.ucAction = "preview", 
                this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData);
                break;

              case "close-template":
                actionPayloadData.ucAction = "close", this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData);
                break;

              case "open-template":
                actionPayloadData.ucAction = "open", this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData);
                break;

              case "preview":
              case "preview-close":
              case "preview-back":
              case "license-template":
              case "download-start":
              case "download-end":
              case "download":
                this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData);
                break;

              case "too-large-render":
                this.fnftUtil.setCommonStockPayloadParameters(actionPayloadData, actionData), actionPayloadData.ucAction = "download-large", 
                actionPayloadData.eventAction = "render";
                break;

              case "close":
                this.fnftUtil.setCommonPresetPayloadParameters(actionPayloadData, actionData);
                break;

              case "preset-viewmore":
                this.fnftUtil.setCommonPresetPayloadParameters(actionPayloadData, actionData), actionPayloadData.ucAction = "viewmore", 
                delete actionPayloadData.attributes;
                break;

              case "preset-create":
                this.fnftUtil.setCommonPresetPayloadParameters(actionPayloadData, actionData), actionPayloadData.attributesChanged = !1, 
                actionPayloadData.ucAction = "create", actionData.settings && 0 !== Object.keys(actionData.settings).length && actionData.settings.constructor === Object && (actionPayloadData.attributesChanged = actionData.settings.attributesChanged || !1, 
                actionPayloadData.attributesChanged && (actionPayloadData.newAttributes = {}, this.fnftUtil.setAttributesFromPreset(actionPayloadData.newAttributes, actionData.settings)));
                break;

              case "more-options":
                this.fnftUtil.setCommonPresetPayloadParameters(actionPayloadData, actionData), iaw.util.assign(actionPayloadData, actionData.presetAttributes);
                break;

              case "tab-selected":
                actionPayloadData.cardTypeName = actionData.activeFilter;
                break;

              case "welcome-rendered":
                actionPayloadData.displayTemplate = "welcome", actionPayloadData.eventAction = "render", 
                actionPayloadData.displayCount = actionData.displayCount, actionPayloadData.cardTypeName = actionData.activeFilter, 
                actionPayloadData.ucAction = "render";
                break;

              case "welcome-closed":
                actionPayloadData.displayTemplate = "welcome", actionPayloadData.cardTypeName = actionData.activeFilter, 
                actionPayloadData.ucAction = "close";
                break;

              case "resize-dialog":
                actionPayloadData.eventAction = "resize", actionPayloadData.displayTemplate = actionData.displayTemplate, 
                actionPayloadData.cardName = actionData.cardName, actionPayloadData.cardTypeName = actionData.activeFilter, 
                actionData.displayMode >= 0 && (actionPayloadData.displayMode = actionData.displayMode), 
                actionPayloadData.attributes = actionData.attributes, delete actionPayloadData.ucAction;
            }
            this.logFNFTItemEvent(actionPayloadData);
        }
    }
};

var iaw = iaw || {};

iaw.cepUtil = {
    oneTimeHandler: !1,
    csInterface: window.__adobe_cep__ ? new CSInterface() : null,
    isStage: null,
    applicationID: window.__adobe_cep__ ? new CSInterface().getApplicationID() : "SIMU",
    events: {
        EXTENSIONREADY: "com.adobe.ccx.start.extensionReady",
        LOGPIP: "com.adobe.ccx.start.LOGPIP",
        kOpenRecentFile: "com.adobe.ccx.start.handleRecentFileOpen",
        kExecuteMenuCmd: "com.adobe.ccx.start.handleExecuteMenuCommand",
        kHostStatusChanged: "com.adobe.ccx.start.hostStatusChanged",
        REQUESTHOSTCLOSE: "com.adobe.ccx.start.requestHostClose",
        kOpenDropFiles: "com.adobe.ccx.start.handleDropFileOpen",
        kOpenPreferences: "com.adobe.ccx.start.handleOpenPreferences",
        kTrialExpired: "com.adobe.ccx.start.trialExpired",
        kGetUserJSONDataRequest: "com.adobe.ccx.start.getCCXUserJSONData.request",
        kGetUserJSONDataResponse: "com.adobe.ccx.start.getCCXUserJSONData.response",
        NEWDOCFROMTEMPLATE: "com.adobe.ccx.fnft.newDocFromTemplate",
        HOSTCLOSEFNFT: "com.adobe.ccx.fnft.hostRequestsClose",
        REQUESTDATACALC: "com.adobe.ccx.fnft.requestDataCalculation",
        UPDATEDATACALC: "com.adobe.ccx.fnft.updateDataCalculation",
        LOADEXTENSION: "com.adobe.extension.loadExtension",
        SAVEPRESET: "com.adobe.ccx.fnft.savePreset",
        DELETEPRESET: "com.adobe.ccx.fnft.deletePreset",
        INTERACTIVEREADY: "com.adobe.extension.interactiveReady",
        FNFTSTARTTIME: "com.adobe.ccx.fnft.loadStartTime",
        FNFTENDTIME: "com.adobe.ccx.fnft.loadEndTime"
    },
    authenticationInfo: {
        adobeStock: {
            clientID: "AdobeStockClient1",
            clientScope: "AdobeID,openid,creative_cloud,read_organizations,gnav,additional_info.address.mail_to,sao.stock"
        },
        adobeLearn: {
            clientID: "adobedotcom2",
            clientScope: "creative_cloud,AdobeID,openid,gnav,read_organizations,additional_info.projectedProductContext"
        },
        adobeAccount: {
            clientID: "adobedotcom2",
            clientScope: "creative_cloud,AdobeID,openid,gnav,read_organizations,additional_info.projectedProductContext"
        }
    },
    imsInfo: {
        imsInterface: window.__adobe_cep__ ? new IMSInterface() : null,
        stageConfig: {
            label: "Stage",
            clientId: "CCXInAppWelcome",
            clientSecret: "2625f91d-efa1-4685-a64d-eb36ad123f09",
            scope: "openid,AdobeID,creative_cloud",
            redirectUri: "https://oobe.adobe.com",
            imsServer: "ims-na1-stg1.adobelogin.com"
        },
        productionConfig: {
            label: "Production",
            clientId: "CCXInAppWelcome",
            clientSecret: "75606424-3628-4f70-82fb-9a1bf5dfb6b5",
            scope: "openid,AdobeID,creative_cloud",
            redirectUri: "https://oobe.adobe.com",
            imsServer: "ims-na1.adobelogin.com"
        },
        activeConfig: null,
        imsRef: null,
        imsTimeout: null,
        accessToken: null,
        accessTokenCallbacks: [],
        accessTokenInProgress: !1,
        lastAccessTokenTime: new Date().valueOf(),
        needRetry: !0,
        setEnvironment: function(mode) {
            this.activeConfig = "stage" === mode ? this.stageConfig : this.productionConfig;
        },
        isIMSDataValid: function(event) {
            return event && event.data && "" !== event.data;
        },
        handleFetchAccessToken: function(event) {
            var self = this;
            if (!(event && event.extensionId !== iaw.cepUtil.getExtensionID() || event && event.data && event.data.jump)) {
                if (self.imsTimeout && (clearTimeout(self.imsTimeout), self.imsTimeout = null), 
                self.imsInterface.removeEventListener(self.imsInterface.events.imsFetchAccessToken, self.handleFetchAccessToken), 
                self.isIMSDataValid(event)) {
                    switch (typeof event.data) {
                      case "string":
                        var imsData;
                        try {
                            imsData = JSON.parse(event.data);
                        } catch (e) {}
                        self.accessToken = imsData && imsData.access_token ? imsData.access_token : null;
                        break;

                      case "object":
                        self.accessToken = event.data.access_token || null;
                        break;

                      default:
                        self.accessToken = null;
                    }
                    self.accessToken || iaw.log.console("IMS response event: " + JSON.stringify(event));
                } else iaw.log.console("Failed to get access token: " + JSON.stringify(event));
                if (self.accessTokenInProgress = !1, iaw.log.console("IMS accessToken is : " + self.accessToken), 
                null === self.accessToken && self.needRetry) return self.needRetry = !1, void iaw.cepUtil.imsInfo.getAccessToken();
                var numCallbacks = self.accessTokenCallbacks.length;
                if (numCallbacks) {
                    self.lastAccessTokenTime = new Date().valueOf();
                    for (var index = 0; index < numCallbacks; ++index) {
                        var callback = self.accessTokenCallbacks[index];
                        callback && callback(self.accessToken);
                    }
                    self.accessTokenCallbacks = [];
                }
            }
        },
        accessTokenTimeout: function() {
            iaw.log.console("IMS access token fetch has timed out"), iaw.cepUtil.imsInfo.imsTimeout = null, 
            iaw.cepUtil.imsInfo.handleFetchAccessToken(null);
        },
        getAccessToken: function(callback) {
            var self = this;
            if (self.activeConfig || (self.activeConfig = self.productionConfig), self.accessTokenInProgress) self.accessTokenCallbacks.push(callback); else {
                var currentTime = new Date().valueOf();
                if (currentTime - self.lastAccessTokenTime >= 864e5 && (iaw.log.console("Clear expired access token."), 
                self.clearAccessToken()), self.accessToken && 0 !== self.accessToken.length && callback) return void callback(self.accessToken);
                self.accessTokenInProgress = !0, callback && self.accessTokenCallbacks.push(callback), 
                !self.imsRef && self.imsInterface && (self.imsRef = self.imsInterface.imsConnect(self.activeConfig.clientId)), 
                self.imsInterface.addEventListener(self.imsInterface.events.imsFetchAccessToken, function(event) {
                    this.handleFetchAccessToken(event);
                }.bind(this)), iaw.localstorage.userID ? self.imsInterface.imsFetchAccessToken(self.imsRef, self.activeConfig.clientId, self.activeConfig.clientSecret, iaw.localstorage.userID, self.activeConfig.redirectUri, self.activeConfig.scope) : self.imsInterface.imsGetCurrentUserIdHelper(function(userGUID) {
                    userGUID && userGUID.length > 0 && self.imsInterface.imsFetchAccessToken(self.imsRef, self.activeConfig.clientId, self.activeConfig.clientSecret, userGUID, self.activeConfig.redirectUri, self.activeConfig.scope);
                }), self.imsTimeout && clearTimeout(self.imsTimeout), self.imsTimeout = setTimeout(self.accessTokenTimeout, 1e4);
            }
        },
        getIMSAccounts: function() {
            var self = this;
            return self.activeConfig || (self.activeConfig = self.productionConfig), !self.imsRef && self.imsInterface && (self.imsRef = self.imsInterface.imsConnect(self.activeConfig.clientId)), 
            self.imsInterface.imsFetchAccounts(self.imsRef, self.activeConfig.clientId);
        },
        clearAccessToken: function() {
            this.accessToken = null;
        },
        createFetchContinueTokenCall: function(imsJumpClientID, imsJumpScope, url, callback) {
            iaw.log.console("createFetchContinueTokenCall attempting SSO workflows"), this.imsInterface.addEventListener(this.imsInterface.events.imsFetchContinueToken, callback);
            var baseURL = encodeURIComponent(url);
            this.imsInterface.imsFetchContinueToken(this.imsRef, this.accessToken, imsJumpClientID, baseURL, imsJumpScope, "token", "");
        },
        jumpURL: function(imsJumpClientID, imsJumpScope, url, callback) {
            var self = this, handleJumpURL = function(event) {
                self.imsInterface.removeEventListener(self.imsInterface.events.imsFetchContinueToken, handleJumpURL), 
                callback && callback(self.isIMSDataValid(event) && event.data.details.jump ? event.data.details.jump : url);
            };
            iaw.log.console("Attempting SSO workflows for url " + url), this.createFetchContinueTokenCall(imsJumpClientID, imsJumpScope, url, handleJumpURL);
        },
        isStagingRedirectInEffect: function() {
            var answer = !1;
            if (!window.__adobe_cep__ || !window.DOMParser) return answer;
            try {
                var csInterface = new CSInterface(), path = VulcanInterface.getAppPath("creativecloud") + (csInterface.getOSInformation().indexOf("Win") > -1 ? "\\..\\..\\C3Config.xml" : "/../../C3Config.xml");
                iaw.log.console("Path of S3Config.xml: " + path);
                var result = window.cep.fs.readFile(path);
                if (0 !== result.err) return answer;
                var xmlDoc = new DOMParser().parseFromString(result.data, "text/xml"), configNode = xmlDoc.getElementsByTagName("C3Config")[0].getElementsByTagName("config")[0];
                if (configNode) for (var namespaces = configNode.getElementsByTagName("namespace"), index = 0; index < namespaces.length; index++) {
                    var namespace = namespaces[index];
                    if (namespace && "accc.container" === namespace.getAttribute("name")) for (var properties = namespace.getElementsByTagName("property"), i = 0; i < properties.length; i++) {
                        var property = properties[i];
                        if (property && "IMS_ENV" === property.getAttribute("name")) {
                            var pVal = property.firstChild.nodeValue;
                            "STG" === pVal && (answer = !0);
                        }
                    }
                }
            } catch (ignore) {}
            return answer;
        }
    },
    imsValid: function() {
        return Boolean(this.imsInfo.imsInterface);
    },
    evalExtendScript: function(script, callback) {
        callback || (callback = function(result) {}), window.__adobe_cep__ ? window.__adobe_cep__.evalScript(script, callback) : callback(null);
    },
    evalExtendScriptWithParams: function() {
        if (arguments.length < 2) throw new Error("evalExtendScriptWithParams needs at least two arguments: script and callback");
        var paramsArray, script, args = Array.prototype.slice.call(arguments), callback = args.pop(), commandName = args.shift();
        paramsArray = args.map(function(arg) {
            var param = "object" == typeof arg ? JSON.stringify(arg) : arg;
            return "string" == typeof param ? '"' + param.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"' : param;
        }), script = commandName + "(" + paramsArray.join(",") + ")", window.__adobe_cep__ ? window.__adobe_cep__.evalScript(script, callback) : callback(null);
    },
    sendEvent: function(eventType, eventData, optExtensionID) {
        if (window.__adobe_cep__) {
            var event = new CSEvent();
            event.scope = "APPLICATION", event.appId = this.applicationID, event.extensionId = optExtensionID || iaw.cepUtil.getExtensionID(), 
            event.type = eventType, event.data = eventData, this.csInterface.dispatchEvent(event);
        }
    },
    getExtensionID: function() {
        return window.__adobe_cep__ && this.csInterface ? this.csInterface.getExtensionID() : "";
    },
    getExtensionVersion: function(useBundleVersion) {
        var verInfo = {
            version: "0.0.0",
            sha: null
        };
        if (window.__adobe_cep__) {
            var csInterface = this.csInterface, extensionDir = csInterface.getSystemPath(SystemPath.EXTENSION), os = csInterface.getOSInformation(), pathSeparator = os.indexOf("Win") >= 0 ? "\\" : "/", manifestPath = extensionDir + pathSeparator + "CSXS" + pathSeparator + "manifest.xml", fileContents = window.cep.fs.readFile(manifestPath);
            if (window.DOMParser) {
                var parser = new window.DOMParser(), xmlDoc = parser.parseFromString(fileContents.data, "text/xml"), extManifestElement = xmlDoc.getElementsByTagName("ExtensionManifest")[0];
                "undefined" != typeof extManifestElement && extManifestElement && (verInfo.sha = extManifestElement.attributes.getNamedItem("SHA").nodeValue, 
                verInfo.version = useBundleVersion ? extManifestElement.attributes.getNamedItem("ExtensionBundleVersion").nodeValue : extManifestElement.getElementsByTagName("ExtensionList")[0].firstElementChild.attributes.getNamedItem("Version").nodeValue);
            }
        }
        return verInfo;
    },
    isUserSignedIn: function(callback) {
        var imsInterface = this.imsInfo.imsInterface;
        imsInterface && imsInterface.imsGetCurrentUserIdHelper(function(adobeGUID) {
            callback && (adobeGUID && adobeGUID.length > 0 ? callback(!0, adobeGUID) : callback(!1, null));
        });
    },
    setEnvironment: function(mode) {
        this.imsInfo.imsInterface && this.imsInfo.setEnvironment(mode);
    },
    usingStageAuthentication: function() {
        return null === this.isStage && (this.isStage = this.imsInfo.isStagingRedirectInEffect()), 
        this.isStage;
    },
    getIMSAccessToken: function(callback) {
        this.imsInfo.imsInterface && this.imsInfo.getAccessToken(callback);
    },
    getPrimaryAccountType: function() {
        var accountType = "", accounts = "";
        try {
            this.imsInfo.imsInterface && (accounts = this.imsInfo.getIMSAccounts());
            var xmlDoc = new DOMParser().parseFromString(accounts, "text/xml"), accType = xmlDoc.getElementsByTagName("UserAccounts")[0].getElementsByTagName("UserData")[0].getElementsByTagName("AccountType")[0];
            accType && (accountType = accType.firstChild.nodeValue);
        } catch (e) {
            iaw.log.console("Exception in fetching account type"), iaw.log.exception("Fetch account type exception: " + e.message);
        }
        return accountType;
    },
    clearAccessToken: function() {
        this.imsInfo.imsInterface && this.imsInfo.clearAccessToken();
    },
    getUIThemeColor: function() {
        return this.csInterface ? this.csInterface.getHostEnvironment().appSkinInfo.panelBackgroundColor.color : null;
    },
    addThemeChangeListener: function() {
        this.csInterface && this.csInterface.addEventListener("com.adobe.csxs.events.ThemeColorChanged", function(event) {
            iaw.util.setUIThemeMode();
        }.bind(this));
    },
    createJumpURL: function(clientID, clientScope, url, callback) {
        this.imsValid && this.imsInfo.jumpURL(clientID, clientScope, url, callback);
    },
    getExtensionPath: function() {
        var path = null;
        if (this.csInterface) {
            var os = this.csInterface.getOSInformation(), pathSeparator = os.indexOf("Win") >= 0 ? "\\" : "/";
            path = this.csInterface.getSystemPath(SystemPath.EXTENSION) + pathSeparator;
        }
        return path;
    }
};

var iaw = iaw || {};

iaw.i18n = {
    localizedStringTable: null,
    urlLocalizationTable: null,
    normalizeLocaleID: function(localeID) {
        return localeID ? localeID.toLowerCase().replace("_", "-") : localeID;
    },
    addFromLocalLocaleFile: function(localeID, continueFn) {
        var self = this, xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/json"), xmlhttp.onreadystatechange = function() {
            4 === xmlhttp.readyState && xmlhttp.responseText && (xmlhttp.responseText && (self.localizedStringTable = JSON.parse(xmlhttp.responseText)), 
            document.getElementsByTagName("html")[0].setAttribute("lang", localeID.toLowerCase().replace(/_/, "-")), 
            continueFn && continueFn());
        }, xmlhttp.open("GET", "./locale/" + localeID + "/strings.json", !0), xmlhttp.send();
    },
    addLocalizedString: function(stringID, value) {
        stringID && (this.localizedStringTable[stringID] = value);
    },
    getLocalizedString: function(stringID) {
        var locStr = this.localizedStringTable && stringID ? this.localizedStringTable[stringID] : null, newStr = locStr ? locStr.replace("^n", "<br>") : "";
        return newStr;
    },
    getLocalizedSubstitutionString: function(stringID, subArray) {
        var locStr = this.localizedStringTable && stringID ? this.localizedStringTable[stringID] : null;
        if (locStr && subArray) for (var index = 0; index < subArray.length; index++) locStr = locStr.replace("^" + index, subArray[index]); else locStr = "";
        return locStr;
    },
    setDocumentElementString: function(elementID, stringID, dontLocalize) {
        stringID = stringID ? stringID : elementID;
        var elem = document.getElementById(elementID);
        elem && (elem.innerHTML = dontLocalize ? stringID : this.getLocalizedString(stringID));
    },
    addFromURLFile: function(type) {
        var self = this, xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/json"), xmlhttp.onreadystatechange = function() {
            if (4 === xmlhttp.readyState && xmlhttp.responseText && xmlhttp.responseText) try {
                self.urlLocalizationTable = JSON.parse(xmlhttp.responseText);
            } catch (e) {
                iaw.log.exception("i18n go URL table parse error: " + e.message);
            }
        }, "goURL" === type && xmlhttp.open("GET", "./locale/goURL.json", !0), xmlhttp.send();
    },
    getLangSuffixForHelpURL: function(appLang) {
        var helpURL = this.urlLocalizationTable && this.urlLocalizationTable.help && appLang ? this.urlLocalizationTable.help[appLang] : null;
        return helpURL ? helpURL : "en";
    },
    getLangSuffixForAccountURL: function(appLang) {
        var accountURL = this.urlLocalizationTable && this.urlLocalizationTable.account && appLang ? this.urlLocalizationTable.account[appLang] : null;
        return accountURL ? accountURL : "en";
    },
    getLangSuffixForMobileCreationsGoURL: function(appLang) {
        var suffix = this.urlLocalizationTable && this.urlLocalizationTable.mobilecreations && appLang ? this.urlLocalizationTable.mobilecreations[appLang] : null;
        return suffix && "en" !== suffix ? "_" + suffix : "";
    }
};

var iaw = iaw || {};

iaw.json = {
    readLocalJSONFile: function(path) {
        var obj = null;
        if (window.__adobe_cep__ && path) {
            var result = window.cep.fs.readFile(path);
            if (0 === result.err) try {
                obj = JSON.parse(result.data);
            } catch (error) {
                iaw.log.exception("Failed to read JSON file with path [" + path + "], error=" + error), 
                obj = null;
            } else 3 === result.err ? iaw.log.console("Attempt to read JSON file failed, file does not exist [" + path + "]") : iaw.log.console("Attempt to read JSON file failed with path [" + path + "], error code=" + result.err);
        }
        return obj;
    },
    commonDataReceiver: function(key, val) {
        switch (key) {
          case "userTrackingEnabled":
            "string" == typeof val && (val = "true" === val || "1" === val), iaw.analytics.enabled = val;
            break;

          case "fnftEnabled":
            "string" == typeof val && (val = "true" === val || "1" === val);
            break;

          case "shortcut":
            val = val.replace(/Cmd\+/, "⌘");
            break;

          case "language":
            val = "en_IL" !== val && "en_AE" !== val ? val : "en_US";
        }
        return val;
    },
    startDataReceiver: function(key, val) {
        switch (key) {
          case "thumbnailViewEnabled":
          case "listViewEnabled":
            "string" == typeof val && (val = "true" === val || "1" === val);
            break;

          case "size":
            val = parseInt(val);
            break;

          case "thumb":
            val && (val = "data:image/jpeg;base64," === val ? "" : val.replace(/\n/g, ""));
            break;

          case "icon":
            if (val.indexOf("SP_Preset") < 0 && val.indexOf("SP_QuickStart") < 0) switch (val) {
              case "aep":
              case "pr_proj_primary":
              case "pr_convert_premiere_clip":
                val = "CCX_Start_DefaultThumb_Pr_Ae";
                break;

              case "ai":
              case "psd":
              case "id":
              case "id_library":
              case "id_book":
                val = "CCX_Start_DefaultThumb_Ps_Ai_Id";
                break;

              default:
                val = "CCX_Start_DefaultThumb_other";
            }
            break;

          case "dontShowAgain":
            "string" == typeof val && (val = "true" === val || "1" === val);
            break;

          case "secondsLeftInTrial":
          case "appStartClockTime":
            "string" == typeof val && (val = parseInt(val));
            break;

          default:
            val = iaw.json.commonDataReceiver(key, val);
        }
        return val;
    },
    fnftDataReceiver: function(key, val) {
        switch (key) {
          default:
            val = iaw.json.commonDataReceiver(key, val);
        }
        return val;
    }
};

var iaw = iaw || {};

iaw.libraryManager = {
    statusLookupMap: {},
    hasSyncListener: !1,
    DOWNLOADED: "downloaded",
    DOWNLOADING: "downloading",
    DOWNLOAD_ERR: "error",
    TEMPLATE_ELEMENT_TYPE: "application/vnd.adobe.element.template+dcx",
    MIME_TYPE: {
        PHXS: "image/vnd.adobe.photoshop.template",
        ILST: "application/illustrator.template",
        IDSN: "application/vnd.adobe.indesign.template"
    },
    initialized: !1,
    libraryCollections: null,
    debounce: 300,
    lastSyncTime: new Date().valueOf(),
    pendingSyncTimeout: null,
    checkRunningTimeout: null,
    cclibraryProcessLaunchPending: !1,
    cachedLicensedTemplates: {},
    onLibraryCollectionsLoaded: function() {
        clearTimeout(iaw.libraryManager.checkRunningTimeout), iaw.libraryManager.libraryCollections = ccLibraries && ccLibraries.getLoadedCollections(), 
        "com.adobe.ccx.fnft" === iaw.cepUtil.getExtensionID() && iaw.libraryManager.libraryCollections && (iaw.libraryManager.getLicensedTemplates(iaw.store.get("host").hostID).then(function(templates) {
            return window.__adobe_cep__ ? (iaw.fnftFakeLicensedTemplates || (iaw.libraryManager.cachedLicensedTemplates = {}), 
            void templates.forEach(function(template) {
                iaw.libraryManager.statusLookupMap[template.id] = {
                    templateId: template.id,
                    downloadStatus: iaw.libraryManager.DOWNLOADED,
                    path: template.url,
                    elementRef: template.elementRef
                };
            })) : void iaw.fnftFakeLicensedTemplates.forEach(function(template) {
                iaw.libraryManager.statusLookupMap[template.id] = {
                    templateId: template.id,
                    downloadStatus: iaw.libraryManager.DOWNLOADED,
                    path: template.url
                };
            });
        })["catch"](function() {}), iaw.libraryManager.libraryCollections.forEach(function(libraryCollection) {
            !function(libraryCollection) {
                libraryCollection.addSyncListener(function() {
                    iaw.libraryManager.onSync(libraryCollection);
                });
            }(libraryCollection);
        }));
    },
    init: function(filters) {
        return filters = filters || "*", iaw.libraryManager.isProcessInstalled() ? void iaw.util.loadExternalScript("./js/cc-libraries-api.min.js").then(function(scriptTag) {
            if ("undefined" == typeof ccLibraries) return iaw.log.console("Fail to load CC Library javascript file.");
            var DEPENDENCIES = {
                log: function(message) {
                    iaw.log.console(message);
                }
            }, OPTIONS = {
                SHARED_LOCAL_STORAGE: !0,
                ELEMENT_TYPE_FILTERS: filters
            };
            ccLibraries.configure(DEPENDENCIES, OPTIONS), iaw.libraryManager.checkRunningTimeout = setTimeout(function() {
                iaw.libraryManager.isProcessRunning() || ccLibraries.isConnected() || (iaw.log.console("Start to launch CCLibrary Process"), 
                iaw.libraryManager.launchCCLibraryProcess());
            }, 1e3), ccLibraries.addLoadedCollectionsListener(iaw.libraryManager.onLibraryCollectionsLoaded);
        }) : iaw.log.console("CC Library Process is not installed.");
    },
    getTemplateLibrary: function() {
        return new Promise(function(resolve, reject) {
            if (!iaw.libraryManager.isLibraryCollelctionsLoaded()) return iaw.log.console("Get template library: Fail to load library collections."), 
            reject();
            var templateLib, libraryCollection = iaw.libraryManager.libraryCollections[0], libraryName = iaw.i18n.getLocalizedString("stock_template_library_name");
            libraryCollection.libraries.forEach(function(library) {
                templateLib || library.name !== libraryName || (templateLib = library);
            }), templateLib || (templateLib = libraryCollection.createLibrary(libraryName)), 
            resolve(templateLib);
        });
    },
    isRepresentationDownloadPending: function(representation) {
        return !!representation.isExternalLink && (!representation.getCachedContentPath() && !representation.getCachedExternalLinkError());
    },
    isElementDownloadPending: function(element) {
        return element.representations.some(function(representation) {
            return iaw.libraryManager.isRepresentationDownloadPending(representation);
        });
    },
    retryElementDownload: function(element) {
        element.representations.forEach(function(representation) {
            iaw.libraryManager.isRepresentationDownloadPending(representation) && representation.getContentPath();
        });
    },
    getElementDownloadProgress: function(element) {
        var downloadProgress;
        return element.representations.forEach(function(representation) {
            void 0 === downloadProgress && (downloadProgress = representation.getExternalLinkDownloadProgress());
        }), downloadProgress;
    },
    onSync: function(libraryCollection) {
        if (!iaw.libraryManager.pendingSyncTimeout) {
            var currentTime = new Date().valueOf();
            if (currentTime - iaw.libraryManager.lastSyncTime < iaw.libraryManager.debounce) return void function(libraryCollection) {
                iaw.libraryManager.pendingSyncTimeout = setTimeout(function() {
                    iaw.libraryManager.pendingSyncTimeout = void 0, iaw.libraryManager.onSync(libraryCollection);
                }, iaw.libraryManager.debounce);
            }(libraryCollection);
            iaw.libraryManager.lastSyncTime = currentTime;
            var statusLookupMap = iaw.libraryManager.statusLookupMap;
            libraryCollection.libraries.forEach(function(library) {
                library.getFilteredElements(iaw.libraryManager.TEMPLATE_ELEMENT_TYPE).forEach(function(element) {
                    if (void 0 !== iaw.stockUtil.getElementStockLicense(element)) {
                        var id = iaw.stockUtil.getElementStockId(element), status = statusLookupMap[id] || {
                            templateId: id
                        }, oldProgress = status.progress;
                        status.progress = iaw.libraryManager.getElementDownloadProgress(element);
                        var oldPending = status.downloadPending;
                        status.downloadPending = iaw.libraryManager.isElementDownloadPending(element);
                        var logPrefix = "Stock template [" + status.templateId + "] ";
                        if (status.downloadPending !== oldPending || status.progress !== oldProgress) {
                            if (void 0 === status.progress || oldPending && !status.downloadPending) {
                                if (oldProgress && status.progress && status.progress < oldProgress) return;
                                return void element.getPrimaryRepresentation().getContentPath(function(err, path) {
                                    if (!(err || status.downloadStatus === iaw.libraryManager.DOWNLOADED && status.path === path)) {
                                        if (status.downloadStatus !== iaw.libraryManager.DOWNLOADED) {
                                            var templateData = iaw.util.getTemplateData(id) || {};
                                            iaw.analytics.ingest.logFNFTActionClickedEvent("download-end", templateData), iaw.log.console(logPrefix + "is downloaded."), 
                                            templateData && (templateData.licensedTime = element.modified, templateData.lastUsedTime = iaw.localstorage.getUserItem("templateLUT_" + id) || element.modified, 
                                            templateData.template_category = templateData.template_category || [], templateData.template_category.indexOf("saved") === -1 && templateData.template_category.push("saved"));
                                        }
                                        status.downloadStatus = iaw.libraryManager.DOWNLOADED, status.path = path, status.elementRef = element.getReference(), 
                                        iaw.store.set([ "input", "download-status" ], status), statusLookupMap[id] = status;
                                    }
                                });
                            }
                            if (status.progress === -1) {
                                if (status.downloadStatus === iaw.libraryManager.DOWNLOAD_ERR) return;
                                status.downloadStatus = iaw.libraryManager.DOWNLOAD_ERR, iaw.log.console(logPrefix + "fail to be downloaded."), 
                                iaw.store.set([ "input", "download-status" ], status);
                            } else status.progress >= oldProgress && status.downloadPending && (status.downloadStatus = iaw.libraryManager.DOWNLOADING, 
                            status.licensedTime = element.modified, status.lastUsedTime = element.modified, 
                            iaw.log.console(logPrefix + "is being downloaded, progress=" + status.progress), 
                            iaw.store.set([ "input", "download-status" ], status));
                            statusLookupMap[id] = status;
                        } else status.downloadPending && statusLookupMap[id].downloadStatus !== iaw.libraryManager.DOWNLOADING && (iaw.analytics.ingest.logFNFTActionClickedEvent("download-start", iaw.util.getTemplateData(id) || {}), 
                        status.downloadStatus = iaw.libraryManager.DOWNLOADING, status.progress = 0, statusLookupMap[id] = status, 
                        iaw.store.set([ "input", "download-status" ], status));
                    }
                });
            });
        }
    },
    buildupTemplate: function(element, checkPurchased, mime_type) {
        return new Promise(function(resolve, reject) {
            if (!element || checkPurchased && void 0 === iaw.stockUtil.getElementStockLicense(element) || iaw.libraryManager.isElementDownloadPending(element)) return reject();
            var representation = element.getPrimaryRepresentation();
            return representation ? void representation.getContentPath(function(err, templatePath) {
                return err ? reject(err) : void element.getThumbnailPath(202, function(err, thumbnailPath) {
                    err && (thumbnailPath = null);
                    var id = iaw.stockUtil.getElementStockId(element);
                    resolve({
                        id: id,
                        mime_type: mime_type,
                        template_category: [ "saved", "recent" ],
                        title: element.name,
                        created: element.created,
                        licensedTime: element.modified,
                        modified: element.modified,
                        lastUsedTime: iaw.localstorage.getUserItem("templateLUT_" + id) || element.modified,
                        description: iaw.i18n.getLocalizedString("newdoc_details_template_default"),
                        thumbnail_url: thumbnailPath,
                        width: representation.width,
                        height: representation.height,
                        url: templatePath,
                        size: representation.contentLength,
                        elementRef: element.getReference(),
                        previews: []
                    });
                });
            }) : reject();
        });
    },
    isConnected: function() {
        return ccLibraries.isConnected();
    },
    getServiceInfo: function() {
        return ccLibraries.getServiceInfo();
    },
    isProcessInstalled: function() {
        return !!window.__adobe_cep__ && VulcanInterface.isAppInstalled("cclibraries");
    },
    isProcessRunning: function() {
        return VulcanInterface.isAppRunning("cclibraries");
    },
    launchCCLibraryProcess: function() {
        function started() {
            interval && clearInterval(interval), iaw.libraryManager.cclibraryProcessLaunchPending = !1, 
            ccLibraries.reconnect(), VulcanInterface.removeMessageListener(message, started), 
            setTimeout(function() {
                iaw.libraryManager.isConnected() || iaw.libraryManager.launchCCLibraryProcess();
            }, 1e3);
        }
        function callLaunch() {
            if (iaw.libraryManager.isConnected()) return void started();
            var serviceInfo = iaw.libraryManager.getServiceInfo() || {};
            serviceInfo.updateRequired || !iaw.libraryManager.isProcessInstalled() || iaw.libraryManager.isProcessRunning() || (iaw.log.console("Launching CCLibrary Process"), 
            VulcanInterface.launchApp("cclibraries", !1));
        }
        if (!iaw.libraryManager.cclibraryProcessLaunchPending) {
            var interval, message = "vulcan.SuiteMessage.cclibraries.service.Initialized";
            VulcanInterface.addMessageListener(message, started), ccLibraries.reconnect(), iaw.libraryManager.cclibraryProcessLaunchPending = !0, 
            interval = setInterval(callLaunch, 5e3), callLaunch();
        }
    },
    getLicensedTemplates: function(hostID) {
        return new Promise(function(resolve, reject) {
            function onFinish(templates) {
                templates = templates.filter(function(item, pos) {
                    return templates.indexOf(item) == pos;
                }), resolve(templates);
            }
            if (!window.__adobe_cep__) return resolve(iaw.fnftFakeLicensedTemplates);
            if (!iaw.libraryManager.isLibraryCollelctionsLoaded()) return iaw.log.console("Get licensed templates: Fail to load library collections."), 
            reject();
            var elements = [], libraries = [];
            iaw.libraryManager.libraryCollections.forEach(function(libraryCollection) {
                libraries = libraries.concat(libraryCollection.libraries);
            }), libraries.forEach(function(library) {
                elements = elements.concat(library.getFilteredElements(iaw.libraryManager.TEMPLATE_ELEMENT_TYPE));
            });
            var mime_type = iaw.libraryManager.MIME_TYPE[hostID];
            mime_type && (elements = elements.filter(function(element) {
                return element.getPrimaryRepresentation().isCompatibleType(mime_type);
            }));
            var callCount = 0, templates = [];
            return elements && 0 !== elements.length ? void elements.forEach(function(element) {
                iaw.libraryManager.buildupTemplate(element, !0, mime_type).then(function(template) {
                    templates.push(template), ++callCount === elements.length && onFinish(templates);
                })["catch"](function() {
                    ++callCount === elements.length && onFinish(templates);
                });
            }) : onFinish([]);
        });
    },
    elementRefsToTemplates: function(elementRefs) {
        return new Promise(function(resolve, reject) {
            function onFinish(templates) {
                resolve(templates);
            }
            if (!elementRefs) return reject();
            if (!window.__adobe_cep__) return resolve(iaw.fnftFakeLicensedTemplates);
            if (!iaw.libraryManager.isLibraryCollelctionsLoaded()) return iaw.log.console("ElementRefs to templates: Fail to load library collections."), 
            reject();
            var callCount = 0, elements = [];
            elementRefs.forEach(function(elementRef) {
                elementRef && elements.push(ccLibraries.resolveElementReference(elementRef));
            });
            var templates = [];
            return elements && 0 !== elements.length ? void elements.forEach(function(element) {
                iaw.libraryManager.buildupTemplate(element).then(function(template) {
                    templates.push(template), ++callCount === elements.length && onFinish(templates);
                })["catch"](function() {
                    ++callCount === elements.length && onFinish(templates);
                });
            }) : onFinish([]);
        });
    },
    getTemplatePath: function(libraryCollection, stockTemplateId) {
        return new Promise(function(resolve, reject) {
            if (!window.__adobe_cep__) {
                var path;
                return iaw.fnftFakeLicensedTemplates.forEach(function(template) {
                    template.id === stockTemplateId && (path = template.url);
                }), path;
            }
            var isFound = !1;
            libraryCollection.libraries.forEach(function(library) {
                library.elements.forEach(function(element) {
                    var id = iaw.stockUtil.getElementStockId(element);
                    id !== stockTemplateId || isFound || (isFound = !0, element.getPrimaryRepresentation().getContentPath(function(err, path) {
                        resolve(path);
                    }));
                });
            }), isFound || resolve();
        });
    },
    isTemplateLicensed: function(id) {
        if (!window.__adobe_cep__) {
            var license = !1;
            return iaw.fnftFakeLicensedTemplates.forEach(function(template) {
                template.id === id && (license = !0);
            }), license;
        }
        return !!(iaw.libraryManager.cachedLicensedTemplates && Object.keys(iaw.libraryManager.cachedLicensedTemplates).length > 0 && void 0 !== iaw.libraryManager.cachedLicensedTemplates[id]) || iaw.libraryManager.statusLookupMap[id] && iaw.libraryManager.statusLookupMap[id].downloadStatus === iaw.libraryManager.DOWNLOADED;
    },
    isTemplateDownloading: function(id) {
        return iaw.libraryManager.statusLookupMap[id] && iaw.libraryManager.statusLookupMap[id].downloadStatus === iaw.libraryManager.DOWNLOADING;
    },
    getTemplateStatus: function(id) {
        return iaw.libraryManager.statusLookupMap[id];
    },
    setTemplateStatus: function(id, status) {
        return iaw.libraryManager.statusLookupMap[id] = status;
    },
    getElementRefById: function(id) {
        return iaw.libraryManager.statusLookupMap[id] && iaw.libraryManager.statusLookupMap[id].elementRef;
    },
    getIdByElementRef: function(elementRef) {
        if ("undefined" != typeof ccLibraries) {
            var element = ccLibraries && ccLibraries.resolveElementReference(elementRef);
            return element && iaw.stockUtil.getElementStockId(element);
        }
        return null;
    },
    isLibraryCollelctionsLoaded: function() {
        return iaw.libraryManager.libraryCollections && iaw.libraryManager.libraryCollections.length > 0;
    },
    getCachedTemplates: function(hostID) {
        return new Promise(function(resolve, reject) {
            if (iaw.fnftFakeLicensedTemplates) {
                var templates = [];
                return iaw.fnftFakeLicensedTemplates.forEach(function(template) {
                    template.mime_type === iaw.libraryManager.MIME_TYPE[hostID] && (templates.push(template), 
                    iaw.libraryManager.cachedLicensedTemplates[template.id] = template);
                }), resolve(templates);
            }
            var licensedTempaltes = [], csInterface = new CSInterface(), lookupFilePath = csInterface.getSystemPath(SystemPath.USER_DATA) + "/Adobe/Creative Cloud Libraries/LIBS/librarylookupfile", lookupMapJSON = iaw.json.readLocalJSONFile(lookupFilePath);
            lookupMapJSON && lookupMapJSON.libraries && Object.keys(lookupMapJSON.libraries).forEach(function(libId) {
                var lib = lookupMapJSON.libraries[libId];
                lib && lib.elements && Object.keys(lib.elements).forEach(function(elementId) {
                    var element = lib.elements[elementId];
                    if (element && element.reps) {
                        var template = {
                            id: element.stockId,
                            template_category: [ "saved", "recent" ],
                            title: element.name,
                            created: element.mod,
                            licensedTime: element.mod,
                            modified: element.mod,
                            lastUsedTime: iaw.localstorage.getUserItem("templateLUT_" + element.stockId) || element.mod,
                            description: iaw.i18n.getLocalizedString("newdoc_details_template_default"),
                            elementRef: "cloud-asset://" + lib.domain + lib.path + "/" + libId + ";node=" + elementId,
                            previews: []
                        }, isWindows = "win" === iaw.store.get([ "host", "platform" ]) || "windows" === iaw.store.get([ "host", "platform" ]) || !1;
                        element.reps.forEach(function(rep) {
                            rep && rep.type === iaw.libraryManager.MIME_TYPE[hostID] ? (template.mime_type = rep.type, 
                            isWindows ? template.url = rep.path.replace(/\\/g, "/") : template.url = rep.path) : rep && "image/jpeg" === rep.type && (isWindows ? template.thumbnail_url = rep.path.replace(/\\/g, "/") : template.thumbnail_url = rep.path);
                        }), template.mime_type && template.url && licensedTempaltes.push(template);
                    }
                });
            }), licensedTempaltes.forEach(function(template) {
                iaw.libraryManager.cachedLicensedTemplates[template.id] = template;
            }), resolve(licensedTempaltes);
        });
    },
    getIdByCachedElementRef: function(elementRef) {
        var templates = iaw.libraryManager.cachedLicensedTemplates, keys = Object.keys(templates);
        if (templates && keys.length > 0) for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (templates[key].elementRef === elementRef) return templates[key].id;
        }
        return null;
    }
};

var iaw = iaw || {};

iaw.localstorage = {
    userID: null,
    setUserItem: function(key, val) {
        this.userID && key && (window.localStorage[this.userID + "_" + key] = JSON.stringify(val));
    },
    getUserItem: function(key) {
        var val = null;
        this.userID && key && (val = window.localStorage[this.userID + "_" + key] || null);
        try {
            val = JSON.parse(val);
        } catch (err) {
            val = null;
        }
        return val;
    },
    setGlobalItem: function(key, val) {
        key && (window.localStorage[key] = JSON.stringify(val));
    },
    getGlobalItem: function(key) {
        var val = null;
        key && (val = window.localStorage[key] || null);
        try {
            val = JSON.parse(val);
        } catch (err) {
            val = null;
        }
        return val;
    }
};

var iaw = iaw || {};

iaw.log = {
    enabled: !0,
    kLogPrefix: "CCX-Start",
    console: function(msg, optParam) {
        var kIndentation = "     ", prefix = "", depth = 0, trace = !1;
        "object" == typeof optParam ? (prefix = optParam.prefix ? " - " + optParam.prefix : prefix, 
        depth = optParam.indent ? optParam.indent : depth, trace = optParam.trace ? optParam.trace : trace) : "string" == typeof optParam && (prefix = " - " + optParam);
        for (var logmsg = this.kLogPrefix + prefix + " :: "; depth > 0; depth--) logmsg += kIndentation;
        logmsg += msg, console.log(logmsg), trace && console.trace();
    },
    dump: function(obj, prefix) {
        console.log("<< " + this.kLogPrefix + " >> object: " + (prefix ? prefix + " - %o" : "%o"), obj);
    },
    debug: function(msg) {
        this.console(msg, "DEBUG");
    },
    separator: function() {
        console.log(this.kLogPrefix + "==========================================================");
    },
    mark: function(msg, prefix) {
        this.separator(), this.console("@" + Date() + " " + msg, prefix);
    },
    logObject: function(msg, obj, step) {
        if (this.console(msg), step = "undefined" != typeof step ? step : 1, "undefined" != typeof obj && null !== obj) {
            var otype = null;
            switch (typeof obj) {
              case "object":
                for (var member in obj) otype = typeof obj[member], this.console(member + " = " + obj[member] + " (" + otype + ")", {
                    indent: step
                });
                break;

              case "array":
                for (var arraylen = obj.length, idx = 0; idx < arraylen; idx++) otype = typeof obj[idx], 
                this.console("array[" + idx + "]= " + obj[idx] + " (" + otype + ")", {
                    indent: step
                });
                break;

              default:
                this.console("(" + typeof obj + ") : " + obj, {
                    indent: step
                });
            }
        }
    },
    logJSON: function(msg, jsonData) {
        window.__adobe_cep__ ? this.console(msg + " " + JSON.stringify(jsonData)) : this.console(msg + "\n" + JSON.stringify(jsonData, null, 4));
    },
    exception: function(e) {
        console.trace(), console.error(this.kLogPrefix + " EXCEPTION! " + e.stack);
    }
};

var iaw = iaw || {};

iaw.motor = {
    _running: !1,
    _steps: 0,
    _cycle: 30,
    _throttleSwitch: !1,
    _pistons: [],
    _stopped: !1,
    start: function() {
        iaw.motor._running = !1, this._stopped = !1, iaw.motor._steps = 0, window.addEventListener("resize", iaw.motor.kick.bind(this), !1);
    },
    stop: function() {
        this._stopped = !0;
    },
    update: function() {
        if (!this._stopped) {
            if (iaw.motor._steps++ > iaw.motor._cycle) return void (iaw.motor._running = !1);
            if (iaw.motor._throttleSwitch = !iaw.motor._throttleSwitch, iaw.motor._throttleSwitch) for (var i = 0; i < iaw.motor._pistons.length; i++) {
                var o = iaw.motor._pistons[i];
                o.func.call(o.scope || window, iaw.motor._cycle - iaw.motor._steps);
            }
            window.requestAnimationFrame(iaw.motor.update);
        }
    },
    kick: function() {
        this._stopped || (iaw.motor._steps = 0, iaw.motor._running || (iaw.motor._running = !0, 
        iaw.motor.update()));
    },
    add: function(cb, scope) {
        cb || console.error("[iaw.motor.add] Pass in a valid function");
        var k = iaw.util.hashStr(cb.toString()), h = iaw.motor.has(k, scope);
        h === -1 && iaw.motor._pistons.push({
            func: cb,
            scope: scope,
            key: k
        });
    },
    remove: function(cb) {
        var k = iaw.util.hashStr(cb.toString()), i = iaw.motor.has(k);
        i !== -1 && iaw.motor._pistons.splice(i, 1);
    },
    has: function(k, scope) {
        var i, n = -1, s = null;
        for (i = 0; i < iaw.motor._pistons.length; i++) if (n = iaw.motor._pistons[i].key, 
        s = iaw.motor._pistons[i].scope, n === k && s === scope) return i;
        return -1;
    }
}, iaw.perf = {
    timers: {
        DataTime: "all data loaded",
        HostData: "host data",
        HostPresetData: "host preset data",
        PSDKData: "psdk data",
        StockData: "stock data",
        LicensedData: "licensed templates",
        LoadLibraryFile: "CC Libraries script load",
        InitLibrary: "CC Libraries init",
        RetrieveLicensedTemplate: "retreive licensed template",
        TemplateFixup: "template fixup",
        InitHost: "host init",
        InitStock: "stock init",
        JSLibLateLoad: "JS scripts late load",
        InitLicensed: "licensed templates init",
        UI: "UI scripts load",
        LoadTime: "total load time",
        InteractiveTime: "interactive ready",
        FinalizeData: "finalize all data",
        RenderTime: "render time",
        StockDataRequest: "stock data request",
        PostStockData: "postprocess stock data",
        CORELIBS: "data store lib & iaw load",
        INGESTCONFIG: "Ingest config"
    },
    _timers: {},
    _startMark: 0,
    _measures: [],
    _logToHighBeam: !1,
    _globalDelta: function() {
        var now = window.performance.now(), delta = 0;
        return this._startMark && (delta = Math.round(now - this._startMark)), delta;
    },
    markStart: function(start) {
        this._startMark = start || window.performance.now();
    },
    setHighBeamMode: function(enabled, category) {
        return category ? (this._logToHighBeam = enabled, void (this._highBeamCategory = category)) : (console.log("CCX-Performance: Error 'category' parameter is required for HighBeam perfromance logging, data will not be sent."), 
        void (this._logToHighBeam = !1));
    },
    set: function(strID) {
        console.time(strID), this._timers[strID] = window.performance.now(), this._measures.push({
            mode: "set",
            id: strID,
            globalDelta: this._globalDelta()
        });
    },
    measure: function(strID, start) {
        if (console.timeEnd(strID), !this._timers[strID] && !start) return void console.log("[perf.measure] metric for key: '" + strID + "' was not set - ignoring measure mark");
        start = start || this._timers[strID];
        var now = window.performance.now(), measure = {
            mode: "measure",
            id: strID,
            deltaT: Math.round(now - start),
            globalDelta: this._globalDelta()
        };
        this._measures.push(measure);
    },
    report: function(clearMeasures) {
        var count = this._measures.length, pipDataGroup = {};
        console.log("[perf.report] ----------------------------------------------");
        for (var index = 0; index < count; ++index) {
            var measure = this._measures[index], message = null;
            "measure" === measure.mode ? (message = "[perf.measure] " + measure.id + ": " + measure.deltaT + " ms (global: " + measure.globalDelta + " ms)", 
            pipDataGroup[measure.id] = measure.deltaT) : message = "[perf.set] mark for: " + measure.id + " (global: " + measure.globalDelta + " ms)", 
            console.log(message);
        }
        this._logToHighBeam && iaw.analytics.pip.logDataGroupEvent("Startup Performance", pipDataGroup, this._highBeamCategory, "performance"), 
        clearMeasures && (this._measures.length = 0);
    }
};

var iaw = iaw || {};

iaw.profile = {
    configurations: {
        stage: {
            url: "https://cc-collab-stage.adobe.io/profile",
            expirationDays: 1
        },
        prod: {
            url: "https://cc-collab.adobe.io/profile",
            expirationDays: 1
        }
    },
    config: null,
    retryAttempt: 0,
    fetchImage: function(userGUID, token, callback) {
        var url, self = this;
        iaw.util.promise("GET", self.config.url, token).then(function(response) {
            switch (typeof response) {
              case "string":
                url = JSON.parse(response).user.avatar;
                break;

              case "object":
                url = response.user.avatar;
            }
            return url ? (iaw.util.downLoadImage(url, function(blob) {
                if (!blob) return void (self.callback && self.callback(null));
                var reader = new window.FileReader();
                reader.readAsDataURL(blob), reader.onloadend = function() {
                    var imageBase64 = reader.result;
                    iaw.localstorage.setUserItem("profile_image", imageBase64), iaw.localstorage.setUserItem("profile_image_timestamp", new Date().getTime()), 
                    iaw.log.debug("[" + url + "] Downloaded profile image for user [" + userGUID + "]"), 
                    callback(imageBase64);
                };
            }), void (self.retryAttempt = 0)) : callback(null);
        })["catch"](function(err) {
            iaw.log.debug("Fail to download profile image with retryAttempt=" + self.retryAttempt), 
            0 === self.retryAttempt && (iaw.cepUtil.clearAccessToken(), self.getProfilePicture(userGUID, callback, ++self.retryAttempt));
        });
    },
    isProfilePictureAvailable: function(userGUID) {
        var isAvailable = !1, expirationDays = this.config.expirationDays, imageBase64 = iaw.localstorage.getUserItem("profile_image"), timestamp = iaw.localstorage.getUserItem("profile_image_timestamp");
        if (imageBase64 && timestamp) {
            var days = (new Date().getTime() - timestamp) / 864e5;
            isAvailable = timestamp && days < expirationDays;
        }
        return isAvailable;
    },
    getProfilePicture: function(userGUID, callback, retryAttempt) {
        if (this.retryAttempt = retryAttempt || 0, this.config = this.config || (iaw.cepUtil.usingStageAuthentication() ? this.configurations.stage : this.configurations.prod), 
        iaw.log.debug("Start to get profile Picture, for user [" + userGUID + "]"), this.isProfilePictureAvailable(userGUID)) {
            iaw.log.debug("Found cached profile image for user [" + userGUID + "]");
            var imageBase64 = iaw.localstorage.getUserItem("profile_image");
            return void (callback && callback(imageBase64));
        }
        iaw.cepUtil.getIMSAccessToken(function(token) {
            iaw.profile.fetchImage(userGUID, token, callback);
        });
    }
};

var iaw = iaw || {};

iaw.stockUtil = {
    STOCK_NAMESPACE: "adobestock",
    STOCK_DATA_KEY: "trackingdata",
    STOCK_STATE_PURCHASED: "purchased",
    STOCK_STATE_NOT_PURCHASED: "not_purchased",
    STOCK_URL_LICENSE: "https://www.adobe.com/go/stocklicense_",
    STOCK_URL: "https://stock.adobe.com",
    STOCK_URL_SEARCH: "https://stock.adobe.com/Search",
    STOCK_URL_STAGE: "https://primary.staging.adobestock.com",
    STOCK_URL_SEARCH_STAGE: "https://primary.staging.adobestock.com/Search",
    getStockData: function(representation) {
        return representation && representation.getValue(this.STOCK_NAMESPACE, this.STOCK_DATA_KEY);
    },
    getStockDataForElement: function(element, index) {
        var representation = void 0 === index ? element.getPrimaryRepresentation() : element.representations[index], stockData = this.getStockData(representation);
        return stockData && representation.isExternalLink && representation.getCachedExternalLinkError() ? iaw.stockUtil.getStockDataForElement(element, void 0 === index ? 0 : index + 1) : stockData;
    },
    getElementStockId: function(element) {
        var stockData = this.getStockDataForElement(element);
        if (stockData) return Number(stockData.content_id);
    },
    getElementStockLicense: function(element) {
        var stockData = this.getStockDataForElement(element);
        if (stockData && stockData.state === this.STOCK_STATE_PURCHASED) return String(stockData.license);
    },
    licenseTemplate: function(imageId, licenseType) {
        return new Promise(function(resolve, reject) {
            iaw.cepUtil.setEnvironment(iaw.cepUtil.usingStageAuthentication() ? "stage" : "prod"), 
            iaw.cepUtil.getIMSAccessToken(function(token) {
                if (!token) return void reject("Invalid access token.");
                var url = iaw.cepUtil.usingStageAuthentication() ? "https://stock-stage.adobe.io/Rest/Libraries/1/Content/License?" : "https://stock.adobe.ioRest/Libraries/1/Content/License?";
                url += "content_id=" + imageId + "&license=" + licenseType, iaw.util.promise("GET", url, token).then(function(res) {
                    "string" == typeof res && (res = JSON.parse(res)), resolve(res);
                })["catch"](function(err) {
                    reject(err);
                });
            });
        });
    },
    composeStockLink: function(hostID, type, term) {
        var baseURL = iaw.cepUtil.usingStageAuthentication() ? this.STOCK_URL_SEARCH_STAGE : this.STOCK_URL_SEARCH, category = -1, application = 0;
        switch (term = "undefined" == typeof term ? "" : term, type) {
          case "recent":
          case "saved":
            category = 0;
            break;

          case "mobile":
            category = 1;
            break;

          case "web":
            category = 2;
            break;

          case "print":
            category = 3;
            break;

          case "photo":
            category = 4;
            break;

          case "film":
            category = 5;
            break;

          case "art":
            category = 6;
            break;

          default:
            category = -1;
        }
        switch (hostID) {
          case "PHXS":
            application = 1;
            break;

          case "ILST":
            application = 2;
            break;

          case "IDSN":
            application = 3;
            break;

          default:
            application = 0;
        }
        term = term ? "k=" + iaw.util.fixedEncodeURIComponent(term) + "&" : "", term += iaw.analytics.getAnalyticsQueryString() + "&";
        var query = "filters[content_type:template]=1&filters[template_type_id][]=" + application, cat = 0 === category ? "" : "&filters[template_category_id][]=" + category, analyticsQuery = "&as_channel=adobe_apps&as_source=app&as_campclass=brand&as_campaign=templates_" + hostID, featureFlag = "ff_4815162342=true&";
        return baseURL + "?" + featureFlag + term + query + cat + analyticsQuery;
    },
    openStockLink: function(hostID, type, term) {
        var uri = this.composeStockLink(hostID, type, term);
        return window.__adobe_cep__ ? iaw.util.openDefaultBrowserAuthenicated("adobeStock", uri) : window.open(uri), 
        uri;
    }
}, window.iaw = window.iaw || {}, window.iaw.util = {
    currentBreakPoint: 0,
    loadingLibrary: !1,
    libraryCallbacks: [],
    ccxProcessLaunchPending: !1,
    getCurrentTime: function() {
        var currentTime = new Date().getTime();
        return currentTime;
    },
    isWindowsOS: function() {
        return navigator.userAgent.indexOf("Mac OS X") === -1;
    },
    convertQueryString: function(search) {
        var jsObj = {};
        if (search) {
            var idx = search.indexOf("#");
            idx !== -1 && (search = search.slice(0, idx));
            var jsData = '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}';
            jsObj = JSON.parse(jsData, function(key, value) {
                var val = "" === key ? value : decodeURIComponent(value);
                return val = isNaN(val) ? "true" === val || "false" !== val && val : parseFloat(val);
            });
        }
        return jsObj;
    },
    parseQueryString: function(str) {
        var ret = Object.create(null);
        return "string" != typeof str ? ret : (str = str.trim().replace(/^(\?|#|&)/, "")) ? (str.split("&").forEach(function(param) {
            var parts = param.replace(/\+/g, " ").split("="), key = parts.shift(), val = parts.length > 0 ? parts.join("=") : void 0;
            key = decodeURIComponent(key), val = void 0 === val ? null : decodeURIComponent(val), 
            void 0 === ret[key] ? ret[key] = val : Array.isArray(ret[key]) ? ret[key].push(val) : ret[key] = [ ret[key], val ];
        }), ret) : ret;
    },
    downLoadImage: function(url, callback) {
        iaw.log.debug("Downloading image from: " + url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            4 === this.readyState && 200 === this.status && (iaw.log.debug("Image is downloaded."), 
            callback(this.response));
        }, xhr.onerror = function(error) {
            callback(null);
        }, xhr.open("GET", url, !0), xhr.responseType = "blob", xhr.send();
    },
    ajax: function(url, callback, scope) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            4 === this.readyState && 200 === this.status && callback.call(scope || null, this.response);
        }, xhr.onerror = function(error) {
            iaw.log.debug("[util.ajax] Error"), callback.call(scope || null, error);
        }, xhr.open("GET", url, !0), xhr.send();
    },
    normalize: function(v, min, max) {
        return (v - min) / (max - min);
    },
    openDefaultBrowser: function(url, isAuthenticated) {
        isAuthenticated = isAuthenticated || !1, isAuthenticated || iaw.analytics.pip.logInteractionEvent("OpenExtLink:" + url), 
        window.cep.util.openURLInDefaultBrowser ? window.cep.util.openURLInDefaultBrowser(url) : window.open(url, "_blank");
    },
    openDefaultBrowserAuthenicated: function(clientKey, url) {
        if (iaw.cepUtil.imsValid()) {
            var query = url.indexOf("?");
            iaw.analytics.pip.logInteractionEvent("OpenExtLink:" + url.substr(0, query > 0 ? query : url.length));
            var callback = function(authenticatedURL) {
                iaw.log.console("The generated jumpURL is: " + authenticatedURL), iaw.util.openDefaultBrowser(authenticatedURL, !0);
            };
            this.jumpToURL(iaw.cepUtil.authenticationInfo[clientKey].clientID, iaw.cepUtil.authenticationInfo[clientKey].clientScope, url, callback);
        } else this.openDefaultBrowser(url);
    },
    setUIThemeMode: function(mode) {
        switch (mode) {
          case "light":
            document.body.classList.remove("spc--dark");
            break;

          case "dark":
            document.body.classList.add("spc--dark");
            break;

          default:
            var interfaceColor = iaw.cepUtil.csInterface ? iaw.cepUtil.getUIThemeColor() : null;
            this.setUIThemeMode(interfaceColor && interfaceColor.red >= 184 ? "light" : "dark");
        }
    },
    jumpToURL: function(clientID, clientScope, url, callback) {
        url && callback && clientID && clientScope && window.__adobe_cep__ && iaw.cepUtil.getIMSAccessToken(function(token) {
            token ? iaw.cepUtil.createJumpURL(clientID, clientScope, url, callback) : (iaw.log.console("No jump URL since access token is invalid."), 
            callback(url));
        });
    },
    loadExternalScript: function(script) {
        return new Promise(function(resolve, reject) {
            var scriptTag = document.createElement("script");
            scriptTag.type = "text/javascript", scriptTag.charset = "utf-8", scriptTag.async = !0, 
            scriptTag.defer = !1, scriptTag.src = script, scriptTag.onload = function() {
                resolve(scriptTag);
            }, scriptTag.onerror = function(error) {
                reject(error);
            }, document.body.appendChild(scriptTag);
        });
    },
    formatTimeStamp: function(stamp) {
        return window.moment(stamp).format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    },
    getTrialEndDate: function(secondsLeftInTrial) {
        var trialEndDate = new Date(new Date().getTime() + 1e3 * secondsLeftInTrial);
        return secondsLeftInTrial >= 0 ? this.formatTimeStamp(trialEndDate) : null;
    },
    generateGUID: function() {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = 16 * Math.random() | 0, v = "x" === c ? r : 3 & r | 8;
            return v.toString(16);
        });
    },
    showLibraryInPanel: function(libraryId) {
        var csInterface = new CSInterface(), emitEvent = function() {
            var setLibEvent = new CSEvent("dlSetCurrentLibrary", "APPLICATION");
            setLibEvent.data = {
                libraryId: libraryId
            }, csInterface.dispatchEvent(setLibEvent);
        }, handlePanelInitialized = function() {
            csInterface.removeEventListener("dlPanelInitialized", handlePanelInitialized), setTimeout(emitEvent, 200);
        };
        emitEvent(), csInterface.addEventListener("dlPanelInitialized", handlePanelInitialized), 
        csInterface.requestOpenExtension("com.adobe.DesignLibraries.angular", "");
    },
    promise: function(method, url, token, headers, ignoredStatus) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url, !0), request.onload = function() {
                200 === request.status || 202 === request.status ? resolve(request.response) : ignoredStatus && ignoredStatus.indexOf(request.status) > -1 ? resolve(request.status) : reject(request.statusText);
            }, request.onerror = function() {
                reject(request.statusText || "Network Error");
            }, token && (request.setRequestHeader("x-api-key", "CCXInAppWelcome"), request.setRequestHeader("Content-Type", "application/json"), 
            request.setRequestHeader("Authorization", "Bearer " + token), headers && Object.keys(headers).forEach(function(key) {
                "undefined" != typeof headers[key] && request.setRequestHeader(key, headers[key]);
            })), request.send();
        });
    },
    closeExtOnStatus: function(status) {
        "true" === status.toLowerCase() && window.__adobe_cep__ && (iaw.analytics.ingest.logScreenStateEvent("close-auto"), 
        iaw.cepUtil.sendEvent(iaw.cepUtil.events.REQUESTHOSTCLOSE, null));
    },
    fixedEncodeURIComponent: function(str) {
        var encoded = str && str.length ? encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return "%" + c.charCodeAt(0).toString(16);
        }) : str;
        return encoded;
    },
    roundDecimal: function(num, decimal) {
        return Number(Math.round(Number(num).toFixed(20) + ("e" + decimal)) + ("e-" + decimal));
    },
    ceilDecimal: function(num, decimal) {
        return Number(Math.ceil(Number(num).toFixed(20) + ("e" + decimal)) + ("e-" + decimal));
    },
    floorDecimal: function(num, decimal) {
        return Number(Math.floor(Number(num).toFixed(20) + ("e" + decimal)) + ("e-" + decimal));
    },
    mountTag: function(target, tagName, data, animClassIn, animClassOut) {
        function onEnd(evt) {
            parent.removeEventListener("webkitTransitionEnd", onEnd), parent.removeEventListener("webkitAnimationEnd", onEnd), 
            parent.removeEventListener("animationend", onEnd), parent.classList.remove(animClassOut), 
            parent.classList.add(animClassIn), riot.mount(parent, tagName, data);
        }
        data = data || null, animClassOut = animClassOut || "anim--fade-out", animClassIn = animClassIn || "anim--fade-in";
        var parent = target;
        return "string" != typeof parent || (parent = document.querySelector(target)) ? (parent.classList.remove("hidden"), 
        parent.classList.remove(animClassOut), parent.classList.remove(animClassIn), void (parent.children.length > 0 || parent.attributes["data-is"] ? (parent.addEventListener("webkitTransitionEnd", onEnd, !1), 
        parent.addEventListener("webkitAnimationEnd", onEnd, !1), parent.addEventListener("animationend", onEnd, !1), 
        parent.classList.add(animClassOut)) : (parent.classList.add(animClassIn), riot.mount(parent, tagName, data)))) : void console.warn("[iaw.util.mountTag] No element found with selector " + target);
    },
    unmountTag: function(tagInstance, animClassIn, animClassOut) {
        function onEnd(evt) {
            parent.removeEventListener("webkitTransitionEnd", onEnd), parent.removeEventListener("webkitAnimationEnd", onEnd), 
            parent.removeEventListener("animationend", onEnd), tagInstance.unmount(!0), parent.removeAttribute("data-is"), 
            parent.classList.remove(animClassOut), parent.classList.add("hidden");
        }
        animClassOut = animClassOut || "anim--fade-out", animClassIn = animClassIn || "anim--fade-in";
        var parent = tagInstance.root;
        parent.classList.contains(animClassOut) || (parent.classList.remove(animClassIn), 
        parent.addEventListener("webkitTransitionEnd", onEnd, !1), parent.addEventListener("webkitAnimationEnd", onEnd, !1), 
        parent.addEventListener("animationend", onEnd, !1), parent.classList.add(animClassOut));
    },
    showElement: function(element, animClassIn, animClassOut) {
        animClassOut = animClassOut || "anim--fade-out", animClassIn = animClassIn || "anim--fade-in", 
        element.classList.remove("hidden"), element.classList.remove(animClassOut), element.classList.remove(animClassIn), 
        element.classList.add(animClassIn);
    },
    hideElement: function(element, animClassIn, animClassOut) {
        function onEnd(evt) {
            element.removeEventListener("webkitTransitionEnd", onEnd), element.removeEventListener("webkitAnimationEnd", onEnd), 
            element.removeEventListener("animationend", onEnd), element.classList.add("hidden");
        }
        animClassOut = animClassOut || "anim--fade-out", animClassIn = animClassIn || "anim--fade-in", 
        element.classList.remove(animClassOut), element.classList.remove(animClassIn), element.addEventListener("webkitTransitionEnd", onEnd, !1), 
        element.addEventListener("webkitAnimationEnd", onEnd, !1), element.addEventListener("animationend", onEnd, !1), 
        element.classList.add(animClassOut);
    },
    getRegionFromCountryCode: function(countryCode) {
        return iaw.util.countryCodeMap[countryCode];
    },
    countryCodeMap: {
        US: "us",
        CA: "us",
        AI: "us",
        AG: "us",
        AR: "us",
        AW: "us",
        BS: "us",
        BB: "us",
        BZ: "us",
        BM: "us",
        BO: "us",
        BR: "us",
        KY: "us",
        CL: "us",
        CO: "us",
        CR: "us",
        DM: "us",
        DO: "us",
        EC: "us",
        SV: "us",
        FK: "us",
        GF: "us",
        GD: "us",
        GP: "us",
        GT: "us",
        GY: "us",
        HT: "us",
        HN: "us",
        JM: "us",
        MQ: "us",
        MX: "us",
        MS: "us",
        AN: "us",
        NI: "us",
        PA: "us",
        PY: "us",
        PE: "us",
        KN: "us",
        LC: "us",
        PM: "us",
        VC: "us",
        GS: "us",
        SR: "us",
        TT: "us",
        TC: "us",
        UM: "us",
        UY: "us",
        VE: "us",
        VG: "us",
        AS: "us",
        PR: "us",
        GB: "eu",
        AL: "eu",
        DZ: "eu",
        AD: "eu",
        AO: "eu",
        AM: "eu",
        AT: "eu",
        AZ: "eu",
        BY: "eu",
        BE: "eu",
        BJ: "eu",
        BA: "eu",
        BW: "eu",
        IO: "eu",
        BG: "eu",
        BF: "eu",
        BI: "eu",
        CM: "eu",
        CV: "eu",
        CF: "eu",
        TD: "eu",
        KM: "eu",
        CD: "eu",
        CG: "eu",
        HR: "eu",
        CY: "eu",
        CZ: "eu",
        DK: "eu",
        DJ: "eu",
        EG: "eu",
        GQ: "eu",
        ER: "eu",
        EE: "eu",
        ET: "eu",
        FO: "eu",
        FI: "eu",
        FR: "eu",
        GA: "eu",
        GM: "eu",
        GE: "eu",
        DE: "eu",
        GH: "eu",
        GI: "eu",
        GR: "eu",
        GL: "eu",
        GN: "eu",
        GW: "eu",
        HU: "eu",
        IS: "eu",
        IE: "eu",
        IT: "eu",
        CI: "eu",
        KE: "eu",
        LV: "eu",
        LS: "eu",
        LR: "eu",
        LY: "eu",
        LI: "eu",
        LT: "eu",
        LU: "eu",
        MK: "eu",
        MG: "eu",
        MW: "eu",
        ML: "eu",
        MT: "eu",
        MR: "eu",
        MU: "eu",
        YT: "eu",
        MD: "eu",
        MC: "eu",
        ME: "eu",
        MA: "eu",
        MZ: "eu",
        NA: "eu",
        NL: "eu",
        NE: "eu",
        NG: "eu",
        NO: "eu",
        PS: "eu",
        PL: "eu",
        PT: "eu",
        RE: "eu",
        RO: "eu",
        RW: "eu",
        SH: "eu",
        SM: "eu",
        ST: "eu",
        SN: "eu",
        CS: "eu",
        RS: "eu",
        SC: "eu",
        SL: "eu",
        SK: "eu",
        SI: "eu",
        SO: "eu",
        ZA: "eu",
        ES: "eu",
        SJ: "eu",
        SZ: "eu",
        SE: "eu",
        CH: "eu",
        TZ: "eu",
        TG: "eu",
        TN: "eu",
        UG: "eu",
        UA: "eu",
        VA: "eu",
        EH: "eu",
        ZM: "eu",
        ZW: "eu",
        AF: "ap",
        AQ: "ap",
        AU: "ap",
        BH: "ap",
        BD: "ap",
        BT: "ap",
        BN: "ap",
        MM: "ap",
        KH: "ap",
        CN: "ap",
        CX: "ap",
        CC: "ap",
        CK: "ap",
        TL: "ap",
        FJ: "ap",
        PF: "ap",
        HK: "ap",
        IN: "ap",
        ID: "ap",
        IQ: "ap",
        IL: "ap",
        JP: "ap",
        JO: "ap",
        KZ: "ap",
        KI: "ap",
        KR: "ap",
        KW: "ap",
        KG: "ap",
        LA: "ap",
        LB: "ap",
        MO: "ap",
        MY: "ap",
        MV: "ap",
        MH: "ap",
        FM: "ap",
        MN: "ap",
        NR: "ap",
        NP: "ap",
        NC: "ap",
        NZ: "ap",
        NU: "ap",
        NF: "ap",
        OM: "ap",
        PK: "ap",
        PG: "ap",
        PH: "ap",
        PN: "ap",
        QA: "ap",
        RU: "ap",
        WS: "ap",
        SA: "ap",
        SG: "ap",
        SB: "ap",
        LK: "ap",
        TW: "ap",
        TJ: "ap",
        TH: "ap",
        TK: "ap",
        TO: "ap",
        TR: "ap",
        TM: "ap",
        TV: "ap",
        AE: "ap",
        UZ: "ap",
        VU: "ap",
        VN: "ap",
        WF: "ap",
        YE: "ap"
    },
    hashStr: function(str) {
        var i, chr, len, hash = 0;
        if (0 === str.length) return hash;
        for (i = 0, len = str.length; i < len; i++) chr = str.charCodeAt(i), hash = (hash << 5) - hash + chr, 
        hash |= 0;
        return hash;
    },
    createFileSizeString: function(isize) {
        var val = "";
        return val = isize >= 1099511627776 ? (isize / 1099511627776).toFixed(1).toString() + iaw.i18n.getLocalizedString("filesize_key_TB") : isize >= 1073741824 ? (isize / 1073741824).toFixed(1).toString() + iaw.i18n.getLocalizedString("filesize_key_GB") : isize >= 1048576 ? (isize / 1048576).toFixed(1).toString() + iaw.i18n.getLocalizedString("filesize_key_MB") : isize >= 1024 ? (isize / 1024).toFixed(1).toString() + iaw.i18n.getLocalizedString("filesize_key_KB") : isize > 0 ? isize.toString() + iaw.i18n.getLocalizedString("filesize_key_B") : "--", 
        val.replace(".", iaw.i18n.getLocalizedString("filesize_key_decimal"));
    },
    showLicenseDialog: function(element, contentId, skipQuotaCheck, libraryId, renditionDetails, licenseType) {
        var PURCHASE_DIALOG_INIT_EVENT_NAME = "com.adobe.inapp.purchase.init", PURCHASE_DIALOG_PERFORM_EVENT_NAME = "com.adobe.inapp.purchase.perform", PURCHASE_DIALOG_CLOSED_EVENT_NAME = "com.adobe.inapp.purchase.closed", PURCHASE_DIALOG_EXTENSION_ID = "com.adobe.inapp.purchase";
        return new Promise(function(resolve, reject) {
            function onPurchaseDialogInit(event) {
                csInterface.removeEventListener(PURCHASE_DIALOG_INIT_EVENT_NAME, onPurchaseDialogInit);
                var csEvent = new CSEvent(PURCHASE_DIALOG_PERFORM_EVENT_NAME, "APPLICATION", "CCInAppCmdN", csInterface.getExtensionID());
                csEvent.data = {
                    elementType: element.type,
                    contentId: String(contentId),
                    skipQuotaCheck: skipQuotaCheck,
                    licenseType: licenseType,
                    addToLibraryID: libraryId,
                    renditionDetails: renditionDetails
                }, csInterface.dispatchEvent(csEvent), iaw.log.logJSON("Dispatch CEP event to start purchase dialog: ", csEvent);
            }
            function onPurchaseDialogClosed(event) {
                if (iaw.log.logJSON("Data from purchase dialog: ", event), csInterface.removeEventListener(PURCHASE_DIALOG_CLOSED_EVENT_NAME, onPurchaseDialogClosed), 
                csInterface.removeEventListener("com.adobe.csxs.events.ExtensionUnloaded", onPurchaseDialogClosed), 
                "com.adobe.csxs.events.ExtensionUnloaded" === event.type) {
                    var xmlParser = new DOMParser(), xmlDoc = xmlParser.parseFromString(event.data, "text/xml");
                    if (xmlDoc.getElementsByTagName("Id")[0].childNodes[0].nodeValue !== PURCHASE_DIALOG_EXTENSION_ID || "1" !== xmlDoc.getElementsByTagName("ClosingType")[0].childNodes[0].nodeValue) return;
                }
                var eventData = event.data;
                eventData && eventData.didFinish ? resolve(eventData.data) : reject(eventData && eventData.data);
            }
            var csInterface = iaw.cepUtil.csInterface;
            return csInterface ? (csInterface.addEventListener(PURCHASE_DIALOG_INIT_EVENT_NAME, onPurchaseDialogInit), 
            csInterface.addEventListener(PURCHASE_DIALOG_CLOSED_EVENT_NAME, onPurchaseDialogClosed), 
            csInterface.addEventListener("com.adobe.csxs.events.ExtensionUnloaded", onPurchaseDialogClosed), 
            void csInterface.requestOpenExtension(PURCHASE_DIALOG_EXTENSION_ID)) : void reject();
        });
    },
    getPipMethodString: function(context, viewMode) {
        var method = iaw.cepUtil.csInterface.getExtensionID().replace("com.adobe.", "") + " " + context;
        return viewMode && (method += " " + viewMode), method;
    },
    assign: function(target) {
        "use strict";
        if (void 0 === target || null === target) throw new TypeError("Cannot convert undefined or null to object");
        for (var output = Object(target), index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (void 0 !== source && null !== source) for (var nextKey in source) source.hasOwnProperty(nextKey) && void 0 !== source[nextKey] && (output[nextKey] = source[nextKey]);
        }
        return output;
    },
    merge: function(target, source) {
        "object" != typeof target && (target = {});
        var sourceProperty;
        for (var property in source) source.hasOwnProperty(property) && (sourceProperty = source[property], 
        "object" == typeof sourceProperty && (target[property] = iaw.util.merge(target[property], sourceProperty)), 
        target[property] = sourceProperty);
        for (var a = 2, l = arguments.length; a < l; a++) iaw.util.merge(target, arguments[a]);
        return target;
    },
    getTemplateData: function(templateId) {
        var templateData, templates = iaw.store.get("templates");
        return templates && templates.length > 0 && templates.forEach(function(template) {
            template.id === templateId && (templateData = template);
        }), templateData;
    },
    setTemplateData: function(uuid, templateData) {
        var templateIndex = iaw.store.get([ "templateLUT", uuid ]);
        iaw.store.set([ "templates", templateIndex ], templateData);
    },
    smoothScroll: function(element, offset, duration, callback) {
        function easeInOutQuad(t, b, c, d) {
            return t /= d / 2, t < 1 ? c / 2 * t * t + b : (t--, -c / 2 * (t * (t - 2) - 1) + b);
        }
        function animateScroll() {
            currentTime += increment, val = easeInOutQuad(currentTime, start, offset, duration), 
            element.scrollTop = val, currentTime < duration ? requestAnimationFrame(animateScroll) : "function" == typeof callback && callback();
        }
        var val, start = element.scrollTop, currentTime = 0, increment = 20;
        duration = "undefined" == typeof duration ? 500 : duration, animateScroll();
    },
    launchCCXProcess: function(callback) {
        function onFinished(status) {
            callback(status), iaw.util.ccxProcessLaunchPending = !1;
        }
        function started() {
            clearTimeout(initializedTimeout), iaw.util.ccxProcessLaunchPending = !1, VulcanInterface.removeMessageListener(initializedMessage, started), 
            onFinished(1);
        }
        function startLaunchCCXProcess() {
            VulcanInterface.addMessageListener(initializedMessage, started), initializedTimeout = setTimeout(function() {
                VulcanInterface.removeMessageListener(initializedMessage, started), onFinished(2);
            }, 1e3), VulcanInterface.launchApp("ccxprocess", !1);
        }
        if (!iaw.util.ccxProcessLaunchPending && window.__adobe_cep__) {
            var initializedTimeout, initializedMessage = "vulcan.SuiteMessage.ccxprocess.Initialized";
            callback = callback || function() {}, iaw.util.ccxProcessLaunchPending = !0, VulcanInterface.isAppInstalled("ccxprocess") ? iaw.util.isCCXProcessRunning(function(isRunning) {
                isRunning ? onFinished(0) : (iaw.log.console("Start to launch CCX Process"), startLaunchCCXProcess());
            }) : onFinished(3);
        }
    },
    isCCXProcessInstalled: function(callback) {
        return VulcanInterface.isAppInstalled("ccxprocess");
    },
    isCCXProcessRunning: function(callback) {
        function pongHanlder() {
            clearTimeout(pingMessageTimeout), VulcanInterface.removeMessageListener(pongMessage, pongHanlder), 
            callback(!0);
        }
        if (!iaw.util.isWindowsOS() && VulcanInterface.isAppRunning("ccxprocess")) return callback(!0);
        var pingMessageTimeout, pingMessage = "vulcan.SuiteMessage.ccxprocess.in.request.app.ping", pongMessage = "vulcan.SuiteMessage.ccxprocess.out.response.app.ping";
        VulcanInterface.addMessageListener(pongMessage, pongHanlder), pingMessageTimeout = setTimeout(function() {
            VulcanInterface.removeMessageListener(pongMessage, pongHanlder), callback(!1);
        }, 200);
        var message = new VulcanMessage(pingMessage);
        message.setPayload(""), VulcanInterface.dispatchMessage(message);
    }
}, function() {
    var start = {
        query: null,
        mruCallbackPending: !1,
        handleStatusChange: function(evt) {
            var evtData = null;
            if ("PHXS" === evt.appId) {
                evt.data = evt.data.replace(/'/g, '"');
                var evData = evt.data.match(/^ver1,/) ? JSON.parse(evt.data.replace(/^ver1,/, "")) : null;
                if (evData && evData.eventID && evData.eventData) return void (1936028772 === evData.eventID && evData.eventData.to && evData.eventData.to._obj && "generalPreferences" === evData.eventData.to._obj && "undefined" != typeof evData.eventData.to.useClassicFileNewDialog && iaw.store.set([ "host", "fnftEnabled" ], !evData.eventData.to.useClassicFileNewDialog));
            }
            try {
                evtData = "string" == typeof evt.data ? JSON.parse(evt.data) : evt.data;
            } catch (err) {
                iaw.log.exception("Status Change Exception: " + err.message);
            }
            switch (evtData.statusEvent) {
              case "updateShortcutKey":
                var buttonInfo = iaw.store.get([ "host", "buttonInfo", evtData.statusData.buttonID ]) || null;
                buttonInfo && (buttonInfo.shortcut = evtData.statusData.shortcut.replace(/Cmd\+/, "⌘"), 
                riotctrl.trigger("update-shortcut-key"));
                break;

              case "updateMRUList":
                var recentTab = iaw.store.get([ "host", "tabs", "recentfile" ]);
                if ("PHXS" !== evt.appId) {
                    if (recentTab && evtData.statusData) {
                        var mruUpdate = [];
                        try {
                            mruUpdate = JSON.parse(JSON.stringify(evtData.statusData), iaw.json.startDataReceiver);
                        } catch (err) {
                            iaw.log.exception("MRU JSON exception: " + err.message);
                        }
                        recentTab.list = '[""]' !== JSON.stringify(mruUpdate) ? mruUpdate : [], iaw.start.updateMRUFileSize(recentTab.list), 
                        riotctrl.trigger("update-mru-list");
                    }
                } else iaw.start.mruCallbackPending || (iaw.start.mruCallbackPending = !0, iaw.cepUtil.evalExtendScript("CCXWelcomeXSHost_PHXS.getRecentFilesJSON()", function(mruListStr) {
                    try {
                        var updatedMRUs = JSON.parse(mruListStr, iaw.json.startDataReceiver);
                        iaw.start.updateMRUFileSize(updatedMRUs.list), recentTab.list = updatedMRUs.list;
                    } catch (err) {
                        iaw.log.exception("Status Change Exception: " + err.message);
                    }
                    riotctrl.trigger("update-mru-list"), iaw.start.mruCallbackPending = !1;
                }));
                break;

              case "updateFNFTPref":
                var fnftEnabled = evtData.statusData || !1;
                "string" == typeof fnftEnabled && (fnftEnabled = "true" === fnftEnabled || "1" === fnftEnabled), 
                iaw.store.set([ "host", "fnftEnabled" ], fnftEnabled);
                break;

              case "toggleMediaPlay":
                riotctrl.trigger(evtData.statusData ? "play-all-media" : "pause-all-media");
            }
        },
        updateMRUFileSize: function(mruList) {
            mruList && mruList.forEach(function(entry) {
                entry.size = iaw.util.createFileSizeString(entry.size);
            });
        },
        getData: function(cb) {
            iaw.cepUtil.evalExtendScript("CCXWelcomeXSHost_" + iaw.cepUtil.applicationID + ".getUserJSONData()", function(jsData) {
                cb(jsData);
            });
        },
        getTabData: function(tabType) {
            return window.alert("DEPRECATED -- REPLACE CALL"), iaw.store.get([ "host", "tabs", tabType ]) || null;
        },
        updateTabDataOnInit: function(hostData) {
            if (hostData.tabs) {
                var index, tabCount = hostData.tabs.length, cutTabs = [];
                for (index = 0; index < tabCount; ++index) "presetfile" !== hostData.tabs[index].type && "templatefile" !== hostData.tabs[index].type && "samplefile" !== hostData.tabs[index].type && "recentlib" !== hostData.tabs[index].type || cutTabs.push(index);
                for (tabCount = cutTabs.length, index = 0; index < tabCount; ++index) hostData.tabs.splice(cutTabs[index], 1);
                for (hostData.tabs.splice(1, 0, {
                    type: "ccfiles",
                    label: "listview_ccfiles_tab_label",
                    listViewEnabled: !0,
                    thumbnailViewEnabled: "AEFT" !== hostData.hostID && "PPRO" !== hostData.hostID && "MUSE" !== hostData.hostID && "DRWV" !== hostData.hostID,
                    list: []
                }), tabCount = hostData.tabs.length, index = 0; index < tabCount; ++index) {
                    var tab = hostData.tabs[index], itemCount = tab.list.length;
                    ("recentfile" === tab.type && itemCount && itemCount > 0 || !hostData.defaultTab && ("presetfile" === tab.type || "templatefile" === tab.type || "samplefile" === tab.type)) && (hostData.defaultTab = tab.type);
                    for (var listIndex = 0; listIndex < itemCount; listIndex++) {
                        var item = tab.list[listIndex];
                        item.action || (item.action = tab.type);
                    }
                }
            }
        }
    };
    window.iaw = window.iaw || {}, window.iaw.start = start, window.iaw.data = window.iaw.data || {}, 
    window.iaw.data.start = start;
}(), iaw.mobileAssetEvents = {
    UNKNOWN_ERROR: "mobileAssetsUnknownError",
    MOBILE_ASSET_CLEAR_STATES: "mobileAssetsClearStates",
    MOBILE_ASSET_ERROR_STATES: "mobileAssetsErrorStates",
    MOBILE_ASSET_PAGE_FAILURE: "mobileAssetsPageFailure",
    MOBILE_ASSET_SYNC_REQUEST: "mobileAssetsSyncRequest",
    MOBILE_ASSET_SYNC_RESPONSE: "mobileAssetsSyncResponse",
    MOBILE_ASSET_PROJECTS_REQUEST: "mobileAssetsloadProjects",
    MOBILE_ASSET_PROJECTS_RESPONSE: "mobileAssetsProjectsLoaded",
    MOBILE_ASSET_PAGES_REQUEST: "mobileAssetsLoadPages",
    MOBILE_ASSET_PAGES_RESPONSE: "mobileAssetsPagesLoaded",
    MOBILE_ASSET_PAGE_REQUEST: "mobileAssetsLoadPage",
    MOBILE_ASSET_PROJECTS_LOADMORE_REQUEST: "mobileAssetsloadMoreProjects",
    MOBILE_ASSET_PROJECTS_LOADMORE_RESPONSE: "mobileAssetsMoreProjectsLoaded",
    MOBILE_ASSET_LOADMORE_PROJECTS_FAILURE: "mobileAssetsLoadMoreFailure"
}, riotctrl.on("update-mru-list", function() {
    iaw.store.get([ "host", "mobileCreationsEnabled" ]) && (riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES), 
    iaw.mobileAssetMgr.initiateSync(), iaw.data.mobileAssets.pageView || (iaw.data.mobileAssets.projectList.isDirty = !0, 
    iaw.mobileAssetMgr.statesInSyncing()));
}), riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST, function() {
    iaw.mobileAssetMgr.getProjects();
}, this), riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, function(projectID) {
    iaw.mobileAssetMgr.getPages(projectID), iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipSucceedProject.subCategory, iaw.analytics.pipQuery.pipSucceedProject.eventName);
}, this), riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PAGE_REQUEST, function(pageId) {
    iaw.mobileAssetMgr.getPage(pageId), iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipSucceedProjectFile.subCategory, iaw.analytics.pipQuery.pipSucceedProjectFile.eventName);
}, this), riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_REQUEST, function() {
    iaw.mobileAssetMgr.getProjectsByIndex();
}, this), riotctrl.on(iaw.mobileAssetEvents.MOBILE_ASSET_CLEAR_STATES, function() {
    iaw.mobileAssetMgr.clearAllStates();
}, this), function() {
    if (window.__adobe_cep__) {
        var startupObj = {
            whenHostReady: function() {
                if (iaw.store.get([ "host", "mobileCreationsEnabled" ])) {
                    var accountType = iaw.store.get([ "host", "accountType" ]);
                    "" === accountType && (accountType = iaw.cepUtil.getPrimaryAccountType(), iaw.store.set([ "host", "accountType" ], accountType), 
                    iaw.log.console("[mobile-assets] Account type from ccx-start: " + accountType)), 
                    "type1" === accountType ? (iaw.store.set([ "host", "tabs", "mobilecreations" ], {
                        label: "listview_mobile_tab_label",
                        list: [],
                        listViewEnabled: !1,
                        thumbnailViewEnabled: !0,
                        type: "mobilecreations"
                    }), iaw.analytics.pip.logEvent(iaw.analytics.pipQuery.category, iaw.analytics.pipQuery.pipAware.subCategory, iaw.analytics.pipQuery.pipAware.eventName), 
                    iaw.mobileAssetMgr.initiateSync()) : iaw.log.console("[mobile-assets] Tab not added. AccountType: " + accountType);
                }
            }
        };
        iaw.startup.add(startupObj);
    }
    var mobileAssetData = {
        MOBILE_CREATION_TABOPTION: "mobilecreations",
        assetProductTag: {
            draw: "Adobe Illustrator Draw",
            sketch: "Adobe Photoshop Sketch",
            proteus: "Adobe Illustrator Proteus",
            comp: "Adobe Comp CC",
            cls: "Adobe Mobile App"
        },
        syncGroupMap: {
            adobedraw: "Adobe Illustrator Draw",
            adobesketch: "Adobe Photoshop Sketch",
            "adobe-layup": "Adobe Comp CC",
            adobeclsprojects: "Adobe Mobile App"
        },
        errorStates: {
            pageFailure: void 0,
            projDeleted: void 0,
            syncError: void 0
        },
        tryAgainData: {
            state: void 0,
            id: void 0
        },
        LOAD_MORE_COUNT: 10,
        INITIAL_PROJECT_COUNT: 10,
        hasMoreProjects: !1,
        projectsData: [],
        pagesData: [],
        pageView: !1,
        projectList: {
            isDirty: !1
        },
        addHandlers: {
            sync: !1,
            getPage: !1,
            getProjects: !1,
            getPages: !1
        },
        projectResponseReceived: !1,
        getProjectDataByID: function(projId) {
            var returnVal;
            return this.projectsData.forEach(function(item) {
                JSON.stringify(item.identifierData) === JSON.stringify(projId) && (returnVal = item);
            }), returnVal;
        },
        getPageDataByID: function(pageId) {
            var returnVal;
            return this.pagesData.forEach(function(item) {
                JSON.stringify(item.identifierData) === JSON.stringify(pageId) && (returnVal = item);
            }), returnVal;
        }
    }, mobileAssetDataMgr = {
        requestMgr: {
            statesData: {
                guid: void 0,
                start: !1,
                complete: !1
            },
            states: {
                sync: {
                    guid: void 0,
                    start: !1,
                    complete: !1,
                    timeOut: !1
                },
                getProjects: {
                    guid: void 0,
                    start: !1,
                    complete: !1,
                    timeOut: !1
                },
                getProjectsByIndex: {
                    guid: void 0,
                    start: !1,
                    complete: !1,
                    timeOut: !1
                },
                getPages: {
                    guid: void 0,
                    start: !1,
                    complete: !1,
                    timeOut: !1
                },
                getPage: {
                    guid: void 0,
                    start: !1,
                    complete: !1,
                    timeOut: !1
                }
            },
            timeout: 18e4,
            processTimeout: !1,
            newGuid: function(_state) {
                return _state.guid = iaw.util.generateGUID(), _state.guid;
            },
            getGuid: function(_state) {
                return _state.guid;
            },
            invalidateGuid: function(_state) {
                _state.guid = void 0;
            },
            invalidateState: function(_state) {
                _state.guid = void 0, _state.start = !1, _state.complete = !1, _state.timeOut = !1;
            },
            initTimeout: function(_state, guid) {
                _state.timeOut = !0, _state.start = !0, this.resetErrorStates(_state, guid);
                var self = this;
                setTimeout(function() {
                    guid === self.getGuid(_state) && _state.timeOut && _state === iaw.data.mobileAssets.tryAgainData.state && (self.invalidateState(_state), 
                    iaw.log.console("[mobile-assets] MobileCreations Timeout"), _state === self.states.getProjectsByIndex ? riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_LOADMORE_PROJECTS_FAILURE) : riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES));
                }, this.timeout);
            },
            invalidateTimeout: function(_state, guid) {
                guid === this.getGuid(_state) && (_state.timeOut = !1);
            },
            setTryAgain: function(_state, id) {
                this.states.getProjectsByIndex.start = !1, iaw.data.mobileAssets.tryAgainData.state = _state, 
                iaw.data.mobileAssets.tryAgainData.id = id;
            },
            resetErrorStates: function(_state, guid) {
                this.states.sync === _state && guid === this.getGuid(_state) ? (iaw.data.mobileAssets.errorStates.syncError = !1, 
                iaw.data.mobileAssets.projectList.isDirty = !0, iaw.data.mobileAssets.projectResponseReceived = !1) : this.states.getProjects === _state && guid === this.getGuid(_state) ? iaw.data.mobileAssets.projectResponseReceived = !1 : this.states.getPage === _state && guid === this.getGuid(_state) ? (iaw.data.mobileAssets.errorStates.pageFailure = !1, 
                iaw.data.mobileAssets.errorStates.projDeleted = !1) : this.states.getPages === _state && guid === this.getGuid(_state) && (iaw.log.console("[mobile-assets] Resetting getPages"), 
                iaw.data.mobileAssets.errorStates.projDeleted = !1);
            }
        },
        VULCAN_MOBILE_FEED_REQUEST: "ccxprocess.mobiledataRequest",
        VULCAN_MOBILE_FEED_RESPONSE: "ccxprocess.mobiledataResponse",
        VULCAN_MOBILE_PROJECT_REQUEST: "ccxprocess.mobileprojectRequest",
        VULCAN_MOBILE_PROJECT_RESPONSE: "ccxprocess.mobileprojectResponse",
        VULCAN_MOBILE_PAGE_REQUEST: "ccxprocess.mobilepageRequest",
        VULCAN_MOBILE_PAGE_RESPONSE: "ccxprocess.mobilepageResponse",
        VULCAN_SYNC_REQUEST: "ccxprocess.syncrequest",
        VULCAN_SYNC_RESPONSE: "ccxprocess.syncresponse",
        clearAllStates: function() {
            iaw.log.console("[mobile-assets] clearAllStates() called......"), this.requestMgr.invalidateState(this.requestMgr.states.sync), 
            this.requestMgr.invalidateState(this.requestMgr.states.getProjects), this.requestMgr.invalidateState(this.requestMgr.states.getProjectsByIndex), 
            this.requestMgr.invalidateState(this.requestMgr.states.getPages), this.requestMgr.invalidateState(this.requestMgr.states.getPage);
        },
        clearPagesAndPageStates: function() {
            iaw.log.console("[mobile-assets] clearPagesAndPageStates called......"), this.requestMgr.invalidateState(this.requestMgr.states.getPages), 
            this.requestMgr.invalidateState(this.requestMgr.states.getPage);
        },
        statesInSyncing: function() {
            iaw.data.mobileAssets.projectList.isDirty ? (iaw.data.mobileAssets.projectsData = [], 
            riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST)) : (this.clearPagesAndPageStates(), 
            riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE));
        },
        initiateSync: function() {
            if (iaw.data.mobileAssets.addHandlers.sync || (iaw.data.mobileAssets.addHandlers.sync = !0, 
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + this.VULCAN_SYNC_RESPONSE, function(msg) {
                var parsedData, responseData = VulcanInterface.getPayload(msg);
                try {
                    parsedData = JSON.parse(responseData);
                } catch (error) {
                    return void iaw.log.exception("MobileCreations data parse: " + error.message);
                }
                if (parsedData.error && "SERVICE_UNAVAILABLE_ERROR" === parsedData.error.code) return void iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code);
                if (this.requestMgr.invalidateTimeout(this.requestMgr.states.sync, parsedData.guid), 
                parsedData.guid && parsedData.guid === this.requestMgr.getGuid(this.requestMgr.states.sync) && iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.sync) {
                    if (this.requestMgr.invalidateGuid(this.requestMgr.states.sync), iaw.log.console("[mobile-assets] initiateSync response received for guid: " + parsedData.guid), 
                    this.requestMgr.states.sync.complete = !0, this.requestMgr.states.sync.start = !1, 
                    parsedData.error) {
                        if (iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code), "NOT_LOGGED_IN" === parsedData.error.code) return iaw.data.mobileAssets.projectsData = [], 
                        void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE);
                        iaw.data.mobileAssets.errorStates.syncError = !0;
                    }
                    this.requestMgr.states.getProjects.start && !iaw.data.mobileAssets.pageView && riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_REQUEST);
                }
            }, this)), !this.requestMgr.states.sync.start || this.requestMgr.states.sync.complete) {
                this.requestMgr.setTryAgain(this.requestMgr.states.sync, void 0);
                var guid = this.requestMgr.newGuid(this.requestMgr.states.sync), mobileDataRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + this.VULCAN_SYNC_REQUEST);
                mobileDataRequestMsg.setPayload(JSON.stringify({
                    guid: guid,
                    count: iaw.data.mobileAssets.INITIAL_PROJECT_COUNT
                })), iaw.log.console("[mobile-assets] Sending initiateSync request with guid: " + guid), 
                VulcanInterface.dispatchMessage(mobileDataRequestMsg), this.requestMgr.initTimeout(this.requestMgr.states.sync, guid);
            }
        },
        getProjects: function() {
            if (iaw.data.mobileAssets.addHandlers.getProjects || (iaw.data.mobileAssets.addHandlers.getProjects = !0, 
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_FEED_RESPONSE, function(msg) {
                var parsedData, responseData = VulcanInterface.getPayload(msg);
                try {
                    parsedData = JSON.parse(responseData);
                } catch (error) {
                    return void iaw.log.exception("MobileCreations projects data parse: " + error.message);
                }
                if (parsedData.error && "SERVICE_UNAVAILABLE_ERROR" === parsedData.error.code) return void iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code);
                iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getProjects ? this.requestMgr.invalidateTimeout(this.requestMgr.states.getProjects, parsedData.guid) : iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getProjectsByIndex && this.requestMgr.invalidateTimeout(this.requestMgr.states.getProjectsByIndex, parsedData.guid);
                var numOfValidProjects, projectData, mobileDataJSON = [];
                if (parsedData.guid && parsedData.guid === this.requestMgr.getGuid(this.requestMgr.states.getProjects) && iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getProjects) {
                    if (this.requestMgr.invalidateGuid(this.requestMgr.states.getProjects), this.requestMgr.states.getProjects.start = !1, 
                    this.requestMgr.states.getProjects.complete = !0, iaw.log.console("[mobile-assets] getProjects response received for guid: " + parsedData.guid), 
                    window.__adobe_cep__) {
                        if (parsedData.error) return iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code), 
                        "NOT_LOGGED_IN" === parsedData.error.code ? (iaw.data.mobileAssets.projectsData = [], 
                        void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE)) : (mobileDataJSON = [], 
                        iaw.data.mobileAssets.projectResponseReceived = !1, "NETWORK_ERROR" === parsedData.error.code && iaw.log.console("[mobile-assets] Network Error"), 
                        void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES));
                        if (mobileDataJSON = parsedData.list || []) {
                            var idx = 0;
                            mobileDataJSON.forEach(function(item) {
                                item.action = iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, item.index = idx++;
                            }), iaw.data.mobileAssets.projectsData = mobileDataJSON, iaw.data.mobileAssets.projectResponseReceived = !0, 
                            iaw.data.mobileAssets.projectList.isDirty = !1;
                        }
                        if (void 0 !== parsedData.hasMore ? iaw.data.mobileAssets.hasMoreProjects = parsedData.hasMore : iaw.data.mobileAssets.hasMoreProjects = !1, 
                        iaw.data.mobileAssets.hasMoreProjects === !1 && (numOfValidProjects = 0, projectData = iaw.data.mobileAssets.projectsData, 
                        projectData && projectData.length > 0)) {
                            for (idx = 0; idx < projectData.length; idx++) if (projectData[idx] && !projectData[idx].error) {
                                numOfValidProjects++;
                                break;
                            }
                            0 === numOfValidProjects && (iaw.data.mobileAssets.projectsData = []);
                        }
                        iaw.log.console("[mobile-assets] projectresponse: " + iaw.data.mobileAssets.projectResponseReceived), 
                        riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE);
                    }
                } else if (parsedData.guid && parsedData.guid === this.requestMgr.getGuid(this.requestMgr.states.getProjectsByIndex) && iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getProjectsByIndex && (this.requestMgr.invalidateGuid(this.requestMgr.states.getProjectsByIndex), 
                this.requestMgr.states.getProjectsByIndex.start = !1, this.requestMgr.states.getProjectsByIndex.complete = !0, 
                iaw.log.console("[mobile-assets] getProjectsByIndex response received for guid: " + parsedData.guid), 
                window.__adobe_cep__)) {
                    if (parsedData.error) return iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code), 
                    "NOT_LOGGED_IN" === parsedData.error.code ? (iaw.data.mobileAssets.projectsData = [], 
                    void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE)) : (mobileDataJSON = [], 
                    "NETWORK_ERROR" === parsedData.error.code && iaw.log.console("[mobile-assets] Network Error"), 
                    void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES));
                    if (mobileDataJSON = parsedData.list || [], mobileDataJSON && (mobileDataJSON = mobileDataJSON.filter(function(obj) {
                        return !(obj && obj.identifierData && iaw.data.mobileAssets.getProjectDataByID(obj.identifierData));
                    }), idx = 0, mobileDataJSON.forEach(function(item) {
                        item.action = iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_REQUEST, item.index = idx++, 
                        iaw.data.mobileAssets.projectsData.push(item);
                    })), void 0 !== parsedData.hasMore ? iaw.data.mobileAssets.hasMoreProjects = parsedData.hasMore : iaw.data.mobileAssets.hasMoreProjects = !1, 
                    iaw.data.mobileAssets.hasMoreProjects === !1 && (numOfValidProjects = 0, projectData = iaw.data.mobileAssets.projectsData, 
                    projectData && projectData.length > 0)) {
                        for (idx = 0; idx < projectData.length; idx++) if (projectData[idx] && !projectData[idx].error) {
                            numOfValidProjects++;
                            break;
                        }
                        0 === numOfValidProjects && (iaw.data.mobileAssets.projectsData = [], riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE));
                    }
                    riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_LOADMORE_RESPONSE);
                }
            }, this)), iaw.data.mobileAssets.pageView = !1, this.requestMgr.states.getProjects.start = !0, 
            this.requestMgr.states.sync.start && !this.requestMgr.states.sync.complete) return void this.requestMgr.setTryAgain(this.requestMgr.states.sync, void 0);
            if (!this.requestMgr.states.sync.start && this.requestMgr.states.sync.complete && iaw.data.mobileAssets.errorStates.syncError) this.clearAllStates(), 
            this.requestMgr.setTryAgain(this.requestMgr.states.sync, void 0), riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES); else if (!this.requestMgr.states.sync.start && this.requestMgr.states.sync.complete && !iaw.data.mobileAssets.errorStates.syncError) {
                this.requestMgr.setTryAgain(this.requestMgr.states.getProjects, void 0);
                var guid = this.requestMgr.newGuid(this.requestMgr.states.getProjects), mobileDataRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_FEED_REQUEST);
                mobileDataRequestMsg.setPayload(JSON.stringify({
                    guid: guid,
                    startIndex: 0,
                    count: iaw.data.mobileAssets.INITIAL_PROJECT_COUNT
                })), iaw.log.console("[mobile-assets] Sending getProjects request with guid: " + guid), 
                VulcanInterface.dispatchMessage(mobileDataRequestMsg), this.requestMgr.initTimeout(this.requestMgr.states.getProjects, guid);
            }
        },
        getProjectsByIndex: function() {
            if (this.requestMgr.states.getProjects.start && !this.requestMgr.states.getProjects.complete) return void this.requestMgr.setTryAgain(this.requestMgr.states.getProjects, void 0);
            if (!this.requestMgr.states.getProjects.start && this.requestMgr.states.getProjects.complete && !iaw.data.mobileAssets.projectResponseReceived) return void this.requestMgr.setTryAgain(this.requestMgr.states.getProjects, void 0);
            if (!this.requestMgr.states.getProjects.start && this.requestMgr.states.getProjects.complete && iaw.data.mobileAssets.projectResponseReceived && !this.requestMgr.states.getProjectsByIndex.start) {
                iaw.data.mobileAssets.pageView = !1, this.requestMgr.states.getProjectsByIndex.start = !0, 
                this.requestMgr.setTryAgain(this.requestMgr.states.getProjectsByIndex, void 0);
                var guid = this.requestMgr.newGuid(this.requestMgr.states.getProjectsByIndex), currIndex = iaw.data.mobileAssets.projectsData.length, mobileDataRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_FEED_REQUEST);
                mobileDataRequestMsg.setPayload(JSON.stringify({
                    guid: guid,
                    startIndex: currIndex,
                    count: iaw.data.mobileAssets.LOAD_MORE_COUNT
                })), iaw.log.console("[mobile-assets] Sending getProjectsByIndex request for startIndex: " + currIndex + " with guid: " + guid), 
                VulcanInterface.dispatchMessage(mobileDataRequestMsg), this.requestMgr.initTimeout(this.requestMgr.states.getProjectsByIndex, guid);
            }
        },
        getPages: function(projId) {
            iaw.data.mobileAssets.addHandlers.getPages || (iaw.data.mobileAssets.addHandlers.getPages = !0, 
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_PROJECT_RESPONSE, function(msg) {
                this.requestMgr.states.getPages.complete = !0, this.requestMgr.states.getPages.start = !1;
                var parsedData, responseData = VulcanInterface.getPayload(msg);
                try {
                    parsedData = JSON.parse(responseData);
                } catch (error) {
                    return void iaw.log.exception("MobileCreations pages data parse: " + error.message);
                }
                if (parsedData.error && "SERVICE_UNAVAILABLE_ERROR" === parsedData.error.code) return void iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code);
                if (this.requestMgr.invalidateTimeout(this.requestMgr.states.getPages, parsedData.guid), 
                parsedData.guid && parsedData.guid === this.requestMgr.getGuid(this.requestMgr.states.getPages) && iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getPages) {
                    this.requestMgr.invalidateGuid(this.requestMgr.states.getPages), iaw.log.console("[mobile-assets] getPages response received for project data: " + JSON.stringify(projId) + " and for guid: " + parsedData.guid);
                    var projectRef = iaw.data.mobileAssets.getProjectDataByID(parsedData.parentIdentifierData);
                    if (!projectRef) return;
                    if (parsedData.error) {
                        if (iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code), "NOT_LOGGED_IN" === parsedData.error.code) return iaw.data.mobileAssets.projectsData = [], 
                        void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE);
                        projectRef.isDirty = !0, "PROJECT_DELETED" === parsedData.error.code && (iaw.data.mobileAssets.errorStates.projDeleted = !0), 
                        riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_ERROR_STATES);
                    } else {
                        projectRef.isDirty = !1;
                        var mobileDataJSON = parsedData.list;
                        if (window.__adobe_cep__) {
                            var idx = 0;
                            mobileDataJSON.forEach(function(item) {
                                item.action = iaw.mobileAssetEvents.MOBILE_ASSET_PAGE_REQUEST, item.index = idx++;
                            }), iaw.data.mobileAssets.pagesData = mobileDataJSON, riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE);
                        }
                    }
                }
            }, this)), this.requestMgr.setTryAgain(this.requestMgr.states.getPages, projId), 
            iaw.data.mobileAssets.pageView = !0;
            var guid = this.requestMgr.newGuid(this.requestMgr.states.getPages), mobileDataRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_PROJECT_REQUEST);
            mobileDataRequestMsg.setPayload(JSON.stringify({
                id: projId,
                guid: guid
            })), iaw.log.console("[mobile-assets] Sending getPages request with project data " + JSON.stringify(projId) + " and guid: " + guid), 
            VulcanInterface.dispatchMessage(mobileDataRequestMsg), this.requestMgr.initTimeout(this.requestMgr.states.getPages, guid);
        },
        getPage: function(pageid) {
            iaw.data.mobileAssets.addHandlers.getPage || (iaw.data.mobileAssets.addHandlers.getPage = !0, 
            VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_PAGE_RESPONSE, function(msg) {
                this.requestMgr.states.getPage.start = !1, this.requestMgr.states.getPage.complete = !0;
                var parsedData, responseData = VulcanInterface.getPayload(msg), pageData = {};
                try {
                    parsedData = JSON.parse(responseData);
                } catch (error) {
                    return void iaw.log.exception("MobileCreations page data parse: " + error.message);
                }
                if (parsedData.error && "SERVICE_UNAVAILABLE_ERROR" === parsedData.error.code) return void iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code);
                if (this.requestMgr.invalidateTimeout(this.requestMgr.states.getPage, parsedData.guid), 
                parsedData.guid && parsedData.guid === this.requestMgr.getGuid(this.requestMgr.states.getPage) && iaw.data.mobileAssets.tryAgainData.state === this.requestMgr.states.getPage) {
                    this.requestMgr.invalidateGuid(this.requestMgr.states.getPage);
                    var pageRef = iaw.data.mobileAssets.getPageDataByID(parsedData.parentIdentifierData);
                    if (iaw.log.console("[mobile-assets] getPages response received for page data: " + JSON.stringify(pageid) + " and for guid: " + parsedData.guid), 
                    pageRef.isDirty = !1, !pageRef) return;
                    if (parsedData.error) {
                        if (iaw.analytics.ingest.logMobileCreationsErrorEvent(parsedData.error.code), "NOT_LOGGED_IN" === parsedData.error.code) return iaw.data.mobileAssets.projectsData = [], 
                        void riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PROJECTS_RESPONSE);
                        "BLANK_PAGE" === parsedData.error.code ? (pageRef.pageFailure = !1, iaw.cepUtil.evalExtendScript("app.documents.add()")) : (pageRef.pageFailure = !0, 
                        riotctrl.trigger(iaw.mobileAssetEvents.MOBILE_ASSET_PAGES_RESPONSE));
                    } else pageRef.pageFailure = !1, iaw.log.console("[mobile-assets] getPage response opening......"), 
                    iaw.analytics.ingest.logMobileCreationsClickedEvent("item", pageRef.identifierData), 
                    iaw.cepUtil.evalExtendScript("app.open(new File ('" + parsedData.path + "'))"), 
                    pageData.syncGroup = pageRef.identifierData.syncGroup, pageData.size = parsedData.size.toString();
                    pageData && iaw.analytics.pip.logDataGroupEvent(iaw.analytics.pipQuery.category, {
                        "File Type": iaw.data.mobileAssets.syncGroupMap[pageData.syncGroup],
                        "File Size in KB": pageData.size
                    });
                }
            }, this)), this.requestMgr.setTryAgain(this.requestMgr.states.getPage, pageid), 
            iaw.data.mobileAssets.pageView = !0;
            var guid = this.requestMgr.newGuid(this.requestMgr.states.getPage), mobileDataRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + this.VULCAN_MOBILE_PAGE_REQUEST);
            mobileDataRequestMsg.setPayload(JSON.stringify({
                id: pageid,
                guid: guid
            })), iaw.log.console("[mobile-assets] Sending getPage request with project data " + JSON.stringify(pageid) + " and guid: " + guid), 
            VulcanInterface.dispatchMessage(mobileDataRequestMsg), this.requestMgr.initTimeout(this.requestMgr.states.getPage, guid);
        }
    };
    window.iaw.data = window.iaw.data || {}, window.iaw.data.mobileAssets = mobileAssetData, 
    window.iaw.mobileAssetMgr = mobileAssetDataMgr;
}(), function() {
    var psdk = {
        data: {},
        LOG_PREFIX: "PSDK :: ",
        CCXP_VULCAN_SPECIFIER: "CCXP",
        VULCAN_PSDK_FEED_REQUEST: "ccxprocess.PSDKFeedRequest",
        VULCAN_PSDK_FEED_RESPONSE: "ccxprocess.PSDKFeedResponse",
        PSDK_RESPONSE_TIMEOUT: 2e3,
        PSDKTimeoutHandler: null,
        generateDefaultData: function() {
            var defaultData = {
                cards: [],
                cardControl: [],
                expirationDTS: "2015-11-01T00:00:00.000+00:00",
                version: iaw.store.get([ "host", "radarVersion" ]) || "0.0.0"
            };
            return defaultData;
        },
        readJSONFile: function(path) {
            var obj = null;
            if (!path) return obj;
            var result = window.cep.fs.readFile(path);
            if (0 === result.err) try {
                obj = JSON.parse(result.data);
            } catch (error) {
                iaw.log.console(this.LOG_PREFIX + "Failed to read JSON file with path [" + path + "], error=" + error), 
                obj = null;
            } else 3 === result.err ? iaw.log.console(this.LOG_PREFIX + "File does not exist [" + path + "]") : iaw.log.console(this.LOG_PREFIX + "Failed to read JSON file with path [" + path + "], error code=" + result.err);
            return obj;
        },
        getData: function(hostData, cb) {
            var self = this, startTimestamp = new Date(), onFinish = function(err, data) {
                err && iaw.log.console(self.LOG_PREFIX + err);
                var durationInMilliSec = new Date().getTime() - startTimestamp.getTime();
                iaw.log.debug(self.LOG_PREFIX + "It costs " + durationInMilliSec + " ms to get response from CCXProcess."), 
                cb(data);
            };
            if (!iaw.util.isCCXProcessInstalled()) return onFinish("CCX Process is not installed.");
            iaw.util.launchCCXProcess();
            var uuid = iaw.util.generateGUID(), responder = {};
            responder.handler = function(msg) {
                var psdkJSON, parsedData, responseData = VulcanInterface.getPayload(msg);
                try {
                    parsedData = JSON.parse(responseData), iaw.log.debug(self.LOG_PREFIX + "Receiving " + self.VULCAN_PSDK_FEED_RESPONSE + " [" + parsedData.requestId + "], path is " + parsedData.path);
                } catch (error) {
                    return void iaw.log.debug(self.LOG_PREFIX + "Invalid JSON string:" + responseData);
                }
                if (parsedData && parsedData.requestId === uuid) {
                    clearTimeout(self.PSDKTimeoutHandler);
                    var err = null;
                    parsedData.path ? (psdkJSON = self.readJSONFile(parsedData.path), psdkJSON && psdkJSON.cards && psdkJSON.cards.forEach(function(card) {
                        if (card.backgroundImageLocalpath) {
                            var parentFolder = parsedData.path.substring(0, parsedData.path.lastIndexOf("/"));
                            parentFolder && (card.backgroundImageLocalpath = parentFolder + "/" + card.backgroundImageLocalpath);
                        }
                    })) : err = "path is missing, parsedData=" + JSON.stringify(parsedData), VulcanInterface.removeMessageListener(VulcanMessage.TYPE_PREFIX + self.VULCAN_PSDK_FEED_RESPONSE, responder.handler), 
                    onFinish(err, psdkJSON);
                }
            }, VulcanInterface.addMessageListener(VulcanMessage.TYPE_PREFIX + self.VULCAN_PSDK_FEED_RESPONSE, responder.handler);
            var psdkParams = {
                productCode: hostData.hostID,
                productVersion: hostData.appVersion,
                productLanguage: hostData.language,
                countryCode: hostData.countryCode,
                subscriptionStatus: hostData.accountStatus,
                ccxVersion: iaw.cepUtil.getExtensionVersion(!0).version,
                radarSessionGUID: hostData.radarSessionGUID,
                featureFlag: !1,
                release: "CCXStart-1-5"
            };
            "trial" === psdkParams.subscriptionStatus && (psdkParams.trialEndDTS = iaw.util.getTrialEndDate(hostData.secondsLeftInTrial));
            var params = {
                psdkParams: psdkParams,
                requestId: uuid,
                userTrackingEnabled: hostData.userTrackingEnabled
            }, PSDKRequestMsg = new VulcanMessage(VulcanMessage.TYPE_PREFIX + self.VULCAN_PSDK_FEED_REQUEST);
            PSDKRequestMsg.setPayload(JSON.stringify(params)), VulcanInterface.dispatchMessage(PSDKRequestMsg), 
            iaw.log.console(self.LOG_PREFIX + "Sending " + self.VULCAN_PSDK_FEED_REQUEST + " [" + uuid + "]"), 
            self.PSDKTimeoutHandler = setTimeout(function() {
                VulcanInterface.removeMessageListener(VulcanMessage.TYPE_PREFIX + self.VULCAN_PSDK_FEED_RESPONSE, responder.handler), 
                onFinish("It is timeout to get response from CCX Process.");
            }, self.PSDK_RESPONSE_TIMEOUT);
        }
    };
    window.iaw = window.iaw || {}, window.iaw.data = window.iaw.data || {}, window.iaw.data.psdk = psdk;
}(), HostEvents.prototype = {
    constructor: HostEvents,
    inputCooldownHack: window.performance.now(),
    isInCooldown: function() {
        return !(window.performance.now() - this.inputCooldownHack > 1200);
    },
    setCooldown: function() {
        this.inputCooldownHack = window.performance.now();
    },
    createDocumentFromTemplate: function(docIdentifier) {
        var hostID = iaw.store.get([ "host", "hostID" ]);
        if (window.__adobe_cep__) switch (hostID) {
          case "PHXS":
            window.__adobe_cep__.evalScript("CCXWelcomeXSHost_" + hostID + '.createDocumentFromTemplate("' + docIdentifier + '")', iaw.util.closeExtOnStatus);
            break;

          default:
            iaw.cepUtil.sendEvent(iaw.cepUtil.events.kExecuteMenuCmd, docIdentifier);
        }
    }
}, new HostEvents();

var kPhotoshopEventSet = 1936028772;

!function() {
    function receivedHostData(hostData) {
        if (hostData) {
            var globalLang = iaw.i18n.normalizeLocaleID(hostData.language);
            document.getElementsByTagName("html")[0].setAttribute("lang", globalLang), iaw.perf.measure(iaw.perf.timers.HostData), 
            iaw.perf.set(iaw.perf.timers.PSDKData), hostData.radarSessionGUID = iaw.util.generateGUID(), 
            iaw.psdk.getData(hostData, function(psdkJSON) {
                var psdk = iaw.psdk.data = psdkJSON || iaw.psdk.generateDefaultData();
                iaw.perf.measure(iaw.perf.timers.PSDKData), finishInitialization(hostData, psdk);
            });
        }
    }
    function finishInitialization(hostData, psdkData) {
        if (hostData) {
            iaw.perf.set(iaw.perf.timers.FinalizeData);
            var extensionID = iaw.cepUtil.getExtensionID(), ingestServer = "prod";
            switch (iaw.cepUtil.usingStageAuthentication() ? (iaw.cepUtil.setEnvironment("stage"), 
            ingestServer = "stage", iaw.log.console("Authentication environment to stage")) : iaw.log.console("Authentication environment to production"), 
            window.__adobe_cep__ && !iaw.cepUtil.oneTimeHandler && (iaw.cepUtil.oneTimeHandler = !0, 
            iaw.cepUtil.csInterface.addEventListener(iaw.cepUtil.events.kHostStatusChanged, iaw.start.handleStatusChange)), 
            hostData.imsToken = null, iaw.cepUtil.getIMSAccessToken(function(token) {
                hostData.imsToken = token;
            }), hostData.hostID) {
              case "PHXS":
                iaw.cepUtil.sendEvent("com.adobe.PhotoshopLoseFocus", null, extensionID), "com.adobe.ccx.open" === extensionID && iaw.cepUtil.sendEvent("com.adobe.PhotoshopPersistent", null, extensionID), 
                "com.adobe.ccx.start" === extensionID && (iaw.cepUtil.sendEvent("com.adobe.PhotoshopRegisterEvent", kPhotoshopEventSet.toString(), extensionID), 
                iaw.cepUtil.csInterface.addEventListener("com.adobe.PhotoshopJSONCallback" + extensionID, iaw.start.handleStatusChange));
                break;

              case "PPRO":
              case "AEFT":
                hostData.displayMode = "welcome";
            }
            hostData.radarVersion = iaw.cepUtil.getExtensionVersion(!0).version, iaw.localstorage.userID = hostData.adobeGUID, 
            hostData.debugMenu = hostData.debugMenu || !1, hostData.startView = "primary", hostData.displayCount = parseInt(iaw.localstorage.getUserItem("start.displayCount") || 0) + 1;
            var lastSession = iaw.localstorage.getUserItem("start.lastSessionGUID") || null;
            hostData.launchCount = parseInt(iaw.localstorage.getUserItem("start.launchCount") || 0), 
            lastSession !== hostData.sessionGUID && hostData.launchCount++, iaw.localstorage.setUserItem("start.lastSessionGUID", hostData.sessionGUID), 
            iaw.localstorage.setUserItem("start.launchCount", hostData.launchCount), iaw.localstorage.setUserItem("start.displayCount", hostData.displayCount), 
            iaw.start.updateTabDataOnInit(hostData), hostData.defaultTab && "com.adobe.ccx.open" !== extensionID || (hostData.defaultTab = "recentfile"), 
            hostData.currentTab = hostData.defaultTab;
            var remapTabs = {};
            hostData.tabs.forEach(function(tab) {
                remapTabs[tab.type] = tab;
            }), delete hostData.tabs, hostData.tabs = remapTabs, hostData.ffcEndpoint = "https://prod-rel-ffc.oobesaas.adobe.com/adobe-ffc-external/core/v1/passphrase?passPhrase=", 
            hostData.collabEndpoint = "https://cc-collab.adobe.io/links/", hostData.ccstorageEndpoint = "https://cc-api-assets.adobe.io/libraries/", 
            hostData.subscribeEndpoint = "stage" !== ingestServer ? "https://cc-collab.adobe.io/publinks/" : "https://cc-collab-stage.adobe.io/publinks/", 
            hostData.bookmarksEndpoint = "stage" !== ingestServer ? "https://cc-collab.adobe.io/bookmarks/" : "https://cc-collab-stage.adobe.io/bookmarks/", 
            iaw.util.setUIThemeMode(), "trial" === hostData.accountStatus && (hostData.updateTrialInterval = setInterval(function() {
                hostData.secondsLeftInTrial -= 3600, hostData.secondsLeftInTrial <= 0 && (clearInterval(hostData.updateTrialInterval), 
                hostData.secondsLeftInTrial = 0, hostData.updateTrialInterval = null);
            }, 36e5)), iaw.i18n.addFromURLFile("goURL"), riotctrl.trigger("update-profile-name-retro", hostData.displayName), 
            riotctrl.trigger("update-profile-image", hostData.adobeGUID), iaw.analytics.config("CCXInAppWelcome", hostData, psdkData, ingestServer), 
            iaw.store.set("host", hostData), iaw.store.set("psdk", psdkData), iaw.startup.run(iaw.startup.PHASES.Host), 
            iaw.a11y.registerKeyEventsInterest(), window.__adobe_cep__ && (iaw.log.logJSON("host.data: ", hostData), 
            iaw.log.logJSON("psdk.data: ", psdkData)), riotctrl.trigger("update-host-retro"), 
            iaw.i18n.addFromLocalLocaleFile(hostData.language, function() {
                window.moment.locale(hostData.language), iaw.start.updateMRUFileSize(hostData.tabs.recentfile.list), 
                riotctrl.trigger("update-cards-retro"), riotctrl.trigger("update-i18n-retro"), riotctrl.trigger("unlock-screen"), 
                iaw.startup.run(iaw.startup.PHASES.Done);
            }), iaw.analytics.ingest.logScreenStateEvent("open"), iaw.motor.start(), iaw.perf.measure(iaw.perf.timers.DataTime), 
            iaw.perf.measure(iaw.perf.timers.FinalizeData), iaw.perf.measure(iaw.perf.timers.LoadTime, window.loadTime), 
            iaw.test && (iaw.test.runAll(), document.title = iaw.cepUtil.getExtensionID()), 
            iaw.cepUtil.sendEvent(iaw.cepUtil.events.EXTENSIONREADY, null, extensionID), iaw.cepUtil.sendEvent(iaw.cepUtil.events.INTERACTIVEREADY, null), 
            iaw.perf.report(!0);
        }
    }
    iaw.host = iaw.cepUtil.csInterface ? iaw.start : iaw.data.debugHost, iaw.psdk = window.__adobe_cep__ ? iaw.data.psdk : iaw.data.debugPSDK, 
    document.onreadystatechange = function(evt) {
        if ("interactive" === document.readyState) {
            iaw.perf.markStart(window.loadTime), iaw.perf.set(iaw.perf.timers.DataTime);
            var hostID = iaw.cepUtil.applicationID, hostIDlc = hostID.toLowerCase();
            iaw.store = new Baobab({}, {
                immutable: !1,
                persistent: !1
            }), iaw.log.console("CEP extension for " + hostID + " initializing - acquiring host data..."), 
            window.__adobe_cep__ ? (document.oncontextmenu = function() {
                return !1;
            }, iaw.cepUtil.addThemeChangeListener(), iaw.perf.set(iaw.perf.timers.HostData), 
            iaw.apps[hostIDlc] ? iaw.apps[hostIDlc].init(receivedHostData) : iaw.start.getData(function(jsData) {
                if (jsData) {
                    var host = null;
                    try {
                        host = JSON.parse(jsData, iaw.json.startDataReceiver);
                    } catch (err) {
                        iaw.log.exception(err);
                    }
                    receivedHostData(host);
                }
            })) : iaw.host.getData(function(data) {
                finishInitialization(data, iaw.data.debugPSDK.data);
            }), iaw.startup.run(iaw.startup.PHASES.Doc), iaw.libraryManager.init("*");
        }
    };
}(), window.addEventListener("dragover", function(e) {
    e = e || window.event, e.preventDefault();
}, !1), window.addEventListener("drop", function(e) {
    e = e || window.event, e.preventDefault();
    for (var files = event.dataTransfer.files, numfiles = files ? files.length || 0 : 0, dropfiles = {
        path: []
    }, hostID = iaw.store.get([ "host", "hostID" ]), index = 0; index < numfiles; index++) {
        var rawpath = files[index.toString()].path;
        rawpath = "PHXS" !== hostID ? rawpath : rawpath.replace(/\\/g, "/"), dropfiles.path.push(rawpath);
    }
    switch (dropfiles = JSON.stringify(dropfiles), hostID) {
      case "PHXS":
        var pipMethod = iaw.util.getPipMethodString("drag.drop");
        iaw.cepUtil.evalExtendScriptWithParams("CCXWelcomeXSHost_PHXS.openDroppedDocument", dropfiles, pipMethod, iaw.util.closeExtOnStatus);
        break;

      default:
        iaw.cepUtil.sendEvent(iaw.cepUtil.events.kOpenDropFiles, dropfiles);
    }
}, !1), iaw.apps = iaw.apps || {}, iaw.apps.phxs = {
    init: function(receivedHostData, mode) {
        iaw.cepUtil.evalExtendScript('CCXWelcomeXSHost_PHXS.getInitJSON("' + mode + '")', function(supportDataJSON) {
            if (supportDataJSON) {
                var hostData = null;
                try {
                    var jsData = iaw.apps.phxs.buildHostJSON(mode, supportDataJSON);
                    hostData = JSON.parse(jsData, iaw.json.fnftDataReceiver);
                } catch (err) {
                    iaw.log.exception("Host JSON parse error: " + err.message);
                }
                receivedHostData(hostData), iaw.localstorage.setUserItem("fnft.presetMode", !1);
            }
        });
    },
    initPresets: function(receivedHostData, mode) {
        var hostID = iaw.cepUtil.applicationID;
        iaw.cepUtil.evalExtendScript("CCXWelcomeXSHost_" + hostID + '.getPresetJSON("' + mode + '")', function(supportDataJSON) {
            if (supportDataJSON) {
                var presets;
                try {
                    var jsData = iaw.apps.phxs.buildHostPresetJSON(mode, supportDataJSON);
                    presets = JSON.parse(jsData, iaw.json.fnftDataReceiver);
                } catch (err) {
                    iaw.log.exception("Host JSON parse error: " + err.message);
                }
                receivedHostData(presets);
            }
        });
    },
    buildHostJSON: function(mode, supportDataJSON) {
        var supportData = JSON.parse(supportDataJSON), phsxEnvInfo = supportData.envInfo, userData = {
            hostID: "PHXS",
            appVersion: phsxEnvInfo.appVersion,
            platform: phsxEnvInfo.platform,
            displayMode: phsxEnvInfo.displayMode,
            sessionGUID: phsxEnvInfo.sessionGUID,
            userTrackingEnabled: phsxEnvInfo.userTrackingEnabled,
            language: phsxEnvInfo.locale,
            countryCode: phsxEnvInfo.countryCode,
            adobeGUID: phsxEnvInfo.userGUID,
            accountStatus: phsxEnvInfo.subscription,
            accountType: phsxEnvInfo.accountType
        };
        return mode && "fnft" === mode ? (userData.fnftSettings = this.getFNFTData(supportData), 
        userData.displayMode = mode, iaw.store.set("phxsFNFTConfigInfo", supportData.fnftConfigInfo), 
        iaw.store.set("presets", [])) : (userData.firstName = phsxEnvInfo.firstName, userData.lastName = phsxEnvInfo.lastName, 
        userData.tabs = this.getFileTabs(supportData), userData.appStartClockTime = phsxEnvInfo.appStartClockTime, 
        userData.secondsLeftInTrial = phsxEnvInfo.secondsLeftInTrial, userData.dontShowAgain = phsxEnvInfo.startDSA, 
        userData.buttonInfo = phsxEnvInfo.buttonInfo, userData.fnftEnabled = phsxEnvInfo.fnftEnabled), 
        JSON.stringify(userData);
    },
    buildHostPresetJSON: function(mode, supportDataJSON) {
        var presets = [];
        if (mode && "fnft" === mode) {
            var supportData = JSON.parse(supportDataJSON);
            supportData.fnftConfigInfo = iaw.store.get("phxsFNFTConfigInfo"), presets = this.getPresetArray(supportData);
        }
        return JSON.stringify(presets);
    },
    getFNFTData: function(supportData) {
        var pixelAspectRatios, configInfo = supportData.fnftConfigInfo, envInfo = supportData.envInfo;
        pixelAspectRatios = supportData.pixelScaleFactorList && supportData.pixelScaleFactorList.pixelScaleFactorList && supportData.pixelScaleFactorList.pixelScaleFactorList.map(function(item, index) {
            return {
                label: item.name + (0 === index ? "" : " (" + iaw.util.roundDecimal(item.value, 2) + ")"),
                value: item.value
            };
        }) || [];
        var settings = {
            docSizeBounds: [ 3e5, 3e5 ],
            units: [ "pixelsUnit", "inchesUnit", "centimetersUnit", "millimetersUnit", "pointsUnit", "picasUnit" ],
            resolutionUnits: [ "inchesUnit", "centimetersUnit" ],
            colorModes: [ {
                mode: "bitmap",
                values: [ 1 ]
            }, {
                mode: "grayscale",
                values: [ 8, 16, 32 ]
            }, {
                mode: "RGB",
                values: [ 8, 16, 32 ]
            }, {
                mode: "CMYK",
                values: [ 8, 16 ]
            }, {
                mode: "Lab",
                values: [ 8, 16 ]
            } ],
            backgroundValues: [ "white", "black", "background", "transparent", "custom" ],
            backgroundColor: configInfo.backgroundColor,
            pointsPerInch: configInfo.pointsPerInch,
            defaultDocumentName: configInfo.defaultNewDocName || null,
            colorProfileLists: envInfo.colorProfileLists,
            colorSettings: configInfo.colorSettings || {},
            defaultPresetSettings: configInfo.startingPreset || null,
            pixelAspectRatios: pixelAspectRatios
        };
        return settings;
    },
    getFileTabs: function(supportData) {
        var tabsArray = [], recentFiles = {
            type: "recentfile",
            label: "listview_recentfiles_tab_label",
            listViewEnabled: "true",
            thumbnailViewEnabled: "true",
            list: supportData.recentFiles.list
        };
        return tabsArray.push(recentFiles), tabsArray;
    },
    getPresetArray: function(supportData) {
        var presetArray = [], mruArray = this.getRecentlyUsedPresets(supportData), mruTemplates = supportData.mruTemplates.recentlyUsedTemplates;
        if (mruTemplates) {
            for (var mruIndex = 0; mruIndex < mruTemplates.length; ++mruIndex) mruTemplates[mruIndex].template_category = "needslookup";
            mruArray = mruArray.concat(mruTemplates);
        }
        mruArray.sort(function(a, b) {
            return a.lastUsedTime > b.lastUsedTime ? -1 : a.lastUsedTime < b.lastUsedTime ? 1 : 0;
        }), presetArray = presetArray.concat(mruArray);
        var psPresets = supportData.presets;
        if (psPresets.sections) for (var tmpCatToSec = [ {
            category: "recent",
            sections: [ "clipboard" ]
        }, {
            category: "saved",
            sections: [ "user" ]
        }, {
            category: "photo",
            sections: [ "default", "photo" ]
        }, {
            category: "print",
            sections: [ "uspaper", "europaper" ]
        }, {
            category: "mobile",
            sections: [ "mobile", "iconography" ]
        }, {
            category: "film",
            sections: [ "video" ]
        }, {
            category: "web",
            sections: [ "web" ]
        }, {
            category: "art",
            sections: [ "artillustration" ]
        } ], catIndex = 0; catIndex < tmpCatToSec.length; ++catIndex) for (var sectIndex = 0; sectIndex < tmpCatToSec[catIndex].sections.length; ++sectIndex) for (var section = tmpCatToSec[catIndex].sections[sectIndex], index = 0; index < psPresets.sections.length; ++index) psPresets.sections[index].section === section && psPresets.sections[index].presets && this.addPsPresetListToCCXPresetEntryList(psPresets.sections[index].presets, tmpCatToSec[catIndex].category, supportData.fnftConfigInfo, presetArray);
        return presetArray;
    },
    getRecentlyUsedPresets: function(supportData) {
        var mruArray = [];
        return supportData.mruPresets.mru && this.addPsPresetListToCCXPresetEntryList(supportData.mruPresets.mru, "recent", supportData.fnftConfigInfo, mruArray), 
        mruArray;
    },
    thumbnailForPreset: function(category, title) {
        switch (category) {
          case "photo":
            return "SP_PresetPhotoDoc.png";

          case "europaper":
          case "uspaper":
            return "SP_PrintDoc.png";

          case "mobile":
            return "SP_PresetMobilePhoneDoc.png";

          case "iconography":
            return "SP_PresetIconographyDoc.png";

          case "video":
            return "SP_PresetFilmVideo.png";

          case "web":
            return "SP_PresetWebDoc.png";

          case "artillustration":
            return "SP_PresetArt.png";

          case "clipboard":
            return "SP_PresetClipboard.png";

          case "default":
            return "CCX_Start_DefaultThumb_Ps_Ai_Id.png";

          case "last":        }
        return "SP_PresetCustom.png";
    },
    convertPsPresetToCCXPresetEntry: function(psPreset, category, configInfo) {
        if ("separator" !== psPreset.name) {
            var presetEntry = psPreset;
            return presetEntry.isPreset = !0, presetEntry.id = "", presetEntry.title = presetEntry.name, 
            presetEntry.thumbnail_url = "", presetEntry.mime_type = "image/photoshop", presetEntry.price_prompt = "", 
            presetEntry.template_category = "error", presetEntry.previews = [], "screen" === presetEntry.resolution ? (presetEntry.resolution = configInfo.screenPresetResolution.value, 
            presetEntry.resolutionUnits = configInfo.screenPresetResolution.units) : "print" === presetEntry.resolution && (presetEntry.resolution = configInfo.printPresetResolution.value, 
            presetEntry.resolutionUnits = configInfo.printPresetResolution.units), presetEntry.template_category = category, 
            presetEntry.thumbnail_url = this.thumbnailForPreset(presetEntry.group, presetEntry.title), 
            presetEntry;
        }
    },
    addPsPresetListToCCXPresetEntryList: function(psPresets, category, configInfo, ccxPresetArray) {
        for (var presetIndex = 0; presetIndex < psPresets.length; ++presetIndex) if ("separator" !== psPresets[presetIndex].name) {
            var presetEntry = this.convertPsPresetToCCXPresetEntry(psPresets[presetIndex], category, configInfo);
            presetEntry && ("clipboard" !== presetEntry.group ? ccxPresetArray.push(presetEntry) : ccxPresetArray.unshift(presetEntry));
        }
    },
    promptForCustomColor: function(color) {
        var colorJSON, serializedParams, _color = color, dialogContext = iaw.i18n.getLocalizedString("newdoc_color-picker_context");
        return color instanceof Object || (_color = {
            red: 255,
            grain: 255,
            blue: 255,
            type: "RGBColor"
        }), colorJSON = JSON.stringify(_color).replace(/"/g, '\\"'), serializedParams = '"' + colorJSON + '", "' + dialogContext + '"', 
        new Promise(function(resolve, reject) {
            try {
                iaw.cepUtil.evalExtendScript("CCXWelcomeXSHost_PHXS.openColorPicker(" + serializedParams + ")", function(resultJSON) {
                    if (resultJSON) try {
                        var result = JSON.parse(resultJSON);
                        resolve(result);
                    } catch (e) {
                        reject(new Error("Failed to parse result from openColorPicker", e));
                    }
                    resolve(null);
                });
            } catch (e) {
                reject(new Error("Failed to get color via color picker", e));
            }
        });
    },
    convertColorToRGB: function(color) {
        if (!color) return new Promise(function(resolve, reject) {
            resolve({
                red: 255,
                grain: 255,
                blue: 255,
                type: "RGBColor"
            });
        });
        var colorJSON = JSON.stringify(color).replace(/"/g, '\\"');
        return new Promise(function(resolve, reject) {
            try {
                iaw.cepUtil.evalExtendScript('CCXWelcomeXSHost_PHXS.convertColorToRGB("' + colorJSON + '")', function(resultJSON) {
                    if (resultJSON) try {
                        var result = JSON.parse(resultJSON);
                        resolve(result);
                    } catch (e) {
                        reject(new Error("Failed to parse result from convertColorToRGB", e));
                    }
                    reject(new Error("convertColorToRGB Failed to convert color, empty result"));
                });
            } catch (e) {
                reject(new Error("convertColorToRGB Failed to convert color", e));
            }
        });
    },
    rgbFormat: function(obj) {
        return "rgb(" + Math.round(obj.red) + ", " + Math.round(void 0 !== obj.grain ? obj.grain : obj.green) + ", " + Math.round(obj.blue) + ")";
    }
};