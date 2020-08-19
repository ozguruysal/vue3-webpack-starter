<template>
  <div class="max-w-2xl py-10 mx-auto text-center">
    <HelloWorld msg="Hello Vue 3 + Webpack" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  components: {
    HelloWorld,
  },
});
</script>

<style src="./assets/styles/main.css"></style>
