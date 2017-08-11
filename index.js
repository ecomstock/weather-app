//const skycons = new Skycons();

$(document).ready(function() {
  console.log("READY");
  
  function findLatLong() {
    console.log("IN LATLONG");
    let latPos;
    let longPos;
    
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
      latPos = position.coords.latitude;
      longPos = position.coords.longitude; 
      getWeather(latPos, longPos);
      console.log("NAV.GEO SUCCESS");
    }
    
    function getWeather(latitude, longitude) {
      function displayWeather(data) {
        $('#temp').html(Math.round(data.currently.temperature) + "&deg;");
        $('#unit').click(function() {
          var clicks = $(this).data('clicks');
          if (clicks) {
            $('#temp').html(Math.round(data.currently.temperature) + "&deg;"); 
          } else {   
            $('#temp').html(Math.round((data.currently.temperature - 32) / 1.8) + "&deg;");
          }
          $(this).data("clicks", !clicks);
        });
        
        $('#forecast').html(data.hourly.summary);
        let skycons = new Skycons();
        skycons.add("icon1", data.currently.icon)
        skycons.play();
        console.log("API SUCCESS");
      }
      function displayCity(data) {
        console.log("IN CITY");
        $('#city').html(data.results[0].address_components[3].long_name);
      }
      $.ajax({
        dataType: "jsonp",
        url: "https://api.darksky.net/forecast/c9390ab45282a0eb042232d180560a3d/" +
          latitude +
          "," +
          longitude,
        success: displayWeather
      });
      $.ajax({
        dataType: "json",
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyDULMyngU97hmpEOG3kA6OQhgURMreoJI8",
        success: displayCity
      });
    }
  }
  findLatLong();  
});








