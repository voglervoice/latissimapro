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
        'tweenmax': {
            deps: ['jquery'],
            exports: 'TweenMax'
        }
    }
});

require([
        "jquery",
        "App","html5shiv"
    ], function($, App) {
        var app;
        $(function() {app = new App();});
});