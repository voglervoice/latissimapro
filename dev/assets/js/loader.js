define([
	"jquery",
	"publisher",
	"events",
	"preloader"
], function($, publisher, Events) {
	var Loader = function() {
		var self = this;
		var images = [];

		var retrieveImages = function(container) {
			//add own back image!
			var url = "";
			var _self = this;

			// add all the imgs inside a div
			$(container).find("img").each(function() {
				url = $(this).attr("src");
				if(!$.inArray(url, images)) images.push(url);

			});
			var everything = $(container).find("div, li").each(function() {
				var url = "";
				if ($(this).css("background-image") != "none") {
					url = $(this).css("background-image");
					url = url.replace("url(\"", "");
					url = url.replace("url(", "");
					url = url.replace("\")", "");
					url = url.replace(")", "");
					if (url.length > 0 && !$.inArray(url, images)) images.push(url);
				}
			});
		};

		var onComplete = function(){
			publisher.publish(Events.loadStartComplete);
		};


		// INIT loading ::::::::::::::::::::::
		retrieveImages('body');

		this.progress = 0;
		this.loading = true;

		if(images.length > 0){
			//console.log("loader  -> images loaded "+container);
			$.preload( images, {onFinish:onComplete, onComplete:function(value){
				console.log("load progress ---- "+value);
			}});
		}else onComplete();
	};
	return Loader;
});