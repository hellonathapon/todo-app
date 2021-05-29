<template>
  <div class="text-center">
    <v-dialog v-model="formModal" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="checkAuthUser"
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
              ref="text"
              label="Text"
              v-model="input.title"
              required
              counter="80"
              :rules="[
                () => !!input.title || 'This field is required',
                () =>
                  (!!input.title && input.title.length <= 80) ||
                  'Text must be less than 80 characters',
              ]"
            ></v-text-field>

            <v-row>
              <!-- date -->
              <v-col cols="6">
                <v-dialog
                  ref="dateBox"
                  v-model="dateModal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      ref="date"
                      :rules="[(v) => !!v || 'Due Date is required']"
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
                    <v-btn text color="primary" @click="dateModal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dateBox.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>

              <!-- time -->
              <v-col cols="6">
                <v-dialog
                  ref="timeBox"
                  v-model="timeModal"
                  :return-value.sync="time"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      ref="time"
                      :rules="[(v) => !!v || 'Due Time is required']"
                      v-model="time"
                      label="Due Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-if="timeModal" v-model="time" full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="timeModal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.timeBox.save(time)"
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
              @click="AddTodo()"
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
import { mapState } from "vuex";

export default {
  name: "AddTodo",
  data: () => ({
    date: null,
    time: null,
    formModal: false,
    dateModal: false,
    timeModal: false,
    input: {
      text: null,
    },
    isLoading: false,
    isFormValid: false,
    formHasErrors: true,
  }),
  computed: {
    form() {
      return {
        text: this.input.title,
        date: this.date,
        time: this.time,
      };
    },
    ...mapState({
      checkAuthUser: function() {
        return this.$store.state.user.user.isAuth;
      },
      user: function() {
        return this.$store.state.user.user.data;
      },
    }),
  },

  methods: {
    AddTodo: function() {
      this.formHasErrors = false;
      this.isLoading = true;

      Object.keys(this.form).forEach((f) => {
        // check if every field is contain a value
        if (!this.form[f]) {
          this.formHasErrors = true;
        }
        // check if any field doesn't pass its own validation then entire form has error :)
        if (!this.$refs[f].validate()) {
          this.formHasErrors = true;
        }
      });

      if (!this.formHasErrors) {
        // if form is valid then dispatch action

        this.$store
          .dispatch("todos/addTodo", {
            text: this.input.title,
            due_date: this.date,
            created_at: new Date().toLocaleDateString(),
            creatorId: this.user.id,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
          })
          .then(() => {
            this.isLoading = false;
            // this.alertSuccess.message = res;
            // this.alertSuccess.status = true;
            // setTimeout(() => {
            //   this.alertSuccess.status = false;
            // }, 5000);

            // clear input
            this.input.text = null;
            this.date = null;
            this.time = null;
            this.formModal = false;
          })
          .catch(() => {
            this.isLoading = false;
            // this.alertError.message = err;
            // this.alertError.status = true;
            // setTimeout(() => {
            //   this.alertError.status = false;
            // }, 5000);
          });
      }
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
