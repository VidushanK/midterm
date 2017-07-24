$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj, disDelete, disSubmit) {
      return `<div>
        <form id="info_window_input" action="/maps/${mapId}/points" method="post">
          <textarea class="info_window_textarea" name="name">${pointObj.name}</textarea>
          <input type="hidden" name="lat" class="info_window_lat" value=${pointObj.lat}>
          <input type="hidden" name="long" class="info_window_lng" value=${pointObj.long}>
          <input type="submit" value="Submit" class="info_window_button" style="display:${disSubmit}">
        </form>
        <button class="info_window_delete_button" style="display:${disDelete}">Delete</button>
      </div>`;
    }

    function createListItem(pointObj){
      var $listItem =  `<div>
        <span>${pointObj.name}</span>
      </div>`;
      $(".list-container").append($listItem);
    }

    function postPoint(event){
      event.preventDefault();
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points`,
        data: $form.serialize()
      }).done(() => {
        loadMap(mapId);
      })
    }

    function deletePoint(event){
      event.preventDefault();
      const data = event.data;
      console.log($.param(data));
      $.ajax({
        type: 'POST',
        url: `/maps/${mapId}/points/delete`,
        data: $.param(data)
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

    //For adding marker
    function addMarker(pointObj){
      marker = new google.maps.Marker({
        position: {lat: Number(pointObj.lat), lng: Number(pointObj.long)},
        map: map,
      });

      if(pointObj.id){
        createListItem(pointObj);
      }

      google.maps.event.addListener(marker, 'click', (function(marker, pointObj){
        return function(){
          infoWindow.close();
          marker.setPosition({lat: this.getPosition().lat(),lng: this.getPosition().lng()});
          var content = '';
          if (pointObj.id){
            content = createWindowContent(pointObj, "block", "none");
          } else {
            content = createWindowContent(pointObj, "none", "block");
          }
          $('#info_window_input').on('submit', postPoint);
          $('.info_window_delete_button').on('click', pointObj, deletePoint);
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
