/*
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:41:35
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-11 22:17:30
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/MapService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { Map, View } from 'ol';
import * as olProj from 'ol/proj';
import { defaults } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM.js';
import { getVectorTileFromGeoServer, createTileLayer } from '../GISService/LayerTools.js';
import BaseLayer from 'ol/layer/Base.js';

class MapService {
  constructor() {
    this._map = null;
    this._view = null;
    this.province = null;
    this.fujianCities = null;
    this.capitals = null;
  }

  /**
   * initialize the map, and render it to the DOM target
   * @param {Number} zoomlevel
   * @param {String} targetStr - Id of Container
   */
  initMap = (zoomlevel, targetStr) => {
    this._view = new View({
      zoom: zoomlevel,
      center: olProj.transform([118.0360714857695, 25.74283732844563], 'EPSG:4326', 'EPSG:3857')
    });
    this._map = new Map({
      controls: defaults({
        zoom: false,
        attribution: false
      }),
      target: targetStr,
      layers: [],
      view: this._view
    });

    this._view.on('change:center', e => {
      const center = this._view.getCenter();
      const zoom = this._view.getZoom();
      console.log(center, zoom, olProj.transform(center, 'EPSG:3857', 'EPSG:4326'));
    });
  };

  /**
   * initialize the Layers of this map
   */
  initLayer = () => {
    this.pushLayer(createTileLayer(new OSM(), 'BaseMap'));
    this.province = getVectorTileFromGeoServer('camerayuhang:China_Provinces_UTF-8', '900913', 'ChinaProvinces');
    this.pushLayer(this.province);
    // this.pushLayer(getVectorTileFromGeoServer('camerayuhang:China_Counties_UTF-8', '900913', 'ChinaCounties'));
    this.fujianCities = getVectorTileFromGeoServer('camerayuhang:Fujian_Cities_UTF-8', '900913', 'FujianCities');
    this.pushLayer(this.fujianCities);
    this.capitals = getVectorTileFromGeoServer('camerayuhang:China_Capitals_UTF-8', '900913', 'ChinaCapitals');
    this.pushLayer(this.capitals);
  };

  /**
   * add layer or layers the current map
   * @param {Array|BaseLayer} layerArr - `BaseLayer` or arrays containing `BaseLayer`
   */
  pushLayer = layerArr => {
    const collection = this._map.getLayers();
    if (layerArr instanceof BaseLayer) {
      collection.push(layerArr);
    } else {
      layerArr.forEach(layer => {
        collection.push(layer);
      });
    }
  };

  destoryMap = () => {
    this._map = null;
    this._view = null;
  };
}

export default new MapService();
