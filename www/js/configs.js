angular.module('hirpics.configs', [])

.value('ServerApiUrlBase', 'https://hirpics-api.herokuapp.com/api/')

.value('ServerPicsUrlBase', 'https://hirpics-api.herokuapp.com/public/pics/')

.value('MapConfig', {
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
});
