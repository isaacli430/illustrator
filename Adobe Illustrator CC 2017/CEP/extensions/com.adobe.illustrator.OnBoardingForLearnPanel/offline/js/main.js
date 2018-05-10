function show_button1()
{
document.getElementById('try-me-1').style.visibility="visible";
document.getElementById('one').style.borderLeft = "6pt solid #0270e8";
document.getElementById('one').style.backgroundColor = "#F8F8F8";
document.getElementById('icon').style.color = "#3F3F3F";
document.getElementById('img1').src = "images/LearnPanelIcons_01Icon_Alt.svg";
}
function hide_button1()
{
document.getElementById('try-me-1').style.visibility="hidden";
document.getElementById('one').style.borderLeft = "6pt solid transparent";
document.getElementById('one').style.backgroundColor = "#FFF";
document.getElementById('icon').style.color = "#9C9C9C";
document.getElementById('img1').src = "images/LearnPanelIcons_01Icon.svg";
}
function show_button2()
{
document.getElementById('try-me-2').style.visibility="visible";
document.getElementById('two').style.borderLeft = "6pt solid #0270e8";
document.getElementById('two').style.backgroundColor = "#F8F8F8";
document.getElementById('logo').style.color = "#3F3F3F";
document.getElementById('img2').src = "images/LearnPanelIcons_02Logo_Alt.svg";
}
function hide_button2()
{
document.getElementById('try-me-2').style.visibility="hidden";
document.getElementById('two').style.borderLeft = "6pt solid transparent";
document.getElementById('two').style.backgroundColor = "#FFF";
document.getElementById('logo').style.color = "#9C9C9C";
document.getElementById('img2').src = "images/LearnPanelIcons_02Logo.svg";
}
function show_button3()
{
document.getElementById('try-me-3').style.visibility="visible";
document.getElementById('three').style.borderLeft = "6pt solid #0270e8";
document.getElementById('three').style.backgroundColor = "#F8F8F8";
document.getElementById('trace').style.color = "#3F3F3F";
document.getElementById('img3').src = "images/LearnPanelIcons_03Trace_Alt.svg";
}
function hide_button3()
{
document.getElementById('try-me-3').style.visibility="hidden";
document.getElementById('three').style.borderLeft = "6pt solid transparent";
document.getElementById('three').style.backgroundColor = "#FFF";
document.getElementById('trace').style.color = "#9C9C9C";
document.getElementById('img3').src = "images/LearnPanelIcons_03Trace.svg";
}

function getRelativeUrlAndRedirect(relativePath){
	var parentDocument = parent.document;
	var objectelement = parentDocument.getElementsByTagName('object')[0];
	var objectElementloc = objectelement.data;
	var stack = objectElementloc.split('/');
	stack.pop();
	objectElementloc = stack.join("/");
	objectElementloc+='/';
	objectElementloc+=relativePath;
	//parent.location.href = 'create-an-icon.html';
	console.log("the location is " + objectElementloc);
	objectelement.setAttribute('data',objectElementloc);
	console.log ('Redirecting learn panel to' + relativePath);
}