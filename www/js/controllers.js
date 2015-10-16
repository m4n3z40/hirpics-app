angular.module('hirpics.controllers', [], function(UserPositionProvider) {
  UserPositionProvider.setOptions({
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 300000
  });
})

.controller('AppCtrl', function($scope, $state, MapConfig, UserService, UserPosition, Camera) {
  // Gets available the platform id
  $scope.platform = ionic.Platform.platform();

  // The current user
  $scope.currentUser = null;
  $scope.lastPicTaken = null;

  // We need to start the map data
  angular.extend($scope, {
    mapOptions: MapConfig,
    position: {}
  });

  // Expose a function to the 'take pic' button to call
  $scope.takePic = function() {
    Camera.takePic(function(imgData) {
      $scope.lastPicTaken = imgData;

      $state.go('app.add-pic');
    }, function(error) {
      alert(error);
    });
  };

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

.controller('MyPicsCtrl', function($scope, $state, PlacesService) {
  $scope.places = [];

  $scope.onPlaceClick = function(placeId) {
    $state.go('app.place-pics', {placeId: placeId});
  };

  PlacesService.getByUserId($scope.currentUser.id, 3).then(function(places) {
    $scope.places = places;
  });
})

.controller('AddPicCtrl', function($scope, $ionicLoading, PicsService, $ionicPopup, $ionicHistory, $state) {
  $scope.form = {status: ''};

  $scope.onStatusKeyUp = function(e) {
    if (e.keyCode === 13) {
      cordova.plugins.Keyboard.close();
    }
  };

  $scope.publishPic = function() {
    $ionicLoading.show({
      template: 'Publishing pic...'
    });

    var picData = {
      userId: $scope.currentUser.id,
      status: $scope.form.status,
      lat: $scope.position.latitude,
      lng: $scope.position.longitude,
      pic: $scope.lastPicTaken
    };

    PicsService.save(picData).then(function() {
      $ionicLoading.hide();

      $ionicPopup.alert({
        title: 'Pic published',
        template: 'Your pic was published successfully!'
      }).then(function(res) {
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go('app.my-pics', null, {location: 'replace'});
      });
    }, function(error) {
      $ionicLoading.hide();

      alert('Error saving pic: ' + JSON.stringify(error));
    });
  };
})

.controller('AboutCtrl', function($scope) {

});
