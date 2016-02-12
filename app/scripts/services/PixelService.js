'use strict';

angular.module('pixelTrackerApp')
    .constant("baseURL", "http://localhost:3001/")

    .factory('Pixel', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + 'api/pixel');

    }])
;