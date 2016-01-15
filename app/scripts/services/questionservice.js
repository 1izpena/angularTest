'use strict';

angular.module('myAppAngularMinApp')
  .service('QuestionService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q ,API_BASE){
  		return{
  			getQuestion: getQuestion
  		};
  	function getQuestion(id)
  	{
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'get',
          url: API_BASE + '/api/v1/forum/question/'+ id,
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