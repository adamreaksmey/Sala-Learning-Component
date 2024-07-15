<template>
  <div class="d-flex" style="width: 1200px">
    <div class="w-50">
      <CourseToc :lessons="learningPath" />
    </div>
    <div class="w-50">content shit</div>
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
