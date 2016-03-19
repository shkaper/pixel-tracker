'use strict';

angular.module('pixelTrackerApp')
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
    })
    /*
     * <ANY pxl-loadmask-on="expression"> ... </ANY>
     * If the expression is truthy then the element gets class="loading".
     * A div with spinner and 'Loading...' is added as the first element's child
     * and remains visible as long as the expression stays truthy.
     */
    .directive('pxlLoadmaskOn', function () {
        return {
            restrict: 'A',
            scope: {
                pxlLoadmaskOn: '='
            },
            compile: function (element, attrs) {
                var el = '<div class="container-loading" ng-if="' + attrs.pxlLoadmaskOn + '"><div class="arc-loading"></div><span class="text-loading">Loading...</span></div>';
                element.prepend(el);
                return function postLink(scope, compiledElement) {
                    scope.$watch('pxlLoadmaskOn', function (newval) {
                        compiledElement.toggleClass('loading', !!newval);
                    }, true);
                };
            }
        };
    })
;