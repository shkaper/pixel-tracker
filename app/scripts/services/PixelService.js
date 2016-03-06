'use strict';

angular.module('pixelTrackerApp')
    .factory('hostURL', function(){
        return location.origin;
    })
    .factory('Pixel', ['$resource', 'hostURL', function ($resource, hostURL) {
        return $resource(hostURL + '/api/pixel/:id');

    }])
    .factory('RequestsForPixel', ['$resource', 'hostURL', function ($resource, hostURL) {
        return $resource(hostURL + '/api/pixel/:id/requests');

    }])
;