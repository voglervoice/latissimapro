define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs"
], function($, TweenMax, Events, publisher, Raphael) {
    /**
     * MainMenu
     * @param {HTMLElement} target
     * @constructor
     */
    var Home = function(target) {
        var self = this;
        var raphaW = $('#raphael_home_anchors').width();
        var raphaH = $('#raphael_home_anchors').height();
        var paper = Raphael("raphael_home_anchors", raphaW, raphaH);
        var lines= [], circleBase = [], circlePulse1 = [], circlePulse2 = [], resultPath = [], midPath = [];

        // ******************* public ******************* 
        this.resize = function(w, h){
            
        };

        this.open = function(){
            console.log("OPEN HOME "+lines.length);
            var delayAnchor = 0.5;
            for (var i = 0; i < lines.length; i++) {
                TweenMax.delayedCall(delayAnchor+0.2*i, openCircle, [circleBase[i]]);
                TweenMax.delayedCall(delayAnchor+0.2*i+0.2, openLine, [i]);
            }
        };

        // ******************* private *******************
         var init = function(index){
            $('.home_anchors a').each(function(index) {
                var posiX = raphaW*0.5 + parseInt($(this).attr('data-centerx'), 10);
                var posiY = raphaH* 0.5 + parseInt($(this).attr('data-centery'), 10)+ 92;
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
                    offsetLink = -$(this).width();
                }

                midPath.push("M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiCurbX+" "+posiCurbY);
                resultPath.push("M"+posiX+" "+posiY+"L"+posiCurbX+" "+posiCurbY+"L"+posiEndX+" "+posiEndY);
                var p = paper.path("M"+posiX+" "+posiY).attr({
                    "stroke": "#fff",
                    "stroke-width": "1"});
                
                lines.push(p);
                circleBase.push(c);
                circlePulse1.push(c2);
                circlePulse2.push(c3);

                set.push(p);
                set.push(c);
                set.push(c2);

                $(this).css({'top':posiEndY-10, 'left':posiEndX+offsetLink});
            });
        };

        var openLine = function(index, end){
            console.log("open line : "+index+" end : "+end);

            if(typeof end == "undefined" || end !== 1){
                var endFirstLine = function(){
                    openLine(index, 1);
                };
                lines[index].animate({path: midPath[index], easing:"<", callback:endFirstLine}, 200);
            }else
                lines[index].animate({path: resultPath[index], easing:">"}, 150);
        };
        var openCircle = function(target){
            target.animate({ r : 4, easing:'backOut'},250);
        };
        init();
    };

    return Home;
});