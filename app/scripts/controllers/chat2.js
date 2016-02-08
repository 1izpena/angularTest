'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', '$window', '$uibModal','ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket', 'GroupService', 'ChannelService', 'sharedProperties', '$log', '$sce',
    function ($scope, $window, $uibModal, ProfileService, LoginService, $location, $localStorage, ChatService, Socket, GroupService, ChannelService, sharedProperties, $log, $sce) {

      $scope.init = function()
      {
        // Emitimos evento de conexion a chat para recibir nuevas invitaciones a grupos
        Socket.emit('newChatConnection', {'userid': $localStorage.id });


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
	  $scope.adminGroup = '';

      /* modal de errores para los settings del grupo */
      $scope.errorG= '';
      $scope.messageNewGroupModal = '';



      $scope.error1 = 0;
      $scope.message1 = '';
      //error codes in channel setting modals

      $scope.errorUnsuscribeFromGroupModal = 0;
      $scope.messageUnsuscribeFromGroupModal = '';

      $scope.searchinputplaceholder = "Search member ...";

      $scope.messageNewChannelModal = '';
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
      /* group user settings tag */
      $scope.option = 0;



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

    /* subraya las coincidencias */
    $scope.highlight = function(text, search) {
	    if (!search) {
	        return $sce.trustAsHtml(text);
	    }
	    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
	};



    $scope.goTo = function(url)
    {
      $location.path(url);
    };



      $scope.removeInput = function(){
      	$("#groupNameTxt").val('').trigger('input');
      };

      $scope.createNewGroup = function(group){

        GroupService.createNewGroup(group).then(
          function(data) {
            $("#newGroupModal").modal("hide");
            $scope.removeInput();
            $scope.messageNewGroupModal = '';


          },function(err){
            // Tratar el error
            console.log("Error on create new group: " + err.data.message);
            $scope.removeInput();
            $scope.messageNewGroupModal = err.data.message;

          }
        );
      };



     $scope.removeGroup = function () {

        GroupService.removeGroup($scope.tagGroup).then(
          function(data) {
            console.log(data);
            $("#deleteGroupModal").modal("hide");
            $scope.tagGroup='';
            $scope.tagChannel='';
          },function(err){
            // Tratar el error
            console.log("Error on delete group: " + err.data.message);
            console.log("Hay error");
            $scope.errorG = err.data.message;
            $("#deleteGroupModal").modal("hide");
            $scope.tagGroup='';
            $("#errorGroupModal").modal("show");
          }
        );
      };


	   	/* si pincha vuelve a los settings del grupo */
	    $scope.showGrouptoEdit = function(group){
       		$scope.tagGroup = group;
       		$scope.tagChannel = '';

      	};


      /* avisa antes de cambiarlo si es erroneo o no */
      $scope.checkGroupName = function(data, tagGroup) {
    		if (data === '') {
      			return "Group name should be not blank";
        }
        else{
          if (tagGroup.groupName === data){
            return "New group name should be different"
          } else{
            return GroupService.editGroup(tagGroup.id, data).then(
              function(data) {
                return ;
              },function(err){
                // Tratar el error
                console.log("Error on edit group name: " + err.data.message);
                console.log("Hay error: " + err.message);
                return err.message;


              }
            );
          }
        }
  	  };

      $scope.unsuscribeFromGroup = function(){
        GroupService.unsuscribeFromGroup($scope.tagGroup).then(
          function(data) {
             $("#unsuscribeFromGroupModal").modal("hide");
             var ind = $scope.groups.indexOf($scope.tagGroup);
             $scope.groups.splice(ind,1);
             $scope.tagGroup='';
             $scope.tagChannel='';
          },function(err){
            // Tratar el error
            console.log("Error on unsuscribe from group: " + err.data.message);
            console.log("Hay error");
            $scope.errorG = err.data.message;
            $("#unsuscribeFromGroupModal").modal("hide");
            $("#errorGroupModal").modal("show");


          }
        );
      };




      /* en este no hay modal por en medio y peta igual */
      $scope.inviteUserToGroup = function (user) {

        GroupService.inviteUserToGroup(user, $scope.tagGroup).then(
          function(data) {

            var index = $scope.membersSettings.indexOf(user);

            if(index > -1){
                $scope.membersSettings[index].isinvited = 1;
            }
            /*$scope.searchText= "";*/

          },function(err){
            // Tratar el error
            /*$scope.searchText= "";*/
            console.log("Hay error");
            console.log(err);

            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");
          }
        );

      };


    $scope.removeUserFromGroup = function (user) {

        GroupService.removeUserFromGroup(user, $scope.tagGroup).then(
          function(data) {
            console.log(data);
            /*$scope.searchText= '';*/
            var index2 = $scope.membersSettings.indexOf(user);

            if(index2 > -1){
                $scope.membersSettings.splice(index2,1);
            }


          },function(err){
            // Tratar el error
            console.log("Hay error sacando a usuario de grupo: " + err.message);
            //$scope.errorG = err.data.message;
            console.log(error);
            $("#errorGroupModal").modal("show");
          }
        );
      };


      $scope.acceptGroup = function (invitation, ind) {
      ProfileService.acceptGroup(invitation.groupid).then(
        function (data) {
          $scope.invitations.splice(ind,1);

        }
        ,function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.errorG = err.message;
          $("#errorGroupModal").modal("show");
        });

    };

    $scope.refuseGroup = function (invitation, ind) {
      ProfileService.refuseGroup(invitation.groupid)
        .then(function (data) {
          $scope.invitations.splice(ind,1);
        },function (err) {
          // Tratar el error
          console.log("Hay error en refuseGroup: " + err.message);
          $scope.errorG = err.message;
          $("#errorGroupModal").modal("show");
        });
    };

      $scope.createNewChannel = function(channel){
        ChannelService.createNewChannel($scope.groupid,channel).then(
          function(data) {
            $("#newChannelModal").modal("hide");
            $("#channelNameTxt").val('').trigger('input');
            $("#channelTypeTxt").val('').trigger('input');
          },function(err){
            // Tratar el error
            console.log("Hay error al crear canal: " + err.data.message);
            $scope.messageNewChannelModal = err.data.message;
            $("#channelNameTxt").val('').trigger('input');
            $("#channelTypeTxt").val('').trigger('input');
          }
        );
      };

      $scope.deleteChannel = function(channel){
        ChannelService.deleteChannel($scope.groupid,$scope.channelid).then(
          function(data) {
            console.log("Delete channel OK");
            $("#deleteChannelModal").modal("hide");
          },function(err){
            // Tratar el error
            console.log("Hay error en delete channel: " + err.data.message);
            $scope.messageDeleteChannelModal = err.data.message;
          }
        );
      };

      $scope.editChannel = function(channel){
          console.log("tagChannel: " + $scope.tagChannel.channelName);
          console.log("newChannelName body: " + channel.channelName);
          if ($scope.tagChannel.channelName == channel.channelName){
            $scope.messageEditChannelModal = 'new channelName should be different';
          } else {
            ChannelService.editChannel($scope.groupid, $scope.channelid, channel).then(
              function (data) {
                console.log(data);
                $("#editChannelModal").modal("hide");
              }, function (err) {
                // Tratar el error
                console.log("Hay error en edit channel: " + err.data.message);
                $("#editChannelNameTxt").val('').trigger('input');
                $scope.messageEditChannelModal = err.data.message;
              }
            );
          }
      };

      $scope.addUserToChannel = function(userid1){
        ChannelService.addUserToChannel($scope.groupid,$scope.channelid,userid1).then(
          function(data) {
            console.log("Ok add user to channel");
            $("#addUserToChannelModal").modal("hide");
          },function(err){
            console.log("Error en add user to channel: " + err.data.message);
            $scope.messageAddUserToChannelModal = err.data.message;
          }
        );
      };


      $scope.deleteUserFromChannel = function(userid1){
        ChannelService.deleteUserFromChannel($scope.groupid,$scope.channelid,userid1).then(
          function(data) {
            console.log("Ok delete user from channel");
            $("#deleteUserFromChannelModal").modal("hide");
          },function(err){
            console.log("Hay error en delete user from channel: " + err.data.message);
            $scope.messageDeleteUserFromChannelModal = err.data.message;
          }
        );
      };

      $scope.unsuscribeFromChannel = function(){
        ChannelService.unsubscribeFromChannel($scope.groupid,$scope.channelid).then(
          function(data) {
            $scope.tagChannel='';
            $scope.channelSelected = false;
            console.log("Ok unsuscribe from channel");
            $("#unsuscribeFromChannelModal").modal("hide");
            console.log("unsuscribe ok");
            for (var i=0;i<$scope.privateChannels.length;i++){
              if ($scope.privateChannels[i].id === data.data.id){
                $scope.privateChannels.splice(i,1);
              }
            }

          },function(err){
            // Tratar el error
            console.log("Hay error en unsuscribe from channel: " + err.data.message);
            $scope.messageUnsuscribeFromChannelModal = err.data.message;
          }
        );
      };


      $scope.resetNewChannel = function(){
        $scope.messageNewChannelModal = '';
        $("#channelNameTxt").val('').trigger('input');
        $("#channelTypeTxt").val('').trigger('input');
      };



      $scope.resetEditGroup = function(){
        $scope.messageEditGroupModal = '';
        $("#editGroupNameTxt").val('').trigger('input');
      };

      $scope.resetEditChannel = function(){
        $scope.messageEditChannelModal = '';
        $("#editChannelNameTxt").val('').trigger('input');
      };

      $scope.getChannels = function (group) {
        ProfileService.getChannels(group.id)
          .then(function (data) {
            $scope.privateChannels = data.privateChannels;
            $scope.publicChannels = data.publicChannels;
            $scope.directChannels = data.directChannels;
            $scope.adminGroup = data.admin;

          },function (err) {
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.errorG = err.message;
          	$("#errorGroupModal").modal("show");

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
          console.log("Error on getChannelMembers: " + err.message);
          console.log(err.message);
          $scope.error = err.message;

        });
    };

    $scope.getGroupMembers = function (group) {

      ProfileService.getGroupMembers(group.id)
        .then(function (data) {

            $scope.members = data;

            for (var i = 0; i < data.length; i++ ) {
                data[i].color = getRandomColor();

            }
            $scope.membersSettings = data;

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          console.log(err.message);
          $scope.errorG = err.message;
          $("#errorGroupModal").modal("show");

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



    $scope.setSettingsOptions = function (option) {
      /* 0 to search users
         1 to add users
         2 to remove users
      */
      $scope.option = option;

      if(option == 1) {
          getSystemUsers($scope.tagGroup);
          $scope.option = option;
          $scope.searchinputplaceholder = "Search user to add and click on it ...";


      }
      else {

          $scope.membersSettings = $scope.members;

          $scope.option = option;
          if(option == 2){
          	   $scope.searchinputplaceholder = "Search member to remove and click on it ...";
          }
          else {
               $scope.searchinputplaceholder = "Search member ...";
          }

      }

    };



    function getSystemUsers(group) {
            ProfileService.getSystemUsers(group.id)
            .then(function (data) {

              /* para coger usuarios que no estan en el grupo y si en el sistema,
                 y marcar los ya invitados
              */
                var temp = data;

                for (var i = 0; i < $scope.members.length; i++ ) {
                  for (var j = 0; j < data.length; j++ ) {
                        if($scope.members[i].mail == data[j].mail){
                            temp.splice(j,1);
                            j = data.length;

                        }
                  }
                }


                for (var i = 0; i < data.length; i++ ) {
                  temp[i].color = getRandomColor();
                  temp[i].isinvited = 0;
                }

                GroupService.getInvitedUsers(group.id).then(function (data2) {

                    for (var i = 0; i < data2.length; i++ ) {
                      for (var j = 0; j < temp.length; j++ ) {
                            if(data2[i].mail == temp[j].mail){
                                temp[j].isinvited = 1;
                            }
                      }
                    }

                    $scope.membersSettings = temp;

            }
            , function (err) {
              // Tratar el error
              console.log("Hay error");
              console.log(err.message);

              $scope.errorG = err.message;
          	  $("#errorGroupModal").modal("show");



            });

            }
            , function (err) {
              // Tratar el error
              console.log("Hay error");
              console.log(err.message);

              $scope.errorG = err.message;
              $("#errorGroupModal").modal("show");

            });
    };





    $scope.getMessages = function (channel) {

      // Al pintarlos utilizamos $storage.id
      $scope.$storage = $localStorage;

      var data = {
        userid: $localStorage.id,
        groupid: $scope.groupid,
        channelid: channel.id
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

      $scope.newAnswer = function (messageid) {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/answerModal.html',
          controller: 'answerModalCtrl',
          size: 'lg',
          resolve: {
            data: function () {
              return {
                groupid: $scope.groupid,
                channelid: $scope.channelid,
                messageid: messageid
              }
            }
          }
        });

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
            $scope.text = null;
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
      Socket.emit('selectChannel', { 'channelid': channel.id , 'userid': $localStorage.id} );

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


      $scope.createQuestion = function () {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/questionModal.html',
          controller: 'questionModalCtrl',
          size: 'lg',
          resolve: {
            data: function () {
              return {
                groupid: $scope.groupid,
                channelid: $scope.channelid
              }
            }
          }
        });


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

        $scope.errorG = err.message;
        $("#errorGroupModal").modal("show");

      });

      Socket.emit('newChatConnection', {'userid': $localStorage.id });

    ProfileService
      .getGroups()
      .then(function (data) {
        $scope.groups = data;
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.errorG = err.message;
        $("#errorGroupModal").modal("show");

      });

    ProfileService
      .getUserinfo()
      .then(function (data) {
        $scope.username = data.username;
	    $scope.userid = data.id;
	    $scope.user = data;
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.errorG = err.message;
        $("#errorGroupModal").modal("show");

      });

    //
    Socket.on('newMessage', function (data) {
      $scope.listaMensajes.push(data);
      $scope.$apply();
    });

    Socket.on('newQuestionAnswer', function (data) {
      var message = data;
      for (var i=0; i < $scope.listaMensajes.length; i++) {
        if ($scope.listaMensajes[i].id == message.id) {
          $scope.listaMensajes[i].answers.push(message.answer);
          break;
        }
      }
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



      /* settings de grupo */

      /* recibir evento de nombre de grupo editado
         por usuario US */

      Socket.on('newGroup', function (data) {
        console.log ("newGroup received from server");
        console.log(data);
        $scope.groups.push(data);
        /* cuando cree el nuevo grupo que le muestre los settings, si el es el que lo crea */
        if(data.users.length == 1){
        	$scope.selectGroup(data);
        	$scope.tagChannel = '';
        }
        $scope.$apply();


      });


      /* recibir evento de grupo eliminado
         por usuario US */
      Socket.on('deletedGroup', function (data) {
        console.log ("deletedGroup receive from server");
        /* mostrar advertencia de que se ha borrado un grupo */
        /* solo hay que hacerlo si estas dentro del grupo */
        if($scope.tagGroup.id == data.id){
	        $scope.tagGroup = '';
	        $scope.tagChannel = '';
        }

        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.id){
            $scope.groups.splice(i,1);
            i = $scope.groups.length;
          }
        }
        $scope.$apply();
      });


      //recibir evento de nombre de grupo editado
      /* a los usuarios que pertenecen al grupo US */
      Socket.on('editedGroup', function (data) {
        console.log ("editedGroup received from server");
        console.log(data);

        for (var i=0; i<$scope.groups.length; i++){
          if ($scope.groups[i].id == data.id){
            $scope.groups[i].groupName = data.groupName;
            $scope.$apply();
            i = $scope.groups.length;
          }
        }
      });



      //recibir evento de invitación a grupo
      /* socket para el usuario que le compete la invitacion */
      Socket.on('newGroupInvitation', function (data) {
        console.log ("newGroupInvitation received from server");
        $scope.invitations.push(data);
        $scope.$apply();


      });

      Socket.on('regretGroupInvitation', function (data) {
        console.log ("regretGroupInvitation received from server");
        /* si es el administrador, poner que pueda de nuevo invitar al usuario a ese grupo */
        if ($scope.adminGroup.id == $scope.userid){
        	data.userid
        	if($scope.option == 1) {
        		for (var i = 0; i < $scope.membersSettings.length; i++){
        			if ($scope.membersSettings[i].id == data.userid){
            			$scope.membersSettings[i].isinvited = 0;
            			i = $scope.membersSettings.length;
          			}
        		}
        	}

        }

        $scope.$apply();
        $scope.invitations.push(data);
        $scope.$apply();


      });



       //recibir evento de nuevo usuario en grupo
       /* si esta en los settings del grupo hay que actualizar los miembros de los settings */
      Socket.on('newMemberInGroup', function (data) {
        console.log ("newMemberInGroup receive from server");
        console.log(data);


        data.user.color = getRandomColor();
        $scope.members.push(data.user);


        /* si es el administrador, cambiarle los membersettings */
        if ($scope.adminGroup.id == $scope.userid){
        	/* sacamos al usuario añadido en el grupo de membersettings */
        	if($scope.option == 1) {
        		for (var i = 0; i < $scope.membersSettings.length; i++){
        			if ($scope.membersSettings[i].id == data.user.id){
        				$scope.membersSettings.splice(i, 1);
            			i = $scope.membersSettings.length;
          			}
        		}
        	}

        }

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




      //recibir evento de usuario eliminado de grupo
      /* si soy yo no tiene que cambiar nada */
      /* si no estoy metido en el grupo dentro tampoco */
      /* actualizar siempre xaqui, xq se usa el mismo socket cuando un usuario sale */

      Socket.on('deletedMemberInGroup', function (data) {
        console.log ("deletedMemberInGroup receive from server");
        console.log(data);


        for (var i = 0; i < $scope.members.length; i++){
          if ($scope.members[i].id == data.user.id){
          		$scope.members.splice(i,1);
          		i = $scope.members.length;
          }
        }



        /* si es el administrador, cambiarle los membersettings */
        if ($scope.adminGroup.id == $scope.userid){
        	/* añadimos al usuario borrado del grupo en membersettings (usuarios de sistema) */
        	if($scope.option == 1) {
        		data.user.color = getRandomColor();
        		$scope.membersSettings.push(data.user);

        	}

        }


        $scope.$apply();

      });




      //recibir evento de nuevo usuario en canal
      Socket.on('newMemberInChannel', function (data) {
        console.log ("newMemberInChannel received from server");
        console.log(data);
        $scope.channelMembers.push(data.user);
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de canal
      Socket.on('deletedUserFromChannel', function (data) {
        console.log ("deletedUserFromChannel received from server");
        console.log(data);
        if (data.userid == $localStorage.id){
          for (var i=0;i<$scope.channelMembers.length;i++){
            if ($scope.channelMembers[i].id == data.user.id){
              $scope.channelMembers.splice(i,1);
              $scope.$apply();
          }
        }
        }
      });
      //recibir evento de nombre de canal publico editado
      Socket.on('editedPublicChannel', function (data) {
        console.log ("editedPublicChannel received from server");
        console.log(data);
        for (var i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels[i].channelName = data.channelName;
            $scope.$apply();
          }
        }

      });

      //recibir evento de nombre de canal privado editado
      Socket.on('editedPrivateChannel', function (data) {
        console.log ("editedPrivateChannel received from server");
        console.log(data);
        for (var i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels[i].channelName = data.channelName;
            $scope.$apply();
          }
        }
      });

      //recibir evento de canal privado eliminado
      Socket.on('deletedPrivateChannel', function (data) {
        console.log ("deletedPrivateChannel received from server");
        console.log(data);
        for (var i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels.splice(i,1);
          }
        }
        if($scope.tagChannel.id == data.id){
          $scope.channelMembers = '';
          $scope.channelSelected = false;
          $scope.tagChannel = '';
        }
        $scope.$apply();
      });

      //recibir evento de canal publico eliminado
      Socket.on('deletedPublicChannel', function (data) {
        console.log ("deletedPublicChannel received from server");
        console.log(data);
        for (var i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels.splice(i,1);
          }
        }
        if($scope.tagChannel.id == data.id){
          $scope.channelMembers = '';
          $scope.channelSelected = false;
          $scope.tagChannel = '';
        }
        $scope.$apply();
      });



    }]);
