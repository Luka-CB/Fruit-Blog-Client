<template>
  <Header :userInfo="userInfo" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent} from '@vue/runtime-core'
import Header from './components/Header.vue'
import {userFromLocalStorage} from './composables/auth/user'

export default defineComponent({
  name: 'App',
  components: { Header },
  setup() {
    const {userInfo} = userFromLocalStorage()

    return {userInfo}
  },
})
</script>
