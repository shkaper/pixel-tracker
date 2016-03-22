'use strict';

angular.module('pixelTrackerApp')
    .controller('LoginCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) { //jshint ignore:line

        $scope.login = function () {

            $scope.error = false;
            $scope.disabled = true;

            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                .then(function () {
                    $location.path('/pixel');
                    $scope.disabled = false;
                    $scope.dismissModal();
                    $scope.loginForm = {};
                })
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    }]);
