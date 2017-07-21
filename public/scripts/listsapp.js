$(function(){
var listMenu = $(".sidebar-nav");
  function addListToMenu(list) {
    listMenu.append("something");
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
