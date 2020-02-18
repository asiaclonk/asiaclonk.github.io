---
layout: blank
---

$(document).ready(function() {
  //Tiledata
  tileset = {{ site.data.tiles | jsonify }};
  intify(tileset);
  tilelist = [];
  clipboard = [];

  //Mouse coordinates
  coords = {
    tile_width: 32,
    tile_height: 32,
    map_width: 0,
    map_height: 0,
    map_click: -1,
    get map_leftclick() { return ![-1, 1, 2].some((n) => n == this.map_click) },
    get map_middleclick() { return this.map_click == 1 },
    get map_rightclick() { return this.map_click == 2 },
    mouse: { x: 0, y: 0 },
    canvas_start: { x: 0, y: 0 },
    undraggedmap: { x: 0, y: 0 },
    active_TILE: { x: 0, y: 0 },
    set setactive(x) {
      this.active_TILE.x = this.canvas_TILE.x;
      this.active_TILE.y = this.canvas_TILE.y;
    },
    set start(x) {
      this.canvas_start.x = this.canvas_map.x;
      this.canvas_start.y = this.canvas_map.y;
    },
    set finish(x) {
      if (this.map_leftclick && activemode() == 0) {
        this.undraggedmap.x -= this.canvas_drag.x;
        this.undraggedmap.y -= this.canvas_drag.y;
      }
      this.map_click = -1;
      this.canvas_start = { x: 0, y: 0 };
    },
    get no_drag() { return this.canvas_drag.x == 0 && this.canvas_drag.y == 0; },
    get map() { return this.map_leftclick && activemode() == 0 ?
                  { x: this.undraggedmap.x - this.canvas_drag.x,
                    y: this.undraggedmap.y - this.canvas_drag.y }
                : this.undraggedmap; },
    get MAP() { return { x: Math.floor(this.map.x / this.tile_width),
                         y: Math.floor(this.map.y / this.tile_height) }; },
    get offset() { return { x: mod(this.map.x, this.tile_width),
                            y: mod(this.map.y, this.tile_height) }; },

    get canvas_tile() { var rect = $("#selectmap")[0].getBoundingClientRect();
                        return { x: this.mouse.x - rect.left,
                                 y: this.mouse.y - rect.top }; },
    get canvas_TILE() { return { x: Math.floor(this.canvas_tile.x / this.tile_width),
                                 y: Math.floor(this.canvas_tile.y / this.tile_height) }; },

    get canvas_map() { var rect = $("#foreground")[0].getBoundingClientRect();
                       return { x: this.mouse.x - rect.left,
                                y: this.mouse.y - rect.top }; },
    get canvas_MAP() { return { x: Math.floor((this.canvas_map.x + this.offset.x) / this.tile_width),
                                  y: Math.floor((this.canvas_map.y + this.offset.y) / this.tile_height) }; },
    get true_map() { return { x: this.map.x + this.canvas_map.x,
                              y: this.map.y + this.canvas_map.y }; },
    get true_MAP() { return { x: Math.floor(this.true_map.x / this.tile_width),
                              y: Math.floor(this.true_map.y / this.tile_height) }; },

    get canvas_drag() { return this.map_leftclick && activemode() != 1 ?
                          { x: this.canvas_map.x - this.canvas_start.x,
                            y: this.canvas_map.y - this.canvas_start.y }
                          : { x: 0, y: 0 }; },
    get canvas_START() { return { x: Math.floor((this.canvas_start.x + this.offset.x) / this.tile_width),
                                    y: Math.floor((this.canvas_start.y + this.offset.y) / this.tile_height) }; },
    get true_start() { return { x: this.map.x + this.canvas_start.x,
                                y: this.map.y + this.canvas_start.y }; },
    get true_START() { return { x: Math.floor(this.true_start.x / this.tile_width),
                                y: Math.floor(this.true_start.y / this.tile_height) }; },
  };

  //Images
  tiles = $("#tiles")[0];
  backgroundtiles = $("#backgroundtiles")[0];

  //Tileset canvas
  selectcanvas = $("#selectmap")[0];
  selectcontext = selectcanvas.getContext("2d");

  //Map canvas and size settings
  $("#map").resizable();
  $(".wrapper").css("max-width", "100%");
  $("section").css("max-width", "100%");
  if(checkCookie("map_width") && checkCookie("map_height")) {
    $("#map").width(parseInt(getCookie("map_width")));
    $("#map").height(parseInt(getCookie("map_height")));
  }
  backcontext = $("#background")[0].getContext("2d");
  tilecontext = $("#tilemap")[0].getContext("2d");
  mapselectcontext = $("#foreground")[0].getContext("2d");

  //Draw background on load
  backgroundtiles = new Image(512,32);
  backgroundtiles.onload = function() {
    backcontext.beginPath();
    backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
    backcontext.rect(0, 0, coords.map_width, coords.map_height);
    backcontext.fill();
  };
  backgroundtiles.src = "assets/images/tilebackground.png";

  //Sounds
  sounds = {{ site.data.sounds | jsonify }};

  //Radiobuttons for tilemodes
  selectedmode = 0;
  keymode = 0;
  jqueryradios = [
    $("#radiomove"),
    $("#radiotile"),
    $("#radiocopy")
  ];
  jqueryradios[0].click(function() { selectedmode = 0; });
  jqueryradios[1].click(function() { selectedmode = 1; });
  jqueryradios[2].click(function() { selectedmode = 2; });
  setradios();

  //Update mouse position and check mapsize
  $(document).mousemove(function(e) {
    //Resize check
    var newwidth = $("#map").width();
    var newheight = $("#map").height();
    if (newwidth != coords.map_width || newheight != coords.map_height) {
      setCookie("map_width", newwidth, 730);
      setCookie("map_height", newheight, 730);
      coords.map_width = newwidth;
      coords.map_height = newheight;
      $("#background")[0].width = newwidth;
      $("#tilemap")[0].width = newwidth;
      $("#foreground")[0].width = newwidth;
      $("#background")[0].height = newheight;
      $("#tilemap")[0].height = newheight;
      $("#foreground")[0].height = newheight;
      backcontext.beginPath();
      backcontext.fillStyle = backcontext.createPattern(backgroundtiles, "repeat");
      backcontext.rect(0, 0, newwidth, newheight);
      backcontext.fill();
      drawmap();
    }

    //Update mouse
    if (typeof e !== "undefined") {
      coords.mouse = { x: e.clientX, y: e.clientY };
    }
  })

  //Tileset functions
  $("#selectmap").mousemove(function() {
    drawselection(coords.canvas_TILE);
  });
  $("#selectmap").click(function() {
    coords.setactive = true;
    drawselection(coords.active_TILE);
    playsound(6);
  });
  $("#selectmap").mouseleave(drawselection());

  //Map functions
  $("#foreground").mousedown(function(e) {
    //Update button
    coords.map_click = e.button;

    if (coords.map_leftclick) {
      //Start drag
      coords.start = true;
      if (activemode() == 1) {
        placetile(coords.true_MAP, coords.active_TILE);
      }
    }
    if (coords.map_middleclick) {
      //Copy tile selection, no scroller
      pincette(coords.true_MAP);
      e.preventDefault();
    }
    if (coords.map_rightclick) {
      //Remove tile
      placetile(coords.true_MAP);
    }
  });
  $("#foreground").contextmenu(function(e) {
    //No context menu
    e.preventDefault();
  });
  $("#foreground").mousemove(function() {
    writecoords(coords.true_MAP);
    if (coords.map_leftclick) {
      if (activemode() == 0) {
        //Drag map
        $("#foreground").css("cursor", "move");
        drawmap();
        drawmapselection();
        writecoords(coords.true_START);
      }
      else {
        drawmapselection(coords.canvas_MAP);
        if (activemode() == 1) {
          //Tile the map
          placetile(coords.true_MAP, coords.active_TILE);
        }
      }
    }
    else {
      drawmapselection(coords.canvas_MAP);
      if (coords.map_middleclick) {
        //Copy tile selection
        pincette(coords.true_MAP);
      }
      else if (coords.map_rightclick) {
        //Remove tiles
        placetile(coords.true_MAP);
      }
    }
  });
  $("#foreground").mouseleave(function() {
    drawmapselection();
    writecoords();
  });
  $("#foreground").mouseup(function(e) {
    if (coords.map_leftclick) {
      if (activemode() == 0) {
        //Stop drag
        $("#foreground").css("cursor", "default");
        if (coords.no_drag) {
          //If no drag took place, place down tile instead
          placetile(coords.true_MAP, coords.active_TILE);
        }
      }
      if (activemode() == 2) {
        if (coords.no_drag) {
          if (clipboard.length > 0) {
            //No drag? Place down your clipboard
            var copy = _.cloneDeep(clipboard);
            copy.forEach((value) => {
              placetile({ x: coords.true_MAP.x + value.mapx, y: coords.true_MAP.y + value.mapy },
                        { x: value.tilex, y: value.tiley });
            });
            $("#exporttext").val(JSON.stringify(tilelist));
            playsound(2);
          }
          $("#clipclearer").button("option", "disabled", true);
        }
        else {
          //Else copy selection
          var absx = Math.abs(coords.true_MAP.x - coords.true_START.x);
          var absy = Math.abs(coords.true_MAP.y - coords.true_START.y);
          var offsetx = Math.floor(absx / 2);
          var offsety = Math.floor(absy / 2);
          var minx = Math.min(coords.true_START.x, coords.true_MAP.x);
          var miny = Math.min(coords.true_START.y, coords.true_MAP.y);
          var filtered = tilelist.filter((value) =>
            value.mapx >= minx && value.mapx <= minx + absx &&
            value.mapy >= miny && value.mapy <= miny + absy);
          clipboard = _.cloneDeep(filtered);
          clipboard.forEach((value) => {
            value.mapx = value.mapx - minx - offsetx;
            value.mapy = value.mapy - miny - offsety;
          });
          if (clipboard.length > 0) {
            $("#clipclearer").button("option", "disabled", false);
          }
        }
      }
    }
    coords.finish = true;
    drawmap();
    drawmapselection(coords.canvas_MAP);
  });
  $("#foreground")[0].addEventListener("wheel", function (e) {
    //Select next tile
    var delta = Math.sign(e.deltaY);
    var group = getgroup(coords.active_TILE.x, coords.active_TILE.y, delta);
    coords.active_TILE.x = group.x;
    coords.active_TILE.y = (coords.active_TILE.y % group.count) + group.y;
    drawselection();
    drawmapselection(coords.canvas_MAP);
    playsound(7);
    e.preventDefault();
  });

  $(document).keydown(function(e) {
    //Quick select tilemode
    if (e.which == 16) {
      keymode = 1;
      setradios(1);
    }
    if (e.which == 17) {
      keymode = 2;
      setradios(2);
    }
    if (e.which == 82) {
      //Or rotate tile
      var group = tileset.find((value) => coords.active_TILE.x == value.x &&
                                          coords.active_TILE.y >= value.y &&
                                          coords.active_TILE.y <  value.y + value.count);
      if (typeof group !== "undefined") {
        coords.active_TILE.y = ((coords.active_TILE.y - group.y + 1) % group.count) + group.y;
        drawselection();
        drawmapselection(coords.canvas_MAP);
      }
    }
  });

  $(document).keyup(function(e) {
    //Finish quick select
    if (e.which == 16) {
      keymode = 0;
      setradios();
    }
    if (e.which == 17) {
      keymode = 0;
      setradios();
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
    tilelist = importtiles;
    drawmap();
  });
  $("#copybutton").button({ icon: "ui-icon-clipboard" });
  $("#copybutton").click(function() {
    //Export map
    $("#exporttext")[0].select();
    document.execCommand("copy");
  });

  $(document).click(function() {
    //Welcome
    playsound(8);
    $(document).unbind("click");
  });

  drawselection();
});

function placetile(map_tile, tile = false) {
  var selectedtile = tilelist.find((value) => value.mapx == map_tile.x &&
                                              value.mapy == map_tile.y);
  if (typeof selectedtile !== "undefined") {
    if (tile === false) {
      //No tile given? Clear it
      var index = tilelist.indexOf(selectedtile);
      tilelist.splice(index, 1);
      $("#exporttext").val(JSON.stringify(tilelist));
      playsound(getgroup(selectedtile.tilex, selectedtile.tiley).remove);
      drawmap();
    }
    else if (tile.x != selectedtile.tilex || tile.y != selectedtile.tiley) {
      //Or replace
      selectedtile.tilex = tile.x;
      selectedtile.tiley = tile.y;
      if (activemode() != 2) {
        $("#exporttext").val(JSON.stringify(tilelist));
        playsound(getgroup(tile.x, tile.y).build);
        drawmap();
      }
    }
  }
  else if (tile !== false) {
    //Place down a new tile
    tilelist.push({ tilex: tile.x, tiley: tile.y, mapx: map_tile.x, mapy: map_tile.y });
    if (activemode() != 2) {
      $("#exporttext").val(JSON.stringify(tilelist));
      playsound(getgroup(tile.x, tile.y).build);
      drawmap();
    }
  }
}

function pincette(map_tile) {
  var selectedtile = tilelist.find((value) => value.mapx == map_tile.x && value.mapy == map_tile.y);
  if (typeof selectedtile !== "undefined") {
    if (coords.active_TILE.x != selectedtile.tilex || coords.active_TILE.y != selectedtile.tiley) {
      coords.active_TILE.x = selectedtile.tilex;
      coords.active_TILE.y = selectedtile.tiley;
      drawselection();
      playsound(7);
    }
  }
}

function drawselection(tile = false) {
  selectcontext.clearRect(0, 0, selectcanvas.width, selectcanvas.height);
  if(tile !== false) {
    selectcontext.beginPath();
    selectcontext.strokeStyle = "yellow";
    selectcontext.rect(tile.x * coords.tile_width, tile.y * coords.tile_height,
                       coords.tile_width, coords.tile_height);
    selectcontext.stroke();
  }
  selectcontext.beginPath();
  selectcontext.strokeStyle = "lightgreen";
  selectcontext.rect(coords.active_TILE.x * coords.tile_width,
                     coords.active_TILE.y * coords.tile_height,
                     coords.tile_width, coords.tile_height);
  selectcontext.stroke();
}

function drawmapselection(map_tile = false) {
  mapselectcontext.clearRect(0, 0, coords.map_width, coords.map_height);
  if(map_tile !== false) {
    if (activemode() == 2 && coords.map_leftclick) {
      //Draw the copy selection
      var absx = Math.abs(coords.canvas_MAP.x - coords.canvas_START.x);
      var absy = Math.abs(coords.canvas_MAP.y - coords.canvas_START.y);
      var minx = Math.min(coords.canvas_MAP.x, coords.canvas_START.x);
      var miny = Math.min(coords.canvas_MAP.y, coords.canvas_START.y);
      mapselectcontext.beginPath();
      mapselectcontext.strokeStyle = "lightgreen";
      mapselectcontext.rect(minx * coords.tile_width - coords.offset.x,
                            miny * coords.tile_height - coords.offset.y,
                            (absx + 1) * coords.tile_width, (absy + 1) * coords.tile_height);
      mapselectcontext.stroke();
    }
    else if (activemode() == 2 && clipboard.length > 0) {
      //Draw the copied selection
      clipboard.forEach((value) => {
        mapselectcontext.drawImage(
          tiles, value.tilex * coords.tile_width, value.tiley * coords.tile_height,
          coords.tile_width, coords.tile_height,
          (map_tile.x + value.mapx) * coords.tile_width - coords.offset.x,
          (map_tile.y + value.mapy) * coords.tile_height - coords.offset.y,
          coords.tile_width, coords.tile_height);
        mapselectcontext.beginPath();
        mapselectcontext.strokeStyle = "yellow";
        mapselectcontext.rect(
          (map_tile.x + value.mapx) * coords.tile_width - coords.offset.x,
          (map_tile.y + value.mapy) * coords.tile_height - coords.offset.y,
          coords.tile_width, coords.tile_height);
        mapselectcontext.stroke();
      });
    }
    else {
      //Or just draw one tile if not in copy mode
      if (activemode() != 2) {
        mapselectcontext.drawImage(
          tiles, coords.active_TILE.x * coords.tile_width, coords.active_TILE.y * coords.tile_height,
          coords.tile_width, coords.tile_height,
          map_tile.x * coords.tile_width - coords.offset.x,
          map_tile.y * coords.tile_height - coords.offset.y,
          coords.tile_width, coords.tile_height);
      }
      mapselectcontext.beginPath();
      mapselectcontext.strokeStyle = "yellow";
      mapselectcontext.rect(map_tile.x * coords.tile_width - coords.offset.x,
                            map_tile.y * coords.tile_height - coords.offset.y,
                            coords.tile_width, coords.tile_height);
      mapselectcontext.stroke();
    }
  }
}

function drawmap() {
  //Get tiles in range
  tilecontext.clearRect(0, 0, coords.map_width, coords.map_height);
  var tilestodraw = tilelist.filter((value) =>
    value.mapx >= coords.MAP.x && value.mapy >= coords.MAP.y &&
    value.mapx <= coords.MAP.x + Math.floor(coords.map_width / coords.tile_width) &&
    value.mapy <= coords.MAP.y + Math.floor(coords.map_height / coords.tile_height)
  );

  //Draw background
  backcontext.setTransform(1,0,0,1, -coords.map.x % 512,
                                    -coords.map.y % 32);
  backcontext.fill();

  //Draw tiles
  tilestodraw.forEach((value) => {
    tilecontext.drawImage(
      tiles, value.tilex * coords.tile_width, value.tiley * coords.tile_height,
      coords.tile_width, coords.tile_height,
      (value.mapx - coords.MAP.x) * coords.tile_width - coords.offset.x,
      (value.mapy - coords.MAP.y) * coords.tile_height - coords.offset.y,
      coords.tile_width, coords.tile_height);
  });
}

function setradios(mode = 0) {
  var realmode = mode == 0 ? selectedmode : mode;
  jqueryradios[realmode].prop("checked", true);
}

function writecoords(tile = false) {
  var mousetext = tile !== false ? "Selection: (X: " + tile.x + ", Y: " + tile.y + "), " : "";
  var maptext = "Map: (X: " + coords.MAP.x + ", Y: " + coords.MAP.y + ")";
  $("#coordtext").html(mousetext + maptext);
}

function getgroup(x, y, delta = 0) {
  if (delta != 0) {
    var id = tileset.find((value) => value.x == x && y >= value.y && y < value.y + value.count).id;

    return tileset.find((value) => value.id == mod(id + delta, tileset.length));
  }
  else {
    return tileset.find((value) => value.x == x && y >= value.y && y < value.y + value.count);
  }
}

function playsound(index = 0) {
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
