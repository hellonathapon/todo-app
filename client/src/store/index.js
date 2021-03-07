import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'buy milk', isDone: false, creator: 'Nathapon', date: '3/6/21' },
      { id: 2, text: 'buy Shirt', isDone: false, creator: 'Nathapon', date: '3/6/21' },
      { id: 3, text: 'Jogging', isDone: false, creator: 'Nathapon', date: '3/6/21' }
    ]
  },
  mutations: {
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
      console.log(payload)
      state.todos.map(k => {
        if(k.id === payload.id){
          return k.isDone = !k.isDone
        }
      })
    }
  },
  actions: {
    addTodo: function(context, payload){
      context.commit("ADD_TODO", payload)
    },
    markAsDone: function(context, payload){
      context.commit("MARK_AS_DONE", payload)
    }
  },
})
