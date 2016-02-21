'use strict';

angular.module('myAppAngularMinApp').
directive('popoverGroup', function() {
  return function(scope, elem) {
    elem.popover({html: true,content: function() {return $('#groupNotificationList').html();}});
  }
});
