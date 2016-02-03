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
    /* modal de errores para los settings del grupo */
    $scope.errorG= '';



      $scope.error1 = 0;
      $scope.message1 = '';
      //error codes in channel setting modals

      $scope.errorUnsuscribeFromGroupModal = 0;
      $scope.messageUnsuscribeFromGroupModal = '';

      $scope.searchinputplaceholder = "Search member ...";


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

      $scope.createNewGroup = function(group){
        $scope.messageNewGroupModal = '';
        $scope.errorNewGroupModal = 0;
        GroupService.createNewGroup(group).then(
          function(data) {
            //$scope.$apply();
            $("#newGroupModal").modal("hide");
            $("#groupNameTxt").val('').trigger('input');

            /* no lo actualiza */
            /*$scope.groups.push(data);
            console.log($scope.groups.indexOf(data));
            $scope.tagGroup='';*/


            /* falta el emit xsockects para que lo actualice */
            /* cuando este el sockect sobra esta llamada */
           /* ProfileService
                  .getGroups()
                  .then(function (data) {
                    $scope.groups = data;
                  }
                  , function (err) {
                    // Tratar el error
                    console.log("Hay error");
                    console.log(err.message);
                    $scope.error = err.message;

                  });*/




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
            $("#editGroupModal").modal("hide");
            $("#editGroupNameTxt").val('').trigger('input');
          },function(err){
            // Tratar el error
            $("#editGroupNameTxt").val('').trigger('input');
            $scope.errorEditGroupModal = 1;
            $scope.messageEditGroupModal = err.message;
          }
        );
      };





      $scope.unsuscribeFromGroup = function(){

        GroupService.unsuscribeFromGroup($scope.tagGroup).then(
          function(data) {

             $("#unsuscribeFromGroupModal").modal("hide");
             var ind = $scope.groups.indexOf($scope.tagGroup);
             $scope.groups.splice(ind,1);
             $scope.tagGroup='';
             $scope.tagChannel='';
             $scope.publicChannels='';
             $scope.privateChannels='';



          },function(err){
            // Tratar el error

            console.log(err);
            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");


          }
        );
      };





      $scope.inviteUserToGroup = function (user) {

        GroupService.inviteUserToGroup(user, $scope.tagGroup).then(
          function(data) {

            var index = $scope.membersSettings.indexOf(user);
            if(index > -1){
                $scope.membersSettings.splice(index, 1);
                /* lo quito xsi sigue invitando usuarios,
                   pero luego vuelve a estar en la lista
                */

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
            $scope.searchText= '';
            /* borrarlo de los usuarios de los settings y de los mensajes directos */

            /* lo borra con el emit
            var index = $scope.members.indexOf(user);
            $scope.members.splice(index,1);*/
            var index2 = $scope.membersSettings.indexOf(user);



            if(index2 > -1){

                $scope.membersSettings.splice(index2,1);
            }


            /* no dejar que se borre asi mismo */

          },function(err){
            // Tratar el error
            console.log("Hay error");
            /*console.log(err.message);
            $scope.error = err.message;*/
            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");
          }
        );
      };



    $scope.removeGroup = function () {

        GroupService.removeGroup($scope.tagGroup).then(
          function(data) {
            console.log(data);
            $("#deleteGroupModal").modal("hide");
            $scope.searchText= '';
            /* sacarlo del grupo con tagGroup = '' */
            $scope.tagGroup='';



          },function(err){
            // Tratar el error
            console.log("Hay error");
            /*console.log(err.message);
            $scope.error = err.message;*/
            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");
          }
        );
      };





      $scope.acceptGroup = function (invitation, ind) {

      ProfileService.acceptGroup(invitation.groupid)
        .then(function (data) {

                $scope.invitations.splice(ind,1);
                //$scope.groups.push(data);

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          /*console.log(err.message);
          $scope.error = err.message;*/
          $scope.errorG = err.data.message;
          $("#errorGroupModal").modal("show");
        });

    };


    $scope.refuseGroup = function (invitation, ind) {

      ProfileService.refuseGroup(invitation.groupid)
        .then(function (data) {

                $scope.invitations.splice(ind,1);

        }
        , function (err) {
          // Tratar el error
          console.log("Hay error");
          /*console.log(err.message);
          $scope.error = err.message;*/
          $scope.errorG = err.data.message;
          $("#errorGroupModal").modal("show");
        });


    };



      $scope.createNewChannel = function(channel){
        $scope.messageCreateNewChannelModal = '';
        $scope.errorCreateNewChannelModal = 0;
        ChannelService.createNewChannel($scope.groupid,channel).then(
          function(data) {
            $("#newChannelModal").modal("hide");
            $("#channelNameTxt").val('').trigger('input');
            $("#channelTypeTxt").val('').trigger('input');
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
            console.log(data);
            $("#editChannelModal").modal("hide");
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
            $("#addUserToChannelModal").modal("hide");
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
            $("#deleteUserFromChannelModal").modal("hide");
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
            $("#unsuscribeFromChannelModal").modal("hide");
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
            $scope.adminGroup = data.admin;


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
          $scope.membersSettings = data;
          for (var i = 0; i < data.length; i++ ) {
                $scope.members[i].color = getRandomColor();

          }


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
      else if (option == 2){
          $scope.membersSettings = $scope.members;
          $scope.option = option;
          console.log($scope.membersSettings);
          $scope.searchinputplaceholder = "Search member to remove and click on it ...";
      }
      else {
          $scope.membersSettings = $scope.members;
          $scope.option = option;
          $scope.searchinputplaceholder = "Search member ...";
          console.log($scope.membersSettings);


      }

    };


    function getSystemUsers(group) {
            ProfileService.getSystemUsers(group.id)
            .then(function (data) {

              /* para coger usuarios que no estan en el grupo y si en el sistema*/
              var temp = data;

              for (var i = 0; i < $scope.members.length; i++ ) {
                console.log($scope.members[i].mail);

                for (var j = 0; j < data.length; j++ ) {

                      if($scope.members[i].mail == data[j].mail){
                          temp.splice(j,1);
                          j = data.length;

                      }
                }
              }

              $scope.membersSettings = temp;


              for (var i = 0; i < data.length; i++ ) {
                $scope.membersSettings[i].color = getRandomColor();
              }

            }
            , function (err) {
              // Tratar el error
              console.log("Hay error");
              console.log(err.message);
              $scope.error = err.message;

            });
    }





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


    $scope.sendText = function (text) {
      console.log(text);
      $scope.text = text;
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
            text = null;
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
        /*estas devolviendo el id del user y deberias devolver todo, el user entero
        pero solo cuando acepte la peticion*/
        console.log(data);
        $scope.members = data.users;
        $scope.$apply()
      });

      //recibir evento de usuario eliminado de grupo
      Socket.on('deletedMemberInGroup', function (data) {
        console.log ("deletedMemberInGroup receive from server");
        console.log(data);
        $scope.members = data.users;
        $scope.$apply();
      });

      //recibir evento de nuevo usuario en canal
      Socket.on('newMemberInChannel', function (data) {
        console.log ("newMemberInChannel received from server");
        console.log(data);
        $scope.channelMembers = data.users;
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de canal
      Socket.on('deletedMemberInChannel', function (data) {
        console.log ("deletedMemberInChannel received from server");
        console.log(data);
        $scope.channelMembers = data.users;
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de canal
      Socket.on('deletedUserFromChannel', function (data) {
        console.log ("deletedUserFromChannel received from server");
        console.log(data);
        if (data.userid == $localStorage.id){
          for (var i=0;i<$scope.privateChannels.length;i++){
            if ($scope.privateChannels[i].id == data.id){
              $scope.privateChannels.splice(i,1);
              $scope.$apply();
            }
          }
        }
        $scope.channelMembers = data.users;
        $scope.$apply();
      });

      //recibir evento de nombre de grupo editado
      Socket.on('editedGroup', function (data) {
        console.log ("editedGroup received from server");
        console.log(data);
        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.id){
            $scope.groups[i].groupName = data.groupName;
            $scope.$apply();
          }
        }
      });

      //recibir evento de nombre de grupo editado
      Socket.on('newGroup', function (data) {
        console.log ("newGroup received from server");
        console.log(data);
        $scope.groups.push(data);
        $scope.$apply();
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
        console.log ("deletedPrivateChannelInGroup received from server");
        console.log(data);
        for (var i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels.splice(i,1);
          }
        }
        $scope.channelMembers = '';
        $scope.channelSelected = false;
        $scope.tagChannel = '';
        $scope.$apply();
      });

      //recibir evento de canal publico eliminado
      Socket.on('deletedPublicChannel', function (data) {
        console.log ("deletedPublicChannel received from server");
        for (var i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels.splice(i,1);
          }
        }
        $scope.channelMembers = '';
        $scope.channelSelected = false;
        $scope.tagChannel = '';
        $scope.$apply();
      });

      //recibir evento de grupo eliminado
      Socket.on('deletedGroup', function (data) {
        console.log ("deletedGroup receive from server");
        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.id){
            $scope.groups.splice(i,1);
          }
        }
        $scope.privateChannels = '';
        $scope.publicChannels = '';
        $scope.members = '';
        $scope.channelMembers = '';
        $scope.channelSelected = false;
        $scope.directChannels = '';
        $scope.tagGroup = '';
        $scope.$apply();
      });

    }]);
