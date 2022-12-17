<!--
 * @Author: camerayuhang
 * @Date: 2022-12-11 17:24:04
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-17 14:35:52
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/MappingTool.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<!-- https://media.githubusercontent.com/media/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv -->
<template>
  <b-offcanvas :model-value="visiable" placement="end" :backdrop="false" @hide="$emit('close')" lazy>
    <div class="offcanvas-header">
      <h3 class="offcanvas-title">Symbolization</h3>
    </div>
    <div class="offcanvas-body">
      <el-form>
        <el-form-item label="Layer">
          <el-select v-model="layerSelected" placeholder="select Layer">
            <el-option v-for="item in layerLabels" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Field">
          <el-select v-model="fieldSelected" placeholder="select Field">
            <el-option v-for="item in fieldLabels" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date">
          <el-select v-model="form.date" placeholder="select Date">
            <el-option v-for="item in dateLabels" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <div class="p-3 rounded border-white shadow-sm">
        <h6 class="mt-3">Epidemic Infomation-{{ formSelected.date }}</h6>
        <el-table :data="currentDateConfirm" stripe style="width: 100%" height="250">
          <el-table-column prop="省份" label="Province" />
          <el-table-column prop="城市" label="City" />
          <el-table-column :prop="formSelected.field" :label="formSelected.field" />
        </el-table>
      </div> -->
      <div>
        <MyLegend :colorMap="colorMap"></MyLegend>
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
import { onMounted, watchEffect, watch, reactive, ref } from 'vue';
import symbolizationService from '../../../../service/GISService/SymbolizationService';
import { GraduatedColorRenderer } from '../../../../service/GISService/Renderer/GraduatedColorRenderer.js';
import mapService from '../../../../service/GISService/MapService.js';
import epidemicService from '../../../../service/DataService/EpidemicService';
import MyLegend from '../MapTools/Legend.vue';
defineProps({
  visiable: Boolean
});
const form = reactive({
  date: '2022-12-06'
});
const layerLabels = symbolizationService.layerLabels;
const fieldLabels = symbolizationService.fieldLabels;
const dateLabels = symbolizationService.dateLabels;
const layerSelected = ref();
const fieldSelected = ref();

// symbolization settings
const colorMap = ref();
let combinedData = null;
let joinedField = '';
let layer = null;
let fetchAPI = null;
onMounted(() => {
  // symbolizationService.initLayerLabels();
  symbolizationService.initFieldAndDateLabels();
});

watch(layerSelected, () => {
  mapService._map.getLayers().forEach((ele, index) => {
    if (ele.get('name') == layerSelected.value) {
      layer = ele;
    }
  });
  colorMap.value = [];
  if (layer.get('colorMap')) {
    colorMap.value = layer.get('colorMap');
  }
  if (layerSelected.value == 'ChinaCities') {
    fetchAPI = epidemicService.getCityEpidemicInfo;
    joinedField = '市';
  } else if (layerSelected.value == 'ChinaProvinces') {
    fetchAPI = epidemicService.getProvinceEpidemicInfo;
    joinedField = 'NAME';
  }
});

const MappingHandler = async () => {
  let graduatedColorRenderer = null;
  combinedData = await fetchAPI(form);
  graduatedColorRenderer = new GraduatedColorRenderer(fieldSelected.value, layer, combinedData, symbolizationService.joinTable, joinedField);
  layer.set('colorMap', graduatedColorRenderer.colorMap);
  graduatedColorRenderer.render();
  colorMap.value = layer.get('colorMap');
  mapService._map.render();
};

const clearHandler = () => {
  symbolizationService.clearStyle(layer);
  colorMap.value = layer.get('colorMap');
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
