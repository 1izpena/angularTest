
'use strict';

angular.module('myAppAngularMinApp')
  .service('ProfileService', ['$http', '$localStorage', '$location', function($http, $localStorage, $location)
  {
    return {
      getGroups: function() {
	return $http.get('http://localhost:3000/api/v1/users/:username/chat/groups', {
    		headers: {'x-access-token': $localStorage.token}
	});
        /*var groups='';
        $promise.then(function(res, error) {
	      		if(error){

			return res.status(error.code).json({message: error.message});

			}
			else{
		     groups = res.data;
		     return groups;
			}
	      })
	return  $promise;
*/


	},




	getUser: function() {
		return $http.get('http://localhost:3000/api/v1/users/:username/chat', {
	    		headers: {'x-access-token': $localStorage.token}
		});

	}

    }


  }]);
