<!--
 * @Author: camerayuhang
 * @Date: 2022-12-08 16:13:24
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-08 17:18:32
 * @FilePath: /vue3-composition-epidemic-map/src/components/MyProfile.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div class="container" v-if="currentUser">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Profile</h5>
        <p class="card-text">
          <strong>{{ currentUser.username }}</strong>
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <strong>Token:</strong>
          {{ currentUser.token.substring(0, 20) }} ... {{ currentUser.token.substr(currentUser.token.length - 20) }}
        </li>
        <li class="list-group-item"><strong>Id:</strong> {{ currentUser.id }}</li>
        <li class="list-group-item"><strong>Email:</strong> {{ currentUser.email }}</li>
        <li class="list-group-item">
          <strong>Authorities:</strong>
          <ul class="list-group">
            <li class="list-group-item" v-for="role in currentUser.roles" :key="role">{{ role }}</li>
          </ul>
        </li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

const store = useStore();
const currentUser = computed(() => {
  return store.state.auth.user;
});
</script>
