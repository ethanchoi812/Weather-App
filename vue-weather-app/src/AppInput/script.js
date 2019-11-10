import bus from '../bus'

export default {
    name: 'AppInput',
    data() {
        return { city: '', }
    },
    methods: {
        onSubmit(event){
            if(this.city && this.city !== ''){
                bus.$emit('city-name', this.city)
            }
        }
    }
}