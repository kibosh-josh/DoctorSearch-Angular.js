MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
   $scope.center = {
        latitude: 37.7833,
        longitude: -122.4167
    };
    $scope.zoom = 16;
    $scope.yelp = [];
    $scope.doctors = [];

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
        var phone = doctor.phone.replace(/[^\w\s]/gi, '');
        var name = doctor.name.replace(/ /g, '+')
        alert(doctor.name + "  " + doctor.address + "   " + doctor.latitude + " " + doctor.longitude + "    " + doctor.zip_code + " " + phone);
        var yelpUrl = "http://api.yelp.com/v2/search?term=" + name + "&location=" + doctor.zip_code;
        var yelp2Url = "http://api.yelp.com/phone_search?phone=" + phone + "&ywsid=IDZJqj8ZCNQzMT0jC7yIFQ";
      },
      mouseover: function(gMarker, eventName, doctor) {
        var phone = doctor.phone.replace(/[^\w\s]/gi, '');
        var name = doctor.name.replace(/ /g, '+')
        var url = "/lookup?q=" + name + "&l=" + doctor.zip_code
        var service = $resource(url);
        service.get(function(data){ 
          businessArray = data.businesses;
          _.forEach(businessArray, function(val, key) {
            var doctorarr = doctor.name.split(" ")
            var namearr = val.name.split(" ")
            if (doctorarr[0] === namearr[1] || doctorarr[1] === namearr[0]) {
              console.log(doctor)
              console.log(doctor.rating_img_url);
              doctor = val
              console.log(doctor);
              console.log(doctor.rating_img_url);
            }
          });
        });
      }
    };

    $scope.doSomething = function() {
      console.log("hi");
    };

}]);
