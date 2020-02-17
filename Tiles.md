---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

# For a certain Factorio fan.
This thing is still incomplete and will break.

<br>
<p style="text-align: center;">Tiles</p>
<script src="assets/js/Tiles.js"></script>
<div style="display: flex;">
  <div style="position: relative; width: 384px; height: 128px; display: inline-block; margin: auto;">
    <image id="tiles" src="assets/images/tiles.png" class="backgroundimage" width="384" height="128"></image>
    <canvas id="selectmap" class="foregroundimage" width="384" height="128"></canvas>
  </div>
  <fieldset class="ui-widget-content ui-corner-all" style="width: 60px; display: inline-block; margin: auto;">
    <legend>Mode</legend>
    <label for="radiomove">Move</label>
    <input type="radio" name="mode" id="radiomove">
    <label for="radiomove">Tile</label>
    <input type="radio" name="mode" id="radiotile">
    <label for="radiomove">Copy</label>
    <input type="radio" name="mode" id="radiocopy">
  </fieldset>
</div>
<br>
<p style="text-align: center;" id="coordtext">Map</p>
<div style="position: relative; max-width: 100%; height: 640px; margin: auto;">
  <canvas id="background" class="backgroundimage" max-width="100%" width="640" height="640"></canvas>
  <canvas id="tilemap" class="foregroundimage" max-width="100%" width="640" height="640"></canvas>
  <canvas id="foreground" class="forestgroundimage" max-width="100%" width="640" height="640"></canvas>
</div>
