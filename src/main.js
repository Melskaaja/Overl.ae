import './assets/css/main.scss'

import { createApp } from 'vue'
import { NhostClient } from '@nhost/vue'

import Vue3Toastify, { toast } from 'vue3-toastify'
import router from './router'
import AppLayout from './AppLayout.vue'

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION
})

const app = createApp(AppLayout)
const authRoutes = [ '/groups' ]

router.beforeEach(async (to) => {
  const authOk = await nhost.auth.isAuthenticatedAsync();
  if (0 <= authRoutes.indexOf(to.path) && !authOk) {
    toast.warning("You have to be logged in first!")
    return false
  }
  return true
})

app.use(router)
   .use(nhost)
   .use(Vue3Toastify, { autoClose: 4000, theme: 'dark' })

app.mount('#app')
