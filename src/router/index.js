/*
 * @Author: camerayuhang
 * @Date: 2022-12-07 15:36:41
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-09 19:32:16
 * @FilePath: /vue3-composition-epidemic-map/src/router/index.js
 * @Description:
 *
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved.
 */
import { createWebHistory, createRouter } from 'vue-router';

const MyLogin = () => import('@/components/MyLogin.vue');
const MyRegister = () => import('@/components/MyRegister.vue');
const MyProfile = () => import('@/components/MyProfile.vue');
const MyHome = () => import('@/components/Home/Home.vue');
const routes = [
  { path: '/', component: MyLogin },
  { path: '/login', name: 'my-login', component: MyLogin },
  { path: '/register', name: 'my-register', component: MyRegister },
  { path: '/profile', name: 'my-profile', component: MyProfile },
  { path: '/home', name: 'my-home', component: MyHome }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const publicPages = ['my-login', 'my-register'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next({ name: 'my-login' });
  } else {
    next();
  }
});

export default router;
