'use strict';

/**
 * @ngdoc overview
 * @name chatApp
 * @description
 * # chatApp
 *
 * Main module of the application.
 */
angular
  .module('chatApp', [
    'ngRoute',
    'luegg.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/room/:username', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl',
        controllerAs: 'room'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
