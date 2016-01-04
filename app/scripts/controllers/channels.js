'use strict';

angular.module('myAppAngularMinApp')
  .controller('ChannelCtrl', function ($scope, GroupService, ChannelService, ProfileService, $routeParams, $location, $localStorage) {
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

    $scope.createNewChannel = function(channel){
      ChannelService.createNewChannel(channel).then(
        function(data) {
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
        },function(err){
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    };

    $scope.editChannel = function(channel){
      ChannelService.editChannel(channel).then(
        function(data) {
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

    $scope.getChannelMembers = function(channel){
      ProfileService.getChannelMembers(channel.id).then(
        function(data) {
            $scope.members = data;
        },function(err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;
        }
      );
    }
  });
