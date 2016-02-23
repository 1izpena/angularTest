'use strict';

angular.module('myAppAngularMinApp').
directive('popoverPublicChannel', function() {
  return function(scope, elem) {
    elem.popover({html: true,content: function() {return $('#publicChannelNotificationList').html();}});
  }
});
