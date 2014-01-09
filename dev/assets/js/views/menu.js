define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs"
], function($, TweenMax, Events, publisher, Raphael) {
    /**
     * MainMenu
     * @param {HTMLElement} target
     * @constructor
     */
    var MainMenu = function(target) {
        var self = this;
        var menuSpace = 35;
        var paper = Raphael("menu_picts", $('nav').width(), $('nav').height());
        var circles = [];

        // ******************* public ******************* 
        this.resize = function(){
            $('.scroll_to_explore').css('margin-left', -$('.scroll_to_explore').width()*0.5);
            $('nav ul li').each(function(index) {
                $(this).css({'top':($('a', this).height() > 22)? menuSpace*index -1 :  menuSpace*index+9});
            });
            $('.order_footer_btn_visual').css('right', $('.order_footer_btn span').width()+75);
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
                circles[parseInt($(this).attr('data-index'), 10)].animate({ r : 2, 'fill-opacity': 1, easing:'>'}, 200);
                TweenMax.to($('span', this), 0.3, {autoAlpha:1, ease:Linear.easeNone});
                TweenMax.to($('span', this), 0.3, {marginRight:50, ease:Expo.easeOut});
            }).on('mouseleave', function(){
                circles[parseInt($(this).attr('data-index'), 10)].animate({ r : 4, 'fill-opacity': 0, easing:'<>'}, 300);
                TweenMax.to($('span', this), 0.3, {autoAlpha:0, ease:Linear.easeNone});
                TweenMax.to($('span', this), 0.3, {marginRight:10, ease:Expo.easeIn});
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
                var c = paper.circle($('nav').width()-32, index*menuSpace+20, 0).attr({
                    fill: "rgb(255,255,255)",
                    'fill-opacity': 0,
                    "stroke": "#fff",
                    "stroke-width": "1"});
                circles.push(c);
            });
        };

        init();
    };

    return MainMenu;
});