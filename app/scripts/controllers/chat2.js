'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', function ($scope, ProfileService, $location, $localStorage) {
    
	ProfileService.getGroups().then(function(res, error) {
	      if(error) {

		console.log(error);
                return error;

	      } else {

		     $scope.groups= res.data;

   			
	      }
	});


	ProfileService.getUser().then(function(res, error) {
	      if(error) {

		console.log(error);
                return error;

	      } else {

		     $scope.username= res.data.username;
 		     console.log("esto vale scope2");
		     console.log(res.data.username);

   			
	      }
	});
       
        

 

});
