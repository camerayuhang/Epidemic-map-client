<!--
 * @Author: camerayuhang
 * @Date: 2022-12-19 22:15:36
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 15:38:56
 * @FilePath: /vue3-composition-epidemic-map/src/components/Template/MyChart.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="mb-3 chart p-3 text-start">
    <div class="chart-header">
      <h5>
        {{ title }}
      </h5>
    </div>
    <div
      class="chart-body"
      :style="{
        height: height
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: 'Chart Title'
  },
  height: {
    type: String,
    default: '300px'
  }
});
</script>

<style scoped>
.chart {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
</style>
