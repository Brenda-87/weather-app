let apiKey = "27c721cb43320f0be5b6cd5b37ef3579";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&`;

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  axios
    .get(`${apiUrl}lat=${latitude}&lon=${longitude}&units=${units}&`)
    .then(setCurrentTemperature);
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
    .then(setCurrentTemperature);
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

let hours = now.getHours();
let minutes = now.getMinutes();
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
