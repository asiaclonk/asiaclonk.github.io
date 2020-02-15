---
title: Tilemap Editor
description: Something to quickly tile a map with.
published: false
---

# For a certain Factorio fan

<script src="assets/js/Tiles.js"></script>
<div style="text-align: center; width: 384px; height: 64px">
	<image id="tiles" src="assets/images/tiles.png" class="backgroundimage"></image>
	<canvas id="selectmap" class="foregroundimage"></canvas>
</div>

<div style="width: 100%; height: 700px; overflow: auto">
	<div style="width: 640px; height: 640px; margin: 20px auto;">
		<image id="backgroundtiles" src="assets/images/tilebackground.png" style="display: none;"></image>
		<canvas id="background" class="backgroundimage"></canvas>
		<canvas id="tilemap" class="foregroundimage"></canvas>
		<canvas id="foreground" class="forestgroundimage"></canvas>
	</div>
</div>
