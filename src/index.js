function formatDate(timestamp) {
    let date = new Date(timestamp);
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
  }

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${hours}:${minutes}`;
  }

function displayTemperature(response) {
    let cityElement = document.querySelector("#city")
    let temperatureElement = document.querySelector("#currentTemperature")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dayElement = document.querySelector("#day-information")
    let weatherIconElement = document.querySelector("#weather-icon")


    cityElement.innerHTML = response.data.name
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    windElement.innerHTML = Math.round(response.data.wind.speed)
    dayElement.innerHTML = formatDate(response.data.dt *1000)
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}


function search(city) {
  let apiKey = "6eb07ba03ae42dc9fd0ee53117b1409f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}


function weatherSubmit(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}


function handlePosition(position){
  let latidude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "6eb07ba03ae42dc9fd0ee53117b1409f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latidude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}


function HandleCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}


let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", weatherSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", HandleCurrentLocation)

search("Porto");