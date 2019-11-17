<template>
    <div class="display" v-if="weatherData[cityName]">
      <div v-if="weatherData[cityName].weather">
        <h3>Today's weather for {{ cityName }}</h3>
        <p>{{ capitalize(weatherData[cityName].weather[0].description) }},
        <span v-if="scale === 'c'">
          {{ toCelcius(weatherData[cityName].main.temp) }} &degC
        </span>
        <span v-if="scale === 'f'">
          {{ toFahrenheit(weatherData[cityName].main.temp) }} &degF
        </span>
        </p>
    </div>    
    <div v-else>
        <p>No weather data found for {{ cityName }}. Please try again.</p>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>