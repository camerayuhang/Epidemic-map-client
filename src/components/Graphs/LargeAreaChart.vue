<!--
 * @Author: camerayuhang
 * @Date: 2022-12-19 18:55:59
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 14:05:53
 * @FilePath: /vue3-composition-epidemic-map/src/components/Graphs/LargeAreaChart.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <MyChart :title="text" :height="height">
    <v-chart :option="option" autoresize></v-chart>
  </MyChart>
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
    required: true,
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
    str = str.replaceAll('_', ' ');
    console.log(str);
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
  // title: {
  //   left: 'center',
  //   text: _text
  // },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      saveAsImage: {}
    }
  },

  grid: {
    left: '1%',
    right: '4%',
    bottom: '18%',
    containLabel: true
  },
  dataset: {
    dimensions: _dimensions,
    source: _dateSource
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
  series: [
    {
      name: seriesName.value[1],
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      }
    }
  ]
});
</script>
