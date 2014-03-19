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
  var $output = $('#out');

    if (!navigator.geolocation){
      // navigator.geolocation is the object that publishes the geolocation API
      // if the API is not supported it will output an error
      $output.html("<p>Geolocation is not supported by your browser</p>");
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);

      $.ajax({
        url : "http://api.wunderground.com/api/441472960cf74c21/geolookup/q/" + latitude + "," + longitude + ".json",
        dataType : "jsonp",
        success : function(parsed_json) {
          console.log(parsed_json)
          var city = parsed_json['location']['city'];
          var state = parsed_json['location']['state'];
          city = city.replace(/\s+/g, "_");
          console.log(city);
          console.log(state);
          // ++++++++++++++++ We will insert our city and state values into the conditions ajax call
          $.ajax({
            url : "http://api.wunderground.com/api/441472960cf74c21/conditions/q/CA/San_Francisco.json"
          })
        }
      }); // end of initial AJAX call
    }; // end of success function

    function error() {
      $('#out').html("Unable to retrieve your location");
    };


    $('#out').html("<p>Locating…</p>");

    navigator.geolocation.getCurrentPosition(success, error);


})
// $(function() {
//   var $city = $('#city');
//   var $state = $('#state');

//   $('input[name="commit"]').click(function(event) {
//     event.preventDefault(); // this will prevent a post to the server

//     $city = $city.val().trim().replace(/\s+/g, "_");
//     // return the value of the city and if ther is any spaces they will be replaced with a '_' for ajax request
//     $state = $state.val().trim().toUpperCase();

//     // console.log($city);
//     // console.log($state);

//     $.ajax({
//       url : "http://api.wunderground.com/api/441472960cf74c21/conditions/q/"+ $state + "/" + $city + ".json",
//       dataType : "jsonp",
//       success : function(parsed_json) {
//         var location = parsed_json['current_observation']['display_location']['city']
//         var temp = parsed_json['current_observation']['temp_f'];
//         var weather = parsed_json['current_observation']['weather']

//         console.log(location);
//         console.log(temp);
//         console.log(weather);
//       } // end of ajax request
//     });// end of ajax request

//   }); // end of input action

// });