/**
 * Created by izaskun on 18/06/16.
 */



angular.module('myAppAngularMinApp')
  .controller('assignedtoIssueModalCtrl', ['$scope', '$uibModalInstance',  '$localStorage', 'ScrumService','data', '$sce','md5',
    function ($scope, $uibModalInstance, $localStorage, ScrumService, data, $sce, md5) {


      console.log("esto vale data en modal");
      console.log(data);


      $scope.membersSettingschannel = data.membersSettingschannel;
      $scope.issueid = data.issueid;
      $scope.groupid = data.groupid;
      $scope.channelid = data.channelid;
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



      $scope.unassignedIssueModal = function () {
        if($scope.groupid !== undefined && $scope.groupid !== null && $scope.groupid !== '' &&
          $scope.channelid !== undefined && $scope.channelid !== null && $scope.channelid !== '' &&
          $scope.issueid !== undefined && $scope.issueid !== null && $scope.issueid !== '' ){


          var field = 'unassignedto';
          var newvalue = {};


          ScrumService.updateIssue($scope.groupid, $scope.channelid, $scope.issueid,
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





      $scope.updateAssignedtoIssue = function (member) {



        if($scope.groupid !== undefined && $scope.groupid !== null && $scope.groupid !== '' &&
          $scope.channelid !== undefined && $scope.channelid !== null && $scope.channelid !== '' &&
          $scope.issueid !== undefined && $scope.issueid !== null && $scope.issueid !== '' &&
          member.id !== undefined && member.id !== null && member.id !== '' ){


          ScrumService.updateAssignedtoIssue($scope.groupid, $scope.channelid,
            $scope.issueid, member.id, $scope.oldvalue)
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
