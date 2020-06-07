---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

<script src="assets/js/Utilities.js"></script>
<script src="assets/js/clipboard.min.js"></script>
<script src="assets/js/lodash.min.js"></script>
<script src="assets/js/Tiles.js"></script>

# For a certain Factorio fan.
<br>

`[Shift: Tile]
[Ctrl: Copy]
[R: Rotate Selected]
[MouseMiddle: Set Selected]
[MouseWheel: Switch]
[MouseRight: Deconstruct]`

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <fieldset class="ui-widget-content ui-corner-all">
    <legend>Import</legend>
    <input type="text" class="ui-corner-all" id="importtext">
    <button id="importbutton" style="padding: 2px 5px;"></button>
  </fieldset>
  <fieldset class="ui-widget-content ui-corner-all">
    <legend>Export</legend>
    <input type="text" class="ui-corner-all" id="exporttext">
    <button id="copybutton" style="padding: 2px 5px;" data-clipboard-target="#exporttext"></button>
  </fieldset>
  <fieldset class="ui-widget-content ui-corner-all" style="margin-right: 10px;">
    <legend>Mode</legend>
    <label for="radiomove">Move</label>
    <input type="radio" name="mode" id="radiomove" checked>
    <label for="radiotile">Tile</label>
    <input type="radio" name="mode" id="radiotile">
    <label for="radiocopy">Copy</label>
    <input type="radio" name="mode" id="radiocopy">
  </fieldset>
  <fieldset class="ui-widget-content ui-corner-all">
    <legend>Replace</legend>
    <label for="radiodeny">Deny</label>
    <input type="radio" name="place" id="radiodeny" checked>
    <label for="radioempty">Empty</label>
    <input type="radio" name="place" id="radioempty">
    <label for="radioreplace">Replace</label>
    <input type="radio" name="place" id="radioreplace">
    <button id="clipclearer" style="padding: 0 15px; margin-left: 2px" disabled></button>
  </fieldset>
</div>
<br>
<p style="text-align: center;" id="coordtext">Map</p>
<div style="display: flex; justify-content: center;">
  <div id="mapArea" style="position: relative; min-width: 320px; width: 640px; height: 640px; display: flex; align-items: flex-end; overflow: hidden;">
    <div id="toolbox" class="ui-widget-content ui-corner-all" style="z-index: 30; position: absolute; min-width: 160px; width: 50%; left: 25%; height: 49px; overflow: scroll;">
      <image id="tilesetGrid" src="assets/images/tiles.png" class="backgroundimage" height="32"></image>
      <canvas id="tilesetSelectionGrid" class="foregroundimage" height="32"></canvas>
    </div>
    <canvas id="backGround" class="backgroundimage" width="100%" height="100%"></canvas>
    <canvas id="worldMap" class="foregroundimage" width="100%" height="100%"></canvas>
    <canvas id="mapSelectionGrid" class="forestgroundimage" width="100%" height="100%"></canvas>
  </div>
</div>
