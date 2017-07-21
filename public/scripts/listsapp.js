$(function(){

  var listMenu = $(".new-list");

  function addListToMenu(list) {
    listMenu.append(`<li> <button id="list-item-${list.id}">${list.name}</button> </li>`);
    $(`#list-item-${list.id}`).bind('click',list, function(event){
      loadPoints(event.data.id);
    });
  }

  function loadLists() {
    $.ajax({
      url: "/lists",
      method: "GET",
    }).done(function(lists) {
      lists.forEach(addListToMenu);
    });
  }

  loadLists();

  function addPointsToList(point) {
    $(`#list-item-${point.list_id}`).append(`<li>${point.name}</li>`);
  }

  function loadPoints(list_id) {
    $.ajax({
      url: '/points',
      data: {
        list_id: list_id
      },
      method: "GET"
    }).done(function(points){
      points.forEach(addPointsToList);
    });
  }

});
