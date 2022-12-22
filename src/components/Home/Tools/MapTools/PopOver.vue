<!--
 * @Author: camerayuhang
 * @Date: 2022-12-20 16:45:08
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 23:18:19
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/PopOver.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="ol-popup" id="popup-overlay">
    <el-descriptions class="margin-top" title="Attribution" :column="1" size="small" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Confirmed</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="danger">{{ info['confirmed'] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Active</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="warning">{{ info['active_cases'] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Recovered</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="success">{{ info['recovered'] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Fatal</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="warning">{{ info['deaths'] }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>New cases</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="warning">{{ info['daily_new_cases'] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>New deaths</strong></div>
        </template>
        <el-tag size="small" effect="dark" type="warning">{{ info['daily_new_deaths'] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>City</strong></div>
        </template>
        <span>{{ info['city'] }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Province</strong></div>
        </template>
        <span>{{ info['province'] }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Longitude</strong></div>
        </template>
        <span>{{ info['longitude'] }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item"><strong>Latitude</strong></div>
        </template>
        <span>{{ info['latitude'] }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const refineString = str => {
  str = str.replaceAll('_', ' ');
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};
</script>
<style lang="less" scoped>
.ol-popup {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
  font-size: 13px;
  width: max-content;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
/deep/ .el-descriptions__header {
  margin-bottom: 10px;
}
/deep/ .name-label {
  background: #e1f3d8;
  font-weight: 700 !important;
  font-size: 13px;
}
/deep/ .name-content {
  background: #fde2e2;
  font-weight: 700 !important;
  font-size: 13px;
}
.cell-item {
  display: flex;
  align-items: center;
}
</style>
