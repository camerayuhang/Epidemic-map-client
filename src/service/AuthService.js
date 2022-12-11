/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 22:21:37
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-08 20:53:53
 * @FilePath: /vue3-composition-epidemic-map/src/service/AuthService.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */

import { requestAuth } from '@/http-common.js';
class AuthService {
  login(user) {
    return requestAuth
      .post('/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return requestAuth.post('/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
