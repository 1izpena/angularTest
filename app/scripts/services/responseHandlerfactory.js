'use strict';

angular.module('myAppAngularMinApp')

  .factory('responseHandler', ['$q', '$injector', 'sharedProperties', function($q, $injector, sharedProperties) {
    var responseHandler = {
      responseError: function(response) {
        // Session has expired
        if (response.status == 419){
          var message = 'Session expired. Please log in again.'
          sharedProperties.setMessage(message);
          var location = $injector.get('$location');

          window.localStorage.removeItem('userid');
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('token');
          location.path('/login');


          return response;

        }
        else {
          // To execute errorCallback
          return $q.reject(response);
        }
      }
    };
    return responseHandler;
  }]);
