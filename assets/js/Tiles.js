---
layout: blank
---

$(document).ready(function() {
  rotatabletiles = {{ site.data.tiles | jsonify }};
  intify(rotatabletiles);
  tilelist = [];
  clipboard = [];

  selectedmode = 0;
  keymode = 0;

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

  tiles = $("#tiles")[0];
  backgroundtiles = $("#backgroundtiles")[0];

  dim = 32;
  selectcanvas = $("#selectmap")[0];
  selectcontext = selectcanvas.getContext("2d");

  mapwidth = $("#foreground")[0].width;
  mapheight = 640;
  backcontext = $("#background")[0].getContext("2d");
  tilecontext = $("#tilemap")[0].getContext("2d");
  mapselectcontext = $("#foreground")[0].getContext("2d");

  sounds = {{ site.data.sounds | jsonify }};

  $("#radiomove").click(function() { selectedmode = 0; });
  $("#radiotile").click(function() { selectedmode = 1; });
  $("#radiocopy").click(function() { selectedmode = 2; });

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
    var click = new Audio();
    playsound(6);
  });

  $("#selectmap").mouseleave(function(e) {
    drawselection();
  });

  backgroundtiles = new Image(512,32);
  backgroundtiles.onload = function() {
    backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
    backcontext.rect(0, 0, mapwidth, mapheight);
    backcontext.fill();
  };
  backgroundtiles.src = "assets/images/tilebackground.png";

  $("#foreground").mousedown(function(e) {
    mapclick = true;
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    if (e.button != 1 && e.button != 2) {
      startx = x;
      starty = y;
    }
    if (e.button == 1) {
      var selectedmapx = Math.floor((xmappix + x) / dim);
      var selectedmapy = Math.floor((ymappix + y) / dim);
      pincette(selectedmapx, selectedmapy);
    }
  });

  $("#foreground").contextmenu(function(e) {
    e.preventDefault();
  });

  $("#foreground").mousemove(function(e) {
	console.log("Move: " + e.buttons);
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    var selectedmapx = Math.floor((xmappix + x) / dim);
    var selectedmapy = Math.floor((ymappix + y) / dim);
    var xmap = Math.floor(xmappix / dim);
    var ymap = Math.floor(ymappix / dim);
    drawmapselection(selectedmapx - xmap, selectedmapy - ymap);
    writecoords(selectedmapx, selectedmapy);
    if (e.button != 1 && e.button != 2) {
      if (activemode() == 0 && mapclick == true) {
        dragx = x - startx;
        dragy = y - starty;
        selectedmapx = Math.floor((xmappix + x - dragx) / dim);
        selectedmapy = Math.floor((ymappix + y - dragy) / dim);
        backcontext.setTransform(1,0,0,1, (dragx - xmappix) % 512,
                                          (dragy - ymappix) % 32);
        backcontext.fill();
        drawmap();
        drawmapselection(0, 0, false);
        writecoords(selectedmapx, selectedmapy);
      }
      else {
        if (activemode() == 1 && mapclick == true) {
          placetile(selectedmapx, selectedmapy);
        }
        if (activemode() == 2 && mapclick == true) {
          drawmapselection(selectedmapx - xmap, selectedmapy - ymap);
        }
      }
    }
    else if (e.button == 1) {
      pincette(selectedmapx, selectedmapy);
    }
    else if (e.button == 2) {
      placetile(selectedmapx, selectedmapy, true);
    }
  });

  $("#foreground").mouseleave(function(e) {
    drawmapselection(0, 0, false);
    writecoords(0, 0, false);
  });

  $("#foreground").mouseup(function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    var selectedmapx = Math.floor((xmappix + x) / dim);
    var selectedmapy = Math.floor((ymappix + y) / dim);
    var xmap = Math.floor(xmappix / dim);
    var ymap = Math.floor(ymappix / dim);
    if (e.button != 1 && e.button != 2) {
      if (activemode() == 0) {
        if (startx == x && starty == y) {
          placetile(selectedmapx, selectedmapy);
        }
        xmappix -= dragx;
        ymappix -= dragy;
      }
      if (activemode() == 2) {
        if (startx == x && starty == y) {
          clipboard.forEach((value) => {
            placetile(selectedmapx + value.mapx, selectedmapy + value.mapy, false, value.tilex, value.tiley);
          });
        }
        else {
          var startmapx = ((xmappix + startx) / dim);
          var startmapy = ((xmappix + startx) / dim);
          var absx = Math.abs(x - startmapx);
          var absy = Math.abs(y - startmapy);
          var offsetx = Math.floor(absx / 2);
          var offsety = Math.floor(absy / 2);
          clipboard = tilelist.filter((value) =>
            value.mapx >= Math.min(startmapx, selectedmapx) &&
            value.mapx <= Math.min(startmapx, selectedmapx) + absx &&
            value.mapy >= Math.min(startmapy, selectedmapy) &&
            value.mapy <= Math.min(startmapy, selectedmapy) + absy
          );
          clipboard.forEach((value) => {
            value.mapx = value.mapx - Math.min(startmapx, selectedmapx) - offsetx;
            value.mapy = value.mapy - Math.min(startmapy, selectedmapy) - offsety;
          });
        }

      }
    }

    mapclick = false;
    startx = 0;
    starty = 0;
    dragx = 0;
    dragy = 0;
    drawmapselection(selectedmapx - xmap, selectedmapy - ymap);
  });

  $(document).keydown(function(e) {
    if (e.which == 16) {
      keymode = 1;
      setradios(1);
    }
    if (e.which == 17) {
      keymode = 2;
      setradios(2);
    }
    if (e.which == 82) {
      var group = rotatabletiles.find((value) => value.x == selectedx &&
                                                 selectedy >= value.y &&
                                                 selectedy < value.y + value.count);
      if (typeof group !== "undefined") {
        selectedy = ((selectedy - group.y + 1) % group.count) + group.y;
        drawselection();
      }
    }
  });

  $(document).keyup(function(e) {
    if (e.which == 16) {
      keymode = 0;
      setradios();
    }
    if (e.which == 17) {
      keymode = 0;
      setradios();
    }
  });

  $("#foreground")[0].addEventListener("wheel", function (e) {
    var delta = Math.sign(e.deltaY);
    var group = getgroup(selectedx, selectedy, delta);
    selectedx = group.x;
    selectedy = (selectedy % group.count) + group.y;
    drawselection();
    playsound(7);
    e.preventDefault();
  });
  drawselection();
});

