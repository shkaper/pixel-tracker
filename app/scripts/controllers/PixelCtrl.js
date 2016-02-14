'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$rootScope', '$scope', 'Pixel', function ($rootScope, $scope, Pixel) {

        $rootScope.pageTitle = 'Pixel';

        $scope.newPixel = {
            name: ''
        };

        $scope.pixels = Pixel.query(
            function (response) {
                $scope.pixels = response;
            },
            function () {
            });

        $scope.createPixel = function () {
            Pixel.save($scope.newPixel, function (pixelRet) {
                $scope.pixels.push(pixelRet);
            });

        };

    }]);
