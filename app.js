async function getWeather(text = "singapore") {
    const apiKey = '';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);

    const temp = weatherData.main.temp;
    const info = weatherData.weather;

    const display = document.getElementById("display");
    display.innerHTML = temp;

    info.forEach(weather => {
        display.innerHTML += weather.main;
    });
}

getWeather("new york");