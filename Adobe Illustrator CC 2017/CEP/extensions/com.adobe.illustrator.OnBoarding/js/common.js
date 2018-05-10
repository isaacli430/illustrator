//Stop right click.
document.addEventListener("contextmenu", function (e){
                e.preventDefault();
}, false);
//stop all drag drop support.
document.addEventListener("dragstart", function (e){
                e.preventDefault();
}, false);

document.addEventListener("dragend", function (e){
                e.preventDefault();
}, false);

document.addEventListener("dragover", function (e){
                e.preventDefault();
}, false);

document.addEventListener("dragenter", function (e){
                e.preventDefault();
}, false);

document.addEventListener("dragleave", function (e){
                e.preventDefault();
}, false);
document.addEventListener("drop", function (e){
                e.preventDefault();
}, false);

try
{
	var CSLibrary = new CSInterface();
}
catch(err) {
    console.log(err.message);
}

function SendEvent(type, buttonName) {
                var buttonEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
                var dataMap = {
                                "Type" : "ButtonClickEvent",
                                "Data" : 
                                {
                                                "Button" : buttonName,
                                                "UniqueID" : type + buttonName
                                }
                };
                buttonEvent.data = JSON.stringify(dataMap);
                CSLibrary.dispatchEvent(buttonEvent);
                console.log (buttonEvent.data);
}

function ResizeLearnPanel(width, height)
{
	var resize_event = new CSEvent("OnBoardingEvent", "APPLICATION");
	var resizeDataMap = {
					 		"Type" : "ResizeLearnPanel",
					 		"Data" : {"Width" : width, "Height" : height}
						};
	resize_event.data = JSON.stringify(resizeDataMap);
	CSLibrary.dispatchEvent(resize_event);
}
