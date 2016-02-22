'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', '$window', '$uibModal','ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket', 'GroupService', 'ChannelService', 'sharedProperties', '$log', '$sce', '$anchorScroll','md5', 'searchservice',
    function ($scope, $window, $uibModal, ProfileService, LoginService, $location, $localStorage, ChatService, Socket, GroupService, ChannelService, sharedProperties, $log, $sce, $anchorScroll, md5, searchservice) {

      $scope.init = function()
      {
        // Emitimos evento de conexion a chat para recibir nuevas invitaciones a grupos
        console.log("ha entrado a crear socket newChatConnection");
        Socket.emit('newChatConnection', {'userid': $localStorage.id });
        $scope.groupsNotificationsCount=0;
        $scope.channelsNotificationsCount=0;
        $scope.directChannelsNotificationsCount=0;
        //
        $scope.groupsNotifications=[];
        $scope.channelsNotifications=[];
        $scope.directChannelsNotifications=[];
        //
        $scope.publicChannels = [];
        $scope.privateChannels = [];
        //
        $scope.groupNotifications = [];
        $scope.publicChannelNotifications = [];
        $scope.privateChannelNotifications = [];


        //popover contents
        $('#groupsNotificationBadge').popover({html: true,content: function() {return $('#groupsNotificationList').html();}});
        $('#channelsNotificationBadge').popover({html: true,content: function() {return $('#channelsNotificationList').html();}});
        $('#directChannelsNotificationBadge').popover({html: true,content: function() {return $('#directChannelNotificationList').html();}});
        $('#groupNotificationBadge').popover({html: true,content: function() {return $('#groupNotificationList').html();}});
        $('#publicChannelNotificationBadge').popover({html: true,content: function() {return $('#publicChannelNotificationList').html();}});
        $('#privateChannelNotificationBadge').popover({html: true,content: function() {return $('#privateChannelNotificationList').html();}});
        $('#directChannelNotificationBadge').popover({html: true,content: function() {return $('#directChannelsNotificationList').html();}});
      };

/*
    $scope.logoutLogin = function () {
        sharedProperties.setProperty('/chat2');
        console.log("estoy en chatjs");
        LoginService.logoutLogin();
    };
*/

    /* variables para el menu sidebar-nav */
      $scope.activeInvitations = 0;
      $scope.activeGroups = 1;
      $scope.activeChannels = 0;
      $scope.groupindex = -1;
      $scope.activeDirects = 0;



      $scope.user = '';
	    $scope.membersSettings = '';
	    $scope.membersSettingschannel = '';

	    $scope.members = '';
	    $scope.channelMembers = '';

      $scope.tagChannel = '';
      $scope.tagGroup = '';
      $scope.tagMember = '';
      $scope.adminGroup = '';
      $scope.adminChannel = '';

      /* modal de errores para los settings del grupo */
      $scope.errorG= '';
      $scope.messageNewGroupModal = '';
      $scope.messageNewChannelModal = '';
      $scope.channel = {channelType:"PUBLIC"};


      $scope.error1 = 0;
      $scope.message1 = '';
      //error codes in channel setting modals


      $scope.searchinputplaceholder = "Search member ...";
      /* flag para activar o no settings de canal */
      $scope.activeChannelSettings = 0;

      $scope.navsearch = 0;
      $scope.class1 = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
      /* group user settings tag */
      $scope.option = 0;
      $scope.optionchannel = 0;
      /* content of channel searchbox */
      $scope.textsearchbox = '';
      $scope.searchresults = '';
      $scope.classResalt = "textnormal";
      $scope.classResaltChannelPublic = "textnormal";
      $scope.classResaltChannelPrivate = "textnormal";
      $scope.classResaltDirect = "textnormal";


    $scope.logout = function () {
      LoginService.logout();
    };



    /* change vars of sidebar-nav menu */
    $scope.changeVarMenu = function(varmenu)
    {
      console.log("entro en cambiar");
      console.log(varmenu);

      /* var de invitaciones */
      if(varmenu == 'activeInvitations'){
        if ($scope.activeInvitations){
          $scope.activeInvitations = 0;

        }
        else {
          $scope.activeInvitations = 1;

          /* si hay 1 grupo seleccionado se mantiene */
          if( $scope.tagGroup !== ''){
            /* si hay 1 canal seleccionado se mantiene */
            if( $scope.tagChannel !== ''){
              console.log("el tipo de tagchannel");
              console.log($scope.tagChannel.type);
            }
            else{
              $scope.activeChannels = 0;
              $scope.activeDirects = 0;

            }


          }
          else {
            $scope.activeGroups = 0;
            $scope.activeChannels = 0;
            $scope.activeDirects = 0;

          }

        }

      }
      /* var de grupos */
      else if(varmenu == 'activeGroups'){
        if ($scope.activeGroups){
          /* si estan desplegados los grupos pero hay 1 marcado
            se quita el marcado y aparecen todos otra vez
          */
          if ($scope.groupindex !== -1){

             $scope.classResalt= "textnormal";
             $scope.activeGroups = 1;
             $scope.groupindex = -1;
             $scope.tagGroup = '';
             $scope.tagChannel = '';
             $scope.tagMember = '';
          }
          else {

            $scope.classResalt= "textitalic";
            $scope.activeGroups = 0;

          }

        }
        else {

          $scope.classResalt= "textnormal";
          $scope.groupindex = -1;
          $scope.activeGroups = 1;
          $scope.tagGroup = '';
          $scope.tagChannel = '';

          /*$scope.classResaltChannelPublic= "textnormal";
          $scope.classResaltChannelPrivate = "textnormal";*/

          $scope.classResaltDirect = "textnormal";

          $scope.activeInvitations = 0;
          $scope.activeChannels = 0;
          $scope.activeDirects = 0;
        }

      }

      /* var de canales publicos y privados */
      else if(varmenu == 'activeChannels'){
        if ($scope.activeChannels){
          $scope.activeChannels = 0;
          /*$scope.classResaltChannelPublic= "textnormal";
          $scope.classResaltChannelPrivate = "textnormal";*/
          $scope.tagChannel = '';
          /*$scope.tagMember = '';*/
        }
        else {
          $scope.activeChannels = 1;
          /*$scope.activeGroups = 1;*/

          $scope.activeInvitations = 0;
          $scope.activeDirects = 0;

          /*$scope.classResaltChannelPublic= "textnormal";
          $scope.classResaltChannelPrivate = "textnormal";
          $scope.classResaltDirect = "textnormal";*/

        }

      }
       /* var de canales publicos y privados */
      else if(varmenu == 'activeGroupChannels'){

          $scope.activeChannels = 1;
          /*$scope.activeGroups = 1;*/

          $scope.activeInvitations = 0;
          $scope.activeDirects = 0;

          /*$scope.classResaltChannelPublic= "textnormal";
          $scope.classResaltChannelPrivate = "textnormal";
          $scope.classResaltDirect = "textnormal";*/



      }
      /* var de canales directos */
      else if(varmenu == 'activeDirects'){
        if ($scope.activeDirects){

          $scope.activeDirects = 0;
          $scope.classResaltDirect = "textnormal";

          if($scope.tagChannel.type == "DIRECT"){
            $scope.tagChannel = '';
            $scope.tagMember = '';
          }


        } else {
          /*$scope.tagChannel = '';*/
          /*$scope.classResaltDirect = "textnormal";*/
          $scope.tagMember = '';

          $scope.activeDirects = 1;
          $scope.activeGroups = 1;
          $scope.activeChannels = 1;
          $scope.activeInvitations = 0;
        }
      }
    };


    $scope.changeSearchNav = function(optionsearch)
    {
      console.log("estoy en chat js");
      if(optionsearch == 1){
          console.log("estoy en id cambiando a 1");

          $scope.navsearch = 1;
          $scope.class1 = "col-xs-7 col-sm-7 col-md-8 col-lg-8";
      }
      else {
          console.log("estoy en id cambiando a 0");
          $scope.navsearch = 0;
          $scope.class1 = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
      }

    };


/******************nuevo**************************/

     $scope.searchtextinchannel = function (textsearchbox, channel) {
      console.log("esto vale searchboz");
      console.log(textsearchbox);
      if ( textsearchbox !== 'undefined' && textsearchbox !== '' ){
        searchservice.chatsearch(textsearchbox, $scope.tagGroup.id, $scope.tagChannel.id).then(function (res){
           if(res.error == undefined){
             $scope.searchresults = res.slice();
             for (var i = 0; i < $scope.searchresults.length; i++) {
               for ( var j = 0; j < $scope.channelMembers.length; j++){
                 if ($scope.searchresults[i].source._user == $scope.channelMembers[j].id){
                   $scope.searchresults[i].source._user =  $scope.channelMembers[j];
                 }
               }

             }
           }
           else {
             $scope.searchresults = '';
           }

        },function(err){
           $scope.searchresults = '';
           console.log(err);
           $scope.errorG = err.message;
             $("#errorGroupModal").modal("show");
         });

      } else {
        $scope.searchresults = '';
      }
     };

 /*******************nuevo********************************/

    /* subraya las coincidencias */
    $scope.highlight = function(text, search) {
	    if (!search) {
	        return $sce.trustAsHtml(text);
	    }
	    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
	};

    $scope.goTo = function(url, from)
    {
      if (from === 'chat'){
        sharedProperties.setProperty('/chat2');
      }
      else if (from === 'foro'){
        sharedProperties.setProperty('/foro');
      }

      $location.path(url);
    };

    $scope.removeInputChannelName = function(){
      $("#channelNameTxt").val('').trigger('input');
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
            $scope.tagGroup = '';
            $scope.groupindex = -1;
            $scope.tagChannel = '';


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
            // Emitimos evento de desconexión al grupo
            Socket.emit('disconnectGroup', { 'groupid': $scope.tagGroup.id, 'userid': $localStorage.id } );
            $scope.tagGroup='';
            // Emitimos evento de desconexión a canales
            Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
            $scope.tagChannel='';
          },function(err){
            // Tratar el error
            console.log("Error on delete group: " + err.data.message);
            console.log("Hay error");
            $scope.errorG = err.data.message;
            $("#deleteGroupModal").modal("hide");
            // Emitimos evento de desconexión al grupo
            Socket.emit('disconnectGroup', { 'groupid': $scope.tagGroup.id, 'userid': $localStorage.id } );
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
            // Emitimos evento de desconexión al grupo
            Socket.emit('disconnectGroup', { 'groupid': $scope.tagGroup.id, 'userid': $localStorage.id } );
            // Emitimos evento de desconexión a canales
            Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
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
            console.log("Hay error");
            console.log(err);
            $scope.errorG = err.data.message;
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
      ProfileService.refuseGroup(invitation.groupid).then(
        function (data) {
          $scope.invitations.splice(ind,1);
        },function (err) {
          // Tratar el error
          console.log("Hay error en refuseGroup: " + err.message);
          $scope.errorG = err.message;
          $("#errorGroupModal").modal("show");
        });
    };

/* activeChannelSettings */
	$scope.changeSettingsChannelVisible = function(){
		if($scope.activeChannelSettings == 0){
			$scope.activeChannelSettings = 1;
      $scope.option="";
		}
		else {
			$scope.activeChannelSettings = 0;
		}
  };

    /* avisa antes de cambiarlo si es erroneo o no */
    $scope.checkChannelName = function(data, tagChannel) {
    	console.log("esto tiene tagChannel");
    	console.log($scope.tagChannel);
    	console.log($scope.tagGroup);
    	console.log(tagChannel);
      if (data === '') {
        return "Channel name should be not blank";
      }else{
        if (tagChannel.channelName === data){
          return "New channel name should be different"
        }else{
          return ChannelService.editChannel($scope.tagGroup.id, tagChannel.id, data).then(
            function(data) {
              return ;
            },function(err){
              // Tratar el error
              console.log("Hay error: " + err);
              console.log(err);
              return err.message;
            });
        }
      }
    };
/**********************************/
      $scope.createNewChannel = function(channel){
        ChannelService.createNewChannel($scope.groupid,channel).then(
          function(data) {
            $("#newChannelModal").modal("hide");

            $scope.removeInputChannelName();
            $scope.messageNewChannelModal = '';
            console.log("se crea el nuevo canal");

          },function(err){
            // Tratar el error
            console.log("Hay error al crear canal: " + err.data.message);
            $scope.removeInputChannelName();
            $scope.messageNewChannelModal = err.data.message;

          }
        );
      };

      $scope.deleteChannel = function(){
        ChannelService.deleteChannel($scope.tagGroup.id,$scope.tagChannel.id).then(
          function(data) {
            console.log("Delete channel OK");
            $("#deleteChannelModal").modal("hide");
            // Emitimos evento de desconexión a canales
            Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
            $scope.tagChannel='';

          },function(err){
            // Tratar el error
            console.log("Hay error en delete channel: " + err.data.message);


            $scope.errorG = err.data.message;
            $("#deleteChannelModal").modal("hide");
            // Emitimos evento de desconexión al grupo
            Socket.emit('disconnectGroup', { 'groupid': $scope.tagGroup.id, 'userid': $localStorage.id } );
            $scope.tagGroup='';

            $("#errorGroupModal").modal("show");

          }
        );
      };



      $scope.addUserToChannel = function(member, ind){
        ChannelService.addUserToChannel($scope.groupid,$scope.channelid,member.id).then(
          function(data) {

          	/* si añadimos un miembro nuevo y es privado */
          	/* hay que quitarlo de membersettings */
            console.log("Ok add user to channel");
            //$("#addUserToChannelModal").modal("hide");
            console.log(member);

            /* option == 1 add*/
            if($scope.optionchannel == 1){
            	$scope.membersSettingschannel.splice(ind, 1);
            }
            //console.log("esto vale private channel");
            //console.log($scope.privateChannels);


            $scope.channelMembers.push(member);
            $scope.tagChannel.users.push(member);


          },function(err){
            console.log("Error en add user to channel: " + err.data.message);
            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");

          }
        );
      };


      $scope.deleteUserFromChannel = function(member, ind){
        ChannelService.deleteUserFromChannel($scope.groupid,$scope.channelid,member.id).then(
          function(data) {

            console.log("Ok delete user from channel");
            console.log(member);
            //$("#deleteUserFromChannelModal").modal("hide");
            if($scope.optionchannel == 2){
            	$scope.membersSettingschannel.splice(ind, 1);

            }


          },function(err){
            console.log("Hay error en delete user from channel: " + err.data.message);
            $scope.errorG = err.data.message;
            $("#errorGroupModal").modal("show");


          }
        );
      };



      $scope.unsuscribeFromChannel = function(){
        ChannelService.unsubscribeFromChannel($scope.tagGroup.id,$scope.tagChannel.id).then(
          function(data) {

          	$("#unsuscribeFromChannelModal").modal("hide");
          	if($scope.tagChannel.type == 'private'){

          		var ind = $scope.privateChannels.indexOf($scope.tagChannel);
	            if(ind > -1){
	            	console.log("unsuscribe ok");
	            	$scope.privateChannels.splice(ind,1);
	            }
          	}

            // Emitimos evento de desconexión a canales
            Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
            $scope.tagChannel='';
            $scope.channelSelected = false;

          },function(err){
            // Tratar el error
            console.log("Hay error en unsuscribe from channel: " + err.data.message);
            /*$scope.messageUnsuscribeFromChannelModal = err.data.message;*/
            /**/
            // Emitimos evento de desconexión a canales
            Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
            $scope.tagChannel='';
            $scope.errorG = err.data.message;
            $("#unsuscribeFromChannelModal").modal("hide");
            $("#errorGroupModal").modal("show");


          }
        );
      };




      $scope.getChannels = function (group) {
        ProfileService.getChannels(group.id)
          .then(function (data) {
          	console.log(data);
            $scope.privateChannels = data.privateChannels;
            console.log("esto vale private channels");
            console.log($scope.privateChannels);
            console.log(data);
            $scope.publicChannels = data.publicChannels;
            $scope.directChannels = data.directMessageChannels;
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

          for (var i = 0; i < data.users.length; i++ ) {
          	data.users[i].hash = $scope.getHash(data.users[i].mail);

          }
          $scope.channelMembers = data.users;

          $scope.adminChannel = data.admin;
          $scope.membersSettingschannel = data.users;
          console.log("esto vale cahnnel members");
          console.log(data);
          console.log($scope.channelMembers);
          console.log($scope.adminChannel);
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
                data[i].hash = $scope.getHash(data[i].mail);

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



    $scope.getHash = function (str) {
      if (str)
        return md5.createHash(str);
      else
        return "";
      };


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

    $scope.setSettingsOptionschannel = function (option) {
      /* 0 to search users
         1 to add users
         2 to remove users
      */
      $scope.optionchannel = option;
      if(option == 1) {
      	  /* search users of group to add */
      	  /* coger los que estan en el grupo y quitar los del canal */
      	  /* scope.members = miembros del grupo */
      	  /* scope.channelmembers = miembros del canal */
      	  var temp = $scope.members.slice();
      	  var indi = -1;
      	  for (var i = 0; i < $scope.members.length; i++ ) {
      	  	//console.log()
      	  	for (var j = 0; j < $scope.channelMembers.length; j++ ) {
              if($scope.members[i].mail == $scope.channelMembers[j].mail){
                indi = temp.indexOf($scope.members[i]);
                if (indi > -1){
                  temp.splice(indi,1);
                }
                j = $scope.channelMembers.length;

              }
            }

      	  }
      	  $scope.membersSettingschannel = temp;
          $scope.option = option;
          $scope.searchinputplaceholder = "Search user to add and click on it ...";
          console.log("esto vale memberssettingschannels con ADD");
          console.log($scope.membersSettingschannel);
      } else {
          $scope.membersSettingschannel = $scope.channelMembers;
          console.log("**********************");
          console.log("**********************");
          console.log($scope.channelMembers);
          console.log($scope.membersSettingschannel);
          $scope.option = option;
          if(option == 2){
            $scope.searchinputplaceholder = "Search member to remove and click on it ...";
          } else {
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
                for (var k = 0; k < data.length; k++ ) {
                  //temp[i].color = getRandomColor();
                  temp[k].hash = $scope.getHash(temp[k].mail);
                  temp[k].isinvited = 0;
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
            },function (err) {
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

      $scope.getGroupNotificationList= function (group) {
        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == group.id){
            $scope.groupNotifications = $scope.groups[i].groupNotifications;
          }
        }
      };

      $scope.getPrivateChannelNotificationList= function (channel) {
        for (var i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == channel.id){
            $scope.privateChannelNotifications = $scope.privateChannels[i].channelNotifications;
          }
        }
      };

      $scope.getPublicChannelNotificationList= function (channel) {
        for (var i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == channel.id){
            $scope.publicChannelNotifications = $scope.publicChannels[i].channelNotifications;
          }
        }
      };

      $scope.selectGroup= function (group, ind) {
        $scope.classResalt= "textitalic";
        var groupidAntiguo = $scope.groupid;
        $scope.groupid=group.id;
        $scope.groupindex = ind;
        $scope.option="";

        $scope.getChannels(group);
        $scope.getGroupMembers(group);




        $scope.tagGroup=group;
        $scope.channelSelected = false;
        // Emitimos evento de desconexión a canales
        Socket.emit('disconnectChannel', { 'channelid': $scope.tagChannel.id, 'userid': $localStorage.id } );
        $scope.tagChannel='';
        //restar notificaciones generales de grupo
        for (var i=0;i<$scope.groupsNotifications.length;i++){
          if ($scope.groupsNotifications[i].groupid == group.id){
            $scope.groupsNotifications.splice(i,1);
          }
          $scope.groupsNotificationsCount = $scope.groupsNotificationsCount - 1;
        }
        $scope.channelsNotifications = [];
        $scope.channelsNotificationsCount = 0;
        $scope.directChannelsNotifications = [];
        $scope.directChannelsNotificationsCount = 0;
        for (var j=0;j<$scope.groups.length;j++){
          if ($scope.groups[j].id == group.id){
            for (var k=0;k<$scope.groups[j].groupNotifications.length;k++){
              if ($scope.groups[j].groupNotifications[k].groupid == group.id && $scope.groups[j].groupNotifications[k].channelid!=''){
                if ($scope.groups[j].groupNotifications[k].channelType == "DIRECT"){
                  $scope.directChannelsNotifications.push($scope.groups[j].groupNotifications[k]);
                  $scope.directChannelsNotificationsCount = $scope.directChannelsNotificationsCount + 1;
                }
                if ($scope.groups[j].groupNotifications[k].channelType == "PUBLIC" || $scope.groups[j].groupNotifications[k].channelType == "PRIVATE" ){
                  $scope.channelsNotifications.push($scope.groups[j].groupNotifications[k]);
                  $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
                }

              }
            }
            $scope.groups[j].groupNotifications = [];
            $scope.groups[j].groupNotificationsCount = 0;
          }
        }
        Socket.emit('selectGroup', { 'groupid': group.id, 'userid': $localStorage.id } );
      };

      $scope.selectUser= function (user) {
        $scope.selectedUser=user.id;
      };

      $scope.selectUser= function (user) {
        $scope.selectedUser=user.id;
      };

      $scope.selectChannel = function (channel, type) {
        if(type == "public"){
          $scope.classResaltChannelPublic = "textitalic";
          $scope.classResaltChannelPrivate = "textnormal";
          $scope.classResaltDirect = "textnormal";
          console.log("entro en public");

        }
        else if (type == "private"){

          $scope.classResaltChannelPublic = "textnormal";
          $scope.classResaltChannelPrivate = "textitalic";
          $scope.classResaltDirect = "textnormal";
          console.log("entro en private");

        }
        else {
          $scope.classResaltChannelPublic= "textnormal";
          $scope.classResaltChannelPrivate = "textnormal";
          $scope.classResaltDirect = "textitalic";
        }

        var channelidAntiguo = $scope.channelid;
        $scope.channelid=channel.id;
        $scope.tagChannel=channel;
        $scope.tagChannel.type = type;
        console.log($scope.tagChannel.type);
        /* si selecciona un canal por defecto le salga la conversacion, no los settings*/
        $scope.activeChannelSettings = 0;
        $scope.channelSelected = true;
        $scope.getChannelMembers();
        $scope.getMessages(channel);

        // Emitimos evento de selecion de canal para recibir nuevos mensajes
        Socket.emit('disconnectChannel', { 'channelid': channelidAntiguo, 'userid': $localStorage.id } );
        Socket.emit('selectChannel', { 'channelid': channel.id , 'userid': $localStorage.id} );

        // Actualizamos notificaciones
        //$scope.updateNotifications($scope.tagGroup.id, channel.id, type.toUpperCase());

        for (var i=0;i<$scope.channelsNotifications.length;i++){
          if ($scope.channelsNotifications[i].channelid == channel.id){
            $scope.channelsNotifications.splice(i,1);
          }
          $scope.channelsNotificationsCount = $scope.channelsNotificationsCount - 1;
        }

        for (var m=0;m<$scope.groupsNotifications.length;m++){
          if ($scope.groupsNotifications[m].channelid == channel.id){
            $scope.groupsNotifications.splice(m,1);
          }
          $scope.groupsNotificationsCount = $scope.groupsNotificationsCount - 1;
        }

        for (var j=0;j<$scope.privateChannels.length;j++){
          if ($scope.privateChannels[j].id == channel.id){
            $scope.privateChannels[j].channelNotifications = [];
            $scope.privateChannels[j].channelNotificationsCount = 0;
          }
        }
        for (var k=0;k<$scope.publicChannels.length;k++){
          if ($scope.publicChannels[k].id == channel.id){
            $scope.publicChannels[k].channelNotifications = [];
            $scope.publicChannels[k].channelNotificationsCount = 0;
          }
        }

      };

      // Actualizamos notificaciones para el canal, y para el grupo correspondiente
     /* $scope.updateNotifications = function (groupid, channelid, channelType) {
        var num;
        if (!$scope.notifications)
          return;

        // Comprobamos si notificaciones del canal
        if ($scope.notifications.group &&
            $scope.notifications.group[groupid] &&
            $scope.notifications.group[groupid].channel[channelType] &&
            $scope.notifications.group[groupid].channel[channelType][channelid]) {

          num = $scope.notifications.group[groupid].channel[channelType][channelid];

          // Actualizamos notificacioens de canales
          $scope.notifications.group[groupid].channel[channelType][channelid] = 0;
          $scope.notifications.group[groupid].channel[channelType].total -= num;
          if (channelType != 'DIRECT')
            $scope.notifications.group[groupid].channel.total -= num;

          // Actualizamos notificacioens de grupo
          $scope.notifications.group[groupid].total -= num;
          $scope.notifications.group.total -= num;
        }
      };*/


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

      $scope.getDirectChannelId = function (member) {
        var channel = ChannelService.searchDirectChannel($localStorage.id, member, $scope.directChannels);
        if (channel != null) {
          return channel.id;
        }
        else {
          return 0;
        }
      };

    $scope.searchDirectChannel = function (member) {

      var userid = $localStorage.id;
      var groupid = $scope.groupid;
      var directChannels = $scope.directChannels;

      /*$scope.classResaltDirect = "textitalic";*/
      $scope.tagMember = member;

      var channel = ChannelService.searchDirectChannel(userid, member, directChannels);
      if (channel != null) {
        $scope.selectChannel (channel, 'DIRECT');
      }
      else {
        ChannelService.createDirectChannel(userid, $scope.username, member, groupid)
          .then ( function (channel) {
            $scope.directChannels.push({
              id: channel.id,
              channelName: channel.channelName,
              users: [channel.users[0].id, channel.users[1].id ]
            });
            $scope.selectChannel (channel, 'DIRECT');
        },
        function (err) {
          // Tratar el error
          console.log("Error al crear el canal para mensajes directos");
          console.log(err.message);
          $scope.error = err.message;
        })
      }



    };

    $scope.isInternalMessage = function ($index) {
      if ($scope.listaMensajes[$index].text.indexOf('internalMessage#') == 0) {
        return true;
      }
      return false;
    };

    $scope.getInternalMessage = function ($index) {
      var internalMessage = $scope.listaMensajes[$index].text;
      var re = /internalMessage#(\w+)\./i;
      var matchArr, answerData;
      var messageType, messageText = "";

      var matchArr = internalMessage.match(re);
      if (matchArr) (matchArr.length > 1) ? messageType=matchArr[1] : messageType="";

      if (messageType == 'NEW_ANSWER') {
        answerData = getAnswerData(internalMessage);
        messageText = "<strong>"+answerData.answerUser + "</strong> add new answer for <a class=\"question-link\" ng-click=\"gotoAnchor('" + answerData.questionId + "')\">"+answerData.questionTitle+"</a>";
      }

      return messageText;

    };

      // Get answer data for a NEW_ANSWER internal message
      function getAnswerData (internalMessage) {
        var re, matchArr;
        var answerData = {};

        re = /QuestionId: \'(\w+)\'/i;
        matchArr = internalMessage.match(re);
        if (matchArr) answerData.questionId=matchArr[1];

        re = /AnswerId: \'(\w+)\'/i;
        matchArr = internalMessage.match(re);
        if (matchArr) answerData.answerId=matchArr[1];

        for (var i = 0; i < $scope.listaMensajes.length; i++) {
          if ($scope.listaMensajes[i].id == answerData.questionId) {
            answerData.questionTitle = $scope.listaMensajes[i].title;
            for (var j=0; j < $scope.listaMensajes[i].answers.length; j++) {
              if ($scope.listaMensajes[i].answers[j].id == answerData.answerId) {
                answerData.answerUser = $scope.listaMensajes[i].answers[j].user.username;
                break;
              }
            }
            break;
          }
        }

        return answerData;

      }

      $scope.gotoAnchor = function (anchor) {
        $anchorScroll(anchor);
      }

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

      $scope.shareInForum = function (index) {

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/publishMessageModal.html',
          controller: 'publishMessageModalCtrl',
          resolve: {
            data: function () {
              return {
                groupid: $scope.groupid,
                channelid: $scope.channelid,
                message: $scope.listaMensajes[index]
              }
            }
          }
        });

        // Al cerra la modal marcamos el mensaje como publicado
        modalInstance.result.then(function () {
          $scope.listaMensajes[index].publish = true;
        });


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


    ProfileService
      .getGroups()
      .then(function (data) {
        $scope.groups = data;
        for (var i=0;i<$scope.groups.length;i++){
          $scope.groups[i].groupNotifications = [];
          $scope.groups[i].groupNotificationsCount = 0;
        }

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

		$scope.user.hash = $scope.getHash($scope.user.mail);
	    //console.log("esto vale user");
	    //console.log( $scope.user );
      }
      , function (err) {
        // Tratar el error
        console.log("Hay error");
        console.log(err.message);
        $scope.errorG = err.message;
        $("#errorGroupModal").modal("show");

      });


     Socket.on('newMessage', function (data) {

     console.log("newMessage from server: " + data.groupid + ', ' + data.message.id);
     console.log(data.message.channel);

     // Si es el canal actual, añadimos mensaje a la listaMensaje
     if (data.message.channel.id == $scope.tagChannel.id) {
     $scope.listaMensajes.push(data.message);
     }

       /*
        // Incrementamos las notificaciones
        else {
        if (!$scope.notifications) {
        $scope.notifications = {};
        $scope.notifications.group = { total: 0 };
        }
        // Para el grupo
        if (!$scope.notifications.group[data.groupid]) {
        $scope.notifications.group[data.groupid]={total: 0};
        }
        $scope.notifications.group[data.groupid].total++;
        $scope.notifications.group.total++;

        // Para los canales canal
        var channelType = data.message.channel.channelType.toUpperCase();
        var channelid = data.message.channel.id;

        if (!$scope.notifications.group[data.groupid].channel) {
        $scope.notifications.group[data.groupid].channel={total: 0};
        }
        if (!$scope.notifications.group[data.groupid].channel[channelType]) {
        $scope.notifications.group[data.groupid].channel[channelType]={total: 0};
        }
        if (!$scope.notifications.group[data.groupid].channel[channelType][channelid]) {
        $scope.notifications.group[data.groupid].channel[channelType][channelid]=0;
        }
        $scope.notifications.group[data.groupid].channel[channelType][channelid]++;
        $scope.notifications.group[data.groupid].channel[channelType].total++;
        if (channelType != 'DIRECT') {
        $scope.notifications.group[data.groupid].channel.total++;
        }

        }

        */

     $scope.$apply();
     });



     /* Socket.on('newMessage', function (data) {
        $scope.listaMensajes.push(data);
        $scope.$apply();
      });*/

    Socket.on('newQuestionAnswer', function (data) {
      var message = data;
      for (var i=0; i < $scope.listaMensajes.length; i++) {
        if ($scope.listaMensajes[i].id == message.id) {
          $scope.listaMensajes[i].answers.push(message.answer);
          break;
        }
      }
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
        data.groupNotifications = [];
        data.groupNotificationsCount = 0;
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

        data.user.hash = $scope.getHash(data.user.mail);
        //data.user.color = getRandomColor();
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
        data.channelNotifications = [];
        data.channelNotificationsCount = 0;
        $scope.publicChannels.push(data);
        $scope.$apply();
      });

      //recibir evento de nuevo canal privado en grupo
      Socket.on('newPrivateChannel', function (data) {
        if($scope.tagGroup.id == data.group.groupId){
          console.log ("newPrivateChannel received from server");
          console.log(data);
          data.channelNotifications = [];
          data.channelNotificationsCount = 0;
          $scope.privateChannels.push(data);
          $scope.$apply();
        } //ELSE --> no tiene el grupo elegido pero q le notifique en ventana q tiene un evento nuevo

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
        		//data.user.color = getRandomColor();
        		data.user.hash = $scope.getHash(data.user.mail);
        		$scope.membersSettings.push(data.user);

        	}

        }


        $scope.$apply();

      });




      //recibir evento de nuevo usuario en canal
      Socket.on('newMemberInChannel', function (data) {
        console.log ("newMemberInChannel received from server");
        console.log(data);

        /* se supone que estoy dentro del canal */
        /* si soy el administrador no hago nada
        	sino, si esta en settings con la opcion 0
        	hay que actualizar los miembros y los miembros de settings que son los mismos*/
        if ($scope.adminChannel.id !== $scope.userid){

	    	if ($scope.tagChannel.id == data.channelid ){
	        	data.user.hash = $scope.getHash(data.user.mail);
	        	$scope.channelMembers.push(data.user);
	        	$scope.tagChannel.users.push(data.user);

        	}


	    }

        console.log("esto vale tagchannel");
        console.log($scope.tagChannel);
        $scope.$apply();
      });

      //recibir evento de usuario eliminado de canal
      Socket.on('deletedUserFromChannel', function (data) {
        console.log ("deletedUserFromChannel received from server");
        console.log(data);



        if (data.user.id == $localStorage.id){
        	if($scope.tagChannel.id == data.channelid){
        		$scope.tagChannel = ''
        	}

        	for (var i = 0; i < $scope.privateChannels.length; i++){
	            if ($scope.privateChannels[i].id == data.channelid){
	              $scope.privateChannels.splice(i,1);

	          }
	        }
        	$scope.privateChannels.splice(i,1);
        }

        else {
        	if($scope.tagChannel.id == data.channelid){

        		for (var i = 0; i < $scope.channelMembers.length; i++){
	            	if ($scope.channelMembers[i].id == data.user.id){
	              		$scope.channelMembers.splice(i,1);
	              	}

	          	}

		        for (var i = 0; i < $scope.tagChannel.users.length; i++){
		            if ($scope.tagChannel.users[i].id == data.user.id){
		              $scope.tagChannel.users.splice(i,1);

		          }
		        }

		        /* si es el administrador, cambiarle los membersettings */
		        if ($scope.adminChannel.id == $scope.userid){
		        	/* añadimos al usuario borrado del canal en membersettingschannel (usuarios de grupo) */
		        	if($scope.optionchannel == 1) {

		        		data.user.hash = $scope.getHash(data.user.mail);
		        		$scope.membersSettingschannel.push(data.user);

		        	}

		        }
        	}


        }

        $scope.$apply();

      });




/*********************/
      //recibir evento de nombre de canal publico editado
      Socket.on('editedPublicChannel', function (data) {
        console.log ("editedPublicChannel received from server");
        console.log(data);
        for (var i = 0; i< $scope.publicChannels.length; i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels[i].channelName = data.channelName;
            $scope.$apply();
            i = $scope.publicChannels.length;
          }
        }

      });

      //recibir evento de nombre de canal privado editado
      Socket.on('editedPrivateChannel', function (data) {
        console.log ("editedPrivateChannel received from server");
        console.log(data);
        for (var i = 0; i < $scope.privateChannels.length; i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels[i].channelName = data.channelName;
            $scope.$apply();
            i = $scope.publicChannels.length;
          }
        }
      });

