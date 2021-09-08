let apiKey = "27c721cb43320f0be5b6cd5b37ef3579";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&`;
let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&`;

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  axios
    .get(`${apiUrl}lat=${latitude}&lon=${longitude}&units=${units}&`)
    .then(handleWeatherResponse);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function submitCityTemperature(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let units = "metric";
  axios
    .get(`${apiUrl}q=${inputCity.value}&units=${units}`)
    .then(handleWeatherResponse);

  axios
    .get(`${forecastApiUrl}q=${inputCity.value}&units=${units}`)
    .then(handleForecastResponse);
}

function handleForecastResponse(response) {
  let forecastFriday = document.querySelector("#forecast-friday");
  console.log(response);
  forecastFriday.innerHTML = response.list[8].temp;
}

function handleWeatherResponse(response) {
  setCurrentTemperature(response);
  setWeatherDescriptors(response);
}

function setCurrentTemperature(response) {
  console.log(response);
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;

  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp) + "°";
  let currentHigh = document.querySelector(".current-high");
  currentHigh.innerHTML = "H: " + Math.round(response.data.main.temp_max) + "°";
  let currentLow = document.querySelector(".current-low");
  currentLow.innerHTML = "L: " + Math.round(response.data.main.temp_min) + "°";
}

function setWeatherDescriptors(response) {
  let weatherDescriptor = document.querySelector("#descriptor");
  weatherDescriptor.innerHTML = response.data.weather[0].description;
  let feelsLikeDescriptor = document.querySelector("#feels-like-descriptor");
  feelsLikeDescriptor.innerHTML =
    Math.round(response.data.main.feels_like) + "°";
  let humidityDescriptor = document.querySelector("#humidity-descriptor");
  humidityDescriptor.innerHTML = response.data.main.humidity + "%";
  let windDescriptor = document.querySelector("#wind-descriptor");
  windDescriptor.innerHTML = Math.round(response.data.wind.speed) + "m/s";
}

/*function tempCelsius() {
  let tempCelsius = document.querySelector(".current-temp");
  tempCelsius.innerHTML = 16;
}

function tempFahrenheit() {
  let tempFahrenheit = document.querySelector(".current-temp");
  tempFahrenheit.innerHTML = 66;
}*/

let now = new Date();

let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h4.innerHTML = `${day}, ${hours}:${minutes}`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCityTemperature);

let gpsIcon = document.querySelector(".gps-icon");
gpsIcon.addEventListener("click", getCurrentPosition);

getCurrentPosition();

/*let unitCelsius = document.querySelector("#unit-celsius");
unitCelsius.addEventListener("click", tempCelsius);

let unitFahrenheit = document.querySelector("#unit-fahrenheit");
unitFahrenheit.addEventListener("click", tempFahrenheit);
*/
