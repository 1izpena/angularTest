'use strict';

angular.module('myAppAngularMinApp')
  .controller('Chat2Ctrl', ['$scope', '$window', '$uibModal','ProfileService', 'LoginService', '$location', '$localStorage', 'ChatService', 'Socket', 'GroupService', 'ChannelService', 'sharedProperties', '$log', '$sce', '$anchorScroll','md5', 'searchservice', 'GithubService', '$timeout', 'spinnerService',
    function ($scope, $window, $uibModal, ProfileService, LoginService, $location, $localStorage, ChatService, Socket, GroupService, ChannelService, sharedProperties, $log, $sce, $anchorScroll, md5, searchservice, GithubService, $timeout, spinnerService) {

      $scope.init = function()
      {
        // Emitimos evento de conexion a chat para recibir nuevas invitaciones a grupos
        console.log("ha entrado a crear socket newChatConnection");
        Socket.emit('newChatConnection', {'userid': $localStorage.id });
        $scope.groupsNotificationsCount=0;
        $scope.channelsNotificationsCount=0;
        $scope.directChannelsNotificationsCount=0;

        $scope.publicChannels = [];
        $scope.privateChannels = [];

        $scope.window_focus = true;


        /* para saber si esta activada la funcionalidad de
        integraction con github */

        $scope.githubchannel = {};
        $scope.githubchecked = false;
        $scope.githubaccounts = [];
        $scope.account = {};
        $scope.accountSelected = {};

        $scope.arrReposOk = [];
        $scope.arrReposError = [];






      };





      $window.onblur = function() {
        console.log('blur');
        $scope.window_focus = false;
      };
      $window.onfocus = function() {
        console.log('focus');
        $scope.window_focus = true;
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
      $scope.messageNewChannelNameModal = '';

      $scope.messageNewChannelBadCredentialsModal = '';


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

      console.log("ha llamado disconnect de grupo");
      Socket.emit('disconnect');
      console.log("ha llamado disconnect de channel");
      Socket.emit('disconnectChannel');


      LoginService.logout();


    };





      /* change vars of sidebar-nav menu */
    $scope.changeVarMenu = function(varmenu)
    {


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
              console.log("ha llamado disconnect de channel");
              Socket.emit('disconnectChannel');
              $scope.activeChannels = 0;
              $scope.activeDirects = 0;

            }


          }
          else {
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
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
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');

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
          console.log("ha llamado disconnect de grupo");
          Socket.emit('disconnect');
          console.log("ha llamado disconnect de channel");
          Socket.emit('disconnectChannel');
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
          console.log("ha llamado disconnect de channel");
          Socket.emit('disconnectChannel');
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
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
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
          $scope.class1 = "col-xs-7 col-sm-7 col-md-7 col-lg-8";
      }
      else {
          console.log("estoy en id cambiando a 0");
          $scope.navsearch = 0;
          $scope.class1 = "col-xs-12 col-sm-12 col-md-12 col-lg-12";
      }

    };


    $scope.putBlanktextsearchbox = function(textsearchbox)
    {

      $scope.textsearchbox = '';

    };



     $scope.searchtextinchannel = function (textsearchbox, channel) {
      console.log("esto vale searchboz");
      console.log(textsearchbox);

      if ( textsearchbox !== 'undefined' && textsearchbox !== '' ){
        searchservice.chatsearch(textsearchbox, $scope.tagGroup.id, $scope.tagChannel.id).then(function (res){
           if(res.error == undefined){
             var tempserachresults = res.slice();
             //$scope.searchresults = res.slice();
             for (var i = 0; i < tempserachresults.length; i++) {
               for ( var j = 0; j < $scope.channelMembers.length; j++){
                 if (tempserachresults[i].source._user == $scope.channelMembers[j].id){
                   tempserachresults[i].source._user =  $scope.channelMembers[j];

                 }
               }

             }
             $scope.searchresults = tempserachresults.slice();
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



      $scope.removeInputsAccount = function(){
        $("#githubPassTxt").val('').trigger('input');
        $("#githubUserTxt").val('').trigger('input');
      };


      /*********************** modales inicializar valores ********************************************/



      function removeErrorMessageNewChannelModal () {
        /* se reutiliza la primera para integration */
        $scope.messageNewChannelModal = '';
        $scope.messageNewChannelNameModal = '';

      };


      function removeErrorMessageNewChannelIntegrationModal () {
        /* se reutiliza la primera para integration */
        $scope.messageNewChannelModal = '';
        $scope.messageNewChannelBadCredentialsModal = '';

      };

      function removeErrorMessageNewChannelReposModal () {
        /* se reutiliza la primera para integration */
        $scope.messageNewChannelModal = '';

      };

      /******************* end message errors *****************************/


      function removeVarsNewChannelIntegrationModal () {

        removeErrorMessageNewChannelIntegrationModal();
        $scope.removeInputsAccount();
        $scope.account = {};
        $scope.accountSelected = {};


      };

      function removeVarsNewChannelReposModal () {

        removeErrorMessageNewChannelReposModal();
        $scope.githubrepositories = [];
        $scope.repositorySelected = [];




      };


      /******************* end vars init ********************************/


      $scope.initVarsNewChannelModal = function(){
        $scope.removeInputChannelName();
        $scope.githubchecked = false;
        $scope.githubaccounts = [];
        $scope.githubchannel = {};
        removeErrorMessageNewChannelModal();


      };

      $scope.initVarsNewChannelIntegrationModal = function(){
        /* las anteriores y estas */
        $scope.initVarsNewChannelModal();
        removeVarsNewChannelIntegrationModal();


      };


      $scope.initVarsNewChannelReposModal = function(){
        /* las anteriores (initVarsNewChannelIntegrationModal) y estas */
        $scope.initVarsNewChannelIntegrationModal();
        removeVarsNewChannelReposModal();


      };



      /************************** end  modales inicializar valores *****************************************/








    $scope.removeInput = function(){
      $("#groupNameTxt").val('').trigger('input');
    };


      $scope.createNewGroup = function(group){

        GroupService.createNewGroup(group).then(
          function(data) {
            $("#newGroupModal").modal("hide");
            $scope.removeInput();
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
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
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
            $scope.tagGroup='';
            // Emitimos evento de desconexión a canales
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
            $scope.tagChannel='';
          },function(err){
            // Tratar el error
            console.log("Error on delete group: " + err.data.message);
            console.log("Hay error");
            $scope.errorG = err.data.message;
            $("#deleteGroupModal").modal("hide");
            // Emitimos evento de desconexión al grupo
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
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
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
            // Emitimos evento de desconexión a canales
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
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





      /************ new ******************/




      $scope.setGithubCheckbox = function(githubchecked){

        if(githubchecked){
          githubchecked = false;


        }
        else{
          githubchecked = true;


        }

      }


      /******** new ***********/
/*
      $scope.createNewChannel = function () {

        //entra desde aqui para el arrastre de ficheros en la pantalla
        console.log("entro en create new channel");


        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/createChannelModal.html',
          controller: 'createChannelModalCtrl',
          scope: $scope,
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

      */
/********************** end new ******************/

/* podria cambiarlo para hacerlo mas facil en 1 controller aparte */


      /* vale con mandar el nombre de los repos
      * y el login */

      $scope.createwebhooks = function(){




        /* aqui tenemos los repositorios elegidos
         * campos no sean nulos
         * luego llamamos a createwebhooks con los repos, al servicio */
        console.log("esto vale repos para crear webhooks");

        /* tengo el objeto entero de los repositorios,
        * con el id en el canal sería suficiente */
        console.log($scope.repositorySelected);
        /* mirar el tipo */

        console.log("esto vale channel en create webhhoks");

        /* tengo el tipo channelType 'PUBLIC' y channelName */
        console.log($scope.githubchannel);



        /* podemos pasar el token directamente */
        console.log("esto vale account con token");

        /* token, username */
        console.log($scope.account);

        /* no se que tengo en este momento
        * usar token de bd o el actual?? yo tiraría del mismo */



        spinnerService.show('html5spinnerRepos');

        GithubService.createwebhooks($scope.account,
                                      $scope.repositorySelected,
                                      $scope.githubchannel,
                                      $scope.tagGroup.id).then(
          function(result) {

            console.log("esto vale result");
            console.log(result);

            spinnerService.hide('html5spinnerRepos');


            /* si ha ido bien, data no es null, arrReposOk y arrReposError existen
            * y alguno tiene lenght >0
            * cerrar ventana y abrir la otra
            * dentro de arrRepos hay item con nombre e id
            * y res con la respuesta:: code 201
            * o code 504 timeout */

            /* mirar vuelta
             *  */
            /* creo que tenemos arrOk y arrErr */
            /* lo suyo es cogerlos y mirar */

            /*

            $("#newChannelReposModal").modal("hide");
             $("#newChannelWebhooksModal").modal("show");
             */

            /* result.data.data es 1 objeto si */
            if(result.data !== null &&
               result.data !== undefined){

              if((result.data.arrReposOk !== null &&
                 result.data.arrReposOk !== undefined)||
                 (result.data.arrReposError !== null &&
                 result.data.arrReposError !== undefined)){
                /* entonces rellenamos tabla */
                $scope.arrReposOk = result.data.arrReposOk;
                $scope.arrReposError = result.data.arrReposError;

                /* chapamos esta ventana y metemos la otra */
                $("#newChannelReposModal").modal("hide");

                /* este solo tiene:
                 * messageNewChannelModal
                 * $scope.arrReposOk
                 * $scope.arrReposError
                 * */
                $("#newChannelWebhooksModal").modal("show");

                /* aqui podríamos llamar a crear canal con los resultados */

               /* ChannelService.createNewChannel($scope.tagGroup.id,
                                                $scope.githubchannel).then(
                  function(data) {

                    /* aqui depende lo que tarde hacemos lo del spinner o no *
                    console.log("se crea el nuevo canal");

                  },function(err){
                    // Tratar el error
                    console.log("Hay error al crear canal: " + err.data.message);

                    $scope.messageNewChannelModal = err.data.message;

                  }
                );

                */


              }



            }
            else{
              /* esto no debería pasar */
              $scope.messageNewChannelModal = "No repositories added to channel. Try again.";

            }




          },
          function(error) {
            // TODO: mostrar error
            console.log("error createhooks");
            console.log(error);

            spinnerService.hide('html5spinnerRepos');
            $scope.messageNewChannelModal = error.data.message;

          }
        );


      };






      $scope.chooseaccount = function(){

        /* aqui tenemos lo que ha elegido, parsear que si es
        * Other la opcion, los campos no sean nulos
        * luego llamamos a get repos, al servicio */


        spinnerService.show('html5spinnerIntegration');


        removeErrorMessageNewChannelIntegrationModal();


        console.log("esto vale account");
        console.log($scope.accountSelected);
        /* mirar el tipo */

        console.log("esto vale channel en choose account");
        console.log($scope.githubchannel);

        if($scope.accountSelected.username == 'Other'){
          /* coger la pass y el username */
          /* username y password */
          console.log("esto vale account con scope");
          console.log($scope.account);
          /* mirar que no son vacios */

          if($scope.account.username == null || $scope.account.username == '' || $scope.account.username == undefined){

            /* meter mensaje de error xel nombre */
            $scope.messageNewChannelBadCredentialsModal = "Field username is required.";

          }
          else if($scope.account.password == null || $scope.account.password == '' || $scope.account.username == password){
            /* meter mensaje de error x el pass */
            $scope.messageNewChannelBadCredentialsModal = "Field password is required.";
          }
          /*
          else{
            spinnerService.show('html5spinnerIntegration');
          }*/





        }
        else{
          $scope.account.username = $scope.accountSelected.username;
          $scope.account.password = null;


        }




        GithubService.getAuth($scope.account.username, $scope.account.password).then(
          function(result) {

            console.log("esto vale result");
            console.log(result);
            /* luego mirar con jon que creo que son vacios */
            /* data.arrRepos[0].id
             data.arrRepos[0].name
             + githubtoken.username: como estas registrado
             *  */

            spinnerService.hide('html5spinnerIntegration');


            $scope.githubrepositories = result.data.arrRepos;
            $scope.account = result.data.githubtoken;

            if($scope.githubrepositories.length == 0){
              $scope.messageNewChannelModal = "There are not repositories to add to the channel which you are owner";

            }

            /*
            if($scope.accountSelected.username == 'Other'){
              spinnerService.hide('html5spinnerIntegration');

            }*/



            $("#newChannelIntegrationModal").modal("hide");
            $("#newChannelReposModal").modal("show");


          },
          function(error) {
            // TODO: mostrar error
            console.log("error getAuth");
            console.log(error);

            spinnerService.hide('html5spinnerIntegration');

            /*
            if($scope.accountSelected.username == 'Other'){
              spinnerService.hide('html5spinnerIntegration');

            }
            */

            $scope.messageNewChannelModal = error.data.message;

          }
        );

      };



      /*******************************/



      /* cuando vuelves hacia atras desde elegir los repos */
      function getGithubAccountsBack () {






        console.log("esto vale githubchannel en getgithubaccountback");
        console.log($scope.githubchannel);


        removeVarsNewChannelReposModal();


        spinnerService.show('html5spinnerRepos');


        GithubService.getGithubAccounts().then(
          function(data) {


            console.log("hay datos");
            console.log(data);

            // si es nullhay que inicializar el array
            // sino metemos data.data
            // y mirar si hace falta meter other u otra modal
            $scope.githubaccounts = [];

            if(data.data !== null ){
              $scope.githubaccounts = data.data;

            }

            $scope.githubaccounts.push({username:"Other"});
            $scope.accountSelected = $scope.githubaccounts[0];


            spinnerService.hide('html5spinnerRepos');


            $("#newChannelReposModal").modal("hide");
            $("#newChannelIntegrationModal").modal("show");





          },function(err){
            // Tratar el error
            console.log("hay error");
            console.log(err);
            console.log("Hay error al crear canal: " + err.data.message);


            spinnerService.hide('html5spinnerRepos');
            $scope.messageNewChannelModal = err.data.message;

          }
        );

      };







      /*******************************/

      function getGithubAccounts () {


        spinnerService.show('html5spinner');

        console.log("esto vale githubchannel en getgithub accounts");
        console.log($scope.githubchannel);

        removeErrorMessageNewChannelModal();

        GithubService.getGithubAccounts().then(
          function(data) {

            //$scope.githubchecked = false;


            // data puede ser null
            console.log("hay datos");
            console.log(data);


            $scope.githubaccounts = [];

            if(data.data !== null ){
              $scope.githubaccounts = data.data;

            }

            $scope.githubaccounts.push({username:"Other"});
            $scope.accountSelected = $scope.githubaccounts[0];

            /* cerramos esta modal y creamos otra */
            /* data es null o 1 array de github tokens */


            spinnerService.hide('html5spinner');

            $("#newChannelModal").modal("hide");
            $("#newChannelIntegrationModal").modal("show");



          },function(err){
            // Tratar el error
            console.log("hay error");
            console.log(err);
            console.log("Hay error al crear canal: " + err.data.message);


            spinnerService.hide('html5spinner');
            $scope.messageNewChannelModal = err.data.message;

          }
        );

      }





      $scope.createNewChannelAccountBack = function(){



        /* aqui hay que recoger de nuevo las accounts si es other lo elegido */
        /* inicializamos githubrepositories, repositorySelected y messageNewChannel modal */

        removeVarsNewChannelReposModal();

        /* si la opción es other que coja las cuentas de nuevo */
        if($scope.accountSelected !== null && $scope.accountSelected !== undefined && $scope.accountSelected !== '' ){
          if($scope.accountSelected.username == "Other"){
            getGithubAccountsBack();

          }
          else{
            $("#newChannelReposModal").modal("hide");
            $("#newChannelIntegrationModal").modal("show");

          }
        }
        else{
          getGithubAccountsBack();

        }






      };


      /**


      $scope.createNewChannelGithubService = function(){

        /* hacemos el canal mandando el id de los repos *


        ChannelService.createNewChannelGithubService($scope.groupid,channel).then(
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

      */





      $scope.createNewChannelBack = function(){


        /* quitar lo de esta */
        removeVarsNewChannelIntegrationModal();

        $("#newChannelIntegrationModal").modal("hide");
        $("#newChannelModal").modal("show");



      };


      $scope.createNewChannel = function(channel){







        /* hay que mirar en el api si existe algun canal con ese nombre */
        /*hay que mirar si es null cuando regresamos */
        if(channel.channelName == '' || channel.channelName == null || channel.channelName == undefined){

          removeErrorMessageNewChannelModal();
          $scope.messageNewChannelNameModal = "Channel Name is required."


        }
        else {
          /******************************************************************/

          var enc = false;

          /* miramos si ya coincide con alguno de los que tenemos */
          if (channel.channelType == 'PRIVATE') {
            /* recorremos el array de canales privados del grupo */
            for (var i = 0; i < $scope.privateChannels.length; i++) {
              if ($scope.privateChannels[i].channelName == channel.channelName) {
                enc = true;
                i = $scope.privateChannels.length;

              }

            }


          }
          else {
            /* recorremos el array de canales publicos del grupo */
            for (var i = 0; i < $scope.publicChannels.length; i++) {
              if ($scope.publicChannels[i].channelName == channel.channelName) {
                enc = true;
                i = $scope.publicChannels.length;

              }


            }


          }
          /* si lo ha encontrado error */
          if (enc) {


            removeErrorMessageNewChannelModal();

            $scope.messageNewChannelNameModal = "Already exists channel with that name.";

          }
          /* sino buscamos accounts si github checked marcado, sino creamos el canal */
          else {

            if($scope.githubchecked) {
              $scope.githubchannel = channel;
              console.log("esto vale github channel en createnewchannel");
              console.log($scope.githubchannel);

              /* y podriamos coger los repos */

              getGithubAccounts();


            }

            else{
                console.log("entra sin github");

                /* esto se quedaría asi
                 * pero hay que comprobar que el campo de nombre
                 * no es vacio */
                /*
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
                 );*/


              }



          }



        }/* nombre no es vacio */

      };




      /*************************************************************/




      $scope.deleteChannel = function(){
        ChannelService.deleteChannel($scope.tagGroup.id,$scope.tagChannel.id).then(
          function(data) {
            console.log("Delete channel OK");
            $("#deleteChannelModal").modal("hide");
            // Emitimos evento de desconexión a canales
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
            $scope.tagChannel='';

          },function(err){
            // Tratar el error
            console.log("Hay error en delete channel: " + err.data.message);


            $scope.errorG = err.data.message;
            $("#deleteChannelModal").modal("hide");
            // Emitimos evento de desconexión al grupo
            console.log("ha llamado disconnect de grupo");
            Socket.emit('disconnect');
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
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
            $scope.tagChannel='';
            $scope.channelSelected = false;

          },function(err){
            // Tratar el error
            console.log("Hay error en unsuscribe from channel: " + err.data.message);
            /*$scope.messageUnsuscribeFromChannelModal = err.data.message;*/
            /**/
            // Emitimos evento de desconexión a canales
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
            $scope.tagChannel='';
            $scope.errorG = err.data.message;
            $("#unsuscribeFromChannelModal").modal("hide");
            $("#errorGroupModal").modal("show");


          }
        );
      };


      /************* new ************/
      $scope.getChannelsForNotification = function (group) {
        ProfileService.getChannels(group.id)
          .then(function (data) {
            console.log("esto vale data en getChannelsForNotification");
            console.log(data);

            group.notificationsCount = 0;

            if(data.privateChannels !== undefined){
              group.privateChannels = data.privateChannels;

            }
            if(data.publicChannels !== undefined){
              group.publicChannels = data.publicChannels;

            }
            if(data.directChannels !== undefined){
              group.directChannels = data.directChannels;

            }



          },function (err) {
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.errorG = err.message;
            $("#errorGroupModal").modal("show");


          });
      };




      $scope.getChannels = function (group) {
        ProfileService.getChannels(group.id)
          .then(function (data) {

            $scope.privateChannels = data.privateChannels;
            $scope.publicChannels = data.publicChannels;

            $scope.directChannels = data.directMessageChannels;
            $scope.adminGroup = data.admin;


            updateAllNotificationsWithSelectGroup(group);


          },function (err) {
            // Tratar el error
            console.log("Hay error");
            console.log(err.message);
            $scope.errorG = err.message;
          	$("#errorGroupModal").modal("show");

          });
      };



    $scope.getChannelMembers = function () {

      ProfileService.getChannelMembers($scope.channelid)
        .then(function (data) {

          for (var i = 0; i < data.users.length; i++ ) {
          	data.users[i].hash = $scope.getHash(data.users[i].mail);

          }
          $scope.channelMembers = data.users;

          $scope.adminChannel = data.admin;
          $scope.membersSettingschannel = data.users;

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


      } else {
          $scope.membersSettingschannel = $scope.channelMembers;

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

          for(var i = 0; i < result.data.length; i++){
            if(result.data[i].messageType == 'URL'){
              result.data[i].visible = 0;
            }
          }
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

        //entra desde aqui para el arrastre de ficheros en la pantalla
        console.log("entro en confirmUploadFile");
        console.log($scope.file);

        if($scope.file == undefined || $scope.file ==''){
          console.log("no existe");

        }

        else{

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

        }


      };




      $scope.openFileModal = function () {
        console.log("entro en openFileModal");
        console.log($scope.file);

        var modalInstance = $uibModal.open({
          templateUrl: 'views/modals/openFileModal.html',
          controller: 'openFileModalCtrl',
          resolve: {
            data: function () {

               return {

               groupid: $scope.groupid,
               channelid: $scope.channelid

               }
            }
          }
        });

        modalInstance.result.then(function () {
            //$scope.file="";
          console.log("salgo por .then de la modal");
          },function () {
          //$scope.file="";

          }
        );
      };



      $scope.$watch('file', function () {

        /* esto es lo primero que hace */

        if($scope.file !== undefined && $scope.file !== null && $scope.file !== ''){

          if($scope.file.length){
            if($scope.file.length > 1){

              var temfilepath = $scope.file[0].path;
              var temfilepath2 = temfilepath.split('/');
              $scope.filepath = temfilepath2[0];

              $("#errorFileIsFolder").modal("show");


            }
            else{
              $scope.upload($scope.file);

            }
          }
          else{
            $scope.upload($scope.file);

          }



        }

      });




      $scope.log = '';
      $scope.upload = function (file) {


        if (file) {
            if (!file.$error) {


              $scope.filename = file.name;
              $scope.uploading = false;
              $scope.errors = false;
              $scope.confirmUploadFile();

            }
          }

      };





      $scope.changeVisible = function (msg,$index) {


        if($scope.listaMensajes[$index].visible == 0){

          $scope.getMetaTags(msg, $index);
          $scope.listaMensajes[$index].visible = 1;



        }
        else{
          $scope.listaMensajes[$index].visible = 0;

        }
        console.log($scope.listaMensajes[$index].visible );

      };




      $scope.getMetaTags = function (msg, $index) {
        var url = msg.text;

        //si ya lo tiene no hacemos la peticion al servidor, solo el htmlbind
        // de momento que no haga nada

        if ($scope.listaMensajes[$index].response_data_url === undefined) {


          var data = {
            userid: $localStorage.id,
            url: url
          };


          ChatService.getMetaTags(data).then(
            function (result) {


              if (result == null) {
                /* si la url no esta soportada */
                console.log("hay error al coger los metadatos");
                $scope.listaMensajes[$index].response_data_url = $sce.trustAsHtml("<h3> No information available </h3>");
              }
              else {
                /* sino tiene tipo es 1 link */
                if (typeof (result.type) == 'undefined') {
                  /* 1 link puede tener imagen o no */

                  var image = '';
                  var tittle = '';
                  var descrip = '';
                  var author_link = '';
                  var keywords = '';

                  if (typeof (result.title) !== 'undefined') {
                    tittle = "<h3>" + result.title + "</h3>";

                  }

                  if (typeof (result.description) !== 'undefined') {
                    descrip = "<p>" + result.description + "</p>";

                  }

                  if (typeof (result.author) !== 'undefined') {
                    author_link = "<p>From " + result.author + "</p>";

                  }

                  if (result.keywords.length > 0) {
                    for (var i = 0; i < result.keywords.length; i++) {
                      keywords = keywords + "<p><span class='label label-info'>" + result.keywords[i] + "</span></p>";

                    }

                  }


                  if (typeof (result.image) !== 'undefined') {
                    image = "<img src=" + result.image + ">";

                  }

                  $scope.listaMensajes[$index].response_data_url = $sce.trustAsHtml(tittle +
                    descrip +
                    author_link +
                    keywords +
                    image);


                }/* end if typeof (result.type) == 'undefined' */
                /* es 1 video, audio, etc. */
                else {
                  /* si es video = html
                   * si es foto url para src de img
                   * si es rich = html */

                  var author = '';
                  var html_img = '';
                  var title2 = '';
                  var provider = '';

                  if (typeof (result.title) !== 'undefined') {
                    title2 = "<h3>" + result.title + "</h3>";
                  }


                  if (typeof (result.provider_name) !== 'undefined') {
                    provider = "<p>" + result.provider_name + "</p>";
                  }


                  if (typeof (result.author_name) !== 'undefined') {
                    author = "<p> From " + result.author_name + "</p>";
                  }


                  if (result.type == 'video' || result.type == 'rich') {
                    html_img = result.html;
                  }

                  else if (result.type == 'photo') {
                    html_img = "<img src=" + result.url + ">";
                  }

                  $scope.listaMensajes[$index].response_data_url = $sce.trustAsHtml(title2 +
                    provider +
                    author +
                    html_img);


                }
                /* end else typeof (data.type) == 'undefined' */

              }


              $scope.gotoAnchor(msg.id);


            },
            function (error) {
              // TODO: mostrar error
              console.log("error getMetaTags");
              console.log(error);
            }
          );


        } /* end if of $scope.listaMensajes[$index].response_data_url === undefined */


      };





      function findUrls( text )
      {
        var source = (text || '').toString();
        var urlArray = [];
        var url;
        var matchArray;

        // Regular expression to find FTP, HTTP(S) and email URLs.
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

        // Iterate through any URLs in the text.
        while( (matchArray = regexToken.exec( source )) !== null )
        {
          var token = matchArray[0];
          urlArray.push( token );
        }

        return urlArray;
      }






      $scope.sendText = function () {
        console.log("enviamos texto");
        console.log($scope.textchat);
        if ($scope.textchat) {
          var data = {
            userid: $localStorage.id,
            groupid: $scope.groupid,
            channelid: $scope.channelid,
            text: $scope.textchat,
            messageType: 'TEXT'
          };


          var tempdata = $scope.textchat.slice();
          var arrayurls = findUrls(tempdata);
          var atempdata = tempdata.split(" ");


          /* si no hay urls se manda el mensaje */
          if (arrayurls.length == 0) {
            ChatService.postMessage(data).then(
              function (result) {
                $scope.textchat = null;
              },
              function (error) {
                // TODO: Mostrar error
                console.log("Error en postMessage");
                console.log(error);
              }
            );

          }
          /* si hay urls pero es lo uniko */
          else {
            if (atempdata.length == 1) {
              //console.log("solo 1 url");
              data.messageType = 'URL';
              ChatService.postMessage(data).then(
                function (result) {
                  $scope.textchat = null;
                },
                function (error) {
                  // TODO: Mostrar error
                  console.log("Error en postMessage");
                  console.log(error);
                }
              );


            }
            /* si hay de tod0: texto y urls  */
            else {

              var sortarrayall = [];
              var texttemp = '';
              var indexsortarrayall = 0;
              var indexurls = 0;

              /* para cada obj mirar si es o no url
               * sino lo es: lo vamos metiendo tod0 en 1 var temporal
               * si lo es, hacemos push de la temporal y luego de la url */


              for (var i = 0; i < atempdata.length; i++) {

                if (atempdata[i] == arrayurls[indexurls]) {
                  /* metemos lo anterior si hay, y sino la url */

                  if (texttemp !== '') {
                    var objdata = {};
                    objdata.text = texttemp;
                    objdata.messageType = 'TEXT';
                    sortarrayall[indexsortarrayall] = objdata;
                    texttemp = '';
                    indexsortarrayall++;

                  }
                  var objdata = {};
                  objdata.text = atempdata[i];
                  objdata.messageType = 'URL';
                  sortarrayall[indexsortarrayall]= objdata;
                  indexsortarrayall++;
                  indexurls++;


                }
                else {
                  //si es la ultima posicion en el for y no es url, meterlo en el array

                  if(i == atempdata.length-1 && atempdata[i] !== ''){
                    var objdata = {};

                    texttemp = texttemp + atempdata[i] + " ";
                    objdata.text = texttemp;
                    objdata.messageType = 'TEXT';
                    sortarrayall[indexsortarrayall] = objdata;
                    texttemp = '';

                    indexsortarrayall++;


                  }
                  texttemp = texttemp + atempdata[i] + " ";

                }

              }

              /* ahora que tenemos los campos a modificar y enteros
               los mandamos*/

              angular.forEach(sortarrayall, function(value, key) {


                var data = {
                  userid: $localStorage.id,
                  groupid: $scope.groupid,
                  channelid: $scope.channelid,
                  text: value.text,
                  messageType: value.messageType
                };

                console.log("esto envio desde el controlador");
                console.log("con index " + key);
                console.log(data.text);
                console.log(data.messageType);
                console.log("********************");

                ChatService.postMessage(data).then(
                  function (result) {
                    $scope.textchat = null;
                  },
                  function (error) {
                    // TODO: Mostrar error
                    console.log("Error en postMessage");
                    console.log(error);
                  }
                );


              });


            } /* end else:hay urls y texto normal */

          } /*end else arrayurls.length == 0 */
        }

      };




      function updateAllNotificationsWithSelectGroup(group){


        for( var i = 0; i < $scope.groups.length; i++){

          /* buscamos en el scope que esta completo, el grupo que hemos seleccionado nuevo */
          if($scope.groups[i].id == group.id) {

            if ($scope.groups[i].notificationsCount !== undefined) {

              /* hay notificaciones asociadas al grupo, luego hay notificaciones de canal */
              if ($scope.groups[i].notificationsCount > 0) {
                /* recorremos todos los canales */


                var sumChannelsNotifications = 0;
                var sumDirectChannelsNotifications = 0;

                /* primero publicos */

                if($scope.groups[i].publicChannels !== undefined){
                  for (var j = 0; j < $scope.groups[i].publicChannels.length; j++) {

                    if ($scope.groups[i].publicChannels[j].notificationsCount !== undefined) {


                      if ($scope.groups[i].publicChannels[j].notificationsCount > 0) {
                        /* hay que buscarlo en el $scope */

                        for (var k = 0; k < $scope.publicChannels.length; k++) {


                          if ($scope.groups[i].publicChannels[j].id == $scope.publicChannels[k].id) {
                            $scope.publicChannels[k].notificationsCount = $scope.groups[i].publicChannels[j].notificationsCount;
                            sumChannelsNotifications = sumChannelsNotifications + $scope.publicChannels[k].notificationsCount;


                          }
                        }
                      }

                    }

                  } /* end for publicos */

                }


                if($scope.groups[i].privateChannels !== undefined){
                  /* privados */
                  for (var j = 0; j < $scope.groups[i].privateChannels.length; j++) {

                    if ($scope.groups[i].privateChannels[j].notificationsCount !== undefined) {

                      if ($scope.groups[i].privateChannels[j].notificationsCount > 0) {
                        /* hay que buscarlo en el $scope */
                        for (var k = 0; k < $scope.privateChannels.length; k++) {

                          if ($scope.groups[i].privateChannels[j].id == $scope.privateChannels[k].id) {
                            $scope.privateChannels[k].notificationsCount = $scope.groups[i].privateChannels[j].notificationsCount;
                            sumChannelsNotifications = sumChannelsNotifications + $scope.privateChannels[k].notificationsCount;


                          }
                        }
                      }

                    }

                  }
                  /* end for privateChannels */

                }


                if($scope.groups[i].directChannels !== undefined){

                  /* directos  */
                  for (var j = 0; j < $scope.groups[i].directChannels.length; j++) {
                    if ($scope.groups[i].directChannels[j].notificationsCount !== undefined) {

                      if ($scope.groups[i].directChannels[j].notificationsCount > 0) {
                        /* hay que buscarlo en el $scope */
                        /* members[x].notificationsCount */
                        /* $scope.groups[i].directMessageChannels[j], esto estaria bien que tuviera el id del usuario */


                        for (var k = 0; k < $scope.members.length; k++) {

                          if ($scope.groups[i].directChannels[j].user.id == $scope.members[k].id && $scope.members[k].id !== $localStorage.id) {


                            $scope.members[k].notificationsCount = $scope.groups[i].directChannels[j].notificationsCount;
                            sumDirectChannelsNotifications = sumDirectChannelsNotifications + $scope.members[k].notificationsCount;


                          }
                        }
                      }

                    }

                  } /* end for directChannels */

                }




                $scope.channelsNotificationsCount = sumChannelsNotifications;
                $scope.directChannelsNotificationsCount = sumDirectChannelsNotifications;


              }/* end if hay notificaciones en el grupo */

              /* si no las hay, hay que actualizar las notificaciones de canal a 0 */
              else{
                $scope.channelsNotificationsCount = 0;
                $scope.directChannelsNotificationsCount = 0;
              }

            } /* end if ($scope.groups[i].notificationsCount !== undefined) */
            else{
              $scope.groups[i].notificationsCount = 0;
              $scope.channelsNotificationsCount = 0;
              $scope.directChannelsNotificationsCount = 0;

            }


          } /* end el grupo que estamos recorriendo coincide con el grupo del mensaje */

        } /* nos recorremos los grupos */

      }



      $scope.selectGroup= function (group, ind) {
        $scope.classResalt= "textitalic";


        $scope.groupid=group.id;
        $scope.groupindex = ind;
        $scope.option="";


        /* aqui dentro llamamos a modificar notificaciones */
        $scope.getChannels(group);
        $scope.getGroupMembers(group);

        $scope.tagGroup=group;
        $scope.channelSelected = false;


        console.log("ha llamado disconnect de channel");
        Socket.emit('disconnectChannel');
        $scope.tagChannel='';


        Socket.emit('selectGroup', { 'groupid': group.id, 'userid': $localStorage.id } );






      };

      $scope.selectUser= function (user) {
        $scope.selectedUser=user.id;
      };




      function updateAllNotificationsWithSelectChannel( channel, type ){

        /* recorremos los grupos del scope */
        for (var j=0; j<$scope.groups.length; j++){


          /* si el grupo que recorremos es = al que nos encontramos */
          if ($scope.groups[j].id == $scope.tagGroup.id){

            var notificationsCount = 0;

            /* miramos el tipo del canal */
            if(type == "public"){

              /* miramos dentro de los canales, cual coincide con el seleccionado */
              for (var k = 0; k < $scope.groups[j].publicChannels.length; k++){

                if( $scope.groups[j].publicChannels[k].id ==  channel.id){

                  /* miramos si tiene notificaciones */
                  if($scope.groups[j].publicChannels[k].notificationsCount !== undefined){

                    if($scope.groups[j].publicChannels[k].notificationsCount > 0){
                      notificationsCount = $scope.groups[j].publicChannels[k].notificationsCount;


                      /* para notificaciones de canal concreto */
                      $scope.groups[j].publicChannels[k].notificationsCount = 0;


                    }

                  }

                }

              } /* end of for recorrer los canales concretos */


              /* ahora hay que cambiar la del scope */
              for (var l = 0; l < $scope.publicChannels.length; l++){
                if($scope.publicChannels[l].id ==  channel.id){
                  $scope.publicChannels[l].notificationsCount = 0;


                }

              }




            }
            else if(type == "private"){


              /* miramos dentro de los canales, cual coincide con el seleccionado */
              for (var k = 0; k < $scope.groups[j].privateChannels.length; k++){
                if( $scope.groups[j].privateChannels[k].id ==  channel.id){
                  /* miramos si tiene notificaciones */
                  if($scope.groups[j].privateChannels[k].notificationsCount !== undefined){
                    if($scope.groups[j].privateChannels[k].notificationsCount > 0){
                      notificationsCount = $scope.groups[j].privateChannels[k].notificationsCount;


                      /* para notificaciones de canal concreto */
                      $scope.groups[j].privateChannels[k].notificationsCount = 0;


                    }

                  }

                }


              } /* end of for recorrer los canales concretos */

              /* ahora hay que cambiar la del scope */
              for (var l = 0; l < $scope.privateChannels.length; l++){
                if($scope.privateChannels[l].id ==  channel.id){
                  $scope.privateChannels[l].notificationsCount = 0;


                }

              }


            }
            /* es 1 canal directo */
            else {

              /* los canales directos pueden no estar creados */

              if( $scope.groups[j].directChannels !== undefined){


                /* miramos dentro de los canales, cual coincide con el seleccionado */
                for (var k = 0; k < $scope.groups[j].directChannels.length; k++){
                  if( $scope.groups[j].directChannels[k].id ==  channel.id){
                    /* miramos si tiene notificaciones */


                    if($scope.groups[j].directChannels[k].notificationsCount !== undefined){
                      if($scope.groups[j].directChannels[k].notificationsCount > 0){
                        notificationsCount = $scope.groups[j].directChannels[k].notificationsCount;


                        /* para notificaciones de canal concreto */
                        $scope.groups[j].directChannels[k].notificationsCount = 0;



                      }

                    }


                  }


                } /* end of for recorrer los canales concretos */

              }/* los canales directos son undefined */


              if( $scope.members !== undefined){
                /* ahora hay que cambiar la del scope */
                for (var l = 0; l < $scope.members.length; l++){


                  for(var m = 0; m < channel.users.length; m++){
                    if($scope.members[l].id ==  channel.users[m]){
                      $scope.members[l].notificationsCount = 0;

                  }

                  }

                }

              }



            } /* end else: es 1 canal directo */



            /* para notificaciones generales, esto tiene que ser fuera del if del type */
            $scope.groupsNotificationsCount = $scope.groupsNotificationsCount - notificationsCount;


            /* hay que mirar si es directo o no */
            if(type == "DIRECT"){

              $scope.directChannelsNotificationsCount = $scope.directChannelsNotificationsCount - notificationsCount;

            }
            else {
              $scope.channelsNotificationsCount = $scope.channelsNotificationsCount - notificationsCount;

            }

            /* para notificaciones de grupo concreto, se hace fuera de los if, no influye el tipo de canal */
            $scope.groups[j].notificationsCount = $scope.groups[j].notificationsCount - notificationsCount;



          } /* end of if el grupo es el mismo que el del que nos encontramos */

        } /* en for recorrer grupos */

      }



      /* aqui ponemos a cursiva el canal seleccionado */
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



        $scope.channelid=channel.id;
        $scope.tagChannel=channel;
        $scope.tagChannel.type = type;


        /* si selecciona un canal por defecto le salga la conversacion, no los settings */
        $scope.activeChannelSettings = 0;
        $scope.channelSelected = true;

        $scope.getChannelMembers();
        $scope.getMessages(channel);

        // Emitimos evento de selecion de canal para recibir nuevos mensajes
        console.log("ha llamado disconnect de channel");
        Socket.emit('selectChannel', { 'channelid': channel.id , 'userid': $localStorage.id} );



        updateAllNotificationsWithSelectChannel(channel, type);

        //$scope.$apply();


      };



    $scope.getDownloadLink = function (msg, ev) {

      ev.preventDefault();

      // Datos del fichero que queremos descargar
      var data = {
        userid: msg.user.id,
        groupid: $scope.groupid,
        channelid: $scope.channelid,
        filename: msg.filename
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

              /* los inicializa */
              channelNotificationsCount: 0,
              //channelNotifications: [],
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
      if(typeof ($scope.listaMensajes[$index].text) !== "undefined"){
        //console.log($scope.listaMensajes[$index].text);
        if ($scope.listaMensajes[$index].text.indexOf('internalMessage#') == 0) {
          //console.log("es interno el mensaje ");
          //console.log($scope.listaMensajes[$index].text);

          return true;
        }
      }

      return false;
    };

    $scope.getInternalMessage = function ($index) {
      var internalMessage = $scope.listaMensajes[$index].text;
      var re = /internalMessage#(\w+)\./i;
      var matchArr, answerData, temptext;
      var messageType, messageText = "";


      var matchArr = internalMessage.match(re);
      /* vuelve a mirar que es interno */

      //console.log("esto vale getInternalmessage");
      //console.log(matchArr);
      if (matchArr){
        (matchArr.length > 1) ? messageType=matchArr[1] : messageType="";

        if (messageType == 'NEW_ANSWER') {
          answerData = getAnswerData(internalMessage);
          messageText = "<strong>"+answerData.answerUser + "</strong> added new answer for <a class=\"question-link\" ng-click=\"gotoAnchor('" + answerData.questionId + "')\">"+answerData.questionTitle+"</a>";
        }
        else if (messageType == 'NEW_MEMBER_IN_CHANNEL'){

          if(matchArr.input !== null){
            temptext = matchArr.input.split(':');
            if(temptext.length > 1){
              messageText = "<p> New member in channel: <strong>"+temptext[1] + "</strong></p> ";

            }
          }

        }
        else if (messageType == 'DELETE_MEMBER_FROM_CHANNEL'){

          if(matchArr.input !== null){
            temptext = matchArr.input.split(':');
            if(temptext.length > 1){
              messageText = "<p> Delete member from channel: <strong>"+temptext[1] + "</strong></p> ";

            }
          }

        }
        else if (messageType == 'UNSUSCRIBE_MEMBER_FROM_CHANNEL'){

          if(matchArr.input !== null){
            temptext = matchArr.input.split(':');
            if(temptext.length > 1){
              messageText = "<p> Unlinked member from channel: <strong>"+temptext[1] + "</strong></p> ";

            }
          }

        }

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
        console.log("esto valen los grupos");
        console.log($scope.groups);


        /* cogemos los grupos y los rellenamos con los canales */

        angular.forEach($scope.groups, function(value, key) {

          $scope.getChannelsForNotification(value);


        });


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




      /* lo que se muestra en las notificaciones cuando es interno el mensaje */
      $scope.getInternalMessageForNotification = function (text) {
        var internalMessage = text;
        var re = /internalMessage#(\w+)\./i;
        var matchArr, answerData, temptext;
        var messageType, messageText = "";


        var matchArr = internalMessage.match(re);
        /* vuelve a mirar que es interno */

        console.log("esto vale getInternalmessage");
        console.log(matchArr);
        if (matchArr){
          (matchArr.length > 1) ? messageType=matchArr[1] : messageType="";

          if (messageType == 'NEW_ANSWER') {
            answerData = getAnswerData(internalMessage);
            messageText = answerData.answerUser + " add new answer for "+answerData.questionTitle;
          }
          else if (messageType == 'NEW_MEMBER_IN_CHANNEL'){

            if(matchArr.input !== null){
              temptext = matchArr.input.split(':');

              if(temptext.length > 1){
                messageText = "new member: "+temptext[1];
              }

            }

          }
          else if (messageType == 'DELETE_MEMBER_FROM_CHANNEL'){

            if(matchArr.input !== null){
              temptext = matchArr.input.split(':');

              if(temptext.length > 1){
                messageText = "delete member: "+temptext[1];
              }

            }

          }
          else if (messageType == 'UNSUSCRIBE_MEMBER_FROM_CHANNEL'){

            if(matchArr.input !== null){
              temptext = matchArr.input.split(':');

              if(temptext.length > 1){
                messageText = "unlinked member: "+temptext[1] ;
              }

            }

          }

        }


        return messageText;

      };


      /* por canal, estoy dentro del canal */
     Socket.on('newMessage', function (data) {


     console.log("newMessage from server: " + data.groupid + ', ' + data.message.id);
     console.log(data);

     /* Si es el canal actual, añadimos mensaje a la listaMensaje
     y sino esta en la ventana (window de la app, le sacamos 1 notificacion
      */

     if (data.message.channel.id == $scope.tagChannel.id) {
       /* mirar si es 1 url y hasta que no este ready no pintar */

       if(data.message.messageType == 'URL'){

           data.message.visible = 0;


       }

       $scope.listaMensajes.push(data.message);


       /* mostramos notificaciones cuando no esta en la ventana */
       if($scope.window_focus !== true){

         var datatemp = JSON.parse(JSON.stringify(data));

         datatemp.groupName = $scope.tagGroup.groupName;
         datatemp.channelName = datatemp.message.channel.channelName;



         if(datatemp.message.messageType == 'QUESTION' && datatemp.message.title !== undefined){
           datatemp.message.text = "add new question "+datatemp.message.title;
         }
         else if(datatemp.message.messageType == 'TEXT' || datatemp.message.messageType == 'URL'){
           if(datatemp.message.text !== "undefined"){


             if(datatemp.message.text.indexOf('internalMessage#') == 0){


               datatemp.message.text = $scope.getInternalMessageForNotification(datatemp.message.text);
             }
           }
         }
         else if (datatemp.message.messageType == 'FILE' && datatemp.message.filename !== undefined){
           datatemp.message.text = "attach new file "+datatemp.message.filename;
         }



         ChatService.openNotification(datatemp);
       }


     }
     $scope.$apply();
     });





      /* por grupo */
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

      /* recibir evento de nuevo grupo
         por usuario US  ?? */


      /* no haria nada, yo he creado el grupo */
      Socket.on('newGroup', function (data) {
        console.log ("newGroup received from server");
        console.log(data);

        /* los inicializa */
        /*
        data.groupNotificationsCount = 0;
        data.channelsNotificationsCount = 0;
        data.directChannelsNotificationsCount = 0;
        $scope.groups.push(data);*/

        $scope.groups.push(data);


        /* cuando cree el nuevo grupo que le muestre los settings, si el es el que lo crea */
        if(data.users.length == 1){


          $scope.tagGroup = '';
        	$scope.selectGroup(data);
        	$scope.tagChannel = '';



          var user = {username :'meanstack'};

          if(data.message == undefined){
            data.message = {text : ' created new group: '+ data.groupName, user: user };

          }

          ChatService.openNotification(data);



        }
        $scope.$apply();


      });


      /* recibir evento de grupo eliminado
         por usuario US */
      Socket.on('deletedGroup', function (data) {

        console.log ("deletedGroup receive from server");
        console.log(data);

        /* si se borra el grupo se muestra 1 notificacion de escritorio
        * este o no dentro de la app */

        var user = {username :'meanstack'};

        if(data.message == undefined){
          data.message = {text : ' deleted group: '+ data.groupName, user: user };

        }



        if($scope.tagGroup.id == data.id){
          console.log("ha llamado disconnect de grupo");
          Socket.emit('disconnect');
          console.log("ha llamado disconnect de channel");
          Socket.emit('disconnectChannel');
	        $scope.tagGroup = '';
	        $scope.tagChannel = '';
        }

        for (var i=0;i<$scope.groups.length;i++){
          if ($scope.groups[i].id == data.id){

            ChatService.openNotification(data);
            $scope.groups.splice(i,1);
            i = $scope.groups.length;

          }
        }
        $scope.$apply();
      });


      //recibir evento de nombre de grupo editado
      /* a los usuarios que pertenecen al grupo US */

      /* no cambiaria nada */
      Socket.on('editedGroup', function (data) {
        console.log ("editedGroup received from server");
        console.log(data);



        for (var i=0; i<$scope.groups.length; i++){
          if ($scope.groups[i].id == data.id){

            var user = {username :'meanstack'};

            if(data.message == undefined){
              data.message = {text : 'the group '+$scope.groups[i].groupName +' changed its name to: '+ data.groupName, user: user };

            }

            ChatService.openNotification(data);



            $scope.groups[i].groupName = data.groupName;
            $scope.$apply();
            i = $scope.groups.length;
          }
        }
      });



      //recibir evento de invitación a grupo
      /* socket para el usuario que le compete la invitacion */
      /* no cambiaria nada */

      Socket.on('newGroupInvitation', function (data) {
        console.log ("newGroupInvitation received from server");
        if($scope.invitations == undefined){
          $scope.invitations = [];


        }

        $scope.invitations.push(data);
        $scope.$apply();


      });


      /* no cambiaría nada */
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




        /* no estoy segura de si esto esta bien */
        //$scope.invitations.push(data);
        $scope.$apply();


      });



       //recibir evento de nuevo usuario en grupo, es  cuando acepta el grupo
       /* si esta en los settings del grupo hay que actualizar los miembros de los settings */

      Socket.on('newMemberInGroup', function (data) {
        console.log ("newMemberInGroup receive from server");
        console.log(data);
        data.user.hash = $scope.getHash(data.user.mail);
        $scope.members.push(data.user);


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'new member in group: '+ data.user.username, user: user };

        }

        data.groupName = $scope.tagGroup.groupName;

        ChatService.openNotification(data);





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
      /* notificacion a todos */
      Socket.on('newPublicChannel', function (data) {
        console.log ("newPublicChannel received from server");
        console.log(data);

        /*
        * data: groupid: data.groupid,channelid: data.channelid, message:data.channelName
        * */


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'new public channel: '+ data.channelName, user: user };

        }

        data.groupName = $scope.tagGroup.groupName;

        ChatService.openNotification(data);






        data.channelNotificationsCount = 0;
        $scope.publicChannels.push(data);


        $scope.$apply();
      });


      //recibir evento de nuevo canal privado en grupo
      /* hacer notificacion */
      Socket.on('newPrivateChannel', function (data) {

        console.log ("newPrivateChannel received from server");
        console.log(data);


        /* si estoy en ese grupo */
        if($scope.tagGroup.id == data.group.groupId){
          console.log ("newPrivateChannel received from server en if: ");
          console.log(data);

          /* haria notificacion para todos */

          var user = {username :'meanstack'};
          if(data.message == undefined){
            data.message = {text : 'new private channel: '+ data.channelName, user: user };

          }

          data.groupName = $scope.tagGroup.groupName;

          ChatService.openNotification(data);




          data.channelNotificationsCount = 0;
          $scope.privateChannels.push(data);

          $scope.$apply();
        }

      });




      //recibir evento de usuario eliminado de grupo
      /* si soy yo no tiene que cambiar nada */
      /* si no estoy metido en el grupo dentro tampoco */
      /* actualizar siempre xaqui, xq se usa el mismo socket cuando un usuario sale */


      Socket.on('deletedMemberInGroup', function (data) {
        console.log ("deletedMemberInGroup receive from server: " + data);


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'deleted member from group: '+ data.user.username, user: user };

        }

        data.groupName = $scope.tagGroup.groupName;

        ChatService.openNotification(data);



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
      /* esto ahora se envia como 1 mensaje, no hay que hacer nada */
      Socket.on('newMemberInChannel', function (data) {
        console.log ("newMemberInChannel received from server");
        console.log(data);

        /* se supone que estoy dentro del canal */
        /* si soy el administrador no hago nada, xq ya esta modificado,
        	sino, si esta en settings con la opcion 0
        	hay que actualizar los miembros y los miembros de settings que son los mismos */

        if ($scope.adminChannel.id !== $scope.userid){
          if ($scope.tagChannel.id == data.channelid ){
	        	data.user.hash = $scope.getHash(data.user.mail);
	        	$scope.channelMembers.push(data.user);
	        	$scope.tagChannel.users.push(data.user);
        	}
        }

        $scope.$apply();
      });



      //recibir evento de usuario eliminado de canal
      /* se manda como mensaje, no hacer nada */
      Socket.on('deletedUserFromChannel', function (data) {
        console.log ("deletedUserFromChannel received from server");
        console.log(data);

        if (data.user.id == $localStorage.id){
        	if($scope.tagChannel.id == data.channelid){
            console.log("ha llamado disconnect de channel");
            Socket.emit('disconnectChannel');
        		$scope.tagChannel = ''
        	}
        	for (var i = 0; i < $scope.privateChannels.length; i++){
	            if ($scope.privateChannels[i].id == data.channelid){
	              $scope.privateChannels.splice(i,1);
	          }
	        }
        }

        else {
        	if($scope.tagChannel.id == data.channelid){

        		for (var j = 0; j < $scope.channelMembers.length; j++){
	            	if ($scope.channelMembers[j].id == data.user.id){
	              		$scope.channelMembers.splice(j,1);
	              	}

	          	}

		        for (var k = 0; k < $scope.tagChannel.users.length; k++){
		            if ($scope.tagChannel.users[k].id == data.user.id){
		              $scope.tagChannel.users.splice(k,1);

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



      //recibir evento de canal privado eliminado
      Socket.on('deletedPrivateChannel', function (data) {
        console.log ("deletedPrivateChannel received from server");
        console.log(data);


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'deleted PRIVATE channel in group: '+ data.channelName, user: user };

        }

        data.groupName = $scope.tagGroup.groupName;

        ChatService.openNotification(data);




        for (var i=0;i<$scope.privateChannels.length;i++){
          if ($scope.privateChannels[i].id == data.id){
            $scope.privateChannels.splice(i,1);
          }
        }
        if($scope.tagChannel.id == data.id){
          console.log("ha llamado disconnect de channel");
          Socket.emit('disconnectChannel');
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


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'deleted PUBLIC channel in group: '+ data.channelName, user: user };

        }

        data.groupName = $scope.tagGroup.groupName;

        ChatService.openNotification(data);





        for (var i=0;i<$scope.publicChannels.length;i++){
          if ($scope.publicChannels[i].id == data.id){
            $scope.publicChannels.splice(i,1);
          }
        }
        if($scope.tagChannel.id == data.id){
          console.log("ha llamado disconnect de channel");
          Socket.emit('disconnectChannel');
          $scope.channelMembers = '';
          $scope.channelSelected = false;
          $scope.tagChannel = '';
        }
        $scope.$apply();
      });



      //Eventos de grupos listados y no conectado
      /* nada */
      Socket.on('newGroupEvent', function (data) {
        console.log ("newGroupEvent received from server");

      });


      Socket.on('editedGroupEvent', function (data) {
        console.log ("editedGroupEvent received from server");
        /*
        if ($scope.tagGroup.id!=data.groupid){
          var message = 'Edited Group';
          $scope.addGroupNotification(data,message);
          $scope.$apply();
        }
        */

      });


      /* hacer notificacion */
      Socket.on('deletedMemberInGroupEvent', function (data) {
        console.log ("deletedMemberInGroupEvent received from server");


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'deleted member from group: '+ data.user.username, user: user };

        }


        ChatService.openNotification(data);




      });

      Socket.on('newMemberInGroupEvent', function (data) {
        console.log ("newMemberInGroupEvent received from server");


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'new member in group: '+ data.user.username, user: user };

        }


        ChatService.openNotification(data);


      });

      Socket.on('newChannelEvent', function (data) {
        console.log ("newChannelEvent received from server: ");
        console.log(data);



        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'new ' + data.channelType +' channel in group: '+ data.channelName, user: user };

        }

        ChatService.openNotification(data);


      });

      Socket.on('deletedChannelEvent', function (data) {
        console.log ("deletedChannelEvent received from server: " + data);
        console.log(data);


        /* Object {groupid: "56f8353bd7e719850b587f1a",
        groupName: "G4",
        channelName: "PU14",
        channelid: "56f840b3d7e719850b587f22",
        channelType: "PUBLIC"}*/


        /* haria notificacion para todos */

        var user = {username :'meanstack'};
        if(data.message == undefined){
          data.message = {text : 'deleted '+ data.channelType +' channel from group: '+ data.channelName, user: user };

        }


        ChatService.openNotification(data);




      });

      Socket.on('editedChannelEvent', function (data) {
        console.log ("editedChannelEvent received from server: ");
        console.log(data);
        /*
        var message = '';
        if (data.channelType == "PUBLIC") {
          message = 'Edited public Channel';
        }
        if (data.channelType == "PRIVATE") {
          message = 'Edited private Channel';
        }
        if (data.channelType == "DIRECT") {
          message = 'Edited direct Channel';
        }
        $scope.addGroupNotification(data,message);
        $scope.addChannelNotification(data,message);
        $scope.$apply();
        */
      });



      /* por usuario, notifica para cualquier evento en cualquier grupo o canal */
      Socket.on('newMessageEvent', function (data) {


        console.log ("newMessageEvent received from server: " );
        console.log("esto vale data: ");
        console.log(data);
        /*
         Object { groupid: "56cb893773da764818ec5df0",
         groupName: "Dessi",
         channelName: "PR7",
         channelid: "56f1a4ca23f4c0aa31a707ac",
         channelType: "PRIVATE",
         message: Object }

         */


        /* llega un mensaje para un canal que es del mismo grupo,
        * pero no es su canal, y de momento
        * solo mostramos notificaciones escritorio para los canales del grupo
        * y cuando no esta mirando */
        if(data.groupid === $scope.tagGroup.id && $scope.window_focus !== true){
          console.log("esta en ese grupo y fuera de la window");

          /* esto habra que cambiarlo cuando sean internal y demas */
          ChatService.openNotification(data);

        }





        /* si estamos = grupo e = canal,
         * que el del mensaje,
         * no hacemos nada
         * */

        if(data.groupid === $scope.tagGroup.id && data.channelid === $scope.tagChannel.id){
          console.log("No hay que actualizar nada");

        }
        else {
          /* grupo y canal en general */
          updateGeneralNotifications(data);


          /* grupo y canales concreto */
          /* habria que mirar para mensajes directos, ahora esta con $scope.groups[x].directChannels[y].notificationsCount
          * esto medio falta */
          if($scope.groups !== undefined){
            updateConcreteNotifications(data);

          }

          /* actualizar scope (solo canal cambia) y solo si estamos en el mismo grupo */
          /* $scope.directChannels[y].notificationsCount, para el $scope actual */
          if(data.groupid === $scope.tagGroup.id){
            updateScopeNotifications(data);

          }

        }


        $scope.$apply();
      });



      /********** actualizar notificaciones concretas de grupos y canales *********/
      function updateConcreteNotifications ( data ) {

        console.log("esto vale $scope.groups en newmessageevent");
        console.log($scope.groups);

        for( var i = 0; i < $scope.groups.length; i++){

          /* hemos encontrado el grupo */
          /* le añadimos la notificacion */
          if($scope.groups[i].id == data.groupid){


            if($scope.groups[i].notificationsCount !== undefined){
              $scope.groups[i].notificationsCount = $scope.groups[i].notificationsCount +1;


            }
            else{

              $scope.groups[i].notificationsCount = 1;


            }


            /* miramos el tipo del canal,
             para añadir notificaciones en el canal adecuado */

            if(data.channelType  == 'PRIVATE'){

              if($scope.groups[i].privateChannels !== undefined ){
                if($scope.groups[i].privateChannels.length > 0){
                  for(var j = 0; j< $scope.groups[i].privateChannels.length; j++){

                    /* hemos encontrado el canal, le añadimos la notificacion */
                    if($scope.groups[i].privateChannels[j].id == data.channelid){
                      if($scope.groups[i].privateChannels[j].notificationsCount !== undefined){
                        $scope.groups[i].privateChannels[j].notificationsCount = $scope.groups[i].privateChannels[j].notificationsCount + 1;
                      }
                      else{
                        $scope.groups[i].privateChannels[j].notificationsCount = 1;

                      }


                    } /* end han encontrado el canal */

                  } /* end for recorriendo los canales privados */
                 // $scope.$apply();

                } /* tiene canales privados, no es vacio  */


              } /* tiene canales privados, no es undefined  */

            } /* end if el mensaje es private */
            else if(data.channelType  == 'PUBLIC'){

              if($scope.groups[i].publicChannels !== undefined ){

                if($scope.groups[i].publicChannels.length > 0){

                  for(var k = 0; k< $scope.groups[i].publicChannels.length; k++){

                    /* hemos encontrado el canal, le añadimos la notificacion */
                    if($scope.groups[i].publicChannels[k].id == data.channelid){

                      if($scope.groups[i].publicChannels[k].notificationsCount !== undefined){

                        $scope.groups[i].publicChannels[k].notificationsCount = $scope.groups[i].publicChannels[k].notificationsCount + 1;
                      }
                      else{

                        $scope.groups[i].publicChannels[k].notificationsCount = 1;

                      }


                    } /* end han encontrado el canal */

                  } /* end for recorriendo los canales publicos */
                 // $scope.$apply();

                } /* tiene canales publicos, no es vacio  */


              } /* tiene canales publicos, no es undefined  */

            } /* end if el mensaje es private */
            else if(data.channelType  == 'DIRECT'){

              console.log("no sale");
              console.log("esto vale si es directo");
              console.log($scope.groups[i]);

              if($scope.groups[i].directChannels !== undefined ){

                console.log("esto vale si es directo y noundefined");
                console.log($scope.groups[i].directChannels);
                //esto tiene notificationsCount y channelNotificationsCount


                // pueden no ser undefined, pero no estar


                var enc = false;

                if($scope.groups[i].directChannels.length > 0){
                  for(var l = 0; l< $scope.groups[i].directChannels.length; l++){

                    /* hemos encontrado el canal, le añadimos la notificacion */
                    if($scope.groups[i].directChannels[l].id == data.channelid){
                      if($scope.groups[i].directChannels[l].notificationsCount !== undefined){

                        //esto me meta
                        $scope.groups[i].directChannels[l].notificationsCount = $scope.groups[i].directChannels[l].notificationsCount + 1;
                        console.log("esto vale si es directo y noundefined3 las notificaciones");
                        console.log($scope.groups[i].directChannels[l].notificationsCount);

                      }
                      else{
                        $scope.groups[i].directChannels[l].notificationsCount = 1;
                        console.log("esto vale si es directo y noundefined4 = 1");

                      }

                      enc = true;


                    } /* end han encontrado el canal */
                    //si no lo ha encontrado, se lo añadimos



                  } /* end for recorriendo los canales directos */

                  if(!enc){


                      if(data.message.user.id !== $localStorage.id){
                        $scope.groups[i].directChannels.push({
                          id: data.channelid,
                          channelName: data.channelName,
                          channelType: data.channelType,
                          user: data.message.user,

                          /* los inicializa */
                          notificationsCount: 1
                        });

                      }

                  }



                 // $scope.$apply();

                } /* tiene canales directos, no es vacio  */


              } /* end if tiene canales directos, no es undefined  */
              else {

/*
                Object { groupid: "56cb893773da764818ec5df0",
                  groupName: "Dessi",
                  channelName: "PR7",
                  channelid: "56f1a4ca23f4c0aa31a707ac",
                  channelType: "PRIVATE",
                  message: Object }

              */


                $scope.groups[i].directChannels = [];


                if(data.message.user.id !== $localStorage.id){
                  $scope.groups[i].directChannels.push({
                    id: data.channelid,
                    channelName: data.channelName,
                    channelType: data.channelType,
                    user: data.message.user,

                    /* los inicializa */
                    notificationsCount: 1
                  });

                }

              } /* end else, canales directos son undefined */


            } /* end if el mensaje es direct */


          } /* end el grupo que estamos recorriendo coincide con el grupo del mensaje */

        } /* nos recorremos los grupos */
       // $scope.$apply();

      }





      /********** actualizar notificaciones globales de grupos y canales *************/
      function updateGeneralNotifications (data) {

        /* grupo general */
        if($scope.groupsNotificationsCount !== undefined){
          $scope.groupsNotificationsCount = $scope.groupsNotificationsCount +1;


        }
        else{
          $scope.groupsNotificationsCount = 1;

        }

        /* canales en general, de momento solo publicos y privados */
        /* miramos si es directo, entonces va a parte */


        /*
         Object { groupid: "56cb893773da764818ec5df0",
         groupName: "Dessi",
         channelName: "PR7",
         channelid: "56f1a4ca23f4c0aa31a707ac",
         channelType: "PRIVATE",
         message: Object }

         */

        if(data.channelType == 'DIRECT'){


          if($scope.directChannelsNotificationsCount !== undefined){
            $scope.directChannelsNotificationsCount = $scope.directChannelsNotificationsCount +1;


          }
          else{
            $scope.directChannelsNotificationsCount = 1;

          }


        }
        else {

          if($scope.channelsNotificationsCount !== undefined){
            $scope.channelsNotificationsCount = $scope.channelsNotificationsCount +1;


          }
          else{
            $scope.channelsNotificationsCount = 1;

          }

        }



      }




      /******** actualizar scope de notificaciones ***************/
      function updateScopeNotifications ( data ) {


        if (data.channelType == 'PRIVATE') {
          console.log("data.channelType  == 'PRIVATE'");


          if ($scope.privateChannels !== undefined) {
            if ($scope.privateChannels.length > 0) {


              for (var x = 0; x < $scope.privateChannels.length; x++) {


                /* hemos encontrado el canal, le añadimos la notificacion */
                if ($scope.privateChannels[x].id == data.channelid) {

                  if ($scope.privateChannels[x].notificationsCount !== undefined) {
                    $scope.privateChannels[x].notificationsCount = $scope.privateChannels[x].notificationsCount + 1;
                  }
                  else {
                    $scope.privateChannels[x].notificationsCount = 1;

                  }

                }/* end han encontrado el canal */

              }/* end for recorriendo los canales privados */

             // $scope.$apply();

            }/* tiene canales privados, no es vacio  */

          }/* tiene canales privados, no es undefined  */

        } /* end if el mensaje es private */
        else if (data.channelType == 'PUBLIC') {


          if ($scope.publicChannels !== undefined) {
            if ($scope.publicChannels.length > 0) {
              for (var z = 0; z < $scope.publicChannels.length; z++) {

                /* hemos encontrado el canal, le añadimos la notificacion */
                if ($scope.publicChannels[z].id == data.channelid) {
                  if ($scope.publicChannels[z].notificationsCount !== undefined) {
                    $scope.publicChannels[z].notificationsCount = $scope.publicChannels[z].notificationsCount + 1;
                  }
                  else {
                    $scope.publicChannels[z].notificationsCount = 1;

                  }

                }/* end han encontrado el canal */

              }/* end for recorriendo los canales public */

             // $scope.$apply();

            }/* tiene canales public, no es vacio  */

          }/* tiene canales public, no es undefined  */

        } /* end if el mensaje es public */
        else if (data.channelType == 'DIRECT') {



          if ($scope.members !== undefined) {
            if ($scope.members.length > 0) {

              /* nos lo recorremos por cada usuario */
              for (var y = 0; y < $scope.members.length; y++) {
                /*console.log("entra IZAS3");
                console.log("esto vale data, hay que mirar si tiene users");
                console.log($scope.members);
                console.log(data.message.user);*/

                /* hemos encontrado el canal, le añadimos la notificacion */
                if(data.message.user !== undefined){

                  //for(var w = 0;w < data.message.user.length; w++){
                    console.log("entra IZAS4");
                    if ($scope.members[y].id == data.message.user.id) {
                      if($scope.members[y].notificationsCount !==undefined){
                        $scope.members[y].notificationsCount = $scope.members[y].notificationsCount + 1;


                      }
                      else{
                        console.log("entra IZAS5");
                        $scope.members[y].notificationsCount = 1;
                        console.log($scope.members[y]);

                      }


                    }

                  //}

                }
                /* end han encontrado el canal */

              }
              /* end for recorriendo los canales public */
              //$scope.$apply();

            }/* tiene canales public, no es vacio  */

          }/* tiene canales public, no es undefined  */

        }/* end if el mensaje es direct */

      }

      /********* end updateScopeNotifications **********/






      /* esto esta como 1 mensaje, no hay que notificar */
      Socket.on('newMemberInChannelEvent', function (data) {
        console.log ("newMemberInChannelEvent received from server");


      });


      /* esta como un mensaje, no hay que notificar */
      Socket.on('deletedMemberInChannelEvent', function (data) {
        console.log ("deletedMemberInChannelEvent received from server");


      });


    }]);
