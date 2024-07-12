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
      <b-link
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
      </b-link>
      <b-collapse
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

              <b-link
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
              </b-link>
            </div>
            <!-- Lesson ACTIVITY -->
            <!-- <div>Lesson</div> -->
            <md-icon
              v-show="completedLessonIconHandler(lessonItem)"
              class="text-success"
              >check_circle</md-icon
            >
          </div>
          <course-toc
            v-else
            :lesson-path="getChildLessonPath(lesson.id)"
            :lessons="[lessonItem]"
          ></course-toc>
        </div>
      </b-collapse>
    </div>
  </div>
  <div v-else>This course doesn't have any competencies.</div>
</template>

<script>
import { mapGetters } from "vuex";
const uniqueId = require("lodash/uniqueId");
import routeTo from "~/mixins/route-to";
import { MdIcon } from "vue-luma";
import axios from "axios";

export default {
  name: "CourseToc",
  components: {
    MdIcon,
  },
  mixins: [routeTo],
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    lessonPath: {
      type: String,
      default: null,
    },
    disabledLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeLessonIds: [],
      listCompletedLesson: [],
      lessonCount: 0,
      foundLesson: {},
      foundAnswer: null,
      activitiesNotFound: [],
    };
  },
  computed: {
    ...mapGetters({
      course: "students/courses/getSingleCourse",
      lessonType: "students/courses/getLessonType",
      organizationId: "admins/organizations/getOrganization",
      coursePermission: "students/courses/getCoursePermission",
      courseProgresses: "students/courses/getUserCourseProgress",
    }),

    id() {
      return uniqueId("accordion_");
    },
    activeActivityId() {
      return this.$route.query.path;
    },
    _lessonPath() {
      return this.$route.query.path || "";
    },
    lessonIds() {
      if (this.$route.query.lesson) {
        return this.$route.query.lesson.split("/");
      } else {
        return [];
      }
    },
    userNumberId() {
      return this.coursePermission.userNumberId;
    },
    courseUserId() {
      return this.coursePermission.courseUserId;
    },
    /**
     * F - 03 | Returns all mapped activityIds and its isCompleted status.
     */
    progressFlat() {
      return (
        this.courseProgresses?.reduce((acc, el) => {
          acc[el.activityId] = el.isCompleted || true;
          return acc;
        }, {}) || {}
      );
    },
  },
  watch: {
    lessonIds: {
      immediate: true,
      handler: function (lessonIdsChanged) {
        if (lessonIdsChanged) this.activeLessonIds = [...lessonIdsChanged];
      },
    },
    /**
     * function: this.calculateLessonProgress()
     * - Shows an analysis of total lessons &
     * completed ones.
     */
    courseProgresses: {
      immediate: true,
      handler: function (progressChanged) {
        if (progressChanged) {
          this.listCompletedLesson = [];
          this.calculateLessonProgress(this.lessons);
          this.calculateCertificateProgress(this.lessons);
        }
      },
    },
    course: {
      immediate: true,
      handler: function (progressChanged) {
        if (progressChanged) {
          this.lessonCount = this.calculateLessonCount(
            progressChanged.learningPath
          );
        }
      },
    },
  },
  mounted() {
    this.setAllLessonsToActive(this.lessons);
    this.getLessonFromLearningPath();
  },
  methods: {
    isLessonOpen(lessonId) {
      return this.activeLessonIds.includes(lessonId);
    },

    openLesson(lessonId) {
      this.activeLessonIds.push(lessonId);
    },

    errorAccessCourse() {
      if (this.disabledLink && this.course) {
        const courseAccess = this.course.courseAccess;
        let errorMessage = "You are not enrolled with this course yet !!!";
        switch (courseAccess) {
          case "closed":
            // Closed - the course is only accessible to the teachers
            errorMessage = "This course is closed by admin !!!";
            break;
          case "hidden":
            // Hidden - Completely hidden to all users except the administrators
            errorMessage = "This course is closed by admin !!!";
            break;

          default:
            errorMessage = "You are not enrolled with this course yet !!!";
            break;
        }

        if (this.course.startDate) {
          const today = new Date();
          const startDate = new Date(this.course.startDate);

          if (today < startDate)
            errorMessage = "This course is not started yet !!!";
        }

        if (this.course.endDate) {
          const today = new Date();
          const endDate = new Date(this.course.endDate);

          if (endDate < today) errorMessage = "This course has ended !!!";
        }

        this.$bvToast.toast(errorMessage, {
          title: "No Access to Lesson",
          variant: "warning",
          solid: true,
        });
      }
    },

    accordionLessonHandler(lesson) {
      if (lesson.type !== "lesson") {
        this.$root.$bvModal.hide("lesson-modal");
        this.errorAccessCourse();
      } else if (!this.disabledLink && lesson.status !== "lock") {
        this.linkToNotLesson(lesson.id, lesson.type);
      }
    },

    linkDisableHandler(lesson) {
      if (lesson.type != "lesson" && lesson.status && lesson.status == "lock") {
        return true;
      }
      return false;
    },

    /**
     * F - 01 | LearningPath
     * @param {*} lesson
     * This function checks a learning path, see if every
     * of its child is completed.
     */
    activityCompletionHandler(lesson) {
      const activityIsCompleted = this.isActivityCompleted(lesson.id);
      const lessonIsCompleted = this.listCompletedLesson.includes(lesson.id);
      const lessonCount =
        Number(this.courseProgresses.length) == Number(this.lessonCount);
      const lessonType = lesson?.type == "certification" && lessonCount;

      return activityIsCompleted || lessonIsCompleted || lessonType;
    },

    linkHandler(args) {
      const { lesson, lessonItem } = args;
      if (
        this.disabledLink ||
        (lessonItem.status && lessonItem.status == "lock")
      ) {
        return "#";
      }
      return this.linkTo(lesson.id, lessonItem);
    },

    linkDisabler(lessonItem) {
      if (lessonItem.status && lessonItem.status == "lock") {
        return true;
      }
      return false;
    },

    /**
     * F - 02 | Activity checks handler
     * @param {Object} lessonItem
     * @returns {Promise<boolean>}
     * 1. Checks if activityId exists in the userProgress table and its isCompleted key returns a true.
     * 2. Check if it's a certificate.
     *
     * 1 / May / 2024 | If (activityIsCompleted || lessonType) returns false, it will check if it has
     * an answer, if found, upload the user's progress to be isCompleted: true.
     *
     * 5 / May / 2024 | Feature cancelled due to too many api calls.
     */
    completedLessonIconHandler(lessonItem) {
      const activityIsCompleted = this.isActivityCompleted(lessonItem.id);
      const lessonType = lessonItem.type === "certification";
      if (activityIsCompleted || lessonType) {
        return true;
      }
      // console.log({
      //   activityId: lessonItem.id,
      //   activityIsCompleted,
      //   lessonType,
      // })

      // this.uploadUserProgress(lessonItem.id)
      return false;
    },
    /**
     * F - 07 | Upload user progress if user's answer is found
     * @param {*} activityId
     */
    async uploadUserProgress(activityId) {
      if (activityId) {
        await this.getUserAnswer(activityId);
        if (this.foundAnswer) {
          const progressStatus = {
            isCompleted: true,
            userNumberId: this.userNumberId,
            percentage: 0,
            progress: "N/A",
            courseUserId: this.courseUserId,
          };

          await this.$store.dispatch("students/courses/modifyUserProgress", {
            courseId: this.course.courseId,
            activityId: activityId,
            params: progressStatus,
          });
          console.log("Activity has been uploaded!");
        } else {
          console.log("Answer not found");
        }
      }
    },
    /**
     * F - 04 | Get single user answer
     * @param {*} payload
     */
    async getUserAnswer(activityId) {
      const subjectId = this.foundLesson.subjectId;
      const userId = this.$auth.user.sub;
      const orgId = this.organizationId;

      const response = await axios({
        method: "GET",
        url: `/api-qa/organizations/${orgId}/subjects/${subjectId}/questions/${activityId}/userAnswers`,
        params: {
          userId: userId,
        },
      });
      this.foundAnswer = response.data[0];
    },

    /**
     * F - 05 | Returns a found lesson
     */
    getLessonFromLearningPath() {
      const learningPath = this.course.learningPath;
      const lessonPath = this._lessonPath;
      for (const lesson of learningPath) {
        const found = this.searchViewingLesson(lesson, lessonPath);
        if (found) {
          this.foundLesson = found;
        }
      }
    },
    /**
     * F - 06 | Recursive function to get that lesson from F - 05
     * @param {*} item
     * @param {*} pathId
     *
     */
    searchViewingLesson(item, pathId) {
      if (item.id === pathId) {
        return item;
      }
      if (item.children) {
        for (const child of item.children) {
          const found = this.searchViewingLesson(child, pathId);

          if (found) {
            return found;
          }
        }
      }
    },

    closeLesson(lessonId) {
      this.activeLessonIds = this.activeLessonIds.filter((activeLessonId) => {
        return activeLessonId != lessonId;
      });
    },

    isActivityActive(activityId) {
      return activityId == this.activeActivityId;
    },

    getChildLessonPath(childLessonId) {
      return this.lessonPath
        ? this.lessonPath + "/" + childLessonId
        : childLessonId;
    },

    linkToNotLesson(lessonId, lessonType) {
      if (lessonType !== "lesson") {
        this.$router.push(
          this.routeTo({
            name: this.routes.courses.lessons.name,
            params: {
              slug: this.course.courseId,
            },
            query: {
              lesson: this.getChildLessonPath(lessonId),
              path: this.getChildLessonPath(lessonId),
            },
          })
        );
      }
    },

    linkTo(lessonId, lessonItem) {
      const link = this.routeTo({
        name: this.routes.courses.lessons.name,
        params: {
          slug: this.course.courseId,
        },
        query: {
          lesson: this.getChildLessonPath(lessonId),
          path: lessonItem.id,
        },
      });
      return link;
    },

    icon(item) {
      if (item.done) {
        return "check_circle";
      }
      if (item.type === "quiz") {
        return "hourglass_empty";
      }
      if (item.locked) {
        return "lock";
      }
      return "play_circle_outline";
    },

    iconHolderVariant(item) {
      if (item.done) {
        return "dark";
      }
      if (item.active) {
        return "primary";
      }
      return "light";
    },

    /**
     * F - 08 | Checks for activities
     * @param {*} activityId
     * Checks if activityId exists in the userProgress table
     * this.courseProgresses is the table
     */
    isActivityCompleted(activityId) {
      if (this.courseProgresses) {
        const activity = this.courseProgresses.find(
          (el) => el.activityId == activityId
        );
        if (activity) {
          // Usually, we find the one that's completed but for
          // IBF's sake, i decided to add another condition
          // to check as long as it exists
          return activity.isCompleted || activity;
        }
      }
      return false;
    },

    calculateLessonProgress(lessons) {
      return lessons.reduce(
        ({ countCompleted, countAll }, lesson) => {
          if (lesson.children && lesson.children.length > 0) {
            // Recursively looping for every found children.
            const item = this.calculateLessonProgress(lesson.children);

            // Adding progress for every lesson found completed.
            const totalCountAll =
              countAll +
              item.countAll +
              (item.countCompleted === item.countAll
                ? this.listCompletedLesson.push(lesson.id) && 0
                : 0);

            return {
              countCompleted: countCompleted + item.countCompleted,
              countAll: totalCountAll,
            };
          }
          const completed =
            lesson.type == "lesson" || this.progressFlat[lesson.id] ? 1 : 0;
          if (completed || lesson.type == "lesson")
            this.listCompletedLesson.push(lesson.id);
          return {
            countCompleted: countCompleted + completed,
            countAll: countAll + 1,
          };
        },
        { countCompleted: 0, countAll: 0 }
      );
    },

    calculateCertificateProgress(lessons) {
      for (const lesson of lessons) {
        if (lesson.children && lesson.children.length > 0) {
          this.calculateCertificateProgress(lesson.children);
        }
        if (lesson.type == "certification") {
          if (
            lesson.afterFinish &&
            lesson.afterFinish.id &&
            (this.isActivityCompleted(lesson.afterFinish.id) ||
              this.listCompletedLesson.includes(lesson.afterFinish.id))
          ) {
            this.listCompletedLesson.push(lesson.id);
          }
        }
      }
    },

    setAllLessonsToActive(lessons) {
      for (const lesson of lessons) {
        if (lesson.children && lesson.children.length > 0) {
          // if lesson/activity continue to find type lesson
          this.setAllLessonsToActive(lesson.children);
        }

        if (
          lesson.type == "lesson" &&
          lesson.children &&
          lesson.children.length > 0
        ) {
          this.activeLessonIds.push(lesson.id);
        }
      }
    },

    calculateLessonCount(lessons) {
      let countAll = 0;

      for (const lesson of lessons) {
        if (lesson.children && lesson.children.length > 0) {
          const count = this.calculateLessonCount(lesson.children);
          countAll = countAll + count;
        } else if (lesson.type == "lesson" || lesson.type == "certification") {
          // for empty lesson
        } else {
          countAll++;
        }
      }

      return countAll;
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
