/*
 * @Author: camerayuhang
 * @Date: 2022-12-11 20:13:04
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-21 20:08:53
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/SymbolizationService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { Feature } from 'ol';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { ref } from 'vue';
import epidemicService from '../DataService/EpidemicService.js';
import mapService from './MapService';
class SymbolizationService {
  constructor(opt_options) {
    this.layerLabels = ref(['ChinaCities', 'ChinaProvinces', 'EpidemicPoints']);
    this.fieldLabels = ref([]);
    this.dateLabels = ref([]);
    this.provinceLabels = ref([]);
    this.methodLabels = ref(['Graduated Color', 'Graduated Symbol']);
  }
  getDefaultStyle() {
    const fill = new Fill({
      color: 'rgba(255,255,255,0.4)'
    });
    const stroke = new Stroke({
      color: '#3399CC',
      width: 1.25
    });
    const styles = [
      new Style({
        image: new Circle({
          fill: fill,
          stroke: stroke,
          radius: 5
        }),
        fill: fill,
        stroke: stroke
      })
    ];
    return styles;
  }

  initLayerLabels() {
    this.layerLabels.value = [];
    const layerCollection = mapService._map.getLayers();
    layerCollection.forEach((layer, index) => {
      this.layerLabels.value.push(layer.get('name'));
    });
  }
  async initFieldAndDateAndProvinceLabels() {
    const { data } = await epidemicService.getEpidemicInfo({ city: '北京' });
    data.forEach(row => {
      this.dateLabels.value.push(row['date']);
    });
    this.fieldLabels.value = Object.keys(data[0]);

    const { data: result } = await epidemicService.getEpidemicInfo({ date: '2022-12-06' });
    result.forEach(row => {
      if (!this.provinceLabels.value.includes(row['province'])) {
        this.provinceLabels.value.push(row['province']);
      }
    });
    this.provinceLabels.value.push('全国');
  }

  /**
   *
   * @param {*} joinedField
   * @param {*} dict
   * @param {Feature} feature
   */
  joinTable(joinedField, dict, feature) {
    for (let key in dict) {
      if (feature.get(joinedField).includes(key)) {
        feature.properties_.attr = dict[key];
      }
    }
  }

  /**
   *
   * @param {VectorTileLayer} layer
   */
  clearStyle(layer) {
    layer.setStyle(this.getDefaultStyle());
    layer.set('colorMap', []);
  }
}

export default new SymbolizationService();
