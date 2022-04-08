// Add variables
// var weatherFormEl = document.querySelector("#weather-form")
// var cityNameEl = document.querySelector("#searchInput")
// var currentContainer = document.querySelector("#currentWeather");

// var formHandler = function(event) {
//     event.preventDefault();

//     var searchInput = cityNameEl.value.trim();
//     if (searchInput) {
    // getCurrentWeather(cityName)
    
// }

// Create variables for handling & storing the search form inputs 
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#cityName");

// Add submit functionality
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();

        if (cityName) {
        getCurrentWeather(cityName);
         cityInputEl.value = "";
        } else {
         alert("Please enter a City Name in the search bar");
        }
    console.log(event);
  };
// Variable to store API key to utilize in two different API calls
var weatherApiKey = "86796ec06d4bd2ee10aac5628e1bb374"
// Function to fetch the API data for current weather forecast using city name search functionality
var getCurrentWeather = function (cityName) {
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ "&appid=" + weatherApiKey + "&units=imperial";

    fetch(urlCurrent).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
searchFormEl.addEventListener("submit", formSubmitHandler);
