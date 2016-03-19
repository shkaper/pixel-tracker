'use strict';

angular.module('pixelTrackerApp', ['ui.router', 'ngResource', 'ngclipboard'])
    .run(function ($rootScope) {
        $rootScope.pageTitle = 'Home';
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'HeaderCtrl'
                    },
                    'content': {
                        templateUrl: 'views/main.html',
                        controller: 'HomeCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }

            })

            // route for the pixels page
            .state('app.pixel', {
                url: 'pixel',
                views: {
                    'content@': {
                        templateUrl: 'views/pixel.html',
                        controller: 'PixelCtrl'
                    }
                }
            })

            // route for the stats page
            .state('app.stats', {
                url: 'stats/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/stats.html',
                        controller: 'StatsCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise('/');
    })
;
