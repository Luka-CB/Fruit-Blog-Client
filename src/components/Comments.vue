<template>
  <div v-show="commentModal" @click.self="hideCommentsHandler" class="comments-bg">
      <div class="comments-container">
          <i @click="hideCommentsHandler" class="far fa-window-close close-btn"></i>
          <div class="col-1">
              <loader-small v-if="createLoading" />
              <error-msg v-if="createError" :msg="createError" />
              <form @submit.prevent="submitHandler">
                  <textarea rows="10" :placeholder="!userInfo.id ? 'Please Sign In to Comment!' : 'Leave a Comment'" v-model="comment" required :disabled="!userInfo.id"></textarea>
                  <button :class="!userInfo.id ? 'disabled-btn' : 'comment-btn'" type="submit" :disabled="!userInfo.id">Post Comment</button>
              </form>
          </div>
          <div class="col-2">
              <loader-big v-if="fetchLoading" />
              <p v-if="comments.length === 0" class="no-comments">No Comments!</p>
              <div class="comment-top">
                  <h3 class="title">{{postTitle}}</h3>
                  <div class="count">
                    <span>Comments</span>
                    <div class="num">{{count}}</div>
                  </div>
              </div>
              <div class="comments">
                  <error-msg v-if="fetchError" :msg="fetchError" />
                  <div v-for="comm in comments" :key="comm._id" class="comment">
                    <div class="info">
                        <div class="user">
                            <div class="avatar">
                                <span>{{comm.author.username.charAt(0).toUpperCase()}}</span>
                            </div>
                            <div class="name-date">
                                <h3>{{comm.author.username}}</h3>
                                <span class="date">Commented {{comm.createdAt}} ago</span>
                            </div>
                        </div>
                        <div v-if="userInfo && userInfo.id === comm.author._id" @click="showConfigCommentHandler({id: comm._id, text: comm.body})" class="config">
                            <i class="fas fa-cog"></i>
                        </div>
                    </div>
                    <hr>
                    <p>{{comm.body}}</p>
                    <div @click="showRepliesHandler(comm._id, comm.body)" class="reply">
                        <span>Reply <i class="fas fa-reply"> <small>( {{comm.replies.length}} Replies )</small></i></span>
                    </div>
                  </div>
              </div>
          </div>
          
        <!-- Comment Replies -->
        <comment-replies :commentId="commentId" :comment="scPart" />
        <!-- Update or Delete Comment -->
        <config-comment :comment="commentForUpdate" :postId="postId" />
      </div>
  </div>
</template>

<script>
import {defineComponent, ref, watchEffect} from 'vue'
import useStates from '../composables/states'
import {useCreateComment} from '../composables/comments/create'
import {useFetchAllComments} from '../composables/comments/fetch'
import {userFromLocalStorage} from '../composables/auth/user'
import LoaderSmall from '../components/LoaderSmall.vue'
import ErrorMsg from '../components/ErrorMsg.vue'
import LoaderBig from './LoaderBig.vue'
import CommentReplies from './CommentReplies.vue'
import ConfigComment from './ConfigComment.vue'

export default defineComponent({
    name: 'Comments',
    props: ['postId', 'postTitle'],
    components: {LoaderSmall, ErrorMsg, LoaderBig, CommentReplies, ConfigComment},
    setup(props) {
        const comment = ref('')
        const commentId = ref('')
        const scPart = ref('')
        const commentForUpdate = ref({})

        const {
            commentModal, 
            toggleCommentModal,
            toggleReplyModal,
            toggleConfigCommnetModal
        } = useStates()
        const {
            loading: createLoading, 
            success: createSuccess, 
            error: createError,
            createComment
        } = useCreateComment()
        const {
            loading: fetchLoading,
            error: fetchError,
            comments,
            count,
            fetchAll
        } = useFetchAllComments()
        const {userInfo} = userFromLocalStorage()


        const hideCommentsHandler = () => toggleCommentModal(false)

        watchEffect(() => {
            if (commentModal.value) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'unset'
            }

            if (props.postId) {
                fetchAll(props.postId)
            }
        })

        const submitHandler = async () => {
            await createComment(props.postId, comment.value)

            if (createSuccess.value) {
                fetchAll(props.postId)
                comment.value = ''
            }
        }

        const showRepliesHandler = (id, commentText) => {
            commentId.value = id
            scPart.value = commentText.substring(0, 70)
            toggleReplyModal(true)
        }

        const showConfigCommentHandler = (data) => {
            commentForUpdate.value = data
            toggleConfigCommnetModal(true)
        }

        return {
            commentModal,
            hideCommentsHandler,
            comment,
            submitHandler,
            createLoading,
            createError,
            showRepliesHandler,
            comments,
            count,
            fetchLoading,
            fetchError,
            commentId,
            commentForUpdate,
            showConfigCommentHandler,
            scPart,
            userInfo
        }
    }
})
</script>