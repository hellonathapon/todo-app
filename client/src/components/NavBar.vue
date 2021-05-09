<template>
  <v-app-bar color="white" absolute elevation="0">
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
          color="primary"
          size="40"
        >
          <span class="white--text headline">TJ</span>
        </v-avatar>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content class="text-start">
              <v-list-item-title>Nathapon</v-list-item-title>
              <v-list-item-subtitle>Founder of TODOHOUSE</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <!-- <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title v-text="item.text"></v-list-item-title>
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

export default {
  name: "Navbar",
  data: () => ({
    menu: false,
    selectedItem: 0,
    items: [
      { text: "Profile", icon: "mdi-account" },
      { text: "Logout", icon: "mdi-star" },
    ],
  }),
  computed: {
    checkUser: function() {
      return this.$store.state.authUser;
    },
  },
};
</script>

<style lang="scss" scoped>
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
