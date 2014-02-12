(function( $ ){
	$.fn.pngFix = function() {
		return $(this).each(function() {
			var img = $(this),
			src = img.attr('src');
			img.attr('src', 'assets/imgs/ui/a.gif')
			.css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + src + "')");
	});
	};
})( jQuery );