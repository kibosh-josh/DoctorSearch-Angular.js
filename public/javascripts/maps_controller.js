MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
    var onMarkerClicked = function(marker){
        console.log("Hello there!!")
        marker.showWindow = true;
        console.log(marker)
    };


    $scope.map = {
      current_marker: {},
      control: {},
      yelp: [],
      markers: [],
      center: {
        latitude: 37.7683,
        longitude: -122.4408
      },
      zoom: 14,
      dragging: true,     
             infoWindow: {
                coords: {
                    latitude: 30,
                    longitude: -89
                },
                show: false
            },
      refresh: function () {
        $scope.map.control.refresh(origCenter);
      }
    };

    var apiUrl = "http://doctorstats.herokuapp.com/api/v1/";

    $scope.getAllDoctors = function() {
      var Connection = $resource(apiUrl + "/doctors.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            console.log(item)
            $scope.map.markers.push(item);
          }
        })
      });

      return $scope.map.markers;

    };

    $scope.getBlueShieldDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_shield.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            $scope.map.markers.push(item);
          }
        })
      });

      return $scope.map.markers;
    };

    $scope.getBlueCrossDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_cross.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            $scope.map.markers.push(item);
          }
        })
       _.each($scope.map.markers,function(marker){
        console.log(marker)
        marker.closeClick = function(){
            marker.showWindow = false;
            $scope.$apply();
        };
        marker.onClicked = function(){
            console.log("clicked")
            onMarkerClicked(marker);
        };
        });
      });

      return $scope.map.markers;
    };

    $scope.getCchpDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            console.log(item)
            $scope.map.markers.push(item);
          }
        })
      });
      return $scope.map.markers;
    };

    $scope.getKaiserDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            console.log(item)
            $scope.map.markers.push(item);
          }
        })
      });
      return $scope.map.markers;
    };

    $scope.getDoctorInfo = function(doctor) {
      console.log('hi')
      console.log(doctor.name);
    };

    var redirectToYelp = function(doctor) {
      $window.location.href = doctor.url;
    };

    $scope.clearMap = function() {
      $scope.map.refresh = "true"
    };

    $scope.displayName = function(doctor){
    };



    $scope.markersEvents = {
      // click: function (gMarker, eventName, doctor) {
      //   doctor.showWindow = true;
      //   console.log(doctor);
      //   console.log(gMarker);
      //   var phone = doctor.phone.replace(/[^\w\s]/gi, '');
      //   var name = doctor.name.replace(/ /g, '+')
      //   // alert(doctor.name + "  " + doctor.address + "   " + doctor.latitude + " " + doctor.longitude + "    " + doctor.zip_code + " " + phone);
      //   var yelpUrl = "http://api.yelp.com/v2/search?term=" + name + "&location=" + doctor.zip_code;
      //   var yelp2Url = "http://api.yelp.com/phone_search?phone=" + phone + "&ywsid=IDZJqj8ZCNQzMT0jC7yIFQ";
      // },
      mouseover: function(gMarker, eventName, doctor) {
        console.log(this.window)

        gMarker.showWindow = true;
        var phone = doctor.phone.replace(/[^\w\s]/gi, '');
        var name = doctor.name.replace(/ /g, '+')
        var url = "/lookup?q=" + name + "&l=" + doctor.zip_code
        var service = $resource(url);
        service.get().$promise.then(function (data){
          businessArray = data.businesses;
          _.each(businessArray, function (object){
            var doctorarr = doctor.name.split(" ")
            var namearr = object.name.split(" ")
            if (doctorarr[0] === namearr[1] || doctorarr[1] === namearr[0]) {
              doctor.icon = object.rating_img_url_small;
              doctor.url = object.url;
              console.log(doctor.name + doctor.url + doctor.icon)
              return
            }
            return
          });
        });
      }
    };

    $scope.onInsideWindowClick = function () {
      alert("Window hit!");
    };

    $scope.refreshMap = function () {
      $scope.map.control.refresh({latitude: 37.7683, longitude: -122.4408});
      $scope.map.control.getGMap().setZoom(11);
    };

    var origCenter = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};

    $scope.doSomething = function() {
      console.log("hi");
    };

}]);
