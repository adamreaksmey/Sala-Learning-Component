<template>
  <div :class="defaultCardStyle">
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
      <div v-else class="w-100">
        <b-card-header
          class="d-flex justify-content-between align-items-center cursor-pointer w-100"
          :class="{
            'lesson--active': activeLesson && activeLesson.id === lesson.id,
          }"
          @click="handleClickLesson(lesson)"
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
  },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    cardStyle: {
      type: String,
      default: 'w-100 course-toc-card',
    },
  },
  watch: {
    cardStyle: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.defaultCardStyle = newValue;
        }
      },
    },
  },
  data() {
    return {
      openLessons: [],
      activeLesson: null,
      defaultCardStyle: null,
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
    handleClickLesson(lesson) {
      this.activeLesson = lesson;
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.lesson--active {
  color: white;
  background-color: #a52a2a;
}
</style>
