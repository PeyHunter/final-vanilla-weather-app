// DATE AND TIME
let now = new Date();

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wen",
  "Thu",
  "Fri",
  "Sat",

];

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


let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
let currentDate = now.getDate();


let htmlDate = document.querySelector(".little1");
htmlDate.innerHTML = `(${currentDay}) ${currentDate} ${currentMonth}, ${currentHour}:${currentMinute}`;




// Display City Name


let city = document.querySelector("#password-form");
city.addEventListener("submit", handleSubmit);




//Get real temp

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#nightTemp").innerHTML = Math.round(response.data.main.temp_min);

}
function searchCity(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputPassword1").value;
  searchCity(city);
}



// current location button!

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIkey}

function currentTemp (response) {
    let cityName = document.querySelector("#city");
    let currentCityName = response.data.name;
    cityName.innerHTML = currentCityName;

    let mainTemp = document.querySelector("#cityTemp")
    let currentTemp = Math.round(response.data.main.temp);
    mainTemp.innerHTML = currentTemp;
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

let currentBotton = document.querySelector("#currentTemp")
currentBotton.addEventListener("click", currentPlace)





// FARENHEIT AND CELCIUS BUTTON

function seeCel(event) {
  event.preventDefault();
  let cityTempC = document.querySelector("#cityTemp");
  cityTempC.innerHTML = resonse.data.main.temp;   
}

let pressCel = document.querySelector("#celsius");
pressCel.addEventListener("click", seeCel)


function seeFer(event) {
  event.preventDefault();
  let cityTempF = document.querySelector("#cityTemp");
  cityTempF.innerHTML = `66°F`;   
}

let pressFer = document.querySelector("#ferenheight");
pressFer.addEventListener("click", seeFer);





//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.


//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.