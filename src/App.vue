<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <SalaLearning :title="'helloooooo'"/>
    <BButton>Hello world</BButton>
  </div>
</template>

<script>
import SalaLearning from "./components/SalaLearning.vue";
import { BButton } from 'bootstrap-vue';

export default {
  name: "App",
  components: {
    SalaLearning,
    BButton
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
