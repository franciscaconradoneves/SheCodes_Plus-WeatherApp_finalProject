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


    cityElement.innerHTML = response.data.name
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    windElement.innerHTML = Math.round(response.data.wind.speed)
    dayElement.innerHTML = formatDate(response.data.dt *1000)
}



let cityName ="France"
let apiKey = "6eb07ba03ae42dc9fd0ee53117b1409f"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`


axios.get(apiUrl).then(displayTemperature)