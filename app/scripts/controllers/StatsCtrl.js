'use strict';

angular.module('pixelTrackerApp')
    .controller('StatsCtrl', ['$rootScope', '$scope', '$stateParams', 'Pixel', function ($rootScope, $scope, $stateParams, Pixel) {

        $rootScope.pageTitle = 'Pixel';

        var currentHost = location.host;
        $scope.currentHostTracking = currentHost + '/t/';

        $scope.pixel = Pixel.get({id: $stateParams.id}).$promise.then(
            function (response) {
                $scope.pixel = response;
                for (var i = 0; i < $scope.pixel.requests.length; ++i) {
                    $scope.pixel.requests[i].clientHeaders = JSON.stringify(JSON.parse(response.requests[i].clientHeaders), null, 2);
                }
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

        $scope.toggleCollapsed = function (repeatScope) {
            if (repeatScope.isCollapsed === undefined) {
                repeatScope.isCollapsed = true;
            }
            repeatScope.isCollapsed = !repeatScope.isCollapsed;
        };

    }]);
