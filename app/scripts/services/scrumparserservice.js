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



    function parseUserstory(scrumMessageJSON) {

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

      if(scrumMessageJSON.sender !== null &&
        scrumMessageJSON.sender !== undefined &&
        scrumMessageJSON.sender !== '' &&
        scrumMessageJSON.userstory !== null &&
        scrumMessageJSON.userstory !== undefined &&
        scrumMessageJSON.userstory !== ''){

        projectParse = getProjectFields();
        actionParse = getActionFields(scrumMessageJSON);
        userstoryHeaderParse = getHeaderFields(scrumMessageJSON);
        userstoryBodyParse = getBodyFields (scrumMessageJSON);



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
            senderlink = " by <a ng-click='"+ viewUserProfile(scrumMessageJSON.sender.id) +
              "'> scrumMessageJSON.sender.username </a> "

          }
          else{
            senderlink = " by " +scrumMessageJSON.sender.username;
          }

        }
        actionfields = "<p> Userstory " + action + " " + senderlink + " </p>"

        return actionfields;

      };


      function getHeaderFields(){
        /* (3) #num [Subject] con link  */


        var header = "";
        var num = 0;
        var subject = "";

        if(scrumMessageJSON.userstory.num == null ||
          scrumMessageJSON.userstory.num == undefined ||
          scrumMessageJSON.userstory.num == '' ){

          num = scrumMessageJSON.userstory.num;

        }

        if(scrumMessageJSON.userstory.subject == null ||
          scrumMessageJSON.userstory.subject == undefined ||
          scrumMessageJSON.userstory.subject == '' ){

          subject = scrumMessageJSON.userstory.subject;

        }


        if(scrumMessageJSON.userstory.id !== null &&
          scrumMessageJSON.userstory.id !== undefined &&
          scrumMessageJSON.userstory.id !== ''){

          header = "<p><strong> #" + num + " </strong>" +
            "<a ng-click='"+ viewUserstory(scrumMessageJSON.userstory.id) +"'>subject</a> </p>";
        }
        else{
          header = "<p><strong> #" + num + " </strong> subject </p>";

        }

        return header;



      }









      function getBodyFields(){
        /* (3) <metadatalinks>
          *  Votes :
           * Total points :
           *
           * Description : xxx, si tiene "<div class='metadatalinks'>";
           * */

        var params = "";
        var body = "";

        var pux = 0;
        var pdes = 0;
        var pfront = 0;
        var pback= 0;
        var totalpoints = 0;

        if(scrumMessageJSON.userstory.votes !== null &&
          scrumMessageJSON.userstory.votes !== undefined &&
          scrumMessageJSON.userstory.votes !== '' ){

          params = "<p> Votes: "+scrumMessageJSON.userstory.votes+"</p>";

        }

        if(scrumMessageJSON.userstory.points !== null &&
          scrumMessageJSON.userstory.points !== undefined &&
          scrumMessageJSON.userstory.points !== '' ){

          if(scrumMessageJSON.userstory.points.ux !== null &&
            scrumMessageJSON.userstory.points.ux !== undefined &&
            scrumMessageJSON.userstory.points.ux !== '' ){
            pux = parseFloat(scrumMessageJSON.userstory.points.ux);


          }
          if(scrumMessageJSON.userstory.points.design !== null &&
            scrumMessageJSON.userstory.points.design !== undefined &&
            scrumMessageJSON.userstory.points.design !== '' ){
            pdes = parseFloat(scrumMessageJSON.userstory.points.design);


          }

          if(scrumMessageJSON.userstory.points.front !== null &&
            scrumMessageJSON.userstory.points.front !== undefined &&
            scrumMessageJSON.userstory.points.front !== '' ){
            pfront = parseFloat(scrumMessageJSON.userstory.points.front);


          }
          if(scrumMessageJSON.userstory.points.back !== null &&
            scrumMessageJSON.userstory.points.back !== undefined &&
            scrumMessageJSON.userstory.points.back !== '' ){
            pback = parseFloat(scrumMessageJSON.userstory.points.back);


          }
          totalpoints = pux + pdes + pfront+ pback;

          params = params + "<p> Points: "+totalpoints+"</p>";

        }
        if(scrumMessageJSON.status !== null &&
          scrumMessageJSON.status !== undefined &&
          scrumMessageJSON.status !== '' ){




          /* pondria 1 cuadradito de color:: verde new */
          /* NEW, READY, INPROGRESS, READYTEST, DONE */
          var btnclass= "btn-default";

          if(scrumMessageJSON.status == "New"){
            btnclass= "btn-primary";

          }

          else if (scrumMessageJSON.status == "In progress"){
            btnclass= "btn-info";

          }
          else if (scrumMessageJSON.status == "Ready for test"){
            btnclass= "btn-warning";

          }
          else if (scrumMessageJSON.status == "Done"){
            btnclass= "btn-success";

          }

          params = params + "<p><button type='button' class='btn"+ btnclass +"'>"+ scrumMessageJSON.status +"</button></p>";



        }



        if(scrumMessageJSON.userstory.description !== null &&
          scrumMessageJSON.userstory.description !== undefined &&
          scrumMessageJSON.userstory.description !== '' ){
          params = params + "<p> <i>"+scrumMessageJSON.userstory.description+"</i></p>";


        }


        return body;



      }



    function parseScrumEvents(scrumMessageJSON) {

      var messageText = '';

      if(scrumMessageJSON !== null &&
        scrumMessageJSON !== undefined &&
        scrumMessageJSON !== ''){
        var messageEventType = scrumMessageJSON.event;


        if(messageEventType == "userstory"){

          /* llamamos al parseo de eventos push */
          messageText = parseUserstory(scrumMessageJSON);


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
