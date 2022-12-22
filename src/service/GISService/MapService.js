/*
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:41:35
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-22 23:06:38
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/MapService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { Map, View } from 'ol';
import * as olProj from 'ol/proj';
import { FullScreen, defaults as defaultControls } from 'ol/control.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM.js';
import { getVectorTileFromGeoServer, createTileLayer } from '../GISService/LayerTools.js';
import BaseLayer from 'ol/layer/Base.js';
import { PopupOverlay } from './Overlays/PopupOverlay.js';
import { SelectInteraction } from './Interaction/SelectInteraction.js';
import { applyStyle } from 'ol-mapbox-style';
import VectorTileLayer from 'ol/layer/VectorTile.js';

class MapService {
  constructor() {
    this._map = null;
    this._view = null;
    this.province = null;
    this.fujianCities = null;
    this.capitals = null;
    this.popup = null;
  }

  /**
   * initialize the map, and render it to the DOM target
   * @param {Number} zoomlevel
   * @param {String} targetStr - Id of Container
   */
  initMap = (zoomlevel, targetStr) => {
    this._view = new View({
      zoom: zoomlevel,
      center: olProj.transform([110, 39], 'EPSG:4326', 'EPSG:3857')
    });
    this._map = new Map({
      controls: defaultControls({
        zoom: true,
        attribution: false,
        rotate: false
      }).extend([
        new FullScreen({
          source: 'map-and-tools'
        })
      ]),
      target: targetStr,
      layers: [],
      view: this._view
    });

    // this._view.on('change:center', e => {
    //   const center = this._view.getCenter();
    //   const zoom = this._view.getZoom();
    //   console.log(center, zoom, olProj.transform(center, 'EPSG:3857', 'EPSG:4326'));
    // });
  };

  /**
   * initialize the Layers of this map
   */
  initLayer = () => {
    const layer = new VectorTileLayer({ declutter: true, name: 'streets-v12', updateWhileAnimating: true });
    applyStyle(layer, 'mapbox://styles/camerayuhang/clbrqirmf000715o2tk1dv26u', { accessToken: 'pk.eyJ1IjoiY2FtZXJheXVoYW5nIiwiYSI6ImNsYnJwMmt1eDFmaGMzcHBsMHl1dXpqOW0ifQ.voxLAF6gSmGJKrhDNsYGGw' });
    this.pushLayer(layer);
    this.province = getVectorTileFromGeoServer('camerayuhang:China_Provinces_UTF-8', '900913', 'ChinaProvinces');
    this.pushLayer(this.province);
    this.cities = getVectorTileFromGeoServer('camerayuhang:China_Cities_UTF-8', '900913', 'ChinaCities');
    this.pushLayer(this.cities);
    // this.fujianCities = getVectorTileFromGeoServer('camerayuhang:Fujian_Cities_UTF-8', '900913', 'FujianCities');
    // this.pushLayer(this.fujianCities);
    // this.capitals = getVectorTileFromGeoServer('camerayuhang:China_Capitals_UTF-8', '900913', 'ChinaCapitals');
    // this.pushLayer(this.capitals);
  };

  initOthers = element => {
    const popupOverlay = new PopupOverlay(this._map, element);
    this.popup = popupOverlay.initOverlay();
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

  searchForLayer(layerName) {
    let layer = null;
    this._map.getLayers().forEach((ele, index) => {
      if (ele.get('name') == layerName) {
        layer = ele;
      }
    });
    return layer;
  }

  destoryMap = () => {
    this._map = null;
    this._view = null;
  };
}

export default new MapService();
