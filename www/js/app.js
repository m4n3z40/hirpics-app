// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hirpics', [
  'ionic',
  'leaflet-directive',
  'hirpics.configs',
  'hirpics.providers',
  'hirpics.factories',
  'hirpics.directives',
  'hirpics.controllers'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.place-pics', {
      url: '/place-pics/:placeId',
      views: {
        'menuContent': {
          templateUrl: 'templates/place-pics.html',
          controller: 'PlacePicCtrl'
        }
      }
    })

    .state('app.my-pics', {
      url: '/my-pics',
      views: {
        'menuContent': {
          templateUrl: 'templates/my-pics.html',
          controller: 'MyPicsCtrl'
        }
      }
    })

    .state('app.add-pic', {
      url: '/add-pic',
      views: {
        'menuContent': {
          templateUrl: 'templates/add-pic.html',
          controller: 'AddPicCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
