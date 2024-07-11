<template>
  <div class="sala-learning-component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "SalaLearning",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.sala-learning-component {
  color: blue;
}
</style>
