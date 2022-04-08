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

var weatherApiKey = "86796ec06d4bd2ee10aac5628e1bb374"
// Get longitute and latitude 
var getCurrentWeather = function (cityName) {
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ "&appid=" + weatherApiKey + "&units=imperial";

    fetch(urlCurrent).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
getCurrentWeather("hartford");
