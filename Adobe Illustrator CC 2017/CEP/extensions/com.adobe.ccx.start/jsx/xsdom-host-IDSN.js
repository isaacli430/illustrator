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
 * InDesign Host ExtendScript Interface for CCX extensions
 */
CCXWelcomeXSHost_IDSN = {

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
     */
  , createDefaultDocument : function()
    {
    }

    /**
     * Open the host's document creation/template UI
     */
  , createDocumentFromTemplate : function()
    {
    }

    /**
     * Open a document with the specified file path.
     */
  , openDocumentWithPath : function( filepath )
    {
    }
};
