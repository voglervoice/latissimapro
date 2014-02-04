define([
    "jquery",
    "tweenmax",
    "globals",
    "views/imageelem"
], function($, TweenMax, Globals, ImageElem) {

    var BackgroundSection = function(parent) {
        var self = this;
        var element = $('.section_background', parent);
        //var glImage = new ImageElem(element);
                
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
            /*glImage.setSize(imageW, imageH);
            glImage.setCss({'left':-(imageW-w)*0.5,'top':-(imageH-h)*0.5});*/
            element.width(imageW);
            element.height(imageH);
            element.css({'left':-(imageW-w)*0.5,'top':-(imageH-h)*0.5});
            return {width:imageW, height:imageH, left:-(imageW-w)*0.5, top:-(imageH-h)*0.5};
        };

        this.open = function(){
            //glImage.show(2,0);
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
        };

        this.close = function(){
            //glImage.hide(2.5, 0.2);
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 2, {alpha:0, ease:Linear.easeNone});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(element, 0, {alpha:0, ease:Linear.easeNone});
        };

        init();
    };

    return BackgroundSection;
});