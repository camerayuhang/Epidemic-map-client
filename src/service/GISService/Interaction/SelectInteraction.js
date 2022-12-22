/*
 * @Author: camerayuhang
 * @Date: 2022-12-20 15:59:29
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 21:28:31
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/Interaction/SelectInteraction.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import Select from 'ol/interaction/Select';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import { inject, provide, ref } from 'vue';
import store from '../../../store/';
// 初始化select交互

class SelectInteraction {
  constructor(layer, map, popup) {
    this.pointLayer = layer;
    this.map = map;
    this.popup = popup;
    this.info = ref([]);
  }
  initInteraction = () => {
    console.log('initialize');
    const select = new Select({
      condition: function (e) {
        return e.type === 'singleclick';
      },
      layers: [this.pointLayer],
      // 🙅不想改变样式需要设置为null
      style: null
    });
    this.map.addInteraction(select);
    // select和deselect都会触发该事件
    select.on('select', e => {
      // select选中样式，是不会改变原先的样式，只会在原先样式的基础上改变样式，取消选中，则会还原成原来的样式
      // 设置样式
      console.log(e);
      const feature = e.selected[0];
      if (!feature) {
        this.popup.setPosition(undefined);
        this.clearStyle(this.pointLayer.getSource().getFeatures());
        return;
      }
      // 高亮要素
      this.highLightPoint(feature);
    });
  };

  // 清空样式
  clearStyle(features) {
    features.every(item => {
      if (item.getStyle()) {
        item.setStyle(null);
      }
      return true;
    });
    this.popup.setPosition(undefined);
  }

  // 高亮所选点
  highLightPoint(feature, delay) {
    // 1.所有点要素还原默认属性
    this.clearStyle(this.pointLayer.getSource().getFeatures());
    // 2.获取要素上的属性信息
    const info = feature.get('attr');
    store.dispatch('data/updateData', { data: feature.get('attr') });
    // 3.设置高亮要素的样式
    feature.setStyle(this.selectedStyle(info['city'], feature.get('radius')));
    // 4.获取横轴墨卡托坐标，获取几何坐标，不要获取点击坐标
    const coord = feature.getGeometry().getCoordinates();
    // 显示弹出框
    if (delay) {
      setTimeout(() => {
        this.popup.setPosition(coord);
      }, delay);
    } else {
      this.popup.setPosition(coord);
    }
  }

  // 选中样式
  selectedStyle(name, radius) {
    radius = radius == undefined ? 7 : radius;
    const orginalColor = 'rgba(244,101,73,0.6)';
    const hightlightColor = 'rgba(216,45,36,1)';
    const stroke = new Stroke({
      color: hightlightColor,
      width: 3
    });
    const fill = new Stroke({
      color: orginalColor
    });
    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: fill,
        stroke: stroke
      }),
      text: new Text({
        text: name,
        fill: new Fill({
          color: '#000'
        }),
        textAlign: 'left',
        scale: 1.5,
        offsetX: '10',
        offsetY: 10,
        stroke: new Stroke({
          color: '#fff',
          width: 1
        })
      })
    });
  }
}

export { SelectInteraction };
