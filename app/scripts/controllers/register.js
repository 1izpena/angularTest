'use strict';

/**
 * @ngdoc function
 * @name myAppAngularMinApp.controller:MainCtrl
 * @description
 * # RegisterCtrl
 * Controller of the myAppAngularMinApp
 */
angular.module('myAppAngularMinApp')
  .controller('RegisterCtrl', [ '$http', '$location', '$localStorage', '$scope', 'API_BASE', function ($http, $location, $localStorage, $scope, API_BASE) {

this.FormVisibility = true;
this.IntroText = true;

      this.register = function () {
        var self=this;
        if (this.registerForm.$valid) {
          $http ({
            method: 'post',
            url: API_BASE + '/api/v1/auth/signup',
            data: self.user
          })
          .then(function(res) {
          $scope.register.FormVisibility = false;
          $scope.register.ResponseVisibility = true;
          $scope.register.IntroText = false;

          },
          function(error){
              $scope.error = 1;
                self.ResponseError = true;
            if (error.data && error.data.message) {
              self.errorMessage = error.data.message;
            }else{
              self.errorMessage='Unexpected error in register';
            }
          });
      }
  };
  }]);
