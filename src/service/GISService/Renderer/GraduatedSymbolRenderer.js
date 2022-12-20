/*
 * @Author: camerayuhang
 * @Date: 2022-12-17 16:38:23
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-20 19:37:18
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/Renderer/GraduatedSymbolRenderer.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { classifyJenks, classifyEqInterval, getRanges, classIdx } from 'classify-series';
import { Circle, Fill, Stroke, Style } from 'ol/style';

class GraduatedSymbolRenderer {
  constructor(renderField, layer, combinedData, joinTable, joinedField) {
    this.layer = layer;
    this.renderField = renderField;
    this.combinedData = combinedData;
    this.joinTable = joinTable;
    this.joinedField = joinedField;
    this.array = this.jsonToArray(this.combinedData);
    this.classes = 20;
    // this.boundArray = this.naturalBreak(this.array, this.classes);
    this.boundArray = [1, 93, 229, 423, 692, 1049, 1395, 1868, 2913, 3518, 4560, 5221, 5885, 6817, 7600, 14097, 19588, 25192, 33821, 50741, 64811];
    const ranges = getRanges(this.boundArray);
    console.log(this.boundArray);
    console.log(ranges);
    this.maxRadius = 20;
  }

  jsonToArray(json) {
    const array = [];
    json.forEach(row => {
      array.push(row[this.renderField]);
    });
    return array;
  }
  naturalBreak(array, classes) {
    return classifyJenks(array, classes);
  }

  render() {
    this.layer.setStyle(this.simpleStyle.bind(this));
  }

  simpleStyle(feature) {
    let radius = 0;
    const color = 'rgba(244,101,73,0.6)';
    const a = this.maxRadius / this.classes;
    radius = (classIdx(this.boundArray, feature.get('attr')[this.renderField]) + 1) * a;
    feature.set('radius', radius);
    const stroke = new Stroke({
      color: color,
      width: 1.25
    });
    const fill = new Fill({
      color: color
    });
    const style = [
      new Style({
        image: new Circle({
          fill: fill,
          stroke: stroke,
          radius: radius
        })
      })
    ];
    return style;
  }
}

export { GraduatedSymbolRenderer };
