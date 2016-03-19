'use strict';

angular.module('myAppAngularMinApp')




  .controller('uploadModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
    function ($scope, $uibModalInstance, data, $localStorage, ChatService) {

      var inputData = data;

      if(data.file.length){
        inputData.file = inputData.file[0];
      }

      console.log("esto vale data en modals.js uploadModalCtr");
      console.log(data);



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




  /*************** new **************/

  .controller('openFileModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService', 'Upload',
    function ($scope, $uibModalInstance, data, $localStorage, ChatService, Upload) {



      $scope.$watch('files', function () {

        console.log($scope.files);
        //si files son varios ficheros, es 1 carpeta :: error
        if($scope.files){
          if($scope.files.length > 1){

            // recogemos el normbre de la carpeta
            var temfilepath = $scope.files[0].path;
            var temfilepath2 = temfilepath.split('/');

            $scope.filepath = temfilepath2[0];
            $scope.errorsFolder=true;

          }
          else{
            $scope.upload($scope.files);

          }
        }


      });

      $scope.$watch('file', function () {
        if ($scope.file != null) {
          $scope.files = [$scope.file];
        }
      });

      $scope.log = '';

      $scope.upload = function (files) {
        $scope.files = files;


        if (files && files.length) {

          // no voy a dejar subir multipes asique si files.length es mayor que 1
          // lo redireccionamos y cerramos
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.$error) {


              //$scope.confirmUploadFile

              var inputData = data;

              $scope.filename = file.name;
              $scope.uploading = false;
              $scope.errors = false;

/*
       JSON.stringify(resp.data) +

*/


            }
          }
        }



        $scope.ok = function () {

          $scope.progress=0;
          $scope.uploading = true;

          var uploadData = {
            userid: $localStorage.id,
            groupid: inputData.groupid,
            channelid: inputData.channelid,
            file: file,
            filename: file.name,
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
              console.log("progress: ");
              console.log($scope.progress);
            }
          );
        };




      };

      $scope.cancel = function () {
        if ($scope.uploading) {
          ChatService.cancelUploadFile();
        }
        $uibModalInstance.dismiss();
      };

      $scope.cancelError = function () {
        if ($scope.uploading) {
          ChatService.cancelUploadFile();
        }
        $uibModalInstance.dismiss();
        $scope.filepath = '';


      };

      $scope.close = function () {
        $uibModalInstance.dismiss();
      };



    }])

/**************** end new *******************/




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

    }])

.controller('publishMessageModalCtrl', ['$scope', '$uibModalInstance', 'data', '$localStorage', 'ChatService',
  function ($scope, $uibModalInstance, data, $localStorage, ChatService) {

    $scope.message = data.message;

    $scope.ok = function () {

      if (!$scope.tags) {
        $scope.errorMessage = "Tags required"
      }
      else {
        var requestData = {
          userid: $localStorage.id,
          groupid: data.groupid,
          channelid: data.channelid,
          messageid: data.message.id,
          tags: $scope.tags
        };

        ChatService.publishMessage(requestData).then(
          function(result) {
            $uibModalInstance.close();

          },
          function(error) {
            console.log("error publishing message in forum");
            console.log(error);
          }
        );

      }


    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

  }]);
