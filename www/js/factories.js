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

.factory('PlacesService', function() {
  var picsRootUrl = 'http://localhost:3000/public/pics',
    pics = [
      {
        picId: 1,
        image: picsRootUrl + '/place_2/ff22d8f4ca69a5b6e5900e2c7d7f88ab.jpeg'
      },
      {
        picId: 2,
        image: picsRootUrl + '/place_3/5e1796c80769031381dc8403f1e2b329.jpeg'
      },
      {
        picId: 3,
        image: picsRootUrl + '/place_4/c5282a9e13c9a4fa55435efe199eb238.jpeg'
      }
    ],
    places = [
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

  return {
    getNearest: function (lat, lng, maxDistance) {
      return Promise.resolve(places)
    },
    getById: function (id) {
      return Promise.resolve(
        places.filter(function(place) { return place.placeId === id })[0]
      );
    },
    getByUserId: function (userId, qtyPhotos) {
      return Promise.resolve(
        places.map(function(place) {
          place.pics = pics;

          return place;
        })
      );
    }
  };
})

.factory('PicsService', function(ServerApiUrlBase) {
  var picsRootUrl = 'http://localhost:3000/public/pics',
    pics = [
      {
        picId: 1,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_2/ff22d8f4ca69a5b6e5900e2c7d7f88ab.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      },
      {
        picId: 2,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_3/5e1796c80769031381dc8403f1e2b329.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      },
      {
        picId: 3,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_4/c5282a9e13c9a4fa55435efe199eb238.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      },
      {
        picId: 4,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_5/aebd08adb8861887228222217702643c.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      },
      {
        picId: 5,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_6/d4811182539590b0f56b360d1a2cb334.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      },
      {
        picId: 6,
        placeId: 1,
        status: 'This is some interesting place.',
        taken: '5 hours',
        image: picsRootUrl + '/place_7/10d54d33247e50e6d4235252374cac05.jpeg',
        user: {
          id: 1,
          name: 'Allan Baptista',
          image: 'http://www.gravatar.com/avatar/be2611d0195a7d8df11af3ed6bdef3b5.jpg?s=100',
          email: 'allan@ignit.io'
        }
      }
    ];

  return {
    getAllByPlaceId: function (id) {
      return Promise.resolve(pics);
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
