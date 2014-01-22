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
        var zoomW = $('.milk_zoom').width(), zoomInnerW = $('.milk_zoom_inner').width();

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

            $('.milk_zoom').attr('data-left', w*0.5 - 190*ratio);
            $('.milk_zoom').attr('data-top', h - 687*ratio-70);
            $('.milk_zoom').css({'left':w*0.5 - 190*ratio, 'top':h - 687*ratio-70});
        };

        this.initOpen = function(){
            this.bg.open();
            TweenMax.to($('.milk_zoom'), 0, {width:0, height:0, borderRadius:0, alpha:0});
            TweenMax.to($('.milk_zoom_inner'), 0, {width:0, height:0, borderRadius:0, left:0, top:0, borderColor:"#ffffff"});
            TweenMax.to($('.milk_zoom_img'), 0, {alpha:0});
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

            $('.milk_zoom').css({'left':parseInt($('.milk_zoom').attr('data-left'),10)+zoomW*0.5, 'top':parseInt($('.milk_zoom').attr('data-top'), 10)+zoomW*0.5});
            
            var motionTime = 0.5, motionEase = Circ.easeOut, delay = 1.5;
            TweenMax.killTweensOf($('.milk_zoom'));
            TweenMax.killTweensOf($('.milk_zoom_inner'));
            TweenMax.killTweensOf($('.milk_zoom_img'));

            TweenMax.to($('.milk_zoom'), motionTime, {
                left:parseInt($('.milk_zoom').attr('data-left'), 10),
                top:parseInt($('.milk_zoom').attr('data-top'), 10),
                width:zoomW,
                height:zoomW,
                borderRadius:zoomW*0.5,
                alpha:1,
                ease:motionEase, delay:delay});

            TweenMax.to($('.milk_zoom_inner'), motionTime, {
                left:(zoomW-zoomInnerW)*0.5-2, top:(zoomW-zoomInnerW)*0.5-2,
                width:zoomInnerW,
                height:zoomInnerW,
                borderRadius:zoomInnerW*0.5,
                ease:motionEase, delay:delay});

            TweenMax.to($('.milk_zoom_img'), 0.8, {
                alpha:1,
                delay:delay+motionTime-0.2});
        };

        this.close = function(){
            this.bg.close();
            milkMachine.hide(1);
            TweenMax.to(milkElement, 0.9, {bottom:-200, ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0, onComplete:function(){TweenMax.killTweensOf($('.visual_pot'));}});

            var motionTime = 0.4, motionEase = Circ.easeInOut;
            TweenMax.killTweensOf($('.milk_zoom'));
            TweenMax.killTweensOf($('.milk_zoom_inner'));
            TweenMax.killTweensOf($('.milk_zoom_img'));

            TweenMax.to($('.milk_zoom_img'), motionTime*0.6, {alpha:0});
            TweenMax.to($('.milk_zoom'), motionTime, {
                left:parseInt($('.milk_zoom').attr('data-left'), 10)+zoomW*0.5,
                top:parseInt($('.milk_zoom').attr('data-top'), 10)+zoomW*0.5,
                width:0,
                height:0,
                borderRadius:0,
                alpha:0,
                ease:motionEase});

            TweenMax.to($('.milk_zoom_inner'), motionTime, {
                left:0, top:0,
                width:0,
                height:0,
                borderRadius:0,
                borderColor:"#000000",
                ease:motionEase});

        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to($('.content_line_milk_sep', ct), 0, {alpha:0.15});
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