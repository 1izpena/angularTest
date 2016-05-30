/**
 * Created by izaskun on 25/05/16.
 */

'use strict';

angular.module('myAppAngularMinApp')
  .service('ScrumParseService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {

        parseScrumEvents: parseScrumEvents


      };



    function parseUserstory(scrumMessageJSON, $index, msg) {

      /* de momento se adecua a la
       action      : 'created',*/


      /* example [Project] Userstory created by [1izpena] (poder ver su perfil , necesito el id del usuario, y lo tengo)
      * #num Subject */


      /*
      * var messagetext = {
       action      : 'created',
       event       :  'userstory',
       sender      :   result (aqui tengo el id, con eso podría ir a su perfil)
       };
       var partialuserstory = {
       id           : userstory.id,
       subject     : userstory.subject,
       tags        : userstory.tags,
       votes       : userstory.votes,
       points      : userstory.points,
       description : userstory.description,
       requirement : userstory.requirement
       };
      *
      *
      * */




      var messageText = '';
      var projectParse = '';
      var actionParse = '';
      var userstoryHeaderParse = '';
      var userstoryBodyParse = '';

      console.log("esto vale en el parser scrumMessageJSON ");
      console.log(scrumMessageJSON);
      console.log("*****************************");
      console.log(scrumMessageJSON.sender);
      console.log("*****************************");

      console.log(scrumMessageJSON.userstory);

      if(scrumMessageJSON.sender !== null &&
        scrumMessageJSON.sender !== undefined &&
        scrumMessageJSON.sender !== '' &&
        scrumMessageJSON.userstory !== null &&
        scrumMessageJSON.userstory !== undefined &&
        scrumMessageJSON.userstory !== ''){



        console.log("******************************");
        console.log("******************************");
        console.log("estovale msg en getscrum services parseuserstory");
        console.log(msg);
        console.log("******************************");
        console.log("******************************");



        projectParse = getProjectFields();
        actionParse = getActionFields(scrumMessageJSON);
        userstoryHeaderParse = getHeaderFields(scrumMessageJSON, $index, msg);
        userstoryBodyParse = getBodyFields (scrumMessageJSON, $index, msg);



        messageText = projectParse + actionParse + userstoryHeaderParse + userstoryBodyParse;

      }





      return messageText;




    };



      function getProjectFields() {
        /* (1)[Project] */
        return "<p> [ScrumProject]</p> ";

      };

      function getActionFields(scrumMessageJSON) {

        /* (2) Userstory created by [1izpena] (poder ver su perfil , necesito el id del usuario, y lo tengo) */
        var actionfields = "";
        var senderlink = "";
        var action = scrumMessageJSON.action;

        console.log("esto vale userstory en getAction fields");
        console.log(scrumMessageJSON.sender.username);
        console.log(scrumMessageJSON.sender.id);


        if(action == null ||
          action == undefined ||
          action == ''){
          action = "change";

        }
        if(scrumMessageJSON.sender.username !== null &&
          scrumMessageJSON.sender.username !== undefined &&
          scrumMessageJSON.sender.username !== '' ){

          if(scrumMessageJSON.sender.id !== null &&
            scrumMessageJSON.sender.id !== undefined &&
            scrumMessageJSON.sender.id !== ''){

            senderlink = "by <a ng-click='viewUserProfile(" + '"'+scrumMessageJSON.sender.id+'"'+")'>"+scrumMessageJSON.sender.username+"</a>";

          }
          else{
            senderlink = " by " +scrumMessageJSON.sender.username;
          }

        }
        actionfields = "<p> Userstory " + action + " " + senderlink + ": </p>"

        return actionfields;

      };


      function getHeaderFields(scrumMessageJSON, $index,msg){
        /* (3) #num [Subject] con link  */


        var header = "";
        var num = 0;
        var subject = "";

        console.log("esto vale num en getheaders field con num");
        console.log(scrumMessageJSON.userstory.num);

        if(scrumMessageJSON.userstory.num !== null &&
          scrumMessageJSON.userstory.num !== undefined &&
          scrumMessageJSON.userstory.num !== '' ){

          num = scrumMessageJSON.userstory.num;

        }


        if(scrumMessageJSON.userstory.subject !== null &&
          scrumMessageJSON.userstory.subject !== undefined &&
          scrumMessageJSON.userstory.subject !== '' ){

          subject = scrumMessageJSON.userstory.subject;

        }


        if(scrumMessageJSON.userstory.id !== null &&
          scrumMessageJSON.userstory.id !== undefined &&
          scrumMessageJSON.userstory.id !== ''){

          header = "<p><a ng-click='viewUserstory(" + '"'+scrumMessageJSON.userstory.id+'"'+")'>#" + num + " "+subject+"</a> " +
            "<i ng-click='changeVisibleDetails("+ '"' +$index+'"'+")' class='fa fa-caret-square-o-down fa-lg' role='button' tabindex='0'></i></p>";


        }
        else{
          header = "<p><a>#" + num + " "+subject+"</a> " +
            "<i ng-click='changeVisibleDetails("+ '"' +$index+'"'+")' class='fa fa-caret-square-o-down fa-lg' role='button' tabindex='0'></i></p>";



        }



        /* <i ng-if="msg.messageType=='URL'" ng-click="changeVisible(msg,$index)" class="fa fa-caret-square-o-down fa-lg ng-scope" role="button" tabindex="0"></i>*/

        return header;



      }









      function getBodyFields(scrumMessageJSON, $index, msg){

        var params = "";
        var body = "";
        var totalPoints = 0;



        if(scrumMessageJSON.userstory.voters !== null &&
          scrumMessageJSON.userstory.voters !== undefined &&
          scrumMessageJSON.userstory.voters !== '' ){
          if(scrumMessageJSON.userstory.voters.length){
            params += "<p class='scrum-msg-p'> Votes: "+scrumMessageJSON.userstory.voters.length+"</p>";
          }
          else{
            params += "<p class='scrum-msg-p'> Votes: 0</p>";
          }
        }
        else{
          params += "<p class='scrum-msg-p'> Votes: 0</p>";
        }

        /*podria poner en detalle, pero que se miren la descripcion, vagos */

        if(scrumMessageJSON.userstory.totalPoints !== null &&
          scrumMessageJSON.userstory.totalPoints !== undefined &&
          scrumMessageJSON.userstory.totalPoints !== '' ){

          totalPoints = scrumMessageJSON.userstory.totalPoints;
          params += "<p> Points: "+totalPoints+"</p>";

        }

        if(scrumMessageJSON.userstory.description !== null &&
          scrumMessageJSON.userstory.description !== undefined &&
          scrumMessageJSON.userstory.description !== '' ){
          params = params + "<p>Description: "+scrumMessageJSON.userstory.description+"</p>";


        }

        params += "<p class='scrum-msg-labels'> Status: <span class='label label-info status' >New</span></p>";





        if(scrumMessageJSON.userstory.tags !== undefined
          && scrumMessageJSON.userstory.tags !== null
          && scrumMessageJSON.userstory.tags !== ''){
          if(scrumMessageJSON.userstory.tags.length){

            params += "<p class='scrum-msg-labels'> Tags: ";
            for( var i = 0; i< scrumMessageJSON.userstory.tags.length; i++){
              params += "<span class='label label-info tags' >"+ scrumMessageJSON.userstory.tags[i] +"</span>";
            }
            params += "</p>";
          }
        }

        /* team, client, blocked */
        if(scrumMessageJSON.userstory.requirement !== undefined
          && scrumMessageJSON.userstory.requirement !== null
          && scrumMessageJSON.userstory.requirement !== ''){

          if(scrumMessageJSON.userstory.requirement.team == true
            || scrumMessageJSON.userstory.requirement.client == true
            || scrumMessageJSON.userstory.requirement.blocked == true) {

            params += "<p>Type: ";

            if(scrumMessageJSON.userstory.requirement.team == true) {
              params += "<span class='label label-primary' >Team requirement</span>";

            }
            if(scrumMessageJSON.userstory.requirement.client == true) {
              params += "<span class='label label-primary' >Client requirement</span>";
            }
            if(scrumMessageJSON.userstory.requirement.blocked == true) {
              params += "<span class='label label-blocked' >Blocked</span>";
            }

            params += "</p>";

          }
        }




        /* faltan requirement*/

        body = "<div ng-if="+ '"' +msg.visible+'"' +"class='metadatalinks'>"+ params +"</div>";
        return body;



      }



    function parseScrumEvents(scrumMessageJSON, $index, msg) {

      var messageText = '';


      console.log("******************************");
      console.log("******************************");
      console.log("estovale msg en getscrum services");
      console.log(msg);
      console.log("******************************");
      console.log("******************************");

      console.log("scrumMessageJSON");
      console.log(scrumMessageJSON);

      if(scrumMessageJSON !== null &&
        scrumMessageJSON !== undefined &&
        scrumMessageJSON !== ''){

        var messageEventType = scrumMessageJSON.event;


        if(messageEventType == "userstory"){

          /* llamamos al parseo de eventos push */
          messageText = parseUserstory(scrumMessageJSON, $index, msg);


        }
        else if(messageEventType == "sprint"){
          /*messageText = parseCommitComment(githubMessageJSON);*/

        }
        else if(messageEventType == "issue"){
          /*messageText = parseIssues(githubMessageJSON);*/

        }
        else if(messageEventType == "task"){
          /*messageText = parseIssueComment(githubMessageJSON);*/

        }

      }



      return messageText;




    };















  }]);
