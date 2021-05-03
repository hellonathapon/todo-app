<template>
  <v-app-bar color="white" absolute elevation="0">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-btn to="/" color="white" elevation="0">
      TODO LIST
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn to="/register" elevation="0" color="white">
      Register
    </v-btn>
    <v-btn to="/login" elevation="0" color="white">
      Login
    </v-btn>

    <v-avatar v-if="checkUser" color="primary" size="40"
      ><span class="white--text headline">TJ</span>
    </v-avatar>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
  computed: {
    checkUser: function() {
      return this.$store.state.authUser;
    },
  },
};
</script>

<style lang="scss" scoped></style>
