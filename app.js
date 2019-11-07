const searchField = document.getElementById("search-field");
const searchForm = document.getElementById("search-form");


const displayDiv = document.getElementById("display");
const toggleTempDiv = document.getElementById("toggle-temp");

const displayCurrentMain = document.createElement("div");
displayCurrentMain.classList.add("current-main");


const displayForecastMain = document.createElement("div");
displayForecastMain.classList.add("forecast-main");

let defaultCountry = "";

const calculateCelcius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(2);
}

const calculateFahrenheit = (tempKelvin) => {
    return ((tempKelvin - 273.15) * 1.80 + 32.00).toFixed(2);
}

// Current weather
const getCurrentWeather = async (city = "Singapore") => {

    let tempKelvin;

    try {

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        tempKelvin = jsonData.main.temp;
        
        const tempCelcius = calculateCelcius(tempKelvin);
        const tempFahrenheit = calculateFahrenheit(tempKelvin);

        let tempC = `${tempCelcius} &deg;C`;
        let tempF = `${tempFahrenheit} &deg;F`;

        const dateElement = getWeatherDate(0);
        
        let cityName = city.split(" ").map((str) =>
            str.charAt(0).toUpperCase() + str.slice(1)
        ).join(" ");

        const info = jsonData.weather[0];
        displayCurrentMain.innerHTML = `${dateElement}` +
            `<p>Today's weather for ${cityName}: ${info.main}, ` +
            `<span class=tempC>${tempC}</span><span class=tempF style="display:none">${tempF}</span>` +
            `</p>`;

        toggleTempSym();

        let backgroundURL = `https://source.unsplash.com/1600x900/?weather,${info.main}`;
        let body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = `url(${backgroundURL})`

    } catch(error) {
        console.log(error);
        displayCurrentMain.innerHTML = '<p>Current weather data is not available. Please try again later.</p>';
    }

}

// 7-day forecast
const getWeatherForecast = async (city = "singapore") => {

    try {
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&cnt=8`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        const infoList = jsonData.list
        const forecastDiv = document.createElement("div");
        let forecastContent = document.createElement("table");
        forecastContent = "" 

        infoList.forEach((info, i) => {
            if (i !== 0) {
                const dayTempKelvin = info.temp.day;
                const nightTempKelvin = info.temp.night;
                
                const dayTempC = `${calculateCelcius(dayTempKelvin)} &deg;C`;
                const dayTempF = `${calculateFahrenheit(dayTempKelvin)} &deg;F`;

                const nightTempC = `${calculateCelcius(nightTempKelvin)} &deg;C`;
                const nightTempF = `${calculateFahrenheit(nightTempKelvin)} &deg;F`;
                
                let date = getWeatherDate(i);
                
                forecastContent += `<tr>` +
                `<td>${date}</td>` + 
                `<td>${info.weather[0].main}</td>` +
                `<td><span class="tempC">${dayTempC}</span><span class="tempF" style="display:none">${dayTempF}&nbsp;</span></td>` + 
                `<td><span class="tempC">${nightTempC}</span><span class="tempF" style="display:none">${nightTempF}</span></td>` +
                `</tr>`;
            }
        });


    forecastDiv.innerHTML += `<table><tr><td>Date</td><td>Weather</td><td>Day Temp</td><td>Night Temp</td></tr>${forecastContent}</table>`;

    displayForecastMain.innerHTML = forecastDiv.outerHTML;
    toggleTempSym();

    } catch(error){
        console.log(error['message']);
        displayForecastMain.innerHTML = '<p>Weather forecast data is not available. Please try again later.</p>'
    }

}

const getWeatherDate = (i) => {

    let d = new Date();
    let dateObj = new Date(d.setDate(d.getDate() + i));
    let monthIdx = dateObj.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    this.year = dateObj.getFullYear();
    this.month = months[monthIdx]
    this.day = dateObj.getDate();

    return `${day} ${month} ${year}`;
}

const showCelcius = document.createElement('button');
showCelcius.setAttribute("id", "celcius");
showCelcius.innerHTML = "C";


const showFahrenheit = document.createElement("button");
showFahrenheit.setAttribute("id", "fahrenheit");
showFahrenheit.innerHTML = "F";

const toggleTempSym = () => {

        const displayTempC = document.querySelectorAll(".tempC");
        const displayTempF = document.querySelectorAll(".tempF");

        showCelcius.addEventListener('click', () => {
            displayTempC.forEach((ele) => { ele.style.display = "inline-block" });
            displayTempF.forEach((ele) => { ele.style.display = "none" });
        });

        showFahrenheit.addEventListener('click', () => {

            displayTempF.forEach((ele) => { ele.style.display = "inline-block" });
            displayTempC.forEach((ele) => { ele.style.display = "none" });
        });
}

searchForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    let city = searchField.value || "singapore"
    getCurrentWeather(city);
    getWeatherForecast(city);
});

const startWeatherApp = async () => {

    try {
        const url = 'http://ip-api.com/json';
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();

        defaultCountry = jsonData.country

        getCurrentWeather(defaultCountry);
        getWeatherForecast(defaultCountry);

    } catch (error) {
        console.log(error['message']);
    }
}

startWeatherApp();

displayDiv.appendChild(displayCurrentMain);
displayDiv.appendChild(displayForecastMain);
toggleTempDiv.appendChild(showCelcius);
toggleTempDiv.appendChild(showFahrenheit);