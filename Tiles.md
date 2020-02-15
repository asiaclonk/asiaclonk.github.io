---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

# For a certain Factorio fan

<br>
<p style="text-align: center;">Tiles</p>
<script src="assets/js/Tiles.js"></script>
<div style="width: 100%">
  <div style="position: relative; width: 384px; height: 64px; margin: auto;">
    <image id="tiles" src="assets/images/tiles.png" class="backgroundimage"></image>
    <canvas id="selectmap" class="foregroundimage" width="384" height="64"></canvas>
  </div>
</div>
<br>
<p style="text-align: center;" id="coordtext">Map</p>
<div style="width: 100%; overflow: auto">
  <div style="position: relative; width: 640px; height: 640px; margin: auto;">
    <image id="backgroundtiles" src="assets/images/tilebackground.png" style="width: 512; height: 32; display: none;"></image>
    <canvas id="background" class="backgroundimage" width="640" height="640"></canvas>
    <canvas id="tilemap" class="foregroundimage" width="640" height="640"></canvas>
    <canvas id="foreground" class="forestgroundimage" width="640" height="640"></canvas>
  </div>
</div>
