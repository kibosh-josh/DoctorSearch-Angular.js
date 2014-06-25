var DoctorApp = angular.module("DoctorApp", ["google-maps", "ngResource", "MainController", "MapsController"]);

DoctorApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
