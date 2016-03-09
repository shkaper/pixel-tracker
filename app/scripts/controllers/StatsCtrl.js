'use strict';

angular.module('pixelTrackerApp')
    .controller('StatsCtrl', ['$rootScope', '$scope', '$stateParams', 'Pixel', 'RequestsForPixel', 'URLFactory', 'PageFactory', function ($rootScope, $scope, $stateParams, Pixel, RequestsForPixel, URLFactory, PageFactory) {

        $rootScope.pageTitle = 'Pixel';

        $scope.currentHostTracking = URLFactory.getHost() + '/t/';

        $scope.pixelsLoading = true;

        $scope.pixel = Pixel.get({id: $stateParams.id}).$promise.then(
            function (response) {
                $scope.pixel = response;
                $scope.pixelsLoading = false;
            },
            function () {
                //TODO: handle error
                $scope.pixelsLoading = false;
            });

        //requests & pagination

        $scope.requests = {};
        $scope.requestsPageOptions = [10, 15, 25, 50];
        $scope.requestsPage = 1;
        $scope.requestsPerPage = 10;
        $scope.requestsPagesTotal = 1;
        $scope.requestsTotal = 0;
        $scope.requestsLoading = false;

        $scope.getRequestsPage = function (page, perPage) {
            page = page || $scope.requestsPage;
            perPage = perPage || $scope.requestsPerPage;
            $scope.requestsLoading = true;
            RequestsForPixel.get(
                {
                    id: $stateParams.id,
                    perPage: perPage,
                    page: page
                },
                function (response) {
                    $scope.requests = response.requests;
                    $scope.requestsPage = response.page;
                    $scope.requestsPagesTotal = response.pagesTotal;
                    $scope.requestsTotal = response.requestsCount;
                    for (var i = 0; i < $scope.requests.length; ++i) {
                        $scope.requests[i].clientHeaders = JSON.stringify(JSON.parse($scope.requests[i].clientHeaders), null, 2);
                    }
                    $scope.requestsLoading = false;
                },
                function () {
                    //TODO: handle error
                    $scope.requestsLoading = false;
                });
        };

        $scope.displayPages = PageFactory.displayPages;

        //init table

        $scope.getRequestsPage($scope.requestsPage, $scope.requestsPerPage);

        $scope.range = function (n) {
            return new Array(n);
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

        $scope.toggleCollapsed = function (repeatScope) {
            if (repeatScope.isCollapsed === undefined) {
                repeatScope.isCollapsed = true;
            }
            repeatScope.isCollapsed = !repeatScope.isCollapsed;
        };

    }]);
