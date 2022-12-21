<!--
 * @Author: camerayuhang
 * @Date: 2022-12-11 16:31:54
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 00:12:20
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-stretch">
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
      </div>
    </div>
  </nav>
  <MyPanel :top="'100px'" :left="'40px'" :width="'300px'" :title="toolNames.mappingTool" v-show="toolVisiable.mappingTools">
    <SymbolizationPanel></SymbolizationPanel>
  </MyPanel>
  <MyPanel :top="'100px'" :right="'40px'" :width="'350px'" :height="'640px'" :title="toolNames.graphsPanel" v-show="toolVisiable.graphsPanel">
    <GraphsPanel></GraphsPanel>
  </MyPanel>
  <MyPanel :bottom="'70px'" :right="'5%'" :width="'90%'" :height="'120px'" v-show="toolVisiable.CovTimeLine">
    <CovTimeLine v-if="dateLabels"></CovTimeLine>
  </MyPanel>
  <el-dialog v-model="toolVisiable.createPoints" :title="toolNames.createPoints" width="30%" center> <CreatePointsDialog></CreatePointsDialog> </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import MyPanel from '../../Template/MyPanel.vue';
import SymbolizationPanel from './MapTools/SymbolizationPanel.vue';
import GraphsPanel from './MapTools/GraphsPanel.vue';
import CreatePointsDialog from './MapTools/CreatePointsDialog.vue';
import CovTimeLine from './MapTools/CovTimeLine.vue';
import { useStore } from 'vuex';
const store = useStore();
const toolNames = reactive({
  mappingTool: 'Symbology',
  graphsPanel: 'Graphs',
  createPoints: 'Create Points',
  CovTimeLine: 'COVID-19 Timeline'
});

const toolVisiable = reactive({
  mappingTools: false,
  graphsPanel: false,
  createPoints: false,
  CovTimeLine: false
});

const dateLabels = computed(() => {
  return store.state.data.labels.dateArr;
});
</script>
<style scoped>
.nav-item {
  margin-right: 10px;
  height: auto;
}
</style>
