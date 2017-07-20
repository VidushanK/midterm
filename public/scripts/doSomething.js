$(document).ready(function() {
  const $submit = $('#form');
  $submit.submit(function(event) {
    console.log("Hi");
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'didSomething.html',
      success: function(didSomethingHtml) {
        console.log("Success: ", didSomethingHtml);
        $submit.replaceWith(didSomethingHtml);
      }
    });
  });
});
