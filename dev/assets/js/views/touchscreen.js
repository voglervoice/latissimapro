define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "views/backgroundsection",
    "views/imageelem", "globals"
], function($, TweenMax, Events, publisher, Raphael, BackgroundSection, ImageElem, Globals) {

    var Touchscreen = function() {
        var bulleScale = 1, ctaOn = true, windowW;
        var self = this, opened = false;
        var resizeRatio = 1;
         var positionInPaper = {x:0, y:0};
         var buttonWidth = $('.touchscreen_roll').first().width(), buttonInnerWidth = $('.touchscreen_roll_inner').first().width();
         var unvisibleButtons = [
            [{x:228,y:373},{x:323,y:388},{x:300,y:450},{x:197,y:435}],
            [{x:190,y:449},{x:294,y:461},{x:264,y:533},{x:156,y:518}],
            [{x:149,y:532},{x:256,y:547},{x:222,y:623},{x:113,y:607}],
            [{x:322,y:556},{x:432,y:572},{x:408,y:653},{x:294,y:634}],
            [{x:494,y:575},{x:618,y:595},{x:601,y:684},{x:476,y:664}],
            [{x:515,y:486},{x:637,y:505},{x:619,y:584},{x:503,y:568}],
            [{x:539,y:409},{x:653,y:425},{x:636,y:497},{x:525,y:480}]
         ];
         var rollPosition = [
            {x:319,y:390},
            {x:286,y:467},
            {x:249,y:551},
            {x:426,y:576},
            {x:608,y:603},
            {x:627,y:513},
            {x:644,y:432}
         ];
         var rollOffset = {x:-50, y:-250}, offsetLeft = 0;
         var btns = [], puces = [];
         var screenPos = {x:76, y:178};

        // ******************* public ******************* 
        this.elem = $('#touchscreen');
        //this.bg = new BackgroundSection(this.elem);
        var bg = $('.bg_gradient img', this.elem);
        var touchMachine = new ImageElem($(".touch_machine", this.elem));
        var touchElement = touchMachine.getElement();
        var ct = $('.touch_content', this.elem);
        var paper = Raphael("touchscreen_buttons", 1000, 1000);
        var paper2 = Raphael("touchscreen_puces", 1000, 1000);

        this.resize = function(w, h){
            bg.width(w);
            bg.height(h);

            windowW = w;
            //var dresize = this.bg.resize(w, h);
            var dresize = {left:0, top:0, width:w, height:h};
            $('.touch_vignettage').css({'left':dresize.left+'px', 'top':dresize.top+'px', 'width':dresize.width+'px', 'height':dresize.height+'px'});
            /*$('.touch_vignettage').width(w);
            $('.touch_vignettage').height(h);*/
            var ratioW = w/1440;
            resizeRatio = Math.min(h/864, ratioW);
            var imgWidth = 842*resizeRatio;
            if(imgWidth>w*0.5) {
                imgWidth = w*0.5;
                resizeRatio = imgWidth/842;
            }
            var ctWidth = Math.max(w-imgWidth-70- 190, 275);
            offsetLeft = Math.max(-77, w - imgWidth - ctWidth -70 -190);

            var ctLeft = offsetLeft+imgWidth+70;
            var topVal = h-864*resizeRatio;
            ct.css('left', ctLeft-(Math.min(450,ctWidth)-ctWidth)*0.7);
            ct.width(Math.min(450,ctWidth));
            $('#touchscreen_buttons').css({'top': topVal, 'left':offsetLeft});
            $('#touchscreen_puces').css({'top': topVal, 'left':offsetLeft});
            $('.touchscreen_rolls').css({'top': topVal, 'left':offsetLeft});
            touchElement.css({'top': topVal, 'left':offsetLeft});
            touchMachine.setSize(842*resizeRatio,864*resizeRatio);

            $('.touchscreen_roll').each(function(index) {
                var xRoll = positionInPaper.x + rollPosition[index].x*resizeRatio + rollOffset.x;
                var yRoll = positionInPaper.y + rollPosition[index].y*resizeRatio + rollOffset.y + 20;
                $(this).css({'left':xRoll, 'top': yRoll });
            });
            var i;
            for (i = 0; i < btns.length; i++) updateButton(btns[i]);
            for (i = 0; i < puces.length; i++){
                puces[i].attr({'cx':rollPosition[i].x*resizeRatio, 'cy':rollPosition[i].y*resizeRatio});
                puces[i].data('b').attr({'cx':rollPosition[i].x*resizeRatio, 'cy':rollPosition[i].y*resizeRatio});
                puces[i].data('b2').attr({'cx':rollPosition[i].x*resizeRatio, 'cy':rollPosition[i].y*resizeRatio});
            }

            $('.touchscreen_cta').css({'left': offsetLeft + 842*resizeRatio*0.5 - 70, 'top': topVal+50*resizeRatio});

            $('.screen_rolls').css({'top':screenPos.y*resizeRatio+topVal, 'left':screenPos.x*resizeRatio+offsetLeft});
            $('.screen_rolls img').width(639*resizeRatio);
            $('.screen_rolls img').height(517*resizeRatio);

            if(h<725 || w <1170){
                $('span', ct).removeClass('touch_description_n');
                $('span', ct).addClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_n');
                $('h2', ct).addClass('h2_smaller');
                $('.content_line_sep', ct).css({'margin-top': 11, 'margin-bottom': 13});
            }else{
                $('span', ct).removeClass('content_span_text_smaller');
                $('span', ct).addClass('touch_description_n');
                $('h2', ct).removeClass('h2_smaller');
                $('h2', ct).addClass('h2_n');
                $('.content_line_sep', ct).css({'margin-top': 18, 'margin-bottom': 22});
            }

            bulleScale = (w > 1500 && h > 1200)? 1 : 0.8 ;
            if(h < 650) bulleScale = 0.7;
        };

        this.initOpen = function(){
            for (var i = 0; i < puces.length; i++){
                puces[i].attr({'r':0});
                puces[i].data('b').attr({'r':0});
                puces[i].data('b2').attr({'r':0});
            }

            ctaOn = true;
			
            TweenMax.to($('.screen_rolls img'), 0, {alpha:0});
			if(Globals.oldie){
				$('.touchscreen_roll').css('display', 'none');
				$('.touchscreen_cta').css('display', 'none');
			}else{
				TweenMax.to($('.touchscreen_roll'), 0, {scale:bulleScale-0.2, alpha:0});
				TweenMax.to($('.touchscreen_cta'), 0, {alpha:0, scale:bulleScale-0.3});
			}

            //this.bg.open();
            TweenMax.to(bg, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
            
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});

            touchElement.css('left', offsetLeft-300);
            touchMachine.show(1.2,1.2);
            TweenMax.to(touchElement, 0.8, {left:offsetLeft, delay:0.8, ease:Circ.easeOut});
        };
        
        this.open = function(){
            opened = true;
            
            $('.touchscreen_cta span').css('margin-top', $('.touchscreen_cta span').height()*-0.5);
            $('#touchscreen_puces').css('display', "block");
            for (var i = 0; i < puces.length; i++){
                TweenMax.delayedCall(i*0.3, openPuce, [puces[i]]);
            }
			
			if(Globals.oldie)
				$('.touchscreen_cta').css('display', 'block');
			else
				TweenMax.to($('.touchscreen_cta'), 0.3, {alpha:0.75, scale:bulleScale-0.04, ease:Circ.easeOut, delay:0.8});

            this.elem.off("mousemove");
            this.elem.on("mousemove", function( event ) {
             
                  if(event.pageX > windowW*0.55 && !ctaOn){
                    ctaOn = true;
					if(Globals.oldie)
						$('.touchscreen_cta').css('display', 'block');
					else
						TweenMax.to($('.touchscreen_cta'), 0.3, {alpha:0.75, scale:bulleScale-0.04, ease:Circ.easeOut});
                  }
            });
        };

        this.close = function(){
            opened = false;
            this.elem.off("mousemove");
            //this.bg.close();
            TweenMax.killTweensOf(bg);
            TweenMax.to(bg, 2, {alpha:0});
            TweenMax.killDelayedCallsTo(openPuce);
            TweenMax.killDelayedCallsTo(pulseCircle);
            TweenMax.killDelayedCallsTo(pulseC);
            TweenMax.killTweensOf(ct);
            
            $('#touchscreen_puces').css('display', "none");

            TweenMax.killTweensOf($('.touchscreen_cta'));
			if(Globals.oldie)
				$('.touchscreen_cta').css('display', 'none');
			else
				TweenMax.to($('.touchscreen_cta'), 0.3, {alpha:0, scale:bulleScale-0.3, ease:Circ.easeIn});
            /*for (var i = 0; i < puces.length; i++){
                puces[i].animate({ r : 0, easing:'backIn', 'cx':rollPosition[i].x*resizeRatio - 30},100);
                puces[i].data('b').animate({ r : 0, easing:'backIn', 'cx':rollPosition[i].x*resizeRatio - 30},150);
                puces[i].data('b2').animate({ r : 0, easing:'backIn', 'cx':rollPosition[i].x*resizeRatio - 30},200);
            }*/

            TweenMax.to(ct, 0.5, {alpha:0});

            touchMachine.hide(1);
            TweenMax.to(touchElement, 0.9, {left:-300, ease:Circ.easeIn});
        };

        // ******************* private *******************
        var pulseCircle = function(el){
            if(opened){
                var baseDelay = 5;
                TweenMax.delayedCall(baseDelay, pulseC, [el.data('b2'), 10, 13]);
                TweenMax.delayedCall(baseDelay+0.1, pulseC, [el.data('b'), 7, 9]);
                TweenMax.delayedCall(baseDelay+0.3, pulseC, [el, 3, 5]);

                TweenMax.delayedCall(baseDelay, pulseCircle, [el]);
            }
        };

        var pulseC = function(c, baseR, newR){
            c.animate({ r : newR, easing:'>', callback:function(){
                if(opened) c.animate({ r : baseR, easing:'<>'},250);
            }},250);
        };

        var openPuce = function(el){
            el.data('b2').animate({ r : 10, easing:'backOut', callback:function(){
                if(opened) el.data('b').animate({ r : 7, easing:'backOut', callback:function(){
                    el.animate({ r : 3, easing:'backOut', callback:function(){
                     pulseCircle(el);
                    }},250);
                }},250);
            }},250);
        };

         var init = function(index){
            TweenMax.to(bg, 0, {alpha:0});
            TweenMax.to(ct, 0, {alpha:0});
            //TweenMax.to($('.touchscreen_roll'), 0, {scale:0.8, alpha:0});
            TweenMax.to($('.content_line_sep', ct), 0, {alpha:0.15});

            for (var i = 0; i < unvisibleButtons.length; i++) {
                    var p = paper.path("M"+positionInPaper.x+" "+positionInPaper.y)
                        .attr({
                        fill: "rgb(208,208,208)",
                        'fill-opacity': 0,
                        "stroke": "#fff",
                        "stroke-opacity": 0,
                        "stroke-width": "3",
                        "cursor":"pointer"})
                        .data('index',  i);
                        
                        updateButton(p);
                        p.hover(overButton, outButton, p, p);

                        btns.push(p);
                        
                    var c = paper2.circle(rollPosition[i].x*resizeRatio, rollPosition[i].y*resizeRatio, 6).attr({
                    "stroke-width": "1.5", "stroke": "#ffffff", "fill-opacity": "0", "stroke-opacity": "0.3"});
                    var c2 = paper2.circle(rollPosition[i].x*resizeRatio, rollPosition[i].y*resizeRatio, 9).attr({
                    "stroke-width": "3", "stroke": "#ffffff", "fill-opacity": "0", "stroke-opacity": "0.1"});
                    var puce = paper2.circle(rollPosition[i].x*resizeRatio, rollPosition[i].y*resizeRatio, 3).attr({
                    fill: "rgb(130,212,255)",
                    "stroke-width": "2",
                    "stroke": "#82d4ff",
                    "stroke-opacity": "0.3"}).data("b", c).data("b2", c2);
                     puces.push(puce);
            }
        };

        var overButton = function(){
            var elem = this;
            var id = parseInt(elem.data('index'), 10);
            var rollDiv = $('.touchscreen_roll:eq( '+elem.data('index')+' )');
            var motionTime = 0.3, motionEase = Circ.easeOut;
            //console.log("ON --> "+elem.data('index'));
            
            TweenMax.killTweensOf(rollDiv);
           /* TweenMax.killTweensOf(innerDiv);
            TweenMax.killTweensOf(innerDivImg);*/
			
			if(Globals.oldie)
				rollDiv.css('display', 'block');
			else
				TweenMax.to(rollDiv, motionTime, {scale:bulleScale, alpha:1, ease:motionEase});

            TweenMax.killTweensOf($('.touchscreen_cta'));
			if(Globals.oldie)
				$('.touchscreen_cta').css('display', 'none');
			else
				TweenMax.to($('.touchscreen_cta'), 0.2, {alpha:0, scale:bulleScale-0.3, ease:Circ.easeOut});
            ctaOn = false;
            /*
            TweenMax.to(rollDiv, motionTime, {
                left:parseInt(rollDiv.attr('data-left'), 10),
                top:parseInt(rollDiv.attr('data-top'), 10),
                borderRadius:buttonWidth*0.5,
                width:buttonWidth,
                height:buttonWidth,
                ease:motionEase});

            TweenMax.to(innerDiv, motionTime, {
                left:(buttonWidth-buttonInnerWidth)*0.5,
                top:(buttonWidth-buttonInnerWidth)*0.5,
                borderRadius:buttonInnerWidth*0.5,
                width:buttonInnerWidth,
                height:buttonInnerWidth,
                ease:motionEase});

            TweenMax.to(innerDivImg, motionTime, {
                left:0,
                top:0,
                ease:motionEase});*/

            /*TweenMax.to(innerDivImg, 0.7, {alpha:1, delay:0.1});
            TweenMax.to(rollDiv, motionTime*0.5, {alpha:1, delay:0.05});
*/
            $('.screen_rolls img').each(function(index) {
                TweenMax.to($(this), 0.5, {alpha:(index == id)? 1 : 0});
            });
        };

        var outButton = function(){
            var elem = this;
            var rollDiv = $('.touchscreen_roll:eq( '+elem.data('index')+' )');
            /*var innerDiv = $('.touchscreen_roll_inner', rollDiv);
            var innerDivImg = $('div', innerDiv);*/
            var motionTime = 0.27, motionEase = Circ.easeInOut;

            TweenMax.killTweensOf(rollDiv);
            /*TweenMax.killTweensOf(innerDiv);
            TweenMax.killTweensOf(innerDivImg);*/

            /*TweenMax.to(rollDiv, motionTime, {
                left:parseInt(rollDiv.attr('data-left'), 10) + buttonWidth*0.5,
                top:parseInt(rollDiv.attr('data-top'), 10) + buttonWidth*0.5,
                borderRadius:0,
                width:0,
                height:0,
                alpha:0,
                ease:motionEase});

            TweenMax.to(innerDiv, motionTime, {
                left:0,
                top:0,
                borderRadius:0,
                width:0,
                height:0,
                ease:motionEase});

            TweenMax.to(innerDivImg, motionTime, {
                left:(-buttonInnerWidth*0.5),
                top:(-buttonInnerWidth*0.5),
                ease:motionEase});*/
			
			if(Globals.oldie)
				rollDiv.css('display', 'none');
			else
				TweenMax.to(rollDiv, motionTime, {scale:bulleScale-0.2, alpha:0});
/*
            TweenMax.to(innerDivImg, motionTime*0.5, {alpha:0});*/
            TweenMax.to($('.screen_rolls img'), 0.5, {alpha:0});
        };

        var updateButton = function(elem){
            var datas = unvisibleButtons[elem.data('index')];
            var path = "M"+(positionInPaper.x+datas[0].x*resizeRatio)+" "+(positionInPaper.y+datas[0].y*resizeRatio);
            path += "L"+(positionInPaper.x+datas[1].x*resizeRatio)+" "+(positionInPaper.y+datas[1].y*resizeRatio);
            path += "L"+(positionInPaper.x+datas[2].x*resizeRatio)+" "+(positionInPaper.y+datas[2].y*resizeRatio);
            path += "L"+(positionInPaper.x+datas[3].x*resizeRatio)+" "+(positionInPaper.y+datas[3].y*resizeRatio);
            path += "L"+(positionInPaper.x+datas[0].x*resizeRatio)+" "+(positionInPaper.y+datas[0].y*resizeRatio);
            elem.attr({'path':path});
        };

        init();
    };

    return Touchscreen;
});