import { createApp } from 'vue'
import App from './App.vue'
// 路由引入
import router from './router/index.js'

// 引入svg注册脚本
import 'virtual:svg-icons-register'

// 组件样式引入
import 'element-plus/dist/index.css'

// 全局样式入口
import './style/base.scss'

// pinia全局数据管理引入
import { createPinia } from 'pinia'

// 持久化插件引入
import { createPersistedState } from 'pinia-plugin-persistedstate';


const app = createApp(App)
const pinia = createPinia()

app.use(router) //注册路由插件
app.use(pinia.use(createPersistedState())) //注册pinia函数,并持久化处理

app.mount("#app")
