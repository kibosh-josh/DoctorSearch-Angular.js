var DoctorApp = angular.module("DoctorApp", ["google-maps", "ngResource", "ngRoute", "mainCtrl", "mapsCtrl"]);


DoctorApp.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}]);