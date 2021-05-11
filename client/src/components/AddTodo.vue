<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="checkUser"
          class="toggle-icon"
          color="primary"
          dark
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-card ref="form">
        <v-card-title class="text-center">TODO</v-card-title>
        <v-form v-model="isFormValid" v-on:submit.prevent>
          <v-card-text>
            <v-text-field
              ref="title"
              label="Title"
              v-model="input.title"
              required
              counter="50"
              :rules="[
                () => !!input.title || 'This field is required',
                (v) => input.title.length <= 50 || 'React maximun title length',
              ]"
            ></v-text-field>
            <v-textarea
              v-model="input.body"
              label="Text"
              counter="120"
              maxlength="120"
              full-width
              single-line
            ></v-textarea>

            <v-row>
              <!-- date -->
              <v-col cols="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Due Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>

              <!-- time -->
              <v-col cols="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal2"
                  :return-value.sync="time"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Due Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-if="modal2" v-model="time" full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(time)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              :loading="isLoading"
              color="primary"
              text
              type="submit"
              :disabled="!isFormValid"
              @click="submitLoginForm()"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    time: "18:00",
    menu2: false,
    modal2: false,
    input: {
      title: null,
      body: null,
      dueDate: null,
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
  computed: {
    checkUser: function() {
      return this.$store.state.authUser;
    },
  },

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

    // formatDate() {
    //   const today = "2021-05-02";
    //   const n = new Date(today);
    //   const daysOfWeek = ["a", "b", "c", "d", "e", "f", "r"];
    //   const monthNames = [
    //     "Jan",
    //     "Fab",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ];

    //   const day = n.getDay();
    //   let i = 0;
    //   let dayOfToday = "";
    //   while (i < daysOfWeek.length) {
    //     if (day === i) {
    //       dayOfToday = daysOfWeek[i];
    //     }
    //     i++;
    //   }

    //   let q = 0;
    //   const date = n.getDate();
    //   const month = n.getMonth();
    //   let thisMonth = "";

    //   while (q < monthNames.length) {
    //     if (month === q) {
    //       thisMonth = monthNames[q];
    //     }
    //     q++;
    //   }

    //   console.log(dayOfToday, date, thisMonth);
    // },
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
