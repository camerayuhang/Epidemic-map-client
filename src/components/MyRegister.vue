<!--
 * @Author: camerayuhang
 * @Date: 2022-12-08 17:19:21
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-08 18:36:34
 * @FilePath: /vue3-composition-epidemic-map/src/components/MyRegister.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <el-form :model="form" label-width="120px" v-if="!successful" v-loading="loading">
    <el-form-item label="Username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegister">Sign Up</el-button>
      <el-button>Reset</el-button>
    </el-form-item>
  </el-form>

  <div>
    <el-result v-if="successful" icon="success" title="Success" :sub-title="message">
      <template #extra>
        <el-button @click="handleBack" type="primary">Back To Login</el-button>
      </template>
    </el-result>

    <el-alert v-if="!successful && message" :title="message" type="error" />
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const form = reactive({
  username: '',
  password: '',
  email: ''
});

const message = ref('');
const successful = ref(false);
const loading = ref(false);

const store = useStore();
const router = useRouter();

const handleRegister = () => {
  message.value = '';
  successful.value = false;
  loading.value = true;

  store.dispatch('auth/register', form).then(
    data => {
      message.value = data.message;
      successful.value = true;
      loading.value = false;
    },
    error => {
      message.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      successful.value = false;
      loading.value = false;
    }
  );
};
const handleBack = () => {
  router.push({ name: 'my-login' });
};
</script>
