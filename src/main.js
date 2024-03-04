import './assets/css/main.scss'

import { createApp } from 'vue'

import Vue3Toastify from 'vue3-toastify'
import router from './router'
import AppLayout from './AppLayout.vue'

const app = createApp(AppLayout)

app.use(router)
   .use(Vue3Toastify, { autoClose: 4000, theme: 'dark' })

app.mount('#app')
