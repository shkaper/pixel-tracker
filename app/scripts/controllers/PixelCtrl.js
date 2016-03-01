'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$rootScope', '$scope', 'Pixel', '$timeout', function ($rootScope, $scope, Pixel, $timeout) {

        $rootScope.pageTitle = 'Pixel';

        var currentHost = location.host;
        $scope.currentHostTracking = currentHost + '/t/';

        $scope.pixelCreated = false;
        $scope.pixelName = '';

        var newPixel = {};

        $scope.clearName = function () {
            $scope.pixelName = '';
            $scope.newPixelForm.$setPristine();
            $scope.pixelCreated = false;
        };

        $scope.createPixel = function () {
            newPixel.name = $scope.pixelName;
            Pixel.save(newPixel, function (pixelRet) {
                $scope.pixels.unshift(pixelRet);
                $scope.pixelCreated = true;
                $scope.newPixelForm.nameInput.$setPristine();
                $scope.pixelName = $scope.currentHostTracking + pixelRet._id + '.gif';
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

        //pixels & pagination

        $scope.pixels = {};
        $scope.pixelsPage = 1;
        $scope.pixelsPerPage = 5;
        $scope.pixelsPagesTotal = 1;
        $scope.pixelsTotal = 0;

        $scope.getPixelsPage = function (page, perPage) {
            Pixel.get(
                {
                    perPage: perPage,
                    page: page
                },
                function (response) {
                    $scope.pixels = response.pixels;
                    $scope.pixelsPage = response.page;
                    $scope.pixelsPagesTotal = response.pagesTotal;
                    $scope.pixelsTotal = response.pixelsCount;
                    console.log("pixels ", response.pixels);
                    console.log("page ", response.page);
                    console.log("pagesTotal ", response.pagesTotal);
                },
                function () {
                    //TODO: handle error
                });
        };

        //init table

        $scope.getPixelsPage($scope.pixelsPage, $scope.pixelsPerPage);

        $scope.range = function(n) {
            return new Array(n);
        };

        //table functions

        $scope.toggleInputOn = function (repeatScope) {
            repeatScope.showInput = true;
            repeatScope.focusInput = true;
            repeatScope.isCopied = false;
        };

        //this function is so ugly it makes my eyes bleed
        $scope.toggleInputOff = function (repeatScope) {

            repeatScope.isCopied = false;

            $timeout(function () {
                if (repeatScope.isCopied === true) {
                    repeatScope.focusInput = true;
                } else {
                    repeatScope.showInput = false;
                }
            }, 200);
        };

        $scope.onCopySuccess = function (e, repeatScope) {
            repeatScope.isCopied = true;
        };

    }]);
