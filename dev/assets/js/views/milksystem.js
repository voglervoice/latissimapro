define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection",
    "views/imageelem"
], function($, TweenMax, Events, publisher, BackgroundSection, ImageElem) {

    var MilkSystem = function() {
        var self = this;
        var currentRotation = 0;

        // ******************* public ******************* 
        this.elem = $('#milksystem');
        this.bg = new BackgroundSection(this.elem);
        var milkMachine = new ImageElem($(".milk_machine", this.elem));
        var milkElement = milkMachine.getElement();
        var ct = $('.milk_content', this.elem);

        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratio = h/863;
            milkMachine.setSize(618*ratio,687*ratio);
            milkElement.css({'margin-left': -(618+48)*ratio, 'left':'50%'});
            ct.width(w*0.5 - 270);
        };

        this.initOpen = function(){
            this.bg.open();
            milkElement.css('bottom', "-200px");
            milkMachine.show(1.2,1.2);
            TweenMax.to(milkElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
            currentRotation = 0;
            TweenMax.to($('.visual_pot'), 0, {rotation:currentRotation});
        };
        
        this.open = function(){
            TweenMax.killTweensOf($('.visual_pot'));
            animPot();
        };

        this.close = function(){
            this.bg.close();
            milkMachine.hide(1);
            TweenMax.to(milkElement, 0.9, {bottom:-200, ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0, onComplete:function(){TweenMax.killTweensOf($('.visual_pot'));}});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});
            TweenMax.to(ct, 0, {alpha:0});
        };

        var animPot =function(){
            currentRotation = (currentRotation === 0)? -90 : 0;
            TweenMax.to($('.visual_pot'), 1.1, {rotation:currentRotation, onComplete:animPot, delay:5, ease:Cubic.easeInOut });
        };

        init();
    };

    return MilkSystem;
});