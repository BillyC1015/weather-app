var apiKey ="df11be48b9405b1dd21aaf171c243671"



$("#searchButton").on("click",function(){
    var searchValue=$("#searchInput").val()
    console.log (searchValue)
    geoCode(searchValue)
})



function geoCode(searchValue){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${apiKey}`)
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
var cityName=$("<h2>").text(data.name)
var temp=$("<h3>").text("Temp: "+data.main.temp)
var wind=$("<h3>").text("Wind Speed: "+data.wind.speed)
var humidity=$("<h3>").text("Humidity: "+data.main.humidity)
var icon=$("<img>").attr("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)


        $("#currentWeather").append(currentDate,cityName,temp,wind,humidity,icon)
    })
}



function forecast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        console.log (data)
    })
}