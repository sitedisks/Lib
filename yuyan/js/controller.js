(function(){
	'use strict';
	
	angular.module('yuyanApp').controller('mainCtl', ['$scope', '$http', 'uiGmapGoogleMapApi', 'endpoint',
		function($scope, $http, uiGmapGoogleMapApi, endpoint){
			
			// get the IP
			var ipaddress = null;
			$http.get(endpoint.ipaddress).then(
				function(response){
					//success
					var ipaddress = response.data;
					toastr.success("Your IP address: " + ipaddress);
				}, 
				function(response){
					//error
					
				}
			);
			
			
			uiGmapGoogleMapApi.then(function(maps) {
				
				//fix of lodash.js
				if( typeof _.contains === 'undefined' ) {
					_.contains = _.includes;
				}
				if( typeof _.object === 'undefined' ) {
					_.object = _.zipObject;
				}
				  
				$scope.map = { 
					center: { latitude: 45, longitude: -73 }, 
					zoom: 8,
					options: { scrollwheel: true},
					control: {}
				};
				
				//single marker
				$scope.marker = {id: 0, coords: { latitude: 45, longitude: -73 }};
				
				//multiple markers
				$scope.markers = [
					{id: 0, coords: { latitude: 45, longitude: -73 }, info: "marker1"},
					{id: 1, coords: { latitude: 46, longitude: -72 }, info: "marker2"},
					{id: 2, coords: { latitude: 47, longitude: -71 }, info: "marker3"}
				];
				
			})
		
			
		
	}]);
	
})();