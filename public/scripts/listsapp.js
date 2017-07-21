$(function(){

var listMenu = $(".list-container");
  function addListToMenu(list) {
    listMenu.append(`<li class="${list.id}">${list.name}</li>`);
  }
  function loadLists(){
    $.ajax({
      url: "/lists",
      method: "GET",
    }).done(function(lists) {
      lists.forEach(addListToMenu);
    });
  }

  loadLists();


  // function addPointsToList(points) {

  // }

  // function loadPoints(){
  //   $.ajax({
  //     url: '/points',
  //     method: "GET"
  //   }).done(function(points){
  //     points.forEach(addPointsToList);
  //   });
  // }

  // $('.list-item').click(loadPoints);
}
