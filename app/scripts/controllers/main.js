'use strict';

/**
 * @ngdoc function
 * @name myAppAngularMinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppAngularMinApp
 */


angular.module('myAppAngularMinApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

//var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
  for (var i = 0 ; i < 3 ; i++) {

    var $element = $('.animation-element')[i];
    var element_height = $($element).outerHeight();
    var element_top_position;
    if(typeof $($element).offset() == 'undefined'){
      element_top_position = 0;
    } else {
      element_top_position = $($element).offset().top;
    }
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $($element).addClass('in-view');
    } else {
      $($element).removeClass('in-view');
    }
  }
}

$(window).load(function() {

  check_if_in_view();

  $window.on('scroll resize', check_if_in_view);

  $window.trigger('scroll');

  //$('.navbar-default').addClass('navbar-fixed-top');

});
