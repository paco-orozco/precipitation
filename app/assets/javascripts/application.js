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
  // +++++++++++++++++++++++++++ Our Variables are very important ++++++++++++++++++++
  // this output element will be used to handle error notification and animation
  var $output = $('#out'); // the search div will only be shown as a default
  var city = '';
  var state = '';
  var location = '';
  var temp = 0;
  var weather = '';
  var visibility = ['Light Mist', 'Heavy Mist', 'Light Fog', 'Heavy Fog', 'Light Fog Patches',
  'Heavy Fog Patches', 'Patches of Fog', 'Shallow Fog', 'Partial Fog', 'Overcast', 'Light Haze',
  'Heavy Haze'];
  var green = ['Clear', 'Partly Cloudy', 'Mostly Cloudy', 'Scattered Clouds'];
  var red = ['Light Drizzle', 'Heavy Drizzle', 'Light Rain', 'Heavy Rain', 'Light Snow', 'Heavy Snow',
  'Light Snow Grains', 'Heavy Snow Grains', 'Light Ice Crystals', 'Heavy Ice Crystals', 'Light Ice Pellets',
  'Heavt Ice Pellets', 'Light Hail', 'Heavy Hail', 'Light Snow Showers', 'Heavy Snow Showers', 'Light Snow Blowing Snow Mist',
  'Heavy Snow Blowing Snow Mist', 'Light Ice Pellet Showers', 'Heavy Ice Pellet Showers', 'Light Hail Showers',
  'Heavy Hail Showers', 'Light Small Hail Showers', 'Heavy Small Hail Showers', 'Light Thunderstorm',
  'Heavy Thunderstorm', 'Light Thunderstorms and Rain', 'Heavy Thunderstorms and Rain', 'Light Thunderstorms and Snow',
  'Heavy Thunderstorms and Snow', 'Light Thunderstorms and Ice Pellets', 'Heavy Thunderstorms and Ice Pellets',
  'Light Thunderstorms with Hail', 'Heavy Thunderstorms with Hail', 'Light Thunderstorms with Small Hail',
  'Heavy Thunderstorms with Small Hail', 'Light Freezing Drizzle', 'Heavy Freezing Drizzle', 'Light Freezing Rain',
  'Heavy Freezing Rain', 'Light Freezing Fog', 'Heavy Freezing Fog'];
  var danger = ['Light Volcanic Ash', 'Heavy Volcanic Ash', 'Light Widespread Dust', 'Heavy Widespread Dust',
  'Light Sand', 'Heavy Sand', 'Light Spray', 'Heavy Spray', 'Light Dust Whirls', 'Heavy Dust Whirls',
  'Light Sandstorm', 'Heavy Sandstorm'];
  // +++++++++++++++++++++++ End of our Variables ++++++++++++++++++++++++++++++++
  $('#search').hide();

  var getLocation = function() {
    setTimeout(function(){
      // after the geo locationfails it will append the div with the form
      $('#out').hide()
      $('#search').show()
    }, 2000)
    // when this form is submitted it will make the ajax call
    $('input[name="commit"]').click(function(event) {
      event.preventDefault();
      // we will grab the text from our form and prepare it for the jsonp request
      // convert it to a value, trim empty spaces, and replace spaces between words with _
      // capitalize the state
      city = $('#city').val().trim().replace(/\s+/g, "_");
      state = $('#state').val().trim().toUpperCase();
      if(city == "" || state =="") {
        $('#action').append('<h2>error</h2>')
      } else {
      // make sure that our form has values
        $.ajax({
          url : "http://api.wunderground.com/api/441472960cf74c21/conditions/q/" + state + "/" + city + ".json",
          dataType : "jsonp",
          success : function(parsed_json) {
            var location = parsed_json['current_observation']['display_location']['city']
            var temp = parsed_json['current_observation']['temp_f'];
            var weather = parsed_json['current_observation']['weather']

            console.log(location);
            console.log(temp);
            console.log(weather);
            $('#search').hide();
            $('#results').append('<h1>' + location + temp + weather +'</h1>')
            // +++++++++++++++++++ parse through our arrays to determine the icons
            for(var i=0; i<green.length; i++){
              if(weather == green[i]) {
                $('#action').append('<img src="assets/running-256.png"/>');
                $('#climate').append('<img src="assets/partly_cloudy_day-256.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var j=0; j<red.length; j++){
              if(weather == red[j]) {
                $('#action').append('<img src="assets/livingroom-256.png"/>');
                $('#climate').append('<img src="assets/rain-256.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var k=0; k<danger.length; k++){
              if(weather == danger[k]) {
                $('#action').append('<img src="assets/self_distruct_button-256.png"/>');
                $('#climate').append('<img src="assets/explosion-256.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var l=0; l<visibility.length; l++){
              if(weather == visibility[l]) {
                $('#action').append('<img src="assets/flashlight-256.png"/>');
                $('#climate').append('<img src="assets/fog_night-256.png"/>');
              }
            }
            // ++++++++++++++++++++++ end of initial append +++++++++++++++++++++
            if(temp > 70 && temp < 98) {
              $('#clothing').html('<img src="assets/t_shirt-256.png"/>')
            }
            else if(temp > 45 && temp < 70) {
              $('#clothing').html('<img src="assets/jumper-256.png"/>')
            }
            else if(temp < 45) {
              $('#clothing').html('<img src="assets/jacket-256.png"/>')
            }
            else if(temp > 98) {
              $('#clothing').html('<img src="assets/shorts-256.png"/>')
            }
           //++++++++++++++++++++++++++++++++++++++++++++++++
          }
        })//end of ajax
      }
    })//end of input function
  }// end of getLocation

    if (!navigator.geolocation){
      // navigator.geolocation is the object that publishes the geolocation API
      // if the API is not supported it will output an error
      $output.html("<h1>Geolocation is not supported by your browser</h1>");
      getLocation();

    }

    function success(position) {
      // these points will determine our geolocation and will be used for our API calls
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      $.ajax({
        url : "http://api.wunderground.com/api/441472960cf74c21/geolookup/q/" + latitude + "," + longitude + ".json",
        dataType : "jsonp",
        success : function(parsed_json) {
          var city = parsed_json['location']['city'];
          var state = parsed_json['location']['state'];
          city = city.replace(/\s+/g, "_");
          // ++++++++++++++++ We will insert our city and state values into the conditions ajax call
          $.ajax({
            url : "http://api.wunderground.com/api/441472960cf74c21/conditions/q/" + state + "/" + city + ".json",
            dataType : "jsonp",
            success : function(parsed_json) {
              var location = parsed_json['current_observation']['display_location']['city']
              var temp = parsed_json['current_observation']['temp_f'];
              var weather = parsed_json['current_observation']['weather']

              console.log(location);
              console.log(temp);
              console.log(weather);
              $('#out').hide();
              $('#results').append('<h1>' + location + temp + weather +'</h1>')
              // +++++++++++++++++++ parse through our arrays to determine the icons
              for(var i=0; i<green.length; i++){
                if(weather == green[i]) {
                  $('#action').append('<img src="assets/running-256.png"/>');
                  $('#climate').append('<img src="assets/partly_cloudy_day-256.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var j=0; j<red.length; j++){
                if(weather == red[j]) {
                  $('#action').append('<img src="assets/livingroom-256.png"/>');
                  $('#climate').append('<img src="assets/rain-256.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var k=0; k<danger.length; k++){
                if(weather == danger[k]) {
                  $('#action').append('<img src="assets/self_distruct_button-256.png"/>');
                  $('#climate').append('<img src="assets/explosion-256.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var l=0; l<visibility.length; l++){
                if(weather == visibility[l]) {
                  $('#action').append('<img src="assets/flashlight-256.png"/>');
                  $('#climate').append('<img src="assets/fog_night-256.png"/>');
                }
              }
              // ++++++++++++++++++++++ end of initial append +++++++++++++++++++++
              if(temp > 70 && temp < 98) {
                $('#clothing').html('<img src="assets/t_shirt-256.png"/>')
              }
              else if(temp > 45 && temp < 70) {
                $('#clothing').html('<img src="assets/jumper-256.png"/>')
              }
              else if(temp < 45) {
                $('#clothing').html('<img src="assets/jacket-256.png"/>')
              }
              else if(temp > 98) {
                $('#clothing').html('<img src="assets/shorts-256.png"/>')
              }
             //++++++++++++++++++++++++++++++++++++++++++++++++
            }
          }) // end  of nested AJAX call (weather conditions)
        }
      }); // end of initial AJAX call (geolocation)
    }; // end of success function

    function error() {
      $('#out').html("<h1>Unable to retrieve your location</h1>");
      getLocation();
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