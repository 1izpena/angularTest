
'use strict';

angular.module('myAppAngularMinApp')
  .service('ProfileService', ['$http','$q', '$localStorage', '$location', function($http, $q, $localStorage, $location)
  {


     return {

	getUserinfo: getUserinfo,
        getGroups: getGroups, 
	getChannels: getChannels,
	getGroupMembers: getGroupMembers,
	/* de momento no se usa */
	getChannelMembers: getChannelMembers

     }


	

    function getUserinfo () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('http://localhost:3000/api/v1/users/'+ $localStorage.id +'/chat/', {
    		headers: {'x-access-token': $localStorage.token}
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

        $http.get('http://localhost:3000/api/v1/users/'+$localStorage.id +'/chat/groups', {
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

        $http.get('http://localhost:3000/api/v1/users/'+$localStorage.id +'/chat/groups/'+groupId, {
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


    function getGroupMembers (groupId) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('http://localhost:3000/api/v1/users/'+$localStorage.id +'/chat/groups/'+groupId+'/users', {
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

        $http.get('http://localhost:3000/api/v1/users/'+$localStorage.id +'/chat/channels/'+channelId+'/users', {
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
