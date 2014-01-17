define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection",
    "views/imageelem"
], function($, TweenMax, Events, publisher, BackgroundSection, ImageElem) {

    var CoffeeRange = function() {
        var self = this;
      
        // ******************* public ******************* 
        this.elem = $('#coffeerange');
        this.bg = new BackgroundSection(this.elem);
        var rangeMachine = new ImageElem($(".range_machine", this.elem));
        var rangeElement = rangeMachine.getElement();
        var ct = $(".range_content", this.elem);

        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratio = h/863;
            rangeMachine.setSize(433*ratio, 523*ratio);
            ct.css('left', 433*ratio+115);
            ct.width(w - (433*ratio+115)-200);
            $('.content_line_sep', ct).width($('.range_description').width());
            $('.range_cat_title').each(function(event){
                $('div', this).width($(this).width()-$('span', this).width()-50);
            });
            
        };

        this.initOpen = function(){
            this.bg.open();
            rangeMachine.show(1.2,1.2);
            rangeElement.css('bottom', '-200px');
            TweenMax.to(rangeElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
            rangeMachine.hide(1);
            TweenMax.to(rangeElement, 0.9, {bottom:"-200", ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});
            TweenMax.to($('.range_cat_title div'), 0, {alpha:0.2});
            TweenMax.to(ct, 0, {alpha:0});
        };

        init();
    };

    return CoffeeRange;
});