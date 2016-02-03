'use strict';

angular.module('myAppAngularMinApp')
  .service('searchservice', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q, API_BASE){
  		return{
  			forumsearch: forumsearch
  		};
  	function forumsearch(request)
  	{
      var defered = $q.defer();
      var promise = defered.promise;

  	 	$http({
        	method: 'POST',
        	url: API_BASE + '/api/v1/search',
          data: {key: request}
        }).then(
          function(response) {
            var data = response.data.hits.hits[0]._source;
            defered.resolve(data);
          },
          function(error){
            defered.reject(error);
          }
        );
    	return promise; 
	};
}]);
