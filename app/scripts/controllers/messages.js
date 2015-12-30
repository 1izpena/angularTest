'use strict';

angular.module('myAppAngularMinApp')
  .controller('MessagesCtrl', [ 'ChatService', 'Socket', function (ChatService, Socket ) {

    var self=this;

    // Datos iniciales
    self.data = { 'userid': '5676e310ffe2b17c165869ef',
                  'channelid': '56817aeeb878246408a2c02c',
                  'groupid': '56817aeeb878246408a2c02a'};


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

    this.sendDocument = function () {

        var self=this;
        self.data.messageType = 'FILE';

      ChatService.uploadFileS3(self.data).then(
          function(result) {
            // Upload OK
            ChatService.postMessage(self.data).then(
              function(result) {
                // Mensaje creado
              },
              function (erro) {
                // TODO: Mostrar error
                console.log ("Error en postMessage");
              }
            );
          },
          function (erro) {
            // TODO: Mostrar error
            console.log ("Error en uploadFileS3");
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




