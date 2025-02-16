import { createApp } from 'vue'
import Home from './Home.vue'
import router from './router'  // 导入路由配置
import './assets/common.css'



createApp(Home)
    .use(router)  // 使用 Vue Router
    .mount('#app')