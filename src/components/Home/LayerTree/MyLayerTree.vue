<!--
 * @Author: camerayuhang
 * @Date: 2022-12-09 16:13:05
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-16 00:05:40
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/LayerTree/MyLayerTree.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div>
    <div class="tree-head">
      <h1>Contents</h1>
      <p>
        <el-icon><InfoFilled /></el-icon><span>Drag to change the displaying order</span>
      </p>
    </div>
    <div class="tree-body">
      <el-tree
        :data="layerNodes"
        node-key="id"
        default-expand-all
        draggable
        show-checkbox
        check-strictly
        :default-checked-keys="defaultVisibleLayer"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-drag-start="handleDragStart"
        @node-drop="handleDrop"
        @check-change="
          (data, checked) => {
            data.visibilityChange(data, checked);
          }
        "
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <el-slider v-if="node.label === 'opacity'" v-model="data.val" input-size="small" :min="data.min" :max="data.max" :step="data.step" @input="data.opacityChange"></el-slider>
            <el-slider v-if="node.label === 'radius size'" v-model="data.val" input-size="small" :min="data.min" :max="data.max" :step="data.step" @input="data.radiusChange"></el-slider>
            <el-slider v-if="node.label === 'blur size'" v-model="data.val" input-size="small" :min="data.min" :max="data.max" :step="data.step" @input="data.blurChange"></el-slider>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script setup>
import LayerGroup from 'ol/layer/Group';
import { computed, onMounted, ref } from 'vue';
import mapService from '../../../service/GISService/MapService';
import Heatmap from 'ol/layer/Heatmap';
import { getIndexof, reOrderArr } from '@/service/Utils/baseutils.js';

const layerNodes = ref([]);
const indexBefore = ref(0);
const indexAfter = ref(0);
const layerArray = ref([]);

const ol_map = mapService._map;

const defaultVisibleLayer = computed(() => {
  const arr = [];
  // 当layerNodes改变时，该计算属性就会触发
  layerNodes.value.every(item => {
    if (item.visibility) {
      arr.push(item.id);
    }
    return true;
  });
  return arr;
});

onMounted(() => {
  initLayerTree();
});

// 创建所有图层节点
const createAllLayerNodes = (id, group) => {
  layerNodes.value = [];
  console.log(group.getLayers());
  group.getLayers().forEach((layer, i, array) => {
    const layerId = id + (array.length - i - 1);
    if (layer instanceof LayerGroup) {
      createAllLayerNodes(layerId, layer);
    } else {
      createSingleLayerNode(layerId, layer);
    }
  });
};
// 创建每一个图层节点
const createSingleLayerNode = (layerId, layer) => {
  const layerNode = {};
  // 图层节点的标题
  layerNode.id = layerId;
  layerNode.label = layer.get('name');
  layerNode.visibility = layer.get('visible');
  layerNode.visibilityChange = (data, checked) => {
    layer.set('visible', checked);
  };
  // 图层节点的控制内容
  layerNode.children = [];
  layerNode.children.push({
    id: layerId + ' prop opacity',
    label: 'opacity',
    val: layer.get('opacity'),
    min: 0,
    max: 1,
    step: 0.01,
    opacityChange: e => {
      layer.set('opacity', e);
    }
  });
  // 若是热力图，增加两个图层控制内容
  if (layer instanceof Heatmap) {
    layerNode.children.push({
      id: layerId + ' prop radius size',
      label: 'radius size',
      val: layer.get('radius'),
      min: 1,
      max: 50,
      step: 1,
      radiusChange: e => {
        layer.set('radius', e);
      }
    });
    layerNode.children.push({
      id: layerId + ' prop blur size',
      label: 'blur size',
      val: layer.get('blur'),
      min: 1,
      max: 50,
      step: 1,
      blurChange: e => {
        layer.set('blur', e);
      }
    });
  }
  // 前面插入节点
  layerNodes.value.unshift(layerNode);
};

const initLayerTree = () => {
  createAllLayerNodes('layer', ol_map.getLayerGroup());
  // 为监听图层
  ol_map.getLayers().on('change:length', e => {
    const layerGroup = new LayerGroup({ layers: e.target });
    createAllLayerNodes('layer', layerGroup);
  });
};

// 拖拽开始的回调
const handleDragStart = (node, ev) => {
  indexBefore.value = getIndexof(layerNodes.value, node.data);
};
// 拖拽成功结束的回调
const handleDrop = (draggingNode, dropNode, dropType, ev) => {
  indexAfter.value = getIndexof(layerNodes.value, draggingNode.data);
  // 图层数组是从下标大的显示到下标小的
  // 图层控制节点是下标小的显示到下标大大
  layerArray.value = ol_map.getLayers().getArray();
  const length = layerArray.value.length;
  reOrderArr(layerArray.value, length - 1 - indexBefore.value, length - 1 - indexAfter.value);
  // 重新刷新图层
  reRenderLayers();
};
const allowDrop = (draggingNode, dropNode, type) => {
  if (dropNode.data.id.indexOf('prop') !== -1) {
    return false;
  } else if (type === 'inner') {
    return false;
  } else {
    return true;
  }
};
const allowDrag = draggingNode => {
  // ID不为prop点节点可以拖拽
  return draggingNode.data.id.indexOf('prop') === -1;
};
// 重新渲染地图
const reRenderLayers = () => {
  // 请求下一次渲染
  ol_map.render();
};
</script>
<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
  justify-content: space-between;
}
.el-slider {
  flex: 1 1 auto;
  margin-left: 15px;
  margin-right: 10px;
}
/deep/ .el-tree-node__children .el-checkbox__input {
  display: none;
}
.tree-container {
  background-color: #fff;
  .tree-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      margin-bottom: 10px;
    }
    p {
      margin: 0 0 5px;
      margin-left: 20px;
      font-size: 12px;
      align-self: flex-start;
    }
  }
}
</style>
