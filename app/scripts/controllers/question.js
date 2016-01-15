'use strict';

angular.module('myAppAngularMinApp')
  .controller('QuestionCtrl', function ($scope,  $location, $routeParams, QuestionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.error = 0;
  $scope.success = 0;
  $scope.path = $location.path();
  $scope.getQuestion = function(id)
  {
    QuestionService.getQuestion(id).then(function (res){
      $scope.question = res.data;
      console.log(res.data);
    },function(err){
      $scope.error = err.message;
    });
  }
  $scope.init = function()
  {
    $scope.getQuestion($routeParams.questionid);
  }
});