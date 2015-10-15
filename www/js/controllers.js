angular.module('hirpics.controllers', [], function(UserPositionProvider) {
  UserPositionProvider.setOptions({
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 300000
  });
})

.controller('AppCtrl', function($scope, MapConfig, UserPosition, UserService) {
  // Gets available the platform id
  $scope.platform = ionic.Platform.platform();

  // The current user
  $scope.currentUser = null;

  // We need to start the map data
  angular.extend($scope, {
    mapOptions: MapConfig,
    position: {}
  });

  // Get the current user
  UserService.current().then(function (user) {
    $scope.currentUser = user;
  });

  // Lets start watching the user position
  UserPosition.current(function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;

    $scope.position.latitude = lat;
    $scope.position.longitude = lng;

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

.controller('HomeCtrl', function($scope, $state, PlacesService) {
  $scope.goToPlacePics = function goToPlacePics(placeId) {
    $state.go('app.place-pics', {placeId: placeId});
  };

  $scope.nearestPlaces = [];

  PlacesService.getNearest($scope.position.latitude, $scope.position.longitude)
    .then(function(places) {
      $scope.nearestPlaces = places;
    });
})

.controller('PlacePicCtrl', function($scope, $stateParams, PlacesService, PicsService) {
  var placeId = Number($stateParams.placeId);

  $scope.place = {placeName: 'No place'};
  $scope.pics = [];

  PlacesService.getById(placeId).then(function(place) {
    $scope.place = place;
  });

  PicsService.getAllByPlaceId(placeId).then(function(pics) {
    $scope.pics = pics;
  });

  $scope.onPicClick = function(picId) {
    console.log(picId);
  };
})

.controller('MyPicsCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

});
