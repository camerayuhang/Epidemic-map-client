/*
 * @Author: camerayuhang
 * @Date: 2022-12-11 20:13:04
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-17 14:39:30
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/SymbolizationService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { Feature } from 'ol';
import { Circle } from 'ol/geom.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style';
import { reactive, ref } from 'vue';
import epidemicService from '../DataService/EpidemicService.js';
import mapService from './MapService';
class SymbolizationService {
  constructor() {
    this.layerLabels = ref(['ChinaCities', 'ChinaProvinces']);
    this.fieldLabels = ref([]);
    this.dateLabels = ref([]);
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
        // image: new Circle({
        //   fill: fill,
        //   stroke: stroke,
        //   radius: 5
        // }),
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
  async initFieldAndDateLabels() {
    const { data } = await epidemicService.getEpidemicInfo({ city: '北京' });
    data.forEach(row => {
      this.dateLabels.value.push(row['date']);
    });
    this.fieldLabels.value = Object.keys(data[0]);
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
    layer.setStyle(symbolizationService.getDefaultStyle());
    layer.set('colorMap', []);
  }
}

class GraduatedColorRenderer {
  constructor() {
    this.colorMap = [
      {
        min: 1,
        max: 9,
        color: '#FAEAD1'
      },
      {
        min: 10,
        max: 99,
        color: '#EAA188'
      },
      {
        min: 100,
        max: 499,
        color: '#D46255'
      },
      {
        min: 500,
        max: 999,
        color: '#BB3836'
      },
      {
        min: 1000,
        max: 10000,
        color: '#772625'
      },
      {
        min: 10001,
        max: 99999,
        color: '#470E11'
      }
    ];
    this.field = null;
    this.combinedData = null;
    this.joinFc = null;
    this.defaultStyle = null;
  }

  /**
   *
   * @param {VectorTileLayer} layer
   * @param {Object} data
   */
  render(layer, combinedData, field, joinFc) {
    this.field = field;
    this.combinedData = combinedData;
    this.joinFc = joinFc;
    this.defaultStyle = this.defaultStyle === null ? (this.defaultStyle = layer.getStyle()) : this.defaultStyle;
    // console.log(combinedData);
    layer.setStyle(this.simpleStyle.bind(this));
  }

  /**
   * shi_code: 3507
   * @param {Feature} feature
   */
  simpleStyle(feature) {
    const value = this.joinFc(feature, this.combinedData, this.field);
    // console.log(feature.getProperties(), value);
    let color = this.getColor(value);
    return new Style({
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        width: 1,
        color: '#333'
      })
    });
  }

  getColor(value) {
    let color = this.colorMap[0].color;
    for (let colorObj of this.colorMap) {
      if (value >= colorObj.min && value <= colorObj.max) {
        color = colorObj.color;
      }
    }
    return color;
  }
}

export default new SymbolizationService();

// export default function mappingService() {
//   const formSelected = reactive({
//     field: 'cumulative confirm',
//     date: '2022/12/6'
//   });
//   const fieldsLabels = ref(['cumulative confirm', 'cumulative death', 'cumulative cure']);
//   const dateLabels = ref([]);
//   const fjConfirmWithAllDate = ref({});
//   const currentDateConfirm = ref([]);

//   const graduatedColorRenderer = new GraduatedColorRenderer();

//   const initData = async () => {
//     fjConfirmWithAllDate.value = await epidemicService.getFujianConfirm();
//     dateLabels.value = Object.keys(fjConfirmWithAllDate.value);
//   };

//   const getCurrentDateConfirm = dateStr => {
//     currentDateConfirm.value = fjConfirmWithAllDate.value[dateStr];
//   };

//   /**
//    *
//    * @param {VectorTileLayer} layer
//    */
//   const joinFc = (feature, array, field) => {
//     const DI2 = feature.get('shi_code').toString().slice(2);
//     let value = 0;
//     for (let row of array) {
//       if (row['DI2'] == DI2) {
//         value = row[field];
//         break;
//       }
//     }
//     return value;
//   };

//   const readyToMapping = layer => {
//     graduatedColorRenderer.render(layer, currentDateConfirm.value, formSelected.field, joinFc);
//   };

//   return {
//     graduatedColorRenderer,
//     formSelected,
//     fieldsLabels,
//     dateLabels,
//     fjConfirmWithAllDate,
//     currentDateConfirm,
//     initData,
//     getCurrentDateConfirm,
//     readyToMapping
//   };
// }
