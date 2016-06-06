/**
 * Created by izaskun on 24/05/16.
 */


'use strict';

angular.module('myAppAngularMinApp')
  .service('ScrumService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {

        getUserstories: getUserstories,
        createUserstory: createUserstory,
        updateUserstory: updateUserstory,
        createRelatedTask: createRelatedTask,
        updateAssignedtoTask: updateAssignedtoTask,
        getSprints: getSprints,
        getIssues: getIssues


      };



      function getUserstories(groupid, channelid) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' }

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
        return promise;

      };


      function createUserstory(groupid, channelid, userstory) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;

        var userstoryTagsTemp = [];

        /* tags es 1 array con property text */
        /* hay que parsearlo para que sea 1 array de strings */

        if(userstory.tags !== undefined && userstory.tags !== null && userstory.tags !== '' ){
          if(userstory.tags.length){
            for( var i = 0; i< userstory.tags.length; i++){
              userstoryTagsTemp.push(userstory.tags[i].text);

            }

            userstory.tags = userstoryTagsTemp;
          }
        }

        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories',
          headers: { 'x-access-token': $localStorage.token },
          data: userstory

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );

        return promise;

      };



      function createRelatedTask(groupid, channelid, userstory, task) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+userstory.id+'/tasks',
          headers: { 'x-access-token': $localStorage.token },
          data: task

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );

        return promise;

      };

      /*updateAssignedtoTask($scope.groupid, $scope.channelid,$scope.taskid, member)*/



      function updateAssignedtoTask(groupid, channelid, userstoryid, taskid, memberid, oldvalue) {

        //puedo coger en el servidor el valor anterior
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        var changesintask = {};

        changesintask.field = 'assignedto';
        changesintask.fieldnewvalue = memberid;
        console.log("esto vale old value");
        console.log(oldvalue);
        changesintask.fieldoldvalue = oldvalue;
        /* lo usamos para points + tags */
        /*changesinuserstory.codepoints = code;*/


        /*console.log("********************************");
        console.log("esto vale code");
        console.log(code);*/



        $http({
          method: 'put',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid+'/tasks/'+ taskid,
          headers: { 'x-access-token': $localStorage.token },
          data: changesintask

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );

        return promise;

      };








      /*********************************************************/

      function updateUserstory(groupid, channelid, userstory, field, code) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;
        var userstoryid = userstory.id;

        var changesinuserstory = {};
        changesinuserstory.userstory = userstory;
        changesinuserstory.field = field;
        /* lo usamos para points + tags */
        changesinuserstory.codepoints = code;


        console.log("********************************");
        console.log("esto vale code");
        console.log(code);



        $http({
          method: 'put',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid,
          headers: { 'x-access-token': $localStorage.token },
          data: changesinuserstory

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );

        return promise;

      };










      function getSprints(groupid, channelid) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/sprints',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' }

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
        return promise;

      };


      function getIssues(groupid, channelid) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/issues',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' }

        }).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
          }
        );
        return promise;

      };










    }]);
