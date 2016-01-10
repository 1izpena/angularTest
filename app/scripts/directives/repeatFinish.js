'use strict';

angular.module('myAppAngularMinApp')
  .directive('sendLast', function() {
    return function(scope, element, attrs) {
      if (scope.$last){
        scope.$emit('repeatLastElem');
      }
    };
  })
