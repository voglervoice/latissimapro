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
                
				if(!Globals.oldie){
					TweenMax.to($(".visual_fig"), 0, {scale:0.75, transformOrigin:'center top'});
					TweenMax.to($(".logo_clean"), 0, {scale:0.75, transformOrigin:'left top'});
				}else{
					$(".logo_clean").width(82*0.75);
					$(".logo_clean img").width(82*0.75);
					$(".logo_clean").height(136*0.75);
					$(".logo_clean img").height(136*0.75);
					$(".visual_fig").width(197*0.75);
					$(".fig_ie_visual").width(197*0.75);
					$(".visual_fig").height(204*0.75);
					$(".fig_ie_visual").height(129*0.75);
					$(".visual_pot").css('margin-left', (65*0.75)+'px');
					$(".visual_pot").width(66*0.75);
					$(".visual_pot img").width(66*0.75);
					$(".visual_pot").height(66*0.75);
					$(".visual_pot img").height(66*0.75);
					$(".milk_figdescription").css('top', '105px');
					$(".milk_figdescription").css('font-size', '12px');
					$(".milk_figdescription").css('line-height', '12px');
				}
                $(".logo_clean").css("margin-top", "7px");
                $(".visual_fig").css("margin-top", "12px");
                $(".logo_clean").css("margin-left", "2px");

                $('.visual_fig_ct', ct).height(155);
            }else{
                scaleBase = 0.9;
                $('.milk_description', ct).addClass('milk_description_n');
                $('.milk_description', ct).removeClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_smaller');
                $('h2', ct).addClass('h2_n');
                $('.content_line_milk_sep', ct).css({'margin-top': 17, 'margin-bottom': 12});
				if(!Globals.oldie){
					TweenMax.to($(".visual_fig"), 0, {scale:1, transformOrigin:'center top'});
					TweenMax.to($(".logo_clean"), 0, {scale:1, transformOrigin:'left top'});
				}else{
					$(".logo_clean").width(82);
					$(".logo_clean img").width(82);
					$(".logo_clean").height(136);
					$(".logo_clean img").height(136);
					$(".visual_fig").width(197);
					$(".fig_ie_visual").width(197);
					$(".visual_fig").height(204);
					$(".fig_ie_visual").height(129);
					$(".visual_pot").css('margin-left', '65px');
					$(".visual_pot").width(66);
					$(".visual_pot img").width(66);
					$(".visual_pot").height(66);
					$(".visual_pot img").height(66);
					$(".milk_figdescription").css('top', '142px');
					$(".milk_figdescription").css('font-size', '14px');
					$(".milk_figdescription").css('line-height', '14px');
				}
                $('.visual_fig_ct', ct).height(235);
                $(".logo_clean").css("margin-top", "22px");
                $(".logo_clean").css("margin-left", "12px");
                $(".visual_fig").css("margin-top", "29px");
            }

            if(w > 1400){scaleBase = 1;}

            milkElement.css('left', machineLeft);

            var zoomLeft = machineLeft+618*ratio-116;
            var zoomTop = h - 687*ratio-100;
            $('.milk_zoom').css({'left':zoomLeft, 'top':zoomTop});
			if(!Globals.oldie){
				TweenMax.to($('.milk_zoom'), 0, {scale:scaleBase});
			}else{
				$('.milk_zoom').width(240*scaleBase);
				$('.milk_zoom_inner').width(228*scaleBase);
				$('.milk_zoom_inner').css('top', 6*scaleBase);
				$('.milk_zoom_inner').css('left', 6*scaleBase);
				$('.milk_zoom').height(240*scaleBase);
				$('.milk_zoom_inner').height(228*scaleBase);
			}
            ct.css('margin-top', -ct.height()*0.5-30);
        };

        this.initOpen = function(){

			if(Globals.oldie){
				$('.milk_zoom').css('display', 'none');
			}else{
				TweenMax.to($('.milk_zoom'), 0, {scale:scaleBase-0.2, alpha:0});
				TweenMax.to($('.visual_pot'), 0, {rotation:currentRotation});
			}

            TweenMax.to(bg, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
            milkElement.css('bottom', "-200px");
            milkMachine.show(1.2,1.2);
            TweenMax.to(milkElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
            currentRotation = 0;
        };
        
        this.open = function(){
            TweenMax.killTweensOf($('.visual_pot'));
            if(!Globals.oldie) animPot();

            var motionTime = 0.4, motionEase = Circ.easeOut, delay = 1.5;
            TweenMax.killTweensOf($('.milk_zoom'));
			if(Globals.oldie){
				$('.milk_zoom').css('display', 'block');
			}else
				TweenMax.to($('.milk_zoom'), motionTime, {alpha:1,scale:scaleBase, ease:motionEase, delay:delay});
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

        };

        // ******************* private *******************
         var init = function(index){
			TweenMax.to(bg, 0, {alpha:0});
            TweenMax.to($('.content_line_milk_sep', ct), 0, {alpha:0.15});
            TweenMax.to(ct, 0, {alpha:0});

			if(!Globals.oldie){
				TweenMax.to($('.milk_zoom'), 0, {alpha:0});
			}else{
				$('.milk_zoom').css('display', 'none');
				
				var bgLogo3 = $('.visual_fig').css('background-image');
				bgLogo3 = bgLogo3.replace('url("','').replace('")','');
				bgLogo3 = bgLogo3.replace('url(','').replace(')','');
				bgLogo3 = bgLogo3.replace('..', 'assets');
				$('.visual_fig').prepend('<img src="'+bgLogo3+'" class="fig_ie_visual" />');
				$('.visual_fig').css('background-image', 'none');
				$('.fig_ie_visual').css('position', 'absolute');
				$('.fig_ie_visual').css('top', '0');
				$('.fig_ie_visual').css('left', '0');
				
				var bgLogo = $('.logo_clean').css('background-image');
				bgLogo = bgLogo.replace('url("','').replace('")','');
				bgLogo = bgLogo.replace('url(','').replace(')','');
				bgLogo = bgLogo.replace('..', 'assets');
				$('.logo_clean').html('<img src="'+bgLogo+'" />');
				$('.logo_clean').css('background-image', 'none');
				
				var bgLogo2 = $('.visual_pot').css('background-image');
				bgLogo2 = bgLogo2.replace('url("','').replace('")','');
				bgLogo2 = bgLogo2.replace('url(','').replace(')','');
				bgLogo2 = bgLogo2.replace('..', 'assets');
				$('.visual_pot').html('<img src="'+bgLogo2+'" />');
				$('.visual_pot').css('background-image', 'none');
				
                /*$('.visual_fig img').pngFix();
                $('.logo_clean img').pngFix();
                $('.visual_pot img').pngFix();*/
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