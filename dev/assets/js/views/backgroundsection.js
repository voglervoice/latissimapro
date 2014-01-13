define([
    "jquery",
    "tweenmax",
    "views/imageelem"
], function($, TweenMax, ImageElem) {

    var BackgroundSection = function(parent) {
        var self = this;
        var element = $('.section_background', parent);
        var glImage = new ImageElem(element);
                
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
            glImage.setSize(imageW, imageH);
            glImage.setCss({'left':-(imageW-w)*0.5,'top':-(imageH-h)*0.5});
        };

        this.open = function(){
            glImage.show(2,0.6);
        };

        this.close = function(){
            glImage.hide(1.8);
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(element, 0, {alpha:0});
        };

        init();
    };

    return BackgroundSection;
});