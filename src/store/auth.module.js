/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 20:03:55
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-09 16:59:20
 * @FilePath: /vue3-composition-epidemic-map/src/store/auth.module.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import authService from '@/service/AuthService.js';

// the code below is executed before rendering the html.
// if user has already logged in before,then get userinfo from localstorage and assign it and true status to vuex states.
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      // set userinfo in localstorage first
      return authService.login(user).then(
        user => {
          // second commit mutation to set userinfo in vuex and set loggedIn to true
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      authService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return authService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
