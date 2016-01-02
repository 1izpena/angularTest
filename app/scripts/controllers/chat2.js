'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', function ($scope, ProfileService, LoginService, $location, $localStorage) {
  
	$scope.logout = function(){
       		LoginService.logoutLogin();
    	};


        $scope.getChannels = function(group){
		
       		ProfileService.getChannels(group.id)
		.then(function(data) {
		    $scope.privateChannels = data.privateChannels;
		    $scope.publicChannels = data.publicChannels;
		}
		, function(err) {
		    // Tratar el error
			console.log("Hay error");
			console.log(err.message);
	  		$scope.error = err.message;
		
		});
    	}


	$scope.getChannelMembers = function(channel){
		
       		ProfileService.getChannelMembers(channel.id)
		.then(function(data) {
		    $scope.members = data;
		    
		}
		, function(err) {
		    // Tratar el error
			console.log("Hay error");
			console.log(err.message);
	  		$scope.error = err.message;
		
		});
    	}
	




        $scope.getGroupMembers = function(group){
		
       		ProfileService.getGroupMembers(group.id)
		.then(function(data) {
		    $scope.members = data;
		    
		}
		, function(err) {
		    // Tratar el error
			console.log("Hay error");
			console.log(err.message);
	  		$scope.error = err.message;
		
		});
    	}




	ProfileService
        .getGroups()
        .then(function(data) {
            $scope.groups = data;
        }
        , function(err) {
            // Tratar el error
		console.log("Hay error");
		console.log(err.message);
  		$scope.error = err.message;
		
        });



	ProfileService
        .getUserinfo()
        .then(function(data) {
            $scope.username = data.username;
        }
        , function(err) {
            // Tratar el error
		console.log("Hay error");
		console.log(err.message);
		$scope.error = err.message;

        });


});
