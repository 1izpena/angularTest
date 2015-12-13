'use strict';

/**
 * @ngdoc function
 * @name myAppAngularMinApp.controller:MainCtrl
 * @description
 * # RegisterCtrl
 * Controller of the myAppAngularMinApp
 */
angular.module('myAppAngularMinApp')
  .controller('RegisterCtrl', [ '$http', '$location', 'API_BASE', function ($http, $location, API_BASE) {

      this.register = function () {
        var self=this;
        if (this.registerForm.$valid) {
          $http ({
            method: 'post',
            url: API_BASE + 'api/v1/auth/signup',
            data: self.user
          })
          .then(function() {
              $location.path('/login');

          },
          function(error){
            if (error.data && error.data.message) {
              self.errorMessage = error.data.message;
            }else{
              self.errorMessage='Unexpected error in register';
            }
          });
      }
  };
  }]);
