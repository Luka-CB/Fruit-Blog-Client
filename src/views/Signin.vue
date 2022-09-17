<template>
  <div class="auth_form">
    <div class="title">
      <h1>Sign In</h1>
      <loader-big v-if="loading" />
      <error-msg v-if="error" :msg="error" />
    </div>
    <form @submit.prevent="loginHandler">
      <div class="input_box">
        <label>Username</label>
        <input
          type="text"
          placeholder="admin"
          v-model="state.username"
          required
        />
      </div>

      <div class="input_box">
        <label>Password</label>
        <input
          type="password"
          placeholder="123456"
          v-model="state.password"
          required
        />
      </div>

      <button class="auth-btn" type="submit">Sign In</button>
    </form>

    <div class="info">
      <h4>Don't Have an Account?</h4>
      <router-link class="link" to="/signup"><span>Sign Up</span></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import useLogin from '../composables/auth/login'
import LoaderBig from '../components/LoaderBig.vue'
import ErrorMsg from '../components/ErrorMsg.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
  name: 'Signin',
  components: {ErrorMsg, LoaderBig},
  setup() {
    const { success, error, loading, login } = useLogin()

    const state = reactive({
      username: '',
      password: '',
    })

    useHead({title: 'Sign In'})

    const loginHandler = async () => {
      const userData = {
        username: state.username.toLowerCase(),
        password: state.password,
      }

      await login(userData)

      if (success.value) {
        window.location.reload()
      }
    }

    return { loginHandler, state, loading, error }
  },
})
</script>
