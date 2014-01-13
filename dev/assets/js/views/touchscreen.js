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
        this.resize = function(w, h){
            this.bg.resize(w, h);
        };

        this.initOpen = function(){
            this.bg.open();
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
        };

        // ******************* private *******************
         var init = function(index){
        };

        init();
    };

    return Touchscreen;
});