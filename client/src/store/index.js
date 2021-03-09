import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    FETCH_TODOS: function(state, payload){
      state.todos = payload;
    },
    ADD_TODO: function(state, payload){
      const newTodo = {
        id: Date.now(),
        isDone: false,
        ...payload
      }
      state.todos = [
        ...state.todos,
        newTodo
      ]
    },
    MARK_AS_DONE: function(state, payload){
      state.todos.map(k => k.id === payload.id ? k.isDone = !k.isDone: k)
    },
    DELETE_TODO: function(state, payload){
      state.todos = state.todos.filter(k => k.id !== payload.id)
    }
  },
  actions: {
    fetchTodos: function(context){  //auto trigger when app component is mounted. 
      axios.get('http://localhost:5000/')
      .then(data => {
        console.log(data.data)
        context.commit("FETCH_TODOS", data.data);
      })
      .catch(err => console.error(err));
    },
    addTodo: function(context, payload){
      context.commit("ADD_TODO", payload)
    },
    markAsDone: function(context, payload){
      context.commit("MARK_AS_DONE", payload)
    },
    deleteTodo: function(context, payload){
      context.commit("DELETE_TODO", payload)
    }
  },
})
