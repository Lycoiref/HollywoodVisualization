import './style.css'
import App from './App.vue'
import { createApp } from 'vue'

// 初始化vue-amap
// initAMapApiLoader({
//     // 高德的key
//     key: import.meta.env.VITE_AMAP_API_KEY,
//     securityJsCode: import.meta.env.VITE_SECURITY_CODE, // 新版key需要配合安全密钥使用
//     //Loca:{
//     //  version: '2.0.0'
//     //} // 如果需要使用loca组件库，需要加载Loca
// })

createApp(App).mount('#app')
