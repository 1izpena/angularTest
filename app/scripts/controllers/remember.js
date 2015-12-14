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
          if($localStorage.ResetToken !=null)
          {
            $localStorage.$reset();
          }
          $scope.storage = $localStorage.$default({
            ResetToken: res.data
          });
          
          
        },function(res)
        {
          alert(res.data.message);
          $scope.error = 1;
          $scope.message = res.data.message;
         
        });
      }
    };
});



