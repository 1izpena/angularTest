'use strict';

angular.module('myAppAngularMinApp')
  .controller('LoginScl', function ($scope, loginsocial, $location, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = 0;

    $scope.goTo = function(url) {
      $location.path(url);
    };

      //login redes sociales

hello.init({
    facebook : '521665668004329',
    linkedin : '77vl3ewozemhas',
    github: '7293fa073d2243c582dc',
    google:  '339950630008-blnat1i0offoljor7i0oahbq1s4mduu0.apps.googleusercontent.com'
},{redirect_uri:'http://Meanstack.tk'});

$scope.social = function(social) {
      $scope.message = '';
      $scope.error = 0;

hello(social).login({force:true, scope:'email,public_profile'});

hello.on('auth.login', function(auth){
    // call user information, for the given network
    hello( auth.network ).api( '/me' ).then( function(user){
      //alert(user.id + user.name);
      user.network= social;
        loginsocial.loginsocial(user).then(function(res) {
          $scope.storage = $localStorage.$default({
            id:res.data.id,
            username: res.data.username,
            token: res.data.token
          });
          $scope.goTo('/foro');
        }, function(res) {
          $scope.error = 1;
          $scope.message = res.data.message;

        });
    });
});}
});
