<template>
  <div class="container">
    <div class="post">
      <loader-big v-if="loading" />
      <error-msg v-if="error" :msg="error" />
      <div class="post_header">
        <span>{{ latestPost.createdAt }}</span>
      </div>
      <hr />
      <div class="post_body">
        <h1>{{ latestPost.title }}</h1>
        <p v-html="latestPost.body"></p>
      </div>
      <div class="post_footer">
        <div class="likes">
          <loading-tiny v-if="createLikeLoading || delLikeLoading" />
          <div v-else class="icons">
            <i v-if="isLiked" @click="deleteLikeHandler" class="fas fa-thumbs-up like-fill" title="Unlike This Post"></i>
            <i v-else @click="createLikeHandler" class="far fa-thumbs-up like-outline" title="Like This Post"></i>
          </div>
          <span class="num">{{latestPost.likes && latestPost.likes.length}}</span>
        </div>
        <div @click="showCommentsHandler" class="comments">
          <i class="far fa-comments"></i>
          <span v-if="latestPost.comments" class="num">{{
            latestPost.comments.length
          }}</span>
        </div>

        <div v-show="showWarningMsg" class="warning-msg">
          <p>Please sign in to like!</p>
        </div>
      </div>
    </div>

    <comments :postId="latestPost._id" :postTitle="latestPost.title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useFetchLatestPost } from "../composables/posts/fetch";
import {useFetchUserLike} from '../composables/likes/fetch'
import {userFromLocalStorage} from '../composables/auth/user'
import {useDeleteLike} from '../composables/likes/delete'
import useCreateLike from '../composables/likes/create'
import useStates from "../composables/states";
import LoaderBig from "../components/LoaderBig.vue";
import LoadingTiny from "../components/LoaderTiny.vue"
import ErrorMsg from "../components/ErrorMsg.vue";
import Comments from "../components/Comments.vue";
import {useHead} from '@vueuse/head'

export default defineComponent({
  name: "Home",
  components: { LoaderBig, ErrorMsg, Comments, LoadingTiny },
  setup() {
    const showWarningMsg = ref(false)

    const {
      loading,
      error,
      latestPost,
      fetchLatestPost,
    } = useFetchLatestPost();

    const {
      success: createLikeSuccess, 
      loading: createLikeLoading, 
      createLike
    } = useCreateLike()
    const {isLiked, like, fetchUserLike} = useFetchUserLike()
    const {
      loading: delLikeLoading, 
      success: delLikeSuccess, 
      deleteLike
    } = useDeleteLike()

    const { toggleCommentModal } = useStates();
    const {userInfo} = userFromLocalStorage()
      
    useHead({
      title: 'Welcome | Fruit-Blog'
    })

    onMounted(() => fetchLatestPost())
    watchEffect(() => {
      if (latestPost.value) {
        fetchUserLike(latestPost.value._id)
      }
    })

    const showCommentsHandler = () => toggleCommentModal(true);

    const createLikeHandler = async () => {
      if (!userInfo.value.id) {
        showWarningMsg.value = true

        if (showWarningMsg.value) {
          setTimeout(() => {
            showWarningMsg.value = false
          }, 1500)
        }

        return
      }

      await createLike(latestPost.value._id)

      if (createLikeSuccess.value) {
        fetchLatestPost()
        fetchUserLike(latestPost.value._id)
      }
    }

    const deleteLikeHandler = async () => {
      await deleteLike(like.value.id)

      if (delLikeSuccess.value) {
        fetchUserLike(latestPost.value._id)
        fetchLatestPost()
      }
    }

    return {
      latestPost,
      loading,
      error,
      showCommentsHandler,
      isLiked,
      createLikeHandler,
      createLikeLoading,
      deleteLikeHandler,
      delLikeLoading,
      showWarningMsg
    };
  },
});
</script>
