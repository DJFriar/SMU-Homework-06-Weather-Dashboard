$(document).ready(function() {
    // global variables
    var now = moment().format("M/D/YYYY");
    var APIKey = "&units=imperial&appid=c04d3b0e71450877c96228b5595d876b";
    var weatherForecastAPIurl = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var currentWeatherAPIurl = "https://api.openweathermap.org/data/2.5/weather?q=";
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
        // fetch5DayForecast();

        // display the weather data
        // displayWeatherData();
    });

    function logCityToHistoryArea() {
        var historyListItem = $("<li>").attr("class","list-group-item");
        historyListItem.text(inputtedCity);
        $("#searchHistory").prepend(historyListItem);
    };

    function fetchCurrentWeather() {
        var queryURL = currentWeatherAPIurl + inputtedCity + APIKey;
        console.log(currentWeatherAPIurl + inputtedCity + APIKey);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            var weatherIcon = "";
            var temp = "";
            var humidity = "";
            var windSpeed = "";

            // extract the required data from the response
            weatherIcon = response.weather[0].icon;
            console.log(weatherIcon);
            temp = response.main.temp;
            humidity = response.main.humidity;
            windSpeed = response.wind.speed;

            // push the data to the front end
            displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon)
        });

        // alert("fetching current weather" + inputtedCity);
    };

    function fetch5DayForecast() {
        var queryURL = weatherForecastAPIurl + inputtedCity + APIKey;
        console.log(weatherForecastAPIurl + inputtedCity + APIKey);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
        });

        // alert("fetching 5-day forecast" + inputtedCity);
    };

    function displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon) {
        $("mainContent").empty();
        var iconSrc = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
        console.log("Icon Source = " + iconSrc);

        // fill in data
        $("#todaysDate").text(now);
        $("#cityName").text(inputtedCity);
        $("#weatherIcon").attr("src",iconSrc);
        $("#currentTemp").text(temp);
        $("#currentHumidity").text(humidity);
        $("#currentWindSpeed").text(windSpeed);
        $("#currentUV").text(inputtedCity);

        //show the data section
        $("#mainContent").fadeIn(500);
    };
});