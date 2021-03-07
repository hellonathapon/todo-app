<template>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">

        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" fab large dark v-bind="attrs" v-on="on" class="toggle-icon">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">TODO</v-card-title>
          <v-form class="px-6" ref="form" v-model="formValid">
            <v-text-field
                  ref="todo"
                  v-model="input.text"
                  :rules="rules.todoRule"
                  label="Text"
                  placeholder="Todo"
                  required
            ></v-text-field>
            <v-text-field
                  ref="creator"
                  v-model="input.creator"
                  :rules="rules.creatorRule"
                  label="Creator"
                  placeholder="John Doe"
                  required
            ></v-text-field>
          </v-form>
        
        <!-- datepicker -->
          <v-col cols="12">
            <v-menu
                v-model="datepickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="input.date"
                    label="Due date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="input.date"
                @input="menu2 = false"
                ></v-date-picker>
            </v-menu>
            </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="submitTodo()"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
      </div>
</template>

<script>
export default {
    name: 'AddTodo',
    data: () => ({
        input: {
            text: '',
            creator: '',
            date: '',
        },
        dialog: false,
        formValid: false,
        datepickerMenu: false,
        rules: {
            todoRule: [
              v => !!v || 'Todo is required',
            ],
            creatorRule: [
              v => !!v || 'Creator name is required',
            ],
        }
  }),

  methods: {
    submitTodo(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('addTodo', {
          text: this.input.text,
          creator: this.input.creator,
          date: this.input.date,
        })
        // interact with VUEX return a Promise so close the dialog if everything is fine
        this.dialog = false
      }      
    },
  }

}
</script>

<style scoped lang="scss">
.toggle-icon{
    position: fixed;
    right: 1rem;
    bottom: 1rem;
}
</style>