$(document).ready(function() {
    var APIKey = "&units=imperial&appid=c04d3b0e71450877c96228b5595d876b";
    var weatherForecastAPIurl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var currentWeatherAPIurl = "https://api.openweathermap.org/data/2.5/weather?q=";

    // handle the search button click
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        var inputtedCity = $("#searchField").val();

        fetchCurrentWeather(inputtedCity);
        fetch5DayForecast(inputtedCity);
        displayWeatherData();
    });

    function fetchCurrentWeather(inputtedCity) {
        var queryURL = currentWeatherAPIurl + inputtedCity + APIKey;
        console.log(currentWeatherAPIurl + inputtedCity + APIKey);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
        });

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

    function displayWeatherData() {
        $("#mainContent").text("Weather Data Goes Here");
    };
});