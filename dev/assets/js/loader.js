define([
	"jquery",
	"publisher",
	"events",
	"preloader"
], function($, publisher, Events) {
	var Loader = function() {
		var self = this;
		var images = [];
		var pct = 0, pctTo = 0, rounded = 0, speedDiv = 20, difFactor = 1;

		var retrieveImages = function(container) {
			//add own back image!
			var url = "";
			var _images = [];

			// add all the imgs inside a div
			$(container).find("img").each(function() {
				url = $(this).attr("src");
				if($.inArray(url, _images) == -1) _images.push(url);

			});
			var everything = $(container).find("div, li").each(function() {
				var url = "";
				if ($(this).css("background-image") != "none") {
					url = $(this).css("background-image");
					url = url.replace("url(\"", "");
					url = url.replace("url(", "");
					url = url.replace("\")", "");
					url = url.replace(")", "");
					if (url.length > 0 && $.inArray(url, _images) == -1) _images.push(url);
				}
			});

			return _images;
		};

		var onLoadComplete = function(){
			pctTo = 100;
			//publisher.publish(Events.loadStartComplete);
		};

		var openSite = function(){
			TweenMax.to($('.logo_preload'), 0.5, {width:0, marginLeft:0, ease:Expo.easeInOut, onComplete:function(){
				TweenMax.to($('.preloader'), 0.9, {autoAlpha:0, onComplete:function(){
					$('.preloader').empty();
					$('.preloader').remove();
					publisher.publish(Events.loadStartComplete);
				}});
			}});
		};

		var loadingAnimation = function(){
			rounded = 0;
			
			if(pct != pctTo){
				difFactor = (pctTo - pct) / speedDiv;
				pct += difFactor;
				rounded = Math.round(pct);
				$('.loader_pct').html(((rounded < 10)? '0'+rounded : rounded)+'<sup>%</sup>');
			}

			if(rounded == 100){
				TweenMax.delayedCall(0.6, openSite);
			}else{
				// https://gist.github.com/paulirish/1579671
				window.requestAnimationFrame(loadingAnimation);
			}
		};

		// INIT loading ::::::::::::::::::::::
		images = retrieveImages('body');
		TweenMax.to($('.loader_pct'), 0, {autoAlpha:0});
		TweenMax.to($('.loader_pct'), 0.6, {autoAlpha:0.3});

		$.preload( retrieveImages('.machine_preload'), {onFinish:function(){
			TweenMax.to($('.machine_preload'), 0.4, {alpha:1});
		}});
		$.preload( retrieveImages('.logo_preload'), {onFinish:function(){
			TweenMax.to($('.logo_preload'), 0.7, {width:300, marginLeft:-150, ease:Expo.easeInOut});
		}});

		if($('html').hasClass('oldie')) $('.machine_preload').pngFix();

		var btnWidth = Math.max(108, $('.machine_preload span').width()+20);
		$('.machine_preload img').width(btnWidth);
		$('.machine_preload img').height(29);
		$('.machine_preload img').css('margin-left', -btnWidth*0.5-4);
		$('.machine_preload span').css('left', '50%');
		$('.machine_preload span').css('margin-left', -$('.machine_preload span').width()*0.5-4);
		loadingAnimation();

		if(images.length > 0){
			//console.log("loader  -> images loaded "+container);
			$.preload( images, {onFinish:onLoadComplete, onComplete:function(data){
				pctTo = data.loaded/data.total*100;
				//console.log(">>load progress ---- "+data.loaded+" / "+data.total);
			}});
		}else onLoadComplete();
	};
	return Loader;
});