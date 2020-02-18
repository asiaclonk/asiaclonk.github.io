---
title: Kirara Fantasia Charts
description: Some charts that reference a snapshot from the Miraheze wiki.
---

<script src="assets/js/Chart.min.js"></script>
<script src="assets/js/lodash.min.js"></script>
<script src="assets/js/KiraraStats.js"></script>

# Some charts that reference a snapshot from [the Miraheze wiki.](https://kirarafantasia.miraheze.org/wiki/Main_Page)
Last updated: 10.02.2020

<div style="text-align:center">
  <label for="chartselect">Select Chart: </label>
  <select id="chartselect">
    <optgroup label="5* Cards">
      <option value="0">Release State</option>
      <option value="2">Attributes</option>
      <option value="3">Classes</option>
      <option value="4">Class/Attribute</option>
    </optgroup>
    <optgroup label="Others">
      <option value="1">Rarities</option>
    </optgroup>
  </select>
</div>
<div id="chartarea" class="ui-widget-content" style="width: 100%; min-height: 400px; height: 600px; margin: 10px auto; border-bottom: 5px solid #FFCC00;">
  <canvas id="myChart"></canvas>
</div>
<div style="text-align:center">
  <button id="chartplus"></button>
  <button id="chartminus"></button>
</div>