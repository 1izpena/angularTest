
'use strict';

angular.module('myAppAngularMinApp')
  .service('ProfileService', ['$http','$q', '$localStorage', 'API_BASE', function($http, $q, $localStorage, API_BASE)
  {


     return {

	getUserinfo: getUserinfo,
    getInvitations : getInvitations,

    acceptGroup : acceptGroup,
    refuseGroup : refuseGroup,

    getGroups: getGroups,
	getChannels: getChannels,
	getGroupMembers: getGroupMembers,
	/* de momento no se usa */
	getChannelMembers: getChannelMembers,
    getSistemUsers : getSistemUsers

     }




    function getUserinfo () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+ $localStorage.id +'/chat/', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }


    function getInvitations () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+$localStorage.id +'/chat/invitations', {
            headers: {'x-access-token': $localStorage.token}
    }).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }




   function acceptGroup (groupId) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;

        $http({
          method: 'post',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE+'/api/v1/users/'+userid+'/chat/invitations/'+groupId
        }).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;


    }



    function refuseGroup (groupId) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;

        $http({
          method: 'delete',
          headers: {'x-access-token': $localStorage.token},
          url: API_BASE+'/api/v1/users/'+userid+'/chat/invitations/'+groupId
        }).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;

    }



    function getGroups () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+$localStorage.id +'/chat/groups', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }



    function getChannels (groupId) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+$localStorage.id +'/chat/groups/'+groupId, {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
		//console.log("data");
		//console.log(data);
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }




    function getSistemUsers () {

            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BASE+'/api/v1/users/', {
                headers: {'x-access-token': $localStorage.token}
        }).success(function(data) {
                    defered.resolve(data);
                })
                .error(function(err) {
                    defered.reject(err)
                });

            return promise;
        }




    function getGroupMembers (groupId) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+$localStorage.id +'/chat/groups/'+groupId+'/users', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
		//console.log("data");
		//console.log(data);
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }

/* de momento no se usa */
    function getChannelMembers (channelId) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(API_BASE+'/api/v1/users/'+$localStorage.id +'/chat/channels/'+channelId+'/users', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
		//console.log("data");
		//console.log(data);
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }




  }]);
