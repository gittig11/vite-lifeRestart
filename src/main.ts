import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import vant from 'vant'
import 'vant/lib/index.css'

import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .use(vant)
  .mount('#app')
