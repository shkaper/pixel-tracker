'use strict';

angular.module('pixelTrackerApp')
    .controller('HeaderCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {

        $scope.activeHome = function(){
            console.log($rootScope.pageTitle);
            return ($rootScope.pageTitle === 'Home');
        };
        $scope.activePixel = function(){
            console.log($rootScope.pageTitle);
            return ($rootScope.pageTitle === 'Pixel');
        };


    }]);
