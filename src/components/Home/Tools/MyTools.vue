<!--
 * @Author: camerayuhang
 * @Date: 2022-12-11 16:31:54
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-23 19:54:28
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MyTools.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse item-group" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 item-group h-100">
          <li class="nav-item">
            <AddData></AddData>
          </li>
          <li class="nav-item">
            <el-button type="primary" :style="{ height: '100%' }" @click="toolVisiable.createPoints = true"> Create Points </el-button>
          </li>
          <li class="nav-item">
            <el-checkbox v-model="toolVisiable.mappingTools" :label="toolNames.mappingTool" size="large" border />
          </li>
          <li class="nav-item">
            <el-checkbox v-model="toolVisiable.graphsPanel" :label="toolNames.graphsPanel" size="large" border />
          </li>
          <li class="nav-item">
            <el-checkbox v-model="toolVisiable.CovTimeLine" :label="toolNames.CovTimeLine" size="large" border />
          </li>
        </ul>
        <div class="h-100">
          <el-select v-model="highLightCity" filterable placeholder="Search" class="h-100" size="large" :teleported="false">
            <el-option v-for="item in cityLabels" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button class="h-100 ms-2" type="primary" :icon="Search" @click="searchCityHandler"></el-button>
        </div>
      </div>
    </div>
  </nav>
  <MyPanel :style="{ overflow: 'visiable' }" :top="'100px'" :left="'40px'" :width="'300px'" overflow="" :title="toolNames.mappingTool" v-show="toolVisiable.mappingTools">
    <SymbolizationPanel></SymbolizationPanel>
  </MyPanel>
  <MyPanel :top="'100px'" :right="'40px'" :width="'350px'" :height="'640px'" :title="toolNames.graphsPanel" v-show="toolVisiable.graphsPanel">
    <GraphsPanel></GraphsPanel>
  </MyPanel>
  <MyPanel :bottom="'1%'" :right="'5%'" :width="'90%'" :height="'120px'" v-show="toolVisiable.CovTimeLine">
    <CovTimeLine v-if="dateLabels"></CovTimeLine>
  </MyPanel>
  <el-dialog v-model="toolVisiable.createPoints" :title="toolNames.createPoints" width="30%" center> <CreatePointsDialog></CreatePointsDialog> </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import AddData from './MapTools/AddData.vue';
import MyPanel from '../../Template/MyPanel.vue';
import SymbolizationPanel from './MapTools/SymbolizationPanel.vue';
import GraphsPanel from './MapTools/GraphsPanel.vue';
import CreatePointsDialog from './MapTools/CreatePointsDialog.vue';
import CovTimeLine from './MapTools/CovTimeLine.vue';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue';
import mapService from '../../../service/GISService/MapService';
import { SelectInteraction } from '../../../service/GISService/Interaction/SelectInteraction';
import { zoomToLayer } from '../../../service/GISService/LayerTools';

const store = useStore();
const toolNames = reactive({
  mappingTool: 'Symbology',
  graphsPanel: 'Graphs',
  createPoints: 'Create Points',
  CovTimeLine: 'COVID-19 Timeline'
});
const highLightCity = ref();
const toolVisiable = reactive({
  mappingTools: false,
  graphsPanel: false,
  createPoints: false,
  CovTimeLine: false
});

const dateLabels = computed(() => {
  return store.state.data.labels.dateArr;
});
const cityLabels = computed(() => {
  return store.state.data.options.cityArr;
});

const searchCityHandler = () => {
  const layer = mapService.searchForLayer('EpidemicPoints');
  if (layer) {
    let selectInteraction = null;
    const source = layer.getSource();
    const feature = source.getFeatureById(highLightCity.value);
    if (feature.get('radius')) {
      selectInteraction = new SelectInteraction(layer, mapService._map, mapService.popup);
      const lon = feature.get('attr').longitude;
      const lat = feature.get('attr').latitude;
      zoomToLayer(lon, lat, mapService._view, () => {
        selectInteraction.highLightPoint(feature, 300);
      });
    }
  }
};

const querySearch = (queryString, cb) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : (restaurants.value = cb(results));
};
const createFilter = queryString => {
  return restaurant => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};
</script>
<style scoped>
.nav-item {
  margin-right: 10px;
  height: auto;
}
.item-group {
  height: 40px;
}
</style>
