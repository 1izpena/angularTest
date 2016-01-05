'use strict';

angular.module('myAppAngularMinApp')
  .service('ChatService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {
        uploadFileS3: uploadFileS3,
        postMessage: postMessage,
        getMessages: getMessages
      };

      function uploadFileS3 (data) {
        var defered = $q.defer();
        var promise = defered.promise;

        // getSignedUrl para subir fichero a AWS S3
        $http({
          method: 'post',
          url: API_BASE + 'api/v1/file/getSignedUrl',
          headers: {
            'x-access-token': $localStorage.token
            },
          data: {
            'groupid': data.groupid,
            'channelid': data.channelid,
            'filename': data.file.name
          }
        }).then( function(response){
            // Put del fichero en AWS S3
            $http({
              method: 'put',
              url: response.data.url,
              headers: {
                'x-access-token': $localStorage.token,
                'Content-Type': data.file.type
              },
              data: data.file
            }).then(function(response){
                defered.resolve(response);
              },
              function (err) {
                defered.reject(err);
              });
          },
          function (err) {
            defered.reject(err);
          });

        return promise;
      }

      function postMessage (data) {
        var defered = $q.defer();
        var promise = defered.promise;

        var userid=data.userid;
        var groupid=data.groupid;
        var channelid=data.channelid;

        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + 'api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/messages',
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

      function getMessages (channel) {
        var defered = $q.defer();
        var promise = defered.promise;

        var userid = $localStorage.id;
        var groupid = $localStorage.groupid;
        var channelid = channel.id;

        $http({
          method: 'get',
          url: API_BASE + 'api/v1/users/'+userid+'/chat/groups/'+groupid+'/channels/'+channelid+'/messages',
          headers: { 'x-access-token': $localStorage.token },
        }).then( function(result){
            defered.resolve(result);
          },
          function (err) {
            defered.reject(err);
          });
        return promise;
      }
  }]);

