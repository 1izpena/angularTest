'use strict';

angular.module('myAppAngularMinApp')
  .factory('Socket', ['API_BASE', function(API_BASE)
  {
    return io.connect(API_BASE);
  }]);

