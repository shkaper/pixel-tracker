'use strict';

angular.module('pixelTrackerApp')
    .controller('HeaderCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

        $scope.activeHome = function(){
            return ($rootScope.pageTitle === 'Home');
        };
        $scope.activePixel = function(){
            return ($rootScope.pageTitle === 'Pixel');
        };


    }]);
