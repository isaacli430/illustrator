function first()
{
	var stepEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
	var dataMap = {
					"Type" : "ShowIAM",
					"Data" : "LearnPanelStep1"
				};
	stepEvent.data = JSON.stringify(dataMap);
	CSLibrary.dispatchEvent(stepEvent);
	console.log (stepEvent.data);

	document.getElementById('gate').style.display = "none";
	document.getElementById('start').style.display = "none";
	document.getElementById('first').style.display = "block";
	document.getElementById('second').style.display = "none";
	document.getElementById('third').style.display = "none";
	document.getElementById('fourth').style.display = "none";
	document.getElementById('fifth').style.display = "none";
	document.getElementById("prev").style.opacity = "1";
	document.getElementById("next").style.opacity = "1";
	document.getElementById("next").innerHTML = "Next";
	document.getElementById("prev").onclick = function() {CreateAnIcon()};
	document.getElementById("next").onclick = function() {second()};
}

function second()
{
	var stepEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
	var dataMap = {
					"Type" : "ShowIAM",
					"Data" : "LearnPanelStep2"
				};
	stepEvent.data = JSON.stringify(dataMap);
	CSLibrary.dispatchEvent(stepEvent);
	console.log (stepEvent.data);

	document.getElementById('gate').style.display = "none";
	document.getElementById('first').style.display = "none";
	document.getElementById('second').style.display = "block";
	document.getElementById('third').style.display = "none";
	document.getElementById('fourth').style.display = "none";
	document.getElementById('fifth').style.display = "none";
	document.getElementById("prev").style.opacity = "1";
	document.getElementById("prev").style.cursor = "pointer";
	document.getElementById("next").innerHTML = "Next";
	document.getElementById("prev").onclick = function() {first()};
	document.getElementById("next").onclick = function() {third()};
}

function third()
{
	var stepEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
	var dataMap = {
					"Type" : "ShowIAM",
					"Data" : "LearnPanelStep3"
				};
	stepEvent.data = JSON.stringify(dataMap);
	CSLibrary.dispatchEvent(stepEvent);
	console.log (stepEvent.data);

	document.getElementById('gate').style.display = "none";
	document.getElementById('first').style.display = "none";
	document.getElementById('second').style.display = "none";
	document.getElementById('third').style.display = "block";
	document.getElementById('fourth').style.display = "none";
	document.getElementById('fifth').style.display = "none";
	document.getElementById("next").innerHTML = "Next";
	document.getElementById("prev").onclick = function() {second()};
	document.getElementById("next").onclick = function() {fourth()};
}

function fourth()
{
	var stepEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
	var dataMap = {
					"Type" : "ShowIAM",
					"Data" : "LearnPanelStep4"
				};
	stepEvent.data = JSON.stringify(dataMap);
	CSLibrary.dispatchEvent(stepEvent);
	console.log (stepEvent.data);

	document.getElementById('gate').style.display = "none";
	document.getElementById('first').style.display = "none";
	document.getElementById('second').style.display = "none";
	document.getElementById('third').style.display = "none";
	document.getElementById('fourth').style.display = "block";
	document.getElementById('fifth').style.display = "none";
	document.getElementById("next").style.opacity = "1";
	document.getElementById("next").style.cursor = "pointer";
	document.getElementById("next").innerHTML = "Next";
	document.getElementById("prev").onclick = function() {third()};
	document.getElementById("next").onclick = function() {fifth()};
}

function fifth()
{
	var stepEvent = new CSEvent("OnBoardingEvent", "APPLICATION");
	var dataMap = {
					"Type" : "ShowIAM",
					"Data" : "LearnPanelEnd"
				};
	stepEvent.data = JSON.stringify(dataMap);
	CSLibrary.dispatchEvent(stepEvent);
	console.log (stepEvent.data);

	document.getElementById('gate').style.display = "none";
	document.getElementById('first').style.display = "none";
	document.getElementById('second').style.display = "none";
	document.getElementById('third').style.display = "none";
	document.getElementById('fourth').style.display = "none";
	document.getElementById('fifth').style.display = "block";
	document.getElementById("next").innerHTML = "Done";
	document.getElementById("prev").onclick = function() {fourth()};
	document.getElementById("next").onclick = function() {Projects()};
}