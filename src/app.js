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


// Display name



// Current Temp in searched City 

function displayTemp(response) {
 
  //Searched City
  let cityElement = document.querySelector("#city"); 
  cityElement.innerHTML = (response.data.city)
  
  //Current Temp
  let temperetureElement = document.querySelector("#cityTemp"); 
  temperetureElement.innerHTML = Math.round(response.data.temperature.current)

    //Current Humidity
  let humidityElement = document.querySelector("#humidity"); 
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  
   //Current Wind 
let windElement = document.querySelector("#wind")
windElement.innerHTML = Math.round(response.data.wind.speed);

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.condition.description

   //Current Emoji


let imgElement = document.querySelector("#currentIcon");
imgElement.setAttribute("src", response.data.condition.icon_url);




  console.log(response.data)
  console.log(response.data.condition.description)
  console.log(response.data.condition.icon_url)
}

let apiKey = `f9do3fd4558cd9a56ebf7d2bbtab042b`; 
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Dubai&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp)




// Humitity, wiind and so furth 




// Get current location temp


//Cel and ferh 















//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.


//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.

//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
