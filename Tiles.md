---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

# For a certain Factorio fan

<br>
<p style="text-align: center;">Tiles</p>
<script src="assets/js/Tiles.js"></script>
<div style="width: 100%; height: 128px;">
  <div class="ui-widget-content ui-corner-all" style="position: relative; width: auto; display: inline-block">
    <image id="tiles" src="assets/images/tiles.png" class="backgroundimage"></image>
    <canvas id="selectmap" class="foregroundimage"></canvas>
  </div>
  <fieldset class="ui-widget-content ui-corner-all" style="width: 70px; display: inline-block;">
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
<div style="width: 100%; overflow: auto">
  <div style="position: relative; width: 640px; height: 640px; margin: auto;">
    <canvas id="background" class="backgroundimage" width="640" height="640"></canvas>
    <canvas id="tilemap" class="foregroundimage" width="640" height="640"></canvas>
    <canvas id="foreground" class="forestgroundimage" width="640" height="640"></canvas>
  </div>
</div>
