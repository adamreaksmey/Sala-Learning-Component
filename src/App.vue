<template>
  <div>
    <CourseToc />
  </div>
</template>

<script>
import CourseToc from "./components/SideBar/CourseToc.vue";

export default {
  name: "App",
  components: {
    CourseToc,
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
