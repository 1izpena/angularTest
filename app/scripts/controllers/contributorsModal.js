/**
 * Created by izaskun on 8/06/16.
 */


angular.module('myAppAngularMinApp')
  .controller('contributorsModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'ScrumService','data', '$sce',
    function ($scope, $uibModalInstance, $localStorage, ScrumService, data, $sce) {


      console.log("esto vale data en modal");
      console.log(data);

      /* tengo que saber a quien esta assignado y quitarlo
      * y quien ya es contributor para quitarlo
      * tengo que hacer lo mismo en el servidor */

      $scope.membersSettingschannel = data.membersSettingschannel;
      $scope.taskid = data.taskid;
      $scope.groupid = data.groupid;
      $scope.channelid = data.channelid;
      $scope.userstoryid = data.userstoryid;



      $scope.modalContributorsError = '';

      /* es 1 array con todos los miembros, queremos pasar a otro arraytemp aquellos
      * que no estan ya como contribuyentes ni como assigned */



      /*
       $scope.membersSettingschannel = membersSettingschannel;
       $scope.task = task;*/


      /*$scope.answerid=answerid;
       $scope.questionid=questionid;*/


      $scope.highlight = function(text, search) {
        if (!search) {
          return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
      };



      $scope.addContributorTask = function (member) {
        /*$scope.message = '';
         $scope.error = 0;
         $scope.success = 0;*/



        if($scope.groupid !== undefined && $scope.groupid !== null && $scope.groupid !== '' &&
          $scope.channelid !== undefined && $scope.channelid !== null && $scope.channelid !== '' &&
          $scope.userstoryid !== undefined && $scope.userstoryid !== null && $scope.userstoryid !== '' &&
          $scope.taskid !== undefined && $scope.taskid !== null && $scope.taskid !== '' &&
          member.id !== undefined && member.id !== null && member.id !== '' ){


          ScrumService.updateContributorsTask($scope.groupid, $scope.channelid,
            $scope.userstoryid, $scope.taskid, member.id)
            .then(function(res){

              /*$scope.success =1;*/
              $uibModalInstance.close(res.data);


            },function(err){


              console.log("esto vale error, en modal");
              console.log(err);
              $scope.modalAssignedtoError =  err.data.message;


            });






        }
        else{
          $scope.modalAssignedtoError = 'Bad Request. Missing required parameters.';

        }




      };


      $scope.close = function ()
      {
        $scope.modalContributorsError = '';
        $scope.searchMemberChannelText = '';
        $("#searchmember-modal").val('').trigger('input');
        $uibModalInstance.dismiss();
      }


    }]);
