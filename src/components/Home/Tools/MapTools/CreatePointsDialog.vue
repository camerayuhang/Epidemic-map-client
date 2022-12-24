<!--
 * @Author: camerayuhang
 * @Date: 2022-12-21 16:51:09
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 17:17:14
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/CreatePointsDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
,
<template>
  <div v-loading="loading">
    <el-form label-width="120px">
      <el-form-item label="Province">
        <el-select v-model="form.province" placeholder="please select province">
          <el-option v-for="name in provinceLabels" :label="name" :value="name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { createEpidemicPointLayer, createFeatures } from '../../../../service/GISService/LayerTools';
import mapService from '../../../../service/GISService/MapService';
import moduleName from '../../../../service/DataService/EpidemicService';
import EpidemicService from '../../../../service/DataService/EpidemicService';
const store = useStore();
const form = reactive({
  province: '全国',
  date: '2022-12-06'
});
const loading = ref(false);
let layer = null;
const provinceLabels = computed(() => {
  return store.state.data.labels.provinceArr;
});
const spatialData = ref();
const onSubmit = async () => {
  loading.value = true;
  layer = mapService.searchForLayer('EpidemicPoints');
  if (!layer) {
    layer = createEpidemicPointLayer();
    mapService.pushLayer(layer);
  }
  const { data } = await EpidemicService.getEpidemicInfo(form);
  spatialData.value = data;
  createFeatures(layer, spatialData.value);
  ElMessage({
    showClose: true,
    message: 'Create Points successfully!',
    type: 'success',
    appendTo: '#map'
  });
  loading.value = false;
};
</script>
