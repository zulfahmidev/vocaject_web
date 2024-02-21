import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router.ts'
import store from './store.ts'

axios.defaults.baseURL = 'http://localhost:8000/api'

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.mount('#app')
