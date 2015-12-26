
'use strict';

angular.module('myAppAngularMinApp')
  .service('ProfileService', ['$http','$q', '$localStorage', '$location', function($http, $q, $localStorage, $location)
  {


     return {
        getGroups: getGroups,
	getUsername
     }

    function getGroups () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('http://localhost:3000/api/v1/users/:username/chat/groups', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }




    function getUsername () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('http://localhost:3000/api/v1/users/:username/chat/', {
    		headers: {'x-access-token': $localStorage.token}
	}).success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }

/*
    return {
      getGroups: function() {
	return $http.get('http://localhost:3000/api/v1/users/:username/chat/groups', {
    		headers: {'x-access-token': $localStorage.token}
	});

      },


      getUser: function() {
		return $http.get('http://localhost:3000/api/v1/users/:username/chat', {
	    		headers: {'x-access-token': $localStorage.token}
		});
	}

     }

*/
  }]);
