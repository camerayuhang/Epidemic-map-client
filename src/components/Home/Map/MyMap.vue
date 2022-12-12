<!--
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:12:58
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-11 20:05:22
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
import epidemicService from '../../../service/DataService/EpidemicService.js';
const emit = defineEmits(['layerInitComplete']);
onMounted(async () => {
  mapService.initMap(7.6, 'map');
  mapService.initLayer();
  emit('layerInitComplete');
});
</script>

<style scoped></style>
