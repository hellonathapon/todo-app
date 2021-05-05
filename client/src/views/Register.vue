<template>
  <v-container>
    <v-row class="text-center mt-15" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <!-- form -->
        <v-card ref="form">
          <v-avatar color="primary">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
          <v-card-title class="text-center">REGISTER</v-card-title>
          <v-form v-model="isFormValid" v-on:submit.prevent>
            <v-card-text>
              <v-text-field
                ref="firstName"
                label="Firstname"
                v-model="input.firstName"
                required
                counter="25"
                :rules="[
                  () => !!input.firstName || 'This field is required',
                  () =>
                    (!!input.firstName && input.firstName.length <= 25) ||
                    'Firstname must be less than 25 characters',
                ]"
              ></v-text-field>
              <v-text-field
                ref="lastName"
                label="Lastname"
                v-model="input.lastName"
                required
                counter="25"
                :rules="[
                  () => !!input.lastName || 'This field is required',
                  () =>
                    (!!input.lastName && input.lastName.length <= 25) ||
                    'Lastname must be less than 25 characters',
                ]"
              ></v-text-field>
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
                placeholder="Example@email.com"
              ></v-text-field>
              <v-text-field
                ref="password"
                label="Password"
                v-model="input.password"
                required
                :rules="[
                  () => !!input.password || 'This field is required',
                  (v) =>
                    (v && v.length >= 5) ||
                    'Password must contain atleast 5 characters',
                ]"
                @click:append="show1 = !show1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
              ></v-text-field>
              <v-text-field
                ref="confirmPassword"
                label="Confirm password"
                v-model="input.confirmPassword"
                required
                :rules="[
                  () => !!input.confirmPassword || 'This field is required',
                  () =>
                    input.password === input.confirmPassword ||
                    'Password not match',
                ]"
                @click:append="show2 = !show2"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
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
                @click="submitRegisterForm()"
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
          color="red lighten-2"
          dark
          border="left"
          elevation="2"
          icon="mdi-cloud-alert"
          transition="scale-transition"
        >
          {{ alertError.message }}
        </v-alert>
      </div>
      <div class="alert">
        <v-alert
          v-model="alertSuccess.status"
          dismissible
          color="success"
          dark
          border="left"
          elevation="2"
          icon="mdi-cloud-alert"
          transition="scale-transition"
        >
          {{ alertSuccess.message }}
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
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    formHasErrors: false,
    isFormValid: false,
    show1: false,
    show2: false,
    isLoading: false,
    alertError: {
      status: false,
      message: null,
    },
    alertSuccess: {
      status: false,
      message: null,
    },
  }),
  computed: {
    form() {
      return {
        firstName: this.input.firstName,
        lastName: this.input.lastName,
        email: this.input.email,
        password: this.input.password,
        confirmPassword: this.input.confirmPassword,
      };
    },
  },
  methods: {
    submitRegisterForm: function() {
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
          .dispatch("submitRegisterForm", {
            firstName: this.input.firstName,
            lastName: this.input.lastName,
            email: this.input.email,
            password: this.input.password,
          })
          .then((res) => {
            this.isLoading = false;
            this.alertSuccess.message = res;
            this.alertSuccess.status = true;
            setTimeout(() => {
              this.alertSuccess.status = false;
            }, 5000);
          })
          .catch((err) => {
            this.isLoading = false;
            this.alertError.message = err;
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
