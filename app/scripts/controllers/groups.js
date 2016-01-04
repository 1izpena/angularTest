'use strict';

angular.module('myAppAngularMinApp')
  .controller('GroupCtrl', function ($scope, GroupService, ProfileService, $routeParams, $location, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = 0;
    $scope.success = 0;

    $scope.goTo = function(url)
    {
      $location.path(url);
    };

    $scope.createNewGroup = function(group){
      GroupService.createNewGroup(group).then(
        function(data) {
          $scope.privateChannels = data.privateChannels;
          $scope.publicChannels = data.publicChannels;
          ProfileService.getGroups().then(
            function(data){
              $scope.groups = data;
            },function(err) {
              // Tratar el error
              console.log("Hay error");
              console.log(err.message);
              $scope.error = err.message;
            }
          );
        },function(err){
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    };

    $scope.editGroup = function(group){
      GroupService.editGroup(group).then(
        function(data) {
          ProfileService.getGroups().then(
            function(data){
              $scope.groups = data;
            },function(err) {
              // Tratar el error
              console.log("Hay error");
              console.log(err.message);
              $scope.error = err.message;
            }
          );
        },function(err){
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    };

    $scope.getChannels = function(){
      ProfileService.getChannels($localStorage.groupid).then(
        function(data) {
          $scope.privateChannels = data.privateChannels;
          $scope.publicChannels = data.publicChannels;
        },function(err){
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    };

    $scope.getGroups = function(){
      ProfileService.getGroups().then(
        function(data){
          $scope.groups = data;
        },function(err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        });
    };

    $scope.getGroupMembers = function(){
      ProfileService.getGroupMembers($localStorage.groupid).then(
        function(data){
          $scope.members = data;
        },function(err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    };
  });
