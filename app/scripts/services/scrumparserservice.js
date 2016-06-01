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


        /*hay que mirar la accion para hacer 1 cosa u otra */
        if(scrumMessageJSON.action == 'created' ){
          projectParse = getProjectFields();
          actionParse = getActionFields(scrumMessageJSON);
          userstoryHeaderParse = getHeaderFields(scrumMessageJSON, $index, msg);
          userstoryBodyParse = getBodyFields (scrumMessageJSON, $index, msg);



          messageText = projectParse + actionParse + userstoryHeaderParse + userstoryBodyParse;

        }
        else if(scrumMessageJSON.action == 'updated' ){
          projectParse = getProjectFields();
          actionParse = getActionFields(scrumMessageJSON);
          userstoryHeaderParse = getHeaderFields(scrumMessageJSON, $index, msg);
          /* hasta aqui = */
          /* aqui pondría que ha cambiado */



          messageText = projectParse + actionParse + userstoryHeaderParse;

          console.log("esto vale scrumMessageJSON.field");
          console.log(scrumMessageJSON.field);
          if(scrumMessageJSON.field > 0 && scrumMessageJSON.field < 10){
            userstoryBodyParse = getBodyFieldsForUpdate (scrumMessageJSON, $index, msg);
            messageText += userstoryBodyParse;

          }


        }




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


        if(params == ''){
          return '';
        }
        else {
          body = "<div ng-if="+ '"' +msg.visible+'"' +"class='metadatalinks'>"+ params +"</div>";
          return body;

        }

      }



      /****************************** new ****************************************/

      function getBodyFieldsForUpdate(scrumMessageJSON, $index, msg){

        var params = "";
        var body = "";

        var isVoted = false;
        var totalPoints = 0;


        /* mirar que field tiene y hacerlo en base a eso */
        /*
        * field == 1){ /*voters*
        * 2 point
        * 3 attachment
        * 4 tasks
        * 5 tags
        * 6 description
        * 7 requirement

        * */

        if(scrumMessageJSON.field == 1){ /* voters */
          /* miramos si el objeto me tiene, sino esque el desvotado */
          if(scrumMessageJSON.userstory.voters !== undefined &&
            scrumMessageJSON.userstory.voters !== null &&
            scrumMessageJSON.userstory.voters !== '' &&
            scrumMessageJSON.sender !== null &&
            scrumMessageJSON.sender !== undefined &&
            scrumMessageJSON.sender !== '' ){
            if(scrumMessageJSON.userstory.voters.length >0){
              for(var i = 0; i< scrumMessageJSON.userstory.voters.length; i++){
                if(scrumMessageJSON.userstory.voters[i].id == scrumMessageJSON.sender.id &&
                  scrumMessageJSON.sender.id !== undefined &&
                  scrumMessageJSON.sender.id !== null &&
                  scrumMessageJSON.sender.id !== '' ){
                  isVoted = true;


                }
              }


            }
            else{
              /* he desvotado */

              isVoted = false;
            }

            if(isVoted){
              params += "<p>Votes increased: "+scrumMessageJSON.userstory.voters.length +"</p>";

            }
            else{
              params += "<p>Votes decreased: "+scrumMessageJSON.userstory.voters.length +"</p>";

            }

          }

        }/* end votes update */
        else if(scrumMessageJSON.field == 2) { /* point */

          params += "<p>Points changed: </p>";
          if(scrumMessageJSON.userstory.point !== undefined &&
            scrumMessageJSON.userstory.point !== null &&
            scrumMessageJSON.userstory.point !== ''){


            if(scrumMessageJSON.userstory.point.ux !== undefined &&
              scrumMessageJSON.userstory.point.ux !== null &&
              scrumMessageJSON.userstory.point.ux !== ''){

              params += "<p>UX: "+scrumMessageJSON.userstory.point.ux +"</p>";

            }

            if(scrumMessageJSON.userstory.point.design !== undefined &&
              scrumMessageJSON.userstory.point.design !== null &&
              scrumMessageJSON.userstory.point.design !== ''){

              params += "<p>Design: "+scrumMessageJSON.userstory.point.design +" </p>";
            }
            if(scrumMessageJSON.userstory.point.front !== undefined &&
              scrumMessageJSON.userstory.point.front !== null &&
              scrumMessageJSON.userstory.point.front !== ''){
              params += "<p>Front: "+scrumMessageJSON.userstory.point.front +" </p>";


            }
            if(scrumMessageJSON.userstory.point.back !== undefined &&
              scrumMessageJSON.userstory.point.back !== null &&
              scrumMessageJSON.userstory.point.back !== ''){
              params += "<p>Back: "+scrumMessageJSON.userstory.point.back +" </p>";

            }

          }
          if(scrumMessageJSON.userstory.totalPoints !== null &&
            scrumMessageJSON.userstory.totalPoints !== undefined &&
            scrumMessageJSON.userstory.totalPoints !== '' ){

            totalPoints = scrumMessageJSON.userstory.totalPoints;
            params += "<p> Total Points: "+totalPoints+"</p>";

          }


        } /* end points */
        else if(scrumMessageJSON.field == 5) { /* tags */
          params += "<p class='scrum-msg-labels'> Tags changed: </p>";

          if(scrumMessageJSON.userstory.tags !== undefined
            && scrumMessageJSON.userstory.tags !== null
            && scrumMessageJSON.userstory.tags !== ''){
            if(scrumMessageJSON.userstory.tags.length){


              for( var i = 0; i< scrumMessageJSON.userstory.tags.length; i++){
                params += "<p><span class='label label-info tags' >"+ scrumMessageJSON.userstory.tags[i] +"</span></p>";
              }

            }
          }


        }
        else if(scrumMessageJSON.field == 6) { /* description */
          params += "<p>Description changed: </p>";
          if(scrumMessageJSON.userstory.description !== null &&
            scrumMessageJSON.userstory.description !== undefined &&
            scrumMessageJSON.userstory.description !== '' ){

            params += "<p>"+scrumMessageJSON.userstory.description+"</p>";
          }


        }
        else if(scrumMessageJSON.field == 7) { /* requirement */

          params += "<p>Type changed: </p>";

          /* team, client, blocked */
          if(scrumMessageJSON.userstory.requirement !== undefined
            && scrumMessageJSON.userstory.requirement !== null
            && scrumMessageJSON.userstory.requirement !== ''){

            if(scrumMessageJSON.userstory.requirement.team == true
              || scrumMessageJSON.userstory.requirement.client == true
              || scrumMessageJSON.userstory.requirement.blocked == true) {


              if(scrumMessageJSON.userstory.requirement.team == true) {
                params += "<span class='label label-primary' >Team requirement</span>";

              }
              if(scrumMessageJSON.userstory.requirement.client == true) {
                params += "<span class='label label-primary' >Client requirement</span>";
              }
              if(scrumMessageJSON.userstory.requirement.blocked == true) {
                params += "<span class='label label-blocked' >Blocked</span>";
              }


            }
          }

        }
        else if(scrumMessageJSON.field == 8){ /* subject */
          params += "<p>Subject changed </p>";

        }
        /* habra que poner datos especificos del sprint */
        else if(scrumMessageJSON.field == 9){ /* sprint */
          params += "<p>Sprint changed </p>";

        }





        /*end else if*/
        else{
          params += '';
        }

        if(params == ''){
          return '';
        }
        else {
          body = "<div ng-if="+ '"' +msg.visible+'"' +"class='metadatalinks'>"+ params +"</div>";
          return body;

        }

      }



      /****************************** end new ***********************************/



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
