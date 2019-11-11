<template>
  <div>
    <p v-if="cityName == null">
      Enter a city name above to see their weather data
    </p>
    <p v-else>
      Today's weather for {{ cityName }}
      <div v-if="weatherData[cityName]">
          <p>{{ weatherData[cityName].weather[0].main }},
            <span v-if="scale === 'c'">
              {{ toCelcius(weatherData[cityName].main.temp) }} &degC;
            </span>
            <span v-if="scale === 'f'">
              {{ toFahrenheit(weatherData[cityName].main.temp) }} &degF;
            </span>
          </p>
      </div>
    </p>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>