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
    .directive('focusOn', function($parse, $timeout) {
        var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                var buildGetterSetter = function(name) {
                    var me = {};
                    me.get = $parse(name);
                    me.set = me.get.assign;
                    if (!me.set) {
                        throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + name);
                    }
                    return me;
                };

                // *********** focus ***********
                var focusStateName = attr.focusOn;
                var focusState = buildGetterSetter(focusStateName);

                // inititialize the focus state
                // (oh, if there were only a way to test if an element presently has focus, we'd preset it here...)
                focusState.set(scope, false);

                // $watch the trigger variable in the controller for a transition
                scope.$watch(focusStateName, function(newValue, oldValue) { // jshint ignore : line
                    if ( newValue ) {
                        $timeout(function() { // a timing workaround hack
                            element[0].focus(); // without jQuery, need [0]
                        });
                    }
                });

                // wire up listeners for focus and blur events so that we can track the state
                element.bind('focus', function() {
                    scope.$apply(function() {
                        focusState.set(scope, true);
                    });
                });
                element.bind('blur', function() {
                    scope.$apply(function() {
                        focusState.set(scope, false);
                    });
                });
            }
        };
    });