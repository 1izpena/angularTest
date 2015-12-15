/**
 * Created by urtzi on 09/12/2015.
 */
'use strict';
angular.module('myAppAngularMinApp')
  .service('ResetService', ['$http', function($http)
  {
    return {
      check: function(data) {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/auth/forget',
          data: {mail: data.mail}
        });
      },
      reset: function(data,token){
        return $http({
          method:'POST',
          url:'http://localhost:3000/api/v1/auth/reset',
          data: {token: token , password: data.password}
        });
      }
    };
  }]);


