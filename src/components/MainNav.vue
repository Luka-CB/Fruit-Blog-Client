<template>
    <nav class="main-nav">
      <div class="page_links">
        <router-link class="link" :to="{ name: 'Posts' }">Posts</router-link>
        <router-link class="link" to="/about">About Us</router-link>
      </div>
      <div class="auth_link">
        <div v-if="userInfo.username" @click="show = !show" class="auth_btn">
          <span v-if="userInfo && userInfo.isAdmin"><i class="fas fa-user-tie"></i></span>
          <span v-else><i class="far fa-user"></i></span>
        </div>

        <div v-else class="auth_btn">
          <router-link class="link" to="/signin">Sign In</router-link>
        </div>

        <div v-show="show" @mouseleave="show = false" class="dropdown">
          <div class="links">
            <router-link class="link" to="/profile">Profile</router-link>
          </div>
          <hr />
          <p @click="logoutHandler">Logout</p>
        </div>
      </div>
    </nav> 
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { useRouter } from 'vue-router';
import useLogout from "../composables/auth/logout";

export default defineComponent({
    name: 'MainNav',
    props: ['userInfo'],
    setup() {
      const router = useRouter()

      const show = ref(false);

      const { logout, success } = useLogout();

      const logoutHandler = async () => {
        await logout();

        if (success.value) {
          await router.push({ name: "Home" });
          window.location.reload();
        }
      };

      return {
          logoutHandler,
          show
      }
    }
})
</script>