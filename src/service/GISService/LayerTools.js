/*
 * @Author: camerayuhang
 * @Date: 2022-12-09 22:15:37
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 16:39:07
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
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import Circle from 'ol/geom/Circle.js';
import Heatmap from 'ol/layer/Heatmap';

import * as olProj from 'ol/proj';
import Projection from 'ol/proj/Projection';

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

const zoomToLayer = (lon, lat, view, cb) => {
  const coord = olProj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
  // 新坐标
  // this.newCoord = coord
  // 同时缩放和平移
  view.animate(
    {
      zoom: 4,
      duration: 1000
    },
    {
      zoom: 10,
      center: coord,
      duration: 1000
    },
    cb
  );
};
const createVectorFromJson = (name, geoJson) => {
  // const image = new CircleStyle({
  //   radius: 5,
  //   fill: null,
  //   stroke: new Stroke({ color: 'red', width: 1 })
  // });

  // const styles = {
  //   Point: new Style({
  //     image: image
  //   }),
  //   LineString: new Style({
  //     stroke: new Stroke({
  //       color: 'green',
  //       width: 1
  //     })
  //   }),
  //   MultiLineString: new Style({
  //     stroke: new Stroke({
  //       color: 'green',
  //       width: 1
  //     })
  //   }),
  //   MultiPoint: new Style({
  //     image: image
  //   }),
  //   MultiPolygon: new Style({
  //     stroke: new Stroke({
  //       color: 'yellow',
  //       width: 1
  //     }),
  //     fill: new Fill({
  //       color: 'rgba(255, 255, 0, 0.1)'
  //     })
  //   }),
  //   Polygon: new Style({
  //     stroke: new Stroke({
  //       color: 'blue',
  //       lineDash: [4],
  //       width: 3
  //     }),
  //     fill: new Fill({
  //       color: 'rgba(0, 0, 255, 0.1)'
  //     })
  //   }),
  //   GeometryCollection: new Style({
  //     stroke: new Stroke({
  //       color: 'magenta',
  //       width: 2
  //     }),
  //     fill: new Fill({
  //       color: 'magenta'
  //     }),
  //     image: new CircleStyle({
  //       radius: 10,
  //       fill: null,
  //       stroke: new Stroke({
  //         color: 'magenta'
  //       })
  //     })
  //   }),
  //   Circle: new Style({
  //     stroke: new Stroke({
  //       color: 'red',
  //       width: 2
  //     }),
  //     fill: new Fill({
  //       color: 'rgba(255,0,0,0.2)'
  //     })
  //   })
  // };

  // const styleFunction = function (feature) {
  //   return styles[feature.getGeometry().getType()];
  // };

  // const geojsonObject = {
  //   type: 'FeatureCollection',
  //   crs: {
  //     type: 'name',
  //     properties: {
  //       name: 'EPSG:3857'
  //     }
  //   },
  //   features: [
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [0, 0]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [4e6, -2e6],
  //           [8e6, 2e6]
  //         ]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'LineString',
  //         coordinates: [
  //           [4e6, 2e6],
  //           [8e6, -2e6]
  //         ]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Polygon',
  //         coordinates: [
  //           [
  //             [-5e6, -1e6],
  //             [-3e6, -1e6],
  //             [-4e6, 1e6],
  //             [-5e6, -1e6]
  //           ]
  //         ]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'MultiLineString',
  //         coordinates: [
  //           [
  //             [-1e6, -7.5e5],
  //             [-1e6, 7.5e5]
  //           ],
  //           [
  //             [1e6, -7.5e5],
  //             [1e6, 7.5e5]
  //           ],
  //           [
  //             [-7.5e5, -1e6],
  //             [7.5e5, -1e6]
  //           ],
  //           [
  //             [-7.5e5, 1e6],
  //             [7.5e5, 1e6]
  //           ]
  //         ]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'MultiPolygon',
  //         coordinates: [
  //           [
  //             [
  //               [-5e6, 6e6],
  //               [-3e6, 6e6],
  //               [-3e6, 8e6],
  //               [-5e6, 8e6],
  //               [-5e6, 6e6]
  //             ]
  //           ],
  //           [
  //             [
  //               [-2e6, 6e6],
  //               [0, 6e6],
  //               [0, 8e6],
  //               [-2e6, 8e6],
  //               [-2e6, 6e6]
  //             ]
  //           ],
  //           [
  //             [
  //               [1e6, 6e6],
  //               [3e6, 6e6],
  //               [3e6, 8e6],
  //               [1e6, 8e6],
  //               [1e6, 6e6]
  //             ]
  //           ]
  //         ]
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'GeometryCollection',
  //         geometries: [
  //           {
  //             type: 'LineString',
  //             coordinates: [
  //               [-5e6, -5e6],
  //               [0, -5e6]
  //             ]
  //           },
  //           {
  //             type: 'Point',
  //             coordinates: [4e6, -5e6]
  //           },
  //           {
  //             type: 'Polygon',
  //             coordinates: [
  //               [
  //                 [1e6, -6e6],
  //                 [3e6, -6e6],
  //                 [2e6, -4e6],
  //                 [1e6, -6e6]
  //               ]
  //             ]
  //           }
  //         ]
  //       }
  //     }
  //   ]
  // };
  // console.log(new GeoJSON().readProjection(geojsonObject));
  // console.log(new GeoJSON().readProjection(geoJson));
  const vectorSource = new VectorSource({
    // 从json读取要素的第三种方法，最佳，这里有url属性，自动转换投影
    // dataProjection is meant to be the projection already written in crs property of the Geojson file
    // featureProjection is meant to be the projection you want to reproject
    features: new GeoJSON({
      // dataProjection: new Projection({ code: 'EPSG:4326' }),
      featureProjection: new Projection({ code: 'EPSG:3857' })
    }).readFeatures(geoJson) // 对geojson读取和写数据的一个要素格式类
  });
  const fill = new Fill({
    color: 'rgba(255,255,255,0.4)'
  });
  const stroke = new Stroke({
    color: '#3399CC',
    width: 1.25
  });
  const styles = [
    new Style({
      image: new CircleStyle({
        fill: fill,
        stroke: stroke,
        radius: 20
      }),
      fill: fill,
      stroke: stroke
    })
  ];
  const vector = new VectorLayer({
    name: name,
    source: vectorSource
    // style: styles
    // style: new Style({
    //   fill: new Fill({
    //     color: ''
    //   }),
    //   stroke: new Stroke({
    //     width: 3,
    //     color: [71, 137, 227, 1]
    //   })
    // })
  });
  return vector;
};

const getHeatMap = (source, name) => {
  const heatmap = new Heatmap({
    name: name,
    source: source,
    blur: 18,
    radius: 6,
    opacity: 0.75
  });
  return heatmap;
};
export { getHeatMap, createVectorFromJson, getVectorTileFromGeoServer, createTileLayer, createEpidemicPointLayer, createFeatures, zoomToLayer };
