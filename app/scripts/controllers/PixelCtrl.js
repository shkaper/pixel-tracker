'use strict';

angular.module('pixelTrackerApp')
    .controller('PixelCtrl', ['$rootScope', '$scope', 'Pixel', '$timeout', 'URLFactory', 'PageFactory', function ($rootScope, $scope, Pixel, $timeout, URLFactory, PageFactory) { //jshint ignore:line

        $rootScope.pageTitle = 'Pixel';

        $scope.currentHostTracking = URLFactory.getHost() + '/t/';

        $scope.pixelCreated = false;
        $scope.pixelName = '';

        var newPixel = {};

        $scope.clearName = function () {
            $scope.pixelName = '';
            $scope.newPixelForm.$setPristine();
            $scope.pixelCreated = false;
        };

        $scope.createPixelLoading = false;

        $scope.createPixel = function () {
            $scope.createPixelLoading = true;
            newPixel.name = $scope.pixelName;
            Pixel.save(newPixel, function (pixelRet) {
                $scope.createPixelLoading = false;
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
        $scope.pixelsPageOptions = [10, 15, 25, 50];
        $scope.pixelsPage = 1;
        $scope.pixelsPerPage = 10;
        $scope.pixelsPagesTotal = 1;
        $scope.pixelsTotal = 0;
        $scope.pixelsLoading = false;

        $scope.getPixelsPage = function (page, perPage) {
            page = page || $scope.pixelsPage;
            perPage = perPage || $scope.pixelsPerPage;

            //wait for 500ms after sending request; if no response comes back, show loader
            var requestTimer = $timeout(function(){
                $scope.pixelsLoading = true;
            }, 500);

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
                    $timeout.cancel(requestTimer); //cancel request timer
                    $scope.pixelsLoading = false;
                },
                function () {
                    //TODO: handle error
                    $timeout.cancel(requestTimer); //cancel request timer
                    $scope.pixelsLoading = false;
                });
        };

        $scope.displayPages = PageFactory.displayPages;

        //init table

        $scope.getPixelsPage($scope.pixelsPage, $scope.pixelsPerPage);

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
