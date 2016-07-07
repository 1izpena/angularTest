# my-app-angular-min



This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

## Build & development

Run `npm install` for creating node_modules

Run `bower install` for creating bower_components

Dentro del package.json he puesto bower para que podais hacer este comando, recomiendo instalarlo de forma global, como admininistradores:
$ npm install --global bower@1.6.9
Porque igual que npm no se mete en el package.json creo que bower tampoco debería.

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Details

He creado la aplicación automáticamente con yeoman, que es un asistente para la generación de aplicaciones webs del lado cliente, y en nuestro caso, para generar una aplicación angular, he incorporado el generador de angular.
Creo que será más sencillo para todos que os instaleis yeoman, porque haciendo comandos sencillos desde consola, te genera mucho código. Sino también podeis hacerlo a pelo.
Para instalar yeoman, siempre con 'sudo' en ubuntu o como administrador en windows:

$ npm install -g grunt-cli bower yo generator-karma generator-angular

NOTA: Si no os deja instalar generator-karma es porque necesita dependencias propias de karma, asique instalar karma:
$ npm install --global karma@0.13.15

Y luego lanzar el comando anterior, poque se necesita lanzarlos todos los paquetes a la vez o en orden como aparece.

Urls interesantes:
http://yeoman.io/learning/
http://yeoman.io/codelab/setup.html

No he metido gulp porque esta en periodo de prueba y da problemas, asique trabajaremos con grunt para la automatización de tareas.

Una vez teneis 'yo' instalado podreis hacer cosas como estas:
$ yo angular:directive myDirective
$ yo angular:filter myFilter
$ yo angular:service myService
Y mucho mas.

Mas adelante si 'yo' os da problemas podeis poner en una terminal:
$ yo doctor
Y os dira los posibles problemas que encuentra en vuestra maquina y los comandos exactos para arreglarlos.

Online DEMO in 'http://54.171.73.143'
