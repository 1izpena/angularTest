'use strict';

angular.module('myAppAngularMinApp')
  .service('GroupService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {
      return {
        createNewGroup: createNewGroup,
        //deleteGroup: deleteGroup,
        editGroup: editGroup
      };

      function createNewGroup (data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.userid;
        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + 'api/v1/users/'+userid+'/groups',
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

      function editGroup (data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.userid;
        var groupid = $localStorage.groupid;
        $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + 'api/v1/users/'+userid+'/groups/'+groupid,
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

