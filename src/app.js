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

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempereture = document.querySelector("#cityTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let imgElement = document.querySelector("#currentIcon");
  
  cityElement.innerHTML = response.data.city;
  celciusTempreture = Math.round(response.data.temperature.current)
  temperetureElement = Math.round(celciusTempreture);
  tempereture.innerHTML = temperetureElement;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  imgElement.setAttribute("src", response.data.condition.icon_url);
}

function search(city) {
  let apiKey = `f9do3fd4558cd9a56ebf7d2bbtab042b`; 
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp)
}

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
    let cityName = document.querySelector("#city");
    let mainTemp = document.querySelector("#cityTemp")
    let windElement = document.querySelector("#wind")
    let humidityElement = document.querySelector("#humidity")
    let descriptionElement = document.querySelector("#description")
    let imgElement = document.querySelector("#currentIcon");
    let timeElement = document.querySelector("#time");
    
    
    let currentCityName = response.data.name;
    cityName.innerHTML = currentCityName;
    let currentTemp = Math.round(response.data.main.temp);
    mainTemp.innerHTML = currentTemp;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    descriptionElement.innerHTML = response.data.weather[0].description; 
    timeElement.innerHTML = formatDate(response.data.time * 1000);
    imgElement.setAttribute("src", response.data.weather[0].icon);

  console.log(response.data)
}

function currentPosistion (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4c9b53e4f8f5eb00df5915bdca340605`;
    axios.get(apiUrl).then(currentTemp)
}

function currentPlace() {
    navigator.geolocation.getCurrentPosition(currentPosistion)
  }
  
  let currentBotton = document.querySelector("#currentLocationButton")
  currentBotton.addEventListener("click", currentPlace)
  navigator.geolocation.getCurrentPosition(currentPosistion)




//Celsius & Farhenheit
let temperetureElement = null;
let celciusTempreture = null;

	function displayFerTemp(event) {
  event.preventDefault();
  let newTemperetureElement = document.querySelector("#cityTemp");
  let ferhenTempValue = (temperetureElement * 9 / 5 ) + 32;
  newTemperetureElement.innerHTML = Math.round(ferhenTempValue);
}

function displayCelTemp(event) {
  event.preventDefault();
  let newTemperetureElement = document.querySelector("#cityTemp");
 newTemperetureElement.innerHTML = Math.round(celciusTempreture);
}


let celTemp = document.querySelector("#celsius-link");
celTemp.addEventListener("click", displayCelTemp);
let ferTemp = document.querySelector("#ferenheight-link");
ferTemp.addEventListener("click", displayFerTemp);
