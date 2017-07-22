$(document).ready(function(){
  function initMap() {
    // For creating content of infoWindow
    function createWindowContent() {
      return `<div>
      <form id="info_window_input" action="/lists/:id/points" method="post">
          <textarea class="test" name="text"></textarea>
          <input type="submit" value="Submit">
        </form>
      </div>`;
    }


    function postMarker(marker) {
      var mapId = Number(window.location.pathname.substr('/maps'.length + 1));

      $.ajax('/maps/' + mapId + '/points', )
    }


    //For adding marker
    function addMarker(point){
      var marker = new google.maps.Marker({
        position:point,
        map:map
      });
      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function(event){
        infoWindow.setContent(createWindowContent());
        infoWindow.open(map, marker)
      });
    }

    // fake JSON response
    var markers = [
      {
        // Miku
        coords: {lat: 49.2803495, lng: -123.112195},
      },
      {
        // Sushi California
        coords: {lat:49.2630685, lng: -123.1147977},
      },
      {
        // Yamato Sushi
        coords: {lat: 49.2766505, lng: -123.1278187},
      }
    ];

    // map options
    var options = {
      zoom:13,
      center:{lat: 49.2827, lng: -123.1207}
    };

    // initiate new map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // loop through JSON array to add marker
    markers.forEach(function(obj){
      addMarker(obj.coords);
    })

    // add listener for clicks on map
    google.maps.event.addListener(map, 'click', function(event){
      console.log(event.latLng.lat(), event.latLng.lng());
      addMarker({lat: event.latLng.lat(), lng: event.latLng.lng()});
    });
  }

  initMap();
});
