<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4">
        <v-card max-width="375" class="mx-auto mt-15">
          <v-img
            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
            height="300px"
            dark
          >
            <v-row class="fill-height">
              <v-card-title>
                <v-btn dark icon>
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn dark icon class="mr-4">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn dark icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pl-12 pt-12">
                <div class="display-1 pl-12 pt-12">
                  {{ user.first_name }}{{ user.last_name }}
                </div>
              </v-card-title>
            </v-row>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- list -->
      <v-col cols="12" lg="8">
        <v-list subheader two-line class="mt-15">
          <v-subheader inset>Today, 5 June 2021</v-subheader>

          <v-list-item v-for="item in week" :key="item.title">
            <v-list-item-avatar>
              <v-icon :class="item.color" dark v-text="item.icon"></v-icon>
            </v-list-item-avatar>

            <v-list-item-content class="text-start">
              <v-list-item-title v-text="item.title"></v-list-item-title>

              <v-list-item-subtitle
                v-text="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data: () => ({
    amenities: null,
    week: [
      {
        color: "blue",
        icon: "mdi-clipboard-text",
        subtitle: "Jan 20, 2014",
        title: "Vacation itinerary",
      },
      {
        color: "amber",
        icon: "mdi-gesture-tap-button",
        subtitle: "Jan 10, 2014",
        title: "Kitchen remodel",
      },
    ],
  }),
  computed: {
    ...mapState({
      user: function() {
        return this.$store.state.user;
      },
    }),
  },
  methods: {},
  created: function() {
    this.$store
      .dispatch("user/verifyUser")
      .then((res) => {
        console.log("user data", res);
      })
      .catch(() => {
        this.$router.push("/login");
      });
  },
};
</script>

<style></style>
