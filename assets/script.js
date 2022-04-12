
// Create variables for handling & storing the search form inputs 
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var citySearchTerm = document.querySelector("#city-search-form");
var fiveDayForecastCard = document.querySelector("#forecasted-weather-container");
var savedCitiesContainerEl = document.querySelector("saved-cities");

// Add submit functionality
var formSubmitHandler = function(event) {
    event.preventDefault();
// City entry variable for use in multiple functions (getCurrentWeather, saveCity) 
    var cityName = cityInputEl.value.trim();

        if (cityName) {
        getCurrentWeather(cityName);
        // saveCity(cityName);
        // get5DayForecast(cityName);
         cityInputEl.value = "";
        } else {
         alert("Please enter a City name in the search bar");
        }
    };

    //Function to save the city searches to local storage
// var cities = []
// var saveCity = function (cityName) {
//     localStorage.setItem("cities", JSON.stringify(cities));
//     console.log(cities);
//     savedCitiesContainerEl.document.createElement("li")
//     savedCitiesContainerEl.appendChild(saveCity, cities);
//     // saveCity.createElement('button');
//     // button.innerHTML = cityName;

//     // button.onclick = function () {
//     //     getCurrentWeather(cityName);
//     // };
//     // savedCitiesContainerEl.appendChild(saveCity);
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
            // saveCity(cityName)
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
    citySearchTerm.textContent = citySearch.toUpperCase();

   //Use moment to check and return current date for display
   var currentDate = document.createElement("p")
   currentDate.textContent=" (" + moment(weather.dt.value).format("M/D/YY") + ") ";
   citySearchTerm.appendChild(currentDate);

  //Utilize open weather api's weather icons and append 
   var weatherIcon = document.createElement("img")
  
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   currentWeatherContainerEl.appendChild(weatherIcon);

   //Temperature display utilizing a p element
   var tempEl = document.createElement("p");
   tempEl.textContent = "Current Temp: " + Math.round(weather.main.temp) + " °F";
   tempEl.classList = "list-group-item"
   currentWeatherContainerEl.appendChild(tempEl);

   //Humidity display utilizing a p element
   var humidityEl = document.createElement("p");
   humidityEl.textContent = "Humidity: " + Math.round(weather.main.humidity) + " %";
   humidityEl.classList = "list-group-item";
   currentWeatherContainerEl.appendChild(humidityEl);

   //Wind Speed display utilizing a p element
   var windSpeedEl = document.createElement("p");
   windSpeedEl.textContent = "Wind Speed: " + Math.round(weather.wind.speed) + " MPH";
   windSpeedEl.classList = "list-group-item";
   currentWeatherContainerEl.appendChild(windSpeedEl);
  
   let lon = weather.coord.lon;
   let lat = weather.coord.lat;
   console.log(lat, lon)
   getForecast(lat, lon);
};
// Open Weather API One Call to get UVI and daily weather forecast for 5 days
  var getForecast = function (lat, lon) {
    var urlDailyAndUvi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + weatherApiKey;

    fetch(urlDailyAndUvi).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            // displayCurrentWeather(data, cityName);
            console.log(data);

            var UviEl = document.createElement('p');
            UviEl.classList = "list-group-item";
            UviEl.textContent = "UVI:" + data.current.uvi;
            currentWeatherContainerEl.appendChild(UviEl)
            
            //Note severity of UV Index with colors (green, yellow, red, violet)
            if (data.current.uvi < 2) {
            UviEl.classList = "UVI-low"}
            
            //  } else if (data.current.uvi > 2) {
            // UviEl.classList = "UVI-mid"
            
        

            for (var i=1; i<6; i++){
             var targetCard = document.querySelector("#card-" + i);
             
             var dateEl = document.createElement("p");
             dateEl.textContent = moment(data.daily[i].dt * 1000).format("M/D/YY")
             targetCard.appendChild(dateEl);

             var weatherIconEl = document.createElement('img');
             weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
             targetCard.appendChild(weatherIconEl);

             var tempEl = document.createElement('p');
             tempEl.textContent = Math.round(data.daily[i].temp.day) + "°";
             targetCard.appendChild(tempEl);

             var windSpeedEl = document.createElement('p');
             windSpeedEl.textContent = "Wind:" + Math.round(data.daily[i].wind_speed) + " mph"
             targetCard.appendChild(windSpeedEl);

             var humidityEl = document.createElement('p');
             humidityEl.textContent = "Humidity:" + data.daily[i].humidity + " %";
             targetCard.appendChild(humidityEl);
            }


        });
    });
};
   
    

        

