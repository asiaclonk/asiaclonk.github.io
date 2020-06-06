//---
//layout: blank
//---

$(document).ready(function() {

  // Tiledata
  // #debug tileSet = {{ site.data.tiles | jsonify }};
  Intify(tileSet);
  tileList = [];
  clipboard = [];

  // Constants
  const _tileWidth = 32;
  const _tileHeight = 32;
  const _backGroundWidth = 512;
  const _backGroundHeight = 32;
  const _tileDataCount = tileSet.count;

  // Mouse 
  mouseData = {
    WindowLocation: { x: 0, y: 0 },
    ClickMode: -1,

    // Button info
    get IsLeftClick() { return ![-1, 1, 2].some((n) => n == this.ClickMode) },
    get IsMiddleClick() { return this.ClickMode == 1 },
    get IsRightClick() { return this.ClickMode == 2 },

    // Tileset info
    get TileSetLocation() { var rect = $("#selectionGrid")[0].getBoundingClientRect();
                   return { x: this.WindowLocation.x - rect.left,
                            y: this.WindowLocation.y - rect.top }; },
    get TileSetTile() { return { x: Math.floor(mouseData.TileSetLocation.x / _tileWidth),
                                 y: Math.floor(mouseData.TileSetLocation.y / _tileHeight) }; },
  
    // Drag info
    WindowDragStart: { x: 0, y: 0 },
    get NoDrag() { return this.WindowDrag.x == 0 && this.WindowDrag.y == 0; },
    get WindowDrag() { return this.IsLeftClick && GetPlacementMode() != 1 ?
                         { x: this.WindowLocation.x - this.WindowDragStart.x,
                           y: this.WindowLocation.y - this.WindowDragStart.y }
                       : { x: 0, y: 0 }; },

    // Map drag info
    CanvasDragStart: { x: 0, y: 0 },
    get CanvasDragStartTile() { return { x: Math.floor((this.CanvasDragStart.x + mapData.TileOffset.x) / _tileWidth),
                                         y: Math.floor((this.CanvasDragStart.y + mapData.TileOffset.y) / _tileHeight) }; },

    // Map info
    get CanvasLocation() { var rect = $("#foreground")[0].getBoundingClientRect();
                  return { x: this.WindowLocation.x - rect.left,
                           y: this.WindowLocation.y - rect.top }; },
    get CanvasTile() { return { x: Math.floor((this.CanvasLocation.x + mapData.TileOffset.x) / _tileWidth),
                                y: Math.floor((this.CanvasLocation.y + mapData.TileOffset.y) / _tileHeight) }; },
  }

  // Map & Tileset
  mapData = {

    // From the tileset
    SelectedTileSetTile: { x: 0, y: 0 },

    // Ingame map info
    MapWidth: 0,  // Will be set on load
    MapHeight: 0, // Will be set on load

    // Top left location info
    CurrentLocation: { x: 0, y: 0 },
    get DraggedLocation() { return { x: this.CurrentLocation.x - mouseData.WindowDrag.x,
                                     y: this.CurrentLocation.y - mouseData.WindowDrag.y } },

    get CurrentTile() { return { x: Math.floor(this.CurrentLocation.x / _tileWidth),
                                 y: Math.floor(this.CurrentLocation.y / _tileHeight) }; },
    get DraggedTile() { return { x: Math.floor(this.DraggedLocation.x / _tileWidth),
                                 y: Math.floor(this.DraggedLocation.y / _tileHeight) }; },

    get TileOffset() { return { x: Mod(this.map.x, _tileWidth),
                                y: Mod(this.map.y, _tileHeight) }; },

    // Moused tile info
    get MousedLocation() { return { x: this.CurrentLocation.x + mouseData.CanvasLocation.x,
                                    y: this.CurrentLocation.y + mouseData.CanvasLocation.y }; },
    get MousedTile() { return { x: Math.floor(this.MousedLocation.x / _tileWidth),
                                y: Math.floor(this.MousedLocation.y / _tileHeight) }; },

    // Drag info
    get DragStart() { return { x: this.CurrentLocation.x + mouseData.CanvasDragStart.x,
                               y: this.CurrentLocation.y + mouseData.CanvasDragStart.y }; },
    get DragStartTile() { return { x: Math.floor(this.DragStart.x / _tileWidth),
                                   y: Math.floor(this.DragStart.y / _tileHeight) }; },
  };

  //Tileset canvas
  tileSetCanvas = $("#tileSet")[0];
  tileSetContext = tileSetCanvas.getContext("2d");
  selectionTileSetCanvas = $("#selectionGrid")[0];
  selectionTileSetContext = selectionTileSetCanvas.getContext("2d");

  //Map canvas and size settings
  $("#map").resizable();
  $(".wrapper").css("max-width", "100%");
  $("section").css("max-width", "100%");
  if (checkCookie("MapWidth") && checkCookie("MapHeight")) {
    $("#map").width(parseInt(getCookie("MapWidth")));
    $("#map").height(parseInt(getCookie("MapHeight")));
  }
  backcontext = $("#backGround")[0].getContext("2d", { alpha: false });
  mapcontext = $("#worldMap")[0].getContext("2d");
  mapselectionTileSetContext = $("#foreground")[0].getContext("2d");

  //Prepare toolbox on load
  tiles = new Image()
  tilecache = [];
  tiles.onload = function() {
    $("#worldMap")[0].width = _tileDataCount * _tileWidth;
    $("#selectionGrid")[0].width = _tileDataCount * _tileWidth;
    for (let i = 0; i < _tileDataCount; i++) {
      let columncache = [];
      for (let j = 0; j < getgroup().count; j++) {
        let cacheblock = createCanvas(32, 32);
        let cachecontext = cacheblock.getContext("2d");
        cachecontext.drawImage(
        tiles, i * _tileWidth, j * _tileHeight,
        _tileWidth, _tileHeight, 0, 0,
        _tileWidth, _tileHeight);
        columncache.push(cacheblock);
      }
    tilecache.push(columncache);
    }
  }

  //Draw background on load
  backgroundtiles = new Image(512,32);
  backgroundtiles.onload = function() {
    backcontext.beginPath();
    backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
    backcontext.rect(0, 0, mapData.MapWidth, mapData.MapHeight);
    backcontext.fill();
  };
  backgroundtiles.src = "assets/images/tilebackground.png";

  //Sounds
  // #debug sounds = {{ site.data.sounds | jsonify }};

  //Radiobuttons for tilemodes
  selectedmode = 0;
  keymode = 0;
  moderadios = [
    $("#radiomove"),
    $("#radiotile"),
    $("#radiocopy")
  ];
  moderadios[0].click(function() { selectedmode = 0; });
  moderadios[1].click(function() { selectedmode = 1; });
  moderadios[2].click(function() { selectedmode = 2; });
  placemode = 0;
  placeradios = [
    $("#radiodeny"),
    $("#radioempty"),
    $("#radioreplace")
  ];
  if (checkCookie("placemode")) {
    placemode = parseInt(getCookie("placemode"));
    placeradios[placemode].prop("checked", true);
  }

  placeradios[0].click(function() { placemode = 0; setCookie("placemode", placemode, 730); });
  placeradios[1].click(function() { placemode = 1; setCookie("placemode", placemode, 730); });
  placeradios[2].click(function() { placemode = 2; setCookie("placemode", placemode, 730); });

  //Update mouse position and check mapsize
  $(document).mousemove(function(e) {
    //Resize check
    var newwidth = Math.floor($("#map").width());
    var newheight = Math.floor($("#map").height());
    if (newwidth != mapData.MapWidth || newheight != mapData.MapHeight) {
      setCookie("MapWidth", newwidth, 730);
      setCookie("MapHeight", newheight, 730);
      mapData.MapWidth = newwidth;
      mapData.MapHeight = newheight;
      $("#backGround")[0].width = newwidth;
      $("#worldMap")[0].width = newwidth;
      $("#foreground")[0].width = newwidth;
      $("#backGround")[0].height = newheight;
      $("#worldMap")[0].height = newheight;
      $("#foreground")[0].height = newheight;
      backcontext.beginPath();
      backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
      backcontext.rect(0, 0, newwidth, newheight);
      backcontext.fill();
      drawMap();
    }

    //Update mouse
    if (typeof e !== "undefined") {
      mouseData.WindowLocation = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    }
  })

  // Tileset functions
  $("#selectionGrid").mousemove(function() {
    drawselection(mouseData.TileSetTile);
  });

  $("#selectionGrid").click(function() {
    mapData.setactive = true;
    drawselection(mapData.SelectedTileSetTile);
    PlaySound(6);
  });
  $("#selectionGrid").mouseleave(drawselection());

  // Mouse functions
  $("#foreground").mousedown(function(e) {
    // Update button
    mouseData.mode = e.button;

    if (mouseData.IsLeftClick) {
      //Start drag
      mapData.start = true;
      if (GetPlacementMode() == 1) {
        if (clipboard.length > 0) {
          //Tile your entire inventory
          placeclipboard();
        }
        else {
          //Tile the map
          var result = placetile(mapData.MousedTile, mapData.SelectedTileSetTile);
          if (result !== false) {
            $("#exporttext").val(JSON.stringify(tileList));
            PlaySound(getgroup(result.tx, result.ty).build);
          }
          else {
            PlaySound(3);
          }
        }
      }
    }
    if (mouseData.IsMiddleClick) {
      //Copy tile selection, no scroller
      Pincette(mapData.MousedTile);
      e.preventDefault();
    }
    if (mouseData.IsRightClick) {
      //Remove tile
      var result = placetile(mapData.MousedTile);
      if (result !== false) {
        $("#exporttext").val(JSON.stringify(tileList));
        PlaySound(getgroup(result.tx, result.ty).remove);
      }
    }
  });
  $("#foreground").contextmenu(function(e) {
    //No context menu
    e.preventDefault();
  });
  $("#foreground").mousemove(function() {
    writeCoordText(mapData.MousedTile);
    if (mouseData.IsLeftClick) {
      if (GetPlacementMode() == 0) {
        //Drag map
        $("#foreground").css("cursor", "move");
        //Draw background
        backcontext.setTransform(1,0,0,1, -mapData.map.x % 512,
                                          -mapData.map.y % 32);
        backcontext.fill();
        drawMap();
        drawmapselection();
        writeCoordText(mapData.DragStartTile);
      }
      else {
        drawmapselection(mouseData.CanvasTile);
        if (GetPlacementMode() == 1) {
          if (clipboard.length > 0) {
            //Tile your entire inventory
            placeclipboard();
          }
          else {
            //Tile the map
            var result = placetile(mapData.MousedTile, mapData.SelectedTileSetTile);
            if (result !== false) {
              $("#exporttext").val(JSON.stringify(tileList));
              PlaySound(getgroup(result.tx, result.ty).build);
              drawMap();
            }
          }
        }
      }
    }
    else {
      drawmapselection(mouseData.CanvasTile);
      if (mouseData.IsMiddleClick) {
        //Copy tile selection
        Pincette(mapData.MousedTile);
      }
      else if (mouseData.IsRightClick) {
        //Remove tiles
        var result = placetile(mapData.MousedTile);
        if (result !== false) {
          $("#exporttext").val(JSON.stringify(tileList));
          PlaySound(getgroup(result.tx, result.ty).remove);
        }
      }
    }
  });
  $("#foreground").mouseleave(function() {
    drawmapselection();
    writeCoordText();
  });
  $("#foreground").mouseup(function(e) {
    if (mouseData.IsLeftClick) {
      if (mouseData.NoDrag) {
        if (clipboard.length > 0 && (GetPlacementMode() == 0 || GetPlacementMode() == 2)) {
          //Place the clipboard
          placeclipboard();
        }
        else if (GetPlacementMode() == 0) {
          //Place down tile
          var result = placetile(mapData.MousedTile, mapData.SelectedTileSetTile);
          if (result !== false) {
            $("#exporttext").val(JSON.stringify(tileList));
            PlaySound(getgroup(result.tx, result.ty).build);
          }
          else {
            PlaySound(3);
          }
        }
      }
      else {
        if (GetPlacementMode() == 0) {
          //Stop drag
          $("#foreground").css("cursor", "default");
        }
        else if (GetPlacementMode() == 2) {
          //Else copy selection
          var absx = Math.abs(mapData.MousedTile.x - mapData.DragStartTile.x);
          var absy = Math.abs(mapData.MousedTile.y - mapData.DragStartTile.y);
          var TileOffsetx = Math.floor(absx / 2);
          var TileOffsety = Math.floor(absy / 2);
          var minx = Math.min(mapData.DragStartTile.x, mapData.MousedTile.x);
          var miny = Math.min(mapData.DragStartTile.y, mapData.MousedTile.y);
          var filtered = tileList.filter((value) =>
            value.x >= minx && value.x <= minx + absx &&
            value.y >= miny && value.y <= miny + absy);
          clipboard = _.cloneDeep(filtered);
          clipboard.forEach((value) => {
            value.x = value.x - minx - TileOffsetx;
            value.y = value.y - miny - TileOffsety;
          });
          if (clipboard.length > 0) {
            $("#clipclearer").button("option", "disabled", false);
          }
          else {
            $("#clipclearer").button("option", "disabled", true);
          }
        }
      }
    }
    mapData.finish = true;
    backcontext.setTransform(1,0,0,1, -mapData.map.x % 512,
                                      -mapData.map.y % 32);
    backcontext.fill();
    drawMap();
    drawmapselection(mouseData.CanvasTile);
  });
  $("#foreground")[0].addEventListener("wheel", function (e) {
    //Select next tile
    var delta = Math.sign(e.deltaY);
    var group = getgroup(mapData.SelectedTileSetTile.x, mapData.SelectedTileSetTile.y, delta);
    mapData.SelectedTileSetTile.x = group.x;
    mapData.SelectedTileSetTile.y = (mapData.SelectedTileSetTile.y % group.count) + group.y;
    drawselection();
    drawmapselection(mouseData.CanvasTile);
    PlaySound(7);
    e.preventDefault();
  });

  $(document).keydown(function(e) {
    //Quick select tilemode
    if (e.which == 16) {
      keymode = 1;
      setRadioButtons(1);
    }
    if (e.which == 17) {
      keymode = 2;
      setRadioButtons(2);
    }
    if (e.which == 82) {
      //Or rotate tile
      var group = tileSet.find((value) => mapData.SelectedTileSetTile.x == value.x &&
                                          mapData.SelectedTileSetTile.y >= value.y &&
                                          mapData.SelectedTileSetTile.y <  value.y + value.count);
      if (typeof group !== "undefined") {
        mapData.SelectedTileSetTile.y = ((mapData.SelectedTileSetTile.y - group.y + 1) % group.count) + group.y;
        drawselection();
        drawmapselection(mouseData.CanvasTile);
      }
    }
  });

  $(document).keyup(function(e) {
    //Finish quick select
    if (e.which == 16) {
      keymode = 0;
      setRadioButtons();
    }
    if (e.which == 17) {
      keymode = 0;
      setRadioButtons();
    }
  });

  $("#clipclearer").button({ icon: "ui-icon-trash" });
  $("#clipclearer").click(function() {
    //Clear clipboard
    $("#clipclearer").button("option", "disabled", true);
    clipboard = [];
  });

  $("#importbutton").button({ icon: "ui-icon-pencil" });
  $("#importbutton").click(function() {
    //Load map
    var importtiles = JSON.parse($("#importtext").val());
    tileList = importtiles;
    drawMap();
  });
  $("#copybutton").button({ icon: "ui-icon-clipboard" });
  $("#copybutton").click(function() {
    //Export map
    $("#exporttext")[0].select();
    document.execCommand("copy");
  });

  $(document).click(function() {
    //Welcome
    PlaySound(8);
    $(document).unbind("click");
  });

  drawselection();
});

