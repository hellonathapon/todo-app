<template>
  <v-app>

    <v-row justify="center" class="txt-ctn">
      <v-col cols="8">
        <div class="display-3">Todo App</div>
        <div class="title">🚀 Check out the <a href="#">source code</a></div>
      </v-col>
    </v-row>

    <v-main>
      <Todos/>
    </v-main>

    <!-- Absolute position -->
    <AddTodo/>
    
  </v-app>
</template>

<script>
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

export default {
  name: 'App',

  components: {
    Todos,
    AddTodo,
  },

  data: ()=> ({
    //
  }),

  methods: {
    //
  },
  mounted(){
    this.$store.dispatch('fetchTodos');
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
.v-application {
  font-family: 'Quicksand', sans-serif;
  background-color: #EDEEEF !important;

  .txt-ctn{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

</style>
