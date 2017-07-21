$(function(){

  var listMenu = $(".new-list");

  function addListToMenu(list) {
    listMenu.append(`<li>
      <div class="list-button btn btn-default" data-id="${list.id}">${list.name}</div>
      <div class="list-points"></div>
      </li>`);
  }


  $('.list-button').ready(function(){

    loadPoints($(this).data("id"));
  });

  function loadLists() {
    $.ajax({
      url: "/lists",
      method: "GET",
    }).done(function(lists) {
      lists.forEach(addListToMenu);
    });
  }

  loadLists();

  function addPointToList(point,listPoints) {

    listPoints.append(`<div>${point.name}</div>`);
  }

  function loadPoints(list_id) {
    $.ajax({
      url: '/points',
      data: {
        list_id: list_id
      },
      method: "GET"
    }).done(function(points){
      var listPoints = $(`[data-id=${list_id}]`).parent().find(".list-points");
      listPoints.empty()
      points.forEach(function(point){
        addPointToList(point,listPoints);
      });
    });
  }

});
