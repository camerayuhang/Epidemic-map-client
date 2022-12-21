<!--
 * @Author: camerayuhang
 * @Date: 2022-12-21 21:34:04
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 02:01:40
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/CovTimeLine.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div>
    <div class="tl-info d-flex text-start">
      <div class="tl-statistic d-flex">
        <div class="item date">
          <div>On the day of</div>
          <div>{{ date }}</div>
        </div>
        <div class="item total">
          <div>Total confirmed cases</div>
          <div :style="{ color: '#DE3700' }">{{ DataToday.confirmed }}</div>
        </div>
        <div class="item recovered">
          <div>Recovered</div>
          <div :style="{ color: '#B0D369' }">{{ DataToday.recovered }}</div>
        </div>
        <div class="item fatal">
          <div>Fatal</div>
          <div :style="{ color: '#767676' }">{{ DataToday.deaths }}</div>
        </div>
      </div>
      <div class="tl-control">
        <el-icon :style="{ color: '#3F9EFF', cursor: 'pointer' }" @click="playHandler"><VideoPlay v-if="!play" /><VideoPause v-else /></el-icon>
      </div>
    </div>
    <div class="tl-progress">
      <el-slider v-model="valueForDate" :format-tooltip="formatTooltip" :min="0" :max="339" placement="bottom" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, nextTick } from 'vue';
import epidemicService from '../../../../service/DataService/EpidemicService';
import { SelectInteraction } from '../../../../service/GISService/Interaction/SelectInteraction';
import { GraduatedSymbolRenderer } from '../../../../service/GISService/Renderer/GraduatedSymbolRenderer';
import mapService from '../../../../service/GISService/MapService';
import { createEpidemicPointLayer, createFeatures } from '../../../../service/GISService/LayerTools';

const play = ref(false);
const valueForDate = ref(0);
const store = useStore();

const secInterval = ref(500);
const steps = ref(5);

let timer = null;
let selectInteraction = null;
let layer = null;
const Renderer = GraduatedSymbolRenderer;
const dateLabels = computed(() => {
  return store.state.data.labels.dateArr;
});
const countryWithAlldate = computed(() => {
  return store.state.data.countryWithAlldate;
});

const date = computed(() => {
  return dateLabels.value[valueForDate.value];
});
const DataToday = computed(() => {
  return countryWithAlldate.value[valueForDate.value];
});
const formatTooltip = val => {
  return dateLabels.value[val];
};
const playHandler = () => {
  play.value = !play.value;
  if (play.value) {
    timer = setInterval(async () => {
      if (valueForDate.value + steps.value > 339) {
        valueForDate.value = 339;
      }
      console.log(valueForDate.value);
      const { data } = await epidemicService.getEpidemicInfo({ date: date.value });
      if (!mapService.searchForLayer('EpidemicPoints')) {
        layer = createEpidemicPointLayer();
        mapService.pushLayer(layer);
      }
      if (!selectInteraction) {
        selectInteraction = new SelectInteraction(layer, mapService._map, mapService.popup);
        selectInteraction.initInteraction();
      }
      // }
      createFeatures(layer, data);
      const renderer = new Renderer('confirmed', layer);
      renderer.render();

      if (valueForDate.value === 339) {
        clearInterval(timer);
        play.value = false;
        return;
      }
      valueForDate.value += steps.value;
    }, secInterval.value);
  } else {
    clearInterval(timer);
  }
};
</script>

<style lang="less" scoped>
.tl-statistic {
  font-weight: 700;
}
// .tl-progress {
//   height: 50px;
// }
.item {
  margin-right: 60px;
  :nth-child(1) {
    font-size: 13px;
  }
  :nth-child(2) {
    font-size: 24px;
  }
}
.el-icon {
  font-size: 40px;
}
</style>
