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
});