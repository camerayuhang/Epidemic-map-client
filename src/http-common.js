/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 22:25:14
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-11 14:08:46
 * @FilePath: /vue3-composition-epidemic-map/src/http-common.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import axios from 'axios';
import { API_URL } from '@/myconfig.js';

const requestAuth = axios.create({
  baseURL: API_URL + '/auth',
  headers: {
    'Content-type': 'application/json'
  }
});

const requestEpidemic = axios.create({});

export { requestAuth, requestEpidemic };
