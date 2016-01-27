'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', '$window', '$uibModal','ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket', 'GroupService', 'ChannelService', 'sharedProperties',
    function ($scope, $window, $uibModal, ProfileService, LoginService, $location, $localStorage, ChatService, Socket, GroupService, ChannelService, sharedProperties) {

      $scope.init = function()
      {
        // Emitimos evento de conexion a chat para recibir nuevas invitaciones a grupos
        Socket.emit('newChatConnection', {'userid':$localStorage.id});
      };

/*
    $scope.logoutLogin = function () {
        sharedProperties.setProperty('/chat2');
        console.log("estoy en chatjs");
        LoginService.logoutLogin();
    };
*/


	  $scope.tagChannel = '';	
	  $scope.tagGroup = '';	



      $scope.error1 = 0;
      $scope.message1 = '';
      //error codes in channel setting modals
      $scope.errorNewGroupModal = 0;
      $scope.errorNewChannelModal = 0;
      $scope.errorEditGroupModal = 0;
      $scope.errorEditChannelModal = 0;
      $scope.errorChannelMemberInfoModal = 0;
      $scope.errorUnsuscribeFromChannelModal = 0;
      $scope.errorDeleteChannelModal = 0;
      $scope.errorDeleteUserFromChannelModal = 0;
      $scope.errorAddUserToChannelModal = 0;
      //messages in channel setting modals
      $scope.messageNewGroupModal = '';
      $scope.messageNewChannelModal = '';
      $scope.messageEditGroupModal = '';
      $scope.messageEditChannelModal = '';
      $scope.messageChannelMemberInfoModal = '';
      $scope.messageUnsuscribeFromChannelModal = '';
      $scope.messageDeleteChannelModal = '';
      $scope.messageDeleteUserFromChannelModal = '';
      $scope.messageAddUserToChannelModal = '';

      $scope.logout = function () {
      LoginService.logout();
    };

      $scope.error1 = 0;
      $scope.message1 = '';
      $scope.navsearch = 0;
      $scope.class1 = "col-xs-12 col-sm-12 col-md-12 col-lg-12";



    $scope.changeSearchNav = function()
    {
      console.log("estoy en chat js");
      if($scope.navsearch === 0){
          console.log("estoy en id cambiando a 1");

          $scope.navsearch = 1;
          $scope.class1 = "col-xs-7 col-sm-7 col-md-8 col-lg-8";
      }
      else{
        console.log("estoy en id cambiando a 0");
          $scope.navsearch = 0;

          $scope.class1 = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
      }

    };


    $scope.goTo = function(url)
    {
      $location.path(url);
    };

      $scope.createNewGroup = function(group){
        $scope.messageNewGroupModal = '';
        $scope.errorNewGroupModal = 0;
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
                $scope.errorNewGroupModal = 1;
                $scope.messageNewGroupModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $("#groupNameTxt").val('').trigger('input');
            $scope.errorNewGroupModal = 1;
            $scope.messageNewGroupModal = err.message;
          }
        );
      };



      /************* new *******************************/
     

       $scope.showGrouptoEdit = function(group){

       	console.log("esto vale taggroup");
       	console.log(group);
       		console.log(group.groupName);
       			console.log(group.id);
       		console.log("esto vale tagchannel");
       		console.log($scope.tagChannel);
        
/*
        $scope.messageEditGroupModal = '';
        $scope.errorEditGroupModal = 0;
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
                $scope.errorEditGroupModal = 1;
                $scope.messageEditGroupModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $("#editGroupNameTxt").val('').trigger('input');
            $scope.errorEditGroupModal = 1;
            $scope.messageEditGroupModal = err.message;
          }
        );
*/
      };



      $scope.checkGroupName = function(data, tagGroup) {
    		if (data === '') {
      			return "Group name should be not blank";
      		}
      		else{
      			
      			

      			return GroupService.editGroup(tagGroup.id, data).then(
          			function(data) {
          				return ;
          			/* esto hay que cambiarlo, para añadir el data que devuelva
          			   en el array de grupos del scope */
            		/*	ProfileService.getGroups().then(
	              			function(data){
				                
				                $scope.groups = data;
				            },function(err) {
				                // Tratar el error
				                
				              /*  $scope.errorEditGroupModal = 1;
				                $scope.messageEditGroupModal = err.message;
				            }
		            
		       			);*/
          		},function(err){
                  // Tratar el error
            
		            /*$scope.errorEditGroupModal = 1;
		            $scope.messageEditGroupModal = err.message;*/
		            console.log("Hay error");
          			console.log(err.message);
          			//$scope.error = err.message;
          			return err.message;
          		}
        		);
      			
      		}
  	  };


      /*********************************************/

      $scope.editGroup = function(group){
        $scope.messageEditGroupModal = '';
        $scope.errorEditGroupModal = 0;
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
                $scope.errorEditGroupModal = 1;
                $scope.messageEditGroupModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $("#editGroupNameTxt").val('').trigger('input');
            $scope.errorEditGroupModal = 1;
            $scope.messageEditGroupModal = err.message;
          }
        );
      };

      $scope.inviteUserToGroup = function (user) {
        $scope.messageNewGroupModal = '';
        $scope.errorNewGroupModal = 0;
        GroupService.inviteUserToGroup(user).then(
          function(data) {
            console.log("esto devuelve accept");
            console.log(data);
          },function(err){
            // Tratar el error
            $("#groupNameTxt").val('').trigger('input');
            $scope.errorNewGroupModal = 1;
            $scope.messageNewGroupModal = err.message;
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
        $scope.messageCreateNewChannelModal = '';
        $scope.errorCreateNewChannelModal = 0;
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
                $scope.errorCreateNewChannelModal = 1;
                $scope.messageCreateNewChannelModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.errorCreateNewChannelModal = 1;
            $scope.messageCreateNewChannelModal = err.message;
            $("#channelNameTxt").val('').trigger('input');
            $("#channelTypeTxt").val('').trigger('input');
          }
        );
      };

      $scope.deleteChannel = function(channel){
        $scope.messageDeleteChannelModal = '';
        $scope.errorDeleteChannelModal = 0;
        ChannelService.deleteChannel($scope.groupid,$scope.channelid).then(
          function(data) {
            $("#deleteChannelModal").modal("hide");
            $scope.privateChannels = data.privateChannels;
            $scope.publicChannels = data.publicChannels;
          },function(err){
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.errorDeleteChannelModal = 1;
            $scope.messageDeleteChannelModal = err.message;
          }
        );
      };

      $scope.editChannel = function(channel){
        $scope.errorEditChannelModal = 0;
        $scope.messageEditChannelModal = '';
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
                $scope.errorEditChannelModal = 1;
                $scope.messageEditChannelModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $("#editChannelNameTxt").val('').trigger('input');
            $scope.errorEditChannelModal = 1;
            $scope.messageEditChannelModal = err.message;
          }
        );
      };

      $scope.addUserToChannel = function(userid1){
        $scope.errorAddUserToChannelModal = 0;
        $scope.messageAddUserToChannelModal = '';
        ChannelService.addUserToChannel($scope.groupid,$scope.channelid,userid1).then(
          function(data) {
            ProfileService.getChannels($scope.groupid).then(
              function(data){
                $("#addUserToChannelModal").modal("hide");
                $scope.privateChannels = data.privateChannels;
                $scope.publicChannels = data.publicChannels;
              },function(err) {
                $scope.errorAddUserToChannelModal = 1;
                $scope.messageAddUserToChannelModal = err.message;
              }
            );
          },function(err){
            $scope.errorAddUserToChannelModal = 1;
            $scope.messageAddUserToChannelModal = err.message;
          }
        );
      };


      $scope.deleteUserFromChannel = function(userid1){
        $scope.errorDeleteUserFromChannelModal = 0;
        $scope.messageDeleteUserFromChannelModal = '';
        ChannelService.deleteUserFromChannel($scope.groupid,$scope.channelid,userid1).then(
          function(data) {
            ProfileService.getChannels($scope.groupid).then(
              function(data){
                $("#deleteUserFromChannelModal").modal("hide");
                $scope.privateChannels = data.privateChannels;
                $scope.publicChannels = data.publicChannels;
              },function(err) {
                $scope.errorDeleteUserFromChannelModal = 1;
                $scope.messageDeleteUserFromChannelModal = err.message;
              }
            );
          },function(err){
            $scope.errorDeleteUserFromChannelModal = 1;
            $scope.messageDeleteUserFromChannelModal = err.message;
          }
        );
      };

      $scope.unsuscribeFromChannel = function(){
        $scope.messageUnsuscribeFromChannelModal = '';
        $scope.errorUnsuscribeFromChannelModal = 0;
        ChannelService.unsubscribeFromChannel($scope.groupid,$scope.channelid).then(
          function(data) {
            ProfileService.getGroups().then(
              function(data){
                $("#unsuscribeFromChannelModal").modal("hide");
                ProfileService.getChannels(groupid)
                  .then(function (data) {
                    $scope.privateChannels = data.privateChannels;
                    $scope.publicChannels = data.publicChannels;
                  },function (err) {
                    $scope.errorUnsuscribeFromChannelModal = 1;
                    $scope.messageUnsuscribeFromChannelModal = err.message;
                  });
              },function(err) {
                $scope.errorUnsuscribeFromChannelModal = 1;
                $scope.messageUnsuscribeFromChannelModal = err.message;
              }
            );
          },function(err){
            // Tratar el error
            $scope.errorUnsuscribeFromChannelModal = 1;
            $scope.messageUnsuscribeFromChannelModal = err.message;
          }
        );
      };


      $scope.resetNewChannel = function(){
        $scope.messageNewChannelModal = '';
        $scope.errorNewChannelModal = 0;
        $("#channelNameTxt").val('').trigger('input');
        $("#channelTypeTxt").val('').trigger('input');
      };

      $scope.resetNewGroup = function(){
        $scope.messageNewGroupModal = '';
        $scope.errorNewGroupModal = 0;
        $("#groupNameTxt").val('').trigger('input');
      };

      $scope.resetEditGroup = function(){
        $scope.messageEditGroupModal = '';
        $scope.errorEditGroupModal = 0;
        $("#editGroupNameTxt").val('').trigger('input');
      };

      $scope.resetEditChannel = function(){
        $scope.messageEditChannelModal = '';
        $scope.errorEditChannelModal = 0;
        $("#editChannelNameTxt").val('').trigger('input');
      };

      $scope.getChannels = function (group) {

      ProfileService.getChannels(group.id)
        .then(function (data) {
          $scope.privateChannels = data.privateChannels;
          $scope.publicChannels = data.publicChannels;
          $scope.directChannels = data.directMessageChannels;

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });
    };

