<!--
 * @Author: camerayuhang
 * @Date: 2022-12-07 15:54:28
 * @LastEditors: camerayuhang
 * @LastEditTime: 2022-12-24 21:24:00
 * @FilePath: /vue3-composition-epidemic-map/src/components/MyLogin.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by wangyuhang, All Rights Reserved. 
-->
<template>
  <!-- <div>
    <b-form @submit="handelLogin">
      <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div> -->
  <div class="d-flex align-items-center h-100 login-container" v-loading="loading">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="handelLogin">
        <a href="https://openlayers.org/"><img class="mb-4" src="@/assets/logo-dark.svg" alt="" width="77" height="62" /></a>

        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input v-model="form.username" type="text" class="form-control" id="floatingInput" placeholder="Username" />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input v-model="form.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label> <input type="checkbox" value="remember-me" /> Remember me </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
      <el-alert v-if="!successful && message" :title="message" type="error" />
    </main>
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

const message = ref('');
const successful = ref(false);
const loading = ref(false);

const store = useStore();
const router = useRouter();

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});

if (loggedIn.value) {
  router.push({
    name: 'my-profile'
  });
  ElMessage({
    showClose: true,
    message: 'Automatically login on the site.',
    type: 'success'
  });
}
const handelLogin = event => {
  message.value = '';
  successful.value = false;
  loading.value = false;

  store.dispatch('auth/login', form).then(
    data => {
      message.value = data.message;
      successful.value = true;
      loading.value = false;
      router.push({ name: 'my-profile' });
    },
    error => {
      message.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      successful.value = false;
      loading.value = false;
    }
  );
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
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
