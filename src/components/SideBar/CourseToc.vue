<template>
  <div
    v-if="lessons.length > 0"
    :id="id"
    class="accordion accordion--boxed mb-0"
  >
    <div
      v-for="lesson in lessons"
      :key="`toc-section-${lesson.id}`"
      :class="{ open: isLessonOpen(lesson.id) }"
    >
      <BLink
        v-b-toggle="`toc-section-${lesson.id}`"
        :disabled="linkDisableHandler(lesson)"
        class="accordion__toggle lesson-item pl-1 py-1"
        :class="{
          'lesson-completed': isActivityCompleted(lesson.id),
          'lesson-active bg-primary text-white': isActivityActive(lesson.id),
        }"
        @click="accordionLessonHandler(lesson)"
      >
        <span
          class="icon-holder icon-holder--small rounded-circle d-inline-flex"
        >
          <md-icon
            v-if="lesson.type === 'lesson'"
            class="accordion__toggle-icon material-icons"
          >
            {{
              isLessonOpen(lesson.id)
                ? "keyboard_arrow_down"
                : "keyboard_arrow_right"
            }}
          </md-icon>
          <i
            v-else-if="lessonType.lessonAsVideos.includes(lesson.type)"
            class="material-icons icon-16pt"
          >
            play_circle_outline
          </i>
          <i
            v-else-if="lessonType.lessonAsImages.includes(lesson.type)"
            class="material-icons icon-16pt"
          >
            image
          </i>
          <i
            v-else-if="lessonType.lessonAsPdfs.includes(lesson.type)"
            class="material-icons icon-16pt"
          >
            picture_as_pdf
          </i>
          <i
            v-else-if="lesson.type == 'examination'"
            class="material-icons icon-16pt"
          >
            hourglass_empty</i
          >
          <i
            v-else-if="lesson.type == 'read-out-text'"
            class="material-icons icon-16pt"
          >
            library_books
          </i>
          <i
            v-else-if="
              lesson.type == 'paragraph' ||
              lesson.type == 'radio' ||
              lesson.type == 'checkbox'
            "
            class="material-icons icon-16pt"
          >
            playlist_add_check
          </i>
          <i v-else class="material-icons icon-16pt">insert_drive_file</i>
        </span>
        <span class="flex text-wrap text-break">
          {{ lesson.name }}
          <img
            v-if="lesson.status && lesson.status == 'lock'"
            width="16px"
            src="/images/icon/editor/lock-black.png"
            class="ml-2 mb-1"
          />
        </span>
        <span> </span>
        <!-- learning path -->
        <!-- <div class="text-danger"> Lesson </div> -->
        <md-icon
          v-show="activityCompletionHandler(lesson)"
          class="accordion__toggle-icon text-success"
        >
          check_circle
        </md-icon>
      </BLink>
      <BCollapse
        v-if="lesson.type === 'lesson'"
        :id="`toc-section-${lesson.id}`"
        :ref="`toc-collapse-${lesson.id}`"
        :accordion="`lesson-accordion-${lesson.id}`"
        :visible="isLessonOpen(lesson.id)"
        class="accordion__menu pl-3"
        @hide="closeLesson(lesson.id)"
        @show="openLesson(lesson.id)"
      >
        <div
          v-for="(lessonItem, index) in lesson.children"
          :key="`toc-item-${lesson.id}-${lessonItem.id}-${index}`"
        >
          <div
            v-if="lessonItem.type != 'lesson'"
            class="accordion__menu-link pl-1 py-1 justify-content-between mw-100"
            :class="{
              'lesson-active bg-primary text-white': isActivityActive(
                lessonItem.id
              ),
              'lesson-completed': isActivityCompleted(lessonItem.id),
            }"
          >
            <div class="d-flex align-items-center w-100">
              <span
                class="icon-holder icon-holder--small rounded-circle d-inline-flex text-primary"
              >
                <!-- <span class="icon-holder icon-holder--small rounded-circle d-inline-flex icon--left icon-holder--primary"> -->
                <i
                  v-if="lessonType.lessonAsVideos.includes(lessonItem.type)"
                  class="material-icons icon-16pt"
                >
                  play_circle_outline
                </i>
                <i
                  v-else-if="
                    lessonType.lessonAsImages.includes(lessonItem.type)
                  "
                  class="material-icons icon-16pt"
                >
                  image
                </i>
                <i
                  v-else-if="lessonType.lessonAsPdfs.includes(lessonItem.type)"
                  class="material-icons icon-16pt"
                >
                  picture_as_pdf
                </i>
                <i
                  v-else-if="lessonItem.type == 'examination'"
                  class="material-icons icon-16pt"
                >
                  hourglass_empty
                </i>
                <i
                  v-else-if="lessonItem.type == 'read-out-text'"
                  class="material-icons icon-16pt"
                >
                  library_books
                </i>
                <i
                  v-else-if="
                    lessonItem.type == 'paragraph' ||
                    lessonItem.type == 'radio' ||
                    lessonItem.type == 'checkbox'
                  "
                  class="material-icons icon-16pt"
                >
                  playlist_add_check
                </i>
                <i v-else class="material-icons icon-16pt">insert_drive_file</i>
              </span>

              <BLink
                class="flex link-name text-wrap text-break"
                :to="linkHandler({ lesson, lessonItem })"
                :disabled="linkDisabler(lessonItem)"
                @click="
                  errorAccessCourse();
                  $root.$bvModal.hide('lesson-modal');
                "
              >
                {{ lessonItem.name }}
                <img
                  v-if="lessonItem.status && lessonItem.status == 'lock'"
                  width="16px"
                  src="/images/icon/editor/lock-black.png"
                  class="ml-2 mb-1"
                />
              </BLink>
            </div>
            <!-- Lesson ACTIVITY -->
            <!-- <div>Lesson</div> -->
            <md-icon
              v-show="completedLessonIconHandler(lessonItem)"
              class="text-success"
              >check_circle</md-icon
            >
          </div>
          <CourseToc
            v-else
            :lesson-path="getChildLessonPath(lesson.id)"
            :lessons="[lessonItem]"
          ></CourseToc>
        </div>
      </BCollapse>
    </div>
  </div>
  <div v-else>This course doesn't have any competencies.</div>
