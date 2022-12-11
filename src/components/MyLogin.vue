<!--
 * @Author: camerayuhang
 * @Date: 2022-12-07 15:54:28
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-08 20:52:37
 * @FilePath: /vue3-composition-epidemic-map/src/components/MyLogin.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <div>
    <b-form @submit="handelLogin">
      <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script setup>
import { ref, computed, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const form = reactive({
  username: '',
  password: ''
});

const store = useStore();
const router = useRouter();

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});

if (loggedIn.value) {
  router.push({
    name: 'my-profile'
  });
}
const handelLogin = event => {
  store.dispatch('auth/login', form).then(() => {
    router.push({ name: 'my-profile' });
  });
};
</script>
