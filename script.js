// this makes it so I don't have to type in the API key every time
var apiKey ="df11be48b9405b1dd21aaf171c243671"


// creates a click event for the search button
$("#searchButton").on("click",function(){
    var searchValue=$("#searchInput").val()
    console.log (searchValue)
    geoCode(searchValue)
})



function geoCode(searchValue){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        console.log (data)
        currentWeather(data[0].lat,data[0].lon)
        forecast(data[0].lat,data[0].lon)
    })
}



var currentDate= $("<h2>").text(dayjs().format("MM/DD/YYYY"))
function currentWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data =>{
        console.log (data)
        $("#currentWeather").empty()
var cityName=$("<h2>").text(data.name)
var temp=$("<h3>").text("Temp: "+data.main.temp)
var wind=$("<h3>").text("Wind Speed: "+data.wind.speed)
var humidity=$("<h3>").text("Humidity: "+data.main.humidity)
var icon=$("<img>").attr("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)


        $("#currentWeather").append(currentDate,cityName,temp,wind,humidity,icon)
    })
}



function forecast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data =>{
        console.log (data)
        $("#Forecast").empty()
        for(var i=4;i<data.list.length;i=i+8){
            var date=$("<h4>").text(moment.unix(data.list[i].dt).format("MM/DD/YYYY"))
            var temp=$("<p>").text("temp: "+data.list[i].main.temp)
            var windSpeed=$("<p>").text("Wind Speed: "+data.list[i].wind.speed)
            var humidity=$("<p>").text("Humidity: "+data.list[i].main.humidity)


          $("#Forecast").append(date,temp,windSpeed,humidity)  
        }
    })
}