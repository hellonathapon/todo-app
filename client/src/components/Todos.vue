<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="12" lg="12" style="margin-top: 100px;">
        <v-list two-line>
          <v-list-item-group active-class="pink--text" multiple>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title" style="text-align: start;">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar style="margin-right: 15px;">
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="item.headline"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="item.action"
                    ></v-list-item-action-text>

                    <v-icon v-if="!active" color="grey lighten-1">
                      mdi-checkbox-marked-circle-outline
                    </v-icon>

                    <v-icon v-else color="yellow darken-3">
                      mdi-checkbox-marked-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-col>

      <!-- <p v-if="!getTodos.length">No todo found :)</p>
        <v-card
          v-else
          v-for="i in getTodos"
          class="todo-card pa-3"
          :key="i.id"
          v-on:click="markAsDone(i.id)"
          outlined
        >
          <div class="d-flex left">
            <v-icon>
              mdi-check-circle-outline
            </v-icon>
            <div class="d-flex flex-column align-start ml-3">
              <p class="text-center title" v-bind:class="{ done: i.isDone }">
                {{ i.text }}
              </p>
              <small>{{ i.creator }}</small>
            </div>
          </div>

          <div class="right">
            <v-btn v-if="i.isDone" icon color="error">
              <v-icon v-on:click="deleteTodo(i.id)"
                >mdi-trash-can-outline</v-icon
              >
            </v-btn>
            <p class="text-center" v-else>{{ i.date }}</p>
          </div>
        </v-card> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Todos",
  components: {},
  data: () => ({
    dialog: false,
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        action: "23 June",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Summer BBQ",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        action: "23 June",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        action: "23 June",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        action: "23 June",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        action: "23 June",
      },
    ],
  }),
  methods: {
    markAsDone(id) {
      this.$store.dispatch("markAsDone", { id });
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", { id });
    },
    /**
     * @COMPARE DATE FEATURE.
     * compare todo overdue date with today.
     */
    // compareDates: function(dateString){
    //   const today = new Date().getTime()
    //   const todoDate = new Date(dateString).getTime();
    //   return todoDate < today;
    // }
  },
  computed: {
    getTodos: function() {
      return this.$store.state.todos;
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
</style>
