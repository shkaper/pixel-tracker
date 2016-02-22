'use strict';

angular.module('pixelTrackerApp')
    .controller('StatsCtrl', ['$rootScope', '$scope', '$stateParams', 'Pixel', function ($rootScope, $scope, $stateParams, Pixel) {

        $rootScope.pageTitle = 'Pixel';

        var currentHost = location.host;
        $scope.currentHostTracking = currentHost + '/t/';

        $scope.pixel = Pixel.get({id: $stateParams.id}).$promise.then(
            function (response) {
                $scope.pixel = response;
            },
            function () {
                //TODO: handle error
            });

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
