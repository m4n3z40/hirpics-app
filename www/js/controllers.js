angular.module('hirpics.controllers', [], function(UserPositionProvider) {
  UserPositionProvider.setOptions({
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 300000
  });
})

.controller('AppCtrl', function($scope, MapConfig, UserPosition) {
  // Gets available the platform id
  $scope.platform = ionic.Platform.platform();

  // We need to start the map data
  angular.extend($scope, {
    mapOptions: MapConfig
  });

  // Lets start watching the user position
  UserPosition.current(function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;

    angular.extend($scope.mapOptions, {
      center: {
        lat: lat,
        lng: lng,
        zoom: 14
      },
      markers: {
        me: {
          lat: lat,
          lng: lng,
          message: "You are here",
          focus: true,
          draggable: false
        }
      }
    });
  }, function (error) {
    console.log(error);
  });
})

.controller('HomeCtrl', function($scope, NearestPlacesService) {
  $scope.goToPlacePics = function goToPlacePics(placeId) {
    console.log('Go to place ' + placeId);
  };

  $scope.nearestPlaces = [];

  NearestPlacesService.getAll().then(function(places) {
    $scope.nearestPlaces = places;
  });
})

.controller('PlacePicCtrl', function($scope) {

})

.controller('MyPicsCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

});
