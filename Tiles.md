---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

# For a certain Factorio fan.

<p style="text-align: center;">
  This thing is still incomplete and will break.
  Shift: Tile
  Ctrl: Copy
  Mousemiddle: Select
  Mousewheel: Switch
  Right: Deconstruct
</p>
<br>
<p style="text-align: center;">Tiles</p>
<script src="assets/js/Tiles.js"></script>
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