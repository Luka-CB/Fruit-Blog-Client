<template>
  <div class="unpublished-posts">
    <div class="col-1">
      <loader-small v-if="fetchLoading" />
      <error-msg v-if="fetchError" :msg="fetchError" />

      <div v-for="(post, i) in posts" :key="post._id" class="post">
        <div class="post-header">
          <h2>{{ post.title }}</h2>
          <router-link :to="{ name: 'EditPost', params: { id: post._id } }">
            <div class="edit-icon">
              <i title="Edit Post" class="far fa-edit"></i>
            </div>
          </router-link>
        </div>
        <div class="post-body">
          <p v-html="`${post.body && post.body.substring(0, 750)}....`"></p>
        </div>
        <div class="post-footer">
          <div class="date">
            <span>Created at {{ post.createdAt }}</span>
          </div>
          <div class="btns">
            <router-link
              :to="{ name: 'AdminPostPreview', params: { id: post._id } }"
            >
              <button class="preview-btn">Preview</button>
            </router-link>
            <button
              @click="updateStatusHandler(post._id, i)"
              class="publish-btn"
            >
              {{ postIndex === i ? "Publishing..." : "Publish" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2">
      <router-link :to="{name: 'CreatePost'}">
        <button class="cr-btn">Create New Post</button>
      </router-link>
      <span class="count">Posts: {{ count }}</span>
    </div>

    <success-msg msg="Post Published Successfully" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useFetchDraftPosts } from "../composables/posts/fetch";
import { useUpdatePostStatus } from "../composables/posts/update";
import useStates from '../composables/states'
import LoaderSmall from "../components/LoaderSmall.vue";
import ErrorMsg from "../components/ErrorMsg.vue";
import SuccessMsg from '../components/SuccessMsg.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
  name: "UnpublishedPosts",
  components: { LoaderSmall, ErrorMsg, SuccessMsg },
  setup() {
    const postIndex = ref<number | null>(null);

    const {
      loading: fetchLoading,
      error: fetchError,
      posts,
      count,
      fetchDraftPosts,
    } = useFetchDraftPosts();

    useHead({
      title: computed(() => `Unpublished Posts ( ${count.value} )`)
    })

    const { success: updStatusSuccess, updateStatus } = useUpdatePostStatus();
    const {toggleSuccessMsg} = useStates()

    onMounted(() => fetchDraftPosts());

    const updateStatusHandler = async (id: string, i: number) => {
      postIndex.value = i;
      await updateStatus(id);

      if (updStatusSuccess.value) {
        await fetchDraftPosts();
        postIndex.value = null;
        toggleSuccessMsg(true)
        setTimeout(() => {
            toggleSuccessMsg(false)
        }, 4000)
      }
    };

    return {
      fetchLoading,
      fetchError,
      posts,
      count,
      updateStatusHandler,
      postIndex,
    };
  },
});
</script>
