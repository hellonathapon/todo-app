<template>
  <v-app-bar fixed outlined elevation="0" class="appbar">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <router-link to="/" class="d-flex align-center logo-link">
      <figure class="logo-icon">
        <img src="../assets/logo.svg" alt="vue" />
      </figure>
      <div class="headline logo-text">TODO HOUSE</div>
    </router-link>

    <v-spacer></v-spacer>

    <v-menu
      v-model="menu"
      v-if="checkUser"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-if="checkUser"
          v-bind="attrs"
          v-on="on"
          :color="randomNameColorTag(userData.first_name)"
          size="40"
        >
          <span class="white--text headline">{{
            mtdLetterAvatar(userData.first_name)
          }}</span>
        </v-avatar>
      </template>

      <v-card>
        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item to="/profile">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>

    <v-btn v-if="!checkUser" to="/register" elevation="0" color="white">
      Register
    </v-btn>
    <v-btn v-if="!checkUser" to="/login" elevation="0" color="white">
      Login
    </v-btn>

    <v-btn
      href="https://github.com/hellonathapon/todo-app"
      target="_blank"
      rel="noreferrer"
      icon
    >
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data: () => ({
    menu: false,
    selectedItem: 0,
  }),
  computed: {
    ...mapState({
      checkUser: function() {
        return this.$store.state.user.user.isAuth;
      },
      userData: function() {
        return this.$store.state.user.user.data;
      },
    }),
  },
  methods: {
    logout: function() {
      this.$store.dispatch("user/logout");
    },
    mtdLetterAvatar: (name) => (name ? name[0].toUpperCase() : null),
    randomNameColorTag(firstName) {
      if (firstName) {
        if (firstName[0] == "N") {
          return "teal";
        } else {
          return "red";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appbar {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%) !important;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
  background-color: #fff !important;
}
.logo-link {
  text-decoration: none;
  .logo-icon {
    height: 40px;
    width: 40px;
  }
  .logo-text {
    color: #000;
  }
}
</style>
