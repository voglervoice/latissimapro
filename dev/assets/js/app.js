define([
	"views/menu",
	"publisher",
	"events",
	"history"
], function(MainMenu, publisher, Events, History) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
		var mainMenu = new MainMenu();
		console.log("APP");

		// public
		this.start = function() {

			History.Adapter.bind(window,'statechange',function(){ onAddressChange(History.getState().data.value); });

			publisher.subscribe(Events.navigate, navigateTo);
			mainMenu.start();
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