function placetile(map_location, tile = false) {
  var selectedtile = tileList.find((value) => value.x == map_location.x &&
                                              value.y == map_location.y);
  //Already a tile on the position?
  if (typeof selectedtile !== "undefined") {
    if (tile === false || tile.x == 0) {
      //No tile given? Clear it
      var index = tileList.indexOf(selectedtile);
      return tileList.splice(index, 1)[0];
    }
    else if (placemode == 2 && tile.x != selectedtile.tx || tile.y != selectedtile.ty) {
      //Or replace
      selectedtile.tx = tile.x;
      selectedtile.ty = tile.y;
      return selectedtile;
    }
  }
  else if (tile !== false && tile.x != 0) {
    //Place down a new tile
    var newtile = { x: tile.x, y: tile.y, x: map_location.x, y: map_location.y };
    tileList.push(newtile);
    return newtile;
  }
  return false;
}

function placeclipboard() {
  //Check tiles
  if (placemode == 0 && clipboard.some((value) => tileList.some((tile) =>
    tile.x == mapData.MousedTile.x + value.x && tile.y == mapData.MousedTile.y + value.y &&
    (tile.tx != value.tx || tile.ty != value.ty)))) {
      //Deny placement
      if (GetPlacementMode() != 1) {
        PlaySound(3);
      }
  }
  else {
    //Place down your clipboard
    var confirm = false;
    clipboard.forEach((value) => {
      var result = placetile({ x: mapData.MousedTile.x + value.x, y: mapData.MousedTile.y + value.y },
      { x: value.tx, y: value.ty });
      if (result !== false) {
        confirm = true;
      }
    });

    if (confirm) {
      $("#exporttext").val(JSON.stringify(tileList));
      PlaySound(2);
      drawMap();
    }
    else {
      if (GetPlacementMode() != 1) {
        PlaySound(3);
      }
    }
  }
}

