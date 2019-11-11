import bus from '../bus'

export default {
    name: 'AppToggle',
    data() {
        return { scale: '', }
    },
    methods: {
        toggleTemp(sym){
            this.scale = sym
            bus.$emit('toggle-scale', this.scale)
        },
    }
}