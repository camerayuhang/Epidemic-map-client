/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 20:04:05
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-07 22:32:32
 * @FilePath: /vue3-composition-epidemic-map/src/store/index.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { createStore } from 'vuex';
import { auth } from './auth.module';

const store = createStore({
  modules: {
    auth
  }
});

export default store;
