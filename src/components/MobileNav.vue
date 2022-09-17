<template>
    <nav class="mobile-nav">
        <div @click="showNavigation" class="menu-icon">
            <i class="fas fa-bars"></i>
        </div>

        <div v-show="mobileNavigation" @click.self="hideNavigation" class="nav-container-bg">
            <transition name="mobNav">
                <div v-show="mobileNavigation" class="nav-container">
                    <router-link title="Main Page" to="/">
                        <img src="@/assets/images/fruit-blog-logo.png" alt="Fruit Blog Logo" class="mobile-nav-logo">
                    </router-link>
                    <div class="links">
                        <router-link class="link" :to="{ name: 'Posts' }">Posts</router-link>
                        <router-link class="link" :to="{name: 'About'}">About Us</router-link>
                        <router-link v-if="userInfo?.username" class="link" :to="{name: 'Profile'}">Profile</router-link>
                    </div>
                    <div class="auth">
                        <span v-if="userInfo?.username" @click="logoutHandler">Sign Out</span>
                        <router-link v-else :to="{name: 'SignIn'}">
                            <span>Sign In</span>
                        </router-link>
                    </div>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import useStates from '../composables/states'
import useLogout from "../composables/auth/logout";
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'MobileNav',
    props: ['userInfo'],
    setup() {
        const router = useRouter()

        const {mobileNavigation, toggleMobileNavigation} = useStates()

        const showNavigation = () => toggleMobileNavigation(true)
        const hideNavigation = () => toggleMobileNavigation(false)

      const { logout, success } = useLogout();

      const logoutHandler = async () => {
        await logout();

        if (success.value) {
          await router.push({ name: "Home" });
          window.location.reload();
        }
      };

        return {
            mobileNavigation,
            showNavigation,
            hideNavigation,
            logoutHandler
        }
    }
})
</script>

<style lang="scss" scoped>
    .mobNav-enter-from,
    .mobNav-leave-to {
        opacity: 0;
        transform: translateX(250px);
    }
    .mobNav-enter-to,
    .mobNav-leave-from {
        opacity: 1;
        transform: translateX(0);
    }
    .mobNav-enter-active,
    .mobNav-enter-active {
        transition: all 0.5s ease-in-out;
    }
</style>