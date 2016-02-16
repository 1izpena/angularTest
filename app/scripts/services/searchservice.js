'use strict';

angular.module('myAppAngularMinApp')
  .service('searchservice', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE){
      return{
        forumsearch: forumsearch, 
        chatsearch: chatsearch
      };

    function forumsearch(request)
    {
      var defered = $q.defer();
      var promise = defered.promise;

      $http({
          method: 'POST',
          url: API_BASE + '/api/v1/forumsearch',
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


  function chatsearch(text, channelid)
  {
      var defered = $q.defer();
      var promise = defered.promise;

      $http({
          method: 'POST',
          url: API_BASE + '/api/v1/chatsearch',
          data: {key: text, channel: channelid}
        }).then(
          function(response) {
            console.log("entro en .then");
             if(response.data.hits.hits.length > 0 ){
              

              var hits = (Object.keys(response.data.hits.hits).length)-1;        
              var arrayText = [];

          
              for (var cont = 0; cont <= hits; cont++){
                
                var obj = {};
                obj.id = response.data.hits.hits[ cont ]._id;
                obj.source = response.data.hits.hits[ cont ]._source;
                arrayText.push(obj);
              }
              

            } else {
              //console.log(response.data.hits);
              console.log("no hay coincidencias");
              arrayText = ({error:"No hay coincidencias"});
             
            }
            //console.log(data);
            defered.resolve(arrayText);
            
          },
          function(error){
            console.log("hay error");
            defered.reject(error);
          }
        );
      return promise;
  };




}]);
