<!--
 * @Author: camerayuhang
 * @Date: 2022-12-08 16:49:31
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 16:49:22
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Home.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="row h-100">
    <div class="col-2"><component :is="currentCom === 'LayerTree' ? LayerTree : null"></component></div>
    <div class="col-10 position-relative" id="map-and-tools">
      <MyTools></MyTools>
      <MyMap @map-initComplete="createLayerTreeCom"></MyMap>
    </div>
  </div>
</template>
<script setup>
import MyTools from '@/components/Home/Tools/MyTools.vue';
import MyMap from '@/components/Home/Map/MyMap.vue';
import LayerTree from '@/components/Home/LayerTree/MyLayerTree.vue';
import { ref } from 'vue';

const currentCom = ref('');

const createLayerTreeCom = () => {
  currentCom.value = 'LayerTree';
};
</script>
