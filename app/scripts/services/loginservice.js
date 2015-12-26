/**
 * Created by urtzi on 09/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .service('LoginService', ['$http', '$localStorage', '$location', function($http, $localStorage, $location)
  {
    return {
      login: function(data) {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/auth/login',
          data: {mail: data.mail, password: data.password}
        });
      },
      logout: function() {
        if($localStorage.username !== null){
          $localStorage.$reset();
          $location.path('/');
        }
      },

      logoutLogin: function() {
        if($localStorage.username !== null){
          $localStorage.$reset();
          $location.path('/login');
        }
      },

      isLogged: function() {
        if($localStorage.username && $localStorage.token){
          return true;
        }
        return false;
      }
    };

  }]);
