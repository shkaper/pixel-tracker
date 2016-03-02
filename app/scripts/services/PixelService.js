'use strict';

angular.module('pixelTrackerApp')
    .constant("apiURL", "http://localhost:3001/api/")
    //.constant("apiURL", "http://5028484c.ngrok.io/api/")

    .factory('Pixel', ['$resource', 'apiURL', function ($resource, apiURL) {
        return $resource(apiURL + 'pixel/:id');

    }])
    .factory('RequestsForPixel', ['$resource', 'apiURL', function ($resource, apiURL) {
        return $resource(apiURL + 'pixel/:id/requests');

    }])
;