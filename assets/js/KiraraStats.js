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
		return (b["five"] + b["four"] + b["three"]) - (a["five"] + a["four"] + a["three"]) || b["five"] - a["five"] || b["four"] - a["four"] || b["three"] - a["three"];
	})
	
	var objectlist3 = series.map(seriesname => ({ series: seriesname,
												  fire: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Fire").length,
												  water: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Water").length,
												  earth: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Earth").length,
												  wind: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Wind").length,
												  sun: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Sun").length,
												  moon: fivestar.filter(value => value["series"] == seriesname && value["element"] == "Moon").length,
												}))
	objectlist3.sort(function(a,b) {
		return (b["fire"] + b["water"] + b["earth"] + b["wind"] + b["sun"] + b["moon"]) - (a["fire"] + a["water"] + a["earth"] + a["wind"] + a["sun"] + a["moon"]) || b["fire"] - a["fire"] || b["water"] - a["water"] || b["earth"] - a["earth"] || b["wind"] - a["wind"] || b["sun"] - a["sun"] || b["moon"] - a["moon"];
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
	  title: {
		display: true,
		text: '5* Release State Distribution'
	  },
	  scales: {
		xAxes: [{
		  ticks: {
			beginAtZero: true,
		  },
		  stacked: false
		}],
		yAxes: [{
		  id: "cardaxis",
		  stacked: true,
		  mirror: true,
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
	  title: {
		display: true,
		text: 'Card Rarity Distribution'
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
		  mirror: true,
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

	data3 = {
	  labels: objectlist3.map(value => value["series"]),
	  datasets: [{
		label: "Fire",
		backgroundColor: '#FF0000BB',
		data: objectlist3.map(value => value["fire"]),
		yAxisID: "fireaxis",
	  }, {
		label: "Water",
		backgroundColor: '#4169E1BB',
		data: objectlist3.map(value => value["water"]),
		yAxisID: "wateraxis",
	  }, {
		label: "Earth",
		backgroundColor: '#8B4513',
		data: objectlist3.map(value => value["earth"]),
		yAxisID: "earthaxis",
	  }, {
		label: "Wind",
		backgroundColor: '#32CD32BB',
		data: objectlist3.map(value => value["wind"]),
		yAxisID: "windaxis",
	  }, {
		label: "Sun",
		backgroundColor: '#FFFF00BB',
		data: objectlist3.map(value => value["sun"]),
		yAxisID: "sunaxis",
	  }, {
		label: "Moon",
		backgroundColor: '#663399BB',
		data: objectlist3.map(value => value["moon"]),
		yAxisID: "moonaxis",
	  }]
	};

	options3 = {
	  maintainAspectRatio: false,
	  title: {
		display: true,
		text: '5* Element Distribution'
	  },
	  scales: {
		xAxes: [{
		  ticks: {
			beginAtZero: true
		  },
		  stacked: true
		}],
		yAxes: [{
		  id: "fireaxis",
		  stacked: true,
		  mirror: true,
		}, {
		  id: "wateraxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "earthaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "windaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "sunaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "moonaxis",
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
	kirarachart = new Chart(ctx, {
		  type: 'horizontalBar',
		  data: data1,
		  options: options1,
		});

	$("#button1").click(function() {
		kirarachart.type = 'horizontalBar';
		kirarachart.data = data1.slice();
		kirarachart.options = options1;
		kirarachart.update();
	});
	
	$("#button2").click(function() {
		kirarachart.type = 'horizontalBar';
		kirarachart.data = data2.slice();
		kirarachart.options = options2;
		kirarachart.update();
	});
	
	$("#button3").click(function() {
		kirarachart.type = 'horizontalBar';
		kirarachart.data = data3.slice();
		kirarachart.options = options3;
		kirarachart.update();
	});
})