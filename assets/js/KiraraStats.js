---
layout: blank
---

$(document).ready(function() {
	$("#button1").click(function() {
		var json = {{ site.data.KirafanDB | jsonify }}
		var fivestar = json.filter(value => value["rarity"] == 5 && value["series"] != "")
		var series = [...new Set(fivestar.map(value => value["series"]))]
		var objectlist = series.map(seriesname => { series: seriesname, cards: fivestar.filter(value => value["series"] == seriesname).length, weapons: fivestar.filter(value => value["series"] == seriesname && value["skill name en"] != "").length, evos: fivestar.filter(value => value["series"] == seriesname && value["skill evo name en"] != "").length })
		objectlist.sort(function(a,b) {
			return b["cards"] - a["cards"] || b["weapons"] - a["weapons"] || b["evos"] - a["evos"];
		})
		var data = {
		  labels: objectlist.map(value => value["series"]),
		  datasets: [{
			label: "Evo 4",
			backgroundColor: '#FFA500BB',
			data: objectlist.map(value => value["evos"]),
			yAxisID: "evoaxis",
		  }, {
			label: "Weapons",
			backgroundColor: '#ADD8E6BB',
			data: objectlist.map(value => value["weapons"]),
			yAxisID: "weaponaxis",
		  }, {
			label: "Cards",
			backgroundColor: '#4682B4BB',
			data: objectlist.map(value => value["cards"]),
			yAxisID: "cardaxis",
		  }]
		};

		var options = {
		  maintainAspectRatio: false,
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