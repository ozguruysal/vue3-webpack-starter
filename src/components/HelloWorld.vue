<template>
  <h1 class="mt-6 text-3xl font-bold text-gray-900">{{ msg }}</h1>
  
  <button
    class="px-8 py-2 mt-5 text-white bg-gray-900 rounded-md focus:outline-none"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  
  <p class="mt-4">
    Edit
    <code>components/HelloWorld.vue</code>
    to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HelloWorld",

  props: {
    msg: String,
  },

  setup() {
    const count = ref<number>(0);

    return {
      count,
    };
  },
});
</script>
