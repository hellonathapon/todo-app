<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="toggle-icon"
          fab
          large
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">TODO</v-card-title>
        <v-form class="px-6" ref="form" v-model="formValid">
          <v-text-field
            ref="todo"
            v-model="input.text"
            :rules="rules.todoRule"
            label="Text"
            placeholder="Todo"
            required
          ></v-text-field>
          <v-text-field
            ref="creator"
            v-model="input.creator"
            :rules="rules.creatorRule"
            label="Creator"
            placeholder="John Doe"
            required
          ></v-text-field>
          <!-- Datepicker -->
          <v-menu
            v-model="datepickerMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                ref="date"
                v-model="input.date"
                label="Due date"
                prepend-icon="mdi-calendar"
                readonly
                :rules="rules.dateRule"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="input.date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="btnLoading"
            text
            @click="submitTodo()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data: () => ({
    input: {
      text: "",
      creator: "",
      date: "",
    },
    dialog: false,
    formValid: false,
    datepickerMenu: false,
    btnLoading: false,
    rules: {
      todoRule: [(v) => !!v || "Todo is required"],
      creatorRule: [(v) => !!v || "Creator name is required"],
      dateRule: [(v) => !!v || "Due date is required"],
    },
  }),

  methods: {
    submitTodo() {
      if (this.$refs.form.validate()) {
        // check form validation.
        this.btnLoading = true;
        // console.log(this.input.date)
        console.log(new Date(this.input.date));
        this.$store
          .dispatch("addTodo", {
            text: this.input.text,
            creator: this.input.creator,
            date: this.input.date,
            isDone: 0,
          })
          .then(() => {
            this.btnLoading = false;
            this.dialog = false;
          })
          .catch(() => (this.btnLoading = false));
      }
    },

    formatDate() {
      const today = "2021-05-02";
      const n = new Date(today);
      const daysOfWeek = ["a", "b", "c", "d", "e", "f", "r"];
      const monthNames = [
        "Jan",
        "Fab",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = n.getDay();
      let i = 0;
      let dayOfToday = "";
      while (i < daysOfWeek.length) {
        if (day === i) {
          dayOfToday = daysOfWeek[i];
        }
        i++;
      }

      let q = 0;
      const date = n.getDate();
      const month = n.getMonth();
      let thisMonth = "";

      while (q < monthNames.length) {
        if (month === q) {
          thisMonth = monthNames[q];
        }
        q++;
      }

      console.log(dayOfToday, date, thisMonth);
    },
  },
};
</script>

<style scoped lang="scss">
.toggle-icon {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
}
</style>
