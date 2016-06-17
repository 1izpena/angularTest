/**
 * Created by izaskun on 5/06/16.
 */



angular.module('myAppAngularMinApp')
  .controller('assignedtoModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'ScrumService','data', '$sce','md5',
    function ($scope, $uibModalInstance, $localStorage, ScrumService, data, $sce, md5) {


      console.log("esto vale data en modal");
      console.log(data);


      $scope.membersSettingschannel = data.membersSettingschannel;
      $scope.taskid = data.taskid;
      $scope.groupid = data.groupid;
      $scope.channelid = data.channelid;
      $scope.userstoryid = data.userstoryid;
      $scope.oldvalue = data.oldvalue


      $scope.modalAssignedtoError = '';


      $scope.getHash = function (str) {
        if (str)
          return md5.createHash(str);
        else
          return "";
      };









      $scope.highlight = function(text, search) {
        if (!search) {
          return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
      };



      $scope.unassignedTaskModal = function () {
        if($scope.groupid !== undefined && $scope.groupid !== null && $scope.groupid !== '' &&
          $scope.channelid !== undefined && $scope.channelid !== null && $scope.channelid !== '' &&
          $scope.userstoryid !== undefined && $scope.userstoryid !== null && $scope.userstoryid !== '' &&
          $scope.taskid !== undefined && $scope.taskid !== null && $scope.taskid !== '' ){


          var field = 'unassignedto';
          var newvalue = {};


          ScrumService.updateTask($scope.groupid, $scope.channelid,
            $scope.userstoryid, $scope.taskid,
            newvalue, $scope.oldvalue, field)
            .then(function (res) {

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





      $scope.updateAssignedtoTask = function (member) {



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
              $scope.modalAssignedtoError =  err.data.message;


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
        $("#searchmember-modal").val('').trigger('input');
        $uibModalInstance.dismiss();
      }


    }]);
