<!--
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:12:58
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-10 15:56:07
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Map/MyMap.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div id="map" class="text-start w-100 h-100"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import mapService from '../../../service/GISService/MapService.js';
const emit = defineEmits(['layerInitComplete']);
onMounted(() => {
  mapService.initMap(4, 'map');
  mapService.initLayer();
  emit('layerInitComplete');
});
</script>

<style scoped></style>
