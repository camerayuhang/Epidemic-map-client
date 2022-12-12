<!--
 * @Author: camerayuhang
 * @Date: 2022-12-11 17:24:04
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-12 20:05:31
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/MappingTool.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <b-offcanvas :model-value="visiable" placement="end" :backdrop="false" @hide="$emit('close')">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title">Symbolization</h3>
    </div>
    <div class="offcanvas-body">
      <el-form>
        <el-form-item label="Field">
          <el-select v-model="formSelected.field" placeholder="select Field">
            <el-option v-for="item in fieldsLabels" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date">
          <el-select v-model="formSelected.date" placeholder="select Date">
            <el-option v-for="item in dateLabels" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="p-3 rounded border-white shadow-sm">
        <h6 class="mt-3">Epidemic Infomation-{{ formSelected.date }}</h6>
        <el-table :data="currentDateConfirm" stripe style="width: 100%" height="250">
          <el-table-column prop="省份" label="Province" />
          <el-table-column prop="城市" label="City" />
          <el-table-column :prop="formSelected.field" :label="formSelected.field" />
        </el-table>
      </div>
      <div>
        <MyLegend :colorMap="graduatedColorRenderer.colorMap"></MyLegend>
      </div>
      <div class="mt-3">
        <span>
          <el-button type="primary" @click="MappingHandler">Sure</el-button>
          <el-button @click="clearHandler">Clear</el-button></span
        >
      </div>
    </div>
  </b-offcanvas>
</template>
<script setup>
import { onMounted, watchEffect } from 'vue';
import mappingService from '../../../../service/GISService/MappingService';
import mapService from '../../../../service/GISService/MapService.js';
import MyLegend from '../MapTools/Legend.vue';
const { graduatedColorRenderer, formSelected, fieldsLabels, dateLabels, initData, readyToMapping, currentDateConfirm, getCurrentDateConfirm } = mappingService();
defineProps({
  visiable: Boolean
});

// const emit = defineEmits(['close']);

watchEffect(() => {
  getCurrentDateConfirm(formSelected.date);
});

onMounted(async () => {
  await initData();
});

const MappingHandler = () => {
  readyToMapping(mapService.fujianCities);
  mapService._map.render();
};
const clearHandler = () => {
  mapService.fujianCities.setStyle(graduatedColorRenderer.defaultStyle);
};
// const hideHandler = () => {
//   emit('close');
// };
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
