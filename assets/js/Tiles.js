$(document).ready(function() {
	tileh = 32
	tilew = 32
	selectedx = 0;
	selectedy = 0;

	$("#selectmap").mouseover(function() {
		var tilescontext = document.getElementById("selectmap").getContext("2d");
		var relativex = 0;
		var relativey = 0;
		tilescontext.drawImage($("#tiles"));
	})
}