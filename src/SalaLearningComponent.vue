<template>
  <div class="sala-component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "SalaLearningComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.sala-component {
  color: blue;
}
</style>
