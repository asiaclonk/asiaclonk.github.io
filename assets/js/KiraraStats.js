---
layout: blank
---

$(document).ready(function() {
	$("#button1").click(function() {
		var json = {{ site.data.KirafanDB | jsonify }}
		var fivestar = json.filter(value => value["rarity"] == 5 && value["series"] != "")
		var series = [...new Set(fivestar.map(value => return value["series"] }))]
		var cards = series.map(seriesname => return fivestar.filter(value => value["series"] == seriesname).length)
		var weapons = series.map(seriesname => return fivestar.filter(value => value["series"] == seriesname && value["skill name en"] != "").length)
		var evos = series.map(seriesname => return fivestar.filter(value => value["series"] == seriesname && value["skill evo name en"] != "").length)
		var data = {
		  labels: series,
		  datasets: [{
			label: "Evo 4",
			backgroundColor: '#FFA500BB',
			data: evos,
			yAxisID: "evoaxis",
		  }, {
			label: "Weapons",
			backgroundColor: '#ADD8E6BB',
			data: weapons,
			yAxisID: "weaponaxis",
		  }, {
			label: "Cards",
			backgroundColor: '#4682B4BB',
			data: cards,
			yAxisID: "cardaxis",
		  }]
		};

		var options = {
		  title: {
			display: true,
			text: '5* release state distribution'
		  },
		  scales: {
			xAxes: [{
			  ticks: {
				beginAtZero: true
			  },
			  stacked: false
			}],
			yAxes: [{
			  id: "cardaxis",
			  stacked: true,
			}, {
			  id: "weaponaxis",
			  stacked: true,
			  display: false,
			  offset: true,
			  type: "category",
			  categoryPercentage: 0.8,
			  barPercentage: 0.9,
			}, {
			  id: "evoaxis",
			  stacked: true,
			  display: false,
			  offset: true,
			  type: "category",
			  categoryPercentage: 0.8,
			  barPercentage: 0.9,
			}]
		  }
		};

		var ctx = document.getElementById("myChart").getContext("2d");
		var myBarChart = new Chart(ctx, {
		  type: 'horizontalBar',
		  data: data,
		  options: options,
		});
	});
})