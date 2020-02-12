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
												  fire: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Fire").length,
												  water: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Water").length,
												  earth: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Earth").length,
												  wind: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Wind").length,
												  sun: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Sun").length,
												  moon: fivestar.filter(value => value["series"] == seriesname && value["attribute"] == "Moon").length,
												}))
	objectlist3.sort(function(a,b) {
		return (b["fire"] + b["water"] + b["earth"] + b["wind"] + b["sun"] + b["moon"]) - (a["fire"] + a["water"] + a["earth"] + a["wind"] + a["sun"] + a["moon"]) || b["fire"] - a["fire"] || b["water"] - a["water"] || b["earth"] - a["earth"] || b["wind"] - a["wind"] || b["sun"] - a["sun"] || b["moon"] - a["moon"];
	})
	
	var objectlist4 = series.map(seriesname => ({ series: seriesname,
												  warrior: fivestar.filter(value => value["series"] == seriesname && value["class"] == "Warrior").length,
												  knight: fivestar.filter(value => value["series"] == seriesname && value["class"] == "Knight").length,
												  mage: fivestar.filter(value => value["series"] == seriesname && value["class"] == "Mage").length,
												  priest: fivestar.filter(value => value["series"] == seriesname && value["class"] == "Priest").length,
												  alchemist: fivestar.filter(value => value["series"] == seriesname && value["class"] == "Alchemist").length,
												}))
	objectlist4.sort(function(a,b) {
		return (b["warrior"] + b["knight"] + b["mage"] + b["priest"] + b["alchemist"]) - (a["warrior"] + a["knight"] + a["mage"] + a["priest"] + a["alchemist"]) || b["warrior"] - a["warrior"] || b["knight"] - a["knight"] || b["mage"] - a["mage"] || b["priest"] - a["priest"] || b["alchemist"] - a["alchemist"];
	})
	
	var objectlist5 = [];
	var classes = ["Warrior", "Mage", "Knight", "Priest", "Alchemist"];
	var classcolors = ["#FF0000", "#4169E1", "#8B4513", "#32CD32", "#FFFF00"];
	var attributes = ["Fire", "Water", "Earth", "Wind", "Sun", "Moon"];
	var attributecolors = ["#FF000099", "#4169E199", "#8B451399", "#32CD3299", "#FFFF0099", "#66339999"];
	var attributehovers = ["#FF0000", "#4169E1", "#8B4513", "#32CD32", "#FFFF00", "#663399"];
	for (var i = 0; i < classes.length; i++) {
		for (var j = 0; j < attributes.length; j++) {
			var count = fivestar.filter(value => value["class"] == classes[i] && value["attribute"] == attributes[j]).length
			if (count > 0) {
				objectlist5.push({ x: i,
								   y: j,
								   r: count
								 });
			}
		}
	}
	
	objectlist5.sort(function(a,b) {
		return b.reduce(function(p,c) { return { r: p.r + c.r } }).r - a.reduce(function(p,c) { return { r: p.r + c.r } }).r
	})
	
	data1 = {
	  labels: objectlist1.map(value => value["series"]),
	  datasets: [{
		label: "Evo 4",
		backgroundColor: '#FFA50077',
		data: objectlist1.map(value => value["evos"]),
		yAxisID: "evoaxis",
	  }, {
		label: "Weapons",
		backgroundColor: '#ADD8E677',
		data: objectlist1.map(value => value["weapons"]),
		yAxisID: "weaponaxis",
	  }, {
		label: "Cards",
		backgroundColor: '#4682B477',
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
		  ticks: {
			mirror: true,
		  }
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
		backgroundColor: '#FFD70099',
		data: objectlist2.map(value => value["five"]),
		yAxisID: "fiveaxis",
	  }, {
		label: "4*",
		backgroundColor: '#C0C0C099',
		data: objectlist2.map(value => value["four"]),
		yAxisID: "fouraxis",
	  }, {
		label: "3*",
		backgroundColor: '#D2691E99',
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
		  ticks: {
			mirror: true,
		  }
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
		backgroundColor: '#FF000099',
		data: objectlist3.map(value => value["fire"]),
		yAxisID: "fireaxis",
	  }, {
		label: "Water",
		backgroundColor: '#4169E199',
		data: objectlist3.map(value => value["water"]),
		yAxisID: "wateraxis",
	  }, {
		label: "Earth",
		backgroundColor: '#8B451399',
		data: objectlist3.map(value => value["earth"]),
		yAxisID: "earthaxis",
	  }, {
		label: "Wind",
		backgroundColor: '#32CD3299',
		data: objectlist3.map(value => value["wind"]),
		yAxisID: "windaxis",
	  }, {
		label: "Sun",
		backgroundColor: '#FFFF0099',
		data: objectlist3.map(value => value["sun"]),
		yAxisID: "sunaxis",
	  }, {
		label: "Moon",
		backgroundColor: '#66339999',
		data: objectlist3.map(value => value["moon"]),
		yAxisID: "moonaxis",
	  }]
	};

	options3 = {
	  maintainAspectRatio: false,
	  title: {
		display: true,
		text: '5* Attribute Distribution'
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
		  ticks: {
			mirror: true,
		  }
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

	data4 = {
	  labels: objectlist4.map(value => value["series"]),
	  datasets: [{
		label: "Warrior",
		backgroundColor: '#FF000099',
		data: objectlist4.map(value => value["warrior"]),
		yAxisID: "warrioraxis",
	  }, {
		label: "Mage",
		backgroundColor: '#4169E199',
		data: objectlist4.map(value => value["mage"]),
		yAxisID: "mageaxis",
	  }, {
		label: "Knight",
		backgroundColor: '#8B451399',
		data: objectlist4.map(value => value["knight"]),
		yAxisID: "knightaxis",
	  }, {
		label: "Priest",
		backgroundColor: '#32CD3299',
		data: objectlist4.map(value => value["priest"]),
		yAxisID: "priestaxis",
	  }, {
		label: "Alchemist",
		backgroundColor: '#FFFF0099',
		data: objectlist4.map(value => value["alchemist"]),
		yAxisID: "alchemistaxis",
	  }]
	};

	options4 = {
	  maintainAspectRatio: false,
	  title: {
		display: true,
		text: '5* Class Distribution'
	  },
	  scales: {
		xAxes: [{
		  ticks: {
			beginAtZero: true
		  },
		  stacked: true
		}],
		yAxes: [{
		  id: "warrioraxis",
		  stacked: true,
		  ticks: {
			mirror: true,
		  }
		}, {
		  id: "mageaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "knightaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "priestaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}, {
		  id: "alchemistaxis",
		  stacked: true,
		  display: false,
		  offset: true,
		  type: "category",
		  categoryPercentage: 0.8,
		  barPercentage: 0.9,
		}]
	  }
	};

	data5 = {
	  datasets: [{ data: objectlist5 }],
	};

	options5 = {
	  maintainAspectRatio: false,
	  title: {
		display: true,
		text: '5* Cards by Class/Attribute'
	  },
	  legend: {
		display: false,
	  },
	  scales: {
		xAxes: [{
		  ticks: {
			beginAtZero: true,
			stepSize: 1,
			max: 5,
			callback: function(value,index,values) { return classes[value]; },
		  },
		}],
		yAxes: [{
		  ticks: {
			beginAtZero: true,
			stepSize: 1,
			max: 6,
			callback: function(value,index,values) { return attributes[value]; },
		  }
		}]
	  },
	  elements: {
		point: {
		  borderColor: function(context) {
			let point = context.dataset.data[context.dataIndex];
			return classcolors[point.x]
		  },
		  backgroundColor: function(context) {
			let point = context.dataset.data[context.dataIndex];
			return attributecolors[point.y]
		  },
		  hoverBackgroundColor: function(context) {
			let point = context.dataset.data[context.dataIndex];
			return attributehovers[point.y]
		  },
		  borderWidth: 3,
		  hoverBorderWidth: 6,
		}
	  },
	};

	var ctx = document.getElementById("myChart").getContext("2d");
	var copy = JSON.parse(JSON.stringify(data1));
	kirarachart = new Chart(ctx, {
		  type: 'horizontalBar',
		  data: copy,
		  options: options1,
		});
		
	$("#chartArea").resizable({
		handles: 's',
	});

	$("#button1").click(function() {
		var copy = JSON.parse(JSON.stringify(data1));
		kirarachart.type = 'horizontalBar';
		kirarachart.data = copy;
		kirarachart.options = options1;
		kirarachart.update();
	});
	
	$("#button2").click(function() {
		var copy = JSON.parse(JSON.stringify(data2));
		kirarachart.type = 'horizontalBar';
		kirarachart.data = copy;
		kirarachart.options = options2;
		kirarachart.update();
	});
	
	$("#button3").click(function() {
		var copy = JSON.parse(JSON.stringify(data3));
		kirarachart.type = 'horizontalBar';
		kirarachart.data = copy;
		kirarachart.options = options3;
		kirarachart.update();
	});
	
	$("#button4").click(function() {
		var copy = JSON.parse(JSON.stringify(data4));
		kirarachart.type = 'horizontalBar';
		kirarachart.data = copy;
		kirarachart.options = options4;
		kirarachart.update();
	});
	
	$("#button5").click(function() {
		var copy = JSON.parse(JSON.stringify(data5));
		kirarachart.type = 'bubble';
		kirarachart.data = copy;
		kirarachart.options = options5;
		kirarachart.update();
	});
})