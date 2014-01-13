define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection",
    "views/imageelem"
], function($, TweenMax, Events, publisher, BackgroundSection, ImageElem) {

    var Design = function() {
        var self = this;
      

        // ******************* public ******************* 
        this.elem = $('#design');
        this.bg = new BackgroundSection(this.elem);
        var designMachine = new ImageElem($(".design_machine", this.elem));
        var designElement = designMachine.getElement();
        var ct = $(".design_content", this.elem);

        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratioH = h/750;
            var ratioW = w/1440;
            designMachine.setSize(361*ratioH,558*ratioH);
            designElement.css({'margin-left': -(361+150)*ratioW, 'left':'50%', 'margin-top':-200*ratioH, 'top':'50%'});
        };

        this.initOpen = function(){
            this.bg.open();
            designMachine.show(1.2,1.2);
            TweenMax.from(designElement, 0.8, {marginTop:"-200", delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
            designMachine.hide(1);
            TweenMax.to(designElement, 0.9, {marginTop:"+200", ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(ct, 0, {alpha:0});
        };

        init();
    };

    return Design;
});