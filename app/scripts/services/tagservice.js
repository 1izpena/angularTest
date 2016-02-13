'use strict';

angular.module('myAppAngularMinApp')
  .service('TagService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
  	function($http, $localStorage, $location, $q ,API_BASE){
  		return{
        getTags: getTags,
        getQuestionsByTag    
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


    function getQuestionsByTag(tagid)
    {
      var defered = $q.defer();
      var promise = defered.promise;
      $http({
          method: 'get',
          url: API_BASE + '/api/v1/forum/tag/'+tagid,
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