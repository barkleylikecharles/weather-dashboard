
// Create variables for handling & storing the search form inputs 
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-name");
var currentWeatherContainerEl = document.querySelector("#current-weather-container");
var citySearchTerm = document.querySelector("#city-search-form");
var fiveDayForecastCard = document.querySelector("#forecasted-weather-container")

// Add submit functionality
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();

        if (cityName) {
        getCurrentWeather(cityName);
        // get5DayForecast(cityName);
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
   var currentDate = document.createElement("p")
   currentDate.textContent=" (" + moment(weather.dt.value).format("M/D/YYYY") + ") ";
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

            for (var i=1; i<6; i++){
             var targetCard = document.querySelector("#card-" + i);
             
             var dateEl = document.createElement("p");
             dateEl.textContent = moment(data.daily[i].dt * 1000).format("M D YYYY")
             targetCard.appendChild(dateEl);

             var weatherIconEl = document.createElement('img');
             weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
             targetCard.appendChild(weatherIconEl);

             var tempEl = document.createElement('p');
             tempEl.textContent = Math.round(data.daily[i].temp.day) + "°";
             targetCard.appendChild(tempEl);

             var windSpeedEl = document.createElement('p');
             windSpeedEl.textContent = "Wind Speed:" + Math.round(data.daily[i].wind_speed) + "MPH"
             targetCard.appendChild(windSpeedEl);

             var humidityEl = document.createElement('p');
             humidityEl.textContent = "Humidity:" + data.daily[i].humidity + " %";
             targetCard.appendChild(humidityEl);
            }

        



        });
    });
};
    // });
    // fetch(urlCurrent).then(function(response) {
    // console.log(response);
    // response.json().then(function(data) {
    //     displayCurrentWeather(data, cityName);
    //     // console.log(data);
    
// Function to fetch 5 day forecast from 5 Day/3 Hour open weather API
// var get5DayForecast = function (cityName) {
//     var url5DayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName+ "&appid=" + weatherApiKey +"&units=imperial";

//     fetch(url5DayForecast).then(function(response) {
//         console.log(response);
//         response.json().then(function(data) {
//             display5DayForecast(data, cityName)
//         });
//     });
// };
// var display5DayForecast = function(weather, citySearch) {
//     console.log(weather);
//     console.log(citySearch);

//     for(var i = 0; i < weather.list.length; i=i+8){
//         console.log(weather.list[i]);
//     }

    
// }
// var date, temp, precipitation, windspeed, icon;
//     // function displayForecast(weather, citySearch) {
        
//         for(var i = 0; i < 5; i=i+8){
//             date = weather[i].daily.dt;
//             temp = weather[i].daily.temp;
//             precipitation = weather[i].daily.rain;
//             windspeed = weather[i].daily.wind_speed;
//             icon = weather[i].daily.weather.icon;
//             console.log(date);
    
//             createCard(date, temp, precipitation, windspeed);
//         }
//     }
    
//     function createCard(date, temp, precipitation, windspeed){
//         var card = document.createElement("div");
//         card.innerHTML = `
//         <h4>${t}</h4>
//         <p>${a}</p>
//         <p><a href="${u}" class="text-xl text-red-500" target="_blank">READ MORE</a></p>
//         `;
    
//         document.getElementById('card-2').appendChild(card);
    
//     }   
// For loop to loop through the array returned from url5DayForecast
    // var forecast = weather.list;
    //     for(var i=0; i<forecast.length; i++) {
    //         var dailyForecast = forecast[i];

    //         var dailyForecastEl=document.createElement("div");
    //         dailyForecastEl.classList = "list-item flex-row justify-space-between align-center";
          
    //         // create a span element to hold Forecast Date
    //         var forecastDateEl = document.createElement("div");
    //         forecastDateEl.textContent = " (" + moment(weather.dt.value).format("M/D/YYYY") + ") ";
          
    //         // append to container
    //         forecast.appendChild(forecastDateEl);
          
    //         // append container to the dom
    //         displayFiveDayForecastEl.appendChild(forecast);
        


  
