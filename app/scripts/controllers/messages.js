'use strict';

angular.module('myAppAngularMinApp')
  .controller('MessagesCtrl', [ '$http', 'API_BASE', function ($http, API_BASE ) {

    this.data = { userid: 'amaia', 'channelid': 'general'};

    this.sendDocument = function () {

      var self=this;

      var userid=self.data.userid;
      var channelid=self.data.channelid;

      $http.post(API_BASE + 'api/v1/file/getSignedUrl', {filename: self.data.filename} )
        .then( function(response){
          $http.put(response.data.url, self.data.filename)
            .then(function(response){
              self.data.messageType = 'FILE';
              console.log (self.data);
              $http({
                method: 'post',
                url: API_BASE + 'api/v1/users/'+userid+'/chat/channels/'+channelid+'/messages',
                data: self.data
              })
                .then(function(response) {
                  console.log ("mensaje creado");
                  console.log(response);
                },
                function(error){
                  console.log("Error en post message");
                  console.log (error);
                });
              //api/v1/users/:username/chat/
              },
            function () {
              console.log("Error en put file");
            });
        },
        function () {
          console.log("Error en get signedUrl");
        });

    };

    this.sendText = function () {

      console.log ("send text");

      var self=this;

      // TODO: Enviar informacion al servidor



    };
  }]);




