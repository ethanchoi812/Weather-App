import bus from '../bus'
import Vue from 'vue'
import apiKey from './apikey'

export default {
    name: 'AppOutput',
    data() {
        return {
            cityName: null,
            weatherData: {},
            scale: 'c',
        }
    },
    created() {
        bus.$on('city-name', this.onCityNameChange)
        bus.$on('toggle-scale', this.onToggleScale)
    },
    destroyed() {
        bus.$off('city-name', this.onCityNameChange)
        bus.$off('toggle-scale', this.onToggleScale)
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
            bus.$emit('background-change', this.weatherData[this.cityName].weather[0].main)
            console.log(this.weatherData)
            })
        },

        fetchDefaultCountry(){
            const url = 'http://ip-api.com/json'
            fetch(url)
            .then(r => r.json())
            .then(data => {
                let city = data.country
                this.onCityNameChange(city)
            })
        },

        onToggleScale(sym){
            this.scale = sym
        },

        toCelcius(tempKelvin){
            return (tempKelvin - 273.15).toFixed(2);
        },
        
        toFahrenheit(tempKelvin){
            return ((tempKelvin - 273.15) * 1.80 + 32.00).toFixed(2);
        },

        capitalize(str){
            return (str[0].toUpperCase() + str.slice(1))
        }
    },
    beforeMount() {
        this.fetchDefaultCountry()
    }
}
