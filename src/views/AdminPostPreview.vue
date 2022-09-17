<template>
  <div class="preview">
      <loader-small v-if="loading" />
      <i @click="goBack" class="far fa-arrow-alt-circle-left"></i>
      <div class="post">
        <h2>{{post.title}}</h2>
        <p v-html="post.body"></p>
      </div>
  </div>
</template>

<script lang='ts'>
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {useFetchOnePost} from '../composables/posts/fetch'
import LoaderSmall from '../components/LoaderSmall.vue'
import { useHead } from "@vueuse/head";

export default defineComponent({
    name: 'AdminPostPreview',
    components: {LoaderSmall},
    setup() {
        const route = useRoute()
        const router = useRouter()

        const id: ComputedRef<string | string[]> = computed(() => route.params.id)

        const {loading, post, fetchOnePost} = useFetchOnePost()

        onMounted(() => fetchOnePost(id.value))

        const goBack = () => router.go(-1)

        useHead({
            title: computed(() => `Preview - ${post.value.title}`)
        })

        return {
            loading,
            post,
            goBack
        }
    }
})
</script>

<style lang="scss" scoped>
    .preview {
        background-color: #323232 ;
        width: 80%;
        min-width: 250px;
        min-height: 60vh;
        margin: 50px auto;
        border-radius: 20px;
        border: 3px solid white;
        box-shadow: 3px 5px 8px black;

        @media (max-width: 500px) {
            width: 95%;
        }

        i {
            padding: 20px;
            font-size: 2.5rem;
            cursor: pointer;
            color: gray;
            transition: 0.2s ease-in-out;

            &:hover {
                color: white;
            }
        }

        .post {
            padding: 20px;

            h2 {
                text-align: center;
                color: lavender;
            }

            p {
                margin-top: 20px;
                color: rgb(194, 194, 194);
            }
        }

        @media (min-width: 1700px) {
        margin: 100px auto;
        border-radius: 40px;
        border: 5px solid white;
        box-shadow: 6px 8px 10px black;

        i {
            padding: 40px;
            font-size: 4.5rem;
        }

        .post {
            padding: 30px;

            h2 {
                font-size: 3rem;
            }

            p {
                margin-top: 40px;
               font-size: 2rem;
            }
        }
        }
    }
</style>