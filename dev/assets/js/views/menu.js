define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "buzz", "globals"
], function($, TweenMax, Events, publisher, Raphael, buzz, Globals) {
    /**
     * MainMenu
     * @constructor
     */
    var MainMenu = function() {
        var self = this;
        var menuSpace = 35;
        var paper = Raphael("menu_picts", $('nav').width(), $('nav').height());
        var paperScroll = Raphael("scroll_arrow", $('#scroll_arrow').width(), $('#scroll_arrow').height());
        var circles = [], cScroll, arrowScroll;
        var music = new buzz.sound($('body').attr("data-baseurl")+"assets/music/nespressoU_lead_loop", {
    formats: [ "mp3"], preload: true
});
        // ******************* public ******************* 
        this.resize = function(w, h){
            $('.scroll_to_explore').css('margin-left', -$('.scroll_to_explore').width()*0.5);
            $('nav ul li').each(function(index) {
                $(this).css({'top':($('a span', this).height() > 22)? menuSpace*index -1 :  menuSpace*index+9});
                $('a', this).height($('a span', this).height()+2);
            });
            $('.order_footer_btn_visual').css('width', ($('.order_footer_btn span').width()+70+124)+"px");
            //$('.order_footer_btn_visual').css('right', ($('.order_footer_btn span').width()+50)+"px");
             var pct = 1, latiOffset = 0, latiOffset2 = 0;
            if(w < 1050 || h < 725){
                pct = 0.75;
                latiOffset =5;
                /*$('h1').css('background-image', "url(assets/imgs/ui/lattissima.png)");
                $('.nespresso_logo').css('background-image', "url(assets/imgs/ui/logo.png)");*/
            }else if(w > 1400 && h > 1200){
                pct = 1.4;
                latiOffset =-10;
                latiOffset2 = -5;
                $('h1').css('background-image', "url(assets/imgs/ui/retina/lattissima@2x.png)");
                $('.nespresso_logo').css('background-image', "url(assets/imgs/ui/retina/logo@2x.png)");
            }
            $('.nespresso_logo').width(Math.round(38*pct));
            $('.nespresso_logo').height(Math.round(38*pct));
            $('h1').width(Math.round(166*pct));
            $('h1').height(Math.round(38*pct));
            $('h1').css({'left':Math.round(89*pct)+latiOffset2, 'top':Math.round(25*pct)+latiOffset});
        };

        this.update = function(id) {
            $('nav ul li a').each(function(){
                if($(this).attr('data-link') == id){
                    $(this).attr('data-selected', "1");
                    mainMenuRollOver($(this));
                }else{
                    $(this).attr('data-selected', "0");
                    mainMenuRollOut($(this));
                }
            });
            TweenMax.to($('.scroll_to_explore'), 0.5, {autoAlpha:(id == Globals.PAGE_DESIGN)?0 : 1});
        };

        this.start = function() {

            music.loop().play().fadeIn();

            if($('body').attr('data-prodmode') == '0'){
                $('.sound_sprit').attr('class', 'sound_sprit_off');
                 music.togglePlay();
            }

            // header
            $('header ul li a').on('click', function(event){
                var top = $(window).height()*0.5;
                var left = $(window).width()*0.5;

                if($(this).hasClass('fullscreen_sprit')){
                    event.preventDefault();
                    publisher.publish(Events.toggleFullscreen);
                    //toggleFullScreen();
                }else if($(this).hasClass('sound_sprit')){
                    event.preventDefault();
                    $(this).attr('class', 'sound_sprit_off');
                    music.togglePlay();
                    //publisher.publish(Events.soundOff);
                }else if($(this).hasClass('sound_sprit_off')){
                    $(this).attr('class', 'sound_sprit');
                    event.preventDefault();
                    music.togglePlay();
                    //publisher.publish(Events.soundOn);
                }else if($(this).hasClass('flags')){
                    event.preventDefault();
                    publisher.publish(Events.openPopin, "select_lang");
                }else if($(this).hasClass('mail_sprit')){
                    event.preventDefault();
                    publisher.publish(Events.openPopin, "share_mail");
                }else if($(this).hasClass('share_facebook')){
                    event.preventDefault();
                    window.open($(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,top='+Math.max(0,top-200)+', left='+Math.max(0,left-400)+',height=350,width=800');
                }else if($(this).hasClass('share_twitter')){
                    event.preventDefault();
                    window.open($(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,top='+Math.max(0,top-150)+', left='+Math.max(0,left-300)+',height=290,width=600');
                }else if($(this).hasClass('share_pinterest')){
                    event.preventDefault();
                    window.open($(this).attr('href'),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,top='+Math.max(0,top-180)+', left='+Math.max(0,left-350)+',height=350,width=700');
                }
            });

            // footer
            $('footer ul li a').on('mouseover', function(){
                TweenMax.to($(this), 0.3, {alpha:1});
            }).on('mouseout', function(){
                TweenMax.to($(this), 0.3, {alpha:0.3});
            });

            // main nav
            $('nav ul li a').on('click', function(event){
                event.preventDefault();
                publisher.publish(Events.navigate, $(this).attr('data-link'));
            }).on('mouseenter', function(){
                mainMenuRollOver($(this));
            }).on('mouseleave', function(){
                if($(this).attr('data-selected') == "0") mainMenuRollOut($(this));
            });

            // scroll to explore
            $('.scroll_to_explore').on('click', function(event){
                event.preventDefault();
                publisher.publish(Events.nextPage);
            }).on('mouseenter', function(){
                cScroll.animate({ r : 16, 'fill-opacity': 0, easing:'>'}, 190);
                arrowScroll.animate({ "stroke": "#ffffff"}, 160);
            }).on('mouseleave', function(){
                cScroll.animate({ r : 15, 'fill-opacity': 1, easing:'<>'}, 200);
                arrowScroll.animate({ "stroke": "#525150"}, 190);
            });

            //qrcode
            TweenMax.to($('.qrcode_apple'), 0, {autoAlpha:0});
            TweenMax.to($('.qrcode_android'), 0, {autoAlpha:0});
            $('.qrcode').on('mouseenter', function(event){
                if($('div', this).hasClass('apple_sprit')) TweenMax.to($('.qrcode_apple'), 0.2, {autoAlpha:1, ease:Linear.easeNone});
                else if($('div', this).hasClass('android_sprit')) TweenMax.to($('.qrcode_android'), 0.2, {autoAlpha:1, ease:Linear.easeNone});
            }).on('mouseleave', function(){
                if($('div', this).hasClass('apple_sprit')) TweenMax.to($('.qrcode_apple'), 0.3, {autoAlpha:0, ease:Linear.easeNone});
                else if($('div', this).hasClass('android_sprit')) TweenMax.to($('.qrcode_android'), 0.3, {autoAlpha:0, ease:Linear.easeNone});
            });

            var delayOpen = 0.1;

            // OPEN
            TweenMax.to($('nav'), 0.2, {autoAlpha:1, delay:delayOpen+0.4, onComplete:openCircles});
            TweenMax.to($('footer'), 0.5, {bottom:0, ease:Expo.easeOut, delay:delayOpen});
            TweenMax.to($('.order_footer_btn'), 0.55, {bottom:0, ease:Expo.easeOut, delay:delayOpen});
            TweenMax.to($('.order_footer_btn_visual'), 0.4, {bottom:0, ease:Expo.easeOut, delay:delayOpen+0.1});
            TweenMax.to($('header'), 0.5, {autoAlpha:1, delay:delayOpen});
            TweenMax.to($('.scroll_to_explore'), 0.4, {autoAlpha:1, delay:delayOpen+0.5});
            // header

            TweenMax.to($('.order_footer_btn_arrow'), 0, {right:55, alpha:0});
            $('.order_footer_btn_visual').on('mouseenter', function(event){
                TweenMax.to($('.order_footer_btn_visual .order_footer_btn_machine'), 0.28, {left:0, ease:Circ.easeInOut});
                TweenMax.to($('.order_footer_btn span'), 0.2, {right:16, ease:Circ.easeInOut, color:"#ffffff"});
                TweenMax.to($('.order_footer_btn_arrow'), 0.3, {right:31, ease:Circ.easeInOut, alpha:1});
            }).on('mouseleave', function(event){
                TweenMax.to($('.order_footer_btn_visual .order_footer_btn_machine'), 0.25, {left:20, ease:Circ.easeInOut});
                TweenMax.to($('.order_footer_btn span'), 0.25, {right:0, ease:Circ.easeInOut, color:"#1b1b1b"});
                TweenMax.to($('.order_footer_btn_arrow'), 0.25, {right:55, ease:Circ.easeInOut, alpha:0});
            });
        };

        //  ******************* PRIVATE ******************* 
        var mainMenuRollOver = function(target){
            circles[parseInt(target.attr('data-index'), 10)].animate({ r : 2, 'fill-opacity': 1, easing:'>'}, 200);
            TweenMax.to($('span', target), 0.3, {autoAlpha:1, ease:Linear.easeNone});
            TweenMax.to($('span', target), 0.3, {right:50, ease:Expo.easeOut});
        };
         var mainMenuRollOut = function(target){
            circles[parseInt(target.attr('data-index'), 10)].animate({ r : 4, 'fill-opacity': 0, easing:'<>'}, 300);
            TweenMax.to($('span', target), 0.3, {autoAlpha:0, ease:Linear.easeNone});
            TweenMax.to($('span', target), 0.3, {right:10, ease:Expo.easeIn});
        };
        var openCircles = function(){
            for (var i = 0; i < circles.length; i++) {
                TweenMax.delayedCall(0.06*i, openCircle, [circles[i]]);
            }
        };
        var openCircle = function(target){
            target.animate({ r : 4, easing:'backOut'},350);
        };
        var init = function(){
            // init states
            TweenMax.to($('footer ul li a'), 0, {alpha:0.3});
            TweenMax.to($('header'), 0, {autoAlpha:0});
			if(!Globals.oldie){
				TweenMax.to($('.scroll_to_explore'), 0, {autoAlpha:0});
				TweenMax.to($('nav'), 0, {autoAlpha:0});
			}
            TweenMax.to($('nav ul li a span'), 0, {autoAlpha:0});

            // create raphael circles
            self.resize();

            $('nav ul li').each(function(index) {
                $('a', this).attr('data-index', index);
                $('a', this).attr('data-selected', "0");
                var c = paper.circle($('nav').width()-32, index*menuSpace+20, (Globals.oldie)? 4 : 0).attr({
                    fill: "rgb(255,255,255)",
                    'fill-opacity': 0,
                    "stroke": "#fff",
                    "stroke-width": (Globals.oldie)? 1.5 : "1"});
                circles.push(c);
            });

            var centerY = $('#scroll_arrow').height()*0.5, centerX = $('#scroll_arrow').width()*0.5;
            cScroll = paperScroll.circle(centerX, centerY, 15).attr({
                    fill: "rgb(255,255,255)",
                    'fill-opacity': 1,
                    "stroke": "#fff",
                    "stroke-width": (Globals.oldie)? 1.5 : "1.5"});

            var arrowSizeY = 8, arrowSizeX = 12, arrowPointY = centerY+arrowSizeY*0.5, arrowTopY = centerY-arrowSizeY*0.5, arrowStartX = centerX-arrowSizeX*0.5, arrowEndX = centerX+arrowSizeX*0.5;
            arrowScroll = paperScroll.path("M"+arrowStartX+" "+arrowTopY+"L"+centerX+" "+arrowPointY+"L"+arrowEndX+" "+arrowTopY).attr({
                    "stroke": "#525150",
                    "stroke-width": (Globals.oldie)? 1.5 : "1.5"});
        };

        init();
    };

    return MainMenu;
});