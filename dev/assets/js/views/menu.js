define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs"
], function($, TweenMax, Events, publisher, Raphael) {
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

        // ******************* public ******************* 
        this.resize = function(){
            $('.scroll_to_explore').css('margin-left', -$('.scroll_to_explore').width()*0.5);
            $('nav ul li').each(function(index) {
                $(this).css({'top':($('a', this).height() > 22)? menuSpace*index -1 :  menuSpace*index+9});
            });
            $('.order_footer_btn_visual').css('right', $('.order_footer_btn span').width()+75);
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
        };

        this.start = function() {
            console.log("Start menu");
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

            var delayOpen = 0.5;

            // OPEN
            TweenMax.to($('nav'), 0.2, {autoAlpha:1, delay:delayOpen+0.4, onComplete:openCircles});
            TweenMax.to($('footer'), 0.5, {bottom:0, ease:Expo.easeOut, delay:delayOpen});
            TweenMax.to($('.order_footer_btn'), 0.55, {bottom:0, ease:Expo.easeOut, delay:delayOpen});
            TweenMax.to($('.order_footer_btn_visual'), 0.4, {bottom:0, ease:Expo.easeOut, delay:delayOpen+0.1});
            TweenMax.to($('header'), 0.5, {autoAlpha:1, delay:delayOpen});
            TweenMax.to($('.scroll_to_explore'), 0.4, {autoAlpha:1, delay:delayOpen+0.5});
            // header
        };

        //  ******************* PRIVATE ******************* 
        var mainMenuRollOver = function(target){
            circles[parseInt(target.attr('data-index'), 10)].animate({ r : 2, 'fill-opacity': 1, easing:'>'}, 200);
            TweenMax.to($('span', target), 0.3, {autoAlpha:1, ease:Linear.easeNone});
            TweenMax.to($('span', target), 0.3, {marginRight:50, ease:Expo.easeOut});
        };
         var mainMenuRollOut = function(target){
            circles[parseInt(target.attr('data-index'), 10)].animate({ r : 4, 'fill-opacity': 0, easing:'<>'}, 300);
            TweenMax.to($('span', target), 0.3, {autoAlpha:0, ease:Linear.easeNone});
            TweenMax.to($('span', target), 0.3, {marginRight:10, ease:Expo.easeIn});
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
            TweenMax.to($('.scroll_to_explore'), 0, {autoAlpha:0});
            TweenMax.to($('nav'), 0, {autoAlpha:0});
            TweenMax.to($('nav ul li a span'), 0, {autoAlpha:0});

            // create raphael circles
            self.resize();

            $('nav ul li').each(function(index) {
                $('a', this).attr('data-index', index);
                $('a', this).attr('data-selected', "0");
                var c = paper.circle($('nav').width()-32, index*menuSpace+20, 0).attr({
                    fill: "rgb(255,255,255)",
                    'fill-opacity': 0,
                    "stroke": "#fff",
                    "stroke-width": "1"});
                circles.push(c);
            });

            var centerY = $('#scroll_arrow').height()*0.5, centerX = $('#scroll_arrow').width()*0.5;
            cScroll = paperScroll.circle(centerX, centerY, 15).attr({
                    fill: "rgb(255,255,255)",
                    'fill-opacity': 1,
                    "stroke": "#fff",
                    "stroke-width": "1.5"});

            var arrowSizeY = 8, arrowSizeX = 12, arrowPointY = centerY+arrowSizeY*0.5, arrowTopY = centerY-arrowSizeY*0.5, arrowStartX = centerX-arrowSizeX*0.5, arrowEndX = centerX+arrowSizeX*0.5;
            arrowScroll = paperScroll.path("M"+arrowStartX+" "+arrowTopY+"L"+centerX+" "+arrowPointY+"L"+arrowEndX+" "+arrowTopY).attr({
                    "stroke": "#525150",
                    "stroke-width": "1.5"});
        };

        init();
    };

    return MainMenu;
});