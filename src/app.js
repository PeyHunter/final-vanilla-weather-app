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

function displayForcast() {
  let forcastElement = document.querySelector("#forcast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
            <div class="col">
              <p class="weekdaysDate">${day}</p>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                alt=""
                class="forecastEmojies"
              />
              <div class="forecastTemp">
                <span class="max"> 12° | </span>
                <span class="min"> 15°</span>
              </div>
              <p class="note">Rainy all day</p>
            </div>
          
`;
  })
forecastHTML = forecastHTML + `<div/>`
forcastElement.innerHTML = forecastHTML 
console.log(forecastHTML)
}




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
console.log(searchCity.value) 
}

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", handleSubmit)

//GeoLocation
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


//Celsius & Farhenheit
let temperetureElement = null;
let celciusTemperature = null;
displayForcast();

	function displayFerTemp(event) {
  event.preventDefault();
  let newTemperetureElement = document.querySelector("#cityTemp");
  let ferhenTempValue = (temperetureElement * 9 / 5 ) + 32;
  newTemperetureElement.innerHTML = Math.round(ferhenTempValue);
  celLink.classList.remove("active")
  ferLink.classList.add("active")
}

function displayCelTemp(event) {
  event.preventDefault();
  let newTemperetureElement = document.querySelector("#cityTemp");
  newTemperetureElement.innerHTML = Math.round(celciusTemperature);
  ferLink.classList.remove("active")
  celLink.classList.add("active")
}


let celLink = document.querySelector("#celsius-link");
celLink.addEventListener("click", displayCelTemp);
let ferLink = document.querySelector("#ferenheight-link");
ferLink.addEventListener("click", displayFerTemp);

