define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection"
], function($, TweenMax, Events, publisher, BackgroundSection) {

    var Touchscreen = function() {
        var self = this;
      

        // ******************* public ******************* 
        this.elem = $('#touchscreen');
        this.bg = new BackgroundSection(this.elem);
        var ct = $('.touch_content', this.elem);

        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratioW = w/1440;
            var imgWidth = 827*ratioW;
            var ctLeft = imgWidth+60;
            ct.css('left', ctLeft);
            ct.width(w-ctLeft- 230);
        };

        this.initOpen = function(){
            this.bg.open();
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(ct, 0, {alpha:0});
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});
        };

        init();
    };

    return Touchscreen;
});