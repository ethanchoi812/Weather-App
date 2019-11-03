const displayCurrentMain = document.getElementById("current-main");
const displayForecastMain = document.getElementById("forecast-main");

let tempSymbol = 'C';

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

        displayTempC.innerHTML = `${tempCelcius} &deg;C`;
        displayTempF.innerHTML = `${tempFahrenheit} &deg;F`;

        const dateSpan = getDateToday();
        
        const info = jsonData.weather;
        info.forEach(weather => {
            displayCurrentMain.innerHTML += dateSpan.outerHTML + `<p>Today's weather: ${weather.main}</p>`;
        });

    } catch(error) {
        console.log(error['message']);
        displayCurrentMain.innerHTML += '<p>Current weather data is not available. Please try again later.</p>';
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

            const dayTempKelvin = info.temp.day;
            const nightTempKelvin = info.temp.night;
            
            const dayTemp = () => {
                // if celcius
                if (tempSymbol === 'C') {
                    return `${calculateCelcius(dayTempKelvin)} &deg;C`;

                // if fahrenheit
                } else if (tempSymbol === 'F') {
                    return `${calculateFahrenheit(dayTempKelvin)} &deg;F`;
                }

            }

            const nightTemp = () => {
                // if celcius
                if (tempSymbol === 'C') {
                    return `${calculateCelcius(nightTempKelvin)} &deg;C`;
                
                // if fahrenheit
                } else if (tempSymbol === 'F') {
                    return `${calculateFahrenheit(nightTempKelvin)} &deg;F`;
                }
            }
            
            displayForecastMain.innerHTML += `<p>${info.weather[0].main}, Day Temp: ${dayTemp()} Night Temp: ${nightTemp()}</p>`;
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

    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('id', 'dateDiv');
    dateSpan.innerHTML += `${day} ${months[monthIdx]} ${year}`;

    return dateSpan;
}


getCurrentWeather("new york");
getWeatherForecast("new york");

showCelcius.addEventListener('click', () => {
    tempSymbol = 'C';

    displayTempC.style.display = "inline-block";
    displayTempF.style.display = "none";
});

showFahrenheit.addEventListener('click', () => {
    tempSymbol = 'F';

    displayTempF.style.display = "inline-block";
    displayTempC.style.display = "none";
});
