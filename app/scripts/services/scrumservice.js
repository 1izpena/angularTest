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
        updateUSsSprint: updateUSsSprint,
        unassignedUSsFromSprint: unassignedUSsFromSprint,
        createRelatedTask: createRelatedTask,
        updateContributorsTask: updateContributorsTask,
        updateAssignedtoTask: updateAssignedtoTask,
        updateTask: updateTask,
        deleteTasks: deleteTasks,
        deleteUSs : deleteUSs,
        getSprints: getSprints,
        createSprint: createSprint,
        editSprint: editSprint,
        deleteSprints: deleteSprints,
        getIssues: getIssues,
        createIssue: createIssue


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




      /* add contributor */
      function updateContributorsTask(groupid, channelid, userstoryid, taskid, memberid) {

        //puedo coger en el servidor el valor anterior
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        var changesintask = {};

        changesintask.field = 'contributors';
        changesintask.fieldnewvalue = memberid;


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


















      /*updateAssignedtoTask($scope.groupid, $scope.channelid,$scope.taskid, member)*/
      function updateAssignedtoTask(groupid, channelid, userstoryid, taskid, memberid, oldvalue) {

        //puedo coger en el servidor el valor anterior
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        var changesintask = {};

        changesintask.field = 'assignedto';
        changesintask.fieldnewvalue = memberid;
        changesintask.fieldoldvalue = oldvalue;


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





      function updateTask(groupid, channelid, userstoryid, taskid, newvalue, oldvalue, field) {

        //puedo coger en el servidor el valor anterior
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        var changesintask = {};

        changesintask.field = field;
        changesintask.fieldnewvalue = newvalue;
        changesintask.fieldoldvalue = oldvalue;

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





      function unassignedUSsFromSprint(groupid, channelid, arrUSUpdate){

        var defered = $q.defer();
        //var promise = defered.promise;

        var userid = $localStorage.id;

        var promise = $q.all(null);
        var responsesUpdate = [];


        var changesinuserstory = {};
        changesinuserstory.field = 'unsprint';



        angular.forEach(arrUSUpdate, function(userstoryid){

          promise = promise.then(function(){
            return $http({
              method: 'put',
              url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid,
              headers: { 'x-access-token': $localStorage.token },
              data: changesinuserstory

            }).then(function(res){
              responsesUpdate.push(res.data);
            });
          });
        });

        promise.then(function(){
          defered.resolve(responsesUpdate);

        });

        return defered.promise;

      };













      function updateUSsSprint(groupid, channelid, sprintid, arrUSUpdate){

        var defered = $q.defer();
        //var promise = defered.promise;

        var userid = $localStorage.id;

        var promise = $q.all(null);
        var responsesUpdate = [];


        var changesinuserstory = {};
        changesinuserstory.userstory = {};
        changesinuserstory.userstory.sprint = sprintid;

        changesinuserstory.field = 'sprint';







        angular.forEach(arrUSUpdate, function(userstoryid){
          changesinuserstory.userstory.sprint = sprintid;

          promise = promise.then(function(){
            return $http({
              method: 'put',
              url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid,
              headers: { 'x-access-token': $localStorage.token },
              data: changesinuserstory

            }).then(function(res){
              responsesUpdate.push(res.data);
            });
          });
        });

        promise.then(function(){
          defered.resolve(responsesUpdate);

        });

        return defered.promise;

      };






      function deleteUSs(groupid, channelid, arrUSRemove){

        var defered = $q.defer();
        //var promise = defered.promise;

        var userid = $localStorage.id;

        var promise = $q.all(null);
        var responsesDelete = [];

        angular.forEach(arrUSRemove, function(userstoryid){
          promise = promise.then(function(){
            return $http({
              method: 'delete',
              headers: {'x-access-token': $localStorage.token},
              url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid,

            }).then(function(res){
              responsesDelete.push(res.data);
            });
          });
        });

        promise.then(function(){
          defered.resolve(responsesDelete);

        });

        return defered.promise;

      };





      function deleteSprints(groupid, channelid, arrSprintsRemove){

        var defered = $q.defer();
        //var promise = defered.promise;

        var userid = $localStorage.id;

        var promise = $q.all(null);
        var responsesDelete = [];

        angular.forEach(arrSprintsRemove, function(sprintid){
          promise = promise.then(function(){
            return $http({
              method: 'delete',
              headers: {'x-access-token': $localStorage.token},
              url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/sprints/'+ sprintid,

            }).then(function(res){
              responsesDelete.push(res.data);
            });
          });
        });

        promise.then(function(){
          defered.resolve(responsesDelete);

        });

        return defered.promise;

      };













      function deleteTasks(groupid, channelid, userstoryid, arrTaskRemove){

        var defered = $q.defer();
        //var promise = defered.promise;

        var userid = $localStorage.id;

        var promise = $q.all(null);
        var responsesDelete = [];

        angular.forEach(arrTaskRemove, function(taskid){
          promise = promise.then(function(){
            return $http({
              method: 'delete',
              headers: {'x-access-token': $localStorage.token},
              url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/userstories/'+ userstoryid+'/tasks/'+ taskid,

            }).then(function(res){
              responsesDelete.push(res.data);
            });
          });
        });

        promise.then(function(){
          defered.resolve(responsesDelete);

        });

        return defered.promise;

      };




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




      function editSprint(groupid, channelid, sprint) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'put',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/sprints/'+sprint.id,
          headers: { 'x-access-token': $localStorage.token },
          data: sprint

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







      function createSprint(groupid, channelid, sprint) {

        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;


        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/sprints',
          headers: { 'x-access-token': $localStorage.token },
          data: sprint

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



      function createIssue(groupid, channelid, issue) {
        var defered = $q.defer();
        var promise = defered.promise;
        var userid = $localStorage.id;



        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+ userid +'/chat/groups/'+ groupid +'/channels/'+ channelid +'/issues',
          headers: { 'x-access-token': $localStorage.token },
          data: issue

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
