<!--
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:12:58
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 00:24:31
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Map/MyMap.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div id="map" class="text-start w-100 h-100">
    <PopOver ref="mypopup" :info="featureInfo"></PopOver>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, computed } from 'vue';
import { useStore } from 'vuex';
import mapService from '../../../service/GISService/MapService.js';
import PopOver from '../Tools/MapTools/PopOver.vue';
const store = useStore();
const emit = defineEmits(['mapInitComplete']);
const mypopup = ref(null);
const featureInfo = computed(() => {
  return store.state.data.highLightData;
});
store.dispatch('data/updateData', { data: { country: '中国' } });
store.dispatch('data/initLabels');
onMounted(async () => {
  mapService.initMap(4, 'map');
  mapService.initLayer();
  mapService.initOthers(mypopup.value.$el);
  emit('mapInitComplete');
});
</script>

<style scoped></style>
