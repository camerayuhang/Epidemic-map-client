<!--
 * @Author: camerayuhang
 * @Date: 2022-12-20 12:42:41
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 01:47:59
 * @FilePath: /vue3-composition-epidemic-map/src/components/Graphs/StackedLine.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <MyChart :title="text" :height="height"> <v-chart :option="option" autoresize /> </MyChart>
</template>

<script setup>
import MyChart from '../Template/MyChart.vue';
import { ref, inject, computed } from 'vue';

const props = defineProps({
  dataSource: {
    type: Array,
    required: true
  },
  dimensions: {
    type: Array,
    required: true
  },
  text: {
    required: false,
    type: String
  },
  height: {
    default: '300px',
    type: String
  }
});
const _dateSource = computed(() => {
  return props.dataSource;
});
const _dimensions = computed(() => {
  return props.dimensions;
});
const _text = computed(() => {
  return props.text;
});
const seriesName = computed(() => {
  const strArr = [];
  _dimensions.value.forEach(str => {
    str = str.replace('_', ' ');
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    strArr.push(capitalized);
  });
  return strArr;
});

const series = computed(() => {
  const array = seriesName.value;
  const obj = [];
  for (let i = 1; i < array.length; i++) {
    obj.push({ name: array[i], type: 'line' });
  }
  return obj;
});
const echarts = inject('echarts');

const option = ref({
  // title: {
  //   text: 'Stacked Line'
  // },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: seriesName.value.slice(1)
  },
  grid: {
    left: '1%',
    right: '4%',
    bottom: '18%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '20%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  dataset: {
    dimensions: _dimensions,
    source: _dateSource
  },
  series: series
});
</script>
