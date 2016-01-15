'use strict';

angular.module('myAppAngularMinApp')
  .service('loginsocial', ['$http', '$localStorage', 'API_BASE', function($http, $localStorage, API_BASE)
  {
    return {
      loginsocial: function(user) {
        return $http({
          method: 'POST',
          url: API_BASE+'/api/v1/auth/social',
          data: {username: user.name, id_social: user.id}
        });
      },
    };
  }]);