</template>

<script>
import { BLink, BCollapse } from "bootstrap-vue";

export default {
  name: "CourseToc",
  components: {
    BLink,
    BCollapse,
    CourseToc: () => import('./CourseToc.vue'),
  },
  props: {
    id: {
      type: String,
      default: "course-toc",
    },
    lessons: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "Introduction",
          type: "lesson",
          status: null,
          children: [
            {
              id: 2,
              name: "Video Lesson",
              type: "video",
              status: "complete",
            },
            {
              id: 3,
              name: "PDF Lesson",
              type: "pdf",
              status: null,
            },
          ],
        },
        {
          id: 4,
          name: "Chapter 1",
          type: "lesson",
          status: "lock",
          children: [
            {
              id: 5,
              name: "Image Lesson",
              type: "image",
              status: null,
            },
            {
              id: 6,
              name: "Read Out Text",
              type: "read-out-text",
              status: "complete",
            },
          ],
        },
      ],
    },
    lessonType: {
      type: Object,
      default: () => ({
        lessonAsVideos: ["video"],
        lessonAsImages: ["image"],
        lessonAsPdfs: ["pdf"],
      }),
    },
  },
  methods: {
    getChildLessonPath(value) {
      return `path-to-lesson-${value}`;
    },
    completedLessonIconHandler(value) {
      return value.status === "complete";
    },
    errorAccessCourse() {
      console.error("Access to course content failed.");
    },
    linkDisabler(lesson) {
      return lesson.status === "lock";
    },
    linkHandler({ lesson, lessonItem }) {
      return `/course/${lesson.id}/lesson/${lessonItem.id}`;
    },
    isActivityCompleted(lessonId) {
      const lesson = this.findLessonById(lessonId);
      return lesson && lesson.status === "complete";
    },
    isActivityActive(lessonId) {
      const lesson = this.findLessonById(lessonId);
      return lesson && lesson.status === "active";
    },
    isLessonOpen(lessonId) {
      console.log(lessonId)
      return false; // Implement your logic for determining if the lesson is open
    },
    closeLesson(lessonId) {
      console.log(`Closing lesson ${lessonId}`);
    },
    openLesson(lessonId) {
      console.log(`Opening lesson ${lessonId}`);
    },
    activityCompletionHandler(lesson) {
      return lesson.status === "complete";
    },
    accordionLessonHandler(lesson) {
      console.log(`Handling accordion lesson ${lesson.id}`);
    },
    findLessonById(lessonId) {
      for (const lesson of this.lessons) {
        if (lesson.id === lessonId) return lesson;
        for (const child of lesson.children) {
          if (child.id === lessonId) return child;
        }
      }
      return null;
    },
    linkDisableHandler(lesson) {
      return lesson.status === "lock";
    },
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 18px !important;
}

.accordion {
  border-radius: 4px;
}

.accordion__toggle {
  border: 1px solid #d1d7dc;
  border-radius: 4px;
  border-collapse: collapse;
}
.accordion .lesson-item {
  border: 1px solid #d1d7dc45;
  background-color: #dfe0e1a1;
  margin-top: -1px;
}
/* .accordion .open {
  border-left: 1px solid #d1d7dc;
  border-radius: 3px;
} */
.lesson-item .lesson-item {
  border: none !important;
}
.accordion__menu-link {
  padding-right: 1.25rem;
  color: #202223;
}
.icon-holder {
  min-width: 30px;
}
.link-name {
  word-wrap: break-word;
  max-width: 80%;
}
.lesson-completed {
  background-color: #dfe1df2b;
  border-radius: 4px;
}
.lesson-completed .done-postfix {
  color: rgb(21, 172, 41);
  font-weight: 900;
}
.lesson-active {
  border-radius: 4px;
}
.lesson-active .material-icons {
  color: white;
}
</style>
