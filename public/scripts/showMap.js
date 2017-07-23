$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj) {
      return `<div>
      <form class="info_window_input" action="/maps/:id/points" method="post">
          <textarea class="info_window_textarea" name="pointName">${pointObj.name}</textarea>
          <input type="hidden" name="pointLat" class="info_window_lat" value=${pointObj.lat}>
          <input type="hidden" name="pointLng" class="info_window_lng" value=${pointObj.long}>
          <input type="submit" value="Submit">
          <span class="info_window_confirmation" style="display: none">Submitted!</span>
        </form>
      </div>`;
    }

    function isValid() {
      var charLength = $(".info_window_textarea").val().length;
      if (!charLength) {
        alert("Empty form")
        return false;
      }
      return true;
    }

    function postPoint(){
      event.preventDefault();
      if (isValid()) {
        const $form = $(this);
        $.ajax({
          type: 'POST',
          url: '/maps/:id/points',
          data: $form.serialize()
        }).done(() => {
          $(".info_window_confirmation").attr('style', 'display: block');
        });
      }
    }

    // function updatePoint()

    function loadMap(mapId){
      // var fakeJSON = [
      // {
      //   name: "Tacofino",
      //   lat: 49.2827237,
      //   long: -123.1070068,
      //   list_id: 1
      // },
      // {
      //   name: "Steamworks",
      //   lat: 49.2831926,
      //   long: -123.1106117,
      //   list_id: 1
      // }];
      // fakeJSON.forEach((point)=>{
      //   addMarker(point);
      // })
      $.getJSON(`maps/${mapId}/points`).done((mapPoints)=>{
        locations = mapPoints;
        mapPoints.forEach((point)=>{
          addMarker(point);
        })
      })
    }

    // function pointExists(pointObj){
    //   if (pointObj.id){
    //     return updatePoint;
    //   } else {
    //     return postPoint;
    //   }
    // }

    //For adding marker
    function addMarker(pointObj){
      var lat = pointObj.lat;
      var lng = pointObj.long;
      var position = {lat, lng};
      marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true
      });

      google.maps.event.addListener(marker, 'click', (function(marker, pointObj){
        return function(){
          var lat = this.getPosition().lat();
          var lng = this.getPosition().lng();
          infoWindow.close();
          marker.setPosition({lat, lng});
          var content = createWindowContent(pointObj);
          infoWindow.setContent(content);
          $('.info_window_input').on('submit', postPoint);
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
    var mapId = window.location.pathname.slice(5);
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
