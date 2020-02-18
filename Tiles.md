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

<div style="display: flex; justify-content: center; margin-bottom: 5px;">
  <fieldset class="ui-widget-content ui-corner-all">
    <legend>Import</legend>
    <input type="text" id="importtext">
    <button id="importbutton">Paste</button>
  </fieldset>
  <fieldset class="ui-widget-content ui-corner-all">
    <legend>Export</legend>
    <input type="text" id="exporttext">
    <button id="copybutton" style="width: 25px; height: 25px;" data-clipboard-target="#exporttext">
      <image src="assets/images/clippy.svg" alt="Copy"></image>
    </button>
  </fieldset>
</div>
<div style="display: flex; justify-content: center;">
  <div style="position: relative; width: 384px; height: 128px; overflow: auto;">
    <image id="tiles" src="assets/images/tiles.png" class="backgroundimage" width="384" height="128" style="max-width: none;"></image>
    <canvas id="selectmap" class="foregroundimage" width="384" height="128"></canvas>
  </div>
  <fieldset class="ui-widget-content ui-corner-all" style="min-width: 60px; max-width: 60px; margin: 0 20px;">
    <legend>Mode</legend>
    <label for="radiomove">Move</label>
    <input type="radio" name="mode" id="radiomove">
    <label for="radiotile">Tile</label>
    <input type="radio" name="mode" id="radiotile">
    <label for="radiocopy">Copy</label>
    <input type="radio" name="mode" id="radiocopy">
    <button id="clipclearer" style="margin-top: 4px;" disabled>Clear</button>
  </fieldset>
</div>
<br>
<p style="text-align: center;" id="coordtext">Map</p>
<div style="display: flex; justify-content: center;">
  <div id="map" style="position: relative; width: 640px; height: 640px;">
    <canvas id="background" class="backgroundimage" width="100%" height="100%"></canvas>
    <canvas id="tilemap" class="foregroundimage" width="100%" height="100%"></canvas>
    <canvas id="foreground" class="forestgroundimage" width="100%" height="100%"></canvas>
  </div>
</div>
