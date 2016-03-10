angular.module('hirpics.providers', [])

.provider('UserPosition', function() {
  var options = {};

  document.addEventListener('deviceReady', function() {
    options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
  });

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
})

.provider('Camera', function() {
  var options = {};

  this.setOptions = function (opts) {
      options = opts;
  };

  this.$get = function() {
    return {
      takePic: function (onSuccess, onError) {
        navigator.camera.getPicture(onSuccess, onError, options);
      }
    };
  };
});
