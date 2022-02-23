import { createApp } from 'vue'
import { dragscrollNext } from 'vue-dragscroll'
import App from './App.vue'
// import TestApp from './TestApp.vue'


const app = createApp(App)

app.directive('dragscroll', dragscrollNext)

app.mount('#app')

// createApp(TestApp).mount('#app')