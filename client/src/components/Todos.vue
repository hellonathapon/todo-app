<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="10">
        <p v-if="!getTodos.length">No Todo :)</p>
        <v-card 
          v-else
          v-for="i in getTodos" 
          class="todo-card pa-3" 
          :key="i.id"
          v-on:click="markAsDone(i.id)"
          outlined 
          >
          
          <div class="d-flex left">
            <v-icon >
              mdi-check-circle-outline
            </v-icon>
            <div class="d-flex flex-column align-start ml-3">
              <p class="text-center title" v-bind:class="{ done: i.isDone }">{{i.todo_text}}</p>
              <small >{{i.creator}}</small>
            </div>
          </div>

          <div class="right">
          <!--conditional display on toggle todo -->
            <v-btn v-if="i.isDone" icon color="error">
              <v-icon v-on:click="deleteTodo(i.id)">mdi-trash-can-outline</v-icon>
            </v-btn>
            <p class="text-center" v-else>{{i.date}}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Todos',
    data: () => ({
    }),
    methods: {
      markAsDone(id){
        this.$store.dispatch('markAsDone', {id})
      },
      deleteTodo(id){
        this.$store.dispatch('deleteTodo', {id})
      }
    },
    computed: {
      getTodos: function(){
        return this.$store.state.todos;
      },
    },
  }
</script>

<style lang="scss" scoped>
.todo-card {
  display: flex;
  transition: all .1s ease-in-out;

  .left{
    flex: 3;
  }
  .right{
    flex: 0.5;
    display: flex;
    justify-content: flex-end;
  }

/**
* Just in case user insert long word for testing or no reason ¯\_(ツ)_/¯
* that gonna mess up card layout So this fix it.
*/
  p{
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
    white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    white-space: pre-wrap;       /* css-3 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }
  .text-center{
    margin: auto 0;
    text-align: center;
    text-align-last: left;
    font-weight: 400;
  }

  .done{
    text-decoration: line-through;
    color: crimson;
  }
}
</style>
