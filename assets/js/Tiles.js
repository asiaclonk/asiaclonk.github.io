function drawselection() {
	selectcontext.beginPath();
	selectcontext.strokeStyle = 'green';
	selectcontext.rect(selectedx * dim, selectedy * dim, dim, dim);
	selectcontext.stroke();
}

function drawmap() {
	tilecontext.clearRect(0, 0, mapdim, mapdim);
	var xmap = Math.floor(xmappix / 32);
	var xmapmax = Math.floor((xmappix + 640) / 32);
	var ymap = ymappix / 32;
	var ymapmax = Math.floor((ymappix + 640) / 32);
	var tilestodraw = tilelist.filter(value => value.mapx >= xmap && value.mapx <= xmapmax && value.mapy >= ymap && value.mapy <= ymapmax);
	tilestodraw.forEach(function(tile) {
		tilecontext.drawImage(tiles, tile.tilex * 32, tile.tiley * 32, dim, dim, (tile.mapx - xmap) * 32 - (xmap % 32), (tile.mapy - ymap) * 32 - (ymap % 32), dim, dim);
	})
}

$(document).ready(function() {
	tilelist = [];
	dim = 32;
	selectedx = 0;
	selectedy = 0;
	xmappix = 0;
	ymappix = 0;
	dragx = 0;
	dragy = 0;
	mapclick = false;
	isdragging = false;
	tiles = document.getElementById("tiles");
	backgroundtiles = document.getElementById("backgroundtiles");
	
	selectcanvas = document.getElementById("selectmap");
	selectcontext = selectcanvas.getContext("2d");
	mapdim = 640;
	backcontext = backcanvas.getContext("2d");
	tilecontext = tilecontext.getContext("2d");
	drawcontext = drawcontext.getContext("2d");

	$("#selectmap").mouseover(function(e) {
		var hoverx = Math.floor(e.clientX / dim);
		var hovery = Math.floor(e.clientY / dim);
		selectcontext.clearRect(0, 0, selectcanvas.width, selectcanvas.height);
		selectcontext.beginPath();
		selectcontext.strokeStyle = 'red';
		selectcontext.rect(hoverx * dim, hovery * dim, dim, dim);
		selectcontext.stroke();
		drawselection();
	});
	
	$("#selectmap").click(function(e) {
		selectedx = Math.floor(e.clientX / dim);
		selectedy = Math.floor(e.clientY / dim);
		drawselection();
	});
	
	$("#backgroundtiles").on("load", function() {
		backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
		backcontext.fillRect(0, 0, mapdim, mapdim);
	});
	
	$("#foreground").mousedown(function(e) {
		dragx = e.clientX;
		dragy = e.clientY;
		mapclick = true;
	});
	
	$("#foreground").mousemove(function(e) {
		if (mapclick == true) {
			backcontext.setTransform(xmappix + (e.clientX - dragx) % 512, ymappix + (e.clientY - dragy) % 32);
			drawmap();
		}
	});
	
	$("#foreground").mouseup(function(e) {
		if (dragx == e.clientX && dragy == e.clientY) {
			var selectedmapx = Math.floor((xmappix + e.clientX) / 32);
			var selectedmapy = Math.floor((ymappix + e.clientY) / 32);
			if (selectedx == 0 && selectedy == 0) {
				tilelist = tilelist.filter(value => value.mapx != selectedmapx || value.mapy != selectedmapy);
			}
			else {
				tilelist.push({ tilex: selectedx, tiley: selectedy, mapx: selectedmapx, mapy: selectedmapy });
			}
			drawmap();
		}
		mapclick = false;
		xmappix += (e.clientX - dragx);
		ymappix += (e.clientY - dragy);
		dragx = 0;
		dragy = 0;
	});
}