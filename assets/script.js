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
            // set up required variables
            var weatherIcon = "";
            var temp = "";
            var humidity = "";
            var windSpeed = "";
            var lat = "";
            var long = "";

            // extract the required data from the response
            lat = response.coord.lat;
            long = response.coord.lon;
            weatherIcon = response.weather[0].icon;
            temp = response.main.temp;
            humidity = response.main.humidity;
            windSpeed = response.wind.speed;

            // Since we have to use ES5, pass everything over to the UVI function which will also push the data to the screen
            fetchCurrentUVI(lat, long, temp, humidity, windSpeed, weatherIcon);
        });
    };

    function fetchCurrentUVI(lat, long, temp, humidity, windSpeed, weatherIcon) {
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
            var uviIndex = response.value

            // display everything on the screen
            displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon, uviIndex);
        });
    }

    function fetch5DayForecast() {
        var queryURL = weatherForecastAPIurl + inputtedCity + weatherAPIunits + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              var truncatedResponse = $(response.list).slice(0,5);

              // set up required variables
              var date = "";
              var dayOffset = 1;
              var weatherIcon = "";
              var temp = "";
              var humidity = "";

              // extract the required data from the response
              truncatedResponse.each(function(index) {
                  
                date = moment().add(index+1, "d").format("M/D/YYYY");
                weatherIcon = response.list[index].weather[0].icon
                temp = response.list[index].main.temp;
                humidity = response.list[index].main.humidity;

                displayFutureWeatherData(date, weatherIcon, temp, humidity, index);
              });
              

              // push results to browser
              showFutureForecast();

        });

    };

    function displayCurrentWeatherData(temp, humidity, windSpeed, weatherIcon, uviIndex) {
        var iconSrc = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";

        // color code the UV Index
        switch (Math.floor(uviIndex)) {
            case 0:
            case 1:
            case 2:
                $("#currentUV").attr("style", "background-color: green; color: white;");
                break;
            case 3:
            case 4:
            case 5:
                $("#currentUV").attr("style", "background-color: yellow;");
                break;
            case 6:
            case 7:
                $("#currentUV").attr("style", "background-color: orange;");
                break;
            case 8:
            case 9:
            case 10:
                $("#currentUV").attr("style", "background-color: red; color: white;");
                break;
            default:
                $("#currentUV").css("background-color: violet;");
                break;
        }

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

    function displayFutureWeatherData(date, weatherIcon, temp, humidity, index) {
        
        // var index = 1;
        var iconSrc = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";

        // fill in data
        $("#date-"+index).text(date);
        $("#weatherIcon-"+index).attr("src",iconSrc);
        $("#temp-"+index).text("Temp: " + temp);
        $("#humidity-"+index).text("Humidity: " + humidity);
        
    };

    function showFutureForecast() {
        var time = moment().format("h:mma");
        $("#lastUpdated").text("Last updated at " + time + ".");
        $("#futureForecast").fadeIn(500);
        $("#lastUpdatedNotice").fadeIn(500);
    }

    // handle the city history click
    $(".list-group-item").on("click", function() {
        alert("Clicked a city!");
    });

});