/* de momento no se usa */
    $scope.getChannelMembers = function () {

      ProfileService.getChannelMembers($scope.channelid)
        .then(function (data) {
          $scope.channelMembers = data;

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
          for (var i = 0; i < data.length; i++ ) {
                $scope.members[i].color = getRandomColor();

          }
          console.log($scope.members);

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.error = err.message;

        });
    };

    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }






    $scope.getMessages = function (channel) {

      // Al pintarlos utilizamos $storage.id
      $scope.$storage = $localStorage;

      var data = {
        userid: $localStorage.id,
        groupid: $scope.groupid,
        channelid: channel.id,
      };


      ChatService.getMessages(data).then(
        function(result) {
          $scope.listaMensajes = result.data;
        },
        function(error) {
          // TODO: mostrar error
          console.log("error getMessages");
          console.log(error);
        }

      );
    };

      $scope.confirmUploadFile = function () {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/uploadModal.html',
          controller: 'uploadModalCtrl',
          resolve: {
            data: function () {
              return {
                groupid: $scope.groupid,
                channelid: $scope.channelid,
                file: $scope.file
              }
            }
          }
        });

        modalInstance.result.then(function () {
            $scope.file="";
        },function () {
            $scope.file="";
          }
        );
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
      $scope.channelSelected = false;
      $scope.tagChannel='';



      // Emitimos evento de selecion de grupo para notificaciones de usuarios coenctados al grupo
      Socket.emit('selectGroup', { 'groupid': group.id, 'userid': $localStorage.id } );

    };

      $scope.selectUser= function (user) {
        $scope.selectedUser=user.id;
      };

    $scope.selectChannel = function (channel) {

      $scope.channelid=channel.id;
      $scope.tagChannel=channel;

      $scope.channelSelected = true;
      $scope.getChannelMembers();
      $scope.getMessages(channel);

      // Emitimos evento de selecion de canal para recibir nuevos mensajes
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
          $window.location.href=result.data.url;

        },
        function (error) {
          // TODO: Mostrar error
          console.log("Error en getDownloadUrl");
          console.log(error);
        }
      );

    };

    $scope.isConnected = function (userid) {
      var ret = false;
      if ($scope.listaUsuariosConectados[userid]) {
        ret = true;
      }
      return ret;
    };

    $scope.searchDirectChannel = function (member) {

      var userid = $localStorage.id;
      var groupid = $scope.groupid;
      var directChannels = $scope.directChannels;

      var channel = ChannelService.searchDirectChannel(userid, member, directChannels);
      if (channel != null) {
        $scope.selectChannel (channel);
      }
      else {
        ChannelService.createDirectChannel(userid, $scope.username, member, groupid)
          .then ( function (channel) {
            $scope.directChannels.push(channel);
            $scope.selectChannel (channel);
        },
        function (err) {
          // Tratar el error
          console.log("Error al crear el canal para mensajes directos");
          console.log(err.message);
          $scope.error = err.message;
        })
      }



    };

    $scope.showUserInfo = function ($index) {
      if ($index < 1) {
        return true;
      }

      var msgactual = $scope.listaMensajes[$index];
      var msganterior = $scope.listaMensajes[$index-1];

      if (msgactual.user.id ==msganterior.user.id) {
        if (moment(msgactual.date).diff(moment(msganterior.date),'minutes') > 10) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return true;
      }


    };


    $scope.channelSelected = false;
    $scope.listaMensajes = [];
    $scope.listaUsuariosConectados = {};


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
      $scope.listaMensajes.push(data);
      $scope.$apply();
    });

    Socket.on('newUserConnect', function (data) {
      $scope.listaUsuariosConectados[data.userid] = true;
      $scope.$apply();
    });

      Socket.on('usersConnected', function (data) {
        if (data.users) {
          for (var i = 0; i < data.users.length; i++) {
            $scope.listaUsuariosConectados[data.users[i]] = true;
          }
          $scope.$apply();
        }
      });

      Socket.on('userDisconnect', function (data) {
      delete $scope.listaUsuariosConectados[data.userid];
      $scope.$apply();
    });


      //recibir evento de invitación a grupo
      Socket.on('newGroupInvitation', function (data) {
        console.log ("newGroupInvitation received from server");
        console.log(data);
        $scope.invitations.push(data);
        $scope.$apply();
      });

      //recibir evento de nuevo canal publico en grupo
      Socket.on('newPublicChannel', function (data) {
        console.log ("newPublicChannel received from server");
        console.log(data);
        $scope.publicChannels.push(data);
        $scope.$apply();
      });

      //recibir evento de nuevo canal privado en grupo
      Socket.on('newPrivateChannel', function (data) {
        console.log ("newPrivateChannel receive from server");
        console.log(data);
        $scope.privateChannels.push(data);
        $scope.$apply();
      });

      //recibir evento de nuevo usuario en grupo
      Socket.on('newMemberInGroup', function (data) {
        console.log ("newMemberInGroup receive from server");
        console.log(data);
        $scope.members.push(data);
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de grupo
      Socket.on('deletedMemberInGroup', function (data) {
        console.log ("deletedMemberInGroup receive from server");
        console.log(data);
        for (i=0;i<$scope.members.length;i++){
          if ($scope.members[i].id == data.id){
            $scope.members.splice(i,1);
            $scope.$apply();
          }
        }
      });

      //recibir evento de nuevo usuario en canal
      Socket.on('newMemberInChannel', function (data) {
        console.log ("newMemberInChannel receive from server");
        console.log(data);
        $scope.channelMembers.push(data);
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de canal
      Socket.on('deletedMemberInChannel', function (data) {
        console.log ("deletedMemberInChannel receive from server");
        console.log(data);
        for (i=0;i<$scope.channelMembers.length;i++){
          if ($scope.channelMembers[i].id == data.id){
            $scope.channelMembers.splice(i,1);
            $scope.$apply();
          }
        }
      });

      //recibir evento de nombre de grupo editado
      Socket.on('editedGroup', function (data) {
        console.log ("editedGroup receive from server");
        console.log(data);
        for (i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.id){
            $scope.groups[i].groupname = data.groupname;
            $scope.$apply();
          }
        }
      });

      //recibir evento de nombre de canal publico editado
      Socket.on('editedPublicChannel', function (data) {
        console.log ("editedPublicChannel receive from server");
        console.log(data);
        for (i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels[i].channelName = data.channelName;
            $scope.$apply();
          }
        }
      });

      //recibir evento de nombre de canal privado editado
      Socket.on('editedPrivateChannel', function (data) {
        console.log ("editedPrivateChannel receive from server");
        console.log(data);
        for (i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels[i].channelName = data.channelName;
            $scope.$apply();
          }
        }
      });

      //recibir evento de canal privado eliminado
      Socket.on('deletedPrivateChannel', function (data) {
        console.log ("deletedPrivateChannelInGroup receive from server");
        console.log(data);
        for (i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data){
            $scope.privateChannels.splice(i,1);
            $scope.$apply();
          }
        }
      });

      //recibir evento de canal publico eliminado
      Socket.on('deletedPublicChannel', function (data) {
        console.log ("deletedPublicChannelInGroup receive from server");
        for (i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data){
            $scope.publicChannels.splice(i,1);
            $scope.$apply();
          }
        }
      });

      //recibir evento de grupo eliminado
      Socket.on('deletedGroup', function (data) {
        console.log ("deletedGroup receive from server");
        for (i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data){
            $scope.groups[i].splice(i,1);
            $scope.$apply();
          }
        }
      });

    }]);
