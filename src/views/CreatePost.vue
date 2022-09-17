<template>
  <div class="create-post-container">
    <loader-big v-if="loading" />
    <error-msg v-if="error" :msg="error" />
    <div class="input-box">
      <input type="text" placeholder="Enter Post Title" v-model="title" required>
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
      <button @click="createPostHandler" class="create-btn">Create Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Editor from '@tinymce/tinymce-vue'
import useCreatePost from '../composables/posts/create'
import { useRouter } from 'vue-router'
import ErrorMsg from '../components/ErrorMsg.vue' 
import LoaderBig from '../components/LoaderBig.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
    name: 'CreatePost',
    components: {Editor, ErrorMsg, LoaderBig},
    setup() {
      const router = useRouter()

      const title = ref('')
      const postBody = ref('')
      const msg = ref('')

      useHead({
        title: 'Create Post'
      })

      const {loading, success, error, createPost} = useCreatePost()

      const createPostHandler = async () => {
        if (postBody.value.length < 120) {
          msg.value = 'Text is Too Short!'
          return
        }

        await createPost({
          title: title.value,
          body: postBody.value
        })

        if (success.value) {
          title.value = ''
          postBody.value = ''
          router.push({name: 'UnpublishedPosts'})
        }
      }

      return {
        title,
        postBody,
        createPostHandler,
        msg,
        loading,
        error
      }
    }
})
</script>