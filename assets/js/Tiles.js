$(document).ready(function() {
  tilelist = [];
  dim = 32;
  selectedx = 0;
  selectedy = 0;
  xmappix = 0;
  ymappix = 0;
  startx = 0;
  starty = 0;
  dragx = 0;
  starty = 0;
  mapclick = false;
  isdragging = false;
  tiles = document.getElementById("tiles");
  backgroundtiles = document.getElementById("backgroundtiles");

  selectcanvas = document.getElementById("selectmap");
  selectcontext = selectcanvas.getContext("2d");
  mapdim = 640;
  backcontext = document.getElementById("background").getContext("2d");
  tilecontext = document.getElementById("tilemap").getContext("2d");
  drawcontext = document.getElementById("foreground").getContext("2d");
  
  $("#selectmap").mousemove(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    var hoverx = Math.floor(x / dim);
    var hovery = Math.floor(y / dim);
    drawselection(hoverx, hovery);
  });

  $("#selectmap").click(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    selectedx = Math.floor(x / dim);
    selectedy = Math.floor(y / dim);
    drawselection(selectedx, selectedy);
  });

  $("#backgroundtiles").on("load", function() {
    backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
    backcontext.fillRect(0, 0, mapdim, mapdim);
  });

  $("#foreground").mousedown(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    startx = x;
    starty = y;
    mapclick = true;
  });

  $("#foreground").mousemove(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    if (mapclick == true) {
	  var dragx = startx - x;
	  var dragy = starty - y;
      var selectedmapx = Math.floor((xmappix + dragx + x) / 32);
      var selectedmapy = Math.floor((ymappix + dragy + y) / 32);
      backcontext.setTransform(0,0,0,0, (xmappix + dragx) % 512,
                                        (ymappix + dragy) % 32);
      drawmap();
	  $("#coordtext").html("Map (X: " + selectedmapx + ", Y: " + selectedmapy + "), Dragging... (X: " + dragx + ", Y: " + dragy + ")");
    }
	else {
      var selectedmapx = Math.floor((xmappix + x) / 32);
      var selectedmapy = Math.floor((ymappix + y) / 32);
      $("#coordtext").html("Map (X: " + selectedmapx + ", Y: " + selectedmapy + ") Idle");
	}
  });
  
  $("#foreground").mouseleave(function(e) {
	  $("#coordtext").html("Map");
  });

  $("#foreground").mouseup(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    if (startx == x && starty == y) {
      var selectedmapx = Math.floor((xmappix + x) / 32);
      var selectedmapy = Math.floor((ymappix + y) / 32);
      if (selectedx == 0 && selectedy == 0) {
        tilelist = tilelist.filter((value) => value.mapx != selectedmapx || value.mapy != selectedmapy );
      }
      else {
        tilelist.push({ tilex: selectedx, tiley: selectedy, mapx: selectedmapx, mapy: selectedmapy });
      }
      drawmap();
    }
    mapclick = false;
    xmappix += dragx;
    ymappix += dragy;
    startx = 0;
    starty = 0;
	dragx = 0;
	dragy = 0;
  });
});

function drawselection(x, y) {
  selectcontext.clearRect(0, 0, selectcanvas.width, selectcanvas.height);
  selectcontext.beginPath();
  selectcontext.strokeStyle = "yellow";
  selectcontext.rect(x * dim, y * dim, dim, dim);
  selectcontext.stroke();
  selectcontext.beginPath();
  selectcontext.strokeStyle = "lightgreen";
  selectcontext.rect(selectedx * dim, selectedy * dim, dim, dim);
  selectcontext.stroke();
}

function drawmap() {
  tilecontext.clearRect(0, 0, mapdim, mapdim);
  var xmap = Math.floor(xmappix / 32);
  var xmapmax = Math.floor((xmappix + 640) / 32);
  var ymap = ymappix / 32;
  var ymapmax = Math.floor((ymappix + 640) / 32);
  var tilestodraw = tilelist.filter((value) => value.mapx >= xmap &&
                                               value.mapx <= xmapmax &&
                                               value.mapy >= ymap &&
                                               value.mapy <= ymapmax
  );
  tilestodraw.forEach(function(tile) {
    tilecontext.drawImage(tiles, tile.tilex * 32, tile.tiley * 32, dim, dim,
                         (tile.mapx - xmap) * 32 - (xmap % 32),
                         (tile.mapy - ymap) * 32 - (ymap % 32), dim, dim);
  });
}