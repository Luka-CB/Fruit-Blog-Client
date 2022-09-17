<template>
    <div class="posts-container">
        <div class="posts-header">
            <div class="left">
                <span class="count">{{count}} Posts</span>
                <div title="Sort by date" class="sort">
                    <div v-if="sort === 'asc'" @click="sort = 'desc'" class="asc">
                        <i class="fas fa-long-arrow-alt-up"></i>
                        <i class="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div v-else @click="sort = 'asc'" class="desc">
                        <i class="fas fa-long-arrow-alt-up"></i>
                        <i class="fas fa-long-arrow-alt-down"></i>
                    </div>
                </div>
                <div class="search">
                    <input 
                        class="search-input" 
                        type="text" 
                        placeholder="Search posts" 
                        required
                        @keyup="queryHandler"
                    >
                    <span class="search-icon"><i class="fas fa-search"></i></span>
                </div>
            </div>
            <router-link v-if="userInfo && userInfo.isAdmin" :to="{name: 'CreatePost'}">
                <button class="cr-btn">Create New Post</button>
            </router-link>
        </div>
        <hr>
        <div class="posts-body">
            <loader-big v-if="loading" />
            <p v-if="posts.length === 0" class="no-posts">No Posts!</p>
            <div v-for="(post, i) in posts" :key="post._id" class="post">
                <div class="post-header">
                    <div class="title">
                        <h3>{{post.title}}</h3>
                    </div>
                    <div v-if="userInfo && userInfo.isAdmin" class="config">
                        <div @click="unpublisheHandler(post._id, i)" class="unpublish-btn">
                            <span>{{postIndex === i ? 'Unpublishing...' : 'Unpublish'}}</span>
                        </div>
                        <router-link :to="{name: 'EditPost', params: {id: post._id}}">
                            <div class="edit">
                                <i class="far fa-edit"></i>
                            </div>
                        </router-link>
                    </div>
                </div>
                <hr>
                <div class="post-body">
                    <p class="text"><span v-html="`${post.body.substring(0, 1500)} ...`"></span></p>
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
                    <div class="post-footer">
                        <span class="date">Posted {{post.createdAt}} ago</span>
                        <router-link :to="{name: 'Post', params: {id: post._id}}">
                            <div class="more-btn">
                                <span class="btn-text">Read More</span>
                                <i class="fas fa-long-arrow-alt-right"></i>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <success-msg msg="Post Unpublished Successfully" />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from 'vue'
import {useFetchAllPosts} from '../composables/posts/fetch'
import {userFromLocalStorage} from '../composables/auth/user'
import {useUpdatePostStatus} from '../composables/posts/update'
import useStates from '../composables/states'
import LoaderBig from '../components/LoaderBig.vue'
import SuccessMsg from '../components/SuccessMsg.vue'
import {useHead} from '@vueuse/head'

export default defineComponent({
    name: 'Posts',
    components: {LoaderBig, SuccessMsg},
    setup() {
        const sort = ref('desc')
        const timeOut = ref<any>(null)
        const postIndex = ref<number | null>(null)

        const { posts, count, loading, fetchAllPosts} = useFetchAllPosts()
        const {userInfo} = userFromLocalStorage()
        const {success, updateStatus} = useUpdatePostStatus()
        const {toggleSuccessMsg} = useStates()

        useHead({
            title: computed(() => `Posts ( ${count.value} )`)
        })

        watchEffect(() => {
            fetchAllPosts({
                searchQuery: '', 
                sort: sort.value
            })
        })

        const queryHandler = (e: any) => {
            clearTimeout(timeOut.value)

            timeOut.value = setTimeout(() => {
                if (e.target.value) {
                    fetchAllPosts({
                        searchQuery: e.target.value,
                        sort: sort.value
                    })
                }
            }, 300)
        }

        const unpublisheHandler = async (id: string, i: number) => {
            postIndex.value = i
            await updateStatus(id)

            if (success.value) {
                await fetchAllPosts({
                    searchQuery: '',
                    sort: sort.value
                })
                postIndex.value = null
                toggleSuccessMsg(true)
                setTimeout(() => {
                    toggleSuccessMsg(false)
                }, 4000)
            }
        }

        return {
            count,
            posts,
            loading,
            sort,
            queryHandler,
            userInfo,
            unpublisheHandler,
            postIndex
        }
    }
})
</script>