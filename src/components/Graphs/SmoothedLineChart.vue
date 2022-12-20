<!--
 * @Author: camerayuhang
 * @Date: 2022-12-19 21:39:48
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 14:05:46
 * @FilePath: /vue3-composition-epidemic-map/src/components/Graphs/SmoothedLineChart.vue
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
    str.replace('-', ' ');
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    strArr.push(capitalized);
  });
  return strArr;
});

const echarts = inject('echarts');

const option = ref({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '1%',
    right: '4%',
    bottom: '18%',
    containLabel: true
  },

  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      saveAsImage: {}
    }
  },
  // title: {
  //   left: 'center',
  //   text: _text
  // },
  dataset: {
    dimensions: _dimensions,
    source: _dateSource
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: seriesName.value[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: 'rgb(221, 55, 0)'
      }
    }
  ]
});
</script>
