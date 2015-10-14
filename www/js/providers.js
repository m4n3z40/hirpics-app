angular.module('hirpics.providers', [])

.provider('UserPosition', function() {
  var options = {};

  this.setOptions = function (opts) {
      options = opts;
  };

  this.$get = function () {
    return {
      watch: function (onSuccess, onError) {
        navigator.geolocation.watchPosition(onSuccess, onError, options);
      },
      current: function (onSuccess, onError) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      }
    };
  }
});
