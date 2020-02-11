---
layout: blank
---

$(document).ready(function() {
	Chart.defaults.global.defaultFontColor = 'lightgray';
	Chart.defaults.scale.gridLines.color = 'gray';

	var json = {{ site.data.KirafanDB | jsonify }}
	var cards = json.filter(value => value["series"] != "")
	var fivestar = cards.filter(value => value["rarity"] == 5)
	var series = [...new Set(cards.map(value => value["series"]))]

	var objectlist1 = series.map(seriesname => ({ series: seriesname,
												  cards: fivestar.filter(value => value["series"] == seriesname).length,
												  weapons: fivestar.filter(value => value["series"] == seriesname && value["skill name en"] != "").length,
												  evos: fivestar.filter(value => value["series"] == seriesname && value["skill evo name en"] != "").length,
											    }))
	objectlist1.sort(function(a,b) {
		return b["cards"] - a["cards"] || b["weapons"] - a["weapons"] || b["evos"] - a["evos"];
	})
	
	var objectlist2 = series.map(seriesname => ({ series: seriesname,
												  five: cards.filter(value => value["series"] == seriesname && value["rarity"] == 5).length,
												  four: cards.filter(value => value["series"] == seriesname && value["rarity"] == 4).length,
												  three: cards.filter(value => value["series"] == seriesname && value["rarity"] == 3).length,
												}))
	objectlist2.sort(function(a,b) {
		return b["five"] - a["five"] || b["four"] - a["four"] || b["three"] - a["three"];
	})
	
	data1 = {
	  labels: objectlist1.map(value => value["series"]),
	  datasets: [{
		label: "Evo 4",
		backgroundColor: '#FFA500BB',
		data: objectlist1.map(value => value["evos"]),
		yAxisID: "evoaxis",
	  }, {
		label: "Weapons",
		backgroundColor: '#ADD8E6BB',
		data: objectlist1.map(value => value["weapons"]),
		yAxisID: "weaponaxis",
	  }, {
		label: "Cards",
		backgroundColor: '#4682B4BB',
		data: objectlist1.map(value => value["cards"]),
		yAxisID: "cardaxis",
	  }]
	};

	options1 = {
	  maintainAspectRatio: false,
	  layout: {
		padding: {
		  left: 200
		}
	  },
	  title: {
		display: true,
		text: '5* Release State Sistribution'
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

	data2 = {
	  labels: objectlist2.map(value => value["series"]),
	  datasets: [{
		label: "5*",
		backgroundColor: '#FFD700BB',
		data: objectlist2.map(value => value["five"]),
		yAxisID: "fiveaxis",
	  }, {
		label: "4*",
		backgroundColor: '#C0C0C0BB',
		data: objectlist2.map(value => value["four"]),
		yAxisID: "fouraxis",
	  }, {
		label: "3*",
		backgroundColor: '#D2691EBB',
		data: objectlist2.map(value => value["three"]),
		yAxisID: "threeaxis",
	  }]
	};

	options2 = {
	  maintainAspectRatio: false,
	  layout: {
		padding: {
		  left: 200
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

	kirarachart = new Chart($("#myChart").getContext("2d"),{
		  type: 'horizontalBar',
		  data: data1,
		  options: options1,
		});

	$("#button1").click(function() {
		kirarachart.type = 'horizontalBar';
		kirarachart.data = data1;
		kirarachart.options = options1;
	});
	
	$("#button2").click(function() {
		kirarachart.type = 'horizontalBar';
		kirarachart.data = data2;
		kirarachart.options = options2;
	});
})