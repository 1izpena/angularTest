'use strict';

angular.module('myAppAngularMinApp')
  .service('ChannelService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {
      return {
        createNewChannel: createNewChannel,
        //deleteChannel: deleteChannel,
        unsubscribeFromChannel: unsubscribeFromChannel,
        deleteUserFromChannel: deleteUserFromChannel,
        addUserToChannel: addUserToChannel,
        editChannel: editChannel
      };

      function createNewChannel (groupid,data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels',
          data: data
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

      function editChannel (groupid,channelid,data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid,
          data: data
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

      function unsubscribeFromChannel (groupid,channelid) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.userid;
        $http({
          method: 'delete',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/unsuscribe/',
          data: data
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

      function deleteUserFromChannel (groupid,channelid,data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.userid;
        var userid1 = data;
        $http({
          method: 'delete',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/users/'+userid1,
          data: data
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

      function addUserToChannel (groupid,channelid,data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.userid;
        var userid1 = data;
        $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/users/'+userid1,
          data: data
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
    }
  ]);
