import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { dragscrollNext } from 'vue-dragscroll'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.directive('dragscroll', dragscrollNext)
app.use(pinia)
app.mount('#app')
