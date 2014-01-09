define([
	"publisher",
	"events",
	"history",
	"views/menu",
	"views/home"
], function(publisher, Events, History, MainMenu, Home) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
		var mainMenu = new MainMenu();
		var home = new Home();
		var windowW, windowH;

		$( window ).resize(function() {
			windowW = $( window ).width();
			windowH = $( window ).height();
			$('.content').width(windowW);
			$('.content').height(windowH);

			mainMenu.resize();
		});
		$(window).trigger('resize');

		// public
		this.start = function() {
			console.log("APP START !");
			History.Adapter.bind(window,'statechange',function(){ onAddressChange(History.getState().data.value); });

			publisher.subscribe(Events.navigate, navigateTo);
			mainMenu.start();
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
		};

	};
	return App;
});