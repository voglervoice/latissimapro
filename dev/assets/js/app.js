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
	"views/popins",
	"utils/tracker",
	"modernizr",
	"mousewheel"
], function($, publisher, Events, Globals, History, MainMenu, Home, CoffeeRange, Design, MilkSystem, Touchscreen, Popins, SiteTracker, Modernizr) {
	var App = function() {
		var self = this;
		var isFullscreen = false;
		var oldie_version = $('html').hasClass('oldie');
		Globals.oldie = oldie_version;
		//if(oldie_version) alert("OLDIE!");
		Globals.lang = $('body').attr('data-lang');
		Globals.canvas_enabled = (Modernizr.canvas && Modernizr.webgl)? true : false;


		//MAC & safari test > disable WebGL si on est sur MAC + safari
		var ua = navigator.userAgent.toLowerCase();
		if( /macintosh/.test( ua ) || /mac os x/.test( ua ) )
		{
			console.log ( "isMac" );
 
			var isChrome = /chrome/.test( ua );
			console.log ( "isChrome", isChrome );
 
			var isSafari = !isChrome && /safari/.test( ua );
			console.log ( "isSafari", isSafari);
 
			if( isSafari )
			{
				console.log ( "browser is Safari & OS is Mac, disable WebGL" );
				Globals.canvas_enabled = false;
			}
		}
		

		console.log("--> Globals.canvas_enabled : "+Globals.canvas_enabled);
		//Globals.canvas_enabled = false;

		var mainMenu, home, design, milksystem, touchscreen, coffeerange;
		var popins = new Popins();
		var currentSection = null;
		var windowW, windowH, windowHContent;
		var footerH = 37;
		var currentId = "null", goToId = "", currentIndex = -1;
		var transitionComplete=false;
		var baseLangUrl = $('body').attr('data-url');
		var direct = $('body').attr('data-direct');
		var tracker = new SiteTracker($('body').attr('data-lang'), $('body').attr('data-country'));
		mainMenu = new MainMenu();
		home = new Home();
		design = new Design();
		milksystem = new MilkSystem();
		touchscreen = new Touchscreen();
		coffeerange = new CoffeeRange();

		$('section').css('visibility', 'hidden');
		TweenMax.to($('.content'), 0, {autoAlpha:0});

		$( window ).resize(function() {
			windowW = $('.container').width();
			windowH = $('.container').height();
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

			if(typeof mainMenu != "undefined"){
				mainMenu.resize(windowW, windowH);

				if(currentSection !== null){
					currentSection.resize(windowW, windowHContent);
				}
				if(currentIndex !== -1) $('.main').css('top', -currentIndex*windowHContent);
			}
		});

		// public
		this.start = function() {
			$(window).trigger('resize');

			TweenMax.to($('.content'), 0.5, {autoAlpha:1, onComplete:function(){
				mainMenu.start();
				TweenMax.delayedCall(1.2, initContent);
			}});
		};

		var initContent = function(){
			History.Adapter.bind(window,'statechange',function(){ onAddressChange(History.getState().data.value); });

			publisher.subscribe(Events.navigate, navigateTo);
			publisher.subscribe(Events.nextPage, openNextPage);
			publisher.subscribe(Events.toggleFullscreen, toggleFullScreen);
			// DIRECT ACCESS TO :
			transitionComplete = true;
			if(direct === "" && $('body').attr('data-lang-defined') == "0")	navigateTo("");
			else								onAddressChange(direct);

			$('.content').mousewheel(function(event, delta, deltaX, deltaY) {
				//console.log(deltaY);
				if(transitionComplete && (deltaX > 0 || deltaY > 0) && currentIndex > 0) openPrevPage();
				else if(transitionComplete && (deltaX < 0 || deltaY < 0) && currentIndex < 4) openNextPage();
			});
		};
		// private      
		var navigateTo = function(id){
			var pageTitle = "Lattissima Pro";
			//var url = (id !== "")? id : " ";
			var url = baseLangUrl+id;
			if($('html').hasClass('ie') && id !== ""){
				url = id;
			}
			//if(oldie_version) alert("NAVIGATE : "+id);
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
			if(value == "none") return;
			goToId = value;
			if(currentId == value || !transitionComplete) return;

			//TweenMax.killDelayedCallsTo(createOtherPage);
			transitionComplete = false;
			currentId = value;

			if(currentSection !== null) currentSection.close();

			popins.close();

			currentSection = null;
			var  index = 0;
			switch(currentId){
				case Globals.PAGE_HOME :
					index = 0;
					if(typeof home == "undefined") home = new Home();
					currentSection = home;
					break;
				case Globals.PAGE_TOUCHSCREEN :
					index = 1;
					if(typeof touchscreen == "undefined") touchscreen = new Touchscreen();
					currentSection = touchscreen;
					break;
				case Globals.PAGE_COFFEE_RANGE :
					index = 2;
					if(typeof coffeerange == "undefined") coffeerange = new CoffeeRange();
					currentSection = coffeerange;
					break;
				case Globals.PAGE_MILKSYSTEM :
					index = 3;
					if(typeof milksystem == "undefined") milksystem = new MilkSystem();
					currentSection = milksystem;
					break;
				case Globals.PAGE_DESIGN :
					index = 4;
					if(typeof design == "undefined") design = new Design();
					currentSection = design;
					break;
			}

			$(window).trigger('resize');
			if(currentSection !== null){
				currentSection.elem.css('visibility', 'visible');
				mainMenu.update(currentId);
				currentIndex = index;
				TweenMax.to($('.main'), 1.8, {top:-currentIndex*windowHContent, ease:Expo.easeInOut, onComplete:onSlideComplete});
				currentSection.initOpen();
			}else onSlideComplete();

		};
		var onSlideComplete = function(){
			transitionComplete = true;
			if(goToId !== currentId) onAddressChange(goToId);
			else if(currentSection!==null){
				currentSection.open();
				// track page :
				var pageName = "", prop4 = "";
				switch(currentId){
					case Globals.PAGE_HOME :
						prop4 = "homepage";
						break;
					case Globals.PAGE_TOUCHSCREEN :
						pageName = "touchscreen";
						prop4 = "hub";
						break;
					case Globals.PAGE_COFFEE_RANGE :
						pageName = "coffee-range";
						prop4 = "hub";
						break;
					case Globals.PAGE_MILKSYSTEM :
						pageName = "milk-system";
						prop4 = "hub";
						break;
					case Globals.PAGE_DESIGN :
						pageName = "features";
						prop4 = "hub";
						break;
				}
				tracker.trackPage(pageName, prop4);

				/*if(typeof touchscreen == "undefined" || typeof coffeerange == "undefined" || typeof milksystem == "undefined" || typeof design == "undefined")
				TweenMax.delayedCall(2.5, createOtherPage, [currentId]);*/
			}
		};
/*
		var createOtherPage = function(id){
			switch(id){
				case Globals.PAGE_HOME :
					if(typeof touchscreen == "undefined") {
						touchscreen = new Touchscreen();
						TweenMax.delayedCall(2, createOtherPage, [Globals.PAGE_TOUCHSCREEN]);
					}
					break;
				case Globals.PAGE_TOUCHSCREEN :
					if(typeof coffeerange == "undefined"){
						coffeerange = new CoffeeRange();
						TweenMax.delayedCall(2, createOtherPage, [Globals.PAGE_COFFEE_RANGE]);
					}
					break;
				case Globals.PAGE_COFFEE_RANGE :
					if(typeof milksystem == "undefined"){
						milksystem = new MilkSystem();
						TweenMax.delayedCall(2, createOtherPage, [Globals.PAGE_MILKSYSTEM]);
					}
					break;
				case Globals.PAGE_MILKSYSTEM :
					if(typeof design == "undefined"){
						design = new Design();
						TweenMax.delayedCall(2, createOtherPage, [Globals.PAGE_HOME]);
					}
					break;
			}
		};*/
		var toggleFullScreen = function() {
			if (!isFullscreen) {
				if (document.documentElement.requestFullScreen) {
					document.documentElement.requestFullScreen();
				}else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullScreen) {
					document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				}else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				}
				isFullscreen = true;
			}else{
				if (document.cancelFullScreen) document.cancelFullScreen();
				else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
				else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
				else if (document.msExitFullscreen) document.msExitFullscreen();
				
				isFullscreen = false;
				var pageTitle = "Lattissima Pro";
				var url = baseLangUrl+currentId;
				if($('html').hasClass('ie') && id !== "") url = id;
				History.pushState({value:'none'}, pageTitle, url);
			}
		};
	};
	return App;
});