import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@/permiss'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/lib/locale/lang/zh-cn";//国际化
import videoPlay from 'vue3-video-play' // 引入组件 
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
// 自定义全局css
import './assets/css/global.css'
//自定义钩子
import {move} from '@/directives/drag'

import * as turf from "@turf/turf";

const app = createApp(App);
app.directive("move", move)
app.use(videoPlay).use(pinia).use(vue3videoPlay).use(router).use(ElementPlus, {locale: zhCn}).mount('#app')

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}