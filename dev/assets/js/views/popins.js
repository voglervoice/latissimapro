define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "raphaeljs", "globals"
], function($, TweenMax, Events, publisher, Raphael, Globals) {

    var Popins = function() {
        var self = this;
      
        // ******************* public ******************* 
        this.open = function(id){
            clearPopins();
            TweenMax.to($("."+id), 0.1, {autoAlpha:1});
            if(id !== "order_phone") {
                if(id== "share_mail"){
                    TweenMax.killTweensOf($('.success_message'));
                    TweenMax.to($('.from_message'), 0, {autoAlpha:0});
                    $("."+id+" input[type='text']").each(function(index) {
                        $(this).removeClass("errorfield");
                        $(this).removeClass("noerrorfield");
                        $(this).addClass("noerrorfield");
                    });
                }
                TweenMax.to($('.popin_black_bg'), 0.2, {autoAlpha:1});
            }
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
            var wBtn = ($('.lang_zones').width()-totWidth)/($('.lang_zones li a').length-1)-1;
            $('.lang_zones li a').each(function(index){ if(index > 0) $(this).css('margin-left', wBtn);});

            if($('.lang_zones li a').length < 3) $('.lang_zones li a').css('margin-left', ($('.lang_zones').width()-totWidth)/($('.lang_zones li a').length+1));

            $('.popin_close').each(function(index){
                var paper = Raphael($(this)[0], $('.popin_close').width(), $('.popin_close').height());
                var centerX= Math.round($('.popin_close').width()*0.5), centerY = Math.round($('.popin_close').height()*0.5);
                var c = paper.circle(centerX, centerY, 6).attr({ fill: "rgb(255,255,255)", "stroke": "#fff", "stroke-width": "1.5", 'fill-opacity': 1});
                var crossSize = 3;
                var l1 = paper.path("M"+(centerX-crossSize)+" "+(centerY-crossSize)+"L"+(centerX+crossSize)+" "+(centerY+crossSize))
                    .attr({
                    "stroke": "#0c0c0c",
                    "stroke-width": (Globals.oldie)? 1.5 : "1.5"});
                var l2 = paper.path("M"+(centerX-crossSize)+" "+(centerY+crossSize)+"L"+(centerX+crossSize)+" "+(centerY-crossSize))
                    .attr({
                    "stroke": "#0c0c0c",
                    "stroke-width": (Globals.oldie)? 1.5 : "1.5"});

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

            $(".share_mail input[type='text']").on('click', function(event) {
                $(this).removeClass("errorfield");
                $(this).removeClass("noerrorfield");
                $(this).addClass("noerrorfield");
                TweenMax.to($('.from_message'), 0.3, {autoAlpha:0});
            });
            TweenMax.to($('.from_message'), 0, {autoAlpha:0});

            $("#mail_share").on("submit", function(e){
                e.preventDefault();
                var ok = true;
                $("input[type='text']", this).each(function(index) {
                    $(this).removeClass("errorfield");
                     if($(this).val() === ""){
                        $(this).removeClass("noerrorfield");
                        $(this).addClass("errorfield");
                        ok = false;
                    }
                });

                if(!ok) return false;

                $.ajax({
                    url:    $(this).attr('action'),
                    type:   $(this).attr('method'),
                    data:   $(this).serialize(),
                    dataType: 'html',
                    success: function(data) {
                        if( data.toString() != '1' ){
                            TweenMax.to($('.error_message'), 0.5, {autoAlpha:1});
                        }else{
                            TweenMax.to($('.success_message'), 0.5, {autoAlpha:1});
                            TweenMax.to($('.success_message'), 0.5, {autoAlpha:0, delay:4});
                        }
                        //
                    }
                });//end ajax
            });

            clearPopins();

        };

        init();
    };

    return Popins;
});