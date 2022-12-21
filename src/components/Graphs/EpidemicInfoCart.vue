<!--
 * @Author: camerayuhang
 * @Date: 2022-12-20 14:26:27
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 15:48:21
 * @FilePath: /vue3-composition-epidemic-map/src/components/Graphs/EpidemicInfoCart.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <MyChart :title="text" :height="height">
    <div class="date d-flex">
      <el-icon class="me-1"><Calendar /></el-icon>
      <h6>{{ dataSource.date }}</h6>
    </div>
    <div class="card-group justify-content-center row row-cols-3 text-center g-2">
      <StatisticCard color="#F6543C" title="Active cases" :count="dataSource['active_cases']"></StatisticCard>
      <StatisticCard color="#F7871E" title="New cases" :count="dataSource['daily_new_cases']"></StatisticCard>
      <StatisticCard color="#A56256" title="New deaths" :count="dataSource['daily_new_deaths']"></StatisticCard>
      <StatisticCard color="#B22E35" title="Confirmes" :count="dataSource['confirmed']"></StatisticCard>
      <StatisticCard color="#657697" title="Deaths" :count="dataSource['deaths']"></StatisticCard>
      <StatisticCard color="#34B7A6" title="Recovered" :count="dataSource['recovered']"></StatisticCard></div
  ></MyChart>
</template>

<script setup>
import StatisticCard from '../Graphs/StatisticCard.vue';
import MyChart from '../Template/MyChart.vue';
defineProps({
  text: {
    required: false,
    type: String
  },
  height: {
    default: '300px',
    type: String
  },
  dataSource: {
    type: Object
  }
});
</script>
