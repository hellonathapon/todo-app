<template>
  <v-app>

    <v-container>
      <v-row justify="center" class="mt-5">
        <v-col cols="12" lg="10">
          <div class="display-3">Todo App</div>
          <div class="title">🚀 Check out the <a href="https://github.com/hellonathapon/todo-app" target="_blank">source code</a></div>
        </v-col>
      </v-row>
    </v-container>

    <v-main>
      <Todos/>
    </v-main>

    <AddTodo/>
    <MessageSnackbar/>
    
  </v-app>
</template>

<script>
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import MessageSnackbar from './components/MessageSnackbar';

export default {
  name: 'App',
  components: {
    Todos,
    AddTodo,
    MessageSnackbar,
  },
  mounted(){
    this.$store.dispatch('fetchTodos'); // initially fetch Todos from server.
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
.v-application {
  font-family: 'Quicksand', sans-serif;
  background-color: #EDEEEF !important;
}
</style>
