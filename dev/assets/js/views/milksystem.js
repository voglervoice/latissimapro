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
      

        // ******************* public ******************* 
        this.elem = $('#milksystem');
        this.bg = new BackgroundSection(this.elem);
        var milkMachine = new ImageElem($(".milk_machine", this.elem));
        var milkElement = milkMachine.getElement();
        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratio = h/900;
            milkMachine.setSize(618*ratio,687*ratio);
            milkElement.css({'margin-left': -(618+48)*ratio, 'left':'50%'});
        };

        this.initOpen = function(){
            this.bg.open();
            milkElement.css('bottom', "-200px");
            milkMachine.show(1.2,1.2);
            TweenMax.to(milkElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
            milkMachine.hide(1);
            TweenMax.to(milkElement, 0.9, {bottom:-200, ease:Circ.easeIn});
        };

        // ******************* private *******************
         var init = function(index){
        };

        init();
    };

    return MilkSystem;
});