function Pincette(map_tile) {
  var selectedtile = tileList.find((value) => value.x == map_tile.x && value.y == map_tile.y);
  if (typeof selectedtile !== "undefined") {
    if (mapData.SelectedTileSetTile.x != selectedtile.tx || mapData.SelectedTileSetTile.y != selectedtile.ty) {
      mapData.SelectedTileSetTile.x = selectedtile.tx;
      mapData.SelectedTileSetTile.y = selectedtile.ty;
      drawselection();
      PlaySound(7);
    }
  }
}

function drawselection(tile = false) {
  selectionTileSetContext.clearRect(0, 0, selectionTileSetCanvas.width, selectionTileSetCanvas.height);
  if(tile !== false) {
    selectionTileSetContext.beginPath();
    selectionTileSetContext.strokeStyle = "yellow";
    selectionTileSetContext.rect(tile.x * _tileWidth, tile.y * _tileHeight,
                       _tileWidth, _tileHeight);
    selectionTileSetContext.stroke();
  }
  selectionTileSetContext.beginPath();
  selectionTileSetContext.strokeStyle = "lightgreen";
  selectionTileSetContext.rect(mapData.SelectedTileSetTile.x * _tileWidth,
                     mapData.SelectedTileSetTile.y * _tileHeight,
                     _tileWidth, _tileHeight);
  selectionTileSetContext.stroke();
}

