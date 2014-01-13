require.config({
    name: "main",
    baseUrl: 'assets/js/',
    paths: {
        html5shiv: 'vendors/html5shiv',
        jquery: 'vendors/jquery-1.10.2.min',
        preloader: 'vendors/jquery.preloader',
        mousewheel: 'vendors/jquery.mousewheel',
        history: 'vendors/history.min',
        modernizr: 'vendors/modernizr.min',
        tweenmax:'vendors/TweenMax.min',
        publisher:'vendors/publisher',
        events:'models/events',
        globals:'models/globals',
        raphaeljs:'vendors/raphael-min',
        glfx:'vendors/glfx',
        requestanimationframe: "vendors/polyfill.requestAnimationFrame"
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'preloader': {
            deps: ['jquery']
        },
        'history': {
            exports: 'History'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'glfx': {
            exports: 'fx'
        },
        'raphaeljs': {
             deps : ['jquery'],
             exports : 'Raphael'
        },
        'tweenmax': {
            deps: ['jquery'],
            exports: 'TweenMax'
        }
    }
});

require([
        "jquery",
        "App",
        "loader",
        "publisher",
        "events",
        "html5shiv"
    ], function($, App, Loader, publisher, Events) {
        var app;
        var loader;
        $(function() {
            app = new App();
            publisher.subscribe(Events.loadStartComplete, function (){
                app.start();
            });
            loader = new Loader();
        });
});