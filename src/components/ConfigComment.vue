<template>
  <div v-show="configCommentModal" @click.self="hideConfigCommentHandler" class="config-comment-bg">
      <div class="config-comment-container">
          <loader-small v-if="updateCommentLoading" />
          <loader-small v-if="deleteCommentLoading" />
          <error-msg v-if="updateCommentError" :msg="updateCommentError" />
          <error-msg v-if="deleteCommentError" :msg="deleteCommentError" />
          <div class="delete">
              <h4>Delete Comment</h4>
              <span>>>>>>></span>
              <button @click="showWarning = true" class="del-btn"><i class="fas fa-trash-alt"></i></button>
          </div>
          <hr>
          <div class="edit">
              <form @submit.prevent="submitHandler">
                  <textarea rows="5" placeholder="Update Comment" :value="updComment" @input="e => updComment = e.target.value"></textarea>
                  <button class="upd-btn">Update</button>
              </form>
          </div>

          <div v-show="showWarning" @click.self="showWarning = false" class="warning-bg">
              <div class="warning-container">
                  <p>Are You Sure?</p>
                  <div class="btns">
                      <button @click="deleteCommentHandler" class="yes">Yes</button>
                      <button @click="showWarning = false" class="no">No</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {defineComponent, ref, watchEffect} from 'vue'
import useStates from '../composables/states'
import {useUpdateComment} from '../composables/comments/update'
import {useFetchAllComments} from '../composables/comments/fetch'
import {useDeleteComment} from '../composables/comments/delete'
import LoaderSmall from './LoaderSmall.vue'
import ErrorMsg from './ErrorMsg.vue'

export default defineComponent({
    name: 'ConfigComment',
    props: ['comment', 'postId'],
    components: {LoaderSmall, ErrorMsg},
    setup(props) {
        const updComment = ref('')
        const showWarning = ref(false)

        const {configCommentModal, toggleConfigCommnetModal} = useStates()
        const {
            loading: updateCommentLoading,
            success: updateCommentSuccess,
            error: updateCommentError,
            updateComment
        } = useUpdateComment()
        const {
            loading: deleteCommentLoading,
            success: deleteCommentSuccess,
            error: deleteCommentError,
            deleteComment
        } = useDeleteComment()
        
        const {fetchAll} = useFetchAllComments()

        watchEffect(() => {
            updComment.value = props.comment.text
        })

        const hideConfigCommentHandler = () => toggleConfigCommnetModal(false)

        const submitHandler = async () => {
            await updateComment(props.comment.id, updComment.value)

            if (updateCommentSuccess.value) {
                fetchAll(props.postId)
                hideConfigCommentHandler()
            }
        }

        const deleteCommentHandler = async () => {
            await deleteComment(props.comment.id)

            if (deleteCommentSuccess.value) {
                fetchAll(props.postId)
                showWarning.value = false
                hideConfigCommentHandler()
            }
        }

        return {
            configCommentModal,
            hideConfigCommentHandler,
            submitHandler,
            updComment,
            updateCommentLoading,
            deleteCommentLoading,
            updateCommentError,
            deleteCommentError,
            deleteCommentHandler,
            showWarning
        }
    }
})
</script>