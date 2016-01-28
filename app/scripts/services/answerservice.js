'use strict';

angular.module('myAppAngularMinApp')
  .service('AnswerService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q ,API_BASE){
  		return{
  			newAnswer: newAnswer,
        upVote:    upVote,
        downVote:  downVote,
        commentAnswer: commentAnswer,
        deleteAnswer: deleteAnswer
  		};
  function newAnswer(questionId,data)
  {
    var defered = $q.defer();
    var promise = defered.promise;
    var nowDate = new Date().getTime();
    $http({
      method: 'post',
      headers: {'x-access-token': $localStorage.token},
      url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/answer",
      data:{
        "body"      : data.body,
        "created"   : nowDate,
        "votes"     : 0
      }
    }).then(
        function(response){
          defered.resolve(response);
        },
        function(error){
          defered.reject(error);
        }
    );
    return promise;     
  };

  function commentAnswer(answerid,data)
  {
    var defered = $q.defer();
    var promise = defered.promise;
    var nowDate = new Date().getTime();
    $http({
      method: 'put',
      headers: {'x-access-token': $localStorage.token},
      url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/answer/"+ answerid+'comment',
      data:{
        "body"      : data.body,
        "created"   : nowDate,
      }
    }).then(
        function(response){
          defered.resolve(response);
        },
        function(error){
          defered.reject(error);
        }
    );
    return promise;     
  };

  function upVote(questionId,answerId)
  {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'put',
      headers: {'x-access-token': $localStorage.token},
      url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/answer/"+answerId+'/upvote',
      data:{
        "vote"      : 1,
      }
    }).then(
        function(response){
          defered.resolve(response);
        },
        function(error){
          defered.reject(error);
        }
    );
    return promise; 
  };

  function downVote(questionId,answerId)
  {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'put',
      headers: {'x-access-token': $localStorage.token},
      url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/answer/"+answerId+'/downvote',
      data:{
        "vote"      : -1,
      }
    }).then(
        function(response){
          defered.resolve(response);
        },
        function(error){
          defered.reject(error);
        }
    );
    return promise;
  };

  function deleteAnswer(questionId,answerId)
  {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'delete',
      headers: {'x-access-token': $localStorage.token},
      url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/answer/"+answerId+'/delete',
    }).then(
        function(response){
          defered.resolve(response);
        },
        function(error){
          defered.reject(error);
        }
    );
    return promise;
  };

}]);