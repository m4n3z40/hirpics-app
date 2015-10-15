angular.module('hirpics.directives', [])

.directive('placeTile', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      place: '=',
      onClick: '&'
    },
    templateUrl: 'templates/directives/place-tile.html'
  };
})

.directive('picCard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      pic: '=',
      onClick: '&'
    },
    templateUrl: 'templates/directives/pic-card.html'
  };
})

.directive('placeWithPics', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      place: '=',
      onClick: '&'
    },
    templateUrl: 'templates/directives/place-with-pics.html'
  };
});
