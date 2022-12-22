<!--
 * @Author: camerayuhang
 * @Date: 2022-12-18 18:44:38
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 22:27:18
 * @FilePath: /vue3-composition-epidemic-map/src/components/Template/MyPanel.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="panel position-absolute" :style="{ top: top, left: left, right: right, bottom: bottom, width: width, height: height, overflow: overflow }">
    <div v-if="title" class="panel-header mb-3">
      <h4>
        <strong>{{ title }}</strong>
      </h4>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String
  },
  top: {
    type: String
  },
  bottom: {
    type: String
  },
  left: {
    type: String
  },
  right: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  },
  show: {
    type: Boolean
  },
  overflow: {
    type: String,
    default: 'scroll'
  }
});
</script>

<style scoped>
.panel {
  z-index: 99;
  background-color: #fff;
  padding: 15px 20px 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}
</style>
