<template>
  <div v-show="configReplyModal" @click.self="hideConfigReplyHandler" class="config-comment-bg">
      <div class="config-comment-container">
          <loader-small v-if="updateReplyLoading" />
          <loader-small v-if="deleteReplyLoading" />
          <error-msg v-if="updateReplyError" :msg="updateReplyError" />
          <error-msg v-if="deleteReplyError" :msg="deleteReplyError" />
          <div class="delete">
              <h4>Delete Reply</h4>
              <span>>>>>>></span>
              <button @click="showWarning = true" class="del-btn"><i class="fas fa-trash-alt"></i></button>
          </div>
          <hr>
          <div class="edit">
              <form @submit.prevent="submitHandler">
                  <textarea rows="5" placeholder="Update Comment" :value="updReply" @input="e => updReply = e.target.value"></textarea>
                  <button class="upd-btn">Update</button>
              </form>
          </div>

          <div v-show="showWarning" @click.self="showWarning = false" class="warning-bg">
              <div class="warning-container">
                  <p>Are You Sure?</p>
                  <div class="btns">
                      <button @click="deleteReplyHandler" class="yes">Yes</button>
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
import {useUpdateReply} from '../composables/comments/update'
import {useFetchAllReplies} from '../composables/comments/fetch'
import {useDeleteReply} from '../composables/comments/delete'
import LoaderSmall from './LoaderSmall.vue'
import ErrorMsg from './ErrorMsg.vue'

export default defineComponent({
    name: 'ConfigComment',
    props: ['reply', 'commentId'],
    components: {LoaderSmall, ErrorMsg},
    setup(props) {
        const updReply = ref('')
        const showWarning = ref(false)

        const {configReplyModal, toggleConfigReplyModal} = useStates()
        const {
            loading: updateReplyLoading,
            success: updateReplySuccess,
            error: updateReplyError,
            updateReply
        } = useUpdateReply()
        const {
            loading: deleteReplyLoading,
            success: deleteReplySuccess,
            error: deleteReplyError,
            deleteReply
        } = useDeleteReply()
        const {fetchAllReplies} = useFetchAllReplies()
        

        watchEffect(() => {
            updReply.value = props.reply.text
        })

        const hideConfigReplyHandler = () => toggleConfigReplyModal(false)

        const submitHandler = async () => {
            await updateReply(props.reply.id, updReply.value)

            if (updateReplySuccess.value) {
                fetchAllReplies(props.commentId)
                hideConfigReplyHandler()
            }
        }

        const deleteReplyHandler = async () => {
            await deleteReply(props.reply.id)

            if (deleteReplySuccess.value) {
                fetchAllReplies(props.commentId)
                showWarning.value = false
                hideConfigReplyHandler()
            }
        }

        return {
            configReplyModal,
            hideConfigReplyHandler,
            submitHandler,
            updReply,
            updateReplyLoading,
            deleteReplyLoading,
            updateReplyError,
            deleteReplyError,
            deleteReplyHandler,
            showWarning
        }
    }
})
</script>