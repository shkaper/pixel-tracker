'use strict';

angular.module('pixelTrackerApp')
    .constant("baseURL", "http://localhost:3001/")
    .factory('tempy', ['$http', function($http) {

    return {
        // call to get all pixels
        get : function() {
            return $http.get('/api/pixels');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new pixel
        create : function(pixelData) {
            return $http.post('/api/pixels', pixelData);
        },

        // call to DELETE a pixel
        delete : function(id) {
            return $http.delete('/api/pixels/' + id);
        }
    };

}])
    .factory('Pixel', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "api/pixel");
    }])
;