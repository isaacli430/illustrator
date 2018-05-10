iaw.apps = iaw.apps || {}, iaw.apps.phxs = {
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
//# sourceMappingURL=app-phxs.js.map
