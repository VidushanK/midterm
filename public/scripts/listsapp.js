$(function(){
var listMenu = $(".contain-lists");
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
