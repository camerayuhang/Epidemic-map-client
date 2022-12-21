<!--
 * @Author: camerayuhang
 * @Date: 2022-12-12 14:58:50
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 22:50:24
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/GraphsPanel.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div id="city" class="text-start">
    <div class="d-flex flex-row align-items-center fs-4 mb-1">
      <el-icon :size="25" class="me-1"><MapLocation /></el-icon><strong>City</strong>
    </div>
    <EpidemicInfoCart v-if="region.city" height="200px" :text="cityDataSource[0].city" :data-source="cityDataSource[cityDataSource.length - 1]"></EpidemicInfoCart>
    <LargeAreaChart v-if="region.city" :data-source="cityDataSource" :dimensions="['date', 'daily_new_cases']" text="Daily spread trends" height="270px"> </LargeAreaChart>
    <!-- <SmoothedLineChart :data-source="dataSource" :dimensions="['date', 'confirmed']" text="Cumulative spread trends"> </SmoothedLineChart> -->
    <StackedLine v-if="region.city" :data-source="cityDataSource" :dimensions="['date', 'confirmed', 'recovered', 'deaths']" text="Cumulative spread trends" height="270px"></StackedLine>
  </div>
  <div id="province" class="text-start">
    <div class="d-flex flex-row align-items-center fs-4 mb-1">
      <el-icon :size="25" class="me-1"><MapLocation /></el-icon><strong>Province</strong>
    </div>
    <EpidemicInfoCart v-if="region.province" height="200px" :text="provinceDataSource[0].province" :data-source="provinceDataSource[provinceDataSource.length - 1]"></EpidemicInfoCart>
    <LargeAreaChart v-if="region.province" :data-source="provinceDataSource" :dimensions="['date', 'daily_new_cases']" text="Daily spread trends" height="270px"> </LargeAreaChart>
    <!-- <SmoothedLineChart :data-source="dataSource" :dimensions="['date', 'confirmed']" text="Cumulative spread trends"> </SmoothedLineChart> -->
    <StackedLine v-if="region.province" :data-source="provinceDataSource" :dimensions="['date', 'confirmed', 'recovered', 'deaths']" text="Cumulative spread trends" height="270px"></StackedLine>
  </div>
</template>

<script setup>
import epidemicService from '../../../../service/DataService/EpidemicService.js';
import EpidemicInfoCart from '../../../Graphs/EpidemicInfoCart.vue';
import LargeAreaChart from '../../../Graphs/LargeAreaChart.vue';
import SmoothedLineChart from '../../../Graphs/SmoothedLineChart.vue';
import StackedLine from '../../../Graphs/StackedLine.vue';
import { ref, provide, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const cityDataSource = computed(() => {
  return store.state.data.cityWithAllDate;
});
const provinceDataSource = computed(() => {
  return store.state.data.provinceWithAllDate;
});
const region = computed(() => {
  return store.state.data.region;
});
</script>
<style scoped></style>
