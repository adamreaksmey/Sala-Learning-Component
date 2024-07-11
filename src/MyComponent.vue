<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.my-component {
  color: blue;
}
</style>
