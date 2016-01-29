'use strict';

angular.module('myAppAngularMinApp')
  .service('GroupService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {
      return {
        createNewGroup: createNewGroup,
        //deleteGroup: deleteGroup,
        editGroup: editGroup, 
        inviteUserToGroup : inviteUserToGroup, 
        removeUserFromGroup : removeUserFromGroup

      };

      function createNewGroup (data) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups',
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
      };

      

      function inviteUserToGroup (user, group) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded'},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+group.id+'/users/'+user.id
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


   
      function removeUserFromGroup (user, group) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'delete',
          headers: {'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded'},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+group.id+'/users/'+user.id
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





/* para borrar grupos enteros 
      function removeUserFromGroup (user, group) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        $http({
          method: 'delete',
          headers: {'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded'},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+group.id
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

*/

      function editGroup (groupid,data2) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
       
        $http({
          method: 'put',
          headers: {'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded'},
          url: API_BASE + '/api/v1/users/'+userid+'/chat/groups/'+groupid,
          data: 'groupName='+data2
                    
        }).success(function(data) {
                defered.resolve(data);
          })
          .error(function(err) {
                defered.reject(err)
          });

        return promise;
      }
    }
  ]);

