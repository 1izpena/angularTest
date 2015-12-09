/**
 * Created by urtzi on 08/12/2015.
 */
angular.module('myAppAngularMinApp')
  .controller('LoginCtrl', function ($scope, LoginService, $location, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = 0;

    $scope.goTo = function(url)
    {
      $location.path(url);
    }

    $scope.login = function(user) {
      $scope.message = '';
      if ($scope.user.mail && $scope.user.password)
      {
        LoginService.login($scope.user).then(function(res)
        {
          $scope.storage = $localStorage.$default({
            username: res.data.username,
            token: res.data.token
          });
          $scope.goTo('/foro');
        }, function(res)
        {
          $scope.error = 1;
          $scope.message = res.data.message;
        });
      }
    }
  });
