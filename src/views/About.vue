<template>
  <div class="about">
    <div class="text">
      <h1>Fruit-Blog</h1>
      <p>
        This website is created to be showcased in my
        <a
          href="https://my-portfolio-rosy-phi.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          portfolio
        </a>
        . Website is created using <span>Vue 3</span> as a frontend with
        <span>Composition API</span>. <span>NodeJs</span> as a backend.
        <span>scss</span> is used for styling. <span>MongoDB</span> database is
        used with <span>Mongoose</span> .
      </p>
      <p>
        Code is available
        <a
          href="https://github.com/Luka-CB/fruit-blog"
          target="_blank"
          rel="noreferrer"
        >
          HERE
        </a>
      </p>
    </div>
    <div class="image">
      <img
        class="fruit-img"
        src="@/assets/images/fruit.png"
        alt="Fruit png Image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useHead } from "@vueuse/head";

export default defineComponent({
  name: "About",
  setup() {
    useHead({ title: "About Fruit-Blog" });
  },
});
</script>
