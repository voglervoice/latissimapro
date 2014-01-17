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
            var ratioH = h/864;
            var ratioW = w/1440;
            designMachine.setSize(432*ratioH,671*ratioH);
            ct.css('left', 432*ratioH+77 );
            ct.width(w - 432*ratioH-180);
            $('.design_content_title').width(Math.min(w - 432*ratioH-180, Math.max(500, $("h2", this.elem).width()+10)));
        };

        this.initOpen = function(){
            this.bg.open();
            designElement.css('bottom', "-200px");
            designMachine.show(1.2,1.2);
            TweenMax.to(designElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            designMachine.show(1.2,1.2);
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        };

        this.close = function(){
            this.bg.close();
            designMachine.hide(1);
            TweenMax.to(designElement, 0.9, {bottom:-200, ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(ct, 0, {alpha:0});
            TweenMax.to($('.content_line_design_sep', ct), 0, {alpha:0.15});
            TweenMax.to($('.design_content_infos_col div', ct), 0, {alpha:0.28});
            TweenMax.to($('.design_content_infos ul li', ct), 0, {alpha:0.6});
        };

        init();
    };

    return Design;
});