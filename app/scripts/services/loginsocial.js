'use strict';

angular.module('myAppAngularMinApp')
  .service('loginsocial', ['$http', '$localStorage', 'API_BASE', function($http, $localStorage, API_BASE)
  {
    return {
      loginsocial: function(user) {
        return $http({
          method: 'POST',
          url: API_BASE+'/api/v1/auth/social',
          data: {uid: user.name, mail: user.email, network: user.network}
        });
      },
    };
  }]);
