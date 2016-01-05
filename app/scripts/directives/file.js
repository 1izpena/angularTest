'use strict';

angular.module('myAppAngularMinApp')
  .directive('file', function(){
    return {
      restrict: 'A',
      scope: {
        file: '=',
        uploadFn: '&uploadFn'
      },
      link: function(scope, element){
        element.bind('change', function(event){
          var files = event.target.files;
          var file = files[0];
          scope.file = file ? file : undefined;
          scope.$apply();

          if (file) {
            scope.uploadFn();
          }
        });
      }
    };
  });
