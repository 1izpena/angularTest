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
             if(response.data.hits.hits[0]){

            var hits = (Object.keys(response.data.hits.hits).length)-1;
            var data = [];
            
            for (var cont=0;cont<=hits;cont++){
            data.push(response.data.hits.hits[ cont ]._source);
            }     
        
            }else{
              data=({error:"No hay coincidencias"});
            }

            defered.resolve(data);
          },
          function(error){
            defered.reject(error);
          }
        );
      return promise; 
  };
}]);