<template>
  <div class="ol-popup" id="popup-overlay">
    <el-descriptions class="margin-top" title="With border" :column="2" size="small" border>
      <el-descriptions-item v-for="(value, key) in info">
        <template #label>
          <div class="cell-item">
            {{ refineString(key) }}
          </div>
        </template>

        <el-tag v-if="['confirmed', 'recovered', 'date', 'city', 'deaths', 'active_cases'].includes(key)" size="small">{{ value }}</el-tag>
        <span v-else>{{ value }}</span>
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
