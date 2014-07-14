var DoctorApp = angular.module("DoctorApp", ["google-maps", "ngResource", "MainController", "MapsController", "ngAnimate", "ui.bootstrap"]);

DoctorApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);
