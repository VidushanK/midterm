$(document).ready(function(){

    loadMapLinks();

  function createMapElement(listName) {
    console.log(listName);

    // var html = `
    //    <li>
    //   <a href="/maps/${}> map <%=id%> </a>
    //         </li>
    //         <form method="POST" action="/maps/<%=id%>/delete">
    //         <input type = "submit" value = "Delete">
    //         </form>
    // `
  }

  function renderMapLinks(data){
    $('.mapNameContainer').empty();
    data.forEach(function(listName){
      var $list = createMapElement(listName);
      $('.mapNameContainer').append($list);
    });
  }

  function loadMapLinks(){
    $.ajax({
      method: "GET",
      url:    "/maps",
      dataType: "json",
      success: function(data){
        renderMapLinks(data);
      }
    })
    // $.getJSON('/maps').done(()=>{
    //   renderMapLinks()
    // });
  }

  function postMapName(event){
    event.preventDefault():
    const $form = $(this);
    $.ajax({
      type: 'POST',
      url: '/',
      data: $form.serialize()
    }).done(()=>{
      loadMapLinks();
    })
  }


});
