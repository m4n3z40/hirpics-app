angular.module('hirpics.controllers', [])

.controller('AppCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Gets available the platform id
  $scope.platform = ionic.Platform.platform();

  // We need to start the map data
  angular.extend($scope, {
    mapOptions: {
      center: {
        lat: -22.9710,
        lng: -43.3907,
        zoom: 14
      },
      tiles: {
        url: 'https://api.mapbox.com/v4/m4n3z40.nmffbeop/{z}/{x}/{y}.png?' +
          'access_token=pk.eyJ1IjoibTRuM3o0MCIsImEiOiJxbEhJVXEwIn0.GjUgtyYJ5Q1xaRzPOqW_Pw',
        options: {
          attribution: 'Map data ©' + (new Date()).getFullYear() + ' <a href="https://maps.google.com/">Google</a>'
        }
      },
      defaults: {
        zoomControl: false,
        doubleClickZoom: true,
        scrollWheelZoom: false
      }
    }
  });

  // Lets start watching the user position
  navigator.geolocation.watchPosition(function (position) {
    angular.extend($scope.mapOptions, {
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      markers: {
        me: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          message: "You are here",
          focus: true,
          draggable: false
        }
      }
    });
  }, function (error) {
    console.log(error);
  }, {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 300000
  });
})

.controller('HomeCtrl', function($scope) {
  var picsRootUrl = 'http://localhost:3000/public/pics';

  $scope.goToPlacePics = function goToPlacePics(placeId) {
    console.log('Go to place ' + placeId);
  };

  $scope.nearestPlaces = [
    {
      placeId: 1,
      weight: 2,
      placeName: 'Barra da Tijuca',
      image: picsRootUrl + '/place_2/ff22d8f4ca69a5b6e5900e2c7d7f88ab.jpeg',
      picsCount: 45,
      lastPictureTaken: '5 minutes',
      onLeft: true
    },
    {
      placeId: 2,
      weight: 1,
      placeName: 'Barra Music',
      image: picsRootUrl + '/place_3/5e1796c80769031381dc8403f1e2b329.jpeg',
      picsCount: 32,
      lastPictureTaken: '5 minutes'
    },
    {
      placeId: 3,
      weight: 3,
      placeName: 'Porto Alegre',
      image: picsRootUrl + '/place_4/c5282a9e13c9a4fa55435efe199eb238.jpeg',
      picsCount: 55,
      lastPictureTaken: '5 minutes'
    },
    {
      placeId: 4,
      weight: 1,
      placeName: 'Guaíba',
      image: picsRootUrl + '/place_5/aebd08adb8861887228222217702643c.jpeg',
      picsCount: 30,
      lastPictureTaken: '5 minutes'
    },
    {
      placeId: 5,
      weight: 2,
      placeName: 'Faculdade Desicion de Negócios',
      image: picsRootUrl + '/place_6/d4811182539590b0f56b360d1a2cb334.jpeg',
      picsCount: 100,
      lastPictureTaken: '5 minutes',
      onRigt: true
    },
    {
      placeId: 6,
      weight: 3,
      placeName: 'Some Other Place',
      image: picsRootUrl + '/place_7/10d54d33247e50e6d4235252374cac05.jpeg',
      picsCount: 200,
      lastPictureTaken: '5 minutes'
    }
  ];
})

.controller('PlacePicCtrl', function($scope) {

})

.controller('MyPicsCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

});
