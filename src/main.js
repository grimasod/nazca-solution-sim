import { createApp } from 'vue'
import createRouter from './router/'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

const router = createRouter()
const store = createPinia()

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
