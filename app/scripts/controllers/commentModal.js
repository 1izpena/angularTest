'use strict';

angular.module('myAppAngularMinApp')
  .controller('commentModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'QuestionService','questionid','answerid','AnswerService',
    function ($scope, $uibModalInstance, $localStorage, QuestionService, questionid, answerid,AnswerService) {
    	$scope.answerid=answerid;
    	$scope.questionid=questionid;
    	$scope.QuestionComment = function (comment) {
	      $scope.message = '';
	      $scope.error = 0;
	      $scope.success = 0;
	      QuestionService.commentQuestion(questionid,comment).then(function(res){
	        $scope.success =1;
	        $uibModalInstance.close(res.data);
	      },function(err){
	        $scope.error = 1;
	        $scope.message = err.data.message;
	      });
	    };

	    $scope.AnswerComment = function (comment){
		     AnswerService.commentAnswer(questionid,answerid,comment).then(function(res){
		      $scope.success =1;
		     $uibModalInstance.close(res.data);
		    },function(err){
		      $scope.error = 1;
		      $scope.message = err.data.message;
		    });
	    };

	    $scope.close = function ()
	    {
	    	$uibModalInstance.dismiss();
	    }
}]);