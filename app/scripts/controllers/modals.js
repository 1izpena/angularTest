'use strict';

angular.module('myAppAngularMinApp')
  .controller('uploadModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
    function ($scope, $uibModalInstance, inputData, $localStorage, ChatService) {

      $scope.filename = inputData.file.name;
      $scope.uploading = false;
      $scope.errors = false;

      $scope.ok = function () {

        $scope.progress=0;
        $scope.uploading = true;

        var uploadData = {
          userid: $localStorage.id,
          groupid: inputData.groupid,
          channelid: inputData.channelid,
          file: inputData.file,
          filename: inputData.file.name,
          messageType: 'FILE'
        };

        if ($scope.comment) {
          uploadData.comment = $scope.comment;
        }

        ChatService.uploadFileS3(uploadData).then(
          function (result) {

            ChatService.postMessage(uploadData).then(
              function (result) {
                //$uibModalInstance.close();
              },
              function (error) {
                $scope.errors = true;
                $scope.errorMessage = "Error sending file to server";
                console.log("Error en postMessage");
                console.log(error);
              }
            );
            $uibModalInstance.close();

          },
          function (error) {
            $scope.errors = true;
            $scope.errorMessage = "Error sending file to server";
            console.log("Error en uploadFileS3");
            console.log(error);
          },
          function (progress) {
            $scope.progress = Math.min(100, parseInt(100.0 * progress.loaded / progress.total));
          }
        );
      };

      $scope.cancel = function () {
        if ($scope.uploading) {
          ChatService.cancelUploadFile();
        }
        $uibModalInstance.dismiss();
      };

      $scope.close = function () {
        $uibModalInstance.dismiss();
      };



    }]);
