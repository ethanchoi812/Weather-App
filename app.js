const display = document.getElementById("display");

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

const calculateCelcius = (tempKelvin) => {
    return tempKelvin - 273.15.toFixed(2);
}

const calculateFahrenheit = (tempKelvin) => {
    return ((tempKelvin - 273.15) * 1.80 + 32.00).toFixed(2);
}

// Current weather
async function getCurrentWeather(text = "singapore") {

    try {
        const apiKey = 'b74658a407abe996e2f7828c0e040e38';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        const tempKelvin = jsonData.main.temp;
        const tempCelcius = calculateCelcius(tempKelvin);
        const tempFahrenheit = calculateFahrenheit(tempKelvin);

        const info = jsonData.weather;

        display.innerHTML = `<p>${tempFahrenheit}</p>`;

        info.forEach(weather => {
            display.innerHTML += `<p>${weather.main}</p>`;
        });
    } catch(error) {
        console.log(error['message']);
        display.innerHTML += 'Current weather data is not available. Please try again later.';
    }
}

// 7-day forecast
async function getWeatherForecast(text = "singapore") {

    try {
        const apiKey = 'b74658a407abe996e2f7828c0e040e38';
        const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${text}&appid=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData);

        const infoList = jsonData.list

        infoList.forEach(info => {
            display.innerHTML += `<p>${info.weather[0].main}</p>`;
        });
    } catch(error){
        console.log(error['message']);
        display.innerHTML += 'Weather forecast data is not available. Please try again later.'
    }
}

getCurrentWeather("new york");
getWeatherForecast("new york");