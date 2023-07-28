import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createRouter from './router/'
import App from './App.vue'

const router = createRouter()
const store = createPinia()

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
