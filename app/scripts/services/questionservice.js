'use strict';

angular.module('myAppAngularMinApp')
  .service('QuestionService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q ,API_BASE){
  		return{
        createQuestion: createQuestion,
  			getQuestion: getQuestion,
        commentQuestion: commentQuestion,
        upVote: upVote,
        downVote: downVote,
        getTags: getTags     
  		};
    function createQuestion(data)
    {
      var defered = $q.defer();
      var promise = defered.promise;
      var nowDate = new Date().getTime();
      $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/forum/question/',
          data:{
            "title" : data.title,
            "body"  : data.body,
            "created": nowDate,
            "answercount" : 0,
            "votes" : 0,
            "views" : 0
          }
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise;     
    };
  	function getQuestion(questionId)
  	{
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'get',
          url: API_BASE + '/api/v1/forum/question/'+ questionId,
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise; 		
	  };
    function commentQuestion(questionId, data)
    {
      var defered = $q.defer();
      var promise = defered.promise;
      var nowDate = new Date().getTime();
      $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/comment",
          data: {
            'comment': data,
            'questionid': questionId,
            'created': nowDate,
          }
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise;     
    };
    function upVote(questionId)
    {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/upvote",
          data:{
            "questionid": questionId,
            "vote": 1
          }
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise;     
    };
    function downVote(questionId)
    {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/forum/question/'+ questionId+ "/downvote",
          data:{
            "questionid": questionId,
            "vote": -1
          }
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise;     
    };


    function getTags()
    {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'get',
          url: API_BASE + '/api/v1/forum/tags',
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise;   
    };
}]);