/**/
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

      //Eventos de grupos listados y no conectado
      Socket.on('newGroupEvent', function (data) {
        console.log ("newGroupEvent received from server");
        $scope.groupsNotificationsCount ++;
        $scope.groupsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.groupName + ': New group '});
        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.groupid){
            $scope.groups[i].groupNotificationsCount = $scope.groups[i].groupNotificationsCount +1;
            $scope.groups[i].groupNotifications.push({groupid: data.groupid, channelid: data.channelid, message:'New group'});
          }
        }
        $scope.$apply();
      });


      Socket.on('editedGroupEvent', function (data) {
        console.log ("editedGroupEvent received from server");
        if ($scope.tagGroup.id!=data.groupid){
          $scope.groupsNotificationsCount ++;
          $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': Edited group '});
          for (var i=0;i<$scope.groups.length;i++){
            if ($scope.groups[i].id == data.groupid){
              $scope.groups[i].groupNotificationsCount = $scope.groups[i].groupNotificationsCount + 1;
              $scope.groups[i].groupNotifications.push({groupid: data.groupid, channelid:data.channelid, message:'Edited group'});
            }
          }
          $scope.$apply();
        }
      });

      Socket.on('deletedMemberInGroupEvent', function (data) {
        console.log ("deletedMemberInGroupEvent received from server");
        if ($scope.tagGroup.id!=data.groupid){
          $scope.groupsNotificationsCount = $scope.groupsNotificationsCount + 1;
          $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': Deleted user: ' + data.username });
          //añadimos notificacion al grupo en si
          for (var i=0;i<$scope.groups.length;i++){
            if ($scope.groups[i].id == data.groupid){
              $scope.groups[i].groupNotificationsCount = $scope.groups[i].groupNotificationsCount + 1;
              $scope.groups[i].groupNotifications.push({groupid: data.groupid, channelid:data.channelid, message:'Deleted user: ' + data.username });
            }
          }

          $scope.$apply();
        }
      });

      Socket.on('newMemberInGroupEvent', function (data) {
        console.log ("newMemberInGroupEvent received from server");
        console.log("$scope.tagGroup.id: " + $scope.tagGroup.id);
        console.log("data.groupid: " + data.groupid);
        if ($scope.tagGroup.id!=data.groupid){
          $scope.groupsNotificationsCount = $scope.groupsNotificationsCount + 1;
          $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': New user: ' + data.username });
          //añadimos notificacion al grupo en si
          for (var i=0;i<$scope.groups.length;i++){
            if ($scope.groups[i].id == data.groupid){
              $scope.groups[i].groupNotificationsCount = $scope.groups[i].groupNotificationsCount + 1;
              $scope.groups[i].groupNotifications.push({groupid: data.groupid, channelid:data.channelid, message:'New user: ' + data.username });
            }
          }
          $scope.$apply();
        }
      });

      Socket.on('newChannelEvent', function (data) {
        console.log ("newChannelEvent received from server: " + data);
        if (data.groupid == $scope.tagGroup.id){
          if (data.channelType == "PUBLIC" || data.channelType == "PRIVATE"){
            $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
            $scope.channelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New Channel: ' + data.channelName});
          }
        }

        $scope.groupsNotificationsCount ++;
        $scope.groupsNotifications.push({groupid: data.groupid,channelid:data.channelid, message:data.groupName + ': New Channel: ' + data.channelName});
        for (var k=0;k<$scope.groups.length;k++){
          if ($scope.groups[k].id == data.groupid){
            $scope.groups[k].groupNotificationsCount = $scope.groups[k].groupNotificationsCount + 1;
            $scope.groups[k].groupNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New Channel: ' + data.channelName});
          }
        }

        if (data.channelType == "PUBLIC"){
          for (var i=0;i<$scope.publicChannels.length;i++){
            if ($scope.publicChannels[i].id == data.channelid){
              $scope.publicChannels[i].channelNotificationsCount = $scope.publicChannels[i].channelNotificationsCount;
              $scope.publicChannels[i].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName+ ': New Channel'});
            }
          }
        }
        if (data.channelType == "PRIVATE"){
          for (var j=0;j<$scope.privateChannels.length;j++){
            if ($scope.privateChannels[j].id == data.channelid){
              $scope.privateChannels[j].channelNotificationsCount = $scope.publicChannels[j].channelNotificationsCount;
              $scope.privateChannels[j].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName+ ': New Channel'});
            }
          }
        }

        $scope.$apply();
      });

      Socket.on('deletedChannelEvent', function (data) {
        console.log ("deletedChannelEvent received from server: " + data);

      });

      Socket.on('editedChannelEvent', function (data) {
        console.log ("editedChannelEvent received from server: " + data);
        if (data.groupid == $scope.tagGroup.id){
          if (data.channelType == "PUBLIC" || data.channelType == "PRIVATE"){
            $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
            $scope.channelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': Channel edited'});
          }
        }
        $scope.groupsNotificationsCount ++;
        $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': ' + data.channelName +  ': Channel Edited'});
        for (var k=0;k<$scope.groups.length;k++){
          if ($scope.groups[k].id == data.groupid){
            $scope.groups[k].groupNotificationsCount = $scope.groups[k].groupNotificationsCount + 1;
            $scope.groups[k].groupNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': Channel edited'});
          }
        }
        if (data.channelType == "PUBLIC"){
          for (var i=0;i<$scope.publicChannels.length;i++){
            if ($scope.publicChannels[i].id == data.channelid){
              $scope.publicChannels[i].channelNotificationsCount = $scope.publicChannels[i].channelNotificationsCount + 1;
              $scope.publicChannels[i].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'Channel edited'});
            }
          }
        }
        if (data.channelType == "PRIVATE"){
          for (var j=0;j<$scope.privateChannels.length;j++){
            if ($scope.privateChannels[j].id == data.channelid){
              $scope.privateChannels[j].channelNotificationsCount = $scope.publicChannels[j].channelNotificationsCount +1;
              $scope.privateChannels[j].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'Channel edited'});
            }
          }
        }
        $scope.$apply();
      });

      Socket.on('newMessageEvent', function (data) {
        console.log ("newMessageEvent received from server: " );
        if (data.channelid != $scope.tagChannel.id){
          if (data.groupid == $scope.tagGroup.id){
            if (data.channelType == "PUBLIC" || data.channelType == "PRIVATE"){
              $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
              $scope.channelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': New Message'});
            }
            if (data.channelType == "DIRECT"){
              $scope.directChannelsNotificationsCount = $scope.directChannelsNotificationsCount + 1;
              $scope.directChannelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': New Message'});
            }
          }
          $scope.groupsNotificationsCount ++;
          $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': ' + data.channelName + ': New Message'});
          for (var k=0;k<$scope.groups.length;k++){
            if ($scope.groups[k].id == data.groupid){
              $scope.groups[k].groupNotificationsCount = $scope.groups[k].groupNotificationsCount + 1;
              $scope.groups[k].groupNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': New Message'});
            }
          }
          if (data.channelType == "PUBLIC"){
            for (var i=0;i<$scope.publicChannels.length;i++){
              if ($scope.publicChannels[i].id == data.channelid){
                $scope.publicChannels[i].channelNotificationsCount = $scope.publicChannels[i].channelNotificationsCount + 1;
                $scope.publicChannels[i].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New Message'});
              }
            }
          }
          if (data.channelType == "PRIVATE"){
            for (var j=0;j<$scope.privateChannels.length;j++){
              if ($scope.privateChannels[j].id == data.channelid){
                $scope.privateChannels[j].channelNotificationsCount = $scope.privateChannels[j].channelNotificationsCount + 1;
                $scope.privateChannels[j].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New Message'});
              }
            }
          }
          $scope.$apply();
        }
      });

      Socket.on('newMemberInChannelEvent', function (data) {
        console.log ("newMemberInChannelEvent received from server");
        $scope.channelsNotificationsCount ++;
        if (data.groupid == $scope.tagGroup.id){
          if (data.channelType == "PUBLIC" || data.channelType == "PRIVATE"){
            $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
            $scope.channelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': New Member: ' + data.username});
          }
        }
        $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': ' +  data.channelName + ': New member: ' + data.username});
        for (var k=0;k<$scope.groups.length;k++){
          if ($scope.groups[k].id == data.groupid){
            $scope.groups[k].groupNotificationsCount = $scope.groups[k].groupNotificationsCount +1;
            $scope.groups[k].groupNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': New member: ' + data.username});
          }
        }
        if (data.channelType == "PUBLIC"){
          for (var i=0;i<$scope.publicChannels.length;i++){
            if ($scope.publicChannels[i].id == data.channelid){
              $scope.publicChannels[i].channelNotificationsCount = $scope.publicChannels[i].channelNotificationsCount + 1;
              $scope.publicChannels[i].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New member: ' + data.username});
            }
          }
        }
        if (data.channelType == "PRIVATE"){
          for (var j=0;j<$scope.privateChannels.length;j++){
            if ($scope.privateChannels[j].id == data.channelid){
              $scope.privateChannels[j].channelNotificationsCount = $scope.publicChannels[j].channelNotificationsCount + 1;
              $scope.privateChannels[j].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'New member: ' + data.username});
            }
          }
        }
        if (data.channelType == "DIRECT"){
          //$scope.directMessagesNotificationsCount ++;
          //$scope.directMessagesNotifications.push(data);
        }
        $scope.$apply();
      });

      Socket.on('deletedMemberInChannelEvent', function (data) {
        console.log ("deletedMemberInChannelEvent received from server");
        if (data.groupid == $scope.tagGroup.id){
          if (data.channelType == "PUBLIC" || data.channelType == "PRIVATE"){
            $scope.channelsNotificationsCount = $scope.channelsNotificationsCount + 1;
            $scope.channelsNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': Deleted Member: ' + data.username});
          }
        }
        $scope.groupsNotificationsCount ++;
        $scope.groupsNotifications.push({groupid: data.groupid, channelid:data.channelid, message:data.groupName + ': ' +  data.channelName + ': Deleted member: ' + data.username});
        for (var k=0;k<$scope.groups.length;k++){
          if ($scope.groups[k].id == data.groupid){
            $scope.groups[k].groupNotificationsCount = $scope.groups[k].groupNotificationsCount + 1;
            $scope.groups[k].groupNotifications.push({groupid: data.groupid,channelid: data.channelid, message:data.channelName + ': Deleted Member: ' + data.username});
          }
        }
        if (data.channelType == "PUBLIC"){
          for (var i=0;i<$scope.publicChannels.length;i++){
            if ($scope.publicChannels[i].id == data.channelid){
              $scope.publicChannels[i].channelNotificationsCount = $scope.publicChannels[i].channelNotificationsCount +1;
              $scope.publicChannels[i].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'Deleted member: ' + data.username});
            }
          }
        }
        if (data.channelType == "PRIVATE"){
          for (var j=0;j<$scope.privateChannels.length;j++){
            if ($scope.privateChannels[j].id == data.channelid){
              $scope.privateChannels[j].channelNotificationsCount  = $scope.privateChannels[j].channelNotificationsCount;
              $scope.privateChannels[j].channelNotifications.push({groupid: data.groupid,channelid: data.channelid, message:'Deleted member: ' + data.username});
            }
          }
        }
        if (data.channelType == "DIRECT"){
          //$scope.directMessagesNotificationsCount ++;
          //$scope.directMessagesNotifications.push(data);
        }
        $scope.$apply();
      });


    }]);
