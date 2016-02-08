'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$scope', 'Pixel', function ($scope, Pixel) {
        $scope.newPixel = {
            name : ''
        };

        $scope.pixels = Pixel.query(
            function (response) {
                $scope.pixels = response;
            },
            function (response) {
            });

        $scope.createPixel = function () {
            Pixel.save($scope.newPixel);
        }
    }]);
