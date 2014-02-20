define([
    "jquery",
    "tweenmax",
    "globals",
    "glfx"
], function($, TweenMax, Globals, fx) {

    var ImageElem = function(target) {
        var self = this;
        var element = target;
        var canvas, texture, canvasElement;
        this.brightnessValue = -1;
                
        // ******************* public *******************

        this.getElement = function(){
            return (typeof canvas !== "undefined")? canvasElement : element;
        };

        this.setSize = function(w,h){
            if(typeof canvas !== "undefined"){
                canvas.width = w;
                canvas.height = h;
                texture.width = w;
                texture.height = h;
                updateBrightness();
                //ctx.drawImage(element[0],0,0,w,h);
            }else{
                element.width(w);
                element.height(h);
            }
        };

        this.setCss = function(css){
            if(typeof canvas !== "undefined"){
                canvasElement.css(css);
            }else element.css(css);
        };

        this.setValue = function(val){
            if(typeof canvas !== "undefined"){
                self.brightnessValue = val;
                updateBrightness();
            }else TweenMax.to(element, 0, {alpha:val});
        };

        this.show = function(time, delay){
            if(typeof time == "undefined") time = 1;
            if(typeof delay == "undefined") delay = 0;
             if(typeof canvas !== "undefined"){
                TweenMax.killTweensOf(self);
                brightnessValue = -1;
                updateBrightness();
                TweenMax.to(self, time, {brightnessValue:0, delay:delay, onUpdate:updateBrightness});
             }else{
                TweenMax.killTweensOf(element);
                TweenMax.to(element, 0, {alpha:0});
                TweenMax.to(element, time, {alpha:1, delay:delay});
            }
        };

        this.hide = function(time, delay){
            if(typeof time == "undefined") time = 1;
            if(typeof delay == "undefined") delay = 0;
            if(typeof canvas !== "undefined"){
                TweenMax.killTweensOf(self);
                TweenMax.to(self, time, {brightnessValue:-1, delay:delay, onUpdate:updateBrightness});
             }else{
                TweenMax.killTweensOf(element);
                TweenMax.to(element, time, {alpha:0, delay:delay});
            }
        };

        // ******************* private *******************
        var updateBrightness = function(){
            canvas.draw(texture, canvas.width, canvas.height).brightnessContrast(self.brightnessValue, 0).update();
        };

        ///// INIT 
        if(Globals.canvas_enabled && navigator.userAgent.toLowerCase().indexOf('firefox') == -1){
            canvas = fx.canvas();
            texture = canvas.texture(element[0]);
            canvas.width = texture.width;
            canvas.height = texture.height;
            canvasElement = $(canvas);
            canvasElement.css('position', element.css('position'));
            canvasElement.css('z-index', element.css('z-index'));
            canvasElement.css('left', element.css('left'));
            canvasElement.css('top', element.css('top'));
            canvasElement.css('bottom', element.css('bottom'));
            canvasElement.css('margin-left', element.css('margin-left'));
            canvasElement.css('margin-right', element.css('margin-right'));
            canvasElement.css('margin-top', element.css('margin-top'));
            // replace the image with the canvas
            element[0].parentNode.insertBefore(canvas, element[0]);
            element.css("display", "none");
            self.brightnessValue = -1;
            //updateBrightness();
            //element.replaceWith(canvasElem);
        }else{
            TweenMax.to(element, 0, {alpha:0});
        }
    };

    return ImageElem;
});