define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "views/backgroundsection",
    "views/imageelem", "globals"
], function($, TweenMax, Events, publisher, Raphael, BackgroundSection, ImageElem, Globals) {

    var CoffeeRange = function() {
        var self = this, windowW, opened = false;
        var sets = [];
      
        // ******************* public ******************* 
        this.elem = $('#coffeerange');
        //this.bg = new BackgroundSection(this.elem);
        var bg = $('.bg_gradient', this.elem);
        var rangeMachine = new ImageElem($(".range_machine", this.elem));
        var rangeElement = rangeMachine.getElement();
        var ct = $(".range_content", this.elem);

        this.resize = function(w, h){
            windowW = w;
           // this.bg.resize(w, h);
            var ratio = h/863;
            var offsetCt = 115;
            var contentW = Math.max(744, w - (433*ratio+115)-200);
            contentW = Math.min(contentW, 900);
            if(w < 1165){
                ratio = w /1440;
                rangeElement.css('display', 'none');
                ct.css('left', w*0.5 - contentW*0.5);
            }else{
                rangeElement.css('display', 'block');

                if(w < 1220){
                    offsetCt = -10;
                    rangeElement.css('left', -45);
                }else if(w < 1315){
                    offsetCt = 25;
                    rangeElement.css('left', -30);
                }else{
                    rangeElement.css('left', 0);
                }
                ct.css('left', 433*ratio+offsetCt);
            }

            rangeMachine.setSize(433*ratio, 523*ratio);
            ct.width(contentW);
			if(Globals.oldie) $('.range_coffees').width(contentW);

            $('.content_line_sep', ct).width((Globals.oldie)? $('.range_description').width()-30 : $('.range_description').width());
            /*var diff = h - $('.range_content').height();
            if(diff < 90) $('.range_coffees').css('margin-top', 5);
            else if(diff > 200) $('.range_coffees').css('margin-top', 50);
            else $('.range_coffees').css('margin-top', 15);*/
            
            if(h<725){
                $('.range_description').removeClass('range_description_n');
                $('.range_description').addClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_n');
                $('h2', ct).addClass('h2_smaller');
            }else{
                $('.range_description').removeClass('content_span_text_smaller');
                $('.range_description').addClass('range_description_n');
                $('h2', ct).removeClass('h2_smaller');
                $('h2', ct).addClass('h2_n');
            }

            var offsetTop = 0;

            if(h < 620){
                $('.range_coffees').css('margin-top', 8);
                $('.content_line_sep', ct).css({'margin-top': 5, 'margin-bottom': 7});
                $('.range_cat_caps a div').width(37);
                $('.range_cat_caps a div').height(34);
                $('.range_cat_caps a div').css('margin-left', '9px');
                $('.range_cat_caps a').height(82);
                $('.range_cat_caps').height(96);
                $('.range_cat_caps a span').css('padding-top', '7px');
                $('.range_cat_title').height(25);

                if(h<580){
                    offsetTop = -8;
                    $('.range_cat_title').height(21);
                }

            }else if(h < 680){
                offsetTop = 10;
                $('.range_coffees').css('margin-top', 10);
                $('.content_line_sep', ct).css({'margin-top': 8, 'margin-bottom': 10});
                $('.range_cat_caps a div').width(44);
                $('.range_cat_caps a div').height(42);
                $('.range_cat_caps a div').css('margin-left', '4px');
                $('.range_cat_caps a').height(90);
                $('.range_cat_caps').height(104);
                $('.range_cat_caps a span').css('padding-top', '7px');
                $('.range_cat_title').height(27);
            }else{
                $('.content_line_sep', ct).css({'margin-top': 18, 'margin-bottom': 22});
                $('.range_cat_caps a div').width(52);
                $('.range_cat_caps a div').height(49);
                $('.range_cat_caps a div').css('margin-left', '0');
                $('.range_cat_caps a').height(100);
                $('.range_cat_caps a span').css('padding-top', '10px');
                $('.range_cat_caps').height(114);
                $('.range_cat_title').height(30);

                var diff = h - $('.range_content').height();
                if(diff > 200) $('.range_coffees').css('margin-top', 50);
                else $('.range_coffees').css('margin-top', 15);
            }
            ct.css('top', Math.max(75, (h-80-ct.height())*0.5)+offsetTop);
			var aW = $('.range_cat_caps a').width()+parseInt($('.range_cat_caps a').css('margin-right').replace('px', ''), 10);
			//if(Globals.oldie)
			if($('html').hasClass('ie')){
				$('.range_cat').each(function(index){
					$(this).width($('a', this).length*aW);
					/* $(this).width($('.range_cat_caps', this).width()); */
				});
			}
			
            $('.range_cat_title').each(function(event){
                $('div', this).width($(this).width()-$('span', this).width()-50);
            });
			
        };

        this.initOpen = function(){
            //this.bg.open();
            
            TweenMax.to(bg, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
            rangeMachine.show(1.2,1.2);
            rangeElement.css('bottom', '-200px');
            TweenMax.to(rangeElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
            opened = true;
            
        };

        this.close = function(){
            opened = false;
             TweenMax.killTweensOf(bg);
            TweenMax.to(bg, 2, {alpha:0});
            //this.bg.close();
            rangeMachine.hide(1);
            TweenMax.to(rangeElement, 0.9, {bottom:"-200", ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
       /* var showIntensity = function(set, force){
            for (var i = 0; i < force; i++) TweenMax.delayedCall(i*0.1, animateIntensity, [set[i]]);
        };*/

        //var animateIntensity = function(elem){ elem.animate({'fill-opacity': 1, 'stroke-opacity': 0}, 250); };

         var init = function(index){
		 TweenMax.to(bg, 0, {alpha:0});
			if(Globals.oldie){
				$('.range_cat').css('margin-right', '25');
			}
		 
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});
            TweenMax.to($('.range_cat_title div'), 0, {alpha:0.2});
            TweenMax.to($('.range_roll'), 0, {autoAlpha:0});
            TweenMax.to(ct, 0, {alpha:0});

            $('.range_coffees').on('mouseleave', function(event){
                TweenMax.to($('.range_cat_title'), 0.5, {alpha:1});
                TweenMax.to($('.range_cat_caps a'), 0.5, {alpha:1});
            });


            $('.range_cat_caps a').on('click', function(event){ event.preventDefault();
            }).on('mouseenter', function(event){
                if(opened){
                    TweenMax.to($('.range_cat_title'), 0.6, {alpha:0.2});
                    TweenMax.to($(".range_cat_caps a[data-id!='"+$(this).attr('data-id')+"']"), 0.6, {alpha:0.2});
                    var roll = $(".range_roll[data-id='"+$(this).attr('data-id')+"']");
                    var leftRoll = $(this).offset().left - 57;
                    var topRoll = $(this).offset().top - roll.height();
                    var maxW = Math.max(316, Math.max($('.range_roll_arom', roll).width(), $('.range_roll_milk', roll).width()));
       
                    if(leftRoll > windowW-(maxW+60)-150){
                        leftRoll = windowW-(maxW+60)-150;
                        $('.range_roll_pic', roll).css('left', Math.min($(this).offset().left-leftRoll+24, maxW+40));
                    }else
                        $('.range_roll_pic', roll).css('left', 81);

                   roll.width(maxW+60);
                   $('.range_roll_bg').width(maxW+54);
                    roll.css({'left':leftRoll, 'top':topRoll});
                    TweenMax.to(roll, 0, {scale:0.9, transformOrigin:'center bottom'});
                    TweenMax.to(roll, 0.2, {autoAlpha:1, ease:Linear.easeNone});
                    TweenMax.to(roll, 0.25, {scale:1, transformOrigin:'center bottom', ease:Expo.easeOut});
                    TweenMax.to($(this), 0.2, {autoAlpha:1, ease:Linear.easeNone});
                }
            }).on('mouseleave', function(event){
                var roll =$(".range_roll[data-id='"+$(this).attr('data-id')+"']");
                /*TweenMax.to($('.range_cat_title'), 0.5, {alpha:1});
                TweenMax.to($('.range_cat_caps a'), 0.5, {alpha:1});*/
                TweenMax.to($(this), 0.3, {autoAlpha:0.2, ease:Linear.easeNone});
                TweenMax.to(roll, 0.15, {autoAlpha:0, ease:Linear.easeNone});
            });

            $('.range_roll').each(function(index) {
                var force = parseInt($('.range_roll_intensity_value_num' ,this).html(), 10);
                var positionLeft = $('.range_roll_intensity', this).position().left + $('.range_roll_intensity', this).width() + 5;
                var container = $('.range_roll_intensity_value', this);
                container.css({'left':positionLeft});
                $('.range_roll_intensity_value_num', this).css({'left':positionLeft + container.width()});
                var paper = Raphael(container[0], container.width(), container.height());
                var set= paper.set(), radius = 3, posiX = 6, posiY = 8;
                for (var i = 0; i <12; i++) {
                    var c = paper.circle(posiX, posiY, radius).attr({
                        fill: "rgb(255,255,255)",
                        "stroke": "#fff",
                        "fill-opacity":(i<force)? '1':"0",
                        "stroke-width": (i<force)? '0':"1"});
                    set.push(c);
                    posiX += radius*2 + 5;
                }
                sets[$(this).attr('data-id')] = set;
            });
        };

        init();
    };

    return CoffeeRange;
});