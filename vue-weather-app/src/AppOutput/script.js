import bus from '../bus'
import Vue from 'vue'
import apiKey from './apikey'

export default {
    name: 'AppOutput',
    data() {
        return {
            cityName: null,
            weatherData: {}
        }
    },
    created() {
        bus.$on('city-name', this.onCityNameChange)
    },
    destroyed() {
        bus.$off('city-name', this.onCityNameChange)
    },
    methods: {
        onCityNameChange(city) {

            let name = city.split(" ")
                .map(part => 
                    part[0].toUpperCase() + part.slice(1))
                .join(" ")
            this.cityName = name
            this.fetchWeatherData(city)
        },

        fetchWeatherData(city){
            // if we have data already, don't request again
            if (this.weatherData.hasOwnProperty(city)) return

            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            fetch(url)
            .then(r => r.json())
            .then(data => {
            Vue.set(this.weatherData, this.cityName, data)
            console.log(data);
            })
        }
    },
}
