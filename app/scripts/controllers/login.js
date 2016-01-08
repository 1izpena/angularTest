/**
 * Created by urtzi on 08/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .controller('LoginCtrl', function ($scope, LoginService, $location, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = 0;

    $scope.goTo = function(url) {
      $location.path(url);
    };

    $scope.login = function(user) {
      $scope.message = '';
      $scope.error = 0;
      if (user.mail && user.password) {
        LoginService.login(user).then(function(res) {

          $localStorage.token = res.data.token;
          $localStorage.id = res.data.id;
          $localStorage.username = res.data.username;

          $scope.goTo('/foro');

        }, function(res) {
          $scope.error = 1;
          $scope.message = res.data.message;

          //token de activacion al localstorage
          if($localStorage.ActivateToken !=null)
          {
            delete $localStorage.ActivateToken
          }
          if (res.data.token) {
            $localStorage.ActivateToken = res.data.token;
          }

        });
      }
    };

  });
