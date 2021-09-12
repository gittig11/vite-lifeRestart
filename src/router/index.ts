import  { createRouter ,createWebHashHistory} from "vue-router"
import Home from '../components/home.vue'
import talent from '../components/talent.vue'
import header from '../components/header.vue'
import change from '../components/change.vue'
import travel from '../components/travel.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/talent', component: talent },
  { path: '/header', component: header },
  { path: '/change', component: change },
  { path: '/travel', component: travel },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export { router }  
