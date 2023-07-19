import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js';
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from './store.js'

axios.defaults.baseURL = 'http://34.101.227.89/api'

let app = createApp(App)
.use(router)
.use(store)
.use(VueAxios, axios)
router.isReady().then(() => {
  app.mount('#app')
})
