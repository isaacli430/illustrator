/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2015 Adobe Systems Incorporated
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
 **************************************************************************/
 
/**
 * Illustrator Host ExtendScript Interface for CCX extensions
 */
CCXWelcomeXSHost_ILST = {

    /**
     * Gets the user's personalization data from the host application as a JSON string.
     *
	 * @param mode		string key for host data mode
     * @return JSON string representation of the data.
     */
    getUserJSONData : function(mode) {
    
        var userData = app.getCCXUserJSONData(mode);

        return userData;
    }

    /**
     * Create and open the host's default document type.
     *
     * @return status code indicating success(true) or failure(false)
     */
  , createDefaultDocument : function()
    {
        var doc = app.documents.addDocument('', new DocumentPreset(), true);

        return (doc ? true : false);
    }

    /**
     * Map string to unit.
     *
     * @return Illustrator unit.
     */
  , getUnit : function(str)
    {
        var type;
        switch(str) {
            case "pointsUnit":
                type = RulerUnits.Points;
                break;
            case "picasUnit":
                type = RulerUnits.Picas;
                break;
            case "inchesUnit":
                type = RulerUnits.Inches;
                break;
            case "millimetersUnit":
                type = RulerUnits.Millimeters;
                break;
            case "centimetersUnit":
                type = RulerUnits.Centimeters;
                break;
            case "pixelsUnit":
                type = RulerUnits.Pixels;
                break;
            case "qsUnit":
                type = RulerUnits.Qs;
                break;
            default:
                type = RulerUnits.Points;
        }
        return type;
    }

    /**
     * Open the host's document creation/template UI
     */
  , createDocumentFromTemplate : function(templateJSON, docName, showDialog)
    {
        templateJSON = JSON.parse(templateJSON);
        var documentPreset = new DocumentPreset();
        documentPreset.height = templateJSON.height;
        documentPreset.width = templateJSON.width;
        documentPreset.units = this.getUnit(templateJSON.units);
        documentPreset.colorMode = templateJSON.colorMode === 'CMYK' ? DocumentColorSpace.CMYK: DocumentColorSpace.RGB;
        documentPreset.numArtboards = templateJSON.numArtboards;
        documentPreset.title = docName;
        var doc = app.documents.addDocument('', documentPreset, showDialog);
        return app.documents.length > 0;
    }

    /**
     * Open a document with the specified file path.
     */
  , openDocumentWithPath : function( filepath )
    {
    }

    /**
     * Sets the "Don't Show Again" preference in the host application.
     *
     * @param dontShowAgain     boolean value indicating true if "dont show again" was
     *                          requested, false otherwise
     */
  , setDontShowAgainPreference : function( dontShowAgain ) {
  
       app.preferences.setBooleanPreference("Hello/DontShowAgainPrefKey_Ver19_0",
                                            dontShowAgain ? "true" : "false");
    }

    /**
     * Open the legacy native new document UI dialog.
     */
  , openLegacyNewDocumentDialog : function () {
    
        var doc = app.documents.addDocument('', new DocumentPreset(), true);

        return (doc ? true : false);
    }
};
