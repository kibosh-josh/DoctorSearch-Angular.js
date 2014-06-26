MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
    var apiUrl = "http://doctorstats.herokuapp.com/api/v1/";


    $scope.map = {
      current_marker: {},
      control: {},
      yelp: [],
      markers: [],
      center: {
        latitude: 37.7683,
        longitude: -122.4408
      },
      zoom: 13,
      dragging: true
    };



    $scope.getAllDoctors = function() {
      var Connection = $resource(apiUrl + "/doctors.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            console.log(item)
            
            item.onClick = function() {
              console.log("opening window")
              item.showWindow = true;
              $scope.$apply();
            }
            
            item.closeClick = function() {
            console.log('close click - hiding window');
            item.showWindow = false;
            $scope.$apply();
            }
          }
        })
        $scope.map.markers = result;
      });
    };

    $scope.getBlueShieldDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_shield.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            that = this
            
            item.onClick = function() {
              console.log(that)
              item.showWindow = true;
              $scope.$apply();
            }
            
            item.closeClick = function() {
            console.log('close click - hiding window');
            item.showWindow = false;
            $scope.$apply();
            }
          }
        })
        $scope.map.markers = result;
      });
    };
    $scope.getBlueCrossDoctors = function() {
      var Connection = $resource(apiUrl + "/blue_cross.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            that = item;
            
            item.onClick = function() {
              console.log(that)
              item.showWindow = true;
              $scope.$apply();
            }
            
            item.closeClick = function() {
            console.log('close click - hiding window');
            item.showWindow = false;
            $scope.$apply();
            }
          }
        })
        $scope.map.markers = result;
      });
    };
    $scope.getCchpDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            that = this
            
            item.onClick = function() {
              console.log(this)
              item.showWindow = true;
              $scope.$apply();
            }
            
            item.closeClick = function() {
            console.log('close click - hiding window');
            item.showWindow = false;
            $scope.$apply();
            }
          }
        })
        $scope.map.markers = result;
      });
    };

    $scope.getKaiserDoctors = function() {
      var Connection = $resource(apiUrl + "/cchp.json");
      Connection.query().$promise.then(function (result){
        _.each(result, function(item) {
          if (item.latitude !== null){
            item.icon = null;
            item.url = null;
            item.showWindow = false;
            
            item.onClick = function() {
              console.log("opening window")
              item.showWindow = true;
              $scope.$apply();
            }
            
            item.closeClick = function() {
            console.log('close click - hiding window');
            item.showWindow = false;
            $scope.$apply();
            }
          }
        })
        $scope.map.markers = result;
      });
    };



    $scope.markersEvents = {
      click: function (gMarker, eventName, marker) {
        marker.showWindow = true;
        console.log(marker);
        console.log(gMarker);
        var phone = marker.phone.replace(/[^\w\s]/gi, '');
        var name = marker.name.replace(/ /g, '+')
        // alert(marker.name + "  " + marker.address + "   " + marker.latitude + " " + marker.longitude + "    " + marker.zip_code + " " + phone);
        var yelpUrl = "http://api.yelp.com/v2/search?term=" + name + "&location=" + marker.zip_code;
        var yelp2Url = "http://api.yelp.com/phone_search?phone=" + phone + "&ywsid=IDZJqj8ZCNQzMT0jC7yIFQ";
      },
      mouseover: function(gMarker, eventName, marker) {
        // console.log("This is Gmarker", gMarker)
        // console.log("This is eventname", eventName)
        // console.log("This is marker", marker)
        // console.log("parent", this.$parent)
        // console.log("this", this)

        var phone = marker.phone.replace(/[^\w\s]/gi, '');
        var name = marker.name.replace(/ /g, '+')
        var url = "/lookup?q=" + name + "&l=" + marker.zip_code
        var service = $resource(url);

        service.get().$promise.then(function (data){
          businessArray = data.businesses;
          _.each(businessArray, function (object){
            var markerArr = marker.name.split(" ")
            var namearr = object.name.split(" ")
            if (markerArr[0] === namearr[1] || markerArr[1] === namearr[0]) {
              marker.icon = object.rating_img_url_small;
              marker.url = object.url;
              console.log(marker.name + marker.url + marker.icon)
              return marker
            }
          });
        });
      }
    };
}]);
