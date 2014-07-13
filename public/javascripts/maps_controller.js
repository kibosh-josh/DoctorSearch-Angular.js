MapsController = angular.module("MapsController", []);

MapsController.controller('mapCtrl', ["$scope", "$http", "$resource", function($scope, $http, $resource) {
    var apiUrl = "http://doctorstats.herokuapp.com/api/v1/";
    var mapStyles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];


    $scope.map = {
      current_marker: {},
      control: {},
      api: [],
      markers: [],
      center: {
        latitude: 37.7683,
        longitude: -122.4408
      },
      zoom: 13,
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      styles: mapStyles,
      dragging: true,
      windowOptions: {
        pixelOffset: {
          width: 0,
          height: -40
        }
      },
    };
    $scope.markersOptions = {animation: google.maps.Animation.DROP};

    $scope.insurances = [
    { value: "1", display: "Blue Cross PPO and EPO" },
    { value: "2", display: "Blue Cross HMO" },
    { value: "3", display: "Kaiser" },
    { value: "4", display: "Blue Shield PPO" },
    { value: "5", display: "Blue Shield EPO" },
    { value: "6", display: "Chinese Community Health Plan" }
    ];

    $scope.doctors = [
      { value: "1", display: "name" },
      { value: "2", display: "specialty" },
      { value: "3", display: "medical_group"}
    ];

    var iconBase = "http://maps.google.com/mapfiles/kml/pal4/icon63.png";

    $scope.alreadySearched = false;
    $scope.tryAgain = false;


    $scope.clearMap = function() {
      $scope.map.api = [];
      $scope.map.markers = [];
      $scope.alreadySearched = false;
      doctorForm.reset();
      if ($scope.doctor !== undefined) {
        $scope.doctor.text = "";
      };
      $scope.doctor = false;
      $scope.insurance = false;
    };

    $scope.getDoctors = function() {
      var option;
      var connection;
      if ($scope.insurance === undefined || $scope.insurance.value === undefined) {
        console.log("try again");
        $scope.tryAgain = true;
        return;
      }
      $scope.alreadySearched = true;
      $scope.tryAgain = false;
      
      if ($scope.doctor === undefined || $scope.doctor.text === undefined) {
        option = null;
      } else if ($scope.doctor.display !== undefined) {
        option = "?" + $scope.doctor.display.toString() + "=" + $scope.doctor.text.toString();
      }

      if ($scope.insurance.value === "1" && option === null) {
        connection = $resource(apiUrl + "blue_cross.json");
        connection.query().$promise.then(function (result){
          _.each(result, function(item) {
            if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 30) {
              item.icon = iconBase;
              item.url = null;
              item.showWindow = false;
              item.stars = null;
              
              item.onClick = function() {
                item.showWindow = true;
                $scope.$apply();
              };

              item.closeClick = function() {
              item.showWindow = false;
              $scope.$apply();
              };
              if ($scope.map.api.indexOf(item.name) == -1) {
                console.log("ele doesn't exist");
                $scope.map.api.push(item);
              } else {
                console.log("ele exists");
              }
            // $scope.map.api.push(item);
            }
          });
          $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "1" && option !== null) {
        connection = $resource(apiUrl + "blue_cross.json" + option);
        connection.query().$promise.then(function (result){
          _.each(result, function(item) {
            if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99) {
              item.icon = iconBase;
              item.url = null;
              item.showWindow = false;
              item.stars = null;

              item.onClick = function() {
                item.showWindow = true;
                $scope.$apply();
              };

              item.closeClick = function() {
              item.showWindow = false;
              $scope.$apply();
              };
              if ($scope.map.api.indexOf(item.name) == -1) {
                console.log("ele doesn't exist");
                $scope.map.api.push(item);
              } else {
                console.log("ele exists");
              }
            }
          });
          $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "2" && option === null) {
          connection = $resource(apiUrl + "blue_cross_HMO.json");
          connection.query().$promise.then(function (result){
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 40){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                item.stars = null;

                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                console.log(item)
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        }); 
      } else if ($scope.insurance.value === "2" && option !== null) {
          connection = $resource(apiUrl + "blue_cross_HMO.json" + option);
          connection.query().$promise.then(function (result){
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 40){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                item.stars = null;

                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                console.log(item)
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });      
      } else if ($scope.insurance.value === "3" && option === null) {
          connection = $resource(apiUrl + "kaiser.json");
          connection.query().$promise.then(function (result){
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                item.stars = null;

                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
          });
      } else if ($scope.insurance.value === "3" && option !== null) {
          connection = $resource(apiUrl + "kaiser.json" + option);
          connection.query().$promise.then(function (result){
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                item.stars = null;

                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        }); 
      } else if ($scope.insurance.value === "4" && option === null) {
          connection = $resource(apiUrl + "blue_shield.json");
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "4" && option !== null) {
          connection = $resource(apiUrl + "blue_shield.json" + option);
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "5" && option === null) {
          connection = $resource(apiUrl + "blue_shield_EPO.json");
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "5" && option !== null) {
          connection = $resource(apiUrl + "blue_shield_EPO.json" + option);
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "6" && option === null) {
          connection = $resource(apiUrl + "cchp.json");
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else if ($scope.insurance.value === "6" && option !== null) {
          connection = $resource(apiUrl + "cchp.json" + option);
          connection.query().$promise.then(function (result) {
            _.each(result, function(item) {
              if (item.latitude !== null && item.longitude !== null && $scope.map.api.length < 99){
                item.icon = iconBase;
                item.url = null;
                item.showWindow = false;
                
                item.onClick = function() {
                  item.showWindow = true;
                  $scope.$apply();
                };

                item.closeClick = function() {
                item.showWindow = false;
                $scope.$apply();
                };
              $scope.map.api.push(item);
              }
            });
            $scope.map.markers = $scope.map.api;
        });
      } else {

      }
    };

    $scope.markersEvents = {
      click: function (gMarker, eventName, marker) {
        marker.onClick();
        // if (marker.phone !== null) {
        //   var phone = marker.phone.replace(/[^\w\s]/gi, '');          
        // };
        var urlFriendlyName = marker.name.replace(/ /g, '+')
        var urlFriendlyAddress = marker.address.replace(/ /g, '+')
        var url = "/lookup?q=" + urlFriendlyName + "&l=" + marker.zip_code + "&limit=2"
        console.log(url)
        var service = $resource(url);
        marker.stars = "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png"
        marker.url = "http://www.google.com/#q=" + urlFriendlyName
        marker.isYelped = false;
        console.log(marker.url);
        console.log(marker);

        service.get().$promise.then(function (data) {
          if (data.businesses) {
            resultArray = data.businesses;
            _.each(resultArray, function (business) {
              console.log(business)
              var markerName = marker.name.replace(/,/g, '').toLowerCase().split(" ")
              var businessName = business.name.replace(/,/g, '').toLowerCase().split(" ")
              if (_.intersection(markerName, businessName).length > 2) {
                console.log("match")
                marker.stars = business.rating_img_url;
                console.log(marker.stars)
                marker.url = business.url;
                console.log(marker.url)
                marker.isYelped = true;
                console.log(marker);
              }
            });
          } else {
            console.log("no results")
          }
        });
      },
      mouseover: function(gMarker, eventName, marker) {
      //   marker.showWindow = true;
      //   $scope.$apply();
      //   var phone = marker.phone.replace(/[^\w\s]/gi, '');
      //   var name = marker.name.replace(/ /g, '+')
      //   var url = "/lookup?q=" + name + "&l=" + marker.zip_code
      //   var service = $resource(url);

      //   service.get().$promise.then(function (data){
      //     if (data.businesses.length > 0){
      //       businessArray = data.businesses;
      //       _.each(businessArray, function (object){
      //         var markerName = marker.name.split(" ")
      //         var namearr = object.name.split(" ")
      //         if (markerArr[0] === namearr[1] || markerArr[1] === namearr[0]) {
      //           marker.icon = object.rating_img_url;
      //           marker.url = object.url;
      //           return marker
      //         }
      //       });
      //     } else {
      //       marker.icon = "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png"
      //       marker.url = "https://www.google.com/#q=" + name
      //     }
      //   });
      },
      mouseout: function(gMarker, eventName, marker) {
        // marker.closeClick();
        // marker.showWindow = false;
        // $scope.$apply();
      }
    }
}]);
