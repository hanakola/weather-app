//Day and time

let now = new Date();
let dayTime = document.querySelector("#day-time");
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
dayTime.innerHTML = `${day} ${hours}:${minutes}`;

//Show temperature and description

function showTemperature(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

//Search city

function searchEngine(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = searchCity.value;
  let apiKey = "8cf2c4837407c5b40baa70eb9a2a5711";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

//Current location

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8cf2c4837407c5b40baa70eb9a2a5711";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);
