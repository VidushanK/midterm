$(function(){
var listMenu = $(".list-container");
  function addListToMenu(list) {
    listMenu.append(`<li>${list.name}</li>`);
  }
  function loadLists(){
    $.ajax({
      url: "/lists",
      method: "GET",
    }).done(function(lists) {
      lists.forEach(addListToMenu);
    })
  }
  loadLists();
});
