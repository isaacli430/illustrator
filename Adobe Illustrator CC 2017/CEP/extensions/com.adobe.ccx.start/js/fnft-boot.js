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
!function() {
    function every(ar, fn) {
        for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return !1;
        return 1;
    }
    function each(ar, fn) {
        every(ar, function(el) {
            return fn(el), 1;
        });
    }
    function tophat(paths, idOrDone, optDone) {
        function loopFn(item) {
            return item.call ? item() : list[item];
        }
        function callback() {
            if (!--queue) {
                list[id] = 1, done && done();
                for (var dset in delay) every(dset.split("|"), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = []);
            }
        }
        paths = paths[push] ? paths : [ paths ];
        var idOrDoneIsDone = idOrDone && idOrDone.call, done = idOrDoneIsDone ? idOrDone : optDone, id = idOrDoneIsDone ? paths.join("") : idOrDone, queue = paths.length;
        return setTimeout(function() {
            each(paths, function loading(path, force) {
                return null === path ? callback() : (force || /^https?:\/\//.test(path) || !scriptpath || (path = path.indexOf(".js") === -1 ? scriptpath + path + ".js" : scriptpath + path), 
                scripts[path] ? (id && (ids[id] = 1), 2 == scripts[path] ? callback() : setTimeout(function() {
                    loading(path, !0);
                }, 0)) : (scripts[path] = 1, id && (ids[id] = 1), void create(path, callback)));
            });
        }, 0), this;
    }
    function create(path, fn) {
        var loaded, el = document.createElement("script");
        el.onload = el.onerror = el[onreadystatechange] = function() {
            el[readyState] && !/^c|loade/.test(el[readyState]) || loaded || (el.onload = el[onreadystatechange] = null, 
            loaded = 1, scripts[path] = 2, fn());
        }, el.async = 1, el.src = urlArgs ? path + (path.indexOf("?") === -1 ? "?" : "&") + urlArgs : path, 
        document.body.appendChild(el);
    }
    var scriptpath, urlArgs, push = "push", readyState = "readyState", onreadystatechange = "onreadystatechange", list = {}, ids = {}, delay = {}, scripts = {};
    tophat.get = create, tophat.order = function(scripts, id, done) {
        !function callback(s) {
            s = scripts.shift(), scripts.length ? tophat(s, callback) : tophat(s, id, done);
        }();
    }, tophat.path = function(p) {
        scriptpath = p;
    }, tophat.urlArgs = function(str) {
        urlArgs = str;
    }, tophat.ready = function(deps, ready, req) {
        deps = deps[push] ? deps : [ deps ];
        var missing = [];
        return !each(deps, function(dep) {
            list[dep] || missing[push](dep);
        }) && every(deps, function(dep) {
            return list[dep];
        }) ? ready() : !function(key) {
            delay[key] = delay[key] || [], delay[key][push](ready), req && req(missing);
        }(deps.join("|")), tophat;
    }, tophat.done = function(idOrDone) {
        tophat([ null ], idOrDone);
    }, window.tophat = tophat;
}();
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
tophat.path("./js/"), tophat([ "fnft-head.js", "fnft-iaw.js" ], function() {
    iaw.perf.markStart(window.loadTime), iaw.perf.measure(iaw.perf.timers.CORELIBS, window.loadTime), 
    iaw.perf.setHighBeamMode(!0, iaw.analytics.pip.fnftCategory);
    var hostData = null;
    if (iaw.store = new Baobab({}, {
        immutable: !1,
        persistent: !1
    }), iaw.perf.set(iaw.perf.timers.DataTime), iaw.perf.set(iaw.perf.timers.HostData), 
    window.__adobe_cep__) {
        var hostID = iaw.cepUtil.applicationID, hostIDlc = hostID.toLowerCase(), loadAppScript = !1;
        document.oncontextmenu = function() {
            return !1;
        }, document.title = iaw.cepUtil.getExtensionID(), iaw.cepUtil.addThemeChangeListener();
        var interfaceColor = iaw.cepUtil.csInterface ? iaw.cepUtil.getUIThemeColor() : null;
        switch (interfaceColor && interfaceColor.red >= 184 && document.body.classList.remove("spc--dark"), 
        hostIDlc) {
          case "phxs":
            loadAppScript = !0;
        }
        iaw.log.console("CEP extension for " + hostID + " initializing - acquiring host data..."), 
        loadAppScript ? tophat("app-" + hostIDlc + ".js", function() {
            iaw.apps[hostIDlc].init(boot.receivedHostData, "fnft");
        }) : iaw.cepUtil.evalExtendScript("CCXWelcomeXSHost_" + hostID + '.getUserJSONData("fnft")', function(jsData) {
            if (!jsData) return void iaw.log.console("Cmd-N extension host data " + jsData + " so return");
            try {
                hostData = JSON.parse(jsData, iaw.json.fnftDataReceiver);
            } catch (err) {
                iaw.log.console("Cmd-N extension host data in catch block: " + jsData), iaw.log.exception(err);
            }
            boot.receivedHostData(hostData);
        });
    } else boot.initHost(iaw.fnftFakeHostData), boot.initPresets(iaw.fnftPresetData), 
    boot.initTemplates(iaw.fnftFakeStockData, iaw.fnftFakeLicensedTemplates);
    iaw.perf.set(iaw.perf.timers.UI), window.__adobe_cep__ && !iaw.cepUtil.oneTimeHandler && (iaw.cepUtil.oneTimeHandler = !0, 
    iaw.cepUtil.csInterface.addEventListener(iaw.cepUtil.events.UPDATEDATACALC, iaw.fnft.handleUpdateCalcData)), 
    tophat([ "fnft-uilib.js", "spectre-ui.min.js" ], function() {
        tophat("fnft-ui.js", function() {
            iaw.perf.measure(iaw.perf.timers.UI), window.boot.riotReady = !0, window.boot.mountApp();
        });
    });
}), window.boot = {
    riotReady: !1,
    hostReady: !1,
    appMounted: !1,
    mountApp: function() {
        !boot.appMounted && boot.riotReady && boot.hostReady && (boot.appMounted = !0, setTimeout(function() {
            iaw.perf.set("riot.mount.app"), riot.mount("container-templates"), iaw.perf.measure("riot.mount.app");
        }, 0));
    },
    receivedHostData: function(hostData) {
        hostData && (hostData.radarVersion = iaw.cepUtil.getExtensionVersion(!0).version, 
        hostData.radarSessionGUID = iaw.util.generateGUID(), boot.initHost(hostData));
    },
    initHost: function(hostData) {
        if (hostData) {
            if (iaw.perf.measure(iaw.perf.timers.HostData), hostData.ingestServer = "prod", 
            iaw.cepUtil.usingStageAuthentication() ? (iaw.cepUtil.setEnvironment("stage"), hostData.ingestServer = "stage", 
            iaw.log.console("Authentication environment to stage")) : iaw.log.console("Authentication environment to production"), 
            iaw.perf.set(iaw.perf.timers.InitHost), hostData.filters = iaw.fnft.generateFilters(hostData.hostID), 
            iaw.localstorage.userID = hostData.adobeGUID, hostData.displayCount = parseInt(iaw.localstorage.getUserItem("fnft.displayCount") || 0) + 1, 
            iaw.localstorage.setUserItem("fnft.displayCount", hostData.displayCount), iaw.store.set("host", hostData), 
            iaw.perf.set("i18n json"), iaw.i18n.addFromURLFile("goURL"), iaw.i18n.addFromLocalLocaleFile(hostData.language, function(evt) {
                iaw.perf.measure("i18n json"), riotctrl.trigger("update-i18n-retro");
            }), window.__adobe_cep__ && iaw.log.logJSON("host.data: ", hostData), iaw.motor.start(), 
            iaw.startup.run(iaw.startup.PHASES.Doc), iaw.startup.run(iaw.startup.PHASES.Host), 
            iaw.perf.measure(iaw.perf.timers.InitHost), "mac" === hostData.platform) {
                var comboCmd = !1, comboPer = !1;
                document.addEventListener("keydown", function(evt) {
                    91 === evt.which && (comboCmd = !0), 190 === evt.which && (comboPer = !0), comboCmd && comboPer && window.__adobe_cep__.closeExtension();
                }, !1), document.addEventListener("keyup", function(evt) {
                    91 === evt.which && (comboCmd = !1), 190 === evt.which && (comboPer = !1);
                }, !1);
            }
            if (window.__adobe_cep__) {
                iaw.cepUtil.csInterface.addEventListener(iaw.cepUtil.events.HOSTCLOSEFNFT, function() {
                    window.__adobe_cep__.closeExtension();
                }), iaw.log.console("CEP extension for " + hostData.hostID + " initializing - acquiring preset data..."), 
                iaw.perf.set(iaw.perf.timers.HostPresetData);
                var hostIDlc = hostData.hostID.toLowerCase();
                iaw.apps && iaw.apps[hostIDlc] ? iaw.apps[hostIDlc].initPresets(window.boot.initPresets, "fnft") : boot.initPresets(hostData.templates);
            }
        }
    },
    initPresets: function(presetData) {
        for (var presetLUT = {}, hostId = iaw.store.get([ "host", "hostID" ]), i = 0; i < presetData.length; i++) {
            var uuid = iaw.util.generateGUID();
            presetData[i].uuid = uuid, "ILST" === hostId && presetData[i].lastUsedTime && (presetData[i].lastUsedTime += 6e4 * new Date().getTimezoneOffset()), 
            presetLUT[uuid] = i;
        }
        iaw.store.set("presets", presetData), iaw.store.set("presetLUT", presetLUT), window.__adobe_cep__ && (iaw.log.logJSON("presets.data", presetData), 
        iaw.log.logJSON("presets.lut", presetLUT)), iaw.perf.measure(iaw.perf.timers.HostPresetData), 
        iaw.perf.measure(iaw.perf.timers.InteractiveTime, window.loadTime), riotctrl.trigger("update-host-retro"), 
        window.boot.hostReady = !0, window.boot.mountApp(), window.__adobe_cep__ && boot.getTemplates();
    },
    getTemplates: function() {
        var hostData = iaw.store.get("host");
        iaw.perf.set(iaw.perf.timers.StockData), iaw.fnft.getStockData(hostData, function(stockData) {
            iaw.perf.measure(iaw.perf.timers.StockData), iaw.perf.set(iaw.perf.timers.LicensedData);
            var sd = stockData || iaw.fnft.generateDefaultStockData(hostData);
            iaw.libraryManager.getCachedTemplates(hostData.hostID).then(function(licensedTemplates) {
                iaw.perf.measure(iaw.perf.timers.LicensedData), iaw.perf.measure(iaw.perf.timers.DataTime), 
                boot.initTemplates(sd, licensedTemplates);
            }), iaw.log.logJSON("stock.data: ", sd);
        });
    },
    initTemplates: function(stockData, licensedTemplates) {
        iaw.perf.set(iaw.perf.timers.TemplateFixup);
        var licensedTemplatesLUT = {}, templateCount = licensedTemplates.length, tIndex = 0, templates = [];
        for (licensedTemplates = licensedTemplates || [], tIndex; tIndex < templateCount; ++tIndex) licensedTemplatesLUT[licensedTemplates[tIndex].id] = tIndex;
        window.__adobe_cep__ && iaw.log.logJSON("licensed.data: ", licensedTemplates);
        var presets = iaw.store.get("presets");
        if (presets && presets.forEach(function(preset) {
            if (preset && !preset.isPreset) {
                var id = iaw.libraryManager.getIdByCachedElementRef(preset.elementRef) || iaw.libraryManager.getIdByElementRef(preset.elementRef);
                iaw.localstorage.setUserItem("templateLUT_" + id, preset.lastUsedTime);
            }
        }), stockData && stockData.templates) for (templateCount = stockData.templates.length, 
        tIndex = 0; tIndex < templateCount; ++tIndex) {
            var stockTemplate = stockData.templates[tIndex], licensedDataIndex = licensedTemplatesLUT[stockTemplate.id];
            if (void 0 !== licensedDataIndex) {
                var licensedData = licensedTemplates[licensedDataIndex];
                stockTemplate.url = licensedData.url, stockTemplate.elementRef = licensedData.elementRef, 
                stockTemplate.lastUsedTime = iaw.localstorage.getUserItem("templateLUT_" + stockTemplate.id) || licensedData.modified, 
                stockTemplate.licensedTime = licensedData.modified, stockTemplate.thumbnail_url = licensedData.thumbnail_url, 
                stockTemplate.template_category.push("recent"), stockTemplate.template_category.push("saved");
            }
            void 0 === stockTemplate.lastUsedTime && (stockTemplate.lastUsedTime = 0), void 0 === stockTemplate.licensedTime && (stockTemplate.licensedTime = 0), 
            templates.push(stockTemplate);
        }
        var templateIds = {};
        templates = templates.concat(licensedTemplates), templates = templates.filter(function(template, pos) {
            return !templateIds[template.id] && (templateIds[template.id] = !0, !0);
        });
        var templateLUT = {};
        for (templateCount = templates.length, tIndex = 0; tIndex < templateCount; ++tIndex) {
            var uuid = iaw.util.generateGUID();
            templates[tIndex].uuid = uuid, templateLUT[uuid] = tIndex;
        }
        iaw.store.set("templates", templates), iaw.store.set("templateLUT", templateLUT), 
        iaw.startup.run(iaw.startup.PHASES.Done);
        var activeItem = document.querySelector(".preset-grid-item--active");
        activeItem || (activeItem = document.querySelector(".template-grid-item--active")), 
        activeItem && activeItem.focus(), window.__adobe_cep__ && (iaw.log.logJSON("templates.data", templates), 
        iaw.log.logJSON("templates.lut", templateLUT)), iaw.perf.measure(iaw.perf.timers.TemplateFixup), 
        iaw.perf.set(iaw.perf.timers.JSLibLateLoad), iaw.util.loadExternalScript("js/marked.min.js").then(function(scriptTag) {
            riotctrl.trigger("markdown-ready-retro");
        }), iaw.util.loadExternalScript("js/fnft-lib.js").then(function(scriptTag) {
            if ("undefined" != typeof Ingest) {
                iaw.perf.measure(iaw.perf.timers.JSLibLateLoad), iaw.perf.set(iaw.perf.timers.INGESTCONFIG);
                var hostData = iaw.store.get("host");
                iaw.analytics.config("CCXInAppWelcome", hostData, null, hostData.ingestServer), 
                iaw.perf.measure(iaw.perf.timers.INGESTCONFIG), iaw.perf.report(!0);
            }
        }), iaw.libraryManager.init(iaw.libraryManager.TEMPLATE_ELEMENT_TYPE);
        var fnftLoadingEndTime = iaw.util.getCurrentTime();
        iaw.log.console("Cmd-N loading ends at: " + fnftLoadingEndTime), iaw.perf.measure(iaw.perf.timers.LoadTime, window.loadTime), 
        iaw.cepUtil.sendEvent(iaw.cepUtil.events.FNFTENDTIME, fnftLoadingEndTime.toString()), 
        iaw.cepUtil.sendEvent(iaw.cepUtil.events.INTERACTIVEREADY, null);
    }
}, window.addEventListener("dragover", function(e) {
    e = e || event, e.preventDefault();
}, !1), window.addEventListener("drop", function(e) {
    e = e || event, e.preventDefault();
}, !1), window.addEventListener("dragstart", function(e) {
    e = e || event, e.preventDefault();
}, !0), window.addEventListener("hashchange", function(e) {
    e = e || event, e.preventDefault();
    var h = iaw.util.parseQueryString(location.hash);
    riotctrl.trigger("hashchange", h);
}, !1);
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
//# sourceMappingURL=fnft-boot.js.map
