/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 15:36:41
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-10 14:40:28
 * @FilePath: /vue3-composition-epidemic-map/src/main.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from './store';

// import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
