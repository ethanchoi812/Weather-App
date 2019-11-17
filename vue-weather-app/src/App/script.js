import AppInput from '../AppInput/index.vue'
import AppOutput from '../AppOutput/index.vue'
import AppToggle from '../AppToggle/index.vue'
import bus from '../bus'


export default {
    name: 'App',
    components:{
        'app-input':AppInput,
        'app-output':AppOutput,
        'app-toggle':AppToggle
    },
    data() {
        return {
            backgroundURL:'',
        }
    },
    created() {
        bus.$on('background-change', this.changeBackground)
    },
    destroyed() {
        bus.$off('background-change', this.changeBackground)
    },
    methods: {
        changeBackground(weather){
            this.backgroundURL = `url(https://source.unsplash.com/1600x900/?weather,${weather})` 
        }
    }
}