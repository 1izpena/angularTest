/**
 * Created by izaskun on 6/04/16.
 */


'use strict';

angular.module('myAppAngularMinApp')
  .service('GithubService', ['$http', '$localStorage', '$location', '$q', 'API_BASE',
    function($http, $localStorage, $location, $q, API_BASE) {

      return {

        getAuth: getAuth,
        createwebhooks: createwebhooks,
        getGithubAccounts: getGithubAccounts


      };




/*
* /:userid/github/accounts
* */

      function getGithubAccounts () {
        var defered = $q.defer();
        var promise = defered.promise;

        var userid = $localStorage.id;

        $http({
          method: 'get',
          url: API_BASE + '/api/v1/users/'+userid+'/github/accounts',
          headers: { 'x-access-token': $localStorage.token }

        }).then( function(result){
            defered.resolve(result);
          },
          function (err) {
            defered.reject(err);
          });
        return promise;
      }






      /****** new ***************/
      function getAuth (username, pass) {
        var defered = $q.defer();
        var promise = defered.promise;

        /* aqui no habría que pasarle el userid, sino la cuenta
         * que haya elegido ??????*/
        var userid = $localStorage.id;

        /* pass puede ir vacio */

        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+userid+'/github/auth',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' },
          data: 'username='+username+'&&pass='+pass
        }).then( function(result){
            defered.resolve(result);
          },
          function (err) {
            defered.reject(err);
          });
        return promise;
      }





      function createwebhooks (account, arrRepos, githubchannel, groupid) {

        /* comprobar que no son vacios */

        var defered = $q.defer();
        var promise = defered.promise;


        var userid = $localStorage.id;

        console.log("en el servicio esto se manda como arrrepos");
        console.log(arrRepos);

        /* hay que pasar el nombre y el tipo del canal y el id del grupo */
        $http({
          method: 'post',
          url: API_BASE + '/api/v1/users/'+userid+'/github/createHooks',
          dataType:'application/json',
          headers: { 'x-access-token': $localStorage.token, 'Content-Type': 'application/x-www-form-urlencoded' },
          data: 'repositories='+JSON.stringify(arrRepos)+'&&account='+JSON.stringify(account)+
                '&&githubchannel='+JSON.stringify(githubchannel)+'&&groupid='+groupid
        }).then( function(result){
            defered.resolve(result);
          },
          function (err) {
            defered.reject(err);
          });
        return promise;
      }







    }]);

