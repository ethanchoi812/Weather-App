import bus from '../bus'

export default {
    name: 'AppToggle',
    data() {
        return { scale: 'c', }
    },
    methods: {
        toggleTemp(sym){
            this.scale = sym
            bus.$emit('toggle-scale', this.scale)
        },
    },
    computed: {
        classObject() {
            return {
                active: this.scale === 'c'
            }
        }
    }
}