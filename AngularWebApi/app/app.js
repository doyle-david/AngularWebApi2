/* Application */
var app = angular.module('crudApp', ['ngRoute', 'appControllers', 'appServices']);

/* Controllers */
var appControllers = angular.module('appControllers', []);

/* Services */
var appServices = angular.module('appServices', []);

// For jQuery
app.value('$', $);
app.value('_', _);