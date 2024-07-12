<template>
  <div>
    <b-card v-for="lesson in lessons" :key="lesson.id" class="mb-2">
      <div v-if="lesson.children && lesson.children.length">
        <b-card-header
          @click="toggle(lesson.id)"
          class="d-flex justify-content-between align-items-center cursor-pointer"
        >
          {{ lesson.name }}
          <b-icon
            :icon="isLessonOpen(lesson.id) ? 'chevron-down' : 'chevron-right'"
          ></b-icon>
        </b-card-header>
        <b-collapse :id="lesson.id" :visible="isLessonOpen(lesson.id)">
          <b-card-body>
            <!-- Recursive Component Call for children only if children key exists -->
            <course-toc :lessons="lesson.children"></course-toc>
          </b-card-body>
        </b-collapse>
      </div>
      <div v-else>
        <b-card-header
          class="d-flex justify-content-between align-items-center"
        >
          {{ lesson.name }}
        </b-card-header>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BCollapse, BIcon } from "bootstrap-vue";

export default {
  name: "CourseToc",
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCollapse,
    BIcon,
    CourseToc: () => import("./CourseToc.vue"),
  },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openLessons: [],
    };
  },
  methods: {
    toggle(lessonId) {
      const index = this.openLessons.indexOf(lessonId);
      if (index === -1) {
        this.openLessons.push(lessonId);
      } else {
        this.openLessons.splice(index, 1);
      }
    },
    isLessonOpen(lessonId) {
      return this.openLessons.includes(lessonId);
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
