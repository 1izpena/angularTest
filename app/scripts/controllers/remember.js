'use strict';


angular.module('myAppAngularMinApp')
    .controller('RememberCtrl', function ($scope, ResetService, $location, $localStorage) { //nombre del controlador y ambito del scope

//Comprobar q el email existe

   $scope.check = function(){
      $scope.message = '';
      $scope.error = 0;
      if($scope.FormData.mail)
      {
        ResetService.check($scope.FormData).then(function(res)
        {
          $scope.storage = $localStorage.$default({
            ResetToken: res.data
          });
        },function(res)
        {
          $scope.error = 1;
          $scope.message = res.data.message;
        });
      }
    }
});


 
