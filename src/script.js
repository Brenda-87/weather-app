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
/*  axios
    .get(`${forecastApiUrl}q=${inputCity.value}&units=${units}`)
    .then(handleForecastResponse);
}

  function handleForecastResponse(response) {
  let forecastDay1 = document.querySelector("#forecast-1");
  let forecastDay2 = document.querySelector("#forecast-2");
  let forecastDay3 = document.querySelector("#forecast-3");
  let forecastDay4 = document.querySelector("#forecast-4");
  let forecastDay5 = document.querySelector("#forecast-5");
  forecastDay1.innerHTML = Math.round(response.data.list[8].main.temp) + "°";
  forecastDay2.innerHTML = Math.round(response.data.list[16].main.temp) + "°";
  forecastDay3.innerHTML = Math.round(response.data.list[15].main.temp) + "°";
  forecastDay4.innerHTML = Math.round(response.data.list[22].main.temp) + "°";
  forecastDay5.innerHTML = Math.round(response.data.list[29].main.temp) + "°";
}*/

function handleWeatherResponse(response) {
  setCurrentTemperature(response);
  setWeatherDescriptors(response);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempFahrenheit = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempFahrenheit.innerHTML = Math.round(fahrenheitTemperature) + "°";
}

function showCelsiusTemp(event) {
  event.preventDefault();

  let tempCelsius = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempCelsius.innerHTML = Math.round(celsiusTemperature) + "°";
}

let celsiusTemperature = null;

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

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Amsterdam");
