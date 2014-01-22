define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs",
    "views/backgroundsection"
], function($, TweenMax, Events, publisher, Raphael, BackgroundSection) {

    var Touchscreen = function() {
        var self = this;
         var positionInPaper = {x:500, y:400};
         var buttonWidth = $('.touchscreen_roll').first().width(), buttonInnerWidth = $('.touchscreen_roll_inner').first().width();
         var unvisibleButtons = [
            [{x:-152,y:-134},{x:-53,y:-116},{x:-88,y:-55},{x:-182,y:-74}],
            [{x:-191,y:-62},{x:-107,y:-41},{x:-141,y:25},{x:-236,y:0}],
            [{x:-244,y:22},{x:-147,y:36},{x:-193,y:110},{x:-292,y:84}],
            [{x:-82,y:51},{x:21,y:75},{x:-18,y:148},{x:-123,y:121}],
            [{x:85,y:84},{x:198,y:113},{x:167,y:191},{x:55,y:162}],
            [{x:122,y:-5},{x:227,y:26},{x:202,y:98},{x:94,y:73}],
            [{x:156,y:-79},{x:249,y:-58},{x:230,y:9},{x:126,y:-16}]
         ];
         var rollPosition = [
            {x:-252,y:-404},
            {x:-291,y:-190},
            {x:-344,y:-100},
            {x:-182,y:-70},
            {x:-10,y:-40},
            {x:22,y:-115},
            {x:56,y:-190}
         ];

        // ******************* public ******************* 
        this.elem = $('#touchscreen');
        this.bg = new BackgroundSection(this.elem);
        var ct = $('.touch_content', this.elem);
        var paper = Raphael("touchscreen_buttons", 800, 800);

        this.resize = function(w, h){
            this.bg.resize(w, h);
            var ratioW = w/1440;
            var imgWidth = 827*ratioW;
            var ctLeft = imgWidth+60;
            ct.css('left', ctLeft);
            ct.width(w-ctLeft- 230);

            $('.touchscreen_roll').each(function(index) {
                $(this).attr('data-left', positionInPaper.x + rollPosition[index].x);
                $(this).attr('data-top', positionInPaper.y + rollPosition[index].y);
                 $(this).css({'left':positionInPaper.x + rollPosition[index].x, 'top': positionInPaper.y + rollPosition[index].y });
            });
        };

        this.initOpen = function(){
            TweenMax.to($('.touchscreen_roll'), 0, {borderRadius:0, width:0, height:0, alpha:0});
            TweenMax.to($('.touchscreen_roll_inner'), 0, {borderRadius:0, width:0, height:0, left:0, top:0});
            TweenMax.to($('.touchscreen_roll_inner div'), 0, {left:(-buttonInnerWidth*0.5), top:(-buttonInnerWidth*0.5), alpha:0});

            $('.touchscreen_roll').each(function(index) {
                $(this).css({'left':parseInt($(this).attr('data-left'), 10)+buttonWidth*0.5, 'top': parseInt($(this).attr('data-top'), 10)+buttonWidth*0.5 });
            });
            this.bg.open();
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        
        };

        this.close = function(){
            this.bg.close();
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(ct, 0, {alpha:0});
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
                    
                    createButton(p);
                    p.hover(overButton, outButton, p, p);
            }
        };

        var overButton = function(){
            var elem = this;
            var rollDiv = $('.touchscreen_roll:eq( '+elem.data('index')+' )');
            var innerDiv = $('.touchscreen_roll_inner', rollDiv);
            var innerDivImg = $('div', innerDiv);
            var motionTime = 0.35, motionEase = Circ.easeOut;
            //console.log("ON --> "+elem.data('index'));
            
            TweenMax.killTweensOf(rollDiv);
            TweenMax.killTweensOf(innerDiv);
            TweenMax.killTweensOf(innerDivImg);

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
                ease:motionEase});

            TweenMax.to(innerDivImg, 0.7, {alpha:1, delay:0.1});
            TweenMax.to(rollDiv, motionTime*0.5, {alpha:1, delay:0.05});
        };

        var outButton = function(){
            var elem = this;
            var rollDiv = $('.touchscreen_roll:eq( '+elem.data('index')+' )');
            var innerDiv = $('.touchscreen_roll_inner', rollDiv);
            var innerDivImg = $('div', innerDiv);
            var motionTime = 0.3, motionEase = Circ.easeInOut;

            TweenMax.killTweensOf(rollDiv);
            TweenMax.killTweensOf(innerDiv);
            TweenMax.killTweensOf(innerDivImg);

            TweenMax.to(rollDiv, motionTime, {
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
                ease:motionEase});

            TweenMax.to(innerDivImg, motionTime*0.5, {alpha:0});
        };

        var createButton = function(elem){
            console.log(elem.data('index'), unvisibleButtons[elem.data('index')]);
            var datas = unvisibleButtons[elem.data('index')];
            console.log(datas[0]);
            var path = "M"+(positionInPaper.x+datas[0].x)+" "+(positionInPaper.y+datas[0].y);
            path += "L"+(positionInPaper.x+datas[1].x)+" "+(positionInPaper.y+datas[1].y);
            path += "L"+(positionInPaper.x+datas[2].x)+" "+(positionInPaper.y+datas[2].y);
            path += "L"+(positionInPaper.x+datas[3].x)+" "+(positionInPaper.y+datas[3].y);
            path += "L"+(positionInPaper.x+datas[0].x)+" "+(positionInPaper.y+datas[0].y);
            elem.attr({'path':path});
        };

        init();
    };

    return Touchscreen;
});