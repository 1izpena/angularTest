'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', '$window', 'ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket', 'GroupService', 'ChannelService',
    function ($scope, $window,ProfileService, LoginService, $location, $localStorage, ChatService, Socket, GroupService, ChannelService) {

      $scope.logoutLogin = function () {
      LoginService.logoutLogin();
    };

      $scope.logout = function () {
      LoginService.logout();
    };

      $scope.error1 = 0;
      $scope.message1 = '';



    $scope.goTo = function(url)
    {
      $location.path(url);
    };

    $scope.createNewGroup = function(group){
      $scope.message1 = '';
      $scope.error1 = 0;
      GroupService.createNewGroup(group).then(
        function(data) {
          $scope.privateChannels = data.privateChannels;
          $scope.publicChannels = data.publicChannels;
          ProfileService.getGroups().then(
            function(data){
              $("#newGroupModal").modal("hide");
              $("#groupNameTxt").val('').trigger('input');
              $scope.groups = data;
            },function(err) {
              // Tratar el error
              $("#groupNameTxt").val('').trigger('input');
              $scope.error1 = 1;
              $scope.message1 = err.message;
            }
          );
        },function(err){
          // Tratar el error
          $("#groupNameTxt").val('').trigger('input');
          $scope.error1 = 1;
          $scope.message1 = err.message;
        }
      );
    };

    $scope.editGroup = function(group){
      $scope.message1 = '';
      $scope.error1 = 0;
      GroupService.editGroup($scope.groupid,group).then(
        function(data) {
          ProfileService.getGroups().then(
            function(data){
              $("#editGroupModal").modal("hide");
              $("#editGroupNameTxt").val('').trigger('input');
              $scope.groups = data;
            },function(err) {
              // Tratar el error
              $("#newGroupNameTxt").val('').trigger('input');
              $scope.error1 = 1;
              $scope.message1 = err.message;
            }
          );
        },function(err){
          // Tratar el error
          $("#editGroupNameTxt").val('').trigger('input');
          $scope.error1 = 1;
          $scope.message1 = err.message;
        }
      );
    };



   $scope.acceptGroup = function (invitation) {   	

      ProfileService.acceptGroup(invitation.groupid)
        .then(function (data) {
          console.log("esto devuelve accept");
          console.log(data);
          $scope.invitations = data.invitations;
          $scope.groups = data.groups;
        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });

    };

    $scope.refuseGroup = function (invitation) {

      ProfileService.refuseGroup(invitation.groupid)
        .then(function (data) {
          console.log("esto devuelve accept");
          console.log(data);
          $scope.invitations = data.invitations;
        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });

 
    };



    $scope.createNewChannel = function(channel){
        $scope.message1 = '';
        $scope.error1 = 0;
        ChannelService.createNewChannel($scope.groupid,channel).then(
          function(data) {
            ProfileService.getChannels($scope.groupid).then(
              function(data) {
                $("#newChannelModal").modal("hide");
                $scope.privateChannels = data.privateChannels;
                $scope.publicChannels = data.publicChannels;
                $("#channelNameTxt").val('').trigger('input');
                $("#channelTypeTxt").val('').trigger('input');
              },function(err){
                // Tratar el error
                console.log("Hay error");
                console.log(err.message);
                $("#channelNameTxt").val('').trigger('input');
                $("#channelTypeTxt").val('').trigger('input');
                $scope.error1 = 1;
                $scope.message1 = err.message;
              }
            );
          },function(err){
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.error1 = 1;
            $scope.message1 = err.message;
            $("#channelNameTxt").val('').trigger('input');
            $("#channelTypeTxt").val('').trigger('input');
          }
        );
      };

      $scope.editChannel = function(channel){
        $scope.message1 = '';
        $scope.error1 = 0;
        ChannelService.editChannel($scope.groupid,$scope.channelid,channel).then(
          function(data) {
            ProfileService.getChannels($scope.groupid).then(
              function(data){
                $("#editChannelModal").modal("hide");
                $scope.privateChannels = data.privateChannels;
                $scope.publicChannels = data.publicChannels;
                $("#editChannelNameTxt").val('').trigger('input');
              },function(err) {
                // Tratar el error
                $("#editChannelNameTxt").val('').trigger('input');
                $scope.error1 = 1;
                $scope.message1 = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $("#editChannelNameTxt").val('').trigger('input');
            $scope.error1 = 1;
            $scope.message1 = err.message;
          }
        );
      };

    $scope.resetNewChannel = function(){
      $scope.message1 = '';
      $scope.error1 = 0;
      $("#channelNameTxt").val('').trigger('input');
      $("#channelTypeTxt").val('').trigger('input');
    };

    $scope.resetNewGroup = function(){
      $scope.message1 = '';
      $scope.error1 = 0;
      $("#groupNameTxt").val('').trigger('input');
    };

    $scope.resetEditGroup = function(){
      $scope.message1 = '';
      $scope.error1 = 0;
      $("#editGroupNameTxt").val('').trigger('input');
    };

    $scope.resetEditChannel = function(){
      $scope.message1 = '';
      $scope.error1 = 0;
      $("#editChannelNameTxt").val('').trigger('input');
    };


    $scope.getChannels = function (group) {

      ProfileService.getChannels(group.id)
        .then(function (data) {
          $scope.privateChannels = data.privateChannels;
          $scope.publicChannels = data.publicChannels;
        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });
    };

/* de momento no se usa */
    $scope.getChannelMembers = function (channel) {

      ProfileService.getChannelMembers(channel.id)
        .then(function (data) {
          $scope.members = data;

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });
    };

    $scope.getGroupMembers = function (group) {

      ProfileService.getGroupMembers(group.id)
        .then(function (data) {
          $scope.members = data;

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });
    };

    $scope.getMessages = function (channel) {

      $scope.$storage = $localStorage;

      ChatService.getMessages(channel).then(
        function(result) {
          console.log("getMessages - return:");
          console.log(result.data);
          $scope.listaMensajes = result.data;
        },
        function(error) {
          // TODO: mostrar error
          console.log("error getMessages");
          console.log(error);
        }

      );
    };

    $scope.uploadFile = function () {

      if ($scope.file) {

        console.log("upload file");
        console.log ($scope.file);

        var data = {
          userid: $localStorage.id,
          groupid: $scope.groupid,
          channelid: $scope.channelid,
          file: $scope.file,
          filename: $scope.file.name,
          messageType: 'FILE'
        };


        ChatService.uploadFileS3(data).then(
          function (result) {
            console.log("Upload OK");
            ChatService.postMessage(data).then(
              function (result) {
                console.log("postMessage OK");
                console.log(result.data);
                //$scope.listaMensajes.push(result.data);
                $scope.file="";
              },
              function (error) {
                // TODO: Mostrar error
                console.log("Error en postMessage");
                console.log(error);
              }
            );
          },
          function (error) {
            // TODO: Mostrar error
            console.log("Error en uploadFileS3");
            console.log(error);
          }
        );

      }

    };

    $scope.sendText = function () {

      if ($scope.text) {
        var data = {
          userid: $localStorage.id,
          groupid: $scope.groupid,
          channelid: $scope.channelid,
          text: $scope.text,
          messageType: 'TEXT'
        };

        ChatService.postMessage(data).then(
          function (result) {
            $scope.text = "";
            console.log("postMessage OK");
            console.log(result.data);
            //$scope.listaMensajes.push(result.data);
          },
          function (error) {
            // TODO: Mostrar error
            console.log("Error en postMessage");
            console.log(error);
          }
        );
      }
    };

    $scope.selectGroup= function (group) {
      $scope.groupid=group.id;

      $scope.getChannels(group);
      $scope.getGroupMembers(group);
      $scope.tagGroup=group;

      
    };

    $scope.selectChannel = function (channel) {

      $scope.channelid=channel.id;
      $scope.tagChannel=channel;

      $scope.channelSelected = true;

      $scope.getMessages(channel);

      // Emitimos eveno de selecion de canal para recibir nuevos mensajes
      Socket.emit('selectChannel', { 'channelid': channel.id } );

    };

    $scope.getDownloadLink = function (filename, ev) {

      ev.preventDefault();

      var data = {
        userid: $localStorage.id,
        groupid: $scope.groupid,
        channelid: $scope.channelid,
        filename: filename
      };

      ChatService.getDownloadUrl(data).then(
        function (result) {
          console.log("Get URL OK");
          $window.location.href=result.data.url;

        },
        function (error) {
          // TODO: Mostrar error
          console.log("Error en getDownloadUrl");
          console.log(error);
        }
      );

    };


    $scope.channelSelected = false;
    $scope.listaMensajes = [];


	ProfileService
      .getInvitations()
      .then(function (data) {
        $scope.invitations = data;
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.error = err.message;

      });






    ProfileService
      .getGroups()
      .then(function (data) {
        $scope.groups = data;
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.error = err.message;

      });

    ProfileService
      .getUserinfo()
      .then(function (data) {
        $scope.username = data.username;
	$scope.userid = data.id;
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.error = err.message;

      });

    //
    Socket.on('newMessage', function (data) {
      console.log ("newMessage receive from server");
      console.log(data);
      $scope.listaMensajes.push(data);
      $scope.$apply();
    });

  }]);
