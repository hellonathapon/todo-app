<template>
  <v-app>
    <NavBar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// page transition
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(2em);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
