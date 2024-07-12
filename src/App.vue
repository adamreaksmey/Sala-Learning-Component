<template>
  <div>
    <CourseToc :lessons="learningPath" />
  </div>
</template>

<script>
import CourseToc from "./components/SideBar/CourseToc.vue";
import learningPath from "./components/Dummy/learningPath";

export default {
  name: "App",
  components: {
    CourseToc,
  },
  data() {
    return {
      learningPath,
    };
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
