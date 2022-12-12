<!--
 * @Author: camerayuhang
 * @Date: 2022-11-23 21:18:21
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-12 12:31:16
 * @FilePath: /vue3-composition-epidemic-map/src/App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->

<template>
  <div class="h-100">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <RouterLink to="/" class="navbar-brand">camerayuhang</RouterLink>
      <div class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link"> Home </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'my-register' }" class="nav-link"> Sign Up </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"> Login </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link active" @click.prevent="logOut"> LogOut </a>
        </li>
      </div>
    </nav>
    <div class="container-fluid mt-3 h-100">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import mapService from './service/GISService/MapService';

const store = useStore();
const router = useRouter();

const currentUser = computed(() => {
  return store.state.auth.user;
});

const logOut = () => {
  store.dispatch('auth/logout');
  router.push({ name: 'my-login' });
  mapService.destoryMap();
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /*margin-top: 60px; */
}

html,
body {
  margin: 0;
  height: 100%;
}
</style>
