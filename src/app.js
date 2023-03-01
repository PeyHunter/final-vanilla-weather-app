//time and date:

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

// Display name

// Current Temp in searched City & Humitity, wiind and so furth 
function displayTemp(response) {
  //Searched City
  let cityElement = document.querySelector("#city"); 
  cityElement.innerHTML = (response.data.city)
  //Current Temp
  let temperetureElement = document.querySelector("#cityTemp"); 
  temperetureElement.innerHTML = Math.round(response.data.temperature.current)
    
  let humidityElement = document.querySelector("#humidity"); 
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind")
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description
  let imgElement = document.querySelector("#currentIcon");
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(response.data.time *   1000);

imgElement.setAttribute("src", response.data.condition.icon_url);

 
}

//Search button Handle submit
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




//Cel and ferh 

let temperetureElement = null;
  
function displayFerTemp(event) {
event.preventDefault();  
alert("hellooo")
let ferhenTempValue = (temperetureElement * 9) / 5 + 32
temperetureElement = document.querySelector("#cityTemp");
temperetureElement.innerHTML = Math.round(ferhenTempValue);
}

let ferTemp = document.querySelector("#ferenheight-link");
ferTemp.addEventListener("click", displayFerTemp);


///////////////////////////////////





// Get current location temp


//CORRECT
function currentTemp (response) {
    let cityName = document.querySelector("#city");
    let currentCityName = response.data.name;
    cityName.innerHTML = currentCityName;

    let mainTemp = document.querySelector("#cityTemp")
    let currentTemp = Math.round(response.data.main.temp);
    mainTemp.innerHTML = currentTemp;

  let windElement = document.querySelector("#wind")
  windElement.innerHTML = Math.round(response.data.wind.speed);
 
  let humidityElement = document.querySelector("#humidity")
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.weather[0].description;
  
   let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(response.data.time *   1000);



  
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




//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.


//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
