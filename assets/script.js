$(document).ready(function() {
    var APIKey = "&appid=c04d3b0e71450877c96228b5595d876b";
    var weatherForecastAPIurl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var currentWeatherAPIurl = "";

    // handle the search button click
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        var inputtedCity = $("#searchField").val();

        fetchCurrentWeather(inputtedCity);
        fetch5DayForecast(inputtedCity);
    });

    function fetchCurrentWeather(inputtedCity) {
        
        alert("fetching current weather" + inputtedCity);
    };

    function fetch5DayForecast(inputtedCity) {
        
        var queryURL = weatherForecastAPIurl + inputtedCity + APIKey;
        console.log(weatherForecastAPIurl + inputtedCity + APIKey);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
          });

        alert("fetching 5-day forecast" + inputtedCity);
    };
});