MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
   $scope.center = {
        latitude: 37.7833,
        longitude: -122.4167
    };
    $scope.zoom = 13;
    $scope.yelp = [];
    $scope.doctors = [];
    console.log($scope.doctors);

    var apiUrl = "http://doctorstats.herokuapp.com/api/v1/";
    // var Connection = $resource(apiUrl + "/doctors.json");
    // $scope.doctors = Connection.query();

    $scope.getAllDoctors = function() {
      var Connection = $resource(apiUrl + "/doctors.json");
      $scope.doctors = Connection.query();
      return $scope.doctors;
    };

    $scope.getBlueShieldDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_shield.json");
      $scope.doctors = Connection.query();
      return $scope.doctors;
    };

    $scope.getBlueCrossDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_cross.json");
      $scope.doctors = Connection.query();
      return $scope.doctors;
    };

    $scope.getCchpDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      $scope.doctors = Connection.query();
      return $scope.doctors;
    };

    $scope.getKaiserDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      $scope.doctors = Connection.query();
      return $scope.doctors;
    };

    $scope.getDoctorInfo = function(doctor) {
      console.log('hi')
      console.log(doctor.name);
    };

    $scope.redirectToYelp = function(doctor) {
      console.log('hi')
      console.log(doctor.name);
    };

    $scope.clearTheDoctors = function() {
      $scope.docors = [];
      return $scope.doctors;
    };

    $scope.displayName = function(doctor){
    };

    $scope.markersEvents = {
      click: function (gMarker, eventName, doctor) {
        console.log(doctor)
        var phone = doctor.phone.replace(/[^\w\s]/gi, '');
        var name = doctor.name.replace(/ /g, '+')
        alert(doctor.name + "  " + doctor.address + "   " + doctor.latitude + " " + doctor.longitude + "    " + doctor.zip_code + " " + phone);
        var yelpUrl = "http://api.yelp.com/v2/search?term=" + name + "&location=" + doctor.zip_code;
        var yelp2Url = "http://api.yelp.com/phone_search?phone=" + phone + "&ywsid=IDZJqj8ZCNQzMT0jC7yIFQ";
      },
      mouseover: function(gMarker, eventName, doctor) {
        console.log(doctor);
        var phone = doctor.phone.replace(/[^\w\s]/gi, '');
        var name = doctor.name.replace(/ /g, '+')
        var yelp2Url = "http://api.yelp.com/phone_search?phone=" + phone + "&ywsid=IDZJqj8ZCNQzMT0jC7yIFQ";
        console.log(yelp2Url);
        var response = $resource(yelp2Url, {
           callback: "JSON_CALLBACK"
        },
        { method: "JSONP"
        });
        var json = response.get();
        console.log(response);
        console.log(json);
      }
    };

    $scope.doSomething = function() {
      console.log("hi");
    };

}]);
