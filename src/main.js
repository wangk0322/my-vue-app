import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn.mjs"
import 'element-plus/dist/index.css'
const pinia = createPinia()
const app = createApp(App)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(pinia).use(ElementPlus,{locale: zhCn,}).mount('#app')
