/*
**
 * Created by Jon on 16/12/2015.
 */
'use strict';

angular.module('myAppAngularMinApp')
  .controller('ForoCtrl', function ($scope,  $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  this.ultimas = preguntas;

  });

  var preguntas = [ // Esto es un array
    { // Declaramos el objeto.
      titulo: 'Javascript',
      pregunta:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum quam neque, ut laoreet ipsum blandit vel. Sed volutpat velit semper elit consequat consequat sed non nibh. Phasellus euismod ipsum at risus congue, aliquam scelerisque libero porttitor. Nam congue ante in bibendum aliquam.',
      respuestas:0,
      votos: 45,
      visitas: 150,
      tags:["javascript","jquery","php","html5"],
      user:{username: 'Txira',mail: ""},
      modified:'1231244144',

      
    }, 
    {
      titulo: '¿Como hacer controladores en angularjs?',
      pregunta:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum quam neque, ut laoreet ipsum blandit vel. Sed volutpat velit semper elit consequat consequat sed non nibh. Phasellus euismod ipsum at risus congue, aliquam scelerisque libero porttitor. Nam congue ante in bibendum aliquam.',
      respuestas:0,
      votos: 45,
      visitas: 150,
      tags:["javascript","jquery","php"],
    }
  ];