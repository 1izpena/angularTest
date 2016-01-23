'use strict';


angular.module('myAppAngularMinApp')
    .controller('RememberCtrl', function ($scope, ResetService, $location, $localStorage) { //nombre del controlador y ambito del scope

//Comprobar q el email existe
 $scope.FormVisibility = true;
   $scope.check = function(){

      $scope.message = '';
      $scope.error = 0;
      if($scope.FormData.mail)
      {
        //esconder Form
      $scope.FormVisibility = false;
      $scope.ResponseVisibility = true;

        ResetService.check($scope.FormData).then(function(res)
        {
         /* if($localStorage.ResetToken !=null)
          {
            delete $localStorage.ResetToken;
          }

          $localStorage.ResetToken = res.data;
          */

          if(res.data=="error"){ // control error envio mail
            //Mostrar error
            $scope.FormVisibility = false;
            $scope.ResponseVisibility = false;
            $scope.ResponseError = true;
          }


        },function(res)
        {
          alert(res.data.message);
          $scope.error = 1;
          $scope.message = res.data.message;

        });
      }
    };
});



