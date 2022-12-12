<!--
 * @Author: camerayuhang
 * @Date: 2022-12-12 14:58:50
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-12 15:34:14
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/visualizationTool.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <b-offcanvas :model-value="visiable" placement="end" :backdrop="false">
    <h1>visiable</h1>
  </b-offcanvas>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  visiable: Boolean
});
</script>
