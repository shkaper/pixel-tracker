'use strict';

angular.module('pixelTrackerApp')
    .factory('URLFactory', function () {
        return {
            getOrigin: function () {
                return location.origin;
            },

            getHost: function () {
                return location.host;
            },

            getAPI: function () {
                return this.getOrigin() + '/api/';
            }
        };
    })
    .factory('Pixel', ['$resource', 'URLFactory', function ($resource, URLFactory) {
        return $resource(URLFactory.getAPI() + 'pixel/:id');

    }])
    .factory('RequestsForPixel', ['$resource', 'URLFactory', function ($resource, URLFactory) {
        return $resource(URLFactory.getAPI() + 'pixel/:id/requests');

    }])
    .factory('PageFactory', function () {
        return {
            displayPages: function (currentPage, totalPages) {
                var arr = [1];
                for (var i = currentPage - 1; i <= currentPage + 1; ++i) {
                    if (i > 1 && i < totalPages) {
                        arr.push(i);
                    }
                }
                if (arr.indexOf(totalPages) === -1 && totalPages > 1) {
                    arr = arr.concat(totalPages);
                }
                if ((arr[1] - 1) > arr[0]) {
                    arr.splice(1, 0, "blank");
                }
                if ((arr[arr.length - 1] - 1) > arr[arr.length - 2]) {
                    arr.splice(arr.length - 1, 0, "blank");
                }
                console.log(arr);
                return arr;
            }
        };
    })
;