function placetile(x, y, clear = false, tilex = -1, tiley = -1) {
  var realtilex = tilex == -1 ? selectedx : tilex;
  var realtiley = tiley == -1 ? selectedy : tiley;
  var selectedtile = tilelist.find((value) => value.mapx == x && value.mapy == y);
  if (typeof selectedtile !== "undefined") {
    if (clear || (realtilex == 0 && realtiley == 0)) {
      var index = tilelist.indexOf((value) => value.mapx == x && value.mapy == y);
      tilelist.splice(index, 1);
      playsound(getgroup(selectedtile.tilex, selectedtile.tiley).remove);
      drawmap();
    }
    else if (realtilex != selectedtile.tilex || realtiley != selectedtile.tiley) {
      selectedtile.tilex = realtilex;
      selectedtile.tiley = realtiley;
      playsound(getgroup(realtilex, realtiley).build);
      drawmap();
    }
  }
  else if (realtilex != 0 || realtiley != 0) {
    tilelist.push({ tilex: realtilex, tiley: realtiley, mapx: x, mapy: y });
    playsound(getgroup(realtilex, realtiley).build);
    drawmap();
  }
}

function pincette(x, y) {
  var selectedtile = tilelist.find((value) => value.mapx == x && value.mapy == y);
  if (typeof selectedtile !== "undefined") {
    if (selectedx != selectedtile.tilex || selectedy != selectedtile.tiley) {
      selectedx = selectedtile.tilex;
      selectedy = selectedtile.tiley;
      drawselection();
      playsound(7);
    }
  }
}

