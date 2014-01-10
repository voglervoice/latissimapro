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
	"views/touchscreen"
], function($, publisher, Events, Globals, History, MainMenu, Home, CoffeeRange, Design, MilkSystem, Touchscreen) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
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
				var imgBg = $('.section_background', currentSection.elem);
				var baseImageW = parseInt( imgBg.attr('data-w'), 10);
				var baseImageH = parseInt( imgBg.attr('data-h'), 10);
				var imageW = windowW;
				var imageH = baseImageH*windowW/baseImageW;
				if(imageH < windowHContent){
					imageH = windowHContent;
					imageW = baseImageW*windowHContent/baseImageH;
				}
				imgBg.width(imageW);
				imgBg.height(imageH);
				imgBg.css('left', -(imageW-windowW)*0.5);
				imgBg.css('top', -(imageH-windowHContent)*0.5);

				currentSection.resize(windowW, windowH);
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
		};
		// private      
		var navigateTo = function(id){
			console.log(id);
			var pageTitle = "Lattissima !";
			if(isFullscreen)		onAddressChange(id);
			else			History.pushState({value:id}, pageTitle, id);
		};
		var openNextPage = function(){
			console.log("openNextPage ! "+currentIndex);
		};
		var onAddressChange = function(value){
			console.log("on address change - > "+value);
			goToId = value;
			console.log("  ******************* "+currentId+" / "+value+" :: "+transitionComplete);
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
				console.log("                        OPEN > "+currentId);
				currentIndex = index;
				TweenMax.to($('.main'), 1.8, {top:-currentIndex*windowHContent, ease:Expo.easeInOut, onComplete:onSlideComplete});
				currentSection.initOpen();
			}else onSlideComplete();

		};
		var onSlideComplete = function(){
			console.log("slide complete");
			transitionComplete = true;
			if(goToId !== currentId) onAddressChange(goToId);
			else if(currentSection!==null) currentSection.open();
		};

	};
	return App;
});