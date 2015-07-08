/* Application */
var app = angular.module('crudApp', ['ngRoute', 'appDirectives', 'appControllers', 'appServices']);

/* Controllers */
var appControllers = angular.module('appControllers', []);

/* Services */
var appServices = angular.module('appServices', []);

/* Directives */
var appDirectives = angular.module('appDirectives', []);

// For jQuery
app.value('$', $);