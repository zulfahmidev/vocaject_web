import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router.js'
import store from './store.js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// axios.defaults.baseURL = 'https://mobile.vocaject.com/api'
axios.defaults.baseURL = 'http://localhost:8000/api'

let app = createApp(App)
.use(VueSweetalert2)
.use(router)
.use(store)
.use(VueAxios, axios)
router.isReady().then(() => {
  app.mount('#app')
})
