<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <!-- <v-col cols="12" lg="12" style="margin-top: 100px;">
        <BulletListLoader />
      </v-col> -->
      <v-col cols="12" lg="12" style="margin-top: 80px;">
        <v-list two-line>
          <template v-for="item in todos">
            <v-list-item :key="item.id" style="text-align: start;">
              <!-- <template v-slot:default="{ active }"> -->
              <div class="user-header">
                <v-avatar
                  :color="randomNameColorTag(item.first_name)"
                  style="margin-right: 15px;"
                >
                  <span class="white--text headline">{{
                    mtdLetterAvatar(item.first_name)
                  }}</span>
                </v-avatar>
              </div>

              <v-list-item-content>
                <div class="article">
                  <small
                    >@<b>{{ item.first_name }}{{ item.last_name }}</b></small
                  >
                  <small class="date ml-1">{{
                    readableDateString(item.created_at)
                  }}</small>
                </div>

                <v-list-item-title
                  class="my-1"
                  v-text="item.text"
                ></v-list-item-title>
                <small
                  >Due Date {{ new Date(item.due_date).toDateString() }}</small
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                  v-if="checkDueDate(item.due_date)"
                  color="grey lighten-1"
                >
                  mdi-checkbox-marked-circle-outline
                </v-icon>

                <v-icon v-else color="green">
                  mdi-checkbox-marked-circle
                </v-icon>
              </v-list-item-action>
              <!-- </template> -->
            </v-list-item>
            <!-- <v-divider :key="i"></v-divider> -->
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
// import { BulletListLoader } from "vue-content-loader";

export default {
  name: "Todos",
  components: {
    // BulletListLoader,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState("todos", ["todos"]),
  },
  methods: {
    mtdLetterAvatar: (name) => name[0].toUpperCase(),
    randomNameColorTag(firstName) {
      if (firstName) {
        if (firstName[0] == "N") {
          return "teal";
        } else {
          return "red";
        }
      }
    },
    readableDateString(d) {
      const today = new Date().getTime();
      const millisecondsInDay = 1000 * 60 * 60 * 24;
      const difTime = today - new Date(d).getTime();
      const difDay = Math.floor(difTime / millisecondsInDay);
      if (difDay === 0) {
        return "Today";
      } else if (difDay === 1) {
        return "Yesterday";
      } else if (difDay > 1 <= 7) {
        return "This week";
      } else {
        return new Date(d).toLocaleDateString();
      }
    },
    checkDueDate(d) {
      const today = new Date().getTime();
      const millisecondsInDay = 1000 * 60 * 60 * 24;
      const difTime = new Date(d).getTime() - today;
      const difDay = Math.floor(difTime / millisecondsInDay);
      if (difDay === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-card {
  display: flex;
  transition: all 0.1s ease-in-out;

  .left {
    flex: 3;
  }
  .right {
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
  }

  /**
* Just in case user insert long word for testing or no reason ¯\_(ツ)_/¯
* that gonna mess up card layout So this fix it.
*/
  p {
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* css-3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }
  .text-center {
    margin: auto 0;
    text-align: center;
    text-align-last: left;
    font-weight: 400;
  }

  .done {
    text-decoration: line-through;
    color: crimson;
  }
  /* .overdueText{
    color: crimson;
  } */
}
.article {
  display: flex;
  align-items: center;
  & > * {
    display: block;
  }
}
</style>
