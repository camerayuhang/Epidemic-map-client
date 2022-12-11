/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 22:21:58
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-07 22:22:09
 * @FilePath: /vue3-composition-epidemic-map/src/service/auth-header.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: user.type + ' ' + user.token };
  } else {
    return {};
  }
}
