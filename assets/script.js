$(document).ready(function() {
    // global variables
    var now = moment().format("M/D/YYYY");
    var APIKey = "&appid=c04d3b0e71450877c96228b5595d876b";
    var weatherForecastAPIurl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var currentWeatherAPIurl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var weatherAPIunits = "&units=imperial";
    var inputtedCity = "";

    // handle the search button click
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        // capture the user's input
        var rawInputtedCity = $("#searchField").val();
        
        // make everything title case and pretty
        inputtedCity = rawInputtedCity.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
            return txtVal.toUpperCase();
        });

        // add city to the search history
        logCityToHistoryArea();

        // fetch the weather data
        fetchCurrentWeather();
        fetch5DayForecast();

        // display the weather data
        displayWeatherData();
    });

    function logCityToHistoryArea() {
        var historyListItem = $("<li>").attr("class","list-group-item");
        historyListItem.text(inputtedCity);
        $("#searchHistory").prepend(historyListItem);
    };

    function fetchCurrentWeather() {
        var queryURL = currentWeatherAPIurl + inputtedCity + weatherAPIunits + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);

            // set up required variables
            var weatherIcon = "";
            var temp = "";
            var humidity = "";
            var windSpeed = "";
            var uviIndex = "";
            var lat = "";
            var long = "";

            // extract the required data from the response
            lat = response.coord.lat;
            long = response.coord.lon;
            uviIndex = fetchCurrentUVI(lat, long);
            weatherIcon = response.weather[0].icon;
            temp = response.main.temp;
            humidity = response.main.humidity;
            windSpeed = response.wind.speed;

            // push the data to the front end
            displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon, uviIndex);
        });
    };

    function fetchCurrentUVI(lat, long) {
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            var uvi = response.value
            return(uvi);
        });
    }

    function fetch5DayForecast() {
        var queryURL = weatherForecastAPIurl + inputtedCity + weatherAPIunits + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);

              // set up required variables
              var weatherIcon = "";
              var temp = "";
              var humidity = "";

              // extract the required data from the response
              weatherIcon = response.list[0].weather[0].icon
              temp = response.list[0].main.temp;
              humidity = response.list[0].main.humidity;

              // push results to browser
              console.log("Day 1 Temp: " + temp);
              console.log("Day 1 Humidity: " + humidity);
              displayFutureWeatherData();

        });

        // alert("fetching 5-day forecast" + inputtedCity);
    };

    function displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon, uviIndex) {
        $("#currentWeather").empty();
        var iconSrc = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";

        // fill in data
        $("#todaysDate").text(now);
        $("#cityName").text(inputtedCity);
        $("#weatherIcon").attr("src",iconSrc);
        $("#currentTemp").text(temp);
        $("#currentHumidity").text(humidity);
        $("#currentWindSpeed").text(windSpeed);
        $("#currentUV").text(uviIndex);

        // show the data section
        $("#currentWeather").fadeIn(500);
    };

    function displayFutureWeatherData() {
        // $("#futureForecast").empty();

        // fill in data

        // show the data section
        $("#futureForecast").fadeIn(500);
    };

});