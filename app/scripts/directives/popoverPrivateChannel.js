'use strict';

angular.module('myAppAngularMinApp').
directive('popoverPrivateChannel', function() {
  return function(scope, elem) {
    elem.popover({html: true,content: function() {return $('#privateChannelNotificationList').html();}});
  }
});