function drawmapselection(map_tile = false) {
  mapselectionTileSetContext.clearRect(0, 0, mapData.MapWidth, mapData.MapHeight);
  if(map_tile !== false) {
    if (GetPlacementMode() == 2 && mouseData.IsLeftClick) {
      //Draw the copy selection
      var absx = Math.abs(mouseData.CanvasTile.x - mouseData.CanvasDragStartTile.x);
      var absy = Math.abs(mouseData.CanvasTile.y - mouseData.CanvasDragStartTile.y);
      var minx = Math.min(mouseData.CanvasTile.x, mouseData.CanvasDragStartTile.x);
      var miny = Math.min(mouseData.CanvasTile.y, mouseData.CanvasDragStartTile.y);
      mapselectionTileSetContext.beginPath();
      mapselectionTileSetContext.strokeStyle = "lightgreen";
      mapselectionTileSetContext.rect(minx * _tileWidth - mapData.TileOffset.x,
                            miny * _tileHeight - mapData.TileOffset.y,
                            (absx + 1) * _tileWidth, (absy + 1) * _tileHeight);
      mapselectionTileSetContext.stroke();
    }
    else if (clipboard.length > 0) {
      //Draw the copied selection
      clipboard.forEach((value) => {
        drawOneHoverTile((map_tile.x + value.x), (map_tile.y + value.y), value.tx, value.ty);
      });
    }
    else {
      //Or just draw one tile if not in copy mode
      if (GetPlacementMode() != 2) {
        drawOneHoverTile(map_tile.x, map_tile.y, mapData.SelectedTileSetTile.x, mapData.SelectedTileSetTile.y);
      }
      else {
        drawOneHoverTile(map_tile.x, map_tile.y);
      }
    }
  }
}

