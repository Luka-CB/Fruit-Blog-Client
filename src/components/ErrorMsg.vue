<template>
  <div class="error-msg">
      <p>{{msg}}</p>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'ErrorMsg',
    props: ['msg']
})
</script>

<style lang="scss" scoped>
    .error-msg {
        background-color: rgb(230, 74, 121);
        padding: 5px;
        color: white;
        border-radius: 5px;
        box-shadow: 0 0 5px rgb(230, 74, 121);
        margin: 10px;
        text-align: center;
        word-wrap: break-word;

        @media (min-width: 1700px) {
            padding: 20px;
            margin-top: 30px;
            font-size: 2rem;
        }
    }
</style>