define([
    "jquery",
    "publisher",
    "events"
], function($, publisher, Events) {

    var SiteTracker = function(lang_, countryCode_) {
        var self = this;
        var lang = lang_, countryCode = countryCode_;
        var account = "nesp-preprod";
        var channel = "UCE:lattissima-pro";
      

        // ******************* public ******************* 
        this.trackPage = function(pageName, subPageName, prop4){
            if(pageName === "" || typeof s == "undefined") return;
            reinit();

            var pageNameTrack =  channel+":"+pageName;
            if(typeof subPageName == "undefined") subPageName = "";
            if(typeof prop4 == "undefined") prop4 = "";

            if(subPageName !== ""){
                pageNameTrack += ":"+subPageName;
            }

            if(prop4 !== "") pageNameTrack += ":"+prop4;

            s = s_gi(account);
            s.currencyCode  =   "CHF";
            s.ch               =   channel;
            s.channel      =   channel;
            s.pageName  =   pageNameTrack;
            s.prop1         =   pageName;
            s.prop4         =   prop4;
            s.prop5         =   countryCode+":"+lang+":"+pageNameTrack;
            s.prop8         =   lang;
            s.prop9         =   countryCode;
            s.prop18        =   "1";

            s.eVar8         =   "D=prop8";
            s.eVar9         =   "D=prop9";
            s.eVar10        =   "D=prop10";
            s.eVar11        =   "D=prop11";
            s.eVar15        =   pageNameTrack;
            s.eVar18        =   "D=prop18";

            s.event14        =   "set";
            s.event16        =   "set";

            s.track();
        };

        this.trackEvent = function(eVar20, eVar30, eVar41, event18, event30, event47, pe, pev2){
            if(typeof s == "undefined") return;
            reinit();

            if(typeof eVar20 == "undefined") eVar20 = "";
            if(typeof eVar30 == "undefined") eVar30 = "";
            if(typeof eVar41 == "undefined") eVar41 = "";
            if(typeof event18 == "undefined") event18 = "";
            if(typeof event30 == "undefined") event30 = "";
            if(typeof event47 == "undefined") event47 = "";

            s = s_gi(account);
            s.eVar20        =   eVar20;
            s.eVar30        =   eVar30;
            s.eVar41        =   eVar41;
            s.event18      =   event18;
            s.event30      =   event30;
            s.event47      =   event47;
            s.pe               =   pe;
            s.pev2           =   pev2;

            s.trackLink();
        };

        // ******************* private *******************

        var reinit = function(){
            // FLUSH
            s.currencyCode  =   "";
            s.channel       =   "";
            s.pageName      =   "";
            s.prop1         =   "";
            s.prop2         =   "";
            s.prop3         =   "";
            s.prop4         =   "";
            s.prop5         =   "";
            s.prop8         =   "";
            s.prop9         =   "";
            s.prop18       =   "";
            s.eVar8         =   "";
            s.eVar9         =   "";
            s.eVar10        =   "";
            s.eVar11        =   "";
            s.eVar15        =   "";
            s.eVar18        =   "";
            s.eVar20        =   "";
            s.eVar30        =   "";
            s.eVar31        =   "";
            s.event14       =   "";
            s.event15       =   "";
            s.event16       =   "";
            s.event18       =   "";
            s.event30       =   "";
            s.event47       =   "";
            s.pe                =   "";
            s.pev2            =   "";
        };

        var init = function(){
            publisher.subscribe(Events.trackPage, self.trackPage);
            publisher.subscribe(Events.trackEvent, self.trackEvent);

            // EVENTS -- header & footer ************************

            var link_open = "lnk_o", link_dll = "lnk_d";

            // HEADER share
            $('.mail_sprit').on('click', function(event){
                self.trackEvent("", channel+":header:share:email:click", "", "", "set", "", link_open, channel+":header:share:email:click");
            });
            $('.share_pinterest').on('click', function(event){
                self.trackEvent("", channel+":header:share:pinterest:click", "", "", "set", "", link_open, channel+":header:share:pinterest:click");
            });
            $('.share_twitter').on('click', function(event){
                self.trackEvent("", channel+":header:share:twitter:click", "", "", "set", "", link_open, channel+":header:share:twitter:click");
            });
            $('.share_facebook').on('click', function(event){
                self.trackEvent("", channel+":header:share:facebook:click", "", "", "set", "", link_open, channel+":header:share:facebook:click");
            });
            // HEADER
            $('#select_country a').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":header:market-selector:click");
            });
            // QRCODE
            $('.appleapp').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":header:app-store:ios:click");
            });
            $('.androidapp').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":header:app-store:android:click");
            });
            // FOOTER
            $('.store_locator_link').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":footer:function-selection:store-locator:click");
            });
            $('.contact_link').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":footer:function-selection:contacts:click");
            });
            $('.legals_link').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":footer:function-selection:legal:click");
            });
            $('.logo').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":footer:function-selection:nespresso-logo:click");
            });
            /*
            $('.apple a').on('click', function(event){
                self.trackEvent(link_open, channel+":footer:function-selection:ios-app-store:click");
            });
            $('.android a').on('click', function(event){
                self.trackEvent(link_open, channel+":footer:function-selection:droid-app-store:click");
            });
            */
            // ORDER
            $('.order_footer_btn_visual').on('click', function(event){
                self.trackEvent(channel+":footer:order:click", "", "", "set", "", "", link_open, channel+":footer:order:click");
            });
            $('.order_footer_btn').on('click', function(event){
                self.trackEvent(channel+":footer:order:click", "", "", "set", "", "", link_open, channel+":footer:order:click");
            });

            // DESIGN
            $('.design_pdf').on('click', function(event){
                self.trackEvent("", "", channel+":features:download:user-guide:click", "", "", "set", link_dll, channel+":features:download:user-guide:click");
            });
            $('.design_youtube').on('click', function(event){
                self.trackEvent("", "", "", "", "", "", link_open, channel+":features:watch-video:youtube:click");
            });
        };

        init();
    };

    return SiteTracker;
});