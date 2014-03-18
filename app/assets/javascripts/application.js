// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {
  var $city = $('#city');
  var $state = $('#state');

  $('input[name="commit"]').click(function(event) {
    event.preventDefault(); // this will prevent a post to the server

    $city = $city.val();
    $state = $state.val();


    console.log($city);
    console.log($state);

    $.ajax({
      url : "http://api.wunderground.com/api/441472960cf74c21/geolookup/conditions/q/IA/Cedar_Rapids.json",
      dataType : "jsonp",
      success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      // alert("Current temperature in " + location + " is: " + temp_f);
      $('#weather').html('<h3>The Complete Works of ' + location + temp_f + '</h3>')
      console.log(parsed_json)
      }
    });// end of ajax request

  }); // end of input action

});