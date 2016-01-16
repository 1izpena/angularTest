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
  $scope.showModal = false;

  $scope.getQuestion = function(id)
  {
    QuestionService.getQuestion(id).then(function (res){
      $scope.question = res.data;
    },function(err){
      $scope.error = err.message;
    });
  }

  $scope.showCommentForm = function ()
  {
     $scope.showModal = !$scope.showModal;
  }

  $scope.comment = function(comment)
  {
    $scope.message = '';
    $scope.error = 0;
    $scope.success = 0;
    $scope.showModal = false;
    QuestionService.commentQuestion($routeParams.questionid,comment).then(function(res){
      $scope.success =1;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }

  $scope.upvote = function()
  {
    QuestionService.upVote($routeParams.questionid).then(function(res){
      $scope.success =1;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }

  $scope.downvote = function()
  {
    QuestionService.downVote($routeParams.questionid).then(function(res){
      $scope.success =1;
      $scope.message = res.data;
    },function(err){
      $scope.error = 1;
      $scope.message = err.data.message;
    });
  }

  $scope.init = function()
  {
    $scope.getQuestion($routeParams.questionid);
  }
});