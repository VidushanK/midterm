$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj) {
      return `<div>
      <form class="info_window_input" action="/maps/${mapId}/points" method="post">
          <textarea class="info_window_textarea" name="pointName">${pointObj.name}</textarea>
          <input type="hidden" name="pointLat" class="info_window_lat" value=${pointObj.lat}>
          <input type="hidden" name="pointLng" class="info_window_lng" value=${pointObj.long}>
          <input type="submit" value="Submit" class="info_window_button">
        </form>
      </div>`;
    }

    function postPoint($form){
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points`,
        data: $form.serialize()
      }).done(() => {
        alert("Point submitted!");
      })
    }

    function updatePoint($form){
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points/update`,
        data: $form.serialize()
      }).done(() => {
        alert("Point updated!");
      })
    }

    function loadMap(mapId){
      $.getJSON(`${mapId}/points`).done((mapPoints)=>{
        mapPoints.forEach((point)=>{
          addMarker(point);
        })
      })
    }

    function pointExists(event){
      event.preventDefault();
      var data = event.data;
      const $form = $(this);
      if(!data.id){
        $(".info_window_button").attr("value","Submit");
        postPoint($form);
      } else {
        $(".info_window_button").attr("value","Update");
        updatePoint($form);
      }
    }

    //For adding marker
    function addMarker(pointObj){
      marker = new google.maps.Marker({
        position: {lat: Number(pointObj.lat), lng: Number(pointObj.long)},
        map: map,
        draggable: true
      });

      google.maps.event.addListener(marker, 'click', (function(marker, pointObj){
        return function(){
          infoWindow.close();
          marker.setPosition({lat: this.getPosition().lat(),lng: this.getPosition().lng()});
          var content = createWindowContent(pointObj);
          $('.info_window_input').on('submit', pointObj, pointExists);
          infoWindow.setContent(content);
          infoWindow.open(map, marker)
        }
      })(marker, pointObj))

      google.maps.event.addListener(marker, 'dragend', function(event){
         $('.info_window_lat').val(this.getPosition().lat());
         $('.info_window_lng').val(this.getPosition().lng());
       })
    }

    // map options
    var options = {
      zoom:13,
      center:{lat: 49.2827, lng: -123.1207}
    };

    // initiate new map
    var map = new google.maps.Map(document.getElementById('map'), options);
    var infoWindow = new google.maps.InfoWindow();
    // remove the "/maps" part from the path to extract the map id
    var mapId = window.location.pathname.slice(6);
    console.log(mapId);
    var locations = [];
    loadMap(mapId);

    // add listener for clicks on map
    google.maps.event.addListener(map, 'click', function(event){
      var newPoint = {
        name: "",
        lat: event.latLng.lat(),
        long: event.latLng.lng()
      }
      addMarker(newPoint);
    });
});
