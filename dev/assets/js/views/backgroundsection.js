define([
    "jquery",
    "tweenmax",
    "events",
    "publisher"
], function($, TweenMax, Events, publisher) {

    var BackgroundSection = function(parent) {
        var self = this;
        var element = $('.section_background', parent);
                
        // ******************* public ******************* 
        this.resize = function(w, h){
            var baseImageW = parseInt( element.attr('data-w'), 10);
            var baseImageH = parseInt( element.attr('data-h'), 10);
            var imageW = w;
            var imageH = baseImageH*w/baseImageW;
            if(imageH < h){
                    imageH = h;
                    imageW = baseImageW*h/baseImageH;
            }
            element.width(imageW);
            element.height(imageH);
            element.css('left', -(imageW-w)*0.5);
            element.css('top', -(imageH-h)*0.5);
        };

        this.open = function(){
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 0, {alpha:0});
            TweenMax.to(element, 2, {alpha:1, delay:0.6});
        };

        this.close = function(){
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 1.8, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(element, 0, {alpha:0});
        };

        init();
    };

    return BackgroundSection;
});