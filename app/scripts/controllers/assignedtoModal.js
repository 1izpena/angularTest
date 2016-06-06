/**
 * Created by izaskun on 5/06/16.
 */



angular.module('myAppAngularMinApp')
  .controller('assignedtoModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'ScrumService','data', '$sce',
    function ($scope, $uibModalInstance, $localStorage, ScrumService, data, $sce) {


      console.log("esto vale data en modal");
      console.log(data);


      $scope.membersSettingschannel = data.membersSettingschannel;
      $scope.taskid = data.taskid;
      $scope.groupid = data.groupid;
      $scope.channelid = data.channelid;
      $scope.userstoryid = data.userstoryid;
      $scope.oldvalue = data.oldvalue


      $scope.modalAssignedtoError = '';

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



      $scope.updateAssignedtoTask = function (member) {
        /*$scope.message = '';
        $scope.error = 0;
        $scope.success = 0;*/

        console.log("esto vake member en modal");
        console.log(member);


        console.log("esto vale en task");
        console.log($scope.taskid);
        console.log($scope.groupid);
        console.log($scope.channelid);


        if($scope.groupid !== undefined && $scope.groupid !== null && $scope.groupid !== '' &&
          $scope.channelid !== undefined && $scope.channelid !== null && $scope.channelid !== '' &&
          $scope.userstoryid !== undefined && $scope.userstoryid !== null && $scope.userstoryid !== '' &&
          $scope.taskid !== undefined && $scope.taskid !== null && $scope.taskid !== '' &&
          member.id !== undefined && member.id !== null && member.id !== '' ){


          ScrumService.updateAssignedtoTask($scope.groupid, $scope.channelid,
            $scope.userstoryid, $scope.taskid, member.id, $scope.oldvalue)
            .then(function(res){

              /*$scope.success =1;*/
              $uibModalInstance.close(res.data);


            },function(err){


              console.log("esto vale error, en modal");
              console.log(err);
              $scope.modalAssignedtoError =  res.data;


            });






        }
        else{
          $scope.modalAssignedtoError = 'Bad Request. Missing required parameters.';

        }




      };


      $scope.close = function ()
      {
        $scope.modalAssignedtoError = '';
        $scope.searchMemberChannelText = '';
        $uibModalInstance.dismiss();
      }


    }]);
