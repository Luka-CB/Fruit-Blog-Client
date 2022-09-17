<template>
  <div class="post-page">
    <div class="post-page-container">
        <div class="col-1">
            <h1>Read Other Posts</h1>
            <loader-small v-if="loadingPosts" />
            <div class="posts">
                <div v-for="post in posts" :key="post._id" class="post">
                    <h2>{{post.title}}</h2>
                    <p>{{post.likes.author}}</p>
                    <div class="feedbacks">
                        <div class="likes">
                            <i v-if="post.isLiked" class="fas fa-thumbs-up like-fill"></i>
                            <i v-else class="far fa-thumbs-up like-outline"></i>
                            <span class="num">{{post.likes && post.likes.length}}</span>
                        </div>
                        <div class="comments">
                            <i class="far fa-comments"></i>
                            <span class="num">{{post.comments && post.comments.length}}</span>
                        </div>
                    </div>
                    <span class="date">Posted on {{post.createdAt}}</span>
                    <button @click="getPostHandler(post._id)" class="read-post-btn">Read Post</button>
                </div>
            </div>
        </div>
        <div class="col-2">
            <loader-big v-if="loadingPost" />
            <h1>{{post.title}}</h1>
            <hr>
            <div class="date">
                <span>{{post.createdAt}}</span>
            </div>
            <div class="post-text">
                <p v-html="post.body"></p>
            </div>
            <div class="feedbacks">
                <div class="likes">
                    <loader-tiny v-if="createLikeLoading || delLikeLoading" />
                    <div v-else class="icons">
                        <i v-if="isLiked" @click="deleteLikeHandler" class="fas fa-thumbs-up like-fill" title="Unlike This Post"></i>
                        <i v-else @click="createLikeHandler" class="far fa-thumbs-up like-outline" title="Like This Post"></i>
                    </div>
                    <span class="num">{{post.likes && post.likes.length}}</span>
                </div>
                <div @click="showCommentHandler" class="comments">
                    <i class="far fa-comments"></i>
                    <span class="num">{{post.comments && post.comments.length}}</span>
                </div>

                <div v-show="showWarningMsg" class="warning-msg">
                    <p>Please sign in to like!</p>
                </div>
            </div>
        </div>
    </div>

    <comments :postId="id" :postTitle="post.title" />
  </div>
</template> 
 
<script>
import {computed, defineComponent, ref, watchEffect} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useFetchSomePosts, useFetchOnePost} from '../composables/posts/fetch'
import {useFetchUserLike} from '../composables/likes/fetch'
import {userFromLocalStorage} from '../composables/auth/user'
import useCreateLike from '../composables/likes/create'
import {useDeleteLike} from '../composables/likes/delete'
import {format} from 'date-fns'
import LoaderBig from '../components/LoaderBig.vue'
import LoaderSmall from '../components/LoaderSmall.vue'
import LoaderTiny from '../components/LoaderTiny.vue'
import Comments from '../components/Comments.vue'
import useStates from '../composables/states'
import {useHead} from '@vueuse/head'

export default defineComponent({
    name: 'Post',
    components: { LoaderBig, LoaderSmall, Comments, LoaderTiny },
    setup() {
        const showWarningMsg = ref(false)

        const route = useRoute()
        const router = useRouter()

        const {loading: loadingPost, error, post, fetchOnePost} = useFetchOnePost()
        const {loading: loadingPosts, posts, fetchSomePosts} = useFetchSomePosts()

        const {
            success: createLikeSuccess, 
            loading: createLikeLoading, 
            createLike
        } = useCreateLike()
        const {isLiked, like, fetchUserLike} = useFetchUserLike()
        const {
            loading: delLikeLoading,
            success: successLikeLoading,
            deleteLike
        } = useDeleteLike()

        const {toggleCommentModal} = useStates()
        const {userInfo} = userFromLocalStorage()

        useHead({
            title: computed(() => `Read Post - ${post.value.title}`)
        })

        const id = computed(() => route.params.id)

        watchEffect(() => {
            if (id.value) {
                fetchOnePost(id.value)
                fetchSomePosts(id.value)
                fetchUserLike(id.value)
            }

        })

        const showCommentHandler = () => toggleCommentModal(true)
        const getPostHandler = async (id) => {
            router.push({name: 'Post', params: {id}})
        }

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

            await createLike(id.value)

            if (createLikeSuccess.value) {
                fetchOnePost(id.value)
                fetchUserLike(id.value)
            }
        }

        const deleteLikeHandler = async () => {
            await deleteLike(like.value.id)

            if (successLikeLoading.value) {
                fetchOnePost(id.value)
                fetchUserLike(id.value)
            }
        }

        return {
            post,
            posts,
            error,
            format,
            loadingPost,
            loadingPosts,
            showCommentHandler,
            getPostHandler,
            id,
            isLiked,
            createLikeHandler,
            createLikeLoading,
            delLikeLoading,
            deleteLikeHandler,
            showWarningMsg
        }
    }
})
</script>