$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj, disDelete, disSubmit) {
      return `<div>
        <form id="info_window_input" action="/maps/${mapId}/points" method="post" style="display:${disSubmit}">>
          <textarea class="info_window_textarea" name="name">${pointObj.name}</textarea>
          <input type="hidden" name="lat" class="info_window_lat" value=${pointObj.lat}>
          <input type="hidden" name="long" class="info_window_lng" value=${pointObj.long}>
          <input type="submit" value="Submit" class="info_window_button">
        </form>
        <form id="info_window_delete" action="/maps/${mapId}/points/delete" method="post" style="display:${disDelete}">
          <div>${pointObj.name}</div>
          <input type="hidden" name="id" value=${pointObj.id}>
          <input type="submit" value="Delete">
        </form>
      </div>`;
    }

    function createListItem(pointObj){
      var $listItem =  `<div>
        <span>${pointObj.name}</span>
      </div>`;
      $(".list-container").append($listItem);
    }

    function postPoint(event){
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points`,
        data: $form.serialize()
      });
    }

    function deletePoint(event){
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points`,
        data: $form.serialize()
      });
    }

    function loadMap(mapId){
      $.getJSON(`${mapId}/points`).done((mapPoints)=>{
        mapPoints.forEach((point)=>{
          addMarker(point);
        })
      })
    }

    //For adding marker
    function addMarker(pointObj){
      marker = new google.maps.Marker({
        position: {lat: Number(pointObj.lat), lng: Number(pointObj.long)},
        map: map,
      });

      if(pointObj.id){
        createListItem(pointObj);
      }

      console.log(pointObj);

      google.maps.event.addListener(marker, 'click', (function(marker, pointObj){
        return function(){
          infoWindow.close();
          console.log(pointObj);
          marker.setPosition({lat: this.getPosition().lat(),lng: this.getPosition().lng()});
          var content = '';
          if (pointObj.id){
            content = createWindowContent(pointObj, "block", "none");
          } else {
            content = createWindowContent(pointObj, "none", "block");
          }
          $('#info_window_input').on('submit', postPoint);
          $('#info_window_delete').on('submit', deletePoint);
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        }
      })(marker, pointObj))
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
