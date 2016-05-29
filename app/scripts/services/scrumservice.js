/**
 * Created by izaskun on 24/05/16.
 */


'use strict';

angular.module('myAppAngularMinApp')
  .service('ScrumService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {

        getUserstories: getUserstories,
        createUserstory: createUserstory


      };



      function getUserstories(groupid, channelid) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' }

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


      function createUserstory(groupid, channelid, userstory) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;

        var userstoryTagsTemp = [];

        /* tags es 1 array con property text */
        /* hay que parsearlo para que sea 1 array de strings */

        if(userstory.tags !== undefined && userstory.tags !== null && userstory.tags !== '' ){
          if(userstory.tags.length){
            for( var i = 0; i< userstory.tags.length; i++){
              userstoryTagsTemp.push(userstory.tags[i].text);

            }

            userstory.tags = userstoryTagsTemp;
          }
        }


        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories',
          headers: { 'x-access-token': $localStorage.token },
          data: userstory

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
