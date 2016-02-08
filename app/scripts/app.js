'use strict';

angular.module('pixelTrackerApp', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }

            })

            // route for the contactus page
            .state('app.pixel', {
                url: 'pixel',
                views: {
                    'content@': {
                        templateUrl: 'views/pixel.html',
                        controller: 'PixelCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise('/');
    });