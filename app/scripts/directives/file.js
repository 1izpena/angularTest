'use strict';

angular.module('myAppAngularMinApp')
  .directive('file', function(){
    return {
      scope: {
        file: '='
      },
      link: function(scope, element){
        element.bind('change', function(event){
          var files = event.target.files;
          var file = files[0];
          scope.file = file ? file.name : undefined;
          scope.$apply();
        });
      }
    };
  });
