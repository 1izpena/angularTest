'use strict';

angular.module('myAppAngularMinApp')

  .directive('scrollBottomOnLast', ['$timeout', function ($timeout) {
    return {
      scope: {
        scrollToBottom: "="
      },
      link: function ($scope, $element) {

        $scope.$parent.$on('repeatLastElem', function(event){
          $timeout(function() {
            $element.scrollTop($element[0].scrollHeight);
          }, 500);
        });
      }
    }
  }]);
