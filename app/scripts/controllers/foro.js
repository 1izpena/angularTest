/*
**
 * Created by Jon on 16/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .controller('ForoCtrl', function ($scope,  $location, ForoService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.error = 0;
  $scope.success = 0;
  $scope.getQuestions = function()
  {
    ForoService.getQuestions().then(function (res){
      $scope.questions = res.data;
    },function(err){
      $scope.error = err.message;
    });
  }

  $scope.init = function()
  {
    $scope.getQuestions();
  }
});