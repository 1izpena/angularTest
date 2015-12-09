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
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
        /*
        resolve: {
          load: ['injectCSS', function (injectCSS) {
            return injectCSS.set("login", "login.css");
          }]
        }
        */
      })
      .otherwise({
        redirectTo: '/'
      });

  }).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').accentPalette('green');

  }).service('LoginService', ['$http', function($http)
  {
    return {
      login: function(data)
      {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/auth/login',
          data: {mail: data.mail, password: data.password}
        });
      },
      logout: function()
      {
        return $http({
          method: 'GET',
          url: '/api/v1/auth/logout'
        });
      }
    }
  }]);
