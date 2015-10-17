angular.module('hirpics.factories', [])

.factory('UserService', function() {
  var currentUser = {
    id: 1,
    name: 'Allan Baptista',
    image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
    email: 'allan@ignit.io'
  };

  return {
    current: function() {
      return Promise.resolve(currentUser);
    }
  };
})

.factory('PlacesService', function($http, ServerApiUrlBase, ServerPicsUrlBase) {
  function transformPic(pic) {
    return {
      picId: pic.id,
      image: ServerPicsUrlBase + pic.path
    };
  }

  function transformPlace(place, i) {
    var weight = (i % 3) + 1;

    return {
      placeId: place.id,
      weight: weight,
      onLeft: false,
      onRight: weight === 2,
      image: ServerPicsUrlBase + place.lastPicPath,
      placeName: place.neighborhood + ' - ' + place.admLevel2Short,
      lastPictureTaken: moment(place.updatedAt).fromNow(),
      picsCount: place.picsCount,
      pics: place.pics && place.pics.length ? place.pics.map(transformPic) : []
    };
  }

  return {
    getNearest: function (lat, lng, maxDistance) {
      maxDistance = maxDistance || 40;

      return $http.get(ServerApiUrlBase + '/places/nearest/' + [lat, lng, maxDistance].join('/'))
        .then(function(result) {
          var data = result.data;

          if (data.errors.length > 0) {
            throw new Error(data.errors.join('\n'));
          }

          return data.places.map(transformPlace);
        });
    },
    getById: function (id) {
      return $http.get(ServerApiUrlBase + '/places/' + id).then(function(result) {
        var data = result.data;

        if (data.errors.length > 0) {
          throw new Error(data.errors.join('\n'));
        }

        return transformPlace(data.place);
      });
    },
    getByUserId: function (userId, qtyPhotos) {
      return $http.get(ServerApiUrlBase + '/users/' + userId + '/places/pics')
        .then(function(result) {
          var data = result.data;

          if (data.errors.length > 0) {
            throw new Error(data.errors.join('\n'));
          }

          return data.places.map(transformPlace);
        });
    }
  };
})

.factory('PicsService', function($http, ServerApiUrlBase, ServerPicsUrlBase) {
  function transformUser(user) {
    return {
      id: user.id,
      name: user.name,
      image: user.profilePicPath,
      email: user.email
    };
  }

  function transformPic(pic) {
    return {
      picId: pic.id,
      placeId: pic.placeId,
      status: pic.status,
      taken: moment(pic.createdAt).fromNow(),
      image: ServerPicsUrlBase + pic.path,
      user: transformUser(pic.user)
    };
  }

  return {
    getAllByPlaceId: function (id) {
      return $http.get(ServerApiUrlBase + '/places/' + id + '/pics/users').then(function(result) {
        var data = result.data;

        if (data.errors.length > 0) {
          throw new Error(data.errors.join('\n'));
        }

        return data.pics.map(transformPic);
      });
    },
    save: function (options) {
      try {
        var uploadOpts = new FileUploadOptions();
        var params = {};

        params.userId = options.userId;
        params.status = options.status;
        params.lat = options.lat;
        params.lon = options.lng;

        uploadOpts.fileKey = 'pic';
        uploadOpts.fileName = options.pic.substr(options.pic.lastIndexOf('/') + 1);
        uploadOpts.mimeType = 'image/jpeg';
        uploadOpts.params = params;

        return new Promise(function (resolve, reject) {
          var ft = new FileTransfer();

          ft.upload(options.pic, ServerApiUrlBase + '/pics', resolve, reject, uploadOpts);
        });
      } catch(e) {
        return Promise.reject(e);
      }
    }
  };
});
