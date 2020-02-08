---
Title: Arknights Furniture
---

# Image Test

<div id="image1"><img src="AKFurniture/1386504515108.gif" alt="Renge"></div>

<div id="image2"><img src="AKFurniture/1387303199177.gif" alt="Renge"></div>

<div id="image3"><img src="AKFurniture/1388242811666.gif" alt="Not Renge"></div>

<div id="image4"><img src="AKFurniture/1388245357301.gif" alt="Not Renge"></div>

<script>
	document.title = "Arknights Furniture";
	
	var button1 = $('<button/', {
	text: 'Image 1',
	click: function(){ $("#image1").show() }});
	
	var button2 = $('<button/', {
	text: 'Image 2',
	click: function(){ $("#image2").show() }});
	
	var button3 = $('<button/', {
	text: 'Image 3',
	click: function(){ $("#image3").show() }});
	
	var button4 = $('<button/', {
	text: 'Image 4',
	click: function(){ $("#image4").show() }});
	
	$("image1").prepend(button1);
	$("image2").prepend(button2);
	$("image3").prepend(button3);
	$("image4").prepend(button4);
</script>

# Image Test End