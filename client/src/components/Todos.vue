<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="10">
        <v-card 
          outlined 
          v-for="i in getTodos" 
          class="todo-card pa-3" 
          :key="i.id"
          v-on:click="markAsDone(i.id)">
          
          <div class="flex-box">
            <v-icon>
              mdi-check-circle-outline
            </v-icon>
            <p v-bind:class="{ done: i.isDone }">{{i.text}}</p>
          </div>

          <div>
          <!--conditional display on toggle todo -->
            <v-btn v-if="i.isDone" icon color="error">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <p v-else>{{i.date}}</p>
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
      }
    },
    computed: {
      getTodos: function(){
        return this.$store.state.todos;
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo-card {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
  align-items: center;
  transition: all .1s ease-in-out;

// FIX: no space between words
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

  .flex-box{
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    p{
      margin: auto .5rem;
    }
  }

  .done{
    text-decoration: line-through;
    color: crimson;
  }
}
</style>
