define([
    "jquery",
    "tweenmax",
    "events",
    "publisher",
    "views/backgroundsection",
    "views/imageelem","globals"
], function($, TweenMax, Events, publisher, BackgroundSection, ImageElem, Globals) {

    var Design = function() {
        var self = this;
      

        // ******************* public ******************* 
        this.elem = $('#design');
        //this.bg = new BackgroundSection(this.elem);
        var bg = $('.bg_gradient', this.elem);
        var designMachine = new ImageElem($(".design_machine", this.elem));
        var designElement = designMachine.getElement();
        var ct = $(".design_content", this.elem), wFooterBtn;

        this.resize = function(w, h){
            //this.bg.resize(w, h);
            var ratioH = h/864;
            var ratioW = w/1440;
            var offsetCt =77, offsetCtPlus = 0;
            if(w < 980){
                ratioH = ratioW-0.1;
                designElement.css('left', "-100px");
               offsetCt = -20;
               offsetCtPlus = -80;
            }else if(w < 1007){
                ratioH = ratioW;
                designElement.css('left', "-45px");
                offsetCt = -20;
            }else if(w < 1074){
                ratioH = ratioH-0.15;
                designElement.css('left', "-40px");
                offsetCt = -10;
            }else if(w < 1195){
                ratioH = ratioH-0.1;
                designElement.css('left', "-10px");
                offsetCt = 50;
            }else{
                designElement.css('left', "0");
            }

            designMachine.setSize(432*ratioH,671*ratioH);
            var ctW = Math.min(830, w - 432*ratioH-180);
            var ctLeft = Math.max(432*ratioH+offsetCt, (w - (432*ratioH+196))*0.5);
            ctLeft = Math.min(ctLeft, w-ctW);
            ct.css('left', ctLeft+offsetCtPlus );
            ct.width(ctW);
            var lfooter = (w-(ctLeft+offsetCtPlus+wFooterBtn+180))*0.5;
            $('.design_footer').css('margin-left', lfooter);

            if(w < 1350){
                if(Globals.lang == "de"){
                    $('.design_content_infos_col h3').css('font-size', '12px');
                    $('.design_content_infos_col li').css('font-size', '11px');
                }else{
                    $('.design_content_infos_col h3').css('font-size', '13px');
                }
                $('.design_content_infos_col').width(150);
                $('.design_content_infos').width(630);

                $('.design_description').removeClass('design_description_n');
                $('.design_description').addClass('content_span_text_smaller');
                $('h2', ct).removeClass('h2_n');
                $('h2', ct).addClass('h2_smaller');

            }else{
                $('.design_content_infos_col h3').css('font-size', '16px');
                $('.design_content_infos_col li').css('font-size', '13px');
                $('.design_content_infos_col').width(190);
                $('.design_content_infos').width(810);

                $('.design_description').addClass('design_description_n');
                $('.design_description').removeClass('content_span_text_smaller');
                $('h2', ct).addClass('h2_n');
                $('h2', ct).removeClass('h2_smaller');
            }

            var titleW = Math.min(w - 432*ratioH-180, Math.max(500, $("h2", this.elem).width()+10));
            $('.design_content_title').width(Math.max($('.design_content_infos').width()-80, titleW));

            var hh = $('.design_content_title').height()+$('.design_content_subtitle').height() + $('.design_content_infos').height();

            if(h-hh < 560){
                $('.design_content_infos_col').css('margin-top', '30px');
                $('.design_content_infos_col li').css('margin-bottom', '10px');
                $('.design_content_infos_col').css('margin-bottom', '25px');
            }else{
                $('.design_content_infos_col').css('margin-top', '60px');
                $('.design_content_infos_col li').css('margin-bottom', '15px');
                $('.design_content_infos_col').css('margin-bottom', '40px');
            }
            ct.css('margin-top', -ct.height()*0.5);
        };

        this.initOpen = function(){
            //this.bg.open();
            TweenMax.to(bg, 2, {alpha:1, delay:0.8, ease:Linear.easeNone});
            designElement.css('bottom', "-200px");
            designMachine.show(1.2,1.2);
            TweenMax.to(designElement, 0.8, {bottom:0, delay:0.8, ease:Circ.easeOut});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 1.2, {alpha:1, delay:1.3});
        };
        
        this.open = function(){
        };

        this.close = function(){
            //this.bg.close();
            TweenMax.killTweensOf(bg);
            TweenMax.to(bg, 2, {alpha:0, ease:Linear.easeNone});
            designMachine.hide(1);
            TweenMax.to(designElement, 0.9, {bottom:-200, ease:Circ.easeIn});
            TweenMax.killTweensOf(ct);
            TweenMax.to(ct, 0.5, {alpha:0});
        };

        // ******************* private *******************
         var init = function(index){
            TweenMax.to(bg, 0, {alpha:0});
            TweenMax.to(ct, 0, {alpha:0});
            TweenMax.to($('.content_line_design_sep', ct), 0, {alpha:0.15});
            TweenMax.to($('.design_content_infos_col div', ct), 0, {alpha:0.28});
            TweenMax.to($('.design_content_infos ul li', ct), 0, {alpha:0.6});

            wFooterBtn = 90;
            $('.design_footer a').each(function(index){ wFooterBtn += $(this).width()+50; });
            $(".design_footer").width(wFooterBtn);

            $('.design_footer a').on('mouseenter', function(event){
                TweenMax.to($(this), 0.3, {alpha:1});
            }).on('mouseleave', function(event){
                TweenMax.to($(this), 0.3, {alpha:0.5});
            });

        };

        init();
    };

    return Design;
});