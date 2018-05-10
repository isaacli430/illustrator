var CSLibrary = new CSInterface();

function InformClientAboutPopupHeight(eventType) {
    var rsp_event = new CSEvent("ImageCropOnBoardingEvent", "APPLICATION");
    var jsonObj = {
        "Data": (document.documentElement.offsetHeight).toString(), 
        "Type": eventType,
    };
    rsp_event.data = JSON.stringify(jsonObj);
    CSLibrary.dispatchEvent(rsp_event);
}