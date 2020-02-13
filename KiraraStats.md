---
title: Kirara Fantasia Charts
description: Some charts that reference a snapshot from the Mirahaze wiki.
---

# Some charts that reference a snapshot from [the Mirahaze wiki.](https://kirarafantasia.miraheze.org/wiki/Main_Page)
Last updated: 10.02.2020

<script src="assets/js/KiraraStats.js"></script>
<div style="text-align:center">
	<label for="chartselect">Select Chart</label>
	<select id="chartselect">
		<option value="0" selected="selected">5* Release State</option>
		<option value="1">Rarities</option>
		<option value="2">5* Elements</option>
		<option value="3">5* Classes</option>
		<option value="4">5* Class/Attribute</option>
	</select>
</div>
<div id="chartarea" class="ui-widget-content" style="width: 100%; height: 600px; margin: 10px auto; border-bottom: 5px solid #FFCC00;">
	<canvas id="myChart"></canvas>
</div>
<div style="text-align:center">
	<button id="chartplus">+</button>
	<button id="chartminus">-</button>
</div>