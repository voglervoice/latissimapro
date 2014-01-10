define([
	"jquery",
	"publisher",
	"events",
	"history",
	"views/menu",
	"views/home"
], function($, publisher, Events, History, MainMenu, Home) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
		var mainMenu = new MainMenu();
		var home = new Home();
		var currentSection = null;
		var windowW, windowH;
		var footerH = 37;

		TweenMax.to($('.content'), 0, {autoAlpha:0});

		$( window ).resize(function() {
			windowW = $( window ).width();
			windowH = $( window ).height();
			$('.content').width(windowW);
			$('section').width(windowW);
			$('.content').height(windowH);
			$('section').height(windowH-footerH);

			mainMenu.resize();

			if(currentSection !== null){
				var imgBg = $('.section_background', currentSection.elem);
				var baseImageW = parseInt( imgBg.attr('data-w'), 10);
				var baseImageH = parseInt( imgBg.attr('data-h'), 10);
				var imageW = windowW;
				var imageH = baseImageH*windowW/baseImageW;
				if(imageH < windowH-footerH){
					imageH = windowH-footerH;
					imageW = baseImageW*(windowH-footerH)/baseImageH;
				}
				imgBg.width(imageW);
				imgBg.height(imageH);
				imgBg.css('left', -(imageW-windowW)*0.5);
				imgBg.css('top', -(imageH-(windowH-footerH))*0.5);

				currentSection.resize(windowW, windowH);
			}
		});
		$(window).trigger('resize');

		// public
		this.start = function() {
			History.Adapter.bind(window,'statechange',function(){ onAddressChange(History.getState().data.value); });

			publisher.subscribe(Events.navigate, navigateTo);
			mainMenu.start();
			
			$(window).trigger('resize');
			TweenMax.to($('.content'), 0.2, {autoAlpha:1});

			// DIRECT ACCESS TO :
			onAddressChange("home");
		};
		// private      
		var navigateTo = function(id){
			console.log(id);
			var pageTitle = "Lattissima !";
			if(isFullscreen)		onAddressChange(id);
			else			History.pushState({value:id}, pageTitle, id);
		};
		var onAddressChange = function(value){
			console.log("on address change - > "+value);
			currentSection = null;
			switch(value){
				case "home" :
					currentSection = home;
					break;
			}

			$(window).trigger('resize');
			if(currentSection !== null){
				currentSection.open();
			}
		};

	};
	return App;
});