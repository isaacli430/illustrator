// If you update this array, insert items at the end as @snapWhileMovingCheckBOxes depends on it.
var allCheckBoxes = ["SnapWhileDrawingStr", "SnapWhileMoving_pathsStr", "SnapWhileMoving_segmentsStr", "SnapWhileMoving_anchorPointsStr", "SnapWhileScalingStr"];
var snapWhileMovingCheckboxes = allCheckBoxes.slice(1, 1 + 3);

var csInterface = new CSInterface();
var resourceBundle = undefined;

var localize = function(key, resourceBundle) {
	var localizedStr = resourceBundle[key];
	if (localizedStr) { 
		var index = 1;
		while (localizedStr.indexOf("$" + index) !== -1) {
			localizedStr = localizedStr.replace("$" + index, arguments[index]);
			index++;
    	}
    	return localizedStr;
  	} else {
    	return '';
  	}
};

$(document).ready(function readyEventDispatch() {	
	resourceBundle = csInterface.initResourceBundle();

	var dialogTitle = localize("PixelSnappingOptions", resourceBundle);
	if (!dialogTitle)
	{
		dialogTitle = "Pixel Snapping Options";
	}

	window.__adobe_cep__.invokeSync("setWindowTitle", dialogTitle);

	var rsp_event = new CSEvent("PixelSnappingOptionsDialogEvent", "APPLICATION");
    var jsonObj = 
    {
    	"type" : "ReadyEvent"
	}
    rsp_event.data = JSON.stringify(jsonObj);
    csInterface.dispatchEvent(rsp_event);
});

function UpdateSnapWhileMovingChildCheckBoxes() {
	// Check parent checkbox state
	var isChecked = document.getElementById("SnapWhileMovingStr").checked;
	// Update child checkboxes state
	for (val of snapWhileMovingCheckboxes) {
		document.getElementById(val).checked = isChecked;
	}
}

function UpdateSnapWhileMovingParentCheckBox() {
	var count = 0;

	// Check child checkboxes state
	for (val of snapWhileMovingCheckboxes) {
	    if (document.getElementById(val).checked)
	    {
	    	++count;
	    }
	}

	// Update parent checkbox state
	var parent = document.getElementById("SnapWhileMovingStr");

	switch (count)
	{
		case 0:
	        parent.checked = false;
	        parent.indeterminate = false;
        	break;

 	 	case 1:
 	 	case 2:
	        parent.checked = false;
	        parent.indeterminate = true;
        	break;

      	case 3:
	        parent.checked = true;
	        parent.indeterminate = false;
        	break;
	}
}

csInterface.addEventListener("DialogStartUp", function(event) {
	if (!event.data || typeof(event.data) != "object") {
		console.log("Proper data not received by init");
		return;
	}
	
	var isLightUI = !event.data.UseDarkUITheme;

	if (isLightUI)
	{
		document.body.className = "coral--light";
	}

	for (val of allCheckBoxes) {
		document.getElementById(val).checked = event.data[val];
	}
	
	UpdateSnapWhileMovingParentCheckBox(); 
});

function OKButtonClicked() {
    var event = new CSEvent("PixelSnappingOptionsDialogEvent", "APPLICATION");

    var checkboxStates = {};
    for (val of allCheckBoxes) {
		checkboxStates[val] = document.getElementById(val).checked;
	}

    var jsonObj = {
    	"type" : "OKButtonClicked",
    	"data" : checkboxStates,
	}
    event.data = JSON.stringify(jsonObj);
    csInterface.dispatchEvent(event);

    window.__adobe_cep__.closeExtension();
}
            
function CancelButtonClicked() {
    window.__adobe_cep__.closeExtension();
}

function changeVideo(newSrc, newClassName) {
	var videocontainer = document.getElementById('videoClip');
	var videosource = document.getElementById('videoSrc');
	
	if (newClassName != videosource.className)
	{
		videosource.className = newClassName;
		videosource.setAttribute('src', newSrc);
	}
}

function SetRowBackGroundOnMouseEnter(rowID) {
	var rows = document.getElementsByClassName("row");

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if (row.id == rowID)
		{
			row.className += ' updateBG';
		}
		else
		{
			row.className = 'row';
		}
	}
}

function row1Enter() {
	SetRowBackGroundOnMouseEnter("row1");
	changeVideo("./offline/movie1.gif", "row1Video");
}

function row2Enter() {
	SetRowBackGroundOnMouseEnter("row2");
	changeVideo("./offline/movie2.gif", "row2Video");
}

function row3Enter() {
	SetRowBackGroundOnMouseEnter("row3");
	changeVideo("./offline/movie3.gif", "row3Video");
}
