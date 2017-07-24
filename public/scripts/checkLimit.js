$(function() {
  $( "textarea" ).focus();
  $( "textarea" ).click();
  $("textarea").hover(function(event) {

    var textlength = $(this).val().length
    if(textlength === 0){

      $(".errMsg").text("Form is empty!")
    } else {
      $(".errMsg").text("");
    }
  });
});
