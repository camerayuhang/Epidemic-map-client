<!--
 * @Author: camerayuhang
 * @Date: 2022-12-11 16:31:54
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 01:02:16
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <el-checkbox v-model="toolVisiable.mappingTools" :label="toolNames.mappingTool" size="large" border />
          </li>
          <li class="nav-item">
            <el-checkbox v-model="toolVisiable.graphsPanel" :label="toolNames.graphsPanel" size="large" border />
          </li>
        </ul>
      </div>
      <!-- <el-dialog v-model="toolVisiable.mappingTools" width="30%" align-center :title="toolName.mappingTools" :modal="true" draggable> <MyMappingTool></MyMappingTool> </el-dialog> -->
    </div>
  </nav>
  <!-- <MyMappingTool :visiable="toolVisiable.mappingTools" @close="toolVisiable.mappingTools = false"></MyMappingTool> -->
  <MyPanel :top="'100px'" :left="'40px'" :width="'300px'" :title="toolNames.mappingTool" v-show="toolVisiable.mappingTools">
    <SymbolizationPanel></SymbolizationPanel>
  </MyPanel>
  <MyPanel :top="'100px'" :right="'40px'" :width="'350px'" :height="'700px'" :title="toolNames.graphsPanel" v-show="toolVisiable.graphsPanel">
    <GraphsPanel></GraphsPanel>
  </MyPanel>
</template>
<script setup>
import { ref, reactive } from 'vue';
import MyPanel from '../../Template/MyPanel.vue';
import SymbolizationPanel from './MapTools/SymbolizationPanel.vue';
import GraphsPanel from './MapTools/GraphsPanel.vue';
const toolNames = reactive({
  mappingTool: 'Symbology',
  graphsPanel: 'Graphs'
});

const toolVisiable = reactive({
  mappingTools: false,
  graphsPanel: false
});
</script>
