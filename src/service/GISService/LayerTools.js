/*
 * @Author: camerayuhang
 * @Date: 2022-12-09 22:15:37
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-11 00:17:37
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

const capitalsStyle = feature => {};

export { getVectorTileFromGeoServer, createTileLayer };
