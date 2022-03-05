// Add variables

var searchButton = $(".searchButton");
//  Add API Keey
var apiKey = "861519be9cbc12d19fad9bfb53a63d3e";

// For Loop
for (var i = 0; i < localStorage.length; i++) {
    
    var city = localStorage.getItem(i);
    console.log(localStorage.getItem("City"));

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
        })
    }
})