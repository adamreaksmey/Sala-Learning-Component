<template>
  <div class="w-100 d-flex justify-content-center" id="app">
    <div class="w-50 bg-white">
      <div class="h-100 d-flex justify-content-center">
        <div>
          <img alt="Vue logo" src="./assets/logo.png" />
          <SalaLearning :title="'Hello from sala component'" />
          <BButton>Hello world</BButton>
          <b-link
            class="position-fixed fixed-bottom m-0 rounded-0 py-1 text-center"
            variant="warning"
          >
            _____OFFLINE
          </b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SalaLearning from "./components/SalaLearning.vue";
import { BButton, BLink } from "bootstrap-vue";

export default {
  name: "App",
  components: {
    SalaLearning,
    BButton,
    BLink,
  },
};
</script>

<style>
#app {
  background-color: aqua;
  width: 50%;
  height: 500px;
}
</style>
