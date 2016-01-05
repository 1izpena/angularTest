'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', 'ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket',
  function ($scope, ProfileService, LoginService, $location, $localStorage, ChatService, Socket) {

    $scope.logout = function () {
      LoginService.logoutLogin();
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
    }


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
          groupid: $localStorage.groupid,
          channelid: $localStorage.channelid,
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

      var data = {
        userid: $localStorage.id,
        groupid: $localStorage.groupid,
        channelid: $localStorage.channelid,
        text: $scope.text,
        messageType: 'TEXT'
      };

      ChatService.postMessage(data).then(
        function(result) {
          $scope.text="";
          console.log("postMessage OK");
          console.log (result.data);
        },
        function (error) {
          // TODO: Mostrar error
          console.log ("Error en postMessage");
          console.log(error);
        }
      );



    };

    $scope.selectGroup= function (group) {
      $localStorage.groupid=group.id;

      $scope.getChannels(group);
      $scope.getGroupMembers(group);
    };

    $scope.selectChannel = function (channel) {

      $localStorage.channelid=channel.id;

      $scope.channelSelected = true;

      $scope.getChannelMembers(channel);
      $scope.getMessages(channel);

      // Emitimos eveno de selecion de canal para recibir nuevos mensajes
      Socket.emit('selectChannel', { 'channelid': channel.id } );

    };


    $scope.channelSelected = false;
    $scope.listaMensajes = [];

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
    });

  }]);
