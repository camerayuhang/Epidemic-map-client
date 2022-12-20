/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 15:36:41
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 22:06:24
 * @FilePath: /vue3-composition-epidemic-map/src/main.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { createApp, provide, ref } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, ToolboxComponent, DataZoomComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, DatasetComponent, TransformComponent, BarChart, LineChart, ToolboxComponent, LabelLayout, DataZoomComponent, UniversalTransition, CanvasRenderer]);

// import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 全局注册组件（也可以使用局部注册）
app.component('v-chart', VChart);
app.provide('echarts', echarts);
app.mount('#app');
