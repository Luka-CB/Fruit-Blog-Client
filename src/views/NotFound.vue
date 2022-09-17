<template>
  <div class="not-found-container">
    <div class="not-found">
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </div>
    <div class="text">
      <h2>Ooops! looks like something went wrong!</h2>
      <div class="subtext">
        <small>
          This usually happens when route you enter does not exist or is unauthorized.
          <span @click="goBack">Go Back</span>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {useHead} from '@vueuse/head'

export default defineComponent({
    name: 'NotFound',
    setup() {
        const router = useRouter()

        useHead({title: '404 | Page Not Found'})

        const goBack = () => router.go(-1)

        return {goBack}
    }
})
</script>
