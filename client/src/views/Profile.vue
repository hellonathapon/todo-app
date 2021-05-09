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
                  Ali Conners
                </div>
              </v-card-title>
              <v-card-subtitle class="white--text">
                Reputation: 12
              </v-card-subtitle>
              <v-card-subtitle class="white--text">
                Todos: 7
              </v-card-subtitle>
            </v-row>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title>(650) 555-1234</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content class="text-start">
                <v-list-item-title>aliconnors@example.com</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>

              <v-list-item-content class="text-start">
                <v-list-item-title>ali_connors@example.com</v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- list -->
      <v-col cols="12" lg="8">
        <v-list subheader two-line class="mt-15">
          <v-subheader inset>Today, 5 June 2021</v-subheader>

          <v-list-group v-for="item in today" :key="item.title">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1" dark>
                    mdi-check-bold
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content class="text-start">
                  <v-list-item-title v-text="item.title"></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-action> -->
              </v-list-item>
            </template>

            <v-card-text>
              <div class="text-start">
                <h2 class="title">
                  Choose Contributors
                </h2>
                <h2 class="caption mb-2">
                  people who intended to help you accheive your goal, maximun 3
                  people
                </h2>
              </div>

              <v-chip-group v-model="amenities" column multiple>
                <v-chip filter outlined>
                  Nathapon
                </v-chip>
                <v-chip filter outlined>
                  John
                </v-chip>
                <v-chip filter outlined>
                  Jane
                </v-chip>
                <v-chip filter outlined>
                  Adam
                </v-chip>
                <v-chip filter outlined>
                  Elon
                </v-chip>
                <v-chip filter outlined>
                  Wang
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-list-group>

          <v-divider inset></v-divider>

          <v-subheader inset>This week</v-subheader>

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
    today: [
      {
        subtitle: "Jan 9, 2014",
        title: "Diet three weeks",
      },
      {
        subtitle: "Jan 17, 2014",
        title: "Finish todo house project",
      },
      {
        subtitle: "Jan 28, 2014",
        title: "Work from home",
      },
    ],
  }),
};
</script>

<style></style>
