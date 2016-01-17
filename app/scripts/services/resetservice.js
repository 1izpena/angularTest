/**
 * Created by urtzi on 09/12/2015.
 */
'use strict';
angular.module('myAppAngularMinApp')
  .service('ResetService', ['$http', 'API_BASE', function($http, $API_BASE)
  {
    return {
      check: function(data) {
        return $http({
          method: 'POST',
          url: API_BASE+'/api/v1/auth/forget',
          data: {mail: data.mail}
        });
      },
      activate: function(token) {
        return $http({
          method: 'POST',
          url: API_BASE+'/api/v1/auth/activate',
          data: {token: token}
        });
      },
      reset: function(data,token){
        return $http({
          method:'POST',
          url:API_BASE+'/api/v1/auth/reset',
          data: {token: token , password: data.password}
        });
      }
    };
  }]);


