define([ ], function () {

          function Events() {
          }

          Events.navigate = "navigate";
          Events.nextPage = "navigateToNextPage";
          Events.loadStartComplete = "onLoadStartComplete";
          Events.soundOff = "soundOff";
          Events.soundOn = "soundOn";
          Events.toggleFullscreen = "toggleFullscreen";
          Events.openPopin = "openPopin";
          Events.closePopins = "closePopins";
          Events.trackPage = "trackPage";
          Events.trackEvent = "trackEvent";

          return Events;
});