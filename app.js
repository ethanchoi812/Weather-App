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

// Current weather
async function getCurrentWeather(text = "singapore") {
    const apiKey = '';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
    const response = await fetch(url, { mode: 'cors' });
    const jsonData = await response.json();
    console.log(jsonData);

    const temp = jsonData.main.temp;
    const info = jsonData.weather;

    display.innerHTML = `<p>${temp}</p>`;

    info.forEach(weather => {
        display.innerHTML += `<p>${weather.main}</p>`;
    });
}

// 7-day forecast
async function getWeatherForecast(text = "singapore") {
    const apiKey = '';
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${text}&appid=${apiKey}`;
    const response = await fetch(url, { mode: 'cors' });
    const jsonData = await response.json();
    console.log(jsonData);

    const infoList = jsonData.list

    infoList.forEach(info => {
        display.innerHTML += `<p>${info.weather[0].main}</p>`;
    });
}

getCurrentWeather("new york");
getWeatherForecast("new york");