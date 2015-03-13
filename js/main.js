$(function() {
	$(".panel").css({"height":$(window).height()});
	$(".floatdown").css({"top":$(window).height() - 150});
	$.scrollify({
		section:".panel"
	});
	
});
