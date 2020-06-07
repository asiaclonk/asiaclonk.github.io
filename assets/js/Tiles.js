//---
//layout: blank
//---

$(document).ready(function () {
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
    get TilesetLocation() {
      var rect = $("#selectionGrid")[0].getBoundingClientRect();
      return {
        x: this.WindowLocation.x - rect.left,
        y: this.WindowLocation.y - rect.top
      };
    },
    get TilesetTile() {
      return {
        x: Math.floor(mouseData.TilesetLocation.x / _tileWidth),
        y: Math.floor(mouseData.TilesetLocation.y / _tileHeight)
      };
    },
    PreviousTilesetTile: { x: 0, y: 0 },

    // Drag info
    WindowDragStart: { x: 0, y: 0 },
    get NoDrag() { return this.WindowDrag.x == 0 && this.WindowDrag.y == 0; },
    get WindowDrag() {
      return this.IsLeftClick && GetToolMode() != 1 ?
        {
          x: this.WindowLocation.x - this.WindowDragStart.x,
          y: this.WindowLocation.y - this.WindowDragStart.y
        }
        : { x: 0, y: 0 };
    },

    // Map drag info
    CanvasDragStart: { x: 0, y: 0 },
    get CanvasDragStartTile() {
      return {
        x: Math.floor((this.CanvasDragStart.x + mapData.TileOffset.x) / _tileWidth),
        y: Math.floor((this.CanvasDragStart.y + mapData.TileOffset.y) / _tileHeight)
      };
    },

    // Map info
    get CanvasLocation() {
      var rect = $("#mapSelectionGrid")[0].getBoundingClientRect();
      return {
        x: this.WindowLocation.x - rect.left,
        y: this.WindowLocation.y - rect.top
      };
    },
    get CanvasTile() {
      return {
        x: Math.floor((this.CanvasLocation.x + mapData.TileOffset.x) / _tileWidth),
        y: Math.floor((this.CanvasLocation.y + mapData.TileOffset.y) / _tileHeight)
      };
    },
    PreviousCanvasTile: { x: 0, y: 0 },
  }

  // Map & Tileset
  mapData = {

    // From the tileset
    SelectedTilesetTile: { x: 0, y: 0 },

    // Ingame map info
    MapWidth: 0,  // Will be set on load
    MapHeight: 0, // Will be set on load

    // Top left location info
    CurrentLocation: { x: 0, y: 0 },
    get DraggedLocation() {
      return {
        x: this.CurrentLocation.x - mouseData.WindowDrag.x,
        y: this.CurrentLocation.y - mouseData.WindowDrag.y
      }
    },

    get CurrentTile() {
      return {
        x: Math.floor(this.CurrentLocation.x / _tileWidth),
        y: Math.floor(this.CurrentLocation.y / _tileHeight)
      };
    },
    get DraggedTile() {
      return {
        x: Math.floor(this.DraggedLocation.x / _tileWidth),
        y: Math.floor(this.DraggedLocation.y / _tileHeight)
      };
    },

    get TileOffset() {
      return {
        x: Mod(this.map.x, _tileWidth),
        y: Mod(this.map.y, _tileHeight)
      };
    },

    // Moused tile info
    get MousedLocation() {
      return {
        x: this.CurrentLocation.x + mouseData.CanvasLocation.x,
        y: this.CurrentLocation.y + mouseData.CanvasLocation.y
      };
    },
    get MousedTile() {
      return {
        x: Math.floor(this.MousedLocation.x / _tileWidth),
        y: Math.floor(this.MousedLocation.y / _tileHeight)
      };
    },

    // Drag info
    get DragStart() {
      return {
        x: this.CurrentLocation.x + mouseData.CanvasDragStart.x,
        y: this.CurrentLocation.y + mouseData.CanvasDragStart.y
      };
    },
    get DragStartTile() {
      return {
        x: Math.floor(this.DragStart.x / _tileWidth),
        y: Math.floor(this.DragStart.y / _tileHeight)
      };
    },
  };

  // Tileset canvas
  selectionTilesetCanvas = $("#selectionGrid")[0];
  selectionTilesetContext = selectionTilesetCanvas.getContext("2d");

  // Map canvas
  $("#mapArea").resizable();
  $(".wrapper").css("max-width", "100%");
  $("section").css("max-width", "100%");

  backGroundContext = $("#backGround")[0].getContext("2d", { alpha: false });
  worldMapContext = $("#worldMap")[0].getContext("2d");
  mapSelectionContext = $("#mapSelectionGrid")[0].getContext("2d");

  // Caches
  tileCache = {};
  tileCacheGreen = {};
  tileCacheRed = {};

  // Draw background on load
  backgroundImage = new Image(512, 32);
  backgroundImage.onload = function () {
    backGroundContext.beginPath();
    backGroundContext.fillStyle = backGroundContext.createPattern(backgroundImage, "repeat");
    backGroundContext.rect(0, 0, mapData.MapWidth, mapData.MapHeight);
    backGroundContext.fill();
  };
  backgroundImage.src = "assets/images/tilebackground.png";

  // Sounds
  // #debug sounds = {{ site.data.sounds | jsonify }};

  // Radiobuttons for tool mode
  keyMode = 0;
  toolMode = 0;
  toolModeButtons = [
    $("#radiomove"),
    $("#radiotile"),
    $("#radiocopy")
  ];
  toolModeButtons[0].click(function () { toolMode = 0; });
  toolModeButtons[1].click(function () { toolMode = 1; });
  toolModeButtons[2].click(function () { toolMode = 2; });

  // Radiobuttons for placement mode
  placementMode = 0;
  placementModeButtons = [
    $("#radiodeny"),
    $("#radioempty"),
    $("#radioreplace")
  ];

  if (CheckCookie("placementMode")) {
    placementMode = parseInt(GetCookie("placementMode"));
    placementModeButtons[placementMode].prop("checked", true);
  }

  placementModeButtons[0].click(function () { placementMode = 0; SetCookie("placementMode", placementMode, 730); });
  placementModeButtons[1].click(function () { placementMode = 1; SetCookie("placementMode", placementMode, 730); });
  placementModeButtons[2].click(function () { placementMode = 2; SetCookie("placementMode", placementMode, 730); });

  // Update mouse position and check mapsize
  $(document).mousemove(function (e) {
    // Resize check
    var newwidth = Math.floor($("#mapArea").width());
    var newheight = Math.floor($("#mapArea").height());
    if (newwidth != mapData.MapWidth || newheight != mapData.MapHeight) {
      // Resize area and redraw everything
      mapData.MapWidth = newwidth;
      mapData.MapHeight = newheight;
      $("#backGround")[0].width = newwidth;
      $("#worldMap")[0].width = newwidth;
      $("#mapSelectionGrid")[0].width = newwidth;
      $("#backGround")[0].height = newheight;
      $("#worldMap")[0].height = newheight;
      $("#mapSelectionGrid")[0].height = newheight;
      backGroundContext.beginPath();
      backGroundContext.fillStyle = backGroundContext.createPattern(backgroundImage, "repeat");
      backGroundContext.rect(0, 0, newwidth, newheight);
      backGroundContext.fill();
      DrawMap();
    }

    // Now for the main event: update mouse
    if (typeof e !== "undefined") {
      mouseData.WindowLocation = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    }
  });

  /********************
   * Tileset functions
   ********************/

  $("#selectionGrid").mousemove(function () {
    // Update tileset draw if selection changed
    if (mouseData.TilesetTile != mouseData.PreviousTilesetTile) {
      DrawTilesetSelection(mouseData.TilesetTile);
    }

    // Update mousedata
    mouseData.PreviousTilesetTile.x = mouseData.TilesetTile.x;
    mouseData.PreviousTilesetTile.y = mouseData.TilesetTile.y;
  });

  $("#selectionGrid").click(function () {
    // Set the new active tile
    SetSelectedTilesetTile();
    DrawTilesetSelection(mapData.SelectedTilesetTile);
    PlaySound(6);
  });

  $("#selectionGrid").mouseleave(DrawTilesetSelection());

  /***************
   * Map functions
   ***************/

  $("#mapSelectionGrid").mousedown(function (e) {
    // Update button
    mouseData.ClickMode = e.button;

    // Leftclick?
    if (mouseData.IsLeftClick) {
      // Start drag
      StartMouseDrag();

      // Is it the placement tool?
      if (GetToolMode() == 1) {

        // Got anything in your clipboard?
        if (clipboard.length > 0) {
          // Tile your entire inventory
          PlaceClipboard();
        }
        else {
          // Start to tile the map as a brush
          var result = PlaceTile(mapData.MousedTile, mapData.SelectedTilesetTile);
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
    // Middleclick instead?
    if (mouseData.IsMiddleClick) {
      // Copy tile selection, no scroller
      Pincette(mapData.MousedTile);
      e.preventDefault();
    }
    // Or fancy a rightclick?
    if (mouseData.IsRightClick) {
      // Remove tile
      var result = PlaceTile(mapData.MousedTile);
      if (result !== false) {
        $("#exporttext").val(JSON.stringify(tileList));
        PlaySound(getgroup(result.tx, result.ty).remove);
      }
    }
  });

  $("#mapSelectionGrid").contextmenu(function (e) {
    // No context menu
    e.preventDefault();
  });

  $("#mapSelectionGrid").mousemove(function () {
    writeCoordText(mapData.MousedTile);
    // A leftclick?
    if (mouseData.IsLeftClick) {
      // Dragging the map?
      if (GetToolMode() == 0) {
        // Make the cursor look busy
        $("#mapSelectionGrid").css("cursor", "move");

        // Redraw everything
        backGroundContext.setTransform(1, 0, 0, 1, -mapData.map.x % 512,
          -mapData.map.y % 32);
        backGroundContext.fill();
        DrawMap();
        DrawMapSelection();
        writeCoordText(mapData.DragStartTile);
      }
      // Or placing down some things? Only if on a new tile though
      else if (GetToolMode() == 1 && mouseData.CanvasTile != mouseData.PreviousCanvasTile) {
        // Got a clipboard to paste?
        if (clipboard.length > 0) {
          PlaceClipboard();
        }
        // Else brush with one tile
        else {
          var result = PlaceTile(mapData.MousedTile, mapData.SelectedTilesetTile);
          if (result !== false) {
            $("#exporttext").val(JSON.stringify(tileList));
            PlaySound(getgroup(result.tx, result.ty).build);
            DrawMap();
          }
        }
      }
    }
    // Something other than a leftclick then?
    else {
      // Copy the pointed at tile with a middleclick
      if (mouseData.IsMiddleClick) {
        Pincette(mapData.MousedTile);
      }
      // Or remove it with a rightclick
      else if (mouseData.IsRightClick) {
        var result = PlaceTile(mapData.MousedTile);
        if (result !== false) {
          $("#exporttext").val(JSON.stringify(tileList));
          PlaySound(getgroup(result.tx, result.ty).remove);
        }
      }
    }

    // Redraw the tile preview if moved a tile
    if (mouseData.CanvasTile != mouseData.PreviousCanvasTile) {
      DrawMapSelection(mouseData.CanvasTile);
    }

    // Update mousedata
    mouseData.PreviousCanvasTile.x = mouseData.CanvasTile.x;
    mouseData.PreviousCanvasTile.y = mouseData.CanvasTile.y;
  });
  $("#mapSelectionGrid").mouseleave(function () {
    DrawMapSelection();
    writeCoordText();
  });
  $("#mapSelectionGrid").mouseup(function (e) {
    // Finished with a leftclick?
    if (mouseData.IsLeftClick) {
      // No movement detected?
      if (mouseData.NoDrag) {
        // Place clipboard if in a mode where dragging doesn't place stuff
        if (clipboard.length > 0 && (GetToolMode() == 0 || GetToolMode() == 2)) {
          // Place the clipboard
          PlaceClipboard();
        }
        else if (GetToolMode() == 0) {
          // Place down one tile
          var result = PlaceTile(mapData.MousedTile, mapData.SelectedTilesetTile);
          if (result !== false) {
            $("#exporttext").val(JSON.stringify(tileList));
            PlaySound(getgroup(result.tx, result.ty).build);
          }
          else {
            PlaySound(soundsEnum.ERROR);
          }
        }
      }
      // So there is movement. How bold
      else {
        // Let the cursor rest if the map was moved
        if (GetToolMode() == 0) {
          $("#mapSelectionGrid").css("cursor", "default");
        }

        // A range of tiles was selected? Save that
        else if (GetToolMode() == 2) {
          var selectionWidth = Math.abs(mapData.MousedTile.x - mapData.DragStartTile.x);
          var selectionHeight = Math.abs(mapData.MousedTile.y - mapData.DragStartTile.y);
          var clipCenterX = Math.floor(selectionWidth / 2);
          var clipCenterY = Math.floor(selectionHeight / 2);
          var topLeftX = Math.min(mapData.DragStartTile.x, mapData.MousedTile.x);
          var topLeftY = Math.min(mapData.DragStartTile.y, mapData.MousedTile.y);
          var filtered = tileList.filter((tileData) =>
            tileData.x >= topLeftX && tileData.x <= topLeftX + selectionWidth &&
            tileData.y >= topLeftY && tileData.y <= topLeftY + selectionHeight);
          clipboard = _.cloneDeep(filtered);
          clipboard.forEach((clipData) => {
            clipData.x = clipData.x - topLeftX - clipCenterX;
            clipData.y = clipData.y - topLeftY - clipCenterY;
          });

          // Enable trashcan when successful
          if (clipboard.length > 0) {
            $("#clipclearer").button("option", "disabled", false);
          }
          else {
            $("#clipclearer").button("option", "disabled", true);
          }
        }
      }
    }

    // I guess nothing happens if it wasn't a leftclick
    FinishMouseDrag();
    backGroundContext.setTransform(1, 0, 0, 1, -mapData.map.x % 512, -mapData.map.y % 32);
    backGroundContext.fill();
    DrawMap();
    DrawMapSelection(mouseData.CanvasTile);
  });
  $("#mapSelectionGrid")[0].addEventListener("wheel", function (e) {
    //Select next tile
    var delta = Math.sign(e.deltaY);
    var group = getgroup(mapData.SelectedTilesetTile.x, mapData.SelectedTilesetTile.y, delta);
    mapData.SelectedTilesetTile.x = group.x;
    mapData.SelectedTilesetTile.y = (mapData.SelectedTilesetTile.y % group.count) + group.y;
    DrawTilesetSelection();
    DrawMapSelection(mouseData.CanvasTile);
    PlaySound(soundsEnum.GUI_SWITCH);
    e.preventDefault();
  });

  $(document).keydown(function (e) {
    //Quick select tilemode
    if (e.which == 16) {
      keyMode = 1;
      setRadioButtons(1);
    }
    if (e.which == 17) {
      keyMode = 2;
      setRadioButtons(2);
    }
    if (e.which == 82) {
      //Or rotate tile
      var group = tileSet.find((tileData) => mapData.SelectedTilesetTile.x == tileData.x &&
        mapData.SelectedTilesetTile.y >= tileData.y &&
        mapData.SelectedTilesetTile.y < tileData.y + tileData.count);
      if (typeof group !== "undefined") {
        mapData.SelectedTilesetTile.y = ((mapData.SelectedTilesetTile.y - group.y + 1) % group.count) + group.y;
        DrawTilesetSelection();
        DrawMapSelection(mouseData.CanvasTile);
      }
    }
  });

  $(document).keyup(function (e) {
    // Finish quick select
    if (e.which == 16) {
      keyMode = 0;
      setRadioButtons();
    }
    if (e.which == 17) {
      keyMode = 0;
      setRadioButtons();
    }
  });

  $("#clipclearer").button({ icon: "ui-icon-trash" });
  $("#clipclearer").click(function () {
    // Clear clipboard
    $("#clipclearer").button("option", "disabled", true);
    clipboard = [];
  });

  $("#importbutton").button({ icon: "ui-icon-pencil" });
  $("#importbutton").click(function () {
    // Load map
    var importtiles = JSON.parse($("#importtext").val());
    tileList = importtiles;
    DrawMap();
  });
  $("#copybutton").button({ icon: "ui-icon-clipboard" });
  $("#copybutton").click(function () {
    // Export map
    $("#exporttext")[0].select();
    document.execCommand("copy");
  });

  $(document).click(function () {
    // Welcome
    PlaySound(8);
    $(document).unbind("click");
  });

  DrawTilesetSelection();
});

/**
 * Save the given tile to the tilelist under the given worldmap tile coordinates.
 * 
 * @param {Object} mapTileCoordinate The mapData tile location on where to save the tile. Or delete, whatever suits you.
 * @param {Object} tilesetTile The selected tile from the tileset to be placed. If left empty, will erase the saved tile instead.
 * @returns Added/Removed tile when successful, false otherwise
 */
function PlaceTile(mapTileCoordinate, tilesetTile = false) {
  var selectedtile = tileList.find((tile) => tile.x == mapTileCoordinate.x &&
    tile.y == mapTileCoordinate.y);
  // Already a tile on the position?
  if (typeof selectedtile !== "undefined") {
    if (tilesetTile === false || tilesetTile.x == 0) {
      // No tile given? Clear it
      var index = tileList.indexOf(selectedtile);
      return tileList.splice(index, 1)[0];
    }
    else if (placementMode == 2 && tilesetTile.x != selectedtile.tx || tilesetTile.y != selectedtile.ty) {
      // Or replace, if allowed
      selectedtile.tx = tilesetTile.x;
      selectedtile.ty = tilesetTile.y;
      return selectedtile;
    }
  }
  // Else place down a new tile, as long as it isn't the empty tile
  else if (tilesetTile !== false && tilesetTile.x != 0) {
    var newTile = { x: tilesetTile.x, y: tilesetTile.y, x: mapTileCoordinate.x, y: mapTileCoordinate.y };
    tileList.push(newTile);
    return newTile;
  }

  return false;
}

function PlaceClipboard() {
  //Check tiles
  var collision = clipboard.some((clipData) => tileList.some((tileData) =>
    tileData.x == mapData.MousedTile.x + clipData.x &&
    tileData.y == mapData.MousedTile.y + clipData.y &&
    (tileData.tx != clipData.tx || tileData.ty != clipData.ty)))
  if (placementMode == 0 && collision) {
    //Deny placement
    if (GetToolMode() != 1) {
      PlaySound(3);
    }
  }
  else {
    //Place down your clipboard
    var confirm = false;
    clipboard.forEach((clipData) => {
      var result = PlaceTile({
        x: mapData.MousedTile.x + clipData.x,
        y: mapData.MousedTile.y + clipData.y
      },
        { x: clipData.tx, y: clipData.ty });
      if (result !== false) {
        confirm = true;
      }
    });

    if (confirm) {
      $("#exporttext").val(JSON.stringify(tileList));
      PlaySound(2);
      DrawMap();
    }
    else {
      if (GetToolMode() != 1) {
        PlaySound(3);
      }
    }
  }
}

function Pincette(map_tile) {
  var selectedtile = tileList.find((tileData) => tileData.x == map_tile.x && tileData.y == map_tile.y);
  if (typeof selectedtile !== "undefined") {
    if (mapData.SelectedTilesetTile.x != selectedtile.tx || mapData.SelectedTilesetTile.y != selectedtile.ty) {
      mapData.SelectedTilesetTile.x = selectedtile.tx;
      mapData.SelectedTilesetTile.y = selectedtile.ty;
      DrawTilesetSelection();
      PlaySound(7);
    }
  }
}

function DrawTilesetSelection(tile = false) {
  selectionTilesetContext.clearRect(0, 0, selectionTilesetCanvas.width, selectionTilesetCanvas.height);
  if (tile !== false) {
    selectionTilesetContext.beginPath();
    selectionTilesetContext.strokeStyle = "yellow";
    selectionTilesetContext.rect(tile.x * _tileWidth, tile.y * _tileHeight,
      _tileWidth, _tileHeight);
    selectionTilesetContext.stroke();
  }
  selectionTilesetContext.beginPath();
  selectionTilesetContext.strokeStyle = "lightgreen";
  selectionTilesetContext.rect(mapData.SelectedTilesetTile.x * _tileWidth,
    mapData.SelectedTilesetTile.y * _tileHeight,
    _tileWidth, _tileHeight);
  selectionTilesetContext.stroke();
}

function DrawMapSelection(map_tile = false) {
  mapSelectionContext.clearRect(0, 0, mapData.MapWidth, mapData.MapHeight);
  if (map_tile !== false) {
    if (GetToolMode() == 2 && mouseData.IsLeftClick) {
      //Draw the copy selection
      var selectionWidth = Math.abs(mouseData.CanvasTile.x - mouseData.CanvasDragStartTile.x);
      var selectionHeight = Math.abs(mouseData.CanvasTile.y - mouseData.CanvasDragStartTile.y);
      var topLeftX = Math.min(mouseData.CanvasTile.x, mouseData.CanvasDragStartTile.x);
      var topLeftY = Math.min(mouseData.CanvasTile.y, mouseData.CanvasDragStartTile.y);
      mapSelectionContext.beginPath();
      mapSelectionContext.strokeStyle = "lightgreen";
      mapSelectionContext.rect(topLeftX * _tileWidth - mapData.TileOffset.x,
        topLeftY * _tileHeight - mapData.TileOffset.y,
        (selectionWidth + 1) * _tileWidth, (selectionHeight + 1) * _tileHeight);
      mapSelectionContext.stroke();
    }
    else if (clipboard.length > 0) {
      //Draw the copied selection
      clipboard.forEach((clipData) => {
        drawOneHoverTile((map_tile.x + clipData.x), (map_tile.y + clipData.y), clipData.tx, clipData.ty);
      });
    }
    else {
      //Or just draw one tile if not in copy mode
      if (GetToolMode() != 2) {
        drawOneHoverTile(map_tile.x, map_tile.y, mapData.SelectedTilesetTile.x, mapData.SelectedTilesetTile.y);
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
    mapSelectionContext.drawImage(
      tilesImage, tx * _tileWidth, ty * _tileHeight,
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

    mapSelectionContext.fillStyle = color;
    mapSelectionContext.globalAlpha = 0.4;
    mapSelectionContext.globalCompositeOperation = "source-atop";
    mapSelectionContext.fillRect(x * _tileWidth - mapData.TileOffset.x,
      y * _tileHeight - mapData.TileOffset.y,
      _tileWidth, _tileHeight);
    //Finish
    mapSelectionContext.globalAlpha = 1;
    mapSelectionContext.globalCompositeOperation = "source-over";
  }

  mapSelectionContext.beginPath();
  mapSelectionContext.strokeStyle = "yellow";
  mapSelectionContext.rect(x * _tileWidth - mapData.TileOffset.x,
    y * _tileHeight - mapData.TileOffset.y,
    _tileWidth, _tileHeight);
  mapSelectionContext.stroke();
}

function DrawMap() {
  //Get tiles in range
  worldMapContext.clearRect(0, 0, mapData.MapWidth, mapData.MapHeight);
  var tilestodraw = tileList.filter((tileData) =>
    tileData.x >= mapData.CurrentTile.x && tileData.y >= mapData.CurrentTile.y &&
    tileData.x <= mapData.CurrentTile.x + Math.floor(mapData.MapWidth / _tileWidth) + 1 &&
    tileData.y <= mapData.CurrentTile.y + Math.floor(mapData.MapHeight / _tileHeight) + 1
  );

  //Draw tiles, TODO: use cached images
  tilestodraw.forEach((tileData) => {
    worldMapContext.drawImage(
      tilesImage, tileData.tx * _tileWidth, tileData.ty * _tileHeight,
      _tileWidth, _tileHeight,
      (tileData.x - mapData.CurrentTile.x) * _tileWidth - mapData.TileOffset.x,
      (tileData.y - mapData.CurrentTile.y) * _tileHeight - mapData.TileOffset.y,
      _tileWidth, _tileHeight);
  });
}

function setRadioButtons(mode = 0) {
  var realmode = mode == 0 ? toolMode : mode;
  toolModeButtons[realmode].prop("checked", true);
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
    var id = tileSet.find((tileData) => tileData.x == x && y >= tileData.y && y < tileData.y + tileData.count).id;

    return tileSet.find((tileData) => tileData.id == Mod(id + delta, tileSet.length));
  }
  else {
    return tileSet.find((tileData) => tileData.x == x && y >= tileData.y && y < tileData.y + tileData.count);
  }
}

/**
 * Plays the sound file indicated by the given index. Plays sound 0 by default.
 * Use soundsEnum to select.
 * 
 * @param {Number} index The index of the sound to play.
 */
function PlaySound(index = 0) {
  var sound = new Audio();
  // Prepare sound functions, then load the sound
  sound.addEventListener("canplaythrough", function () {
    sound.addEventListener("ended", function () {
      sound = null;
    });
    sound.volume = 0.25;
    sound.play();
  });
  sound.src = sounds[index].sound;
}

/**
 * Sets the starting points for dragging calculations.
 */
function StartMouseDrag() {
  mouseData.WindowDragStart.x = mouseData.WindowLocation.x;
  mouseData.WindowDragStart.y = mouseData.WindowLocation.y;
  mouseData.CanvasDragStart.x = mouseData.CanvasLocation.x;
  mouseData.CanvasDragStart.y = mouseData.CanvasLocation.y;
}

/**
 * Resets the mouse dragging data and moves the map if it was a map drag.
 */
function FinishMouseDrag() {
  // Update the resting map location if it was a map drag
  if (mouseData.IsLeftClick && GetToolMode() == 0) {
    mapData.CurrentLocation.x -= mouseData.WindowDrag.x;
    mapData.CurrentLocation.y -= mouseData.WindowDrag.x;
  }

  // Reset variables
  mouseData.ClickMode = -1;
  mouseData.WindowDragStart.x = 0;
  mouseData.WindowDragStart.y = 0;
  mouseData.CanvasDragStart.x = 0;
  mouseData.CanvasDragStart.y = 0;
}

/**
 * Sets the currently selected tile from the tileset.
 */
function SetSelectedTilesetTile() {
  mapData.selectedTile.x = mouseData.TilesetTile.x
  mapData.selectedTile.y = mouseData.TilesetTile.y
}

/**
 * Converts the strings representing integers in a dictionary into actual integers.
 * 
 * @param {{}} dictionary The dictionary containing the strings.
 */
function Intify(dictionary) {
  dictionary.forEach((pair) => {
    Object.keys(pair).forEach((key) => {
      pair[key] = parseInt(pair[key]);
    });
  });
}

/**
 * Returns the current tool functionality to be used. Dependent on keyboard keys being held.
 */
function GetToolMode() {
  return keyMode ? keyMode : toolMode;
}

/**
 * Obtains the remaining integer of n when divided by m
 * 
 * @param {Number} n The number to be divided.
 * @param {Number} m The number that divides.
 */
function Mod(n, m) {
  return Math.floor(((n % m) + m) % m);
}

/**
 * Contains the index entries for sound files.
 */
const soundsEnum = {
  'BUILD_SMALL': 0,
  'BUILD_MEDIUM': 1,
  'BUILD_LARGE': 2,
  'DECON_SMALL': 3,
  'DECON_MEDIUM': 4,
  'DECON_LARGE': 5,
  'ERROR': 6,
  'GUI_CLICK': 7,
  'GUI_SWITCH': 8,
  'MAIN_THEME': 9
}