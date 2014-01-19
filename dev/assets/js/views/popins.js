define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs"
], function($, TweenMax, Events, publisher, Raphael) {

    var Popins = function() {
        var self = this;
      
        // ******************* public ******************* 
        this.open = function(id){
            clearPopins();
            TweenMax.to($("."+id), 0.1, {autoAlpha:1});
            if(id !== "order_phone") TweenMax.to($('.popin_black_bg'), 0.2, {autoAlpha:1});
            TweenMax.to($('.popins'), 0.6, {autoAlpha:1});

            if(id == "select_lang") openLangZone($( '.lang_zones li a' ).first().attr('data-type'));
        };

        this.close = function(){
            TweenMax.to($('.popins'), 0.5, {autoAlpha:0, onComplete:clearPopins});
        };

        // ******************* private *******************
        var clearPopins = function(){
            TweenMax.to($('.lang_zone'), 0, {autoAlpha:0});
            TweenMax.to($('.popin'), 0, {autoAlpha:0});
            TweenMax.to($('.popins'), 0, {autoAlpha:0});
            TweenMax.to($('.popin_black_bg'), 0, {autoAlpha:0});
        };

        var openLangZone = function(id){
            $('.lang_zone').each(function(index) {
                TweenMax.killTweensOf($(this));
                if($(this).attr('data-type') == id)
                    TweenMax.to($(this), 0.3, {autoAlpha:1, delay:0.3});
                else
                    TweenMax.to($(this), 0.3, {autoAlpha:0});
            });
        };

         var init = function(index){
            publisher.subscribe(Events.openPopin, self.open);
            publisher.subscribe(Events.closePopins, self.close);

            var totWidth = 0;
            $('.lang_zones li a').each(function(index){ totWidth += $(this).width(); });
            var wBtn = ($('.lang_zones').width()-totWidth)/($('.lang_zones li a').length-1);
            $('.lang_zones li a').each(function(index){ if(index > 0) $(this).css('margin-left', wBtn);});

            $('.popin_close').each(function(index){
                var paper = Raphael($(this)[0], $('.popin_close').width(), $('.popin_close').height());
                var centerX= Math.round($('.popin_close').width()*0.5), centerY = Math.round($('.popin_close').height()*0.5);
                var c = paper.circle(centerX, centerY, 6).attr({ fill: "rgb(255,255,255)", "stroke": "#fff", "stroke-width": "1.5", 'fill-opacity': 1});
                var crossSize = 3;
                var l1 = paper.path("M"+(centerX-crossSize)+" "+(centerY-crossSize)+"L"+(centerX+crossSize)+" "+(centerY+crossSize))
                    .attr({
                    "stroke": "#0c0c0c",
                    "stroke-width": "1.5"});
                var l2 = paper.path("M"+(centerX-crossSize)+" "+(centerY+crossSize)+"L"+(centerX+crossSize)+" "+(centerY-crossSize))
                    .attr({
                    "stroke": "#0c0c0c",
                    "stroke-width": "1.5"});

                $(this).on('click', function(event){
                    event.preventDefault();
                    self.close();
                }).on('mouseenter', function(event){
                    c.animate({ r : 7, 'fill-opacity': 0, easing:'>'}, 190);
                    l1.animate({ "stroke": "#ffffff"}, 160);
                    l2.animate({ "stroke": "#ffffff"}, 160);
                }).on('mouseleave', function(){
                    c.animate({ r : 6, 'fill-opacity': 1, easing:'<>'}, 200);
                    l1.animate({ "stroke": "#0c0c0c"}, 190);
                    l2.animate({ "stroke": "#0c0c0c"}, 190);
                });
            });

            $('.popin_black_bg').on('click', function(event){
                    event.preventDefault();
                    self.close();
            });

            $('.lang_zones li a').on('click', function(event){
                    event.preventDefault();
                    openLangZone($(this).attr('data-type'));
            });

            clearPopins();

        };

        init();
    };

    return Popins;
});