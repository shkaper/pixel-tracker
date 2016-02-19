'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$rootScope', '$scope', 'Pixel', function ($rootScope, $scope, Pixel) {

        $rootScope.pageTitle = 'Pixel';

        var currentHost = location.host;
        $scope.currentHostTracking = currentHost + '/t/';

        $scope.pixelCreated = false;
        $scope.pixelName = '';

        //$scope.isPristine = $scope.newPixelForm.$pristine;


        var newPixel = {};

        $scope.clearName = function () {
            $scope.pixelName = '';
            $scope.newPixelForm.$setPristine();
            $scope.pixelCreated = false;
        };

        $scope.pixels = Pixel.query(
            function (response) {
                $scope.pixels = response;
            },
            function () {
                //TODO: handle error
            });

        $scope.createPixel = function () {
            newPixel.name = $scope.pixelName;
            Pixel.save(newPixel, function (pixelRet) {
                $scope.pixels.push(pixelRet);
                $scope.pixelCreated = true;
                $scope.newPixelForm.nameInput.$setPristine();
                $scope.pixelName = $scope.currentHostTracking + pixelRet._id;
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

        $scope.toggleInputOn = function (repeatScope) {
            repeatScope.showInput = true;
        };

        $scope.toggleInputOff = function (repeatScope) {
            repeatScope.showInput = false;
        };

    }]);
