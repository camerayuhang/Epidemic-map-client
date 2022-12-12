<!--
 * @Author: camerayuhang
 * @Date: 2022-12-12 00:15:33
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-12 17:45:41
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/Legend.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="text-start mt-3 border p-3 rounded border-white shadow-sm">
    <h6>Legend</h6>
    <div class="d-flex flex-column-reverse">
      <div v-for="colorObj in colorMap">
        <span class="colorbox" :style="{ background: colorObj.color }"></span><span :style="{ fontSize: '12px' }" class="ms-3">{{ colorObj.min }} - {{ colorObj.max }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  colorMap: Array
});
</script>
<style scoped>
.colorbox {
  display: inline-block;
  width: 24px;
  height: 10px;
}
</style>
