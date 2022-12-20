/*
 * @Author: camerayuhang
 * @Date: 2022-12-09 22:15:37
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-18 16:38:03
 * @FilePath: /vue3-composition-epidemic-map/src/service/GISService/LayerTools.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTile from 'ol/source/VectorTile';
import { createXYZ } from 'ol/tilegrid';
import MVT from 'ol/format/MVT';
import TileLayer from 'ol/layer/Tile';
import { geoServer_URL } from '@/myconfig.js';
import Source from 'ol/source/Source';
import mapService from '../GISService/MapService';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
/**
 *
 * @param {String} layer - name of layer, named in such format `{workspace name}:{layer name}`
 * @param {String} projection_epsg_no - code for epsg
 * @returns {VectorTileLayer} return a `VectorTileLayer`
 */
const getVectorTileFromGeoServer = (layer, projection_epsg_no, name) => {
  const _source = new VectorTile({
    tileGrid: createXYZ({
      maxZoom: 19
    }),
    format: new MVT(),
    url: geoServer_URL + '/gwc/service/tms/1.0.0/' + layer + '@EPSG%3A' + projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf'
  });
  const vectorTileLayer = new VectorTileLayer({
    name,
    source: _source
  });

  return vectorTileLayer;
};

/**
 *
 * @param {Source} layerSource - instance of `Source`
 * @returns {TileLayer} return a `TileLayer`
 */
const createTileLayer = (layerSource, name) => {
  const tileLayer = new TileLayer({
    name: name,
    source: layerSource
  });
  return tileLayer;
};

const createEpidemicPointLayer = () => {
  const source = new VectorSource({
    features: []
  });
  const layer = new VectorLayer({
    name: 'EpidemicPoints',
    source: source
  });
  return layer;
};

/**
 *
 * @param {VectorLayer} layer
 * @param {*} feature
 */
const createFeatures = (layer, data) => {
  // 清空要素
  const source = layer.getSource();
  source.clear();
  const features = [];
  for (let i = 0; i < data.length; i++) {
    const coord = fromLonLat([data[i].longitude, data[i].latitude]);
    const feature = new Feature({
      geometry: new Point(coord),
      attr: data[i]
    });
    feature.setId(data[i].id);
    features.push(feature);
  }
  // 添加要素
  source.addFeatures(features);
};
export { getVectorTileFromGeoServer, createTileLayer, createEpidemicPointLayer, createFeatures };
