<template>
  <div v-show="successMsg" class="success-msg">
      <p>{{msg}}</p>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import useStates from '../composables/states'

export default defineComponent({
    name: 'SuccessMsg',
    props: ['msg'],
    setup() {
        const {successMsg} = useStates()

        return {successMsg}
    }
})
</script>

<style>
    .success-msg {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 350px;
        height: 80px;
        background-color: rgb(44, 209, 80);
        padding: 5px;
        color: white;
        font-size: 1.2rem;
        text-shadow: 1px 2px 1px black;
        letter-spacing: 2px;
        font-weight: bold;
        border-radius: 15px;
        box-shadow: 0 0 5px rgb(44, 209, 80);
        margin: 10px;
        border-top: 6px solid black;
        border-left: 3px solid rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>