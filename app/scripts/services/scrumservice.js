/**
 * Created by izaskun on 24/05/16.
 */


'use strict';

angular.module('myAppAngularMinApp')
  .service('ScrumService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {
        /*getUserstoriesTags: getUserstoriesTags*/
        getUserstories: getUserstories


      };

/* hay que hacer 1 parse de mensajes */


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




/*
      function getUserstoriesTags(groupid, channelid) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/tags',
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






/* EXAMPLE

      function publishMessage (data) {
        var defered = $q.defer();
        var promise = defered.promise;

        var userid=data.userid;
        var groupid=data.groupid;
        var channelid=data.channelid;
        var messageid=data.messageid;

        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/messages/'+messageid+'/publish',
          data: { tags: data.tags }
        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );

        return promise;

      }
*/





    }]);
