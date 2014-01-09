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

			if(currentSection !== null) currentSection.resize(windowW, windowH);
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