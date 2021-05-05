<template>
  <v-container>
    <v-row class="text-center mt-15" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <!-- form -->
        <v-card ref="form">
          <v-avatar color="teal">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <v-card-title class="text-center">LOGIN</v-card-title>
          <v-form v-model="isFormValid" v-on:submit.prevent>
            <v-card-text>
              <v-text-field
                ref="email"
                label="Email Address"
                v-model="input.email"
                required
                :rules="[
                  () => !!input.email || 'This field is required',
                  (v) =>
                    !v ||
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'E-mail must be valid',
                ]"
              ></v-text-field>
              <v-text-field
                ref="password"
                label="Password"
                v-model="input.password"
                required
                :rules="[() => !!input.password || 'This field is required']"
                @click:append="show1 = !show1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
              ></v-text-field>
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
      </v-col>

      <div class="alert">
        <v-alert
          v-model="alertError.status"
          dismissible
          color="error"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-cloud-alert"
          transition="scale-transition"
        >
          {{ alertError.message }}
        </v-alert>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    input: {
      email: null,
      password: null,
    },
    formHasErrors: false,
    isFormValid: false,
    show1: false,
    isLoading: false,
    alertError: {
      status: false,
      message: null,
    },
  }),
  computed: {
    form() {
      return {
        email: this.input.email,
        password: this.input.password,
      };
    },
  },
  methods: {
    submitLoginForm: function() {
      this.formHasErrors = false;

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
        this.isLoading = true;
        this.$store
          .dispatch("submitLoginForm", {
            email: this.input.email,
            password: this.input.password,
          })
          .then(() => {
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.alertError.message = err.message;
            this.alertError.status = true;
            setTimeout(() => {
              this.alertError.status = false;
            }, 5000);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 10px;
}
</style>
