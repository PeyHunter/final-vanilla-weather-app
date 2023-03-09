function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`
  }
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wen",
    "Thu",
    "Fri",
    "Sat",
    
  ];
  let day = days[date.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",  
];

let month = months[date.getMonth()];
  return `${month}, ${day} ${hours}:${minutes}`;
}


//get curren Temp + city name
function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempereture = document.querySelector("#cityTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#currentIcon");
  cityElement.innerHTML = response.data.city;
  celciusTemperature = Math.round(response.data.temperature.current);
  temperetureElement = Math.round(celciusTemperature);
  tempereture.innerHTML = temperetureElement;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  getForecast(response.data.city);
}

function search(city = "Copenhagen") {
  let apiKey = `f9do3fd4558cd9a56ebf7d2bbtab042b`; 
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp)
}

window.addEventListener("load", () => {
  search();
});

function handleSubmit(event) {
event.preventDefault(); 
let searchCity = document.querySelector("#city-input")
search(searchCity.value)
}

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", handleSubmit)





//GeoLocation button
function currentTemp (response) {
  let cityElement = document.querySelector("#city");
  let tempereture = document.querySelector("#cityTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#currentIcon");
  
  cityElement.innerHTML = response.data.city;
  celciusTemperature = Math.round(response.data.temperature.current)
  temperetureElement = Math.round(celciusTemperature);

  tempereture.innerHTML = temperetureElement;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function currentPosistion(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=f9do3fd4558cd9a56ebf7d2bbtab042b`;
  axios.get(apiUrl).then(currentTemp);
}

function currentPlace() {
    navigator.geolocation.getCurrentPosition(currentPosistion)
  }
  
  let currentBotton = document.querySelector("#currentLocationButton")
  currentBotton.addEventListener("click", currentPlace)
  navigator.geolocation.getCurrentPosition(currentPosistion)





  //Forecast

function formatTime(timestamp) {
let date = new Date(timestamp * 1000)
let day = date.getDay();
let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wen",
    "Thu",
    "Fri",
    "Sat",
    
  ];


return days[day]  
}

function displayForcast(response) {
let forecast = response.data.daily;

  let forcastElement = document.querySelector("#forcast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) { 
    forecastHTML = forecastHTML + `
            <div class="col">
              <p class="weekdaysDate">${formatTime(forecastDay.time)}</p>
             
              <img
                src="${forecastDay.condition.icon_url}"
                alt=""
                class="forecastEmojies"
              />
              <div class="forecastTemp">
                <span class="max"> ${Math.round(forecastDay.temperature.maximum)}° | </span>
                <span class="min"> ${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
              <p class="note">${forecastDay.condition.description}</p>
            </div>
`;
}
  })
forecastHTML = forecastHTML + `<div/>`
forcastElement.innerHTML = forecastHTML 
}



function getForecast(city = "Copenhagen") {
  let apiKey = `f9do3fd4558cd9a56ebf7d2bbtab042b`; 
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}