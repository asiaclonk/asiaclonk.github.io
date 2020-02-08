$(document).ready(function() {
	$("button").click(function() {
		$(this).parent().find("img").show();
		alert("Click");
	})
})