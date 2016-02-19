'use strict';

angular.module('myAppAngularMinApp')
  .controller('editModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'QuestionService','questionid', 'data','AnswerService',
    function ($scope, $uibModalInstance, $localStorage, QuestionService, questionid,data,AnswerService) {

    $scope.questionid = questionid;
    $scope.question = data;
    $scope.answer = data;
    $scope.editQuestion = function(questionid,update)
    {
        $scope.message = '';
        $scope.error = 0;
        $scope.success = 0;
        QuestionService.editQuestion(questionid,update).then(function(res)
        {
            $scope.success =1;
            $uibModalInstance.close(res.data);
        },function(error){
            $scope.error = 1;
            $scope.message = error.data.message;
        });
    }

    $scope.updateAnswer = function(questionid,answerid,update)
    {
        $scope.message = '';
        $scope.error = 0;
        $scope.success = 0;
        AnswerService.editAnswer(questionid,answerid,update).then(function(res)
        {
            $scope.success =1;
            $uibModalInstance.close(res.data);
        },function(error){
            $scope.error = 1;
            $scope.message = error.data.message;
        });
    }

    $scope.close = function ()
    {
        $uibModalInstance.dismiss();
    }
}]);