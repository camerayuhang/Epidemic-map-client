<!--
 * @Author: camerayuhang
 * @Date: 2022-12-08 17:19:21
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 21:25:18
 * @FilePath: /vue3-composition-epidemic-map/src/components/MyRegister.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <!-- <el-form :model="form" label-width="120px" v-if="!successful" v-loading="loading">
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
  </el-form> -->
  <div class="d-flex align-items-center h-100 login-container">
    <main class="form-signin w-100 m-auto" v-if="!successful" v-loading="loading">
      <form @submit.prevent="handleRegister">
        <a href="https://openlayers.org/"><img class="mb-4" src="@/assets/logo-dark.svg" alt="" width="77" height="62" /></a>
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
        <div class="form-floating">
          <input v-model="form.username" type="text" class="form-control" id="floatingInput" placeholder="Username" />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input v-model="form.email" type="email" class="form-control" id="floatingEmail" placeholder="Email" />
          <label for="floatingEmail">Email</label>
        </div>
        <div class="checkbox mb-3">
          <label> <input type="checkbox" value="remember-me" /> Remember me </label>
        </div>
        <div class="d-flex"><button class="w-100 btn btn-lg btn-primary me-2" type="submit">Sign up</button> <button class="w-100 btn btn-lg btn-secondary" type="reset">Reset</button></div>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </main>
    <div class="w-100 h-100 d-flex align-items-center" v-if="successful">
      <el-result class="w-100" icon="success" title="Success" :sub-title="message">
        <template #extra>
          <el-button @click="handleBack" type="primary">Back To Login</el-button>
        </template>
      </el-result>
      <el-alert v-if="!successful && message" :title="message" type="error" />
    </div>
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

<style scoped>
img {
  background-color: black;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  padding: 3px;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='text'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: -1px;
  border-radius: 0;
}

.form-signin input[type='email'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
