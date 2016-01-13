'use strict';

/**
 * @ngdoc function
 * @name myAppAngularMinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppAngularMinApp
 */


angular.module('myAppAngularMinApp')
  .controller('MainCtrl', function ($scope, LoginService, sharedProperties, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.auth = LoginService;

    $scope.goTo = function(url, from) {
      if (from === 'chat'){
          sharedProperties.setProperty('/chat2');
      }
      else if (from === 'foro'){
          sharedProperties.setProperty('/');
      }
      $location.path(url);
    };

    $scope.logout = function(){
      LoginService.logout();
    };

  });


//var $animation_elements = $('.animation-element');
var $window = $(window);

function checkIfInView() {
  var windowHeight = $window.height();
  var windowTopPosition = $window.scrollTop();
  var windowBottomPosition = (windowTopPosition + windowHeight);
  for (var i = 0 ; i < 3 ; i++) {

    var $element = $('.animation-element')[i];
    var elementHeight = $($element).outerHeight();
    var elementTopPosition;
    if(typeof $($element).offset() === 'undefined'){
      elementTopPosition = 0;
    } else {
      elementTopPosition = $($element).offset().top;
    }
    var elementBottomPosition = (elementTopPosition + elementHeight);

    //check to see if this current container is within viewport
    if ((elementBottomPosition >= windowTopPosition) &&
      (elementTopPosition <= windowBottomPosition)) {
      $($element).addClass('in-view');
    } else {
      $($element).removeClass('in-view');
    }
  }
}

$(window).load(function() {

  $window.on('scroll resize', checkIfInView);

  $window.trigger('scroll');

});
