
 'use strict';
angular.module('myAppAngularMinApp')
  .controller('ActivateCtrl', function ($scope, $routeParams, $location, $localStorage ,ResetService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = 0;
    $scope.success = 0;

    $scope.goTo = function(url)
    {
      $location.path(url);
    }

    $scope.activate = function()
    {

      ResetService.activate($routeParams.token).then(function(res)
      {
        $scope.success=1;
        $scope.message1 = "welcome to meanstack !!";
          $scope.message2 = "now you can login";
      },function(res)
      {
          $scope.error = 1;
          $scope.message2 = "Email de activación expirado,ingresa tu datos en login para volver a recibir tu email de activación";

      });
    }
  });
