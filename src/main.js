import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
const app = createApp(App)
axios.defaults.baseURL = 'http://api_devss.wanxikeji.cn'
app.config.globalProperties.$axios = axios
app.use(store).use(router).use(ElementPlus).mount('#app')
