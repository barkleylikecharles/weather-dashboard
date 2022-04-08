
// Create variables for handling & storing the search form inputs 
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var citySearchTerm = document.querySelector("#city-search-form");

// Add submit functionality
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();

        if (cityName) {
        getCurrentWeather(cityName);
        getForecastedWeather(cityName);
         cityInputEl.value = "";
        } else {
         alert("Please enter a City name in the search bar");
        }
        // Save city search input to call back later from list
    //     saveCity();
    // console.log(event);
  };
//Function to save the city searches to local storage
// var saveCity = function(){
//     localStorage.setItem("cities", JSON.stringify(cities));
// };
// Variable to store API key to utilize in three different API calls
var weatherApiKey = "86796ec06d4bd2ee10aac5628e1bb374"
// Function to fetch the API data for current weather forecast using city name search functionality
var getCurrentWeather = function (cityName) {
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ "&appid=" + weatherApiKey + "&units=imperial";

    fetch(urlCurrent).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            displayCurrentWeather(data, cityName);
            // console.log(data);
        });
    });
};
searchFormEl.addEventListener("submit", formSubmitHandler);

// Function to display the current weather 
var displayCurrentWeather = function(weather, citySearch) {
    console.log(weather);
    console.log(citySearch);
    // Clear old input from search bar
    currentWeatherContainerEl.textContent = "";
    citySearchTerm.textContent = citySearch;

   //Use moment to check and return current date for display
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("M/D/YYYY") + ") ";
   citySearchTerm.appendChild(currentDate);

  //Utilize open weather api's weather icons and append 
   var weatherIcon = document.createElement("img")
  
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   currentWeatherContainerEl.appendChild(weatherIcon);

   //Temperature display utilizing a span element
   var tempEl = document.createElement("p");
   tempEl.textContent = "Current Temp: " + Math.round(weather.main.temp) + " °F";
   tempEl.classList = "list-group-item"
   currentWeatherContainerEl.appendChild(tempEl);

   //Humidity display utilizing a span element
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + Math.round(weather.main.humidity) + " %";
   humidityEl.classList = "list-group-item";
   currentWeatherContainerEl.appendChild(humidityEl);

   //Wind Speed display utilizing a span element
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + Math.round(weather.wind.speed) + " MPH";
   windSpeedEl.classList = "list-group-item";
   currentWeatherContainerEl.appendChild(windSpeedEl);
  
  };
// Function to fetch 5 day forecast from 5 Day/3 Hour open weather API
var getForecastedWeather = function (cityName) {
    var url5DayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName+ "&appid=" + weatherApiKey +"&units=imperial";

    fetch(url5DayForecast).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            display5DayForecast(data, cityName)
        });
    });
};
var display5DayForecast = function(weather, citySearch) {
    console.log(weather);
    console.log(citySearch);

    
// For loop to loop through the array returned from url5DayForecast
    var forecast = weather.list;
        for(var i=0; i<forecast.length; i++) {
            var dailyForecast = forecast[i];

            var dailyForecastEl=document.createElement("div");
            dailyForecastEl.classList = "list-item flex-row justify-space-between align-center";
          
            // create a span element to hold Forecast Date
            var forecastDateEl = document.createElement("div");
            forecastDateEl.textContent = " (" + moment(weather.dt.value).format("M/D/YYYY") + ") ";
          
            // append to container
            forecast.appendChild(forecastDateEl);
          
            // append container to the dom
            displayFiveDayForecastEl.appendChild(forecast);
        }
}
// 

//    //Use moment to check and return current date for display
//    var currentDate = document.createElement("span")
//    currentDate.textContent=" (" + moment(weather.dt.value).format("M/D/YYYY") + ") ";
//    citySearchTerm.appendChild(currentDate);

//   //Utilize open weather api's weather icons and append 
//    var weatherIcon = document.createElement("img")
//    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
//    currentWeatherContainerEl.appendChild(weatherIcon);

//    //Temperature display utilizing a span element
//    var tempEl = document.createElement("span");
//    tempEl.textContent = "Current Temp: " + weather.main.temp + " °F";
//    tempEl.classList = "list-group-item"
//    currentWeatherContainerEl.appendChild(tempEl);

//    //Humidity display utilizing a span element
//    var humidityEl = document.createElement("span");
//    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
//    humidityEl.classList = "list-group-item";
//    currentWeatherContainerEl.appendChild(humidityEl);

//    //Wind Speed display utilizing a span element
//    var windSpeedEl = document.createElement("span");
//    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
//    windSpeedEl.classList = "list-group-item";
//    currentWeatherContainerEl.appendChild(windSpeedEl);
  
//   };
