<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style>
:root {
  overflow: auto;
  --primary: #7b2cbf;
  --secondary: #9d4edd;
  --accent: #c77dff;
}
</style>
