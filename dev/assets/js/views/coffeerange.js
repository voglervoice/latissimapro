define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "views/backgroundsection",
    "views/imageelem"
], function($, TweenMax, Events, publisher, Raphael, BackgroundSection, ImageElem) {

    var CoffeeRange = function() {
        var self = this, windowW;
        var sets = [];
      
        // ******************* public ******************* 
        this.elem = $('#coffeerange');
        this.bg = new BackgroundSection(this.elem);
        var rangeMachine = new ImageElem($(".range_machine", this.elem));
        var rangeElement = rangeMachine.getElement();
        var ct = $(".range_content", this.elem);

        this.resize = function(w, h){
            windowW = w
            this.bg.resize(w, h);
            var ratio = h/863;
            var offsetCt = 115;
            if(w < 1165){
                ratio = w /1440;
                rangeElement.css('left', -180*ratio);
                offsetCt = -100*ratio-45;
            }else if(w < 1190){
                offsetCt = -10;
                rangeElement.css('left', -45);
            }else if(w < 1280){
                offsetCt = 25;
                rangeElement.css('left', -30);
            }else
                rangeElement.css('left', 0);

            rangeMachine.setSize(433*ratio, 523*ratio);
            
            
            ct.css('left', 433*ratio+offsetCt);
            var contentW = Math.max(744, w - (433*ratio+115)-200);
         
            ct.width(contentW);

            $('.content_line_sep', ct).width($('.range_description').width());
            $('.range_cat_title').each(function(event){
                $('div', this).width($(this).width()-$('span', this).width()-50);
            });
            var diff = h - $('.range_content').height();
            if(diff < 90) $('.range_coffees').css('margin-top', 5);
            else if(diff > 200) $('.range_coffees').css('margin-top', 50);
            else $('.range_coffees').css('margin-top', 15);
            
            if(h < 695)
                $('.content_line_sep', ct).css({'margin-top': 9, 'margin-bottom': 11});
            else
                $('.content_line_sep', ct).css({'margin-top': 18, 'margin-bottom': 22});

            ct.css('top', Math.max(75, (h -86-ct.height())*0.5));
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
       /* var showIntensity = function(set, force){
            for (var i = 0; i < force; i++) TweenMax.delayedCall(i*0.1, animateIntensity, [set[i]]);
        };*/

        //var animateIntensity = function(elem){ elem.animate({'fill-opacity': 1, 'stroke-opacity': 0}, 250); };

         var init = function(index){
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});
            TweenMax.to($('.range_cat_title div'), 0, {alpha:0.2});
            TweenMax.to($('.range_roll'), 0, {autoAlpha:0});
            TweenMax.to(ct, 0, {alpha:0});

            $('.range_cat_caps a').on('click', function(event){ event.preventDefault();
            }).on('mouseenter', function(event){
                TweenMax.to($('.range_cat_title'), 0.6, {alpha:0.2});
                TweenMax.to($(".range_cat_caps a[data-id!='"+$(this).attr('data-id')+"']"), 0.6, {alpha:0.2});
                var roll = $(".range_roll[data-id='"+$(this).attr('data-id')+"']");
                var leftRoll = $(this).offset().left - 57;
                var topRoll = $(this).offset().top - roll.height();
                var maxW = Math.max(316, Math.max($('.range_roll_arom', roll).width(), $('.range_roll_milk', roll).width()));
   
                if(leftRoll > windowW-(maxW+60)-170){
                    leftRoll = windowW-(maxW+60)-170;
                    $('.range_roll_pic', roll).css('left', $(this).offset().left-leftRoll+24);
                }else
                    $('.range_roll_pic', roll).css('left', 81);

                //roll.width(376);
               // $('.range_roll_bg').width(362);
               roll.width(maxW+60);
               $('.range_roll_bg').width(maxW+54);
                roll.css({'left':leftRoll, 'top':topRoll});
                //TweenMax.killDelayedCallsTo(animateIntensity);
                /*var set = sets[$(this).attr('data-id')];
                set.attr({ "fill-opacity":"0", "stroke-opacity": "1"});*/
                //TweenMax.to(roll, 0.6, {autoAlpha:1, ease:Linear.easeNone, onComplete:showIntensity, onCompleteParams:[set, $('.range_roll_intensity_value_num' ,roll).html()]});
                TweenMax.to(roll, 0.6, {autoAlpha:1, ease:Linear.easeNone});
            }).on('mouseleave', function(event){
                TweenMax.to($('.range_cat_title'), 0.5, {alpha:1});
                TweenMax.to($('.range_cat_caps a'), 0.5, {alpha:1});
                TweenMax.to($(".range_roll[data-id='"+$(this).attr('data-id')+"']"), 0.5, {autoAlpha:0, ease:Linear.easeNone});
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