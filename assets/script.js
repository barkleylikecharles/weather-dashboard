// Add variables

var searchButton = $(".searchButton");
//  Add API Keey
var apiKey = "861519be9cbc12d19fad9bfb53a63d3e";

// For Loop
for (var i = 0; i < localStorage.length; i++) {
    
    var city = localStorage.getItem(i);
    console.log(localStorage.getItem("city"));

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

searchButton.click(function (){

    var searchInput = $(".searchInput").val();

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            console.log(response.name);
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>")

            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Current Weather Append
            var currentCard = $(".currentCard");
            // currentCard.empty();
            // var currentName = currentCard.append("<p>");
            // currentCard.append(currentName);

            // Date adjustment
            var timeUTC = new Date(response.dt * 1000);
            currentCard.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentCard.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add temperature
            // var currentTemp = currentName.append("<p>");
            // currentName.append(currentTemp);
            currentCard.append("<p>" + "Temperature: " + response.main.temp + "</p>");

            currentCard.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

            currentCard.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV index 
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=861519be9cbc12d19fad9bfb53a63d3e&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                var currentUV = currentCard.append(`<p> UV Index: ${response.value} </p>`).addClass("card-text");
                currentUV.addClass("UV");
                // currentTemp.append(currentUV);
            });
        });

        // 5 Day Forecast
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");


                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
                
            })

        });
    }
});