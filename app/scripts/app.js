'use strict';

angular.module('pixelTrackerApp', ['ui.router', 'ngResource'])
    .run(function($rootScope) {
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