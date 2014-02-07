define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "views/backgroundsection",
    "views/imageelem"
], function($, TweenMax, Events, publisher, Raphael, BackgroundSection, ImageElem) {

    var Home = function() {
        var btnRectH = 33, windowW, windowH;
        var radius = Math.floor(btnRectH*0.5) - 5;
        var self = this, ratio = 1;
        var raphaW = $('#raphael_home_anchors').width(), promoW;
        var raphaH = $('#raphael_home_anchors').height();
        var paper = Raphael("raphael_home_anchors", raphaW, raphaH);
        var lines= [], circleBase = [], circlePulse1 = [], circlePulse2 = [], rects = [], aXEnd = [], puces = [], arrows = [];

        // ******************* public ******************* 
        this.elem = $('#home');
        this.bg = new BackgroundSection(this.elem);
        var homeMachine = new ImageElem($(".home_machine", this.elem));
        var homeElement = homeMachine.getElement();

        this.resize = function(w, h){
            windowW = w; windowH = h;
            this.bg.resize(w,h);
            //homeElement.css({'left':'50%', 'top':'50%'});
            ratio = Math.min(Math.min(h/864, w/1440), 1.4);
            homeMachine.setSize(574*ratio,567*ratio);
            homeElement.css({'left':(w-574*ratio)*0.5, 'top':(h-567*ratio)*0.5});

            $('.home_anchors a').each(function(index){ reposiBtn($(this), index);});
        };

        this.initOpen = function(){
            promoW = 20+$('.home_promotion_price').width()+Math.max($('.home_promotion_date').width(), $('.home_promotion_cta').width() +15) + 40;

            $('.home_promotion_price_currency').css('left', $('.home_promotion_price').width()+20);

            if($('.home_promotion_price_currency').width() === 0)
                $('.home_promotion_cta').css('left', $('.home_promotion_price').width()+20);
            else
                $('.home_promotion_cta').css('left', $('.home_promotion_price').width()+20 +$('.home_promotion_price_currency').width()+20);
            
            $('.home_promotion').width(promoW);
            $('.home_promotion_border').width(promoW-10);
            $('.home_promotion').css('right', "-"+promoW+"px");

            this.bg.open();
            for (var i = 0; i < lines.length; i++) {
                // init
                circleBase[i].attr({r: 0});
                circlePulse1[i].attr({r: 0});
                circlePulse2[i].attr({r: 0});
                puces[i].attr({r: 0});
                arrows[i].attr({path: arrows[i].data("introPath"), "stroke-width":"0"});
                lines[i].attr({path: lines[i].data("initPath")});
                rects[i].attr({x: rects[i].data("xInit"), y:rects[i].data("yInit"), width:0, height:0});
                var linkElem = $(".home_anchors a[data-index='"+i+"']");
                TweenMax.to(linkElem, 0, {alpha:0, left:parseInt(linkElem.attr('data-initl'), 10)});
            }

            homeMachine.show(1.2,1.2);
        };

        this.open = function(){
            var delayAnchor = 0.5;
            for (var i = 0; i < lines.length; i++) {
                // start animation
                TweenMax.delayedCall(delayAnchor+0.2*i, openCircle, [i]);
                TweenMax.delayedCall(delayAnchor+0.2*i+0.2, openLine, [i]);
            }

            if($('.home_promotion').attr('data-on') == '1')
            {
                $('.home_promotion').css('visibility', 'visible');
                TweenMax.to($('.home_promotion'), 0.35, {right:"-20px", ease:Expo.easeOut, delay:3});
            }else{
                $('.home_promotion').css('display', 'none');
            }
        };

        this.close = function(){
            this.bg.close();
          
            TweenMax.killDelayedCallsTo(openCircle);
            TweenMax.killDelayedCallsTo(openLine);
            TweenMax.killDelayedCallsTo(openPuce);
            TweenMax.killDelayedCallsTo(pulseCircle);

            $('.home_anchors a').each(function(index) {
                TweenMax.killTweensOf($(this));
                var rect = rects[index];
                rect.animate({ width : 0, x:rect.data("xInit"), easing:'<>'},260);
                TweenMax.delayedCall(0.15, function(){rect.animate({ height : 0, y:rect.data("yInit"), easing:'<>'},100);});
                TweenMax.to($(this), 0.25, {alpha:0, left:parseInt($(this).attr('data-initl'), 10), ease:Circ.easeIn});
                var arrow = arrows[index];
                puces[index].animate({ r : 0, easing:'<>'},300);
                arrow.animate({ path : arrow.data("introPath"), "stroke-width": "0", easing:'<>'},300);
                closeLine(index);
            });

            if($('.home_promotion').attr('data-on') == '1'){
                TweenMax.killTweensOf($('.home_promotion'));
                TweenMax.to($('.home_promotion'), 0.4, {right:-promoW, ease:Circ.easeInOut});
            }

            homeMachine.hide(1);
        };

        // ******************* private *******************
        var reposiBtn = function(btn, index){
            var dataBaseX = parseInt(btn.attr('data-centerx'), 10);
            var posiX = raphaW*0.5 + dataBaseX*ratio +4;
            var posiY = raphaH* 0.5 + parseInt(btn.attr('data-centery'), 10)*ratio+ 100;
            var menuSpace = 170;
            //var btnTextWidth = $('span', btn).width()+parseInt($('span', btn).css('padding-left'), 10)+parseInt($('span', btn).css('padding-right'), 10);
            var btnTextWidth = $('span', btn).width();
            var lineYLength = - 69;
            var lineXLength = 85;
            var lastStroke = 30;

            if(index == 3 && (posiX+btnTextWidth+lineXLength > windowW-menuSpace)){
                posiX = raphaW*0.5 + (dataBaseX - 104)*ratio + 4;
                posiY = raphaH* 0.5 + (dataBaseX -2)*ratio+ 100;
            }

            if(posiX+btnTextWidth+lineXLength > windowW-menuSpace && dataBaseX > 0){
                lineXLength = windowW-menuSpace - posiX - btnTextWidth;
                lastStroke = 5;
                if(index == 3 && lineXLength < 82){
                    lineYLength = 40;
                }
            }else if(dataBaseX < 0 && posiX-btnTextWidth-lineXLength < 5){
                lineXLength = posiX-btnTextWidth-5;
                lastStroke = 5;
            }

            circleBase[index].attr({'cx':posiX, 'cy':posiY});
            circlePulse1[index].attr({'cx':posiX, 'cy':posiY});
            circlePulse2[index].attr({'cx':posiX, 'cy':posiY});

            
            var posiEndX = 0, posiCurbX = 0, posiEndY = 0, posiCurbY = 0, offsetLink = 0;
            //if(parseInt(btn.attr('data-centerx'), 10) > 0 && (posiX+btnTextWidth+5 < windowW-menuSpace)){
            if(dataBaseX > 0){
                posiCurbX = Math.max(posiX+5, posiX + lineXLength);
                posiCurbY = posiY +lineYLength;
                posiEndX = posiCurbX + lastStroke;
                posiEndY = posiCurbY;
            }else{
                posiCurbX = posiX - lineXLength;
                posiCurbY = posiY +lineYLength;
                posiEndX = posiCurbX - lastStroke;
                posiEndY = posiCurbY;
                offsetLink = -btnTextWidth;
            }

            lines[index].data('initPath',  "M"+posiX+" "+posiY)
                    .data('resultPath', "M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiEndX+" "+posiEndY)
                    .data('midPath', "M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiCurbX+" "+posiCurbY);

            // rectangle with rounded corners
            var baseX = posiEndX+offsetLink;
            rects[index].attr({'x':baseX, 'y':posiEndY-btnRectH*0.5});

            rects[index].data("w", btnTextWidth)
                    .data("h", btnRectH)
                    .data("xInit", posiEndX)
                    .data("x", baseX)
                    .data("yInit", posiEndY)
                    .data("y", posiEndY-btnRectH*0.5);

            puces[index].attr({'cx':(baseX + radius + 6), 'cy':posiEndY});

            var arrowPosXInit = baseX + radius+4;
            var arrowSize = 4;
            var arrowInitIntroPath = "M"+arrowPosXInit+" "+posiEndY+"L"+(arrowPosXInit+arrowSize)+" "+posiEndY+"L"+arrowPosXInit+" "+posiEndY;
            var arrowInitPath = "M"+arrowPosXInit+" "+(posiEndY-arrowSize)+"L"+(arrowPosXInit+arrowSize)+" "+posiEndY+"L"+arrowPosXInit+" "+(posiEndY+arrowSize);
            var xRoll1 = arrowPosXInit + 5;
            var xRoll2 = arrowPosXInit - 5;
            var arrowInitRollPath1 = "M"+xRoll1+" "+(posiEndY-arrowSize)+"L"+(xRoll1+arrowSize)+" "+posiEndY+"L"+xRoll1+" "+(posiEndY+arrowSize);
            var arrowInitRollPath2 = "M"+xRoll2+" "+(posiEndY-arrowSize)+"L"+(xRoll2+arrowSize)+" "+posiEndY+"L"+xRoll2+" "+(posiEndY+arrowSize);
            
            arrows[index].data('startPath', arrowInitPath)
                .data('introPath', arrowInitIntroPath)
                .data('rollPath1', arrowInitRollPath1)
                .data('rollPath2', arrowInitRollPath2);

            arrows[index].attr({'path':arrowInitPath});
            lines[index].attr({'path':lines[index].data('resultPath')});

            var introOff = (offsetLink < 0)? 50 : -50;
            btn.attr('data-initl', (posiEndX+offsetLink+introOff));
            btn.css({'top':posiEndY-19, 'left':(posiEndX+offsetLink)});

            aXEnd[index] = posiEndX+offsetLink;
        };

         var init = function(index){
            $('.home_anchors a').each(function(index) {

                var btnTextWidth = $('span', this).width()+parseInt($('span', this).css('padding-left'), 10)+parseInt($('span', this).css('padding-right'), 10);
                $(this).width(btnTextWidth);
                $('span', this).css({'width': btnTextWidth, 'display':'block', 'height':$(this).height()});
                $('.home_anchors_roll', this).css('left', -btnTextWidth);
                $(this).attr('data-index', index);

                var set= paper.set();
                var c = paper.circle(0, 0, 0).attr({
                    fill: "rgb(255,255,255)",
                    "stroke": "#fff",
                    "stroke-width": "1"});
                var c2 = paper.circle(0, 0, 0).attr({
                    "stroke": "#fff",
                    "stroke-width": "1"});
                var c3 = paper.circle(0, 0, 0).attr({
                    "stroke": "#fff",
                    "stroke-width": "1"});

                var p = paper.path("M0 0")
                    .attr({
                    "stroke": "#fff",
                    "stroke-width": "1.5"});

                var r = paper.rect(0, 0, 0, 0, btnRectH*0.5).attr({
                    fill: "rgb(208,208,208)",
                    'fill-opacity': 0,
                    "stroke": "#fff",
                    "stroke-width": "1.5"});

                var puce = paper.circle(0, 0, 0).attr({
                    fill: "rgb(132,131,128)",
                    "stroke" : "rgb(132,131,128)",
                    "stroke-width": "1.5"}).data("r", radius);
                
                var arrow = paper.path('M0 0').attr({
                    "stroke": "#fff",
                    "stroke-width": "0"});

                lines.push(p);
                circleBase.push(c);
                circlePulse1.push(c2);
                circlePulse2.push(c3);
                rects.push(r);
                puces.push(puce);
                arrows.push(arrow);

                set.push(p);
                set.push(c);
                set.push(c2);
                set.push(puce);
                set.push(r);
                set.push(arrow);

                reposiBtn($(this), index);

                // init path =>
                arrow.attr({'path':arrow.data('introPath')});
                p.attr({'path':arrow.data('initPath')});
                r.attr({'x':r.data('xInit'), 'y':r.data('yInit')});

                TweenMax.to($('.home_anchors_roll', this), 0, {alpha:0});
                TweenMax.to($(this), 0, {alpha:0});

                $(this).on('click', function(event){
                    event.preventDefault();
                    publisher.publish(Events.navigate, $(this).attr('data-link'));
                }).on('mouseenter', function(event){
                    TweenMax.to($('span', this), 0.2, {color:"#121212"});
                    r.animate({'fill-opacity': 1}, 210);
                    puce.animate({fill: "rgb(255,255,255)"}, 200);
                    arrow.animate({path: arrow.data('rollPath1'), callback:function(){
                        arrow.attr({'path':  arrow.data('rollPath2')});
                        arrow.animate({path: arrow.data('startPath'), "stroke": "#000000"}, 250, "cubic-bezier(0.9,0.5,0.5,1)");
                    }}, 100, "cubic-bezier(0.9,0.5,0.5,1)");
                }).on('mouseleave', function(event){
                    r.animate({'fill-opacity': 0}, 200);
                    TweenMax.to($('span', this), 0.2, {color:"#ffffff"});
                    puce.animate({fill: "rgb(132,131,128)"}, 200);
                    arrow.animate({"stroke": "#fff", "stroke-width": "1.5"}, 250);
                });
            });

            if($('.home_promotion').attr('data-on') == '1'){
                $('.home_promotion a').on('mouseenter', function(event){
                    TweenMax.to($('.home_promotion'), 0.3, {right:-10, ease:Expo.easeOut});
                }).on('mouseleave', function(event){
                    TweenMax.to($('.home_promotion'), 0.35, {right:-20, ease:Circ.easeInOut});
                });
            }
        };

        var openLine = function(index, end){
            if(typeof end == "undefined" || end !== 1){
                var endFirstLine = function(){ openLine(index, 1); };
                lines[index].animate({path: lines[index].data('midPath'), easing:"<", callback:endFirstLine}, 200);
            }else{
                var lineComplete = function(){ openRect(index); };
                lines[index].animate({path: lines[index].data('resultPath'), easing:">", callback:lineComplete}, 150);
            }
        };
        var closeLine = function(index, end){
            if(typeof end == "undefined" || end !== 1){
                var endFirstLine = function(){ closeLine(index, 1); };
                lines[index].animate({path: lines[index].data('midPath'), easing:"<", callback:endFirstLine}, 150);
            }else{
                circleBase[index].animate({ r : 0, easing:'backIn'},200);
                lines[index].animate({path: lines[index].data('initPath'), easing:">"}, 200);
            }
        };
        var openRect = function(index){
            var target = rects[index];
            var linkElem =$(".home_anchors a[data-index='"+index+"']");
            
            target.animate({ width : target.data("w"), x:target.data("x"), easing:'>'},250);
            target.animate({ height : target.data("h"), y:target.data("y"), easing:'>'},80);
            
            if(parseInt(linkElem.attr('data-centerx'), 10) > 0){
                openPuce(index);
            }else{
                TweenMax.delayedCall(0.2, openPuce, [index]);
            }

            TweenMax.to(linkElem, 0.3, {alpha:1, left:aXEnd[index], ease:Circ.easeOut});
        };
        var openPuce = function(index){
            var puce = puces[index];
            var arrow = arrows[index];
            puce.animate({ r : puce.data("r"), easing:'>'},300);
            arrow.animate({ path : arrow.data("startPath"), "stroke-width": "1.5", easing:'>'},300);
        };
        var openCircle = function(index){
            circleBase[index].animate({ r : 4, easing:'backOut', callback:function(){pulseCircle(index, 0);}},250);
        };
        var pulseCircle = function(index, value){
            var target = circlePulse1[index];
            var next = 1;
            if(value == 1){
                target = circlePulse2[index];
                next = 0;
            }
            target.attr({r: 0, "stroke-opacity": "1"});
            target.animate({ r : 12, "stroke-opacity": "0", easing:'>'},1600);

            TweenMax.delayedCall(0.8, pulseCircle, [index, next]);
        };
        init();
    };

    return Home;
});