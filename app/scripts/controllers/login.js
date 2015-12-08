/**
 * Created by urtzi on 08/12/2015.
 */
angular.module('myAppAngularMinApp')
  .controller('LoginCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.layout = 'login';
  });
