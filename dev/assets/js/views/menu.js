define([
    "jquery",
    "tweenmax",
    "events",
    "publisher"
], function($, TweenMax, Events, publisher) {
    /**
     * MainMenu
     * @param {HTMLElement} target
     * @constructor
     */
    var MainMenu = function(target) {
        var self = this;

        // public
        this.start = function() {
            console.log("Start menu");
            $('nav a').on('click', function(event){
                event.preventDefault();
                publisher.publish(Events.navigate, $(this).attr('data-link'));
            });
        };
    };

    return MainMenu;
});