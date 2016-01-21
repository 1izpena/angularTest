'use strict'

angular.module('myAppAngularMinApp')
    .service('sharedProperties', function () {
        var property = '/';
        var message = '';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            },
            getMessage: function () {
                return message;
            },
            setMessage: function(value) {
                message = value;
            }
        };
    });