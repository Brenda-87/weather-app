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

function search(city) {
  let units = "metric";
  axios.get(`${apiUrl}q=${city}&units=${units}`).then(handleWeatherResponse);
}

function submitCityTemperature(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  search(inputCity.value);
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3 text-center">
          <div class="card" style="width: 8rem;">
            <div class="card-body forecast">
              <h5 class="card-title">${formatForecast(forecastDay.dt)}</h5>
              <p class="card-text">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" /><br /><span
                  class="forecast-max"
                >
                  ${Math.round(forecastDay.temp.max)}° </span
                ><span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </p>
            </div>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleWeatherResponse(response) {
  setCurrentTemperature(response);
  setWeatherDescriptors(response);
}

function getForecast(coordinates) {
  let apiKey = "27c721cb43320f0be5b6cd5b37ef3579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function setCurrentTemperature(response) {
  let currentCity = document.querySelector("h1");
  let currentTemperature = document.querySelector("#current-temp");
  let currentHigh = document.querySelector(".current-high");
  let currentLow = document.querySelector(".current-low");
  let currentIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(celsiusTemperature) + "°";
  currentHigh.innerHTML = "H: " + Math.round(response.data.main.temp_max) + "°";
  currentLow.innerHTML = "L: " + Math.round(response.data.main.temp_min) + "°";
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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

let celsiusTemperature = null;

let now = new Date();

let updatedDate = document.querySelector("#date");

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

updatedDate.innerHTML = `${day}, ${hours}:${minutes}`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submitCityTemperature);

let gpsIcon = document.querySelector(".gps-icon");
gpsIcon.addEventListener("click", getCurrentPosition);

search("Amsterdam");
