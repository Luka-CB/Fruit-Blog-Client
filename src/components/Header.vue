<template>
  <div class="header">
    <div class="logo">
      <img v-if="logo === 'main'" src="@/assets/images/fruit-blog-logo.png" alt="Main Logo" class="logo-main">
      <router-link v-else title="Main Page" class="link" to="/">
        <img src="@/assets/images/fruit-blog-logo-alt.png" alt="Alt Logo" class="logo-alt">
      </router-link>
    </div>

    <main-nav :userInfo="userInfo" />
    <mobile-nav :userInfo="userInfo" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import MainNav from '../components/MainNav.vue'
import MobileNav from '../components/MobileNav.vue'

export default defineComponent({
  name: "Header",
  props: ["userInfo"],
  components: {MainNav, MobileNav},
  setup() {
    const route = useRoute()

    const logo = computed(() => {
      if (route.path === '/') {
        return 'main'
      } else {
        return 'alt'
      }
    })


    return {
      logo
    };
  },
});
</script>
