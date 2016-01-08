'use strict';

angular.module('myAppAngularMinApp')
  .factory('Socket', [function()
  {
    return io.connect('http://localhost:3000');
  }]);

