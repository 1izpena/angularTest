
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

      ResetService.activate($localStorage.ActivateToken).then(function(res)
      {
        $scope.success=1;
        $scope.message = res.data.message;
      },function(res)
      {
          $scope.error = 1;
          $scope.message = res.data.message;
      });
    }
    $scope.init = function()
    {
      if($routeParams.token !== $localStorage.ActivateToken)
      {
         $scope.goTo("/login");
         
      }
    }
  });