'use strict';

angular.module('myAppAngularMinApp')
  .service('ForoService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q ,API_BASE){
  		return{
  			getQuestions: getQuestions
  		};
  	function getQuestions()
  	{
  		var defered = $q.defer();
  		var promise = defered.promise;
  	 	$http({
        	method: 'get',
        	url: API_BASE + '/api/v1/forum/questions',
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
