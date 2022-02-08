import { createApp } from 'vue'
import App from './App.vue'

let app

if (!app) {
  app = createApp(App).mount('#app')
}