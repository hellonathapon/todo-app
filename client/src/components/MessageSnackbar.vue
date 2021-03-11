<template>
    <v-snackbar
        v-model="listenOn.status"
    >
    {{listenOn.message}}

    <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
            Close
        </v-btn>
    </template>

    </v-snackbar>
</template>

<script>
export default {
    name: 'MessageSnackbar',
    data: () => ({
        //
    }),
    computed: {
        listenOn: function(){
            return this.$store.state.snackbar;
        }
    }
}
</script>

<style>

</style>