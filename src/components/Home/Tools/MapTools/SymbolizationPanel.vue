<!--
 * @Author: camerayuhang
 * @Date: 2022-12-18 19:39:50
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 19:59:44
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/SymbolizationPanel.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div id="symbology-panel" v-loading="loading">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="Method">
        <el-select v-model="methodSelected" placeholder="select Method" :teleported="false">
          <el-option v-for="item in mehodLabels" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="Province" v-if="methodSelected != 'Heatmap'">
        <el-select v-model="formWrap.province" placeholder="select Province" :teleported="false">
          <el-option v-for="item in provinceLabels" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="Layer">
        <el-select v-model="layerSelected" placeholder="select Layer" @visible-change="refreshLayers" :teleported="false">
          <el-option v-for="item in layerLabels" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="Field" v-if="methodSelected != 'Heatmap'">
        <el-select v-model="fieldSelected" placeholder="select Field" :teleported="false">
          <el-option v-for="item in fieldLabels" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="Date" v-if="methodSelected != 'Heatmap'">
        <el-select v-model="formWrap.date" placeholder="select Date" :teleported="false">
          <el-option v-for="item in dateLabels" :label="item" :value="item" />
        </el-select>
      </el-form-item>
    </el-form>
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
</template>

<script setup>
import { onMounted, watchEffect, watch, reactive, ref, computed, inject } from 'vue';
import symbolizationService from '../../../../service/GISService/SymbolizationService';
import { GraduatedColorRenderer } from '../../../../service/GISService/Renderer/GraduatedColorRenderer.js';
import { GraduatedSymbolRenderer } from '../../../../service/GISService/Renderer/GraduatedSymbolRenderer';
import mapService from '../../../../service/GISService/MapService.js';
import epidemicService from '../../../../service/DataService/EpidemicService';
import MyLegend from '../MapTools/Legend.vue';
import { createEpidemicPointLayer, createFeatures, getHeatMap } from '../../../../service/GISService/LayerTools';
import { clearEmptyString } from '../../../../service/Utils/baseutils';
import { SelectInteraction } from '../../../../service/GISService/Interaction/SelectInteraction.js';
import { useStore } from 'vuex';

defineProps({
  visiable: Boolean
});
const store = useStore();
const formWrap = ref({
  date: '2022-12-06',
  province: '??????'
});
const loading = ref(false);
const layerLabels = symbolizationService.layerLabels;
const fieldLabels = symbolizationService.fieldLabels;
const dateLabels = symbolizationService.dateLabels;
const mehodLabels = symbolizationService.methodLabels;
const provinceLabels = symbolizationService.provinceLabels;
const layerSelected = ref();
const fieldSelected = ref();
const methodSelected = ref();

const form = computed(() => {
  return clearEmptyString(formWrap.value);
});
// symbolization settings
const colorMap = ref();
let combinedData = null;

let joinedField = '';
let layer = null;
let fetchAPI = null;
let Renderer = null;
let selectInteraction = null;

onMounted(() => {
  // symbolizationService.initLayerLabels();
  symbolizationService.initFieldAndDateAndProvinceLabels();
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
    joinedField = '???';
  } else if (layerSelected.value == 'ChinaProvinces') {
    fetchAPI = epidemicService.getProvinceEpidemicInfo;
    joinedField = 'NAME';
  }
});

watch(methodSelected, () => {
  if (methodSelected.value == 'Graduated Symbol') {
    Renderer = GraduatedSymbolRenderer;
  } else if (methodSelected.value == 'Graduated Color') {
    Renderer = GraduatedColorRenderer;
  }
});

const MappingHandler = async () => {
  loading.value = true;
  if (methodSelected.value == 'Heatmap') {
    fieldSelected.value = '';
    const heatLayer = getHeatMap(layer.getSource(), layer.get('name') + '_heatmap');
    mapService.pushLayer(heatLayer);
    ElMessage({
      showClose: true,
      message: 'Symbolization success!',
      type: 'success',
      appendTo: '#map'
    });
  }
  if (methodSelected.value == 'Graduated Symbol') {
    const { data } = await epidemicService.getEpidemicInfo(form.value);
    // if (!mapService.searchForLayer('EpidemicPoints')) {
    //   layer = createEpidemicPointLayer();
    //   mapService.pushLayer(layer);
    if (!selectInteraction) {
      selectInteraction = new SelectInteraction(layer, mapService._map, mapService.popup);
      selectInteraction.initInteraction();
    }
    // }
    createFeatures(layer, data);
    combinedData = data;
  } else if (methodSelected.value == 'Graduated Color') {
    combinedData = await fetchAPI(form.value);
  }
  if (layer && fieldSelected.value) {
    // the last 2 args are useless for Graduated Symbol
    const renderer = new Renderer(fieldSelected.value, layer, combinedData, symbolizationService.joinTable, joinedField);
    layer.set('colorMap', renderer.colorMap);
    renderer.render();
    colorMap.value = layer.get('colorMap');
    mapService._map.render();
    ElMessage({
      showClose: true,
      message: 'Symbolization success!',
      type: 'success',
      appendTo: '#map'
    });
  }

  loading.value = false;
};

const clearHandler = () => {
  symbolizationService.clearStyle(layer);
  colorMap.value = layer.get('colorMap');
};
const refreshLayers = visiable => {
  if (visiable) symbolizationService.initLayerLabels();
};
</script>
