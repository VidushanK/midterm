$(document).ready(function(){
    // For creating content of infoWindow
    function createWindowContent(pointObj, disDelete, disSubmit) {
      return `<div>
        <form id="info_window_input" action="/maps/${sanitize(mapId)}/points" method="post" style="display:${disSubmit}">
          <textarea class="info_window_textarea" name="name">${sanitize(pointObj.name)}</textarea>
          <input type="hidden" name="lat" class="info_window_lat" value=${sanitize(pointObj.lat)}>
          <input type="hidden" name="long" class="info_window_lng" value=${sanitize(pointObj.long)}>
          <input type="submit" value="Submit" class="info_window_button btn btn-primary">
        </form>
        <form id="info_window_delete" action="/maps/${mapId}/points/delete" method="post" style="display:${disDelete}">
          <div class="textarea-delete">${sanitize(pointObj.name)}</div>
          <input type="hidden" name="id" value=${sanitize(pointObj.id)}>
          <input class="btn btn-danger"type="submit" value="Delete">
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
        url: `/maps/${mapId}/points/delete`,
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
      center:{lat: 49.2827, lng: -123.1207},
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#939393'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
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
