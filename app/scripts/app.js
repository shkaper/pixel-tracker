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
    })
    .directive('focusOn', function ($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusOn);
                scope.$watch(model, function (value) {
                    console.log('value=', value);
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
                //set attribute value to 'false' on blur event:
                element.bind('blur', function () {
                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    });
