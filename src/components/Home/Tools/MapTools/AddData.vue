<!--
 * @Author: camerayuhang
 * @Date: 2022-12-23 19:46:59
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 17:01:30
 * @FilePath: /vue3-composition-epidemic-map/src/components/Home/Tools/MapTools/AddData.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="h-100">
    <el-upload class="h-100" :auto-upload="false" :on-change="beforeUploadHandler" :show-file-list="false">
      <el-button :style="{ height: '40px' }" type="primary" :icon="DocumentAdd">Add</el-button>
    </el-upload>
  </div>
</template>
<script setup>
import { DocumentAdd } from '@element-plus/icons-vue';
import { readFileAsText } from '../../../../service/Utils/baseutils';
import { createVectorFromJson } from '../../../../service/GISService/LayerTools';
import mapService from '../../../../service/GISService/MapService';
const beforeUploadHandler = async (uploadFile, uploadFiles) => {
  const file = uploadFile.raw;
  let name = file.name;
  name = name.substring(0, name.lastIndexOf('.'));
  const geoJson = await readFileAsText(file);
  const layer = createVectorFromJson(name, geoJson);
  mapService.pushLayer(layer);
  ElMessage({
    showClose: true,
    message: 'Add data successfully!',
    type: 'success'
  });
};
</script>
