'use strict';

angular.module('myAppAngularMinApp').
directive('popoverChannel', function() {
  return function(scope, elem) {
    elem.popover({html: true,content: function() {return $('#channelNotificationList').html();}});
  }
});
