<template>
  <v-app-bar
    absolute
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
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

    <v-avatar color="primary" size="40"
      ><span class="white--text headline">TJ</span>
    </v-avatar>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
  <!-- <div id="nav">

    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
#nav {
  background: pink;
}
</style>