function drawOneHoverTile(x, y, tx = false, ty = false) {

  // Draw tile preview if one is given
  if (tx !== false && ty !== false) {
    //First the icon, TODO: use cached image
    mapselectionTileSetContext.drawImage(
      tiles, tx * _tileWidth, ty * _tileHeight,
      _tileWidth, _tileHeight,
      x * _tileWidth - mapData.TileOffset.x,
      y * _tileHeight - mapData.TileOffset.y,
      _tileWidth, _tileHeight);

    //Now color
    var color = "lightgreen";
    var blocked = tileList.some((tile) =>
      tile.x == x + mapData.CurrentTile.x &&
      tile.y == y + mapData.CurrentTile.y &&
      (tile.tx != tx || tile.ty != ty));

    if (blocked) {
      color = "red";
    }

    mapselectionTileSetContext.fillStyle = color;
    mapselectionTileSetContext.globalAlpha = 0.4;
    mapselectionTileSetContext.globalCompositeOperation = "source-atop";
    mapselectionTileSetContext.fillRect(x * _tileWidth - mapData.TileOffset.x,
                              y * _tileHeight - mapData.TileOffset.y,
                              _tileWidth, _tileHeight);
    //Finish
    mapselectionTileSetContext.globalAlpha = 1;
    mapselectionTileSetContext.globalCompositeOperation = "source-over";
  }

  mapselectionTileSetContext.beginPath();
  mapselectionTileSetContext.strokeStyle = "yellow";
  mapselectionTileSetContext.rect(x * _tileWidth - mapData.TileOffset.x,
                        y * _tileHeight - mapData.TileOffset.y,
                        _tileWidth, _tileHeight);
  mapselectionTileSetContext.stroke();
}

