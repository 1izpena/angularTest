'use strict';

angular.module('myAppAngularMinApp')
  .controller('MessagesCtrl', [ 'ChatService', 'Socket', function (ChatService, Socket ) {

    var self=this;

    // Datos iniciales paar pruebas en local
    self.data = { 'userid': '56844f173d57021c0ccd88af',
                  'channelid': '56844f8c3d57021c0ccd88b4',
                  'groupid': '56844f8c3d57021c0ccd88b2'};


    self.listaMensajes = [
      {_channel: "56817aeeb878246408a2c02c",
        _id: "568432e53b3707e0045f7aef",
        _user: "5676e310ffe2b17c165869ef",
        content: {
          path: 'foto3.jpg'
        },
        datetime: "2015-12-30T19:39:17.863Z",
        messageType: "FILE"},
      {_channel: "56817aeeb878246408a2c02c",
        _id: "568432e53b3707e0045f7aef",
        _user: "5676e310ffe2b17c165869ef",
        content: {
          path: 'foto1.jpg'
        },
        datetime: "2015-12-30T19:39:17.863Z",
        messageType: "FILE"},
      {_channel: "56817aeeb878246408a2c02c",
        _id: "568432e53b3707e0045f7aef",
        _user: "5676e310ffe2b17c165869ef",
        content: {
          text: 'este es un mensaje de texto'
        },
        datetime: "2015-12-30T19:39:17.863Z",
        messageType: "TEXT"},
    ];

    Socket.emit('selectChannel', this.data);
    Socket.on('newMessage', function (data) {
      self.listaMensajes.push(data);

    });

    this.getMessages = function (channelid) {

    };

    this.sendDocument = function () {

        var self=this;
        self.data.messageType = 'FILE';

      ChatService.uploadFileS3(self.data).then(
          function(result) {
            console.log ("Upload OK");
            ChatService.postMessage(self.data).then(
              function(result) {
                // Mensaje creado
                console.log(result.data);
              },
              function (error) {
                // TODO: Mostrar error
                console.log ("Error en postMessage");
                console.log (error);
              }
            );
          },
          function (error) {
            // TODO: Mostrar error
            console.log ("Error en uploadFileS3");
            console.log (error);
          }
        );



    };

    this.sendText = function () {

      var self=this;
      self.data.messageType = 'TEXT';

      ChatService.postMessage(self.data).then(
        function(result) {
          // Mensaje creado
        },
        function (err) {
          // TODO: Mostrar error
          console.log ("Error en postMessage");
        }
      );



    };
  }]);




