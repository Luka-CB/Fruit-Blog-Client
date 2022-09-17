<template>
  <div class="auth_form">
    <div class="title">
      <h1>Sign Up</h1>
      <loader-big v-if="loading" />
      <error-msg v-if="error" :msg="error" />
    </div>
    <form @submit.prevent="registerHandler">
      <div class="input_box">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          v-model="state.username"
          required
        />
      </div>

      <div class="input_box">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Existing Email"
          v-model="state.email"
          required
        />
      </div>

      <div class="input_box">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter New Password"
          v-model="state.password"
          required
        />
      </div>

      <div class="input_box">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Retype Password"
          v-model="state.confirmPassword"
          required
        />
        <p v-show="msg">{{msg}}</p>
      </div>

      <button class="auth-btn" type="submit">Sign Up</button>
    </form>

    <div class="info">
      <h4>Already Have an Account?</h4>
      <router-link class="link" to="/signin"><span>Sign In</span></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref} from 'vue'
import useRegister from '../composables/auth/register'
import LoaderBig from '../components/LoaderBig.vue'
import ErrorMsg from '../components/ErrorMsg.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
  name: 'Signup',
  components: {ErrorMsg, LoaderBig},
  setup() {

    const msg = ref('')

    const {
      success,
      error,
      loading,
      register,
    } = useRegister()


    const state = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    useHead({title: 'Sign Up'})

    const registerHandler = async () => {
      const userData = {
        username: state.username.toLowerCase(),
        email: state.email,
        password: state.password,
      }

      if (state.password !== state.confirmPassword) {
        msg.value = 'Passwords do not Match!'
        return
      }
      
      await register(userData)

      if (success.value) {
        window.location.reload()
      }
    }

    return { registerHandler, state, success, error, loading, msg }
  },
})
</script>
