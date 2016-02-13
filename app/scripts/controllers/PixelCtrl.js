'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$scope', 'Pixel', function ($scope, Pixel) {
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
