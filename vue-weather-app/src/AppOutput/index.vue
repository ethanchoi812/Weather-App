<template>
  <div>
    <p v-if="cityName == null">
      Enter a city name above to see their weather data
    </p>
    <p v-else>
      Today's weather for {{ cityName }}
      <div v-if="weatherData[cityName]">
          <p>{{ weatherData[cityName].weather[0].main }}</p>
      </div>
    </p>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>