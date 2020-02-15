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
  dragy = 0;
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
    drawselection(hoverx, hovery, true);
  });

  $("#selectmap").click(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    selectedx = Math.floor(x / dim);
    selectedy = Math.floor(y / dim);
    drawselection(selectedx, selectedy, true);
  });
  
  $("#selectmap").mouseleave(function(e) {
    drawselection(0, 0, false);
  });

  backgroundtiles = new Image(512,32);
  backgroundtiles.onload = function() {
    backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
    backcontext.rect(0, 0, mapdim, mapdim);
	backcontext.fill();
  };
  backgroundtiles.src = "assets/images/tilebackground.png";

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
	  dragx = x - startx;
	  dragy = y - starty;
      var selectedmapx = Math.floor((xmappix + x + dragx) / dim);
      var selectedmapy = Math.floor((ymappix + y + dragy) / dim);
      backcontext.setTransform(1,0,0,1, (dragx - xmappix) % 512,
                                        (dragy - ymappix) % 32);
	  backcontext.fill();
      drawmap();
	  $("#coordtext").html("Map (X: " + selectedmapx + ", Y: " + selectedmapy + "), Offset: (X: " + Math.floor((xmappix - dragx) / dim) + ", Y: " + Math.floor((ymappix - dragy) / dim)+ ")");
    }
	else {
      var selectedmapx = Math.floor((xmappix + x) / dim);
      var selectedmapy = Math.floor((ymappix + y) / dim);
      $("#coordtext").html("Map (X: " + selectedmapx + ", Y: " + selectedmapy + "), Offset: (X: " + Math.floor(xmappix / dim) + ", Y: " + Math.floor(ymappix / dim) + ")");
	}
  });
  
  $("#foreground").mouseleave(function(e) {
	  $("#coordtext").html("Offset: (X: " + Math.floor(xmappix / dim) + ", Y: " + Math.floor(ymappix / dim) + ")");
  });

  $("#foreground").mouseup(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    if (startx == x && starty == y) {
      var selectedmapx = Math.floor((xmappix + x) / dim);
      var selectedmapy = Math.floor((ymappix + y) / dim);
      if (selectedx == 0 && selectedy == 0) {
        tilelist = tilelist.filter((value) => value.mapx != selectedmapx || value.mapy != selectedmapy );
      }
      else {
        tilelist.push({ tilex: selectedx, tiley: selectedy, mapx: selectedmapx, mapy: selectedmapy });
      }
      drawmap();
    }
    mapclick = false;
    xmappix -= dragx;
    ymappix -= dragy;
    startx = 0;
    starty = 0;
	dragx = 0;
	dragy = 0;
  });
  
  drawselection(selectedx, selectedy);
});

function drawselection(x, y, draw) {
  selectcontext.clearRect(0, 0, selectcanvas.width, selectcanvas.height);
  if(draw) {
    selectcontext.beginPath();
    selectcontext.strokeStyle = "yellow";
    selectcontext.rect(x * dim, y * dim, dim, dim);
    selectcontext.stroke();
  }
  selectcontext.beginPath();
  selectcontext.strokeStyle = "lightgreen";
  selectcontext.rect(selectedx * dim, selectedy * dim, dim, dim);
  selectcontext.stroke();
}

function drawmap() {
  tilecontext.clearRect(0, 0, mapdim, mapdim);
  var xmap = Math.floor((xmappix - dragx) / dim);
  var xmapmax = Math.floor(((xmappix - dragx + mapdim)) / dim);
  var ymap = Math.floor((ymappix - dragy) / dim);
  var ymapmax = Math.floor(((ymappix - dragy + mapdim)) / dim);
  var tilestodraw = tilelist.filter((value) => value.mapx >= xmap &&
                                               value.mapx <= xmapmax &&
                                               value.mapy >= ymap &&
                                               value.mapy <= ymapmax
  );
  tilestodraw.forEach(function(tile) {
    tilecontext.drawImage(tiles, tile.tilex * dim, tile.tiley * dim, dim, dim,
                         (tile.mapx - xmap) * dim - mod(xmappix - dragx, dim),
                         (tile.mapy - ymap) * dim - mod(ymappix - dragy, dim), dim, dim);
  });
}

function mod(n, m) {
  return ((n % m) + m) % m;
}