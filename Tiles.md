---
title: Tilemap Editor
description: Something to quickly tile a map with.
---

# For a certain Factorio fan

<br>
Tiles
<script src="assets/js/Tiles.js"></script>
<div style="width: 100%">
	<div style="position: relative; width: 384px; height: 64px; margin: auto;">
		<image id="tiles" src="assets/images/tiles.png" class="backgroundimage"></image>
		<canvas id="selectmap" class="foregroundimage"></canvas>
	</div>
</div>
<br>
Map
<div style="width: 100%; overflow: auto">
	<div style="position: relative; width: 640px; height: 640px; margin: auto;">
		<image id="backgroundtiles" src="assets/images/tilebackground.png" style="display: none;"></image>
		<canvas id="background" class="backgroundimage"></canvas>
		<canvas id="tilemap" class="foregroundimage"></canvas>
		<canvas id="foreground" class="forestgroundimage"></canvas>
	</div>
</div>
