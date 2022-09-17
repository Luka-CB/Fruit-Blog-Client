<template>
  <main class="profile_container">
    <header>
      <div class="info">
        <h1>{{ user.username }}</h1>
        <h5>( {{ user.email }} )</h5>
      </div>
      <div class="date">
        <span
          >Registered at <i>{{ user.createdAt }}</i></span
        >
      </div>
    </header>
    <section class="body">
      <div class="account">
        <loader-small v-if="updLoading" />
        <error-msg v-if="updError" :msg="updError" />
        <loader-small v-if="fetchLoading" />
        <error-msg v-if="fetchError" :msg="fetchError" />

        <div class="update">
          <form @submit.prevent="submitHandler" autocomplete="off">
            <div class="input-box">
              <label>UserName</label>
              <input
                type="text"
                placeholder="Update Username"
                v-model="username"
              />
            </div>
            <div class="input-box">
              <label>Email</label>
              <input type="email" placeholder="Update Email" v-model="email" />
            </div>
            <div class="input-box">
              <label>Password</label>
              <input
                type="password"
                placeholder="Update Password"
                v-model="password"
              />
            </div>

            <button class="upd-btn" type="submit">Update Account</button>
          </form>
        </div>
        <div class="divider"></div>
        <div class="delete">
          <h3>Delete Account</h3>
          <span>>>>>>></span>
          <button @click="showWarning = true" class="del-btn">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>

        <div
          v-show="showWarning"
          @click.self="showWarning = false"
          class="warning-bg"
        >
          <div class="warning-container">
            <loader-small v-if="delLoading" />
            <error-msg v-if="delError" :msg="delError" />

            <p>You are Deleting Your <span>Account</span>. Are You Sure?</p>
            <div class="btns">
              <button @click="deleteAccountHandler" class="yes">Yes</button>
              <button @click="showWarning = false" class="no">No</button>
            </div>
          </div>
        </div>
      </div>
      <div class="user-activities">
        <div v-if="userInfo && userInfo.isAdmin" class="admin">
          <router-link :to="{ name: 'UnpublishedPosts' }">
            <div class="posts">
              <div class="icon">
                <i class="fab fa-firstdraft"></i>
              </div>
              <h3>Unpublished Posts</h3>
            </div>
          </router-link>
          <router-link :to="{ name: 'RegisteredUsers' }">
            <div class="users">
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Registered Users</h3>
            </div>
          </router-link>
        </div>
        <div v-else class="liked-posts">
          <h2>Posts You've Liked</h2>
          <div class="posts">
            <loader-small v-if="fetchPostsLoading" />
            <error-msg v-if="fetchPostsError" :msg="fetchPostsError" />
            <p v-if="displayLikedPosts.length === 0" class="no-liked-posts">
              No Liked Posts!
            </p>

            <div v-for="post in displayLikedPosts" :key="post._id" class="post">
              <h4>{{ post.title }}</h4>
              <p>
                <span
                  v-html="`${post.body && post.body.substring(0, 250)}....`"
                ></span>
              </p>
              <div class="bottom">
                <span>Liked {{ post.likedAt }} Ago</span>
                <router-link :to="{ name: 'Post', params: { id: post._id } }">
                  <button class="read-post">Read Post</button>
                </router-link>
              </div>
            </div>
          </div>
          <router-link :to="{ name: 'LikedPosts' }">
            <p v-if="likedPostCount > 0" class="see-all">
              See All {{ likedPostCount }} Liked Posts
            </p>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useFetchUser, userFromLocalStorage } from "../composables/auth/user";
import { useFetchLikedPosts } from "../composables/posts/fetch";
import { useUpdateAccount } from "../composables/auth/update";
import { useDeleteAccount } from "../composables/auth/delete";
import LoaderSmall from "../components/LoaderSmall.vue";
import ErrorMsg from "../components/ErrorMsg.vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "Profile",
  components: { LoaderSmall, ErrorMsg },
  setup() {
    const router = useRouter();

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const showWarning = ref(false);

    const {
      loading: fetchLoading,
      error: fetchError,
      user,
      fetchUser,
    } = useFetchUser();

    const { userInfo } = userFromLocalStorage();

    const {
      loading: updLoading,
      success: updSuccess,
      error: updError,
      updateAccount,
    } = useUpdateAccount();

    const {
      loading: delLoading,
      success: delSuccess,
      error: delError,
      deleteAccount,
    } = useDeleteAccount();

    const {
      loading: fetchPostsLoading,
      error: fetchPostsError,
      displayLikedPosts,
      likedPostCount,
      fetchLikedPosts,
    } = useFetchLikedPosts();

    useHead({
      title: computed(() => `${user.value.username}'s Profile`),
    });

    watchEffect(() => {
      if (user.value) {
        username.value = user.value.username;
        email.value = user.value.email;
      }
    });

    fetchUser();
    fetchLikedPosts();

    console.log(username.value);

    const submitHandler = async () => {
      await updateAccount({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      if (updSuccess.value) {
        fetchUser();
        password.value = "";
      }
    };

    const deleteAccountHandler = async () => {
      await deleteAccount();

      if (delSuccess.value) {
        await router.push({ name: "Home" });
        window.location.reload();
      }
    };

    return {
      fetchLoading,
      fetchError,
      user,
      userInfo,
      username,
      email,
      password,
      submitHandler,
      updLoading,
      updError,
      showWarning,
      deleteAccountHandler,
      delLoading,
      delError,
      displayLikedPosts,
      fetchPostsLoading,
      fetchPostsError,
      likedPostCount,
    };
  },
});
</script>