function drawselection(x = 0, y = 0, draw = false) {
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

function drawmapselection(x, y, draw = true) {
  mapselectcontext.clearRect(0, 0, mapwidth, mapheight);
  if(draw) {
    if (activemode() == 2 && mapclick == true) {
      var startmapx = ((xmappix + startx) / dim);
      var startmapy = ((xmappix + startx) / dim);
      var absx = Math.abs(x - startmapx);
      var absy = Math.abs(y - startmapy);
      mapselectcontext.beginPath();
      mapselectcontext.strokeStyle = "lightgreen";
      mapselectcontext.rect(Math.min(x, startmapx) * dim - mod(xmappix, dim),
                            Math.min(y, startmapy) * dim - mod(ymappix, dim), absx * dim, absy * dim);
      mapselectcontext.stroke();
    }
    else if (activemode() == 2 && clipboard.length > 0) {
      mapselectcontext.beginPath();
      mapselectcontext.strokeStyle = "yellow";
      clipboard.forEach((value) => {
        mapselectcontext.rect((x + value.mapx) * dim - mod(xmappix, dim),
                              (y + value.mapy) * dim - mod(ymappix, dim), dim, dim);
      });
      mapselectcontext.stroke();
    }
    else {
      mapselectcontext.beginPath();
      mapselectcontext.strokeStyle = "yellow";
      mapselectcontext.rect(x * dim - mod(xmappix, dim),
                            y * dim - mod(ymappix, dim), dim, dim);
      mapselectcontext.stroke();
    }
  }
}

function drawmap() {
  tilecontext.clearRect(0, 0, mapwidth, mapheight);
  var xmap = Math.floor((xmappix - dragx) / dim);
  var xmapmax = Math.floor(((xmappix - dragx + mapwidth)) / dim);
  var ymap = Math.floor((ymappix - dragy) / dim);
  var ymapmax = Math.floor(((ymappix - dragy + mapheight)) / dim);
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

function setradios(mode = 0) {
  $("#radiomove").checked = mode == 0 ? 0 : selectedmode == 0;
  $("#radiotile").checked = mode == 0 ? mode == 1 : selectedmode == 1;
  $("#radiocopy").checked = mode == 0 ? mode == 2 : selectedmode == 2;
}

function writecoords(x, y, showmouse = true) {
  var offsetx = Math.floor(xmappix / dim);
  var offsety = Math.floor(ymappix / dim);
  if (showmouse) {
    if (activemode() == 0 && mapclick == true) {
      offsetx = Math.floor((xmappix - dragx) / dim);
      offsety = Math.floor((ymappix - dragy) / dim);
    }
    $("#coordtext").html("Selection: (X: " + x + ", Y: " + y + "), Map: (X: " + offsetx + ", Y: " + offsety + ")");
  }
  else {
    $("#coordtext").html("Map: (X: " + offsetx + ", Y: " + offsety + ")");
  }
}

function getgroup(x, y, delta = 0) {
  if (delta != 0) {
    var id = rotatabletiles.find((value) => value.x == x && y >= value.y && y < value.y + value.count).id;

    return rotatabletiles.find((value) => value.id == mod(id + delta, rotatabletiles.length));
  }
  else {
    return rotatabletiles.find((value) => value.x == x && y >= value.y && y < value.y + value.count);
  }
}

function playsound(index = 0) {
  var sound = new Audio();
  sound.addEventListener("canplaythrough", function() {
    sound.addEventListener("ended", function() {
      sound = null;
    });
    sound.volume = 0.3;
    sound.play();
  });
  sound.src = sounds[index].sound;
}

function intify(array) {
  array.forEach((value) => {
    Object.keys(value).forEach((key) => {
      value[key] = parseInt(value[key]);
	});
  });
}

function activemode() {
  return keymode ? keymode : selectedmode;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}