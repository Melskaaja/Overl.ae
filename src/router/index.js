import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NameView from '../views/NameView.vue'
import TimerView from '../views/TimerView.vue'
import CountdownView from '../views/CountdownView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import OverlayNameView from '../views/OverlayNameView.vue'
import OverlayTimerView from '../views/OverlayTimerView.vue'
import OverlayCountdownView from '../views/OverlayCountdownView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    { path: '/name/:username/:pronouns?', name: 'name-overlay', component: OverlayNameView },
    { path: '/name', name: 'name', component: NameView },

    { path: '/countdown/:from', name: 'countdown-overlay', component: OverlayCountdownView },
    { path: '/countdown', name: 'countdown', component: CountdownView },

    { path: '/timer/:to', name: 'timer-overlay', component: OverlayTimerView },
    { path: '/timer', name: 'timer', component: TimerView },
    
    { path: '/login', name: 'login', component: LoginView },
    { path: '/profile', name: 'profile', component: ProfileView },
    /*{
      // this generates a separate chunk (About.[hash].js) for this route
      component: () => import('../views/About.vue')
    }*/
  ]
})

export default router
