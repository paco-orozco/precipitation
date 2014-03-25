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
  var getCity = '';
  var getState = '';
  var temp = 0;
  var weather = '';
  var wind = '';
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
            var getCity = parsed_json['current_observation']['display_location']['city'];
            var getState = parsed_json['current_observation']['display_location']['state'];
            var temp = parsed_json['current_observation']['temp_f'];
            var weather = parsed_json['current_observation']['weather'];
            var wind = parsed_json['current_observation']['wind_string'];

            console.log(getCity);
            console.log(wind)
            console.log(temp);
            console.log(weather);
            $('#search').hide();
            $('#area').append('<h1>' + getCity + ", " + getState +'</h1>');
            // $('#conditions').append('<h2>' + weather + " " + temp + "° " + '</h2>');
            // +++++++++++++++++++ parse through our arrays to determine the icons
            for(var i=0; i<green.length; i++){
              if(weather == green[i]) {
                $('#action').append('<img class="hatch" src="assets/running-128.png"/>');
                $('#climate').append('<img class="hatch" src="assets/partly_cloudy_day-128.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var j=0; j<red.length; j++){
              if(weather == red[j]) {
                $('#action').append('<img  class="hatch" src="assets/livingroom-128.png"/>');
                $('#climate').append('<img class="hatch" src="assets/rain-128.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var k=0; k<danger.length; k++){
              if(weather == danger[k]) {
                $('#action').append('<img class="hatch" src="assets/self_distruct_button-128.png"/>');
                $('#climate').append('<img class="hatch" src="assets/explosion-128.png"/>');
              }
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for(var l=0; l<visibility.length; l++){
              if(weather == visibility[l]) {
                $('#action').append('<img class="hatch" src="assets/flash_light-128.png"/>');
                $('#climate').append('<img class="hatch" src="assets/fog_night-128.png"/>');
              }
            }
            // ++++++++++++++++++++++ end of initial append +++++++++++++++++++++
            if(temp > 70 && temp < 98) {
              $('#clothing').html('<img class="hatch" src="assets/t_shirt-128.png"/>');
            }
            else if(temp > 45 && temp < 70) {
              $('#clothing').html('<img class="hatch" src="assets/jumper-128.png"/>');
            }
            else if(temp < 45) {
              $('#clothing').html('<img class="hatch" src="assets/jacket-128.png"/>');
            }
            else if(temp > 98) {
              $('#clothing').html('<img class="hatch" src="assets/shorts-128.png"/>');
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
              var getCity = parsed_json['current_observation']['display_location']['city'];
              var getState = parsed_json['current_observation']['display_location']['state'];
              var temp = parsed_json['current_observation']['temp_f'];
              var weather = parsed_json['current_observation']['weather'];
              var wind = parsed_json['current_observation']['wind_string'];

              console.log(getCity);
              console.log(temp);
              console.log(wind);
              console.log(weather);
              $('#out').hide();
              $('#area').append('<h1>' + getCity + ", " + getState +'</h1>');
              $('#conditions').append('<h2>' + weather + " " + temp + "° " + '</h2>');
              // +++++++++++++++++++ parse through our arrays to determine the icons
              for(var i=0; i<green.length; i++){
                if(weather == green[i]) {
                  $('#action').append('<img class="hatch" src="assets/running-128.png"/>');
                  $('#climate').append('<img class="hatch" src="assets/partly_cloudy_day-128.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var j=0; j<red.length; j++){
                if(weather == red[j]) {
                  $('#action').append('<img class="hatch" src="assets/livingroom-128.png"/>');
                  $('#climate').append('<img class="hatch" src="assets/rain-128.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var k=0; k<danger.length; k++){
                if(weather == danger[k]) {
                  $('#action').append('<img class="hatch" src="assets/self_distruct_button-128.png"/>');
                  $('#climate').append('<img class="hatch" src="assets/explosion-128.png"/>');
                }
              }
              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              for(var l=0; l<visibility.length; l++){
                if(weather == visibility[l]) {
                  $('#action').append('<img class="hatch" src="assets/flash_light-128.png"/>');
                  $('#climate').append('<img class="hatch" src="assets/fog_night-128.png"/>');
                }
              }
              // ++++++++++++++++++++++ end of initial append +++++++++++++++++++++
              if(temp > 70 && temp < 98) {
                $('#clothing').html('<img class="hatch" src="assets/t_shirt-128.png"/>');
              }
              else if(temp > 45 && temp < 70) {
                $('#clothing').html('<img class="hatch" src="assets/jumper-128.png"/>');
              }
              else if(temp < 45) {
                $('#clothing').html('<img class="hatch" src="assets/jacket-128.png"/>');
              }
              else if(temp > 98) {
                $('#clothing').html('<img class="hatch" src="assets/shorts-128.png"/>');
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
