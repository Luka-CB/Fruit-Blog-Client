<template>
  <div class="create-post-container">
    <loader-big v-if="loading" />
    <error-msg v-if="error" :msg="error" />
    <div class="delete-box">
        <h3>Delete <strong>{{post.title}}</strong></h3>
        <span>>>>>>></span>
        <div @click="showWarning = true" class="del-btn"><i class="fas fa-trash-alt"></i></div>
    </div>
    <hr>
    <div class="input-box">
      <input type="text" placeholder="Edit Post Title" v-model="title" required>
      <div class="editor">
          <editor
            v-model="postBody"
            api-key="r3iehzzccfoxhrh9v4l8cldtzqyrap92rdgj97vgmte2pxm8"
            :init="{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect fontselect | bold italic backcolor image link unlink | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
            }"
          />
      </div>
      <p>{{msg}}</p>
      <button @click="updatePostHandler" class="create-btn">Update Post</button>
    </div>

    <div v-if="showWarning" @click.self="showWarning = false" class="warning-bg">
        <div class="warning-container">
            <loader-small v-if="delLoading" />
            <error-msg v-if="delError" :msg="delError" />
            <p>You're about to delete <strong>{{post.title}}.</strong> Are you sure?</p>
            <div class="btns">
                <button @click="deletePostHandler" class="yes">Yes</button>
                <button @click="showWarning = false" class="no">No</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { useRoute, useRouter } from 'vue-router'
import {useFetchOnePost} from '../composables/posts/fetch'
import {useUpdatePost} from '../composables/posts/update'
import useDeletePost from '../composables/posts/delete'
import ErrorMsg from '../components/ErrorMsg.vue'
import LoaderBig from '../components/LoaderBig.vue'
import LoaderSmall from '../components/LoaderSmall.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
    name: 'CreatePost',
    components: {Editor, ErrorMsg, LoaderBig, LoaderSmall},
    setup() {
      const router = useRouter()
      const route = useRoute()

      const title = ref('')
      const postBody = ref('')
      const msg = ref('')
      const showWarning = ref(false)

      const id = computed(() => route.params.id)

      const {post, fetchOnePost} = useFetchOnePost()
      const {
          loading: updateLoading,
          success: updateSuccess,
          error: updateError,
          updatePost
      } = useUpdatePost()
      const {
        loading: delLoading,
        success: delSuccess,
        error: delError,
        deletePost
      } = useDeletePost()

      useHead({
        title: computed(() => `Edit Post - ${post.value.title}`)
      })

      onMounted( async() => {
          await fetchOnePost(id.value)
          postBody.value = post.value.body
          title.value = post.value.title
      })

      const updatePostHandler = async () => {
        if (postBody.value.length < 120) {
          msg.value = 'Text is Too Short!'
          return
        }

        await updatePost(id.value, postBody.value, title.value)

        if (updateSuccess.value) {
          router.go(-1)
        }
      }

      const deletePostHandler = async () => {
        await deletePost(id.value)

        if (delSuccess.value) {
          router.push({name: 'UnpublishedPosts'})
        } 
      }

      return {
        title,
        postBody,
        updatePostHandler,
        msg,
        updateLoading,
        updateError,
        delLoading,
        delError,
        post,
        showWarning,
        deletePostHandler
      }
    }
})
</script>