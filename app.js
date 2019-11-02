const displayCurrentMain = document.getElementById("current-main");
const displayForecastMain = document.getElementById("forecast-main");
const displayTempC = document.getElementById("tempC");
const displayTempF = document.getElementById("tempF");
const showCelcius = document.getElementById("celcius");
const showFahrenheit = document.getElementById("fahrenheit");

const calculateCelcius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(2);
}

const calculateFahrenheit = (tempKelvin) => {
    return ((tempKelvin - 273.15) * 1.80 + 32.00).toFixed(2);
}


// Current weather
async function getCurrentWeather(text = "singapore") {

    let tempKelvin;

    try {
        const apiKey = '';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        tempKelvin = jsonData.main.temp;
        
        const tempCelcius = calculateCelcius(tempKelvin);
        const tempFahrenheit = calculateFahrenheit(tempKelvin);

        displayTempC.innerHTML = `${tempCelcius}`;
        displayTempF.innerHTML = `${tempFahrenheit}`;

        const info = jsonData.weather;
        info.forEach(weather => {
            displayCurrentMain.innerHTML += `<p>${weather.main}</p>`;
        });

    } catch(error) {
        console.log(error['message']);
        displayMain.innerHTML += '<p>Current weather data is not available. Please try again later.</p>';
    }
}

// // 7-day forecast
async function getWeatherForecast(text = "singapore") {

    try {
        const apiKey = '';
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${text}&appid=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        const infoList = jsonData.list

        infoList.forEach(info => {
            displayForecastMain.innerHTML += `<p>${info.weather[0].main}</p>`;
        });
    } catch(error){
        console.log(error['message']);
        displayForecastMain.innerHTML += '<p>Weather forecast data is not available. Please try again later.</p>'
    }
}

const getDateToday = () => {

    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let monthIdx = dateObj.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = dateObj.getDate();

    const dateDiv = document.createElement('div');
    dateDiv.setAttribute('id', 'dateDiv');
    dateDiv.innerHTML += `${day} ${months[monthIdx]} ${year}`;

    return dateDiv;
}


getCurrentWeather("new york");
getWeatherForecast("new york");

showCelcius.addEventListener('click', () => {
    displayTempC.style.display = "inline-block";
    displayTempF.style.display = "none";
});

showFahrenheit.addEventListener('click', () => {
    displayTempF.style.display = "inline-block";
    displayTempC.style.display = "none";
});
