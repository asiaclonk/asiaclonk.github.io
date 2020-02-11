---
layout: blank
---

$(document).ready(function() {
	Chart.defaults.global.defaultFontColor = 'lightgray';
	Chart.defaults.scale.gridLines.color = 'lightgray';
	
	$("#button1").click(function() {
		var json = {{ site.data.KirafanDB | jsonify }}
		var fivestar = json.filter(value => value["rarity"] == 5 && value["series"] != "")
		var series = [...new Set(fivestar.map(value => value["series"]))]
		var objectlist = series.map(seriesname => ({ series: seriesname,
													cards: fivestar.filter(value => value["series"] == seriesname).length,
													weapons: fivestar.filter(value => value["series"] == seriesname && value["skill name en"] != "").length,
													evos: fivestar.filter(value => value["series"] == seriesname && value["skill evo name en"] != "").length,
													}))
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
		  layout: {
			padding: {
			  left: 150
			}
		  },
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
	
		$("#button2").click(function() {
		var json = {{ site.data.KirafanDB | jsonify }}
		var cards = json.filter(value => value["series"] != "")
		var series = [...new Set(cards.map(value => value["series"]))]
		var objectlist = series.map(seriesname => ({ series: seriesname,
													five: cards.filter(value => value["series"] == seriesname && value["rarity"] == 5).length,
													four: cards.filter(value => value["series"] == seriesname && value["rarity"] == 4).length,
													three: cards.filter(value => value["series"] == seriesname && value["rarity"] == 3).length,
													}))
		objectlist.sort(function(a,b) {
			return b["five"] - a["five"] || b["four"] - a["four"] || b["three"] - a["three"];
		})
		var data = {
		  labels: objectlist.map(value => value["series"]),
		  datasets: [{
			label: "5*",
			backgroundColor: '#FFD700BB',
			data: objectlist.map(value => value["five"]),
			yAxisID: "fiveaxis",
		  }, {
			label: "4*",
			backgroundColor: '#C0C0C0BB',
			data: objectlist.map(value => value["four"]),
			yAxisID: "fouraxis",
		  }, {
			label: "3*",
			backgroundColor: '#D2691EBB',
			data: objectlist.map(value => value["three"]),
			yAxisID: "threeaxis",
		  }]
		};

		var options = {
		  maintainAspectRatio: false,
		  layout: {
			padding: {
			  left: 150
			}
		  },
		  title: {
			display: true,
			text: 'Card rarity distribution'
		  },
		  scales: {
			xAxes: [{
			  ticks: {
				beginAtZero: true
			  },
			  stacked: true
			}],
			yAxes: [{
			  id: "fiveaxis",
			  stacked: true,
			}, {
			  id: "fouraxis",
			  stacked: true,
			  display: false,
			  offset: true,
			  type: "category",
			  categoryPercentage: 0.8,
			  barPercentage: 0.9,
			}, {
			  id: "threeaxis",
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