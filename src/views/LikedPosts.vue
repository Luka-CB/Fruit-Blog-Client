<template>
  <div class="liked-posts-container">
    <div class="liked-posts__header">
      <i @click="goBack" class="far fa-arrow-alt-circle-left back"></i>
      <div class="count">
        <span>{{ likedPostCount }} Liked Posts</span>
      </div>
    </div>
    <div class="liked-posts__wrapper">
      <loading-big v-if="fetchLoading" />
      <error-msg v-if="fetchError" :msg="fetchError" />

      <div
        v-for="(post, i) in likedPosts"
        :key="post._id"
        class="liked-posts__post"
      >
        <div class="post-header">
          <div class="title">
            <h3>{{ post.title }}</h3>
          </div>
          <div @click="unlikePostHandler(post._id, i)" class="unlike">
            <loading-tiny v-if="unlikeLoading && postIndex === i" />
            <span v-else>Unlike Post</span>
          </div>
        </div>
        <hr />
        <div class="post-body">
          <p class="text" v-html="`${post.body}....`"></p>
          <div class="feedbacks">
            <div class="likes">
              <i class="fas fa-thumbs-up like-fill"></i>
              <span class="num">{{ post.likes && post.likes.length }}</span>
            </div>
            <div class="comments">
              <i class="far fa-comments"></i>
              <span class="num">{{
                post.comments && post.comments.length
              }}</span>
            </div>
          </div>
          <div class="post-footer">
            <span class="date">Posted {{ post.createdAt }} ago</span>
            <router-link :to="{ name: 'Post', params: { id: post._id } }">
              <div class="more-btn">
                <span class="btn-text">Read More</span>
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFetchLikedPosts } from "../composables/posts/fetch";
import { useUnlikePost } from "../composables/likes/delete";
import LoadingBig from "../components/LoaderBig.vue";
import LoadingTiny from "../components/LoaderTiny.vue";
import ErrorMsg from "../components/ErrorMsg.vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "LikedPosts",
  components: { LoadingBig, LoadingTiny, ErrorMsg },
  setup() {
    const router = useRouter();

    const postIndex = ref<number | null>(null);

    const {
      loading: fetchLoading,
      error: fetchError,
      likedPosts,
      likedPostCount,
      fetchLikedPosts,
    } = useFetchLikedPosts();

    const {
      loading: unlikeLoading,
      success: unlikeSuccess,
      unlikePost,
    } = useUnlikePost();

    useHead({
      title: computed(() => `Liked Posts ( ${likedPostCount.value} )`),
    });

    onMounted(() => fetchLikedPosts());

    const goBack = () => router.go(-1);

    const unlikePostHandler = async (postId: string, i: number) => {
      postIndex.value = i;
      await unlikePost(postId);

      if (unlikeSuccess.value) {
        fetchLikedPosts();
      }
    };

    return {
      likedPosts,
      likedPostCount,
      fetchLoading,
      fetchError,
      goBack,
      unlikePostHandler,
      unlikeLoading,
      postIndex,
    };
  },
});
</script>
