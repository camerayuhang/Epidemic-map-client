<!--
 * @Author: camerayuhang
 * @Date: 2022-12-20 14:37:49
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 01:45:51
 * @FilePath: /vue3-composition-epidemic-map/src/components/Graphs/StatisticCard.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="col">
    <div class="statistic-card p-1">
      <div class="title mt-1">
        <strong>{{ title }}</strong>
      </div>
      <div class="detail">
        <div class="delta" :style="{ color: color }">
          <strong>{{ count }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    default: 'red',
    type: String
  },
  title: {
    default: 'Cases',
    type: String
  },
  count: {
    default: 4080,
    type: Number
  }
});
</script>

<style scoped>
.statistic-card {
  border-radius: 6px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgb(0 0 0 / 5%);
  box-sizing: border-box;
  min-height: 72px;
  min-width: 79px;
}
.title {
  font-size: 13px;
}
/* .statistic-card:not(:last-child) {
  margin-right: 6px;
} */
</style>
