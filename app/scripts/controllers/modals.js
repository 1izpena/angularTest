'use strict';

angular.module('myAppAngularMinApp')
  .controller('uploadModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
    function ($scope, $uibModalInstance, data, $localStorage, ChatService) {

      var inputData = data;

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



    }])

  .controller('questionModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
  function ($scope, $uibModalInstance, data, $localStorage, ChatService) {

    $scope.ok = function () {

      if (!$scope.title) {
        $scope.errorMessage = "Question title required";
      }
      else if (!$scope.question) {
        $scope.errorMessage = "Question text required";
      }
      else {
        var requestData = {
          userid: $localStorage.id,
          groupid: data.groupid,
          channelid: data.channelid,
          title: $scope.title,
          text: $scope.question,
          messageType: 'QUESTION'
        };

        ChatService.postMessage(requestData).then(
          function (result) {
            $uibModalInstance.close();
          },
          function (error) {
            $scope.errorMessage="Error sending question";
            console.log("Error sending question");
            console.log(error);
          }
        );

        $uibModalInstance.close();
      }


    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

  }])

  .controller('answerModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
    function ($scope, $uibModalInstance, data, $localStorage, ChatService) {

      $scope.ok = function () {

        if (!$scope.answer) {
          $scope.errorMessage = "Answer text required"
        }
        else {
          var requestData = {
            userid: $localStorage.id,
            groupid: data.groupid,
            channelid: data.channelid,
            messageid: data.messageid,
            text: $scope.answer,
            messageType: 'QUESTION'
          };

          ChatService.postAnswer(requestData).then(
            function (result) {
              console.log(result);
              $uibModalInstance.close();
            },
            function (error) {
              $scope.errorMessage="Error sending answer";
              console.log("Error sending answer");
              console.log(error);
            }
          );

          $uibModalInstance.close();
        }


      };


      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };

    }]);
