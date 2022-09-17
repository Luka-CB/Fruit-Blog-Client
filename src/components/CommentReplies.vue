<template>
  <div @click.self="hideReplyModalHandler" v-show="replyModal" class="replies-bg">
        <div class="replies-container">
        <loader-big v-if="createLoading" />
        <error-msg v-if="createError" :msg="createError" />
        <div class="top">
            <i @click="hideReplyModalHandler" class="far fa-window-close close-btn-2"></i>
            <p >{{comment.substring(0, 20)}}....</p>
            <span class="count">{{count}} Replies</span>
        </div>
        <div class="comment-wrapper">
            <loader-small v-if="fetchLoading" />
            <error-msg v-if="fetchError" :msg="fetchError" />
            <p v-if="replies.length === 0" class="no-reps">No Replies!</p>
            <div v-for="rep in replies" :key="rep._id" class="comment">
                <div class="info">
                    <div class="user">
                        <div class="avatar">
                            <span>{{rep.author ? rep.author.username.charAt(0).toUpperCase() : 'A'}}</span>
                        </div>
                        <div class="name-date">
                            <h3>{{rep.author ? rep.author.username : 'anonymous'}}</h3>
                            <span class="date">Replied {{rep.createdAt}} ago</span>
                        </div>
                    </div>
                    <div v-if="rep.author && userInfo && userInfo.id === rep.author._id" @click="showConfigReplyHandler({id: rep._id, text: rep.reply})" class="config">
                        <i class="fas fa-cog"></i>
                    </div>
                </div>
                <hr>
                <p>{{rep.reply}}</p>
            </div>
        </div>

        <form @submit.prevent="submitHandler">
            <textarea rows="3" :placeholder="!userInfo.id ? 'Please Sign In to Reply' : 'Write Some Reply'" v-model="reply" required :disabled="!userInfo.id"></textarea>
            <button type="submit" :class="!userInfo.id ? 'disabled-btn' : 'reply-btn'" :disabled="!userInfo.id">Reply</button>
        </form>

        <config-reply :reply="replyData" :commentId="commentId" />
        </div>
    </div>
</template>

<script>
import {defineComponent, ref, watchEffect } from 'vue'
import ErrorMsg from './ErrorMsg.vue'
import LoaderBig from './LoaderBig.vue'
import LoaderSmall from './LoaderSmall.vue'
import {useCreateReply} from '../composables/comments/create'
import {useFetchAllReplies} from '../composables/comments/fetch'
import {userFromLocalStorage} from '../composables/auth/user'
import useStates from '../composables/states'
import ConfigReply from './ConfigReply.vue'

export default defineComponent({
    name: 'CommentReplies',
    components: { LoaderBig, ErrorMsg, LoaderSmall, ConfigReply },
    props: ['commentId', 'comment'],
    setup(props) {
        const reply = ref('')
        const replyData = ref({})

        const {replyModal, toggleReplyModal, toggleConfigReplyModal} = useStates()
        const {userInfo} = userFromLocalStorage()

        const {
            loading: createLoading,
            success: createSuccess,
            error: createError,
            createReply
        } = useCreateReply()
        const {
            loading: fetchLoading,
            error: fetchError,
            replies,
            count,
            fetchAllReplies
        } = useFetchAllReplies()

        const hideReplyModalHandler = () => toggleReplyModal(false)

        watchEffect(() => {
            if (props.commentId) {
                fetchAllReplies(props.commentId)
            }
        })

        const submitHandler = async () => {
            await createReply(reply.value, props.commentId)

            if (createSuccess.value) {
                fetchAllReplies(props.commentId)
                reply.value = ''
            }
        }

        const showConfigReplyHandler = (data) => {
            replyData.value = data
            toggleConfigReplyModal(true)
        }

        return {
            createLoading,
            fetchLoading,
            createError,
            fetchError,
            submitHandler,
            reply,
            replyModal,
            hideReplyModalHandler,
            replies,
            count,
            showConfigReplyHandler,
            replyData,
            userInfo
        }
    }
})
</script>