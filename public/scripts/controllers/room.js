'use strict';

angular.module('chatApp')
  .controller('RoomCtrl', ['$scope', '$routeParams', '$http', '$timeout', 
  	function ($scope, $routeParams, $http, $timeout) {
	  	var basURL = 'http://localhost:8080/api';
		$scope.username = $routeParams.username;
		$scope.onlineTimer = 0;

		$scope.startTimer = function(){
			$timeout(function(){
				$scope.onlineTimer++;
				$scope.startTimer();
			}, 60000);
		}
		$scope.startTimer();

	    $http({
			method: 'GET',
			url: basURL+'/rooms'
		}).then(function successCallback(response) {
			$scope.rooms = response.data;

			if($scope.rooms && $scope.rooms.length > 0){
				var roomId = $scope.rooms[0].id;
				$scope.getRoom(roomId);
			}
		}, function errorCallback(response) {

		});

		$scope.getRoom = function(roomId){
			$http({
				method: 'GET',
				url: basURL+'/rooms/'+roomId
			}).then(function successCallback(response) {
				$scope.currentRoom = response.data;
			}, function errorCallback(response) {

			});

			$scope.getMessages(roomId);
		}

		$scope.getMessages = function(roomId){
			$http({
				method: 'GET',
				url: basURL+'/rooms/'+roomId+'/messages'
			}).then(function successCallback(response) {
				$scope.messages = response.data;
			}, function errorCallback(response) {

			});
		}

		$scope.postMessage = function(roomId){
			if(!roomId) roomId = $scope.currentRoom.id;

			$http({
				method: 'POST',
				url: basURL+'/rooms/'+roomId+'/messages',
				data: {name:$scope.username, message:$scope.messageInput}
			}).then(function successCallback(response) {
				$scope.messageInput = '';
				$scope.getRoom(roomId);
			}, function errorCallback(response) {

			});
		}
  }]);
