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
                return arr;
            }
        };
    })
    .factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

        // create user variable
        var user = null;

        return {
            isLoggedIn: function () {
                return user ? true : false;
            },

            getUserStatus: function () {
                return user;
            },

            login: function (username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function () {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            },

            logout: function () {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/logout')
                    // handle success
                    .success(function () {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function () {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            },

            register: function (username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/register',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function () {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }
        };

    }])
;