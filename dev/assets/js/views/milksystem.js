define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection",
    "views/imageelem", "globals"
], function($, TweenMax, Events, publisher, BackgroundSection, ImageElem, Globals) {

    var MilkSystem = function() {
        var self = this, scaleBase = 1;
        var currentRotation = 0;
        var zoomW = $('.milk_zoom').width(), zoomInnerW = $('.milk_zoom_inner').width();

        // ******************* public ******************* 
        this.elem = $('#milksystem');
        //this.bg = new BackgroundSection(this.elem);
        var bg = $('.bg_gradient img', this.elem);
        var milkMachine = new ImageElem($(".milk_machine", this.elem));
        var milkElement = milkMachine.getElement();
        var ct = $('.milk_content', this.elem);

        this.resize = function(w, h){
            //this.bg.resize(w, h);
            bg.width(w);
            bg.height(h);

            var marginLeftCt = 150;
            var marginImgRight = 95;
            if(w > 1400) marginImgRight = 160;
            else if(w > 1160) marginImgRight = 125;

            var ratio = Math.min(h/1000, w/1440);
            if(618*ratio > w*0.5-marginImgRight-20){
                ratio = (w*0.5-marginImgRight-20)/618;
            }
            //var ctWidth = Math.max(450, w*0.5 - 270);
            var ctWidth = Math.min(w*0.5 - marginLeftCt, 550);
            var machineLeft = w*0.5-618*ratio-marginImgRight;
            milkMachine.setSize(618*ratio,687*ratio);
            
            ct.css('left', Math.max(w*0.5, w*0.5 + (w*0.5-ctWidth-marginLeftCt)*0.5));
            ct.width(ctWidth);

            $('.visual_fig').css('margin-left', (ctWidth-292)*0.5);

            if(h<705 || w < 1160){
                scaleBase = 0.6;
                $('.milk_description', ct).removeClass('milk_description_n');
                $('.milk_description', ct).addClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_n');
                $('h2', ct).addClass('h2_smaller');
                $('.content_line_milk_sep', ct).css({'margin-top': 10, 'margin-bottom': 8});
                
                TweenMax.to($(".visual_fig"), 0, {scale:0.75, transformOrigin:'center top'});
                TweenMax.to($(".logo_clean"), 0, {scale:0.75, transformOrigin:'left top'});
                $(".logo_clean").css("margin-top", "7px");
                $(".visual_fig").css("margin-top", "12px");
                $(".logo_clean").css("margin-left", "2px");

                $('.visual_fig_ct', ct).height(155);
                /*$('.visual_fig span', ct).removeClass('milk_figdescription');
                $('.visual_fig span', ct).addClass('milk_figdescription_smaller');
                $('.visual_pot', ct).width(50);
                $('.visual_pot', ct).height(50);
                $('.visual_fig').height(170);*/
            }else{
                scaleBase = 0.9;
                $('.milk_description', ct).addClass('milk_description_n');
                $('.milk_description', ct).removeClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_smaller');
                $('h2', ct).addClass('h2_n');
                $('.content_line_milk_sep', ct).css({'margin-top': 17, 'margin-bottom': 12});
                TweenMax.to($(".visual_fig"), 0, {scale:1, transformOrigin:'center top'});
                TweenMax.to($(".logo_clean"), 0, {scale:1, transformOrigin:'left top'});
                $('.visual_fig_ct', ct).height(235);
                $(".logo_clean").css("margin-top", "22px");
                $(".logo_clean").css("margin-left", "12px");
                $(".visual_fig").css("margin-top", "29px");
                /*$('.visual_fig span', ct).removeClass('milk_figdescription_smaller');
                $('.visual_fig span', ct).addClass('milk_figdescription');
                 $('.visual_pot', ct).width(66);
                $('.visual_pot', ct).height(66);
                $('.visual_fig').height(204);*/
            }

            if(w > 1400){scaleBase = 1;}

            milkElement.css('left', machineLeft);

            var zoomLeft = machineLeft+618*ratio-116;
            var zoomTop = h - 687*ratio-100;
            $('.milk_zoom').css({'left':zoomLeft, 'top':zoomTop});

            TweenMax.to($('.milk_zoom'), 0, {scale:scaleBase});
            ct.css('margin-top', -ct.height()*0.5-30);
        };

        this.initOpen = function(){
            //this.bg.open();
			if(Globals.oldie){
				$('.milk_zoom').css('display', 'none');
			}else
				TweenMax.to($('.milk_zoom'), 0, {scale:scaleBase-0.2, alpha:0});
            /*TweenMax.to($('.milk_zoom'), 0, {width:0, height:0, borderRadius:0, alpha:0});
            TweenMax.to($('.milk_zoom_inner'), 0, {width:0, height:0, borderRadius:0, left:0, top:0, borderColor:"#ffffff"});
            TweenMax.to($('.milk_zoom_img'), 0, {alpha:0});*/
            TweenMax.to(bg, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
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

            //$('.milk_zoom').css({'left':parseInt($('.milk_zoom').attr('data-left'),10)+zoomW*0.5, 'top':parseInt($('.milk_zoom').attr('data-top'), 10)+zoomW*0.5});
            
            var motionTime = 0.4, motionEase = Circ.easeOut, delay = 1.5;
            TweenMax.killTweensOf($('.milk_zoom'));
			if(Globals.oldie){
				$('.milk_zoom').css('display', 'block');
			}else
				TweenMax.to($('.milk_zoom'), motionTime, {alpha:1,scale:scaleBase, ease:motionEase, delay:delay});
            /*TweenMax.killTweensOf($('.milk_zoom_inner'));
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
                delay:delay+motionTime-0.2});*/
        };

        this.close = function(){
            //this.bg.close();
            TweenMax.killTweensOf(bg);
            TweenMax.to(bg, 2, {alpha:0, ease:Linear.easeNone});
            milkMachine.hide(1);
            TweenMax.to(milkElement, 0.9, {bottom:-200, ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0, onComplete:function(){TweenMax.killTweensOf($('.visual_pot'));}});

            var motionTime = 0.4, motionEase = Circ.easeInOut;
            TweenMax.killTweensOf($('.milk_zoom'));
			if(Globals.oldie){
				$('.milk_zoom').css('display', 'none');
			}else
				TweenMax.to($('.milk_zoom'), motionTime, {scale:scaleBase-0.2, alpha:0, ease:motionEase});
            /*TweenMax.killTweensOf($('.milk_zoom_inner'));
            TweenMax.killTweensOf($('.milk_zoom_img'));*/

           /* TweenMax.to($('.milk_zoom_img'), motionTime*0.6, {alpha:0});
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
                ease:motionEase});*/

        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(bg, 0, {alpha:0});
            TweenMax.to($('.content_line_milk_sep', ct), 0, {alpha:0.15});
            TweenMax.to(ct, 0, {alpha:0});
            //TweenMax.to($('.milk_zoom'), 0, {width:0, height:0, borderRadius:0, alpha:0});
			if(Globals.oldie)
				$('.milk_zoom').css('display', 'none');
			else
				TweenMax.to($('.milk_zoom'), 0, {alpha:0});

            if($('html').hasClass('oldie')){
                $('.visual_fig').pngFix();
                $('.logo_clean').pngFix();
                $('.visual_pot').pngFix();
            }
        };

        var animPot =function(){
            currentRotation = (currentRotation === 0)? -90 : 0;
            TweenMax.to($('.visual_pot'), 1.1, {rotation:currentRotation, onComplete:animPot, delay:5, ease:Cubic.easeInOut });
        };

        init();
    };

    return MilkSystem;
});