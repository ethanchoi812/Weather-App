import AppInput from '../AppInput/index.vue'
import AppOutput from '../AppOutput/index.vue'
import AppToggle from '../AppToggle/index.vue'


export default {
    name: 'App',
    components:{
        'app-input':AppInput,
        'app-output':AppOutput,
        'app-toggle':AppToggle
    },
    data() {
        return {}
    },
}