function drawMap() {
  //Get tiles in range
  mapcontext.clearRect(0, 0, mapData.MapWidth, mapData.MapHeight);
  var tilestodraw = tileList.filter((value) =>
    value.x >= mapData.CurrentTile.x && value.y >= mapData.CurrentTile.y &&
    value.x <= mapData.CurrentTile.x + Math.floor(mapData.MapWidth / _tileWidth) + 1 &&
    value.y <= mapData.CurrentTile.y + Math.floor(mapData.MapHeight / _tileHeight) + 1
  );

  //Draw tiles, TODO: use cached images
  tilestodraw.forEach((value) => {
    mapcontext.drawImage(
      tiles, value.tx * _tileWidth, value.ty * _tileHeight,
      _tileWidth, _tileHeight,
      (value.x - mapData.CurrentTile.x) * _tileWidth - mapData.TileOffset.x,
      (value.y - mapData.CurrentTile.y) * _tileHeight - mapData.TileOffset.y,
      _tileWidth, _tileHeight);
  });
}

function setRadioButtons(mode = 0) {
  var realmode = mode == 0 ? selectedmode : mode;
  moderadios[realmode].prop("checked", true);
}

function writeCoordText(tile = false) {
  var mousetext = tile !== false ? "Selection: (X: " + tile.x + ", Y: " + tile.y + "), " : "";
  var maptext = "Map: (X: " + mapData.CurrentTile.x + ", Y: " + mapData.CurrentTile.y + ")";
  $("#coordtext").html(mousetext + maptext);
}

function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function GetGroup(x, y, delta = 0) {
  if (delta != 0) {
    var id = tileSet.find((value) => value.x == x && y >= value.y && y < value.y + value.count).id;

    return tileSet.find((value) => value.id == Mod(id + delta, tileSet.length));
  }
  else {
    return tileSet.find((value) => value.x == x && y >= value.y && y < value.y + value.count);
  }
}

function PlaySound(index = 0) {
  var sound = new Audio();
  sound.addEventListener("canplaythrough", function() {
    sound.addEventListener("ended", function() {
      sound = null;
    });
    sound.volume = 0.25;
    sound.play();
  });
  sound.src = sounds[index].sound;
}

function StartMouseDrag() {
  mouseData.WindowDragStart.x = mouseData.WindowLocation.x;
  mouseData.WindowDragStart.y = mouseData.WindowLocation.y;
  mouseData.CanvasDragStart.x = mouseData.CanvasLocation.x;
  mouseData.CanvasDragStart.y = mouseData.CanvasLocation.y;
}

function FinishMouseDrag() {
  if (mouseData.IsLeftClick && GetPlacementMode() == 0) {
    mapData.CurrentLocation.x -= mouseData.WindowDrag.x;
    mapData.CurrentLocation.y -= mouseData.WindowDrag.x;
  }

  mouseData.ClickMode = -1;
  mouseData.WindowDragStart.x = 0;
  mouseData.WindowDragStart.y = 0;
  mouseData.CanvasDragStart.x = 0;
  mouseData.CanvasDragStart.y = 0;
}

function SetSelectedTileSetTile() {
  mapData.selectedTile.x = mouseData.TileSetTile.x
  mapData.selectedTile.y = mouseData.TileSetTile.y
}

function Intify(array) {
  array.forEach((value) => {
    Object.keys(value).forEach((key) => {
      value[key] = parseInt(value[key]);
    });
  });
}

function GetPlacementMode() {
  return keymode ? keymode : selectedmode;
}

function Mod(n, m) {
  return Math.floor(((n % m) + m) % m);
}
