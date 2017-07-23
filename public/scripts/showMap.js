$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj, buttonVal, visibility) {
      return `<div>
        <form id="info_window_input" action="/maps/${mapId}/points" method="post">
          <textarea class="info_window_textarea" name="name">${pointObj.name}</textarea>
          <input type="hidden" name="lat" class="info_window_lat" value=${pointObj.lat}>
          <input type="hidden" name="long" class="info_window_lng" value=${pointObj.long}>
          <input type="submit" value="${buttonVal}" class="info_window_button">
        </form>
        <button class="info_window_delete_button" style="display:${visibility}">Delete</button>
      </div>`;
    }

    function postPoint($form){
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points`,
        data: $form.serialize()
      }).done(() => {
        loadMap(mapId);
      })
    }

    function updatePoint($form){
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points/update`,
        data: $form.serialize()
      }).done(() => {
        loadMap(mapId);
      })
    }

    function deletePoint(event){
      event.preventDefault();
      const data = event.data;
      const $form = $(document).getElementById("info_window_input");
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points/delete`,
        data: $form.serialize()
      }).done(()=>{
        loadMap(mapId);
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
      const data = event.data;
      const $form = $(this);
      if(!data.id){
        postPoint($form);
      } else {
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
          var content = '';
          if(pointObj.id){
            content = createWindowContent(pointObj, "Update", "block");
          } else {
            content = createWindowContent(pointObj, "Submit", "none");
          }
          $('#info_window_input').on('submit', pointObj, pointExists);
          $('.info_window_delete_button').on('click', pointObj, deletePoint);
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        }
      })(marker, pointObj))

      google.maps.event.addListener(marker, 'dragend', function(event){
         $('.info_window_lat').val(this.getPosition().lat());
         $('.info_window_lng').val(this.getPosition().lng());
       })
    }

    // map options
    const options = {
      zoom:13,
      center:{lat: 49.2827, lng: -123.1207}
    };

    // initiate new map
    const map = new google.maps.Map(document.getElementById('map'), options);
    let infoWindow = new google.maps.InfoWindow();

    // extract the map id
    let mapId = window.location.pathname.slice(6);
    console.log(mapId);
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
