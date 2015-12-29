'use strict';

/**
 * @ngdoc overview
 * @name myAppAngularMinApp
 * @description
 * # myAppAngularMinApp
 *
 * Main module of the application.
 */
angular
  .module('myAppAngularMinApp', [
    'myApp.config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })

      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
     .when('/remember', {
        templateUrl: 'views/remember.html',
        controller: 'RememberCtrl',
        controllerAs: 'remember'
      })
     .when('/reset/:token', {
        templateUrl: 'views/reset.html',
        controller: 'ResetCtrl',
        controllerAs: 'reset',
      })
      .when('/activate/:token', {
        templateUrl: 'views/activate.html',
        controller: 'ActivateCtrl',
        controllerAs: 'activate',
      })
      .when('/chat2', {
        templateUrl: 'views/chat2.html',
        controller: 'Chat2Ctrl',
        controllerAs: 'chat2'
      })
      .when('/foro', {
        templateUrl: 'views/foro.html',
        controller: 'ForoCtrl',
        controllerAs: 'foro',
      })
      .otherwise({
        redirectTo: '/'
      });

  }).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').accentPalette('green');

  });
