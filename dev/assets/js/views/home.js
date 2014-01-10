define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs"
], function($, TweenMax, Events, publisher, Raphael) {

    var Home = function(target) {
        var self = this;
        var raphaW = $('#raphael_home_anchors').width();
        var raphaH = $('#raphael_home_anchors').height();
        var paper = Raphael("raphael_home_anchors", raphaW, raphaH);
        var lines= [], circleBase = [], circlePulse1 = [], circlePulse2 = [], rects = [], aXEnd = [], puces = [], arrows = [];

        // ******************* public ******************* 
        this.elem = $('#home');
        this.resize = function(w, h){
            
        };

        this.initOpen = function(){
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
        };

        this.open = function(){
            var delayAnchor = 0.5;
            for (var i = 0; i < lines.length; i++) {
                // start animation
                TweenMax.delayedCall(delayAnchor+0.2*i, openCircle, [i]);
                TweenMax.delayedCall(delayAnchor+0.2*i+0.2, openLine, [i]);
            }
        };

        this.close = function(){
            $('.home_anchors a').each(function(index) {
                TweenMax.killTweensOf($(this));
            });
            TweenMax.killDelayedCallsTo(openCircle);
            TweenMax.killDelayedCallsTo(openLine);
            TweenMax.killDelayedCallsTo(openPuce);
            TweenMax.killDelayedCallsTo(pulseCircle);
        };

        // ******************* private *******************
         var init = function(index){
            $('.home_anchors a').each(function(index) {
                var btnRectH = 36;
                var btnTextWidth = $('span', this).width()+parseInt($('span', this).css('padding-left'), 10)+parseInt($('span', this).css('padding-right'), 10);
                $(this).width(btnTextWidth);
                $('span', this).css({'width': btnTextWidth, 'display':'block', 'height':$(this).height()});
                $('.home_anchors_roll', this).css('left', -btnTextWidth);
                $(this).attr('data-index', index);

                var posiX = raphaW*0.5 + parseInt($(this).attr('data-centerx'), 10);
                var posiY = raphaH* 0.5 + parseInt($(this).attr('data-centery'), 10)+ 100;
                var set= paper.set();
                var c = paper.circle(posiX, posiY, 0).attr({
                    fill: "rgb(255,255,255)",
                    "stroke": "#fff",
                    "stroke-width": "1"});
                var c2 = paper.circle(posiX, posiY, 0).attr({
                    "stroke": "#fff",
                    "stroke-width": "1"});
                var c3 = paper.circle(posiX, posiY, 0).attr({
                    "stroke": "#fff",
                    "stroke-width": "1"});

                var lastStroke = 30;
                var posiEndX = 0, posiCurbX = 0, posiEndY = 0, posiCurbY = 0, offsetLink = 0;
                if(parseInt($(this).attr('data-centerx'), 10) > 0){
                    posiCurbX = posiX + 85;
                    posiCurbY = posiY - 69;
                    posiEndX = posiCurbX + lastStroke;
                    posiEndY = posiCurbY;
                }else{
                    posiCurbX = posiX - 85;
                    posiCurbY = posiY - 69;
                    posiEndX = posiCurbX - lastStroke;
                    posiEndY = posiCurbY;
                    offsetLink = -btnTextWidth;
                }

                var p = paper.path("M"+posiX+" "+posiY)
                    .attr({
                    "stroke": "#fff",
                    "stroke-width": "1.5"})
                    .data('initPath',  "M"+posiX+" "+posiY)
                    .data('resultPath', "M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiEndX+" "+posiEndY)
                    .data('midPath', "M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiCurbX+" "+posiCurbY);

                // rectangle with rounded corners
                var baseX = posiEndX+offsetLink;
                var r = paper.rect(posiEndX, posiEndY, 0, 0, btnRectH*0.5).attr({
                    fill: "rgb(208,208,208)",
                    'fill-opacity': 0,
                    "stroke": "#fff",
                    "stroke-width": "1.5"})
                    .data("w", btnTextWidth)
                    .data("h", btnRectH)
                    .data("xInit", posiEndX)
                    .data("x", baseX)
                    .data("yInit", posiEndY)
                    .data("y", posiEndY-btnRectH*0.5);
                var radius = Math.floor(btnRectH*0.5) - 4;
                var puce = paper.circle((baseX + radius + 5), posiEndY, 0).attr({
                    fill: "rgb(132,131,128)",
                    "stroke-width": "0"}).data("r", radius);
                var arrowPosXInit = baseX + radius+3;
                var arrowInitIntroPath = "M"+arrowPosXInit+" "+posiEndY+"L"+(arrowPosXInit+5)+" "+posiEndY+"L"+arrowPosXInit+" "+posiEndY;
                var arrowInitPath = "M"+arrowPosXInit+" "+(posiEndY-5)+"L"+(arrowPosXInit+5)+" "+posiEndY+"L"+arrowPosXInit+" "+(posiEndY+5);
                arrowPosXInit += btnTextWidth - radius*2 - 10;
                var arrowInitRollPath = "M"+arrowPosXInit+" "+(posiEndY-5)+"L"+(arrowPosXInit+5)+" "+posiEndY+"L"+arrowPosXInit+" "+(posiEndY+5);
                var arrow = paper.path(arrowInitIntroPath).attr({
                    "stroke": "#fff",
                    "stroke-width": "0"}).data('startPath', arrowInitPath).data('introPath', arrowInitIntroPath);

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

                aXEnd.push(posiEndX+offsetLink);
                var introOff = (offsetLink < 0)? 50 : -50;
                $(this).attr('data-initl', (posiEndX+offsetLink+introOff));
                $(this).css({'top':posiEndY-19, 'left':(posiEndX+offsetLink+introOff)});

                TweenMax.to($('.home_anchors_roll', this), 0, {alpha:0});
                TweenMax.to($(this), 0, {alpha:0});
                $(this).on('mouseenter', function(event){
                    TweenMax.to($('.home_anchors_roll', this), 0.3, {left:-25, alpha:1, ease:Circ.easeInOut});
                    TweenMax.to($('.home_anchors_off', this), 0.3, {left:$(this).width(), alpha:0, ease:Circ.easeInOut});
                    r.animate({'fill-opacity': 1}, 200);
                    puce.animate({cx: baseX + btnTextWidth - radius - 5}, 300, "cubic-bezier(0.9,0.5,0.5,1)");
                    arrow.animate({path: arrowInitRollPath}, 300, "cubic-bezier(0.9,0.5,0.5,1)");
                }).on('mouseleave', function(event){
                    r.animate({'fill-opacity': 0}, 200);
                    TweenMax.to($('.home_anchors_roll', this), 0.3, {left:-$(this).width()+10, alpha:0, ease:Expo.easeInOut});
                    TweenMax.to($('.home_anchors_off', this), 0.3, {left:0, alpha:1, ease:Expo.easeInOut});
                    puce.animate({cx: baseX + radius + 5}, 300, "cubic-bezier(0.9,0.5,0.5,1)");
                    arrow.animate({path: arrowInitPath}, 300, "cubic-bezier(0.9,0.5,0.5,1)");
                });
            });
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