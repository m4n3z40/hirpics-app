angular.module('hirpics.factories', [])

.factory('NearestPlacesService', function() {
  var picsRootUrl = 'http://localhost:3000/public/pics',
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
    getAll: function (lat, lng, maxDistance) {
      return Promise.resolve(places)
    }
  };
});
