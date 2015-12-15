'use strict';

/**
 * @ngdoc directive
 * @name myAppAngularMinApp.directive:pwCheck
 * @description
 * # pwCheck
 */
angular.module('myAppAngularMinApp')
  .directive('pwCheck', ['$parse',function ($parse) {
    return {
      require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
          var originalModel = $parse(attrs.pwCheck),
              secondModel = $parse(attrs.ngModel);
          // Watch for changes to this input
          scope.$watch(attrs.ngModel, function (newValue) {
            ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
          });
          // Watch for changes to the value-matches model's value
          scope.$watch(attrs.pwCheck, function (newValue) {
            ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
          });
        }
      };
}]);
