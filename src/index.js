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
  
    return `${formatDate(timestamp)} ${hours}:${minutes}`;
  }

  function formatDate(timestamp) {
    let date = new Date(timestamp);
  
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"      
    ];
    let day = days[date.getDay()];
    return `${day}`;
  }

  function forecast(response) {
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 1 ; index < 7; index++) {
      forecast = response.data.daily[index];
      forecastElement.innerHTML += `
      <div class="col-2">
      <h3>
        ${formatDate(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.temp.max)}°/
        </strong>
        ${Math.round(forecast.temp.min)}°
      </div>
      </div>
      `;
    }
  }



function displayTemperature(response) {
    let cityElement = document.querySelector("#city")
    let temperatureElement = document.querySelector("#currentTemperature")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dayElement = document.querySelector("#day-information")
    let weatherIconElement = document.querySelector("#weather-icon")

    temperatureInCelsius = Math.round(response.data.main.temp)

    cityElement.innerHTML = response.data.name
    temperatureElement.innerHTML = temperatureInCelsius
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    windElement.innerHTML = Math.round(response.data.wind.speed)
    dayElement.innerHTML = formatHours(response.data.dt *1000)
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIconElement.setAttribute("alt", response.data.weather[0].description);
    

    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;

    let apiKey = "6eb07ba03ae42dc9fd0ee53117b1409f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(forecast);

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


function toFahrenheit(event){
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");

  currentTemperature.innerHTML = Math.round((temperatureInCelsius *9)/5 +32);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}


function toCelsius(event){
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = temperatureInCelsius;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}





let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", weatherSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", HandleCurrentLocation);

let temperatureInCelsius = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);

search("Porto");