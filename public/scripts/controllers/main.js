'use strict';

angular.module('chatApp')
  .controller('MainCtrl', ['$scope', '$location', 
  	function ($scope, $location) {

	    $scope.join = function(){
	    	 $location.path('room/'+$scope.username);
	    }
  }]);
