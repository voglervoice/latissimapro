define([
	"jquery",
	"publisher",
	"events",
	"globals",
	"history",
	"views/menu",
	"views/home",
	"views/coffeerange",
	"views/design",
	"views/milksystem",
	"views/touchscreen",
	"modernizr",
	"mousewheel"
], function($, publisher, Events, Globals, History, MainMenu, Home, CoffeeRange, Design, MilkSystem, Touchscreen, Modernizr) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
		
		Globals.canvas_enabled = (Modernizr.canvas && Modernizr.webgl)? true : false;
		//Globals.canvas_enabled = false;

		var mainMenu = new MainMenu();
		var home = new Home();
		var design = new Design();
		var milksystem = new MilkSystem();
		var touchscreen = new Touchscreen();
		var coffeerange = new CoffeeRange();
		var currentSection = null;
		var windowW, windowH, windowHContent;
		var footerH = 37;
		var currentId = "null", goToId = "", currentIndex = -1;
		var transitionComplete=false;


		TweenMax.to($('.content'), 0, {autoAlpha:0});

		$( window ).resize(function() {
			windowW = $( window ).width();
			windowH = $( window ).height();
			windowHContent = windowH-footerH;
			$('.content').width(windowW);
			$('.content').height(windowH);
			
			$('.main').width(windowW);
			$('.main').height(windowHContent*$('section').length);

			$('section').each(function(index){
				$(this).width(windowW);
				$(this).height(windowHContent);
				$(this).css('top', windowHContent*index);
			});

			mainMenu.resize();

			if(currentSection !== null){
				currentSection.resize(windowW, windowHContent);
			}
			if(currentIndex !== -1) $('.main').css('top', -currentIndex*windowHContent);
		});
		$(window).trigger('resize');

		// public
		this.start = function() {
			History.Adapter.bind(window,'statechange',function(){ onAddressChange(History.getState().data.value); });

			publisher.subscribe(Events.navigate, navigateTo);
			publisher.subscribe(Events.nextPage, openNextPage);
			mainMenu.start();
			
			$(window).trigger('resize');
			TweenMax.to($('.content'), 0.2, {autoAlpha:1});

			// DIRECT ACCESS TO :
			transitionComplete = true;
			onAddressChange("");

			$('.content').mousewheel(function(event, delta, deltaX, deltaY) {
				//console.log(deltaY);
				if(transitionComplete && (deltaX > 1 || deltaY > 1)) openNextPage();
				else if(transitionComplete && (deltaX < -1 || deltaY < -1)) openPrevPage();
			});
		};
		// private      
		var navigateTo = function(id){
			console.log("navigateTo : "+id);
			var pageTitle = "Lattissima !";
			var url = (id !== "")? id : " ";
			if(isFullscreen)		onAddressChange(id);
			else{
				History.pushState({value:id}, pageTitle, url);
			}
		};
		var openPrevPage = function(){
			var next = "o";
			if(goToId == Globals.PAGE_HOME)			next = Globals.PAGE_DESIGN;
			else if(goToId == Globals.PAGE_TOUCHSCREEN)	next = Globals.PAGE_HOME;
			else if(goToId == Globals.PAGE_COFFEE_RANGE)	next = Globals.PAGE_TOUCHSCREEN;
			else if(goToId == Globals.PAGE_MILKSYSTEM)		next = Globals.PAGE_COFFEE_RANGE;
			else if(goToId == Globals.PAGE_DESIGN)		next = Globals.PAGE_MILKSYSTEM;

			if(next !== "o") navigateTo(next);
		};
		var openNextPage = function(){
			var next = "o";
			if(goToId == Globals.PAGE_HOME)			next = Globals.PAGE_TOUCHSCREEN;
			else if(goToId == Globals.PAGE_TOUCHSCREEN)	next = Globals.PAGE_COFFEE_RANGE;
			else if(goToId == Globals.PAGE_COFFEE_RANGE)	next = Globals.PAGE_MILKSYSTEM;
			else if(goToId == Globals.PAGE_MILKSYSTEM)		next = Globals.PAGE_DESIGN;
			else if(goToId == Globals.PAGE_DESIGN)		next = Globals.PAGE_HOME;

			if(next !== "o") navigateTo(next);
		};
		var onAddressChange = function(value){

			goToId = value;
			if(currentId == value || !transitionComplete) return;

			transitionComplete = false;
			currentId = value;

			if(currentSection !== null) currentSection.close();

			currentSection = null;
			var  index = 0;
			switch(currentId){
				case Globals.PAGE_HOME :
					index = 0;
					currentSection = home;
					break;
				case Globals.PAGE_TOUCHSCREEN :
					index = 1;
					currentSection = touchscreen;
					break;
				case Globals.PAGE_COFFEE_RANGE :
					index = 2;
					currentSection = coffeerange;
					break;
				case Globals.PAGE_MILKSYSTEM :
					index = 3;
					currentSection = milksystem;
					break;
				case Globals.PAGE_DESIGN :
					index = 4;
					currentSection = design;
					break;
			}

			$(window).trigger('resize');
			if(currentSection !== null){
				mainMenu.update(currentId);
				currentIndex = index;
				TweenMax.to($('.main'), 1.8, {top:-currentIndex*windowHContent, ease:Expo.easeInOut, onComplete:onSlideComplete});
				currentSection.initOpen();
			}else onSlideComplete();

		};
		var onSlideComplete = function(){
			transitionComplete = true;
			if(goToId !== currentId) onAddressChange(goToId);
			else if(currentSection!==null) currentSection.open();
		};

	};
	return App;
});