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
                //TODO: handle error
            });

        $scope.createPixel = function () {
            Pixel.save($scope.newPixel, function (pixelRet) {
                $scope.pixels.push(pixelRet);
            });
        };

        $scope.removePixel = function (id) {
            Pixel.remove({id: id}).$promise.then(
                function () {
                    for (var i = $scope.pixels.length - 1; i >= 0; i--) {
                        if ($scope.pixels[i]._id === id) {
                            $scope.pixels.splice(i, 1);
                        }
                    }
                },
                function () {
                    //TODO: handle error
                }
            );
        };

    }]);
