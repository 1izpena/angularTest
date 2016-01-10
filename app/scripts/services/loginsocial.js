'use strict';

angular.module('myAppAngularMinApp')
  .service('loginsocial', ['$http', '$localStorage', '$location', function($http, $localStorage, $location)
  {
    return {
      login: function(user) {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/v1/auth/social',
          data: {username: user.name, id_social: user.id}
        });
      },
    };
  }]);