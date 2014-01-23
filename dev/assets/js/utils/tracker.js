define([
    "jquery",
    "publisher",
    "events"
], function($, publisher, Events) {

    var SiteTracker = function(lang_, countryCode_) {
        var self = this;
        var lang = lang_, countryCode = countryCode_;
        var account = "nesp-preprod";
      

        // ******************* public ******************* 
        this.trackPage = function(pageName, subPageName, subsubPageName, prop4){
            reinit();

            var channel = "UCE:latissimapro";
            var pageNameTrack =  channel+":"+pageName;
            if(typeof subPageName == "undefined") subPageName = "";
            if(typeof subsubPageName == "undefined") subsubPageName = "";
            if(typeof prop4 == "undefined") prop4 = "";

            if(subPageName !== ""){
                pageNameTrack += ":"+subPageName;
                if(subsubPageName !== "")
                    pageNameTrack += ":"+subsubPageName;
            }

            if(prop4 !== "") pageNameTrack += ":"+prop4;

            s = s_gi(account);
            s.currencyCode  =   "CHF";
            s.channel      =   channel;
            s.pageName  =   pageNameTrack;
            s.prop1         =   pageName;
            s.prop2         =   subPageName;
            s.prop3         =   subsubPageName;
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

            s.t();
        };

        this.trackEvent = function(pe, pev2, eVar30, eVar20, eVar41, event18, event30, event47){
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

            s.t();
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
            s.prop18        =   "";
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
            s.pe            =   "";
            s.pev2          =   "";
        };

        var init = function(){
            publisher.subscribe(Events.trackPage, self.trackPage);
            publisher.subscribe(Events.trackEvent, self.trackEvent);

            // header & footer
        };

        init();
    };

    return SiteTracker;
});