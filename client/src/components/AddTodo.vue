<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="toggle-icon"
          color="primary"
          dark
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data: () => ({
    input: {
      text: "",
      creator: "",
      date: "",
    },
    dialog: false,
    formValid: false,
    datepickerMenu: false,
    btnLoading: false,
    rules: {
      todoRule: [(v) => !!v || "Todo is required"],
      creatorRule: [(v) => !!v || "Creator name is required"],
      dateRule: [(v) => !!v || "Due date is required"],
    },
  }),

  methods: {
    submitTodo() {
      if (this.$refs.form.validate()) {
        // check form validation.
        this.btnLoading = true;
        // console.log(this.input.date)
        console.log(new Date(this.input.date));
        this.$store
          .dispatch("addTodo", {
            text: this.input.text,
            creator: this.input.creator,
            date: this.input.date,
            isDone: 0,
          })
          .then(() => {
            this.btnLoading = false;
            this.dialog = false;
          })
          .catch(() => (this.btnLoading = false));
      }
    },

    // formatDate() {
    //   const today = "2021-05-02";
    //   const n = new Date(today);
    //   const daysOfWeek = ["a", "b", "c", "d", "e", "f", "r"];
    //   const monthNames = [
    //     "Jan",
    //     "Fab",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ];

    //   const day = n.getDay();
    //   let i = 0;
    //   let dayOfToday = "";
    //   while (i < daysOfWeek.length) {
    //     if (day === i) {
    //       dayOfToday = daysOfWeek[i];
    //     }
    //     i++;
    //   }

    //   let q = 0;
    //   const date = n.getDate();
    //   const month = n.getMonth();
    //   let thisMonth = "";

    //   while (q < monthNames.length) {
    //     if (month === q) {
    //       thisMonth = monthNames[q];
    //     }
    //     q++;
    //   }

    //   console.log(dayOfToday, date, thisMonth);
    // },
  },
};
</script>

<style scoped lang="scss">
.toggle-icon {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
}
</style>
