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
          $scope.goTo('/login');
        }, function(res)
        {
          $scope.message = res.data.message;
        });
      }
    }
  });
