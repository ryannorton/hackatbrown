// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

var app = angular.module('app', ['ngRoute']);

app.controller('MapCtrl', ['$scope', '$http', function($scope, $http) {
  function init() {
    var myLatlng = new google.maps.LatLng(41.8237487,-71.4002502);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    };

    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    $scope.map.markers = [];
    $scope.poi = [];

    $scope.tripAdvisorRequest();
    google.maps.event.addDomListener(window, 'load', $scope.populateMap);
  }

  $scope.tripAdvisorRequest = function () {
    $http.get('api/landmarks/providence/').success(function (data) {
      $scope.dataPoints = data;
      console.log($scope.dataPoints);
    });
  };

  function createMarker(infowindow, point, name) {
      var marker = new google.maps.Marker({
          position: point,
          map: $scope.map,
          title: name
      });

      google.maps.event.addListener(marker, 'click', function() {
        if ($scope.curInfoWindow != undefined) {
          $scope.curInfoWindow.close();
        }

        $scope.curInfoWindow = infowindow;
        $scope.curInfoWindow.open($scope.map, marker);
      });

      $scope.map.markers.push(marker);
  }

  $scope.populateMap = function() {
    var landmarks = $scope.dataPoints.landmarks;
    for (var i = 0; i < landmarks.length; i++) {
      var point = new google.maps.LatLng(landmarks[i].latitude, landmarks[i].longitude);
      $scope.poi.push(point);
      var contentString = '<div class="marker-popup" id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' +
          landmarks[i].name +
          '</h1>'+
          '<div id="bodyContent">'+
          '<p>' +
          landmarks[i].description +
          '</p>'+
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      createMarker(infowindow, point, landmarks[i].name);
    }

    var tourPath = new google.maps.Polyline({
      path: $scope.poi,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    tourPath.setMap($scope.map);
  };

  init();
}]);

app.factory('tripAdvice', ['$http', function($http) {
  return {
    retrieveTripData: function() {
      $http.get('api/landmarks/providence').success(function (data) {
        var points = data;
        console.log(points);
      });
    }
  }
}]);

function initialize() {
  var myLatlng = new google.maps.LatLng(41.8237487,-71.4002502);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


  var poi = [];
  var markers = [];

  var latLngList = [
    {
      "x": "41.826772",
      "y": "-71.402548"
    },
    {
      "x": "41.826888",
      "y": "-71.407726"
    }
  ];

  for (var i = 0; i < latLngList.length; i++) {
    var point = new google.maps.LatLng(latLngList[i].x, latLngList[i].y);
    poi.push(point);
  }

  var contentString = '<div class="marker-popup" id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Brown University</h1>'+
      '<div id="bodyContent">'+
      '<p>Brown University is a great school!</p>'+
      '</div>'+
      '</div>';

  var infowindow_1 = new google.maps.InfoWindow({
      content: contentString
  });

  var marker_1 = new google.maps.Marker({
      position: poi[0],
      map: map,
      title: 'Brown University'
  });

  google.maps.event.addListener(marker_1, 'click', function() {
    infowindow_1.open(map,marker_1);
  });

  var infowindow_2 = new google.maps.InfoWindow({
      content: contentString
  });

  var marker_2 = new google.maps.Marker({
      position: poi[1],
      map: map,
      title: 'RISD Museum'
  });

  google.maps.event.addListener(marker_2, 'click', function() {
    infowindow_2.open(map,marker_2);
  });

  var tourPath = new google.maps.Polyline({
    path: poi,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  tourPath.setMap(map);
}

