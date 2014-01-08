define([
    "jquery",
    "tweenmax",
    "events",
    "publisher"
], function($, TweenMax, Events, publisher) {
    /**
     * MainMenu
     * @param {HTMLElement} target
     * @constructor
     */
    var MainMenu = function(target) {
        var self = this;

        // public
        this.start = function() {
            console.log("Start menu");
            $('nav a').on('click', function(event){
                event.preventDefault();
                publisher.publish(Events.navigate, $(this).attr('data-link'));
            });
            // footer
            TweenMax.to($('footer ul li a'), 0, {alpha:0.3});
            TweenMax.to($('header'), 0, {autoAlpha:0});

            $('footer ul li a').on('mouseover', function(){
                TweenMax.to($(this), 0.3, {alpha:1});
            }).on('mouseout', function(){
                TweenMax.to($(this), 0.3, {alpha:0.3});
            });
            TweenMax.to($('footer'), 0.5, {bottom:0, ease:Expo.easeOut, delay:0.2});
            TweenMax.to($('.order_footer_btn'), 0.55, {bottom:0, ease:Expo.easeOut, delay:0.2});
            TweenMax.to($('header'), 0.5, {autoAlpha:1, delay:0.2});
            // header
        };
    };

    return MainMenu;
});